module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/agreement/agreementInfo/onShelf",
        handler: "sys-agreement.onShelf"
      },
      {
        method: "POST",
        path: "/admin/agreement/agreementInfo/offShelf",
        handler: "sys-agreement.offShelf"
      },
      {
        method: "POST",
        path: "/admin/agreement/agreementInfo/page",
        handler: "sys-agreement.page"
      },
      {
        method: "GET",
        path: "/admin/agreement/agreementInfo/info",
        handler: "sys-agreement.info"
      },
      {
        method: "POST",
        path: "/admin/agreement/agreementInfo/add",
        handler: "sys-agreement.add"
      },
      {
        method: "POST",
        path: "/admin/agreement/agreementInfo/update",
        handler: "sys-agreement.update"
      },
      {
        method: "GET",
        path: "/api/v1/app/agreements/info",
        handler: "sys-agreement.info"
      },
      {
        method: "POST",
        path: "/api/v1/app/agreements/page",
        handler: "sys-agreement.page"
      },
      {
        method: "POST",
        path: "/api/v1/app/agreements/list",
        handler: "sys-agreement.list"
      }
    ]
}