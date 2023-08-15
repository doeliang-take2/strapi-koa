module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/orderFollowUp/orderFollowUpInfo/page",
        handler: "sys-orderfollowup.page"
      },
      {
        method: "POST",
        path: "/admin/orderFollowUp/orderFollowUpInfo/add",
        handler: "sys-orderfollowup.add"
      },
      {
        method: "POST",
        path: "/admin/orderFollowUp/orderFollowUpInfo/delete",
        handler: "sys-orderfollowup.delete"
      },
      {
        method: "POST",
        path: "/admin/orderFollowUp/orderFollowUpInfo/update",
        handler: "sys-orderfollowup.update"
      }
    ]
}