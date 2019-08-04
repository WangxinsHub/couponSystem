/**
 * 所有定义的参数，全写再index.js太长了，单独写一个文件
 * 主要涵盖：面包屑，搜索，分页
 */
export default {
    /*面包屑导航*/
    breadMenu: [{
        path: '',
        title: '券库'
    }, {
        path: '',
        title: '券码管理'
    }],
    // 搜索数据，默认一行显示3条
    searchMenu: {
        // 常在的选项
        open: [{
            id: 'mobile',
            label: '手机号',
            type: 'input', // input输入框
            placeholder: '请输入手机号',
        },{
            id: 'sendBatchId',
            label: '发送批次号',
            type: 'input', // input输入框
            placeholder: '请输入发送批次号',
        },, {
            id: 'messageState',
            label: '请选择发送信息状态',
            type: 'select', //充值状态 0 以提交 1- 成功 2-提交失败
            option: [{
                label: '全部',
                value: null,
            }, {
                label: '发送中',
                value: 'SENDING',
            }, {
                label: '成功',
                value: 'SUCCESS',
            }, {
                label: '失败',
                value: 'FAIL',
            }],
        },
            // {
            //     id: 'payStatus',
            //     label: '付款状态',
            //     type: 'select', // 支付状态 0-待支付
            //     opti on: [{
            //         label: '全部',
            //         value: null,
            //     }, {
            //         label: '待支付',
            //         value: 0,
            //     }, {
            //         label: '已支付',
            //         value: 1,
            //     }],
            // }, {
            //     id: 'rangeTime',
            //     label: '开始时间',
            //     type: 'rangePicker',
            //     placeholder: '请选择开始时间'
            // },
        ],
    },
}