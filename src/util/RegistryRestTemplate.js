const axios = require('axios')
const _ = require('lodash');
const xlsx = require('xlsx');
const {format} = require('date-fns')
var request = require('request');
const fs = require('fs');
const COS = require('cos-nodejs-sdk-v5');
const STS = require('qcloud-cos-sts');
const { da } = require('date-fns/locale');
const { buffer } = require('stream/consumers');

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
    allowPrefix: 'a/*', // 这里改成允许的路径前缀，可以根据自己网站的用户登录态判断允许上传的具体路径，例子： a.jpg 或者 a/* 或者 * (使用通配符*存在重大安全风险, 请谨慎评估使用)
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


// var cos = new COS({
//     SecretId: process.env.SecretId, // 推荐使用环境变量获取；用户的 SecretId，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://www.tencentcloud.com/document/product/598/37140?from_cn_redirect=1
//     SecretKey: process.env.SecretKey, // 推荐使用环境变量获取；用户的 SecretKey，建议使用子账号密钥，授权遵循最小权限指引，降低使用风险。子账号密钥获取可参考https://www.tencentcloud.com/document/product/598/37140?from_cn_redirect=1
// });

var cos = new COS({
    getAuthorization: function (options, callback) {
        // 初始化时不会调用，只有调用 cos 方法（例如 cos.putObject）时才会进入
        // 异步获取临时密钥
        request({
            url: 'http://localhost:1337/api/admin/base/comm/getSign',
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
            // console.log(credentials)
            // console.log(data)
            callback({
                TmpSecretId: credentials.tmpSecretId,        // 临时密钥的 tmpSecretId
                TmpSecretKey: credentials.tmpSecretKey,      // 临时密钥的 tmpSecretKey
                SecurityToken: credentials.sessionToken, // 临时密钥的 sessionToken
                ExpiredTime: data.expiredTime,               // 临时密钥失效时间戳，是申请临时密钥时，时间戳加 durationSeconds
            });
        });
    }
});


async function Get(ctx){
    let url = process.env.MIDWAY_URL;
    // console.log(`http://${url}${String(ctx.request.url).slice(4)}`)
    // console.log(String(ctx.request.url).slice(1))
    // console.log(String(ctx.request.url).slice(1).split(/[/]/))
    let urlSet = String(ctx.request.url).slice(1).split(/[/]/)
    let address = String(ctx.request.url).slice(4)
    urlSet[1] === 'admin' ? address = address : address = String(ctx.request.url)
    try{
        let {data} = await axios.get(`http://${url}${address}`,{})
        return data
    } catch(error){
        // console.error(error)
    }
}

async function Post(ctx){
    let url = process.env.MIDWAY_URL;
    const body = _.merge(ctx.state.user,ctx.request.body)
    if(body.username!==undefined&&body.username!==null){
        ctx.request.body.userName = body.username
    }
    let urlSet = String(ctx.request.url).slice(1).split(/[/]/)
    let address = String(ctx.request.url).slice(4)
    urlSet[1] === 'admin' ? address = address : address = String(ctx.request.url)

    // console.log('post address is'+address)
    try{
        let {data} = await axios.post(`http://${url}${address}`,ctx.request.body)
        return data
    } catch(error){
        // console.error(error)
    }
}

async function exportData(ctx){
    let url = process.env.MIDWAY_URL;
    const body = _.merge(ctx.state.user,ctx.request.body)
    if(body.username!==undefined&&body.username!==null){
        ctx.request.body.userName = body.username
    }
    let urlSet = String(ctx.request.url).slice(1).split(/[/]/)
    let address = String(ctx.request.url).slice(4)
    urlSet[1] === 'admin' ? address = address : address = String(ctx.request.url)

    // cos.getService(function (err, data) {
    //     console.log(data && data.Buckets);
    // });    //get all bucket info

    // cos.getBucket({
    //     Bucket: 'ehealth-uat-1307281536', /* 必须 */
    //     Region: 'ap-hongkong',     /* 必须 */
    //     // Prefix: 'a/',           /* 非必须 */
    // }, function(err, data) {
    //     console.log(err || data.Contents);
    // });  //get all object in the bucket

    // cos.getObject({
    //     Bucket: 'ehealth-uat-1307281536', /* 填入您自己的存储桶，必须字段 */
    //     Region: 'ap-hongkong',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
    //     Key: '截屏2023-03-14 下午2.38.53.png',  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
    // }, function(err, data) {
    //     console.log(err || data.Body);
    // });

    try{
        let {data} = await axios.post(`http://${url}${address}`,ctx.request.body)
        if(!fs.existsSync('./public/uploads/usersTRF')){
            fs.mkdirSync('./public/uploads/usersTRF');
          }
        // 将数据转成workSheet
        const arrayWorkSheet = xlsx.utils.aoa_to_sheet(data.data);
        // 构造workBook
        const workBook = {
        SheetNames: ['sheet1'],
        Sheets: {
            sheet1: arrayWorkSheet,
        },
        };
        // 将workBook写入文件
        const time = format(new Date(), 'yyyyMMddHHmm');
        xlsx.writeFile(workBook, `public/uploads/usersTRF/${ctx.params.name}${time}.xlsx`);

        // cos.putObject({
        //     Bucket: 'ehealth-uat-1307281536', /* 填入您自己的存储桶，必须字段 */
        //     Region: 'ap-hongkong',  /* 存储桶所在地域，例如ap-beijing，必须字段 */
        //     Key: `/usersTRF/${ctx.params.name}${time}.xlsx`,  /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        //     StorageClass: 'STANDARD',
        //     /* 当Body为stream类型时，ContentLength必传，否则onProgress不能返回正确的进度信息 */
        //     Body: fs.readFileSync(`./public/uploads/usersTRF/${ctx.params.name}${time}.xlsx`), // 上传文件对象
        //     // ContentLength: file.size,
        //     onProgress: function(progressData) {
        //         console.log(JSON.stringify(progressData));
        //     }        
        // }, function(err, data) {
        //     console.log(err || data);
        //     // if(`./public/uploads/usersTRF/${ctx.params.name}${time}.xlsx`){
        //     //     fs.unlink(`./public/uploads/usersTRF/${ctx.params.name}${time}.xlsx`,(err)=>console.log(err))
        //     // }
        // });

        // data.data = `/uploads/usersTRF/${ctx.params.name}${time}.xlsx`;
        data.data = `/api/admin/export?addr=${ctx.params.name}${time}.xlsx`
        return data
    } catch(error){
        // console.error(error)
    }
}

module.exports={
    Get,
    Post,
    exportData
}