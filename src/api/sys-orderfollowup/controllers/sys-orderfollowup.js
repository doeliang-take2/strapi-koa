'use strict';

/**
 * sys-orderfollowup controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Post } = require('../../../util/RegistryRestTemplate')



module.exports = createCoreController('api::sys-orderfollowup.sys-orderfollowup',({strapi})=>({
    async page(ctx){
        return await Post(ctx)
    },
    async add(ctx){
        return await Post(ctx)
    },
    async update(ctx){
        delete ctx.request.body.updateTime
        console.log(ctx.request.body)

        return await Post(ctx)
    },
    async delete(ctx){
        return await Post(ctx)
    },
}));
