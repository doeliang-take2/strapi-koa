
const {person} = require('../../../util/models');
const _ = require('lodash');
const util = require('../../../util/models')


'use strict';
const getCode = name => {
    return strapi.plugin('users-permissions').service(name);
    
};

async function getPermissionsByRole(id){
    const da = await strapi.db.connection.from("up_permissions_role_links as a").select({
        action: "action"
      }).leftJoin('up_permissions as b', function() {
        this
          .on('a.permission_id', '=', 'b.id')
      }).where('role_id','=',id)
    return da
}


async function getPerson(ctx){
    // console.log(ctx.state.route.config.auth);
    // console.log(ctx.state)
    const data = person(ctx.state.user)

    return {code:1000,data:data,message:"success"}
};

async function getPermmenu(ctx){
    const data = await strapi.db.connection.from("up_permissions_role_links as a").select({
        action: "action"
      }).leftJoin('up_permissions as b', function() {
        this
          .on('a.permission_id', '=', 'b.id')
      }).where('role_id','=',_.get(ctx,'state.user.role.id',0))
      .andWhere('action','like','api::%')

    const perms = []
    const menus = []

    const menuFamily = {}        
    data?.forEach(e=>{
        const operate = String(e.action).split(".")[2]
        const menu = String(e.action).split(".")[1]
        const parent = menu.split("-")[0]
        const children = menu.split("-")[1]

        if(parent&&children===undefined){
          menuFamily[parent] ? menuFamily[parent].push(operate) : menuFamily[parent]=[operate]
        }

        if(parent&&children!==undefined){
          menuFamily[parent+"-"+children] ? menuFamily[parent+"-"+children].push(operate) : menuFamily[parent+"-"+children]=[operate]
        }

        menus.push(menu)
        perms.push(e.action)
    })

    delete menuFamily.undefined
    delete menuFamily.admin
    delete menuFamily.menu  //去除业务模块之外的菜单，menuFamily包含父子级别的模块
    
    const allowmenu = []
    const allowmenuParent = []

    Object.keys(menuFamily).forEach((key,index)=>{//

      const check = util.menuOperation.filter(t => !menuFamily[key].includes(t)).length==0 //该菜单不包含增删改查的操作的数量为0，即为该角色能够操作该菜单，所以前端需要展示
      check ? allowmenu.push(util.menuMap[key]) : null //check为true，可以插入allowmenu的部分才被考虑allowmenuParent
      if(String(key).indexOf("-")>=0&&check&&!allowmenuParent.includes(String(key).split("-")[0])){
        allowmenuParent.push(String(key).split("-")[0])
      }
      // let parentId = null
      // if(String(key).indexOf("-")>=0){
      //   let item = util.menuExample(String(key).split('-')[0],parseInt(util.menuGroup[String(key).split('-')[0]]))
      //   parentId = parseInt(util.menuGroup[String(key).split('-')[0]])
      //   if(menup.includes(String(key).split('-')[0])){
      //     menup.filter(t=>t!=String(key).split('-')[0])
      //     allowmenu.push(item)
      //   }
      //   // if(!allowmenu.includes(item)){
      //   // console.log(item)
      //   // allowmenu.push(util.menuExample(String(key).split('-')[0],parseInt(util.menuGroup[String(key).split('-')[0]])))
      //   // }
      // }
      // check ? allowmenu.push(util.menuExample(key,index,parentId)) : null
    })

    const menuSet = await strapi.entityService.findMany('api::menu.menu',{
      filters:{
        $and:[
          {
            $or:[
            {name:allowmenu},
            {parentpath:allowmenuParent},
            ]
          },
          {
            router:{
              $ne: '/'
            }
          }
        ]
      }
    })

    // console.log(allowmenu)
    // console.log(allowmenuParent)


    // const menus = await strapi.db.connection.from("base_sys_menu as a").select({
    //     id: "a.id",
    //     name : "name",
    //     parentId : "parentId"
    // }).join('base_sys_role_menu as b',function(){
    //   this.on('a.id','=','b.menuId')
    // }).where('b.roleId','=',_.get(ctx,'state.user.role.id',0))


    return {code:1000,data:{"menus":menuSet,"perms":perms},message:"success"}
};

async function personUpdate(ctx){
  strapi.entityService.update('plugin::users-permissions.user', ctx.state.user.id, {
    data: ctx.request.body,
  });  
  return {code:1000,message:"success"}
};

module.exports = {
    getCode,
    getPerson,
    getPermmenu,
    getPermissionsByRole,
    personUpdate
};