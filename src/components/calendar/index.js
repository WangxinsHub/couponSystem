/**
 @Name : layDate 1.0.0 日期时间控件
 @Author: 雏田
 @Example：{
    type: 'date', // 控件类型，支持：year/month/date/time/datetime
    range: false, // 是否开启范围选择，即双控件
    format: 'yyyy-MM-dd', // 默认日期格式
    value: null, // 默认日期，支持传入new Date()，或者符合format参数设定的日期格式字符
    min: '1900-1-1', // 有效最小日期，年月日必须用“-”分割，时分秒必须用“:”分割。注意：它并不是遵循 format 设定的格式。
    max: '2099-12-31', // 有效最大日期，同上
    trigger: 'focus', // 呼出控件的事件
    show: false, // 是否直接显示，如果设置true，则默认直接显示控件
    showBottom: true, // 是否显示底部栏
    btns: ['clear', 'now', 'confirm'], // 右下角显示的按钮，会按照数组顺序排列
    lang: 'cn', // 语言，只支持cn/en，即中文和英文
    theme: 'default', // 主题
    position: null, // 控件定位方式定位, 默认absolute，支持：fixed/absolute/static
    calendar: false, // 是否开启公历重要节日，仅支持中文版
    mark: {}, // 日期备注，如重要事件或活动标记
    holiday: false, // 是否根据法定节假日来控制显示
    holidayDate: {} // 法定节假日备注---'2018-06-01': true[true表示放假，false表示上班]
    zIndex: null, // 控件层叠顺序
    done: null, // 控件选择完毕后的回调，点击清空/现在/确定也均会触发
    change: null, // 日期时间改变后的回调
    customChoose: false, // 新订吧后台的选择插件
    more: false, // 是否多选
    moreDate: [], // 多个数据，只用于多选时，若时间控件刚打开就需要绑定，则带进来
    noChangeDate: [], // 不可编辑的时间数组
    isOpen: false, // 是否一直显示(点击其它地方也不会消失)
    readonly: false, // 只读,日期均不可选
    location: { // 坐标地址，如果不填则采用默认的
      top: null,
      left: null,
      bottom: null,
      right: null
    }
 }
 */
'use strict';
let laydateIndex;
/**
 * [removeTime 关闭时间选择框的方法,放在getLayDate方法中会内存溢出]
 * @param  {[type]} e [description]
 */
function removeTime(e) {
  if (!e.target.getAttribute('lay-key')) {
    // 删除时间框
    let obj=document.getElementById('layui-laydate'+laydateIndex);
    if(obj) obj.remove();
  }
}
/**
 * [getLayDate 日期控件]
 * @param  {[type]} _options [参数]
 */
let getLayDate = function(_options) {
  let ready = {
    getPath: function() {
      let jsPath = document.currentScript ? document.currentScript.src :
        function() {
          let js = document.scripts;
          let last = js.length - 1;
          let src;
        for (let i = last; i > 0; i--) {
          if (js[i].readyState === 'interactive') {
            src = js[i].src;
            break;
          }
        }
        return src || js[last].src;
      }();
      return jsPath.substring(0, jsPath.lastIndexOf('/') + 1);
    }(),
    // 获取节点的style属性值
    getStyle: function(node, name) {
      let style = node.currentStyle ? node.currentStyle :
        window.getComputedStyle(node, null);
      return style[style.getPropertyValue ? 'getPropertyValue' : 'getAttribute'](name);
    },
  };
  // laydate的定义
  let laydate = {
    v: '1.0.0', // 版本
    config: {}, // 全局配置项
    index: (window.laydate && window.laydate.v) ? 100000 : 0, // 浮动zindex的索引值
    path: ready.getPath, // 路径
    // 设置全局项
    set: function(options) {
      let that = this;
      that.config = lay.extend({}, that.config, options);
      return that;
    },
  };
  // 操作当前实例
  let thisDate = function() {
    let that = this;
    return {
      // 提示框
      hint: function(content) {
        that.hint.call(that, content);
      },
      config: that.config,
    };
  };
  let MOD_NAME = 'laydate'; // 弹框名
  let ELEM = '.layui-laydate'; // 弹框的样式
  let THIS = 'layui-this'; // 日历选中的样式名
  let SHOW = 'layui-show'; // 显示的样式名
  let HIDE = 'layui-hide'; // 隐藏的样式名
  let DISABLED = 'laydate-disabled'; // 不可点击的样式名
  let NOCHANGE = 'laydate-nochange'; // 已选中但不可编辑的样式
  let TIPS_OUT = '开始日期超出了结束日期<br>建议重新选择'; // 提示信息
  let LIMIT_YEAR = [100, 200000];
  let ELEM_STATIC = 'layui-laydate-static'; // 默认样式名
  let ELEM_LIST = 'layui-laydate-list'; // list的杨世明
  let ELEM_SELECTED = 'laydate-selected'; // 选中的样式名
  let ELEM_HINT = 'layui-laydate-hint'; // 提示的样式名
  let ELEM_PREV = 'laydate-day-prev'; // 上月日期的样式名
  let ELEM_NEXT = 'laydate-day-next'; // 下月不可选日期的样式名
  let ELEM_FOOTER = 'layui-laydate-footer'; // 底部样式名
  let ELEM_FOOTER_MORE = 'layui-laydate-footer layui-laydate-footer-more'; // 控制显示多选按钮的样式名
  let ELEM_CONFIRM = '.laydate-btns-confirm'; // 按钮的样式名
  let ELEM_TIME_TEXT = 'laydate-time-text'; // 时间文字的样式
  let ELEM_TIME_BTN = '.laydate-btns-time'; // 时间按钮的样式名
  let moreDate=[]; // 选择多个时的存储容器
  let moreDateStart=[]; // 存储初始传入不可编辑的日期
  // 组件构造器
  let Class = function(options) {
    let that = this;
    that.index = ++laydate.index;
    // extend所有的config参数
    let config = lay.extend({}, that.config, laydate.config, options);
    // 将config赋值给全局config
    that.config=config;
    // 如果是多选，且是新订吧后台的日期选择,则多显示几个按钮
    if (config.more && config.customChoose && !options.btns) {
      config.btns=['monthAll', 'cancelAll', 'weekAll', 'notWeek'];
      if(!config.isOpen) config.btns.push('confirm');
    }
    // console.log('start', that.config);
    that.init();
  };
  // DOM查找
  let lay = function(selector) {
    return new LAY(selector);
  };
  // DOM构造器
  let LAY = function(selector) {
    let index = 0;
    let nativeDOM= typeof selector === 'object' ? [selector] : (
      this.selector = selector,
      document.querySelectorAll(selector || null)
    );
    for(; index < nativeDOM.length; index++) {
      this.push(nativeDOM[index]);
    }
  };
  /*
    lay对象操作
  */
  LAY.prototype = [];
  LAY.prototype.constructor = LAY;
  // 普通对象深度扩展
  lay.extend = function() {
    let ai = 1;
    let args = arguments;
    let clone = function(target, obj) {
      target = target || (obj.constructor === Array ? [] : {});
      for (let i in obj){
        // 如果值为对象，则进入递归，继续深度合并
        target[i] = (obj[i] && (obj[i].constructor === Object))
          ? clone(target[i], obj[i])
        : obj[i];
      }
      return target;
    };
    args[0] = typeof args[0] === 'object' ? args[0] : {};
    for (; ai < args.length; ai++) {
      if (typeof args[ai] === 'object') {
        clone(args[0], args[ai]);
      }
    }
    return args[0];
  };
  // ie版本
  lay.ie = function() {
    let agent = navigator.userAgent.toLowerCase();
    return (!!window.ActiveXObject || 'ActiveXObject' in window) ? (
      (agent.match(/msie\s(\d+)/) || [])[1] || '11' // 由于ie11并没有msie的标识
    ) : false;
  }();
  // 中止冒泡
  lay.stope = function(e) {
    e = e || window.event;
    e.stopPropagation
      ? e.stopPropagation()
    : e.cancelBubble = true;
  };
  // 对象遍历
  lay.each = function(obj, fn) {
    let key;
    let that = this;
    if(typeof fn !== 'function') return that;
    obj = obj || [];
    if (obj.constructor === Object) {
      for (key in obj) {
        if (fn.call(obj[key], key, obj[key])) break;
      }
    } else {
      for (let key = 0; key < obj.length; key++) {
        if (fn.call(obj[key], key, obj[key])) break;
      }
    }
    return that;
  };
  // 数字前置补零
  lay.digit = function(num, length, end) {
    let str = '';
    num = String(num);
    length = length || 2;
    for (let i = num.length; i < length; i++) {
      str += '0';
    }
    return num < Math.pow(10, length) ? str + (num|0) : num;
  };
  // 创建元素
  lay.elem = function(elemName, attr) {
    let elem = document.createElement(elemName);
    lay.each(attr || {}, function(key, value) {
      elem.setAttribute(key, value);
    });
    return elem;
  };
  
  // 追加字符
  LAY.addStr = function(str, newStr) {
    str = str.replace(/\s+/, ' ');
    newStr = newStr.replace(/\s+/, ' ').split(' ');
    lay.each(newStr, function(ii, item) {
      if (!new RegExp('\\b'+ item + '\\b').test(str)) {
        str = str + ' ' + item;
      }
    });
    return str.replace(/^\s|\s$/, '');
  };
  
  // 移除值
  LAY.removeStr = function(str, newStr) {
    str = str.replace(/\s+/, ' ');
    newStr = newStr.replace(/\s+/, ' ').split(' ');
    lay.each(newStr, function(ii, item) {
      let exp = new RegExp('\\b'+ item + '\\b');
      if (exp.test(str)) {
        str = str.replace(exp, '');
      }
    });
    return str.replace(/\s+/, ' ').replace(/^\s|\s$/, '');
  };
  // 查找子元素
  LAY.prototype.find = function(selector) {
    let that = this;
    let index = 0;
    let arr = [];
    let isObject = typeof selector === 'object';
    
    this.each(function(i, item) {
      let nativeDOM = isObject ? [selector] : item.querySelectorAll(selector || null);
      for (; index < nativeDOM.length; index++) {
        arr.push(nativeDOM[index]);
      }
      that.shift();
    });
    
    if (!isObject) {
      that.selector = (that.selector ? that.selector + ' ' : '') + selector;
    }
    
    lay.each(arr, function(i, item) {
      that.push(item);
    });
    
    return that;
  };
  
  // DOM遍历
  LAY.prototype.each = function(fn) {
    return lay.each.call(this, this, fn);
  };
  
  // 添加css类
  LAY.prototype.addClass = function(className, type) {
    return this.each(function(index, item) {
      item.className = LAY[type ? 'removeStr' : 'addStr'](item.className, className);
    });
  };
  
  // 移除css类
  LAY.prototype.removeClass = function(className) {
    return this.addClass(className, true);
  };
  
  // 是否包含css类
  LAY.prototype.hasClass = function(className) {
    let has = false;
    this.each(function(index, item) {
      if (new RegExp('\\b'+ className +'\\b').test(item.className)) {
        has = true;
      }
    });
    return has;
  };
  // 添加或获取属性
  LAY.prototype.attr = function(key, value) {
    let that = this;
    return value === undefined ? function() {
      if (that.length > 0) return that[0].getAttribute(key);
    }() : that.each(function(index, item) {
      item.setAttribute(key, value);
    });
  };
  
  // 移除属性
  LAY.prototype.removeAttr = function(key) {
    return this.each(function(index, item) {
      item.removeAttribute(key);
    });
  };
  
  // 设置HTML内容
  LAY.prototype.html = function(html) {
    return this.each(function(index, item) {
      item.innerHTML = html;
    });
  };
  
  // 设置值
  LAY.prototype.val = function(value) {
    return this.each(function(index, item) {
      item.value = value;
    });
  };
  
  // 追加内容
  LAY.prototype.append = function(elem) {
    return this.each(function(index, item) {
      typeof elem === 'object'
        ? item.appendChild(elem)
      :  item.innerHTML = item.innerHTML + elem;
    });
  };
  
  // 移除内容
  LAY.prototype.remove = function(elem) {
    return this.each(function(index, item) {
      elem ? item.removeChild(elem) : item.parentNode.removeChild(item);
    });
  };
  
  // 事件绑定
  LAY.prototype.on = function(eventName, fn) {
    return this.each(function(index, item) {
      item.attachEvent ? item.attachEvent('on' + eventName, function(e) {
        e.target = e.srcElement;
        fn.call(item, e);
      }) : item.addEventListener(eventName, fn, false);
    });
  };
  
  // 解除事件
  LAY.prototype.off = function(eventName, fn) {
    return this.each(function(index, item) {
      item.detachEvent
        ? item.detachEvent('on'+ eventName, fn)
      : item.removeEventListener(eventName, fn, false);
    });
  };
  /*
    组件操作
  */
  // 是否闰年
  Class.isLeapYear = function(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  // 默认配置
  Class.prototype.config = {
    type: 'date', // 控件类型，支持：year/month/date/time/datetime
    range: false, // 是否开启范围选择，即双控件
    format: 'yyyy-MM-dd', // 默认日期格式
    value: null, // 默认日期，支持传入new Date()，或者符合format参数设定的日期格式字符
    min: '1900-1-1', // 有效最小日期，年月日必须用“-”分割，时分秒必须用“:”分割。注意：它并不是遵循 format 设定的格式。
    max: '2099-12-31', // 有效最大日期，同上
    trigger: 'focus', // 呼出控件的事件
    show: false, // 是否直接显示，如果设置true，则默认直接显示控件
    showBottom: true, // 是否显示底部栏
    btns: ['clear', 'now', 'confirm'], // 右下角显示的按钮，会按照数组顺序排列
    lang: 'cn', // 语言，只支持cn/en，即中文和英文
    theme: 'default', // 主题
    position: null, // 控件定位方式定位, 默认absolute，支持：fixed/absolute/static
    calendar: false, // 是否开启公历重要节日，仅支持中文版
    mark: {}, // 日期备注，如重要事件或活动标记
    holiday: false, // 是否根据法定节假日来控制显示
    holidayDate: { // 法定节假日备注---'2018-06-01': true[true表示放假，false表示上班]
      '2018-01-01': true,
      '2018-02-11': false,
      '2018-02-15': true,
      '2018-02-16': true,
      '2018-02-19': true,
      '2018-02-20': true,
      '2018-02-21': true,
      '2018-02-24': false,
      '2018-04-05': true,
      '2018-04-06': true,
      '2018-04-08': false,
      '2018-04-28': false,
      '2018-04-30': true,
      '2018-05-01': true,
      '2018-06-18': true,
      '2018-09-24': true,
      '2018-09-29': false,
      '2018-09-30': false,
      '2018-10-01': true,
      '2018-10-02': true,
      '2018-10-03': true,
      '2018-10-04': true,
      '2018-10-05': true,
      '2018-10-06': true,
      '2018-10-07': true,
      '2018-12-29': false,
      '2018-12-30': true,
      '2018-12-31': true,
      '2019-01-01': true,
      '2019-02-02': false,
      '2019-02-03': false,
      '2019-02-04': true,
      '2019-02-05': true,
      '2019-02-06': true,
      '2019-02-07': true,
      '2019-02-08': true,
      '2019-02-09': true,
      '2019-02-10': true,
      '2019-04-05': true,
      '2019-04-06': true,
      '2019-04-07': true,
      '2019-05-01': true,
      '2019-06-07': true,
      '2019-06-08': true,
      '2019-06-09': true,
      '2019-09-13': true,
      '2019-09-14': true,
      '2019-09-15': true,
      '2019-09-29': false,
      '2019-10-01': true,
      '2019-10-02': true,
      '2019-10-03': true,
      '2019-10-04': true,
      '2019-10-05': true,
      '2019-10-06': true,
      '2019-10-07': true,
      '2019-10-12': false,
    },
    zIndex: null, // 控件层叠顺序
    done: null, // 控件选择完毕后的回调，点击清空/现在/确定也均会触发
    change: null, // 日期时间改变后的回调
    customChoose: false, // 新订吧后台的选择插件
    more: false, // 多选
    moreDate: [], // 多个数据，只用于多选时，若时间控件刚打开就需要绑定，则带进来
    noChangeDate: [], // 不可编辑的数组
    isOpen: false, // 是否一直显示(点击其它地方也不会消失)
    readonly: false, // 只读,日期均不可选
    location: { // 坐标地址，如果不填则采用默认的
      top: null,
      left: null,
      bottom: null,
      right: null
    }
  };
  // 多语言
  Class.prototype.lang = function() {
    let that = this;
    let options = that.config;    
    let text = {
      cn: {
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        time: ['时', '分', '秒'],
        timeTips: '选择时间',
        startTime: '开始时间',
        endTime: '结束时间',
        dateTips: '返回日期',
        month: ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十', '十一', '十二'],
        tools: {
          confirm: '确定',
          clear: '清空',
          now: '现在',
          monthAll: '本月全选',
          cancelAll: '清空',
          weekAll: '工作日全选',
          notWeek: '抠出周末',
        },
      },
      en: {
        weeks: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
        time: ['Hours', 'Minutes', 'Seconds'],
        timeTips: 'Select Time',
        startTime: 'Start Time',
        endTime: 'End Time',
        dateTips: 'Select Date',
        month: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        tools: {
          confirm: 'Confirm',
          clear: 'Clear',
          now: 'Now',
          monthAll: 'Month All',
          cancelAll: 'Cancel All',
          weekAll: 'Weeking All',
          notWeek: 'Not Weekend',
        },
      },
    };   
    // console.log(1,options);
    // 将值赋入定义的moreDate中
    moreDate=options.moreDate || [];
    return text[options.lang] || text['cn'];
  };  
  // 初始准备
  Class.prototype.init = function() {
    let that = this;
    let options = that.config;
    let dateType = 'yyyy|y|MM|M|dd|d|HH|H|mm|m|ss|s';
    let isStatic = options.position === 'static';
    let format = {
      year: 'yyyy',
      month: 'yyyy-MM',
      date: 'yyyy-MM-dd',
      time: 'HH:mm:ss',
      datetime: 'yyyy-MM-dd HH:mm:ss',
    };
    options.elem = lay(options.elem);
    options.eventElem = lay(options.eventElem);
    if (!options.elem[0]) return;

    // 日期范围分隔符
    if(options.range === true) options.range = '-';
    // 根据不同type，初始化默认format
    if (options.format === format.date) {
      options.format = format[options.type];
    }
    // 将日期格式转化成数组
    that.format = options.format.match(new RegExp(dateType + '|.', 'g')) || [];
    // 生成正则表达式
    that.EXP_IF = '';
    that.EXP_SPLIT = '';
    lay.each(that.format, function(i, item) {
      let EXP =  new RegExp(dateType).test(item)
        ? '\\d{'+ function() {
          if (new RegExp(dateType).test(that.format[i === 0 ? i + 1 : i - 1]||'')) {
            if (/^yyyy|y$/.test(item)) return 4;
            return item.length;
          }
          if (/^yyyy$/.test(item)) return '1,4';
          if (/^y$/.test(item)) return '1,308';
          return '1,2';
        }() +'}'
      : '\\' + item;
      that.EXP_IF = that.EXP_IF + EXP;
      that.EXP_SPLIT = that.EXP_SPLIT + '(' + EXP + ')';
    });
    that.EXP_IF = new RegExp('^'+ (
      options.range ?
        that.EXP_IF + '\\s\\'+ options.range + '\\s' + that.EXP_IF
      : that.EXP_IF
    ) +'$');
    that.EXP_SPLIT = new RegExp('^'+ that.EXP_SPLIT +'$', '');
    // 设置唯一KEY
    if (!options.elem.attr('lay-key')) {
      let _index=document.getElementsByClassName('layui-laydate').length+1;
      // let _index=document.getElementsByClassName('laydateBox').length+1;
      options.elem.attr('lay-key', _index);
      options.eventElem.attr('lay-key', _index);
    }
    
    // 记录重要日期
    options.mark = lay.extend({}, (options.calendar && options.lang === 'cn') ? {
      '0-1-1': '元旦',
      '0-2-14': '情人',
      '0-3-8': '妇女',
      '0-3-12': '植树',
      '0-4-1': '愚人',
      '0-5-1': '劳动',
      '0-5-4': '青年',
      '0-6-1': '儿童',
      '0-9-10': '教师',
      '0-9-18': '国耻',
      '0-10-1': '国庆',
      '0-12-25': '圣诞'
    } : {}, options.mark);

    // 记录法定节假日
    options.holidayDate = lay.extend({}, options.holidayDate);

    
    // 获取限制内日期
    lay.each(['min', 'max'], function(i, item) {
      let ymd = [];
      let hms = [];
      if (typeof options[item] === 'number') { // 如果为数字
        let day = options[item];
        let time = new Date().getTime();
        let STAMP = 86400000; // 代表一天的时间戳
        let thisDate = new Date(
          day ? (
            day < STAMP ? time + day*STAMP : day // 如果数字小于一天的时间戳，则数字为天数，否则为时间戳
          ) : time
        );
        ymd = [thisDate.getFullYear(), thisDate.getMonth() + 1, thisDate.getDate()];
        day < STAMP || (hms = [thisDate.getHours(), thisDate.getMinutes(), thisDate.getSeconds()]);
      } else {
        ymd = (options[item].match(/\d+-\d+-\d+/) || [''])[0].split('-');
        hms = (options[item].match(/\d+:\d+:\d+/) || [''])[0].split(':');
      }
      options[item] = {
        year: ymd[0] | 0 || new Date().getFullYear(),
        month: ymd[1] ? (ymd[1] | 0) - 1 : new Date().getMonth(),
        date: ymd[2] | 0 || new Date().getDate(),
        hours: hms[0] | 0,
        minutes: hms[1] | 0,
        seconds: hms[2] | 0
      };
    });
    
    that.elemID = 'layui-laydate'+ options.elem.attr('lay-key');
    laydateIndex=options.elem.attr('lay-key');
    // 这样复制json才能保证不随着改变
    // baseConfig=Object.assign({}, options);
    if(options.show || isStatic) {
      // laydate.render();
    }

    // 默认赋值
    if (options.value) {
      if (options.value.constructor === Date) {
        that.setValue(that.parse(0, that.systemDate(options.value)));
      } else {
        that.setValue(options.value);
      }
    }
    // 初始化事件
    // isStatic ||
    that.events();

  };
  // 控件主体渲染
  Class.prototype.render = function() {
    let that = this;
    let options = that.config;
    let lang = that.lang();
    let isStatic = options.position === 'static';
    // 主面板
    let elem = that.elem = lay.elem('div', {
      id: that.elemID,
      'class': [
        'layui-laydate',
        options.range ? ' layui-laydate-range' : '',
        isStatic ? (' '+ ELEM_STATIC) : '',
        options.theme && options.theme !== 'default' && !/^#/.test(options.theme) ? (' laydate-theme-' + options.theme) : ''
      ].join('')
    });
    
    // 主区域
    let elemMain = that.elemMain = [];
    let elemHeader = that.elemHeader = [];
    let elemCont = that.elemCont = [];
    let elemTable = that.table = [];

    // 底部区域
    let divFooter = that.footer = lay.elem('div', {
      'class': ELEM_FOOTER
    });
    
    if(options.zIndex) elem.style.zIndex = options.zIndex;
    
    // 单双日历区域
    lay.each(new Array(2), function(i) {
      if(!options.range && i > 0) {
        return true;
      }

      // 头部区域
      let divHeader = lay.elem('div', {
        'class': 'layui-laydate-header'
      });
      
      // 左右切换
      let headerChild = [function(){ // 上一年
        let elem = lay.elem('i', {
          'class': 'layui-icon laydate-icon laydate-prev-y'
        });
        elem.innerHTML = '&#xe65a;';
        return elem;
      }(), function() { // 上一月
        let elem = lay.elem('i', {
          'class': 'layui-icon laydate-icon laydate-prev-m'
        });
        elem.innerHTML = '&#xe603;';
        return elem;
      }(), function() { // 年月选择
        let elem = lay.elem('div', {
          'class': 'laydate-set-ym'
        });
        let spanY = lay.elem('span');
        let spanM = lay.elem('span');
        elem.appendChild(spanY);
        elem.appendChild(spanM);
        return elem;
      }(), function() { // 下一月
        let elem = lay.elem('i', {
          'class': 'layui-icon laydate-icon laydate-next-m'
        });
        elem.innerHTML = '&#xe602;';
        return elem;
      }(), function() { // 下一年
        let elem = lay.elem('i', {
          'class': 'layui-icon laydate-icon laydate-next-y'
        });
        elem.innerHTML = '&#xe65b;';
        return elem;
      }()]
      
      // 日历内容区域
      let divContent = lay.elem('div', {
        'class': 'layui-laydate-content'
      });
      let table = lay.elem('table');
      let thead = lay.elem('thead');
      let theadTr = lay.elem('tr');
      
      // 生成年月选择
      lay.each(headerChild, function(i, item) {
        divHeader.appendChild(item);
      });
      
      // 生成表格
      thead.appendChild(theadTr);
      lay.each(new Array(6), function(i) { // 表体
        let tr = table.insertRow(0);
        lay.each(new Array(7), function(j) {
          if (i === 0) {
            let th = lay.elem('th');
            th.innerHTML = lang.weeks[j];
            th.setAttribute('lay-weeks',j);
            theadTr.appendChild(th);
          }
          tr.insertCell(j);
        });
      });
      table.insertBefore(thead, table.children[0]); // 表头
      divContent.appendChild(table);
      
      elemMain[i] = lay.elem('div', {
        'class': 'layui-laydate-main laydate-main-list-'+ i
      });
      
      elemMain[i].appendChild(divHeader);
      elemMain[i].appendChild(divContent);
      
      elemHeader.push(headerChild);
      elemCont.push(divContent);
      elemTable.push(table);
    });
    
    // 生成底部栏
    lay(divFooter).html(function() {
      let html = [], btns = [];
      if(options.type === 'datetime') {
        html.push('<span lay-type="datetime" class="laydate-btns-time">'+ lang.timeTips +'</span>');
      }
      lay.each(options.btns, function(i, item) {
        let title = lang.tools[item] || 'btn';
        if(options.range && item === 'now') return;
        if(isStatic && item === 'clear') title = options.lang === 'cn' ? '重置' : 'Reset';
        btns.push('<span lay-type="'+ item +'" class="laydate-btns-'+ item +'">'+ title +'</span>');
      });
      html.push('<div class="laydate-footer-btns">'+ btns.join('') +'</div>');
      return html.join('');
    }());
    
    // 插入到主区域
    lay.each(elemMain, function(i, main) {
      elem.appendChild(main);
    });
    options.showBottom && elem.appendChild(divFooter);
    
    // 生成自定义主题
    if(/^#/.test(options.theme)) {
      let style = lay.elem('style')
      let styleText = [
        '#{{id}} .layui-laydate-header{background-color:{{theme}};}',
        '#{{id}} .layui-this{background-color:{{theme}} !important;}'
      ].join('').replace(/{{id}}/g, that.elemID).replace(/{{theme}}/g, options.theme);
      
      if('styleSheet' in style) {
        style.setAttribute('type', 'text/css');
        style.styleSheet.cssText = styleText;
      } else {
        style.innerHTML = styleText;
      }
      
      lay(elem).addClass('laydate-theme-molv');
      elem.appendChild(style);
    }
    
    // 移除上一个控件
    that.remove(Class.thisElemDate);
    
    // 如果是静态定位，则插入到指定的容器中，否则，插入到body    
    isStatic ? options.elem.append(elem) : (
      document.body.appendChild(elem),
      that.position() // 定位
    );
    
    that.checkDate().calendar(); // 初始校验
    that.changeEvent(); // 日期切换
    
    Class.thisElemDate = that.elemID;

    typeof options.ready === 'function' && options.ready(lay.extend({}, options.dateTime, {
      month: options.dateTime.month + 1
    }));
  };
  // 控件移除
  Class.prototype.remove = function(prev) {
    let that = this;
    let options = that.config;
    let elem = lay('#'+ (prev || that.elemID));
    if (!elem.hasClass(ELEM_STATIC)) {
      that.checkDate(function() {
        elem.remove();
      });
    }
    return that;
  };
  
  // 定位算法
  Class.prototype.position = function() {
    let that = this;
    let options = that.config;
    let elem = that.bindElem || options.elem[0];
    let rect = elem.getBoundingClientRect(); // 绑定元素的坐标
    let elemWidth = that.elem.offsetWidth; // 控件的宽度
    let elemHeight = that.elem.offsetHeight; // 控件的高度
    // 滚动条高度
    let scrollArea = function(type) {
      type = type ? 'scrollLeft' : 'scrollTop';
      return document.body[type] | document.documentElement[type];
    };
    let winArea = function(type) {
      return document.documentElement[type ? 'clientWidth' : 'clientHeight']
    };
    let margin = 5;
    let left = rect.left;
    let top = rect.bottom;
    // 如果右侧超出边界
    if (left + elemWidth + margin > winArea('width')) {
      left = winArea('width') - elemWidth - margin;
    }
    // 如果底部超出边界
    if (top + elemHeight + margin > winArea()) {
      top = rect.top > elemHeight // 顶部是否有足够区域显示完全
        ? rect.top - elemHeight
      : winArea() - elemHeight;
      top = top - margin*2;
    }
    if (options.position) {
      that.elem.style.position = options.position;
    }
    let _left = options.location.left ? options.location.left : left;
    let _right = options.location.right ? options.location.right : null;
    let _top = options.location.top ? options.location.top : top;
    let _bottom = options.location.bottom ? options.location.bottom : null;
    if (_right) {
      that.elem.style.right = _right + (options.position === 'fixed' ? 0 : scrollArea(1)) + 'px';
    } else {
      that.elem.style.left = _left + (options.position === 'fixed' ? 0 : scrollArea(1)) + 'px';
    }
    if (_bottom) {
      that.elem.style.bottom = _bottom + (options.position === 'fixed' ? 0 : scrollArea(1)) + 'px';
    } else {
      that.elem.style.top = _top + (options.position === 'fixed' ? 0 : scrollArea(1)) + 'px';
    }
  };
  // 提示
  Class.prototype.hint = function(content) {
    let that = this;
    let options = that.config;
    let div = lay.elem('div', {
      'class': ELEM_HINT
    });
    div.innerHTML = content || '';
    lay(that.elem).find('.'+ ELEM_HINT).remove();
    that.elem.appendChild(div);

    clearTimeout(that.hinTimer);
    that.hinTimer = setTimeout(function() {
      lay(that.elem).find('.'+ ELEM_HINT).remove();
    }, 3000);
  };
  // 获取递增/减后的年月
  Class.prototype.getAsYM = function(Y, M, type) {
    type ? M-- : M++;
    if (M < 0) {
      M = 11;
      Y--;
    }
    if (M > 11) {
      M = 0;
      Y++;
    }
    return [Y, M];
  };
  
  // 系统消息
  Class.prototype.systemDate = function(newDate) {
    let thisDate = newDate || new Date();
    return {
      year: thisDate.getFullYear(), // 年
      month: thisDate.getMonth(), // 月
      date: thisDate.getDate(), // 日
      hours: newDate ? newDate.getHours() : 0, // 时
      minutes: newDate ? newDate.getMinutes() : 0, // 分
      seconds: newDate ? newDate.getSeconds() : 0 // 秒
    }
  };
  // 日期校验
  Class.prototype.checkDate = function(fn) {
    let that = this;
    let thisDate = new Date();
    let options = that.config;
    let dateTime = options.dateTime = options.dateTime || that.systemDate();
    let thisMaxDate;
    let error;
    let elem = that.bindElem || options.elem[0];
    let valType = that.isInput(elem) ? 'val' : 'html';
    let value = that.isInput(elem) ? elem.value : (options.position === 'static' ? '' : elem.innerHTML);    
    // 校验日期有效数字
    let checkValid = function(dateTime) {
      if(dateTime.year > LIMIT_YEAR[1]) dateTime.year = LIMIT_YEAR[1], error = true; // 不能超过20万年
      if(dateTime.month > 11) dateTime.month = 11, error = true;
      if(dateTime.hours > 23) dateTime.hours = 0, error = true;
      if(dateTime.minutes > 59) dateTime.minutes = 0, dateTime.hours++, error = true;
      if(dateTime.seconds > 59) dateTime.seconds = 0, dateTime.minutes++, error = true;      
      // 计算当前月的最后一天
      thisMaxDate = laydate.getEndDate(dateTime.month + 1, dateTime.year);
      if(dateTime.date > thisMaxDate) dateTime.date = thisMaxDate, error = true;
    }    
    // 获得初始化日期值
    let initDate = function(dateTime, value, index) {
      let startEnd = ['startTime', 'endTime'];
      value = (value.match(that.EXP_SPLIT) || []).slice(1);
      index = index || 0;
      if (options.range) {
        that[startEnd[index]] = that[startEnd[index]] || {};
      }
      lay.each(that.format, function(i, item) {
        let thisv = parseFloat(value[i]);
        if(value[i].length < item.length) error = true;
        if(/yyyy|y/.test(item)) { // 年
          if(thisv < LIMIT_YEAR[0]) thisv = LIMIT_YEAR[0], error = true; // 年不能低于100年
          dateTime.year = thisv;
        } else if(/MM|M/.test(item)) { // 月
          if(thisv < 1) thisv = 1, error = true;
          dateTime.month = thisv - 1;
        } else if(/dd|d/.test(item)) { // 日
          if(thisv < 1) thisv = 1, error = true;
          dateTime.date = thisv;
        } else if(/HH|H/.test(item)) { // 时
          if(thisv < 1) thisv = 0, error = true;
          dateTime.hours = thisv;
          options.range && (that[startEnd[index]].hours = thisv);
        } else if(/mm|m/.test(item)) { // 分
          if(thisv < 1) thisv = 0, error = true;
          dateTime.minutes = thisv;
          options.range && (that[startEnd[index]].minutes = thisv);
        } else if(/ss|s/.test(item)) { // 秒
          if(thisv < 1) thisv = 0, error = true;
          dateTime.seconds = thisv;
          options.range && (that[startEnd[index]].seconds = thisv);
        }
      });
      checkValid(dateTime);
    };
    
    if(fn === 'limit') return checkValid(dateTime), that;
    
    value = value || options.value;
    if(typeof value === 'string') {
      value = value.replace(/\s+/g, ' ').replace(/^\s|\s$/g, '');
    }
    
    // 如果点击了开始，单未选择结束就关闭，则重新选择开始
    if (that.startState && !that.endState) {
      delete that.startState;
      that.endState = true;
    };    

    if (typeof value === 'string' && value) {
      if(that.EXP_IF.test(value) ) { // 校验日期格式
        if(options.range) {
          value = value.split(' '+ options.range +' ');
          that.startDate = that.startDate || that.systemDate();
          that.endDate = that.endDate || that.systemDate();
          options.dateTime = lay.extend({}, that.startDate);
          lay.each([that.startDate, that.endDate], function(i, item) {
            initDate(item, value[i], i);
          });
        } else {
          initDate(dateTime, value);
        }
      } else {
        // 当选择是input且不是日期格式时才用，目前用不上
        // that.hint('日期格式不合法<br>必须遵循下述格式：<br>'+ (
        //   options.range ? (options.format + ' '+ options.range +' ' + options.format) : options.format
        // ) + '<br>已为你重置');
        // error = true;
      }
    } else if (value && value.constructor === Date) { // 如果值为日期对象时
      options.dateTime = that.systemDate(value);
    } else {
      options.dateTime = that.systemDate();
      delete that.startState;
      delete that.endState;
      delete that.startDate;
      delete that.endDate;
      delete that.startTime;
      delete that.endTime;
    }

    checkValid(dateTime);

    if (error && value) {
      that.setValue(
        options.range ? (that.endDate ? that.parse() : '') : that.parse()
      );
    }
    fn && fn();
    return that;
  };
  // 公历重要日期与自定义备注
  Class.prototype.mark = function(td, YMD) {
    let that = this;
    let mark;
    let options = that.config;
    lay.each(options.mark, function(key, title) {
      let keys = key.split('-');
      if((keys[0] == YMD[0] || keys[0] == 0) // 每年的每月
      && (keys[1] == YMD[1] || keys[1] == 0) // 每月的每日
      && keys[2] == YMD[2]) { // 特定日
        mark = title || YMD[2];
      }
    });
    mark && td.html('<span class="laydate-day-mark">'+ mark +'</span>');
    return that;
  };

  // 法定节假日备注
  Class.prototype.holiday = function(td, YMD) {
    let that = this;
    let mark;
    let bool;
    let options = that.config;
    lay.each(options.holidayDate, function(key, title) {      
      let keys = key.split('-');
      if((keys[0] == YMD[0] || keys[0] == 0) // 每年的每月
      && (keys[1] == YMD[1] || keys[1] == 0) // 每月的每日
      && keys[2] == YMD[2]) { // 特定日
        mark = YMD[2];
        bool = title;
      }
    });
    let cn=bool?'laydate-day-mark' : 'laydate-day-red';
    td.removeAttr('lay-holiday');
    mark && (td.attr('lay-holiday', bool), td.html('<span class="'+cn+'">'+ mark +'</span>'));
    return that;
  };
  
  // 无效日期范围的标记
  Class.prototype.limit = function(elem, date, index, time) {
    let that = this;
    let options = that.config;
    let timestrap = {};
    let dateTime = options[index > 41 ? 'endDate' : 'dateTime'];
    let isOut;
    let thisDateTime = lay.extend({}, dateTime, date || {});
    lay.each({
      now: thisDateTime,
      min: options.min,
      max: options.max
    }, function(key, item) {
      timestrap[key] = that.newDate(lay.extend({
        year: item.year,
        month: item.month,
        date: item.date
      }, function() {
        let hms = {};
        lay.each(time, function(i, keys) {
          hms[keys] = item[keys];
        });
        return hms;
      }())).getTime(); // time：是否比较时分秒
    });
    isOut = timestrap.now < timestrap.min || timestrap.now > timestrap.max || (elem && elem[0] && elem[0].nodeName==='TD' && !elem.hasClass(DISABLED));
    elem && elem[isOut ? 'addClass' : 'removeClass'](DISABLED);
    return isOut;
  };
  // 日历表
  Class.prototype.calendar = function(value) {
    let that = this;
    let options = that.config;
    let dateTime = value || options.dateTime;
    let thisDate = new Date();
    let  startWeek;
    let prevMaxDate;
    let thisMaxDate;
    // ,lang = that.lang() // 解决执行两次的问题
    
    let isAlone = options.type !== 'date' && options.type !== 'datetime';
    let index = value ? 1 : 0;
    let tds = lay(that.table[index]).find('td');
    let elemYM = lay(that.elemHeader[index][2]).find('span');
    
    if (dateTime.year < LIMIT_YEAR[0]) dateTime.year = LIMIT_YEAR[0], that.hint('最低只能支持到公元'+ LIMIT_YEAR[0] +'年');
    if (dateTime.year > LIMIT_YEAR[1]) dateTime.year = LIMIT_YEAR[1], that.hint('最高只能支持到公元'+ LIMIT_YEAR[1] +'年');
    
    // 记录初始值
    if(!that.firstDate) {
      that.firstDate = lay.extend({}, dateTime);
    }
    
    // 计算当前月第一天的星期
    thisDate.setFullYear(dateTime.year, dateTime.month, 1);
    startWeek = thisDate.getDay();
    
    prevMaxDate = laydate.getEndDate(dateTime.month || 12, dateTime.year); // 计算上个月的最后一天
    thisMaxDate = laydate.getEndDate(dateTime.month + 1, dateTime.year); // 计算当前月的最后一天
    
    // 赋值日
    lay.each(tds, function(index, item) {
      let YMD = [dateTime.year, dateTime.month];
      let st = 0;
      item = lay(item);
      item.removeAttr('class');
      if(index < startWeek) {
        st = prevMaxDate - startWeek + index;
        item.addClass('laydate-day-prev');
        YMD = that.getAsYM(dateTime.year, dateTime.month, 'sub');
      } else if (index >= startWeek && index < thisMaxDate + startWeek) {
        st = index - startWeek;
        // 如果不是多选或选择范围，则选中当日的日期
        if(!options.range && !options.more) {
          st + 1 === dateTime.date && item.addClass(THIS);
        }
      } else {
        st = index - thisMaxDate - startWeek;
        item.addClass('laydate-day-next');
        YMD = that.getAsYM(dateTime.year, dateTime.month);
      }
      YMD[1]++;
      YMD[2] = st + 1;
      let _YMD=[YMD[0], lay.digit(YMD[1]), lay.digit(YMD[2])].join('-');
      item.attr('lay-ymd', _YMD).attr('lay-weeks', index).html(YMD[2]);

      // 根据moreDate来赋值
      if(moreDate && moreDate.indexOf(_YMD)>-1 && !item.hasClass('laydate-day-next') && !item.hasClass('laydate-day-prev')) {
        item.addClass(THIS);
      }

      // 根据moreDateStart来赋值不可选
      if(moreDateStart && moreDateStart.indexOf(_YMD)>-1) {
        item.removeClass(THIS).addClass(DISABLED).addClass(NOCHANGE);
      }

      // 标注法定节假日
      that.holiday(item, YMD).limit(item, {
        year: YMD[0],
        month: YMD[1] - 1,
        date: YMD[2]
      }, index);
      // 标注国际节日
      that.mark(item, YMD).limit(item, {
        year: YMD[0],
        month: YMD[1] - 1,
        date: YMD[2]
      }, index);
    });

    
    // moreDate.forEach(function(value, index){
    //   var td=document.querySelectorAll('td');
    //   var th=document.querySelectorAll('th');
    // })
    
    let lang = that.lang();
    // 同步头部年月
    lay(elemYM[0]).attr('lay-ym', dateTime.year + '-' + (dateTime.month + 1));
    lay(elemYM[1]).attr('lay-ym', dateTime.year + '-' + (dateTime.month + 1));
    
    if (options.lang === 'cn') {
      lay(elemYM[0]).attr('lay-type', 'year').html(dateTime.year + '年');
      lay(elemYM[1]).attr('lay-type', 'month').html((dateTime.month + 1) + '月');
    } else {
      lay(elemYM[0]).attr('lay-type', 'month').html(lang.month[dateTime.month]);
      lay(elemYM[1]).attr('lay-type', 'year').html(dateTime.year);
    }

    // 初始默认选择器
    if(isAlone) {
      if(options.range) {
        value ? that.endDate = (that.endDate || {
          year: dateTime.year + (options.type === 'year' ? 1 : 0),
          month: dateTime.month + (options.type === 'month' ? 0 : -1)
        }) : (that.startDate = that.startDate || {
          year: dateTime.year,
          month: dateTime.month
        });
        if(value) {
          that.listYM = [
            [that.startDate.year, that.startDate.month + 1],
            [that.endDate.year, that.endDate.month + 1]
          ];
          that.list(options.type, 0).list(options.type, 1);
          // 同步按钮可点状态
          options.type === 'time' ? that.setBtnStatus('时间',
            lay.extend({}, that.systemDate(), that.startTime),
            lay.extend({}, that.systemDate(), that.endTime)
          ) : that.setBtnStatus(true);
        }
      }
      if(!options.range) {
        that.listYM = [[dateTime.year, dateTime.month + 1]];
        that.list(options.type, 0);
      }
    }
    
    // 赋值双日历
    if(options.range && !value) {
      let EYM = that.getAsYM(dateTime.year, dateTime.month);
      that.calendar(lay.extend({}, dateTime, {
        year: EYM[0],
        month: EYM[1]
      }));
    }
    
    // 通过检测当前有效日期，来设定确定按钮是否可点
    if(!options.range) that.limit(lay(that.footer).find(ELEM_CONFIRM), null, 0, ['hours', 'minutes', 'seconds']);
    
    // 标记选择范围
    if (options.range && value && !isAlone) that.stampRange();
    return that;
  };
  // 生成年月时分秒列表
  Class.prototype.list = function(type, index) {
    let that = this;
    let options = that.config;
    let dateTime = options.dateTime;
    let lang = that.lang();
    let isAlone = options.range && options.type !== 'date' && options.type !== 'datetime'; // 独立范围选择器
    let ul = lay.elem('ul', {
      'class': ELEM_LIST + ' ' + ({
        year: 'laydate-year-list',
        month: 'laydate-month-list',
        time: 'laydate-time-list'
      })[type]
    });
    let elemHeader = that.elemHeader[index];
    let elemYM = lay(elemHeader[2]).find('span');
    let elemCont = that.elemCont[index || 0];
    let haveList = lay(elemCont).find('.'+ ELEM_LIST)[0];
    let isCN = options.lang === 'cn';
    let text = isCN ? '年' : '';   
    let listYM = that.listYM[index] || {};
    let hms = ['hours', 'minutes', 'seconds'];
    let startEnd = ['startTime', 'endTime'][index];

    if (listYM[0] < 1) listYM[0] = 1;
    
    if (type === 'year') { // 年列表
      let yearNum;
      let startY = yearNum = listYM[0] - 7;
      if(startY < 1) startY = yearNum = 1;
      lay.each(new Array(15), function(i) {
        let li = lay.elem('li', {
          'lay-ym': yearNum
        });
        let ymd = {year: yearNum};
        yearNum == listYM[0] && lay(li).addClass(THIS);
        li.innerHTML = yearNum + text;
        ul.appendChild(li);
        if (yearNum < that.firstDate.year) {
          ymd.month = options.min.month;
          ymd.date = options.min.date;
        } else if (yearNum >= that.firstDate.year) {
          ymd.month = options.max.month;
          ymd.date = options.max.date;
        }
        that.limit(lay(li), ymd, index);
        yearNum++;
      });
      lay(elemYM[isCN ? 0 : 1]).attr('lay-ym', (yearNum - 8) + '-' + listYM[1])
      .html((startY + text) + ' - ' + (yearNum - 1 + text));
    } else if (type === 'month') { // 月列表
      lay.each(new Array(12), function(i) {
        let li = lay.elem('li', {
          'lay-ym': i
        });
        let ymd = {year: listYM[0], month: i};
        i + 1 == listYM[1] && lay(li).addClass(THIS);
        li.innerHTML = lang.month[i] + (isCN ? '月' : '');
        ul.appendChild(li);
        if (listYM[0] < that.firstDate.year) {
          ymd.date = options.min.date;
        } else if (listYM[0] >= that.firstDate.year) {
          ymd.date = options.max.date;
        }
        that.limit(lay(li), ymd, index);
      });
      lay(elemYM[isCN ? 0 : 1]).attr('lay-ym', listYM[0] + '-' + listYM[1])
      .html(listYM[0] + text);
    } else if (type === 'time') { // 时间列表
      // 检测时分秒状态是否在有效日期时间范围内
      let setTimeStatus = function() {
        lay(ul).find('ol').each(function(i, ol) {
          lay(ol).find('li').each(function(ii, li) {
            that.limit(lay(li), [{
              hours: ii
            }, {
              hours: that[startEnd].hours,
              minutes: ii
            }, {
              hours: that[startEnd].hours,
              minutes: that[startEnd].minutes,
              seconds: ii
            }][i], index, [['hours'], ['hours', 'minutes'], ['hours', 'minutes', 'seconds']][i]);
          });
        });
        if (!options.range) that.limit(lay(that.footer).find(ELEM_CONFIRM), that[startEnd], 0, ['hours', 'minutes', 'seconds']);
      };
      if(options.range) {
        if(!that[startEnd]) that[startEnd] = {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      } else {
        that[startEnd] = dateTime;
      }
      lay.each([24, 60, 60], function(i, item) {
        let li = lay.elem('li');
        let childUL = ['<p>'+ lang.time[i] +'</p><ol>'];
        lay.each(new Array(item), function(ii) {
          childUL.push('<li'+ (that[startEnd][hms[i]] === ii ? ' class="'+ THIS +'"' : '') +'>'+ lay.digit(ii, 2) +'</li>');
        });
        li.innerHTML = childUL.join('') + '</ol>';
        ul.appendChild(li);
      });
      // setTimeStatus();
    }
    
    // 插入容器
    if(haveList) elemCont.removeChild(haveList);
    elemCont.appendChild(ul);
    
    // 年月
    if (type === 'year' || type === 'month') {      
      // 显示切换箭头
      lay(that.elemMain[index]).addClass('laydate-ym-show');      
      // 选中
      lay(ul).find('li').on('click', function() {
        let ym = lay(this).attr('lay-ym') | 0;
        if (lay(this).hasClass(DISABLED)) return;
        
        if(index === 0) {
          dateTime[type] = ym;
          if (isAlone) that.startDate[type] = ym;
          that.limit(lay(that.footer).find(ELEM_CONFIRM), null, 0);
        } else { // 范围选择
          if(isAlone) { // 非date/datetime类型
            that.endDate[type] = ym;
          } else { // date/datetime类型
            let YM = type === 'year'
              ? that.getAsYM(ym, listYM[1] - 1, 'sub') 
            : that.getAsYM(listYM[0], ym, 'sub');
            lay.extend(dateTime, {
              year: YM[0],
              month: YM[1]
            });
          }
        }
        if(options.type === 'year' || options.type === 'month') {
          lay(ul).find('.'+ THIS).removeClass(THIS);
          lay(this).addClass(THIS);
          
          // 如果为年月选择器，点击了年列表，则切换到月选择器
          if (options.type === 'month' && type === 'year') {
            that.listYM[index][0] = ym;
            isAlone && (that[['startDate', 'endDate'][index]].year = ym);
            that.list('month', index);
          }
        } else {
          that.checkDate('limit').calendar();
          that.closeList();
        }

        that.setBtnStatus(); // 同步按钮可点状态
        options.range || that.done(null, 'change');
        lay(that.footer).find(ELEM_TIME_BTN).removeClass(DISABLED);
      });
    } else {
      let span = lay.elem('span', {
        'class': ELEM_TIME_TEXT
      });
      let scroll = function() { // 滚动条定位
        lay(ul).find('ol').each(function(i) {
          let ol = this;
          let li = lay(ol).find('li');
          ol.scrollTop = 30*(that[startEnd][hms[i]] - 2);
          if(ol.scrollTop <= 0) {
            li.each(function(ii, item) {
              if(!lay(this).hasClass(DISABLED)) {
                ol.scrollTop = 30*(ii - 2);
                return true;
              }
            });
          }
        });
      };
      let haveSpan = lay(elemHeader[2]).find('.'+ ELEM_TIME_TEXT);
      scroll();
      span.innerHTML = options.range ? [lang.startTime, lang.endTime][index] : lang.timeTips;
      lay(that.elemMain[index]).addClass('laydate-time-show');
      if(haveSpan[0]) haveSpan.remove();
      elemHeader[2].appendChild(span);

      lay(ul).find('ol').each(function(i) {
        let ol = this;
        // 选择时分秒
        lay(ol).find('li').on('click', function() {
          let value = this.innerHTML | 0;
          if(lay(this).hasClass(DISABLED)) return;
          if(options.range) {
            that[startEnd][hms[i]] = value;
          } else {
            dateTime[hms[i]] = value;
          }
          lay(ol).find('.'+ THIS).removeClass(THIS);
          lay(this).addClass(THIS);

          // setTimeStatus();
          scroll();
          (that.endDate || options.type === 'time') && that.done(null, 'change');
          
          // 同步按钮可点状态
          that.setBtnStatus();
        });
      });
    }        
    return that;
  };
  // 记录列表切换后的年月
  Class.prototype.listYM = [];
  
  // 关闭列表
  Class.prototype.closeList = function() {
    let that = this;
    let options = that.config;
    
    lay.each(that.elemCont, function(index, item) {
      lay(this).find('.'+ ELEM_LIST).remove();
      lay(that.elemMain[index]).removeClass('laydate-ym-show laydate-time-show');
    });
    lay(that.elem).find('.'+ ELEM_TIME_TEXT).remove();
  };
  
  // 检测结束日期是否超出开始日期
  Class.prototype.setBtnStatus = function(tips, start, end) {
    let that = this;
    let options = that.config;
    let isOut;
    let elemBtn = lay(that.footer).find(ELEM_CONFIRM);
    let isAlone = options.range && options.type !== 'date' && options.type !== 'time';
    if(isAlone) {
      start = start || that.startDate;
      end = end || that.endDate;
      isOut = that.newDate(start).getTime() > that.newDate(end).getTime();
      
      // 如果不在有效日期内，直接禁用按钮，否则比较开始和结束日期
      (that.limit(null, start) || that.limit(null, end))
        ? elemBtn.addClass(DISABLED)
      : elemBtn[isOut ? 'addClass' : 'removeClass'](DISABLED);
      
      // 是否异常提示
      if(tips && isOut) that.hint(
        typeof tips === 'string' ? TIPS_OUT.replace(/日期/g, tips) : TIPS_OUT
      );
    }
  };
  
  // 转义为规定格式的日期字符
  Class.prototype.parse = function(state, date) {
    let that = this;
    let options = that.config
    let dateTime = date || (state
      ? lay.extend({}, that.endDate, that.endTime)
    : (options.range ? lay.extend({}, that.startDate, that.startTime) : options.dateTime))
    let format = that.format.concat();

    // 转义为规定格式
    lay.each(format, function(i, item) {
      if(/yyyy|y/.test(item)) { // 年
        format[i] = lay.digit(dateTime.year, item.length);
      } else if(/MM|M/.test(item)) { // 月
        format[i] = lay.digit(dateTime.month + 1, item.length);
      } else if(/dd|d/.test(item)) { // 日
        format[i] = lay.digit(dateTime.date, item.length);
      } else if(/HH|H/.test(item)) { // 时
        format[i] = lay.digit(dateTime.hours, item.length);
      } else if(/mm|m/.test(item)) { // 分
        format[i] = lay.digit(dateTime.minutes, item.length);
      } else if(/ss|s/.test(item)) { // 秒
        format[i] = lay.digit(dateTime.seconds, item.length);
      }
    });
    
    // 返回日期范围字符
    if(options.range && !state) {
      return format.join('') + ' '+ options.range +' ' + that.parse(1);
    }
    return format.join('');
  };
  
  // 创建指定日期时间对象
  Class.prototype.newDate = function(dateTime) {
    dateTime = dateTime || {};
    return new Date(
      dateTime.year || 1,
      dateTime.month || 0,
      dateTime.date || 1,
      dateTime.hours || 0,
      dateTime.minutes || 0,
      dateTime.seconds || 0
    );
  };
  // 赋值
  Class.prototype.setValue = function(value) {
    let that = this;
    let options = that.config;
    let elem = that.bindElem || options.elem[0];
    let valType = that.isInput(elem) ? 'val' : 'html';
    
    options.position === 'static' || lay(elem)[valType](value || '');
    return this;
  };
  // 本月全选
  Class.prototype.monthAll = function() {
    let that = this;
    let obj=document.getElementById('layui-laydate1');
    let td=obj.querySelectorAll('td');
    let th=obj.querySelectorAll('th');
    td.forEach(function(value, index) {
      if(value.className==='') {
        moreDate.push(value.getAttribute('lay-ymd'));
        value.className=THIS;
      }
    });
    th.forEach(function(value) {
      value.className=THIS;
    })
    moreDate=Array.from(new Set(moreDate));
    // 如果是展开的，则点击后就要将值传出去
    if(that.config.isOpen) that.done([moreDate]);
    // console.log('本月全选',moreDate);
  }

  // 取消全选
  Class.prototype.cancelAll = function() {
    let that = this;
    let obj=document.getElementById('layui-laydate1');
    let td=obj.querySelectorAll('td');
    let th=obj.querySelectorAll('th');
    td.forEach(function(value, index) {
      if(value.className===THIS) {
        moreDate.splice(moreDate.indexOf(value.getAttribute('lay-ymd')),1);
        value.className='';
      }
    });
    th.forEach(function(value) {
      value.className='';
    })
    moreDate=Array.from(new Set(moreDate));
    // 如果是展开的，则点击后就要将值传出去
    if(that.config.isOpen) that.done([moreDate]);
    // console.log('取消全选',moreDate);
  }

  // 工作日全选
  Class.prototype.weekingAll = function() {
    this.cancelAll();
    let obj=document.getElementById('layui-laydate1');
    let td=obj.querySelectorAll('td');
    td.forEach(function(value, index) {
      // 判断是不是节假日
      let holiday=value.getAttribute('lay-holiday');
      let i=index % 7;
      // 只能在可选的范围内选择
      if(value.className==='') {
        ((i>0 && i<6 && holiday !== 'true') || // 周一至周五但要排除调休休息的日期
        ((i===0 || i===6) && holiday ==='false')) && // 周末但要调休上班的日子
        (value.className=THIS, moreDate.push(value.getAttribute('lay-ymd')));
      }
    });
    moreDate=Array.from(new Set(moreDate));
    // 如果是展开的，则点击后就要将值传出去
    if(this.config.isOpen) this.done([moreDate]);
    this.judgeWeek();
    // console.log('工作日全选', moreDate);
  }
 
  // 抠出周末
  Class.prototype.notWeekEnd = function() {
    let that = this;
    let obj=document.getElementById('layui-laydate1');
    let td=obj.querySelectorAll('td');
    let th=obj.querySelectorAll('th');
    td.forEach(function(value, index) {
      if(value.className===THIS && (index % 7===0 || index % 7===6)) {
        moreDate.splice(moreDate.indexOf(value.getAttribute('lay-ymd')),1);
        value.className='';
      }
    });
    th.forEach(function(value, index) {
      if(index % 7===0 || index % 7===6) {
        value.className='';
      }
    })
    moreDate=Array.from(new Set(moreDate));
    // 如果是展开的，则点击后就要将值传出去
    if(that.config.isOpen) that.done([moreDate]);
    // console.log('抠出周末',moreDate);
  }

  // 日期多选
  Class.prototype.moreChose = function(td) {
    let that = this;
    let bool = td.hasClass(THIS);
    // 如果不在本月范围内，则不能选
    if(td.hasClass('laydate-day-next') || td.hasClass('laydate-day-prev')) return;
    let obj=document.getElementById('layui-laydate1');
    let th=obj.querySelectorAll('th');
    th.forEach(function(value, index) {
      if(parseInt(value.getAttribute('lay-weeks'), 10)===td.attr('lay-weeks') % 7) {
        if(bool) value.className='';
      }
    })
    bool ? (td.removeClass(THIS),
      moreDate.splice(moreDate.indexOf(that.parse()), 1)) :
      (td.addClass(THIS),
      moreDate.push(that.parse()));
    moreDate=Array.from(new Set(moreDate));
    // 如果是展开的，则点击后就要将值传出去
    if(that.config.isOpen) that.done([moreDate]);
    // console.log(0,moreDate);
  }
  // 标记范围内的日期
  Class.prototype.stampRange = function() {
    let that = this;
    let options = that.config;
    let startTime;
    let endTime;
    let tds = lay(that.elem).find('td');
    
    if(options.range && !that.endDate) lay(that.footer).find(ELEM_CONFIRM).addClass(DISABLED);
    if(!that.endDate) return;


    startTime = that.newDate({
      year: that.startDate.year,
      month: that.startDate.month,
      date: that.startDate.date
    }).getTime();

    endTime = that.newDate({
      year: that.endDate.year,
      month: that.endDate.month,
      date: that.endDate.date
    }).getTime();
    
    if(startTime > endTime) return that.hint(TIPS_OUT);
    
    lay.each(tds, function(i, item) {
      let ymd = lay(item).attr('lay-ymd').split('-');
      let thisTime = that.newDate({
        year: ymd[0],
        month: ymd[1] - 1,
        date: ymd[2]
      }).getTime();
      lay(item).removeClass(ELEM_SELECTED + ' ' + THIS);
      if(thisTime === startTime || thisTime === endTime) {
        lay(item).addClass(
          lay(item).hasClass(ELEM_PREV) || lay(item).hasClass(ELEM_NEXT)
            ? ELEM_SELECTED
          : THIS
        );
      }
      if(thisTime > startTime && thisTime < endTime) {
        lay(item).addClass(ELEM_SELECTED);
      }
    });
  };
  // 执行done/change回调
  Class.prototype.done = function(param, type) {
    let that = this;
    let options = that.config;
    let start = lay.extend({}, that.startDate ? lay.extend(that.startDate, that.startTime) : options.dateTime)
    let end = lay.extend({}, lay.extend(that.endDate, that.endTime));
    
    lay.each([start, end], function(i, item) {
      if(!('month' in item)) return;
      lay.extend(item, {
        month: item.month + 1
      });
    });
    
    param = param || [that.parse(), start, end];
    typeof options[type || 'done'] === 'function' && options[type || 'done'].apply(options, param);
    
    return that;
  };
  // 判断星期几是否选中(类似全选)
  Class.prototype.judgeWeek = function() {
    let obj=document.getElementById('layui-laydate1');
    let td=obj.querySelectorAll('td');
    let week=[];
    let _week=[];
    for(let i=0; i<7; i++) {
      week[i]=[];
      _week[i]=[];
    }
    td.forEach(function(value, index, array) {
      let cn=value.className;
      if (cn === THIS || cn === '') week[index%7].push(cn);
      if (cn === THIS) _week[index%7].push(cn);
    })
    for (let i=0; i<7; i++) {
      if (week[i].length !==0 && week[i].length === _week[i].length) {
        document.querySelector('[lay-weeks="'+i+'"]').className=THIS;
      } else {
        document.querySelector('[lay-weeks="'+i+'"]').className='';
      }
    }
  }
  // 星期几点击，选中此列
  Class.prototype.chooseWeak = function(th) {
    let that = this;
    let options = that.config;
    let week=th.attr('lay-weeks');
    let bool=th.hasClass(THIS);
    if (!options.more) return;
    let obj=document.getElementById('layui-laydate1');
    let td=obj.querySelectorAll('td');
    td.forEach(function(value, index, array) {
      // 获取该月所有日期
      let date=value.getAttribute('lay-ymd');
      // 获取这一列的td
      let isWeek=index % 7 === parseInt(week);
      // 是否在本月内
      let isHasClass= value.className==='' || value.className===THIS;
      if (isWeek && isHasClass) {
        bool ? (value.className='',
          th.removeClass(THIS),
          moreDate.splice(moreDate.indexOf(date), 1)
        ) :
        (value.className=THIS,
          th.addClass(THIS),
          moreDate.push(date)
        );
      }
    });
    // 数组去重
    moreDate=Array.from(new Set(moreDate));
    // console.log('选择好的日期',moreDate)
  }
  // 选择日期
  Class.prototype.choose = function(td) {
    let that = this;
    let options = that.config;
    let dateTime = options.dateTime;

    let tds = lay(that.elem).find('td');
    let YMD = td.attr('lay-ymd').split('-');
    
    let setDateTime = function(one) {
      let thisDate = new Date();
      // 同步dateTime
      one && lay.extend(dateTime, YMD);
      // 记录开始日期
      if(options.range) {
        that.startDate ? lay.extend(that.startDate, YMD) : (
          that.startDate = lay.extend({}, YMD, that.startTime)
        );
        that.startYMD = YMD;
      }
    };
    
    YMD = {
      year: YMD[0] | 0,
      month: (YMD[1] | 0) - 1,
      date: YMD[2] | 0
    };
    
    if(td.hasClass(DISABLED)) return;

    // 范围选择
    if(options.range) {
      
      lay.each(['startTime', 'endTime'], function(i, item) {
        that[item] = that[item] || {
          hours: 0,
          minutes: 0,
          seconds: 0
        };
      });
      
      if(that.endState) { // 重新选择
        setDateTime();
        delete that.endState;
        delete that.endDate;
        that.startState = true;
        tds.removeClass(THIS + ' ' + ELEM_SELECTED);
        td.addClass(THIS);
      } else if (that.startState) { // 选中截止
        td.addClass(THIS);
        
        that.endDate ? lay.extend(that.endDate, YMD) : (
          that.endDate = lay.extend({}, YMD, that.endTime)
        );
        
        // 判断是否顺时或逆时选择
        if(that.newDate(YMD).getTime() < that.newDate(that.startYMD).getTime()) {
          let startDate = lay.extend({}, that.endDate, {
            hours: that.startDate.hours,
            minutes: that.startDate.minutes,
            seconds: that.startDate.seconds
          });
          lay.extend(that.endDate, that.startDate, {
            hours: that.endDate.hours,
            minutes: that.endDate.minutes,
            seconds: that.endDate.seconds
          });
          that.startDate = startDate;
        }
        
        options.showBottom || that.done();
        that.stampRange(); // 标记范围内的日期
        that.endState = true;
        that.done(null, 'change');
      } else { // 选中开始
        td.addClass(THIS);
        setDateTime();
        that.startState = true;
      }
      lay(that.footer).find(ELEM_CONFIRM)[that.endDate ? 'removeClass' : 'addClass'](DISABLED);
    } else if(options.more) {
      setDateTime(true);
      that.moreChose(td);
    } else if(options.position === 'static') { // 直接嵌套的选中
      setDateTime(true);
      that.calendar().done().done(null, 'change');
    } else if(options.type === 'date') {
      setDateTime(true);
      // console.log(that.parse())
      if(!options.isOpen) that.setValue(that.parse()).remove().done();
    } else if (options.type === 'datetime') {
      setDateTime(true);
      that.calendar().done(null, 'change');
    }
  };
  
  // 底部按钮
  Class.prototype.tool = function(btn, type) {
    let that = this;
    let options = that.config;
    let dateTime = options.dateTime;
    let isStatic = options.position === 'static';
    let active = {
      // 选择时间
      datetime: function() {
        if(lay(btn).hasClass(DISABLED)) return;
        that.list('time', 0);
        options.range && that.list('time', 1);
        lay(btn).attr('lay-type', 'date').html(that.lang().dateTips);
      },
      
      // 选择日期
      date: function() {
        that.closeList();
        lay(btn).attr('lay-type', 'datetime').html(that.lang().timeTips);
      },
      
      // 清空、重置
      clear: function() {
        if(!options.isOpen) that.setValue('').remove();
        isStatic && (
          lay.extend(dateTime, that.firstDate),
          that.calendar()
        )
        options.range && (
          delete that.startState,
          delete that.endState,
          delete that.endDate,
          delete that.startTime,
          delete that.endTime
        );
        that.done(['', {}, {}]);
      },
      
      // 现在
      now: function() {
        let thisDate = new Date();
        lay.extend(dateTime, that.systemDate(), {
          hours: thisDate.getHours(),
          minutes: thisDate.getMinutes(),
          seconds: thisDate.getSeconds()
        });
        // 等用到的时候再来改
        if(!options.isOpen) that.setValue(that.parse()).remove();
        isStatic && that.calendar();
        that.done();
      },
      
      // 确定
      confirm: function() {
        if(options.range) {
          if(!that.endDate) return that.hint('请先选择日期范围');
          if(lay(btn).hasClass(DISABLED)) return that.hint(
            options.type === 'time' ? TIPS_OUT.replace(/日期/g, '时间') : TIPS_OUT
          );
        } else {
          if(lay(btn).hasClass(DISABLED)) return that.hint('不在有效日期或时间范围内');
        }
        if(options.customChoose) {
          that.done();
          if(!options.isOpen) that.remove();
        } else{
          that.done();
          if(!options.isOpen) that.setValue(that.parse()).remove();
        }
      },

      // 本月全选
      monthAll: function() {
        that.monthAll();
        // console.log('本月全选');
      },

      // 取消全选
      cancelAll: function() {
        that.cancelAll();
        // console.log('取消全选');
      },

      // 工作日全选
      weekAll: function() {
        that.weekingAll();
        // console.log('工作日全选');
      },

      // 扣除周末
      notWeek: function() {
        that.notWeekEnd();
        // console.log('扣除周末');
      }

    };
    active[type] && active[type]();
  };
  // 统一切换处理
  Class.prototype.change = function(index) {
    let that = this;
    let options = that.config;
    let dateTime = options.dateTime;
    let isAlone = options.range && (options.type === 'year' || options.type === 'month');    
    let elemCont = that.elemCont[index || 0];
    let listYM = that.listYM[index];
    let addSubYeay = function(type) {
      let startEnd = ['startDate', 'endDate'][index];
      let isYear = lay(elemCont).find('.laydate-year-list')[0];
      let isMonth = lay(elemCont).find('.laydate-month-list')[0];
      
      // 切换年列表
      if(isYear) {
        listYM[0] = type ? listYM[0] - 15 : listYM[0] + 15;
        that.list('year', index);
      }
      
      if(isMonth) { // 切换月面板中的年
        type ? listYM[0]-- : listYM[0]++;
        that.list('month', index);
      }
      
      if(isYear || isMonth) {
        lay.extend(dateTime, {
          year: listYM[0]
        });
        if(isAlone) that[startEnd].year = listYM[0];
        options.range || that.done(null, 'change');
        that.setBtnStatus();
        options.range || that.limit(lay(that.footer).find(ELEM_CONFIRM), {
          year: listYM[0]
        });
      }
      return isYear || isMonth;
    };
    
    return {
      prevYear: function() {
        if(addSubYeay('sub')) return;
        dateTime.year--;
        that.checkDate('limit').calendar();
        options.range || that.done(null, 'change');
      },
      prevMonth: function() {
        let YM = that.getAsYM(dateTime.year, dateTime.month, 'sub');
        lay.extend(dateTime, {
          year: YM[0],
          month: YM[1]
        });
        that.checkDate('limit').calendar();
        options.range || that.done(null, 'change');
      },
      nextMonth: function() {
        let YM = that.getAsYM(dateTime.year, dateTime.month);
        lay.extend(dateTime, {
          year: YM[0],
          month: YM[1]
        });
        that.checkDate('limit').calendar();
        options.range || that.done(null, 'change');
      },
      nextYear: function() {
        if(addSubYeay()) return;
        dateTime.year++;
        that.checkDate('limit').calendar();
        options.range || that.done(null, 'change');
      }
    };
  };
  // 日期切换事件
  Class.prototype.changeEvent = function() {
    let that = this;
    let options = that.config;

    // 日期选择事件
    lay(that.elem).on('click', function(e) {      
      lay.stope(e);
    });
    
    // 年月切换
    lay.each(that.elemHeader, function(i, header) {
      // 上一年
      lay(header[0]).on('click', function(e) {
        that.change(i).prevYear();
        that.judgeWeek();
      });
      
      // 上一月
      lay(header[1]).on('click', function(e) {
        that.change(i).prevMonth();
        that.judgeWeek();
      });
      
      // 选择年月
      lay(header[2]).find('span').on('click', function(e) {
        let othis = lay(this);
        let layYM = othis.attr('lay-ym');
        let layType = othis.attr('lay-type');
        
        if(!layYM) return;
        
        layYM = layYM.split('-');

        that.listYM[i] = [layYM[0] | 0, layYM[1] | 0];
        that.list(layType, i);
        lay(that.footer).find(ELEM_TIME_BTN).addClass(DISABLED);
      });

      // 下一月
      lay(header[3]).on('click', function(e) {
        that.change(i).nextMonth();
        that.judgeWeek();
      });
      
      // 下一年
      lay(header[4]).on('click', function(e) {
        that.change(i).nextYear();
        that.judgeWeek();
      });
    });
    
    // 点击日期
    lay.each(that.table, function(i, table) {
      let tds = lay(table).find('td');
      tds.on('click', function() {
        if(!options.readonly) that.choose(lay(this));
      });
    });

    // 点击星期几
    lay.each(that.table, function(i, table) {
      let tds = lay(table).find('th');
      tds.on('click', function() {
        if(!options.readonly) that.chooseWeak(lay(this));
      });
    });
    
    // 点击底部按钮
    lay(that.footer).find('span').on('click', function() {
      let type = lay(this).attr('lay-type');
      that.tool(this, type);
    });
  };
  
  // 是否输入框
  Class.prototype.isInput = function(elem) {
    return /input|textarea/.test(elem.tagName.toLocaleLowerCase());
  };

  // 绑定的元素事件处理
  Class.prototype.events = function() {
    let that = this;
    let options = that.config;
    // 初始化显示
    that.render();
    // 只有是页面展示时才绑定关闭控件事件
    if(!options.isOpen)
      document.addEventListener('click', removeTime, false);
    // 自适应定位
    lay(window).on('resize', function() {
      if(!that.elem || !lay(ELEM)[0]) {
        return false;
      }
      that.position();
    });
    options.elem[0].eventHandler = true;
  };

  
  // 核心接口
  laydate.render = function() {
    // console.log(4, _options);
    // 将初始数据赋值给moreDateStart，用于关闭控件时初始化moreDate;
    if (_options && _options.moreDate) {
      moreDate = _options.moreDate.slice(0);
    }
    // 将初始数据赋值给moreDateStart，用于关闭控件时初始化moreDate;
    if (_options && _options.noChangeDate) {
      moreDateStart=_options.noChangeDate.slice(0);
    }
    let inst = new Class(_options);
    return thisDate.call(inst);
  };
  // 得到某月的最后一天
  laydate.getEndDate = function(month, year) {
    let thisDate = new Date();
    // 设置日期为下个月的第一天
    thisDate.setFullYear(
      year || thisDate.getFullYear(),
      month || (thisDate.getMonth() + 1),
    1);
    // 减去一天，得到当前月最后一天
    return new Date(thisDate.getTime() - 1000*60*60*24).getDate();
  };
  if(_options.close) {   
    let obj=document.getElementById('layui-laydate'+laydateIndex);
    if(obj) obj.remove();
  } else{
    laydate.render();
  }
};

export default getLayDate;