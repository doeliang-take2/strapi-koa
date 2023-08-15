'use strict';

/**
 * off-contactus controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const {Post,Get} = require('../../../util/RegistryRestTemplate')


module.exports = createCoreController('api::off-contactus.off-contactus',({strapi})=>({
    async page(ctx){
        return Post(ctx)
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
