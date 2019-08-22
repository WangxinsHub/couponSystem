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
import {getList as getCouponList} from '../couponList/action'

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
        });

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
            result = await API.codeImport(values);
            if (result.message === 'success') {
                message.success('已发送！');
                Modal.info({
                    title: '提示',
                    content: (
                        <div>
                            <p>导入成功</p>
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
                var formData = new FormData();
                formData.append("couponId", this.props.id);
                if (this.state.file) formData.append("file", this.state.file);

                values.code = values.code.replace(/\n/g,',');
                formData.append("code", values.code);

                values.couponId = this.props.id;
                values.file = this.state.file;
                console.log(formData);
                // 提交表单
                that.postData(formData);
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
        const {list,} = this.props.couponReducer;

        return (<Form style={{paddingBottom: 30}}>

                <FormItem label='导入码值' {...stationEditFormDrawer} key="file">
                    {getFieldDecorator('file', {})(
                        <Upload
                            {...{
                                beforeUpload: file => {
                                    console.log(file);
                                    this.setState(state => ({
                                        fileList: [file],
                                        file: file
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
                            <span className='extra'> 支持扩展名：.xlsx，.xls,最多可支持1000条</span>
                        </Upload>
                    )}
                </FormItem>


                <FormItem label='码值' {...stationEditFormDrawer} key="code">
                    {getFieldDecorator('code', {})(
                        <TextArea rows={4} placeholder='每行一个'/>,
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
                    }} disabled={this.state.btnDisabled} type="primary">确定</Button>
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
    getDepartmentList,
})(WrappedRegistrationForm);
