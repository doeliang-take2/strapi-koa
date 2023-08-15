module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/add",
        handler: "clinic.add"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/delete",
        handler: "clinic.delete"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/update",
        handler: "clinic.update"
      },
      {
        method: "GET",
        path: "/admin/testCenter/testCenterInfo/info",
        handler: "clinic.info"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/page",
        handler: "clinic.page"
      },
      {
        method: "GET",
        path: "/admin/testCenter/testCenterInfo/list",
        handler: "clinic.list"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/onShelf",
        handler: "clinic.onShelf"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/offShelf",
        handler: "clinic.offShelf"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/infoDetail",
        handler: "clinic.infoDetail"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/incPosition",
        handler: "clinic.incPosition"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/decPosition",
        handler: "clinic.decPosition"
      },
      {
        method: "POST",
        path: "/admin/testCenter/testCenterInfo/exportData",
        handler: "clinic.exportData"
      },
      {
        method: "GET",
        path: "/v1/app/testCenters/info",
        handler: "clinic.info"
      },
      {
        method: "POST",
        path: "/v1/app/testCenters/page",
        handler: "clinic.page"
      },
      {
        method: "POST",
        path: "/v1/app/testCenters/list",
        handler: "clinic.list"
      },
      {
        method: "POST",
        path: "/v1/app/testCenters/doctorList",
        handler: "clinic.doctorList"
      },
      {
        method: "POST",
        path: "/v1/app/testCenters/getAllTime",
        handler: "clinic.getAllTime"
      },
      {
        method: "POST",
        path: "/v1/app/testCenters/getPrice",
        handler: "clinic.getPrice"
      },
    ]
  }