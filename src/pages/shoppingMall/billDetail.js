import React, {useState, useEffect} from 'react';
import './style/billDetail.less'
import QRCode from "qrcode.react";
import api from "../../api/api";
import JsBarcode from "jsbarcode";

// api.getCoupon({
//     couponId,
// }).then(data => {
//     if (data.data) {
//         JsBarcode(this.barcode, code, {
//             displayValue: false,
//             width: 2,
//             height: 50,
//             margin: 0,
//         });
//         this.setState({
//             coupon: data.data
//         });
//     }
// }).catch(e=>{
//     console.log(e);
// })
// }

export default () => {
    const [barcode,setBarCode] = useState(null);
    useEffect(() => {
        if(barcode){
            JsBarcode(barcode, 123123, {
                displayValue: false,
                width: 5,
                height: 30,
                margin: 0,
            });
        }

    });
    return (
        <div className={'container'}>
            <div className='coupon-head'>
                <div className='coupon-name'>
                    5元话费充值
                </div>

                <div className='time-vallue'>
                    建行一元购
                </div>

                <div className='head-status green'>
                    完成
                </div>
            </div>
            <div className='coupon-btm'>
                <div className='bill-item'>
                    <div className='bill-label'>购买时间</div>
                    <div className='bill-value'>2019-12-12 12:12:12</div>
                </div>

                <div className='bill-item'>
                    <div className='bill-label'>充值账号</div>
                    <div>158****5858</div>
                </div>

                <div className='bill-item'>
                    <div className='bill-label'>应付金额</div>
                    <div>5.00</div>
                </div>

                <div className='bill-item'>
                    <div className='bill-label'>应付金额</div>
                    <div>5.00</div>
                </div>

                <div className='bill-item'>
                    <svg
                        ref={(ref) => {
                            setBarCode(ref)
                        }}
                    />
                </div>
            </div>
        </div>
    )
}