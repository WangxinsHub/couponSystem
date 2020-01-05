import React, {useState, useEffect} from 'react';
import './style/login.less'
import card1 from './icon/card1.png';
import card2 from './icon/card2.png';
import API from '@/api/api';
import mlist from './style/mlist.less'
import util from "../../utils/base";

export default (props) => {
    sessionStorage.openId = util.getQueryString('openId') || 'eeea';
    sessionStorage.channel = util.getQueryString('channel') || 'channel';
    // 声明一个叫 "count" 的 state 变量
    let [mlist, setMlist] = useState([]);
    useEffect(() => {
        API.mList({
            pageNo: 0,
            pageSize: 100
        }).then(res => {
            setMlist(res.data)
        })
    }, []);
    return (
        <div>
            {
                mlist && mlist.map((item, index) => (
                    <div className='mlist'
                         key={index}
                         onClick={() => {
                             sessionStorage.meetId = item.meetingId
                             API.memberInfo({
                                 openId: sessionStorage.openId
                             }).then(res => {
                                 if (!res.data.mobile) {
                                     if (res.data.tagBlack) {
                                         alert('您已参与此活动！');
                                         return false
                                     } else {
                                         props.history.push(`/shoppingMall/login`);
                                     }
                                 } else {
                                     props.history.push(index % 2 === 0 ? `/shoppingMall/redGoods` : `/shoppingMall/goods`);
                                 }
                             })
                         }}
                    >
                        {
                            <img src={index % 2 === 0 ? card1 : card2} alt=""/>

                        }
                    </div>

                ))
            }


        </div>
    );
}