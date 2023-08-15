module.exports = {
    routes: [
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/page",
        handler: "doctor.page"
      },
      {
        method: "GET",
        path: "/admin/doctor/doctorInfo/info",
        handler: "doctor.info"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/update",
        handler: "doctor.update"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/add",
        handler: "doctor.add"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/delete",
        handler: "doctor.delete"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/list",
        handler: "doctor.list"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/onShelf",
        handler: "doctor.onShelf"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/offShelf",
        handler: "doctor.offShelf"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/exportData",
        handler: "doctor.exportData"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/incPosition",
        handler: "doctor.incPosition"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/decPosition",
        handler: "doctor.decPosition"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/getFullTime",
        handler: "doctor.getFullTime"
      },
      {
        method: "GET",
        path: "/admin/doctor/doctorInfo/getListByClinicId",
        handler: "doctor.getListByClinicId"
      },
      {
        method: "GET",
        path: "/admin/doctor/doctorInfo/getAvailablePackage",
        handler: "doctor.getAvailablePackage"
      },
      {
        method: "POST",
        path: "/admin/doctor/doctorInfo/initialData",
        handler: "doctor.initialData"
      },
    ]
}