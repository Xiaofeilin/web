var srsval = srsval || {};
srsval.highlight;
srsval.unhighlight;
srsval.settings = {};
srsval.init = function(a) {
    srsval.settings = $.extend({baseUrl: $("#baseUrl").val(), commerceServer: "https://ssl.suning.com", eppLoginFunName: "eppLogin", logonUrlFunName: "logonUrl", grapGoOnFunName: "grapGoOn", coverPoint_partyName_E003_checkReg: "", coverPoint_emailAlias_exist_login: "", coverPoint_emailAliasEPP_E001_EPPAlaisExit_unionLogin: "", coverPoint_emailAliasEPP_exist_login: "", coverPoint_mobileAliasEPP_E001_EPPAlaisExit_unionLogin: "", coverPoint_mobileAliasEPP_cmf_online_login: "", coverPoint_mobileAliasEPP_R0_cmf_offline_cardLogin: "", coverPoint_mobileAliasEPP_cmf_cangrap_login: "", coverPoint_mobileAliasEPP_cmf_cangrap_Reg: "", coverPoint_mobileAliasEPP_exist_login: "", errorMessage_mobileAliasEPP_empty: "", errorMessage_emailAliasEPP_EPPAlaisExit: "", errorMessage_emailAliasEPP_exist: "", errorMessage_emailAlias_exist: ""}, a);
    srsval.highlight = a.highlight;
    srsval.unhighlight = a.unhighlight
};
srsval.valid = function(d) {
    var g = d.validObjs;
    var c = d.model || "order";
    var b = true;
    for (var e = 0; e < g.length; e++) {
        var f = g[e];
        var a = srsval.methods[f.methodName](f);
        if (a == false) {
            b = false;
            if (c == "order") {
                break
            }
        }
    }
    return b
};
srsval.methods = {partyName: function(g) {
        var a = g.elementId;
        var c = g.messageId;
        var d = g.isAjaxCheck == null ? true : g.isAjaxCheck;
        var h = $(a).val();
        if (h.length == 0) {
            srsval.highlight(g, h, "__empty", "请输入营业执照上的单位名称");
            return false
        }
        partyNameTrim = h.Trim();
        if (partyNameTrim.length == 0) {
            srsval.highlight(g, h, "__all_blank", "请输入营业执照上的单位名称");
            return false
        }
        if (h.length < 1) {
            srsval.highlight(g, h, "__too_short", "单位名称长度只能在1-60个字符之间。");
            return false
        }
        if (h.length > 60) {
            srsval.highlight(g, h, "__too_long", "单位名称长度只能在1-60个字符之间。");
            return false
        }
        var f = /^[\u4e00-\u9fa5a-zA-Z0-9()（）· ]*$/;
        if (!f.test(h)) {
            srsval.highlight(g, h, "_special_character", "单位名称只能由中文、英文、数字、空格及（）、()、· 组成。");
            return false
        }
        function e() {
            var i;
            $.ajax({url: srsval.settings.baseurl + "/ajaxcheckpartyName.do", type: "POST", async: false, cache: false, data: {partyName: h}, dataType: "json", success: function(k) {
                    if ("R0" == k.result) {
                        var j = k.code;
                        if ("E001" == j) {
                            i = {result: false, code: "E001", msg: "该单位名称已存在且已进行身份认证，请确认是否贵司人员注册"};
                            return
                        }
                        if ("E002" == j) {
                            i = {result: false, code: "E002", msg: "该单位名称已存在，如非贵司注册，请联系4008516516进行申诉"};
                            return
                        }
                        if ("E003" == j) {
                            i = {result: false, code: "E003", msg: "该单位名称在线下公司卡中已存在，您可以直接进行<a href='" + srsval.settings.baseurl + "/companycardshow.do' name='" + srsval.settings.coverPoint_partyName_E003_checkReg + "'>验证注册</a>"};
                            return
                        }
                        if ("E004" == j) {
                            i = {result: false, code: "E004", msg: "该单位名称在线下已存在，请上传您的注册邮箱、联系手机、单位名称、单位所在地、营业执照副本至b2b@cnsuning.com来完成验证注册"};
                            return
                        }
                        if ("E005" == j) {
                            i = {result: false, code: "E005", msg: "该单位名称在线下已存在，请上传您的注册邮箱、联系手机、单位名称、单位所在地、营业执照副本至b2b@cnsuning.com来完成验证注册"};
                            return
                        }
                        if ("EI9999" == j) {
                            i = {result: false, code: "EI9999", msg: k.msg};
                            return
                        }
                        if ("E0000001" == j) {
                            i = {result: false, code: "E0000001", msg: "您的网络不给力哦，请稍后再试！"};
                            return
                        }
                    } else {
                        i = {result: true, code: "__success", msg: ""};
                        return
                    }
                }});
            return i
        }
        if (d) {
            var b = e();
            if (!b.result) {
                srsval.highlight(g, h, b.code, b.msg);
                return false
            } else {
                srsval.unhighlight(g, h, b.code, b.msg);
                return true
            }
        }
        srsval.unhighlight(g, h, "__success", "");
        return true
    }, emailAlias: function(h) {
        var b = h.elementId;
        var e = h.messageId;
        var d = $(b).val();
        var f = h.isAjaxCheck == null ? true : h.isAjaxCheck;
        var g = /^[\w-]+[-.\w]*@[-\w]+\.[-.\w]*[\w-]+$/;
        if (d.length == 0) {
            srsval.highlight(h, d, "__empty", "请输入注册邮箱！");
            return false
        }
        if (d.length > 50) {
            srsval.highlight(h, d, "__too_long", "邮箱格式不正确，请重新输入！");
            return false
        }
        if (!g.test(d)) {
            srsval.highlight(h, d, "__format", "邮箱格式不正确，请重新输入！");
            return false
        }
        function a() {
            var i;
            $.ajax({url: "ajax.php", type: "POST", async: false, cache: false, data: {aliasName: d}, dataType: "json", success: function(j) {
                    i = {result: true, code: "__success", msg: ""};
                    return;
                    if ("R0" == j.result) {
                        if ("EI9999" == j.code) {
                            i = {result: false, code: "EI9999", msg: "您的网络不给力，请稍后再试。"};
                            return
                        }
                        i = {result: false, code: j.code, msg: (srsval.settings.errorMessage_emailAlias_exist != "" ? srsval.settings.errorMessage_emailAlias_exist : "邮箱已被注册，请重新输入邮箱或<a href='javascript:" + srsval.settings.logonUrlFunName + '("","","");\' name="' + srsval.settings.coverPoint_emailAlias_exist_login + '">登录</a>。')};
                        return
                    } else {
                        i = {result: true, code: "__success", msg: ""}
                    }
                }});
            return i
        }
        if (f) {
            var c = a();
            if (!c.result) {
                srsval.highlight(h, d, c.code, c.msg);
                return false
            } else {
                srsval.unhighlight(h, d, c.code, c.msg);
                return true
            }
        }
        srsval.unhighlight(h, d, "__success", "");
        return true
    }, emailAliasEPP: function(h) {
        var b = h.elementId;
        var e = h.messageId;
        var f = $(b).val();
        var a = h.isAjaxCheck == null ? true : h.isAjaxCheck;
        var i = h.eppGoOnEmail;
        var d = /^[\w-]+[-.\w]*@[-\w]+\.[-.\w]*[\w-]+$/;
        if (f.length == 0) {
            srsval.highlight(h, f, "__empty", "请输入注册邮箱！");
            return false
        }
        if (f.length > 50) {
            srsval.highlight(h, f, "__too_long", "邮箱格式不正确，请重新输入！");
            return false
        }
        if (!d.test(f)) {
            srsval.highlight(h, f, "__format", "邮箱格式不正确，请重新输入！");
            return false
        }
        function c() {
            var j = false;
            $.ajax({url: "ajax.php", type: "POST", async: false, cache: false, data: {aliasName: f}, dataType: "json", success: function(k) {
                   
                        j = {result: true, code: "__success", msg: ""};
                        return
                    
                    if ("E001_EPPAlaisExit" == k.code) {
                        if (i == f) {
                            j = {result: true, code: "E001_EPPAlaisExit", msg: (srsval.settings.errorMessage_emailAliasEPP_EPPAlaisExit != "" ? srsval.settings.errorMessage_emailAliasEPP_EPPAlaisExit : "该邮箱在易付宝已存在，您可以选择继续注册，或用此易付宝账号<a href='javascript:void(0);' onclick='" + srsval.settings.eppLoginFunName + "();return false;' name='" + srsval.settings.coverPoint_emailAliasEPP_E001_EPPAlaisExit_unionLogin + "'>联合登录</a>。")};
                            return
                        }
                        j = {result: false, code: "E001_EPPAlaisExit", msg: (srsval.settings.errorMessage_emailAliasEPP_EPPAlaisExit != "" ? srsval.settings.errorMessage_emailAliasEPP_EPPAlaisExit : "该邮箱在易付宝已存在，您可以选择继续注册，或用此易付宝账号<a href='javascript:void(0);' onclick='" + srsval.settings.eppLoginFunName + "();return false;' name='" + srsval.settings.coverPoint_emailAliasEPP_E001_EPPAlaisExit_unionLogin + "'>联合登录</a>。")};
                        return
                    }
                    if ("EI9999" == k.code) {
                        j = {result: false, code: "EI9999", msg: "您的网络不给力，请稍后再试。"};
                        return
                    }
                    if (null != k.msg && "" != k.msg) {
                        j = {result: false, code: k.code, msg: k.msg};
                        return
                    }
                    j = {result: false, code: k.code, msg: (srsval.settings.errorMessage_emailAliasEPP_exist != "" ? srsval.settings.errorMessage_emailAliasEPP_exist : '该邮箱已存在，请重新输入或使用该邮箱直接<a name="' + srsval.settings.coverPoint_emailAliasEPP_exist_login + '" href="javascript:' + srsval.settings.logonUrlFunName + "('','','" + f + "');\">登录</a>")};
                    return
                }});
            return j
        }
        if (a) {
            var g = c();
            if (!g.result) {
                srsval.highlight(h, f, g.code, g.msg);
                return false
            } else {
                srsval.unhighlight(h, f, g.code, g.msg);
                return true
            }
        }
        srsval.unhighlight(h, f, "__success", "");
        return true
    }, mobileAliasEPP: function(l) {
        var g = l.elementId;
        var j = l.messageId;
        var f = $(g).val();
        var b = l.isAjaxCheck == null ? true : l.isAjaxCheck;
        var c = l.grapGoOnMobile;
        var a = l.offlineGoOnMobile;
        var d = l.eppGoOnMobile;
        var i = false;
        var h = /^[1]\d{10}$/;
        if (f.length == 0) {
            srsval.highlight(l, f, "__empty", (srsval.settings.errorMessage_mobileAliasEPP_empty != "" ? srsval.settings.errorMessage_mobileAliasEPP_empty : "请输入注册手机！"));
            return false
        }
        if (!h.test(f)) {
            srsval.highlight(l, f, "__format", "格式不正确，请您输入正确的手机号。");
            return false
        }
        function e() {
            var m = false;
            $.ajax({url: "ajax.php", type: "POST", async: false, cache: false, data: {aliasName: f}, dataType: "json", success: function(n) {
                    m = {result: true, code: "__success", msg: "注册完成后，您可以使用手机号码登录苏宁易购。"};
                        return
                    if ("R1" == n.result) {
                        if ("cmf_offline" == n.code) {
                            if (a == f) {
                                m = {result: true, code: "cmf_offline", msg: "该手机在门店会员卡中已存在，您可以继续注册易购账号，注册完成后，易购账号将会与门店会员卡进行关联通用。"};
                                return
                            }
                            m = {result: false, code: "cmf_offline", msg: "该手机在门店会员卡中已存在，您可以继续注册易购账号，注册完成后，易购账号将会与门店会员卡进行关联通用。"};
                            return
                        }
                        m = {result: true, code: "__success", msg: "注册完成后，您可以使用手机号码登录苏宁易购。"};
                        return
                    }
                    if ("E001_EPPAlaisExit" == n.code) {
                        if (d == f) {
                            m = {result: true, code: "E001_EPPAlaisExit", msg: "该手机在易付宝已存在，您可以选择继续注册，或用此易付宝账号<a href='javascript:void(0);' onclick='" + srsval.settings.eppLoginFunName + "();return false;' name='" + srsval.settings.coverPoint_mobileAliasEPP_E001_EPPAlaisExit_unionLogin + "'>联合登录</a>。"};
                            return
                        }
                        m = {result: false, code: "E001_EPPAlaisExit", msg: "该手机在易付宝已存在，您可以选择继续注册，或用此易付宝账号<a href='javascript:void(0);' onclick='" + srsval.settings.eppLoginFunName + "();return false;' name='" + srsval.settings.coverPoint_mobileAliasEPP_E001_EPPAlaisExit_unionLogin + "'>联合登录</a>。"};
                        return
                    }
                    if ("EI9999" == n.code) {
                        m = {result: false, code: "EI9999", msg: "您的网络不给力，请稍后再试。"};
                        return
                    } else {
                        if ("cmf_online" == n.code) {
                            m = {result: false, code: "cmf_online", msg: '该手机号已存在，您可以使用此手机号直接<a name="' + srsval.settings.coverPoint_mobileAliasEPP_cmf_online_login + '" href="javascript:' + srsval.settings.logonUrlFunName + "('','','" + f + "');\">登录</a>"};
                            return
                        } else {
                            if ("cmf_offline" == n.code) {
                                var o = srsval.settings.commerceServer;
                                m = {result: false, code: "R0_cmf_offline", msg: "该手机在门店会员卡中已存在，您可以直接进行<a href='" + o + "/emall/SNOffLineMemberMergeCheckCmd?storeId=10052&catalogId=10051&checkType=phone&phone=" + f + "' target='_blank' " + srsval.settings.coverPoint_mobileAliasEPP_R0_cmf_offline_cardLogin + ">会员卡登录</a>。"};
                                return
                            } else {
                                if ("cmf_cangrap" == n.code) {
                                    if (c == f) {
                                        m = {result: true, code: "cmf_cangrap", msg: "该手机号已注册易购账号，继续注册原账号将不能使用，如果您希望使用原账号请直接登录。"};
                                        return
                                    }
                                    m = {result: false, code: "cmf_cangrap", msg: '该手机号已注册易购账号，<a name="' + srsval.settings.coverPoint_mobileAliasEPP_cmf_cangrap_Reg + '" href="javascript:' + srsval.settings.grapGoOnFunName + "('" + f + '\');">继续注册</a>原账号将不能使用，如果您希望使用原账号请<a name="' + srsval.settings.coverPoint_mobileAliasEPP_cmf_cangrap_login + '" href="javascript:' + srsval.settings.logonUrlFunName + "('','','" + f + "');\">直接登录</a>。"};
                                    return
                                }
                            }
                        }
                    }
                    if (null != n.msg && "" != n.msg) {
                        m = {result: false, code: n.code, msg: n.msg};
                        return
                    }
                    m = {result: false, code: n.code, msg: '该手机号已存在，您可以使用此手机号直接<a name="' + srsval.settings.coverPoint_mobileAliasEPP_exist_login + '" href="javascript:' + srsval.settings.logonUrlFunName + "('','','" + f + "');\">登录</a>"};
                    return
                }});
            return m
        }
        if (b) {
            var k = e();
            if (!k.result) {
                srsval.highlight(l, f, k.code, k.msg);
                return false
            } else {
                srsval.unhighlight(l, f, k.code, k.msg);
                return true
            }
        }
        srsval.unhighlight(l, f, "__success", "");
        return true
    }, cntctMobileNum: function(e) {
        var a = e.elementId;
        var b = e.messageId;
        var c = $(a).val();
        if (c.length == 0) {
            srsval.highlight(e, c, "__empty", "请输入联系手机！");
            return false
        }
        var d = /^[1]\d{10}$/;
        if (c.length > 0 && !d.test(c)) {
            if (!d.test(c)) {
                srsval.highlight(e, c, "__format", "手机号码格式不正确，请重新输入！");
                return false
            }
        }
        srsval.unhighlight(e, c, "__success", "");
        return true
    }, imgCode: function(h) {
        var a = h.elementId;
        var d = h.messageId;
        var f = h.isAjaxCheck == null ? true : h.isAjaxCheck;
        var g = $(a).val();
        var e = $(h.uidId).val();
        if (e.length == 0) {
            srsval.unhighlight(h, g, "__success", "");
            return true
        }
        if (g.length == 0) {
            srsval.highlight(h, g, "__empty", "请输入验证码！");
            return false
        }
        if (g.length < 4) {
            srsval.highlight(h, g, "__too_short", "验证码不正确！");
            return false
        }
        if (g.length > 4) {
            srsval.highlight(h, g, "__too_long", "验证码不正确！");
            return false
        }
        function c() {
            var i;
            $.ajax({url: srsval.settings.baseurl + "/ajaxcheckimg.do", type: "POST", contentType: "application/x-www-form-urlencoded; charset=UTF-8", async: false, cache: false, data: {code: g, uid: e}, dataType: "json", success: function(j) {
                    if ("R0" == j.result) {
                        i = {result: true, code: "__success", msg: ""};
                        return
                    } else {
                        i = {result: false, code: j.result, msg: "验证码不正确！"};
                        return
                    }
                }});
            return i
        }
        if (f) {
            var b = c();
            if (!b.result) {
                srsval.highlight(h, g, b.code, b.msg);
                return false
            } else {
                srsval.unhighlight(h, g, b.code, b.msg);
                return true
            }
        }
        srsval.unhighlight(h, g, "__success", "");
        return true
    }, smsCode: function(h) {
        var c = h.elementId;
        var f = h.messageId;
        var a = h.isAjaxCheck == null ? true : h.isAjaxCheck;
        var j = $(c).val();
        var i = $(h.phoneNumId).val();
        var d = h.scen;
        if (j.length == 0) {
            srsval.highlight(h, j, "__empty", "请输入短信验证码。");
            return false
        }
        if (j.length != 6) {
            srsval.highlight(h, j, "__length", "请输入6位数字验证码。");
            return false
        }
        var e = /^\d{6}$/;
        if (!e.test(j)) {
            srsval.highlight(h, j, "__format", "请输入6位数字验证码。");
            return false
        }
        function b() {
            var k;
            $.ajax({url: "ajax.php", type: "POST", async: false, cache: false, data: {scen: d, code: j, phoneNum: i}, dataType: "html", success: function(rs) {
                    if ("2" == rs) {
                   
                        k = {result: true, code: "__success", msg: ""};
                        return
                    }
                    k = {result: false, code: "", msg: "短信验证码错误或已失效，请重新输入！"};
                    return
                }});
            return k
        }
        if (a) {
            var g = b();
            if (!g.result) {
                srsval.highlight(h, j, g.code, g.msg);
                return false
            } else {
                srsval.unhighlight(h, j, g.code, g.msg);
                return true
            }
        }
        srsval.unhighlight(h, j, "__success", "");
        return true
    }, emailCode: function(h) {
        var b = h.elementId;
        var e = h.messageId;
        var a = h.isAjaxCheck == null ? true : h.isAjaxCheck;
        var j = $(b).val();
        var f = $(h.emailId).val();
        var c = h.scen;
        if (j.length == 0) {
            srsval.highlight(h, j, "__empty", "请输入邮箱验证码。");
            return false
        }
        if (j.length != 6) {
            srsval.highlight(h, j, "__length", "请输入6位数字验证码。");
            return false
        }
        var d = /^\d{6}$/;
        if (!d.test(j)) {
            srsval.highlight(h, j, "__format", "请输入6位数字验证码。");
            return false
        }
        function i() {
            var k;
            $.ajax({url:"ajax.php", type: "POST", async: false, cache: false, data: {scen: c, code: j, email: f}, dataType: "json", success: function(l) {
                    
                        k = {result: true, code: "__success", msg: ""};
                        return
                    
                    if (null != l && "" != l.returnMsg) {
                        if ("1101" == l.returnCode) {
                            k = {result: false, code: "1101", msg: "邮箱验证码错误，请重新输入。"};
                            return
                        } else {
                            if ("1103" == l.returnCode) {
                                k = {result: false, code: "1103", msg: "验证码已失效，请重新获取。"};
                                return
                            }
                        }
                        k = {result: false, code: l.returnCode, msg: l.returnMsg};
                        return
                    }
                    k = {result: false, code: "", msg: "邮箱验证码错误或已失效，请重新输入！"};
                    return
                }});
            return k
        }
        if (a) {
            var g = i();
            if (!g.result) {
                srsval.highlight(h, j, g.code, g.msg);
                return false
            } else {
                srsval.unhighlight(h, j, g.code, g.msg);
                return true
            }
        }
        srsval.unhighlight(h, j, "__success", "");
        return true
    }, setPsw: function(e) {
        var b = e.elementId;
        var c = e.messageId;
        var d = $(b).val();
        if (isEmptyPassword(d)) {
            srsval.highlight(e, d, "__empty", "请输入6-20位密码！");
            return false
        }
        var a = checkPassword(d);
        if (!a.success) {
            srsval.highlight(e, d, "__check", a.msg);
            return false
        }
        srsval.unhighlight(e, d, "__success", "");
        return true
    }, confirmPsw: function(d) {
        var a = d.elementId;
        var b = d.messageId;
        var e = $(a).val();
        var c = $(d.setPswId).val();
        if (isEmptyPassword(e)) {
            srsval.highlight(d, e, "__empty", "确认密码不能为空！");
            return false
        }
        if (c != e) {
            srsval.highlight(d, e, "__confirm", "您两次输入的密码不一致，请重新输入！");
            return false
        }
        srsval.unhighlight(d, e, "__success", "");
        return true
    }, areaCode: function(f) {
        var c = f.elementId;
        var d = f.messageId;
        var b = $(f.provCodeId).val();
        var e = $(f.cityCodeId).val();
        var a = $(f.areaCodeId).val();
        if (b.length <= 0) {
            srsval.highlight(f, a, "__prov_empty", "请选择单位所在地！");
            return false
        }
        if (e.length <= 0) {
            srsval.highlight(f, a, "__city_empty", "请选择单位所在地！");
            return false
        }
        if (a.length <= 0) {
            srsval.highlight(f, a, "__area_empty", "请选择单位所在地！");
            return false
        }
        srsval.unhighlight(f, a, "__success", "");
        return true
    }, cntctPointName: function(e) {
        var a = e.elementId;
        var b = e.messageId;
        var d = $(a).val();
        if (d.length == 0) {
            srsval.highlight(e, d, "__empty", "请输入联系人姓名！");
            return false
        }
        if (d.length < 2) {
            srsval.highlight(e, d, "__too_short", "联系人姓名长度只能为2-32个字符。");
            return false
        }
        if (d.length > 32) {
            srsval.highlight(e, d, "__too_long", "联系人姓名长度只能为2-32个字符。");
            return false
        }
        var c = /^[\u4e00-\u9fa5a-zA-Z]*$/;
        if (!c.test(d)) {
            srsval.highlight(e, d, "__format", "联系人姓名只能由中文或英文组成。");
            return false
        }
        srsval.unhighlight(e, d, "__success", "");
        return true
    }, tele: function(g) {
        var d = g.elementId;
        var e = g.messageId;
        var c = $(g.teleAreaCdeId).val();
        var f = $(g.teleNumId).val();
        var b = $(g.teleExtnId).val();
        if (c.length <= 0) {
            srsval.highlight(g, g.teleAreaCdeId, "__areacode_empty", "请输入固定电话区号");
            return false
        }
        var a = /^\d{3,4}$/;
        if (!a.test(c)) {
            srsval.highlight(g, g.teleAreaCdeId, "__areacode_format", "区号必须为3-4位纯数字！");
            return false
        }
        if (f.length <= 0) {
            srsval.highlight(g, g.teleNumId, "__telenum_empty", "请输入固定电话座机号");
            return false
        }
        var i = /^\d{7,12}$/;
        if (!i.test(f)) {
            srsval.highlight(g, g.teleNumId, "__telenum_format", "座机号必须为7-12位纯数字！");
            return false
        }
        var h = /^\d{0,6}$/;
        if (!h.test(b)) {
            srsval.highlight(g, g.teleExtnId, "__teleextn_format", "分机号必须为0-6位纯数字！");
            return false
        }
        srsval.unhighlight(g, g.teleAreaCdeId + "," + g.teleNumId + "," + g.teleExtnId, "__success", "");
        return true
    }, protocol: function(d) {
        var a = d.elementId;
        var c = d.messageId;
        var b = $(a).attr("checked");
        if (!b) {
            srsval.highlight(d, b, "__unchecked", "您必须同意苏宁服务条款后，才能提交注册");
            return false
        }
        srsval.unhighlight(d, b, "__success", "");
        return true
    }, cardPassword: function(e) {
        var b = e.elementId;
        var c = e.messageId;
        var a = $(b).val();
        if (a == null || a.length == 0) {
            srsval.highlight(e, a, "__empty", "请输入会员卡密码");
            return false
        }
        var d = /^\d{6}$/;
        if (!d.test(a)) {
            srsval.highlight(e, a, "__check", "请输入6位数字密码");
            return false
        }
        srsval.unhighlight(e, a, "__success", "");
        return true
    }, mobileNumber: function(d) {
        var a = d.elementId;
        var b = d.messageId;
        var e = $(a).val();
        var c = /^[1]\d{10}$/;
        if (null == e || e.length == 0) {
            srsval.highlight(d, e, "__empty", "请输入您预留的手机号");
            return false
        }
        if (!c.test(e)) {
            srsval.highlight(d, e, "__check", "请输入正确的手机号码");
            return false
        }
        srsval.unhighlight(d, e, "__success", "");
        return true
    }, customerName: function(e) {
        var b = e.elementId;
        var c = e.messageId;
        var a = $(b).val();
        var d = /(^[\u4E00-\u9FA5]{2,12}$)|(^[a-zA-Z]{2,12}$)/;
        if (a == null || a.length == 0) {
            srsval.highlight(e, a, "__empty", "请输入您的姓名");
            return false
        }
        if (!d.test(a)) {
            srsval.highlight(e, a, "__check", "您输入的姓名不符合规则");
            return false
        }
        srsval.unhighlight(e, a, "__success", "");
        return true
    }, cardNumber: function(e) {
        var a = e.elementId;
        var b = e.messageId;
        var c = $(a).val();
        var d = /^\d{12}$/;
        if (c == null || c.length == 0) {
            srsval.highlight(e, c, "__empty", "请输入您的门店会员卡号");
            return false
        }
        if (!d.test(c)) {
            srsval.highlight(e, c, "__check", "您输入的会员卡号不符合规则");
            return false
        }
        srsval.unhighlight(e, c, "__success", "");
        return true
    }};