import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {object, func} from 'prop-types';
import {
    Form,
    Input,
    Select,
    Button,
    Icon,
    message,
    Popconfirm,
    Upload, Modal
} from 'antd';
import {getList, getDepartmentList,} from '../activeConfig/action';
import API from '@/api/api';
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import {getList as getCouponList} from '../couponStore/action'
import Verify from '../../utils/verify'


const FormItem = Form.Item;
const {Option} = Select;
const {TextArea} = Input;


class Home extends Component {
    static propTypes = {
        screenReducer: object,
        getSplashScreenInfoById: func,
    };
    state = {
        btnDisabled: false,
        activityCouponMessage: [{}],
        errorMsg: '',
        stockCount: 0,
        coupon:null
    };

    /**
     * [componentDidMount 加载render方法之前,获取所有用户列表]
     * @return {[type]} [description]
     */
    componentDidMount() {
        this.props.getCouponList({
            pageNo: 1,
            pageSize: 1000,
            activityId: this.props.id
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
            let result, that = this;
            result = await API.sendCode(values);
            if (result.message === 'success') {
                message.success('已发送！');
                Modal.info({
                    title: '提示',
                    content: (
                        <div>
                            <p>本次成功导入 <b>{result.data.batchCount}</b> 条手机号码</p>
                            {this.state.failMobile && <a href={result.data.failMobile}>下载失败的手机号码</a>}
                            <p>本次发送任务的批次号为:</p>
                            <p><b>{result.data.batchId}</b></p>
                            <p>请以此批次号查询发送结果</p>
                        </div>
                    ),
                    onOk() {
                        that.props.onClose(true);
                    },
                });
            } else {
                this.setState({
                    btnDisabled: false
                })
                Modal.info({
                    title: '提示',
                    content: (
                        <div>
                            <p>{result.message}</p>
                        </div>
                    ),
                    onOk() {
                    },
                });
            }
        } catch (err) {
            this.setState({
                btnDisabled: false
            });
            console.error(err);
        }
    };

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

                if (that.props.id) values.id = that.props.id;
                values.activityId = this.props.id;
                values.file = this.state.formData;
                let testPhone = true;

                if (values.mobile) {
                    values.mobile = values.mobile.replace(/\n/g, ',');
                    let mobileArr = values.mobile.split(',');
                    if (mobileArr.length > 0) {
                        mobileArr.map((mobile) => {
                            let reg = new RegExp(Verify.mobile);
                            if (!reg.test(mobile)) {
                                testPhone = false;
                            }
                        });

                    }
                }

                if (testPhone) {
                    var formData = new FormData();

                    for (let key in values) {
                        formData.append(key, values[key]);
                    }
                    // 提交表单
                    console.log(values);
                    that.postData(formData);
                } else {
                    Modal.error({
                        title: '提示',
                        content: (
                            <div>
                                <p>请检查手机号列表格式是否正确</p>
                            </div>
                        ),
                        onOk() {
                        },
                    });
                }
            } else {
                this.setState({
                    btnDisabled: false
                })
                console.log(err)
            }
        });
    }

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
    };

    selectCoupon = (coupon)  => {


        this.setState({
            coupon
        })
    };

    render() {
        let {stockCount, coupon} = this.state;
        const {submitting, form, onClose} = this.props;
        const {getFieldDecorator} = form;
        const {list,} = this.props.couponStore;

        console.error(coupon)

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
                                onChange={(value, p) => {
                                    console.log(value, p);
                                    this.setState({
                                        stockCount: p.props.data.stockCount
                                    });
                                    this.selectCoupon(p.props.data)
                                }}
                                placeholder="请选择券">
                            {
                                list && list.data.map((item, index) => {
                                    return (<Option key={item.couponId}
                                                    data={item}
                                                    value={item.couponId}>{item.couponName}</Option>)
                                })
                            }
                        </Select>
                    )}
                    {
                        this.state.coupon && <div>
                            <b>
                                {stockCount === 0 ? '库存不足！' : `库存量:${stockCount}`}
                            </b>
                        </div>
                    }

                </FormItem>


                <FormItem label='添加手机号' {...stationEditFormDrawer} key="mobile">
                    {getFieldDecorator('mobile', {})(
                        <TextArea rows={4} placeholder='每行一个,可同时输入100个'/>,
                    )}
                </FormItem>

                <FormItem label='导入手机号' {...stationEditFormDrawer} key="file">
                    {getFieldDecorator('file', {})(
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
                    <a href="http://shande.xajhzx.cn/service/activity/template">下载手机文件模板</a>
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
                    }} disabled={this.state.btnDisabled} type="primary">发送</Button>
                </div>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(Home);
export default connect((state) => ({
    couponReducer: state.couponReducer,
    couponStore: state.couponStore,
    activeConfigReducer: state.activeConfigReducer,
}), {
    getList,
    getCouponList,
    getDepartmentList
})(WrappedRegistrationForm);
