/**
 * 所有定义的参数，全写再index.js太长了，单独写一个文件
 * 主要涵盖：面包屑，搜索，分页
 */
export default {
    /*面包屑导航*/
    breadMenu: [{
        path: '',
        title: '会场'
    }, {
        path: '',
        title: '购买明细'
    },],
    // 搜索数据，默认一行显示3条
    searchMenu: {
        // 常在的选项
        open: [{
            id: 'mobile',
            label: '手机号',
            type: 'input', // input输入框
            placeholder: '请输入手机号',
        },{
            id: 'subject',
            label: '商品名称',
            type: 'input', // input输入框
            placeholder: '请输入商品名称',
        } ,  {
            id: 'rangeTime',
            label: '发放时间',
            type: 'rangePicker',
            placeholder: ['开始时间','结束时间']
        },{
            id: 'orderStatus',
            label: '状态',
            type: 'select', //                //0-待支付 1-发货中 2-已发货 3-已关闭 4-退款中 5-已退款",
            option: [{
                label: '全部',
                value: null,
            },{
                label: '待支付',
                value: '0',
            }, {
                label: '发货中',
                value: '1',
            },{
                label: '已发货',
                value: '2',
            },{
                label: '已关闭',
                value: '3',
            },{
                label: '退款中',
                value: '4',
            },{
                label: '已退款',
                value: '5',
            }],
        },{
            id: 'deliveType',
            label: '交货方式',
            type: 'select', //                                  return text == 0 ? '直冲' : text == 1 ? '卡密' : '邮递'
            option: [{
                label: '全部',
                value: null,
            },{
                label: '直充',
                value: '0',
            }, {
                label: '卡密',
                value: '1',
            },{
                label: '邮递',
                value: '2',
            },  {
                id: 'rangeTime',
                label: '发放时间',
                type: 'rangePicker',
                placeholder: ['开始时间','结束时间']
            },],
        }],
    },
}