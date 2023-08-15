module.exports = {
    routes:[
        {
            method: "POST",
            path: "/admin/order/orderInfo/page",
            handler: "order.page"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/update",
            handler: "order.update"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/list",
            handler: "order.list"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/add",
            handler: "order.add"
        },
        {
            method: "GET",
            path: "/admin/order/orderInfo/info",
            handler: "order.info"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/orderInfo",
            handler: "order.orderInfo"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/changeTime",
            handler: "order.changeTime"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/checkSuccess",
            handler: "order.checkSuccess"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/checkFail",
            handler: "order.checkFail"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/autoCheckFail",
            handler: "order.autoCheckFail"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/updateReport",
            handler: "order.updateReport"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/updateFollowUp",
            handler: "order.updateFollowUp"
        },
        {
            method: "POST",
            path: "/admin/order/orderInfo/exportData",
            handler: "order.exportData"
        },
        {
            method: "GET",
            path: "/admin/order/orderInfo/onShelfList",
            handler: "order.onShelfList"
        },
        {
            method: "POST",
            path: "/v1/app/auth/orders/page",
            handler: "order.page"
        },
        {
            method: "POST",
            path: "/v1/app/auth/orders/add",
            handler: "order.add"
        },
        {
            method: "POST",
            path: "/v1/app/auth/orders/update",
            handler: "order.update"
        },
        {
            method: "POST",
            path: "/v1/app/auth/orders/cancelOrder",
            handler: "order.cancelOrder"
        },
        {
            method: "GET",
            path: "/v1/app/auth/orders/info",
            handler: "order.info"
        },
        {
            method: "POST",
            path: "/v1/app/auth/orders/createHook",
            handler: "order.createHook"
        },
        {
            method: "GET",
            path: "/v1/app/auth/orders/getHook",
            handler: "order.getHook"
        },
        {
            method: "POST",
            path: "/v1/app/auth/orders/deleteHook",
            handler: "order.deleteHook"
        },
        {
            method: "POST",
            path: "/v1/app/auth/orders/updateHook",
            handler: "order.updateHook"
        },
        {
            method: "GET",
            path: "/v1/app/auth/orders/getPaymentInfo",
            handler: "order.getPaymentInfo"
        }
    ]
}