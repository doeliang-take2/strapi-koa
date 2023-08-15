'use strict';

/**
 * dashboard controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Get } = require('../../../util/RegistryRestTemplate')

module.exports = createCoreController('api::dashboard.dashboard',({strapi})=>({
    async getData(ctx){
        return await Get(ctx)
    }
}));
