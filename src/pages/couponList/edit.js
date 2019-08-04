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
    this.props.platformList({
      pageNo:1,
      pageSize:100
    })
  }


  /*
  上传表单数据
   */
  postData = async (values) => {
    try{
      let result;
      if(this.props.id){
        result = await API.updateCoupon(values);
      } else{
        result = await API.createCoupon(values);
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
        values.validEnd = values.validEnd.format('YYYY/MM/DD HH:mm:ss');
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
        <FormItem {...stationEditFormDrawer} label="券名称" key='couponName'>
          {getFieldDecorator('couponName', {
            initialValue: record && record.couponName,
            rules: [{ required: true, max:30, whitespace: true, message: '请输入最多30位的标题' }],
          })(
            <Input style={{ width: '80%' }} maxLength={30} placeholder="请输入标题" />
          )}
        </FormItem>

        <FormItem label='截止日期'{...stationEditFormDrawer}>
          {getFieldDecorator('validEnd', {
            initialValue:  record && moment(record.validEnd),
            rules: [{ required: true, message: '必填项' },
              // { validator: this.validateStartTime}
            ],
          })(
              <DatePicker style={{ width: '70%' }} showTime format="YYYY-MM-DD HH:mm:ss" placeholder="请选择上线时间" />
          )}
        </FormItem>

        <FormItem label='券平台' {...stationEditFormDrawer} key="platformId">
          {getFieldDecorator('platformId',{
            initialValue: record && record.platformName ? record.platformName : '',
            rules: [{ required: true, message: '必填项' }],
          })(
              <Select style={{width: '50%'}}
                      //onSelect={this.selectCity}
                      allowClear={true}
                      optionFilterProp="children"
                      placeholder="请选择">
                {
                  platformList && platformList.map((item, index) => {
                  return (<Option key={item.id} value={item.id}>{item.platformName}</Option>)
                })
              }</Select>
          )}
        </FormItem>

        {
          record &&  <FormItem {...stationEditFormDrawer}>
            <Upload
                {...{
                  action:Url.uploadFile,
                  onChange: this.handleFileChange,
                  multiple: false,
                  accept:'.xlsx,.xls'
                }}
                fileList={this.state.fileList}>
              <Button >
                <Icon type="upload"/> 导入券码
              </Button>
              <span className='extra'> 支持扩展名：.xlsx，.xls</span>
            </Upload>
          </FormItem>
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
