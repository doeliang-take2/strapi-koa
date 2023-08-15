module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/applyPartner/applyPartnerInfo/page",
        handler: "off-applypartner.page"
      },
      {
        method: "POST",
        path: "/admin/applyPartner/applyPartnerInfo/add",
        handler: "off-applypartner.add"
      },
      {
        method: "GET",
        path: "/admin/applyPartner/applyPartnerInfo/info",
        handler: "off-applypartner.info"
      },
      {
        method: "POST",
        path: "/admin/applyPartner/applyPartnerInfo/update",
        handler: "off-applypartner.update"
      },
      {
        method: "POST",
        path: "/admin/applyPartner/applyPartnerInfo/list",
        handler: "off-applypartner.list"
      },
      {
        method: "POST",
        path: "/admin/applyPartner/applyPartnerInfo/delete",
        handler: "off-applypartner.delete"
      }
    ]
}