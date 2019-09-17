import axios from 'axios';
import Qs from 'qs'
/**
 * 主要params参数
 * @params method {string} 方法名
 * @params url {string} 请求地址  例如：/login 配合baseURL组成完整请求地址
 * @params baseURL {string} 请求地址统一前缀 ***需要提前指定***  例如：http://cangdu.org
 * @params timeout {number} 请求超时时间 默认 30000
 * @params params {object}  get方式传参key值
 * @params headers {string} 指定请求头信息
 * @params withCredentials {boolean} 请求是否携带本地cookies信息默认开启
 * @params validateStatus {func} 默认判断请求成功的范围 200 - 300
 * @return {Promise}
 * 其他更多拓展参看axios文档后 自行拓展
 * 注意：params中的数据会覆盖method url 参数，所以如果指定了这2个参数则不需要在params中带入
 */


export default class Server {
    axios(method, url, params) {
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') params = {};
            let _option = params;
            console.error(params)
            _option = {
                method,
                url,
                //baseURL: API_HOSTNAME,
                timeout: 30000,
                //params:{A:1},
                withCredentials: true, //是否携带cookies发起请求
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                },
                crossDomain: true,
                paramsSerializer: function(params) {
                    return Qs.stringify(params)
                },
                data:params,
                params
            }
            axios.request(_option).then(res => {

                resolve(typeof res.data === 'object' || typeof res.data === 'string' ? res.data : JSON.parse(res.data))
            }, (error) => {
                if (error.response) {
                    // if(error.response.status === 401){
                    //   window.location.href = LOGIN_PAGE_ADDRESS;
                    // }
                    reject(error.response.data)
                } else {
                    reject(error)
                }
            })
        })
    }

    axiosCommon(method, url, params) {
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') params = {};
            let _option = params;
            _option = {
                method,
                url,
                timeout: 30000,
                crossDomain: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                withCredentials: true, //是否携带cookies发起请求
                data: params || null,
                params,
            }
            axios.request(_option).then(res => {
                if(!sessionStorage.loginFlag){


                    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                        // window.location.href = window.location.href.split('/#/')[0] + '/#/h5/login';
                    }else {
                        window.location.href = window.location.href.split('/#/')[0] + '/#/login';
                    }

                    return false

                }
                resolve(typeof res.data === 'object' || typeof res.data === 'string' ? res.data : JSON.parse(res.data))
            }, (error) => {
                if (error.response) {

                    if (error.response.status === 404 || 302) {
                        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                            // window.location.href = window.location.href.split('/#/')[0] + '/#/h5/login';
                        }else {
                            window.location.href = window.location.href.split('/#/')[0] + '/#/login';
                        }
                    }
                    reject(error.response.data)
                } else {
                    reject(error)
                }
            })
        })
    }

    axiosEasy(method, url, params) {
        return new Promise((resolve, reject) => {
            if (typeof params !== 'object') params = {};
            let _option = params;
            _option = {
                method,
                url,
                timeout: 30000,
                crossDomain: true,
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                withCredentials: true, //是否携带cookies发起请求
                params,
            }
            axios.request(_option).then(res => {
                resolve(typeof res.data === 'object' || typeof res.data === 'string' ? res.data : JSON.parse(res.data))
            }, (error) => {
                if (error.response) {
                    console.log(window.location.href.split('/#/')[0] + '/');
                    if (error.response.status === 404 || 302) {
                        if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
                            // window.location.href = window.location.href.split('/#/')[0] + '/#/h5/login';
                        }else {
                            window.location.href = window.location.href.split('/#/')[0] + '/#/login';
                        }                    }
                    reject(error.response.data)
                } else {
                    reject(error)
                }
            })
        })
    }
}
