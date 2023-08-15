'use strict';

/**
 * off-quiz controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Post } = require('../../../util/RegistryRestTemplate')

module.exports = createCoreController('api::off-quiz.off-quiz',({strapi})=>({
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
