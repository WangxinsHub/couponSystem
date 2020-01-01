import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Card, message, Spin, Popconfirm, Button, Divider, Drawer} from 'antd';
import {PageHeaderLayout, StandardTable} from 'dt-antd';
import TableSearch from '@/components/tableSearch';
import Define from './define';
import {getList} from './action';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import util from '../../utils/base'
import api from '../../api/api'
import {getList as getDepartmentList} from '../department/action'
import NewForm from "./edit";

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
        this.props.getList();
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
        const {tips, currentNo, pageSize, showDrawerId, showDetail, showDrawer, showAccount, record} = this.state;
        const {loading, hallList} = this.props.hallReducer;
        let {breadMenu, searchMenu} = Define;

        searchMenu.searchCallBack = this.handleSearch; // 查询的回调函数
        searchMenu.resetCallBack = this.handleFormReset; // 重置的回调函数

        const columns = [
            {
                title: 'id',
                key: 'meetingId',
                dataIndex: 'meetingId',
            },
            {
                title: '会场名称',
                dataIndex: 'meetingName',
                key: 'meetingName',
            },
            {
                title: '状态',
                key: 'meetingState',
                dataIndex: 'meetingState',
            },
            {
                title: '更新时间',
                key: 'updateTime',
                dataIndex: 'updateTime',
            },
            {
                title: '更新人',
                key: 'operatorUser',
                dataIndex: 'operatorUser',
            },
            {
                title: '操作',
                key: 'deal',
                render: (record) => (
                    <Fragment>
                        <Popconfirm placement="top" title="确认要关闭吗？" onConfirm={() => {
                        }} okText='确认' cancelText='取消'>
                            <a>关闭</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a onClick={()=>{
                            this.setState({
                                showDrawer: true,
                                showDrawerId: record.id,
                                record,
                                id: record.id,
                                type: null
                            })
                        }}>编辑</a>
                        <Divider type="vertical" />
                        <Popconfirm placement="top" title="确认要关闭吗？" onConfirm={() => {
                        }} okText='确认' cancelText='取消'>
                            <a>商品</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <Popconfirm placement="top" title="确认要关闭吗？" onConfirm={() => {
                        }} okText='确认' cancelText='取消'>
                            <a>明细</a>
                        </Popconfirm>
                        <Divider type="vertical" />
                        <a onClick={()=>{
                            this.props.history.push(`/shop/blackWhite/0/${record.meetingId}/${record.meetingName}`)
                        }}>白名单</a>
                        <Divider type="vertical" />
                        <a onClick={()=>{
                            this.props.history.push(`/shop/blackWhite/1/${record.meetingId}/${record.meetingName}`)
                        }}>黑名单</a>
                    </Fragment>
                ),
            },
        ];
        // 定义表格的数据
        const data = {
            list: hallList && hallList.data,
            pagination: {
                total: hallList ? hallList.total : 1,
                pageSize: pageSize,
                current: currentNo,
            },
        };

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
                                <Button type="primary" icon="plus" onClick={() => {
                                    this.setState({
                                        showDrawer: true,
                                        showDrawerId: null,
                                        record: null,
                                        type: null
                                    })
                                }}>
                                    新增
                                </Button>
                            </div>

                            <StandardTable
                                loading={loading} // 显示加载框
                                data={data}
                                columns={columns}
                                rowKey={columns => columns.id}
                                onChange={this.handleStandardTableChange}
                                noCheck={true}
                            />
                        </div>
                    </Card>
                    <Drawer
                        title={!showDrawerId ? '编辑会场' : '新建会场'}
                        width='560'
                        visible={showDrawer}
                        maskClosable={false}
                        onClose={() => {
                            this.setState({
                                showDrawer: false,
                                showDrawerId: null,
                                record: null
                            });
                        }}
                    >
                        {showDrawer && <NewForm
                            id={this.state.id}
                            record={record}
                            onClose={(bool) => {
                                this.setState({
                                    showDrawer: false,
                                    showDrawerId: null,
                                    record: null
                                });
                                // 如果点击的确定，则刷新列表
                                let searchList = this.state.searchList || {};

                                if (bool) {
                                    this.props.getList({
                                        pageNo: this.state.currentNo,
                                        pageSize: this.state.pageSize,
                                        ...searchList
                                    });
                                }
                            }}
                        />}
                    </Drawer>

                </Spin>
            </PageHeaderLayout>);
    }
}

export default connect((state) => ({
    hallReducer: state.hallReducer,
}), {
    getList,
    getDepartmentList
})(Home);
