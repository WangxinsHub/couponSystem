/**
 * 调用接口路径配置文件，所有的调用接口路径统一在这配置
 */
const API_HOSTNAME = 'http://shande.xajhzx.cn';

export default {
    list: `${API_HOSTNAME}/service/record/list`,
    login: `${API_HOSTNAME}/service/login`,
    exportTable: `${API_HOSTNAME}/service/export`,
    couponList: `${API_HOSTNAME}/service/coupon/list`,
    platformList: `${API_HOSTNAME}/service/platform/list`,

    updateCoupon: `${API_HOSTNAME}/service/coupon/update`,
    createCoupon: `${API_HOSTNAME}/service/coupon/create`,
    getCoupon: `${API_HOSTNAME}/service/coupon/get`,

    uploadFile:`${API_HOSTNAME}/service/code/import`,
    sendList:`${API_HOSTNAME}/service/sendDetail/list`,
    createPlantForm:`${API_HOSTNAME}/service/platform/create`,

    updatePlantForm:`${API_HOSTNAME}/service/platform/update`,
    activeList:`${API_HOSTNAME}/service/activity/list`,
    departmentList:`${API_HOSTNAME}/service/department/list`,
    updateDepartment:`${API_HOSTNAME}/service/department/update`,
    createDepartment:`${API_HOSTNAME}/service/department/create`,

    batchList:`${API_HOSTNAME}/service/batch/list`,
    sendCode:`${API_HOSTNAME}/service/activity/send`,
    createActive:`${API_HOSTNAME}/service/activity/create`,
    updateActive:`${API_HOSTNAME}/service/activity/update`,

    roleList:`${API_HOSTNAME}/service/permission/role/list`,
    connectRole:`${API_HOSTNAME}/service/permission/connectRole`,
    createPermission:`${API_HOSTNAME}/service/permission/role/create`,
    roleMenu:`${API_HOSTNAME}/service/menu/roleMenu`,


    mList:`${API_HOSTNAME}/service/meeting/mList`,
    addMeet:`${API_HOSTNAME}/service/meeting/mCreate`,
    mUpdate:`${API_HOSTNAME}/service/meeting/mUpdate`,
    blList:`${API_HOSTNAME}/service/meeting/blList`,
    blDelete:`${API_HOSTNAME}/service/meeting/blDelete`,
    cargoList:`${API_HOSTNAME}/service/meeting/cargoList`,
    goodsCreate:`${API_HOSTNAME}/service/goods/create`,
    goodsList:`${API_HOSTNAME}/service/goods/list`,
    typeList:`${API_HOSTNAME}/service/goods/typeList`,
    updateGoods:`${API_HOSTNAME}/service/goods/update`,
    addType:`${API_HOSTNAME}/service/goods/typeCreate`,
    updateType:`${API_HOSTNAME}/service/goods/typeUpdate`,
    channelList:`${API_HOSTNAME}/service/channel/list`,
    addChannel:`${API_HOSTNAME}/service/channel/create`,
    updateChannel:`${API_HOSTNAME}/service/channel/update`,


    userList:`${API_HOSTNAME}/service/user/list`,
    createRole:`${API_HOSTNAME}/service/user/create`,
    updateRole:`${API_HOSTNAME}/service/user/update`,

    deleteUser:`${API_HOSTNAME}/service/user/delete`,
    updateUser:`${API_HOSTNAME}/service/user/update`,


    deleteActive:`${API_HOSTNAME}/service/activity/delete`,

    codeList:`${API_HOSTNAME}/service/code/list`,
    deleteCode:`${API_HOSTNAME}/service/code/delete`,
    codeImport:`${API_HOSTNAME}/service/code/import`,
    getCode:`${API_HOSTNAME}/service/code/get`,

    menuList:`${API_HOSTNAME}/service/menu/list`,
    couponStore:`${API_HOSTNAME}/service/activity/coupon`,
    stock:`${API_HOSTNAME}/service/activity/stock`,

    activityCoupon:`${API_HOSTNAME}/service/activity/coupons`,
    reSend:`${API_HOSTNAME}/service/sendDetail/reSend`,
    bindMenu:`${API_HOSTNAME}/service/menu/connectRole`,

    getUserMenu:`${API_HOSTNAME}/service/menu`,
    verifyCode:`${API_HOSTNAME}/service/verifyCode`,
    delCoupon:`${API_HOSTNAME}/service/activity/delCoupon`,


    giftVerify:`${API_HOSTNAME}/gift/verify`,
    giftLogin:`${API_HOSTNAME}/gift/check`,
    giftApply:`${API_HOSTNAME}/gift/apply`,
    giftHistory:`${API_HOSTNAME}/gift/history`,
}