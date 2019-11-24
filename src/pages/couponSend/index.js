import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Card, message, Spin, Popconfirm, Button} from 'antd';
import {PageHeaderLayout, StandardTable} from 'dt-antd';
import TableSearch from '@/components/tableSearch';
import Define from './define';
import {getList} from './action';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import util from '../../utils/base'
import api from '../../api/api'
import {getList as getDepartmentList} from '../department/action'

class Home extends Component {
    static propTypes = {
        oneSupplierReducer: object,
        getList: func,
    };
    canAddSearch = true;

    state = {
        showDrawer: false, // 是否显示抽屉编辑
        showDetail: false, // 是否显示详情
        showAccount: false, // 是否显示添加账号
        showTwo: false, // 是否显示添加子公司
        searchList: null, // 搜索条件
        tips: false,
        currentNo: 1, // 当前页码
        pageSize: 10, // 每页显示条数,
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
        this.props.getList({
            couponId: this.props.match.params.id ? this.props.match.params.id : null,
            pageNo: this.state.currentNo,
            pageSize: this.state.pageSize
        });
        this.props.getDepartmentList({
            pageNo:0,
            pageSize:1000
        })
    }

    /**
     * [handleSearch 点击搜索之后的回调函数,重新请求用户列表]
     * @param  {[type]} values [description]
     * @return {[type]}        [description]
     */
    handleSearch = (values) => {
        tableCommon.tableSearch({
            state: this.state,
            values,
            callBack: (json) => {
                if(json.searchList.rangeTime){
                    if (json.searchList.rangeTime.length > 0) {
                        if (json.searchList.startTime === json.searchList.endTime) {
                            json.searchList.startTime = util.FormatDate(json.searchList.rangeTime[0], 'YYYY/MM/dd') + '00:00:00'
                            json.searchList.endTime = util.FormatDate(json.searchList.rangeTime[1], 'YYYY/MM/dd') + ' 23:59:59'
                        } else {
                            json.searchList.startTime = util.FormatDate(json.searchList.rangeTime[0], 'YYYY/MM/dd hh:mm:ss')
                            json.searchList.endTime = util.FormatDate(json.searchList.rangeTime[1], 'YYYY/MM/dd hh:mm:ss')
                        }
                    } else {
                        json.searchList.startTime = ''
                        json.searchList.endTime = ''
                    }
                    delete json.searchList.rangeTime;
                }
                this.setState(json,()=>{
                    this.props.getList({
                        couponId: this.props.match.params.id ? this.props.match.params.id : null,
                        ...json.searchList,
                        pageNo: json.pageNo,
                        pageSize: json.pageSize
                    });
                });

            }
        });
    }

    /**
     * [handleSearch 点击重置之后的回调函数]
     * @return {[type]}        [description]
     */
    handleFormReset = () => {
        this.props.getList({
            couponId: this.props.match.params.id ? this.props.match.params.id : null,
            pageNo: this.state.currentNo,
            pageSize: this.state.pageSize
        });
        this.setState({
            searchList: null,
            currentNo: 1,
        })
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
                    couponId: this.props.match.params.id ? this.props.match.params.id : null,
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
        const {tips, currentNo, pageSize, showDrawerId, showDetail, showDrawer, showAccount, showTwo} = this.state;
        const {loading, sendList} = this.props.couponSendReducer;
        let {breadMenu, searchMenu} = Define;
        const departmentList = this.props.departmentReducer.list;

        searchMenu.searchCallBack = this.handleSearch; // 查询的回调函数
        searchMenu.resetCallBack = this.handleFormReset; // 重置的回调函数

        if (sendList && sendList.data && !Define.canpush) {

            let option = departmentList && departmentList.data.map((item) => ({
                value: item.departmentValue,
                label: item.departmentValue
            }));

            if (option) {
                console.log(Define);
                Define.canpush = true
                Define.searchMenu.open.push({
                    id: 'departmentValue',
                    label: '请选择渠道商',
                    type: 'select', //充值状态 0 以提交 1- 成功 2-提交失败
                    option: [
                        {
                            label: '全部',
                            value: null,
                        },
                        ...option
                    ]
                })
                this.canAddSearch = false
            }

        }


        // 列表表头
        const columns = [
            {
                title: '流水号',
                key: 'sendId',
                dataIndex: 'sendId',
            },
            {
                title: '券ID',
                dataIndex: 'couponId',
                key: 'couponId',
            },
            {
                title: '券名称',
                key: 'couponName',
                dataIndex: 'couponName',
            },
            {
                title: '活动名称',
                key: 'activityName',
                dataIndex: 'activityName',
            },
            {
                title: '码值',
                key: 'code',
                dataIndex: 'code',
            },

            {
                title: '手机号',
                key: 'mobile',
                dataIndex: 'mobile',
            },
            {
                title: '渠道商',
                key: 'departmentValue',
                dataIndex: 'departmentValue',
            },

            {
                title: '发放账号',
                key: 'modifyUser',
                dataIndex: 'modifyUser',
            },
            {
                title: '发放时间',
                key: 'sendTime',
                dataIndex: 'sendTime',
                render: (text, record) => {
                    return text && text.slice(0, 19)
                }
            },
            {
                title: '短信状态',
                key: 'messageState',
                dataIndex: 'messageState',
                render: (text) => {
                    if (text === 'SUCCESS') {
                        return '成功'
                    } else if (text === 'SENDING') {
                        return '发送中'
                    } else {
                        return '失败'
                    }
                }

            },
            {
                title: '失败原因',
                key: 'failMessage',
                dataIndex: 'failMessage',
            },
            {
                title: '发放批次号',
                key: 'sendBatchId',
                dataIndex: 'sendBatchId',
            },
            {
                title: '操作',
                key: 'deal',
                render: (record) => (
                    <Fragment>
                        <Popconfirm placement="top" title="确认要重新发送吗？" onConfirm={() => {
                            api.reSend({
                                sendId: record.sendId,

                            }).then(result => {
                                if (result.message === 'success') {
                                    message.success('发送成功！');
                                    this.props.getList({
                                        couponId: this.props.match.params.id ? this.props.match.params.id : null,
                                        pageNo: this.state.currentNo,
                                        pageSize: this.state.pageSize
                                    });
                                } else {
                                    message.error(result.message);
                                }
                            })
                        }} okText='确认' cancelText='取消'>
                            <a>重新发送</a>
                        </Popconfirm>
                    </Fragment>
                ),
            },
        ];
        // 定义表格的数据
        const data = {
            list: sendList && sendList.data,
            pagination: {
                total: sendList ? sendList.total : 1,
                pageSize: pageSize,
                current: currentNo,
            },
        }

        return (
            <PageHeaderLayout
                nav={breadMenu}
            >
                <Spin tip={tips} spinning={tips ? true : false}>
                    <Card bordered={false}>
                        <div className='tableList'>
                            <div className='tableListForm'>
                                <TableSearch {...searchMenu} />
                            </div>
                            <div className='tableListOperator'>
                                <Button  icon="export" onClick={() => {
                                    function parseParams(data) {
                                        try {
                                            var tempArr = [];
                                            for (var i in data) {
                                                var key = encodeURIComponent(i);
                                                var value = encodeURIComponent(data[i]);
                                                tempArr.push(key + '=' + value);
                                            }
                                            var urlParamsStr = tempArr.join('&');
                                            return urlParamsStr;
                                        } catch (err) {
                                            return '';
                                        }
                                    }
                                    if( this.props.match.params.id ){
                                        var s =  parseParams(Object.assign({couponId: this.props.match.params.id},this.state.searchList))
                                        window.location.href = "http://shande.xajhzx.cn/service/sendDetail/export?" + s

                                    }else{
                                        var s =parseParams(this.state.searchList);
                                        window.location.href = "http://shande.xajhzx.cn/service/sendDetail/export?" + s
                                    }
                                    console.log('导出条件---' + s);
                                }}>
                                    导出
                                </Button>
                            </div>
                            <StandardTable
                                scroll={{ x: 1600 }}
                                loading={loading} // 显示加载框
                                data={data}
                                columns={columns}
                                rowKey={columns => columns.id}
                                onChange={this.handleStandardTableChange}
                                noCheck={true}
                            />
                        </div>
                    </Card>
                </Spin>
            </PageHeaderLayout>);
    }
}

export default connect((state) => ({
    couponSendReducer: state.couponSendReducer,
    departmentReducer: state.departmentReducer
}), {
    getList,
    getDepartmentList
})(Home);
