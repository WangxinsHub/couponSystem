import React, {useState, useEffect, useRef, Component} from 'react';
import './style/billDetail.less'
import QRCode from "qrcode.react";
import api from "../../api/api";
import JsBarcode from "jsbarcode";
import {message} from "antd";
import util from "../../utils/base";


class Home extends Component {
    state = {
        kmInfo: {},
        detail: null
    };


    componentDidMount() {
        const props = this.props;

        api.orderList({
            orderId: props.match.params.orderId
        }).then(res => {

            if (res.code === 200) {
                this.setState({
                    detail: res.data[0]
                }, () => {
                    try {
                        let kmInfo = JSON.parse(this.state.detail.kmInfo)[0];
                        console.log(kmInfo);
                        if (kmInfo) {
                            this.setState({
                                kmInfo
                            })
                            JsBarcode(this.barcodeRef, kmInfo.cardPwd, {
                                displayValue:  kmInfo.cardPwd,
                                width: 0.8,
                                height: 30,
                                margin: 0,
                            });
                        }
                    }catch (e) {
                        console.log(e);
                    }

                })


            } else {
                message.error(res.message)
            }
        })
    }


    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const {detail, kmInfo} = this.state;
        return (
            detail && <div className={'container'}>

                <div className='coupon-head'>
                    <div className='coupon-name'>
                        {
                            detail.subject
                        }
                    </div>

                    <div className='time-vallue'>
                        {
                            detail.meetingName
                        }
                    </div>

                    <div className='head-status green'>
                        {
                            detail.orderStatus == 0 ? "待支付" : detail.orderStatus == 1 ? "发货中" : detail.orderStatus == 2 ? "已发货" : detail.orderStatus == '3' ? "已关闭" : detail.orderStatus == '4' ? "退款中" : '已完成'
                        }
                    </div>
                </div>
                <div className='coupon-btm'>
                    <div className='bill-item'>
                        <div className='bill-label'>购买时间</div>
                        <div className='bill-value'>{detail.orderCreateTime}</div>
                    </div>

                    <div className='bill-item'>
                        <div className='bill-label'>充值账号</div>
                        <div>{
                            detail.mobile
                        }</div>
                    </div>

                    <div className='bill-item'>
                        <div className='bill-label'>应付金额</div>
                        <div>{detail.amount}</div>
                    </div>

                    <div className='bill-item'>
                        <div className='bill-label'>实付金额</div>
                        <div>{detail.actualAmount}</div>
                    </div>

                    {
                        kmInfo.cardNo &&<div className='bill-item-bottom'>
                            <div className='bill-item'>
                                <div className='bill-label'>卡号</div>
                                <div>{kmInfo.cardNo}</div>
                            </div>



                            <div className='bill-item'>
                                <div className='bill-label'>过期时间</div>
                                <div>{kmInfo.outDate}</div>
                            </div>

                            <svg style={{width:300}}
                                ref={(ref) => {
                                    this.barcodeRef = ref
                                }}
                            />
                        </div>
                    }

                </div>
            </div>

        )
    }
}


export default Home