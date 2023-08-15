module.exports = {
  routes: [
    {
      method: "POST",
      path: "/admin/ehealthFaq/cancerOrderFaq/exportData",
      handler: "ehealth-cancerorderfaq.exportData"
    },
    {
      method: "POST",
      path: "/admin/ehealthFaq/cancerOrderFaq/page",
      handler: "ehealth-cancerorderfaq.page"
    },
    {
      method: "POST",
      path: "/admin/ehealthFaq/cancerOrderFaq/add",
      handler: "ehealth-cancerorderfaq.add"
    },
    {
      method: "GET",
      path: "/admin/ehealthFaq/cancerOrderFaq/info",
      handler: "ehealth-cancerorderfaq.info"
    },
    {
      method: "POST",
      path: "/admin/ehealthFaq/cancerOrderFaq/update",
      handler: "ehealth-cancerorderfaq.update"
    },
    {
      method: "POST",
      path: "/admin/ehealthFaq/cancerOrderFaq/list",
      handler: "ehealth-cancerorderfaq.list"
    }
  ]
}