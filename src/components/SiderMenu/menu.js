
import React from 'react';
import {Link} from 'react-router-dom';
import { Menu, Icon } from 'antd';
import './index.less';

const SubMenu = Menu.SubMenu;
export default class SiderMenuWrapper extends React.PureComponent {  
  render(){
    const {selectedKeys, menuProps, menu, path, isTop, theme, handleOpen} = this.props;
    console.error(menu)

    return (<Menu
      key="Menu"
      theme={`${theme.navTheme || 'dark'}`}
      mode={`${isTop ? 'horizontal' : 'inline'}`}                      
      selectedKeys={[selectedKeys]}                
      onOpenChange={handleOpen}
      {...menuProps}
    >
    {
      menu && menu.map((item) => {
        return (
          sessionStorage.loginFlag ? <SubMenu
            key={item.code}
            title={<span><Icon type={item.icon}/><span>{item.name}</span></span>}                  
          >
          {
            item.subMenus && item.subMenus && item.subMenus.map((value)=>{
              return (
                value.show && <Menu.Item key={value.code}>
                {
                  value.url !== path ?
                  (<Link to={`${value.url}`}>{value.name}</Link>) :
                  value.name
                }
              </Menu.Item>)
            })
          }                               
          </SubMenu>:null
        )
      })
    }         
    </Menu>)
  }
}
