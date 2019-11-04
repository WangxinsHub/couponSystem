import React, {Component, } from 'react';
import {is, fromJS} from 'immutable';
import {object, func} from 'prop-types';
import {Card, Button, Divider, message, Drawer, Spin, Badge, Popconfirm} from 'antd';
import '@/style/list.less';
import defaultImg from './index.png'

class Home extends Component {
    static propTypes = {
        oneSupplierReducer: object,
        getList: func,
    };
    state = {
    }

    render() {

        return (
           <div>
               <Card bordered={false}>
                   <span style={{fontWeight:500,fontSize:17,textAlign:'center',width:'100%'}}>欢迎使用 : 汇信卡券分发系统</span>
                   <img style={{width:600,margin:'auto'}} src={defaultImg} alt=""/>
               </Card>
           </div>
        );
    }
}

export default Home