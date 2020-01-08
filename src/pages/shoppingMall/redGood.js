import React, {useState, useEffect} from 'react';
import './style/redGood.less'
import card1 from './icon/card1.png';
import card2 from './icon/card2.png';
import API from '@/api/api';
import qq from './icon/qq.png'
import {Modal} from "antd-mobile";
import user from "./icon/user.png";
import kf from './icon/kf.svg'

export default (props) => {
    // 声明一个叫 "count" 的 state 变量
    const [mlist, setMlist] = useState([]);
    const [meet, setMeet] = useState('');

    useEffect(()=>{
        API.mList({
            meetingId:sessionStorage.meetId
        }).then(res=>{
            setMeet(res.data && res.data[0])
            console.log(res);
        })
    },[]);
    const [modal, setModal] = useState(false);
    function onClose(){
        setModal(false)
    }

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
            <div className='user-icon' onClick={()=>{
                props.history.push( `/shoppingMall/bill`);
            }}>
                <img src={user} alt=""/>
            </div>

            <div className='phone-call'>
                <img src={kf} alt=""/>
                <a href="tel:400-883-8840">客服</a>
            </div>
            <div className='fixed-logo'>
                加汇卓信提供场景/技术支持
            </div>


            <div className='goods-page'>
                {
                    <img src={card1} alt=""/>
                }
                <div className='detail-btn' onClick={()=>setModal(true)}>活动详情</div>
                <Modal
                    visible={modal}
                    onClose={()=>onClose()}
                    closable
                    maskClosable
                >
                    <div className='modal'>
                        <p>龙卡欢乐购活动说明</p>
                        <p>
                            {
                                meet.meetingDec
                            }
                        </p>
                    </div>
                </Modal>
                {
                    <div className='goods-type'>
                        <div className='goods-row'>
                            {
                                mlist && mlist.length>0 && mlist.map((item,index)=>(

                                    <div className='goods-item' key={index} onClick={() => {
                                        props.history.push(`/shoppingMall/pay/${item.cargoId}`);
                                    }}>
                                        <img src={item.goodsImg} alt=""/>
                                        <div className='goods-info'>
                                            <div className='goods-title'>{item.goodsName}</div>
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