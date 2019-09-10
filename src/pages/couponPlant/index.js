import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Card, Button, Divider, message, Drawer, Spin, Badge, Popconfirm} from 'antd';
import {PageHeaderLayout, TableSearch, StandardTable, TableCommon, Utils} from 'dt-antd';
import Define from './define';
import {getList} from './action';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import api from '../../api/api'
import NewForm from "./edit";

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
            pageNo:this.state.currentNo,
            pageSize:this.state.pageSize
        });
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
                if( json.searchList.rangeTime){
                    json.searchList.startTime = json.searchList.rangeTime[0]
                    json.searchList.endTime =json.searchList.rangeTime[1]
                    delete json.searchList.rangeTime;
                }

                this.setState(json,()=>{
                    this.props.getList(json.searchList);
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
            startPage:this.state.currentNo,
            pageSize:this.state.pageSize
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
                if( json.searchList.rangeTime){
                    json.searchList.startTime = json.searchList.rangeTime[0]
                    json.searchList.endTime =json.searchList.rangeTime[1]
                    delete json.searchList.rangeTime;
                }

                this.setState(json);
                this.props.getList({
                    ...json.searchList,

                });
            }
        });
    }


    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const {tips, currentNo, pageSize, showDrawerId, showDetail, showDrawer, record, } = this.state;
        const {loading, list} = this.props.couponPlantReducer;

        console.error(this.props.couponPlantReducer)

        let {breadMenu, } = Define;

        // 列表表头
        const columns = [
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '平台名称',
                dataIndex: 'platformName',
                key: 'platformName',
            },
            {
                title: '联系人',
                key: 'contact',
                dataIndex: 'contact',

            },
            {
                title: '联系电话',
                key: 'mobile',
                dataIndex: 'mobile',
            },

            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',

            },
            {
                title: '更新时间',
                key: 'updateTime',
                dataIndex: 'updateTime',
            },

            {
                title: '操作人',
                key: 'lastModifyUser',
                dataIndex: 'lastModifyUser',
            },
            {
                title: '操作',
                key: 'deal',
                render: (record) => (
                    <Fragment>
                        <a onClick={() =>{
                            this.setState({
                                showDrawer: true,
                                showDrawerId: record.id,
                                record: record
                            })
                        }}>编辑</a>
                    </Fragment>
                ),
            },];
        // 定义表格的数据
        const data = {
            list: list && list.data,
            pagination: {
                total: list ? list.total : 1,
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
                            <div className='tableListOperator'>
                                <Button type="primary" icon="plus" onClick={() =>{
                                    this.setState({
                                        showDrawer: true,
                                        showDrawerId: null,
                                        record:null
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
                        <Drawer
                            title={showDrawerId ? '编辑闪屏' : '新增闪屏'}
                            width='560'
                            visible={showDrawer}
                            maskClosable={false}
                            onClose={()=>{
                                this.setState({
                                    showDrawer: false,
                                    showDrawerId: null,
                                    record: null
                                });
                            }}
                        >
                            { showDrawer && <NewForm
                                id={showDrawerId}
                                record={record}
                                onClose={(bool)=>{
                                    this.setState({
                                        showDrawer: false,
                                        showDrawerId: null,
                                        record: null
                                    });
                                    // 如果点击的确定，则刷新列表
                                    let searchList = this.state.searchList || {};

                                    if(bool){
                                        this.props.getList({
                                            pageNo:this.state.currentNo,
                                            pageSize:this.state.pageSize,
                                            ...searchList
                                        });
                                    }
                                }}
                            />}
                        </Drawer>
                    </Card>
                </Spin>
            </PageHeaderLayout>);
    }
}

export default connect((state) => ({
    couponPlantReducer: state.couponPlantReducer
}), {
    getList,
})(Home);
