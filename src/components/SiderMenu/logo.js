
import React from 'react';
import {Link} from 'react-router-dom';
import './index.less';
import logos from './logo.png';
export default class SiderMenuWrapper extends React.PureComponent {
  render(){
    const {logo, title, theme} = this.props;
    return (<div className={`${theme.navTheme === 'light' ? 'navLogo navLogoWhite' : 'navLogo'}`} key="logo">
      <Link to="/couponList">
        {/*<img src={logo || logos} alt="logo" />*/}
        <h1>{title || '汇信卡券分发系统'}</h1>
      </Link>
    </div>)
  }
}
