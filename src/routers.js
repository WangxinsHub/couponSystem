import React from 'react';
import {
  HashRouter,
  Route,
  Switch,
} from 'react-router-dom';
import {object} from 'prop-types';
import lodable from 'react-loadable';
import Nav from '@/components/home/index';


export default class Router extends React.Component {
  static contextTypes = {
    store: object,
  };

  /**
   * [constructor description]
   * @param  {[type]} props   [description]
   * @param  {[type]} context [description]
   */
  constructor(props, context) {
    super(props);
    this.login = lodable({
      loader: () => {
        return import('@/pages/login/index');
      },
      loading: () => null
    });
    this.couponList = lodable({
      loader: () => {
        return import('@/pages/couponList/index');
      },
      loading: () => {
        return null
      },
    });
    this.couponSend = lodable({
      loader: () => {
        return import('@/pages/couponSend/index');
      },
      loading: () => {
        return null
      },
    });
    this.couponPlant = lodable({
      loader: () => {
        return import('@/pages/couponPlant/index');
      },
      loading: () => {
        return null
      },
    });


    this.activeConfig = lodable({
      loader: () => {
        return import('@/pages/activeConfig/index');
      },
      loading: () => {
        return null
      },
    });
    this.activeList = lodable({
      loader: () => {
        return import('@/pages/activeList/index');
      },
      loading: () => {
        return null
      },
    });
    this.sendRecord = lodable({
      loader: () => {
        return import('@/pages/sendRecord/index');
      },
      loading: () => {
        return null
      },
    });
    this.sendDetail = lodable({
      loader: () => {
        return import('@/pages/sendDetail/index');
      },
      loading: () => {
        return null
      },
    });

    this.department = lodable({
      loader: () => {
        return import('@/pages/department/index');
      },
      loading: () => {
        return null
      },
    });

    this.user = lodable({
      loader: () => {
        return import('@/pages/user/index');
      },
      loading: () => {
        return null
      },
    });

    this.roleList = lodable({
      loader: () => {
        return import('@/pages/role/index');
      },
      loading: () => {
        return null
      },
    });
    this.activeCoupon = lodable({
      loader: () => {
        return import('@/pages/activeCoupon/index');
      },
      loading: () => {
        return null
      },
    });
    this.codeList = lodable({
      loader: () => {
        return import('@/pages/codeList/index');
      },
      loading: () => {
        return null
      },
    });

    this.couponStore = lodable({
      loader: () => {
        return import('@/pages/couponStore/index');
      },
      loading: () => {
        return null
      },
    });

    this.h5login = lodable({
      loader: () => {
        return import('@/pages/h5login/index');
      },
      loading: () => {
        return null
      },
    });

    this.h5coupon = lodable({
      loader: () => {
        return import('@/pages/h5coupon/index');
      },
      loading: () => {
        return null
      },
    });

    this.h5showCode = lodable({
      loader: () => {
        return import('@/pages/h5showCode/index');
      },
      loading: () => {
        return null
      },
    });
    this.default = lodable({
      loader: () => {
        return import('@/pages/default/index');
      },
      loading: () => {
        return null
      },
    });


    this.sendListH5 = lodable({
      loader: () => {
        return import('@/pages/h5coupon/sendListH5');
      },
      loading: () => {
        return null
      },
    });

    this.giftLogin = lodable({
      loader: () => {
        return import('@/pages/h5gift/login');
      },
      loading: () => {
        return null
      },
    });

    this.giftLogin = lodable({
      loader: () => {
        return import('@/pages/h5gift/login');
      },
      loading: () => {
        return null
      },
    });

    this.gift = lodable({
      loader: () => {
        return import('@/pages/h5gift/gift');
      },
      loading: () => {
        return null
      },
    });

    this.giftList = lodable({
      loader: () => {
        return import('@/pages/h5gift/giftList');
      },
      loading: () => {
        return null
      },
    })

    this.shopLogin = lodable({
      loader: () => {
        return import('@/pages/shoppingMall/login');
      },
      loading: () => {
        return null
      },
    });
    this.pay = lodable({
      loader: () => {
        return import('@/pages/shoppingMall/pay');
      },
      loading: () => {
        return null
      },
    });
    this.pay = lodable({
      loader: () => {
        return import('@/pages/shoppingMall/pay');
      },
      loading: () => {
        return null
      },
    });
    this.bill = lodable({
      loader: () => {
        return import('@/pages/shoppingMall/bill');
      },
      loading: () => {
        return null
      },
    });

    this.billDetail = lodable({
      loader: () => {
        return import('@/pages/shoppingMall/billDetail');
      },
      loading: () => {
        return null
      },
    });

    this.result = lodable({
      loader: () => {
        return import('@/pages/shoppingMall/result');
      },
      loading: () => {
        return null
      },
    });


    this.hall = lodable({
      loader: () => {
        return import('@/pages/hall/index');
      },
      loading: () => {
        return null
      },
    });
    this.blackWhite = lodable({
      loader: () => {
        return import('@/pages/blackWhite/index');
      },
      loading: () => {
        return null
      },
    });

    this.cargoList = lodable({
      loader: () => {
        return import('@/pages/cargoList/index');
      },
      loading: () => {
        return null
      },
    });

    this.goodList = lodable({
      loader: () => {
        return import('@/pages/goodList/index');
      },
      loading: () => {
        return null
      },
    });

    this.goodsType = lodable({
      loader: () => {
        return import('@/pages/goodsType/index');
      },
      loading: () => {
        return null
      },
    });

    this.entryList = lodable({
      loader: () => {
        return import('@/pages/entryList/index');
      },
      loading: () => {
        return null
      },
    });


    this.channelList = lodable({
      loader: () => {
        return import('@/pages/channelList/index');
      },
      loading: () => {
        return null
      },
    });


    this.shopcart = lodable({
      loader: () => {
        return import('@/pages/shopcart/index');
      },
      loading: () => {
        return null
      },
    });

    this.cargoList = lodable({
      loader: () => {
        return import('@/pages/cargoList/index');
      },
      loading: () => {
        return null
      },
    });

  };

  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    return (
      <HashRouter>
        <Switch>
          <Nav>


            <Route exact path="/shoppingMall/login" component={this.shopLogin}/>
            <Route exact path="/shoppingMall/pay" component={this.pay}/>
            <Route exact path="/shoppingMall/bill" component={this.bill}/>
            <Route exact path="/shoppingMall/billDetail" component={this.billDetail}/>
            <Route exact path="/shoppingMall/result" component={this.result}/>


            <Route exact path="/shop/hall" component={this.hall}/>
            <Route exact path="/shop/blackWhite" component={this.blackWhite}/>
            <Route exact path="/shop/cargoList" component={this.cargoList}/>
            <Route exact path="/shop/goodList" component={this.goodList}/>
            <Route exact path="/shop/goodType" component={this.goodsType}/>
            <Route exact path="/shop/entryList" component={this.entryList}/>
            <Route exact path="/shop/channelList" component={this.channelList}/>
            <Route exact path="/shop/shopcart" component={this.shopcart}/>
            <Route exact path="/shop/cargoList" component={this.cargoList}/>


            <Route exact path="/h5/login" component={this.h5login}/>
            <Route exact path="/login" component={this.login}/>
            <Route exact path="/" component={this.login}/>
            <Route exact path="/default" component={this.default}/>

            <Route exact path="/couponList" component={this.couponList}/>
            <Route exact path="/couponSend" component={this.couponSend}/>
            <Route exact path="/couponSend/:id" component={this.couponSend}/>
            <Route exact path="/couponPlant" component={this.couponPlant}/>

            <Route exact path="/activeConfig" component={this.activeConfig}/>
            <Route exact path="/activeList" component={this.activeList}/>

            <Route exact path="/sendRecord/:id" component={this.sendRecord}/>
            <Route exact path="/sendRecord" component={this.sendRecord}/>
            <Route exact path="/sendDetail" component={this.sendDetail}/>
            <Route exact path="/sendDetail/:aid/:bid" component={this.sendDetail}/>

            <Route exact path="/departmentList" component={this.department}/>

            <Route exact path="/userList" component={this.user}/>
            <Route exact path="/userList/:id" component={this.user}/>

            <Route exact path="/roleList" component={this.roleList}/>
            <Route exact path="/activeCoupon" component={this.activeCoupon}/>
            <Route exact path="/codeList/:id/:couponInfo" component={this.codeList}/>
            <Route exact path="/couponStore/:id" component={this.couponStore}/>

            <Route exact path="/h5/sendCoupon" component={this.h5coupon}/>
            <Route exact path="/h5/showCode" component={this.h5showCode}/>
            <Route exact path="/h5/sendListH5" component={this.sendListH5}/>

            <Route exact path="/h5/gift/login" component={this.giftLogin}/>
            <Route exact path="/h5/gift/verify" component={this.giftVerify}/>
            <Route exact path="/h5/gift/gift" component={this.gift}/>
            <Route exact path="/h5/gift/giftList" component={this.giftList}/>

          </Nav>
        </Switch>
      </HashRouter>
    );
  }
}