'use strict';

const { getService } = require('@strapi/plugin-users-permissions/server/utils');
const menu = require('../../menu/routes/menu');

/**
 * sys-role service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::sys-role.sys-role',({strapi})=>({
    async convertInfo(ctx){
        //将cool-admin的上传转化为strapi格式
        const menuIdList = await strapi.entityService.findMany('api::menu.menu',{
            fields: ['path'],
            filters:{
                name:String(ctx.request.body.menuNames).split(',')
            }
        }) //根据提交的菜单信息，取出对应的strapi格式的api菜单

        // const allowmenu = ['plugin::users-permissions']
        const allowmenu = []

        menuIdList.forEach(e=>{
            allowmenu.push(e.path)
        })

        // console.log(allowmenu)
        const permissionsSet = await getService('users-permissions').getActions()
        // console.log(permissionsSet)
        allowmenu.forEach(e=>{
            let menu = Object.keys(permissionsSet[e]["controllers"])
            menu.forEach(f=>{
                let permisssions = Object.keys(permissionsSet[e]["controllers"][f])
                permisssions.forEach(t=>{
                    permissionsSet[e].controllers[f][t]['enabled'] = true
                })
            })
        })
        if(allowmenu.includes('api::payment')){
            permissionsSet['api::order']['controllers']['order']['orderInfo']['enabled'] = true
        }
        if(allowmenu.includes('api::customer')){
            permissionsSet['api::sys-usertag']['controllers']['sys-usertag']['page']['enabled'] = true
        }
        if(allowmenu.includes('api::order')){
            permissionsSet['api::sys-orderfollowup']['controllers']['sys-orderfollowup']['page']['enabled'] = true
        }
        if(allowmenu.includes('api::sys-faq')){
            permissionsSet['api::sys-faqtype']['controllers']['sys-faqtype']['page']['enabled'] = true
        }
        if(allowmenu.includes('api::sys-user')){
            permissionsSet['api::sys-role']['controllers']['sys-role']['getPage']['enabled'] = true
        }
        if(allowmenu.includes('api::order')){
            permissionsSet['api::doctor']['controllers']['doctor']['getAvailablePackage']['enabled'] = true
            permissionsSet['api::doctor']['controllers']['doctor']['getListByClinicId']['enabled'] = true
            permissionsSet['api::doctor']['controllers']['doctor']['getFullTime']['enabled'] = true
            permissionsSet['api::doctor']['controllers']['doctor']['info']['enabled'] = true
        }

        //这里权限必须包含所有权限的状态，否则会将不加的权限统一只为空
        permissionsSet['plugin::users-permissions']['controllers']['auth']['getPermMenu']['enabled'] = true
        permissionsSet['plugin::users-permissions']['controllers']['auth']['getPerson']['enabled'] = true
        permissionsSet['plugin::users-permissions']['controllers']['auth']['refreshToken']['enabled'] = true
        permissionsSet['plugin::users-permissions']['controllers']['auth']['personUpdate']['enabled'] = true
        permissionsSet['plugin::upload']['controllers']['content-api']['up']['enabled'] = true

        //三个默认登录的所需的接口和刷新token以及上传的

        // console.log(permissionsSet)

        // ctx.request.body.id ? await getService('role').updateRole(ctx.request.body.id,{"permissions":permissionsSet,...ctx.request.body}) : 
        // await getService('role').createRole({"permissions":permissionsSet,...ctx.request.body})
        // // const data = await getService('role').updateRole(ctx.request.body.id,{"permissions":permissionsSet,...ctx.request.body})//创建角色
        // await strapi.query('plugin::users-permissions.role').update({
        //     where: { id: ctx.request.body.id },
        //     data: {remark:ctx.request.body.remark}
        // })//默认不更新remark，为了兼容之前的字段，需要手动修改。
        return permissionsSet
    },
    async convertStrapi(ctx){
        //将strapi格式转为cool-admin
        const permissions = ctx.request.body.permissions 
        const menus = []
        Object.keys(permissions).forEach(e=>{
            let controllers = Object.keys(permissions[e]['controllers'])
            let index = 0 
            controllers.forEach(t=>{
                let operates = Object.keys(permissions[e]['controllers'][t])
                operates.forEach(f=>{
                    // console.log(permissions[e]['controllers'][t][f]['enabled'])
                    permissions[e]['controllers'][t][f]['enabled'] ? null : index++
                })
            })
            if(index==0){
                menus.push(e)
            }
        })
        // console.log(menus)
        const menuNameList = await strapi.entityService.findMany('api::menu.menu',{
            fields: ['name'],
            filters:{
                path:menus
            }
        })
        return menuNameList
    },
    async deleteRole(ctx){
        await strapi.controller('plugin::users-permissions.role').deleteRole(ctx)  
    }
}));
