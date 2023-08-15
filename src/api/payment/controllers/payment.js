'use strict';

/**
 * payment controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Post, Get, exportData } = require('../../../util/RegistryRestTemplate')


module.exports = createCoreController('api::payment.payment',({strapi})=>({
    async page(ctx){
        return await Post(ctx)
    },
    async info(ctx){
        return await Get(ctx)
    },
    async list(ctx){
        return await Post(ctx)
    },
    async refund(ctx){
        return await Post(ctx)
    },
    async exportData(ctx){
        ctx.params.name = "退款管理";
        return await exportData(ctx)
    },
    async refundByAlternative(ctx){
        return await Post(ctx)
    },
    async createProduct(ctx){
        return await Get(ctx)
    },
}));
