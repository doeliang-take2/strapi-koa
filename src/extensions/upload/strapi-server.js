// const { getService } = require('../utils');
const COS = require('cos-nodejs-sdk-v5');
const STS = require('qcloud-cos-sts')
const fs = require('fs')
const request = require('request')

// 配置参数
var config = {
    secretId: process.env.SecretId, // 固定密钥
    secretKey: process.env.SecretKey, // 固定密钥
    proxy: '',
    durationSeconds: 1800,
    // host: 'sts.tencentcloudapi.com', // 域名，非必须，默认为 sts.tencentcloudapi.com
    endpoint: 'sts.tencentcloudapi.com', // 域名，非必须，与host二选一，默认为 sts.tencentcloudapi.com

    // 放行判断相关参数
    bucket: 'ehealth-uat-1307281536',
    region: 'ap-hongkong',
    allowPrefix: '*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
    // 简单上传和分片，需要以下的权限，其他权限列表请看 https://cloud.tencent.com/document/product/436/31923
    allowActions: [
        // 简单上传
        'name/cos:PutObject',
        'name/cos:PostObject',
        //下载操作 
        "name/cos:GetObject",
        "name/cos:GetBucket",
        // 分片上传
        'name/cos:InitiateMultipartUpload',
        'name/cos:ListMultipartUploads',
        'name/cos:ListParts',
        'name/cos:UploadPart',
        'name/cos:CompleteMultipartUpload'
    ],
};

// 获取临时密钥
var shortBucketName = config.bucket.substr(0 , config.bucket.lastIndexOf('-'));
var appId = config.bucket.substr(1 + config.bucket.lastIndexOf('-'));
var policy = {
    'version': '2.0',
    'statement': [{
        'action': config.allowActions,
        'effect': 'allow',
        'principal': {'qcs': ['*']},
        'resource': [
            'qcs::cos:' + config.region + ':uid/' + appId + ':prefix//' + appId + '/' + shortBucketName + '/' + config.allowPrefix,
        ],
        // condition生效条件，关于 condition 的详细设置规则和COS支持的condition类型可以参考https://cloud.tencent.com/document/product/436/71306
        // 'condition': {
        //   // 比如限定ip访问
        //   'ip_equal': {
        //     'qcs:ip': '10.121.2.10/24'
        //   }
        // }
    }],
};

var cos = new COS({
    getAuthorization: function (options, callback) {
        // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
        // 异步获取临时密钥
        request({
            url: `http://${process.env.MIDWAY_URL}/admin/base/comm/getSign`, //midway集成sdk，因为midway已经开放外网访问权限
            data: {
                // 可从 options 取需要的参数
            }
        }, function (err, response, body) {
            let data;
            let credentials;
            try {
                data = JSON.parse(body);
                credentials = data.credentials;
            } catch(e) {}
            if (!credentials) return console.error('credentials invalid');
            callback({
                TmpSecretId: credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
                TmpSecretKey: credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
                SecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
                ExpiredTime: data.expiredTime,               // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
            });
        });
    }
});

module.exports = (plugin) => {

    plugin.controllers['content-api']['sign'] = async(ctx) =>{
        const a = await STS.getCredential({
            secretId: config.secretId,
            secretKey: config.secretKey,
            proxy: config.proxy,
            durationSeconds: config.durationSeconds,
            endpoint: config.endpoint,
            policy: policy,
        });
        return a
    }

    plugin.controllers['content-api']['getpic'] = async(ctx) =>{
        const res = await cos.getObject({
            Bucket: 'ehealth-uat-1307281536', /* 填入您自己的存储桶，必须字段 */
            Region: 'ap-hongkong',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
            Key: `${ctx.query.addr}`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        });
        // console.log(res.headers)

        ctx.set('content-type',res.headers['content-type']); //针对bucket的header配置，设置返回给前端的内容类型
        // ctx.set('content-length', '9902'); //一搬会自适应文件大小
        return res.Body
    }

    plugin.controllers['content-api']['export'] = async(ctx) =>{
        const res = fs.readFileSync(`./public/uploads/usersTRF/${ctx.query.addr}`)
        ctx.set('content-type','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
        ctx.set('content-length',res.length)
        ctx.attachment(ctx.query.addr)
        fs.unlink(`./public/uploads/usersTRF/${ctx.query.addr}`,(err)=>{}) //临时导出文件，一次性，需删除
        return res
    }

    plugin.controllers['content-api']['up'] = async(ctx) =>{
        const {
            query: { id },
            request: { files: { file } = {}},
        } = ctx;

        const uploadService = strapi.plugins.upload.services.upload;
        const folderService = strapi.plugins.upload.services.folder;
        // console.log(ctx)
        // FIRST LEVEL FOLDER BLOCK, a folder to store image
        let firstLevelFolderBase = await strapi.query('plugin::upload.folder').findOne({where: {name: 'firstLevelFolder'}});
        if (!firstLevelFolderBase) {
            await folderService.create({name: 'firstLevelFolder'})
            firstLevelFolderBase = await strapi.query('plugin::upload.folder').findOne({where: {name: 'firstLevelFolder'}});
        }

        // // NOW LETS UPDATE THE FILES
        // const uploadedFiles = await Promise.map(fileArray, async (file) => {
        //     return uploadService.upload({
        //     data: {
        //         path: `firstLevelFolder/${user.username}`,
        //         fileInfo: {folder: userLevelFolder.id},
        //     },
        //     files: file
        //     })
        // }
        // );

        // console.log(file)
        // console.log(file.path)
        // console.log(fs.readFileSync(file.path))
        // console.log(ctx.request.body.key)
        // console.log(encodeURI(ctx.request.body.key))
        // console.log(ctx.state.user)
        let date = new Date()
        // console.log(date.getTime()+"-"+ctx.request.body.key)
        const addr = date.getTime()+"-"+ctx.request.body.key
        // console.log(file.path)

        cos.putObject({
            Bucket: 'ehealth-uat-1307281536', /* 填入您自己的存储桶，必须字段 */
            Region: 'ap-hongkong',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
            Key: addr,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
            StorageClass: 'STANDARD',
            Body: fs.readFileSync(file.path),
            /* 当Body为stream类型时，ContentLength必传，否则onProgress不能返回正确的进度信息 */
            // Body: fs.readFileSync('/Users/doe/code/E-health/take2_ehealth_recode/auth-service/public/uploads/2023_03_14_2_38_53_1eedde6c32.png'), // 上传文件对象
            // ContentLength: file.size,
            onProgress: function(progressData) {
                console.log(JSON.stringify(progressData));
            }        
        }, function(err, data) {
            console.log(err || data);
        });
        
        const res = await uploadService.upload({
            data:{
                path: `firstLevelFolder`,
                fileInfo: {folder:  firstLevelFolderBase.id},
            },
            files: file
        })

        return {code:1000,
            data: "http://"+process.env.local_URL+"/api/admin/getpic?addr="+addr,
            message:'success'}
        
    }
  
    plugin.routes['content-api'].routes.push({
        method: 'POST',
        path: '/admin/base/comm/upload',
        handler: 'content-api.up',
        config: {
            policies: [],
            prefix: '',
        }
    });

    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/admin/base/comm/getSign',
        handler: 'content-api.sign',
        config: {
            policies: [],
            prefix: '',
        }
    });

    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/admin/getpic',
        handler: 'content-api.getpic',
        config: {
            policies: [],
            prefix: '',
        }
    });

    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/admin/export',
        handler: 'content-api.export',
        config: {
            policies: [],
            prefix: '',
        }
    });

    // console.log(plugin.controllers);
    // console.log(plugin.routes['content-api'])
    return plugin;
  };