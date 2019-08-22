import React, {Component} from 'react';
import {connect} from 'react-redux';
import {object, func} from 'prop-types';
import {Form, Input, Select, Button, Upload, Icon, message, Spin, Popconfirm, Radio, DatePicker, Checkbox} from 'antd';
import {getList} from './action';
import API from '@/api/api';
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import {Tree} from 'antd';
import api from "../../api/api";

const FormItem = Form.Item;
const {TextArea} = Input;
const {TreeNode} = Tree;

class Home extends Component {
    static propTypes = {
        screenReducer: object,
        getSplashScreenInfoById: func,
    };
    state = {
        btnDisabled: false,
        menuList: [],
        menu: []
    }

    /**
     * [componentDidMount 加载render方法之前,获取所有用户列表]
     * @return {[type]} [description]
     */
    componentDidMount() {
        this.props.getList({
            pageNo: 1,
            pageSize: 100
        });


        api.roleMenu({
            roleId: this.props.id
        }).then(data => {
            this.setState({
                menu: data.data.map(data => data.menuCode)
            }, () => {
                console.log(this.state.menu);
                api.menuList({
                    pageNo: 1,
                    pageSize: 100
                }).then(data => {
                    this.setState({
                        menuList: data.data.map(data => {
                            if(data) return data
                        })
                    })
                })
            })
        })
    }


    /*
    上传表单数据
     */
    postData = async (values) => {
        try {
            let result;
            if (this.props.id) {
                values.menuCode = this.state.menuCode;
                values.menuType = 1;
                values.roleId = this.props.id;
                delete values.id;

                result = await API.updateDepartment(values);
            } else {
                values.roleValue = 1;
                result = await API.createPermission(values);
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

    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    onCheck = (checkedKeys, info) => {
        this.setState({
            menuCode: checkedKeys.join()
        });
        console.log('onCheck', checkedKeys, info);
    };


    render() {
        let {record} = this.props;
        const {submitting, form, onClose} = this.props;
        const {getFieldDecorator} = form;

        return (<Form style={{paddingBottom: 30}}>
                <Spin spinning={this.props.id && !record ? true : false}>


                    {
                        !this.props.id && [
                            <FormItem {...stationEditFormDrawer} label="角色名" key='roleKey'>
                                {getFieldDecorator('roleKey', {
                                    initialValue: record && record.departmentValue,
                                    rules: [{required: true, max: 30, whitespace: true, message: '请输入最多30位角色名'}],
                                })(
                                    <Input style={{width: '80%'}} maxLength={30} placeholder="请输入角色名称"/>
                                )}
                            </FormItem>
                            ,

                            <FormItem {...stationEditFormDrawer} label="备注" key='description'>
                                {getFieldDecorator('description')(
                                    <TextArea rows={4} placeholder='请输入备注'/>,
                                )}
                            </FormItem>
                        ]
                    }


                    {
                        this.props.id && [
                            <div>权限：</div>,

                            this.state.menuList && <Tree
                                checkable
                                defaultExpandedKeys={['qk', 'hd', 'xt']}
                                checkedKeys={this.state.menu}
                                onSelect={this.onSelect}
                                onCheck={this.onCheck}
                            >

                                {
                                    [1, 2, 3].map(index => (
                                        <TreeNode title={index === 1 ? '券库' : index === 2 ? '活动' : '系统'}
                                                  key={index === 1 ? 'qk' : index === 2 ? 'hd' : 'xt'}>
                                            {
                                                this.state.menuList.map(item => {
                                                    if (item.menuType === index) {
                                                        return <TreeNode title={item.menuName} key={item.menuCode}/>
                                                    }
                                                })
                                            }
                                        </TreeNode>
                                    ))
                                }

                            </Tree>


                        ]
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
    roleReducer: state.roleReducer,
}), {
    getList,
})(WrappedRegistrationForm);
