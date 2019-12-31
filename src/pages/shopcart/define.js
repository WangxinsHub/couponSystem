/**
 * 所有定义的参数，全写再index.js太长了，单独写一个文件
 * 主要涵盖：面包屑，搜索，分页
 */
export default {
    /*面包屑导航*/
    breadMenu: [{
        path: '',
        title: '商城'
    }, {
        path: '',
        title: '入口管理'
    }, {
        path: '',
        title: '入口列表'
    }],
    // 搜索数据，默认一行显示3条
    searchMenu: {
        // 常在的选项
        open: [{
            id: 'goodsName',
            label: '商品名称',
            type: 'input', // input输入框
            placeholder: '请输入商品名称',
        },{
            id: 'goodsStatus',
            label: '状态',
            type: 'select', //充值状态 0 以提交 1- 成功 2-提交失败
            option: [{
                label: '全部',
                value: null,
            },{
                label: '已上架',
                value: '0',
            }, {
                label: '已下架',
                value: '1',
            }],
        }],
    },
}