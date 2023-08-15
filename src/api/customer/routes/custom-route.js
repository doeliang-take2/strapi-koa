module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/user/userInfo/add",
        handler: "customer.add"
      },
      {
        method: "POST",
        path: "/admin/user/userInfo/delete",
        handler: "customer.delete"
      },
      {
        method: "POST",
        path: "/admin/user/userInfo/update",
        handler: "customer.update"
      },
      {
        method: "POST",
        path: "/admin/user/userInfo/page",
        handler: "customer.page"
      },
      {
        method: "GET",
        path: "/admin/user/userInfo/info",
        handler: "customer.info"
      },
      {
        method: "POST",
        path: "/admin/user/userInfo/list",
        handler: "customer.list"
      },
      {
        method: "POST",
        path: "/admin/user/userInfo/setUserStatus",
        handler: "customer.setUserStatus"
      },
      {
        method: "POST",
        path: "/admin/user/userInfo/exportData",
        handler: "customer.exportData"
      },
      {
        method: "POST",
        path: "/admin/user/userInfo/submitFollowUp",
        handler: "customer.submitFollowUp"
      },
      {
        method: "POST",
        path: "/admin/user/userInfo/submitUserTag",
        handler: "customer.submitUserTag"
      }
    ]
}