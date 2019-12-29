import React, {useState} from 'react';

import {Tabs, List} from 'antd-mobile';
import './style/bill.less'

const tabs = [
    {title: '全部'},
    {title: '支付中'},
    {title: '完成'},
    {title: '失败'},
];
const Item = List.Item;
const Brief = Item.Brief;


export default () => {
    function handleTabChange(tabData, index) {
        console.log(tabData);
    }

    return (
        <div>
            <div className='phone-field'>15616760175</div>
            <Tabs tabs={tabs}
                  onChange={handleTabChange}
                  animated={false}
                  useOnPan={false}
            >
                <div>
                    <Item multipleLine
                          onClick={() => {}}
                    >
                        5元话费充值 <span className='tag-blue'>直冲</span>
                        <Brief>2019-12-12 12:12:12</Brief>
                    </Item>
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '250px',
                    backgroundColor: '#fff'
                }}>
                    支付中
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '250px',
                    backgroundColor: '#fff'
                }}>
                    Content of third tab
                </div>
            </Tabs>

        </div>
    )
}