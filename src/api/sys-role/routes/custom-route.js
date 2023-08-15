module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/base/sys/role/page",
        handler: "sys-role.getPage"
      },
      {
        method: "GET",
        path: "/admin/base/sys/role/info",
        handler: "sys-role.getInfo"
      },
      {
        method: "POST",
        path: "/admin/base/sys/menu/list",
        handler: "sys-role.getMenuList"
      },
      {
        method: "POST",
        path: "/admin/base/sys/role/update",
        handler: "sys-role.updateRole"
      },
      {
        method: "POST",
        path: "/admin/base/sys/role/add",
        handler: "sys-role.addRole"
      },
      {
        method: "POST",
        path: "/admin/base/sys/role/delete",
        handler: "sys-role.deleteRole"
      }
    ]
}