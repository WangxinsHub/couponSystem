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
    Checkbox, Upload
} from 'antd';
import apiUrl from '@/api/url';
import {getList, getDepartmentList,} from '../activeConfig/action';
import API from '@/api/api';
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import Url from '@/api/url'
import Verify from '../../utils/verify'
import {getList as getCouponList} from '../couponList/action'

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
    }


    /*
    上传表单数据
     */
    postData = async (values) => {
        try {
            let result;

            result = await API.sendCode(values);

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
                if (that.props.id) values.id = that.props.id;
                values.activityId = this.props.id;
                values.file = this.state.formData;
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
        console.log(info);
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
        this.setState({
            coupon
        })
    }

    render() {
        let {record} = this.props;
        const {submitting, form, onClose} = this.props;
        const {getFieldDecorator} = form;
        const {list,} = this.props.couponReducer;

        return (<Form style={{paddingBottom: 30}}>

                <FormItem
                    label='券' {...stationEditFormDrawer}
                    required={true}>
                    {getFieldDecorator('couponId', {
                        rules: [{required: true, message: '必填项'}],
                    })(
                        <Select style={{width: '50%'}}
                                allowClear={true}
                                optionFilterProp="children"
                                onChange={(value) => {
                                    this.selectCoupon(value)
                                }}
                                placeholder="请选择券">
                            {
                                list && list.data.map((item, index) => {
                                    return (<Option key={item.id}
                                                    value={index}>{item.couponName}</Option>)
                                })
                            }
                        </Select>
                    )}
                </FormItem>

                <FormItem label='添加手机号' {...stationEditFormDrawer} key="mobile">
                    {getFieldDecorator('mobile', {
                    })(
                        <TextArea rows={4} placeholder='每行一个,可同时输入100个'/>,
                    )}
                </FormItem>

                <FormItem label='导入手机号' {...stationEditFormDrawer} key="file">
                    {getFieldDecorator('file', {
                    })(
                        <Upload
                            {...{
                                beforeUpload: file => {
                                    const formData = new FormData();
                                    formData.append('files[]', file);
                                    this.setState(state => ({
                                        fileList: [file],
                                        formData
                                    }));
                                    return false;
                                },
                                multiple: false,
                                accept: '.xlsx,.xls'
                            }}
                            fileList={this.state.fileList}>
                            <Button>
                                <Icon type="upload"/>
                            </Button>
                            <span className='extra'> 支持扩展名：.xlsx，.xls</span>
                        </Upload>
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
                        this.validate(e,)
                    }} disabled={this.state.btnDisabled} type="primary">发布上线</Button>
                    <Button loading={submitting}
                            style={{marginLeft: 10}}
                            onClick={(e) => {
                                this.validate(e)
                            }} disabled={this.state.btnDisabled} type="primary">草稿</Button>
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
