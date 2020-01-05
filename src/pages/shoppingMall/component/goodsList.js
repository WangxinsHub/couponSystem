import qq from "../icon/qq.png";
import React, {useEffect} from "react";
import API from '@/api/api';

export  default  function (props) {
    useEffect(async () => {
        API.typeList().then(res=>{
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
        })

    }, []);

    return (
        type  && type.map((type,index)=>(
            type.cargo && type.cargo.length>0 && <div className='goods-type' key={index}>
                <span className='yellow'>《</span>{type.goodsName}<span className='yellow'>》</span>

                <div className='goods-row'>
                    {

                        type.cargo &&  type.cargo.map((item, index) => (
                            <div className='goods-item' onClick={()=>{
                                props.history.push(`/shoppingMall/pay/${item.goodsId}`);
                            }}>
                                <img src={qq} alt=""/>
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
    )

}