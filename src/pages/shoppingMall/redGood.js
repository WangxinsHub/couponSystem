import React, {useState, useEffect} from 'react';
import './style/redGood.less'
import card1 from './icon/card1.png';
import card2 from './icon/card2.png';
import API from '@/api/api';
import mlist from './style/mlist.less'
import qq from './icon/qq.png'

export default (props) => {
    // 声明一个叫 "count" 的 state 变量
    const [mlist, setMlist] = useState([]);




    useEffect(() => {
        API.cargoList({
            meetingId: sessionStorage.meetId,
        }).then(response=>{
            setMlist(response.data || [])
        })
    }, []); // Or [] if effect doesn't need props or state

    console.log(mlist);
    return (
        <div className='red-g-page'>
            <div className='goods-page'>
                {
                    <img src={card1} alt=""/>
                }

                {
                    <div className='goods-type'>
                        <div className='goods-row'>
                            {
                                mlist && mlist.length>0 && mlist.map((item,index)=>(

                                    <div className='goods-item' key={index} onClick={() => {
                                        props.history.push(`/shoppingMall/pay/${item.cargoId}`);
                                    }}>
                                        <img src={qq} alt=""/>
                                        <div className='goods-info'>
                                            <div className='goods-title'>{item.goodsName}</div>
                                            <div className='goods-sub'>{item.goodsType}</div>
                                            <div className='price'>
                                                <span className='red'>￥{(item.discountPrice / 100).toFixed(2)}</span>
                                                <span className='gray'>￥{(item.price / 100).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>

    );
}