import React, {useState, useEffect} from 'react';
import './style/login.less'
import c1 from './icon/c1.png';
import c2 from './icon/c2.png';
import API from '@/api/api';
import mlist from './style/mlist.less'
import util from "../../utils/base";
import './style/meetNew.less'
import bg from './icon/bg.png'
import card1 from "./icon/card1.png";
import card2 from "./icon/card2.png";
import {message} from "antd";

export default (props) => {
    sessionStorage.openId = util.getQueryString('openId') || 'eeea';
    sessionStorage.channel = util.getQueryString('channel') || 'channel';
    // 声明一个叫 "count" 的 state 变量
    let [mlist, setMlist] = useState([]);
    useEffect(() => {
        document.title = '龙卡商城';
        API.mList({
            pageNo: 0,
            pageSize: 100
        }).then(res => {
            if (res.data && res.data.length > 0) {
                setMlist(res.data.slice(0, 2))
            }
        })
    }, []);
    return (
        <div className='meetNew'>
            <div className='bg'>
                <div className='contain'>
                    {
                        mlist && mlist.map((item, index) => (
                            <img
                                key={index}
                                onClick={() => {
                                    sessionStorage.meetId = item.meetingId
                                    API.memberInfo({
                                        openId: sessionStorage.openId
                                    }).then(res => {
                                        if (!res.data.mobile) {
                                            if (res.data.tagBlack) {
                                                message.error(item.blackLimitMessage)
                                                return false
                                            } else {
                                                props.history.push(`/shoppingMall/login`);
                                            }
                                        } else {
                                            sessionStorage.mobile = res.data.mobile;
                                            props.history.push(index % 2 === 0 ? `/shoppingMall/redGoods` : `/shoppingMall/goods`);
                                        }
                                    })
                                }}
                                src={index % 2 === 0 ? c1 : c2} className={index % 2 === 0 ? "c1" : "c2"} alt=""/>
                        ))
                    }
                </div>


            </div>


        </div>
    );
}