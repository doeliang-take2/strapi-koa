'use strict';

const user = require('@strapi/plugin-users-permissions/server/services/user');
const { getService } = require('@strapi/plugin-users-permissions/server/utils');
const {format, parseISO} = require('date-fns');

/**
 * sys-user controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::sys-user.sys-user',({strapi})=>({
    async getPage(ctx){
        let order = ctx.request.body.order
        let page = ctx.request.body.page
        let size = ctx.request.body.size
        let sort = ctx.request.body.sort || 'desc'

        const users = await strapi.entityService.findMany('plugin::users-permissions.user',{
            sort: { createdAt: sort },
            filters:{
                username : {
                    $ne: 'admin'
                }
            },
            populate: '*'
        })
        users.filter(t=>{
            t.roleName = t.role?.name || null
            t.createTime ? t.createTime = format(parseISO(t['createTime']),'yyyy-MM-dd HH:mm:ss') :
            t.createTime = format(parseISO(t['createdAt']),'yyyy-MM-dd HH:mm:ss') 
        })
        return {code:1000,data:{list:users.slice((page-1)*size,page*10),pagination:{page:page,size:size,total:users.length}},message:"success"}
    },

    async getInfo(ctx){
        let id = parseInt(ctx.request.query.id)
        // console.log(id)

        const user = await strapi.entityService.findOne('plugin::users-permissions.user',id,{
            populate:'*'
        })

        user.roleIdList = user.role?.id ? [user.role.id]:[]
        user.password = ""
        // user.createTime = user.createdAt
        // user.updateTime = user.updatedAt

        return {code:1000,data:{data:user},message:"success"}
    },
    async addUser(ctx){
        
        ctx.request.body.role = {disconnect: [], connect: [{id: ctx.request.body.roleIdList[0], position: {end: true}}]}
        ctx.request.body.email = ctx.request.body.username + "@gmail.com"
        const a = await strapi.query('plugin::users-permissions.role').findMany({
            where:{
                id:{
                    $in:ctx.request.body.roleIdList
                }
            }
        })
        let roleName = ""
        a.forEach(element => {
            roleName = roleName+element.name+','
        });
        ctx.request.body.roleName = roleName.slice(0,roleName.length-1) //添加多一个字段存角色名
        ctx.request.body.createTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        ctx.request.body.updateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        const data = await strapi.service('api::sys-user.sys-user').addUser(ctx)
        // console.log(data)
        // console.log(users)
        // ctx.request.body.role = {disconnect: [], connect: [{id: 1, position: {end: true}}]}
        // ctx.request.body.blocked = false
        // ctx.request.body.confirmed = true
        // const data = await getService('user').add(ctx.request.body)
        // console.log(data)
        return {code:1000,message:"success"}
    },
    async updateUser(ctx){
        const user = await strapi.query('plugin::users-permissions.user').findMany({
            populate: true,
            where:{
                id:ctx.request.body.id
            }
        })
        const user1 = await strapi.query('plugin::users-permissions.user').findMany({
            populate: true,
            where:{
                username:ctx.request.body.username
            }
        })

        if(user1.length===1&&user1[0].id!==ctx.request.body.id){
            return {code:1001,message:'请选择正确用户'}
        }
        ctx.params.id = ctx.request.body.id
        ctx.request.body.updatedBy = null
        ctx.request.body.createdBy = null
        if(ctx.request.body.email===null){
            ctx.request.body.email = ctx.request.body.username+"@gmail.com"
        }
        ctx.request.body.role = {disconnect: [user[0].role?.id], connect: [{id: ctx.request.body.roleIdList[0], position: {end: true}}]}
        // 为了兼容strapi的参数，做一些自动修改
        await strapi.service('api::sys-user.sys-user').updateUser(ctx)
        return {code:1000,message:"success"}
    },
    async deleteUser(ctx){
        const id = ctx.request.body.ids[0]
        const data = await getService('user').remove({ id });
        return {code:1000,message:"success"}
    },
    async onShelf(ctx){

        const data = await strapi.entityService.update('plugin::users-permissions.user',ctx.request.body.id,{
            data:{
                status:1
            }
        })
        if(!data){
            return {code:1001,message:"该用户不存在"}
        }
        return {code:1000,message:"success"}
    },
    async offShelf(ctx){
        const data = await strapi.entityService.update('plugin::users-permissions.user',ctx.request.body.id,{
            data:{
                status:0
            }
        })
        // console.log(data)
        if(!data){
            return {code:1001,message:"该用户不存在"}
        }
        return {code:1000,message:"success"}
    }
}));
