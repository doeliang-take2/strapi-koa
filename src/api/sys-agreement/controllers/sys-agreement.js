'use strict';

/**
 * sys-agreement controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Get,Post } = require('../../../util/RegistryRestTemplate')
const {format,parseISO} = require('date-fns');


module.exports = createCoreController('api::sys-agreement.sys-agreement',({strapi})=>({
    async onShelf(ctx){
        return await Post(ctx)
    },
    async offShelf(ctx){
        return await Post(ctx)
    },
    async list(ctx){
        return await Post(ctx)
    },
    async page(ctx){
        return await Post(ctx)
    },
    async info(ctx){
        const data = await Get(ctx)
        let createTime = parseISO(data.data.createTime)
        let updateTime = parseISO(data.data.updateTime)
        console.log(createTime.getTimezoneOffset())
        if(createTime.getTimezoneOffset()==0){
            data.data.createTime = format(createTime.getTime()+8*60*60*1000,'yyyy-MM-dd HH:mm:ss')
            data.data.updateTime = format(updateTime.getTime()+8*60*60*1000,'yyyy-MM-dd HH:mm:ss')
        }
        return data
    },
    async add(ctx){
        return await Post(ctx)
    },
    async update(ctx){
        return await Post(ctx)
    }
}));
