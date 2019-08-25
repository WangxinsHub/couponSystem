import React from 'react';
import { connect } from 'react-redux';
import {func} from 'prop-types';
import md5 from 'js-md5';
import {Form,Input, Button,Alert, Checkbox} from 'antd';
import API from '@/api/api';
import '@/style/animate.css';
import './index.css';

const FormItem = Form.Item;
class loginPage extends React.Component {
  static propTypes = {
    handleOpenTab: func,
  };
  state = {
    vcode: '',
    errMsg: '',
    msg: '',
    passwordErrCount: 0
  }

  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    sessionStorage.removeItem('accountId');
    sessionStorage.removeItem('Authorization');
  }
  /**
   * [description]
   * @param  {[type]} e [description]
   * @return {[type]}   [description]
   */
  validate = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (err) {
        this.setState({
          btnDisabled: false
        });
        console.log('Received values of form: ', values);
      } else {
        if (values.remember) {
          localStorage.userName = values.userName;
          localStorage.password = values.password;
        } else {
          localStorage.removeItem('userName');
          localStorage.removeItem('password');
        }
        this.submitLoginForm(values)
      }
    });
  }
  submitLoginForm = async (params) => {
    try {
      let result = await API.login({
        username: params.userName,
        password: params.password,
      });

      sessionStorage.userNmae =  params.userName;
      if(result.success) {
        this.setState({
          msg: '登录成功',
          errMsg: false
        });
        // sessionStorage.Authorization = result.data.accessToken;
        // sessionStorage.accountId = result.data.accountId;
        // sessionStorage.enterpriseName = result.data.enterpriseName;
        sessionStorage.loginFlag = true;
        this.props.history.push('/couponList');
      } else {
        this.setState({
          btnDisabled: false
        })
        if (result.data && result.data.passwordErrCount >= 3) {
          this.getVcode();
          localStorage.removeItem('password');
        }
        this.props.form.setFieldsValue({
          password:'',
        });
        this.setState({
          vcode:'',
          errMsg: result.message,
          msg: false,
          passwordErrCount: result && result.data && result.data.passwordErrCount
        })
      }
    } catch (err) {
      this.setState({
        btnDisabled: false
      })
      console.log(err);
    }
  }
  /**
   * [获取验证码]
   * @param  {[type]} e [description]
   */
  getVcode = async (e) => {
    e && e.persist();
    try {
      let mobile = document.querySelector('#userName').value;
      let result = await API.getCaptcha({mobile});
      if(result.success) {
        this.setState({
          vcode: result.data
        })
      }
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    const { submitting, form } = this.props;
    const { getFieldDecorator } = form;
    const { msg, errMsg, vcode} = this.state;
    let vcodeImg = <img id="img_prev" onClick={(e) => {
      this.getVcode(e)
    }} alt='vcode' src={"data:image/jpeg;base64," + vcode}/>
    return (
      <div className=' login'>
        <div className='leftPart'>
          <div className='loginContainer'>
            <div className='mask'>
              <div className="loginHead">
                <div className="icon-logo"></div>
                <div className="title loginTitle">汇信卡券分发系统</div>
                <div className='subTitle'> 欢迎回来，请登录到您的账户</div>
              </div>
              <div className='loginMain animated fadeIn'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator('userName', {
                      initialValue: localStorage.userName || '',
                      rules: [{required: true, message: '请输入用户名'}],
                    })(
                      <Input placeholder="用户名" />
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      initialValue: localStorage.password || '',
                      rules: [{required: true, message: '请输入您的密码'}],
                    })(
                      <Input type="password" placeholder="密码"/>
                    )}
                  </FormItem>
                  {vcode && <FormItem>
                    {getFieldDecorator('vcode', {
                      rules: [{required: true, message: '请输入验证码'}],
                    })(
                      <div className='vField'>
                        <div className='inputDiv'>
                          <Input placeholder="请输入验证码"/>
                        </div>
                        <div onClick={(e) => {
                          this.getVcode(e);
                        }}>
                          {vcodeImg}
                        </div>
                    </div>)}
                  </FormItem>}
                  <div style={{marginTop: '-10px'}}>
                    <FormItem>
                      {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                      })(
                        <Checkbox>记住密码</Checkbox>
                      )}
                      <span style={{float: 'right', display: 'none'}}>
                        忘记密码
                      </span>
                      <div style={{display:'flex',justifyContent:'center'}}>
                        <Button loading={submitting} style={{marginTop: 50}} onClick={(e)=>{
                          this.setState({
                            btnDisabled: true,
                          });
                          this.validate(e);
                        }} disabled={this.state.btnDisabled ? true : false} type="primary" block>
                           登录
                         </Button>
                      </div>
                    </FormItem>
                    {errMsg && <Alert message={errMsg} type="error" showIcon/>}
                    {msg && <Alert message={msg} type="success" showIcon/>}
                  </div>
                </Form>
              </div>
            </div>
          </div>
          <div className='copyright'>
            加汇卓信提供场景/技术支持
          </div>
        </div>
      </div>
    );
  }
}
const WrappedRegistrationForm = Form.create()(loginPage);
export default connect((state) => ({
  state,
}), {})(WrappedRegistrationForm);
