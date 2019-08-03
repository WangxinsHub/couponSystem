import Mock from 'mockjs';
import Url from '@/api/url';

Mock.setup({timeout: '1200-2600'});
/**
 * [data 获取菜单栏]
 * @type {Array}
 */
/**
 * [data 获取菜单栏]
 * @type {Array}
 */
Mock.mock(Url.getMenuTree, [{"code":"userManage","name":"用户管理","subMenus":[{"code":"userManage","name":"用户列表","subMenus":[],"url":"/userManage"}]},{"code":"cardManage","name":"卡管理","subMenus":[{"code":"cardManage.cardBrief","name":"卡列表","subMenus":[],"url":"/cardManage/cardList"},{"code":"cardManage.cardTypeManage","name":"卡类型管理","subMenus":[],"url":"/cardManage/cardTypeList"},{"code":"cardManage.auditRevoke","name":"退卡审核","subMenus":[],"url":"/cardManage/cancelCardReview"},{"code":"cardManage.revokeCardRecord","name":"退卡记录","subMenus":[],"url":"/cardManage/cancelCardRecord"}]},{"code":"tradeManage","name":"交易管理","subMenus":[{"code":"tradeManage.tradeList","name":"消费订单","subMenus":[],"url":"/tradeManage/tradeList"},{"code":"tradeManage.rechargeOrder","name":"充值订单","subMenus":[],"url":"/tradeManage/rechargeList"},{"code":"tradeManage.refundOrder","name":"退款订单","subMenus":[],"url":"/tradeManage/refundList"}]},{"code":"dayTicketManage","name":"日票管理","subMenus":[{"code":"dayTicketManage.typeManage","name":"类型管理","subMenus":[],"url":"/dayTicket/dayTicketType"},{"code":"dayTicketManage.tradeRecord","name":"购买记录","subMenus":[],"url":"/dayTicket/dayTicketPay"},{"code":"dayTicketManage.dayTicketList","name":"日票列表","subMenus":[],"url":"/dayTicket/dayTicketList"},{"code":"tradeManage.refundOrder","name":"退款订单","subMenus":[],"url":"/dayTicket/dayTicketReturn"}]},{"code":"account","name":"账户管理","subMenus":[{"code":"account.accountView","name":"账户设置","subMenus":[],"url":"/account/accountView"}]},{"code":"vcard.statistics","name":"数据报表","subMenus":[],"url":"/statistics"}]);
/**
 * [data 获广告菜单栏]
 * @type {Array}
 */
Mock.mock(Url.getMenuTree, 
  [{"code":"advertisement","name":"广告位管理","subMenus":[{"code":"advertisement.list","name":"广告列表","subMenus":[],"url":"/advert"}],"url":"ADManagement"}]
);

/**
 * 获取广告列表
 * 请求参数：
 */
Mock.mock(Url.advertList, {
  "data": [{
    'id': 10000,
    'no':1,
    "title": "津南卡详情",
    "cardType": '济南',
    "addTime": "2017-11-28 00:00:00",
    "createTime": "2017-11-20 09:58:06",
    "downTime": "2017-11-28 14:18:51",    
  }],
  "success": true,
  "errMsg": "success",
  "total": 1
});
/**
 * 保存广告
 * 请求参数：
 */
Mock.mock(Url.saveAdvert, {
  "data": {},
  "success": true,
  "errMsg": "success",
  "total": 1
});
/**
 * 获取使用帮助
 * 请求参数：
 */
Mock.mock(Url.cardTypeHelp, {
  "data": [{
    "id": "116",
    "cardTypeId": "3301000201",
    "title": "使用说明1",
    "updateName": "公交云",
    "createTime": 1529059022000,
    "updateTime": 1529059022000,
    "content": "sssss",
    "order": "1"
  }],
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 编辑卡类型使用帮助
 * 请求参数：
 */
Mock.mock(Url.cardTypeHelpEdit, {
    "data": 1,
    "success": true,
    "errMsg": "success",
    "errCode": "1000"
});
/**
 * 新增卡类型使用帮助
 * 请求参数：
 */
Mock.mock(Url.cardTypeHelpAdd, {
    "data": 1,
    "success": true,
    "errMsg": "success",
    "errCode": "1000"
});
/**
 * 删除卡类型使用帮助
 * 请求参数：
 */
Mock.mock(Url.cardTypeHelpDelete, {
    "data": 1,
    "success": true,
    "errMsg": "success",
    "errCode": "1000"
});
/**
 * 获取广告详情
 * 请求参数：
 */
Mock.mock(Url.advertDetail, {
  'data':{
    'id': 10,
    'title': '广告标题',
    'tags':['聊城云卡','义乌云公交卡','济南公交卡'],  
    "cardType": '济南',
    "addTime": "2017-11-28 00:00:00",
    "downTime": "2017-11-28 14:18:51", 
    'url':'http://www.baidu.com',
    'pic': 'http://imgcache.qq.com/club/item/wallpic/items/2/5412/760_300_5412.jpg',
    'location': '卡详情页'
  },
  "success": true,
  "errMsg": "success",
  "total": 1
});
/**
 * 获取用户列表
 * 请求参数：
 */
Mock.mock(Url.userList, {
  "data": [
    {
      "accountId": "123456789012345678",
      "realName": "张三",
      "certifyType": "身份证",
      "certifyCardNum": "333333199909091234",
      "isCertified": "已认证",
      "mobilePhone": "15811111111",
      "email": "12345@qq.com",
      "birthday": "2017-12-13",
      "address": "杭州市滨江区",
      "normalCity": "杭州",
      "normalProvince": "浙江",
      "status": "正常",
      "isStudent": "是",
      "lastUpdateTime": "2017-11-28 00:00:00",
      "distributorName": "支付宝",
      "distributorId": "100",
      "createTime": "2017-11-20 09:58:06",
      "updateTime": "2017-11-28 14:18:51",
      "extText": null
    }
  ],
  "success": true,
  "errMsg": "success",
  "total": 1
});
/**
 * 获取用户详情
 * 请求参数：
 */
Mock.mock(Url.userDetail, {
  "data": {
    "accountId": "123456789012345678",
    "realName": "张三",
    "certifyType": "身份证",
    "certifyCardNum": "333333199909091234",
    "isCertified": "已认证",
    "mobilePhone": "15811111111",
    "email": "12345@qq.com",
    "birthday": "2017-12-13",
    "address": "杭州市滨江区",
    "normalCity": "杭州",
    "normalProvince": "浙江",
    "status": "正常",
    "isStudent": "是",
    "lastUpdateTime": "2017-11-28 00:00:00",
    "distributorName": "支付宝",
    "distributorId": "100",
    "createTime": "2017-11-20 09:58:06",
    "updateTime": "2017-11-28 09:58:19",
    "extText": null
  },
  "success": true,
  "errMsg": "success"
});
/**
 * 获取卡列表
 * 请求参数：
 */
Mock.mock(Url.cardList, {
  "data": [
    {
      "cardId": "123456789012345678",
      "distributorCardNumber": "3100701577795123",
      "status": "正常",
      "cardTypeId": "3303820201",
      "accountId": "123456789012345678",
      "bizNo": "2088602049441864",
      "paymentUserId": "12345656",
      "disabled": "可用",
      "disabledCode": "100",
      "disabledTips": "余额不足",
      "cardData": "carddata",
      "balance": "0",
      "lastUpdateTime": "2017-11-29 17:47:10",
      "createTime": "2017-11-29 11:47:31",
      "updateTime": "2017-11-29 17:47:10",
      "extInfo": null,
      "distributorCardTypeName": "浦江先享后付卡",
      "merchantName": '浦江公交公司',
      "realName": "张三",
      "distributorName": "支付宝",
      "distributorCardTypeCode":"IBUS0001"
}
  ],
  "success": true,
  "errMsg": "success",
  "total": 1
});
/**
 * 卡列表筛选框卡类型查询
 * 请求参数：
 */
Mock.mock(Url.cardTypeList, {
  "data": [{
    "cardTypeId": "3201000101",
    "distributorCardTypeName": "金陵通"
  }, {
    "cardTypeId": "3201000102",
    "distributorCardTypeName": "南京电子乘车卡"
  }],
  "errCode": "1000",
  "errMsg": "success",
  "success": true
});
/**
 * 获取卡账户
 * 请求参数： 
 */
Mock.mock(Url.cardAccount, {
  "data":[
    {
      "cardId":1,
      "accountName":"钱包主账户",
      "accountType":"0",
      "accountStatus":"开通",
      "amount":"80.00",
      "modifyTime":"2017-08-31 12:00:00"
    },
    {
      "cardId":2,
      "accountName":"钱包优惠账户",      
      "accountStatus":"开通",
      "amount":"20.00",
      "modifyTime":"2017-08-31 12:00:00"
    }
  ],
  "success":true,
  "errMsg":"success",
  "errCode":"1000",
  "total":"2"
});
/**
 * 获取卡账户详情
 * 请求参数： 
 */
Mock.mock(Url.cardAccountDetail, {
  "data": [
    {
      "orderNo": "18080200024000209460690619072512",
      "paymentNo": "1897464881781669890",
      "amount": "-78.00",
      "balance": "0.00",
      "type": "0",
      "timeCreated": "1514908800000"
    }
  ],
  "success": true,
  "errMsg": "success",
  "errCode": "1000",
  "total": "1"
});
/**
 * 获取卡类型列表
 * 请求参数： 
 */
Mock.mock(Url.cardType, {
 "data": [{
   "activityContent": "<p>充值</p><p>活动说明</p>",
   "autoRevoke": "0",
   "cardFaceDetail": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/16921525533296774.png",
   "cardFaceImg": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/43241525533293253.png",
   "cardLogo": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/58441525533301274.png",
   "cardTypeId": "3301000201",
   "createTime": '2018-05-30 20:11:11',
   "description": "",
   "distributorCardTypeCode": "IBUS0001",
   "distributorCardTypeName": "公交云公交测试卡",
   "distributorDiscountTimes": 0,
   "distributorId": "100",
   "distributorName": "支付宝",
   "distributorSignPubKey": "22222222222222222222",
   "freezeTime": "1",
   "freezingMessage": "退卡中，请等待（文案，后台配）",
   "isPushRidingEvent": "0",
   "isStandardCard": "0",
   "issueSuccessSource": "GJYGJ_CARD_USE",
   "merchantId": "33010002",
   "merchantName": "公交云",
   "mqTopic": "0",
   "preferentialAccountLimit": "100000",
   "primaryAccountLimit": "10000",
   "revokingMessage": "退卡申请中（文案，后台配）",
   "ridingRecordUse": "1",
   "shareAppPrivateKey": "11111111111111111111",
   "shareAppid": "2018032102418143",
   "sharePid": "2088031585206905",
   "signType": "1",
   "source": "GJYGJ_BUS_APPLY",
   "updateTime": 1531377025000,
   "useSource": "GJYGJ_BUS_USE"
 }],
 "errCode": "1000",
 "errMsg": "success",
 "success": true,
 "total": 1
});
/**
 * 获取商户下拉数据
 */
Mock.mock(Url.getMerchant,{
   "data": [{
     "merchantSimpleName": "公交云",
     "merchantId": "33010002"
   }],
   "errCode": "1000",
   "errMsg": "success",
   "success": true
});
/**
 * 卡类型页面配置协议页面的数据
 */
Mock.mock(Url.cardTypeAgreement,{
  "data": [{
    "id": "34",
    "cardTypeId": "3301000203",
    "agreementTitle": "协议标题",
    "createTime": "2018-08-22T08:35:05.000+0000",
    "updateTime": "2018-08-22T08:35:05.000+0000",
    "agreementContent": "<p>协议内容<br/></p>"
  }],
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 卡类型页面配置-充值页面的数据
 */
Mock.mock(Url.cardTypeRecharge,{
  "data": {
    "activityContent": "<p>充值说明</p>",
    "primaryAccountLimit": 1000,
    "preferentialAccountLimit": 1000,
    "rechargePlans": [{
      "id": "78",
      "cardTypeId": "3301000203",
      "discountType": "0",
      "rechargeAmount": "1",
      "discountAmount": "",
      "actualCost": "100",
      "actualDiscount": "0",
      "createTime": "2018-07-12T06:26:54.000+0000",
      "updateTime": "2018-08-22T08:35:12.000+0000",
      "discountMsg": "展示文案"
    }]
  },
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 卡类型页面配置-配置页面的数据
 */
Mock.mock(Url.cardTypeConfig,{
  "data": {
    "cardTypeId": "3301000203",
    "distributorId": "100",
    "distributorCardTypeCode": "IBUS0003",
    "distributorCardTypeName": "公交云公交测试卡2",
    "merchantId": "33010002",
    "outMerchantId": null,
    "riskPaymentPeriod": null,
    "cardFaceImg": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/6611531380878309.png",
    "cardFaceDetail": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/65631531380886814.png",
    "cardLogo": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/2331531380897122.png",
    "signStatus": null,
    "distributorSignPubKey": "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAq+UO6maWfYp5ccGIJHJ1RaHpyr6caYKTyq1dTB",
    "publicCityId": null,
    "description": "",
    "sharePid": "2088031585206905",
    "shareAppid": "2018070560501454",
    "shareAppPrivateKey": "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggS",
    "shareTitle": "先享后付标语",
    "shareMsg": "先享后付说明",
    "rechargePid": null,
    "rechargeAppid": null,
    "rechargeAppPrivateKey": null,
    "rechargeTitle": "充值服务标语",
    "rechargeMsg": "充值服务说明",
    "rechargeStatus": "1",
    "revokeCardMsg": null,
    "copyrightMsg": "版权说明",
    "discountPrimaryAccount": 100,
    "discountDonateAccount": 100,
    "discountAlipayAccount": 100,
    "activityContent": "<p>充值说明</p>",
    "createTime": "2018-07-12T02:50:20.000+0000",
    "updateTime": "2018-08-22T08:34:49.000+0000",
    "distributorName": "支付宝",
    "merchantName": "公交云",
    "freezeTime": "1",
    "payCenterAppid": null,
    "preferentialAccountLimit": "100000",
    "primaryAccountLimit": "100000",
    "source": "",
    "useSource": "",
    "issueSuccessSource": "",
    "signType": "1",
    "sftpHost": null,
    "sftpUserName": null,
    "sftpPassword": null,
    "sftpFilePath": null,
    "revokingMessage": "您的公交云卡退卡周期为七个工作日，节假日顺延。卡内优充帐户余额不能退款。\r\n(友情提示:由于银行系统限制，卡内主帐户余额小于0.1元系统将无法进行退款，请补足0.1元以上进行操作)",
    "freezingMessage": "您提交的退卡申请已受理，系统将在五个工作日内完成退款，请留意支付宝转账记录，公交集团欢迎您再次领卡使用。谢谢！",
    "distributorDiscountTimes": 0,
    "aesKey": null,
    "mqTopic": null,
    "isPushRidingEvent": "1",
    "isStandardCard": "0",
    "ridingRecordUse": "1",
    "autoRevoke": "0",
    "isShowDalilyTicket": null
  },
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 卡类型页面配置-地址页面的数据
 */
Mock.mock(Url.cardTypeAddress,{  
  "data": {
    "cardApplyUrl": "https://vcard.ibuscloud.com/h5/vcard/page/takeCard_index?appid=2018070560501454&cardType=IBUS0003",
    "cardDetailUrl": "https://vcard.ibuscloud.com/h5/vcard/page/cardDetail?appid=2018070560501454&cardType=IBUS0003",
    "cardBalanceUrl": "https://vcard.ibuscloud.com/h5/vcard/page/balanceQuery?appid=2018070560501454&cardType=IBUS0003",
    "cardRechargeUrl": "https://vcard.ibuscloud.com/h5/vcard/page/rechargeConf?appid=2018070560501454&cardType=IBUS0003",
    "cardTravelUrl": "https://vcard.ibuscloud.com/h5/vcard/page/takeCardRecords?appid=2018070560501454&cardType=IBUS0003",
    "cardRoadUrl": "https://vcard.ibuscloud.com/h5/vcard/page/openlines?appid=2018070560501454&cardType=IBUS0003",
    "cardHelpUrl": "https://vcard.ibuscloud.com/h5/vcard/page/help?appid=2018070560501454&cardType=IBUS0003",
    "cardRevokeUrl": "https://vcard.ibuscloud.com/h5/vcard/page/cancel?appid=2018070560501454&cardType=IBUS0003"
  },
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 获取卡类型详情
 * 请求参数： 
 */
Mock.mock(Url.cardTypeDetail, {
 "data": {
   "activityContent": "<p>充值</p><p>活动说明</p>",
   "autoRevoke": "0",
   "cardFaceDetail": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/16921525533296774.png",
   "cardFaceImg": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/43241525533293253.png",
   "cardLogo": "http://pubtrans-dev.oss-cn-hangzhou.aliyuncs.com/vcard/58441525533301274.png",
   "cardTypeId": "3301000201",
   "copyrightMsg": "该服务由公交云提供",
   "createTime": 1525533307000,
   "description": "",
   "discountAlipayAccount": 10,
   "discountDonateAccount": 88,
   "discountPrimaryAccount": 90,
   "distributorCardTypeCode": "IBUS0001",
   "distributorCardTypeName": "公交云公交测试卡",
   "distributorDiscountTimes": 0,
   "distributorId": "100",
   "distributorName": "支付宝",
   "distributorSignPubKey": "MIIBIjAN.....",
   "freezeTime": "1",
   "freezingMessage": "退卡中，请等待（文案，后台配）",
   "isPushRidingEvent": "0",
   "isStandardCard": "0",
   "issueSuccessSource": "GJYGJ_CARD_USE",
   "merchantId": "33010002",
   "merchantName": "公交云",
   "mqTopic": "0",
   "payCenterAppid": 200000007,
   "preferentialAccountLimit": "100000",
   "primaryAccountLimit": "10000",
   "rechargeMsg": "充值后优先使用卡内余额付款",
   "rechargeStatus": "0",
   "rechargeTitle": "先充值，后使用",
   "revokingMessage": "退卡申请中（文案，后台配）",
   "ridingRecordUse": "1",
   "shareAppPrivateKey": "MIIEvAIBADAN.....",
   "shareAppid": "2018032102418143",
   "shareMsg": "刷码上车，车费从支付宝账户扣款",
   "sharePid": "2088031585206905",
   "shareTitle": "先乘车 后付款",
   "signType": "1",
   "source": "GJYGJ_BUS_APPLY",
   "updateTime": 1531377025000,
   "useSource": "GJYGJ_BUS_USE"
 },
 "errCode": "1000",
 "errMsg": "success",
 "success": true
});
/**
 * 新增卡详情
 */
Mock.mock(Url.cardTypeAdd,{
    "data": null,
    "success": true,
    "errMsg": "success"
});
/**
 * 编辑卡详情
 */
Mock.mock(Url.cardTypeEdit,{
    "data": null,
    "success": true,
    "errMsg": "success"
});
/**
 * 卡详情使用线路
 */
Mock.mock(Url.cardTypeLine,{
  "data": [
    {
      "id": "1",
      "cardTypeId": "3303820201",
      "lineId": "1111",
      "lineNo": "101",
      "direction": "上行",
      "startStation": "起点站1",
      "terminus": "终点站1",
      "firstBus": "5:50",
      "lastBus": "17:50",
      "lineCode": "0101",
      "companyName": "浦江",
      "createTime": 1512029038000,
      "updateTime": 1512094162000
    },
    {
      "id": "2",
      "cardTypeId": "3303820201",
      "lineId": "2222",
      "lineNo": "102",
      "direction": "下行",
      "startStation": "起点站2",
      "terminus": "终点站1",
      "firstBus": "6:00",
      "lastBus": "18:00",
      "lineCode": "0102",
      "companyName": "乐清",
      "createTime": 1512029067000,
      "updateTime": 1512094168000
    },
    {
      "id": "3",
      "cardTypeId": "3303820202",
      "lineId": "3333",
      "lineNo": "103",
      "direction": "上行",
      "startStation": "起点站3",
      "terminus": "终点站3",
      "firstBus": "6:10",
      "lastBus": "18:10",
      "lineCode": "0103",
      "companyName": "杭州",
      "createTime": 1512029094000,
      "updateTime": 1512094184000
    }
  ],
  "success": true,
  "errMsg": "success",
  "total": 3
});
/**
 * 删除卡类型使用线路
 */
Mock.mock(Url.deleteCardTypeLine,{
    "data": null,
    "success": true,
    "errMsg": "success"
});
/**
 * 新增卡类型使用线路
 */
Mock.mock(Url.addCardTypeLine,{
    "data": null,
    "success": true,
    "errMsg": "success"
});
/**
 * 获取新增卡类型使用线路列表
 */
Mock.mock(Url.cardTypeLineAdd,{
  "data": [
    {
      "id": "1",
      "cardTypeId": "3303820201",
      "lineId": "1111",
      "lineNo": "101",
      "direction": "上行",
      "startStation": "起点站1",
      "terminus": "终点站1",
      "firstBus": "5:50",
      "lastBus": "17:50",
      "lineCode": "0101",
      "companyName": "浦江",
      "createTime": 1512029038000,
      "updateTime": 1512094162000
    },
    {
      "id": "2",
      "cardTypeId": "3303820201",
      "lineId": "2222",
      "lineNo": "102",
      "direction": "下行",
      "startStation": "起点站2",
      "terminus": "终点站1",
      "firstBus": "6:00",
      "lastBus": "18:00",
      "lineCode": "0102",
      "companyName": "乐清333",
      "createTime": 1512029067000,
      "updateTime": 1512094168000
    },
    {
      "id": "3",
      "cardTypeId": "3303820202",
      "lineId": "3333",
      "lineNo": "103",
      "direction": "上行",
      "startStation": "起点站3",
      "terminus": "终点站3",
      "firstBus": "6:10",
      "lastBus": "18:10",
      "lineCode": "0103",
      "companyName": "杭州",
      "createTime": 1512029094000,
      "updateTime": 1512094184000
    }
  ],
  "succcess": true,
  "errMsg": "success",
  "total": 3
});
/**
 * 退卡记录
 */
Mock.mock(Url.cancelRecord,{
  "data": [
    {
      "id": 1,
      "merchantId": "33038202",
      "accountId": "127356386311929955",
      "cardId": "330382020200000019",
      "distributorCardNumber": "330382020200000019",
      "cardTypeId": "3303820202",
      "totalAmount": "20.00",
      "discountAmount": "10.00",
      "realAmount": "10.00",
      "status": "1",
      "credentials": "asdfasdfasdf",
      "applyRevokeTime": 1515636273000,
      "finishTime": 1515636273000,
      "createTime": 1515636273000
    },
    {
      "id": 4,
      "merchantId": "33038202",
      "accountId": "127356386311929955",
      "cardId": "330382020200000058",
      "distributorCardNumber": "330382020200000058",
      "cardTypeId": "3303820202",
      "totalAmount": "20.00",
      "discountAmount": "10.00",
      "realAmount": "10.00",
      "status": "1",
      "credentials": "asdfasdfasdf",
      "applyRevokeTime": 1515636361000,
      "finishTime": 1515636361000,
      "createTime": 1515636361000
    }
  ],
  "success": true,
  "errMsg": "success",
  "errCode": "1000",
  "total": 2
});
/**
 * 获取退卡审核列表
 */
Mock.mock(Url.cancelCard,{
  "data": [
    {
      "cardId": "330382020200000001",
      "distributorCardNumber": "330382020200000001",
      "status": "3",
      "cardTypeId": "3303820202",
      "accountId": "12345678901234444",
      "paymentUserId": "2088902570005202",
      "balance": "0.22",
      "revokeTime": 1515636361000,
      "freezeTime": 1515636661000,
      "accountType": "支付宝账号",
      "realName": "李四"
    }
  ],
  "success": true,
  "errMsg": "success",
  "errCode": "1000",
  "total": 1
});
/**
 * 退卡审核/退款
 */
Mock.mock(Url.backRevoke,{
    "data": null,
    "success": true,
    "errMsg": "success"
});
/**
 * 获取消费订单列表
 */
Mock.mock(Url.getTradeList,{
  "data": {
    "list": [{
      "orderNo": "18072020032000205052009135603712",
      "gjyCardNo": "33010002030000000015",
      "distributorCardNo": "33010002030000000015",
      "gjyUserId": 205047339319165021,
      "paymentUserId": "2088002907272559",
      "distributorName": "支付宝",
      "routeName": "1008000001",
      "amount": 1,
      "status": 0,
      "onTime": 1532088207000,
      "gjyCardType": "3301000203",
      "payType": "3",
      "finalAmount": 1
    }, {
      "orderNo": "18072019532000205049587986202624",
      "gjyCardNo": "33010002030000000015",
      "distributorCardNo": "33010002030000000015",
      "gjyUserId": 205047339319165021,
      "paymentUserId": "2088002907272559",
      "distributorName": "支付宝",
      "routeName": "1008000001",
      "amount": 1,
      "status": 0,
      "onTime": 1532087628000,
      "gjyCardType": "3301000203",
      "payType": "3",
      "finalAmount": 1
    }],
    "total": 2
  },
  "success": true,
  "errMsg": "success",
  "errCode": "1000",
  "total": 2
});
/**
 * 获取消费订单详情
 */
Mock.mock(Url.getTradeDetail,{
  "data":{
     "orderNo":"12345678900987654321",
     "outTradeNo":"12345678900987654321",
     "gjyCardNo":"12345678900987654321",
     "channelCardNo":"12345678900987654321",
     "gjyUserId":"12345678900987654321",
     "channelUserId":"28800000000123",
     "gjyCardType":"100",
     "gjyCardTypeName":"1路",
     "channelCardType":"250",
     "routeName":"0",
     "posVehicleId":"1514908800000",
     "channelName":"支付宝",
     "merchantId":"33030001",
     "merchantName":"温州公交公司",
     "cityCode":"330300",
     "cityName":"温州",
     "posDriverId":"10000",
     "onTime":"1514908800000",
     "orderTime":"1514908800000",
     "payTime":"1514908800000",
     "payType":"2",
     "amount":"200",
     "discount":"100",
     "allowance":"0",
     "actualAmount":"100",
     "discountType":"0",
     "allowanceOrg":"支付宝",
     "currencyType":"人民币",
     "onPosId":"123456",
     "status":"0",
     "remark":"beihzu"
   },
  "success":true,
  "errMsg":"success",
  "errCode":"1000"
});
/**
 * 获取电子钱包流水
 */
Mock.mock(Url.getTradeWater,{
    "data":{
        "list":[
            {
                "accountType": "主账户",
                "amount": "-1.60",
                "balance": "13.60",
                "orderNo": "18072310052000205988604257239040",
                "paymentNo": "1883576536444438530",
                "timeCreated": 1533286648462
            },
            {
                "accountType": "优充账户",
                "amount": "-1.60",
                "balance": "13.60",
                "orderNo": "18072310052000205988604257239040",
                "paymentNo": "1883576536444438530",
                "timeCreated": 1533286648462
            }
        ],
        "total":"2"
    },
    "success":true,
    "errMsg":"success",
    "errCode":"1000"
});
/**
 * 获取充值订单列表
 */
Mock.mock(Url.getRechargeList,{
"data":{
  "rechargeOrders":[{
    "actualAmount":10,
    "allowance":0,
    "amount":10,
    "cityCode":"330100",
    "cityName":"杭州市",
    "createTime":1532481201000,
    "currencyType":"人民币",
    "discount":0,
    "discountType":"0",
    "distributorCardNo":"33010002030000000202",
    "distributorCardType":"IBUS0003",
    "distributorId":"100",
    "distributorName":"支付宝",
    "extInfo":"{\"preBasicBalance\":0,\"suffBasicBalance\":10}",
    "gjyCardNo":"33010002030000000202",
    "gjyCardType":"3301000203",
    "gjyUserId":203513888229163041,
    "id":"18072509133000206700342463823872",
    "merchantId":"33010002",
    "merchantName":"公交云",
    "modifyTime":1532481208000,
    "orderTime":1532481202000,
    "payChargeNo":"1886423490379646984",
    "payTime":1532481206000,
    "payType":3,
    "paymentUserId":"2088602129773870",
    "rechargeNo":"1886423490229176327",
    "status":'2',
    "submitTime":1532481202000}],
  "totalRechargeAmount":10,
  "totalRechargeActualAmount":10
  },
"errCode":"1000",
"errMsg":"success",
"success":true,
"total":1
});
/**
 * 获取充值订单详情
 */
Mock.mock(Url.getRechargeDetail,{
 "data":{
     "actualAmount":10,
     "allowance":0,
     "amount":10,
     "cityCode":"330100",
     "cityName":"杭州市",
     "createTime":1532481201000,
     "currencyType":"人民币",
     "discount":0,
     "discountType":"0",
     "distributorCardNo":"33010002030000000202",
     "distributorCardType":"IBUS0003",
     "distributorCardTypeName":"公交云公交测试卡2",
     "distributorId":"100",
     "distributorName":"支付宝",
      "extInfo":{'preBasicBalance':0,'suffBasicBalance':10},
     "gjyCardNo":"33010002030000000202",
     "gjyCardType":"3301000203",
     "gjyUserId":203513888229163041,
     "id":"18072509133000206700342463823872",
     "merchantId":"33010002",
     "merchantName":"公交云",
     "modifyTime":1532481208000,
     "orderTime":1532481202000,
     "payChargeNo":"1886423490379646984",
     "payTime":1532481206000,
     "payType":3,
     "paymentUserId":"2088602129773870",
     "preBasicBalance":0,
     "rechargeNo":"1886423490229176327",
    "status":2,
     "submitTime":1532481202000,
     "suffBasicBalance":10
  },
   "errCode":"1000",
   "errMsg":"success",
   "success":true
});
/**
 * 获取充值订单流水
 */
Mock.mock(Url.getRechargeWater,{
    "data": [
                   {
            "accountType": "主账户",
            "amount": "-1.60",
            "balance": "13.60",
            "orderNo": "18072310052000205988604257239040",
            "paymentNo": "1883576536444438530",
            "timeCreated": 1533286648462
        },
        {
            "accountType": "优充账户",
            "amount": "-1.60",
            "balance": "13.60",
            "orderNo": "18072310052000205988604257239040",
            "paymentNo": "1883576536444438530",
            "timeCreated": 1533286648462
        }
         ],
    "success": true,
    "errMsg": "success",
    "errCode": "1000"
});
/**
 * 获取退款订单列表
 */
Mock.mock(Url.getRefundList,{
    "data": [
                   {
                            "gjyUserId":"1111",
            "distubterCardNo":"2222",
            "id":"3333",
            "basicBalance":"444",
            "refundAmount":"555",
            "gjyCardNo": '344',
            "createTime":"666",
            "modifyTime":"7777",
            "status":"2"
                   }
         ],
    "success": true,
    "errMsg": "success",
    "errCode": "1000",
    "total": "1"
});
/**
 * 获取退款订单详情
 */
Mock.mock(Url.getRefundDetail,{
  "data": {
    "basicBalance": 70,
    "cityCode": "330100",
    "cityName": "杭州市",
    "createTime": 1532314367000,
    "currencyType": "人民币",
    "distributorCardNumber": "33010002030000000009",
    "distributorCardType": "IBUS0003",
    "distributorCardTypeName": "公交云公交测试卡2",
    "distributorId": "100",
    "distributorName": "支付宝",
    "donateBalance": 0,
    "extInfo": "{\"preBasicBalance\":70,\"suffBasicBalance\":0}",
    "gjyCardNo": "33010002030000000009",
    "gjyCardType": "3301000203",
    "gjyUserId": 203513888229163041,
    "id": "18072310524000206000589522468864",
    "merchantId": "33010002",
    "merchantName": "公交云",
    "modifyTime": 1532314368000,
    "orderNo": "1883624480465487873",
    "outID": "330100020300000000091532314367328",
    "payNo": "1883624481421002755",
    "payTime": 1532314368000,
    "payType": 13,
    "paymentUserId": "2088602129773870",
    "refundAmount": 70,
    "remark":"beihzu",
    "status": 2
  },
  "errCode": "1000",
  "errMsg": "success",
  "success": true
});
/**
 * 获取退款订单流水
 */
Mock.mock(Url.getRefundWater,{
    "data": [
                   {
            "accountType": "主账户",
            "amount": "-1.60",
            "balance": "13.60",
            "orderNo": "18072310052000205988604257239040",
            "paymentNo": "1883576536444438530",
            "timeCreated": 1533286648462
        },
        {
            "accountType": "优充账户",
            "amount": "-1.60",
            "balance": "13.60",
            "orderNo": "18072310052000205988604257239040",
            "paymentNo": "1883576536444438530",
            "timeCreated": 1533286648462
        }
         ],
    "success": true,
    "errMsg": "success",
    "errCode": "1000"
});
/**
 * 获取账户设置
 */
Mock.mock(Url.getAccount,{
  "data": {
    "shard": "0",
    "merchantFullName": "杭州公交集团公司",
    "payCenterAppid": "123456123456",
    "chooseMode": '1',
    "companyList": [{
      "merchantId": "37100001",
      "companyId": "123456789",
      "companyName": "乐清公交公司",
      "payCenterAppid": "123456123454",
      "companyCode": "37010009"
    }, {
      "merchantId": "37100001",
      "companyId": "123456788",
      "companyName": "浦江公交公司",
      "payCenterAppid": "123456123455",
      "companyCode": "37010008"
    }]
  },
  "succcess": true,
  "errMsg": "success"
});
/**
 * 保存账户设置
 */
Mock.mock(Url.saveAccount,{
  "data": null,
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 日票类型列表
 */
Mock.mock(Url.getTicketType,{
  "data": [{
    "rightsTypeId": "3701000100001",
    "rightsTypeName": "一日票",
    "merchantId": "37010001",
    "validFrom": null,
    "validTo": null,
    "period": "1",
    "periodUnit": null,
    "price": "10000",
    "status": "1",
    "isShow": "1",
    "simpleDesc": "畅游济南一整天",
    "circulation": "100",
    "totalUsage": "1000",
    "dailyUsage": "10",
    "limitCirculation": "0",
    "limitTotalUsage": "1",
    "limitDailyUsage": "1",
    "createTime": 1525694017000,
    "updateTime": 1525743579000
  }],
  "success": true,
  "errMsg": "success",
  "errCode": "1000",
  "total": 1
});
/**
 * 查询日票类型详情
 */
Mock.mock(Url.getTicketTypeDetail,{
  "data": {
    "name": "二日票",
    "introduction": "畅游济南二整天",
    "expiryDate": "2",
    "price": "200",
    "totalUsage": "2000",
    "dailyTotalUsage": "20",
    "circulation": "200",
    "limitTotalUsage": "0",
    "limitDailyTotalUsage": "0",
    "limitCirculation": "1",
    "interval": "10",
    "maxTicketPrice": "4",
    "isShow": "0",
    "intervalMaxTransfer": "1",
    "dailyTicketTypeId": "3701000100002"
  },
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 新增日票类型
 */
Mock.mock(Url.addTicketType,{
  "data": null,
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 编辑日票类型
 */
Mock.mock(Url.editTicketType,{
  "data": null,
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 购买记录列表
 */
Mock.mock(Url.getTicketPay,{
  "data": [{
    "id": "18020119434000143803406941421568",
    "payChargeId": "1640525313502871552",
    "payOrderId": "1640525313753743363",
    "thirdPartyOrderId": "1640669451766464518",
    "cardId": "37150001010000002802",
    "cardTypeId": "3701000101",
    "accountId": 140400508157689974,
    "rightsTypeId": "3701000100001",
    "rightsTypeName": "一日票",
    "price": 100,
    "rightsAccountId": 14526987452165132,
    "status": "2",
    "payTime": 1525678566000,
    "payType": "3",
    "createTime": 1525678579000,
    "updateTime": 1525772327000,
    "validFrom": 1525678571000,
    "validTo": 1525678575000
  }],
  "success": true,
  "errMsg": "success",
  "errCode": "1000",
  "total": 1
});

/**
 * 购买记录详情
 */
Mock.mock(Url.getTicketPayDetail,{
  "data": {
    "id": "18020119434000143803406941421568",
    "payChargeId": "1640525313502871552",
    "payOrderId": "1640525313753743363",
    "thirdPartyOrderId": "1640669451766464518",
    "cardId": "37150001010000002802",
    "cardTypeId": "3701000101",
    "accountId": 140400508157689974,
    "rightsTypeId": "3701000100001",
    "rightsTypeName": "一日票",
    "price": 100,
    "rightsAccountId": 14526987452165132,
    "status": "2",
    "payTime": 1525678566000,
    "payType": "3",
    "createTime": 1525678579000,
    "updateTime": 1525772327000,
    "validFrom": 1525678571000,
    "validTo": 1525678575000
  },
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
/**
 * 查询日票列表
 */
Mock.mock(Url.getTicketList,{
  "data": [{
    "rightsAccountId": "14526987452165132",
    "cardId": "37150001010000002802",
    "accountId": 140400508157689974,
    "cardTypeId": "3701000101",
    "rightsTypeId": "3701000100001",
    "rightsTypeName": "一日票",
    "status": "1",
    "validFrom": 1525772490000,
    "validTo": 1525772490000,
    "invalidTime": 1525772490000,
    "usageCount": 9,
    "rechargeAcceptanceId": "18020119434000143803406941421568",
    "payChargeId": "1640525313502871552",
    "payOrderId": "1640525313753743363",
    "thirdPartyOrderId": "1640669451766464518",
    "hookPayTime": 1525678132000,
    "payType": "3",
    "price": 100,
    "createTime": 1525678165000,
    "updateTime": 1525772490000
  }],
  "success": true,
  "errMsg": "success",
  "errCode": "1000",
  "total": 1
});
/**
 * 查询退款记录列表
 */
Mock.mock(Url.getTicketReturn,{
  "data": {
    list:[{
      "id": "18020119434000143803406941421568",
      "cardId": "37150001010000002802",
      "accountId": 140400508157689974,
      "cardTypeId": "3701000101",
      "merchantId": "37010001",
      "merchantName": "济南公交",
      "cityCode": "370100",
      "cityName": "济南市",
      "distributorId": 100,
      "distributorName": "支付宝",
      "paymentUserId": "2088112081893874",
      "payType": "3",
      "refundAmount": 10000,
      "feePayer": "0",
      "refundFee": 0,
      "rightsTypeId": "3701000100001",
      "rightsTypeName": "一日票",
      "rightsAccountId": "1",
      "payOrderId": "1640525313753743363",
      "payChargeId": "1640525313502871552",
      "thirdPartyOrderId": "1640669451766464518",
      "status": "2",
      "payTime": 1525678789000,
      "createTime": 1525678796000,
      "updateTime": 1525767883000,
      "extInfo": "{}"
    }],
    totalPrice: '0',
  },
  "success": true,
  "errMsg": "success",
  "errCode": "1000",
  "total": 0
});
/**
 * 获取退款记录详情
 */
Mock.mock(Url.getTicketReturnDetail,{
  "data": {
    "id": "18020119434000143803406941421568",
    "cardId": "37150001010000002802",
    "accountId": 140400508157689974,
    "cardTypeId": "3701000101",
    "merchantId": "37010001",
    "merchantName": "济南公交",
    "cityCode": "370100",
    "cityName": "济南市",
    "distributorId": 100,
    "distributorName": "支付宝",
    "paymentUserId": "2088112081893874",
    "payType": "3",
    "refundAmount": 10000,
    "feePayer": "0",
    "refundFee": 0,
    "rightsTypeId": "3701000100001",
    "rightsTypeName": "一日票",
    "rightsAccountId": "1",
    "payOrderId": "1640525313753743363",
    "payChargeId": "1640525313502871552",
    "thirdPartyOrderId": "1640669451766464518",
    "status": "2",
    "payTime": 1525678789000,
    "createTime": 1525678796000,
    "updateTime": 1525767883000,
    "extInfo": "{}"
  },
  "success": true,
  "errMsg": "success",
  "errCode": "1000"
});
