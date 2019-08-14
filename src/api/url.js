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
    userList:`${API_HOSTNAME}/service/user/list`,
    createRole:`${API_HOSTNAME}/service/user/create`,
    updateRole:`${API_HOSTNAME}/service/user/update`,
    deleteActive:`${API_HOSTNAME}/service/activity/delete`,

    codeList:`${API_HOSTNAME}/service/code/list`,
    deleteCode:`${API_HOSTNAME}/service/code/delete`,
}