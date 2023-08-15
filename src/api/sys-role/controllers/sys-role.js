'use strict';
const role = require('@strapi/plugin-users-permissions/server/services/role');
const { getService } = require('@strapi/plugin-users-permissions/server/utils');
const menu = require('../../menu/routes/menu');
const _ = require('lodash');


/**
 * sys-role controller
 */

const { createCoreController } = require('@strapi/strapi').factories;
const {format, parseISO} = require('date-fns');

module.exports = createCoreController('api::sys-role.sys-role',({strapi})=>({
    async getPage(ctx){
        let order = ctx.request.body.order === "createdTime" ? "createdAt" : ctx.request.body.order || null
        let page = parseInt(ctx.request.body.page)||null
        let size = parseInt(ctx.request.body.size)||null
        let sortCondit = ctx.request.body.sort || 'desc'
        // console.log(sortCondit)

        const roles = await strapi.entityService.findMany('plugin::users-permissions.role',{ 
            sort: {"createdAt":sortCondit},
            filters:{
                name:{
                    $notIn:['Authenticated','Public']
                }
            }
        });

        roles.forEach(e=>{
            e.createTime ? e.createTime = format(parseISO(e['createTime']),'yyyy-MM-dd HH:mm:ss') :
            e.createTime = format(parseISO(e['createdAt']),'yyyy-MM-dd HH:mm:ss') 
        })

        return {code:1000,data:{list:page?roles.slice((page-1)*size,page*10):roles,pagination:{page:page,size:size,total:roles.length}},message:"success"}

    },

    async getInfo(ctx){
        const roles = await getService('role').findOne(ctx.request.query.id)
        // console.log(String(roles.menuNames).split(','))

        const menuId = await strapi.entityService.findMany('api::menu.menu',{
            fields:['id','parentId'],
            filters:{
                name:String(roles.menuNames).split(',')
            }
          })

        const menuIdList = []
        menuId.forEach(element => {
            if(element.parentId&&!menuIdList.includes(parseInt(element.parentId))){
                menuIdList.push(parseInt(element.parentId))
            }
            menuIdList.push(parseInt(element.id))
        });
        roles.menuIdList = menuIdList
        return {code:1000,data:roles,message:"success"}

    },

    async getMenuList(ctx){
        const menuIdList = await strapi.entityService.findMany('api::menu.menu',{
        
          })
        //   console.log(menuIdList)
        return {code:1000,data:menuIdList,message:"success"}
    },

    async updateRole(ctx){
        const dup = await strapi.query('plugin::users-permissions.role').findMany({
            where:{name:ctx.request.body.name}
        })
        if(dup.length===1&&dup[0]?.id!==ctx.request.body.id){
            return {"code":1001,"message":"角色名稱重複"}
        }

        const permissionsSet = await strapi.service('api::sys-role.sys-role').convertInfo(ctx)
        ctx.params.role = ctx.request.body.id
        ctx.request.body['permissions'] = permissionsSet
        // ctx.request.body = {name:ctx.request.body.name,description:ctx.request.body.description,permissions:permissionsSet,users:[]}
        const data = await strapi.controller('plugin::users-permissions.role').updateRole(ctx)
        // const data = await getService('role').updateRole(ctx.request.body.id,{...ctx.request.body,"permissions":permissionsSet,...ctx.request.body})//更新角色
        await strapi.query('plugin::users-permissions.role').update({
            where: { id: ctx.request.body.id },
            data: {
                remark:ctx.request.body.remark,
                menuNames:ctx.request.body.menuNames
            }
        })//默认不更新cool-admin的remark，为了兼容之前的字段，需要手动修改。
        return {code:1000,permissionsSet,message:"success"}
    },
    async addRole(ctx){

        if (_.isEmpty(ctx.request.body)) {
            return {"code":1001,"message":"请输入角色信息"}
        }

        const dup = await strapi.query('plugin::users-permissions.role').findOne({
            where:{name:ctx.request.body.name}
        })

        if(dup){
            return {"code":1001,"message":"角色名稱重複"}
        }

        const permissionsSet = await strapi.service('api::sys-role.sys-role').convertInfo(ctx)
        ctx.request.body.description = ctx.request.body.remark
        ctx.request.body.createTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        ctx.request.body.updateTime = format(new Date(), 'yyyy-MM-dd HH:mm:ss');
        ctx.request.body.createOperator = ctx.state.user.username
        
        const data = await getService('role').createRole({"permissions":permissionsSet,...ctx.request.body})//增加角色

        const user = await strapi.query('plugin::users-permissions.role').findOne({
            where:{name:ctx.request.body.username}
        })
        
        return {code:1000,data:user,message:"success"}

    },
    async deleteRole(ctx){
        // console.log(ctx.request.body.ids[0])
        const role = await strapi.db.connection.from("up_users_role_links as t").select({roleId:'t.role_id'}).where('role_id','=',ctx.request.body.ids[0])
        // console.log(role)
        if(role.length>0){
            return {code:1001,message:"該角色已被使用，無法刪除"}
        }
        const data = await getService('role').deleteRole(ctx.request.body.ids) //重写后的删除角色方法
        return {code:1000,message:"success"}

    }
}));
