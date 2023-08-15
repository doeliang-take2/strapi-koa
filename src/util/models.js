function person(person) {
    let data = {}
    data.createOperator = person.createOperator || null
    data.createTime = person.createdAt || null
    data.departmentId = person.departmentId || null
    data.email = person.email || null
    data.headImg = person.headImg || null
    data.id = person.id || null
    data.name = person.name || null
    data.nickName = person.nickName || null
    data.passwordV = person.passwordV || null
    data.phone = person.phone || null
    data.remark = person.remark || null
    data.socketId = person.socketId || null
    data.status = person.status || null
    data.updateTime = person.updatedAt || null
    data.userName = person.username || null
    data.addressPath = person.addressPath || null
    return data
}

function menuExample(e,index,parentId) {
    return{
        id: index,
        icon: null,
        createTime: null,
        keepAlive: 1,
        parentId: parentId||null,
        path: null,
        viewPath: null,
        type: 1,
        name: menuMap[e],
        icon: null,
        orderNum: null,
        isShow: 1,
        perms: null,
        router: null
    }
}

const menuOperation = [ 'find', 'findOne', 'create', 'update', 'delete' ]

const menuMap = {
    'dashboard':'工作台 ',
    'customer': '用戶管理',
    'clinic': '診所管理',
    'doctor': '醫生管理',
    'order': '预约订单',
    'payment': '退款管理',
    'ehealth': '問卷調研',
    'ehealth-ordersuccessfaq':'預約成功調研',
    'ehealth-applyrefundfaq':'申請退款調研',
    'ehealth-cancerorderfaq':'放棄下單調研',
    'sys': '设置',
    'sys-role':'角色管理',
    'sys-user':'用户权限',
    'sys-faq':'FAQ管理',
    'sys-agreement':'协议管理',
    'sys-usertag':'用戶標籤管理',
    'sys-orderfollowup':'訂單跟進管理',
    'sys-faqtype':'常見問題分類',
    'sys-atomepromotion':'Atome優惠設置',
    'off': '官網',
    'off-joinus':'加入我們',
    'off-applypartner':'合作夥伴',
    'off-contactus':'聯繫我們',
    'off-quiz':'問卷調查'
}

module.exports = {
    person,
    menuMap,
    menuOperation,
    menuExample,
}