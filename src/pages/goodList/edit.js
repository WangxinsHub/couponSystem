import React, {Component} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import {object, func, any} from 'prop-types';
import {
  Form,
  Input,
  Select,
  Button,
  message,
  Popconfirm,

} from 'antd';
import Uedit from '../../components/umeditor'
import API from '@/api/api';

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
    goodsConfigArr: [
      {key: '', value: ''}
    ],
    goodsDesc:'',
    typeList:[]
  };

  /**
   * [componentDidMount 加载render方法之前,获取所有用户列表]
   * @return {[type]} [description]
   */
  componentDidMount() {
    API.typeList().then(data=>{
      this.setState({
        typeList:data.data
      })
    })

  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {record} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (record && record.goodsConfig) {
      console.log(record);
      let goodObj = JSON.parse(record.goodsConfig);
      let goodsConfigArr = [];
      Object.keys(goodObj).map((key)=>{
        goodsConfigArr.push({
          key,
          value:goodObj[key]
        })
      });
      return {
        goodsConfigArr,
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }
  postData = async (values) => {
    const that = this;
    values.price = values.price * 100;
    const {goodsConfigArr,goodsDesc} = this.state;
    try {
      let result;

      let goodsConfig = {};
      goodsConfigArr.map((item)=>{
        goodsConfig[item.key] = item.value
      });
      values.goodsDesc = goodsDesc;
      values.goodsConfig = JSON.stringify(goodsConfig);

      if (this.props.record) {
        values.goodsId = this.props.record.goodsId;

        result = await API.updateGoods(values);
        if (result.message === 'success') {
          message.success('保存成功！');
          this.props.onClose(true);
        } else {
          this.setState({
            btnDisabled: false
          });
          message.error(result.message);
        }
      } else {

        result = await API.goodsCreate(values);
        if (result.message === 'success') {
          message.success('保存成功！');
          this.props.onClose(true);
        } else {
          this.setState({
            btnDisabled: false
          });
        }
      }

    } catch (err) {
      this.setState({
        btnDisabled: false
      })
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
    const inline = {
      labelCol: {span: 5},
      wrapperCol: {span: 19},
    }
    let {record} = this.props;
    const {submitting, form, onClose} = this.props;
    const {getFieldDecorator} = form;
    const {goodsConfigArr,typeList} = this.state;
    // 0: {goodsId: 1, goodsName: "商品一个111", updateTime: "2019-12-28 18:06:43",…}

    return (<Form style={{paddingBottom: 30}}>

        <FormItem label="名称" key='goodsName' {...inline}>
          {getFieldDecorator('goodsName', {
            initialValue: record && record.goodsName,
            rules: [{required: true, max: 30, whitespace: true, message: '请输入商品的名称'}],
          })(
            <Input style={{width: '80%'}} maxLength={30} placeholder="请输入商品的名称"/>
          )}
        </FormItem>

        <FormItem label='类型' key='goodsTypeId'  {...inline}>
          {getFieldDecorator('goodsTypeId', {
            initialValue: record && record.goodsTypeId,
            rules: [{required: true, message: '请选择活动类型'}],
          })(
            <Select style={{width: 150}} placeholder='请选择活动类型'>
              {
                typeList.map((type,index)=>(
                    <Option value={type.goodsId} key={index}>{type.goodsName}</Option>
                ))
              }
            </Select>
          )}
        </FormItem>

        <FormItem label='售价' key='price'  {...inline}>
          {getFieldDecorator('price', {
            initialValue: record && record.price,
            rules: [{required: true, message: '请输入商品售价'}],
          })(
            <Input style={{width: '80%'}} type={'number'} placeholder="请输入商品售价"/>
          )}元
        </FormItem>


        <FormItem label='交货方式'  {...inline}>
          {getFieldDecorator('deliveType', {
            initialValue: record && record.deliveType,
            rules: [{required: true, message: '请选择交货方式'}],
          })(
            <Select placeholder='请选择交货方式'>
              <Option value={0}>直冲</Option>
              <Option value={1}>卡密</Option>
              <Option value={2}>邮递</Option>
            </Select>
          )}
        </FormItem>




        <FormItem label='状态' key='goodsStatus'  {...inline}>
          {getFieldDecorator('goodsStatus', {
            initialValue: record && record.goodsStatus,
            rules: [{required: true, message: '请选择商品状态'}],
          })(
            <Select placeholder='请选择商品状态'>
              <Option value={0}>上架</Option>
              <Option value={1}>下架</Option>
            </Select>
          )}
        </FormItem>

        <FormItem label='图片地址' key='goodsImg'  {...inline}>
          {getFieldDecorator('goodsImg', {
            initialValue: record && record.goodsType,
            rules: [{required: true, message: '请输入图片地址'}],
          })(
            <Input style={{width: '80%'}} placeholder="请输入图片地址"/>
          )}
        </FormItem>

        <FormItem label='配置信息'  >
          <a onClick={() => {
            this.setState({goodsConfigArr: goodsConfigArr.concat({key: '', value: ''})})
          }}>新增配置</a>
        </FormItem>

        {
          goodsConfigArr.map((item, index) => {
            return (
              <div key={index} style={{display: 'flex', width: '100%',}}>
                <div style={{width:'40%'}}>
                  <FormItem label='键'
                            {... {
                              labelCol: {span: 4},
                              wrapperCol: {span: 8},
                            }}>
                    <Input style={{width: 110}} placeholder='参数名'
                           value={goodsConfigArr[index]['key']}
                           onChange={(v) => {
                             goodsConfigArr[index]['key'] = v.target.value;
                             this.setState({goodsConfigArr})
                           }}
                    />
                  </FormItem>
                </div>
                <div style={{width:'40%'}}>
                  <FormItem label='值'
                            {... {
                              labelCol: {span: 4},
                              wrapperCol: {span: 8},
                            }}>
                    <Input style={{width: 110}} placeholder='参数值'
                           value={goodsConfigArr[index]['value']}
                           onChange={(v) => {
                             goodsConfigArr[index]['value'] = v.target.value;
                             this.setState({goodsConfigArr})
                           }}
                    />
                  </FormItem>
                </div>

                {
                  goodsConfigArr.length > 1 && <a onClick={() => {
                    goodsConfigArr.splice(index, 1);
                    console.error(goodsConfigArr)
                    this.setState({
                      goodsConfigArr: [...goodsConfigArr]
                    })
                  }}>删除</a>
                }
              </div>
            )
          })
        }


        <FormItem label='商品详情'>
          <Uedit
              initialValue={record && record.goodsDesc}
              getUmEditorValue={(e) => {
            this.setState({goodsDesc:e})
          }}/>
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