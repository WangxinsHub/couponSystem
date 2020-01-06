import React, {useState, useEffect} from 'react';
import './style/goods.less'
import card1 from './icon/card1.png';
import card2 from './icon/card2.png';
import API from '@/api/api';
import mlist from './style/mlist.less'
import qq from './icon/qq.png'
import {Modal} from 'antd-mobile'

export default (props) => {
    // 声明一个叫 "count" 的 state 变量
    const [mlist, setMlist] = useState([]);

    const [type, setType] = useState([]);

    const [meet, setMeet] = useState('');
    const [modal, setModal] = useState(false);
    function onClose(){
        setModal(false)
    }
    useEffect(()=>{
        API.mList({
            meetingId:sessionStorage.meetId
        }).then(res=>{
            setMeet(res.data && res.data[0])
            console.log(res);
        })
    },[]);




    useEffect( () => {
        API.typeList().then(res=>{
            if(res.data && res.data.length>0){
                setType(res.data);
                res.data.map((type)=>{
                    API.cargoList({
                        meetingId:sessionStorage.meetId,
                        goodsId:type.goodsId+''
                    }).then(res => {
                        type.cargo=res.data;
                        setMlist(res.data)
                    })
                })
            }

        })

    }, []);
    return (
        <div className='goods-page'>
            {
                <img src={card2} alt=""/>
            }
            <div className='detail-btn' onClick={()=>setModal(true)}>活动详情</div>
            <Modal
                visible={modal}
                onClose={()=>onClose()}
                closable
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
                type  && type.map((type,index)=>(
                    type.cargo && type.cargo.length>0 && <div className='goods-type' key={index}>
                        <span className='yellow'>《</span>{type.goodsName}<span className='yellow'>》</span>

                        <div className='goods-row'>
                            {

                                type.cargo &&  type.cargo.map((item, index) => (
                                    <div className='goods-item' onClick={()=>{
                                        props.history.push(`/shoppingMall/pay/${item.goodsId}`);
                                    }}>
                                        <img src={item.goodsImg} alt=""/>
                                        <div className='goods-info'>
                                            <div className='goods-title'>{item.goodsName}</div>
                                            <div className='goods-sub'>{item.goodsType}</div>
                                            <div className='price'>
                                                <span className='red'>￥{(item.discountPrice/100).toFixed(2)}</span>
                                                <span className='gray'>￥{(item.price/100).toFixed(2)}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>

                    </div>
                ))
            }
        </div>
    );
}