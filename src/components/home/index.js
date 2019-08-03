/**
 * @describe: 结合手机端的左侧导航栏，因为是后台PC，暂时不考虑手机,手机端的代码先保持错误，回头需要时再做
 * @author: 雏田
 * @time: 2018-08-02
 */
import React from 'react';
import API from '@/api/api';
// import SiderMenu from '@/components/SiderMenu/SiderMenu';
import {SiderMenu} from 'dt-antd';
import { message} from 'antd';
const {
  LOGIN_PAGE_ADDRESS,
} = process.env;
export default class SiderMenuWrapper extends React.PureComponent { 
  state={
    menu: [],
    userName: sessionStorage.enterpriseName,
  } 
  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    // 这里要动态获取菜单信息和用户信息，然后传入框架
    // 获取左侧菜单数据
    // this.getData();
    const menu = this.state.menu.concat( this.leftMenu());
    this.setState({menu})
  }
  /**
   * [getData 获取菜单数据]
   * @return {[type]} [description]
   */
  getData = async type => {
    try{
      let res = await API.getMenuTree();
      if(res) {
        let data = this.leftMenu(res);
        this.setState({
          menu: data
        });       
      } else {
        message.error(res.errorMsg)
      }
    }catch(err){
      console.error(err);
    }
  }
  /**
   * [getData 获取用户信息]
   * @return {[type]} [description]
   */
  getUser = async type => {
    try{
      let res = await API.getUserInfo();
      // console.log(res) 
      if(res) {
        this.setState({
          userName: res.displayName
        });
      } else {
        message.error(res.errorMsg)
      }
    }catch(err){
      console.error(err);
    }
  } 
  /**
   * [getAdvertData 获取广告菜单数据]
   * @return {[type]} [description]
   */
  getAdvertData = async type => {
    try{
      let res = await API.getAdvertMenuTree();
      if(res){
        let data = this.leftMenu(res.data);
        const menu = this.state.menu.concat(data);
        this.setState({menu})
      } else {
        message.error(res.errorMsg)
      }   
    }catch(err){
      console.error(err);
    }
  }
  /**
   * [给后台返回的菜单添加icon]
   * @param  {[type]} data [description]
   * @return {[type]}      [description]
   */
  leftMenu= (data) => {
    let menu = {
      supplier: 'shop',
      commute: 'cloud',
      userfeedback: 'solution',
      customtravel: 'car',
      coupon: 'gift',
    }
    menu['user.Manage'] = 'user';
    menu['order.Manage'] = 'dollar';
    menu['chartered.Manage'] = 'radar-chart';
    menu['config.manage'] = 'laptop';
    //menu['order.Manage'] = 'order.Manage';
    // 定义code对应的icon
    return [
      {
        menuCode:'qk',
        menuName:'券库',
        childMenus:[
          {
            menuCode:'couponList',
            menuName:'券列表'
          },{
            menuCode:'couponSend',
            menuName:'发放明细'
          },{
            menuCode:'couponPlant',
            menuName:'券平台'
          }
        ]
      }
    ].map((item)=>{
      item.code = item.menuCode;
      item.name = item.menuName;
      item.icon = menu[item.menuCode];
      item.subMenus = [];
      if(item.childMenus && item.childMenus.length>0) {
        item.subMenus = item.childMenus.map((v)=>{
          v.code = v.menuCode;
          v.name = v.menuName;
          v.url = '/'+v.menuCode.replace('.','/');
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
    sessionStorage.removeItem('accountId');
    sessionStorage.removeItem('Authorization');
    window.location.href = LOGIN_PAGE_ADDRESS;
  }
  /**
   * [render description]
   * @return {[type]} [description]
   */
  render(){
    let path = {
      ...this.props,
      siderMenu: {
        title: '云公交管理后台',
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
