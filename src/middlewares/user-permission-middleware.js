const jwt = require('jsonwebtoken');
const { getService } = require('../extensions/users-permissions/utils');


module.exports = () => {
    return async (ctx, next) => {
    //   const start = Date.now();

      const stateChange = ['POST','PUT','DELETE']
      const health = '/api/v1/app/auth';
      // console.log(ctx.request.url);
      // String(ctx.request.url).indexOf(health)>-1 ? console.log("123") : console.log("345")

    // if(ctx.request.header.authorization){
    // delete(ctx.request.header.authorization)
    // }

    await next();


    // if(String(ctx.request.url).indexOf(health)>-1){
    //     ctx.response.body = "123"
    // }


    // console.log(ctx)


    // console.log(ctx.request.header.authorization.split(/\s+/)[1])

    if(ctx.response.status=200){
        return
    }


    try {

        if (ctx.request && ctx.request.header && ctx.request.header.authorization) {
            token = ctx.request.header.refreshauth;
            const verify = await getService('jwt').verify(token)
            const res = await strapi.plugin('users-permissions').controllers.auth.refreshToken(ctx) //call custom refreshtoken method,and attach new jwt and refresh token in ctx response to user
          } else {
            return null;
          }

    } catch (error) {
        console.log(""+error)
    }
    //   if(stateChange.includes(ctx.request.method)){
    //     // if(!ctx.response.body.data){
    //     //   ctx.response.body.data = {'message' : String(ctx.request.url).slice(8)}
    //     // } else{
    //     //   ctx.response.body.data.message = String(ctx.request.url).slice(8)
    //     // }
    //     !ctx.response.body.data ? ctx.response.body.data = {'message' : String(ctx.request.url).slice(8)} :
    //     ctx.response.body.data.message = String(ctx.request.url).slice(8)
    //   }
    //   const delta = Math.ceil(Date.now() - start);
    //   ctx.set('X-Response-Time', delta + 'ms');
    //   console.log(delta)

    };
  };