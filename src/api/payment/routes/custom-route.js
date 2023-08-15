module.exports = {
  routes: [
    {
      method: "POST",
      path: "/admin/payment/adminPayment/page",
      handler: "payment.page"
    },
    {
      method: "POST",
      path: "/admin/payment/adminPayment/list",
      handler: "payment.list"
    },
    {
      method: "GET",
      path: "/admin/payment/adminPayment/info",
      handler: "payment.info"
    },
    {
      method: "POST",
      path: "/admin/payment/adminPayment/payment/refund",
      handler: "payment.refund"
    },
    {
      method: "POST",
      path: "/admin/payment/adminPayment/exportData",
      handler: "payment.exportData"
    },
    {
      method: "POST",
      path: "/admin/payment/adminPayment/refundByAlternative",
      handler: "payment.refundByAlternative"
    },
    {
      method: "GET",
      path: "/admin/payment/adminPayment/createProduct",
      handler: "payment.createProduct"
    }
  ]
}