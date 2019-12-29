import React, {useState} from 'react';
import { Result, Icon, WhiteSpace } from 'antd-mobile';
import warn from './icon/warn.png'
import'./style/result.less'

export default ()=>{
    return (
       <div className='result-page'>
           <Result
               img={ <img src={warn} className="warning" alt="" />}
               title="购买受限"
               message={<div>
                   <div>该商品每人限购3次，您已购满3次</div>
                   <div className='result-confirm-btn'>
                       知道了
                   </div>
                   <div className='result-cancel-btn'>
                       再逛逛
                   </div>
               </div>}
           />

       </div>
    )
}