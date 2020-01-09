import React, {useState} from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import warn from './icon/warn.png'
import'./style/result.less'

export default (props)=>{
    return (
       <div className='result-page'>
           <Result
               img={ <img src={warn} className="warning" alt="" />}
               title="购买受限"
               message={<div>
                   <div>该商品每人限购2次，您已购满2次</div>
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