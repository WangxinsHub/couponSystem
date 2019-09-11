import React, {Component, Fragment} from 'react';
import {is, fromJS} from 'immutable';
import api from '../../api/api'
import {Form, Select, Row, Input, Spin, Button, message} from "antd";
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import './index.css'
import Verify from "../../utils/verify";

const FormItem = Form.Item;
const {Option} = Select;

class Home extends Component {
    state = {
        activeList: null
    };

    componentDidMount() {
        api.userList({
            pageNo: 1,
            pageSize: 1000,
            loginAccount: sessionStorage.userName,
        }).then(user => {
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

    postData = async (values) => {
        try {
            let result, roleReust;
            if (this.props.id) {
                result = await api.updateRole({
                    position: values.position,
                    userPhone: values.userPhone,
                    departmentKey: values.departmentKey,
                    id: values.id
                });
                roleReust = await api.connectRole({
                    userId: values.id,
                    roleIds: values.roleIds.join() //多选
                })
            } else {
                result = await api.createRole(values);
            }

            if (this.props.id && result.message === 'success' && roleReust.message === 'success') {
                message.success('保存成功！');
                this.props.onClose(true);
            } else if (!this.props.id && result.message === 'success') {
                message.success('保存成功！');

            } else {
                this.setState({
                    btnDisabled: false
                })
                if (result.message !== 'success') {
                    message.error(result.message);
                } else {
                    message.error(roleReust.message);
                }
            }
            this.props.onClose(true);
        } catch (err) {
            this.setState({
                btnDisabled: false
            })
            console.error(err);
        }
    }


    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const {getFieldDecorator} = this.props.form;
        const {activeList} = this.state;
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
                        {getFieldDecorator('note', {
                            rules: [{required: true, message: 'Please input your note!'}],
                        })(<Select style={{width: '100%'}}
                            // onSelect={this.selectCoupon(activeIndex)}
                                   allowClear={true}
                                   optionFilterProp="children"
                                   placeholder="请选择活动">

                            {
                                activeList && activeList.data.map((item, index) => {
                                    return (
                                        <Option key={item.id}
                                                value={index}>
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
                        {getFieldDecorator('note', {
                            rules: [{required: true, message: 'Please input your note!'}],
                        })(<Select style={{width: '100%'}}
                            // onSelect={this.selectCoupon(activeIndex)}
                                   allowClear={true}
                                   optionFilterProp="children"
                                   placeholder="请选择活动">

                            {
                                activeList && activeList.data.map((item, index) => {
                                    return (
                                        <Option key={item.id}
                                                value={index}>
                                            {item.activityName}
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
                            style={{margin:"auto"}}
                            onClick={(e) => {
                                this.validate(e)
                            }} disabled={this.state.btnDisabled} type="primary">发送</Button>
                </Form>

            </div>)
            ;
    }
}

const WrappedApp = Form.create({name: 'coordinated'})(Home);

export default WrappedApp