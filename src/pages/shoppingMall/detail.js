import React, {useState} from 'react';
import './style/pay.less'
import qq from './icon/qq.png'
import {InputItem} from 'antd-mobile'

export default ()=>{
    function renderQQ() {
        return (
            <div className='mall-input-field'>
                <div className='input-label'>
                    请输入QQ号
                </div>

                <input type="number" placeholder='输入需要开通会员的qq号'/>
            </div>
        )
    }

    function renderPhone() {
        return (
            <div className='mall-input-field'>

                <InputItem
                    type="phone"
                    placeholder="输入手机号"
                    onChange={(e) => {
                        console.log(e);
                    }}
                />
            </div>
        )
    }


    return (
        <div>
            <div className='goods-header'>
                <div className='left-logo'>
                    <img src={qq} alt=""/>
                </div>
                <div className='right-content'>
                    <div className='goods-title'>
                        QQ音乐月卡
                    </div>
                    <div className='goods-sub'>
                        听我想听的
                    </div>

                    <div className='goods-price'>
                        <span className='price-red'>￥1</span>
                        <span className='price-gery'>￥5</span>
                    </div>
                </div>
            </div>

            {renderQQ()}

            {renderPhone()}

            <div className='confirm-btn'>
                购买
            </div>
        </div>
    )
}