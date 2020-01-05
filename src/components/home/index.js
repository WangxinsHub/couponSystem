/**
 * @describe: 结合手机端的左侧导航栏，因为是后台PC，暂时不考虑手机,手机端的代码先保持错误，回头需要时再做
 * @author: 雏田
 * @time: 2018-08-02
 */
import React from 'react';
import API from '@/api/api';
import SiderMenu from '../../components/SiderMenu/SiderMenu';
// import {SiderMenu} from 'dt-antd';
import {message} from 'antd';

const {
    LOGIN_PAGE_ADDRESS,
} = process.env;
export default class SiderMenuWrapper extends React.PureComponent {
    state = {
        menu: [],
        menuList: [],
        userName: sessionStorage.userName,
    };
    ajaxCount = 0;


    componentDidMount() {
       if(this.isPC()){
           API.getUserMenu().then(data => {
               this.setState({
                   menuList: data.data ? data.data : []
               }, (state) => {
                   const menuList = this.state.menuList.filter(item => item);
                   const menu = this.state.menu.concat(...this.leftMenu());
                   [0, 1, 2, 3,4].map((index) => {
                       menu[index].childMenus.map((child) => {
                           menuList.map((apiMenu) => {

                               if (child.menuCode === apiMenu.menuCode) {
                                   child.show = true;
                                   menu[index].show = true
                               }

                           })
                       })
                   });
                   this.setState({menu})
               })
           });
       }

    }

    componentWillUnmount() {
        this.setState = (state, callback) => {
            return;
        };
    }

    componentWillReceiveProps(nextProps, nextContext) {
        if (this.isPC()){
            if(this.state.menu.length===0){
                API.getUserMenu().then(data => {
                    this.setState({
                        menuList: data.data ? data.data : []
                    }, (state) => {
                        const menuList = this.state.menuList.filter(item => item);

                        const menu = [...this.leftMenu()];
                        [0, 1, 2, 3,4].map((index) => {
                            menu[index].childMenus.map((child) => {
                                menuList.map((apiMenu) => {
                                    if (child.menuCode === apiMenu.menuCode) {
                                        child.show = true;
                                        menu[index].show = true
                                    }
                                })
                            })
                        });
                        this.setState({menu})
                    })
                });
            }
        }

    }

    isPC() {
        var userAgentInfo = navigator.userAgent;
        var Agents = ["Android", "iPhone",
            "SymbianOS", "Windows Phone",
            "iPad", "iPod"];
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    }

    /**
     * [getData 获取菜单数据]
     * @return {[type]} [description]
     */
    getData = async type => {
        try {
            let res = await API.getMenuTree();
            if (res) {
                let data = this.leftMenu(res);
                this.setState({
                    menu: data
                });
            } else {
                message.error(res.errorMsg)
            }
        } catch (err) {
            console.error(err);
        }
    }
    /**
     * [getData 获取用户信息]
     * @return {[type]} [description]
     */
    getUser = async type => {
        try {
            let res = await API.getUserInfo();
            // console.log(res)
            if (res) {
                this.setState({
                    userName: res.displayName
                });
            } else {
                message.error(res.errorMsg)
            }
        } catch (err) {
            console.error(err);
        }
    }
    /**
     * [getAdvertData 获取广告菜单数据]
     * @return {[type]} [description]
     */
    getAdvertData = async type => {
        try {
            let res = await API.getAdvertMenuTree();
            if (res) {
                let data = this.leftMenu(res.data);
                const menu = this.state.menu.concat(data);
                this.setState({menu})
            } else {
                message.error(res.errorMsg)
            }
        } catch (err) {
            console.error(err);
        }
    }
    /**
     * [给后台返回的菜单添加icon]
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    leftMenu = (data) => {
        let menu = {
            supplier: 'shop',
            commute: 'cloud',
            userfeedback: 'solution',
            customtravel: 'car',
            coupon: 'gift',
        }
        menu['qk'] = 'switcher';
        menu['hd'] = 'gold';
        menu['qd'] = 'deployment-unit';
        menu['yh'] = 'user';
        menu['sc'] = 'shopping'

        //menu['order.Manage'] = 'order.Manage';
        // 定义code对应的icon
        return [
            {
                menuCode: 'qk',
                menuName: '券库',
                icon: 'euro',
                childMenus: [
                    {
                        menuCode: 'couponLIst',
                        menuName: '券列表'
                    }, {
                        menuCode: 'couponSend',
                        menuName: '发放明细'
                    }, {
                        menuCode: 'couponPlant',
                        menuName: '券平台'
                    }
                ]
            },
            {
                menuCode: 'hd',
                menuName: '活动',
                childMenus: [
                    {
                        menuCode: 'activeConfig',
                        menuName: '活动配置'
                    }, {
                        menuCode: 'activeList',
                        menuName: '活动列表'
                    }, {
                        menuCode: 'sendRecord',
                        menuName: '发放记录'
                    }, {
                        menuCode: 'sendDetail',
                        menuName: '发放明细'
                    }
                ]
            },
            {
                menuCode: 'qd',
                menuName: '渠道',
                childMenus: [
                    {
                        menuCode: 'departmentList',
                        menuName: '渠道列表'
                    }
                ]
            },
            {
                menuCode: 'sc',
                menuName: '商城',
                childMenus: [
                    {
                        menuCode: 'hall',
                        menuName: '会场列表'
                    }, {
                        menuCode: 'orderList',
                        menuName: '购买明细'
                    },
                    {
                        menuCode: 'goodList',
                        menuName: '商品列表'
                    }, {
                        menuCode: 'goodType',
                        menuName: '类型管理'
                    },
                    {
                        menuCode: 'entryList',
                        menuName: '入口管理'
                    }
                ]
            },
            {
                menuCode: 'yh',
                menuName: '用户',
                childMenus: [
                    {
                        menuCode: 'userList',
                        menuName: '用户管理'
                    }, {
                        menuCode: 'roleList',
                        menuName: '角色管理'
                    }
                ]
            }
        ].map((item) => {
            item.code = item.menuCode;
            item.name = item.menuName;
            item.icon = menu[item.menuCode];
            item.subMenus = [];
            if (item.childMenus && item.childMenus.length > 0) {
                item.subMenus = item.childMenus.map((v) => {
                    v.code = v.menuCode;
                    v.name = v.menuName;
                    v.url = '/' + v.menuCode.replace('.', '/');
                    return v;
                })
            }
            return item;
        });
    }
    /**
     * [退出登陆的方法]
     * @param  {[type]} type [description]
     * @return {[type]}      [description]
     */
    logOut = (type) => {
        sessionStorage.removeItem('userName');
        sessionStorage.removeItem('loginFlag');
        sessionStorage.loginFlag = '';
        window.location.href = 'http://www.xajhzx.cn/platform/#/login';
    }

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        if(!this.isPC()){
            return  <div>
                {this.props.children}
            </div>
        }else{
            let path = {
                ...this.props,
                siderMenu: {
                    title: '',
                    menu: this.state.menu
                },
                pageHead: {
                    user: {
                        userName: this.state.userName,
                        logOut: this.logOut,
                    }
                },
                // theme: {
                //   navTheme: 'light', // 主题
                //   isTop: true, // 头部是否在顶部，默认false
                // }
            }
            return <SiderMenu {...path} />
        }
    }
}
