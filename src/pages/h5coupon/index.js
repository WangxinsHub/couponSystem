import React, {Component, Fragment} from 'react';
import {is, fromJS} from 'immutable';
import api from '../../api/api'
import {Form, Select,Row} from "antd";
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import './index.css'

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
            loginAccount:sessionStorage.userName,
        }).then(user=>{
            if(user.length>0){
                api.activeList({
                    pageNo: 1,
                    pageSize: 1000,
                    departmentKey:user[0]['departmentKey'],
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

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const { getFieldDecorator } = this.props.form;
        const {activeList} = this.state;
        const formItemLayout = {
            labelCol: { span: 4 },
            wrapperCol: { span: 24 },
        };
        return (
            <div className={'container'}>
                <Form  >
                    <FormItem
                        label='活动'
                        {...formItemLayout}
                        required={true}>
                        {getFieldDecorator('note', {
                            rules: [{ required: true, message: 'Please input your note!' }],
                        })(     <Select style={{width: '100%'}}
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

                    {/*<FormItem*/}
                    {/*    label='券'*/}
                    {/*    {...formItemLayout}*/}
                    {/*    required={true}>*/}
                    {/*    {getFieldDecorator('note', {*/}
                    {/*        rules: [{ required: true, message: 'Please input your note!' }],*/}
                    {/*    })(     <Select style={{width: '100%'}}*/}
                    {/*        // onSelect={this.selectCoupon(activeIndex)}*/}
                    {/*                    allowClear={true}*/}
                    {/*                    optionFilterProp="children"*/}
                    {/*                    placeholder="请选择活动">*/}

                    {/*        {*/}
                    {/*            activeList && activeList.data.map((item, index) => {*/}
                    {/*                return (*/}
                    {/*                    <Option key={item.id}*/}
                    {/*                            value={index}>*/}
                    {/*                        {item.activityName}*/}
                    {/*                    </Option>)*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*    </Select>)}*/}
                    {/*    */}
                    {/*</FormItem>*/}
                </Form>

            </div>)
        ;
    }
}
const WrappedApp = Form.create({ name: 'coordinated' })(Home);

export default WrappedApp