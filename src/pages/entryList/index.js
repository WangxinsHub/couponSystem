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
    this.getData({
      pageNo: 0,
      pageSize: 10,
      channelType:0
    });
  }


  getData(params) {
    api.channelList(params).then(data => {
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


    // 列表表头
    const columns = [
      {
        title: 'id',
        key: 'channelId',
        dataIndex: 'channelId',
      },
      {
        title: '名称',
        dataIndex: 'channelName',
        key: 'channelName',
      },
      {
        title: '地址',
        key: 'channelUrl',
        dataIndex: 'channelUrl',
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
        title: '更新人',
        key: 'operatorUser',
        dataIndex: 'operatorUser',
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
              })
            }}>编辑</a>
            <Divider type="vertical"/>
            <a onClick={() => this.props.history.push(`/channelList/${JSON.stringify(record)}`)}>渠道</a>
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
                onCheck={true}
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