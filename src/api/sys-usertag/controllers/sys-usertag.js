'use strict';

/**
 * sys-usertag controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Post, exportData } = require('../../../util/RegistryRestTemplate')


module.exports = createCoreController('api::sys-usertag.sys-usertag',({strapi})=>({
    async page(ctx){
        return await Post(ctx)
    },
    async exportData(ctx){
        ctx.params.name = "用戶標籤管理"
        return await exportData(ctx)
    },
    async add(ctx){
        return await Post(ctx)
    },
    async delete(ctx){
        return await Post(ctx)
    },
    async update(ctx){
        return await Post(ctx)
    },
}));
