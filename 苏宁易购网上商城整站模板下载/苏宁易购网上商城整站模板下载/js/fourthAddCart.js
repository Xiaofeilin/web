var envType = "PRD";
var domain_prd_reg = /^\w*?.suning.com$/;
var domain_pre_reg = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
var domain_sit_reg = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
var domain_dev_reg = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
var _hostName = document.location.hostname;
var isSelfWillPay = false;
if (domain_prd_reg.test(_hostName)) {
    envType = "PRD"
} else {
    if (domain_pre_reg.test(_hostName)) {
        envType = "PRE"
    } else {
        if (domain_sit_reg.test(_hostName)) {
            envType = "SIT"
        } else {
            if (domain_dev_reg.test(_hostName)) {
                envType = "DEV"
            } else {
                envType = "PRD"
            }
        }
    }
}
function getNewCartDomain() {
    var a = "shopping.suning.com";
    if (envType == "PRE") {
        a = "shoppingpre.cnsuning.com"
    } else {
        if (envType == "SIT") {
            a = "shoppingsit.cnsuning.com"
        } else {
            if (envType == "DEV") {
                a = "ccfdev.cnsuning.com:8080"
            }
        }
    }
    return a
}
function getNCartDomain() {
    var a = "ncart.suning.com";
    if (envType == "PRE") {
        a = "ncartpre.cnsuning.com"
    } else {
        if (envType == "SIT") {
            a = "ncartsit.cnsuning.com"
        } else {
            if (envType == "DEV") {
                a = "ncartdev.cnsuning.com:8080"
            }
        }
    }
    return a
}
function getBindPhoneUrl() {
    var a = "https://aq.suning.com/asc/mobile/check.do";
    if (envType == "PRE") {
        a = "https://aqpre.cnsuning.com/asc/mobile/check.do"
    } else {
        if (envType == "SIT") {
            a = "https://aqsit.cnsuning.com/asc/mobile/check.do"
        } else {
            if (envType == "DEV") {
                a = "https://aq.suning.com/asc/mobile/check.do"
            }
        }
    }
    return a
}
function getBrondPayUrl() {
    var a = "https://passport.suning.com/ids/trustLogin?sysCode=epp&targetUrl=https://pay.suning.com/epp-epw/quickPay/quick-pay-contract!showBankList.action";
    if (envType == "PRE") {
        a = "https://passportpre.cnsuning.com/ids/trustLogin?sysCode=epp&targetUrl=https://prepay.cnsuning.com/epp-epw/quickPay/quick-pay-contract!showBankList.action"
    } else {
        if (envType == "SIT") {
            a = "https://passportsit.cnsuning.com/ids/trustLogin?sysCode=epp&targetUrl=https://sitpay.cnsuning.com/epp-epw/quickPay/quick-pay-contract!showBankList.action"
        } else {
            if (envType == "DEV") {
                a = "https://passport.suning.com/ids/trustLogin?sysCode=epp&targetUrl=https://pay.suning.com/epp-epw/quickPay/quick-pay-contract!showBankList.action"
            }
        }
    }
    return a
}
function getBindScodeUrl() {
    var a = "http://sma.suning.com/sma/self/toBind.htm";
    if (envType == "PRE") {
        a = "http://smapre.cnsuning.com/sma/self/toBind.htm"
    } else {
        if (envType == "SIT") {
            a = "http://smasit.cnsuning.com/sma/self/toBind.htm"
        } else {
            if (envType == "DEV") {
                a = "http://sma.suning.com/sma/self/toBind.htm"
            }
        }
    }
    return a
}
var commPartnumber = "";
var recommendProductInfo = "";
var version = "";
var escss = document.getElementsByTagName("link");
var esjs = document.getElementsByTagName("script");
var shoppingCartUrl = "";
var b2c_fc_authid = "";
function isInclude(a, c) {
    if (c) {
        for (var b = 0; b < esjs.length; b++) {
            if (esjs[b][c ? "src" : "href"].indexOf(a) != -1) {
                return true
            }
        }
        return false
    } else {
        for (var b = 0; b < escss.length; b++) {
            if (escss[b][c ? "src" : "href"].indexOf(a) != -1) {
                return true
            }
        }
        return false
    }
}
var sa = sa || {};
sa.bid = "106";
sa.maxLength = 100;
sa.openAPI = true;
$(document).ready(function() {
    if (!isInclude("jquery", true)) {
        alert("请引入jQuery.js")
    }
    $("script").each(function() {
        if ($(this).attr("src") != undefined && $(this).attr("src").indexOf("fourthAddCart") != -1) {
            if ($(this).attr("src").indexOf("?") <= 0) {
                version = ""
            } else {
                version = $(this).attr("src").substring($(this).attr("src").indexOf("?"))
            }
            return false
        }
    });
    var b = window.location.protocol;
    if (!isInclude("SFE.dialog", true)) {
        if (b == "http:") {
            var a = '<script type="text/javascript" src="http://script.suning.cn/javascript/SFE.dialog.js' + version + '"><\/script>'
        } else {
            var a = '<script type="text/javascript" src="https://imgssl.suning.com/javascript/SFE.dialog.js' + version + '"><\/script>'
        }
        $("title").append(a)
    }
    if (!isInclude("SFE.lion.dialog", true)) {
        if (envType == "PRE") {
            if (b == "http:") {
                var a = '<script type="text/javascript" src="http://prescript.suning.cn/javascript/js_sn/shoppingCart/optimization/SFE.lion.dialog.js' + version + '"><\/script>'
            } else {
                var a = '<script type="text/javascript" src="https://preimgssl.suning.com/javascript/js_sn/shoppingCart/optimization/SFE.lion.dialog.js' + version + '"><\/script>'
            }
        } else {
            if (envType == "SIT") {
                if (b == "http:") {
                    var a = '<script type="text/javascript" src="http://sit1script.suning.cn/javascript/js_sn/shoppingCart/optimization/SFE.lion.dialog.js' + version + '"><\/script>'
                } else {
                    var a = '<script type="text/javascript" src="https://sit1imgssl.suning.com/javascript/js_sn/shoppingCart/optimization/SFE.lion.dialog.js' + version + '"><\/script>'
                }
            } else {
                if (b == "http:") {
                    var a = '<script type="text/javascript" src="http://script.suning.cn/javascript/js_sn/shoppingCart/optimization/SFE.lion.dialog.js' + version + '"><\/script>'
                } else {
                    var a = '<script type="text/javascript" src="https://imgssl.suning.com/javascript/js_sn/shoppingCart/optimization/SFE.lion.dialog.js' + version + '"><\/script>'
                }
            }
        }
        $("title").append(a)
    }
    if (!isInclude("sa-analytics", true)) {
        var a = '<script type="text/javascript" src=' + _getSaJsFilePath("sa-analytics.js") + '"><\/script>';
        $("title").append(a)
    }
    $("#validateCode").keyup(onKeyUpForValidate);
    $("#validateCode").blur(onBlurForValidate)
});
function buyNow(m, k, e, g, c, l, j, a, f, i, b, h) {
    quickBuyNew(l, c, e, k, j, a, 0, i, b, h, f);
    savePageSaleInfo(l, e);
    updatePageSaleInfo()
}
function quickBuyNew(p, l, t, m, D, c, n, h, w, s, j) {
    commPartnumber = p;
    quickPress(true);
    if (typeof (t) == "undefined" || t == null || t == "undefined" || t == "") {
        t = "0000000000"
    }
    var C = "01";
    var r = "";
    if (D == "4") {
        C = "02";
        r = c
    } else {
        if (D == "8-1" || D == "8-2") {
            C = "15";
            r = c
        }
    }
    if (n == 1) {
        C = "07"
    }
    var k = "";
    if (s == "10") {
        C = "02";
        r = c;
        k = s
    }
    if (typeof (bd) != "undefined") {
        setCookie("c2dt", bd.rst())
    }
    var F = "";
    if (needVerifyCodeVal) {
        var f = verifyCodeVal;
        if (f != undefined && f != "" && f != "以下字符不区分大小写") {
            F = f
        } else {
            b2c_fc_authid = ""
        }
        needVerifyCodeVal = false
    }
    var e = "";
    if (s == "10") {
        e = "http://" + getNCartDomain() + "/nowBuy.do?callback=?"
    } else {
        e = "http://" + getNewCartDomain() + "/nowBuy.do?callback=?"
    }
    var a = "";
    if (null != h || undefined != h) {
        a = h
    }
    var B = "";
    if (null != w || undefined != w) {
        B = w
    }
    var b = {payPeriods: B, verifyCode: F, uuid: v_uuid, pickupSiteCode: a};
    var G = new Array();
    if (null != l && "" != l) {
        var v = l.split(",");
        for (var y = 0, A = v.length; y < A; y++) {
            var o = v[y].split("-");
            var H = {cmmdtyCode: o[0], cmmdtyQty: m, supplierCode: o[1]};
            G[y] = H
        }
    }
    var g = new Array();
    if (null != j && "" != j) {
        var u = j.split("@@@");
        for (var y = 0, A = u.length; y < A; y++) {
            var x = u[y].split("@@");
            var z = {cmmdtyCode: x[1], cmmdtyQty: x[3]};
            g[y] = z
        }
    }
    var q = [{activityId: r, activityType: C, subActivityType: k, cmmdtyCode: p, cmmdtyQty: m, shopCode: t, cmmdtyWarrantyVOList: G, giftVOList: g}];
    b.cmmdtyVOList = q;
    var E = {cartVO: obj2string(b), b2c_fc_authid: b2c_fc_authid};
    $.getJSON(e, E).done(function(K) {
        var I = K.returnCode;
        if (null != I && "" != I && "4000" == I) {
            Util.alertErrorBox("您访问的太频繁， 网络拥堵，请您稍后再试！");
            quickPress(false);
            try {
                sa.openAPI.sendMessage("Buynow", "您访问的太频繁， 网络拥堵，请您稍后再试！CODE:" + I + ",USER:" + getCookie("custno"))
            } catch (M) {
            }
            return false
        }
        if (null != I && "" != I && "4001" == I) {
            b2c_fc_authid = K.b2c_fc_authid;
            needVerifyCodeVal = true;
            quickPress(false);
            showMinos3(K.uuid)
        }
        var i = K.isSuccess;
        if (i == "Y") {
            if (s == "10") {
                shoppingCartUrl = "http://" + getNCartDomain() + "/order.do?cart2No=" + K.cart2No
            } else {
                shoppingCartUrl = "http://" + getNewCartDomain() + "/order.do?cart2No=" + K.cart2No
            }
            toShoppingCart()
        } else {
            if (K.resultErrorList[0] != undefined && K.resultErrorList[0][0] != undefined) {
                var J = K.resultErrorList[0][0].errorMessage;
                var L = K.resultErrorList[0][0].errorCode;
                if (L == "017") {
                    needVerifyCodeVal = true;
                    quickPress(false);
                    showMinos3(K.uuid)
                } else {
                    if (L == "018") {
                        quickPress(false);
                        showMinos2()
                    } else {
                        if (L == "019") {
                            quickPress(false);
                            showMinos1()
                        } else {
                            if (L == "015" || L == "025") {
                                aqSuning1.showMobilePopType(false);
                                quickPress(false)
                            } else {
                                if (L == "024") {
                                    Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                                    quickPress(false);
                                    try {
                                        sa.openAPI.sendMessage("Buynow", "您的账号存在异常，请致电客服4008-365-365 CODE:" + L + ",USER:" + getCookie("custno"))
                                    } catch (M) {
                                    }
                                } else {
                                    if (L == "32") {
                                        if (J) {
                                            Util.alertErrorBox(J);
                                            try {
                                                sa.openAPI.sendMessage("Buynow", J + " CODE:" + L + ",USER:" + getCookie("custno"))
                                            } catch (M) {
                                            }
                                        }
                                        location.replace(location)
                                    } else {
                                        if (J != undefined && J != "") {
                                            Util.alertErrorBox(J);
                                            try {
                                                sa.openAPI.sendMessage("Buynow", J + " CODE:" + L + ",USER:" + getCookie("custno"))
                                            } catch (M) {
                                            }
                                        } else {
                                            Util.alertErrorBox("网络报错，请重新点击！");
                                            try {
                                                sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！errorMsg is empty. CODE:" + L + ",USER:" + getCookie("custno"))
                                            } catch (M) {
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                Util.alertErrorBox("网络报错，请重新点击！");
                try {
                    sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！resultErrorList is empty. CODE:,USER:" + getCookie("custno"))
                } catch (M) {
                }
            }
            quickPress(false)
        }
    }).fail(function() {
        Util.alertErrorBox("网络报错，请重新点击！");
        try {
            sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！interface fail. USER:" + getCookie("custno"))
        } catch (i) {
        }
        quickPress(false)
    })
}
function buyNowForPackage(a) {
    var e = a.cmmdtyVOList;
    if (null != e && e.length > 0) {
        var b = e[0];
        commPartnumber = b.cmmdtyCode
    }
    quickPressForPackage(true);
    if (typeof (bd) != "undefined") {
        setCookie("c2dt", bd.rst())
    }
    var c = "";
    if (needVerifyCodeVal) {
        var h = verifyCodeVal;
        if (h != undefined && h != "" && h != "以下字符不区分大小写") {
            c = h
        } else {
            b2c_fc_authid = ""
        }
        needVerifyCodeVal = false
    }
    var g = "http://" + getNewCartDomain() + "/nowBuy.do?callback=?";
    a.verifyCode = c;
    a.uuid = v_uuid;
    var f = {cartVO: obj2string(a), b2c_fc_authid: b2c_fc_authid};
    $.getJSON(g, f).done(function(l) {
        var j = l.returnCode;
        if (null != j && "" != j && "4000" == j) {
            Util.alertErrorBox("您访问的太频繁， 网络拥堵，请您稍后再试！");
            quickPressForPackage(false);
            try {
                sa.openAPI.sendMessage("Buynow", "您访问的太频繁， 网络拥堵，请您稍后再试！CODE:" + j + ",USER:" + getCookie("custno"))
            } catch (n) {
            }
            return false
        }
        if (null != j && "" != j && "4001" == j) {
            b2c_fc_authid = l.b2c_fc_authid;
            needVerifyCodeVal = true;
            quickPress(false);
            showMinos3(l.uuid)
        }
        var i = l.isSuccess;
        if (i == "Y") {
            shoppingCartUrl = "http://" + getNewCartDomain() + "/order.do?cart2No=" + l.cart2No;
            toShoppingCart()
        } else {
            if (l.resultErrorList[0] != undefined && l.resultErrorList[0][0] != undefined) {
                var k = l.resultErrorList[0][0].errorMessage;
                var m = l.resultErrorList[0][0].errorCode;
                if (m == "017") {
                    needVerifyCodeVal = true;
                    quickPressForPackage(false);
                    showMinos3(l.uuid)
                } else {
                    if (m == "018") {
                        quickPressForPackage(false);
                        showMinos2()
                    } else {
                        if (m == "019") {
                            quickPressForPackage(false);
                            showMinos1()
                        } else {
                            if (m == "015" || m == "025") {
                                aqSuning1.showMobilePopType(false);
                                quickPress(false)
                            } else {
                                if (m == "024") {
                                    Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                                    quickPress(false);
                                    try {
                                        sa.openAPI.sendMessage("Buynow", "您的账号存在异常，请致电客服4008-365-365 CODE:" + m + ",USER:" + getCookie("custno"))
                                    } catch (n) {
                                    }
                                } else {
                                    if (k != undefined && k != "") {
                                        Util.alertErrorBox(k);
                                        try {
                                            sa.openAPI.sendMessage("Buynow", k + " CODE:" + m + ",USER:" + getCookie("custno"))
                                        } catch (n) {
                                        }
                                    } else {
                                        Util.alertErrorBox("网络报错，请重新点击！");
                                        try {
                                            sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！errorMsg is empty. CODE:" + m + ",USER:" + getCookie("custno"))
                                        } catch (n) {
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                Util.alertErrorBox("网络报错，请重新点击！");
                try {
                    sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！resultErrorList is empty. CODE:,USER:" + getCookie("custno"))
                } catch (n) {
                }
            }
            quickPressForPackage(false)
        }
    }).fail(function() {
        Util.alertErrorBox("网络报错，请重新点击！");
        quickPressForPackage(false);
        try {
            sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！interface fail. USER:" + getCookie("custno"))
        } catch (i) {
        }
    })
}
function obj2string(c) {
    var b = [];
    if (null == c || typeof (c) == "undefined") {
        return""
    }
    if (typeof c == "string") {
        return c
    }
    if (typeof c == "object") {
        if (!c.sort) {
            for (var a in c) {
                if ("string" == typeof (c[a])) {
                    b.push('"' + a + '":"' + obj2string(c[a]) + '"')
                } else {
                    b.push('"' + a + '":' + obj2string(c[a]))
                }
            }
            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(c.toString)) {
                b.push("toString:" + c.toString.toString())
            }
            b = "{" + b.join() + "}"
        } else {
            for (var a = 0; a < c.length; a++) {
                b.push(obj2string(c[a]))
            }
            b = "[" + b.join() + "]"
        }
        return b
    }
    return c.toString()
}
function buyNowHwg(m, g, f, l, j, n, a, i) {
    commPartnumber = m;
    quickPress(true);
    var o = "01";
    var b = "";
    if (j == "4") {
        o = "02";
        b = n
    }
    if (1 == a) {
        o = "07"
    }
    if (typeof (bd) != "undefined") {
        setCookie("c2dt", bd.rst())
    }
    var k = "";
    if (needVerifyCodeVal) {
        var h = verifyCodeVal;
        if (h != undefined && h != "" && h != "以下字符不区分大小写") {
            k = h
        } else {
            b2c_fc_authid = ""
        }
        needVerifyCodeVal = false
    }
    var c = "http://" + getNewCartDomain() + "/overSeaNowBuy.do";
    var e = {sourcePageType: "", activityType: o, activityId: b, cmmdtyCode: m, shopCode: g, cmmdtyQty: f, overSeasFlag: l == 3 ? "927HWG1" : "927HWG", payPeriods: i, verifyCode: k, uuid: v_uuid, b2c_fc_authid: b2c_fc_authid};
    $.ajax({url: c, data: e, cache: false, async: false, dataType: "jsonp", crossDomain: true, success: function(s) {
            var p = s.isSuccess;
            var q = s.returnCode;
            if (p == "Y") {
                shoppingCartUrl = "http://" + getNewCartDomain() + "/order.do?cart2No=" + s.cart2No;
                toShoppingCart()
            } else {
                if (q == "4000") {
                    Util.alertErrorBox("您访问的太频繁， 网络拥堵，请您稍后再试！");
                    quickPress(false);
                    try {
                        sa.openAPI.sendMessage("Buynow", "您访问的太频繁， 网络拥堵，请您稍后再试！CODE:" + returnCode + ",USER:" + getCookie("custno"))
                    } catch (u) {
                    }
                } else {
                    if (q == "4001") {
                        b2c_fc_authid = s.b2c_fc_authid;
                        needVerifyCodeVal = true;
                        quickPress(false);
                        showMinos3(s.uuid)
                    } else {
                        if (s.resultErrorList[0] != undefined && s.resultErrorList[0][0] != undefined) {
                            var r = s.resultErrorList[0][0].errorMessage;
                            var t = s.resultErrorList[0][0].errorCode;
                            if (t == "015" || t == "025") {
                                aqSuning1.showMobilePopType(false);
                                quickPress(false)
                            } else {
                                if (t == "024") {
                                    Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                                    quickPress(false);
                                    try {
                                        sa.openAPI.sendMessage("Buynow", "您的账号存在异常，请致电客服4008-365-365 CODE:" + t + ",USER:" + getCookie("custno"))
                                    } catch (u) {
                                    }
                                } else {
                                    if (r != undefined && r != "") {
                                        Util.alertErrorBox(r);
                                        try {
                                            sa.openAPI.sendMessage("Buynow", r + " CODE:" + t + ",USER:" + getCookie("custno"))
                                        } catch (u) {
                                        }
                                    } else {
                                        Util.alertErrorBox("网络报错，请重新点击！");
                                        try {
                                            sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！errorMsg is empty. CODE:" + t + ",USER:" + getCookie("custno"))
                                        } catch (u) {
                                        }
                                    }
                                }
                            }
                        } else {
                            Util.alertErrorBox("网络报错，请重新点击！");
                            try {
                                sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！resultErrorList is empty. CODE:,USER:" + getCookie("custno"))
                            } catch (u) {
                            }
                        }
                        quickPress(false)
                    }
                }
            }
        }, error: function() {
            Util.alertErrorBox("网络报错，请重新点击！");
            try {
                sa.openAPI.sendMessage("Buynow", "网络报错，请重新点击！interface fail. USER:" + getCookie("custno"))
            } catch (p) {
            }
            quickPress(false)
        }})
}
function addCartForPackage(j, e, k, c, b, h, f, i, a, g) {
    addCartNewForPackage(j, e, k, c, b, h, f, i, a, g)
}
function addCartNewForPackage(u, A, y, e, k, w, l, v, z, p) {
    if (null == l || "" == l) {
        l = "0000000000"
    }
    var t = "04";
    var h = "";
    var c = "1";
    if (v == "") {
        t = "05";
        c = u
    }
    if ("12" == p || "13" == p) {
        t = p;
        c = u
    }
    var b = "http://" + getNewCartDomain() + "/addCart.do?callback=?";
    var a = {verifyCode: "", uuid: ""};
    var o = new Array();
    if (null != e && "" != e) {
        var j = e.split(",");
        var n = k.split(",");
        var m = w.split(",");
        if (v != "") {
            var s = {cmmdtyCode: y, cmmdtyQty: "1", shopCode: l, accessoryRelationID: ""};
            o[0] = s
        }
        for (var q = 0, r = j.length; q < r; q++) {
            var f = {cmmdtyCode: j[q], cmmdtyQty: c * m[q], shopCode: l, accessoryRelationID: k != "" ? n[q] : ""};
            if (v != "") {
                o[q + 1] = f
            } else {
                o[q] = f
            }
        }
    }
    var g = [{activityId: h, activityType: t, cmmdtyCode: y, cmmdtyQty: u, shopCode: l, childCmmdtyVOList: o}];
    a.cmmdtyVOList = g;
    var x = {cartVO: obj2string(a)};
    $.getJSON(b, x).done(function(D) {
        var B = D.returnCode;
        if (null != B && "" != B && "4000" == B) {
            Util.alertErrorBox("您访问的太频繁， 网络拥堵，请您稍后再试！");
            quickPress(false);
            try {
                sa.openAPI.sendMessage("Addcart", "您访问的太频繁， 网络拥堵，请您稍后再试！CODE:" + B + ",USER:" + getCookie("custno"))
            } catch (F) {
            }
            return false
        }
        var i = D.isSuccess;
        if (i == "Y") {
            shoppingCartUrl = "http://" + getNewCartDomain() + "/cart.do";
            toShoppingCart()
        } else {
            var C = D.addCartErrorList[0].errorMessage;
            var E = D.addCartErrorList[0].errorCode;
            if (E == "017") {
                needVerifyCodeVal = true;
                quickPress(false);
                showMinos3(D.uuid)
            } else {
                if (E == "018") {
                    quickPress(false);
                    showMinos2()
                } else {
                    if (E == "019") {
                        quickPress(false);
                        showMinos1()
                    } else {
                        if (E == "015" || E == "025") {
                            aqSuning1.showMobilePopType(false);
                            quickPress(false)
                        } else {
                            if (E == "024") {
                                Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                                quickPress(false);
                                try {
                                    sa.openAPI.sendMessage("Addcart", "您的账号存在异常，请致电客服4008-365-365 CODE:" + E + ",USER:" + getCookie("custno"))
                                } catch (F) {
                                }
                            } else {
                                if (C != undefined && C != "") {
                                    Util.alertErrorBox(C);
                                    try {
                                        sa.openAPI.sendMessage("Addcart", C + " CODE:" + E + ",USER:" + getCookie("custno"))
                                    } catch (F) {
                                    }
                                } else {
                                    Util.alertErrorBox("网络报错，请重新点击！");
                                    try {
                                        sa.openAPI.sendMessage("Addcart", "网络报错，请重新点击！errorMsg is empty. CODE:" + E + ",USER:" + getCookie("custno"))
                                    } catch (F) {
                                    }
                                }
                            }
                        }
                    }
                }
            }
            quickPress(false)
        }
    }).fail(function() {
        Util.alertErrorBox("网络报错，请重新点击！");
        try {
            sa.openAPI.sendMessage("Addcart", "网络报错，请重新点击！interface fail. USER:" + getCookie("custno"))
        } catch (i) {
        }
        quickPress(false)
    });
    savePageSaleInfo(y, l)
}
function addCartOldForPackage(m, g, n, f, b, h, l, a) {
    if (l == "") {
        addCartForSmall(m, n);
        return
    }
    var e = "http://" + sn.cartPath + "/addMiniSoppingCart";
    var c = {ERROEVIEW: "miniShoppingCartView", URL: "miniShoppingCartView", quantity: m, fullInventoryCheck: "0", inventoryCheckType: "0", fullVoucherCheck: "0", voucherCheckType: "0", inventoryRemoteCheck: "0", voucherRemoteCheck: "1", storeId: "10052", catalogId: "10051", orderId: ".", supplierCode: h, partnumber: n, priceType: l, promotionActiveId: a};
    var k = f.split(",");
    for (var j = 0; j < k.length; j++) {
        c["accessorySubId_" + (j + 1)] = k[j]
    }
    var o = b.split(",");
    for (var j = 0; j < o.length; j++) {
        c["accessoryActivityId_" + (j + 1)] = o[j]
    }
    $.ajax({url: e, data: c, cache: false, async: false, dataType: "jsonp", jsonp: "callback", success: function(i) {
            if (i.userStatus != "") {
                Util.alertErrorBox("您的会员卡已冻结，请拨打4008-198-198或在线客服处理。");
                try {
                    sa.openAPI.sendMessage("Addcart", "您的会员卡已冻结，请拨打4008-198-198或在线客服处理。 CODE:" + i.userStatus + ",USER:" + getCookie("custno"))
                } catch (r) {
                }
            } else {
                var q = window.location.href;
                if (i.errorCode == "pne") {
                    Util.alertErrorBox("套餐中的部分商品已库存不足，请您重新选购！");
                    try {
                        sa.openAPI.sendMessage("Addcart", "套餐中的部分商品已库存不足，请您重新选购！" + n + " CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                    } catch (r) {
                    }
                } else {
                    if (i.errorCode == "GROUPTIMEOUT" || i.errorCode == "GROUPNUMOUT" || i.errorCode == "GROUPSIMPLENUMOUT" || i.errorCode == "GROUPPARAMERROR" || i.errorCode == "GROUPINPREHEAT" || i.errorCode == "GROUPHAVINGCHANCE") {
                        Util.alertErrorBox(i.errorMessage);
                        try {
                            sa.openAPI.sendMessage("Addcart", i.errorMessage + " CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                        } catch (r) {
                        }
                        quickPress(false)
                    } else {
                        if (i.errorCode == "GROUPNOTBINDPHONE") {
                            aqSuning1.showMobilePopType(false);
                            quickPress(false)
                        } else {
                            if (i.errorCode == "GROUPUSERINFOERR") {
                                Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                                try {
                                    sa.openAPI.sendMessage("Addcart", "您的账号存在异常，请致电客服4008-365-365 CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                } catch (r) {
                                }
                                quickPress(false)
                            } else {
                                if (i.errorCode == "GROUPNOTBRONDPAY") {
                                    Util.alertErrorBox("您需要进行<a href='" + getBrondPayUrl() + "'>易付宝快捷绑定</a>后才可以继续购买哦~");
                                    try {
                                        sa.openAPI.sendMessage("Addcart", "需要进行易付宝快捷绑定 CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                    } catch (r) {
                                    }
                                    quickPress(false)
                                } else {
                                    if (i.errorCode == "SCODE_NOT_ENOUGH" || i.errorCode == "SCODE_SYS_ERR") {
                                        Util.alertErrorBox(i.errorMessage);
                                        try {
                                            sa.openAPI.sendMessage("Addcart", i.errorMessage + " CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                        } catch (r) {
                                        }
                                        quickPress(false)
                                    } else {
                                        if (i.errorCode == "SCODE_NOT_BIND") {
                                            Util.alertErrorBox("您没有此商品的S码或S码还没有<a href='" + getBindScodeUrl() + "'  target='_Blank'>激活</a>");
                                            try {
                                                sa.openAPI.sendMessage("Addcart", "S码没有激活 CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                            } catch (r) {
                                            }
                                            quickPress(false)
                                        } else {
                                            if (i.errorCode == "psellNotBuyTime") {
                                                Util.alertErrorBox(i.errorMessage);
                                                try {
                                                    sa.openAPI.sendMessage("Addcart", i.errorMessage + " CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                                } catch (r) {
                                                }
                                            } else {
                                                if (i.isOverLimitCnt == "OVERLIMIT") {
                                                    var p = "http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                                                    Util.alertErrorBox("您的购物车商品清单种类已达50种上限，建议您立即<a href=" + p + ">清理购物车</a>");
                                                    try {
                                                        sa.openAPI.sendMessage("Addcart", "您的购物车商品清单种类已达50种上限 CODE:" + i.isOverLimitCnt + ",USER:" + getCookie("custno"))
                                                    } catch (r) {
                                                    }
                                                } else {
                                                    if (i.errorCode == "NOTVALIDUSER") {
                                                        Util.alertErrorBox("用户的会员卡状态不正确,请咨询客服！");
                                                        try {
                                                            sa.openAPI.sendMessage("Addcart", "用户的会员卡状态不正确,请咨询客服！ CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                                        } catch (r) {
                                                        }
                                                    } else {
                                                        if (i.errorCode == "NOTSALE") {
                                                            Util.alertErrorBox("套餐中的部分商品已暂停销售，请您重新选购！");
                                                            try {
                                                                sa.openAPI.sendMessage("Addcart", "套餐中的部分商品已暂停销售，请您重新选购！ CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                                            } catch (r) {
                                                            }
                                                        } else {
                                                            if (i.errorCode == "NOSALESORGITEM") {
                                                                Util.alertErrorBox("对不起,此商品无销售组织，加入购物车失败");
                                                                try {
                                                                    sa.openAPI.sendMessage("Addcart", "此商品无销售组织 " + n + " CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                                                } catch (r) {
                                                                }
                                                            } else {
                                                                if (i.errorCode == "ACCESSORYERROR") {
                                                                    Util.alertErrorBox("商品已无法享受套餐优惠价，请您重新选购！");
                                                                    try {
                                                                        sa.openAPI.sendMessage("Addcart", "商品已无法享受套餐优惠价，请您重新选购！" + n + " CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                                                    } catch (r) {
                                                                    }
                                                                } else {
                                                                    if (i.errorCode == "fql_0001") {
                                                                        Util.alertErrorBox("请稍后再试!");
                                                                        try {
                                                                            sa.openAPI.sendMessage("Addcart", "请稍后再试! " + n + " CODE:" + i.errorCode + ",USER:" + getCookie("custno"))
                                                                        } catch (r) {
                                                                        }
                                                                    } else {
                                                                        if (i.hasInventor == 1 && i.treaph == 0) {
                                                                            hrefLink("http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&returnURL=" + q)
                                                                        } else {
                                                                            if (i.hasInventor == 0 && i.invErrFlow == 1) {
                                                                                Util.alertErrorBox("套餐中的部分商品已无货，请您重新选购！");
                                                                                try {
                                                                                    sa.openAPI.sendMessage("Addcart", "套餐中的部分商品已无货，请您重新选购！ " + n + "  CODE:,USER:" + getCookie("custno"))
                                                                                } catch (r) {
                                                                                }
                                                                            } else {
                                                                                if (i.hasInventor == 0 && i.invErrFlow == 2) {
                                                                                    Util.alertErrorBox("您购买的数量超过库存上限，请修改商品数量");
                                                                                    try {
                                                                                        sa.openAPI.sendMessage("Addcart", "您购买的数量超过库存上限，请修改商品数量 " + n + " CODE:,USER:" + getCookie("custno"))
                                                                                    } catch (r) {
                                                                                    }
                                                                                } else {
                                                                                    if (i.hasInventor == 0 && (i.invErrFlow == 3 || i.invErrFlow == 0)) {
                                                                                        hrefLink("http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&invErrSb=" + i.invErrSb + "&returnURL=" + q)
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }});
    savePageSaleInfo(n, h)
}
function addCartForSmall(a, e) {
    var b = "http://" + sn.cartPath + "/addMiniSoppingCart";
    var c = {ERROEVIEW: "miniShoppingCartView", URL: "miniShoppingCartView", quantity_1: a, fullInventoryCheck: "0", inventoryCheckType: "0", fullVoucherCheck: "0", voucherCheckType: "0", voucherCheckFlow: "c", inventoryRemoteCheck: "1", voucherRemoteCheck: "1", storeId: "10052", catalogId: "10051", orderId: ".", partnumber: e, configurationId_1: e, isKitWare: "1"};
    $.ajax({url: b, data: c, cache: false, async: false, dataType: "jsonp", jsonp: "callback", success: function(f) {
            if (f.userStatus != "") {
                Util.alertErrorBox("您的会员卡已冻结，请拨打4008-198-198或在线客服处理。")
            } else {
                var h = window.location.href;
                if (f.errorCode == "pne") {
                    Util.alertErrorBox("该优惠价库存不足，请修改数量！")
                } else {
                    if (f.isOverLimitCnt == "OVERLIMIT") {
                        var g = "http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                        Util.alertErrorBox("您的购物车商品清单种类已达50种上限，建议您立即<a href=" + g + ">清理购物车</a>")
                    } else {
                        if (f.errorCode == "NOTVALIDUSER") {
                            Util.alertErrorBox("用户的会员卡状态不正确,请咨询客服！")
                        } else {
                            if (f.errorCode == "NOTSALE") {
                                var g = "http://" + sn.domain;
                                Util.alertErrorBox("您所选购的商品已下架，您可以尝试<a href=" + g + ">选购其他商品</a>")
                            } else {
                                if (f.errorCode == "ITNOTSALE") {
                                    Util.alertErrorBox("对不起，该商品帮客服务暂不销售，请取消勾选后重新加入购物车。")
                                } else {
                                    if (f.errorCode == "NOSALESORGITEM") {
                                        Util.alertErrorBox("对不起,此商品无销售组织，加入购物车失败")
                                    } else {
                                        if (f.errorCode == "OUTQUANTITY") {
                                            Util.alertErrorBox("超过单次最大可买数99件，请修改数量后重新添加！")
                                        } else {
                                            if (f.errorCode == "fql_0001") {
                                                Util.alertErrorBox("亲，您的操作过于频繁，请稍后再试哦！")
                                            } else {
                                                if (f.hasInventor == 1 && f.treaph == 0) {
                                                    hrefLink("http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&returnURL=" + h)
                                                } else {
                                                    if (f.hasInventor == 0 && f.invErrFlow == 1) {
                                                        Util.alertErrorBox("此商品无货，您可以尝试选购其他商品！")
                                                    } else {
                                                        if (f.hasInventor == 0 && f.invErrFlow == 2) {
                                                            Util.alertErrorBox("您购买的数量超过库存上限，请修改商品数量")
                                                        } else {
                                                            if (f.hasInventor == 0 && (f.invErrFlow == 3 || f.invErrFlow == 0)) {
                                                                hrefLink("http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&invErrSb=" + f.invErrSb + "&returnURL=" + h)
                                                            } else {
                                                                if (f.hasInventor == 1 && (f.treaph == 1 || f.treaph == 2)) {
                                                                    hrefLink("https://" + sn.cartPath + "/SNSelectTreatyPhoneNumView?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId)
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }});
    savePageSaleInfo(e)
}
function hpAddCart(b) {
    var a = "http://" + sn.cartPath + "/HPProductAddCartCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
    var c = {products: b};
    $.ajax({url: a, data: c, cache: false, async: false, dataType: "jsonp", jsonp: "callback", crossDomain: true, success: function(f) {
            if ("true" == f.result) {
                var e = "http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                window.location.href = e
            } else {
                var h = f.failCode;
                if (18 == h.length) {
                    h = h.substring(9, 18)
                }
                var g = sn.elecProductDomain + "/0000000000/" + h + ".html";
                window.location.href = g
            }
        }, error: function(e) {
            var f = sn.elecProductDomain + "/0000000000/" + e.failCode + ".html";
            window.location.href = f
        }})
}
function add2Cart(k, i, e, g, c, f, b, j, h, a) {
    addCartAB(k, i, e, g, c, f, b, j, h, a, "");
    savePageSaleInfo(j, e)
}
function addCartHwg(j, f, e, i, h, k, g) {
    commPartnumber = j;
    cartPress(true);
    alsoBuy(g);
    var l = "01";
    var a = "";
    if (h == "4") {
        l = "02";
        a = k
    }
    var b = "http://" + getNewCartDomain() + "/overSeaAddCart.do";
    var c = {sourcePageType: "", activityType: l, activityId: a, cmmdtyCode: j, shopCode: f, cmmdtyQty: e, overSeasFlag: i == 3 ? "927HWG1" : "927HWG"};
    $.ajax({url: b, data: c, cache: false, async: false, dataType: "jsonp", crossDomain: true, success: function(o) {
            var m = o.isSuccess;
            if (m == "Y") {
                var q = window.location.href;
                changeCartCity();
                shoppingCartUrl = "cart_add.html?pid=" + j + "&vid=" + f + "&cartFlag=A&langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                toShoppingCart()
            } else {
                var n = o.addCartErrorList[0].errorMessage;
                var p = o.addCartErrorList[0].errorCode;
                if (p == "015" || p == "025") {
                    aqSuning1.showMobilePopType(false);
                    quickPress(false)
                } else {
                    if (p == "024") {
                        Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                        quickPress(false)
                    } else {
                        if (n != undefined && n != "") {
                            Util.alertErrorBox(n)
                        } else {
                            Util.alertErrorBox("网络报错，请重新点击！")
                        }
                    }
                }
            }
            cartPress(false)
        }, error: function() {
            Util.alertErrorBox("网络报错，请重新点击！");
            if (typeof (cloudInfo.initCartState) == "function") {
                cloudInfo.initCartState()
            }
            cartPress(false)
        }})
}
function addCartAB(l, i, e, g, c, f, b, k, h, a, j) {
    if (cloudInfo.addCartState == "1") {
        addCartOld(l, i, e, g, c, f, b, k, h, a);
        return
    }
    addCartNew(l, i, e, g, c, f, b, k, h, a, j)
}
function addCartNew(c, t, m, l, e, r, f, h, u, y, o) {
    if (f == 1) {
        quickBuyNew(h, e, m, t, u, y, f, "", "", "", "");
        return
    }
    commPartnumber = h;
    cartPress(f != 1);
    alsoBuy(r);
    if (null == m || "" == m) {
        m = "0000000000"
    }
    var s = "01";
    var k = "";
    if (u == "4") {
        s = "02";
        k = y
    }
    var b = "http://" + getNewCartDomain() + "/addCart.do?callback=?";
    var a = {verifyCode: "", uuid: ""};
    var w = new Array();
    if (null != e && "" != e) {
        var n = e.split(",");
        for (var p = 0, q = n.length; p < q; p++) {
            var g = n[p].split("-");
            var x = {cmmdtyCode: g[0], cmmdtyQty: t, supplierCode: g[1]};
            w[p] = x
        }
    }
    var j = [{activityId: k, activityType: s, cmmdtyCode: h, cmmdtyQty: t, shopCode: m, cmmdtyWarrantyVOList: w}];
    a.cmmdtyVOList = j;
    var v = {cartVO: obj2string(a)};
    $.getJSON(b, v).done(function(B) {
        var z = B.returnCode;
        if (null != z && "" != z && "4000" == z) {
            Util.alertErrorBox("您访问的太频繁， 网络拥堵，请您稍后再试！");
            try {
                sa.openAPI.sendMessage("Addcart", "您访问的太频繁， 网络拥堵，请您稍后再试！ CODE:" + z + ",USER:" + getCookie("custno"))
            } catch (D) {
            }
            cartPress(false);
            return false
        }
        var i = B.isSuccess;
        if (i == "Y") {
            shoppingCartUrl = "cart_add.html?pid=" + h + "&vid=" + m + "&cartFlag=B&langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
            toShoppingCart()
        } else {
            var A = B.addCartErrorList[0].errorMessage;
            var C = B.addCartErrorList[0].errorCode;
            if (C == "017") {
                needVerifyCodeVal = true;
                cartPress(false);
                showMinos3(B.uuid)
            } else {
                if (C == "018") {
                    cartPress(false);
                    showMinos2()
                } else {
                    if (C == "019") {
                        cartPress(false);
                        showMinos1()
                    } else {
                        if (C == "015" || C == "025") {
                            aqSuning1.showMobilePopType(false);
                            quickPress(false)
                        } else {
                            if (C == "024") {
                                Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                                try {
                                    sa.openAPI.sendMessage("Addcart", "您的账号存在异常，请致电客服4008-365-365 CODE:" + C + ",USER:" + getCookie("custno"))
                                } catch (D) {
                                }
                                quickPress(false)
                            } else {
                                if (A != undefined && A != "") {
                                    Util.alertErrorBox(A);
                                    try {
                                        sa.openAPI.sendMessage("Addcart", A + " CODE:" + C + ",USER:" + getCookie("custno"))
                                    } catch (D) {
                                    }
                                } else {
                                    Util.alertErrorBox("网络报错，请重新点击！");
                                    try {
                                        sa.openAPI.sendMessage("Addcart", "网络报错，请重新点击！errorMsg is empty. CODE:" + C + ",USER:" + getCookie("custno"))
                                    } catch (D) {
                                    }
                                }
                            }
                        }
                    }
                }
            }
            cartPress(false)
        }
    }).fail(function() {
        Util.alertErrorBox("网络报错，请重新点击！");
        try {
            sa.openAPI.sendMessage("Addcart", "网络报错，请重新点击！interface fail. USER:" + getCookie("custno"))
        } catch (i) {
        }
        cartPress(false)
    })
}
function addCartOld(e, s, n, m, g, r, h, w, t, y) {
    commPartnumber = w;
    if (h != 1) {
        cartPress(true)
    }
    alsoBuy(r);
    var j = "http://" + sn.cartPath + "/addMiniSoppingCart";
    var c = {ERROEVIEW: "miniShoppingCartView", URL: "miniShoppingCartView", quantity: s, fullInventoryCheck: "0", inventoryCheckType: "0", fullVoucherCheck: "0", voucherCheckType: "0", inventoryRemoteCheck: "0", voucherRemoteCheck: "1", storeId: "10052", catalogId: "10051", orderId: ".", partnumber: w, sellType: e, supplierCode: n, priceType: t, promotionActiveId: y};
    if (e != "0") {
        j = "SNTreatyProductAddCartCmd"
    }
    var b = new Array();
    var x = "";
    if (null != g && "" != g) {
        var v = g.split(",");
        for (var p = 0, q = v.length; p < q; p++) {
            var l = v[p].split("-");
            if (l.length > 1) {
                b[p] = l[0]
            } else {
                b[p] = l
            }
            if (p == (q - 1)) {
                x = x + b[p]
            } else {
                x = x + b[p] + ","
            }
        }
    }
    var o = "";
    var u = "";
    var k = "";
    if (b.length > s) {
        Util.alertErrorBox("延保商品数量必须小于等于商品数量!");
        if (h != 1) {
            cartPress(false)
        }
        return
    } else {
        for (p = 0; p < b.length; p++) {
            if (o != "") {
                o = o + "," + b[p];
                u = u + ",1"
            } else {
                o = b[p];
                u = "1";
                k = 1
            }
        }
    }
    if (null != k && k != "") {
        c.buyPackSort = k
    }
    if (null != x && x != "") {
        c.buyPackPartNumber_1 = x
    }
    if (null != u && u != "") {
        c.buyPackQuantity_1 = u
    }
    if (null != m && "" != m) {
        var f = m.split(",");
        if (f[0] != null) {
            c.catEntryId_2 = f[0]
        }
        if (f[1] != null) {
            c.catEntryId_3 = f[1]
        }
    }
    if (h == 1) {
        c.promotionType = "psell";
        if (typeof (bd) != "undefined") {
            setCookie("c2dt", bd.rst())
        }
        if (needVerifyCodeVal) {
            var a = verifyCodeVal;
            if (a != undefined && a != "" && a != "以下字符不区分大小写") {
                c.verifyCode = a;
                c.uuid = v_uuid
            }
            needVerifyCodeVal = false
        }
    }
    if (cloudInfo.addCartState == "1") {
        c.promotionType = "cloud";
        c.promotionActId = cloudInfo.activityID
    }
    $.ajax({url: j, data: c, cache: false, async: false, dataType: "jsonp", jsonp: "callback", success: function(i) {
            if (i.userStatus != "") {
                Util.alertErrorBox("您的会员卡已冻结，请拨打4008-198-198或在线客服处理。")
            } else {
                var A = window.location.href;
                if (i.errorCode == "MINOSE_0001") {
                    quickPress(false);
                    showMinos1()
                } else {
                    if (i.errorCode == "MINOSE_0002") {
                        quickPress(false);
                        showMinos2()
                    } else {
                        if (i.errorCode == "MINOSE_0003") {
                            needVerifyCodeVal = true;
                            quickPress(false);
                            showMinos3(i.uuid)
                        } else {
                            if (i.errorCode == "pne") {
                                Util.alertErrorBox("该优惠价库存不足，请修改数量！")
                            } else {
                                if (i.errorCode == "BLACKLISTERROR") {
                                    Util.alertErrorBox("抱歉，您暂无资格购买大聚惠商品，请选择其他商品购买。");
                                    quickPress(false)
                                } else {
                                    if (i.errorCode == "GROUPTIMEOUT" || i.errorCode == "GROUPNUMOUT" || i.errorCode == "GROUPSIMPLENUMOUT" || i.errorCode == "GROUPPARAMERROR" || i.errorCode == "GROUPINPREHEAT" || i.errorCode == "GROUPHAVINGCHANCE") {
                                        Util.alertErrorBox(i.errorMessage);
                                        quickPress(false)
                                    } else {
                                        if (i.errorCode == "GROUPNOTBINDPHONE") {
                                            aqSuning1.showMobilePopType(false);
                                            quickPress(false)
                                        } else {
                                            if (i.errorCode == "GROUPUSERINFOERR") {
                                                Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                                                quickPress(false)
                                            } else {
                                                if (i.errorCode == "GROUPNOTBRONDPAY") {
                                                    Util.alertErrorBox("您需要进行<a href='" + getBrondPayUrl() + "'>易付宝快捷绑定</a>后才可以继续购买哦~");
                                                    quickPress(false)
                                                } else {
                                                    if (i.errorCode == "SCODE_NOT_ENOUGH" || i.errorCode == "SCODE_SYS_ERR") {
                                                        Util.alertErrorBox(i.errorMessage);
                                                        quickPress(false)
                                                    } else {
                                                        if (i.errorCode == "SCODE_NOT_BIND") {
                                                            Util.alertErrorBox("您没有此商品的S码或S码还没有<a href='" + getBindScodeUrl() + "'  target='_Blank'>激活</a>");
                                                            quickPress(false)
                                                        } else {
                                                            if (i.errorCode == "psellNotBuyTime") {
                                                                Util.alertErrorBox(i.errorMessage)
                                                            } else {
                                                                if (i.isOverLimitCnt == "OVERLIMIT") {
                                                                    var z = "http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                                                                    Util.alertErrorBox("您的购物车商品清单种类已达50种上限，建议您立即<a href=" + z + ">清理购物车</a>")
                                                                } else {
                                                                    if (i.errorCode == "NOTVALIDUSER") {
                                                                        Util.alertErrorBox("用户的会员卡状态不正确,请咨询客服！")
                                                                    } else {
                                                                        if (i.errorCode == "NOTSALE") {
                                                                            var z = "http://" + sn.domain;
                                                                            Util.alertErrorBox("此商品暂不销售，您可以尝试选购其他商品<a href=" + z + ">选购其他商品</a>")
                                                                        } else {
                                                                            if (i.errorCode == "ITNOTSALE") {
                                                                                Util.alertErrorBox("对不起，该商品帮客服务暂不销售，请取消勾选后重新加入购物车。")
                                                                            } else {
                                                                                if (i.errorCode == "NOSALESORGITEM") {
                                                                                    Util.alertErrorBox("对不起,此商品无销售组织，加入购物车失败")
                                                                                } else {
                                                                                    if (i.errorCode == "limitShopping") {
                                                                                        Util.alertErrorBox("此商品为限购商品，最多可购买" + i.limitCount + "件")
                                                                                    } else {
                                                                                        if (i.errorCode == "fql_0001") {
                                                                                            Util.alertErrorBox("亲，您的操作过于频繁，请稍后再试哦！")
                                                                                        } else {
                                                                                            if (i.errorCode == "cloudTimeover") {
                                                                                                Util.alertErrorBox("此商品的兑换活动已结束！");
                                                                                                cloudInfo.state = "01";
                                                                                                cloudInfo.getExchengeStatus()
                                                                                            } else {
                                                                                                if (i.errorCode == "cloudInvNotEnough") {
                                                                                                    Util.alertErrorBox("您购买的数量超过可兑换量，请修改商品数量");
                                                                                                    cloudInfo.state = "02";
                                                                                                    cloudInfo.getExchengeStatus()
                                                                                                } else {
                                                                                                    if (i.errorCode == "noInv") {
                                                                                                        Util.alertErrorBox("此商品已兑换光了，您可以选择以易购价购买！");
                                                                                                        cloudInfo.state = "03";
                                                                                                        cloudInfo.getExchengeStatus()
                                                                                                    } else {
                                                                                                        if (i.errorCode == "cloudNotEnoughOne") {
                                                                                                            Util.alertErrorBox("您的云钻不足，暂不能兑换此商品！");
                                                                                                            cloudInfo.state = "04";
                                                                                                            cloudInfo.getExchengeStatus()
                                                                                                        } else {
                                                                                                            if (i.errorCode == "cloudNotEnoughMulti") {
                                                                                                                Util.alertErrorBox("云钻不足，请修改商品数量");
                                                                                                                cloudInfo.state = "05";
                                                                                                                cloudInfo.getExchengeStatus()
                                                                                                            } else {
                                                                                                                if (i.errorCode == "wrongInput") {
                                                                                                                    Util.alertErrorBox("网络报错，请重新点击！！");
                                                                                                                    cloudInfo.state = "06";
                                                                                                                    cloudInfo.getExchengeStatus()
                                                                                                                } else {
                                                                                                                    if (i.hasInventor == 1 && i.treaph == 0) {
                                                                                                                        if (h == 1 || cloudInfo.addCartState == "1") {
                                                                                                                            shoppingCartUrl = "http://" + sn.cartPath + "/SNCart2ManageCmd?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&returnURL=" + A;
                                                                                                                            toShoppingCart()
                                                                                                                        } else {
                                                                                                                            if (i.addToCartAB == "A") {
                                                                                                                                shoppingCartUrl = "cart_add.html?pid=" + w + "&vid=" + n + "&langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                                                                                                                                toShoppingCart()
                                                                                                                            } else {
                                                                                                                                shoppingCartUrl = "http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&returnURL=" + A;
                                                                                                                                shoppingCartPopBox(r);
                                                                                                                                SFE.base.miniCartReload()
                                                                                                                            }
                                                                                                                        }
                                                                                                                    } else {
                                                                                                                        if (i.hasInventor == 0 && i.invErrFlow == 1) {
                                                                                                                            Util.alertErrorBox("此商品无货，您可以尝试选购其他商品！")
                                                                                                                        } else {
                                                                                                                            if (i.hasInventor == 0 && i.invErrFlow == 2) {
                                                                                                                                Util.alertErrorBox("您购买的数量超过库存上限，请修改商品数量")
                                                                                                                            } else {
                                                                                                                                if (i.hasInventor == 0 && (i.invErrFlow == 3 || i.invErrFlow == 0)) {
                                                                                                                                    if (h == 1 || cloudInfo.addCartState == "1") {
                                                                                                                                        shoppingCartUrl = "http://" + sn.cartPath + "/SNCart2ManageCmd?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&returnURL=" + A;
                                                                                                                                        toShoppingCart()
                                                                                                                                    } else {
                                                                                                                                        if (i.addToCartAB == "A") {
                                                                                                                                            shoppingCartUrl = "cart_add.html?pid=" + w + "&vid=" + n + "&langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                                                                                                                                            toShoppingCart()
                                                                                                                                        } else {
                                                                                                                                            shoppingCartUrl = "http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&invErrSb=" + i.invErrSb + "&returnURL=" + A;
                                                                                                                                            shoppingCartPopBox(r);
                                                                                                                                            SFE.base.miniCartReload()
                                                                                                                                        }
                                                                                                                                    }
                                                                                                                                }
                                                                                                                            }
                                                                                                                        }
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (typeof (cloudInfo.initCartState) == "function") {
                cloudInfo.initCartState()
            }
            if (h != 1) {
                cartPress(false)
            }
        }, error: function() {
            Util.alertErrorBox("网络报错，请重新点击！");
            if (typeof (cloudInfo.initCartState) == "function") {
                cloudInfo.initCartState()
            }
            if (h != 1) {
                cartPress(false)
            }
        }})
}
function shoppingCartPopBox(a) {
    $.mDialog({css: {width: "460px"}, http: function(c, f) {
            if (recommendProductInfo == undefined || recommendProductInfo == "") {
                var b = '<div class="pop-car-win"><div class="pop-content">';
                b += '<div class="pop-success no-products"><h4><b></b>添加成功！</h4>';
                b += '<div class="clearfix"><a name="item_' + (commPartnumber).substring(9, 18) + '_gwctk_goshopping" href="javascript:void(0)" class="car-btn shopping-btn close l"><span>继续购物</span></a>';
                b += '<a name="item_' + (commPartnumber).substring(9, 18) + '_gwctk_gocart" href="javascript:toShoppingCart();" class="car-btn account-btn close"><span>去购物车结算</span></a></div>';
                b += "</div>";
                b += "</div></div>";
                recommendProductInfo = b
            }
            c.find(".content").html(recommendProductInfo);
            try {
                runAnalyseExpo()
            } catch (c) {
            }
            if (sn.catalogId == "22001") {
                c.find(".btn.close").attr("name", "bprd_" + (commPartnumber).substring(9, 18) + "_gwctk_guanbi")
            } else {
                c.find(".btn.close").attr("name", "item_" + (commPartnumber).substring(9, 18) + "_gwctk_guanbi")
            }
        }, overlayClick: true, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
}
function recommendProductInit(b) {
    var c = '<div class="pop-car-win"><div class="pop-content">';
    if (b.skus != undefined && b.skus.length >= 4) {
        c += '<div class="pop-success"><h4><b></b>添加成功！</h4>';
        c += '<div class="clearfix"><a name="item_' + (commPartnumber).substring(9, 18) + '_gwctk_goshopping" href="javascript:void(0)" class="car-btn shopping-btn close l"><span>继续购物</span></a>';
        c += '<a name="item_' + (commPartnumber).substring(9, 18) + '_gwctk_gocart" href="javascript:toShoppingCart();" class="car-btn account-btn close"><span>去购物车结算</span></a></div>';
        c += '<div class="pop-others"><p>买了该商品的顾客还买了</p><ul>';
        for (var a = 0; a < 4; a++) {
            if (a == 3) {
                c += '<li class="last">'
            } else {
                c += "<li>"
            }
            c += '<a id="baoguang_recbuymore_1-' + (a + 1) + "_" + b.skus[a].vendorId + "_" + (commPartnumber).substring(9, 18) + "_" + b.skus[a].handwork + '" name="item_' + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (a + 1) + "_p_" + b.skus[a].vendorId + "_" + (b.skus[a].sugGoodsCode).substring(9, 18) + "_" + b.skus[a].handwork + '" href="' + sn.elecProductDomain + "/" + b.skus[a].vendorId + "/" + (b.skus[a].sugGoodsCode).substring(9, 18) + ".html?src=item_" + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (a + 1) + "_p_" + b.skus[a].vendorId + "_" + (b.skus[a].sugGoodsCode).substring(9, 18) + "_" + b.skus[a].handwork + '" title="' + b.skus[a].sugGoodsName + '" class="picbox" target="_blank"><img src="' + sn.imageDomianDir + "/content/catentries/" + (b.skus[a].sugGoodsCode).substring(0, 14) + "/" + b.skus[a].sugGoodsCode + "/" + b.skus[a].sugGoodsCode + '_ls.jpg"" alt="' + b.skus[a].sugGoodsName + '" /></a>';
            c += '<p id="baoguang_recbuymore_1-' + (a + 1) + "_" + b.skus[a].vendorId + "_" + (commPartnumber).substring(9, 18) + "_" + b.skus[a].handwork + '" name="item_' + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (a + 1) + "_c_" + b.skus[a].vendorId + "_" + (b.skus[a].sugGoodsCode).substring(9, 18) + "_" + b.skus[a].handwork + '" class="details"><a href="' + sn.elecProductDomain + "/" + b.skus[a].vendorId + "/" + (b.skus[a].sugGoodsCode).substring(9, 18) + ".html?src=item_" + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (a + 1) + "_c_" + b.skus[a].vendorId + "_" + (b.skus[a].sugGoodsCode).substring(9, 18) + "_" + b.skus[a].handwork + '" title="' + b.skus[a].sugGoodsName + '" target="_blank">' + b.skus[a].sugGoodsName + "</a></p>";
            c += '<span class="snPrice"><i>¥</i><em>' + b.skus[a].price + "</em></span>";
            c += "</li>"
        }
        c += "</ul></div>"
    } else {
        c += '<div class="pop-success no-products"><h4><b></b>添加成功！</h4>';
        c += '<div class="clearfix"><a name="item_' + (commPartnumber).substring(9, 18) + '_gwctk_goshopping" href="javascript:void(0)" class="car-btn shopping-btn close l"><span>继续购物</span></a>';
        c += '<a name="item_' + (commPartnumber) + '_gwctk_gocart" href="javascript:toShoppingCart();" class="car-btn account-btn close"><span>去购物车结算</span></a></div>';
        c += "</div>"
    }
    c += "</div></div>";
    recommendProductInfo = c
}
function recommendBookProductInit(b) {
    var c = '<div class="pop-car-win"><div class="pop-content">';
    if (b.skus != undefined && b.skus.length >= 4) {
        c += '<div class="pop-success"><h4><b></b>添加成功！</h4>';
        c += '<div class="clearfix"><a name="bprd_' + (commPartnumber).substring(9, 18) + '_gwctk_goshopping" href="javascript:void(0)" class="car-btn shopping-btn close l"><span>继续购物</span></a>';
        c += '<a name="bprd_' + (commPartnumber).substring(9, 18) + '_gwctk_gocart" href="javascript:toShoppingCart();" class="car-btn account-btn close"><span>去购物车结算</span></a></div>';
        c += '<div class="pop-others"><p>买了该商品的顾客还买了</p><ul>';
        for (var a = 0; a < 4; a++) {
            if (a == 3) {
                c += '<li class="last">'
            } else {
                c += "<li>"
            }
            c += '<a id="baoguang_recbuymore_1-' + (a + 1) + "_" + b.skus[a].vendorId + "_" + (commPartnumber).substring(9, 18) + "_" + b.skus[a].handwork + '" name="bprd_' + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (a + 1) + "_p_" + b.skus[a].vendorId + "_" + (b.skus[a].sugGoodsCode).substring(9, 18) + "_" + b.skus[a].handwork + '" href="' + sn.elecProductDomain + "/" + b.skus[a].vendorId + "/" + (b.skus[a].sugGoodsCode).substring(9, 18) + ".html?src=item_" + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (a + 1) + "_p_" + b.skus[a].vendorId + "_" + (b.skus[a].sugGoodsCode).substring(9, 18) + "_" + b.skus[a].handwork + '" title="' + b.skus[a].sugGoodsName + '" class="picbox" target="_blank"><img src="' + sn.imageDomianDir + "/content/catentries/" + (b.skus[a].sugGoodsCode).substring(0, 14) + "/" + b.skus[a].sugGoodsCode + "/" + b.skus[a].sugGoodsCode + '_ls.jpg"" alt="' + b.skus[a].sugGoodsName + '" /></a>';
            c += '<p id="baoguang_recbuymore_1-' + (a + 1) + "_" + b.skus[a].vendorId + "_" + (commPartnumber).substring(9, 18) + "_" + b.skus[a].handwork + '" name="bprd_' + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (a + 1) + "_c_" + b.skus[a].vendorId + "_" + (b.skus[a].sugGoodsCode).substring(9, 18) + "_" + b.skus[a].handwork + '" class="details"><a href="' + sn.elecProductDomain + "/" + b.skus[a].vendorId + "/" + (b.skus[a].sugGoodsCode).substring(9, 18) + ".html?src=item_" + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (a + 1) + "_c_" + b.skus[a].vendorId + "_" + (b.skus[a].sugGoodsCode).substring(9, 18) + "_" + b.skus[a].handwork + '" title="' + b.skus[a].sugGoodsName + '" target="_blank">' + b.skus[a].sugGoodsName + "</a></p>";
            c += '<span class="snPrice"><i>¥</i><em>' + b.skus[a].price + "</em></span>";
            c += "</li>"
        }
        c += "</ul></div>"
    } else {
        c += '<div class="pop-success no-products"><h4><b></b>添加成功！</h4>';
        c += '<div class="clearfix"><a name="bprd_' + (commPartnumber).substring(9, 18) + '_gwctk_goshopping" href="javascript:void(0)" class="car-btn shopping-btn close l"><span>继续购物</span></a>';
        c += '<a name="bprd_' + (commPartnumber) + '_gwctk_gocart" href="javascript:toShoppingCart();" class="car-btn account-btn close"><span>去购物车结算</span></a></div>';
        c += "</div>"
    }
    c += "</div></div>";
    recommendProductInfo = c
}
function toShoppingCart() {
    if (shoppingCartUrl == undefined || shoppingCartUrl == "") {
        var a = window.location.href;
        shoppingCartUrl = "http://" + sn.cartPath + "/OrderItemDisplay?langId=-7&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&returnURL=" + a
    }
    hrefLink(shoppingCartUrl)
}
function alsoBuy(g) {
    if (g == "undefined") {
        g = "-7"
    }
    var a = getCookie("custno");
    if (typeof (a) == "undefined") {
        a = ""
    }
    var f = getCookie("_snma");
    if (typeof (f) != "undefined" && null != f && f != "") {
        f = f.split("|")[1]
    } else {
        f = ""
    }
    var b = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?u=" + a + "&c=" + f + "&parameter=" + commPartnumber + "&cityId=" + g + "&sceneIds=10-11&count=5";
    var e = sn.catalogId;
    if (e == "22001") {
        b = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?u=" + a + "&c=" + f + "&parameter=" + commPartnumber + "&cityId=" + g + "&sceneIds=10-12&count=5"
    }
    $.ajax({url: b, cache: true, dataType: "jsonp", jsonpCallback: "recommendData", success: function() {
        }})
}
function recommendData(c) {
    var b = c.sugGoods;
    var a = "";
    var e = "";
    $.each(b, function(f, g) {
        if (g.resCode != "02") {
            if (g.sceneId == "10-11") {
                recommendProductInit(g)
            } else {
                if (g.sceneId == "10-12") {
                    recommendBookProductInit(g)
                }
            }
        }
    })
}
function quickPress(b) {
    var a = false;
    if (sn.scode != undefined && sn.scode) {
        a = true
    }
    if (!isSelfWillPay) {
        if (b) {
            if (sn.donateFlag != undefined && sn.donateFlag) {
                $("#buyNowAddCart").removeClass().addClass("btn-buynow-loading").html("<span>立即捐赠</span>")
            } else {
                if (a) {
                    $("#buyNowAddCart").removeClass().addClass("btn-buynow-loading").html("<span>S码购买</span>")
                } else {
                    $("#buyNowAddCart").removeClass().addClass("btn-buynow-loading").html("<span>立即购买</span>")
                }
            }
        } else {
            if (sn.donateFlag != undefined && sn.donateFlag) {
                $("#buyNowAddCart").removeClass().addClass("btn-donate")
            } else {
                if (a) {
                    $("#buyNowAddCart").removeClass().addClass("btn-scode-buy2")
                } else {
                    $("#buyNowAddCart").removeClass().addClass("btn-buynow")
                }
            }
        }
    } else {
        if (b) {
            $("#" + Renxf.buttonId).removeClass().addClass("btn-loading").html("<span>我要分期</span>")
        } else {
            $("#" + Renxf.buttonId).removeClass().addClass(Renxf.buttonClass).html("")
        }
    }
}
function quickPressForPackage(a) {
    if (a) {
        $("#buyNowAddCart").removeClass().addClass("btn-buynow-loading").html("<span>立即购买</span>")
    } else {
        $("#buyNowAddCart").removeClass().addClass("btn-pptvbuy")
    }
}
function cartPress(a) {
    if (a) {
        $("#addCart").removeClass().addClass("btn-addcart-loading")
    } else {
        $("#addCart").removeClass().addClass("btn-addcart")
    }
}
function changeCartCity() {
    var b = d("cityId");
    var a = "http://" + sn.cartPath + "/SNCartChangeCityCmd";
    $.ajax({url: a, data: "newCityId=" + b, cache: false, async: false, dataType: "jsonp", jsonp: "callback"})
}
function setCookie(a, b) {
    var f = window.location.href;
    f = f.substring(f.indexOf("//") + 2);
    f = f.substring(0, f.indexOf("/"));
    if (f.indexOf(".") > 0) {
        f = f.substring(f.indexOf("."))
    }
    var c = f;
    var e = "/";
    var g = a + "=" + encodeURIComponent(b) + ";domain=" + c + ";path=" + e;
    document.cookie = g
}
function savePageSaleInfo(g, b) {
    b = isEmpty(b) ? "0000000000" : b;
    g = g.length == 18 ? g.substring(9, 19) : g;
    var a = g + "_" + b;
    var c = $.trim(getUrlParam("srcpoint"));
    try {
        pageSaleCookieUtil.saveCookie(a, c)
    } catch (f) {
    }
}
function updatePageSaleInfo() {
    try {
        pageSaleCookieUtil.updateCustNo()
    } catch (a) {
    }
}
function getUrlParam(a) {
    var b = new RegExp("(^|&)" + a + "=([^&]*)(&|$)", "i");
    var c = window.location.search.substr(1).match(b);
    if (c != null) {
        return decodeURI(c[2])
    }
    return""
}
function isEmpty(a) {
    return a == null || a == undefined || a == ""
}
function _loadAsyncJs(f) {
    var g = f;
    var e = document.getElementsByTagName("script");
    for (var a = 0; a < e.length; a++) {
        if (e[a].src == g) {
            return
        }
    }
    var b = document.createElement("script");
    b.type = "text/javascript";
    b.async = true;
    b.src = g;
    var c = e[0];
    c.parentNode.insertBefore(b, c)
}
function _getSaJsFilePath(a) {
    var b = "";
    if (envType == "PRD") {
        b = ("https:" == document.location.protocol) ? "https://imgssl.suning.com" : "http://script.suning.cn"
    } else {
        if (envType == "PRE") {
            b = ("https:" == document.location.protocol) ? "https://preimgssl.suning.com" : "http://prescript.suning.cn"
        } else {
            if (envType == "SIT") {
                b = ("https:" == document.location.protocol) ? "https://sit1imgssl.suning.com" : "http://sit1script.suning.cn"
            } else {
                b = ("https:" == document.location.protocol) ? "https://preimgssl.suning.com" : "http://prescript.suning.cn"
            }
        }
    }
    b = b + "/javascript/sn_da/" + a + version;
    return b
}
var needVerifyCodeVal = false;
var v_uuid = "";
var verifyCodeVal = "";
var vcsDomain;
function getVCSDomain() {
    vcsDomain = "vcs.suning.com";
    if (envType == "PRE") {
        vcsDomain = "vcspre.cnsuning.com"
    } else {
        if (envType == "SIT") {
            vcsDomain = "vcspre.cnsuning.com"
        } else {
            if (envType == "DEV") {
                vcsDomain = "vcspre.cnsuning.com"
            }
        }
    }
}
function fun_getVcode() {
    gImgVerCdeErrorCount = 0;
    $("#validateCode").removeClass("error-input");
    document.getElementById("vcodeimg1").src = "http://" + vcsDomain + "/vcs/imageCode.htm?uuid=" + v_uuid + "&yys=" + new Date().getTime()
}
function onKeyUpForValidate(a) {
    a = (a) ? a : ((window.event) ? window.event : "");
    var b = a.keyCode ? a.keyCode : a.which;
    if (b == 13) {
        ajaxCheckVerifyCodeOrSubmit(true)
    } else {
        onBlurForValidate()
    }
}
function onBlurForValidate() {
    var a = $("#validateCode").val();
    if (a == null || a == "") {
        return false
    } else {
        if (a.length == 4) {
            ajaxCheckVerifyCodeOrSubmit(false)
        }
    }
}
function ajaxCheckVerifyCodeOrSubmit(a) {
    var b = $("#validateCode").val();
    if (!a && isLastImgValCode(b)) {
        return
    }
    var c = {code: b, uuid: v_uuid, delFlag: 0};
    $.ajax({type: "POST", url: "http://" + vcsDomain + "/vcs/validate_jsonp.htm", data: c, dataType: "jsonp", jsonp: "callback", success: function(e) {
            if (e[0].result == "true") {
                result = true;
                $("#validateCode").removeClass("error-input");
                $("#imageVerifytip").addClass("tip-icon").show();
                $(".code-error").hide();
                if (a) {
                    verifyCodeVal = b;
                    $.unmLionDialog()
                }
            } else {
                $("#validateCode").addClass("error-input");
                $("#imageVerifytip").hide();
                $(".code-error").show();
                gImgVerCdeErrorCount++;
                if (gImgVerCdeErrorCount >= 3 || a) {
                    fun_getVcode()
                }
            }
        }})
}
var gImgVerCdeErrorCount = 0;
var gLastImgValCode = "";
function isLastImgValCode(a) {
    if (gLastImgValCode == a) {
        return true
    } else {
        gLastImgValCode = a;
        return false
    }
}
function showMinos1() {
    $.mLionDialog({css: {width: "366px"}, title: "", message: $("#J-boom"), overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
}
function showMinos2() {
    $.mLionDialog({css: {width: "366px"}, title: "", message: $("#J-company-channel"), overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
}
function showMinos3(e) {
    v_uuid = e;
    verifyCodeVal = "";
    getVCSDomain();
    var c = "http://" + vcsDomain + "/vcs/imageCode.htm?uuid=" + v_uuid + "&yys=" + new Date().getTime();
    $("#vcodeimg1").attr("src", c);
    $.mLionDialog({css: {width: "448px"}, title: "", message: $("#J-identify-code"), overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
    var b = $(".m-lion-dialog input"), a = "以下字符不区分大小写";
    b.blur(function() {
        if ($(this).val() == "") {
            $(this).val(a).css("color", "#999");
            return
        } else {
            if ($(this).val() != a) {
                $(this).css("color", "#333")
            }
        }
    });
    b.focus(function() {
        if ($(this).val() == a) {
            $(this).val("").removeAttr("style").keyup();
            $(this).css("color", "#333")
        }
    })
}
var JSD = JSD || {};
JSD.base = (function(b) {
    var e = ("https:" == document.location.protocol) ? "https" : "http";
    var f = function(F) {
        var G = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
        var E = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
        var H = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
        if (G.test(F)) {
            return"pre"
        } else {
            if (E.test(F)) {
                return"sit"
            } else {
                if (H.test(F)) {
                    return"dev"
                } else {
                    return"prd"
                }
            }
        }
    };
    var k, s, z, A, t;
    var D;
    var r = false;
    var x = function(E) {
        var F;
        return(F = document.cookie.match(RegExp("(^| )" + E + "=([^;]*)(;|$)"))) ? decodeURIComponent(F[2].replace(/\+/g, "%20")) : null
    };
    var y = e + "://";
    var B = document.location.hostname;
    switch (f(B)) {
        case"pre":
            y = y + "b2cpre.cnsuning.com/emall";
            break;
        case"sit":
            y = y + "b2csit.cnsuning.com/emall";
            break;
        case"prd":
            y = y + "www.suning.com/emall";
            break;
        case"dev":
            y = y + "b2cdev.cnsuning.com/webapp/wcs/stores/servlet";
            break;
        default:
            break
    }
    var h = y + "/jisuda";
    var l = y + "/SNJiSuDaAddressCheckCmd";
    var p = y + "/SNAddressQueryCmd";
    var u = function(G, E) {
        D = G.partnumber || sn.partnumber;
        var J = G.cityId || x("cityId");
        var F = sn.storeId || "10052";
        var I = sn.catalogId || "10051";
        var H = ["_", F, "_", I, "_", D, "_", J, "_", "showCallBack_.html"];
        b.ajax({type: "get", url: h + H.join(""), dataType: "jsonp", cache: false, async: true, jsonp: false, jsonpCallback: "showCallBack", success: function(K) {
                if ("1" == K.jisudasupport) {
                    r = true;
                    i();
                    n();
                    if (typeof E == "function") {
                        E()
                    }
                } else {
                    r = false
                }
            }, error: function() {
                r = false
            }})
    };
    var w = function() {
        if (r) {
            try {
                CommonFourPage.storeService.jsdShow()
            } catch (E) {
            }
        }
    };
    var C = function() {
        try {
            CommonFourPage.storeService.jsdHide()
        } catch (E) {
        }
    };
    var i = function() {
        b("#btn_jsd").unbind().bind("click", function() {
            b("#win_jsd").remove();
            b(window.jsd_win.join("")).appendTo("body");
            b.mDialog({title: "温馨提示", message: b("#win_jsd"), css: {width: "460px"}, overlay: true, overlayCss: {background: "black", opacity: "0.3"}, overlayClick: false});
            v()
        })
    };
    var n = function() {
        var E = ['<div id="win_jsd" class="hide">', '	<div class="win-jsd">', '		<div id="jsd-tip" class="jsd-tip">', '			<i class="tipInfo3" id="tipInfo3"></i>', '			<span id="jsdInfo">查查看您的收货地址是否支持急速达。<br/>', "			</span>", "		</div>", '		<div class="jsd-form">', '			<div class="ctrl-group" style="_height:22px;_overflow:hidden;">', "				<label><i>*</i> 寄送至：</label>", '				<select id="provSelector"></select>', '				<select id="citySelector"></select>', '				<select id="distSelector"></select>', '				<select id="townSelector"></select>', "			</div>", '			<div class="ctrl-group">', "				<label><i>*</i> 详细地址：</label>", '				<input type="text" id="detail" maxlength="30" />', '				<p class="clear"></p>', '				<p class="form-tip" id="jsdErrorTip"></p>', "			</div>", '			<div class="form-btn">', '				<a href="javascript:void(0)" class="btn-submit" id="confirmQueryJsd"><span>查一查</span></a>', "			</div>", "		</div>", '		<a href="http://help.suning.com/page/id-197.htm" class="more" target="_blank">什么是急速达？</a>', "	</div>", "</div>"];
        window.jsd_win = E;
        if (!b("#win_jsd")[0]) {
            b(E.join("")).appendTo("body")
        }
        b("body").delegate(".jsd-form select", "change", o);
        b("body").delegate("#confirmQueryJsd", "click", m)
    };
    var m = function() {
        var E = {partnumber: D, provId: b("#provSelector option:selected").val(), cityId: b("#citySelector option:selected").val(), distId: b("#distSelector option:selected").val(), townId: b("#townSelector option:selected").val(), detail: b("#detail").val()};
        k = E.provId;
        s = E.cityId;
        z = E.distId;
        A = E.townId;
        t = E.detail;
        if (j(E)) {
            b.ajax({url: l, data: E, dataType: "jsonp", cache: false, async: false, jsonpCallback: "jsdAddressCheck", success: function(G) {
                    if (G.jsdFlag == "1") {
                        var F = G.jsdTimeEffect || "2";
                        b("#jsd-tip").removeClass().addClass("jsd-tip jsd-tip-ok");
                        b("#tipInfo3").removeClass().addClass("tipOK3");
                        b("#jsdInfo").text("您的收货地址支持急速达，商品下单成功后" + F + "小时内送达。")
                    } else {
                        b("#jsd-tip").removeClass().addClass("jsd-tip jsd-tip-warn");
                        b("#tipInfo3").removeClass().addClass("tipInfo3");
                        b("#jsdInfo").html("很抱歉您的收货地址<em>暂不支持急速达</em>服务，<br>您可以尝试门店自提获得快捷服务。")
                    }
                }, error: function() {
                    b("#jsd-tip").removeClass().addClass("jsd-tip jsd-tip-warn");
                    b("#tipInfo3").removeClass().addClass("tipInfo3");
                    b("#jsdInfo").html("很抱歉您的收货地址<em>暂不支持急速达</em>服务，<br>您可以尝试门店自提获得快捷服务。")
                }})
        }
    };
    var o = function() {
        var E = b(this).attr("id");
        switch (E) {
            case"provSelector":
                var F = {sProvId: b("#provSelector option:selected").val()};
                g(F, false);
                break;
            case"citySelector":
                var F = {sCityId: b("#citySelector option:selected").val()};
                c(F, false);
                break;
            case"distSelector":
                var F = {sDistId: b("#distSelector option:selected").val()};
                a(F);
                break;
            default:
                break
            }
    };
    var v = function() {
        var E = {sProvId: k || sn.provinceCode, sCityId: s || x("cityId"), sDistId: z || x("districtId"), sTownId: A, sDetail: t || ""};
        q(E, true);
        b("#detail").val(E.sDetail)
    };
    var q = function(G, H) {
        var F = "";
        var E = '<option value="">请选择</option>';
        b.ajax({url: p, data: {state: "prov", selectId: "0"}, dataType: "jsonp", cache: true, async: true, jsonpCallback: "initJsdProvBack", success: function(I) {
                b.each(I.data, function(K, J) {
                    option = "<option value=" + J.id + ">" + J.name + "</option>";
                    F = F + option
                });
                b("#provSelector").html(E + F);
                setTimeout(function() {
                    if (G.sProvId) {
                        b("#provSelector").val(G.sProvId)
                    }
                    if (H && G.sProvId) {
                        g(G, H)
                    }
                }, 0)
            }, error: function() {
                b("#provSelector").html(E)
            }})
    };
    var g = function(G, H) {
        var F = "";
        var E = '<option value="">请选择</option>';
        b.ajax({url: p, data: {state: "city", selectId: G.sProvId}, dataType: "jsonp", cache: true, async: true, jsonpCallback: "initJsdCityBack", success: function(I) {
                var J = "";
                b.each(I.data, function(L, K) {
                    J = "<option value=" + K.id + ">" + K.name + "</option>";
                    F = F + J
                });
                b("#citySelector").html(E + F);
                b("#distSelector").html(E);
                b("#townSelector").html(E);
                if (I.data.length == 1) {
                    b("#citySelector").hide()[0].options[1].selected = true;
                    if (!H) {
                        b("#citySelector").trigger("change")
                    }
                } else {
                    b("#citySelector").show();
                    if (G.sCityId) {
                        b("#citySelector").val(G.sCityId)
                    }
                }
                if (H && G.sCityId) {
                    c(G, H)
                }
            }, error: function() {
                b("#citySelector").html(E)
            }})
    };
    var c = function(G, H) {
        var E = "";
        var F = '<option value="">请选择</option>';
        b.ajax({url: p, data: {state: "area", selectId: G.sCityId}, dataType: "jsonp", cache: true, async: true, jsonpCallback: "initJsdDistBack", success: function(I) {
                b.each(I.data, function(K, J) {
                    option = "<option value=" + J.id + ">" + J.name + "</option>";
                    E = E + option
                });
                b("#distSelector").html(F + E);
                if (G.sDistId) {
                    b("#distSelector").val(G.sDistId)
                }
                b("#townSelector").html(F);
                if (H && G.sDistId) {
                    a(G)
                }
            }, error: function() {
                b("#distSelector").html(F)
            }})
    };
    var a = function(G) {
        var F = "";
        var E = '<option value="">请选择</option>';
        b.ajax({url: p, data: {state: "town", selectId: G.sDistId}, dataType: "jsonp", cache: true, async: true, jsonpCallback: "initJsdTownBack", success: function(H) {
                b.each(H.data, function(J, I) {
                    option = "<option value=" + I.id + ">" + I.name + "</option>";
                    F = F + option
                });
                b("#townSelector").html(E + F);
                if (H.data.length == 1) {
                    b("#townSelector").hide()[0].options[1].selected = true
                } else {
                    b("#townSelector").show();
                    if (G.sTownId) {
                        b("#townSelector").val(G.sTownId)
                    }
                }
            }, error: function() {
                b("#townSelector").html(E)
            }})
    };
    var j = function(E) {
        if (E.provId == "") {
            b("#jsdErrorTip").text("请选择省份。");
            return false
        }
        if (E.cityId == "") {
            b("#jsdErrorTip").text("请选择城市。");
            return false
        }
        if (E.distId == "") {
            b("#jsdErrorTip").text("请选择区（县）。");
            return false
        }
        if (E.townId == "") {
            b("#jsdErrorTip").text("请选择街道（镇）。");
            return false
        }
        if (E.detail == "") {
            b("#jsdErrorTip").text("请输入详细地址信息。");
            return false
        }
        b("#jsdErrorTip").text("");
        return true
    };
    return{partnumber: D, initJsdLabel: u, showLabel: w, hideLabel: C}
})(jQuery);
var MDJT = MDJT || {};
MDJT.zt = (function(a) {
    var k = false;
    var c = ("https:" == document.location.protocol) ? "https" : "http";
    var e = function(w) {
        var x = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
        var v = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
        var y = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
        if (x.test(w)) {
            return"pre"
        } else {
            if (v.test(w)) {
                return"sit"
            } else {
                if (y.test(w)) {
                    return"dev"
                } else {
                    return"prd"
                }
            }
        }
    };
    var t;
    var u = false;
    var m = function(v) {
        var w;
        return(w = document.cookie.match(RegExp("(^| )" + v + "=([^;]*)(;|$)"))) ? decodeURIComponent(w[2].replace(/\+/g, "%20")) : null
    };
    var g = c + "://";
    var r = document.location.hostname;
    switch (e(r)) {
        case"pre":
            g = g + "b2cpre.cnsuning.com/emall";
            break;
        case"sit":
            g = g + "b2csit.cnsuning.com/emall";
            break;
        case"prd":
            g = g + "www.suning.com/emall";
            break;
        case"dev":
            g = g + "b2cdev.cnsuning.com/webapp/wcs/stores/servlet";
            break;
        default:
            break
    }
    var p = g + "/mdjt";
    var q = function(x, v) {
        t = x.partnumber || sn.partnumber;
        var y = x.districtId || m("districtId");
        var B = x.vendor;
        var w = sn.storeId || "10052";
        var A = sn.catalogId || "10051";
        var z = ["_", w, "_", A, "_", t, "_", y, "_", B, "_", "showCallBack_.html"];
        a.ajax({type: "get", url: p + z.join(""), dataType: "jsonp", cache: true, async: true, jsonp: false, jsonpCallback: "showCallBack", success: function(C) {
                if (C.mdjtsupport) {
                    u = true;
                    f(x);
                    if (typeof v == "function") {
                        v()
                    }
                } else {
                    u = false
                }
            }, error: function() {
                u = false
            }})
    };
    var f = function(v) {
        a("#btn_mdjt").unbind().bind("click", function() {
            o(v)
        })
    };
    var o = function(v) {
        t = v.partnumber || sn.partnumber;
        var x = v.districtId || m("districtId");
        var w = v.price;
        a.ajax({type: "get", url: g + "/mdjtCmd?partnumber=" + t + "&districtId=" + x + "&oprType=1&price=" + w, dataType: "jsonp", cache: true, async: true, jsonp: "callback", success: function(y) {
                if (y.rs) {
                    k = true;
                    b(k);
                    i(y.rs);
                    n()
                } else {
                    b(false);
                    a("#zititable").empty();
                    a("#zititable").append("<tbody><tr><td>您所选择的" + a("#citybName").text() + a("#districtName").text() + "，暂无可自提门店！</td></tr></tbody>");
                    n()
                }
            }, error: function() {
                b(false);
                a("#zititable").empty();
                a("#zititable").append("<tbody><tr><td>您所选择的" + a("#citybName").text() + a("#districtName").text() + "，暂无可自提门店！</td></tr></tbody>");
                n();
                k = false
            }})
    };
    var n = function() {
        var v = a("#districtName").text();
        var w = a("#citybName").text();
        a.mDialog({title: w + v + "现货门店列表", message: a("#win_ziti"), css: {width: "460px"}, overlay: true, overlayCss: {background: "black", opacity: "0.3"}, overlayClick: false})
    };
    var b = function(w) {
        if (w == true) {
            var v = ['<div id="win_ziti" class="hide">', '<div class="ziti-pop">', '<table id = "zititable" width="100%">', "</table>", ' <div class="ziti-handle">', '    <a href="javascript:void(0);" class="btn-close close">关闭</a>', " </div>", " </div>", "</div>"]
        } else {
            var v = ['<div id="win_ziti" class="hide">', '<div class="ziti-pop">', '<table id = "zititable" width="100%">', "</table>", ' <div class="ziti-handle">', '    <a href="javascript:void(0);" class="btn-close close">关闭</a>', " </div>", " </div>", "</div>"]
        }
        if (!a("#win_ziti")[0]) {
            a(v.join("")).appendTo("body")
        }
    };
    var i = function(w) {
        if (w) {
            var v = "<tr><th width=22%>自提点</th><th width=60%>地址</th><th width=18%></th></tr>";
            var x = " ";
            a.each(w, function(z, A) {
                var y = "<tr><td>" + A.storeName + "</td><td>" + A.storeAccess + "</td><td><a href='javascript:MDJT.zt.mdjt_cart2Check(\"" + A.storeId + "\");'class='mdjt_cart2'>立即自提</a></td>";
                v = v + y
            });
            a("#zititable").empty();
            a("#zititable").append(v)
        } else {
            a("#zititable").empty();
            a("#zititable").append("<h3>门店列表为空，请重新选择城市</h3>")
        }
    };
    var h = function(v) {
        Fourth.addCartPop.hide();
        a("body").AjaxLogin({success: function() {
                l(v)
            }})
    };
    var l = function(x) {
        var v = "newBuyNow";
        quickPress(true);
        var y = g + "/addMiniSoppingCart";
        var w = a("#buyNum").val();
        var z = {ERROEVIEW: "miniShoppingCartView", URL: "miniShoppingCartView", quantity_1: w, fullInventoryCheck: "0", inventoryCheckType: "0", fullVoucherCheck: "0", voucherCheckType: "0", inventoryRemoteCheck: "1", orderId: ".", storeId: "10052", langId: "-7", catalogId: "10051", voucherRemoteCheck: "1", siteCode: x, catEntryId_1: sn.productId};
        z.promotionType = "newBuyNow";
        if (typeof (bd) != "undefined") {
            setCookie("c2dt", bd.rst())
        }
        if (needVerifyCodeVal) {
            var A = verifyCodeVal;
            if (A != undefined && A != "" && A != "以下字符不区分大小写") {
                z.verifyCode = A;
                z.uuid = v_uuid
            }
        }
        a.ajax({url: y, data: z, cache: false, async: false, dataType: "jsonp", jsonp: "callback", jsonpCallback: "callbackFun", success: function(B) {
                needVerifyCodeVal = false;
                if (B.userStatus != "") {
                    alertErrorBox("您的会员卡已冻结，请拨打4008-198-198或在线客服处理。")
                } else {
                    var D = window.location.href;
                    if (B.errorCode == "MINOSE_0001") {
                        quickPress(false);
                        showMinos1()
                    } else {
                        if (B.errorCode == "MINOSE_0002") {
                            quickPress(false);
                            showMinos2()
                        } else {
                            if (B.errorCode == "MINOSE_0003") {
                                needVerifyCodeVal = true;
                                quickPress(false);
                                showMinos3(B.uuid)
                            } else {
                                if (B.errorCode == "pne") {
                                    alertErrorBox("该优惠价库存不足，请修改数量！")
                                } else {
                                    if (B.errorCode == "BLACKLISTERROR") {
                                        alertErrorBox("抱歉，您暂无资格购买大聚惠商品，请选择其他商品购买。");
                                        quickPress(false)
                                    } else {
                                        if (B.errorCode == "GROUPTIMEOUT" || B.errorCode == "GROUPNUMOUT" || B.errorCode == "GROUPSIMPLENUMOUT" || B.errorCode == "GROUPPARAMERROR" || B.errorCode == "GROUPINPREHEAT" || B.errorCode == "GROUPHAVINGCHANCE") {
                                            alertErrorBox(B.errorMessage);
                                            quickPress(false)
                                        } else {
                                            if (B.errorCode == "GROUPNOTBINDPHONE") {
                                                aqSuning1.showMobilePopType(false);
                                                quickPress(false)
                                            } else {
                                                if (B.errorCode == "GROUPUSERINFOERR") {
                                                    Util.alertErrorBox("您的账号存在异常，请致电客服4008-365-365");
                                                    quickPress(false)
                                                } else {
                                                    if (B.errorCode == "GROUPNOTBRONDPAY") {
                                                        Util.alertErrorBox("您需要进行<a href='" + getBrondPayUrl() + "'>易付宝快捷绑定</a>后才可以继续购买哦~");
                                                        quickPress(false)
                                                    } else {
                                                        if (B.errorCode == "SCODE_NOT_ENOUGH" || B.errorCode == "SCODE_SYS_ERR") {
                                                            Util.alertErrorBox(B.errorMessage);
                                                            quickPress(false)
                                                        } else {
                                                            if (B.errorCode == "SCODE_NOT_BIND") {
                                                                Util.alertErrorBox("您没有此商品的S码或S码还没有<a href='" + getBindScodeUrl() + "'  target='_Blank'>激活</a>");
                                                                quickPress(false)
                                                            } else {
                                                                if (B.errorCode == "psellNotBuyTime") {
                                                                    alertErrorBox(B.errorMessage)
                                                                } else {
                                                                    if (B.isOverLimitCnt == "OVERLIMIT") {
                                                                        var C = "http://" + sn.cartPath + "/OrderItemDisplay?langId=" + sn.langId + "&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                                                                        alertErrorBox("您的购物车商品清单种类已达50种上限，建议您立即<a href=" + C + ">清理购物车</a>")
                                                                    } else {
                                                                        if (B.errorCode == "NOTVALIDUSER") {
                                                                            alertErrorBox("用户的会员卡状态不正确,请咨询客服！")
                                                                        } else {
                                                                            if (B.errorCode == "NOTSALE") {
                                                                                var C = "http://" + sn.domain;
                                                                                alertBoxForClose("此商品暂不销售，您可以尝试选购其他商品<a href=" + C + ">选购其他商品</a>")
                                                                            } else {
                                                                                if (B.errorCode == "ITNOTSALE") {
                                                                                    alertErrorBox("对不起，该商品帮客服务暂不销售，请取消勾选后重新加入购物车。")
                                                                                } else {
                                                                                    if (B.errorCode == "NOSALESORGITEM") {
                                                                                        alertErrorBox("对不起,此商品无销售组织，加入购物车失败")
                                                                                    } else {
                                                                                        if (B.errorCode == "limitShopping") {
                                                                                            alertBoxForClose("最多可购买" + B.limitCount + "件，已超出可购数量")
                                                                                        } else {
                                                                                            if (B.errorCode == "fql_0001") {
                                                                                                alertBoxForClose("亲，您的操作过于频繁，请稍后再试哦！")
                                                                                            } else {
                                                                                                if (B.hasInventor == 1 && B.treaph == 0) {
                                                                                                    sn.toCartUrl = "http://" + sn.cartPath + "/SNCart2ManageCmd?langId=" + sn.langId + "&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&newBuyNow=" + v + "&mdjtsc=" + x;
                                                                                                    toCart()
                                                                                                } else {
                                                                                                    if (B.hasInventor == 0 && B.invErrFlow == 1) {
                                                                                                        alertBoxForClose("此商品无货，您可以尝试选购其他商品！")
                                                                                                    } else {
                                                                                                        if (B.hasInventor == 0 && B.invErrFlow == 2) {
                                                                                                            alertBoxForClose("您购买的数量超过库存上限，请修改商品数量")
                                                                                                        } else {
                                                                                                            if (B.hasInventor == 0 && (B.invErrFlow == 3 || B.invErrFlow == 0)) {
                                                                                                                sn.toCartUrl = "http://" + sn.cartPath + "/SNCart2ManageCmd?langId=" + sn.langId + "&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&newBuyNow=" + v;
                                                                                                                toCart()
                                                                                                            } else {
                                                                                                                if (B.errorCode == "NOINVENTORY" && (B.treaph == "1" || B.treaph == "2")) {
                                                                                                                    alertErrorBox("该合约机对应商品暂无货！")
                                                                                                                } else {
                                                                                                                    if (B.hasInventor == 1 && (B.treaph == "1" || B.treaph == "2")) {
                                                                                                                        sn.toCartUrl = "https://" + sn.cartPath + "/SNSelectTreatyPhoneNumView?langId=" + sn.langId + "&storeId=" + sn.storeId + "&catalogId=" + sn.catalogId;
                                                                                                                        addCartPopBox()
                                                                                                                    }
                                                                                                                }
                                                                                                            }
                                                                                                        }
                                                                                                    }
                                                                                                }
                                                                                            }
                                                                                        }
                                                                                    }
                                                                                }
                                                                            }
                                                                        }
                                                                    }
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
                quickPress(false)
            }})
    };
    var j = function() {
        if (u) {
            a("#btn_mdjt").show()
        }
    };
    var s = function() {
        a("#btn_mdjt").hide()
    };
    return{mdjt_cart2Check: h, showLabel: j, hideLabel: s, initmdjt: q}
})(jQuery);