module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/quiz/quiz/page",
        handler: "off-quiz.page"
      },
      {
        method: "POST",
        path: "/admin/quiz/quiz/add",
        handler: "off-quiz.add"
      },
      {
        method: "GET",
        path: "/admin/quiz/quiz/info",
        handler: "off-quiz.info"
      },
      {
        method: "POST",
        path: "/admin/quiz/quiz/update",
        handler: "off-quiz.update"
      },
      {
        method: "POST",
        path: "/admin/quiz/quiz/list",
        handler: "off-quiz.list"
      },
      {
        method: "POST",
        path: "/admin/quiz/quiz/delete",
        handler: "off-quiz.delete"
      }
    ]
}