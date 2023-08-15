'use strict';

const utils = require('@strapi/utils');
const { getService } = require('../users-permissions/utils');
const { getPermmenu,getPerson,getPermissionsByRole, personUpdate } = require("./services/users-permissions")
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const MD5 = require('md5')

const {
    validateCreateUserBody,validateUpdateUserBody
} = require('../users-permissions/controllers/validation/user');

const {
    validateCallbackBody
} = require('../users-permissions/controllers/validation/auth');

const { sanitize } = utils;
const { ApplicationError, ValidationError } = utils.errors;
const sanitizeUser = (user, ctx) => {
    const { auth } = ctx.state;
    const userSchema = strapi.getModel('plugin::users-permissions.user');
    return sanitize.contentAPI.output(user, userSchema, { auth });
};

const sanitizeOutput = (user, ctx) => {
    const schema = strapi.getModel('plugin::users-permissions.user');
    const { auth } = ctx.state;
  
    return sanitize.contentAPI.output(user, schema, { auth });
  };
  

// issue a JWT
const issueJWT = (payload, jwtOptions = {}) => {
    _.defaults(jwtOptions, strapi.config.get('plugin.users-permissions.jwt'));
    // console.log(strapi.config.get('plugin.users-permissions.jwtSecret'))
    return jwt.sign(
        _.clone(payload.toJSON ? payload.toJSON() : payload),
        strapi.config.get('plugin.users-permissions.jwtSecret'),
        jwtOptions
    );
}

// verify the refreshToken by using the REFRESH_SECRET from the .env
const verifyRefreshToken = (token) => {
    return new Promise(function (resolve, reject) {
        jwt.verify(token, process.env.REFRESH_SECRET, {}, function (
            err,
            tokenPayload = {}
        ) {
            if (err) {
                return reject(new Error('Invalid token.'));
            }
            resolve(tokenPayload);
        });
    });
}

// issue a Refresh token
const issueRefreshToken = (payload, jwtOptions = {}) => {

    _.defaults(jwtOptions, strapi.config.get('plugin.users-permissions.jwt'));
    return jwt.sign(
        _.clone(payload.toJSON ? payload.toJSON() : payload),
        process.env.REFRESH_SECRET,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRES }
    );
}

module.exports = (plugin) => {
    plugin.controllers.auth.callback = async (ctx) => {
        console.log("login input")
        if(!ctx.request.body.identifier){
            ctx.request.body.identifier = ctx.request.body.username
        }
        const provider = ctx.params.provider || 'local'; // indentify where to get auth service
        const params = ctx.request.body;

        const store = strapi.store({ type: 'plugin', name: 'users-permissions' });
        const grantSettings = await store.get({ key: 'grant' });

        const grantProvider = provider === 'local' ? 'email' : provider;
        if (!_.get(grantSettings, [grantProvider, 'enabled'])) {
            throw new ApplicationError('This provider is disabled');
        }

        if (provider === 'local') {
            await validateCallbackBody(params);

            const { identifier } = params;

            // Check if the user exists.
            const user = await strapi.query('plugin::users-permissions.user').findOne({
                where: {
                    provider,
                    $or: [{ email: identifier.toLowerCase() }, { username: identifier }]
                },
            });

            // console.log(user)

            if(user?.status===0) {
                return {code:1001,message:"該賬戶已被禁用"}
            }

            if (!user) {
                return {code:1001,message:"該用戶不存在"}
            }

            if (!user.password) {
                return {code:1001,message:"賬戶或密碼不正確"}
            }

            const validPassword = await getService('user').validatePassword(
                params.password,
                user.password
            );
            const validPasswordOld = MD5(params.password)==user.password //ehealth old password use md5 verify

            // console.log(validPassword)
            // console.log(validPasswordOld)
            if (!validPassword&&!validPasswordOld) {
                return {code:1001,message:"賬戶或密碼不正確"}
            } else {
                ctx.cookies.set("refreshToken", issueRefreshToken({ id: user.id }), {
                    httpOnly: true,
                    secure: false,
                    signed: true,
                    overwrite: true,
                });
                ctx.send({
                    code:1000,
                    data:{
                        expire: 3600,
                        refreshExpire: 7200,
                        token: "bearer " +issueJWT({ id: user.id }, { expiresIn: process.env.JWT_SECRET_EXPIRES }),
                        refreshToken: "bearer "+issueRefreshToken({id:user.id},{})
                    },
                    message:"success"
                    // user: await sanitizeUser(user, ctx),
                });
            }

            // const advancedSettings = await store.get({ key: 'advanced' });
            // const requiresConfirmation = _.get(advancedSettings, 'email_confirmation');

            // if (requiresConfirmation && user.confirmed !== true) {
            //     throw new ApplicationError('Your account email is not confirmed');
            // }

            // if (user.blocked === true) {
            //     throw new ApplicationError('Your account has been blocked by an administrator');
            // }

            // console.log("return here")
            // // console.log(user.id)

            // return ctx.send({
            //     jwt: getService('jwt').issue({ id: user.id }),
            //     user: await sanitizeUser(user, ctx),
            // });
        }
        // Connect the user with the third-party provider.
        else {
            try {
                const user = await getService('providers').connect(provider, ctx.query);

                return ctx.send({
                    jwt: getService('jwt').issue({ id: user.id }),
                    user: await sanitizeUser(user, ctx),
                });
            } catch (error) {
                throw new ApplicationError(error.message);
            }
        }
    };

    plugin.controllers.auth['refreshToken'] = async (ctx) => {
        const store = await strapi.store({ type: 'plugin', name: 'users-permissions' });
        // console.log(ctx.request)
        // console.log(String(ctx.request.query.refreshToken).split(" ")[1])

        // const { refreshToken } = ctx.request.body;
        // let refreshCookie = ctx.cookies.get("refreshToken")

        // if (!refreshCookie && !refreshToken) {
        //     return ctx.badRequest("No Authorization");
        // }
        // if (!refreshCookie) {
        //     if (refreshToken) {
        //         refreshCookie = refreshToken
        //     }
        //     else {
        //         return ctx.badRequest("No Authorization");
        //     }
        // } //利用cookie存refreshtoken
        try {
            const obj = await verifyRefreshToken(String(ctx.request.query.refreshToken).split(" ")[1]);//根据ehealth配置，直接解码参数中的refreshtoken
            // console.log(obj)
            const user = await strapi.query('plugin::users-permissions.user').findOne({ where: { id: obj.id } });
            if (!user) {
                throw new ValidationError('Invalid identifier or password');
            }

            // if (
            //     _.get(await store.get({ key: 'advanced' }), 'email_confirmation') &&
            //     user.confirmed !== true
            // ) {
            //     throw new ApplicationError('Your account email is not confirmed');
            // }

            // if (user.blocked === true) {
            //     throw new ApplicationError('Your account has been blocked by an administrator');
            // }
            const refreshToken = issueRefreshToken({ id: user.id })
            ctx.cookies.set("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                signed: true,
                overwrite: true,
            });
            ctx.send({
                code:1000,
                data:{
                expire: 3600,
                refreshExpire: 7200,
                token: "bearer "+issueJWT({ id: user.id }, { expiresIn: process.env.JWT_SECRET_EXPIRES }),
                refreshToken: "bearer "+refreshToken
                },
                message:"success"
            });
        }
        catch (err) {
            return ctx.badRequest(err.toString());
        }
    }

    // plugin.controllers.role.updateRole = async (ctx) =>{

    //     const roleID = ctx.params.role;

    //     console.log(Object.keys(ctx.request.body.permissions))

    //     // console.log(ctx.request.body.permissions['api::clinic']['controllers'])

    //     if (_.isEmpty(ctx.request.body)) {
    //         throw new ValidationError('Request body cannot be empty');
    //     }

    //     if(ctx.request.body.name = 'Authenticated'){//身份为Authenticated时插入新的菜单

    //         let menus = Object.keys(ctx.request.body.permissions).filter(t=>(String(t).indexOf('api::')>=0))

    //         // const role = await getService('role').findOne(roleID)
    //         // console.log(role.permissions['api::clinic']['controllers'])
    //         // strapi.entityService.create('api::menu.menu',{
    //         //     data:{
    //         //         name : "menu1",
    //         //         parentId : "125"
    //         //     }
    //         // })
    //     }
    
    //     await getService('role').updateRole(roleID, ctx.request.body);
    
    //     ctx.send({ ok: true });
    // }

    plugin.controllers.role.createRole = async (ctx) =>{
        if (_.isEmpty(ctx.request.body)) {
            throw new ValidationError('Request body cannot be empty');
        }
    
        const permissionsSet = await strapi.service('api::sys-role.sys-role').convertStrapi(ctx)
        // console.log(permissionsSet)

        let menuNames = ''
        permissionsSet.forEach(e => {
            menuNames = menuNames + "," + e.name
        });
        // console.log(menuNames)

        await getService('role').createRole(ctx.request.body);

        await strapi.query('plugin::users-permissions.role').update({
            where: { name: ctx.request.body.name },
            data: {'menuNames':menuNames.substring(1,menuNames.length)}
        })
    
        ctx.send({ ok: true });
    }

    plugin.controllers.permissions.getPermissionsByRole = async (ctx) =>{
        // console.log(strapi.api['interface-app'].routes['interface-app'].routes)
        //根据用户role来获取可用的接口权限，从数据库存储的关系中直接获取

        // const da = await strapi.db.connection.from("up_permissions_role_links as a").select({
        //     action: "action"
        //   }).leftJoin('up_permissions as b', function() {
        //     this
        //       .on('a.permission_id', '=', 'b.id')
        //   }).where('role_id','=',_.get(ctx,'state.user.role.id',0))
        const da = await getPermissionsByRole(_.get(ctx,'state.user.role.id',0))
          
        return {data:da}
    }


    plugin.controllers.auth['getPerson'] = async (ctx) =>{
        return (await getPerson(ctx))
    }
    plugin.controllers.auth['getPermMenu'] = async (ctx) =>{
        return (await getPermmenu(ctx))
    }
    plugin.controllers.auth['personUpdate'] = async (ctx) =>{
        return (await personUpdate(ctx))
    }


    /**
     * Create a/an user record.
     * @return {Object}
     */
    // plugin.controllers.user['create'] = async(ctx) => {
    //     const advanced = await strapi
    //     .store({ type: 'plugin', name: 'users-permissions', key: 'advanced' })
    //     .get();
        
    //     await validateCreateUserBody(ctx.request.body);

    //     const { email, username, role } = ctx.request.body;

    //     const userWithSameUsername = await strapi
    //     .query('plugin::users-permissions.user')
    //     .findOne({ where: { username } });

    //     if (userWithSameUsername) {
    //     if (!email) throw new ApplicationError('Username already taken');
    //     }

    //     if (advanced.unique_email) {
    //     const userWithSameEmail = await strapi
    //         .query('plugin::users-permissions.user')
    //         .findOne({ where: { email: email.toLowerCase() } });

    //     if (userWithSameEmail) {
    //         throw new ApplicationError('Email already taken');
    //     }
    //     }

    //     const user = {
    //     ...ctx.request.body,
    //     email: email.toLowerCase(),
    //     provider: 'local',
    //     };

    //     if (!role) {
    //     const defaultRole = await strapi
    //         .query('plugin::users-permissions.role')
    //         .findOne({ where: { type: advanced.default_role } });

    //     user.role = defaultRole.id;
    //     }

    //     try {
    //     const data = await getService('user').add(user);
    //     const sanitizedData = await sanitizeOutput(data, ctx);

    //     ctx.created(sanitizedData);
    //     return data;
    //     } catch (error) {
    //     throw new ApplicationError(error.message);
    //     }
    // },

    /**
     * Update a/an user record.
     * @return {Object}
     */
    plugin.controllers.user['update'] = async(ctx) =>{
        const advancedConfigs = await strapi
        .store({ type: 'plugin', name: 'users-permissions', key: 'advanced' })
        .get();

        const { id } = ctx.params;
        const { email, username, password } = ctx.request.body;

        
        const user = await getService('user').fetch(id);
        if (!user) {
        throw new NotFoundError(`User not found`);
        }

        await validateUpdateUserBody(ctx.request.body);

        if (user.provider === 'local' && _.has(ctx.request.body, 'password') && !password) {
        throw new ValidationError('password.notNull');
        }

        if (_.has(ctx.request.body, 'username')) {
        const userWithSameUsername = await strapi
            .query('plugin::users-permissions.user')
            .findOne({ where: { username } });

        if (userWithSameUsername && _.toString(userWithSameUsername.id) !== _.toString(id)) {
            throw new ApplicationError('Username already taken');
        }
        }


        if (_.has(ctx.request.body, 'email') && advancedConfigs.unique_email) {
        const userWithSameEmail = await strapi
            .query('plugin::users-permissions.user')
            .findOne({ where: { email: email.toLowerCase() } });

        if (userWithSameEmail && _.toString(userWithSameEmail.id) !== _.toString(id)) {
            throw new ApplicationError('Email already taken');
        }
        ctx.request.body.email = ctx.request.body.email.toLowerCase();
        }

        const updateData = {
        ...ctx.request.body,
        };

        const data = await getService('user').edit(user.id, updateData);
        const sanitizedData = await sanitizeOutput(data, ctx);

        // ctx.send(sanitizedData);
    }

    plugin.controllers.role['updateRole'] = async(ctx) =>{
        const roleID = ctx.params.role;

        // console.log("this is "+roleID)
        if (_.isEmpty(ctx.request.body)) {
          throw new ValidationError('Request body cannot be empty');
        }

        // console.log(ctx.request.body)
    
        await getService('role').updateRole(roleID, ctx.request.body);
    
    }

    plugin.routes['content-api'].routes.push({
        method: 'POST',
        path: '/admin/base/open/login',
        handler: 'auth.callback',
        config: {
            policies: [],
            prefix: '',
        }
    })


    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/admin/base/open/refreshToken',
        handler: 'auth.refreshToken',
        config: {
            policies: [],
            prefix: '',
        }
    });
    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/admin/base/comm/person',
        handler: 'auth.getPerson',
        config: {
            policies: [],
            prefix: '',
        }
    });
    plugin.routes['content-api'].routes.push({
        method: 'POST',
        path: '/admin/base/comm/personUpdate',
        handler: 'auth.personUpdate',
        config: {
            policies: [],
            prefix: '',
        }
    });
    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/admin/base/comm/permmenu',
        handler: 'auth.getPermMenu',
        config: {
            policies: [],
            prefix: '',
        }
    });
    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/routes',
        handler: 'permissions.getRoutes',
    });

    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/policies',
        handler: 'permissions.getPolicies',
    });

    plugin.routes['content-api'].routes.push({
        method: 'GET',
        path: '/findPermissions',
        handler: 'permissions.getPermissionsByRole',
    });
    return plugin

}

// module.exports = (plugin) => {
//     // console.log(plugin.controllers.permissions.getPermissions())
//     // add a new function
//     plugin.controllers.permissions.find = () =>{
//         // plugin.services.jwt.getToken()
//         // const res = await strapi.entityService.findMany('api::patient.patient',{
//         //     filters:{
//         //         isDelete : 0
//         //     },
//         //     sort:{
//         //         id:'desc'
//         //     }
//         // })
//         // console.log(res)
//         return {"a":"123"}
//     }
//     plugin.config.jwt = { expiresIn: '6000s' } //change the config of user-permissions expire time

//     // console.log(plugin)


//     plugin.controllers.auth['refreshToken'] = async (ctx) => {
//         try {
//             const parts = ctx.request.header.authorization.split(/\s+/);
//             const token = parts[1]
//             const payload = await strapi.plugins['users-permissions'].services.jwt.verify(token)
//             // console.log(payload) //include expire time
//             const refrechToken = await strapi.plugins['users-permissions'].services.jwt.issue({
//                 id: payload.id
//             })
//             return refrechToken
//         } catch (error) {
//             console.log(error.toString())
//             return ctx.badRequest(error.toString());
//         }
//     }
    
//     plugin.routes['content-api'].routes.push({
//         method: 'POST',
//         path: '/refrechToken',
//         handler: 'auth.refreshToken',
//         config: {
//             prefix: ''
//         }
//     });


//     plugin.routes['content-api'].routes.push({
//         method: 'GET',
//         path: '/routes',
//         handler: 'permissions.getRoutes',
//       });

//       plugin.routes['content-api'].routes.push({
//         method: 'GET',
//         path: '/policies',
//         handler: 'permissions.getPolicies',
//       });

//     // attach the customize function to path
//     plugin.routes['content-api'].routes.push({
//         method: 'GET',
//         path: '/find',
//         handler: 'permissions.find',
//       });
  
//     return plugin;
// }