'use strict';

/**
 * sys-atomepromotion controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const {Post,Get} = require('../../../util/RegistryRestTemplate')

module.exports = createCoreController('api::sys-atomepromotion.sys-atomepromotion',({strapi})=>({
    async getData(ctx){
        return Get(ctx)
    },
    async saveData(ctx){
        return Post(ctx)
    }
}));
