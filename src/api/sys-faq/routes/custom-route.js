module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/FAQ/faq/onShelf",
        handler: "sys-faq.onShelf"
      },
      {
        method: "POST",
        path: "/admin/FAQ/faq/offShelf",
        handler: "sys-faq.offShelf"
      },
      {
        method: "POST",
        path: "/admin/FAQ/faq/incPosition",
        handler: "sys-faq.incPosition"
      },
      {
        method: "POST",
        path: "/admin/FAQ/faq/decPosition",
        handler: "sys-faq.decPosition"
      },
      {
        method: "GET",
        path: "/admin/FAQ/faq/info",
        handler: "sys-faq.info"
      },
      {
        method: "POST",
        path: "/admin/FAQ/faq/list",
        handler: "sys-faq.list"
      },
      {
        method: "POST",
        path: "/admin/FAQ/faq/page",
        handler: "sys-faq.page"
      },
      {
        method: "POST",
        path: "/admin/FAQ/faq/add",
        handler: "sys-faq.add"
      },
      {
        method: "POST",
        path: "/admin/FAQ/faq/update",
        handler: "sys-faq.update"
      },
      {
        method: "GET",
        path: "/api/v1/app/faqs/info",
        handler: "sys-faq.info"
      },
      {
        method: "POST",
        path: "/api/v1/app/faqs/list",
        handler: "sys-faq.list"
      },
      {
        method: "POST",
        path: "/api/v1/app/faqs/page",
        handler: "sys-faq.page"
      },
    ]
}