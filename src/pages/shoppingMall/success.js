import React, {useState} from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import success from './icon/success.png'
import'./style/result.less'

export default (props)=>{
    return (
        <div className='result-page'>
            <Result
                img={ <img src={success} className="warning" alt="" />}
                message={<div>
                    <div className='main'>购买成功</div>
                    <div className='sub'>前往订单查看详细信息</div>
                    <div className='result-confirm-btn' onClick={()=>{
                        props.history.push( `/shoppingMall/bill`);
                    }}>
                        订单
                    </div>
                    <div className='result-cancel-btn' onClick={()=>{
                        props.history.push( `/shoppingMall/meet`);
                    }}>
                        再逛逛
                    </div>
                </div>}
            />
        </div>
    )
}