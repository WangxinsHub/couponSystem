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

  getGoods(params){
    API.goodsList({
      ...params,
      goodsStatus:0,
      page:0,
      pageSize:1000
    }).then(res=>{
      console.log(res);
      this.setState({
        goodsList:res.data
      })
    })
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {record} = nextProps;
    // 当传入的type发生变化的时候，更新state
    if (record && record.goodsConfig) {
      let goodsConfigArr = [];
      try {
        let goodObj = JSON.parse(record.goodsConfig);
        Object.keys(goodObj).map((key)=>{
          goodsConfigArr.push({
            key,
            value:goodObj[key]
          })
        });
      }catch (e) {
        goodsConfigArr = []
      }

      return {
        goodsConfigArr,
      };
    }
    // 否则，对于state不进行任何操作
    return null;
  }
  postData = async (values) => {
    const that = this;
    console.log(that.props.type);
    try {
      if(that.props.type===1){
        const {
          updateTime,
          createTime,
            ...others
        } = this.props.record
        let result = await API.cargoUpdate({
          ...others,
          adjustCount:values.adjustCount
        });

        if (result.message === 'success') {
          message.success('保存成功！');
          this.props.onClose(true);
        } else {
          this.setState({
            btnDisabled: false
          });
        }
      }else{
        values.price = values.price * 100;
        values.discountPrice = values.discountPrice * 100;
        values.meetingId = this.props.meetId ;
        let result = await API.cargoCreate(values);
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
    const {goodsList,typeList} = this.state;
    // 0: {goodsId: 1, goodsName: "商品一个111", updateTime: "2019-12-28 18:06:43",…}

    return (<Form style={{paddingBottom: 30}}>

          {
            this.props.type===1 &&   <FormItem label='调整库存' key='adjustCount'  {...inline}>
              {getFieldDecorator('adjustCount', {
                rules: [{required: true, message: '输入库存'}],
              })(
                  <Input style={{width: '80%'}} type={'number'} placeholder="正数加，负数减"/>
              )}
            </FormItem>
          }

          {
            this.props.type!==1 && <div>
              <FormItem label='选择类型' key='goodsTypeId'  {...inline}>
                {getFieldDecorator('goodsTypeId', {
                  initialValue: record && record.goodsTypeId,
                  rules: [{required: true, message: '请选择活动类型'}],
                })(
                    <Select style={{width: 150}}
                            placeholder='请选择活动类型'
                            onChange={(value)=>{
                              this.getGoods({
                                goodsTypeId:value
                              })
                            }}
                    >
                      {
                        typeList.map((type,index)=>(
                            <Option value={type.goodsId} key={index}>{type.goodsName}</Option>
                        ))
                      }
                    </Select>
                )}
              </FormItem>

              <FormItem label='选择商品' key='goodsId'  {...inline}>
                {getFieldDecorator('goodsId', {
                  initialValue: record && record.goodsTypeId,
                  rules: [{required: true, message: '选择商品'}],
                })(
                    <Select
                        style={{width: 150}}
                        placeholder='选择商品'
                        onChange={(value,option)=>{
                          this.setState({
                            price:(option.props.price/100).toFixed(2)
                          });
                        }}
                    >
                      {
                        goodsList && goodsList.map((type,index)=>(
                            <Option value={type.goodsId} price={type.price} key={index}>{type.goodsName}</Option>
                        ))
                      }
                    </Select>
                )}
              </FormItem>



              <FormItem label='原价' key='price'  {...inline}>
                {getFieldDecorator('price', {
                  initialValue: this.state.price,
                  rules: [{required: true, message: '请输入商品售价'}],
                })(
                    <Input style={{width: '80%'}} type={'number'} disabled placeholder="请输入商品售价"/>
                )}元
              </FormItem>


              <FormItem label='售价' key='discountPrice'  {...inline}>
                {getFieldDecorator('discountPrice', {
                  initialValue: record && record.discountPrice,
                  rules: [{required: true, message: '请输入商品售价'}],
                })(
                    <Input style={{width: '80%'}} type={'number'} placeholder="请输入商品售价"/>
                )}元
              </FormItem>

              <FormItem label='总量' key='totalCount'  {...inline}>
                {getFieldDecorator('totalCount', {
                  initialValue: record && record.price,
                  rules: [{required: true, message: '请输入商品售价'}],
                })(
                    <Input style={{width: '80%'}} type={'number'} placeholder="请输入商品售价"/>
                )}元
              </FormItem>
            </div>
          }

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