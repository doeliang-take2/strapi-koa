module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/contactUs/contactUsInfo/page",
        handler: "off-contactus.page"
      },
      {
        method: "POST",
        path: "/admin/contactUs/contactUsInfo/add",
        handler: "off-contactus.add"
      },
      {
        method: "GET",
        path: "/admin/contactUs/contactUsInfo/info",
        handler: "off-contactus.info"
      },
      {
        method: "POST",
        path: "/admin/contactUs/contactUsInfo/update",
        handler: "off-contactus.update"
      },
      {
        method: "POST",
        path: "/admin/contactUs/contactUsInfo/list",
        handler: "off-contactus.list"
      },
      {
        method: "POST",
        path: "/admin/contactUs/contactUsInfo/delete",
        handler: "off-contactus.delete"
      }
    ]
}