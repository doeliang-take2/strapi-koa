'use strict';

/**
 * sys-faq controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const { Get,Post } = require('../../../util/RegistryRestTemplate');
const {format,parseISO} = require('date-fns');


module.exports = createCoreController('api::sys-faq.sys-faq',({strapi})=>({
    async onShelf(ctx){
        return Post(ctx)
    },
    async offShelf(ctx){
        return Post(ctx)
    },
    async incPosition(ctx){
        return Post(ctx)
    },
    async decPosition(ctx){
        return Post(ctx)
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
        delete ctx.request.body.updateTime
        ctx.request.body.user = ctx.request.body.userName
        return Post(ctx)
    },
}));
