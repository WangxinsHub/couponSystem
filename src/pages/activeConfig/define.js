/**
 * 所有定义的参数，全写再index.js太长了，单独写一个文件
 * 主要涵盖：面包屑，搜索，分页
 */
export default {
    /*面包屑导航*/
    breadMenu: [{
        path: '',
        title: '活动'
    }, {
        path: '',
        title: '活动配置'
    }],
    searchMenu: {
        // 常在的选项
        open: [{
            id: 'activityName',
            label: '活动名称',
            type: 'input', // input输入框
            placeholder: '请输入券名称',
        },{
            id: 'activityName',
            label: '渠道商名称',
            type: 'input', // input输入框
            placeholder: '请输入渠道商名称',
        }, {
            id: 'state',
            label: '请选择活动状态',
            type: 'select', //充值状态 0 以提交 1- 成功 2-提交失败
            option: [{
                label: '全部',
                value: null,
            }, {
                label: '已上线',
                value: 'ONLINE',
            }, {
                label: '待上线',
                value: 'READY',
            }, {
                label: '草案',
                value: 'DRAFT',
            },{
                label: '已结束',
                value: 'OVER',
            }],
        }],
    },

}