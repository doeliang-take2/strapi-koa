'use strict';

/**
 * clinic controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Get, Post, exportData } = require('../../../util/RegistryRestTemplate')


module.exports = createCoreController('api::clinic.clinic',({strapi})=>({
    async page(ctx){
        return await Post(ctx)
    },
    async list(ctx){
        return await Post(ctx)
    },
    async info(ctx){
        return await Get(ctx)
    },
    async add(ctx){
        return await Post(ctx)
    },
    async update(ctx){
        return await Post(ctx)
    },
    async delete(ctx){
        return await Post(ctx)
    },
    async doctorList(ctx){
        return await Post(ctx)
    },
    async getAllTime(ctx){
        return await Post(ctx)
    },
    async getPrice(ctx){
        return await Post(ctx)
    },
    async onShelf(ctx){
        return await Post(ctx)
    },
    async offShelf(ctx){
        return await Post(ctx)
    },
    async infoDetail(ctx){
        return await Post(ctx)
    },
    async incPosition(ctx){
        return await Post(ctx)
    },
    async decPosition(ctx){
        return await Post(ctx)
    },
    async exportData(ctx){
        ctx.params.name = "診所管理";
        return await exportData(ctx)
    }
}));
