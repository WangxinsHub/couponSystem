import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Card, Button, Divider, message, Drawer, Spin, Modal, DatePicker, Popconfirm,} from 'antd';
import {PageHeaderLayout, TableSearch, StandardTable, TableCommon, Utils} from 'dt-antd';
import Define from './define';
import {getList} from './action';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import api from '../../api/api'
import NewForm from "./edit";
import moment from 'moment';
import Detail from '../../components/tableDrawer/detail';


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
            pageNo: this.state.currentNo,
            pageSize: this.state.pageSize
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
                if (json.searchList.rangeTime) {
                    json.searchList.startTime = json.searchList.rangeTime[0]
                    json.searchList.endTime = json.searchList.rangeTime[1]
                    delete json.searchList.rangeTime;
                }

                this.setState(json);

                this.props.getList({
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
            startPage: this.state.currentNo,
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
                    json.searchList.startTime = json.searchList.rangeTime[0]
                    json.searchList.endTime = json.searchList.rangeTime[1]
                    delete json.searchList.rangeTime;
                }

                this.setState(json);
                this.props.getList({
                    ...json.searchList,
                    pageNo: this.state.currentNo,
                    pageSize: this.state.pageSize

                });
            }
        });
    }

    handleDelete = (activityId) => async (activityId) => {
        let result = await api.deleteActive({activityId})
        if (result.message === 'success') {
            message.success('删除成功！');
        } else {
            message.error(result.message);
        }
        let searchList = this.state.searchList || {};
        this.props.getList({
            pageNo: this.state.currentNo,
            pageSize: this.state.pageSize,
            ...searchList
        });
    }

    stop(record) {
        api.updateActive({
            id: record.id,
            state: 'OVER'
        }).then(result => {
            if (result.message === 'success') {
                message.success('保存成功！');
            } else {
                message.error(result.message);
            }
            let searchList = this.state.searchList || {};
            this.props.getList({
                pageNo: this.state.currentNo,
                pageSize: this.state.pageSize,
                ...searchList
            });
        })

    }


    disabledStartDate = record =>(current) => {
        return current && current < moment(record && record.validEnd);

    };

    /**
     * [render description]
     * @return {[type]} [description]
     */
    render() {
        const {tips, currentNo, pageSize, showDrawerId, showDetail, showDrawer, record,} = this.state;
        const {loading, list} = this.props.activeConfigReducer;
        console.error(showDetail)

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
                title: '券',
                key: 'activityCoupons',
                dataIndex: 'activityCoupons',
                render: (coupon) => {
                    return coupon.map(c => c.couponName).join()
                }
            },

            {
                title: '状态',
                key: 'state',
                dataIndex: 'state',
                //DRAFT 草案
                //ONLINE 已上线
                //READY 待上线
                //OVER 已结束
                render: (text, record) => {
                    if (text === 'ONLINE') {
                        return '已上线'
                    } else if (text === 'READY') {
                        return '待上线'
                    } else if (text === 'DRAFT') {
                        return '草案'
                    } else {
                        return '已结束'
                    }
                }
            },
            {
                title: '活动有效期',
                key: 'validStart',
                dataIndex: 'validStart',
                render: (text, record) => {
                    if (record.validStart) {
                        return record.validStart + '至' + record.validEnd
                    } else {
                        return null
                    }
                }
            },

            {
                title: '更新时间',
                key: 'updateTime',
                dataIndex: 'updateTime',
            },
            {
                title: '更新人',
                key: 'lastModifyUser',
                dataIndex: 'lastModifyUser',
            },
            {
                title: '操作',
                key: 'deal',
                render: (record) => (
                    <Fragment>
                        {
                            record.state === 'DRAFT' ?
                                <Fragment>
                                    <a onClick={() => {
                                        this.setState({
                                            showDrawer: true,
                                            showDrawerId: record.id,
                                            record: record
                                        })
                                    }}>编辑</a>
                                    <Divider type="vertical"/>
                                    <a onClick={() => {
                                        let validStart = new Date(record.validStart).valueOf();
                                        let validEnd = new Date(record.validEnd).valueOf();
                                        let now = new Date().valueOf();


                                        if(now<=validStart && record.activityCoupons.length>0){
                                            api.updateActive({
                                                id: record.id,
                                                state: 'READY'
                                            }).then(res => {
                                                if (res.message === 'success') {
                                                    message.success('保存成功！');
                                                } else {
                                                    message.error(res.message);
                                                }
                                                let searchList = this.state.searchList || {};
                                                this.props.getList({
                                                    pageNo: this.state.currentNo,
                                                    pageSize: this.state.pageSize,
                                                    ...searchList
                                                });
                                            })
                                        }else{
                                            if (now < validEnd) {
                                                api.updateActive({
                                                    id: record.id,
                                                    state: 'ONLINE'
                                                }).then(res => {
                                                    if (res.message === 'success') {
                                                        message.success('保存成功！');
                                                    } else {
                                                        message.error(res.message);
                                                    }
                                                    let searchList = this.state.searchList || {};
                                                    this.props.getList({
                                                        pageNo: this.state.currentNo,
                                                        pageSize: this.state.pageSize,
                                                        ...searchList
                                                    });
                                                })
                                            } else {
                                                api.updateActive({
                                                    id: record.id,
                                                    state: 'OVER'
                                                }).then(res => {
                                                    if (res.message === 'success') {
                                                        message.success('发布成功！');
                                                    } else {
                                                        message.error(res.message);
                                                    }
                                                    let searchList = this.state.searchList || {};
                                                    this.props.getList({
                                                        pageNo: this.state.currentNo,
                                                        pageSize: this.state.pageSize,
                                                        ...searchList
                                                    });
                                                })
                                            }
                                        }


                                    }}>发布</a>
                                    <Divider type="vertical"/>
                                    <Popconfirm
                                        title='是否确认删除活动？'
                                        onConfirm={this.handleDelete(record.id)}
                                        okText='是'
                                        placement="topRight"
                                        cancelText='否'
                                    >
                                        <a>删除</a>
                                    </Popconfirm>

                                </Fragment>
                                : record.state === 'READY' ?
                                <Fragment>
                                    <a onClick={() => {
                                        this.setState({
                                            showDrawer: true,
                                            showDrawerId: record.id,
                                            record: record
                                        })
                                    }}>编辑</a>
                                    <Divider type="vertical"/>
                                    <Popconfirm
                                        title='是否确认删除活动？'
                                        onConfirm={this.handleDelete(record.id)}
                                        okText='是'
                                        placement="topRight"
                                        cancelText='否'
                                    >
                                        <a>删除</a>
                                    </Popconfirm>
                                </Fragment>
                                : record.state === 'ONLINE' ?
                                    <Fragment>
                                        <Popconfirm placement="top" title="确认要提前结束吗？"
                                                    onConfirm={() => this.stop(record)}
                                                    okText='确认'
                                                    cancelText='取消'
                                        >
                                            <a>提前结束</a>
                                        </Popconfirm>

                                        <Divider type="vertical"/>

                                        <a onClick={() => {
                                            this.props.history.push(`/couponStore/${record.id}`)
                                        }}>调整库存</a>

                                        <Divider type="vertical"/>

                                        <a onClick={(e) => {
                                            e.stopPropagation()
                                            const that = this;
                                            Modal.confirm({
                                                title: '延长时间',
                                                okText: '确定',
                                                cancelText: '取消',
                                                content: (
                                                    <div>
                                                        <DatePicker
                                                            showTime
                                                            defaultValue={moment(record && record.validEnd)}
                                                            placeholder="请选择延长时间"
                                                            disabledDate={this.disabledStartDate(record)}

                                                            onChange={(val) => {
                                                                console.log(val);
                                                                this.setState({
                                                                    delayTime: (val).format("YYYY/MM/DD HH:mm:ss"),
                                                                })
                                                            }}/>
                                                    </div>
                                                ),
                                                onOk() {
                                                    const {delayTime} = that.state;
                                                    api.updateActive({
                                                        id: record.id,
                                                        validEnd: delayTime
                                                    }).then(res => {
                                                        if (res.message === 'success') {
                                                            message.success('保存成功！');
                                                        } else {
                                                            message.error(res.message);
                                                        }
                                                        let searchList = that.state.searchList || {};
                                                        that.props.getList({
                                                            pageNo: that.state.currentNo,
                                                            pageSize: that.state.pageSize,
                                                            ...searchList
                                                        });
                                                    })
                                                },
                                                onCancel() {
                                                }
                                            });
                                        }}>延长时间</a>

                                        <Divider type="vertical"/>

                                        <a onClick={() => {
                                            this.props.history.push(`/SendDetail/${record.id}/${null}`)
                                        }}>活动明细</a>
                                    </Fragment>
                                    : record.state === 'OVER' ? <Fragment>
                                        <a onClick={() => {
                                            this.props.history.push(`/SendDetail/${record.id}/${null}`)
                                        }}>活动明细</a>
                                    </Fragment> : null
                        }
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
                            <div className='tableListForm'>
                                <TableSearch {...searchMenu} />
                            </div>
                            <div className='tableListOperator'>
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
                                noCheck={true}
                            />
                        </div>
                        <Drawer
                            title={'活动详情'}
                            width='560'
                            visible={showDetail}
                            maskClosable={false}
                            onClose={() => {
                                this.setState({
                                    showDetail: false
                                })
                            }}
                        >
                            <Detail
                                visible={showDetail}
                                title='广告详情'
                                width='540'
                                data={
                                    [{
                                        title: record && record.activityName,
                                        children: [{
                                            title: '部门',
                                            content: record && record.departmentValue, // 图片展示地址，和content不能共存
                                            col: 24, // 占宽度,12表示50%
                                        }, {
                                            title: '状态',
                                            content: record ? record.state === 'ONLINE' ? '已上线' : record.state === 'READY' ? '待上线' : record.state === 'DRAFT' ? '草案' : '已结束' : '',
                                            col: 24, // 占宽度,12表示50%
                                        }, {
                                            title: '开始时间',
                                            content: record && record.validStart,
                                            col: 24, // 占宽度,12表示50%
                                        }, {
                                            title: '结束时间',
                                            content: record && record.validEnd,
                                            col: 24, // 占宽度,12表示50%
                                        }, {
                                            title: '活动描述',
                                            content: record && record.description,
                                            col: 24, // 占宽度,12表示50%
                                        }, {
                                            title: '券',
                                            content: record && record.activityCoupons.map((coupon) => coupon.couponName).join(),
                                            col: 24, // 占宽度,12表示50%
                                        }, {
                                            title: '券信息',
                                            content: record && record.activityCouponMessage,
                                            col: 24, // 占宽度,12表示50%
                                        }, {
                                            title: '创建时间',
                                            content: record && record.createTime,
                                            col: 24, // 占宽度,12表示50%
                                        }, {
                                            title: '更新时间',
                                            content: record && record.updateTime,
                                            col: 24, // 占宽度,12表示50%
                                        }]
                                    }]
                                }

                            />
                        </Drawer>


                        <Drawer
                            title={showDrawerId ? '编辑活动' : '新增活动'}
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
                    </Card>
                </Spin>
            </PageHeaderLayout>);
    }
}

export default connect((state) => ({
    activeConfigReducer: state.activeConfigReducer


}), {
    getList,
})(Home);
