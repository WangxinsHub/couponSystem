import React, {Component, Fragment} from 'react';
import {is, fromJS} from 'immutable';
import {Card, Button, Divider, message, Drawer, Spin, Badge, Popconfirm} from 'antd';
import {PageHeaderLayout, TableSearch, StandardTable, TableCommon, Utils} from 'dt-antd';
import Define from './define';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import util from '../../utils/base'
import NewForm from "./edit";
import api from "../../api/api";

class Home extends Component {

    state = {
        showDrawer: false, // 是否显示抽屉编辑
        showDetail: false, // 是否显示详情
        showAccount: false, // 是否显示添加账号
        showTwo: false, // 是否显示添加子公司
        searchList: null, // 搜索条件
        tips: false,
        currentNo: 1, // 当前页码
        pageSize: 10, // 每页显示条数,
    };

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
        let params ={
            pageNo: 0,
            pageSize: 10,
        };
        if(this.props.match.params.mid){
            params.meetingId = this.props.match.params.mid
        }
        this.getData(params);
    }


    getData(params) {
        api.orderList(params).then(data => {
            console.error(data);
            this.setState({
                data: data,
                blList: data.data || [],
            })
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

                this.setState(json, () => {
                    this.getData({
                        ...json.searchList,
                        pageNo: json.pageNo,
                        pageSize: json.pageSize
                    })
                });

            }
        });
    }

    /**
     * [handleSearch 点击重置之后的回调函数]
     * @return {[type]}        [description]
     */
    handleFormReset = () => {
        this.getData({
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
                this.getData({
                    ...json.searchList,
                    pageNo: json.pageNo,
                    pageSize: json.pageSize
                })
            }
        });
    }

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const {tips, currentNo, pageSize, showDrawerId, showDetail, showDrawer, record, blList} = this.state;
        let {breadMenu, searchMenu} = Define;
        searchMenu.searchCallBack = this.handleSearch; // 查询的回调函数
        searchMenu.resetCallBack = this.handleFormReset; // 重置的回调函数
        const searchList = this.state.searchList || {};

        const columns = [
            {
                title: '订单号',
                key: 'orderId',
                dataIndex: 'orderId',
            },
            {
                title: '会场名称',
                dataIndex: 'meetingName',
                key: 'meetingName',
            },
            {
                title: '商品名称',
                key: 'subject',
                dataIndex: 'subject',
            },
            {
                title: '手机号',
                key: 'mobile',
                dataIndex: 'mobile',
            },
            {
                title: '发放账号',
                key: 'account',
                dataIndex: 'account',
            },
            {
                title: '支付方式',
                key: 'payType',
                dataIndex: 'payType',
                render: (text) => {
                    return text?text:'微信'
                }
            },
            {
                title: '支付时间',
                key: 'orderCreateTime',
                dataIndex: 'orderCreateTime',

            },
            {
                title: '支付金额',
                key: 'actualAmount',
                dataIndex: 'actualAmount',
                render: (text) => {
                    return (text / 100).toFixed(2)
                }
            },
            {
                title: '交货方式',
                key: 'deliveType',
                dataIndex: 'deliveType',
                render: (text) => {
                    return text == 0 ? '直充' : text == 1 ? '卡密' : '邮递'
                }
            },
            {
                title: '状态',
                key: 'orderStatus',
                dataIndex: 'orderStatus',
                //0-待支付 1-发货中 2-已发货 3-已关闭 4-退款中 5-已退款",
                render: (text) => {
                    return (
                        text == 0 ? "待支付" : text == 1 ? "发货中" : text == 2 ? "已发货" : text == '3' ? "已关闭" : text == '4' ? "退款中" : '已完成'
                    )
                }
            },
            {
                title: '入口渠道',
                key: 'channelName',
                dataIndex: 'channelName',
            },
            {
                title: '发货备注',
                key: 'remark',
                dataIndex: 'remark',
            },
            {
                title: '操作',
                key: 'deal',
                render: (text, record) => (
                    <Fragment>
                        {
                            //发货中 + 邮递
                            (record.orderStatus == 1 && record.deliveType == 2) &&
                            [
                                <a onClick={() => {
                                    this.setState({
                                        showDrawer: true,
                                        record,
                                    })
                                }}>发货</a>,
                                <Divider type="vertical"/>

                            ]

                        }
                        {
                            record.orderStatus == 4 &&
                            <a onClick={() => {
                                api.orderOperator({
                                    orderStatus:5,
                                    orderId:record.orderId
                                }).then(res=>{
                                   if(res.code===200){
                                       message.success(res.message)
                                   } else{
                                       message.error(res.message)
                                   }
                                });
                            }}>退款</a>
                        }

                    </Fragment>
                ),
            },
        ];
        // 定义表格的数据
        const data = {
            list: blList,
            pagination: {
                total: this.state.data ? this.state.data.total : 1,
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
                                  <Button type="primary" icon="plus" onClick={() => {
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
                                    window.location.href = "http://shande.xajhzx.cn/meeting/mExport?" + s.slice(1);
                                }}>
                                    导出
                                </Button>

                                <div className='tableListForm'>
                                    <TableSearch {...searchMenu} />
                                </div>
                            </div>


                            <StandardTable
                                scroll={{x: 1600}}
                                data={data}
                                columns={columns}
                                noCheck={true}
                                rowKey={columns => columns.id}
                                onChange={this.handleStandardTableChange}
                                onSelectRow={data => {
                                    if (data.length > 0) {
                                        let ids = data.map((code) => (code.id));
                                        this.setState({
                                            checkedIds: ids.join()
                                        })
                                    }
                                    this.setState({
                                        selectedRow: data
                                    })
                                }}
                            />
                        </div>


                        <Drawer
                            title={'编辑备注'}
                            width='560'
                            visible={showDrawer}
                            noCheck={true}
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
                                record={record}
                                onClose={(bool) => {
                                    this.setState({
                                        showDrawer: false,
                                        showDrawerId: null,
                                        record: null
                                    });
                                    // 如果点击的确定，则刷新列表

                                    if (bool) {
                                        this.getData({
                                            pageNo: this.state.currentNo,
                                            pageSize: this.state.pageSize,
                                            ...searchList
                                        })
                                    }
                                }}
                            />}
                        </Drawer>
                    </Card>
                </Spin>
            </PageHeaderLayout>);
    }
}

export default Home