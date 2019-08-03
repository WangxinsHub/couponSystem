/**
 * @title: 表格中点击详情弹出右侧显示详情的组件。只考虑当前情况，有新需求继续往下加
 * @author: 雏田
 * @version: 1.0.0
 * @time: 2018-08-16
 * @param {[string]}   [title]   [页面标题，如：XX广告详情]
 * @param {[function]} [onClose] [关闭的回调函数，需要关闭抽屉]
 * @param {[string]}   [width]   [抽屉的宽度，默认为640，可不填]
 * @param {[array]}    [width]   [详情内容的值，具体示例如下]
 * 传入的数据格式:
 * const data = [{ 
 *  title: '副标题',     
    children: [{
        title: '标题',
        content: '广告的标题',
        col: 24, // 占宽度,12表示50%
      }, {
        title: '图片',
        picUrl: 'http://imgcache.qq.com/club/item/wallpic/items/2/5412/760_300_5412.jpg', // 图片展示地址，和content不能共存
        col: 24, // 占宽度,12表示50%
      }, {
        title: '链接地址',
        linkUrl: 'https://www.baidu.com', // 链接地址，如果可点击用此字段，仅展示用content字段
        col: 24, // 占宽度,12表示50%
      }, {
        title: '卡类型',
        tags: ['聊城云卡','义乌云公交卡','济南公交卡'], // tag模式排列，和content字段不能共存
        col: 24, // 占宽度,12表示50%
      }]
    },{
      title: '副标题2', // 可不填
      children: [{
        title: '标题2',z
        content: '内容2',
        col: 24, // 占宽度,24表示100%
      }]
    }]
  * 调用方法：
  * {
      this.state.showDrawer &&
      <Drawer
        title='广告详情'
        width='540'
        data={_data}
        onClose={()=>{
          let that = this;
          setTimeout(function(){
            that.setState({
            showDrawer: false
          })
          },500);                
        }}
      /> 
    } 
 */
import React from 'react';
import {
  Row,
  Col,
  Tag,
  Spin,  
  Drawer
} from 'antd';
import './index.less';

export default class TableDrawer extends React.Component {
  state={
    showDrawer: true, // 展开状态
  }
  /**
   * [componentWillMount 加载render方法之前]
   * @return {[type]} [description]
   */
  componentWillMount(){
   // this.renderSimpleForm(this.props);
  }
  render() {
    const {title, // 标题      
      onClose, // 关闭的回调函数(可不填)
      width, // 宽度(可不填)
      data, // 显示的数值
    } = this.props;    
    return (
      <Drawer
        title={title}
        width={width || 640}
        placement="right"
        closable={false}
        onClose={()=>{
          this.setState({
            showDrawer: false,
          })
          onClose();
        }}
        visible={this.state.showDrawer}
      >
      <Spin spinning={!data}>     
      {
        data && data.map((item,index)=> {
          return(<div key={index}>
            {
              !!item.title && (<p className='pStyle'>{item.title}</p>)
            }
            <Row>
              {
                item.children.map((value, _index)=>{
                  return (<Col span={value.col} key={_index}>
                    <div className='tableDetailTile'>
                      <p>{value.title}:</p>                      
                      {
                        value.content && value.content
                      }
                      {
                        value.picUrl && <img src={value.picUrl} alt=''/>
                      }
                      {
                        value.linkUrl && <a href={value.linkUrl} target="_blank">{value.linkUrl}</a>
                      }
                      {
                        value.tags &&
                        value.tags.map((item, index) => {
                          return (<Tag key={index}>{item}</Tag>)
                        })
                      }                    
                    </div>                    
                  </Col>)
                })
              }
            </Row>
          </div>)          
        })
      }
      </Spin>     
      </Drawer>
    )    
  }
}