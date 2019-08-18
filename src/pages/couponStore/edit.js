import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {object, func} from 'prop-types';
import {
    Form,
    Input,
    Select,
    Button,
    Upload,
    Icon,
    message,
    Spin,
    Popconfirm,
    Radio,
    DatePicker,
    Checkbox,
    InputNumber
} from 'antd';
import UploadImage from '@/components/uploadImage/index';
import apiUrl from '@/api/url';
import {getList, platformList, createCoupon, updateCoupon} from './action';
import API from '@/api/api';
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import {getList as getCouponList} from '../couponList/action'

const {TextArea} = Input;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const {Option} = Select;
const CheckboxGroup = Checkbox.Group;

class Home extends Component {
    static propTypes = {
        screenReducer: object,
        getSplashScreenInfoById: func,
    };
    state = {
        btnDisabled: false,
        activityCouponMessage: [{}],

    }

    /**
     * [componentDidMount 加载render方法之前,获取所有用户列表]
     * @return {[type]} [description]
     */
    componentDidMount() {
        this.props.getCouponList({
            pageNo: 1,
            pageSize: 1000
        })
    }


    selectCoupon = (activeIndex) => (couponIndex) => {
        console.log(couponIndex);
        const {list} = this.props.couponReducer;
        let coupon = list.data[couponIndex];

        const {activityCouponMessage} = this.state;
        activityCouponMessage[activeIndex] = {
            couponId: coupon.id,
            couponName: coupon.name,
            totalCount: coupon.totalCount,
            endTime: coupon.validEnd,

            ...coupon
        }
        this.setState({
            activityCouponMessage
        })
        console.log(list.data[couponIndex]);
    }

    /*
    上传表单数据
     */
    postData = async (values) => {
        try {
            let result;
            if (this.props.activityId && this.props.couponId) {
                values.couponId = this.props.couponId;
                values.activityId = this.props.activityId;
                result = await API.stock(values);
            } else {
                const {activityCouponMessage} = this.state;
                values.activityCouponMessage = JSON.stringify(
                    activityCouponMessage.map((item => (
                        {
                            couponId: item.couponId,
                            couponName: item.couponName,
                            totalCount: item.totalCount,
                        }
                    )))
                )
                values.id = this.props.match.params.id;
                result = await API.updateActive(values);
            }
            if (result.message === 'success') {
                message.success('保存成功！');
                this.props.onClose(true);
            } else {
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
                this.postData(values)
            } else {
                this.setState({
                    btnDisabled: false
                })
                console.log(err)
            }
        });
    }


    render() {
        const {imageUrl} = this.state;
        let {record} = this.props;
        const {submitting, form, onClose} = this.props;
        const {getFieldDecorator} = form;
        const {activityCouponMessage} = this.state;
        const {list,} = this.props.couponReducer;


        return (<Form style={{paddingBottom: 30}}>
                <Spin spinning={this.props.id && !record ? true : false}>
                    {
                        this.props.couponId && <FormItem {...stationEditFormDrawer} label="增加" key='count'>
                            {getFieldDecorator('count', {
                                rules: [{required: true, max: 30, whitespace: true, message: '必填'}],
                            })(
                                <Input type='number' style={{width: '80%'}} maxLength={30} placeholder="填写增加数量"/>
                            )}
                        </FormItem>
                    }


                    {
                        !this.props.couponId && activityCouponMessage && activityCouponMessage.map((active, activeIndex) => {
                            return [
                                <FormItem
                                    label='券' {...stationEditFormDrawer}
                                    required={true}
                                    key="couponId+" activeIndex>
                                    <Select style={{width: '50%'}}
                                            onSelect={this.selectCoupon(activeIndex)}
                                            allowClear={true}
                                            optionFilterProp="children"
                                            placeholder="请选择券">
                                        {
                                            list && list.data.map((item, index) => {
                                                return (<Option key={item.id}
                                                                value={index}>{item.couponName}</Option>)
                                            })
                                        }</Select>

                                </FormItem>
                                ,
                                active.couponId && <FormItem
                                    validateStatus={activityCouponMessage[activeIndex].validateStatus}
                                    help={activityCouponMessage[activeIndex].errorMsg}
                                    key={activeIndex}>
                                    <div>
                                        当前可用量<b>{active.stockCount - active.lockedCount}</b>，使用
                                        <InputNumber
                                            precision={0}
                                            onChange={(number) => {
                                                function check() {
                                                    // if (number === 11) {
                                                    //     return {
                                                    //         validateStatus: 'success',
                                                    //         errorMsg: null,
                                                    //     };x
                                                    // }
                                                    // return {
                                                    //     validateStatus: 'error',
                                                    //     errorMsg: 'The prime between 8 and 12 is 11!',
                                                    // };
                                                    return {
                                                        validateStatus: 'success',
                                                        errorMsg: null,
                                                    };
                                                }

                                                const {activityCouponMessage} = this.state;
                                                let {
                                                    validateStatus,
                                                    errorMsg
                                                } = check(number)
                                                activityCouponMessage[activeIndex].validateStatus = validateStatus
                                                activityCouponMessage[activeIndex].errorMsg = errorMsg
                                                activityCouponMessage[activeIndex].totalCount = number
                                                this.setState({
                                                    activityCouponMessage
                                                })
                                            }}
                                            placeholder="请输入数量">
                                        </InputNumber>
                                        (请于<b>{active.endTime}</b>前使用)
                                    </div>
                                </FormItem>
                            ]
                        })
                    }
                    {
                        !this.props.couponId && <Fragment>
                            <a onClick={() => {
                                const {activityCouponMessage} = this.state;
                                console.log(activityCouponMessage);
                                activityCouponMessage.push([])

                                this.setState({
                                    activityCouponMessage
                                })
                            }}>新增券</a>
                        </Fragment>
                    }

                </Spin>
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
    activeConfigReducer: state.activeConfigReducer,
}), {
    getList,
    getCouponList
})(WrappedRegistrationForm);
