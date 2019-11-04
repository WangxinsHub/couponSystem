import React, {Component, Fragment} from 'react';
import {is, fromJS} from 'immutable';
import api from '../../api/api'
import {Form, Select, Row, Input, Spin, Button, message} from "antd";
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import './index.css'
import Verify from "../../utils/verify";
import {Link} from 'react-router-dom';

const FormItem = Form.Item;
const {Option} = Select;

class Home extends Component {
    state = {
        activeList: null,
        couponList: []
    };

    componentDidMount() {
        api.userList({
            pageNo: 1,
            pageSize: 1000,
            loginAccount: sessionStorage.userName,
        }).then(data => {
            let user = data.data;
            if (user.length > 0) {
                api.activeList({
                    pageNo: 1,
                    pageSize: 1000,
                    departmentKey: user[0]['departmentKey'],
                    state: 'ONLINE',
                }).then((data) => {
                    console.log(data);
                    this.setState({
                        activeList: data
                    })
                })
            }
            console.log(user);

        })
    }

    validate = (e) => {
        e.preventDefault();
        let that = this;
        this.props.form.validateFieldsAndScroll({force: true}, (err, values) => {
            if (!err) {
                console.log(values);
                that.postData(values);
                // 提交表单
            } else {
                this.setState({
                    btnDisabled: false
                })
                console.log(err)
            }
        });
    }

    postData = async (values) => {
        try {
            let result = await api.sendCode({
                activityId: values.activeId,
                couponId: values.couponId,
                mobile: values.userPhone,
                file: null
            });
            if( result.message === 'success'){
                message.success('发送成功！');
            }else{
                this.setState({
                    btnDisabled: false
                })
                message.error(result.message);

            }
        } catch (err) {
            this.setState({
                btnDisabled: false
            })
            console.error(err);
        }
    }


    selectCoupon = (index) => {
        const activeList = this.state.activeList.data;
        let coupon = activeList && activeList.map(data=>{
            if(data.id === index){
                return data
            }
        }).filter(item=>item);

        if(coupon.length>0){
            let active = coupon[0];

            this.setState({
                couponList: active.activityCoupons
            })

        }

    };

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const {getFieldDecorator} = this.props.form;
        const {activeList, couponList} = this.state;
        const formItemLayout = {
            labelCol: {span: 4},
            wrapperCol: {span: 24},
        };
        return (
            <div className={'container'}>
                <Form>
                    <FormItem
                        label='活动'
                        {...formItemLayout}
                        required={true}>
                        {getFieldDecorator('activeId', {
                            rules: [{required: true, message: '请选择活动'}],
                        })(<Select style={{width: '100%'}}
                                   onSelect={this.selectCoupon}
                                   allowClear={true}
                                   optionFilterProp="children"
                                   placeholder="请选择活动">

                            {
                                activeList && activeList.data.map((item, index) => {
                                    return (
                                        <Option key={item.id}
                                                value={item.id}>
                                            {item.activityName}
                                        </Option>)
                                })
                            }
                        </Select>)}
                    </FormItem>

                    <FormItem
                        label='券'
                        {...formItemLayout}
                        required={true}>
                        {getFieldDecorator('couponId', {
                            rules: [{required: true, message: '请选择券'}],
                        })(<Select style={{width: '100%'}}
                                   allowClear={true}
                                   optionFilterProp="children"
                                   placeholder="请选择券">

                            {
                                couponList.length > 0 && couponList.map((item, index) => {
                                    return (
                                        <Option key={item.couponId}
                                                value={item.couponId}>
                                            {item.couponName}
                                        </Option>)
                                })
                            }
                        </Select>)}
                    </FormItem>

                    <FormItem {...stationEditFormDrawer} label="手机号" key='userPhone'>
                        {getFieldDecorator('userPhone', {
                            rules: [{
                                required: true,
                                max: 11,
                                whitespace: true,
                                pattern: Verify.mobile,
                                message: '请输入正确的手机号'
                            }],
                        })(
                            <Input maxLength={11} placeholder="请输入手机号"/>
                        )}
                    </FormItem>

                    <Button size={'large'}
                            style={{margin: "auto"}}
                            onClick={(e) => {
                                this.validate(e)
                            }} disabled={this.state.btnDisabled} type="primary">发送</Button>

                    <Link to='/h5/sendListH5' style={{float:'right'}}>发放明细</Link>
                </Form>

            </div>)
            ;
    }
}

const WrappedApp = Form.create({name: 'coordinated'})(Home);

export default WrappedApp