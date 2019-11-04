import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Button, Card, Spin,} from 'antd';
import {PageHeaderLayout, StandardTable} from 'dt-antd';
import TableSearch from '@/components/tableSearch';

import Define from '../sendRecord/define';
import {getList} from '../sendRecord/action';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import util from '../../utils/base'
import {getList as getActiveList} from '../activeList/action'
import {Link} from "react-router-dom";

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
        this.props.getList({
            pageNo: this.state.currentNo,
            pageSize: this.state.pageSize,
            modifyUser:'admin'
        });
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
        const {tips, currentNo, pageSize,} = this.state;
        const {loading, sendList} = this.props.sendRecordReducer;

        // 列表表头
        const columns = [
            {
                title: '批次号',
                key: 'batchId',
                dataIndex: 'batchId',
                render: (text) => text + ''
            },
            {
                title: '活动名称',
                dataIndex: 'activityName',
                key: 'activityName',
            },
            {
                title: '券名',
                key: 'couponName',
                dataIndex: 'couponName',
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
            },

            {
                title: '上传量',
                key: 'sendTotalCount',
                dataIndex: 'sendTotalCount',
            },
            {
                title: '发放量',
                key: 'sendRealCount',
                dataIndex: 'sendRealCount',
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
            <div style={{overflow:'scroll'}}>
                <StandardTable
                    loading={loading} // 显示加载框
                    data={data}
                    columns={columns}
                    rowKey={columns => columns.id}
                    onChange={this.handleStandardTableChange}
                    noCheck={true}
                />
            </div>
        )

    }
}

export default connect((state) => ({
    sendRecordReducer: state.sendRecordReducer,
    activeListReducer: state.activeListReducer,
}), {
    getList,
    getActiveList
})(Home);
