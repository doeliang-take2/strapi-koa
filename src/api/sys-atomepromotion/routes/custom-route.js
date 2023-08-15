module.exports = {
    routes: [
      {
        method: "GET",
        path: "/admin/atomePromotion/atomePromotionInfo/getData",
        handler: "sys-atomepromotion.getData"
      },
      {
        method: "POST",
        path: "/admin/atomePromotion/atomePromotionInfo/saveData",
        handler: "sys-atomepromotion.saveData"
      }
    ]
}