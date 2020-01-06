import React, {useState,useEffect} from 'react';
import './style/login.less'
import {InputItem} from 'antd-mobile'
import {message} from "antd";
import API from '@/api/api';

export default (props) => {
    // 声明一个叫 "count" 的 state 变量
    const [code, setCode] = useState(60);
    const [countText, setCountText] = useState('获得验证码');
    const [falg, setFlag] = useState(true);
    const [phone, setPhone] = useState('');
    const [meet, setMeet] = useState('');

    useEffect(()=>{
        API.mList({
            meetingId:sessionStorage.meetId
        }).then(res=>{
            setMeet(res.data && res.data[0])
            console.log(res);
        })
    },[])
    
    function handleSubmit() {
        API.bindSubmit({
            verifyCode:code,
            openId:sessionStorage.openId,
            mobile:phone.replace(/\s*/g,"")
        }).then(res=>{
            if(res.code ===200 ){
                props.history.push(`/shoppingMall/goods`);
            }else{
                message.warn(res.message)
            }
        });
    }

    function countDown() {
        let counter = 60;
        if(falg){
            if(!phone){
                message.error('请先输入手机号！');
                setFlag(false);
                return false
            }


            let timer = setInterval(() => {
                counter--;
                if (counter === 0) {
                    setFlag(true);
                    clearInterval(timer);
                    setCountText(`获取验证码`);
                } else {
                    setCountText(`(${counter})s重新获取`);
                }

            }, 1000);

            API.bindMobile({
                meetingId:sessionStorage.meetId,
                openId:sessionStorage.openId,
                mobile:phone.replace(/\s*/g,"")
            }).then(res=>{
                if(res.code ===200 ){
                    message.success(res.message)
                }else{
                    clearInterval(timer);
                    setCountText(`获取验证码`);
                    setFlag(true);
                    if(res.code===403){
                        message.warn(meet.limitMessage)
                    }else{
                        message.warn(meet.limitMessage)
                    }
                }
            });

        }
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
                            onChange={(e)=>{
                                console.log(e);
                                setCode(e)
                            }}
                        />
                    </div>
                    <div className='extra' onClick={() => countDown()}>
                        {countText}
                    </div>
                </div>
            </div>

            <div className='confirm-btn' onClick={handleSubmit}>
                验证
            </div>
        </div>
    );
}