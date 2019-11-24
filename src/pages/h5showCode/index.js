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
    let code = util.getQueryString('code');


    api.getCoupon({
      couponId,
    }).then(data => {
      if (data.data) {
        JsBarcode(this.barcode, code, {
          displayValue: false,
          width: 2,
          height: 50,
          margin: 0,
        });
        this.setState({
          coupon: data.data
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
    let code = util.getQueryString('code');
    return (
      <div>

        {
        <div className={'container'}>
            <div className='coupon-head'>
              <div className='platformName'>
                {/*券平台:{coupon.platformName}*/}
              </div>

              <div className='coupon-name'>
                {coupon.couponName}
              </div>

              <div className='time-vallue'>
                券码有效期: {coupon.updateTime} - {coupon.validEnd}
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
                {code}
              </div>
              <div className='qr' style={{marginTop:10}}>
                <QRCode value={code||''}/>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}


export default Home