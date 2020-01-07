import React, {useState, useEffect} from 'react';
import './style/pay.less'
import qq from './icon/qq.png'
import {InputItem} from 'antd-mobile'
import API from '@/api/api';
import {message} from "antd";

export default (props) => {
    const [data, setData] = useState(null);
    const wx = window.wx;
    useEffect( () => {
          API.cargoList({
            meetingId: sessionStorage.meetId,
            cargoId: props.match.params.cargoId
        }).then(response=>{
              setData(response.data[0] || [])

          })
    }, []);

    function wechatPay(param) {
        let that = this;

        wx.ready(function () {
            wx.chooseWXPay({
                timestamp: param.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                nonceStr: param.nonceStr, // 支付签名随机串，不长于 32 位
                package: param.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=***）
                signType: param.signType, // 签名方式，默认为´SHA1´，使用新版支付需传入´MD5´
                paySign: param.paySign, // 支付签名
                success: function (res) {
                    if (res.errMsg == "chooseWXPay:ok") {
                        message('充值成功');
                        props.history.push( `/shoppingMall/result/success`);
                    } else {
                        message('充值失败')
                    }
                },
                error(res) {
                    message('充值失败')

                },
                cancel: function (res) {
                    message('取消支付')
                }
            });
        });
    }


    function handlePay() {
        API.pay({
            amount: data.discountPrice,
            account: sessionStorage.mobile,
            projectName: data.goodsName,
            userId: sessionStorage.openId || 'test',
            meetingId: sessionStorage.meetId,
            cargoId: data.cargoId,
            channel: sessionStorage.channel,
        }).then(res => {
            if (res.data) {
                let credential = JSON.parse(res.data.credential);
                wx.config({
                    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                    appId: credential.appId, // 必填，公众号的唯一标识
                    timestamp: credential.timeStamp, // 必填，生成签名的时间戳
                    nonceStr: credential.nonceStr, // 必填，生成签名的随机串
                    signature: credential.timeStamp, // 必填，调用js签名，
                    channel: sessionStorage.channel, // 必填，调用js签名，
                    jsApiList: ['chooseWXPay'] // 必填，需要使用的JS接口列表，这里只写支付的
                });
                wechatPay(credential);
            } else {
                props.history.push( `/shoppingMall/result`);
                message.error(res.message);
            }
        });
    }

    function renderQQ() {
        return (
            <div className='mall-input-field'>
                <div className='input-label'>
                    请输入QQ号
                </div>

                <input type="number" placeholder='输入需要开通会员的qq号' autofocus/>
            </div>
        )
    }

    function renderPhone() {
        return (
            <div className='mall-input-field'>
                <div className='input-label'>
                    请输入手机号
                </div>

                <InputItem
                    type="phone"
                    placeholder="输入手机号"
                    autofocus
                    onChange={(e) => {
                        console.log(e);
                    }}
                />
            </div>
        )
    }


    return (
        <div>
            {
                data && [
                    <div className='goods-header'>
                        <div className='left-logo'>
                            <img src={data.goodsImg} alt=""/>
                        </div>
                        <div className='right-content'>
                            <div className='goods-title'>
                                {data.goodsName}
                            </div>
                            <div className='goods-sub'>
                                {data.goodsType}
                            </div>

                            <div className='goods-price'>
                                <span className='price-red'>￥{(data.discountPrice / 100).toFixed(2)}</span>
                                <span className='price-gery'>￥{(data.price / 100).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>,

                    data.goodsName && data.goodsName.indexOf('qq') > -1 ? renderQQ() : renderPhone(),

                    <div className='confirm-btn' onClick={handlePay}>
                        购买
                    </div>,

                    <div className='detail-container-pay'>
                        <p className='title-pay'>视频详情</p>
                        <div dangerouslySetInnerHTML={{ __html: data.goodsDesc}}>
                        </div>
                    </div>

                ]
            }

        </div>
    )
}