module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/joinUs/joinUsInfo/page",
        handler: "off-joinus.page"
      },
      {
        method: "POST",
        path: "/admin/joinUs/joinUsInfo/add",
        handler: "off-joinus.add"
      },
      {
        method: "GET",
        path: "/admin/joinUs/joinUsInfo/info",
        handler: "off-joinus.info"
      },
      {
        method: "POST",
        path: "/admin/joinUs/joinUsInfo/update",
        handler: "off-joinus.update"
      },
      {
        method: "POST",
        path: "/admin/joinUs/joinUsInfo/list",
        handler: "off-joinus.list"
      },
      {
        method: "POST",
        path: "/admin/joinUs/joinUsInfo/delete",
        handler: "off-joinus.delete"
      }
    ]
}