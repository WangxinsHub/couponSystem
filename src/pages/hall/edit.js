import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {object, func, any} from 'prop-types';
import {
    Form,
    Input,
    Select,
    Button,
    Upload,
    Icon,
    message,
    Popconfirm,
    DatePicker,
    Modal,
    Row,
    Col
} from 'antd';

import {getList, platformList, createCoupon, updateCoupon} from './action';
import API from '@/api/api';
import {stationEditFormDrawer, inlineLayout} from '@/utils/formStyle'

const FormItem = Form.Item;
const {Option} = Select;

class Home extends Component {
    static propTypes = {
        screenReducer: object,
        getSplashScreenInfoById: func,
    };
    state = {
        btnDisabled: false,
        platformId: this.props.record && this.props.record.platformId
    }

    /**
     * [componentDidMount 加载render方法之前,获取所有用户列表]
     * @return {[type]} [description]
     */
    componentDidMount() {

    }


    /*
    上传表单数据
     */
    postData = async (values) => {
        const that = this;
        try {
            let result;
            if (this.props.record) {
                values.code = '';
                values.meetingId = this.props.record.meetingId;
                result = await API.mUpdate(values);
                if (result.message === 'success') {
                    message.success(result.message);
                    this.props.onClose(true);
                } else {
                    this.setState({
                        btnDisabled: false
                    });
                    message.error(result.message);
                }
            } else {

                result = await API.addMeet(values);
                if (result.message === 'success') {
                    message.success('保存成功！');
                    this.props.onClose(true);
                } else {
                    this.setState({
                        btnDisabled: false
                    });
                    message.error(result.message);
                }
            }

        } catch (err) {
            this.setState({
                btnDisabled: false
            })
        }
    }
    /**
     * [点击提交表单做验证]
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    validate = (e) => {
        e.preventDefault();
        let that = this;
        this.props.form.validateFieldsAndScroll({force: true}, (err, values) => {
            if (!err) {
                console.log(values);
                that.postData(values);
            } else {
                this.setState({
                    btnDisabled: false
                });
            }
        });
    };

    disabledStartDate = startValue => {
        let st = new Date(startValue).valueOf();
        let now = new Date().valueOf();

        if (this.props.record && this.props.record.validEnd) {
            return st < moment(this.props.record.validEnd);
        } else {
            return st < now
        }
    };


    render() {
        let {record} = this.props;
        const {submitting, form, onClose} = this.props;
        const {platformList} = this.props.couponReducer;
        const {getFieldDecorator} = form;

        return (<Form style={{paddingBottom: 30}}>

                <FormItem label="会场名称" key='meetingName'>
                    {getFieldDecorator('meetingName', {
                        initialValue: record && record.meetingName,
                        rules: [{required: true, max: 30, whitespace: true, message: '请输入会场的名称'}],
                    })(
                        <Input style={{width: '80%'}} maxLength={30} placeholder="请输入会场的名称"/>
                    )}
                </FormItem>
                <FormItem label='活动状态' key='meetingState'>
                    {getFieldDecorator('meetingState', {
                        initialValue: record && record.meetingState,
                        rules: [{required: true, message: '活动状态'}],
                    })(
                        <Select style={{width: 150}} placeholder='请选择活动状态'>
                            <Option value={0}>关闭</Option>
                            <Option value={1}>开启</Option>
                        </Select>
                    )}
                </FormItem>
                <div style={{display: 'flex', width: '100%'}}>
                    <FormItem>
                        {getFieldDecorator('limitType', {
                            initialValue: record && record.limitType,
                            rules: [{required: true, message: '请选择入场限制'}],
                        })(
                            <Select style={{width: 150}} placeholder='请选择入场限制'>
                                <Option value={0}>不限</Option>
                                <Option value={1}>按省</Option>
                                <Option value={2}>按市</Option>
                                <Option value={3}>按运营商</Option>
                            </Select>
                        )}
                    </FormItem>
                    <FormItem>
                        {getFieldDecorator('limitCode', {
                            initialValue: record && record.limitType,
                            rules: [{required: true, whitespace: true, message: '请输入限制值多个以|分割，如：甘肃|陕西'}],
                        })(
                            <Input placeholder='请输入限制值多个以|分割，如：甘肃|陕西'/>
                        )}
                    </FormItem>
                </div>
                <FormItem>
                    {getFieldDecorator('limitMessage', {
                        initialValue: record && record.limitMessage,
                        rules: [{required: true, whitespace: true, message: '请输入被限用户的提示语'}],
                    })(
                        <Input placeholder='请输入被限用户的提示语'/>
                    )}
                </FormItem>

                <FormItem label="黑名单提示">
                    {getFieldDecorator('blackLimitMessage', {
                        initialValue: record && record.blackLimitMessage,
                        rules: [{required: true, whitespace: true, message: '请输入被限用户的提示语'}],
                    })(
                        <Input placeholder='请输入黑名单用户提示语'/>
                    )}
                </FormItem>


                <FormItem {...stationEditFormDrawer} label="支付限制" key='payLimitType'>
                    {getFieldDecorator('payLimitType', {
                        initialValue: record && record.payLimitType,
                        rules: [{required: true,message: '请输入支付限制'}],
                    })(
                        <Select placeholder='请选择支付限制'>
                            <Option value={0}>不限</Option>
                            <Option value={1}>建行卡</Option>
                            <Option value={2}>建行行用卡</Option>
                            <Option value={3}>银联卡</Option>
                        </Select>
                    )}
                </FormItem>

                <FormItem  key='payLimitTimes'>
                    每人限制 {getFieldDecorator('payLimitTimes', {
                    initialValue: record && record.payLimitTimes,
                    rules: [{required: true, message: '请输入限制次数'}],
                })(
                    <Input style={{width: 60}} type='number'/>
                )} 次
                </FormItem>


                <FormItem key='payLimitMessage'>
                    {getFieldDecorator('payLimitMessage', {
                        initialValue: record && record.payLimitMessage,
                        rules: [{required: true, whitespace: true, message: '请输入被限购的提示语'}],
                    })(
                        <Input placeholder='请输入被限购的提示语'/>
                    )}
                </FormItem>


                <FormItem {...stationEditFormDrawer} label="会场地址" key='meetingUrl'>

                    {getFieldDecorator('meetingUrl', {
                        initialValue: record && record.meetingUrl,
                        rules: [{required: true, whitespace: true, message: '请输入会场页面地址'}],
                    })(
                        <Input placeholder='请输入会场页面地址'/>
                    )}

                </FormItem>


                <FormItem {...stationEditFormDrawer} label="会场说明" key='meetingDec'>

                    {getFieldDecorator('meetingDec', {
                        initialValue: record && record.meetingDec,
                        rules: [{ whitespace: true, message: '请输入会场会场说明'}],
                    })(
                        <Input.TextArea placeholder='请输入会场会场说明'/>
                    )}

                </FormItem>


                <div className="drawerBtns">
                    <Popconfirm
                        title='点击取消后您页面上的数据将全部丢弃，是否确认取消？'
                        onConfirm={onClose}
                        okText='是'
                        placement="topRight"
                        cancelText='否'
                    >
                        <Button style={{marginRight: 8}}>
                            取消
                        </Button>
                    </Popconfirm>
                    <Button loading={submitting} onClick={(e) => {
                        this.validate(e)
                    }} disabled={this.state.btnDisabled} type="primary">保存</Button>
                </div>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(Home);
export default connect((state) => ({
    couponReducer: state.couponReducer,
}), {
    getList,
    createCoupon,
    updateCoupon,
    platformList
})(WrappedRegistrationForm);
