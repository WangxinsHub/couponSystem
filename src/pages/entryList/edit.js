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
        goodsDesc: '',
        typeList: []
    };

    /**
     * [componentDidMount 加载render方法之前,获取所有用户列表]
     * @return {[type]} [description]
     */
    componentDidMount() {
        API.typeList().then(data => {
            this.setState({
                typeList: data.data
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
            Object.keys(goodObj).map((key) => {
                goodsConfigArr.push({
                    key,
                    value: goodObj[key]
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
        try {
            let result;
            values.channelType = 0;

            if (this.props.record) {
                values.channelId = this.props.record.channelId;
                result = await API.updateChannel(values);
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
                result = await API.addChannel(values);
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
        const {goodsConfigArr, typeList} = this.state;

        return (<Form style={{paddingBottom: 30}}>

                <FormItem label="名称" key='channelName'>
                    {getFieldDecorator('channelName', {
                        initialValue: record && record.channelName,
                        rules: [{required: true, max: 30, whitespace: true, message: '请输入商品类型名称'}],
                    })(
                        <Input style={{width: '80%'}} maxLength={30} placeholder="请输入商品类型名称"/>
                    )}
                </FormItem>

                <FormItem label="渠道链接" key='channelUrl'>
                    {getFieldDecorator('channelUrl', {
                        initialValue: record && record.channelUrl,
                        rules: [{required: true, max: 30, whitespace: true, message: '请输入商品类型名称'}],
                    })(
                        <Input style={{width: '80%'}} maxLength={30} placeholder="请输入商品类型名称"/>
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