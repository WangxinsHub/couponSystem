import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {object, func} from 'prop-types';
import {Form, Input, Select, Button, Upload, Icon, message, Spin, Popconfirm, Radio, DatePicker, Checkbox} from 'antd';
import {getList} from './action';
import API from '@/api/api';
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import Verify from "../../utils/verify";

const FormItem = Form.Item;
const {Option} = Select;

class Home extends Component {
    static propTypes = {
        screenReducer: object,
        getSplashScreenInfoById: func,
    };
    state = {
        btnDisabled: false,
    }

    /**
     * [componentDidMount 加载render方法之前,获取所有用户列表]
     * @return {[type]} [description]
     */
    componentDidMount() {
        this.props.getList({
            pageNo: 1,
            pageSize: 100
        })
    }


    /*
    上传表单数据
     */
    postData = async (values) => {
        try {
            let result;
            if (this.props.id) {
                result = await API.updateDepartment(values);
            } else {
                result = await API.createDepartment(values);
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
                if (that.props.id) values.id = that.props.id;
                // 提交表单
                that.postData(values);
            } else {
                this.setState({
                    btnDisabled: false
                })
                console.log(err)
            }
        });
    }

    render() {
        let {record} = this.props;
        const {submitting, form, onClose} = this.props;
        const {getFieldDecorator} = form;

        return (<Form style={{paddingBottom: 30}}>
                <Spin spinning={this.props.id && !record ? true : false}>
                    <FormItem {...stationEditFormDrawer} label="名称" key='departmentValue'>
                        {getFieldDecorator('departmentValue', {
                            initialValue: record && record.departmentValue,
                            rules: [{required: true, max: 30, whitespace: true, message: '请输入渠道名称'}],
                        })(
                            <Input style={{width: '80%'}} maxLength={30} placeholder="请输入渠道名称"/>
                        )}
                    </FormItem>

                    <FormItem {...stationEditFormDrawer} label="联系人" key='contact'>
                        {getFieldDecorator('contact', {
                            initialValue: record && record.departmentValue,
                            rules: [{required: true, max: 30, whitespace: true, message: '请输入联系人'}],
                        })(
                            <Input style={{width: '80%'}} maxLength={30} placeholder="请输入联系人名称"/>
                        )}
                    </FormItem>

                    <FormItem {...stationEditFormDrawer} label="联系电话" key='mobile'>
                        {getFieldDecorator('mobile', {
                            initialValue: record && record.mobile,
                            rules: [{
                                validator: (rule, value, callback) =>{
                                    if(!value) {
                                        callback('请输入固话或手机号');
                                    }
                                    if(!new RegExp(Verify.mobile).test(value)
                                        && !new RegExp(Verify.phone).test(value)){
                                        callback('请输入固话或手机号');
                                    }
                                    callback();
                                },
                            }],
                        })(
                            <Input style={{width: '80%'}} placeholder="请输入固话或手机号"/>
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
                        this.validate(e)
                    }} disabled={this.state.btnDisabled} type="primary">保存</Button>
                </div>
            </Form>
        );
    }
}

const WrappedRegistrationForm = Form.create()(Home);
export default connect((state) => ({
    departmentReducer: state.departmentReducer,
}), {
    getList,
})(WrappedRegistrationForm);
