module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/base/sys/user/page",
        handler: "sys-user.getPage"
      },
      {
        method: "GET",
        path: "/admin/base/sys/user/info",
        handler: "sys-user.getInfo"
      },
      {
        method: "POST",
        path: "/admin/base/sys/user/add",
        handler: "sys-user.addUser"
      },
      {
        method: "POST",
        path: "/admin/base/sys/user/update",
        handler: "sys-user.updateUser"
      },
      {
        method: "POST",
        path: "/admin/base/sys/user/delete",
        handler: "sys-user.deleteUser"
      },
      {
        method: "POST",
        path: "/admin/base/sys/role/onShelf",
        handler: "sys-user.onShelf"
      },
      {
        method: "POST",
        path: "/admin/base/sys/role/offShelf",
        handler: "sys-user.offShelf"
      }
    ]
}