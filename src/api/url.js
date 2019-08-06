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
    batchList:`${API_HOSTNAME}/service/batch/list`,
    sendCode:`${API_HOSTNAME}/service/activity/send`,

    createActive:`${API_HOSTNAME}/service/activity/create`,
    updateActive:`${API_HOSTNAME}/service/activity/update`,
}