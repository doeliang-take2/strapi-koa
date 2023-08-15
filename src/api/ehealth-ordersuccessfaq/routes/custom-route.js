module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/ehealthFaq/orderSuccessFaq/exportData",
        handler: "ehealth-ordersuccessfaq.exportData"
      },
      {
        method: "POST",
        path: "/admin/ehealthFaq/orderSuccessFaq/page",
        handler: "ehealth-ordersuccessfaq.page"
      },
      {
        method: "POST",
        path: "/admin/ehealthFaq/orderSuccessFaq/add",
        handler: "ehealth-ordersuccessfaq.add"
      },
      {
        method: "GET",
        path: "/admin/ehealthFaq/orderSuccessFaq/info",
        handler: "ehealth-ordersuccessfaq.info"
      },
      {
        method: "POST",
        path: "/admin/ehealthFaq/orderSuccessFaq/update",
        handler: "ehealth-ordersuccessfaq.update"
      },
      {
        method: "POST",
        path: "/admin/ehealthFaq/orderSuccessFaq/list",
        handler: "ehealth-ordersuccessfaq.list"
      }
    ]
}