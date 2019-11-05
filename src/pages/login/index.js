import React from 'react';
import { connect } from 'react-redux';
import {func} from 'prop-types';
import md5 from 'js-md5';
import {Form,Input, Button,Alert, Checkbox} from 'antd';
import API from '@/api/api';
import '@/style/animate.css';
import './index.css';
import Verify from "../../utils/verify";

const FormItem = Form.Item;
class loginPage extends React.Component {
  static propTypes = {
    handleOpenTab: func,
  };
  state = {
    vcode: '',
    errMsg: '',
    msg: '',
    passwordErrCount: 0,
    sendText: '获取验证码',
    canSend: true
  }
  /**
   * [componentDidMount description]
   */
  componentDidMount() {
    document.title = '汇信卡券分发管理后台'
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

      sessionStorage.userName =  params.userName;
      if(result.success) {
        this.setState({
          msg: '登录成功',
          errMsg: false
        });
        sessionStorage.loginFlag = true;
        this.props.history.push('/default');
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
  getVcode = async () => {
    if (this.state.phone.length === 11) {
      try {
        if (this.state.canSend) {

          API.verifyCode({
            mobile: this.state.phone
          }).then(data => {

            this.setState({
              canSend: false,
            });
            let counter = 60;
            let timer = setInterval(() => {
              counter--;

              if (counter === 0) {
                clearInterval(timer);
                this.setState({
                  sendText: `获取验证码`,
                  canSend: true,
                })
              } else {
                this.setState({
                  sendText: `请在(${counter})s后重试`
                })
              }

            }, 1000);


            console.log(data);
          })
        }

      } catch (err) {
        console.log(err);
      }
    } else {
      alert('请输入正确的手机号')
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
                      rules: [{
                        required: true,
                        message: '请输入正确的手机号',
                        max: 11,
                        whitespace: true,
                        pattern: Verify.mobile
                      }],
                    })(
                      <Input placeholder="手机号" onChange={(e) => {
                        this.setState({
                          phone: e.target.value
                        })
                      }}/>
                    )}
                  </FormItem>
                  {<FormItem>
                    {getFieldDecorator('password', {
                      rules: [{required: true, message: '请输入验证码'}],
                    })(
                      <div className='vField'>
                        <div className='inputDiv'>
                          <Input placeholder="请输入验证码"/>
                        </div>
                        <div className='getCodeBtn' onClick={(e) => {
                          this.getVcode();
                        }}>
                          {this.state.sendText}
                        </div>
                      </div>)}
                  </FormItem>}
                  <div style={{marginTop: '-10px'}}>
                    <FormItem>
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
