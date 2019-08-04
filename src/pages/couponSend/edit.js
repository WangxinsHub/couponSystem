import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {object, func} from 'prop-types';
import { Form, Input, Select, Button, Divider, message, Spin, Popconfirm, Radio ,DatePicker, Checkbox} from 'antd';
import UploadImage from '@/components/uploadImage/index';
import apiUrl from '@/api/url';
// import {getSplashScreenInfoById, getSourceList, findAllCities} from './action';
import API from '@/api/api';
import {editFormDrawer} from '@/utils/formStyle'

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
    alert(1)
    // if(this.props.id) {
    //   this.props.getSplashScreenInfoById({id: this.props.id});
    // }
    // this.props.getSourceList();
    // this.props.findAllCities({appSource:this.props.appSource});
  }
  
   /**
   * [getDerivedStateFromProps 父组件传参数进来改变子组件]
   * @param  {[type]} nextProps [description]
   * @param  {[type]} prevState [description]
   * @return {[type]}           [description]
   */
  static getDerivedStateFromProps(nextProps, prevState) {
    if(nextProps.screenReducer !== prevState.screenReducer) {
      return {
        screenReducer: nextProps.screenReducer,
        imageUrl: nextProps.screenReducer.splashScreenDetailInfo.image,
      };
    }
    return null;
  }

  /*
  上传表单数据
   */
  postData = async (values) => {
    try{
      let result;
      if(this.props.id){
        result = await API.modifySplashScreen(values);
      } else{
        result = await API.createSplashScreen(values);
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
        values.startTime = values.startTime.format('YYYY-MM-DD HH:mm:ss');
        values.endTime = values.endTime.format('YYYY-MM-DD HH:mm:ss');
        values.image = this.state.imageUrl;
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

   // 与下线时间校验 应早于下线时间
   validateStartTime = (rule, value, callback) => {
    const form = this.props.form;
    if ((value && value.isBefore(form.getFieldValue('endTime'))) || !form.getFieldValue('endTime')) {
      callback();
    } else {
      callback('上线时间应早于下线时间');
    }
  }
  // 与上线时间校验 应晚于上线时间
  validateEndTime = (rule, value, callback) => {
    const form = this.props.form;
    if ((value && value.isAfter(form.getFieldValue('startTime'))) || !form.getFieldValue('startTime')) {
      callback();
    } else {
      callback('下线时间应晚于上线时间');
    }
  }

  // 校验详情链接格式
  validateUrl =(rule, value, callback)=>{
  // 链接格式正则
  const regExp =  /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
  if(value&&!regExp.test(value)){
    callback('链接格式不正确');
  }
  callback();
}


  // 选择app源
  selectScrollAppSources = (key) => {
    const {form} = this.props;
    //清空之前的选择内容
    form.setFieldsValue({'cityCodeList': []});
    //获取城市列表
    this.props.findAllCities({appSource:key});  
  }

  render() {
    const {imageUrl} = this.state;
    let {splashScreenDetailInfo, sourceList, citiesList} ={} || this.props.screenReducer ;
    const { title ='', appSource='', osType=[], advertising, brief='', needLogin, cityCodeList, startTime, endTime} = splashScreenDetailInfo;
    const linkUrl = splashScreenDetailInfo.url||''
    const { submitting, form, onClose } = this.props;
    const { getFieldDecorator } = form;
    if(!this.props.id){
      splashScreenDetailInfo = null;
    };
    return (<Form style={{paddingBottom: 30}}>
      <Spin spinning={ this.props.id && !splashScreenDetailInfo ? true : false}>
        <FormItem {...editFormDrawer} label="标题" key='title'> 
          {getFieldDecorator('title', {
            initialValue: splashScreenDetailInfo && title,
            rules: [{ required: true, max:30, whitespace: true, message: '请输入最多30位的标题' }],
          })(
            <Input style={{ width: '80%' }} maxLength={30} placeholder="请输入标题" />
          )}
        </FormItem>
        <FormItem label='APP源' {...editFormDrawer} key="appSource">
          {getFieldDecorator('appSource', {
            initialValue:  splashScreenDetailInfo && appSource, 
            rules: [{ required: true, message: '必填项' }],
          })(
            <RadioGroup  disabled={splashScreenDetailInfo ? true : false}>
              {
                sourceList && sourceList.map((item)=>{
                  return <Radio value={item.key} key={item.key} onClick={()=>{this.selectScrollAppSources(item.key)}}>{item.value}</Radio>
                })
              }
            </RadioGroup>
          )}
        </FormItem>
        <FormItem label='城市' {...editFormDrawer} key="cityCodeList">
          {getFieldDecorator('cityCodeList',{
            initialValue: splashScreenDetailInfo ? cityCodeList : [] ,
            rules: [{ required: true, message: '必填项' }],
          })(
            <Select style={{width: '70%'}} disabled={splashScreenDetailInfo ? true : false} mode='multiple' allowClear={true} optionFilterProp="children" filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0} placeholder="请选择">{
              citiesList && citiesList.map((item, index) => {
                return (<Option key={item.cityCode} value={item.cityCode}>{item.cityName}</Option>)
                })
            }</Select>
          )}
        </FormItem>
        <FormItem label='是否需要登录'{...editFormDrawer} key="needLogin">
            {getFieldDecorator('needLogin', {
              initialValue:  splashScreenDetailInfo && needLogin,
              rules: [{ required: true, message: '必填项' }],
            })(
              <RadioGroup >
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
        </FormItem>
        <FormItem label='是否设为广告'{...editFormDrawer} key="advertising">
            {getFieldDecorator('advertising', {
              initialValue:  splashScreenDetailInfo && advertising,
              rules: [{ required: true, message: '必填项' }],
            })(
              <RadioGroup>
                <Radio value={true}>是</Radio>
                <Radio value={false}>否</Radio>
              </RadioGroup>
            )}
        </FormItem>
        <FormItem label='设备类型'{...editFormDrawer} key="osType">
          {getFieldDecorator('osType', {
            initialValue: splashScreenDetailInfo && osType,
            rules: [{ required: true, message: '必填项' }],
          })(
            <CheckboxGroup>
              <Checkbox value='Android'>Android</Checkbox>
              <Checkbox value='iOS'>iOS </Checkbox>
            </CheckboxGroup>
          )}
        </FormItem>
        <FormItem label="详情链接" {...editFormDrawer}  key='url'> 
          {getFieldDecorator('url', {
            initialValue: splashScreenDetailInfo && linkUrl,
            rules: [{ required: false, whitespace: true, message: '请输入链接' },
                    { validator: this.validateUrl}],
          })(
            <Input style={{ width: '90%' }} placeholder="请输入链接" />
          )}
        </FormItem>
        <FormItem label='上线时间'{...editFormDrawer}>
          {getFieldDecorator('startTime', {
            initialValue:  splashScreenDetailInfo && moment(startTime), 
            rules: [{ required: true, message: '必填项' },
                  { validator: this.validateStartTime}],
          })(
            <DatePicker style={{ width: '90%' }} showTime format="YYYY-MM-DD HH:mm:ss" placeholder="请选择上线时间" />
          )}
        </FormItem>
        <FormItem label='下线时间'{...editFormDrawer}>
          {getFieldDecorator('endTime', {
            initialValue: splashScreenDetailInfo && moment(endTime), 
            rules: [{ required: true, message: '必填项' },
                {validator: this.validateEndTime}
              ],
          })(
            <DatePicker style={{ width: '90%' }} showTime format="YYYY-MM-DD HH:mm:ss" placeholder="请选择下线时间" />
          )}
        </FormItem>
        <FormItem label='图片'{...editFormDrawer} key="image" extra='建议尺寸大小：1080x1556 支持格式：PNG JPG JPEG GIF'>
          {getFieldDecorator('image', {
            rules: [{
              required: true,
              validator: (rule, value, callback)=>{
                if(!imageUrl){
                  callback('请上传图片');
                }
                callback();
              },         
            }],
            validateTrigger: 'onClick'
          })(
          <UploadImage 
            url={apiUrl.uploadAnnoucementImage}
            name='file'
            imageUrl={splashScreenDetailInfo && imageUrl}
            uploadImage= {(imageUrl)=>{
              this.setState({
                imageUrl
              }) 
            }}/>)}
        </FormItem>
        <FormItem label='简介'{...editFormDrawer} key="brief">
          {getFieldDecorator('brief', {
            initialValue:  splashScreenDetailInfo && brief,
          }
          )(<TextArea style={{ width: '100%' }} autosize={{ minRows: 6, maxRows: 8 }} placeholder="请输入内容简介"/>)}
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
  // getSplashScreenInfoById,
  // getSourceList,
  // findAllCities
})(WrappedRegistrationForm);
