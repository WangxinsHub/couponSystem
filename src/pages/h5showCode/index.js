import React, {Component,} from 'react';
import QRCode from 'qrcode.react'

import './index.css'
import JsBarcode from 'jsbarcode';
import util from '../../utils/base'
import api from '../../api/api'

class Home extends Component {
  state = {
    activeList: null,
    couponList: [],
    coupon: {}
  };

  componentWillMount() {
    document.title = '卡券详情'
  }

  componentDidMount() {
    let couponId = util.getQueryString('couponId');
    api.getCoupon({
      couponId,
    }).then(data => {
      if (data.data) {
        this.setState({
          coupon: data.data
        },()=>{
          console.log(data.data);
          JsBarcode(this.barcode, data.data.couponCode, {
            displayValue: false,
            width: 2,
            height: 50,
            margin: 0,
          });
        });
      }
    }).catch(e=>{
      console.log(e);
    })
  }



  /**
   * [render description]
   * @return {[type]} [description]
   */
  render() {
    const {coupon} = this.state;
    return (
      <div>

        {
          coupon && <div className={'container'}>
            <div className='coupon-head'>
              <div className='platformName'>
                {coupon.platformName}
              </div>

              <div className='coupon-name'>
                {coupon.couponName}
              </div>

              <div className='time-value'>
                活动有效期: {coupon.updateTime} - {coupon.validEnd}
              </div>
            </div>
            <div className='coupon-btm'>
              <div className={'center'}>
                <svg
                  ref={(ref) => {
                    this.barcode = ref;
                  }}
                />
              </div>
              <div className='code'>
                {coupon.couponCode}
              </div>
              {coupon.couponCode && <div className='qr' style={{marginTop:10}}>
                <QRCode value={coupon.couponCode}/>
              </div>}
            </div>
          </div>
        }
      </div>
    );
  }
}


export default Home