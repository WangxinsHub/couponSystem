import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {object, func} from 'prop-types';
import { Form, Input, Select, Button, Upload,Icon, message, Spin, Popconfirm, Radio ,DatePicker, Checkbox} from 'antd';
import UploadImage from '@/components/uploadImage/index';
import apiUrl from '@/api/url';
import {getList,platformList,createCoupon,updateCoupon} from './action';
import API from '@/api/api';
import {stationEditFormDrawer, tailFormItemLayout} from '@/utils/formStyle'
import Url from '@/api/url'
import Verify from '../../utils/verify'

const { TextArea } = Input;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const { Option } = Select;
const CheckboxGroup = Checkbox.Group;
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
    componentDidMount(){
    }


    /*
    上传表单数据
     */
    postData = async (values) => {
        try{
            let result;
            if(this.props.id){
                result = await API.updatePlantForm(values);
            } else{
                result = await API.createPlantForm(values);
            }
            if(result.message==='success') {
                message.success('保存成功！');
                this.props.onClose(true);
            } else {
                this.setState({
                    btnDisabled: false
                })
                message.error(result.message);
            }
        }catch(err){
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
        this.props.form.validateFieldsAndScroll({force:true},(err, values) => {
            if(!err){
                if(that.props.id) values.id = that.props.id;
                // 提交表单
                that.postData(values);
            }
            else{
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
        this.props.form.validateFieldsAndScroll({ force: true });

        let fileList = info.fileList;
        fileList = fileList.slice(-1);
        this.setState({ fileList,canInput: fileList.length === 0 })

        if(fileList && fileList[0]){
            if(info.file && info.file.response) this.setState({fileUrl:fileList[0].response.data})
        }
    }



    render() {
        const {imageUrl} = this.state;
        let {record} = this.props ;
        const { submitting, form, onClose } = this.props;
        const {  platformList } = this.props.couponReducer;
        const { getFieldDecorator } = form;

        return (<Form style={{paddingBottom: 30}}>
                <Spin spinning={ this.props.id && !record ? true : false}>
                    <FormItem {...stationEditFormDrawer} label="平台名称" key='platformName'>
                        {getFieldDecorator('platformName', {
                            initialValue: record && record.platformName,
                            rules: [{ required: true, max:30, whitespace: true, message: '请输入券平台名称' }],
                        })(
                            <Input style={{ width: '80%' }} maxLength={30} placeholder="请输入券平台名称" />
                        )}
                    </FormItem>

                    <FormItem {...stationEditFormDrawer} label="联系人" key='contact'>
                        {getFieldDecorator('contact', {
                            initialValue: record && record.contact,
                            rules: [{ required: true, max:30, whitespace: true, message: '请输入联系人名称' }],
                        })(
                            <Input style={{ width: '80%' }} maxLength={30} placeholder="请输入联系人" />
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
                            <Input style={{ width: '80%' }} maxLength={30} placeholder="请输入联系电话" />
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
                    <Button loading={submitting} onClick={(e)=>{
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
}), {
    getList,
    createCoupon,
    updateCoupon,
    platformList
})(WrappedRegistrationForm);
