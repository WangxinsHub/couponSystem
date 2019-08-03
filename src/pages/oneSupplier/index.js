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
            startPage:this.state.currentNo,
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

                this.setState(json);
                this.props.getList(json.searchList);
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
        const {tips, currentNo, pageSize, showDrawerId, showDetail, showDrawer, showAccount, showTwo} = this.state;
        const {loading, list} = this.props.oneSupplierReducer;

        console.error(this.props.oneSupplierReducer)

        let {breadMenu, searchMenu} = Define;
        searchMenu.searchCallBack = this.handleSearch; // 查询的回调函数
        searchMenu.resetCallBack = this.handleFormReset; // 重置的回调函数
        // 列表表头
        const columns = [
            {
                title: '订单号',
                key: 'orderNo',
                dataIndex: 'orderNo',
            },
            {
                title: '手机号',
                dataIndex: 'mobile',
                key: 'mobile',
                render: (text, record) => <a onClick={() => {
                    this.setState({
                        showDetail: true,
                        showDrawerId: record.id,
                    })
                }}>{text}</a>
            },
            {
                title: '付款状态',
                key: 'payStatus',
                dataIndex: 'payStatus',
                render: (text) => {
                    if (text === 0) {
                        return '待支付'
                    } else {
                        return '已支付'
                    }
                }

            },
            {
                title: '充值状态',
                key: 'rechargeStatus',
                dataIndex: 'rechargeStatus',
                render: ((text) => {
                    if (text === 0) {
                        return '已提交'
                    } else if (text === 1) {
                        return '成功'
                    } else {
                        return '失败'
                    }
                })
            },

            {
                title: '充值金额(元)',
                key: 'rechargeAmount',
                dataIndex: 'rechargeAmount',
                render: (text) => {
                    return (text / 100).toFixed(2)
                }
            },
            {
                title: '付款金额(元)',
                key: 'payAmount',
                dataIndex: 'payAmount',
                render: (text) => {
                    return (text / 100).toFixed(2)
                }
            },

            {
                title: '建行卡否',
                key: 'useCard',
                dataIndex: 'useCard',
                render: (text, record) => {
                    if (text) {
                        return '是'
                    } else {
                        return '否'
                    }
                }
            },
            {
                title: '交易时间',
                key: 'payTime',
                dataIndex: 'payTime',
                render: (text, record) => {
                    return text.slice(0, 19)
                }
            },
        ];
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
                    </Card>
                </Spin>
            </PageHeaderLayout>);
    }
}

export default connect((state) => ({
    oneSupplierReducer: state.oneSupplierReducer
}), {
    getList,
})(Home);
