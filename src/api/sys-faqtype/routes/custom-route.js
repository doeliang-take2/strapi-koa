module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/faqType/faqTypeInfo/page",
        handler: "sys-faqtype.page"
      },
      {
        method: "POST",
        path: "/admin/faqType/faqTypeInfo/add",
        handler: "sys-faqtype.add"
      },
      {
        method: "POST",
        path: "/admin/faqType/faqTypeInfo/update",
        handler: "sys-faqtype.update"
      },
      {
        method: "POST",
        path: "/admin/faqType/faqTypeInfo/list",
        handler: "sys-faqtype.list"
      },
      {
        method: "POST",
        path: "/admin/faqType/faqTypeInfo/delete",
        handler: "sys-faqtype.delete"
      },
      {
        method: "POST",
        path: "/admin/faqType/faqTypeInfo/incPosition",
        handler: "sys-faqtype.incPosition"
      },
      {
        method: "POST",
        path: "/admin/faqType/faqTypeInfo/decPosition",
        handler: "sys-faqtype.decPosition"
      }
    ]
}