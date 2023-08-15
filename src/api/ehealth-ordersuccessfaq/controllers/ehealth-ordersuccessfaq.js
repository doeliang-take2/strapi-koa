'use strict';

/**
 * ehealth-ordersuccessfaq controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Post,exportData } = require('../../../util/RegistryRestTemplate')


module.exports = createCoreController('api::ehealth-ordersuccessfaq.ehealth-ordersuccessfaq',({strapi})=>({
    async exportData(ctx){
        ctx.params.name = "預約成功調研"
        return await exportData(ctx)
    },
    async page(ctx){
        return await Post(ctx)
    },
    async add(ctx){
        return await Post(ctx)
    },
    async info(ctx){
        return await Get(ctx)
    },
    async list(ctx){
        return await Post(ctx)
    },
    async update(ctx){
        return await Post(ctx)
    }
}));
