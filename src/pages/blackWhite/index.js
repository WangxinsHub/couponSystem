import React, {Component, Fragment} from 'react';
import {connect} from 'react-redux';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Card, Button, Divider, message, Drawer, Spin, Badge, Popconfirm, Row, Col} from 'antd';
import {PageHeaderLayout, TableSearch, StandardTable, TableCommon, Utils} from 'dt-antd';
import Define from './define';
import tableCommon from '../../utils/tableCommon.js';
import '@/style/list.less';
import util from '../../utils/base'
import NewForm from "./send";
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
       this.getData();
    }

    getData(params){
        api.blList({
            blackListType:this.props.match.params.type,
            meetingId:this.props.match.params.meetId,
            ...params
        }).then(data=>{
            this.setState({
                data:data,
                blList:data.data||[]
            })
            console.log(data);
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
                if( json.searchList.rangeTime){
                    json.searchList.startTime = util.FormatDate(json.searchList.rangeTime[0],'YYYY/MM/dd hh:mm:ss')
                    json.searchList.endTime = util.FormatDate(json.searchList.rangeTime[1],'YYYY/MM/dd hh:mm:ss')
                    delete json.searchList.rangeTime;
                }

                this.setState(json,()=>{
                    this.getData({
                        ...json.searchList,
                        pageNo:json.pageNo,
                        pageSize:json.pageSize
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
                this.getData({
                    ...json.searchList,
                    pageNo:json.pageNo,
                    pageSize:json.pageSize
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

        const pageName = this.props.match.params.type ==1?'黑名单':"白名单"
        const _breadMenu = [...breadMenu,{
            path:'',
            title:pageName
        }]
        searchMenu.searchCallBack = this.handleSearch; // 查询的回调函数
        searchMenu.resetCallBack = this.handleFormReset; // 重置的回调函数
        const searchList = this.state.searchList || {};


        // 列表表头
        const columns = [
            {
                title: '手机号',
                key: 'blackMobile',
                dataIndex: 'blackMobile',
            },
            {
                title: '创建时间',
                dataIndex: 'createTime',
                key: 'createTime',
            },
            {
                title: '操作人',
                key: 'operatorUser',
                dataIndex: 'operatorUser',
            },
            {
                title: '操作',
                key: 'deal',
                render: (text,record) => (
                    <Fragment>
                        <Popconfirm placement="top" title="确认要关闭吗？" onConfirm={() => {
                           this.getData(
                               {
                                   pageNo:this.state.currentNo,
                                   pageSize:this.state.pageSize,
                                   ...searchList
                               }
                           )
                        }} okText='确认' cancelText='取消'>
                            <a>删除</a>
                        </Popconfirm>
                    </Fragment>
                ),
            },
        ];
        // 定义表格的数据
        const data = {
            list: blList ,
            pagination: {
                total: data ? data.total : 1,
                pageSize: pageSize,
                current: currentNo,
            },
        }

        return (
            <PageHeaderLayout
                nav={_breadMenu}
            >
                <Row>
                    <Col span={6}>
                        <div style={{padding:20,fontSize:15}}>
                            会场：<a onClick={()=>window.history.back(-1)}>{this.props.match.params.meetName}</a>
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
                                <Button type="danger" onClick={() => {
                                    const {selectedRow} = this.state;
                                    if(selectedRow && selectedRow.length>0){
                                        let id = selectedRow.map((data) =>data.id).filter(item=>item);

                                        api.blDelete({
                                            meetingBlackListId:id.join()
                                        }).then((res) => {

                                            if (res.message === 'success') {
                                                message.success('已批量删除！');
                                            } else {
                                                message.error(res.message);
                                            }
                                            let searchList = this.state.searchList || {};
                                            this.setState({
                                                selectedRow:null
                                            });

                                            this.getData({
                                                pageNo:this.state.currentNo,
                                                pageSize:this.state.pageSize,
                                                ...searchList
                                            })
                                        })
                                    }
                                }}>
                                    删除所选
                                </Button>
                            </div>


                            <StandardTable
                                data={data}
                                columns={columns}
                                rowKey={columns => columns.id}
                                onChange={this.handleStandardTableChange}
                                onSelectRow={data => {
                                    if(data.length>0){
                                        let ids =  data.map((code)=>(code.id));
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
                            title={'添加'+pageName}
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
                                meetingId={this.props.match.params.meetId}
                                blackListType={this.props.match.params.type}
                                onClose={(bool)=>{
                                    this.setState({
                                        showDrawer: false,
                                        showDrawerId: null,
                                        record: null
                                    });
                                    // 如果点击的确定，则刷新列表

                                    if(bool){
                                        this.getData({
                                            pageNo:this.state.currentNo,
                                            pageSize:this.state.pageSize,
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