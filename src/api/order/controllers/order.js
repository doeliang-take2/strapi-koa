'use strict';

/**
 * order controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Get, Post, exportData } = require('../../../util/RegistryRestTemplate')


module.exports = createCoreController('api::order.order',({strapi})=>({
    async page(ctx){
        return await Post(ctx);
    },
    async add(ctx){
        return await Post(ctx);
    },
    async update(ctx){
        return await Post(ctx);
    },
    async list(ctx){
        return await Post(ctx);
    },
    async orderInfo(ctx){
        return await Post(ctx);
    },
    async changeTime(ctx){
        return await Post(ctx);
    },
    async checkSuccess(ctx){
        return await Post(ctx);
    },
    async checkFail(ctx){
        return await Post(ctx);
    },
    async autoCheckFail(ctx){
        return await Post(ctx);
    },
    async updateReport(ctx){
        return await Post(ctx);
    },
    async updateFollowUp(ctx){
        return await Post(ctx);
    },
    async exportData(ctx){
        ctx.params.name = "預約訂單";
        return await exportData(ctx);
    },
    async onShelfList(ctx){
        return await Get(ctx);
    },
    async cancelOrder(ctx){
        return await Post(ctx);
    },
    async info(ctx){
        return await Get(ctx);
    },
    async createHook(ctx){
        return await Post(ctx)
    },
    async getHook(ctx){
        return await Get(ctx);
    },
    async deleteHook(ctx){
        return await Post(ctx);
    },
    async updateHook(ctx){
        return await Post(ctx);
    },
    async getPaymentInfo(ctx){
        return await Get(ctx);
    }
}));
