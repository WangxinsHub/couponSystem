import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Card, Button, Divider, message, Drawer, Spin, Badge, Popconfirm} from 'antd';
import {PageHeaderLayout, TableSearch, StandardTable, } from 'dt-antd';
import Define from './define';
import {getList} from './action';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import NewForm from './edit';
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
            activityId:this.props.match.params.id,
            pageNo: this.state.currentNo,
            pageSize: this.state.pageSize,
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
                this.setState(json);
                this.props.getList({
                    ...json.searchList,
                    activityId:this.props.match.params.id,
                    pageNo: json.pageNo,
                    pageSize: json.pageSize
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
            activityId:this.props.match.params.id,
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
                this.setState(json,()=>{
                    this.props.getList({
                        ...json.searchList,
                        activityId:this.props.match.params.id,

                    });
                });

            }
        });
    }

    stop = (id) => async () => {
        let result = await api.deleteCode({
            id
        });
        if (result.message === 'success') {
            message.success('删除成功！');
            this.props.onClose(true);
        } else {
            this.setState({
                btnDisabled: false
            })
            message.error(result.message);
        }

    }

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const {tips, currentNo, pageSize, showDrawerId, showDetail, showDrawer, showAccount, record} = this.state;
        const {loading, list} = this.props.couponStore;


        let {breadMenu, searchMenu} = Define;
        searchMenu.searchCallBack = this.handleSearch; // 查询的回调函数
        searchMenu.resetCallBack = this.handleFormReset; // 重置的回调函数

        const columns = [
            {
                title: 'ID',
                key: 'activityId',
                dataIndex: 'activityId',
            },
            {
                title: '券名称',
                dataIndex: 'couponName',
                key: 'couponName',
            },
            {
                title: '总数量',
                key: 'totalCount',
                dataIndex: 'totalCount',
            },


            {
                title: '库存',
                key: 'stockCount',
                dataIndex: 'stockCount',
            },

            {
                title: '截止时间',
                key: 'endTime',
                dataIndex: 'endTime',
                render: (text, record) => {
                    return text && text.slice(0, 19)
                }
            },
            {
                title: '操作',
                key: 'deal',
                render: (text, record) => (
                    <Fragment>
                        <a onClick={() => {
                            this.setState({
                                showDrawer: true,
                                showDrawerId: record.id,
                                record: record
                            })
                        }}>调整库存</a>
                        <Divider type="vertical"/>
                        <Popconfirm placement="top" title="确认要删除吗？"
                                    onConfirm={this.stop(record.id)}
                                    okText='确认'
                                    cancelText='取消'
                        >
                            <a>删除</a>
                        </Popconfirm>
                    </Fragment>
                ),
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
                            <div className='tableListOperator'>
                              {/*  <Button type="primary" icon="plus" onClick={() => {
                                    //window.location.href = "http://shande.xajhzx.cn/service/export";
                                    // urlEncode
                                    var urlEncode = function (param, key, encode) {
                                        if (param == null) return '';
                                        var paramStr = '';
                                        var t = typeof (param);
                                        if (t == 'string' || t == 'number' || t == 'boolean') {
                                            paramStr += '&' + key + '=' + ((encode == null || encode) ? encodeURIComponent(param) : param);
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
                                    window.location.href = "http://shande.xajhzx.cn/service/export?" + s.slice(1);
                                }}>
                                    导出
                                </Button>*/}
                                <Button type="primary" icon="plus" onClick={() => {
                                    this.setState({
                                        showDrawer: true,
                                        showDrawerId: null,
                                        record: null
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
                                noCheck={false}
                            />
                        </div>
                    </Card>
                    <Drawer
                        title={record ? '调整库存' : '新增券'}
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
                            id={showDrawerId}
                            couponId={record&&record.couponId}
                            activityId={record && record.activityId}
                            record={record}
                            match={this.props.match}
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
                                        activityId:this.props.match.params.id,
                                        pageNo: this.state.currentNo,
                                        pageSize: this.state.pageSize,
                                        ...searchList
                                    });
                                }
                            }}
                        />}
                    </Drawer>
                </Spin>
            </PageHeaderLayout>
        );
    }
}

export default connect((state) => ({
    couponStore: state.couponStore
}), {
    getList,
})(Home);
