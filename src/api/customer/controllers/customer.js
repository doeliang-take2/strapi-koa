'use strict';

/**
 * customer controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Get, Post,exportData } = require('../../../util/RegistryRestTemplate')

module.exports = createCoreController('api::customer.customer',({strapi})=>({
    async page(ctx){
        return await Post(ctx)
    },
    async setUserStatus(ctx){
        return await Post(ctx)
    },
    async exportData(ctx){
        ctx.params.name = '用戶管理'
        return await exportData(ctx)
    },
    async submitFollowUp(ctx){
        return await Post(ctx)
    },
    async submitUserTag(ctx){
        return await Post(ctx)
    },
    async info(ctx){
        return await Get(ctx)
    },
    async update(ctx){
        return await Post(ctx)
    },
    async add(ctx){
        return await Post(ctx)
    },
    async delete(ctx){
        return await Post(ctx)
    },
    async list(ctx){
        return await Post(ctx)
    },
    // async setLanguage(ctx){
    //     return await Post(ctx)
    // }
}));
