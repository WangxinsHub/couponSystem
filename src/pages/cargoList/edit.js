import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {object, func, any} from 'prop-types';
import {
  Form,
  Input,
  Select,
  Button,
  Upload,
  Icon,
  message,
  Popconfirm,
  DatePicker,
  Modal,
  Row,
  Col
} from 'antd';

import API from '@/api/api';
import {stationEditFormDrawer, inlineLayout} from '@/utils/formStyle'

const FormItem = Form.Item;
const {Option} = Select;

class Home extends Component {
  static propTypes = {
    screenReducer: object,
    getSplashScreenInfoById: func,
  };
  state = {
    btnDisabled: false,
    platformId: this.props.record && this.props.record.platformId,
    goodsConfigArr:[]
  }

  /**
   * [componentDidMount 加载render方法之前,获取所有用户列表]
   * @return {[type]} [description]
   */
  componentDidMount() {

  }


  /*
  上传表单数据
   */
  postData = async (values) => {
    const that = this;
    try {
      let result;
      if (this.props.record) {
        values.code = '';
        values.meetingId = this.props.record.meetingId;
        result = await API.mUpdate(values);
        if (result.message === 'success') {
          message.success(result.message);
          this.props.onClose(true);
        } else {
          this.setState({
            btnDisabled: false
          });
          message.error(result.message);
        }
      } else {

        result = await API.addMeet(values);
        if (result.message === 'success') {
          message.success('保存成功！');
          this.props.onClose(true);
        } else {
          this.setState({
            btnDisabled: false
          });
          message.error(result.message);
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
        console.log(values);
        that.postData(values);
      } else {
        this.setState({
          btnDisabled: false
        });
      }
    });
  };

  disabledStartDate = startValue => {
    let st = new Date(startValue).valueOf();
    let now = new Date().valueOf();

    if (this.props.record && this.props.record.validEnd) {
      return st < moment(this.props.record.validEnd);
    } else {
      return st < now
    }
  };


  render() {
    let {record} = this.props;
    const {submitting, form, onClose} = this.props;
    const {getFieldDecorator} = form;
    const {goodsConfigArr} = this.state;

    return (<Form style={{paddingBottom: 30}}>

        <FormItem label="名称" key='goodsName'>
          {getFieldDecorator('goodsName', {
            initialValue: record && record.goodsName,
            rules: [{required: true, max: 30, whitespace: true, message: '请输入商品的名称'}],
          })(
            <Input style={{width: '80%'}} maxLength={30} placeholder="请输入商品的名称"/>
          )}
        </FormItem>

        <FormItem label='类型' key='goodsType'>
          {getFieldDecorator('goodsType', {
            initialValue: record && record.goodsType,
            rules: [{required: true, message: '请选择活动类型'}],
          })(
            <Select style={{width: 150}} placeholder='请选择活动类型'>
              <Option value={0}>关闭</Option>
              <Option value={1}>开启</Option>
            </Select>
          )}
        </FormItem>

        <FormItem label='售价' key='price'>
          {getFieldDecorator('price', {
            initialValue: record && record.goodsType,
            rules: [{required: true, message: '请输入商品售价'}],
          })(
            <Input style={{width: '80%'}} type={'number'} placeholder="请输入商品售价"/>
          )}元
        </FormItem>


        <FormItem label='交货方式'>
          {getFieldDecorator('deliveType', {
            initialValue: record && record.deliveType,
            rules: [{required: true, message: '请选择交货方式'}],
          })(
            <Select style={{width: 150}} placeholder='请选择交货方式'>
              <Option value={0}>直冲</Option>
              <Option value={1}>卡密</Option>
              <Option value={2}>邮递</Option>
            </Select>
          )}
        </FormItem>


        <FormItem label='配置信息' >
          <a onClick={()=>{
            this.setState(())
          }}>新增配置</a>
        </FormItem>
        <div style={{display: 'flex', width: '100%',}}>
          {
            goodsConfigArr.map((item,index)=>{
              return (
                <div key={index}>
                  <FormItem label='键' {
                    ...{
                      labelCol: {span: 5},
                      wrapperCol: {span: 8},
                    }
                  }>
                    {getFieldDecorator('limitMessage', {
                      initialValue: record && record.limitMessage,
                      rules: [{required: true, whitespace: true, message: '请输入参数名'}],
                    })(
                      <Input style={{width: 130}} placeholder='参数名'/>
                    )}
                  </FormItem>

                  <FormItem label='值'  {
                    ...{
                      labelCol: {span: 4},
                      wrapperCol: {span: 8},
                    }
                  }>
                    {getFieldDecorator('limitMessage', {
                      initialValue: record && record.limitMessage,
                      rules: [{required: true, whitespace: true, message: '请输入参数值'}],
                    })(
                      <Input style={{width: 130}} placeholder='参数值'/>
                    )}
                  </FormItem>

                  <a>删除</a>
                </div>
              )
            })
          }

        </div>


        <FormItem label="黑名单提示">
          {getFieldDecorator('blackLimitMessage', {
            initialValue: record && record.blackLimitMessage,
            rules: [{required: true, whitespace: true, message: '请输入被限用户的提示语'}],
          })(
            <Input placeholder='请输入黑名单用户提示语'/>
          )}
        </FormItem>


        <FormItem {...stationEditFormDrawer} label="支付限制" key='payLimitType'>
          {getFieldDecorator('payLimitType', {
            initialValue: record && record.payLimitType,
            rules: [{required: true, message: '请输入支付限制'}],
          })(
            <Select placeholder='请选择支付限制'>
              <Option value={0}>不限</Option>
              <Option value={1}>建行卡</Option>
              <Option value={2}>建行行用卡</Option>
              <Option value={3}>银联卡</Option>
            </Select>
          )}
        </FormItem>

        <FormItem key='payLimitTimes'>
          每人限制 {getFieldDecorator('payLimitTimes', {
          initialValue: record && record.payLimitTimes,
          rules: [{required: true, message: '请输入限制次数'}],
        })(
          <Input style={{width: 60}} type='number'/>
        )} 次
        </FormItem>


        <FormItem key='payLimitMessage'>
          {getFieldDecorator('payLimitMessage', {
            initialValue: record && record.payLimitMessage,
            rules: [{required: true, whitespace: true, message: '请输入被限购的提示语'}],
          })(
            <Input placeholder='请输入被限购的提示语'/>
          )}
        </FormItem>


        <FormItem {...stationEditFormDrawer} label="会场地址" key='meetingUrl'>

          {getFieldDecorator('meetingUrl', {
            initialValue: record && record.meetingUrl,
            rules: [{required: true, whitespace: true, message: '请输入会场页面地址'}],
          })(
            <Input placeholder='请输入会场页面地址'/>
          )}

        </FormItem>


        <FormItem {...stationEditFormDrawer} label="会场说明" key='intro'>

          {getFieldDecorator('intro', {
            initialValue: record && record.intro,
            rules: [{whitespace: true, message: '请输入会场会场说明'}],
          })(
            <Input.TextArea placeholder='请输入会场会场说明'/>
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
            this.validate(e)
          }} disabled={this.state.btnDisabled} type="primary">保存</Button>
        </div>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(Home);
export default WrappedRegistrationForm