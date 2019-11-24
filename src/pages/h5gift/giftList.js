import React, {Component, Fragment} from 'react';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import API from '@/api/api';
import {Button, Input, message} from "antd";
import './gift.css'
import { Card, Col, Row } from 'antd';

class Home extends Component {
    static propTypes = {
        oneSupplierReducer: object,
        getList: func,
    };
    state = {
        showDrawer: false, // 是否显示抽屉编辑
        showDetail: false, // 是否显示详情
        showAccount: false, // 是否显示添加账号
        showTwo: false, // 是否显示添加子公司
        searchList: null, // 搜索条件
        tips: false,
        currentNo: 1, // 当前页码
        pageSize: 10, // 每页显示条数,
        infoList:[]
    }

    constructor(props) {
        super(props);
        this.canAddSearch = true
    }

    /**
     * [shouldComponentUpdate 如果state值没有改变时就算调用了setState方法，页面也不会重新渲染]
     * @param  {[type]} nextProps [description]
     * @param  {[type]} nextState [description]
     * @return {[type]}           [description]
     */
    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    /**
     * [componentDidMount 加载render方法之前,获取所有用户列表]
     * @return {[type]} [description]
     */
    componentDidMount() {


    }

    /**
     * [表格点击编辑之后 description]
     * @param  {[type]} pagination [description]
     * @param  {[type]} filtersArg [description]
     * @param  {[type]} sorter     [description]
     * @return {[type]}            [description]
     */
    handleStandardTableChange = (pagination, filtersArg, sorter) => {

        tableCommon.tableChange({
            state: this.state,
            pagination,
            callBack: (json) => {
                if (json.searchList.rangeTime) {
                    json.searchList.startTime = json.searchList.rangeTime[0].format('YYYY/MM/DD HH:mm:ss')
                    json.searchList.endTime = json.searchList.rangeTime[1].format('YYYY/MM/DD HH:mm:ss')
                    delete json.searchList.rangeTime;
                }

                this.setState(json);
                this.props.getList({
                    activityId: this.props.match.params.id ? this.props.match.params.id : null,
                    ...json.searchList,
                    pageNo: json.pageNo,
                    pageSize: json.pageSize
                });
            }
        });
    }

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const {infoList,} = this.state;



        return (
            <div style={{padding:10,height:'100vh'}}>

                <div className={'phone'}>
                    <div className='label'>手机号:</div>
                    <Input
                        maxLength={11}
                        type={'number'}
                        size='default'
                        onChange={(e)=>{
                            this.setState({
                                phone:e.target.value
                            })
                        }}
                    />

                </div>
                <div style={{display:"flex",alignItems:"center",justifyContent:"center",position:"fixed",bottom:50,width:'100%'}}>
                    <Button style={{marginTop: 50 ,width:100}} onClick={(e) => {
                        this.setState({
                            btnDisabled: true,
                        });

                        API.giftHistory({
                            token:sessionStorage.giftToken,
                            mobile:this.state.phone,
                        }).then(data=>{
                            this.setState({
                                btnDisabled: false,
                            });
                            if(data.success){
                               this.setState({
                                   infoList:data.data
                               })

                            }else{
                                message.error(data.message)
                            }
                        })
                    }} disabled={this.state.btnDisabled ? true : false} type="primary"  block>
                        查询
                    </Button>
                </div>
                {
                    infoList.length >0 && infoList.map((info,index)=>(
                        <div style={{marginTop:30}} key={index}>
                            <Card title={info.subject} bordered={false}>
                                <div>
                                    充值账户：{info.userId}
                                </div>
                                <div>
                                    充值时间：{info.chargeCreateTime}
                                </div>
                                <div>
                                    到账时间：{info.chargePaidTime}
                                </div>
                            </Card>
                        </div>

                    ))
                }

                <div style={{overflow:'scroll'}}>

                </div>
            </div>

        )

    }
}

export default Home