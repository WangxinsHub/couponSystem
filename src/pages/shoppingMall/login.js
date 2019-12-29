import React, {useState} from 'react';
import './style/login.less'
import {InputItem} from 'antd-mobile'
import {message} from "antd";
import API from '@/api/api';

export default () => {
    // 声明一个叫 "count" 的 state 变量
    const [count, setCount] = useState(60);
    const [countText, setCountText] = useState('获得验证码');
    const [phone, setPhone] = useState('获得验证码');

    function countDown() {
        let counter = 60;
        let timer = setInterval(() => {
            counter--;
            if (counter === 0) {
                clearInterval(timer);
                setCountText(`获取验证码`);
            } else {
                setCountText(`(${counter})s重新获取`);
            }

        }, 1000);
    }

    return (
        <div>
            <div className='list-item-wapper'>
                <div className='list-text'>
                    提示：该活动为甘肃用户专享
                </div>
            </div>

            <div className='list-item-wapper'>
                <div className='list-item'>
                    <div className='label'>手机</div>
                    <div className='control'>
                        <InputItem
                            type="phone"
                            placeholder="输入手机号"
                            onChange={(e) => {
                                console.log(e);
                                setPhone(e)
                            }}
                        />
                    </div>
                </div>
            </div>


            <div className='list-item-wapper'>
                <div className='list-item no-border'>
                    <div className='label'>验证码</div>
                    <div className='control'>
                        <InputItem
                            type="number"
                            placeholder="输入验证码"
                        />
                    </div>
                    <div className='extra' onClick={() => countDown()}>
                        {countText}
                    </div>
                </div>
            </div>

            <div className='confirm-btn'>
                验证
            </div>
        </div>
    );
}