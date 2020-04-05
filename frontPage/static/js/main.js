// var apihost = "http://wx.wxarzhe.com/web-api"
var apihost = "http://localhost:8080"
var staticHost = window.location.origin;
$.ajaxSetup({
    contentType: 'application/json',
    dataType: "json",
})

// 登出
function loginOut() {
    $.post(apihost + '/front/user/logOut', JSON.stringify({
        body: {},
        header: {
            "authentication": localStorage.token || '',
        }
    }), function (res) {
        if (res.header.code != "SUCCESS") {
            layer.msg(res.header.msg)
            // 错误码处理
            parsingErrorCode(res)
            return false
        }
        goLoginPage();
    })
}

$.fn.extend({
    getform: function () {
        var obj = {};
        var array = $(this).serializeArray();
        $.each(array, function () {
            obj[this.name] = this.value;
        });
        return obj;
    },
    setform: function (jsonValue) {
        var obj = this;
        for (var key in jsonValue){
            if(jsonValue[key]===null){
                jsonValue[key]=""
            }
        }
        $.each(jsonValue, function (name, ival) {
            var $input = obj.find("input[name=" + name + "]");
            if ($input.attr("type") == "radio" || $input.attr("type") == "checkbox") {
                $input.each(function () {
                    if (Object.prototype.toString.apply(ival) == '[object Array]') { // 是复选框，并且是数组
                        for (var i = 0; i < ival.length; i++) {
                            if ($(this).val() == ival[i])
                                $(this).attr("checked", "checked");
                        }
                    } else {
                        if ($(this).val() == ival.toString())
                            $(this).attr("checked", "checked");
                    }
                });
            } else if ($input.attr("type") == "textarea") { // 多行文本框
                obj.find("[name=" + name + "]").html(ival);
            } else {
                obj.find("[name=" + name + "]").val(ival);
            }

            if(ival){
                var $select = obj.find("select[name=" + name + "]");

                $select.find('option').each(function () {
                    if ($select.attr('key') == "label") {
                        if ($(this).text() == ival.toString()) {
                            $(this).attr("selected", true);
                        }
                    } else {
                        if ($(this).attr('value') == ival.toString()) {
                            $(this).attr("selected", true);
                        }
                    }
                })
            }
        });
    }
})

zyEs6AssignPolyfill()

function zyEs6AssignPolyfill() {
    if (!Object.assign) {
        Object.defineProperty(Object, "assign", {
            enumerable: false,
            configurable: true,
            writable: true,
            value: function (target, firstSource) {
                "use strict";
                if (target === undefined || target === null)
                    throw new TypeError("Cannot convert first argument to object");
                var to = Object(target);
                for (var i = 1; i < arguments.length; i++) {
                    var nextSource = arguments[i];
                    if (nextSource === undefined || nextSource === null) continue;
                    var keysArray = Object.keys(Object(nextSource));
                    for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                        var nextKey = keysArray[nextIndex];
                        var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
                        if (desc !== undefined && desc.enumerable) to[nextKey] = nextSource[nextKey];
                    }
                }
                return to;
            }
        });
    }
    if (!String.prototype.padStart) {
        String.prototype.padStart = function padStart(targetLength, padString) {
            targetLength = targetLength >> 0; //floor if number or convert non-number to 0;
            padString = String((typeof padString !== 'undefined' ? padString : ' '));
            if (this.length > targetLength) {
                return String(this);
            }
            else {
                targetLength = targetLength - this.length;
                if (targetLength > padString.length) {
                    padString += padString.repeat(targetLength / padString.length); //append to original to ensure we are longer than needed
                }
                return padString.slice(0, targetLength) + String(this);
            }
        };
    }
}

function dateFormat(fmt, date) {
    date = new Date(date * 1000)
    var ret;
    var opt = {
        "Y+": date.getFullYear().toString(),        // 年
        "m+": (date.getMonth() + 1).toString(),     // 月
        "d+": date.getDate().toString(),            // 日
        "H+": date.getHours().toString(),           // 时
        "M+": date.getMinutes().toString(),         // 分
        "S+": date.getSeconds().toString()          // 秒
        // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (var k in opt) {
        ret = new RegExp("(" + k + ")").exec(fmt);
        if (ret) {
            fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
        }
        ;
    }
    ;
    return fmt;
}


function GetRequest() {
    var url = location.search; //获取url中"?"符后的字串
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}


// 进入完善个人信息页
function goPerfectIUserInfo() {
    location.replace("/pages/profile/index.html");
}

// 进入登录页
function goLoginPage() {
    location.replace("/pages/login/index.html")
}

function parsingErrorCode(error) {
    if (!error) {
        return;
    }
    // 未登录
    if (error.header.code == "PERMISSION_ERROR_LOGIN") {
        setTimeout(goLoginPage(), 1000);
    } else if (error.header.code == "ERROR_PERMISSION") {
        // 没有访问权限
        setTimeout(goPerfectIUserInfo(), 1000);
    }else{
        layer.msg(error.header.msg)
    }
}