import React, {Component} from 'react';
import {connect} from 'react-redux';
import {object, func} from 'prop-types';
import {Form, Input, Select, Button, Upload, Icon, message, Spin, Popconfirm, Radio, DatePicker, Checkbox} from 'antd';
import {getList} from './action';
import API from '@/api/api';
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import {getDepartmentList} from "../activeConfig/action";
import {getList as getRoleList} from '../role/action'

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
        this.props.getDepartmentList({
            pageNo: 1,
            pageSize: 1000
        })
        this.props.getRoleList({
            pageNo: 1,
            pageSize: 1000
        })
    }


    /*
    上传表单数据
     */
    postData = async (values) => {
        try {
            let result, roleReust;
            if (this.props.id) {
                result = await API.updateRole({
                    position:values.position,
                    userPhone:values.userPhone,
                    departmentKey:values.departmentKey,
                    id:values.id
                });
                roleReust = await API.connectRole({
                    userId: values.id,
                    roleIds: values.roleIds.join() //多选
                })
            } else {
                result = await API.createRole(values);
            }
            if (result.message === 'success' && roleReust.message === 'success') {
                message.success('保存成功！');
                this.props.onClose(true);
            } else {
                this.setState({
                    btnDisabled: false
                })
                if(result.message !== 'success' ){
                    message.error(result.message);
                }else{
                    message.error(roleReust.message);
                }
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
        const {departmentList} = this.props.activeConfigReducer
        const {list} = this.props.roleReducer

        return (<Form style={{paddingBottom: 30}}>
                <Spin spinning={this.props.id && !record ? true : false}>
                    <FormItem label='渠道商' {...stationEditFormDrawer} key="departmentKey">
                        {getFieldDecorator('departmentKey', {
                            initialValue: record && record.departmentKey ? record.departmentKey : undefined,
                            rules: [{required: true, message: '必填项'}],
                        })(
                            <Select style={{width: '50%'}}
                                    allowClear={true}
                                    optionFilterProp="children"
                                    onSelect={this.handleSelect}
                                    placeholder="请选择"
                            >
                                {
                                    departmentList && departmentList.data.map((item, index) => {
                                        return (<Option key={item.departmentKey}
                                                        value={item.departmentKey}>
                                            {item.departmentValue}
                                        </Option>)
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>

                    {
                        !this.props.id && <FormItem {...stationEditFormDrawer} label="用户名" key='userName'>
                            {getFieldDecorator('userName', {
                                initialValue: record && record.userName,
                                rules: [{required: true, max: 30, whitespace: true, message: '请输入最多30位用户名称'}],
                            })(
                                <Input style={{width: '80%'}} maxLength={30} placeholder="请输入用户名"/>
                            )}
                        </FormItem>
                    }


                    <FormItem label='职务' {...stationEditFormDrawer} key="position">
                        {getFieldDecorator('position', {
                            initialValue: record && record.position ? record.position : undefined,
                            rules: [{required: true, message: '必填项'}],
                        })(
                            <Select style={{width: '50%'}}
                                    allowClear={true}
                                    optionFilterProp="children"
                                    placeholder="请选择">
                                <Option
                                    value={0}>
                                    员工
                                </Option>
                                <Option
                                    value={1}>
                                    主管
                                </Option>
                            </Select>
                        )}
                    </FormItem>

                    {
                        !this.props.id && <FormItem {...stationEditFormDrawer} label="账号" key='loginAccount'>
                            {getFieldDecorator('loginAccount', {
                                initialValue: record && record.loginAccount,
                                rules: [{required: true, max: 30, whitespace: true, message: '请输入最多30位用户名称'}],
                            })(
                                <Input style={{width: '80%'}} maxLength={30} placeholder="请输入用户名"/>
                            )}
                        </FormItem>
                    }

                    {
                        !this.props.id && <FormItem {...stationEditFormDrawer} label="密码" key='loginPass'>
                            {getFieldDecorator('loginPass', {
                                rules: [{required: true}],
                            })(
                                <Input style={{width: '80%'}} placeholder="请填写密码"/>
                            )}
                        </FormItem>
                    }


                    {
                        this.props.id && <FormItem label='角色' {...stationEditFormDrawer} key="roleIds">
                            {getFieldDecorator('roleIds', {
                                initialValue: record && record.roleIds ? record.roleIds : undefined,
                                rules: [{required: true, message: '必填项'}],
                            })(
                                <Select style={{width: '50%'}}
                                        allowClear={true}
                                        optionFilterProp="children"
                                        mode="multiple"
                                        onSelect={this.handleSelect}
                                        placeholder="请选择">
                                    {
                                        list && list.data.map((item, index) => {
                                            return (<Option key={item.roleId}
                                                            value={item.roleId}>
                                                {item.roleKey}
                                            </Option>)
                                        })
                                    }</Select>
                            )}
                        </FormItem>
                    }
                    <FormItem {...stationEditFormDrawer} label="联系电话" key='userPhone'>
                        {getFieldDecorator('userPhone', {
                            initialValue: record && record.userPhone,
                            rules: [{required: true, max: 11, whitespace: true, message: '请输入11位电话号'}],
                        })(
                            <Input style={{width: '80%'}} maxLength={11} placeholder="请输入联系电话"/>
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
    userReducer: state.userReducer,
    activeConfigReducer: state.activeConfigReducer,
    roleReducer: state.roleReducer
}), {
    getList,
    getDepartmentList,
    getRoleList
})(WrappedRegistrationForm);
