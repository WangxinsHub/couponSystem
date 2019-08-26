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
        title: '券列表'
    }, {
        path: '',
        title: '券库'
    }],
    // 搜索数据，默认一行显示3条
    searchMenu: {
        // 常在的选项
        open: [ {
            id: 'code',
            label: '码值',
            type: 'input', // input输入框
            placeholder: '请输入码值',
        },{
            id: 'state',
            label: '请选择券状态',
            type: 'select', //充值状态 0 以提交 1- 成功 2-提交失败
            option: [{
                label: '全部',
                value: null,
            }, {
                label: '待发送',
                value: 'READY',
            }, {
                label: '已发送',
                value: 'SEND',
            }],
        },],
    },
}