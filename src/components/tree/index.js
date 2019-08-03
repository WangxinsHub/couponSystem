import React from 'react';
import {Checkbox, Row, Col, Icon} from 'antd';
const plainOptions = ['1', '0'];
const defaultCheckedList = [];


export default class MenuTree extends React.Component {
  state = {
    checkedList: defaultCheckedList,
    indeterminate: true,
    checkAll: false,
    menuTree: this.props.menuTree,
    showSub: true
  };

  /**
   * 全选 全不选
   */
  checkAllData(index, type) {
    let {menuTree} = this.state;
    if (menuTree[index][type] === 0) {
      if(type==='isAllowWrite'){
        menuTree[index]['isAllowRead'] = 1

        if (menuTree[index].childMenus && menuTree[index].childMenus.length > 0) {
          menuTree[index].childMenus.forEach((item, _index) => {
            item['isAllowRead'] = 1
          });
        }
      }
      menuTree[index][type] = 1;
      if (menuTree[index].childMenus && menuTree[index].childMenus.length > 0) {
        menuTree[index].childMenus.forEach((item, _index) => {
          item[type] = 1
        });
      }
    } else {
      menuTree[index][type] = 0;
      console.log(2222);
      if (menuTree[index].childMenus && menuTree[index].childMenus.length > 0) {
        menuTree[index].childMenus.forEach((item, _index) => {
          item[type] = 0
        });
      }
    }
    this.setState({
      menuTree
    });
    this.props.handleChange(menuTree)

  }

  checkData(index, subIndex, type) {
    let {menuTree} = this.state;
    let checkCount = 0;
    let checkReadCount = 0;
    if (menuTree[index].childMenus[subIndex][type] === 0) {
      console.log(menuTree[index]);
      if(type==='isAllowWrite'){
        menuTree[index].childMenus[subIndex]['isAllowRead'] = 1;
        menuTree[index]['isAllowRead'] = 1;
      }
      menuTree[index].childMenus[subIndex][type] = 1;
      menuTree[index]['isAllowRead'] = 1;
      console.log(menuTree[index]);

    } else {
      menuTree[index].childMenus[subIndex][type] = 0;
    }
    // menuTree[index].childMenus.forEach((each) => {
    //   if (each[type] === 0) {
    //     menuTree[index][type] = 0;
    //   }
    //   if (each[type] === 1) {
    //     checkCount++
    //   }
    //   if (each['isAllowRead'] === 1) {
    //     checkReadCount++
    //   }
    //   if (checkCount === menuTree[index].childMenus.length) {
    //     menuTree[index][type] = 1;
    //   }
    //   if (checkReadCount === menuTree[index].childMenus.length) {
    //     menuTree[index]['isAllowRead'] = 1;
    //   }
    // });
    this.setState({
      menuTree
    });
    this.props.handleChange(menuTree)
  }

  /**
   * 收缩展开自己菜单
   */
  shrinkSub(index){
    let {menuTree} = this.state;
    menuTree[index].shrink = !Boolean(menuTree[index].shrink);
    this.setState({menuTree})
  }

  render() {
    const menuTreeArr = this.state.menuTree;
    return (
      <div>
        <div className="menuTreeTitle">
          <Row gutter={16}>
            <Col className="gutter-row" span={12}>
              <div className="gutter-box">功能</div>
            </Col>
            <Col className="gutter-row" span={6} style={{textAlign: 'center'}}>
              <div className="gutter-box">只读</div>
            </Col>
            <Col className="gutter-row" span={6} style={{textAlign: 'center'}}>
              <div className="gutter-box">操作</div>
            </Col>
          </Row>
        </div>

        {
          menuTreeArr && menuTreeArr.map((val, index) => (
            <div key={index}>
              <Row>
                <Col className="gutter-row" style={{cursor: 'pointer'}} span={12} onClick={() => {
                  this.shrinkSub(index)
                }}>
                  <Row>
                    <Col className="gutter-row" span={3} style={{textAlign: 'center'}}>
                      <Icon style={{ fontSize: '10px', }}  type={ !val.shrink?"caret-up"  : "caret-down" } theme="outlined"/>
                    </Col>
                    <Col className="gutter-row" span={21}>
                      <div className="gutter-box">{val.menuName}</div>
                    </Col>
                  </Row>
                </Col>

                <Col span={6} style={{textAlign: 'center'}}>
                  <Checkbox defaultChecked={val.isAllowRead === 1} checked={val.isAllowRead === 1}
                            onChange={() => {
                              this.checkAllData(index, 'isAllowRead')
                            }}/></Col>
                <Col span={6} style={{textAlign: 'center'}}>
                  <Checkbox defaultChecked={val.isAllowWrite === 1}
                            checked={val.isAllowWrite === 1}
                            onChange={() => {
                              this.checkAllData(index, 'isAllowWrite')
                            }}/></Col>
              </Row>
              {(val.childMenus && val.childMenus.length !== 0) ? val.childMenus.map((subVal, subIndex) => (
                !val.shrink && <div key={subIndex}>
                  <Row>
                    <Col className="gutter-row" span={9} offset={3}>
                      <div className="gutter-box">{subVal.menuName}</div>
                    </Col>
                    <Col span={6} style={{textAlign: 'center'}}>
                      <Checkbox defaultChecked={subVal.isAllowRead === 1}
                                checked={subVal.isAllowRead === 1}
                                onClick={() => {
                                  this.checkData(index, subIndex, 'isAllowRead')
                                }}
                      /></Col>
                    <Col span={6} style={{textAlign: 'center'}}>
                      <Checkbox defaultChecked={subVal.isAllowWrite === 1}
                                checked={subVal.isAllowWrite === 1}
                                onClick={() => {
                                  this.checkData(index, subIndex, 'isAllowWrite')
                                }}
                      /></Col>
                  </Row>
                </div>
              )) : null}
            </div>
          ))
        }
      </div>
    );
  }

  onChange = (checkedList) => {
    this.setState({
      checkedList,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll: checkedList.length === plainOptions.length,
    });
  }

  onCheckAllChange = (e) => {
    this.setState({
      checkedList: e.target.checked ? plainOptions : [],
      indeterminate: false,
      checkAll: e.target.checked,
    });
  }
}

