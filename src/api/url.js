/**
 * 调用接口路径配置文件，所有的调用接口路径统一在这配置
 */
const API_HOSTNAME = 'http://shande.xajhzx.cn';

export default {
    list: `${API_HOSTNAME}/service/record/list`,
    login: `${API_HOSTNAME}/service/login`,
    exportTable: `${API_HOSTNAME}/service/export`,
}