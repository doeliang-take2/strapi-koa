'use strict';

/**
 * doctor controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Post,Get,exportData } = require('../../../util/RegistryRestTemplate')


module.exports = createCoreController('api::doctor.doctor',({strapi})=>({
    async page(ctx){
        return await Post(ctx);
    },
    async info(ctx){
        return await Get(ctx);
    },
    async update(ctx){
        return await Post(ctx);
    },
    async add(ctx){
        return await Post(ctx);
    },
    async list(ctx){
        return await Post(ctx)
    },
    async delete(ctx){
        return await Post(ctx)
    },
    async onShelf(ctx){
        return await Post(ctx);
    },
    async exportData(ctx){
        ctx.params.name = "醫生管理";
        return await exportData(ctx);
    },
    async offShelf(ctx){
        return await Post(ctx);
    },
    async incPosition(ctx){
        return await Post(ctx);
    },
    async decPosition(ctx){
        return await Post(ctx);
    },
    async getFullTime(ctx){
        return await Post(ctx);
    },
    async getListByClinicId(ctx){
        return await Get(ctx);
    },
    async getAvailablePackage(ctx){
        return await Get(ctx);
    },
    async initialData(ctx){
        return await Post(ctx);
    },
}));
