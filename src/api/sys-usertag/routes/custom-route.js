module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/userTag/userTagInfo/exportData",
        handler: "sys-usertag.exportData"
      },
      {
        method: "POST",
        path: "/admin/userTag/userTagInfo/page",
        handler: "sys-usertag.page"
      },
      {
        method: "POST",
        path: "/admin/userTag/userTagInfo/add",
        handler: "sys-usertag.add"
      },
      {
        method: "POST",
        path: "/admin/userTag/userTagInfo/delete",
        handler: "sys-usertag.add"
      },
      {
        method: "POST",
        path: "/admin/userTag/userTagInfo/update",
        handler: "sys-usertag.add"
      }
    ]
}