module.exports = {
  routes: [
    {
      method: "POST",
      path: "/admin/ehealthFaq/applyRefundFaq/exportData",
      handler: "ehealth-applyrefundfaq.exportData"
    },
    {
      method: "POST",
      path: "/admin/ehealthFaq/applyRefundFaq/page",
      handler: "ehealth-applyrefundfaq.page"
    },
    {
      method: "POST",
      path: "/admin/ehealthFaq/applyRefundFaq/add",
      handler: "ehealth-applyrefundfaq.add"
    },
    {
      method: "GET",
      path: "/admin/ehealthFaq/applyRefundFaq/info",
      handler: "ehealth-applyrefundfaq.info"
    },
    {
      method: "POST",
      path: "/admin/ehealthFaq/applyRefundFaq/update",
      handler: "ehealth-applyrefundfaq.update"
    },
    {
      method: "POST",
      path: "/admin/ehealthFaq/applyRefundFaq/list",
      handler: "ehealth-applyrefundfaq.list"
    }
  ]
}