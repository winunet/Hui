/*!
 * 文件名称：H.js
 * 文件版本：Version 0.0.4    2016-04-30
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
            v: "0.0.4",
            M: {},
            tppl_flag: ['[:', ':]'],
            trim: function (str) {
                if (str) {
                    return str.replace(/(^\s*)|(\s*$)/g, '');
                }
            },
            getFileExt: function (fileName) {
                if (fileName && fileName.length > 2) {
                    return fileName.substring(fileName.lastIndexOf('.') + 1);
                } else {
                    console.warn("输入文件名有误！");
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
                that.getNowDateFormat('-', ':', isShowTime, datetime);
            },
            transJsTimestamp: function (timestamp, isShowTime) {
                var that = this;
                var datetime = new Date(timestamp);
                that.getNowDateFormat('-', ':', isShowTime, datetime);
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
            // ######################### 事件
            addEventListener: function (callback, name, extra) {
                var that = this;
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
                    softInputMode: "auto"
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
                    softInputMode: 'auto'
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
                    slidBackType: "edge",
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
                api.openWin(opt);
            },
            closeWin: function (winName, options) {
                var that = this;
                var o = {};
                if (winName) {
                    o.name = winName;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.closeWin_CONFIG, o, options);
                api.closeWin(opt);
            },
            closeToWin: function (winName, options) {
                var that = this;
                var o = {};
                winName = (!winName) ? "root" : winName;
                o.name = winName;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.closeToWin_CONFIG, o, options);
                api.closeToWin(opt);
            },
            setWinAttr: function (options) {
                var that = this;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.setWinAttr_CONFIG, options);
                api.setWinAttr(opt)
            },
            openFrame: function (frameName, frameUrl, framePageParam, options) {
                var that = this;
                var o = {};
                o.name = frameName;
                o.url = frameUrl;
                o.pageParam = that.isObject(framePageParam) ? framePageParam : {};

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, o, options);
                api.openFrame(opt);
            },
            closeFrame: function (frameName) {
                var o = {};
                if (frameName) {
                    o.name = frameName;
                }
                api.closeFrame(o);
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
                api.setFrameAttr(opt);
            },
            bringFrameToFront: function (fromFrameName, toFrameName) {
                var o = {};
                o.from = fromFrameName;

                if (toFrameName) {
                    o.to = toFrameName;
                }
                api.bringFrameToFront(o);
            },
            sendFrameToBack: function (fromFrameName, toFrameName) {
                var o = {};
                o.from = fromFrameName;

                if (toFrameName) {
                    o.to = toFrameName;
                }
                api.sendFrameToBack(o);
            },
            setFrameClient: function (callback, frameName) {
                var that = this;

                api.setFrameClient({
                    frameName: frameName
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            animation: function (callback, frameName, options) {
                var that = this;
                var o = {};
                if (frameName) {
                    o.name = frameName;
                }

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.animation_CONFIG, o, options);
                api.animation(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
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
                api.openFrameGroup(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            closeFrameGroup: function (groupName) {
                api.closeFrameGroup({
                    name: groupName
                });
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
                api.setFrameGroupAttr(opt)
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
                api.setFrameGroupIndex(opt)
            },
            openPopoverWin: function (popoverWinName, popoverWinUrl, popoverWinpageParam, options) {
                var that = this;
                var o = {};
                o.name = popoverWinName;
                o.url = popoverWinUrl;
                o.pageParam = that.isObject(popoverWinpageParam) ? popoverWinpageParam : {};

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.openPopoverWin_CONFIG, o, options);
                api.openPopoverWin(opt);
            },
            closePopoverWin: function () {
                api.closePopoverWin();
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
                api.openSlidLayout(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            openSlidPane: function (type) {
                var that = this;
                var typeArr = ["left", "right", "all"];
                type = that.isString(type) ? type : "left";
                type = typeArr.indexOf(type) > -1 ? type : "left";

                api.openSlidPane({
                    type: type
                });
            },
            closeSlidPane: function () {
                api.closeSlidPane();
            },
            lockSlidPane: function () {
                api.lockSlidPane();
            },
            unlockSlidPane: function () {
                api.unlockSlidPane();
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
                api.openDrawerLayout(opt);
            },
            openDrawerPane: function (type) {
                var that = this;
                var typeArr = ["left", "right"];
                type = that.isString(type) ? type : "left";
                type = typeArr.indexOf(type) > -1 ? type : "left";

                api.openDrawerPane({
                    type: type
                });
            },
            closeDrawerPane: function () {
                api.closeDrawerPane();
            },
            execScript: function (winName, frameName, script) {
                var that = this;
                script = that.isString(script) ? script : "();";

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
            },
            historyBack: function (callback, frameName) {
                var that = this;

                api.historyBack({
                    frameName: frameName
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            historyForward: function (callback, frameName) {
                var that = this;

                api.historyForward({
                    frameName: frameName
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            pageUp: function (callback, isTop) {
                var that = this;

                isTop = that.isTargetType(isTop, "boolean") ? isTop : false;
                api.pageUp({
                    top: isTop
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            pageDown: function (callback, isBottom) {
                var that = this;

                isBottom = that.isTargetType(isBottom, "boolean") ? isBottom : false;
                api.pageUp({
                    bottom: isBottom
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            removeLaunchView: function (options) {
                var that = this;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.removeLaunchView_CONFIG, options);
                api.removeLaunchView(opt);
            },
            parseTapmode: function () {
                api.parseTapmode();
            },
            installApp: function (appUri) {
                api.installApp({
                    appUri: appUri
                });
            },
            appInstalled: function (callback, appBundle) {
                var that = this;

                api.appInstalled({
                    appBundle: appBundle
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
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
                api.openApp(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            rebootApp: function () {
                api.rebootApp();
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
                api.openWidget(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
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
                api.closeWidget(opt);
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
                api.ajax(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            cancelAjax: function (tag) {
                api.cancelAjax({
                    tag: tag
                });
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
                api.download(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            cancelDownload: function (url) {
                api.cancelDownload({
                    url: url
                });
            },
            imageCache: function (callback, url, options) {
                var that = this;
                var o = {};
                o.url = url;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.imageCache_CONFIG, o, options);
                api.imageCache(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            readFile: function (callback, path) {
                var that = this;

                api.readFile({
                    path: path
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            writeFile: function (callback, path, data, isAppend) {
                var that = this;

                isAppend = that.isTargetType(isAppend, "boolean") ? isAppend : false;
                if (that.isObject(data)) {
                    data = JSON.stringify(data);
                }
                api.writeFile({
                    path: path,
                    data: data,
                    append: isAppend
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            setPrefs: function (callback, key, value) {
                var that = this;

                if (that.isObject(value)) {
                    value = JSON.stringify(value);
                }

                api.setPrefs({
                    key: key,
                    value: value
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            getPrefs: function (callback, key) {
                var that = this;

                api.getPrefs({
                    key: key
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            removePrefs: function (callback, key) {
                var that = this;

                api.removePrefs({
                    key: key
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            clearCache: function (callback, timeThreshold) {
                var that = this;

                timeThreshold = Math.abs(that.isNumber(timeThreshold) ? Number(timeThreshold) : 0);

                api.clearCache({
                    timeThreshold: timeThreshold
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            getCacheSize: function (callback) {
                var that = this;

                api.getCacheSize(function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            getFreeDiskSpace: function (callback) {
                var that = this;

                api.getFreeDiskSpace(function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            loadSecureValue: function (callback, key) {
                var that = this;

                api.loadSecureValue({
                    key: key
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            removeEventListener: function (name) {
                api.removeEventListener({
                    name: name
                });
            },
            sendEvent: function (name, extra) {
                var that = this;

                if (extra) {
                    extra = that.isObject(extra) ? extra : {};
                }
                api.sendEvent({
                    name: name,
                    extra: extra
                });
            },
            accessNative: function (callback, name, extra) {
                var that = this;

                if (extra) {
                    extra = that.isObject(extra) ? extra : {};
                }
                api.accessNative({
                    name: name,
                    extra: extra
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            notification: function (callback, notify, alarm) {
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
                api.notification(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            cancelNotification: function (id) {
                api.cancelNotification({
                    id: id
                });
            },
            startLocation: function (callback, isAutoStop) {
                var that = this;
                isAutoStop = that.isTargetType(isAutoStop, "boolean") ? isAutoStop : true;

                var o = {};
                o.autoStop = isAutoStop;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.startLocation_CONFIG, o, options);
                api.startLocation(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            stopLocation: function () {
                api.stopLocation();
            },
            getLocation: function (callback) {
                var that = this;

                api.getLocation(function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            startSensor: function (callback, type) {
                api.startSensor({
                    type: type
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            stopSensor: function (type) {
                api.stopSensor({
                    type: type
                });
            },
            call: function (type, number) {
                var that = this;
                type = that.isString(type) ? type : "tel_prompt";

                api.call({
                    type: type,
                    number: number
                });
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

                api.sms({
                    numbers: numbers,
                    text: text,
                    silent: silent
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
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

                api.mail(o, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            openContacts: function (callback) {
                var that = this;

                api.openContacts(function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            setFullScreen: function (isFullScreen) {
                var that = this;
                isFullScreen = that.isTargetType(isFullScreen, "boolean") ? isFullScreen : true;

                api.setFullScreen({
                    fullScreen: isFullScreen
                });
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

                api.setStatusBarStyle(o);
            },
            setScreenOrientation: function (orientation) {
                api.setScreenOrientation({
                    orientation: orientation
                });
            },
            setKeepScreenOn: function (isKeepOn) {
                var that = this;
                isKeepOn = that.isTargetType(isKeepOn, "boolean") ? isKeepOn : true;

                api.setKeepScreenOn({
                    keepOn: isKeepOn
                });
            },
            toLauncher: function () {
                api.toLauncher();
            },
            setScreenSecure: function (isSecure) {
                var that = this;
                isSecure = that.isTargetType(isSecure, "boolean") ? isSecure : true;

                api.setScreenSecure({
                    secure: isSecure
                });
            },
            setAppIconBadge: function (badge) {
                var that = this;

                badge = Math.abs(that.isNumber(badge) ? Number(badge) : 0);
                api.setAppIconBadge({
                    badge: badge
                });
            },
            getPhoneNumber: function (callback) {
                var that = this;

                api.getPhoneNumber(function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
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
                            buttons = [].push(buttons);
                        } else {
                            buttons = ["确定"];
                        }
                    } else {
                        buttons = [].push(buttons[0]);
                    }
                } else {
                    buttons = ["确定"];
                }

                api.alert({
                    title: title,
                    msg: msg,
                    buttons: buttons
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            confirm: function (callback, title, msg, buttons) {
                var that = this;
                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;
                title = title ? title : "你确定要执行此操作吗？";
                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            buttons = ["取消"].push(buttons);
                        } else {
                            buttons = ["取消", "确定"];
                        }
                    } else {
                        var _buttons = [];
                        if (buttons.length == 0) {
                            _buttons = ["取消", "确定"];
                        } else if (buttons.length == 1) {
                            _buttons.push("取消");
                            _buttons.push(buttons[0]);
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
                    buttons = ["取消", "确定"];
                }

                api.confirm({
                    title: title,
                    msg: msg,
                    buttons: buttons
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            prompt: function (callback, title, msg, text, type, buttons) {
                var that = this;
                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;
                title = title ? title : "请输入数据后再操作";
                type = type ? type : "text";

                if (buttons) {
                    if (!that.isArray(buttons)) {
                        if (that.isString(buttons)) {
                            buttons = ["取消"].push(buttons);
                        } else {
                            buttons = ["取消", "确定"];
                        }
                    } else {
                        var _buttons = [];
                        if (buttons.length == 0) {
                            _buttons = ["取消", "确定"];
                        } else if (buttons.length == 1) {
                            _buttons.push("取消");
                            _buttons.push(buttons[0]);
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
                    buttons = ["取消", "确定"];
                }

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

                api.actionSheet(o, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
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
                api.showProgress(opt);
            },
            hideProgress: function () {
                api.hideProgress();
            },
            toast: function (callback, msg, duration, location) {
                var that = this;

                if ((!that.isFunction(arguments[0])) && (arguments[0])) {
                    msg = arguments[0];
                }

                msg = that.isObject(msg) ? (JSON.stringify(msg)) : msg;
                duration = Math.abs(that.isNumber(duration) ? Number(duration) : 2000);

                var locationArr = ["top", "middle", "bottom"];
                location = location ? location : "bottom";
                location = locationArr.indexOf(location) > -1 ? location : "bottom";

                api.toast({
                    msg: msg,
                    duration: duration,
                    location: location
                });
                if (that.isFunction(callback)) {
                    setTimeout(function () {
                        callback();
                    }, duration);
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

                api.openPicker(o, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            setRefreshHeaderInfo: function (callback, options) {
                var that = this;

                options = options || {};
                var opt = that.extendObj(that.DEFAULT_CONFIG.setRefreshHeaderInfo_CONFIG, options);
                api.setRefreshHeaderInfo(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            setCustomRefreshHeaderInfo: function (callback, options) {
                var that = this;

                options = options || {};
                api.setCustomRefreshHeaderInfo(options, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            refreshHeaderLoading: function () {
                api.refreshHeaderLoading();
            },
            refreshHeaderLoadDone: function () {
                api.refreshHeaderLoadDone();
            },
            showFloatBox: function (iconPath, duration) {
                var that = this;

                iconPath = iconPath ? iconPath : 'widget://image/icon.png';
                duration = Math.abs(that.isNumber(duration) ? Number(duration) : 5000);

                api.showFloatBox({
                    iconPath: iconPath,
                    duration: duration
                });
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
                api.getPicture(opt, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            saveMediaToAlbum: function (callback, path) {
                var that = this;

                api.saveMediaToAlbum({
                    path: path
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            startRecord: function (path) {
                api.startRecord({
                    path: path
                });
            },
            stopRecord: function (callback) {
                var that = this;

                api.stopRecord(function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            startPlay: function (path) {
                var that = this;

                api.startPlay({
                    path: path
                }, function (ret, err) {
                    if (that.isFunction(callback)) {
                        callback(ret, err);
                    }
                });
            },
            stopPlay: function () {
                api.stopPlay();
            },
            openVideo: function (url) {
                api.openVideo({
                    url: url
                });
            },
            ready: function (callback) {
                var that = this;

                apiready = function () {
                    if (that.isFunction(callback)) {
                        callback();
                    }
                };
            },
            require: function (modules) {
                var that = this;

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
                                    if (_classArr != "") {
                                        elements[i].classList.add(_classArr[j]);
                                    }
                                }
                            }
                            else {
                                if (classs.indexOf(' ') > -1) {
                                    var _classArr = classs.split(" ");
                                    for (var j = 0; j < _classArr.length; j++) {
                                        if (_classArr != "") {
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
                            if (_classArr != "") {
                                elements.classList.add(_classArr[i]);
                            }
                        }
                    }
                    else {
                        if (classs.indexOf(' ') > -1) {
                            var _classArr = classs.split(" ");
                            for (var i = 0; i < _classArr.length; i++) {
                                if (_classArr != "") {
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
                                    if (_classArr != "") {
                                        elements[i].classList.remove(_classArr[j]);
                                    }
                                }
                            }
                            else {
                                if (classs.indexOf(' ') > -1) {
                                    var _classArr = classs.split(" ");
                                    for (var j = 0; j < _classArr.length; j++) {
                                        if (_classArr != "") {
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
                            if (_classArr != "") {
                                elements.classList.remove(_classArr[i]);
                            }
                        }
                    }
                    else {
                        if (classs.indexOf(' ') > -1) {
                            var _classArr = classs.split(" ");
                            for (var i = 0; i < _classArr.length; i++) {
                                if (_classArr != "") {
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
            hasClass: function (element, _class) {
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
            scrollToDocButton: function () {
                var that = this;
                that.D("body").scrollTop = that.D("body").scrollHeight;
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
            openFrameIndexByClick: function (framesOption, headerToggleClass, footerSelector, triggerSelector, triggerActiveClass, defaultIndex) {
                var that = this;
                defaultIndex = that.isNumber(defaultIndex) ? (Math.abs(defaultIndex) + 1) : 1;

                window.___currentFrameName___ = "";
                window.___currentTriggerIndex___ = -1;
                window.___frameNameList___ = [];

                if (!that.isArray(framesOption)) {
                    console.error("必须传入frame配置数组对象！");
                } else {
                    if (!(framesOption.length > 0 && framesOption.length == that.Ds(triggerSelector, footerSelector).length)) {
                        console.error("传入的frame配置数组个数必须大于0并且个数等于触发按钮的个数！");
                    } else {
                        var items = that.Ds(triggerSelector, footerSelector);
                        for (var i = 0; i < items.length; i++) {
                            items[i].addEventListener("touchstart", function (e) {
                                var item = this;
                                var index = that.getIndex(item);

                                var frameObj = framesOption[index];

                                var opt = that.extendObj(that.DEFAULT_CONFIG.openFrame_CONFIG, frameObj);
                                delete opt.name;
                                delete opt.url;
                                delete opt.header;
                                delete opt.rect;

                                if (window.___currentFrameName___ && window.___currentFrameName___ != frameObj.name) {
                                    H.setFrameAttr(window.___currentFrameName___, true);
                                }
                                if (window.___currentTriggerIndex___ != index && window.___currentTriggerIndex___ != -1) {
                                    // 设置选中
                                    var currentItem = that.D(footerSelector + " " + triggerSelector + ":nth-child(" + (___currentTriggerIndex___ + 1) + ")");
                                    currentItem.classList.remove(triggerActiveClass);
                                    // 头部切换
                                    that.D(framesOption[___currentTriggerIndex___].header).classList.add(headerToggleClass);
                                }
                                that.D(framesOption[index].header).classList.remove(headerToggleClass);

                                if (window.___frameNameList___.indexOf(frameObj.name) > -1) {
                                    H.setFrameAttr(frameObj.name, false);
                                } else {
                                    H.openFrameNavOrFoot(frameObj.name, frameObj.url, frameObj.header, that.pageParam, footerSelector, opt);
                                    window.___frameNameList___.push(frameObj.name);
                                }
                                item.classList.add(triggerActiveClass);
                                window.___currentFrameName___ = frameObj.name;
                                window.___currentTriggerIndex___ = index;
                            });
                        }
                    }
                }

                var _evt = document.createEvent('Event');
                _evt.initEvent('touchstart', true, true);
                that.D(footerSelector + " " + triggerSelector + ":nth-child(" + defaultIndex + ")").dispatchEvent(_evt);
            },
            openFrameGroupIndexByClick: function (callback, groupName, framesOption, index, isScroll, headerToggleClass, footerSelector, triggerSelector, triggerActiveClass, options) {
                var that = this;
                window.___currentTriggerGroupIndex___ = -1;

                index = Math.abs(that.isNumber(index) ? Number(index) : 0);

                if (!that.isArray(framesOption)) {
                    console.error("必须传入frame配置数组对象！");
                } else {
                    if (!(framesOption.length > 0 && framesOption.length == that.Ds(triggerSelector, footerSelector).length)) {
                        console.error("传入的frame配置数组个数必须大于0并且个数等于触发按钮的个数！");
                    } else {
                        if (index > framesOption.length - 1) {
                            index = framesOption.length;
                        }

                        var items = that.Ds(triggerSelector, footerSelector);
                        for (var i = 0; i < items.length; i++) {
                            items[i].addEventListener("touchstart", function (e) {
                                var item = this;
                                var index = that.getIndex(item);

                                that.setFrameGroupIndex(groupName, index, isScroll);
                            });
                        }

                        that.openFrameGroupNavOrFoot(function (ret, err) {
                            var frameName = ret.name;
                            var index = ret.index;

                            if (window.___currentTriggerGroupIndex___ != index && window.___currentTriggerGroupIndex___ != -1) {
                                // 设置选中
                                var currentItem = that.D(footerSelector + " " + triggerSelector + ":nth-child(" + (window.___currentTriggerGroupIndex___ + 1) + ")");
                                currentItem.classList.remove(triggerActiveClass);

                                // 头部切换
                                that.D(framesOption[___currentTriggerGroupIndex___].header).classList.add(headerToggleClass);
                            }
                            that.D(framesOption[index].header).classList.remove(headerToggleClass);
                            that.fixStatusBar(function (offset) {
                                that.setFrameGroupAttr(groupName, false, {
                                    x: 0,
                                    y: offset.h,
                                    h: that.winHeight - offset.h - that.offset(footerSelector).h,
                                    w: that.winWidth
                                });
                            }, framesOption[index].header);

                            var item = that.D(footerSelector + " " + triggerSelector + ":nth-child(" + (index + 1) + ")");
                            item.classList.add(triggerActiveClass);

                            window.___currentTriggerGroupIndex___ = index;

                            if (that.isFunction(callback)) {
                                callback(ret, err);
                            }
                        }, groupName, framesOption, index, framesOption[index].header, footerSelector, options);
                    }
                }
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
                    var tpls = tpl.replace(/[\r\n]/g, "").split(that.tppl_flag[0]);

                    fn.$ = "var $=''";
                    for (var t in tpls) {
                        var p = tpls[t].split(that.tppl_flag[1]);
                        if (t != 0) {
                            fn.$ += '=' == p[0].charAt(0) ? "+(" + p[0].substr(1) + ")" : ";" + p[0] + "$=$";
                        }
                        fn.$ += "+'" + p[p.length - 1].replace(/\'/g, "\\'") + "'";
                    }
                    fn.$ += ";return $;";

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
            return api.appId;
        }
    });
    Object.defineProperty(H, "appName", {
        get: function () {
            return api.appName;
        }
    });
    Object.defineProperty(H, "appVersion", {
        get: function () {
            return api.appVersion;
        }
    });
    Object.defineProperty(H, "systemType", {
        get: function () {
            return api.systemType;
        }
    });
    Object.defineProperty(H, "systemVersion", {
        get: function () {
            return api.systemVersion;
        }
    });
    Object.defineProperty(H, "version", {
        get: function () {
            return api.version;
        }
    });
    Object.defineProperty(H, "deviceId", {
        get: function () {
            return api.deviceId;
        }
    });
    Object.defineProperty(H, "deviceToken", {
        get: function () {
            return api.deviceToken;
        }
    });
    Object.defineProperty(H, "deviceModel", {
        get: function () {
            return api.deviceModel;
        }
    });
    Object.defineProperty(H, "deviceName", {
        get: function () {
            return api.deviceName;
        }
    });
    Object.defineProperty(H, "operator", {
        get: function () {
            return api.operator;
        }
    });
    Object.defineProperty(H, "connectionType", {
        get: function () {
            return api.connectionType;
        }
    });
    Object.defineProperty(H, "fullScreen", {
        get: function () {
            return api.fullScreen;
        }
    });
    Object.defineProperty(H, "screenWidth", {
        get: function () {
            return api.screenWidth;
        }
    });
    Object.defineProperty(H, "screenHeight", {
        get: function () {
            return api.screenHeight;
        }
    });
    Object.defineProperty(H, "winName", {
        get: function () {
            return api.winName;
        }
    });
    Object.defineProperty(H, "winWidth", {
        get: function () {
            return api.winWidth;
        }
    });
    Object.defineProperty(H, "winHeight", {
        get: function () {
            return api.winHeight;
        }
    });
    Object.defineProperty(H, "frameName", {
        get: function () {
            return api.frameName;
        }
    });
    Object.defineProperty(H, "frameWidth", {
        get: function () {
            return api.frameWidth;
        }
    });
    Object.defineProperty(H, "frameHeight", {
        get: function () {
            return api.frameHeight;
        }
    });
    Object.defineProperty(H, "pageParam", {
        get: function () {
            return api.pageParam;
        }
    });
    Object.defineProperty(H, "wgtParam", {
        get: function () {
            return api.wgtParam;
        }
    });
    Object.defineProperty(H, "appParam", {
        get: function () {
            return api.appParam;
        }
    });
    Object.defineProperty(H, "wgtRootDir", {
        get: function () {
            return api.wgtRootDir;
        }
    });
    Object.defineProperty(H, "fsDir", {
        get: function () {
            return api.fsDir;
        }
    });
    Object.defineProperty(H, "cacheDir", {
        get: function () {
            return api.cacheDir;
        }
    });
    Object.defineProperty(H, "iOS7StatusBarAppearance", {
        get: function () {
            return api.iOS7StatusBarAppearance;
        }
    });
    // ######################### 设置pageParam默认值
    var _openWin_ = H.DEFAULT_CONFIG.openWin_CONFIG;
    Object.defineProperty(_openWin_, "pageParam", {
        get: function () {
            return H.pageParam;
        }
    });
    Object.defineProperty(_openWin_, "delay", {
        get: function () {
            return H.systemType == "ios" ? 0 : 0;
        }
    });
    var _openFrame_ = H.DEFAULT_CONFIG.openFrame_CONFIG;
    Object.defineProperty(_openFrame_, "pageParam", {
        get: function () {
            return H.pageParam;
        }
    });
    var _openPopoverWin_ = H.DEFAULT_CONFIG.openPopoverWin_CONFIG;
    Object.defineProperty(_openPopoverWin_, "pageParam", {
        get: function () {
            return H.pageParam;
        }
    });
    var _openDrawerLayout_ = H.DEFAULT_CONFIG.openDrawerLayout_CONFIG;
    Object.defineProperty(_openDrawerLayout_, "pageParam", {
        get: function () {
            return H.pageParam;
        }
    });
    // ######################### 常量
    // toast位置
    Object.defineProperty(H, "ENUM_toast_location", {
        get: function () {
            return {
                top: "top",
                middle: "middle",
                bottom: "bottom"
            };
        }
    });

    // 传感器类型
    Object.defineProperty(H, "ENUM_startSensor_type", {
        get: function () {
            return {
                accelerometer: "accelerometer",
                gyroscope: "gyroscope",
                magnetic_field: "magnetic_field",
                proximity: "proximity"
            };
        }
    });
});

document.body.addEventListener('touchstart', function () { });