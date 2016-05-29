/*!
 * 文件名称：H.js
 * 文件版本：Version 0.1.4    2016-05-29
 * 文件作者：新生帝(JsonLei)
 * 编写日期：2016年03月11日
 * 版权所有：中山赢友网络科技有限公司
 * 企业官网：http://www.winu.net
 * 开源协议：MIT License
 * 文件描述：一切从简，只为了更懒！让APICloud再飞一会！
 * 讨论群区：一起改变中国IT教育 18863883
 * 文档地址：http://www.kancloud.cn/winu/hybrid
 * 开源地址：http://git.oschina.net/winu.net/H.js
 */

; ! function (factory) {
    if (typeof require === 'function' && typeof exports === 'object' && typeof module === 'object') {
        var target = module['exports'] || exports;
        factory(target);
    } else if (typeof define === 'function' && define['amd']) {
        define(['exports'], factory);
    } else {
        factory(window['H'] = {
            v: "0.1.4",
            M: {},
            tppl_flag: ['[:', ':]'],
            trim: function (str) {
                if (str) {
                    return str.replace(/(^\s*)|(\s*$)/g, '');
                }
            },
            trimAll: function (str) {
                return str.replace(/\s*/g, '');
            },
            getFileExt: function (fileName) {
                if (fileName && fileName.length > 2) {
                    return fileName.substring(fileName.lastIndexOf('.') + 1);
                } else {
                    console.warn("输入文件名有误！");
                }
            },
            //是否是闰年
            isLeapYear: function (iYear) {
                if (iYear % 4 == 0 && iYear % 100 != 0) {
                    return true;
                } else {
                    if (iYear % 400 == 0) {
                        return true;
                    } else {
                        return false;
                    }
                }
            },
            getAgeForBirthDay: function (birthday) {
                var r = birthday.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);
                if (r == null) {
                    return false;
                }
                var d = new Date(r[1], r[3] - 1, r[4]);
                if (d.getFullYear() == r[1] && (d.getMonth() + 1) == r[3] && d.getDate() == r[4]) {
                    var Y = new Date().getFullYear();
                    return (Y - r[1]);
                }
                return 0;
            },
            getClassOrTagName: function (str) {
                if (str && str.length > 0) {
                    if (str.substr(0, 1) == "." || str.substr(0, 1) == "#") {
                        return str.substr(1);
                    }
                    else {
                        return str;
                    }
                }
                return "*";
            },
            isNumber: function (str) {
                return !isNaN(str);
            },
            isString: function (obj) {
                var that = this;

                return that.isTargetType(obj, "string") && obj != null && obj != undefined;
            },
            isBoolean: function (obj) {
                var that = this;
                return that.isTargetType(obj, "boolean");
            },
            isPlusDecimal: function (str) {
                return (/^(([0-9]|([1-9][0-9]{0,9}))((\.[0-9]{1,2})?))$/).test(str);
            },
            isDate: function (str) {
                return (/^(?:(?:1[6-9]|[2-9][0-9])[0-9]{2}([-/.]?)(?:(?:0?[1-9]|1[0-2])\1(?:0?[1-9]|1[0-9]|2[0-8])|(?:0?[13-9]|1[0-2])\1(?:29|30)|(?:0?[13578]|1[02])\1(?:31))|(?:(?:1[6-9]|[2-9][0-9])(?:0[48]|[2468][048]|[13579][26])|(?:16|[2468][048]|[3579][26])00)([-/.]?)0?2\2(?:29))(\s+([01][0-9]:|2[0-3]:)?[0-5][0-9]:[0-5][0-9])?$/).text(str);
            },
            isNullOrEmpty: function (str) {
                var that = this;
                return (str == null || str == undefined || that.trim(str) == "") ? true : false;
            },
            isTargetType: function (obj, typeString) {
                return typeof obj === typeString;
            },
            isElement: function (obj) {
                return !!(obj && (obj.nodeType == 1 || obj.nodeType == 9));
            },
            isElements: function (arr) {
                var that = this;
                var flag = true;
                if (that.isArray(arr)) {
                    for (var i = 0; i < arr.length; i++) {
                        if (that.isElement(arr[i]) == false) {
                            flag = false;
                            break;
                        }
                    }
                }
                else {
                    flag = false;
                }

                return flag;
            },
            getNowDateFormat: function (dateSeparator, timeSeparator, isShowTime, datetime) {
                var that = this;
                dateSeparator = that.isNullOrEmpty(dateSeparator) ? "-" : dateSeparator;
                timeSeparator = that.isNullOrEmpty(timeSeparator) ? ":" : timeSeparator;
                isShowTime = that.isTargetType(arguments[2], "boolean") ? arguments[2] : true;

                var now = datetime ? datetime : new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hours = now.getHours();
                var minutes = now.getMinutes();
                var seconds = now.getSeconds();

                if (month >= 1 && month <= 9) {
                    month = "0" + month;
                }
                if (date >= 0 && date <= 9) {
                    date = "0" + date;
                }
                var _date = year + dateSeparator + month + dateSeparator + date;
                var _time = hours + timeSeparator + minutes + timeSeparator + seconds;

                return isShowTime ? (_date + " " + _time) : _date;
            },
            transPHPTimestamp: function (timestamp, isShowTime) {
                var that = this;
                var datetime = new Date(timestamp * 1000);
                return that.getNowDateFormat('-', ':', isShowTime, datetime);
            },
            transJsTimestamp: function (timestamp, isShowTime) {
                var that = this;
                var datetime = new Date(timestamp);
                return that.getNowDateFormat('-', ':', isShowTime, datetime);
            },
            isObject: function (obj) {
                var that = this;
                return (that.isTargetType(obj, "object") && obj != null && obj != undefined);
            },
            cloneObj: function (oldObj) {
                var that = this;

                if (that.isObject(oldObj) == false) {
                    return oldObj;
                }
                var newObj = new Object();
                for (var i in oldObj) {
                    newObj[i] = that.cloneObj(oldObj[i]);
                }
                return newObj;
            },
            extendObj: function () {
                var that = this;

                var args = arguments;
                if (args.length < 2) {
                    return;
                }
                var temp = that.cloneObj(args[0]);
                //调用复制对象方法
                for (var n = 1; n < args.length; n++) {
                    for (var i in args[n]) {
                        temp[i] = args[n][i];
                    }
                }
                return temp;
            },
            isFunction: function (obj) {
                var that = this;
                return that.isTargetType(obj, "function");
            },
            isArray: function (arr) {
                return (toString.apply(arr) === '[object Array]') || arr instanceof NodeList;
            },
            newGUID: function () {
                function _sub() {
                    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
                }

                return (_sub() + _sub() + "-" + _sub() + "-" + _sub() + "-" + _sub() + "-" + _sub() + _sub() + _sub());
            },
            unique: function (arr) {
                var that = this;

                if (!that.isArray(arr)) {
                    return arr;
                }
                var result = [], hash = {};
                for (var i = 0, elem; (elem = arr[i]) != null; i++) {
                    if (!hash[elem]) {
                        result.push(elem);
                        hash[elem] = true;
                    }
                }
                return result;
            },
            // 动态载入js，css，filetype类型就是js,css
            loadJsOrCssFile: function (filename, filetype) {
                if (filetype == "js") {
                    var fileref = document.createElement('script');
                    fileref.setAttribute("type", "text/javascript");
                    fileref.setAttribute("src", filename);
                } else if (filetype == "css") {

                    var fileref = document.createElement('link');
                    fileref.setAttribute("rel", "stylesheet");
                    fileref.setAttribute("type", "text/css");
                    fileref.setAttribute("href", filename);
                }
                if (typeof fileref != "undefined") {
                    document.getElementsByTagName("head")[0].appendChild(fileref);
                }
            },
            // 异步载入Html
            loadHtml: function (filename, callback) {
                var that = this;
                var xmlHttp = new XMLHttpRequest();
                xmlHttp.onreadystatechange = function () {
                    if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                        if (that.isFunction(callback)) {
                            callback(xmlHttp.responseText);
                        }
                    }
                };
                xmlHttp.open("get", filename, true);
                xmlHttp.send(null);
            },
            // 判断是否是WebView
            isWebView: function () {
                var that = this;
                var host = window.location.host;
                var path = window.location.href;
                if (host == "" && ((path.toLowerCase().indexOf('file:///storage') > -1)) || ((path.toLowerCase().indexOf('file:///mnt/') > -1)) || ((path.toLowerCase().indexOf('file:///android_asset') > -1)) || ((path.toLowerCase().indexOf('file:///data') > -1)) || (path.toLowerCase().indexOf('file:///var/') > -1) || (path.toLowerCase().indexOf('contents:///') > -1) || (path.toLowerCase().indexOf('file:///private/') > -1)) {
                    return true;
                }
                else {
                    return false;
                }
            },
            // 判断是否是APICloud
            isAPICloud: function () {
                var that = this;
                if (typeof api !== 'undefined' && typeof api.openWin !== 'undefined' && that.isWebView()) {
                    return true;
                }
                else {
                    return false;
                }
            },
            // 判断是否是服务器环境
            isServerEnvironment: function () {
                var that = this;
                var host = window.location.host;
                var path = window.location.href;

                if (host != "" && path.indexOf('file:///') == -1 && that.isAPICloud() == false) {
                    return true;
                }
                else {
                    return false;
                }
            },
            // 获取当前光标位置
            getCursorPosition: function (element) {
                var CaretPos = 0;
                // IE Support
                if (document.selection) {
                    element.focus();
                    var Sel = document.selection.createRange();
                    Sel.moveStart('character', -element.value.length);
                    CaretPos = Sel.text.length;
                }
                    // Firefox support
                else if (element.selectionStart || element.selectionStart == '0') {
                    CaretPos = element.selectionStart;
                }
                return (CaretPos);
            },
            // 设置当前管标的位置
            setCursorPosition: function (element, pos) {
                if (element.setSelectionRange) {
                    element.focus();
                    element.setSelectionRange(pos, pos);
                } else if (element.createTextRange) {
                    var range = element.createTextRange();
                    range.collapse(true);
                    range.moveEnd('character', pos);
                    range.moveStart('character', pos);
                    range.select();
                }
            },
            // 在光标处插入内容
            insertAtCursor: function (element, value) {
                if (document.selection) {
                    element.focus();
                    sel = document.selection.createRange();
                    sel.text = value;
                    sel.select();
                } else if (element.selectionStart || element.selectionStart == '0') {
                    var startPos = element.selectionStart;
                    var endPos = element.selectionEnd;
                    var restoreTop = element.scrollTop;
                    element.value = element.value.substring(0, startPos) + value + element.value.substring(endPos, element.value.length);
                    if (restoreTop > 0) {
                        element.scrollTop = restoreTop;
                    }
                    element.focus();
                    element.selectionStart = startPos + value.length;
                    element.selectionEnd = startPos + value.length;
                } else {
                    element.value += value;
                    element.focus();
                }
            },
            // 获取农历
            LunarDate: {
                madd: new Array(0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334),
                HsString: '甲乙丙丁戊己庚辛壬癸',
                EbString: '子丑寅卯辰巳午未申酉戌亥',
                NumString: "一二三四五六七八九十",
                MonString: "正二三四五六七八九十冬腊",
                CalendarData: new Array(0xA4B, 0x5164B, 0x6A5, 0x6D4, 0x415B5, 0x2B6, 0x957, 0x2092F, 0x497, 0x60C96, 0xD4A, 0xEA5, 0x50DA9, 0x5AD, 0x2B6, 0x3126E, 0x92E, 0x7192D, 0xC95, 0xD4A, 0x61B4A, 0xB55, 0x56A, 0x4155B, 0x25D, 0x92D, 0x2192B, 0xA95, 0x71695, 0x6CA, 0xB55, 0x50AB5, 0x4DA, 0xA5B, 0x30A57, 0x52B, 0x8152A, 0xE95, 0x6AA, 0x615AA, 0xAB5, 0x4B6, 0x414AE, 0xA57, 0x526, 0x31D26, 0xD95, 0x70B55, 0x56A, 0x96D, 0x5095D, 0x4AD, 0xA4D, 0x41A4D, 0xD25, 0x81AA5, 0xB54, 0xB6A, 0x612DA, 0x95B, 0x49B, 0x41497, 0xA4B, 0xA164B, 0x6A5, 0x6D4, 0x615B4, 0xAB6, 0x957, 0x5092F, 0x497, 0x64B, 0x30D4A, 0xEA5, 0x80D65, 0x5AC, 0xAB6, 0x5126D, 0x92E, 0xC96, 0x41A95, 0xD4A, 0xDA5, 0x20B55, 0x56A, 0x7155B, 0x25D, 0x92D, 0x5192B, 0xA95, 0xB4A, 0x416AA, 0xAD5, 0x90AB5, 0x4BA, 0xA5B, 0x60A57, 0x52B, 0xA93, 0x40E95),
                Year: null,
                Month: null,
                Day: null,
                TheDate: null,
                GetBit: function (m, n) {
                    return (m >> n) & 1;
                },
                e2c: function () {
                    this.TheDate = (arguments.length != 3) ? new Date() : new Date(arguments[0], arguments[1], arguments[2]);
                    var total, m, n, k;
                    var isEnd = false;
                    var tmp = this.TheDate.getFullYear();
                    total = (tmp - 1921) * 365 + Math.floor((tmp - 1921) / 4) + this.madd[this.TheDate.getMonth()] + this.TheDate.getDate() - 38;
                    if (this.TheDate.getYear() % 4 == 0 && this.TheDate.getMonth() > 1) {
                        total++;
                    }
                    for (m = 0; ; m++) {
                        k = (this.CalendarData[m] < 0xfff) ? 11 : 12;
                        for (n = k; n >= 0; n--) {
                            if (total <= 29 + this.GetBit(this.CalendarData[m], n)) {
                                isEnd = true;
                                break;
                            }
                            total = total - 29 - this.GetBit(this.CalendarData[m], n);
                        }
                        if (isEnd)
                            break;
                    }
                    this.Year = 1921 + m;
                    this.Month = k - n + 1;
                    this.Day = total;
                    if (k == 12) {
                        if (this.Month == Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                            this.Month = 1 - this.Month;
                        }
                        if (this.Month > Math.floor(this.CalendarData[m] / 0x10000) + 1) {
                            this.Month--;
                        }
                    }
                },
                GetcDateString: function () {
                    var tmp = "";
                    tmp += this.HsString.charAt((this.Year - 4) % 10);
                    tmp += this.EbString.charAt((this.Year - 4) % 12);
                    tmp += "年 ";
                    if (this.Month < 1) {
                        tmp += "(闰)";
                        tmp += this.MonString.charAt(-this.Month - 1);
                    } else {
                        tmp += this.MonString.charAt(this.Month - 1);
                    }
                    tmp += "月";
                    tmp += (this.Day < 11) ? "初" : ((this.Day < 20) ? "十" : ((this.Day < 30) ? "廿" : "三十"));
                    if (this.Day % 10 != 0 || this.Day == 10) {
                        tmp += this.NumString.charAt((this.Day - 1) % 10);
                    }
                    return tmp;
                },
                GetLunarDay: function (solarYear, solarMonth, solarDay) {
                    if (solarYear < 1921 || solarYear > 2020) {
                        return "";
                    } else {
                        solarMonth = (parseInt(solarMonth) > 0) ? (solarMonth - 1) : 11;
                        this.e2c(solarYear, solarMonth, solarDay);
                        return this.GetcDateString();
                    }
                }
            },
            // ######################### 事件
            addEventListener: function (callback, name, extra) {
                var that = this;
                if (that.isAPICloud()) {
                    var o = {};
                    o.name = name;

                    if (extra) {
                        extra = that.isObject(extra) ? extra : {};
                        o.extra = extra;
                    }

                    api.addEventListener(o, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            batterylow: function (callback) {
                var that = this;
                that.addEventListener(callback, "batterylow");
            },
            batterystatus: function (callback) {
                var that = this;
                that.addEventListener(callback, "batterystatus");
            },
            keyback: function (callback) {
                var that = this;
                that.addEventListener(callback, "keyback");
            },
            keymenu: function (callback) {
                var that = this;
                that.addEventListener(callback, "keymenu");
            },
            volumeup: function (callback) {
                var that = this;
                that.addEventListener(callback, "volumeup");
            },
            volumedown: function (callback) {
                var that = this;
                that.addEventListener(callback, "volumedown");
            },
            offline: function (callback) {
                var that = this;
                that.addEventListener(callback, "offline");
            },
            online: function (callback) {
                var that = this;
                that.addEventListener(callback, "online");
            },
            pause: function (callback) {
                var that = this;
                that.addEventListener(callback, "pause");
            },
            resume: function (callback) {
                var that = this;
                that.addEventListener(callback, "resume");
            },
            scrolltobottom: function (callback, threshold) {
                var that = this;
                threshold = Math.abs(that.isNumber(threshold) ? Number(threshold) : 0);

                that.addEventListener(callback, "scrolltobottom", {
                    threshold: threshold
                });
            },
            shake: function (callback) {
                var that = this;
                that.addEventListener(callback, "shake");
            },
            takescreenshot: function (callback) {
                var that = this;
                that.addEventListener(callback, "takescreenshot");
            },
            swipedown: function (callback) {
                var that = this;
                that.addEventListener(callback, "swipedown");
            },
            swipeleft: function (callback) {
                var that = this;
                that.addEventListener(callback, "swipeleft");
            },
            swiperight: function (callback) {
                var that = this;
                that.addEventListener(callback, "swiperight");
            },
            swipeup: function (callback) {
                var that = this;
                that.addEventListener(callback, "swipeup");
            },
            tap: function (callback) {
                var that = this;
                that.addEventListener(callback, "tap");
            },
            longpress: function (callback) {
                var that = this;
                that.addEventListener(callback, "longpress");
            },
            viewappear: function (callback) {
                var that = this;
                that.addEventListener(callback, "viewappear");
            },
            viewdisappear: function (callback) {
                var that = this;
                that.addEventListener(callback, "viewdisappear");
            },
            noticeclicked: function (callback) {
                var that = this;
                that.addEventListener(callback, "noticeclicked");
            },
            appintent: function (callback) {
                var that = this;
                that.addEventListener(callback, "appintent");
            },
            smartupdatefinish: function (callback) {
                var that = this;
                that.addEventListener(callback, "smartupdatefinish");
            },
            launchviewclicked: function (callback) {
                var that = this;
                that.addEventListener(callback, "launchviewclicked");
            },
            // ######################### 配置
            DEFAULT_CONFIG: {
                openWin_CONFIG: {
                    bounces: false,
                    bgColor: "rgba(0,0,0,0)",
                    scrollToTop: true,
                    vScrollBarEnabled: false,
                    hScrollBarEnabled: false,
                    scaleEnabled: false,
                    slidBackEnabled: true,
                    slidBackType: "edge",
                    delay: 0,
                    reload: false,
                    allowEdit: false,
                    softInputMode: "auto",
                    useWKWebView: true
                },
                closeWin_CONFIG: {},
                closeToWin_CONFIG: {},
                setWinAttr_CONFIG: {},
                openFrame_CONFIG: {
                    bounces: true,
                    bgColor: "rgba(0,0,0,0)",
                    scrollToTop: true,
                    vScrollBarEnabled: false,
                    hScrollBarEnabled: false,
                    scaleEnabled: false,
                    rect: {
                        x: 0,
                        y: 0,
                        w: 'auto',
                        h: 'auto',
                        marginLeft: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        marginRight: 0
                    },
                    //progress: {
                    //    type: "page",
                    //    color: "#45C01A"
                    //},
                    reload: false,
                    allowEdit: false,
                    softInputMode: 'auto',
                    useWKWebView: true
                },
                setFrameAttr_CONFIG: {},
                animation_CONFIG: {
                    delay: 0,
                    duration: 0,
                    curve: "ease_in_out",
                    repeatCount: 0,
                    autoreverse: false
                },
                openFrameGroup_CONFIG: {
                    scrollEnabled: true,
                    rect: {
                        x: 0,
                        y: 0,
                        w: 'auto',
                        h: 'auto',
                        marginLeft: 0,
                        marginTop: 0,
                        marginBottom: 0,
                        marginRight: 0
                    },
                    index: 0,
                    preload: 1
                },
                setFrameGroupAttr_CONFIG: {},
                setFrameGroupIndex_CONFIG: {},
                openPopoverWin_CONFIG: {
                    width: 540,
                    height: 620,
                    bgColor: 'rgba(0,0,0,0)',
                    scrollToTop: true,
                    bounces: true,
                    vScrollBarEnabled: false,
                    hScrollBarEnabled: false,
                    scaleEnabled: false,
                    showProgress: false,
                    allowEdit: false,
                    softInputMode: 'auto'
                },
                openSlidLayout_CONFIG: {
                    type: "left"
                },
                openDrawerLayout_CONFIG: {
                    bounces: false,
                    bgColor: "rgba(0,0,0,0)",
                    scrollToTop: true,
                    vScrollBarEnabled: false,
                    hScrollBarEnabled: false,
                    scaleEnabled: false,
                    slidBackEnabled: true,
                    slidBackType: "full",
                    showProgress: false,
                    delay: 0,
                    reload: false,
                    allowEdit: false,
                    softInputMode: "auto"
                },
                removeLaunchView_CONFIG: {},
                openApp_CONFIG: {
                    androidPkg: "android.intent.action.VIEW",
                    mimeType: "text/html"
                },
                openWidget_CONFIG: {},
                closeWidget_CONFIG: {
                    silent: false
                },
                ajax_CONFIG: {
                    method: "get",
                    cache: false,
                    timeout: 30,
                    dataType: "json",
                    charset: "utf-8",
                    report: true,
                    returnAll: false
                },
                download_CONFIG: {
                    report: true,
                    cache: true,
                    allowResume: true
                },
                imageCache_CONFIG: {
                    policy: "cache_else_network",
                    thumbnail: true
                },
                notification_CONFIG: {
                    vibrate: [500, 500],
                    sound: "default",
                    light: false
                },
                startLocation_CONFIG: {
                    accuracy: "100m",
                    filter: 1.0,
                    autoStop: true
                },
                alert_CONFIG: {
                    buttons: ["确定"]
                },
                showProgress_CONFIG: {
                    style: 'default',
                    animationType: 'zoom',
                    title: '加载中',
                    text: '请稍后...',
                    modal: false
                },
                setRefreshHeaderInfo_CONFIG: {
                    visible: true,
                    loadingImg: 'widget://image/refresh.png',
                    bgColor: '#f1f1f1',
                    textColor: '#999',
                    textDown: '下拉可以刷新...',
                    textUp: '松开可以刷新...',
                    textLoading: '加载中...',
                    showTime: true
                },
                getPicture_CONFIG: {
                    sourceType: "library",
                    encodingType: "png",
                    mediaValue: "pic",
                    destinationType: "url",
                    allowEdit: false,
                    quality: 50,
                    videoQuality: "medium",
                    saveToPhotoAlbum: false
                }
            },
            // ######################### 方法
            openWin: function (winName, winUrl, winPageParam, options) {
                var that = this;
                var o = {};
                o.name = winName;
                o.url = winUrl;
                o.pageParam = that.isObject(winPageParam) ? winPageParam : {};

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openWin_CONFIG, o, options);

                if (that.isAPICloud()) {
                    api.openWin(opt);
                }
                else {
                    if (parent && parent.window) {
                        parent.window.location = winUrl;
                    }
                    else {
                        window.location = winUrl;
                    }
                }

            },
            closeWin: function (winName, options) {
                var that = this;
                var o = {};
                if (winName) {
                    o.name = winName;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.closeWin_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.closeWin(opt);
                }
                else {
                    try {
                        parent.window.history.go(-1);
                    } catch (e) {
                        window.history.go(-1);
                    }
                }
            },
            closeToWin: function (winName, options) {
                var that = this;
                var o = {};
                winName = (!winName) ? "root" : winName;
                o.name = winName;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.closeToWin_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.closeToWin(opt);
                }
            },
            setWinAttr: function (options) {
                var that = this;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.setWinAttr_CONFIG, options);
                if (that.isAPICloud()) {
                    api.setWinAttr(opt)
                }
            },
            openFrame: function (frameName, frameUrl, framePageParam, options) {
                var that = this;
                var o = {};
                o.name = frameName;
                o.url = frameUrl;
                o.pageParam = that.isObject(framePageParam) ? framePageParam : {};

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, o, options);

                if (that.isAPICloud()) {
                    api.openFrame(opt);
                }
                else {
                    // 判断是否已经存在iframe了，ID为H-frame
                    if (that.Ds("#H-frame") && that.Ds("#H-frame").length > 0) {
                        that.D("#H-frame").setAttribute("src", frameUrl);
                        return;
                    }

                    var iframeHtml = '<iframe id="H-frame"  src="' + frameUrl + '" class="H-position-absolute H-vertical-top-0 H-horizontal-right-0 H-vertical-bottom-0 H-horizontal-left-0 H-width-100-percent H-height-100-percent H-z-index-100" frameborder="0" scrolling="yes"></iframe>';
                    // 判断是否有H-main了
                    if (that.Ds(".H-main") && that.Ds(".H-main").length > 0) {
                        that.addClass(that.D(".H-main"), "H-position-relative H-overflow-scrolling");
                        that.D(".H-main").innerHTML = iframeHtml;
                    }
                    else {
                        var html = '<div class="H-main H-flex-item H-position-relative H-overflow-scrolling">';
                        html += iframeHtml;
                        html += '</div>';
                        if (that.hasClass(document.body, "H-flexbox-vertical") == false) {
                            that.addClass(document.body, "H-flexbox-vertical");
                        }

                        if (that.Ds(".H-header") && that.Ds(".H-header").length > 0) {
                            that.after(that.Ds(".H-header")[that.Ds(".H-header").length - 1], null, html);
                        }
                        else {
                            that.prepend("body", "html", html);
                        }
                    }
                }
            },
            closeFrame: function (frameName) {
                var that = this;

                var o = {};
                if (frameName) {
                    o.name = frameName;
                }
                if (that.isAPICloud()) {
                    api.closeFrame(o);
                }
            },
            setFrameAttr: function (frameName, hidden, options) {
                var that = this;
                var o = {};
                o.name = frameName;
                if (that.isTargetType(hidden, "boolean")) {
                    o.hidden = hidden;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.setFrameAttr_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.setFrameAttr(opt);
                }
            },
            bringFrameToFront: function (fromFrameName, toFrameName) {
                var that = this;

                var o = {};
                o.from = fromFrameName;

                if (toFrameName) {
                    o.to = toFrameName;
                }
                if (that.isAPICloud()) {
                    api.bringFrameToFront(o);
                }
            },
            sendFrameToBack: function (fromFrameName, toFrameName) {
                var that = this;
                var o = {};
                o.from = fromFrameName;

                if (toFrameName) {
                    o.to = toFrameName;
                }
                if (that.isAPICloud()) {
                    api.sendFrameToBack(o);
                }
            },
            setFrameClient: function (callback, frameName) {
                var that = this;
                if (that.isAPICloud()) {
                    api.setFrameClient({
                        frameName: frameName
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            animation: function (callback, frameName, options) {
                var that = this;
                var o = {};
                if (frameName) {
                    o.name = frameName;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.animation_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.animation(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            openFrameGroup: function (callback, groupName, frames, index, options) {
                var that = this;
                var o = {};
                o.name = groupName;
                o.index = Math.abs(that.isNumber(index) ? Number(index) : 0);

                if (!that.isArray(frames)) {
                    console.error("只接收frame对象数组");
                }
                if (frames.length == 0) {
                    console.error("frame对象数组至少要有一个frame对象");
                }

                // 移除frame的rect
                var _frames = [];
                for (var i = 0; i < frames.length; i++) {
                    var _frame = frames[i];
                    var tempFrame = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, _frame);
                    delete tempFrame['rect'];
                    _frames.push(tempFrame);
                }
                o.frames = _frames;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openFrameGroup_CONFIG, o, options);

                if (that.isAPICloud()) {
                    api.openFrameGroup(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
                else {
                    // 判断是否已经存在iframe了，ID为H-frame
                    if (that.Ds("#H-frame") && that.Ds("#H-frame").length > 0) {
                        that.D("#H-frame").setAttribute("src", frames[0].url);
                        return;
                    }

                    var iframeHtml = '<iframe id="H-frame" src="' + frames[0].url + '" class="H-position-absolute H-vertical-top-0 H-horizontal-right-0 H-vertical-bottom-0 H-horizontal-left-0 H-width-100-percent H-height-100-percent H-z-index-100" frameborder="0" scrolling="yes"></iframe>';
                    // 判断是否有H-main了
                    if (that.Ds(".H-main") && that.Ds(".H-main").length > 0) {
                        that.addClass(that.D(".H-main"), "H-position-relative H-overflow-hidden H-overflow-scrolling");
                        that.D(".H-main").innerHTML = iframeHtml;
                    }
                    else {
                        var html = '<div class="H-main H-flex-item H-position-relative H-overflow-hidden H-overflow-scrolling">';
                        html += iframeHtml;
                        html += '</div>';
                        if (that.hasClass(document.body, "H-flexbox-vertical") == false) {
                            that.addClass(document.body, "H-flexbox-vertical");
                        }
                        if (that.Ds(".H-header") && that.Ds(".H-header").length > 0) {
                            that.after(that.Ds(".H-header")[that.Ds(".H-header").length - 1], null, html);
                        }
                        else {
                            that.prepend("body", "html", html);
                        }
                    }
                }
            },
            closeFrameGroup: function (groupName) {
                var that = this;
                if (that.isAPICloud()) {
                    api.closeFrameGroup({
                        name: groupName
                    });
                }
            },
            setFrameGroupAttr: function (groupName, hidden, options) {
                var that = this;
                var o = {};
                o.name = groupName;
                if (that.isTargetType(hidden, "boolean")) {
                    o.hidden = hidden;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.setFrameGroupAttr_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.setFrameGroupAttr(opt);
                }
            },
            setFrameGroupIndex: function (groupName, index, isScroll, options) {
                var that = this;
                var o = {};
                o.name = groupName;
                o.index = Math.abs(that.isNumber(index) ? Number(index) : 0);
                if (that.isTargetType(isScroll, "boolean")) {
                    o.scroll = isScroll;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.setFrameGroupIndex_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.setFrameGroupIndex(opt);
                }
            },
            openPopoverWin: function (popoverWinName, popoverWinUrl, popoverWinpageParam, options) {
                var that = this;
                var o = {};
                o.name = popoverWinName;
                o.url = popoverWinUrl;
                o.pageParam = that.isObject(popoverWinpageParam) ? popoverWinpageParam : {};

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openPopoverWin_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.openPopoverWin(opt);
                }
            },
            closePopoverWin: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.closePopoverWin();
                }
            },
            openSlidLayout: function (callback, fixedPane, slidPane, options) {
                var that = this;
                var o = {};

                if (that.isObject(fixedPane) == false) {
                    console.error("fixedPane必须是frame对象");
                }
                if (that.isObject(slidPane) == false) {
                    console.error("slidPane必须是frame对象");
                }

                var _fixedPane = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, fixedPane);
                delete _fixedPane['rect'];
                o.fixedPane = _fixedPane;

                var _slidPane = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, slidPane);
                delete _slidPane['rect'];
                o.slidPane = _slidPane;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openSlidLayout_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.openSlidLayout(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            openSlidPane: function (type) {
                var that = this;
                var typeArr = ["left", "right", "all"];
                type = that.isString(type) ? type : "left";
                type = typeArr.indexOf(type) > -1 ? type : "left";

                if (that.isAPICloud()) {
                    api.openSlidPane({
                        type: type
                    });
                }
            },
            closeSlidPane: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.closeSlidPane();
                }
            },
            lockSlidPane: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.lockSlidPane();
                }
            },
            unlockSlidPane: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.unlockSlidPane();
                }
            },
            openDrawerLayout: function (drawerName, drawerUrl, leftPane, rightPane, drawerPageParam, options) {
                var that = this;
                var o = {};
                o.name = drawerName;
                o.url = drawerUrl;

                if (leftPane) {
                    if (that.isObject(leftPane) == false) {
                        console.error("leftPane必须是frame对象");
                    }
                    var _leftPane = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, leftPane);
                    delete _leftPane['rect'];
                    o.leftPane = _leftPane;
                }

                if (rightPane) {
                    if (that.isObject(rightPane) == false) {
                        console.error("leftPane必须是frame对象");
                    }
                    var _rightPane = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, rightPane);
                    delete _rightPane['rect'];
                    o.rightPane = _rightPane;
                }

                o.pageParam = that.isObject(drawerPageParam) ? drawerPageParam : {};

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openDrawerLayout_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.openDrawerLayout(opt);
                }
            },
            openDrawerPane: function (type) {
                var that = this;
                var typeArr = ["left", "right"];
                type = that.isString(type) ? type : "left";
                type = typeArr.indexOf(type) > -1 ? type : "left";
                if (that.isAPICloud()) {
                    api.openDrawerPane({
                        type: type
                    });
                }
            },
            closeDrawerPane: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.closeDrawerPane();
                }
            },
            execScript: function (winName, frameName, script) {
                var that = this;
                script = that.isString(script) ? script : "();";
                if (that.isAPICloud()) {
                    if (winName) {
                        if (frameName) {
                            api.execScript({
                                name: winName,
                                frameName: frameName,
                                script: script
                            });
                        } else {
                            api.execScript({
                                name: winName,
                                script: script
                            });
                        }
                    } else {
                        api.execScript({
                            frameName: frameName,
                            script: script
                        });
                    }
                }
            },
            historyBack: function (callback, frameName) {
                var that = this;
                if (that.isAPICloud()) {
                    api.historyBack({
                        frameName: frameName
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            historyForward: function (callback, frameName) {
                var that = this;
                if (that.isAPICloud()) {
                    api.historyForward({
                        frameName: frameName
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            pageUp: function (callback, isTop) {
                var that = this;

                isTop = that.isTargetType(isTop, "boolean") ? isTop : false;
                if (that.isAPICloud()) {
                    api.pageUp({
                        top: isTop
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            pageDown: function (callback, isBottom) {
                var that = this;

                isBottom = that.isTargetType(isBottom, "boolean") ? isBottom : false;
                if (that.isAPICloud()) {
                    api.pageDown({
                        bottom: isBottom
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            removeLaunchView: function (options) {
                var that = this;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.removeLaunchView_CONFIG, options);
                if (that.isAPICloud()) {
                    api.removeLaunchView(opt);
                }
            },
            parseTapmode: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.parseTapmode();
                }
            },
            installApp: function (appUri) {
                var that = this;
                if (that.isAPICloud()) {
                    api.installApp({
                        appUri: appUri
                    });
                }
            },
            appInstalled: function (callback, appBundle) {
                var that = this;
                if (that.isAPICloud()) {
                    api.appInstalled({
                        appBundle: appBundle
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            openApp: function (callback, url, appParam, options) {
                var that = this;
                var o = {};

                if (that.systemType == "ios") {
                    if (url) {
                        o.iosUrl = url;
                    }
                    if (that.isObject(appParam)) {
                        o.appParam = appParam;
                    }
                } else {
                    if (url) {
                        o.uri = url;
                    }
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openApp_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.openApp(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            rebootApp: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.rebootApp();
                }
            },
            openWidget: function (callback, wgtID, wgtParam, options) {
                var that = this;
                var o = {};
                o.id = wgtID;
                if (that.isObject(wgtParam)) {
                    o.wgtParam = wgtParam;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openWidget_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.openWidget(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            closeWidget: function (wgtID, returnData, options) {
                var that = this;
                var o = {};
                if (wgtID) {
                    o.id = wgtID;
                }
                if (that.isObject(returnData)) {
                    o.retData = returnData;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.closeWidget_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.closeWidget(opt);
                }
            },
            ajax: function (callback, url, method, data, dataType, options) {
                var that = this;
                var o = {};
                o.url = url;
                o.method = method ? method : "get";
                o.dataType = dataType ? dataType : "json";
                if (that.isObject(data) && o.method == "post") {
                    o.data = data;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.ajax_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.ajax(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            cancelAjax: function (tag) {
                var that = this;
                if (that.isAPICloud()) {
                    api.cancelAjax({
                        tag: tag
                    });
                }
            },
            download: function (callback, url, savePath, options) {
                var that = this;
                var o = {};
                o.url = url;
                if (savePath) {
                    o.savePath = savePath;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.download_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.download(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            cancelDownload: function (url) {
                if (that.isAPICloud()) {
                    api.cancelDownload({
                        url: url
                    });
                }
            },
            imageCache: function (callback, url, options) {
                var that = this;
                var o = {};
                o.url = url;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.imageCache_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.imageCache(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            readFile: function (callback, path) {
                var that = this;
                if (that.isAPICloud()) {
                    api.readFile({
                        path: path
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            writeFile: function (callback, path, data, isAppend) {
                var that = this;

                isAppend = that.isTargetType(isAppend, "boolean") ? isAppend : false;
                if (that.isObject(data)) {
                    data = JSON.stringify(data);
                }
                if (that.isAPICloud()) {
                    api.writeFile({
                        path: path,
                        data: data,
                        append: isAppend
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            setPrefs: function (callback, key, value) {
                var that = this;

                if (that.isObject(value)) {
                    value = JSON.stringify(value);
                }
                if (that.isAPICloud()) {
                    api.setPrefs({
                        key: key,
                        value: value
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            getPrefs: function (callback, key) {
                var that = this;
                if (that.isAPICloud()) {
                    api.getPrefs({
                        key: key
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            removePrefs: function (callback, key) {
                var that = this;
                if (that.isAPICloud()) {
                    api.removePrefs({
                        key: key
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            clearCache: function (callback, timeThreshold) {
                var that = this;

                timeThreshold = Math.abs(that.isNumber(timeThreshold) ? Number(timeThreshold) : 0);
                if (that.isAPICloud()) {
                    api.clearCache({
                        timeThreshold: timeThreshold
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            getCacheSize: function (callback) {
                var that = this;
                if (that.isAPICloud()) {
                    api.getCacheSize(function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            getFreeDiskSpace: function (callback) {
                var that = this;
                if (that.isAPICloud()) {
                    api.getFreeDiskSpace(function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            loadSecureValue: function (callback, key) {
                var that = this;
                if (that.isAPICloud()) {
                    api.loadSecureValue({
                        key: key
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            removeEventListener: function (name) {
                var that = this;
                if (that.isAPICloud()) {
                    api.removeEventListener({
                        name: name
                    });
                }
            },
            sendEvent: function (name, extra) {
                var that = this;

                if (extra) {
                    extra = that.isObject(extra) ? extra : {};
                }
                if (that.isAPICloud()) {
                    api.sendEvent({
                        name: name,
                        extra: extra
                    });
                }
            },
            accessNative: function (callback, name, extra) {
                var that = this;

                if (extra) {
                    extra = that.isObject(extra) ? extra : {};
                }

                if (that.isAPICloud()) {
                    api.accessNative({
                        name: name,
                        extra: extra
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            notification: function (callback, notify, alarm, options) {
                var that = this;
                var o = {};

                if (notify) {
                    if (that.isObject(notify) == false) {
                        console.error("notify必须是Json对象");
                    }
                    o.notify = notify;
                }

                if (alarm) {
                    if (that.isObject(alarm) == false) {
                        console.error("alarm必须是Json对象");
                    }
                    o.alarm = alarm;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.notification_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.notification(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            cancelNotification: function (id) {
                var that = this;
                if (that.isAPICloud()) {
                    api.cancelNotification({
                        id: id
                    });
                }
            },
            startLocation: function (callback, isAutoStop) {
                var that = this;
                isAutoStop = that.isTargetType(isAutoStop, "boolean") ? isAutoStop : true;

                var o = {};
                o.autoStop = isAutoStop;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.startLocation_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.startLocation(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            stopLocation: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.stopLocation();
                }
            },
            getLocation: function (callback) {
                var that = this;
                if (that.isAPICloud()) {
                    api.getLocation(function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            startSensor: function (callback, type) {
                var that = this;
                if (that.isAPICloud()) {
                    api.startSensor({
                        type: type
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            stopSensor: function (type) {
                var that = this;
                if (that.isAPICloud()) {
                    api.stopSensor({
                        type: type
                    });
                }
            },
            call: function (type, number) {
                var that = this;
                type = that.isString(type) ? type : "tel_prompt";
                if (that.isAPICloud()) {
                    api.call({
                        type: type,
                        number: number
                    });
                }
            },
            sms: function (callback, numbers, text, silent) {
                var that = this;
                silent = that.isTargetType(silent, "boolean") ? silent : false;

                if (!that.isArray(numbers)) {
                    console.error("只接收字符串数组");
                }
                if (numbers.length == 0) {
                    console.error("字符串数组至少要有一个字符串号码");
                }
                if (that.isAPICloud()) {
                    api.sms({
                        numbers: numbers,
                        text: text,
                        silent: silent
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            mail: function (callback, recipients, subject, body, attachments) {
                var that = this;

                var o = {};
                o.recipients = recipients;
                o.subject = subject;
                o.body = body;
                if (attachments) {
                    if (!that.isArray(numbers)) {
                        console.error("只接收字符串数组");
                    }
                    if (numbers.length == 0) {
                        console.error("字符串数组至少要有一个附件路径");
                    }

                    o.attachments = attachments;
                }
                if (that.isAPICloud()) {
                    api.mail(o, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            openContacts: function (callback) {
                var that = this;
                if (that.isAPICloud()) {
                    api.openContacts(function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            setFullScreen: function (isFullScreen) {
                var that = this;
                isFullScreen = that.isTargetType(isFullScreen, "boolean") ? isFullScreen : true;
                if (that.isAPICloud()) {
                    api.setFullScreen({
                        fullScreen: isFullScreen
                    });
                }
            },
            setStatusBarStyle: function (iosStyle, androidColor) {
                var that = this;
                var o = {};
                if (that.systemType == "ios" && iosStyle) {
                    o.style = iosStyle;
                }
                if (that.systemType == "android" && androidColor) {
                    o.color = androidColor;
                }
                if (that.isAPICloud()) {
                    api.setStatusBarStyle(o);
                }
            },
            setScreenOrientation: function (orientation) {
                var that = this;
                if (that.isAPICloud()) {
                    api.setScreenOrientation({
                        orientation: orientation
                    });
                }
            },
            setKeepScreenOn: function (isKeepOn) {
                var that = this;
                isKeepOn = that.isTargetType(isKeepOn, "boolean") ? isKeepOn : true;
                if (that.isAPICloud()) {
                    api.setKeepScreenOn({
                        keepOn: isKeepOn
                    });
                }
            },
            toLauncher: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.toLauncher();
                }
            },
            setScreenSecure: function (isSecure) {
                var that = this;
                isSecure = that.isTargetType(isSecure, "boolean") ? isSecure : true;
                if (that.isAPICloud()) {
                    api.setScreenSecure({
                        secure: isSecure
                    });
                }
            },
            setAppIconBadge: function (badge) {
                var that = this;

                badge = Math.abs(that.isNumber(badge) ? Number(badge) : 0);
                if (that.isAPICloud()) {
                    api.setAppIconBadge({
                        badge: badge
                    });
                }
            },
            getPhoneNumber: function (callback) {
                var that = this;
                if (that.isAPICloud()) {
                    api.getPhoneNumber(function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            alert: function (callback, msg, title, buttons) {
                var that = this;

                if ((!that.isFunction(arguments[0])) && (arguments[0])) {
                    msg = arguments[0];
                }
                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;

                // 设置提示标题为App名称
                title = title ? title : that.appName;
                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            var _tmp = [];
                            _tmp.push(buttons[0]);
                            buttons = _tmp;
                        } else {
                            buttons = ["确定"];
                        }
                    } else {
                        var _tmp = [];
                        _tmp.push(buttons[0]);
                        buttons = _tmp;
                    }
                } else {
                    buttons = ["确定"];
                }
                if (that.isAPICloud()) {
                    api.alert({
                        title: title,
                        msg: msg,
                        buttons: buttons
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
                else {
                    that.alertTip(callback, msg, title, buttons);
                }
            },
            confirm: function (callback, title, msg, buttons) {
                var that = this;
                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;
                title = title ? title : "你确定要执行此操作吗？";
                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            buttons = ["取消"].pop(buttons);
                        } else {
                            buttons = ["确定", "取消"];
                        }
                    } else {
                        var _buttons = [];
                        if (buttons.length == 0) {
                            _buttons = ["确定", "取消"];
                        } else if (buttons.length == 1) {
                            _buttons.push(buttons[0]);
                            _buttons.push("取消");
                        } else if (buttons.length == 2) {
                            _buttons.push(buttons[0]);
                            _buttons.push(buttons[1]);
                        } else {
                            _buttons.push(buttons[0]);
                            _buttons.push(buttons[1]);
                            _buttons.push(buttons[2]);
                        }
                        buttons = _buttons;
                    }
                } else {
                    buttons = ["确定", "取消"];
                }
                if (that.isAPICloud()) {
                    api.confirm({
                        title: title,
                        msg: msg,
                        buttons: buttons
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
                else {
                    that.confirmTip(callback, title, msg, buttons);
                }
            },
            prompt: function (callback, title, msg, text, type, buttons) {
                var that = this;
                msg = msg ? msg : "请输入值...";
                title = title ? title : "请输入数据后再操作";
                type = type ? type : "text";
                text = text ? text : "";

                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            buttons = ["取消"].pop(buttons);
                        } else {
                            buttons = ["确定", "取消"];
                        }
                    } else {
                        var _buttons = [];
                        if (buttons.length == 0) {
                            _buttons = ["确定", "取消"];
                        } else if (buttons.length == 1) {
                            _buttons.push(buttons[0]);
                            _buttons.push("取消");
                        } else if (buttons.length == 2) {
                            _buttons.push(buttons[0]);
                            _buttons.push(buttons[1]);
                        } else {
                            _buttons.push(buttons[0]);
                            _buttons.push(buttons[1]);
                            _buttons.push(buttons[2]);
                        }
                        buttons = _buttons;
                    }
                } else {
                    buttons = ["确定", "取消"];
                }
                if (that.isAPICloud()) {
                    api.prompt({
                        title: title,
                        msg: msg,
                        text: text,
                        type: type,
                        buttons: buttons
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
                else {
                    that.promptTip(callback, title, msg, text, type, buttons);
                }
            },
            actionSheet: function (callback, title, buttons, cancelTitle, destructiveTitle, style) {
                var that = this;
                var o = {};

                o.title = title ? title : "请选择你要操作的项";
                o.cancelTitle = cancelTitle ? cancelTitle : "取消";
                if (destructiveTitle) {
                    o.destructiveTitle = destructiveTitle;
                }
                if (that.isObject(style)) {
                    o.style = style;
                }

                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            buttons = [].push(buttons);
                        } else {
                            buttons = ["确定"];
                        }
                    } else {
                        if (buttons.length == 0) {
                            buttons = ["确定"];
                        }
                    }
                } else {
                    buttons = ["确定"];
                }

                o.buttons = buttons;
                if (that.isAPICloud()) {
                    api.actionSheet(o, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
                else {
                    that.actionSheetTip(callback, title, buttons, cancelTitle, destructiveTitle, style);
                }
            },
            showProgress: function (title, text, isModal, options) {
                var that = this;
                var o = {};
                o.modal = that.isTargetType(isModal, "boolean") ? isModal : false;
                if (title) {
                    o.title = title;
                }
                if (text) {
                    o.text = text;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.showProgress_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.showProgress(opt);
                }
            },
            hideProgress: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.hideProgress();
                }
            },
            toast: function (callback, msg, duration, location, global) {
                var that = this;

                if ((!that.isFunction(arguments[0])) && (arguments[0])) {
                    msg = arguments[0];
                }

                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;
                duration = Math.abs(that.isNumber(duration) ? Number(duration) : 2000);
                global = that.isBoolean(global) ? global : false;

                var locationArr = ["top", "middle", "bottom"];
                location = location ? location : "bottom";
                location = locationArr.indexOf(location) > -1 ? location : "bottom";

                if (that.isAPICloud()) {
                    api.toast({
                        msg: msg,
                        duration: duration,
                        location: location,
                        global: global
                    });
                    if (that.isFunction(callback)) {
                        setTimeout(function () {
                            callback();
                        }, duration);
                    }
                }
                else {
                    that.toastTip(callback, msg, duration, location);
                }
            },
            openPicker: function (callback, type, date, title) {
                var that = this;
                var o = {};
                var typeArr = ["date", "time", "date_time"];
                type = type ? type : "date_time";
                o.type = typeArr.indexOf(type) > -1 ? type : "date";

                o.title = that.isString(title) ? title : "选择时间";

                if (date) {
                    o.date = date;
                }
                if (that.isAPICloud()) {
                    api.openPicker(o, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            setRefreshHeaderInfo: function (callback, options) {
                var that = this;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.setRefreshHeaderInfo_CONFIG, options);
                if (that.isAPICloud()) {
                    api.setRefreshHeaderInfo(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            setCustomRefreshHeaderInfo: function (callback, options) {
                var that = this;

                options = options || {};
                if (that.isAPICloud()) {
                    api.setCustomRefreshHeaderInfo(options, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            refreshHeaderLoading: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.refreshHeaderLoading();
                }
            },
            refreshHeaderLoadDone: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.refreshHeaderLoadDone();
                }
            },
            showFloatBox: function (iconPath, duration) {
                var that = this;

                iconPath = iconPath ? iconPath : 'widget://image/icon.png';
                duration = Math.abs(that.isNumber(duration) ? Number(duration) : 5000);
                if (that.isAPICloud()) {
                    api.showFloatBox({
                        iconPath: iconPath,
                        duration: duration
                    });
                }
            },
            getPicture: function (callback, sourceType, mediaValue, destinationType, options) {
                var that = this;
                var o = {};
                var sourceTypeArr = ["library", "camera", "album"];
                sourceType = sourceType ? sourceType : "library";
                o.sourceType = sourceTypeArr.indexOf(sourceType) > -1 ? sourceType : "library";

                var mediaValueArr = ["pic", "video", "all"];
                mediaValue = mediaValue ? mediaValue : "pic";
                o.mediaValue = mediaValueArr.indexOf(mediaValue) > -1 ? mediaValue : "pic";

                var destinationTypeArr = ["base64", "url"];
                destinationType = destinationType ? destinationType : "url";
                o.destinationType = destinationTypeArr.indexOf(destinationType) > -1 ? destinationType : "url";

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.getPicture_CONFIG, o, options);
                if (that.isAPICloud()) {
                    api.getPicture(opt, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            saveMediaToAlbum: function (callback, path) {
                var that = this;
                if (that.isAPICloud()) {
                    api.saveMediaToAlbum({
                        path: path
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            startRecord: function (path) {
                var that = this;
                if (that.isAPICloud()) {
                    api.startRecord({
                        path: path
                    });
                }
            },
            stopRecord: function (callback) {
                var that = this;
                if (that.isAPICloud()) {
                    api.stopRecord(function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            startPlay: function (path, callback) {
                var that = this;
                if (that.isAPICloud()) {
                    api.startPlay({
                        path: path
                    }, function (ret, err) {
                        if (that.isFunction(callback)) {
                            callback(ret, err);
                        }
                    });
                }
            },
            stopPlay: function () {
                var that = this;
                if (that.isAPICloud()) {
                    api.stopPlay();
                }
            },
            openVideo: function (url) {
                var that = this;
                if (that.isAPICloud()) {
                    api.openVideo({
                        url: url
                    });
                }
            },
            ready: function (callback) {
                var that = this;
                var host = window.location.host;
                var path = window.location.href;
                if (that.isWebView()) {
                    apiready = function () {
                        if (that.isFunction(callback)) {
                            callback();
                        }
                    };
                }
                else {
                    window.onload = function () {
                        if (that.isFunction(callback)) {
                            callback();
                        }
                    }
                }
            },
            require: function (modules) {
                var that = this;
                if (that.isAPICloud()) {
                    if (that.isArray(modules)) {
                        if (modules.length > 0) {
                            for (var i = 0; i < modules.length; i++) {
                                if (modules) {
                                    (that.M)[modules[i]] = api.require(modules[i]);
                                }
                            }
                        }
                    } else if (that.isString(modules)) {
                        if (modules.indexOf(",") > -1) {

                            var tempAttr = modules.split(",");
                            for (var i = 0; i < tempAttr.length; i++) {
                                if (tempAttr) {
                                    (that.M)[tempAttr[i]] = api.require(tempAttr[i]);
                                }
                            }
                        } else {
                            (that.M)[modules] = api.require(modules);
                        }
                    }
                }
            },
            // ######################### 常用APICloud语法糖
            openFrameNavOrFoot: function (frameName, frameUrl, headerSelector, framePageParam, footerSelector, options) {
                var that = this;

                var footerOffset = that.offset(footerSelector);
                that.fixStatusBar(function (offset) {
                    var _options = {
                        rect: {
                            x: 0,
                            y: offset.h,
                            h: that.winHeight - offset.h - footerOffset.h,
                            w: that.winWidth
                        }
                    };

                    options = options || {};
                    var opt = that.extendObj(_options, options);
                    that.openFrame(frameName, frameUrl, framePageParam, opt);

                }, headerSelector);
            },
            openFrameGroupNavOrFoot: function (callback, groupName, frames, index, headerSelector, footerSelector, options) {
                var that = this;
                var footerOffset = that.offset(footerSelector);
                that.fixStatusBar(function (offset) {
                    options = options || {};
                    options.rect = {
                        x: 0,
                        y: offset.h,
                        h: that.winHeight - offset.h - footerOffset.h,
                        w: that.winWidth
                    };
                    that.openFrameGroup(callback, groupName, frames, index, options);
                }, headerSelector);
            },
            openBrowser: function (url, appParam) {
                var that = this;

                that.openApp(null, url, appParam);
            },
            dblclickToCloseApp: function (callback) {
                var that = this;

                var mkeyTime = new Date().getTime();
                that.keyback(function (ret, err) {
                    if ((new Date().getTime() - mkeyTime) > 2000) {
                        mkeyTime = new Date().getTime();
                        that.toast(null, '再按一次退出' + that.appName, 2000);
                    } else {
                        if (that.isFunction(callback)) {
                            callback();
                        }
                        setTimeout(function () {
                            that.closeWidget(null, null, {
                                silent: true
                            });
                        }, 300);
                    }
                });
            },
            openFrameIndexByClick: function (framesOptionsWithHeaderSelector, hideHeaderClassName, footerSelector, triggerSelectorByFooter, triggerActiveClasses, defaultIndex) {
                var that = this;
                defaultIndex = that.isNumber(defaultIndex) ? Math.abs(defaultIndex) : 0;
                // 内部切换
                function swiperPage(_index) {
                    // 显示对应的头部和底部高亮样式
                    if (framesOptionsWithHeaderSelector && framesOptionsWithHeaderSelector.length > 0) {
                        var currentFrame = null;
                        var openedFrameArr = [];
                        for (var i = 0; i < framesOptionsWithHeaderSelector.length; i++) {
                            currentFrame = framesOptionsWithHeaderSelector[i];
                            if (_index == i) {
                                that.removeClass(that.D(currentFrame.header), hideHeaderClassName);
                                that.addClass(that.D(footerSelector + " " + triggerSelectorByFooter + ":nth-child(" + (i + 1) + ")"), triggerActiveClasses);

                                if (openedFrameArr.indexOf(currentFrame.name) > -1) {
                                    that.setFrameAttr(currentFrame.name, false);
                                }
                                else {
                                    that.openFrameNavOrFoot(currentFrame.name, currentFrame.url, currentFrame.header, that.pageParam, footerSelector, currentFrame);
                                    openedFrameArr.push(currentFrame.name);
                                }
                            }
                            else {
                                that.setFrameAttr(currentFrame.name, true);
                                that.addClass(that.D(currentFrame.header), hideHeaderClassName);
                                that.removeClass(that.D(footerSelector + " " + triggerSelectorByFooter + ":nth-child(" + (i + 1) + ")"), triggerActiveClasses);
                            }
                        }
                    }
                }

                swiperPage(defaultIndex);

                // 绑定底部点击切换事件
                that.on(that.Ds(footerSelector + " " + triggerSelectorByFooter), "touchstart", function (event) {
                    var triggerElement = that.getParents(event.target, that.getClassOrTagName(triggerSelectorByFooter));
                    var _index = that.getIndex(triggerElement);
                    swiperPage(_index);
                });

            },
            openFrameGroupIndexByClick: function (callback, groupName, framesOptionsWithHeaderSelector, defaultIndex, isScroll, hideHeaderClassName, footerSelector, triggerSelectorByFooter, triggerActiveClasses, options) {
                var that = this;
            },
            getPictureWithCamera: function (callback, options) {
                var that = this;
                that.actionSheet(function (ret, err) {
                    switch (ret.buttonIndex) {
                        case 1:
                            that.getPicture(callback, "album", "pic", "url", options);
                            break;
                        case 2:
                            that.getPicture(callback, "camera", "pic", "url", options);
                            break;
                    }
                }, "请选择图片来源", ["相册选取", "相机拍摄"]);
            },
            // ######################### 自定义
            returnElement: function (cssSelectorOrElement) {
                var that = this;
                if (that.isElement(cssSelectorOrElement)) {
                    return cssSelectorOrElement;
                }
                else {
                    return that.D(cssSelectorOrElement);
                }
            },
            D: function (cssSelectorOrElement, parentSelectorOrElement) {
                var that = this;
                parentSelectorOrElement = parentSelectorOrElement ? parentSelectorOrElement : document;
                parentSelectorOrElement = that.isString(parentSelectorOrElement) ? document.querySelector(parentSelectorOrElement) : parentSelectorOrElement;

                return parentSelectorOrElement.querySelector(cssSelectorOrElement);
            },
            Ds: function (cssSelectorOrElement, parentSelectorOrElement) {
                var that = this;
                parentSelectorOrElement = parentSelectorOrElement ? parentSelectorOrElement : document;
                parentSelectorOrElement = that.isString(parentSelectorOrElement) ? document.querySelector(parentSelectorOrElement) : parentSelectorOrElement;

                return parentSelectorOrElement.querySelectorAll(cssSelectorOrElement);
            },
            // 根据数字返回对应键码
            getWordByIndex: function (number) {
                return String.fromCharCode(number).toLocaleUpperCase();
            },
            on: function (elements, eventType, callback, useCapture) {
                var that = this;
                useCapture = useCapture || false;
                if (that.isElements(elements)) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].addEventListener(eventType, function (event) {
                                if (that.isFunction(callback)) {
                                    callback(event);
                                }
                            }, useCapture);
                        }
                    }
                }
                else {
                    elements.addEventListener(eventType, function (event) {
                        if (that.isFunction(callback)) {
                            callback(event);
                        }
                    }, useCapture);
                }
            },
            off: function (elements, eventType, callback, useCapture) {
                var that = this;
                useCapture = useCapture || false;
                if (that.isElements(elements)) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            elements[i].removeEventListener(eventType, function (event) {
                                if (that.isFunction(callback)) {
                                    callback(event);
                                }
                            }, useCapture);
                        }
                    }
                }
                else {
                    elements.removeEventListener(eventType, function (event) {
                        if (that.isFunction(callback)) {
                            callback(event);
                        }
                    }, useCapture);
                }
            },
            one: function (elements, eventType, callback, useCapture) {
                var that = this;

                var fn = function (event) {
                    callback && callback();
                    that.off(elements, eventType, callback, useCapture);
                };

                that.on(elements, eventType, fn, useCapture);
            },
            animationEventEnd: function (cssSelectorOrElement, callback) {
                var that = this;
                var elem = that.returnElement(cssSelectorOrElement);
                that.on(elem, "webkitAnimationEnd", callback);
            },
            domLoadEventEnd: function (callback) {
                var that = this;
                that.on(document, "DOMContentLoaded", callback);
            },
            domInsertedEvent: function (callback) {
                var that = this;
                that.on(document, "DOMNodeInserted", callback);
            },
            domModifiedEvent: function (callback) {
                var that = this;
                that.on(document, "DOMAttrModified", callback);
            },
            domRemovedEvent: function (callback) {
                var that = this;
                that.on(document, "DOMNodeRemoved", callback);
            },
            // 返回滑动的角度
            // dx表示开始的pageX减去结束的pageX
            // dy表示开始的pageY减去结束的pageY
            GetSlideAngle: function (dx, dy) {
                return Math.atan2(dy, dx) * 180 / Math.PI;
            },
            //根据起点和终点返回方向 1：向上，2：向下，3：向左，4：向右,0：未滑动
            GetSlideDirection: function (startX, startY, endX, endY) {
                var that = this;

                var dy = startY - endY;
                var dx = endX - startX;
                var result = 0;
                //如果滑动距离太短
                if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
                    return result;
                }
                var angle = that.GetSlideAngle(dx, dy);
                if (angle >= -45 && angle < 45) {
                    result = 4;
                } else if (angle >= 45 && angle < 135) {
                    result = 1;
                } else if (angle >= -135 && angle < -45) {
                    result = 2;
                }
                else if ((angle >= 135 && angle <= 180) || (angle >= -180 && angle < -135)) {
                    result = 3;
                }
                return result;
            },
            prepend: function (cssSelectorOrElement, parentSelectorOrElement, htmlOrElement) {
                var that = this;
                var selectors = [];

                if (that.isElements(cssSelectorOrElement)) {
                    selectors = cssSelectorOrElement;
                }
                else {
                    if (that.isElement(cssSelectorOrElement)) {
                        selectors.push(cssSelectorOrElement);
                    }
                    else {
                        selectors = that.Ds(cssSelectorOrElement, parentSelectorOrElement);
                    }
                }
                if (selectors.length > 0) {
                    for (var i = 0; i < selectors.length; i++) {
                        if (that.isElement(htmlOrElement)) {
                            selectors[i].insertAdjacentElement('afterbegin', htmlOrElement);
                        }
                        else {
                            selectors[i].insertAdjacentHTML('afterbegin', htmlOrElement);
                        }
                    }
                }
            },
            append: function (cssSelectorOrElement, parentSelectorOrElement, htmlOrElement) {
                var that = this;
                var selectors = [];

                if (that.isElements(cssSelectorOrElement)) {
                    selectors = cssSelectorOrElement;
                }
                else {
                    if (that.isElement(cssSelectorOrElement)) {
                        selectors.push(cssSelectorOrElement);
                    }
                    else {
                        selectors = that.Ds(cssSelectorOrElement, parentSelectorOrElement);
                    }
                }
                if (selectors.length > 0) {
                    for (var i = 0; i < selectors.length; i++) {
                        if (that.isElement(htmlOrElement)) {
                            selectors[i].insertAdjacentElement('beforeend', htmlOrElement);
                        }
                        else {
                            selectors[i].insertAdjacentHTML('beforeend', htmlOrElement);
                        }
                    }
                }
            },
            before: function (cssSelectorOrElement, parentSelectorOrElement, htmlOrElement) {
                var that = this;
                var selectors = [];

                if (that.isElements(cssSelectorOrElement)) {
                    selectors = cssSelectorOrElement;
                }
                else {
                    if (that.isElement(cssSelectorOrElement)) {
                        selectors.push(cssSelectorOrElement);
                    }
                    else {
                        selectors = that.Ds(cssSelectorOrElement, parentSelectorOrElement);
                    }
                }
                if (selectors.length > 0) {
                    for (var i = 0; i < selectors.length; i++) {
                        if (that.isElement(htmlOrElement)) {
                            selectors[i].insertAdjacentElement('beforebegin', htmlOrElement);
                        }
                        else {
                            selectors[i].insertAdjacentHTML('beforebegin', htmlOrElement);
                        }
                    }
                }
            },
            after: function (cssSelectorOrElement, parentSelectorOrElement, htmlOrElement) {
                var that = this;
                var selectors = [];

                if (that.isElements(cssSelectorOrElement)) {
                    selectors = cssSelectorOrElement;
                }
                else {
                    if (that.isElement(cssSelectorOrElement)) {
                        selectors.push(cssSelectorOrElement);
                    }
                    else {
                        selectors = that.Ds(cssSelectorOrElement, parentSelectorOrElement);
                    }
                }
                if (selectors.length > 0) {
                    for (var i = 0; i < selectors.length; i++) {
                        if (that.isElement(htmlOrElement)) {
                            selectors[i].insertAdjacentElement('afterend', htmlOrElement);
                        }
                        else {
                            selectors[i].insertAdjacentHTML('afterend', htmlOrElement);
                        }
                    }
                }
            },
            cssValue: function (cssSelectorOrElement, propName) {
                var that = this;
                var elem = that.returnElement(cssSelectorOrElement);
                var computedStyle = window.getComputedStyle(elem, null);
                return computedStyle.getPropertyValue(propName);
            },
            getParents: function (element, className) {
                var that = this;
                var returnParentElement = null;
                function getParentNode(element, className) {
                    if (that.isElement(element)) {
                        if (element && element.classList.contains(className) && element.tagName.toLowerCase() != "body") {
                            returnParentElement = element;
                        }
                        else {
                            getParentNode(element.parentElement, className);
                        }
                    }
                }
                getParentNode(element, className);

                return returnParentElement;
            },
            cssText: function (cssSelectorOrElement, cssString, parentSelectorOrElement) {
                var that = this;
                var selectors = [];

                if (that.isElements(cssSelectorOrElement)) {
                    selectors = cssSelectorOrElement;
                }
                else {
                    if (that.isElement(cssSelectorOrElement)) {
                        selectors.push(cssSelectorOrElement);
                    }
                    else {
                        selectors = that.Ds(cssSelectorOrElement, parentSelectorOrElement);
                    }
                }
                if (selectors.length > 0) {
                    for (var i = 0; i < selectors.length; i++) {
                        selectors[i].style.cssText = cssString;
                    }
                }
            },
            siblings: function (cssSelectorOrElement) {
                var that = this;

                var elem = that.returnElement(cssSelectorOrElement);
                var r = [];
                var n = elem.parentNode.firstChild;
                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1 && n !== elem) {
                        r.push(n);
                    }
                }
                return r;
            },
            scrollToElement: function (cssSelectorOrElement, targetCssSelectorOrElement) {
                var that = this;
                var elem = that.returnElement(cssSelectorOrElement);
                var targetElem = that.returnElement(targetCssSelectorOrElement);
                elem.scrollTop = targetElem.offsetTop + document.documentElement.scrollTop;
            },
            siblingsContainSelf: function (cssSelectorOrElement) {
                var that = this;

                var elem = that.returnElement(cssSelectorOrElement);
                var r = [];
                var n = elem.parentNode.firstChild;
                for (; n; n = n.nextSibling) {
                    if (n.nodeType === 1) {
                        r.push(n);
                    }
                }
                return r;
            },
            addClass: function (elements, classs) {
                var that = this;

                if (that.isElements(elements)) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            if (classs.indexOf(',') > -1) {
                                var _classArr = classs.split(",");
                                for (var j = 0; j < _classArr.length; j++) {
                                    if (_classArr[j] != "") {
                                        elements[i].classList.add(_classArr[j]);
                                    }
                                }
                            }
                            else {
                                if (classs.indexOf(' ') > -1) {
                                    var _classArr = classs.split(" ");
                                    for (var j = 0; j < _classArr.length; j++) {
                                        if (_classArr[j] != "") {
                                            elements[i].classList.add(_classArr[j]);
                                        }
                                    }
                                }
                                else {
                                    elements[i].classList.add(classs);
                                }
                            }
                        }
                    }
                }
                else {
                    if (classs.indexOf(',') > -1) {
                        var _classArr = classs.split(",");
                        for (var i = 0; i < _classArr.length; i++) {
                            if (_classArr[i] != "") {
                                elements.classList.add(_classArr[i]);
                            }
                        }
                    }
                    else {
                        if (classs.indexOf(' ') > -1) {
                            var _classArr = classs.split(" ");
                            for (var i = 0; i < _classArr.length; i++) {
                                if (_classArr[i] != "") {
                                    elements.classList.add(_classArr[i]);
                                }
                            }
                        }
                        else {
                            elements.classList.add(classs);
                        }
                    }
                }
            },
            removeClass: function (elements, classs) {
                var that = this;

                if (that.isElements(elements)) {
                    if (elements.length > 0) {
                        for (var i = 0; i < elements.length; i++) {
                            if (classs.indexOf(',') > -1) {
                                var _classArr = classs.split(",");
                                for (var j = 0; j < _classArr.length; j++) {
                                    if (_classArr[j] != "") {
                                        elements[i].classList.remove(_classArr[j]);
                                    }
                                }
                            }
                            else {
                                if (classs.indexOf(' ') > -1) {
                                    var _classArr = classs.split(" ");
                                    for (var j = 0; j < _classArr.length; j++) {
                                        if (_classArr[j] != "") {
                                            elements[i].classList.remove(_classArr[j]);
                                        }
                                    }
                                }
                                else {
                                    elements[i].classList.remove(classs);
                                }
                            }
                        }
                    }
                }
                else {
                    if (classs.indexOf(',') > -1) {
                        var _classArr = classs.split(",");
                        for (var i = 0; i < _classArr.length; i++) {
                            if (_classArr[i] != "") {
                                elements.classList.remove(_classArr[i]);
                            }
                        }
                    }
                    else {
                        if (classs.indexOf(' ') > -1) {
                            var _classArr = classs.split(" ");
                            for (var i = 0; i < _classArr.length; i++) {
                                if (_classArr[i] != "") {
                                    elements.classList.remove(_classArr[i]);
                                }
                            }
                        }
                        else {
                            elements.classList.remove(classs);
                        }
                    }
                }
            },
            hasClass: function (cssSelectorOrElement, _class) {
                var that = this;
                var element = that.returnElement(cssSelectorOrElement);
                return element.classList.contains(_class);
            },
            getIndex: function (ele) {
                var a = [];

                if (ele && ele.nodeType && ele.nodeType == 1) {
                    var oParent = ele.parentNode;
                    var oChilds = oParent.childNodes;
                    var _childs = [];
                    for (var i = 0; i < oChilds.length; i++) {
                        if (oChilds[i] && oChilds[i].nodeType && oChilds[i].nodeType == 1) {
                            _childs.push(oChilds[i]);
                        }
                    }

                    for (var i = 0; i < _childs.length; i++) {
                        if (_childs[i] == ele) {
                            return i;
                        }
                    }
                } else {
                    return -1;
                }
            },
            offset: function (cssSelectorOrElement) {
                var that = this;
                var element = that.returnElement(cssSelectorOrElement);
                if (!that.isElement(element)) {
                    return {
                        l: 0,
                        t: 0,
                        w: 0,
                        h: 0
                    };
                } else {
                    var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
                    var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);

                    var rect = element.getBoundingClientRect();
                    return {
                        l: rect.left + sl,
                        t: rect.top + st,
                        w: element.offsetWidth,
                        h: element.offsetHeight
                    };
                }
            },
            jsonToStr: function (json) {
                var that = this;
                if (that.isObject(json)) {
                    return JSON && JSON.stringify(json);
                }
            },
            strToJson: function (str) {
                var that = this;
                if (that.isString(str)) {
                    return JSON && JSON.parse(str);
                }
            },
            uzStorage: function () {
                var ls = window.localStorage;
                if ((/android/gi).test(navigator.appVersion)) {
                    ls = os.localStorage();
                }
                return ls;
            },
            setStorage: function (key, value) {
                var that = this;
                if (arguments.length === 2) {
                    var v = value;
                    if (that.isObject(v)) {
                        v = JSON.stringify(v);
                        v = 'obj-' + v;
                    } else {
                        v = 'str-' + v;
                    }
                    var ls = that.uzStorage();
                    if (ls) {
                        ls.setItem(key, v);
                    }
                }
            },
            getStorage: function (key) {
                var that = this;

                var ls = that.uzStorage();
                if (ls) {
                    var v = ls.getItem(key);
                    if (!v) {
                        return;
                    }
                    if (v.indexOf('obj-') === 0) {
                        v = v.slice(4);
                        return JSON.parse(v);
                    } else if (v.indexOf('str-') === 0) {
                        return v.slice(4);
                    }
                }
            },
            rmStorage: function (key) {
                var that = this;

                var ls = that.uzStorage();
                if (ls && key) {
                    ls.removeItem(key);
                }
            },
            clearStorage: function () {
                var that = this;

                var ls = that.uzStorage();
                if (ls) {
                    ls.clear();
                }
            },
            fixIos7Bar: function (cssSelectorOrElement) {
                var that = this;
                var element = that.returnElement(cssSelectorOrElement);
                if (!that.isElement(element)) {
                    console.warn('没有找到DOM元素');
                }

                var strDM = that.systemType;
                if (strDM == 'ios') {
                    var strSV = that.systemVersion;
                    var numSV = parseInt(strSV, 10);
                    var fullScreen = that.fullScreen;
                    var iOS7StatusBarAppearance = that.iOS7StatusBarAppearance;
                    if (numSV >= 7 && !fullScreen && iOS7StatusBarAppearance) {
                        element.style.paddingTop = '20px';
                    }
                }
            },
            fixStatusBar: function (callback, cssSelectorOrElement) {
                var that = this;

                var element = that.returnElement(cssSelectorOrElement);
                if (!that.isElement(element)) {
                    console.error('没有找到DOM元素');
                }

                var sysType = that.systemType;
                if (sysType == 'ios') {
                    that.fixIos7Bar(element);
                } else if (sysType == 'android') {
                    var ver = that.systemVersion;
                    ver = parseFloat(ver);
                    if (ver >= 4.4) {
                        element.style.paddingTop = '25px';
                    }
                }

                var _offset = that.offset(element);
                if (that.isFunction(callback)) {
                    callback(_offset);
                }
            },
            scrollToDocButton: function () {
                var that = this;
                that.D("body").scrollTop = that.D("body").scrollHeight;
            },
            getScroll: function () {
                var t, l, w, h;
                if (document.documentElement && document.documentElement.scrollTop) {
                    t = document.documentElement.scrollTop;
                    l = document.documentElement.scrollLeft;
                    w = document.documentElement.scrollWidth;
                    h = document.documentElement.scrollHeight;
                }
                else if (document.body) {
                    t = document.body.scrollTop;
                    l = document.body.scrollLeft;
                    w = document.body.scrollWidth;
                    h = document.body.scrollHeight;
                }
                return { t: t, l: l, w: w, h: h };
            },
            // #################### 自定义UI组件
            dialogCore: function (type, title, msg, buttons) {

                var that = this;
                title = title ? title : "温馨提示：";
                var clientWidth = window.document.body.clientWidth;

                var contentHtml = "";
                contentHtml += '<div class="H-dialog H-theme-background-color-white animated zoomIn" style="-webkit-animation-duration: 0.3s; animation-duration: 0.3s;width: ' + (clientWidth - 50) + 'px; min-height: 80px;">';
                contentHtml += '<div class="H-dialog-title H-padding-10 H-font-size-16 H-line-height-normal" style="background: #f4f4f4;">' + title + '</div>';
                contentHtml += '<div class="H-dialog-content H-padding-10 H-word-break-break-all H-font-size-16 H-theme-font-color-666">' + msg + '</div>';
                contentHtml += '<div class="H-dialog-buttons H-flexbox-horizontal H-border-vertical-top-after">';

                if (buttons && buttons.length > 0) {
                    for (var i = 0; i < buttons.length; i++) {
                        if (i == (buttons.length - 1) && buttons.length > 1) {
                            contentHtml += '<div class="H-dialog-button H-flex-item H-font-size-16 H-padding-10 H-center-all H-touch-active H-theme-font-color1">' + buttons[i] + '</div>';
                        }
                        else {
                            contentHtml += '<div class="H-dialog-button H-border-horizontal-right-after H-flex-item H-font-size-16 H-padding-10 H-center-all H-touch-active H-theme-font-color1">' + buttons[i] + '</div>';
                        }
                    }
                }
                contentHtml += '</div>';
                contentHtml += '</div>';

                if (that.Ds(".H-dialog-area") && that.Ds(".H-dialog-area").length > 0) {
                    that.D(".H-dialog-area").innerHTML = contentHtml;
                }
                else {
                    var html = "";
                    html += '<div class="H-dialog-area H-display-none-important H-position-absolute H-vertical-top-0 H-center-all H-horizontal-right-0 H-vertical-bottom-0 H-horizontal-left-0 H-background-color-transparent-3" style="z-index:1234567890123">';
                    html += contentHtml;
                    html += '</div>';
                    that.prepend(document.body, null, html);
                }

                var scrollObj = that.getScroll();
                that.D(".H-dialog-area").style.height = window.innerHeight + scrollObj.t + "px";
                that.D(".H-dialog").style.marginTop = scrollObj.t + "px";

                window.onscroll = function (event) {
                    setTimeout(function () {
                        var scrollObj = that.getScroll();
                        that.D(".H-dialog-area").style.height = window.innerHeight + scrollObj.t + "px";
                        that.D(".H-dialog").style.marginTop = scrollObj.t + "px";
                    }, 10);
                };
            },
            // 下拉选择
            selectTip: function (element, items, okCallback, cancelCallback) {
                var that = this;
                if (that.Ds(".H-select-area") && that.Ds(".H-select-area").length > 0) {
                    document.body.removeChild(that.D(".H-select-area"));
                }

                var html = '<div class="H-select-area H-display-none-important H-flexbox-vertical H-background-color-transparent-3 H-position-fixed H-vertical-top-0 H-horizontal-right-0 H-horizontal-left-0 H-vertical-bottom-0 H-horizontal-right-0 H-width-100-percent H-overflow-hidden H-height-100-percent">';
                html += '<div class="H-select-space H-flex-item"></div>';
                html += '<div class="H-select-list H-flexbox-vertical H-position-relative animated flipInY">';
                html += '<div class="H-select-button H-theme-background-color-white H-height-45 H-padding-horizontal-both-10 H-font-size-16">';
                html += '<span class="H-display-inline-block H-float-left H-select-cancel">取消</span>';
                html += '<span class="H-display-inline-block H-float-right H-theme-font-color1 H-select-ok">确定</span>';
                html += '</div>';
                html += '<div class="H-select-options H-flex-item  H-theme-background-color-eee H-overflow-hidden H-position-relative">';
                html += '<div class="H-select-items">';
                if (items && items.length > 0) {
                    for (var i = 0; i < items.length; i++) {
                        html += '<div class="H-select-item H-font-size-16 H-theme-font-color-black H-center-all H-height-45">' + items[i] + '</div>';
                    }
                }
                else {
                    html += '<div class="H-select-item H-font-size-16 H-theme-font-color-black H-center-all H-height-45">请选择</div>';
                }
                html += '</div>';
                html += '<div class="H-select-check H-position-absolute H-box-sizing-border-box H-height-45 H-width-100-percent H-position-center-all"></div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';

                that.prepend(document.body, null, html);
                that.removeClass(that.D('.H-select-area'), "H-display-none-important");

                var items = that.D(".H-select-items");
                var options = that.D(".H-select-options");
                // 是否点击取消按钮
                var isCancel = false;
                // 初始化方向
                var direction = 1;
                // 初始坐标
                var startX = 0, startY = 0;
                // 当前Y轴位移
                var currentTranslateY = 0;
                // 每一个列表项目高度
                var itemHeight = 45;
                // 列表项目个数
                var itemSize = that.Ds(".H-select-item", items).length;
                // 滑动区域的偏移量
                var itemsOffset = that.offset(items);
                // 当前选择索引
                var currentSelectIndex = 0;
                // 当前选择中的值
                var currentSelectValue = "";
                // 默认下移两个列表项目高度
                that.cssText(items, "transform:translateY(" + (2 * itemHeight) + "px);-webkit-transform:translateY(" + (2 * itemHeight) + "px); transition:transform 0.3s;-webkit-transition:transform 0.3s;");
                // 默认第一个高亮
                that.cssText(that.D(".H-select-item:nth-child(1)", items), "font-size:1.8rem;color:#f00;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");

                // 绑定触摸事件
                that.on(options, "touchstart", function (event) {
                    if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];
                        startX = touch.clientX;
                        startY = touch.clientY;
                        currentTranslateY = Number(items.style.WebkitTransform.replace(/translateY\(/g, "").replace(/px\)/g, ""));
                    }
                });
                that.on(options, "touchmove", function (event) {
                    if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];
                        event.preventDefault();
                        // 滑动距离
                        var scrollRange = touch.clientY - startY + currentTranslateY;
                        that.cssText(items, "transform:translateY(" + scrollRange + "px);-webkit-transform:translateY(" + scrollRange + "px);");

                        direction = that.GetSlideDirection(startX, startY, touch.clientX, touch.clientY);

                        // 向上
                        if (direction == 1) {
                            if (scrollRange - itemHeight * 2 < -((itemSize - 2)) * itemHeight) {
                                currentSelectIndex = itemSize - 1;
                            }
                            else {
                                currentSelectIndex = Math.abs(Math.round((scrollRange - itemHeight * 2) / itemHeight));
                            }
                        }
                        // 向下
                        if (direction == 2) {
                            if (scrollRange > itemHeight * 2) {
                                currentSelectIndex = 0;
                            }
                            else {
                                currentSelectIndex = Math.abs(Math.round((scrollRange - itemHeight * 2) / itemHeight));
                            }
                        }
                        var currentItem = that.D(".H-select-item:nth-child(" + (currentSelectIndex + 1) + ")", items);
                        that.cssText(currentItem, "font-size:1.8rem;color:#f00;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                        that.cssText(that.siblings(currentItem), "font-size:1.6rem;color:#000;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                    }
                });
                that.on(options, "touchend", function (event) {
                    that.cssText(items, "transition: transform 0.2s;-webkit-transition: transform 0.2s;-webkit-transform:translateY(" + (itemHeight * 2 - currentSelectIndex * itemHeight) + "px);");
                });

                // 取消按钮
                that.on(that.Ds(".H-select-cancel,.H-select-space"), "touchend", function (event) {
                    isCancel = true;
                    currentSelectValue = that.D(".H-select-item:nth-child(" + (currentSelectIndex + 1) + ")").innerText;
                    that.cssText(that.D('.H-select-list'), "-webkit-animation-duration: 0.4s; animation-duration: 0.4s;");
                    that.addClass(that.D('.H-select-list'), 'slideOutDown');
                });

                // 确定按钮
                that.on(that.D(".H-select-ok"), "touchend", function (event) {
                    isCancel = false;
                    currentSelectValue = that.D(".H-select-item:nth-child(" + (currentSelectIndex + 1) + ")").innerText;
                    that.cssText(that.D('.H-select-list'), "-webkit-animation-duration: 0.4s; animation-duration: 0.4s;");
                    that.addClass(that.D('.H-select-list'), 'slideOutDown');
                });

                that.animationEventEnd(".H-select-list", function (event) {
                    if (that.hasClass(that.D('.H-select-area'), "H-display-none-important") == false) {
                        that.removeClass(that.D('.H-select-list'), 'flipInY');
                    }
                    if (that.hasClass(that.D('.H-select-list'), 'slideOutDown')) {
                        that.addClass(that.D('.H-select-area'), "H-display-none-important");
                        if (isCancel == true) {
                            if (that.isFunction(cancelCallback)) {
                                cancelCallback(currentSelectIndex, currentSelectValue);
                            }
                        }
                        else {
                            if (that.isElement(element)) {
                                element.value = currentSelectValue;
                            }
                            if (that.isFunction(okCallback)) {
                                okCallback(currentSelectIndex, currentSelectValue);
                            }
                        }
                    }
                });
            },
            // 日期选择
            dateTip: function (element, okCallback, cancelCallback) {
                var that = this;
                var that = this;

                // 获取当前年月日
                var now = new Date();
                var year = now.getFullYear();
                var month = now.getMonth() + 1;
                var date = now.getDate();
                var hours = now.getHours();
                var minutes = now.getMinutes();
                var seconds = now.getSeconds();

                if (that.Ds(".H-select-area") && that.Ds(".H-select-area").length > 0) {
                    document.body.removeChild(that.D(".H-select-area"));
                }

                var html = '<div class="H-select-area H-display-none-important H-flexbox-vertical H-background-color-transparent-3 H-position-fixed H-vertical-top-0 H-horizontal-right-0 H-horizontal-left-0 H-vertical-bottom-0 H-horizontal-right-0 H-width-100-percent H-overflow-hidden H-height-100-percent">';
                html += '<div class="H-select-space H-flex-item"></div>';
                html += '<div class="H-select-list H-theme-background-color-eee H-flexbox-vertical H-position-relative animated flipInY">';
                html += '<div class="H-select-button H-theme-background-color-white H-height-45 H-padding-horizontal-both-10 H-font-size-16">';
                html += '<span class="H-display-inline-block H-float-left H-select-cancel">取消</span>';
                html += '<span class="H-display-inline-block H-float-right H-theme-font-color1 H-select-ok">确定</span>';
                html += '</div>';
                html += '<div class="H-select-every H-flex-item H-flexbox-horizontal H-padding-horizontal-both-15">';
                html += '<div class="H-select-options H-flex-item  H-height-100-percent H-theme-background-color-eee H-overflow-hidden H-position-relative H-margin-horizontal-right-15">';
                html += '<div class="H-select-items">';
                for (var i = year - 100; i < year + 100; i++) {
                    html += '<div class="H-select-item H-font-size-16 H-theme-font-color-black H-center-all H-height-45">' + i + '</div>';
                }
                html += '</div>';
                html += '<div class="H-select-check H-position-absolute H-box-sizing-border-box H-height-45 H-width-100-percent H-position-center-all"></div>';
                html += '</div>';
                html += '<div class="H-select-options H-flex-item  H-height-100-percent H-theme-background-color-eee H-overflow-hidden H-position-relative  H-margin-horizontal-right-15">';
                html += '<div class="H-select-items">';
                for (var i = 1; i <= 12; i++) {
                    html += '<div class="H-select-item H-font-size-16 H-theme-font-color-black H-center-all H-height-45">' + (i < 10 ? "0" + i : i) + '</div>';
                }
                html += '</div>';
                html += '<div class="H-select-check H-position-absolute H-box-sizing-border-box H-height-45 H-width-100-percent H-position-center-all"></div>';
                html += '</div>';
                html += '<div class="H-select-options H-flex-item  H-height-100-percent H-theme-background-color-eee H-overflow-hidden H-position-relative">';
                html += '<div class="H-select-items">';
                for (var i = 1; i <= 31; i++) {
                    html += '<div class="H-select-item H-font-size-16 H-theme-font-color-black H-center-all H-height-45">' + (i < 10 ? "0" + i : i) + '</div>';

                }
                html += '</div>';
                html += '<div class="H-select-check H-position-absolute H-box-sizing-border-box H-height-45 H-width-100-percent H-position-center-all"></div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';

                that.prepend(document.body, null, html);
                that.removeClass(that.D('.H-select-area'), "H-display-none-important");

                var options = that.Ds(".H-select-options");
                // 当前滑动的对象
                var current = null;
                var currentIndex = 0;
                // 是否点击取消按钮
                var isCancel = false;
                // 初始化方向
                var direction = 1;
                // 初始坐标
                var yearStartX = 0, yearStartY = 0, monthStartX = 0, monthStartY = 0, dayStartX = 0, dayStartY = 0;
                // 当前Y轴位移
                var yearCurrentTranslateY = 0, monthCurrentTranslateY = 0, dayCurrentTranslateY = 0;
                // 每一个列表项目高度
                var itemHeight = 45;
                // 默认下移两个列表项目高度
                that.cssText(that.Ds('.H-select-options .H-select-items'), "transform:translateY(" + (2 * itemHeight) + "px);-webkit-transform:translateY(" + (2 * itemHeight) + "px); transition:transform 0.3s;-webkit-transition:transform 0.3s;");
                // 默认第一个高亮
                that.cssText(that.Ds(".H-select-item:nth-child(1)"), "font-size:1.8rem;color:#f00;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");

                // 列表项目个数
                var yearItemSize = that.Ds(".H-select-item", that.D('.H-select-options:nth-child(1)')).length,
                    monthItemSize = that.Ds(".H-select-item", that.D('.H-select-options:nth-child(2)')).length,
                    dayItemSize = that.Ds(".H-select-item", that.D('.H-select-options:nth-child(3)')).length;
                // 当前索引
                var yearCurrentSelectIndex = 0, monthCurrentSelectIndex = 0, dayCurrentSelectIndex = 0;
                // 当前选择的时间
                var dateSelectResult = {};

                // 滑动核心函数
                function scrollMove(touch, currentOption, startX, startY, currentTranslateY, itemSize) {
                    var currentSelectIndex = 0;
                    // 滑动距离
                    var scrollRange = touch.clientY - startY + currentTranslateY;
                    that.cssText(that.D(".H-select-items", currentOption), "transform:translateY(" + scrollRange + "px);-webkit-transform:translateY(" + scrollRange + "px);");

                    direction = that.GetSlideDirection(startX, startY, touch.clientX, touch.clientY);

                    // 向上
                    if (direction == 1) {
                        if (scrollRange - itemHeight * 2 < -((itemSize - 2)) * itemHeight) {
                            currentSelectIndex = itemSize - 1;
                        }
                        else {
                            currentSelectIndex = Math.abs(Math.round((scrollRange - itemHeight * 2) / itemHeight));
                        }
                    }
                    // 向下
                    if (direction == 2) {
                        if (scrollRange > itemHeight * 2) {
                            currentSelectIndex = 0;
                        }
                        else {
                            currentSelectIndex = Math.abs(Math.round((scrollRange - itemHeight * 2) / itemHeight));
                        }
                    }
                    var currentItem = that.D(".H-select-item:nth-child(" + (currentSelectIndex + 1) + ")", currentOption);
                    that.cssText(currentItem, "font-size:1.8rem;color:#f00;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                    that.cssText(that.siblings(currentItem), "font-size:1.6rem;color:#000;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");

                    return currentSelectIndex;
                }

                // 动态设置默认选择年月
                function setDefaultDate(_year, _month, _day) {
                    var yearIndex = year + 100 - _year;
                    that.cssText(H.D(".H-select-item:nth-child(" + (yearIndex + 1) + ")", that.D('.H-select-options:nth-child(1)')), "font-size:1.8rem;color:#f00;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                    that.cssText(that.siblings(H.D(".H-select-item:nth-child(" + (yearIndex + 1) + ")", that.D('.H-select-options:nth-child(1)'))), "font-size:1.6rem;color:#000;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                    that.cssText(H.D(".H-select-items", that.D('.H-select-options:nth-child(1)')), "transition: transform 0.2s;-webkit-transition: transform 0.2s;-webkit-transform:translateY(" + (itemHeight * 2 - yearIndex * itemHeight) + "px);");

                    that.cssText(H.D(".H-select-item:nth-child(" + _month + ")", that.D('.H-select-options:nth-child(2)')), "font-size:1.8rem;color:#f00;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                    that.cssText(that.siblings(H.D(".H-select-item:nth-child(" + _month + ")", that.D('.H-select-options:nth-child(2)'))), "font-size:1.6rem;color:#000;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                    that.cssText(H.D(".H-select-items", that.D('.H-select-options:nth-child(2)')), "transition: transform 0.2s;-webkit-transition: transform 0.2s;-webkit-transform:translateY(" + (itemHeight * 2 - (_month - 1) * itemHeight) + "px);");

                    that.cssText(H.D(".H-select-item:nth-child(" + _day + ")", that.D('.H-select-options:nth-child(3)')), "font-size:1.8rem;color:#f00;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                    that.cssText(that.siblings(H.D(".H-select-item:nth-child(" + _day + ")", that.D('.H-select-options:nth-child(3)'))), "font-size:1.6rem;color:#000;transition: font-size 0.2s;-webkit-transition: font-size 0.2s;");
                    that.cssText(H.D(".H-select-items", that.D('.H-select-options:nth-child(3)')), "transition: transform 0.2s;-webkit-transition: transform 0.2s;-webkit-transform:translateY(" + (itemHeight * 2 - (_day - 1) * itemHeight) + "px);");

                    yearCurrentSelectIndex = yearIndex;
                    monthCurrentSelectIndex = _month - 1;
                    dayCurrentSelectIndex = _day - 1;

                    dateSelectResult.year = _year;
                    dateSelectResult.month = _month;
                    dateSelectResult.day = _day;
                }
                setDefaultDate(year, month, date);

                // 绑定触摸事件
                that.on(options, "touchstart", function (event) {
                    if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];
                        var currentOption = that.getParents(touch.target, "H-select-options");
                        var currentOptionIndex = that.getIndex(currentOption);

                        switch (currentOptionIndex) {
                            // 年
                            case 0:
                                yearStartX = touch.clientX;
                                yearStartY = touch.clientY;
                                yearCurrentTranslateY = Number(that.D(".H-select-items", currentOption).style.WebkitTransform.replace(/translateY\(/g, "").replace(/px\)/g, ""));
                                break;
                                // 月
                            case 1:
                                monthStartX = touch.clientX;
                                monthStartY = touch.clientY;
                                monthCurrentTranslateY = Number(that.D(".H-select-items", currentOption).style.WebkitTransform.replace(/translateY\(/g, "").replace(/px\)/g, ""));
                                break;
                                // 日
                            case 2:
                                dayStartX = touch.clientX;
                                dayStartY = touch.clientY;
                                dayCurrentTranslateY = Number(that.D(".H-select-items", currentOption).style.WebkitTransform.replace(/translateY\(/g, "").replace(/px\)/g, ""));
                                break;
                        }

                    }
                });

                that.on(options, "touchmove", function (event) {
                    if (event.targetTouches.length == 1) {
                        var touch = event.targetTouches[0];
                        event.preventDefault();
                        var currentOption = that.getParents(touch.target, "H-select-options");
                        var currentOptionIndex = that.getIndex(currentOption);
                        currentIndex = currentOptionIndex;
                        current = currentOption;
                        switch (currentOptionIndex) {
                            case 0:
                                yearCurrentSelectIndex = scrollMove(touch, currentOption, yearStartX, yearStartY, yearCurrentTranslateY, yearItemSize);
                                break;
                            case 1:
                                monthCurrentSelectIndex = scrollMove(touch, currentOption, monthStartX, monthStartY, monthCurrentTranslateY, monthItemSize);
                                break;
                            case 2:
                                dayCurrentSelectIndex = scrollMove(touch, currentOption, dayStartX, dayStartY, dayCurrentTranslateY, dayItemSize);
                                break;
                        }
                    }
                });

                that.on(options, "touchend", function (event) {
                    var selectIndex = 0;
                    switch (currentIndex) {
                        case 0:
                            selectIndex = yearCurrentSelectIndex;
                            break;
                        case 1:
                            selectIndex = monthCurrentSelectIndex;
                            break;
                        case 2:
                            selectIndex = dayCurrentSelectIndex;
                            break;
                    }
                    that.cssText(H.D(".H-select-items", current), "transition: transform 0.2s;-webkit-transition: transform 0.2s;-webkit-transform:translateY(" + (itemHeight * 2 - selectIndex * itemHeight) + "px);");
                });


                // 取消按钮
                that.on(that.Ds(".H-select-cancel,.H-select-space"), "touchend", function (event) {
                    isCancel = true;
                    dateSelectResult.year = that.D(".H-select-item:nth-child(" + (yearCurrentSelectIndex + 1) + ")", that.D('.H-select-options:nth-child(1)')).innerText;
                    dateSelectResult.month = that.D(".H-select-item:nth-child(" + (monthCurrentSelectIndex + 1) + ")", that.D('.H-select-options:nth-child(2)')).innerText;
                    dateSelectResult.day = that.D(".H-select-item:nth-child(" + (dayCurrentSelectIndex + 1) + ")", that.D('.H-select-options:nth-child(3)')).innerText;
                    that.cssText(that.D('.H-select-list'), "-webkit-animation-duration: 0.4s; animation-duration: 0.4s;");
                    that.addClass(that.D('.H-select-list'), 'slideOutDown');
                });

                // 确定按钮
                that.on(that.D(".H-select-ok"), "touchend", function (event) {
                    isCancel = false;
                    dateSelectResult.year = that.D(".H-select-item:nth-child(" + (yearCurrentSelectIndex + 1) + ")", that.D('.H-select-options:nth-child(1)')).innerText;
                    dateSelectResult.month = that.D(".H-select-item:nth-child(" + (monthCurrentSelectIndex + 1) + ")", that.D('.H-select-options:nth-child(2)')).innerText;
                    dateSelectResult.day = that.D(".H-select-item:nth-child(" + (dayCurrentSelectIndex + 1) + ")", that.D('.H-select-options:nth-child(3)')).innerText;
                    that.cssText(that.D('.H-select-list'), "-webkit-animation-duration: 0.4s; animation-duration: 0.4s;");
                    that.addClass(that.D('.H-select-list'), 'slideOutDown');
                });

                that.animationEventEnd(".H-select-list", function (event) {
                    if (that.hasClass(that.D('.H-select-area'), "H-display-none-important") == false) {
                        that.removeClass(that.D('.H-select-list'), 'flipInY');
                    }
                    if (that.hasClass(that.D('.H-select-list'), 'slideOutDown')) {
                        that.addClass(that.D('.H-select-area'), "H-display-none-important");
                        if (isCancel == true) {
                            if (that.isFunction(cancelCallback)) {
                                cancelCallback(dateSelectResult);
                            }
                        }
                        else {
                            if (that.isElement(element)) {
                                element.value = dateSelectResult.year + "-" + dateSelectResult.month + "-" + dateSelectResult.day;
                            }
                            if (that.isFunction(okCallback)) {
                                okCallback(dateSelectResult);
                            }
                        }
                    }
                });
            },
            actionSheetTip: function (callback, title, buttons, cancelTitle, destructiveTitle, style) {
                var that = this;
                var o = {};

                o.title = title ? title : "请选择你要操作的项";
                o.cancelTitle = cancelTitle ? cancelTitle : "取消";
                if (destructiveTitle) {
                    o.destructiveTitle = destructiveTitle;
                }
                if (that.isObject(style)) {
                    o.style = style;
                }

                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            buttons = [].push(buttons);
                        } else {
                            buttons = ["确定"];
                        }
                    } else {
                        if (buttons.length == 0) {
                            buttons = ["确定"];
                        }
                    }
                } else {
                    buttons = ["确定"];
                }

                o.buttons = buttons;

                if (that.Ds(".H-actionSheet") && that.Ds(".H-actionSheet").length > 0) {
                    document.body.removeChild(that.D(".H-actionSheet"));
                }

                var html = '<div class="H-actionSheet H-display-none-important H-flexbox-vertical H-position-absolute H-vertical-top-0 H-horizontal-right-0 H-vertical-bottom-0 H-horizontal-left-0 H-height-100-percent H-width-100-percent H-background-color-transparent-3" style="z-index: 19923015; ">';
                html += '<div class="H-actionSheet-space H-flex-item"></div>';
                html += '<div class="H-actionSheet-list H-padding-10 animated slideInUp" style="-webkit-animation-duration:0.4s;animation-duration:0.4s;">';
                html += '<div class="H-actionSheet-title">';
                html += '<div class="H-actionSheet-item H-theme-background-color-white  H-text-show-row-1 H-border-vertical-bottom-after H-padding-10 H-center-all H-font-size-14 H-theme-font-color-999">' + o.title + '</div>';
                html += '</div>';
                html += '<div class="H-actionSheet-buttons">';

                for (var i = 0; i < o.buttons.length; i++) {
                    html += '<div class="H-actionSheet-item H-theme-background-color-white H-touch-active H-border-vertical-bottom-after H-text-show-row-1 H-padding-10 H-center-all H-font-size-14 H-theme-font-color1">' + o.buttons[i] + '</div>';
                }

                html += '</div>';
                html += '<div class="H-actionSheet-cancel H-margin-vertical-top-10">';
                html += '<div class="H-actionSheet-item H-theme-background-color-white H-touch-active  H-text-show-row-1 H-padding-10 H-center-all H-font-size-14 H-theme-font-color1" tapmode="">' + o.cancelTitle + '</div>';
                html += '</div>';
                html += '</div>';
                html += '</div>';

                that.prepend(document.body, null, html);
                that.removeClass(that.D('.H-actionSheet'), "H-display-none-important");

                var _ret = {};
                that.on(that.Ds('.H-actionSheet-buttons .H-actionSheet-item'), "touchend", function (event) {
                    var _index = that.getIndex(that.getParents(event.target, "H-actionSheet-item"));
                    _ret.buttonIndex = _index + 1;
                    that.addClass(that.D('.H-actionSheet-list'), 'slideOutDown');
                });

                that.on(that.Ds('.H-actionSheet-cancel .H-actionSheet-item'), "touchend", function (event) {
                    that.addClass(that.D('.H-actionSheet-list'), 'slideOutDown');
                    _ret.buttonIndex = that.Ds('.H-actionSheet-buttons .H-actionSheet-item').length + 1;
                });

                that.animationEventEnd(".H-actionSheet-list", function (event) {
                    if (that.hasClass(that.D('.H-actionSheet'), "H-display-none-important") == false) {
                        that.removeClass(that.D('.H-actionSheet-list'), 'slideInUp');
                    }
                    if (that.hasClass(that.D('.H-actionSheet-list'), 'slideOutDown')) {
                        that.addClass(that.D('.H-actionSheet'), "H-display-none-important");
                        if (that.isFunction(callback)) {
                            callback(_ret);
                        }
                    }
                });
            },
            alertTip: function (callback, msg, title, buttons) {
                var that = this;
                if ((!that.isFunction(arguments[0])) && (arguments[0])) {
                    msg = arguments[0];
                }
                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;

                // 设置提示标题为App名称
                title = title ? title : that.appName;
                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            var _tmp = [];
                            _tmp.push(buttons[0]);
                            buttons = _tmp;
                        } else {
                            buttons = ["确定"];
                        }
                    } else {
                        var _tmp = [];
                        _tmp.push(buttons[0]);
                        buttons = _tmp;
                    }
                } else {
                    buttons = ["确定"];
                }

                // 生成HTML
                that.dialogCore("text", title, msg, buttons);

                that.removeClass(that.D('.H-dialog-area'), "H-display-none-important");
                that.on(that.Ds('.H-dialog-button'), "touchend", function (e) {
                    var index = that.getIndex(that.getParents(event.target, "H-dialog-button"));
                    that.addClass(that.D('.H-dialog'), 'zoomOut');
                });

                that.animationEventEnd(that.D('.H-dialog'), function (event) {
                    if (that.hasClass(that.D('.H-dialog-area'), "H-display-none-important") == false) {
                        that.removeClass(that.D('.H-dialog'), 'zoomIn');
                    }
                    if (that.hasClass(that.D('.H-dialog'), 'zoomOut')) {
                        that.addClass(that.D('.H-dialog-area'), "H-display-none-important");
                        if (that.isFunction(callback)) {
                            callback();
                        }
                    }
                });
            },
            confirmTip: function (callback, title, msg, buttons) {
                var that = this;

                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;
                title = title ? title : "你确定要执行此操作吗？";
                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            buttons = ["取消"].pop(buttons);
                        } else {
                            buttons = ["确定", "取消"];
                        }
                    } else {
                        var _buttons = [];
                        if (buttons.length == 0) {
                            _buttons = ["确定", "取消"];
                        } else if (buttons.length == 1) {
                            _buttons.push(buttons[0]);
                            _buttons.push("取消");
                        } else if (buttons.length == 2) {
                            _buttons.push(buttons[0]);
                            _buttons.push(buttons[1]);
                        } else {
                            _buttons.push(buttons[0]);
                            _buttons.push(buttons[1]);
                            _buttons.push(buttons[2]);
                        }
                        buttons = _buttons;
                    }
                } else {
                    buttons = ["确定", "取消"];
                }

                var _ret = {};
                var _err = {};
                // 生成HTML
                that.dialogCore("text", title, msg, buttons.reverse());
                var index = buttons.length - 1;
                that.removeClass(that.D('.H-dialog-area'), "H-display-none-important");
                that.on(that.Ds('.H-dialog-button'), "touchend", function (e) {
                    index = that.getIndex(that.getParents(event.target, "H-dialog-button"));
                    _ret.buttonIndex = buttons.length - index;
                    that.addClass(that.D('.H-dialog'), 'zoomOut');
                });

                that.animationEventEnd(that.D('.H-dialog'), function (event) {
                    if (that.hasClass(that.D('.H-dialog-area'), "H-display-none-important") == false) {
                        that.removeClass(that.D('.H-dialog'), 'zoomIn');
                    }
                    if (that.hasClass(that.D('.H-dialog'), 'zoomOut')) {
                        that.addClass(that.D('.H-dialog-area'), "H-display-none-important");
                        if (that.isFunction(callback)) {
                            callback(_ret, _err);
                        }
                    }
                });
            },
            promptTip: function (callback, title, msg, text, type, buttons) {
                var that = this;

                msg = msg ? msg : "请输入值...";
                title = title ? title : "请输入数据后再操作";
                type = type ? type : "text";
                text = text ? text : "";

                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            buttons = ["取消"].pop(buttons);
                        } else {
                            buttons = ["确定", "取消"];
                        }
                    } else {
                        var _buttons = [];
                        if (buttons.length == 0) {
                            _buttons = ["确定", "取消"];
                        } else if (buttons.length == 1) {
                            _buttons.push(buttons[0]);
                            _buttons.push("取消");
                        } else if (buttons.length == 2) {
                            _buttons.push(buttons[0]);
                            _buttons.push(buttons[1]);
                        } else {
                            _buttons.push(buttons[0]);
                            _buttons.push(buttons[1]);
                            _buttons.push(buttons[2]);
                        }
                        buttons = _buttons;
                    }
                } else {
                    buttons = ["确定", "取消"];
                }

                var _ret = {};
                var _err = {};
                // 生成HTML

                var _msg = '<div class="H-dialog-prompt-tip H-font-size-16">' + msg + '</div><input type="text" class="H-dialog-prompt-text H-width-100-percent H-border-none padding H-padding-10 H-box-sizing-border-box H-box-shadow-inset" style="border:1px solid #f1f1f1;" placeholder="请输入值..." value="' + text + '" />';

                that.dialogCore("text", title, _msg, buttons.reverse());
                var index = buttons.length - 1;
                that.removeClass(that.D('.H-dialog-area'), "H-display-none-important");
                that.on(that.Ds('.H-dialog-button'), "touchend", function (e) {
                    index = that.getIndex(that.getParents(event.target, "H-dialog-button"));
                    _ret.buttonIndex = buttons.length - index;
                    _ret.text = that.D('.H-dialog-prompt-text').value;
                    that.addClass(that.D('.H-dialog'), 'zoomOut');
                });

                that.animationEventEnd(that.D('.H-dialog'), function (event) {
                    if (that.hasClass(that.D('.H-dialog-area'), "H-display-none-important") == false) {
                        that.removeClass(that.D('.H-dialog'), 'zoomIn');
                    }
                    if (that.hasClass(that.D('.H-dialog'), 'zoomOut')) {
                        that.addClass(that.D('.H-dialog-area'), "H-display-none-important");
                        if (that.isFunction(callback)) {
                            callback(_ret, _err);
                        }
                    }
                });
            },
            toastTip: function (callback, msg, duration, location) {
                var that = this;
                var tip = null;

                if ((!that.isFunction(arguments[0])) && (arguments[0])) {
                    msg = arguments[0];
                }

                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;
                duration = Math.abs(that.isNumber(duration) ? Number(duration) : 2000);

                var locationArr = ["top", "middle", "bottom"];
                location = location ? location : "bottom";
                location = locationArr.indexOf(location) > -1 ? location : "bottom";

                clearTimeout(tip);
                var clientWidth = window.outerWidth;
                var clientHeight = window.outerHeight;
                if (that.Ds(".H-toast") && that.Ds(".H-toast").length > 0) {
                    document.body.removeChild(that.D(".H-toast"));
                }
                var html = '<div class="H-toast H-position-absolute animated bounceIn H-background-color-transparent-6 H-theme-font-color-white H-font-size-12 H-padding-horizontal-both-10 H-padding-vertical-both-5 H-border-radius-3 H-display-inline-block H-word-break-break-all" style="-webkit-animation-duration: 0.3s; animation-duration: 0.3s;z-index: 199305658315;left:50%;max-width:' + (clientWidth - 80) + 'px;">' + msg + '</div>';
                that.prepend(document.body, null, html);
                var offset = that.offset(that.D(".H-toast"));
                that.D(".H-toast").style.width = offset.w + "px";
                that.D(".H-toast").style.marginLeft = -(offset.w / 2) + "px";

                var scrollObj = that.getScroll();

                if (location == "top") {
                    that.D(".H-toast").style.top = scrollObj.t + 30 + "px";
                    that.D(".H-toast").style.bottom = "auto";
                }
                else if (location == "bottom") {
                    that.D(".H-toast").style.bottom = 30 - scrollObj.t + "px";
                    that.D(".H-toast").style.top = "auto";
                }
                else if (location == "middle") {
                    that.D(".H-toast").style.top = (clientHeight - offset.h) / 2 + scrollObj.t + "px";
                    that.D(".H-toast").style.bottom = "auto";
                }

                window.onscroll = function () {
                    setTimeout(function () {
                        var scrollObj = that.getScroll();
                        if (that.D(".H-toast")) {
                            if (location == "top") {
                                that.D(".H-toast").style.top = scrollObj.t + 30 + "px";
                                that.D(".H-toast").style.bottom = "auto";
                            }
                            else if (location == "bottom") {
                                that.D(".H-toast").style.bottom = 30 - scrollObj.t + "px";
                                that.D(".H-toast").style.top = "auto";
                            }
                            else if (location == "middle") {
                                that.D(".H-toast").style.top = (clientHeight - offset.h) / 2 + scrollObj.t + "px";
                                that.D(".H-toast").style.bottom = "auto";
                            }
                        }
                    }, 10);
                };


                tip = setTimeout(function () {
                    if (that.isElement(that.D(".H-toast"))) {
                        document.body.removeChild(that.D(".H-toast"));
                    }
                    if (that.isFunction(callback)) {
                        callback();
                    }
                }, duration);

            },
            toastCore: function (iconHTML, tipText, duration, animateName) {
                var that = this;
                iconHTML = iconHTML ? iconHTML : '<span class="H-display-block H-line-height-normal"><i class="H-iconfont H-icon-right H-font-size-42"></i></span>';
                tipText = tipText ? tipText : "提交成功";
                duration = Math.abs(that.isNumber(duration) ? Number(duration) : 2000);
                animateName = animateName ? animateName : "rubberBand";

                if (that.Ds("#H-toast-tip") && that.Ds("#H-toast-tip").length > 0) {
                }
                else {
                    var toastDiv = document.createElement("div");
                    toastDiv.id = "H-toast-tip";
                    that.addClass(toastDiv, "H-position-absolute H-z-index-1000000 H-height-100 H-width-100 H-border-radius-5 H-theme-background-color-black H-theme-font-color-white H-center-all H-text-align-center H-background-color-transparent-5 animated " + animateName);
                    that.cssText(toastDiv, "left:50%;top:50%;margin-left:-50px;")
                    var html = "";
                    html += '<div>';
                    html += iconHTML;
                    html += '<label class="H-display-block H-margin-vertical-top-3 H-font-size-14 H-theme-font-color-white">' + tipText + '</label>';
                    html += '</div>';
                    toastDiv.innerHTML = html;
                    that.D("body").appendChild(toastDiv);

                    var scrollObj = that.getScroll();
                    that.D("#H-toast-tip").style.marginTop = scrollObj.t - 50 + "px";

                    window.onscroll = function (event) {
                        setTimeout(function () {
                            var scrollObj = that.getScroll();
                            if (that.D("#H-toast-tip")) {
                                that.D("#H-toast-tip").style.marginTop = scrollObj.t - 50 + "px";
                            }
                        }, 10);
                    };

                    setTimeout(function () {
                        H.closeToast();
                    }, duration);
                }
            },
            toastSuccess: function (duration) {
                var that = this;
                that.toastCore('<span class="H-display-block H-line-height-normal"><i class="H-iconfont H-icon-right H-font-size-42"></i></span>', "提交成功", duration);
            },
            toastError: function (duration) {
                var that = this;
                that.toastCore('<span class="H-display-block H-line-height-normal"><i class="H-iconfont H-icon-error H-font-size-42"></i></span>', "提交失败", duration);
            },
            toastLoading: function (duration) {
                var that = this;
                duration = Math.abs(that.isNumber(duration) ? Number(duration) : 10000);
                that.toastCore('<span class="H-display-block H-line-height-normal H-animate-rotate"><i class="H-iconfont H-icon-loading H-font-size-42"></i></span>', "加载中...", duration);
            },
            closeToast: function () {
                var that = this;
                if (that.Ds("#H-toast-tip") && that.Ds("#H-toast-tip").length > 0) {
                    that.D("body").removeChild(that.D("#H-toast-tip"));
                }
            },
            // 切换显示隐藏（通常用于底部分享，弹窗显示）
            swiperShare: function (parentSelector, animateSelector, closeElemementClassName, openCallBack, closeCallback) {
                var that = this;


                var parentElem = that.D(parentSelector);
                var animateElem = that.D(parentSelector + " " + animateSelector);

                if (parentElem.classList.contains("H-display-none-important") == false) {
                    that.addClass(animateElem, "H-animate-scale-small");
                }
                else {
                    that.addClass(animateElem, "H-animate-scale-big");
                    that.removeClass(parentElem, "H-display-none-important");
                }

                that.animationEventEnd(animateElem, function (e) {
                    if (animateElem.classList.contains("H-animate-scale-big")) {
                        that.removeClass(animateElem, "H-animate-scale-big");

                        if (that.isFunction(openCallBack)) {
                            openCallBack();
                        }
                    }
                    if (animateElem.classList.contains("H-animate-scale-small")) {
                        that.removeClass(animateElem, "H-animate-scale-small");
                        that.addClass(parentElem, "H-display-none-important");
                        if (that.isFunction(closeCallback)) {
                            closeCallback();
                        }
                    }
                });

                that.one(window, 'touchend', function (e) {
                    var src = event.target;
                    if (src.tagName.toLowerCase() == "div" && src.classList.contains(closeElemementClassName)) {
                        if (parentElem.classList.contains("H-display-none-important") == false) {
                            that.swiperShare(parentSelector, animateSelector, closeElemementClassName);
                        }
                    }
                }, true);

            },

            // ######################### 模板引擎
            tppl: function (tpl, data) {
                var that = this;

                var fn = function (d) {
                    var i, k = [], v = [];
                    for (i in d) {
                        k.push(i);
                        v.push(d[i]);
                    };
                    return (new Function(k, fn.$)).apply(d, v);
                };
                if (!fn.$) {
                    var tpls = tpl.split(that.tppl_flag[0]);
                    fn.$ = "var $=''";
                    for (var t = 0; t < tpls.length; t++) {
                        var p = tpls[t].split(that.tppl_flag[1]);
                        if (t != 0) {
                            fn.$ += '=' == p[0].charAt(0)
                              ? "+(" + p[0].substr(1) + ")"
                              : ";" + p[0].replace(/\r\n/g, '') + "$=$"
                        }
                        // 支持 <pre> 和 [::] 包裹的 js 代码
                        fn.$ += "+'" + p[p.length - 1].replace(/\'/g, "\\'").replace(/\r\n/g, '\\n').replace(/\n/g, '\\n').replace(/\r/g, '\\n') + "'";
                    }
                    fn.$ += ";return $;";
                    // log(fn.$);
                }
                return data ? fn(data) : fn;
            }
        });
    }
}(function (HExports) {
    var H = typeof HExports !== 'undefined' ? HExports : {};
    // ######################### 属性
    Object.defineProperty(H, "appId", {
        get: function () {
            if (H.isAPICloud()) {
                return api.appId;
            }
        }
    });
    Object.defineProperty(H, "appName", {
        get: function () {
            if (H.isAPICloud()) {
                return api.appName;
            }
        }
    });
    Object.defineProperty(H, "appVersion", {
        get: function () {
            if (H.isAPICloud()) {
                return api.appVersion;
            }
        }
    });
    Object.defineProperty(H, "systemType", {
        get: function () {
            if (H.isAPICloud()) {
                return api.systemType;
            }
        }
    });
    Object.defineProperty(H, "systemVersion", {
        get: function () {
            if (H.isAPICloud()) {
                return api.systemVersion;
            }
        }
    });
    Object.defineProperty(H, "version", {
        get: function () {
            if (H.isAPICloud()) {
                return api.version;
            }
        }
    });
    Object.defineProperty(H, "deviceId", {
        get: function () {
            if (H.isAPICloud()) {
                return api.deviceId;
            }
        }
    });
    Object.defineProperty(H, "deviceToken", {
        get: function () {
            if (H.isAPICloud()) {
                return api.deviceToken;
            }
        }
    });
    Object.defineProperty(H, "deviceModel", {
        get: function () {
            if (H.isAPICloud()) {
                return api.deviceModel;
            }
        }
    });
    Object.defineProperty(H, "deviceName", {
        get: function () {
            if (H.isAPICloud()) {
                return api.deviceName;
            }
        }
    });
    Object.defineProperty(H, "operator", {
        get: function () {
            if (H.isAPICloud()) {
                return api.operator;
            }
        }
    });
    Object.defineProperty(H, "connectionType", {
        get: function () {
            if (H.isAPICloud()) {
                return api.connectionType;
            }
        }
    });
    Object.defineProperty(H, "fullScreen", {
        get: function () {
            if (H.isAPICloud()) {
                return api.fullScreen;
            }
        }
    });
    Object.defineProperty(H, "screenWidth", {
        get: function () {
            if (H.isAPICloud()) {
                return api.screenWidth;
            }
        }
    });
    Object.defineProperty(H, "screenHeight", {
        get: function () {
            if (H.isAPICloud()) {
                return api.screenHeight;
            }
        }
    });
    Object.defineProperty(H, "winName", {
        get: function () {
            if (H.isAPICloud()) {
                return api.winName;
            }
        }
    });
    Object.defineProperty(H, "winWidth", {
        get: function () {
            if (H.isAPICloud()) {
                return api.winWidth;
            }
        }
    });
    Object.defineProperty(H, "winHeight", {
        get: function () {
            if (H.isAPICloud()) {
                return api.winHeight;
            }
        }
    });
    Object.defineProperty(H, "frameName", {
        get: function () {
            if (H.isAPICloud()) {
                return api.frameName;
            }
        }
    });
    Object.defineProperty(H, "frameWidth", {
        get: function () {
            if (H.isAPICloud()) {
                return api.frameWidth;
            }
        }
    });
    Object.defineProperty(H, "frameHeight", {
        get: function () {
            if (H.isAPICloud()) {
                return api.frameHeight;
            }
        }
    });
    Object.defineProperty(H, "pageParam", {
        get: function () {
            if (H.isAPICloud()) {
                return api.pageParam;
            }
        }
    });
    Object.defineProperty(H, "wgtParam", {
        get: function () {
            if (H.isAPICloud()) {
                return api.wgtParam;
            }
        }
    });
    Object.defineProperty(H, "appParam", {
        get: function () {
            if (H.isAPICloud()) {
                return api.appParam;
            }
        }
    });
    Object.defineProperty(H, "wgtRootDir", {
        get: function () {
            if (H.isAPICloud()) {
                return api.wgtRootDir;
            }
        }
    });
    Object.defineProperty(H, "fsDir", {
        get: function () {
            if (H.isAPICloud()) {
                return api.fsDir;
            }
        }
    });
    Object.defineProperty(H, "cacheDir", {
        get: function () {
            if (H.isAPICloud()) {
                return api.cacheDir;
            }
        }
    });
    Object.defineProperty(H, "iOS7StatusBarAppearance", {
        get: function () {
            if (H.isAPICloud()) {
                return api.iOS7StatusBarAppearance;
            }
        }
    });
    // ######################### 设置pageParam默认值
    var _openWin_ = H.DEFAULT_CONFIG.openWin_CONFIG;
    Object.defineProperty(_openWin_, "pageParam", {
        get: function () {
            if (H.isAPICloud()) {
                return H.pageParam;
            }
        }
    });
    Object.defineProperty(_openWin_, "delay", {
        get: function () {
            if (H.isAPICloud()) {
                return H.systemType == "ios" ? 0 : 0;
            }
        }
    });
    Object.defineProperty(_openWin_, "useWKWebView", {
        get: function () {
            if (H.isAPICloud()) {
                return (H.systemType == "ios" && parseFloat(H.systemVersion) >= 8.0) ? true : false;
            }
        }
    });
    var _openFrame_ = H.DEFAULT_CONFIG.openFrame_CONFIG;
    Object.defineProperty(_openFrame_, "pageParam", {
        get: function () {
            if (H.isAPICloud()) {
                return H.pageParam;
            }
        }
    });
    Object.defineProperty(_openFrame_, "useWKWebView", {
        get: function () {
            if (H.isAPICloud()) {
                return (H.systemType == "ios" && parseFloat(H.systemVersion) >= 8.0) ? true : false;
            }
        }
    });
    var _openPopoverWin_ = H.DEFAULT_CONFIG.openPopoverWin_CONFIG;
    Object.defineProperty(_openPopoverWin_, "pageParam", {
        get: function () {
            if (H.isAPICloud()) {
                return H.pageParam;
            }
        }
    });
    var _openDrawerLayout_ = H.DEFAULT_CONFIG.openDrawerLayout_CONFIG;
    Object.defineProperty(_openDrawerLayout_, "pageParam", {
        get: function () {
            if (H.isAPICloud()) {
                return H.pageParam;
            }
        }
    });
    // ######################### 常量
    // toast位置
    Object.defineProperty(H, "ENUM_toast_location", {
        get: function () {
            if (H.isAPICloud()) {
                return {
                    top: "top",
                    middle: "middle",
                    bottom: "bottom"
                };
            }
        }
    });

    // 传感器类型
    Object.defineProperty(H, "ENUM_startSensor_type", {
        get: function () {
            if (H.isAPICloud()) {
                return {
                    accelerometer: "accelerometer",
                    gyroscope: "gyroscope",
                    magnetic_field: "magnetic_field",
                    proximity: "proximity"
                };
            }
        }
    });
});

document.body.addEventListener('touchstart', function () { });