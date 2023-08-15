'use strict';

const { Post } = require('../../../util/RegistryRestTemplate');

/**
 * sys-faqtype controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sys-faqtype.sys-faqtype',({strapi})=>({
    async incPosition(ctx){
        return Post(ctx)
    },
    async decPosition(ctx){
        return Post(ctx)
    },
    async list(ctx){
        return Post(ctx)
    },
    async page(ctx){
        return Post(ctx)
    },
    async add(ctx){
        return Post(ctx)
    },
    async update(ctx){
        return Post(ctx)
    },
    async delete(ctx){
        console.log(ctx)
        return Post(ctx)
    }
}));
