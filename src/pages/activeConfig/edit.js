import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {object, func} from 'prop-types';
import {
    Form,
    Input,
    Select,
    Button,
    DatePicker,
    Icon,
    message,
    Spin,
    Popconfirm,
    Radio,
    InputNumber,
    Checkbox
} from 'antd';
import apiUrl from '@/api/url';
import {getList, getDepartmentList,} from './action';
import API from '@/api/api';
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import Url from '@/api/url'
import Verify from '../../utils/verify'
import {getList as getCouponList} from '../couponList/action'
import Qs from 'qs'

const FormItem = Form.Item;
const {Option} = Select;
const CheckboxGroup = Checkbox.Group;
const {RangePicker,} = DatePicker;
const {TextArea} = Input;


class Home extends Component {
    static propTypes = {
        screenReducer: object,
        getSplashScreenInfoById: func,
    };
    state = {
        btnDisabled: false,
        activityCouponMessage: [{}],
        errorMsg: ''
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
        this.props.getDepartmentList({
            pageNo: 1,
            pageSize: 1000
        })

        if (this.props.record) {
            this.setState({
                departmentValue: this.props.record.departmentValue
            })
        }
    }


    /*
    上传表单数据
     */
    postData = async (values) => {
        try {
            let result;
            if (this.props.id) {
                result = await API.updateActive(values);
            } else {
                result = await API.createActive(values);
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
            if (!err && !this.state.errorMsg) {
                const {activityCouponMessage} = this.state;
                if(!that.props.id){
                    values.activityCouponMessage = JSON.stringify(
                        activityCouponMessage.map((item => (
                            {
                                couponId: item.couponId,
                                couponName: item.couponName,
                                totalCount: item.totalCount,
                            }
                        )))
                    )
                    values.validStart = values.rangeTime[0].format("YYYY/MM/DD HH:mm:ss");
                    values.validEnd = values.rangeTime[1].format("YYYY/MM/DD HH:mm:ss");
                }else{
                    values.departmentValue = this.state.departmentValue;
                    values.validEnd = values.validEnd.format("YYYY/MM/DD HH:mm:ss");
                    values.id = that.props.id;
                }
                delete values.rangeTime;

                // 提交表单
                console.log(values);
                that.postData(values);
            } else {
                this.setState({
                    btnDisabled: false
                })
                console.log(err)
            }
        });
    }

    //  // 与下线时间校验 应早于下线时间
    //  validateStartTime = (rule, value, callback) => {
    //   const form = this.props.form;
    //   if ((value && value.isBefore(form.getFieldValue('endTime'))) || !form.getFieldValue('endTime')) {
    //     callback();
    //   } else {
    //     callback('上线时间应早于下线时间');
    //   }
    // }
    /**
     * 上传文件
     * @param info
     */
    handleFileChange = (info,) => {
        this.props.form.validateFieldsAndScroll({force: true});

        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        this.setState({fileList, canInput: fileList.length === 0})

        if (fileList && fileList[0]) {
            if (info.file && info.file.response) this.setState({fileUrl: fileList[0].response.data})
        }
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

    handleSelect = (val, opt) => {
        this.setState({
            departmentValue: opt.props.children
        })
    }

    render() {
        const {activityCouponMessage} = this.state;
        let {record} = this.props;
        const {submitting, form, onClose} = this.props;
        const {list,} = this.props.couponReducer;
        const {departmentList,} = this.props.activeConfigReducer;
        const {getFieldDecorator} = form;

        let validStart, validEnd;

        if (record) {
            if (record.validStart) {
                validStart = moment(new Date(record.validStart))
            }
            if (record.validEnd) {
                validEnd = moment(new Date(record.validEnd))
            }
        }

        return (<Form style={{paddingBottom: 30}}>
                <Spin spinning={!!(this.props.id && !record)}>
                    <FormItem {...stationEditFormDrawer} label="活动名称" key='activityName'>
                        {getFieldDecorator('activityName', {
                            initialValue: record && record.activityName,
                            rules: [{required: true, max: 30, whitespace: true, message: '请输入最多30位的活动名称'}],
                        })(
                            <Input style={{width: '80%'}} maxLength={30} placeholder="请输入活动名称"/>
                        )}
                    </FormItem>

                    <FormItem label='渠道商' {...stationEditFormDrawer} key="departmentKey">
                        {getFieldDecorator('departmentKey', {
                            initialValue: record && record.departmentKey ? record.departmentKey : '',
                            rules: [{required: true, message: '必填项'}],
                        })(
                            <Select style={{width: '50%'}}
                                    allowClear={true}
                                    optionFilterProp="children"
                                    onSelect={this.handleSelect}
                                    placeholder="请选择">
                                {
                                    departmentList && departmentList.data.map((item, index) => {
                                        return (<Option key={item.departmentKey}
                                                        value={item.departmentKey}>
                                            {item.departmentValue}
                                        </Option>)
                                    })
                                }</Select>
                        )}
                    </FormItem>

                    {
                        !this.props.id && activityCouponMessage && activityCouponMessage.map((active, activeIndex) => {
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
                        !this.props.id && <Fragment>
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
                    {
                        !this.props.id && <FormItem label='活动有效期' {...stationEditFormDrawer} key="rangeTime">
                            {getFieldDecorator('rangeTime', {
                                initialValue: validStart && validEnd ? [validStart, validEnd] : '',
                                rules: [{required: true, message: '必填项'}],
                            })(
                                <RangePicker/>
                            )}
                        </FormItem>
                    }

                    {
                        this.props.id && <FormItem
                            label='状态'
                            {...stationEditFormDrawer}>
                            {getFieldDecorator('state', {
                                initialValue: record && record.state,
                                rules: [{required: true, message: '必填项'}],
                            })(
                                <Select style={{width: '50%'}}
                                        optionFilterProp="children"
                                        placeholder="请选择状态">
                                    <Option key={'READY'}
                                            value={'READY'}>待上线</Option>
                                    <Option key={'ONLINE'}
                                            value={'ONLINE'}>已上线</Option>
                                    <Option key={'OVER'}
                                            value={'OVER'}>已结束</Option>
                                    <Option key={'DRAFT'}
                                            value={'DRAFT'}>草稿</Option>
                                </Select>
                            )}
                        </FormItem>
                    }

                    {
                        this.props.id && <FormItem
                            label='结束时间'
                            {...stationEditFormDrawer}>
                            {getFieldDecorator('validEnd', {
                                initialValue: record && moment(new Date(record.validEnd)),
                                rules: [{required: true, message: '必填项'}],
                            })(
                                <DatePicker
                                    showTime
                                    placeholder="请选择结束时间"
                                    format="YYYY/MM/DD HH:mm:ss"
                                />
                            )}
                        </FormItem>
                    }


                    <FormItem label='活动说明' {...stationEditFormDrawer} key="description">
                        {getFieldDecorator('description', {
                            //initialValue: [moment(new Date()),moment(new Date())],
                            rules: [{required: true, message: '必填项'}],
                        })(
                            <TextArea rows={4}/>,
                        )}
                    </FormItem>

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
                        this.validate(e,)
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
    getCouponList,
    getDepartmentList
})(WrappedRegistrationForm);
