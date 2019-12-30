{
    "info": {
    "_postman_id": "8202c16e-2173-4ec0-a700-c9f6e058d098",
        "name": "商品后台",
        "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
},
    "item": [
    {
        "name": "商品",
        "item": [
            {
                "name": "新增商品类型",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "goodsName",
                                "value": "商品一个",
                                "description": "商品类型名称",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/goods/typeCreate",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "goods",
                            "typeCreate"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "更新商品类型",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "goodsName",
                                "value": "商品一个111",
                                "description": "商品类型名称",
                                "type": "text"
                            },
                            {
                                "key": "goodsId",
                                "value": "1",
                                "description": "商品类型id （更新必填）",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/goods/typeUpdate",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "goods",
                            "typeUpdate"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "分页商品类型",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "pageNo",
                                "value": "1",
                                "description": "当前页",
                                "type": "text"
                            },
                            {
                                "key": "pageSize",
                                "value": "10",
                                "description": "行数",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/goods/typeList",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "goods",
                            "typeList"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "新增商品",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "goodsName",
                                "value": "爱奇艺周卡",
                                "description": "商品名称",
                                "type": "text"
                            },
                            {
                                "key": "goodsType",
                                "value": "视频类",
                                "description": "关联商品类型",
                                "type": "text"
                            },
                            {
                                "key": "price",
                                "value": "100",
                                "description": "售价（分）",
                                "type": "text"
                            },
                            {
                                "key": "goodsConfig",
                                "value": "{“tupe\",\"111\"}",
                                "description": "配置信息（json）",
                                "type": "text"
                            },
                            {
                                "key": "goodsDesc",
                                "value": "<html></html>",
                                "description": "详情（富文本）",
                                "type": "text"
                            },
                            {
                                "key": "deliveType",
                                "value": "0",
                                "description": "交货方式0-直冲 1-卡密 2-邮寄",
                                "type": "text"
                            },
                            {
                                "key": "goodsStatus",
                                "value": "0",
                                "description": "0-已上架 1-已下架",
                                "type": "text"
                            },
                            {
                                "key": "goodsImg",
                                "value": "http:.//www.baidu.com",
                                "description": "图片地址",
                                "type": "text"
                            },
                            {
                                "key": "goodsTypeId",
                                "value": "1",
                                "description": "关联的商品类型id",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/goods/create",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "goods",
                            "create"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "更新商品（包括上下架）",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "goodsName",
                                "value": "爱奇艺周卡",
                                "description": "商品名称",
                                "type": "text"
                            },
                            {
                                "key": "goodsType",
                                "value": "视频类",
                                "description": "关联商品类型",
                                "type": "text"
                            },
                            {
                                "key": "price",
                                "value": "101",
                                "description": "售价（分）",
                                "type": "text"
                            },
                            {
                                "key": "goodsConfig",
                                "value": "{“tupe\",\"1112222\"}",
                                "description": "配置信息（json）",
                                "type": "text"
                            },
                            {
                                "key": "goodsDesc",
                                "value": "<html>1111</html>",
                                "description": "详情（富文本）",
                                "type": "text"
                            },
                            {
                                "key": "deliveType",
                                "value": "1",
                                "description": "交货方式0-直冲 1-卡密 2-邮寄",
                                "type": "text"
                            },
                            {
                                "key": "goodsStatus",
                                "value": "1",
                                "description": "0-已上架 1-已下架",
                                "type": "text"
                            },
                            {
                                "key": "goodsImg",
                                "value": "http:.//www.baidu.com111",
                                "description": "图片地址",
                                "type": "text"
                            },
                            {
                                "key": "goodsId",
                                "value": "1",
                                "description": "商品id（更新必传）",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/goods/update",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "goods",
                            "update"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "分页商品",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "goodsStatus",
                                "value": "1",
                                "description": "0-已上架 1-已下架",
                                "type": "text"
                            },
                            {
                                "key": "goodsName",
                                "value": "爱奇艺周卡",
                                "description": "商品名称",
                                "type": "text"
                            },
                            {
                                "key": "pageNo",
                                "value": "1",
                                "type": "text"
                            },
                            {
                                "key": "pageSize",
                                "value": "",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/goods/list",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "goods",
                            "list"
                        ]
                    }
                },
                "response": []
            }
        ],
        "protocolProfileBehavior": {}
    },
    {
        "name": "会场",
        "item": [
            {
                "name": "新建会场",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "meetingName",
                                "value": "第一会场",
                                "description": "会场名称",
                                "type": "text"
                            },
                            {
                                "key": "limitType",
                                "value": "0",
                                "description": "0-不限 1-按省 2-按市 3-按运营商",
                                "type": "text"
                            },
                            {
                                "key": "limitCode",
                                "value": "甘肃|浙江",
                                "description": "限制词",
                                "type": "text"
                            },
                            {
                                "key": "limitMessage",
                                "value": "禁止入场",
                                "description": "限制提示",
                                "type": "text"
                            },
                            {
                                "key": "blackLimitMessage",
                                "value": "黑名单用户",
                                "description": "黑名单限制语",
                                "type": "text"
                            },
                            {
                                "key": "payLimitType",
                                "value": "0",
                                "description": "支付限制 0 不限 1-建行卡 2-建行行用卡 3-银联卡",
                                "type": "text"
                            },
                            {
                                "key": "payLimitMessage",
                                "value": "超过限制",
                                "description": "支付限制语",
                                "type": "text"
                            },
                            {
                                "key": "meetingUrl",
                                "value": "http://www.baidu.com",
                                "description": "会场地址",
                                "type": "text"
                            },
                            {
                                "key": "meetingState",
                                "value": "1",
                                "description": "0-关闭 1-开启",
                                "type": "text"
                            },
                            {
                                "key": "payLimitTimes",
                                "value": "0",
                                "description": "限购次数",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/meeting/mCreate",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "mCreate"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "分页会场",
                "request": {
                    "method": "POST",
                    "header": [],
                    "url": {
                        "raw": "http://localhost/service/meeting/mList",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "mList"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "更新会场",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "meetingName",
                                "value": "第一会场改",
                                "description": "会场名称",
                                "type": "text"
                            },
                            {
                                "key": "limitType",
                                "value": "1",
                                "description": "0-不限 1-按省 2-按市 3-按运营商",
                                "type": "text"
                            },
                            {
                                "key": "limitCode",
                                "value": "甘肃|浙江",
                                "description": "限制词",
                                "type": "text"
                            },
                            {
                                "key": "limitMessage",
                                "value": "禁止入场",
                                "description": "限制提示",
                                "type": "text"
                            },
                            {
                                "key": "blackLimitMessage",
                                "value": "黑名单用户",
                                "description": "黑名单限制语",
                                "type": "text"
                            },
                            {
                                "key": "payLimitType",
                                "value": "1",
                                "description": "支付限制 0 不限 1-建行卡 2-建行行用卡 3-银联卡",
                                "type": "text"
                            },
                            {
                                "key": "payLimitMessage",
                                "value": "超过限制",
                                "description": "支付限制语",
                                "type": "text"
                            },
                            {
                                "key": "meetingUrl",
                                "value": "http://www.baidu.com",
                                "description": "会场地址",
                                "type": "text"
                            },
                            {
                                "key": "meetingState",
                                "value": "1",
                                "description": "0-关闭 1-开启",
                                "type": "text"
                            },
                            {
                                "key": "payLimitTimes",
                                "value": "1",
                                "description": "限购次数",
                                "type": "text"
                            },
                            {
                                "key": "meetingId",
                                "value": "1",
                                "description": "会场id (更新必填)",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/meeting/mUpdate",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "mUpdate"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "会场黑白名单创建",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "meetingId",
                                "value": "1",
                                "description": "会场id",
                                "type": "text"
                            },
                            {
                                "key": "blackMobile",
                                "value": "16000000000",
                                "description": "黑白名单电话",
                                "type": "text"
                            },
                            {
                                "key": "blackListType",
                                "value": "0",
                                "description": "0-黑名单 1-白名单",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/meeting/blCreate",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "blCreate"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "分页会场黑白名单",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "meetingId",
                                "value": "1",
                                "description": "会场id",
                                "type": "text"
                            },
                            {
                                "key": "blackListType",
                                "value": "1",
                                "description": "0-黑 1-白",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/meeting/blList",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "blList"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "删除会场黑白名单",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "meetingBlackListId",
                                "value": "2,3,4,5,6,7,8",
                                "description": "要删除的id",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/meeting/blDelete",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "blDelete"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "新增会场商品",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "meetingId",
                                "value": "1",
                                "description": "会场id",
                                "type": "text"
                            },
                            {
                                "key": "price",
                                "value": "100",
                                "description": "原价（分）",
                                "type": "text"
                            },
                            {
                                "key": "discountPrice",
                                "value": "50",
                                "description": "折后价（分）",
                                "type": "text"
                            },
                            {
                                "key": "goodsId",
                                "value": "1",
                                "description": "关联商品id",
                                "type": "text"
                            },
                            {
                                "key": "totalCount",
                                "value": "100",
                                "description": "总量",
                                "type": "text"
                            },
                            {
                                "key": "storeCount",
                                "value": "100",
                                "description": "库存量",
                                "type": "text",
                                "disabled": true
                            },
                            {
                                "key": "sorted",
                                "value": "1",
                                "description": "排序号",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/meeting/cargoCreate",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "cargoCreate"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "更新会场商品（包含库存调整）",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "meetingId",
                                "value": "1",
                                "description": "会场id",
                                "type": "text"
                            },
                            {
                                "key": "price",
                                "value": "100",
                                "description": "原价（分）",
                                "type": "text"
                            },
                            {
                                "key": "discountPrice",
                                "value": "50",
                                "description": "折后价（分）",
                                "type": "text"
                            },
                            {
                                "key": "goodsId",
                                "value": "1",
                                "description": "关联商品id",
                                "type": "text"
                            },
                            {
                                "key": "totalCount",
                                "value": "100",
                                "description": "总量",
                                "type": "text"
                            },
                            {
                                "key": "storeCount",
                                "value": "100",
                                "description": "库存量",
                                "type": "text"
                            },
                            {
                                "key": "sorted",
                                "value": "1",
                                "description": "排序号",
                                "type": "text"
                            },
                            {
                                "key": "adjustCount",
                                "value": "20",
                                "description": "调整库存量",
                                "type": "text"
                            },
                            {
                                "key": "cargoId",
                                "value": "1",
                                "description": "会场商品id（更新必传）",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/meeting/cargoUpdate",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "cargoUpdate"
                        ]
                    }
                },
                "response": []
            },
            {
                "name": "分页会场商品",
                "request": {
                    "method": "POST",
                    "header": [
                        {
                            "key": "Content-Type",
                            "name": "Content-Type",
                            "value": "application/x-www-form-urlencoded",
                            "type": "text"
                        }
                    ],
                    "body": {
                        "mode": "urlencoded",
                        "urlencoded": [
                            {
                                "key": "meetingId",
                                "value": "1",
                                "description": "会场id",
                                "type": "text"
                            },
                            {
                                "key": "cargoStatus",
                                "value": "0",
                                "description": "会场商品状态 0-已上架 1-已下架",
                                "type": "text"
                            },
                            {
                                "key": "goodsTypeId",
                                "value": "1",
                                "description": "商品类型id",
                                "type": "text"
                            }
                        ]
                    },
                    "url": {
                        "raw": "http://localhost/service/meeting/cargoList",
                        "protocol": "http",
                        "host": [
                            "localhost"
                        ],
                        "path": [
                            "service",
                            "meeting",
                            "cargoList"
                        ]
                    }
                },
                "response": []
            }
        ],
        "protocolProfileBehavior": {}
    },
    {
        "name": "分页渠道/入口",
        "request": {
            "method": "POST",
            "header": [
                {
                    "key": "Content-Type",
                    "name": "Content-Type",
                    "value": "application/x-www-form-urlencoded",
                    "type": "text"
                }
            ],
            "body": {
                "mode": "urlencoded",
                "urlencoded": [
                    {
                        "key": "channelType",
                        "value": "0",
                        "description": "0-入口 1-渠道",
                        "type": "text"
                    },
                    {
                        "key": "parentChannelId",
                        "value": "",
                        "description": "父级入口id",
                        "type": "text"
                    }
                ]
            },
            "url": {
                "raw": "localhost/service/channel/list",
                "host": [
                    "localhost"
                ],
                "path": [
                    "service",
                    "channel",
                    "list"
                ]
            }
        },
        "response": []
    },
    {
        "name": "新建渠道/入口",
        "request": {
            "method": "POST",
            "header": [
                {
                    "key": "Content-Type",
                    "name": "Content-Type",
                    "value": "application/x-www-form-urlencoded",
                    "type": "text"
                }
            ],
            "body": {
                "mode": "urlencoded",
                "urlencoded": [
                    {
                        "key": "channelType",
                        "value": "1",
                        "description": "0-入口 1-渠道",
                        "type": "text"
                    },
                    {
                        "key": "channelName",
                        "value": "渠道1",
                        "description": "渠道名称",
                        "type": "text"
                    },
                    {
                        "key": "channelUrl",
                        "value": "http:www.baidu.com",
                        "description": "渠道链接",
                        "type": "text"
                    },
                    {
                        "key": "parentChannelId",
                        "value": "1",
                        "description": "父级入口id",
                        "type": "text"
                    }
                ]
            },
            "url": {
                "raw": "localhost/service/channel/create",
                "host": [
                    "localhost"
                ],
                "path": [
                    "service",
                    "channel",
                    "create"
                ]
            }
        },
        "response": []
    },
    {
        "name": "修改渠道/入口",
        "request": {
            "method": "POST",
            "header": [
                {
                    "key": "Content-Type",
                    "name": "Content-Type",
                    "value": "application/x-www-form-urlencoded",
                    "type": "text"
                }
            ],
            "body": {
                "mode": "urlencoded",
                "urlencoded": [
                    {
                        "key": "channelType",
                        "value": "0",
                        "description": "0-入口 1-渠道",
                        "type": "text"
                    },
                    {
                        "key": "channelName",
                        "value": "渠道1改",
                        "description": "渠道名称",
                        "type": "text"
                    },
                    {
                        "key": "channelUrl",
                        "value": "http:www.baidu.com1111",
                        "description": "渠道链接",
                        "type": "text"
                    },
                    {
                        "key": "parentChannelId",
                        "value": "1",
                        "description": "父级入口id",
                        "type": "text"
                    },
                    {
                        "key": "channelId",
                        "value": "1",
                        "type": "text"
                    }
                ]
            },
            "url": {
                "raw": "localhost/service/channel/update",
                "host": [
                    "localhost"
                ],
                "path": [
                    "service",
                    "channel",
                    "update"
                ]
            }
        },
        "response": []
    }
],
    "protocolProfileBehavior": {}
}
