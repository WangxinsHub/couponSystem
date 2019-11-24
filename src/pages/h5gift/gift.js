import React from 'react';
import {connect} from 'react-redux';
import {func} from 'prop-types';
import {Form, Input, Button, Alert, message,} from 'antd';
import '@/style/animate.css';
import './gift.css';
import API from '@/api/api';
import {Link} from "react-router-dom";

const FormItem = Form.Item
class loginPage extends React.Component {
    static propTypes = {
        handleOpenTab: func,
    };
    state = {
        type: '',
        showQQ:false,
        giftList: [
            {
                name: '50元话费充值',
                type: 'PHONE'
            },
            {
                name: '爱奇艺季度会员',
                type: 'VIDEO',
                goodsType: 'IQIYI'
            },
            {
                name: '优酷视频季度会员',
                type: 'VIDEO',
                goodsType: 'YOUKU'

            },
            {
                name: '腾讯视频季度会员',
                type: 'VIDEO',
                goodsType: 'TENCENT'

            },
            {
                name: '芒果视频季度会员',
                type: 'VIDEO',
                goodsType: 'MANGGUO'
            },

        ]
    };

    /**
     * [componentDidMount description]
     */
    componentWillMount() {
    }

    componentDidMount() {

    }

    handleClick = () => {

    };


    render() {
        const {
            giftList,
        } = this.state;
        const phoneGift = giftList[0];
        const videoGift = giftList.slice(1, 5)

        return (
            <div className='gift'>
                <div className='gift-title'>
                    请选择您要充值的项目：
                    <Link to='/h5/gift/giftList' style={{float:'right'}}>充值记录</Link>
                </div>


                <div className={'gift-sub'}>话费充值：</div>
                <div className='gift-list'>
                    {
                        <div className={giftList[0].active ? 'gift-item active' : 'gift-item'}
                             onClick={() => {
                                 giftList.map((gift, index) => {

                                     gift.active = index === 0;
                                 });
                                 this.setState({
                                     type: 'PHONE',
                                     giftList
                                 })
                             }}
                        >
                            {phoneGift.name}
                        </div>
                    }
                </div>

                <div className='gift-sub'>
                    视频充值
                </div>
                <div className='gift-list'>
                    {
                        videoGift.map((gift, index) => {
                            return <div className={gift.active ? 'gift-item active' : 'gift-item'}
                                        onClick={() => {
                                            giftList.map((gift, _index) => {
                                                gift.active = index + 1 === _index;
                                            });


                                            this.setState({
                                                type: 'VIDEO',
                                                giftList,
                                                showQQ:index===2
                                            })
                                        }}
                                        key={index}>
                                {gift.name}
                            </div>
                        })
                    }
                </div>


               <div className={'phone'}>
                  <div className='label'>充值手机号:</div>
                   <Input
                       maxLength={11}
                       type={'number'}
                       size='default'
                       onChange={(e)=>{
                           this.setState({
                               phone:e.target.value
                           })
                       }}
                   />
               </div>


                {
                    this.state.showQQ &&   <div className={'phone'}>
                        <div className='label'>QQ账户:</div>
                        <Input
                            type={'number'}
                            size='default'
                            onChange={(e)=> {
                                this.setState({
                                    account: e.target.value
                                })
                            }}
                        />
                    </div>
                }


                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Button style={{marginTop: 50}} onClick={(e) => {
                        this.setState({
                            btnDisabled: true,
                        });
                        let goodsType = ''
                        giftList.map((gift)=>{
                            if(gift.active) goodsType = gift.goodsType
                        })
                        API.giftApply({
                            token:sessionStorage.giftToken,
                            mobile:this.state.phone,
                            rechargeType:this.state.type,
                            goodsType,
                            account:this.state.account
                        }).then(data=>{
                            this.setState({
                                btnDisabled: false,
                            });
                            if(data.success){
                                message.success('充值成功！')

                            }else{
                                message.error(data.message)
                            }
                        })
                    }} disabled={this.state.btnDisabled ? true : false} type="primary" block>
                        确认充值
                    </Button>

                </div>


            </div>
        );
    }
}

const WrappedRegistrationForm = Form.create()(loginPage);
export default connect((state) => ({
    state,
}), {})(WrappedRegistrationForm);
