import React, {Component, Fragment} from 'react';
import {is, fromJS} from 'immutable';
import {Card, Button, Divider, message, Drawer, Spin, Badge, Popconfirm, Select, Row, Col} from 'antd';
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
        this.getData({
            pageNo: 0,
            pageSize: 10,
            meetingId:this.props.match.params.mid
        });
    }


    getData(params) {
        api.cargoList({
            ...params,
            meetingId:this.props.match.params.mid
        }).then(data => {
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
                title: 'Id',
                key: 'cargoId',
                dataIndex: 'cargoId',
            },
            {
                title: '排序',
                key: 'sorted',
                dataIndex: 'sorted',
            },
            {
                title: '商品类型',
                dataIndex: 'goodsType',
                key: 'goodsType',
            },
            {
                title: '商品名称',
                key: 'goodsName',
                dataIndex: 'goodsName',
            },
            {
                title: '状态',
                key: 'cargoStatus',
                dataIndex: 'cargoStatus',
                render:(text)=>{
                    return text==0?'已下架':'已上架'
                }
            },
            {
                title: '原价',
                key: 'price',
                dataIndex: 'price',
            },
            {
                title: '售价',
                key: 'discountPrice',
                dataIndex: 'discountPrice',
            },
            {
                title: '总数量',
                key: 'totalCount',
                dataIndex: 'totalCount',
            },
            {
                title: '库存',
                key: 'storeCount',
                dataIndex: 'storeCount',
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
                title: '操作',
                key: 'deal',
                render: (text, record) => (
                    <Fragment>
                        <a onClick={() => {
                            this.setState({
                                showDrawer: true,
                                showDrawerId: record.goodsId,
                                record,
                                type:1
                            })
                        }}>库存</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                          api.cargoUpdate({
                              sorted:record.sorted-1,
                              cargoId:record.cargoId
                          }).then(res=>{
                              if(res.code===200){
                                  message.success(res.message);
                                  this.getData()
                              }
                          })
                        }}>上移</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            api.cargoUpdate({
                                sorted:record.sorted+1,
                                cargoId:record.cargoId

                            }).then(res=>{
                                if(res.code===200){
                                    message.success(res.message);
                                    this.getData()
                                }
                            })
                        }}>下移</a>
                        <Divider type="vertical"/>
                        <a onClick={() => {
                            let goodsStatus = record.goodsStatus == 0 ? 1 : 0;
                            api.updateGoods({goodsStatus}).then(result => {
                                if (result.message === 'success') {
                                    message.success('保存成功！');
                                    this.getData({
                                        pageNo: this.state.currentNo,
                                        pageSize: this.state.pageSize,
                                        ...searchList
                                    })
                                } else {
                                    message.error(result.message);
                                }
                            });

                        }}>  {
                            record.goodsStatus == 1 ? '下架' : '上架'
                        }</a>
                    </Fragment>
                ),
            },
        ];
        // 定义表格的数据
        const data = {
            list: blList,
            pagination: {
                total: data ? data.total : 1,
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
                        <div style={{padding: 20, fontSize: 15}}>
                            入口：<a onClick={() => window.history.back(-1)}>{this.props.match.params.data}</a>
                        </div>
                    </Col>

                </Row>

                <Spin tip={tips} spinning={tips ? true : false}>
                    <Card bordered={false}>
                        <div className='tableList'>
                            <div className='tableListForm'>
                                <TableSearch {...searchMenu} />
                            </div>
                            <div className='tableListOperator'>
                                <Button icon="export" onClick={() => {
                                    if (this.state.checkedIds) {
                                        window.location.href = `http://shande.xajhzx.cn/service/goods/export?couponId=${this.props.match.params.id}&codeIds=` + this.state.checkedIds
                                    } else {
                                        window.location.href = `http://shande.xajhzx.cn/service/goods/export?couponId=${this.props.match.params.id}`
                                    }

                                }}>
                                    导出
                                </Button>

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
                                data={data}
                                columns={columns}
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
                            title={showDrawerId ? '编辑商品' : '新增商品'}
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
                                meetId={this.props.match.params.mid}
                                record={record}
                                type={this.state.type}
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