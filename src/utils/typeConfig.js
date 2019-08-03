/**
 * name: 后台返回012对应的string的通用配置
 * author: 雏田
 * version: 1.0
 * time: 2018-08-20
 */
export default {
  /**
   * [用户证件类型]
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  certifyType: (type) => {
    switch(type){
      case '1':
        return '身份证';
      case '2':
        return '护照';
      case '3':
        return '军官证';
      case '4':
        return '士兵证';
      case '5':
        return '回乡证';
      case '6':
        return '临时身份证';
      case '7':
        return '户口簿';
      case '8':
        return '警官证';
      case '9':
        return '台胞证';
      case '10':
        return '营业执照';
      case '11':
        return '其他证件';
      case '12':
        return '港澳居民来往内地通行证';
      case '13':
        return '台湾居民来往大陆通行证';
      case '14':
        return '未知类型';
      default:
        return '未知类型';
    }
  },
  /**
   * [账户状态]
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  accountStatus: (type) => {    
    switch(type){
      case '1':
        return '正常';
      case '2':
        return '销户中';
      case '3':
        return '已注销';
      case '4':
        return '冻结';      
      default:
        return type;
    }
  },
  /**
   * [卡类型]
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  cardStatus: (type) => {
    switch(type){
      case '1':
        return '正常';
      case '2':
        return '退卡中';
      case '3':
        return '已冻结';
      case '4':
        return '已注销';
      default:
        return type;
    }     
  },
  /**
   * [账户类型]
   * @route  /cardAccount/:id/detail
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  accountType: (type) => {
    switch(type){
      case '0':
        return '销户';
      case '1':
        return '充值';
      case '2':
        return '消费';
      case '3':
        return '转账进';
      case '4':
        return '转账出';
      case '5':
        return '消费退款';
      case '6':
        return '提现';
      case '7':
        return '冻结';
      case '8':
        return '解冻';
      default:
        return type;
    }     
  },
  /**
   * [交易管理-充值订单列表-状态]
   * @route  /rechargeList
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  tradeRechargeList: (type) => {
    switch(type){
      case '0':
        return '待支付';
      case '1':
        return '已提交';
      case '2':
        return '已支付';
      case '3':
        return '已关闭';
      case '4':
        return '提交失败';
      case '9':
        return '坏账';
      default:
        return type;
    }     
  },
  /**
   * [交易管理-充值订单列表-充值订单流水-支付方式]
   * @route  /rechargeDetail
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  tradeRechargeType: (type) => {
    switch(type){
      case '1':
        return '主账户支付';
      case '2':
        return '优充账户支付';
      case '3':
        return '支付宝支付';  
      case '4':
        return '日票';
      case '13':
        return '支付宝支付';     
      default:
        return type;
    }     
  },
  /**
   * [交易管理-退款订单列表-退款订单流水-交易状态]
   * @route  /rechargeDetail
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  tradeRefundList: (type) => {
    switch(type){
      case '0':
        return '待提交';
      case '1':
        return '处理中';
      case '2':
        return '已退款';
      case '3':
        return '订单关闭'; 
      case '4':
        return '订单失败';       
      default:
        return type;
    }     
  },
  /**
   * [日票管理-购买记录]
   * @route  /dayTicketPay
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  dayTicketPayStatus: (type) => {
    switch(type){
      case '0':
        return '待提交';
      case '1':
        return '出票中';
      case '2':
        return '交易成功';
      case '3':
        return '交易关闭';      
      default:
        return type;
    }     
  },
  /**
   * [日票管理-日票列表]
   * @route  /dayTicketList
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  dayTicketStatus: (type) => {
    switch(type){
      case '1':
        return '冻结';
      case '2':
        return '退款中';
      case '3':
        return '未生效'; 
      case '4':
        return '待提交';
      case '5':
        return '生效中';
      case '6':
        return '已失效';     
      default:
        return type;
    }     
  },
  /**
   * [日票管理-退款订单列表]
   * @route  /dayTicketReturn
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  dayTicketReturnStatus: (type) => {
    switch(type){
      case '1':
        return '处理中';
      case '2':
        return '已退款';
      case '3':
        return '订单关闭'; 
      case '4':
        return '订单失败';
      case '0':
        return '待提交';    
      default:
        return type;
    }     
  },
  /**
   * [广告列表的投放页面]
   * @param  {[type]} type [后台的number]
   * @return {[type]}      [对应的string]
   */
  advertPage: (type) => {    
    switch(type){
      case '1':
        return '卡详情页'; 
      default:
        return type;
    }
  },
}

