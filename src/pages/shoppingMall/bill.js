import React, {useState,useEffect} from 'react';
import API from '@/api/api';
import {Tabs, List} from 'antd-mobile';
import './style/bill.less'

const tabs = [
    {title: '全部'},
    {title: '待支付'},//0
    {title: '完成'},//5
    {title: '退款中'},//4
];
const Item = List.Item;
const Brief = Item.Brief;


export default (props) => {
    function handleTabChange(tabData, index) {
        console.log(index);
        if(index == 0){
            getData()
        }else if(index==1){
            getData(0)
        }else if(index==2){
            getData(5)
        }else if(index==3){
            getData(4)
        }
    }

    function getData(orderStatus) {
        API.orderList({
            mobile:sessionStorage.mobile,
            orderStatus
        }).then(res=>{
            if(res.code===200){
                setOrderList(res.data)
            }
        })
    }

    const [orderList,setOrderList] = useState([])
    useEffect(()=>{
        getData();
    },[]);

    return (
        <div>
            <div className='phone-field'>{
                sessionStorage.mobile
            }</div>
            <Tabs tabs={tabs}
                  onChange={handleTabChange}
                  animated={false}
                  useOnPan={false}
            >
                {tabs.map((tab,index)=>(
                    <div key={index}>
                        {
                            orderList&&orderList.length>0 && orderList.map((item,index)=>(
                                <Item multipleLine
                                      onClick={() => {
                                          props.history.push( `/shoppingMall/billDetail/${item.orderId}`);
                                      }}
                                >
                                    {item.subject} <span className='tag-blue'>{
                                    item.deliveType == 0 ? '直充' :   item.deliveType == 1 ? '卡密' : '邮递'
                                }</span>
                                    <Brief>{
                                        item.orderCreateTime
                                    }</Brief>
                                </Item>
                            ))
                        }

                    </div>
                ))

                }


            </Tabs>

        </div>
    )
}