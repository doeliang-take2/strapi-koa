'use strict';

/**
 * off-applypartner controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const {Post,Get} = require('../../../util/RegistryRestTemplate')

module.exports = createCoreController('api::off-applypartner.off-applypartner',({strapi})=>({
    async page(ctx){
        return await Post(ctx)
    },
    async add(ctx){
        return await Post(ctx)
    },
    async delete(ctx){
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
