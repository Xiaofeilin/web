String.prototype.Trim = function() {
    return this.replace(/(^\s*)|(\s*$)/g, "")
};
function getFormJson(c) {
    var d = {};
    var b = $(c).serializeArray();
    $.each(b, function() {
        if (d[this.name] !== undefined) {
            if (!d[this.name].push) {
                d[this.name] = [d[this.name]]
            }
            d[this.name].push(this.value || "")
        } else {
            d[this.name] = this.value || ""
        }
    });
    return d
}
var srscommon = srscommon || {};
srscommon.settings = {baseUrl: $("#baseUrl").val()};
srscommon.hideMobile = function(a) {
    if (!a) {
        return""
    }
    return a.substring(0, 3) + "******" + a.substring(9, 11)
};
srscommon.hideEmail = function(b) {
    if (!b) {
        return""
    }
    var d = b.indexOf("@");
    if (d < 0) {
        return""
    }
    var c = b.substring(0, d);
    if (c.length == 0) {
        return b
    }
    if (c.length == 1) {
        return"***" + b
    }
    var a = b.substring(d, b.length);
    if (c.length == 2) {
        return c.substring(0, 1) + "***" + c.substring(1, 2) + a
    }
    if (c.length >= 3) {
        return c.substring(0, 2) + "***" + c.substring(c.length - 1, c.length) + a
    }
};
srscommon.jumpCountDown = function(c, d) {
    var b = parseInt($(c).text());
    function a() {
        if (b != 0) {
            setTimeout(function() {
                b -= 1;
                $("#countdown").text(b);
                a()
            }, 1000)
        } else {
            window.location.href = d;
            return false
        }
    }
    a()
};
srscommon.guessRegMode = function(a) {
    var c = /^[1]\d{10}$/;
    var b = /@/;
    if (a.length == 0 || a == "手机号/邮箱" || a == "手机号") {
        return""
    } else {
        if (c.test(a)) {
            return"mobileRegSubMode"
        } else {
            if (b.test(a)) {
                return"emailRegSubMode"
            } else {
                return"wrongLoginName"
            }
        }
    }
};
srscommon.checkImgShow = function(b, a) {
    $.ajax({url: srscommon.settings.baseUrl + "/checkimgcodeshow.do", type: "POST", async: false, cache: false, data: {}, dataType: "json", success: function(c) {
            if ("R0" == c.result) {
                b(c)
            } else {
                a(c)
            }
        }})
};
srscommon.checkRegTypeAndImgShow = function(f, e, c, b, g, d) {
    var a;
    $.ajax({url: "ajax.php", type: "POST", async: false, cache: false, dataType: "json", success: function(h) {
            if ("2" == h.regType) {
                f(h)
            } else {
                e(h)
            }
            if ("R0" == h.result) {
                c(h)
            } else {
                b(h)
            }
            if ("1" == h.voiceCodeEable) {
                g()
            } else {
                d()
            }
        }, error: function() {
            e(data);
            c(data);
            d()
        }});
    return a
};
srscommon.fun_getVcode = function(b, a) {
    $.ajax({type: "post", url: srscommon.settings.baseUrl + "/getuid.do", contentType: "application/x-www-form-urlencoded;charset=UTF-8", dataType: "json", async: false, success: function(d) {
            var c = d.uuid;
            $(b).attr("src", "https://vcs.suning.com/vcs/imageCode.htm?uuid=" + c);
            $(a).val(c)
        }})
};
srscommon.bindKeypressCapsLock = function(b, c, a) {
    document.getElementById(b).onkeypress = function(h) {
        var j = h || window.event;
        var i = j.keyCode || j.which;
        var f = j.target || j.srcElement;
        var g = f.id;
        var d = j.shiftKey || (i == 16) || false;
        if (((i >= 65 && i <= 90) && !d) || ((i >= 97 && i <= 122) && d)) {
            c()
        } else {
            a()
        }
    }
};
srscommon.ajaxRegchannel = function(a) {
//    $.ajax({url: srscommon.settings.baseUrl + "/getregchannel.do", type: "POST", async: false, cache: false, data: {}, dataType: "json", success: function(b) {
//            a(b.regChannel)
//        }})
};
srscommon.initCitySelect = function(b, a) {
    if ($(b).size() > 0) {
        $(b).mCity({used: true, getCity: function(f) {
                var d = f.province.id;
                var e = f.city.lesId;
                var c = f.district.lesId;
                a(d, e, c)
            }, distCb: function(f) {
                var d = f.province.id;
                var e = f.city.lesId;
                var c = f.district.lesId;
                a(d, e, c)
            }, changeCb: function(f) {
                var d = f.province.id;
                var e = f.city.lesId;
                var c = f.district.lesId;
                a(d, e, c)
            }})
    }
};
srscommon.bindSmsSendButton = function(m) {
    var e = $.extend({sendButtonId: ".getmscode", eventype: "click", sendButtonDisableClass: "gray1", sendButtonEnableClass: "blue1", secondNum: 60, vaildateDataFun: function() {
            return true
        }, getSendAjaxDataFun: function() {
            return{}
        }, sendCodeCallback: function(n, o, q, p) {
        }, secCountCallback: function(n) {
        }}, m);
    var b = e.sendButtonId;
    var a = e.eventype;
    var i = e.sendButtonDisableClass;
    var f = e.sendButtonEnableClass;
    var d = e.secondNum;
    var j = e.getSendAjaxDataFun;
    var c = e.sendCodeCallback;
    var l = e.vaildateDataFun;
    var k = e.secCountCallback;
    $(b).on(a, function() {
        if ($(this).hasClass(i)) {
            return
        }
        if (!l()) {
            return
        }
        $(this).removeClass(f);
        $(this).addClass(i);
        $(this).html('<span>重新获取<i class="count">' + d + "</i>s</span>");
        timer = setInterval(h, 1000);
        g()
    });
    function h() {
        var n = $(b).find(".count");
        count = n.html();
        $doc = $(b);
        if (count > 0) {
            n.html(count - 1)
        } else {
            window.clearInterval(timer);
            $doc.html('<span><i class="count"></i>重新获取验证码</span>');
            $doc.removeClass(i);
            $doc.addClass(f)
        }
        k(count)
    }
    function g() {
        $.ajax({url: "/ajax/code/sms.do", type: "POST", data: j(), dataType: "json", async: false, success: function(n) {
                if ("R0000" == n.returnCode) {
                    if (n.lessTimes > 0) {
                        c("R0000", "手机验证码已经成功发送，请注意查收，您还有" + n.lessTimes + "次获取机会", n.seqNum, n.lessTimes)
                    } else {
                        if (0 == n.lessTimes) {
                            c("R0000", "手机验证码已经成功发送，请注意查收", n.seqNum, n.lessTimes)
                        }
                    }
                } else {
                    if ("R0001" == n.returnCode) {
                        c("R0001", "您的操作已失效，请刷新页面后操作！", n.seqNum, n.lessTimes)
                    } else {
                        if (null != n && "" != n.returnMsg) {
                            c(n.returnCode, n.returnMsg, n.seqNum, n.lessTimes)
                        } else {
                            c("", "短信验证码发送失败", -1, -1)
                        }
                    }
                }
            }, error: function() {
                c("", "您的网络不给力，请稍候再试", -1, -1)
            }})
    }}
;
srscommon.bindEmailSendButton = function(m) {
    var e = $.extend({sendButtonId: ".getmscode", eventype: "click", sendButtonDisableClass: "gray1", sendButtonEnableClass: "blue1", secondNum: 60, vaildateDataFun: function() {
            return true
        }, getSendAjaxDataFun: function() {
            return{}
        }, sendCodeCallback: function(n, o, q, p) {
        }, secCountCallback: function(n) {
        }}, m);
    var b = e.sendButtonId;
    var a = e.eventype;
    var i = e.sendButtonDisableClass;
    var f = e.sendButtonEnableClass;
    var d = e.secondNum;
    var j = e.getSendAjaxDataFun;
    var c = e.sendCodeCallback;
    var l = e.vaildateDataFun;
    var k = e.secCountCallback;
    $(b).on(a, function() {
        if ($(this).hasClass(i)) {
            return
        }
        if (!l()) {
            return
        }
        $(this).removeClass(f);
        $(this).addClass(i);
        $(this).html('<span>重新获取<i class="count">' + d + "</i>s</span>");
        timer = setInterval(h, 1000);
        g()
    });
    function h() {
        var n = $(b).find(".count");
        count = n.html();
        $doc = $(b);
        if (count > 0) {
            n.html(count - 1)
        } else {
            window.clearInterval(timer);
            $doc.html('<span><i class="count"></i>重新获取验证码</span>');
            $doc.removeClass(i);
            $doc.addClass(f)
        }
        k(count)
    }
    function g() {
        $.ajax({url: "/ajax/code/email.do", type: "POST", data: j(), dataType: "json", async: false, success: function(n) {
                if ("R0000" == n.returnCode) {
                    if ("" != n.domainLink) {
                        c("R0000", "邮箱验证码第" + n.seqNum + '次成功发送， 请<a name="" href="' + n.domainLink + '" target="_blank" class="emailTipDomainLink">登录邮箱</a>查收，24小时内有效', n)
                    } else {
                        c("R0000", "邮箱验证码第" + n.seqNum + "次成功发送， 请登录邮箱查收，24小时内有效", n)
                    }
                } else {
                    if ("R0001" == n.returnCode) {
                        c("R0001", "您的操作已失效，请刷新页面后操作！", n)
                    } else {
                        if (null != n && "" != n.returnMsg) {
                            c(n.returnCode, n.returnMsg, n)
                        } else {
                            c("", "邮箱验证码发送失败", null)
                        }
                    }
                }
            }, error: function() {
                c("", "您的网络不给力，请稍候再试", null)
            }})
    }}
;
srscommon.bindYuyiSendButton = function(j) {
    var d = $.extend({sendButtonId: ".yuyin", eventype: "click", sendButtonDisableClass: "gray1", sendButtonEnableClass: "org1", vaildateDataFun: function() {
            return true
        }, getSendAjaxDataFun: function() {
            return{}
        }, sendCodeCallback: function(k, l, n, m) {
        }}, j);
    var b = d.sendButtonId;
    var a = d.eventype;
    var g = d.sendButtonDisableClass;
    var e = d.sendButtonEnableClass;
    var i = d.vaildateDataFun;
    var h = d.getSendAjaxDataFun;
    var c = d.sendCodeCallback;
    $(b).on(a, function() {
        if ($(this).hasClass(g)) {
            return
        }
        if (!i()) {
            return
        }
        $(this).removeClass(e);
        $(this).addClass(g);
        f()
    });
    function f() {
        $.ajax({url: "/ajax/code/yy.do", type: "POST", data: h(), dataType: "json", async: false, success: function(k) {
                if ("R0000" == k.returnCode) {
                    c("R0000", "稍后将有苏宁的电话拨打给您，告知验证码内容，请耐心等待~", k.seqNum, k.lessTimes)
                } else {
                    if ("R0001" == k.returnCode) {
                        c("R0001", "您的操作已失效，请刷新页面后操作！", k.seqNum, k.lessTimes)
                    } else {
                        if (null != k && "" != k.returnMsg) {
                            c(k.returnCode, k.returnMsg, k.seqNum, k.lessTimes)
                        } else {
                            c("", "语音验证码发送失败", -1, -1)
                        }
                    }
                }
            }, error: function() {
                c("__error", "语音验证码发送失败", -1, -1)
            }})
    }}
;
srscommon.wapGohome = function() {
    location.href = "http://m.suning.com?adTypeCode=1001"
};
srscommon.wapGoReg = function(b) {
    var a = navigator.userAgent.toLowerCase();
    if (a.match(/MicroMessenger/i) == "micromessenger") {
        location.href = "/wap/person.do";
        return
    } else {
        if (a.indexOf("snebuy-app") > 0 && a.match(/(iphone|ipod|ipad);?/i)) {
            window.SNNativeClient.routeToClientPage("1053", "");
            b();
            return
        } else {
            if (a.indexOf("snebuy-app") > 0 && a.match(/android/i)) {
                if (!b) {
                    b = function() {
                    }
                }
                location.href = "http://m.suning.com?adTypeCode=1053";
                b();
                return
            } else {
                location.href = "/wap/person.do";
                return
            }
        }
    }
};
srscommon.eppLogin = function() {
    var b = "https://passport.suning.com/ids";
    b = b.replace("://", "%3A%2F%2F").replace("/", "%2F");
    var c = "https://paypassport.suning.com";
    var a = c + "/ids/oauth20/authorize?client_id=suning_01&response_type=code&redirect_uri=" + b + "%2Flogin%3Foauth_provider%3DEppProvider";
    var d = $("#myTargetUrl").val();
    if (null == d || "" == d) {
        window.location.href = a
    } else {
        window.location.href = a + "&state=" + encodeURIComponent(d)
    }
};
srscommon.goCompanyReg = function(a) {
    if (null == a || "" == a) {
        window.location.href = $("#baseUrl").val() + "/company.do"
    } else {
        window.location.href = $("#baseUrl").val() + "/company.do?myTargetUrl=" + a
    }
};
srscommon.goPersonReg = function(a) {
    if (null == a || "" == a) {
        window.location.href = $("#baseUrl").val() + "/person.do"
    } else {
        window.location.href = $("#baseUrl").val() + "/person.do?myTargetUrl=" + a
    }
};