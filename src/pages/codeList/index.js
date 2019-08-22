import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Card, Button, Divider, message, Drawer, Spin, Statistic, Row, Col, Popconfirm} from 'antd';
import {PageHeaderLayout, TableSearch, StandardTable, TableCommon, Utils} from 'dt-antd';
import Define from './define';
import {getList,} from './action';
import {getList as getCouponList} from '../couponList/action'
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import util from '../../utils/base'
import {Link} from 'react-router-dom';
import NewForm from "./send";
import api from "../../api/api";

class Home extends Component {
    static propTypes = {
        oneSupplierReducer: object,
        getList: func,
    };
    canAddSearch = true
    state = {
        showDrawer: false, // 是否显示抽屉编辑
        showDetail: false, // 是否显示详情
        showAccount: false, // 是否显示添加账号
        showTwo: false, // 是否显示添加子公司
        searchList: null, // 搜索条件
        tips: false,
        currentNo: 1, // 当前页码
        pageSize: 10, // 每页显示条数,
        couponInfo: {}
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

        this.props.getCouponList({
            pageNo: this.state.currentNo,
            pageSize: this.state.pageSize,
            id: this.props.match.params.id
        })
        this.props.getList({
            pageNo: this.state.currentNo,
            pageSize: this.state.pageSize,
            couponId: this.props.match.params.id
            //state:['ONLINE','OVER'],
        });

        this.setState({
            couponInfo: JSON.parse(this.props.match.params.couponInfo)
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
                if (json.searchList.rangeTime) {
                    json.searchList.startTime = util.FormatDate(json.searchList.rangeTime[0], 'YYYY/MM/dd hh:mm:ss')
                    json.searchList.endTime = util.FormatDate(json.searchList.rangeTime[1], 'YYYY/MM/dd hh:mm:ss')
                    delete json.searchList.rangeTime;
                }

                this.setState(json);
                this.props.getList({
                    couponId: this.props.match.params.id,
                    ...json.searchList,
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
            couponId: this.props.match.params.id,
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
                    couponId: this.props.match.params.id,
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
        const {loading, list} = this.props.codeReducer;
        const couponDetail = this.props.couponReducer.list && this.props.couponReducer.list.data[0];
        console.log(couponDetail);
        let {breadMenu, searchMenu} = Define;
        searchMenu.searchCallBack = this.handleSearch; // 查询的回调函数
        searchMenu.resetCallBack = this.handleFormReset; // 重置的回调函数

        // 列表表头
        const columns = [
            {
                title: '码值',
                key: 'code',
                dataIndex: 'code',
            },
            {
                title: '状态',
                dataIndex: 'state',
                key: 'state',
                render: (text) => {
                    if (text === 'READY') {
                        return '待发送'
                    } else {
                        return '已发送'
                    }
                }
            },
            {
                title: '创建时间',
                key: 'createTime',
                dataIndex: 'createTime',
            },
            {
                title: '发放时间',
                key: 'sendTime',
                dataIndex: 'sendTime',
            },
            {
                title: '发放流水号',
                key: 'serializeId',
                dataIndex: 'serializeId',
            },
            {
                title: '操作',
                key: 'deal',
                render: (text, record) => (
                    <Fragment>
                        {
                            record.state === 'SEND' &&
                            <Popconfirm
                                title='是否确认删除活动？'
                                onConfirm={() => {
                                    api.deleteCode({
                                        id: record.id
                                    }).then((res) => {
                                        if (res.message === 'success') {
                                            message.success('发布成功！');
                                        } else {
                                            message.error(res.message);
                                        }
                                        let searchList = this.state.searchList || {};
                                        this.props.getList({
                                            couponId: this.props.match.params.id,
                                            pageNo: this.state.currentNo,
                                            pageSize: this.state.pageSize,
                                            ...searchList
                                        });
                                    })
                                }}
                                okText='是'
                                placement="topRight"
                                cancelText='否'
                            >
                                <a>删除</a>
                            </Popconfirm>
                        }
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
                <Row>
                    <Col span={6}>
                        <Statistic title="券名称:" value={couponDetail && couponDetail.couponName}/>
                    </Col>
                    <Col span={6}>
                        <Statistic title="总数量:" value={couponDetail && couponDetail.totalCount}/>
                    </Col>
                    <Col span={6}>
                        <Statistic title="锁定量:" value={couponDetail && couponDetail.lockedCount}/>
                    </Col>
                    <Col span={6}>
                        <Statistic title="库存量:" value={couponDetail && couponDetail.stockCount}/>
                    </Col>
                </Row>

                <Spin tip={tips} spinning={tips ? true : false}>
                    <Card bordered={false}>


                        <div className='tableList'>
                            <div className='tableListForm'>
                                <TableSearch {...searchMenu} />
                            </div>
                            <div className='tableListOperator'>
                               {/* <Button type="primary" icon="plus" onClick={() => {
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

                        <Drawer
                            title={'发送券码'}
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
                                id={this.props.match.params.id}
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
                                            couponId: this.props.match.params.id,
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
    codeReducer: state.codeReducer,
    couponReducer: state.couponReducer,
}), {
    getList,
    getCouponList
})(Home);
