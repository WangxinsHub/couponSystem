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
import util from '../../utils/base'
import api from '../../api/api'
import NewForm from "./send";

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
                    json.searchList.startTime = util.FormatDate(json.searchList.rangeTime[0],'YYYY/MM/dd hh:mm:ss')
                    json.searchList.endTime = util.FormatDate(json.searchList.rangeTime[1],'YYYY/MM/dd hh:mm:ss')
                    delete json.searchList.rangeTime;
                }

                this.setState(json);
                this.props.getList({
                    ...json.searchList,
                    pageNo:json.pageNo,
                    pageSize:json.pageSize
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
            pageNo:this.state.currentNo,
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
                    json.searchList.startTime = json.searchList.rangeTime[0].format('YYYY/MM/DD HH:mm:ss')
                    json.searchList.endTime =json.searchList.rangeTime[1].format('YYYY/MM/DD HH:mm:ss')
                    delete json.searchList.rangeTime;
                }

                this.setState(json);
                this.props.getList({
                    ...json.searchList,
                    pageNo:json.pageNo,
                    pageSize:json.pageSize
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
        searchMenu.searchCallBack = this.handleSearch; // 查询的回调函数
        searchMenu.resetCallBack = this.handleFormReset; // 重置的回调函数
        // 列表表头
        const columns = [
            {
                title: 'ID',
                key: 'id',
                dataIndex: 'id',
            },
            {
                title: '活动名称',
                dataIndex: 'activityName',
                key: 'activityName',
            },
            {
                title: '渠道商',
                key: 'departmentValue',
                dataIndex: 'departmentValue',
            },
            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                //DRAFT 草案
                //ONLINE 已上线
                //READY 待上线
                //OVER 已结束
                render:(text,record)=>{
                    if(text === 'ONLINE'){
                        return '已上线'
                    } else if(text ==='READY'){
                        return '待上线'
                    }else if(text === 'DRAFT'){
                        return '草案'
                    }else {
                        return '已结束'
                    }
                }
            },
            {
                title: '活动有效期',
                key: 'validStart',
                dataIndex: 'validStart',
                render:(text,record)=>{
                    if(record.validStart){
                        return record.validStart + '至' + record.validEnd
                    }else {
                        return  null
                    }
                }
            },
            {
                title: '操作',
                key: 'deal',
                render: (text,record) => (
                    <Fragment>
                        {
                            record.state === 'ONLINE'?
                                <div>
                                    <a onClick={()=>{
                                        this.setState({
                                            showDrawer: true,
                                            showDrawerId: record.id,
                                        })
                                    }}>发放券码</a>
                                    <Divider type="vertical" />
                                    <Popconfirm placement="top" title="确认要删除吗？" onConfirm={()=>this.deleteInListpage(record.id)} okText='确认' cancelText='取消'>
                                        <a>发放记录</a>
                                    </Popconfirm>
                                    <Divider type="vertical" />
                                    <Popconfirm placement="top" title="确认要删除吗？" onConfirm={()=>this.deleteInListpage(record.id)} okText='确认' cancelText='取消'>
                                        <a>活动明细</a>
                                    </Popconfirm>
                                </div>:
                                <div>
                                    <a>活动明细</a>
                                </div>
                        }
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
                                <Button type="primary" icon="plus" onClick={() => {
                                    //window.location.href = "http://shande.xajhzx.cn/service/export";
                                    // urlEncode
                                    var urlEncode = function(param, key, encode) {
                                        if (param==null) return '';
                                        var paramStr = '';
                                        var t = typeof (param);
                                        if (t == 'string' || t == 'number' || t == 'boolean') {
                                            paramStr += '&' + key + '='  + ((encode==null||encode) ? encodeURIComponent(param) : param);
                                        } else {
                                            for (var i in param) {
                                                var k = key == null ? i : key + (param instanceof Array ? '[' + i + ']' : '.' + i)
                                                paramStr += urlEncode(param[i], k, encode)
                                            }
                                        }
                                        return paramStr;

                                    }
                                    var s = urlEncode({...this.state.searchList});
                                    console.log(s.slice(1));
                                    window.location.href = "http://shande.xajhzx.cn/service/export?"+s.slice(1);
                                }}>
                                    导出
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
                            title={'发送券码'}
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
    couponSendReducer: state.couponSendReducer
}), {
    getList,
})(Home);
