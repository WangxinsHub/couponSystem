/**
 * @title: 帮助列表表格中点击详情弹出右侧显示编辑或新增的form表单，如后期其它页面也需要，再重写组件
 * @author: 雏田
 * @version: 1.0.0
 * @time: 2018-09-10
 * @param {[string]}   [title]   [页面标题，如：新增]
 * @param {[object]}   [data]    [编辑时的详细内容]
 * @param {[string]}   [width]   [抽屉的宽度，默认为640，可不填]
 * @param {[function]} [onClose] [关闭的回调函数，需要关闭抽屉]
 * @param {[function]} [onOk]    [保存的回调函数，需要关闭抽屉]
 */
import React from 'react';
import { connect } from 'react-redux';
import { Drawer, Form, Button, Col, Row, Input, InputNumber, Modal} from 'antd';
import Umeditor from '@/components/umediter/index';
import './index.less';
class DrawerForm extends React.Component {
  state = {
    visible: true,
    content: '',
  };  
  /**
   * [componentDidMount 加载render方法之前,获取所有用户列表]
   * @return {[type]} [description]
   */
  componentDidMount(){
    const {data} = this.props;
    this.setState({
      content: data && data.content
    });
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
        values.content = that.state.content;
        if(that.props.data) {
          values.id = that.props.data.id;
        } 
        let isEdit =  that.props.data ? true : false;    
        // 提交表单        
        if(that.props.onOk) {
          that.props.onOk(values, isEdit);
        }
      }else{
        console.log(err)
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      title, // 标题
      onClose, // 关闭的回调方法，可不填
      data, // 初始数据
      width, // 宽度
    } = this.props;
    return (     
        <Drawer
          title={title}
          width={width || 540}
          placement="right"
          onClose={()=>{            
            Modal.confirm({
              title: '点击取消后您页面上的数据将全部丢弃，是否确认取消？',
              okText: '是',
              okType: 'danger',
              cancelText: '否',
              onOk() {                
                if(onClose) { onClose(); }
              },
            });
          }}
          visible={true}
          style={{
            height: 'calc(100% - 55px)',
            overflow: 'auto',
            paddingBottom: 53,
          }}
        >
          <Form layout="vertical">
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="序号">
                  {getFieldDecorator('order', {
                    initialValue: data && data.order,
                    rules: [{ required: true, message: '请输入序号' }],
                  })(<InputNumber
                    style={{width: '100%'}}                
                    min={0}
                    step={1}
                    placeholder='请输入正整数'/>)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    initialValue: data && data.title,
                    rules: [{ required: true, message: '请输入标题' }],
                  })(
                    <Input placeholder="请输入标题" />
                  )}
                </Form.Item>
              </Col>              
            </Row>
            <Row gutter={16}>
              <Col span={24}>
                <Form.Item label="内容" required={true}>
                  {getFieldDecorator('content', {
                    rules:[{
                      validator: (rule, value, callback) =>{                       
                        if(!this.state.content) {
                          callback('请输入内容');
                        }
                        callback();
                      }
                    }]                    
                  })(
                    <Umeditor
                      onChange={(content)=>{
                        this.setState({
                          content,
                        })
                      }} 
                      initialValue={this.state.content}
                      placeholder="请输入内容" 
                      style={{ width: '100%' }}
                    />
                  )}                  
                </Form.Item>
              </Col>              
            </Row>            
          </Form>         
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              width: '100%',
              borderTop: '1px solid #e8e8e8',
              padding: '10px 16px',
              textAlign: 'right',
              left: 0,
              background: '#fff',
              borderRadius: '0 0 4px 4px',
            }}
          >
            <Button
              style={{
                marginRight: 8,
              }}
              onClick={()=>{
                Modal.confirm({
                  title: '点击取消后您页面上的数据将全部丢弃，是否确认取消？',
                  okText: '是',
                  okType: 'danger',
                  cancelText: '否',
                  onOk() {                    
                    if(onClose) { onClose(); }
                  },
                });
              }}
            >
              取消
            </Button>
            <Button onClick={this.validate} type="primary">保存</Button>
          </div>
        </Drawer>
    );
  }
}
const WrappedRegistrationForm = Form.create()(DrawerForm);
export default connect((state,) => ({}), {})(WrappedRegistrationForm);