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
                        <Route path="/login" component={this.login}/>
                        <Route exact path="/" component={this.login}/>
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

                        <Route exact path="/h5/login" component={this.h5login}/>
                        <Route exact path="/h5/sendCoupon" component={this.h5coupon}/>
                    </Nav>
                </Switch>
            </HashRouter>
        );
    }
}