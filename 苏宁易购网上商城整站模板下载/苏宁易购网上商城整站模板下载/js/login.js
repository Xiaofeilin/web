/*
 * 头尾基础js方法，PRFS专用版
 * Author: 12040494
 * Date: 2014-10-13   14051404
 * */

var SFE = SFE || {};

// 头尾等基础方法，依赖于 jquery
SFE.base = (function ($) {

	// 返回当前链接的类型
	var httpType = ("https:" == document.location.protocol) ? "https" : "http";

	// 超链接跳转事件
	var hrefLink = function (e) {
		if (navigator.userAgent.indexOf("Firefox") > 0) {
			window.location = e
		} else {
			var f = document.createElement("a");
			f.href = e;
			document.body.appendChild(f);
			if (/msie/i.test(navigator.userAgent.toLowerCase())) {
				f.click()
			} else {
				var d = document.createEvent("MouseEvent");
				d.initEvent("click", false, false);
				f.dispatchEvent(d)
			}
		}
	};

	// 是否IE6
	var isIE6 = function () {
		return !!window.ActiveXObject && !window.XMLHttpRequest;
	};

	// 安全连接的IE6下iframe的src
	var iframeHttpsSrc = '';
	if (httpType == "https") {
		iframeHttpsSrc = ' src="https://imgssl.suning.com/images/ShoppingArea/Common/blankbg.gif" ';
	}

	// 取 cookie 中的值
	var d = function (b) {
		var a;
		return (a = document.cookie.match(RegExp("(^| )" + b + "=([^;]*)(;|$)"))) ? decodeURIComponent(a[2]
			.replace(/\+/g, "%20"))
			: null
	};

	// 头部工具条展开
	var toolBarOpen = function () {
		$(".g-tool-link").children("dl.g-child-node").hover(function () {
			$(this).addClass("hover");
		}, function () {
			$(this).removeClass("hover");
		});
		$("body").mouseleave(function () {
			$(".g-tool-link").children("dl.g-child-node").removeClass("hover");
		});
	};

	// 手机版二维码下拉
	var appDowndloadCode = function () {
		var handle = $("#toolbar_ewm_handle"), box = $("#toolbar_ewm_box"), timer;
		if (0 == handle.size() || 0 == box.size()) {
			return false;
		}
		var showBox = function () {
			handle.addClass("app-link-plus-hover");
			var v = box.find("img[src3]");
			v.each(function () {
				$(this).attr("src", $(this).attr("src3")).removeAttr("src3")
			});
			box.show();
		};
		var hideBox = function () {
			handle.removeClass("app-link-plus-hover");
			box.hide();
		};
		handle.hover(function () {
			clearTimeout(timer);
			showBox();
		}, function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				hideBox();
			}, 200);
		});
		box.hover(function () {
			clearTimeout(timer);
			showBox();
		}, function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				hideBox();
			}, 200);
		});
	};

	// 获取当前环境是sit/pre/prd
	var getEnv = function (_hostName) {
		var ego_pre_reg = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
		var ego_sit_reg = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;

		if (ego_pre_reg.test(_hostName)) {
			return 'pre';
		} else if (ego_sit_reg.test(_hostName)) {
			return 'sit';
		}
		return 'prd';
	};

	var isRequest = false;
	//获取待评价数量
	var appraiseCount = function () {
		var _hostName = document.location.hostname;//当前域名
		var zoneDomainDir = httpType + "://";
		var box = $("#appraise_count");
		var a = d("logonStatus");
		if (0 == box.size() || a == null || a == "") {
			box.hide();
			return false;
		}
		if (isRequest) {
			return false;
		}
		switch (getEnv(_hostName)) {
			case 'pre' :
				zoneDomainDir = zoneDomainDir + 'zonepre.cnsuning.com';
				break;
			case 'sit' :
				zoneDomainDir = zoneDomainDir + 'zonesit.cnsuning.com';
				break;
			case 'prd':
				zoneDomainDir = zoneDomainDir + 'zone.suning.com';
		}
		isRequest = true;
		$.ajax({
			url: zoneDomainDir + "/review/ajax/count_pending_review_num.htm",
			dataType: "jsonp",
			cache: false,
			async: false,
			jsonpCallback: "getReviewCount",
			success: function (data) {
				var num = parseInt(data);
				if (num <= 0) {
					box.hide();
				} else if (num > 0 && num <= 99) {
					box.show().find("em").html(num);
				} else {
					box.show().find("em").html("99+");
				}
			}
		});
	};

	// 头部工具条欢迎词
	var toolBarWelcome = function () {
		var b, a = d("logonStatus");
		if (a != null && a != "") {
			var c = '<span class="g-nick">' + d("nick") + '</span>';
			var h = new Date().getHours();
			c == null && (c = "");
			a == 2 ? b = c : a == 0 ? b = c + '' : a == 1 && (b = c + '');
			b += '<span class="g-level" id="g_level_handle"></span>';
			b += '<a href="javascript:SFE.base.logoff();" title="退出" target="_top">退出</a>';
			$("#toolBarWelcome").html(b);
			$("#logReg").hide();
			/*
			 * 读取cookie中信息
			 * 
			var wc_ml = d("WC_ML");
			if(wc_ml=="L1"||wc_ml=="L2"||wc_ml=="L3"||wc_ml=="L4"){
				var level; // 0, 1, 2, 3
				var levelText;  // 普通会员 银卡会员 金卡会员 白金会员
				switch(wc_ml){
					case 'L1':
						level = 0;
						levelText = '普通会员';
						break;
					case 'L2':
						level = 1;
						levelText = '银卡会员';
						break;
					case 'L3':
						level = 2;
						levelText = '金卡会员';
						break;
					case 'L4':
						level = 3;
						levelText = '白金会员';
						break;
				}
				var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
				var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
				var _hostName = document.location.hostname;

				sn.amsDomain = "vip.suning.com";
				if (ego_pre.test(_hostName)) {
					sn.amsDomain = "vippre.cnsuning.com";
				} else if (ego_sit.test(_hostName)) {
					sn.amsDomain = "vipsit.cnsuning.com";
				}
				var levelDom = '<a id="g_level_icon" name="homepage_toubu_toolbar0201" target="_blank" href="http://'+sn.amsDomain+'/ams-web/custLevel/whatIsCustLevel.htm" class="level level-'+ level +'"></a>';
				levelDom += '<em class="level-tips" id="g_level_text">'+ levelText +'</em>';
				$("#g_level_handle").html(levelDom);
			}*/
			return true;
		}
		return false;
	};

	// 会员等级tips
	var levelTips = function () {
		$("body").delegate("#g_level_handle", "mouseover", function () {
			$("#g_level_text").show();
		});
		$("body").delegate("#g_level_handle", "mouseout", function () {
			$("#g_level_text").hide();
		});
	};
	
	//根据不同的环境获取passport的登陆路径
	var getPassportLogon = function () {
		if(sn.passportLogon==undefined||sn.passportLogon==null){
			var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
			var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
			var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
			var _hostName = document.location.hostname;
				
			sn.passportLogon = "https://passport.suning.com/ids/login";
			if (ego_pre.test(_hostName)) {
				sn.passportLogon = "https://passportpre.cnsuning.com/ids/login";
			} else if (ego_sit.test(_hostName)) {
				sn.passportLogon = "https://passportsit.cnsuning.com/ids/login";
			} else if (ego_dev.test(_hostName)) {
				sn.passportLogon = "https://passportdev.cnsuning.com/ids/login";
			}
		}
		return sn.passportLogon;
	}
	
	//根据不同的环境获取passport的退出路径
	var getPassportLogoff = function () {
		if(sn.passportLogoff==undefined||sn.passportLogoff==null){
			var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
			var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
			var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
			var _hostName = document.location.hostname;
				
			sn.passportLogoff = "https://passport.suning.com/ids/logout";  
			if (ego_pre.test(_hostName)) {
				sn.passportLogoff = "https://passportpre.cnsuning.com/ids/logout";
			} else if (ego_sit.test(_hostName)) {
				sn.passportLogoff = "https://passportsit.cnsuning.com/ids/logout";
			} else if (ego_dev.test(_hostName)) {
				sn.passportLogoff = "https://passportdev.cnsuning.com/ids/logout";
			}
		}
		return sn.passportLogoff;
	}

	// 登录跳转
	var logonurl = function () {
		if (!toolBarWelcome()) {
			var logonurl = "";
			var callURL = "";
			var targetUrl = "";
			//passport登陆域名
			var passportLogonUrl = getPassportLogon(); 
			//passport中认证auth的域名
			if (sn.sslDomain == undefined || sn.sslDomain == null) {
				var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
				var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
				var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
				var _hostName = document.location.hostname;

				sn.sslDomain = "ssl.suning.com";
				if (ego_pre.test(_hostName)) {
					sn.sslDomain = "sslpre.cnsuning.com";
				} else if (ego_sit.test(_hostName)) {
					sn.sslDomain = "sslsit.cnsuning.com";
				} else if (ego_dev.test(_hostName)) {
					sn.sslDomain = "ssldev.cnsuning.com";
				}
			}
			//连接URL带MyURL
			if (window.location.href.indexOf("&MyURL") != -1) {
				var v3 = window.location.href.substring(window.location.href
					.indexOf("&MyURL") + 7, window.location.href.length);
			    //对于如下请求，跳转回首页
				if ((v3.indexOf("LogonForm") != -1)
					|| (v3.indexOf("SNUserRegister") != -1)
					|| (v3.indexOf("SNUserRegisterView") != -1)
					|| (v3.indexOf("ForgotPasswordView") != -1)
					|| (v3.indexOf("ForgotCardPswView") != -1)
					|| (v3.indexOf("MobileActCode") != -1)
					|| (v3.indexOf("ResetPassword") != -1)
					|| (v3.indexOf("ForgotPasswordCheckMail") != -1)
					|| (v3.indexOf("ForgotPasswordSendMailView") != -1)
					|| (v3.indexOf("ChangeCardPwdWithIdCard") != -1)
					|| (v3.indexOf("SNUserRegisterNormalMobileCmd") != -1)
					|| (v3.indexOf("SNCampusMobileRegisterCmd") != -1)
					|| (v3.indexOf("SNCampusEmailRegisterCmd") != -1)
					|| (v3.indexOf("MbrCardInputView") != -1)
					|| (v3.indexOf("SNMbrCardMergeOptionView") != -1)
					|| (v3.indexOf("SNMbrCardMergeNewAccountView") != -1)
					|| (v3.indexOf("SNMbrCardMergeOtherAccountView") != -1)
					|| (v3.indexOf("SNMbrCardCheckCmd") != -1)
					|| (v3.indexOf("SNMbrCardVerifyMyInfoCmd") != -1)
					|| (v3.indexOf("SNMbrCardMergeNewAccountCmd") != -1)
					|| (v3.indexOf("SNMbrCardMergeOtherAccountCmd") != -1)
					|| (v3.indexOf("SNMbrCardMergeOtherVerifyMobileCmd") != -1)
					|| (v3.indexOf("SNMbrCardMergeOtherVerifyEmailCmd") != -1)
					|| (v3.indexOf("SNMbrCardMergeOtherVerifyNewMobileCmd") != -1)
					|| (v3.indexOf("SNMbrCardMergeCmd") != -1)
					|| (v3.indexOf("SNInterconnectInputView") != -1)
					|| (v3.indexOf("SNInterconnectMergeCheckCmd") != -1)
					|| (v3.indexOf("SNInterconnectMergeNewAccountCmd") != -1)
					|| (v3.indexOf("SNInterconnectMergeOtherAccountCmd") != -1)) {
					targetUrl= encodeURIComponent("http://" + sn.domain + sn.context + "/tcd_" + sn.storeId + "_" + sn.catalogId + "_.html");
					//targetUrl= encodeURIComponent("https://" + sn.sslDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);	
					logonurl = passportLogonUrl + "?service="
						+ encodeURIComponent("https://" + sn.sslDomain + "/webapp/wcs/stores/auth?targetUrl="
						+ targetUrl)
						+ "&method=GET&loginTheme=b2c";
				} else {
					v3 = decodeURIComponent(v3);
					targetUrl = encodeURIComponent(v3);
					//targetUrl= encodeURIComponent("https://" + sn.sslDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);	
					logonurl = passportLogonUrl + "?service="
						+ encodeURIComponent("https://" + sn.sslDomain + "/webapp/wcs/stores/auth?targetUrl="
						+ targetUrl)
						+ "&method=GET&loginTheme=b2c";
				}
			} else if (window.location.href.indexOf("&URL") != -1) {
				var v1 = window.location.href.substring(window.location.href
					.indexOf("&URL") + 5, window.location.href.length);
				if ((v1.indexOf("LogonForm") != -1)
					|| (v1.indexOf("SNUserRegister") != -1)
					|| (v1.indexOf("SNUserRegisterView") != -1)
					|| (v1.indexOf("ForgotPasswordView") != -1)
					|| (v1.indexOf("ForgotCardPswView") != -1)
					|| (v1.indexOf("MobileActCode") != -1)
					|| (v1.indexOf("ResetPassword") != -1)
					|| (v1.indexOf("ForgotPasswordCheckMail") != -1)
					|| (v1.indexOf("ForgotPasswordSendMailView") != -1)
					|| (v1.indexOf("ChangeCardPwdWithIdCard") != -1)
					|| (v1.indexOf("SNUserRegisterNormalMobileCmd") != -1)
					|| (v1.indexOf("SNCampusMobileRegisterCmd") != -1)
					|| (v1.indexOf("SNCampusEmailRegisterCmd") != -1)
					|| (v1.indexOf("MbrCardInputView") != -1)
					|| (v1.indexOf("SNMbrCardMergeOptionView") != -1)
					|| (v1.indexOf("SNMbrCardMergeNewAccountView") != -1)
					|| (v1.indexOf("SNMbrCardMergeOtherAccountView") != -1)
					|| (v1.indexOf("SNMbrCardCheckCmd") != -1)
					|| (v1.indexOf("SNMbrCardVerifyMyInfoCmd") != -1)
					|| (v1.indexOf("SNMbrCardMergeNewAccountCmd") != -1)
					|| (v1.indexOf("SNMbrCardMergeOtherAccountCmd") != -1)
					|| (v1.indexOf("SNMbrCardMergeOtherVerifyMobileCmd") != -1)
					|| (v1.indexOf("SNMbrCardMergeOtherVerifyEmailCmd") != -1)
					|| (v1.indexOf("SNMbrCardMergeOtherVerifyNewMobileCmd") != -1)
					|| (v1.indexOf("SNMbrCardMergeCmd") != -1)
					|| (v1.indexOf("SNInterconnectInputView") != -1)
					|| (v1.indexOf("SNInterconnectMergeCheckCmd") != -1)
					|| (v1.indexOf("SNInterconnectMergeNewAccountCmd") != -1)
					|| (v1.indexOf("SNInterconnectMergeOtherAccountCmd") != -1)) {
					targetUrl= encodeURIComponent("http://" + sn.domain + sn.context + "/tcd_" + sn.storeId + "_" + sn.catalogId + "_.html");
					//targetUrl= encodeURIComponent("https://" + sn.sslDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);	
					logonurl = passportLogonUrl + "?service="
						+ encodeURIComponent("https://" + sn.sslDomain + "/webapp/wcs/stores/auth?targetUrl="
						+ targetUrl)
						+ "&method=GET&loginTheme=b2c";
				} else {
					v1 = decodeURIComponent(v1);
					targetUrl = encodeURIComponent(v1);
					//targetUrl= encodeURIComponent("https://" + sn.sslDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);	
					logonurl = passportLogonUrl + "?service="
						+ encodeURIComponent("https://" + sn.sslDomain + "/webapp/wcs/stores/auth?targetUrl="
						+ targetUrl)
						+ "&method=GET&loginTheme=b2c";
				}
			} else {
				var v2 = window.location.href.substring(window.location.href
					.lastIndexOf("/") + 1, window.location.href.length);
				if ((v2.indexOf("LogonForm") != -1)
					|| (v2.indexOf("SNUserRegister") != -1)
					|| (v2.indexOf("SNUserRegisterView") != -1)
					|| (v2.indexOf("ForgotPasswordView") != -1)
					|| (v2.indexOf("ForgotCardPswView") != -1)
					|| (v2.indexOf("MobileActCode") != -1)
					|| (v2.indexOf("ResetPassword") != -1)
					|| (v2.indexOf("ForgotPasswordCheckMail") != -1)
					|| (v2.indexOf("ForgotPasswordSendMailView") != -1)
					|| (v2.indexOf("ChangeCardPwdWithIdCard") != -1)
					|| (v2.indexOf("SNUserRegisterNormalMobileCmd") != -1)
					|| (v2.indexOf("SNCampusMobileRegisterCmd") != -1)
					|| (v2.indexOf("SNCampusEmailRegisterCmd") != -1)
					|| (v2.indexOf("MbrCardInputView") != -1)
					|| (v2.indexOf("SNMbrCardMergeOptionView") != -1)
					|| (v2.indexOf("SNMbrCardMergeNewAccountView") != -1)
					|| (v2.indexOf("SNMbrCardMergeOtherAccountView") != -1)
					|| (v2.indexOf("SNMbrCardCheckCmd") != -1)
					|| (v2.indexOf("SNMbrCardVerifyMyInfoCmd") != -1)
					|| (v2.indexOf("SNMbrCardMergeNewAccountCmd") != -1)
					|| (v2.indexOf("SNMbrCardMergeOtherAccountCmd") != -1)
					|| (v2.indexOf("SNMbrCardMergeOtherVerifyMobileCmd") != -1)
					|| (v2.indexOf("SNMbrCardMergeOtherVerifyEmailCmd") != -1)
					|| (v2.indexOf("SNMbrCardMergeOtherVerifyNewMobileCmd") != -1)
					|| (v2.indexOf("SNMbrCardMergeCmd") != -1)
					|| (v2.indexOf("SNInterconnectInputView") != -1)
					|| (v2.indexOf("SNInterconnectMergeCheckCmd") != -1)
					|| (v2.indexOf("SNInterconnectMergeNewAccountCmd") != -1)
					|| (v2.indexOf("SNInterconnectMergeOtherAccountCmd") != -1)) {
					targetUrl  = encodeURIComponent("http://" + sn.domain + sn.context + "/tcd_" + sn.storeId + "_" + sn.catalogId + "_.html");
					//targetUrl= encodeURIComponent("https://" + sn.sslDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);	
					logonurl = passportLogonUrl + "?service="
						+ encodeURIComponent("https://" + sn.sslDomain + "/webapp/wcs/stores/auth?targetUrl="
						+ targetUrl)
						+ "&method=GET&loginTheme=b2c";
				} else {
					if (window.location.href.substring(
							window.location.href.lastIndexOf("/") + 1,
							window.location.href.length).indexOf(
							"CxnyProductSearch") != -1) {
						targetUrl  = encodeURIComponent(window.location.href);
						//targetUrl= encodeURIComponent("https://" + sn.sslDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);	
						logonurl = passportLogonUrl + "?service="
							+ encodeURIComponent("https://" + sn.sslDomain + "/webapp/wcs/stores/auth?targetUrl="
							+ targetUrl)
							+ "&method=GET&loginTheme=b2c";
					} else {
						if (window.location.href.substring(window.location.href
							.lastIndexOf("/") + 1, window.location.href.length) == ''
							&& window.location.href.match("(.*?suning.com.*?)") == null) {
							targetUrl = encodeURIComponent("http://" + sn.domain);
							//targetUrl= encodeURIComponent("https://" + sn.sslDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);	
							logonurl = passportLogonUrl + "?service="
								+ encodeURIComponent("https://" + sn.sslDomain + "/webapp/wcs/stores/auth?targetUrl="
								+ targetUrl)
								+ "&method=GET&loginTheme=b2c";
						} else {
							targetUrl = encodeURIComponent(window.location.href);
							//targetUrl= encodeURIComponent("https://" + sn.sslDomain + sn.context + "/SNLogonJumpCmd?storeId=" + sn.storeId + "&catalogId=" + sn.catalogId + "&callUrl="+callURL);	
							logonurl = passportLogonUrl + "?service="
								+ encodeURIComponent("https://" + sn.sslDomain + "/webapp/wcs/stores/auth?targetUrl="
								+ targetUrl)
								+ "&method=GET&loginTheme=b2c";
						}
					}
				}
			}
			hrefLink(logonurl);
		}
	};
	
	// 退出
	var logoff = function(){
		var date = new Date();
		date.setTime(date.getTime() - 10000);
		document.cookie = "logonStatus=a; expires=" + date.toGMTString();
	
		var passportLogonUrl  = getPassportLogon();
		var passportLogoffUrl = getPassportLogoff();
		var logoffurl  = passportLogoffUrl + "?service="
			+ encodeURIComponent(passportLogonUrl+"?method=GET&loginTheme=b2c");
		window.location = logoffurl;
	};

	// 注册跳转
	var registerurl = function () {
		// 注册
		var registerurl = "";
		if (window.location.href.indexOf("&URL") != -1) {
			registerurl = window.location.href.substring(window.location.href
				.indexOf("&URL") + 5, window.location.href.length);
			if ((registerurl.indexOf("LogonForm") != -1)
				|| (registerurl.indexOf("SNUserRegisterView") != -1)
				|| (registerurl.indexOf("ForgotPasswordView") != -1)
				|| (registerurl.indexOf("SNUserRegisterView") != -1)
				|| (registerurl.indexOf("ForgotPasswordCheckMail") != -1)
				|| (registerurl.indexOf("ForgotPasswordSendMailView") != -1)
				|| (registerurl.indexOf("ChangeCardPwdWithIdCard") != -1)) {
				registerurl = "https://"
					+ sn.memberDomain
					+ sn.context
					+ "/SNUserRegisterView?storeId="
					+ sn.storeId
					+ "&catalogId="
					+ sn.catalogId
					+ "&MyURL="
					+ encodeURIComponent("http://" + sn.domain + sn.context
					+ "/tcd_" + sn.storeId + "_" + sn.catalogId
					+ "_.html");
			} else {
				registerurl = "https://" + sn.memberDomain + sn.context
					+ "/SNUserRegisterView?storeId=" + sn.storeId
					+ "&catalogId=" + sn.catalogId + "&MyURL=" + registerurl;
			}
		} else if (window.location.href.indexOf("&MyURL") != -1) {
			var v1 = window.location.href.substring(window.location.href
				.indexOf("&MyURL") + 7, window.location.href.length);
			if ((v1.indexOf("LogonForm") != -1)
				|| (v1.indexOf("SNUserRegisterView") != -1)
				|| (v1.indexOf("ForgotPasswordView") != -1)
				|| (v1.indexOf("SNUserRegisterView") != -1)
				|| (v1.indexOf("ForgotPasswordCheckMail") != -1)
				|| (v1.indexOf("ForgotPasswordSendMailView") != -1)
				|| (v1.indexOf("ChangeCardPwdWithIdCard") != -1)) {
				registerurl = "https://"
					+ sn.memberDomain
					+ sn.context
					+ "/SNUserRegisterView?storeId="
					+ sn.storeId
					+ "&catalogId="
					+ sn.catalogId
					+ "&MyURL="
					+ encodeURIComponent("http://" + sn.domain + sn.context
					+ "/tcd_" + sn.storeId + "_" + sn.catalogId
					+ "_.html");
			} else {
				registerurl = "https://" + sn.memberDomain + sn.context
					+ "/SNUserRegisterView?storeId=" + sn.storeId
					+ "&catalogId=" + sn.catalogId + "&MyURL=" + v1;
			}
		} else if (window.location.href.indexOf("&krypto") != -1) {
			var v1 = window.location.href.substring(window.location.href
				.lastIndexOf("/") + 1, window.location.href.indexOf("&krypto"));
			if ((v1.indexOf("LogonForm") != -1)
				|| (v1.indexOf("SNUserRegisterView") != -1)
				|| (v1.indexOf("ForgotPasswordView") != -1)
				|| (v1.indexOf("SNUserRegisterView") != -1)
				|| (v1.indexOf("ForgotPasswordCheckMail") != -1)
				|| (v1.indexOf("ForgotPasswordSendMailView") != -1)
				|| (v1.indexOf("ChangeCardPwdWithIdCard") != -1)) {
				registerurl = "https://"
					+ sn.memberDomain
					+ sn.context
					+ "/SNUserRegisterView?storeId="
					+ sn.storeId
					+ "&catalogId="
					+ sn.catalogId
					+ "&MyURL="
					+ encodeURIComponent("http://" + sn.domain + sn.context
					+ "/tcd_" + sn.storeId + "_" + sn.catalogId
					+ "_.html");
			} else {
				registerurl = "https://"
					+ sn.memberDomain
					+ sn.context
					+ "/SNUserRegisterView?storeId="
					+ sn.storeId
					+ "&catalogId="
					+ sn.catalogId
					+ "&MyURL="
					+ encodeURIComponent(window.location.href.substring(0,
					window.location.href.indexOf("&krypto")));
			}
		} else {
			var v2 = window.location.href.substring(window.location.href
				.lastIndexOf("/") + 1, window.location.href.length);
			if ((v2.indexOf("LogonForm") != -1)
				|| (v2.indexOf("SNUserRegisterView") != -1)
				|| (v2.indexOf("ForgotPasswordView") != -1)
				|| (v2.indexOf("SNUserRegisterView") != -1)
				|| (v2.indexOf("ForgotPasswordCheckMail") != -1)
				|| (v2.indexOf("ForgotPasswordSendMailView") != -1)
				|| (v2.indexOf("ChangeCardPwdWithIdCard") != -1)) {
				registerurl = "https://"
					+ sn.memberDomain
					+ sn.context
					+ "/SNUserRegisterView?storeId="
					+ sn.storeId
					+ "&catalogId="
					+ sn.catalogId
					+ "&MyURL="
					+ encodeURIComponent("http://" + sn.domain + sn.context
					+ "/tcd_" + sn.storeId + "_" + sn.catalogId
					+ "_.html");
			} else {
				registerurl = "https://" + sn.memberDomain + sn.context
					+ "/SNUserRegisterView?storeId=" + sn.storeId
					+ "&catalogId=" + sn.catalogId + "&MyURL="
					+ encodeURIComponent(window.location.href);
			}
		}
		hrefLink(registerurl);
	};

	// 加入收藏
	var addFavorite = function () {
		var d = "http://www.suning.com/";
		var c = "苏宁易购-苏宁云商网上商城，领先的综合网上购物商城，正品行货，全国联保，货到付款，让您尽享购物乐趣！";
		if (document.all) {
			window.external.AddFavorite(d, c);
		} else if (window.sidebar) {
			window.sidebar.addPanel(c, d, "");
		} else {
			alert("对不起，您的浏览器不支持此操作!\n请您使用菜单栏或Ctrl+D收藏本站。");
		}
	};

	// 在线客服
	var onlineService = function () {
		window.open("http://" + sn.online + "/webchat/index.jsp?tabId=0", "webcallpage", "height=530,width=800,directories=no,location=no,scrollbars=yes, resizable=yes, toolbar=no, menubar=no,status=no")
	};

	// 城市专区链接
	var setCityUrl = function () {
		var city = $(".cityUrl") || "9173";
		var cityId = d("cityId") || "9173";
		if (city.length > 0) {
			var url;
			var cityArr = [];
			var cityDomain = getCityDomain();
			cityArr["9173"] = "http://nanjing" + cityDomain;
			cityArr["9017"] = "http://beijing" + cityDomain;
			cityArr["9264"] = "http://shanghai" + cityDomain;
			cityArr["9325"] = "http://chongqing" + cityDomain;
			cityArr["9041"] = "http://guangzhou" + cityDomain;
			cityArr["9281"] = "http://tianjin" + cityDomain;
			cityArr["9051"] = "http://shenzhen" + cityDomain;
			cityArr["9254"] = "http://xian" + cityDomain;
			cityArr["9315"] = "http://hangzhou" + cityDomain;
			cityArr["9197"] = "http://shenyang" + cityDomain;
			cityArr["9265"] = "http://chengdu" + cityDomain;
			cityArr["9135"] = "http://wuhan" + cityDomain;
			if (!!cityArr[cityId]) {
				url = cityArr[cityId];
			} else {
				url = cityArr["9173"];
			}
			city.live("mouseover", function () {
				$(this).attr("href", url);
				$(this).removeClass("cityUrl");
			});
		}
	};

	//替换链接中的cityId
	var setSearchCity = function (selector) {
		var city = $(selector);
		if (city != null && city.length > 0) {
			//绑定mouseover事件，替换cityId=xxx
			city.live("mouseover", function () {
				replaceCityParam(this);
			});
			//绑定onclick事件，替换{cityId}占位符，忽略大小写
			city.click(function () {
				replaceCityPlaceHolder(this);
			})
		}
	};

	//替换cityId参数cityId=xxx
	function replaceCityParam(obj) {
		var cityId = d("cityId") || "9173";
		var href = $(obj).attr("href");
		//判断是否cityId为最后一个参数，是的话不需要加&,否则要加&
		var split = href.match(/cityId=.*&/gi) == null ? "" : "&";
		//替换cityId=后面的字符串或数字，直到第一个&或结尾，忽略大小写
		$(obj).attr("href", href.replace(/cityId=.*?&|cityId=.*$/gi, "cityId=" + cityId + split));
	}

	//替换城市id占位符{cityId}
	function replaceCityPlaceHolder(obj) {
		var cityId = d("cityId") || "9173";
		url = $(obj).attr("href").replace(/{cityId}/gi, cityId).replace(/%7bcityId%7d/gi, cityId);
		$(obj).attr("href", url);
	}

	function getCityDomain() {
		var ego_pre_v7_reg = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
		var ego_sit_v7_reg = /^(\w*)(sit)([1-5].cnsuning.com)$/;

		var _hostName = document.location.hostname;
		var _cityDomain = ".suning.com";
		if (ego_pre_v7_reg.test(_hostName)) {
			_cityDomain = "pre.cnsuning.com";
		} else if (ego_sit_v7_reg.test(_hostName)) {
			_cityDomain = "sit.cnsuning.com";
		}
		return _cityDomain;
	}

    //获取搜索支撑系统url
    var  dsservice= function(){
        var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
        var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
        var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
        var _hostName = document.location.hostname;
            
        var dsservice = "http://ds.suning.cn/ds/";
        if (ego_pre.test(_hostName)) {
            dsservice = "http://dspre.cnsuning.com/ds/";
        } else if (ego_sit.test(_hostName)) {
            dsservice = "http://dssit.cnsuning.com/ds/";
        } else if (ego_dev.test(_hostName)) {
            dsservice = "http://dssit.cnsuning.com/ds/";
        }
        return dsservice;
    };
	// 搜索热门关键词及默认关键词方法
	var getSearchKeyword = function () {
		if ($("#searchKeywords").size() == 0) {
			return false;
		}

		// 电子书频道没有热搜词
		var channelName = $("#g_static_channel_name").val();
		if (channelName == "snbook") {
			// 获取默认搜索词
			var searchKeywordsHidden = $("#searchKeywordsHidden").val();  // 页面目前正在搜索的词
			if (typeof searchKeywordsHidden != "undefined" && searchKeywordsHidden != "") {
				$("#searchKeywords").val(searchKeywordsHidden);
				$('#snKeywordNew').html('<input type="hidden" id="searchDefaultKeyword" value="'+ searchKeywordsHidden +'">');
			} else {
				$.ajax({
					url: sn.searchDomain + "web/hotkeywords.jsonp",
					cache: false,
					dataType: 'jsonp',
					jsonp: 'callback',
					jsonpCallback:"HWord",
					success: function (data){
						$('#searchKeywords').val(data.hotWords);
						$('#snKeywordNew').html('<input type="hidden" id="searchDefaultKeyword" value="'+ data.hotWords +'">');
					}
				});
			}
			return false;
		}

		// 发送查询请求
		var daMain = dsservice() + "hotkeywords/";
		// 通用的获取默认搜索词接口
		$.ajax({
			url: daMain  + getCategoryId() +"--showHotkeywords" +".xjsonp" ,
			type: "get",
			dataType: "jsonp",
			jsonpCallback:"showHotkeywords",
			success: function (data) {
				try {

					// 热词
					var html = data.html.replace("{cityId}", d("cityId"));
					$("#snKeywordNew").html(html);

					// 默认搜索词
					var searchKeywordsHidden = $("#searchKeywordsHidden").val();  // 页面目前正在搜索的词
					if (typeof searchKeywordsHidden != "undefined" && searchKeywordsHidden != "") {
						$("#searchKeywords").val(searchKeywordsHidden);
					} else {
						var searchDefaultKeyword = $("#searchDefaultKeyword").val();
						$("#searchKeywords").val(searchDefaultKeyword);
					}

				} catch (e) {

				}
			}
		});
	};

	// 搜索框焦点事件
	var searchInputEvent = function () {
		if ($("#searchSubmit").size() == 0) {
			return false;
		}
		// 搜索按钮滑过
		$("#searchSubmit").hover(function () {
			$(this).addClass("search-btn-hover");
		}, function () {
			$(this).removeClass("search-btn-hover");
		});

		// 鼠标焦点事件
		var obj = $("#searchKeywords");
		obj.focus(function () {
			obj.parents(".g-search").addClass("g-search-focus");
			var value = $(this).val(),
				searchDefaultKeyword = $("#searchDefaultKeyword").val() || "";
			if (value == searchDefaultKeyword) {
				obj.val("").css({color: "#000"});
			}
		}).blur(function () {
				obj.parents(".g-search").removeClass("g-search-focus");
				var value = $.trim($(this).val()),
					searchDefaultKeyword = $("#searchDefaultKeyword").val() || "";
				if (value == "") {
					obj.val(searchDefaultKeyword).css({color: "#999"});
				}
			});
	};

	// 搜索关键词自动完成
	var searchCatalogId = false;
	var searchStoreFlag = false;
	var search_da_djc_index = -1;
	var searchAutoComplete = function () {
		if ($("#searchKeywords").size() == 0) {
			return false;
		}

		// 电子书频道没有自动完成
		var channelName = $("#g_static_channel_name").val();
		if (channelName == "snbook") {
			return false;
		}

		var isIE6 = !!window.ActiveXObject && !window.XMLHttpRequest;
		var obj = $("#searchKeywords");
		var delay = 200, timer, resultBox = $("#ac_results");
		if (resultBox.size() == 0) {
			$('<div class="g-ac-results" id="ac_results" style="display:none;"></div>').appendTo(".g-search");
			resultBox = $("#ac_results");
		}

		// 联想条目鼠标滑过及点击事件
		resultBox.delegate("li", "mouseover",function () {
			$(this).addClass("ac_over").siblings().removeClass("ac_over");
			search_da_djc_index = $(this).index() + 1;
		}).delegate("li", "click", function () {
				if ($(this).attr("categoryid") != "" && $(this).attr("categoryid") != "undefined" && $(this).attr("categoryid") != null) {
					searchCatalogId = $(this).attr("categoryid");
				} else {
					searchCatalogId = false;
				}
				if($(this).hasClass("g-ac-store")){
					searchStoreFlag = true;
				} else {
					searchStoreFlag = false;
				}
				obj.val($(this).find(".keyname").text());
				resultBox.hide();
				resultListCurrentIndex = -1;
				$("#searchSubmit").click();
			});

		// 通过键盘选择搜索词
		var resultListCurrentIndex = -1;
		var selectKeywordByKey = function (n) {
			var resultBox = $("#ac_results"),
				results = resultBox.find("li"),
				maxCount = results.size();
			if (resultBox.is("hidden") || results.size() == 0 || Math.abs(n) != 1) {
				return;
			}
			resultListCurrentIndex += n;
			if (resultListCurrentIndex < 0) {
				resultListCurrentIndex = maxCount - 1;
			}
			if (resultListCurrentIndex == maxCount) {
				resultListCurrentIndex = 0;
			}
			search_da_djc_index = resultListCurrentIndex + 1;
			var currentKeywords = results.eq(resultListCurrentIndex);
			results.removeClass("ac_over");
			currentKeywords.addClass("ac_over");
			if (currentKeywords.attr("categoryid")) {
				searchCatalogId = currentKeywords.attr("categoryid");
			} else {
				searchCatalogId = false;
			}
			if(currentKeywords.hasClass("g-ac-store")){
				searchStoreFlag = true;
			} else {
				searchStoreFlag = false;
			}
			obj.val(currentKeywords.find(".keyname").text());
			return false;
		};

		// 按键抬起，向服务端发送请求
		obj.keyup(function (event) {
			if (event.which == 13 || event.which == 38 || event.which == 40) {
				return false;
			}
			clearTimeout(timer);
			timer = setTimeout(function () {
				var keyword = $.trim($("#searchKeywords").val());
				if (keyword.length == 0) {
					resultBox.hide();
					return false;
				}

				var daMain = dsservice();
				$.ajax({
					url: daMain + "associate/" + encodeURIComponent(keyword) + "-" +getSearchCategoryId() + "-autoComplateCallback.jsonp",
					dataType: "jsonp",
					cache: true,	
					jsonpCallback:"autoComplateCallback",
					success: function (data) {
						/*
						// 无论是否有返回结果，都需要展示店铺搜索 2014-05-27
						if (data.words.length == 0) {
							resultBox.hide();
							resultListCurrentIndex = -1;
							return false;
						}
						*/
						resultBox.show();
						var resultDom = '<ul>';
						$(data.words).each(function (key, value) {
							if (typeof value.categoryName != "undefined") {
								resultDom += '<li categoryid="' + value.categoryId + '" class="cateSearch">在<b>' + value.categoryName + '</b>分类 中搜索<span style="display:none;" class="keyname">' + value.keyname + '</span></li>'
							} else {
								resultDom += '<li><span class="keyname">' + value.keyname + '</span></li>'
							}
						});

						/*
						* 增加店铺搜索 2014-05-26
						* */
						// 截取14个中文字长度后面加...
						var cutString = function(str, len) {
							if(str.length*2 <= len) {
								return str;
							}
							var strlen = 0;
							var s = "";
							for(var i = 0;i < str.length; i++) {
								s = s + str.charAt(i);
								if (str.charCodeAt(i) > 128) {
									strlen = strlen + 2;
									if(strlen >= len){
										return s.substring(0,s.length-1) + "...";
									}
								} else {
									strlen = strlen + 1;
									if(strlen >= len){
										return s.substring(0,s.length-2) + "...";
									}
								}
							}
							return s;
						}
						var keywordShow = cutString(keyword, 22);
						resultDom += '<li class="g-ac-store"><i class="icon-store"></i>找“<em>' + keywordShow + '</em>”相关<b>店铺</b><span style="display:none;" class="keyname">' + keyword + '</span></li>';

						resultDom += '</ul>';
						resultBox.html(resultDom);
						resultBox.find(".cateSearch:last").addClass("bottom");
						resultListCurrentIndex = -1;
					}
				});
			}, delay);
		}).keydown(function (event) {  // 按键按下，检测是否为上下方向键
				if (event.which == 13) { // 回车键
					resultBox.hide();
					resultListCurrentIndex = -1;
					$("#searchSubmit").click();
					return false;
				}
				if (event.which == 38) { // 上方向键
					selectKeywordByKey(-1);
				}
				if (event.which == 40) { // 下方向键
					selectKeywordByKey(1);
				}
			}).click(function () {
				return false;
			});
		$(document).click(function () {
			resultBox.hide();
			resultListCurrentIndex = -1;
		});
	};

	//判断是否搜索列表页面
	function getSearchList(){
		var _hostName = document.location.hostname;
		var ego_reg = /list(pre|sit|dev|)(.cn|.)suning.com$/;
		if(ego_reg.test(_hostName)){
			return true;
		}

		return false;
	}

	//获取默认词目录
	function getCategoryId() {
		var categoryId = "0";
		//var url = window.location.href;
		var urlForSug = window.location.href.substring(window.location.href.lastIndexOf("/"));

		if (sn.catalogId == "22001" || window.location.href.match("(.*?10052_22001.*?)")) {//图书已有热门关键字
			//图书四级页面
			if (sn.pgFlag == "22001_4") {
				categoryId = sn.searchCategoryId;
				//图书首页
			} else if (sn.pgFlag == "22001_1") {
				categoryId = "1";
				//图书二级页面
			} else if (sn.pgFlag == "22001_2") {
				categoryId = sn.searchCategoryId;
			} else {
				categoryId = "1";
			}
			if (categoryId == "undefined") {
				categoryId = "1";
			}
			//搜索图书列表页面
			if(getSearchList() || urlForSug.match("(^/trd.do)")){
				categoryId = sn.categoryId;
			}
			return categoryId;
		}

		//搜索列表页面
		if(getSearchList()){
			return sn.categoryId;
		}
		if (null != urlForSug && "" != urlForSug) {
			var urlForSugTmp = urlForSug.match("/[A-Za-z]+");
			if (null != urlForSugTmp && urlForSugTmp[0].match("(^/strd$)|(^/sprd$)|(^/prd$)|(^/ProductDisplay$)|(^/cd$)|(^/pcd$)|(^/wine$)|(^/spbf$)")) {
				if (urlForSugTmp[0].match("(^/strd$)|(^/cd$)|(^/spbf$)"))//三级、二级目录,品牌推荐页面
				{
					categoryId = sn.categoryId;
				}
				else if (urlForSugTmp[0].match("(^/wine$)"))//酒频道
				{
					categoryId = "0";
				}
				else if (urlForSugTmp[0].match("(^/pcd$)"))//2.5级页面
				{
					categoryId = "0";
				} else if (urlForSugTmp[0].match("(^/prd$)") || urlForSugTmp[0].match("(^/sprd$)"))//四级目录
				{
					categoryId = sn.categoryId;
				} else//priductdisplay形式的四级目录
				{
					categoryId = sn.categoryId;
				}
			}
			//短域名获取默认词
			else if (typeof(sn.pgFlag) != "undefined" && null != sn.pgFlag) {
				if (sn.pgFlag == "10051_2")//二级目录
				{
					categoryId = sn.categoryId;
				}
				else if (sn.pgFlag == "10051_2.5")//2.5级页面
				{
					categoryId = "0";
				} else if (sn.pgFlag == "10051_4")//四级目录
				{
					categoryId = sn.categoryId;
				}
			} else if (window.location.href.match("(.*?redbaby.*?)") != null
				|| window.location.href.match("(.*?14655.*?)") != null
				|| window.location.href.match("(.*?mysec.*?)") != null
				|| window.location.href.match("(.*?mytop.*?)") != null
				|| window.location.href.match("(.*?fashion.*?)") != null
				|| window.location.href.match("(.*?guide.*?)") != null)//红孩子母婴页面
			{
				categoryId = "2";
			} else if (window.location.href.match("(.*?binggo.*?)") != null
				|| window.location.href.match("(.*?14656.*?)") != null
				|| window.location.href.match("(.*?mztop.*?)") != null
				|| window.location.href.match("(.*?mzsec.*?)") != null)//红孩子美妆页面
			{
				categoryId = "3";
			}else if( window.location.href.match("(.*?dianqicheng.*?)")!=null )//电器城页面
		    {
			    	 categoryId ="10051";
			} else if ((null != urlForSugTmp && urlForSugTmp[0].match("(^/tcd$)")) || (urlForSug == "/"))//首页
			{
				categoryId = "0";
			} else if (null != urlForSugTmp && urlForSugTmp[0].match("(^/brandhome$)|(^/brand$)") || ( window.location.href.match("(.*?brand.*?)") != null ))//品牌旗舰店页面
			{
				categoryId = "0";
			} else {
				categoryId = "0";
			}
		}
		if (categoryId == "undefined") {
			categoryId = "0";
		}
		categoryId = getSearchChannel(categoryId);
		return categoryId;
	}

	//获取联想词目录
	function getSearchCategoryId() {
		var categoryId = "0";
		if (sn.catalogId == "22001" || window.location.href.match("(.*?10052_22001.*?)")) {
			categoryId = "1";
			return categoryId;
		}
		var urlForSug = window.location.href.substring(window.location.href.lastIndexOf("/"));
		if (null != urlForSug && "" != urlForSug) {
			var urlForSugTmp = urlForSug.match("/[A-Za-z]+");
			if (null != urlForSugTmp && urlForSugTmp[0].match("(^/strd$)|(^/sprd$)|(^/prd$)|(^/ProductDisplay$)|(^/cd$)|(^/pcd$)|(^/wine$)")) {
				if (sn.searchCatalogId == "14655") {
					categoryId = "2";
				} else if (sn.searchCatalogId == "14656") {
					categoryId = "3";
				} else {
					categoryId = "0";
				}
				//短域名获取categoryId
			} else if (typeof(sn.pgFlag) != "undefined" && null != sn.pgFlag) {
				if (sn.searchCatalogId == "14655") {
					categoryId = "2";
				} else if (sn.searchCatalogId == "14656") {
					categoryId = "3";
				} else {
					categoryId = "0";
				}
			}
			else if (window.location.href.match("(.*?redbaby.*?)") != null
				|| window.location.href.match("(.*?14655.*?)") != null
				|| window.location.href.match("(.*?mysec.*?)") != null
				|| window.location.href.match("(.*?mytop.*?)") != null
				|| window.location.href.match("(.*?fashion.*?)") != null
				|| window.location.href.match("(.*?guide.*?)") != null)//红孩子母婴页面
			{
				categoryId = "2";
			} else if (window.location.href.match("(.*?binggo.*?)") != null
				|| window.location.href.match("(.*?14656.*?)") != null
				|| window.location.href.match("(.*?mztop.*?)") != null
				|| window.location.href.match("(.*?mzsec.*?)") != null)//红孩子美妆页面
			{
				categoryId = "3";
			} else if ((null != urlForSugTmp && urlForSugTmp[0].match("(^/tcd$)")) || (urlForSug == "/"))//首页
			{
				categoryId = "0";
			} else if (null != urlForSugTmp && urlForSugTmp[0].match("(^/brandhome$)|(^/brand$)") || ( window.location.href.match("(.*?brand.*?)") != null ))//品牌旗舰店页面
			{
				categoryId = "0";
			} else {
				categoryId = "0";
			}
		}

		if (categoryId == "undefined") {
			categoryId = "0";
		}
		categoryId = getSearchChannel(categoryId);
		return categoryId;
	}

	//判断搜索频道页面
	function getSearchChannel(categoryId){
		if(categoryId == "0" && typeof param != 'undefined'){
			if(param.searchType == "10"){
				categoryId = "2";
    		}else if(param.searchType == "12"){
    			categoryId = "3";
    		}
		}
		return categoryId;
	}
	
	// 搜索提交
	var onSubmitSearch = function () {
		var obj = $('#searchKeywords');
		var tmp = $.trim(obj.val());
		if (tmp == '') {
			obj.focus();
		} else {

			// 电子书频道搜索跳转
			var channelName = $("#g_static_channel_name").val();
			if (channelName == "snbook") {
				var url = sn.searchDomain.replace("emall/", "") + 'web/search.do?keywords=' + encodeURIComponent(resolveStr(tmp));
				window.location.href = url;
				return false;
			}

			//这里的sn.searchDomain 需要换成 http://search.suning.com/  图书搜索保持原样不换
			var url = sn.searchDomain.replace("emall/", "") + encodeURIComponent(resolveStr(tmp));
			var cityId = d("cityId") || "9173";
			url += "/cityId=" + cityId;
			if (sn.searchCatalogId == "22001") {  // 图书搜索
				url = sn.searchDomain + "bookSearch.do?keyword=" + encodeURIComponent(tmp);
				url += "&cityId=" + cityId;
				if($('#bookSearchChannel').length > 0){
					url += $('#bookSearchChannel').attr("value");
				}
			}
			if (sn.searchCatalogId == "14655") {  // 母婴搜索
				url += "&ch=1";
			}
			if (sn.searchCatalogId == "14656") {  // 美妆搜索
				url += "&ch=2";
			}
			if (typeof searchCatalogId != "undefined" && searchCatalogId != "" && searchCatalogId != false ) {
				url += "&ci=" + searchCatalogId;
			}
			// 店铺搜索 2014-05-26
			if ( searchStoreFlag ) {
				url = sn.searchDomain.replace("emall/", "") + "shop/search.do?app=shopsearch&keyword=" + encodeURIComponent(tmp);
			}
            if(typeof param != 'undefined'){
            	if(param.searchType == "10"){
            		url += "&ch=1";
        		}else if(param.searchType == "12"){
        			url += "&ch=2";
        		}
            }

			/*
			* 点击统计代码 pangnate 20140901
			* */
			var RSC = $('.g-ac-store').find('em').eq(0).text();
			var LXC = tmp;
			var name = 'YT_' + LXC + '_'+ RSC + '_' + search_da_djc_index;
			var dom = $('<a href="###" name="' + name + '"></a>')[0];
			if ("undefined" != typeof sa && "undefined" != typeof sa.click) {
				sa.click.sendDatasIndex(dom);
			}

			// 搜索跳转
			window.location.href = url;
		}
		return false;
	};

	function resolveStr(str) {
		str = str.replace(/\-/g, "%2d");
		str = str.replace(/\&/g, "%26");
		str = str.replace(/\./g, "%2E");
		str = str.replace(/\+/g, "%2B");
		return str;
	}

	/*************************************** 2014-04 迷你购物车 [[ ***********************************/

	/********************************************
	 * 以下部分定义页面元素或需要使用的动态DOM元素
	 * *****************************************/
	// 加载状态标记
	var cartLoadingStatus = false;
	// 悬浮状态标记
	var cartFixedStatus = false;
	// 购物车是否展开状态
	var cartOpen = false;
	// 登录状态
	var logonStatus = d("logonStatus");
	// 迷你购物车加载中DOM
	var cartLoadingDom = '<div class="g-cart-list-default"><p class="g-cartLoading" id="loadingId">' +
		'<span class="g-cart-loading"></span>正在努力加载，请稍侯...' +
		'</p></div>';
	// 未登录状态下迷你购物车为空
	var cartEmptyDom = '<div class="g-cart-list-default"><dl class="clearfix"><dt></dt><dd><p>' +
		'您的购物车是空的<br>如您已添加过商品，' +
		'可<a name="index_minicart_1512" href="login.html">登录</a>后查看' +
		'</p></dd></dl></div>';
	// 登录状态下迷你购物车为空
	if (logonStatus) {
		cartEmptyDom = '<div class="g-cart-list-default"><dl class="clearfix"><dt></dt><dd class="g-oneline-text">您的购物车是空的，赶紧选购吧</dd></dl></div>';
	}
	// 未登录且购物车为空时悬浮DOM
	var fixedUnloginEmptyDom = '<div class="g-small-cartbtn" onclick="SFE.base.logonurl();">' +
		'<span class="g-small-cart-num">0</span>' +
		'<span class="g-small-cart-text">购物车</span>' +
		'<span class="g-small-cart-icon"></span>' +
		'<em class="g-small-line"></em></div>';

	// 刷新迷你购物车数字
	var miniCartReload = function(){
		var itemLength = d("totalProdQty") || 0;
		$("#showTotalQty").text(itemLength);
		if (itemLength != 0) {
			//invokeMiniCart();  // 性能优化直接屏蔽 2014-08-06
		}
	};

	// 如果总价超过千亿级别，则单位自动转化成万
	var priceUnitConvert = function(totalPrice) {
		if(totalPrice.length >= 15) {
			return (parseFloat(totalPrice) / 10000).toFixed(2) + "万";
		} else {
			return totalPrice;
		}
	};
	
	//sa埋点
	var saFn = function() {
		if ("undefined" != typeof sa && "undefined" != typeof sa.click) {
			sa.click.sendDatasIndex(this);
		}
	}
	// "购物车"链接已由home.js中的代码绑定了埋点事件
	$("a[name='index_minicart_1502']").bind("click", saFn); // 去结算
	$("input[name='index_minicart_1503']").bind("click", saFn); // 全选
	$("a[name='index_minicart_1506']").bind("click", saFn); // 批量删除

	// 购物车交互
	var invokeMiniCart;
	var invokeFlag = true;
	var minCartEvent = function () {

		// 迷你购物车事件代理容器
		var topDom = $("body");
		// 迷你购物车最外层容器
		var cartWrapper = $("#myCart");
		if(cartWrapper.size()==0){
			return false;
		}

		// 迷你购物车主体容器
		var cartListBox = $("#snCartListWrapper");
		// 迷你购物车内列表容器
		var cartListInner = $("#snCartList");
		// 迷你购物车数字容器
		var cartNumBox = $("#showTotalQty");
		// 购物车默认商品数量
		var oldNum = 0;
		// 悬浮时的外围容器
		var snCartFixed = $("#snCartFixed");
		// 悬浮时的外围容器
		var cartTitle = $(".g-cart-title");
		// 悬浮时的外围容器
		var cartBottom = $(".g-cart-bottom");
		// 删除确认框
		var g_cart_del_confirm = $("#g_cart_del_confirm");
        //获取域名
		var cartDomain = "cart.suning.com";
		var _hostName = document.location.hostname;//当前域名
		switch (getEnv(_hostName)) {
			case 'pre' :
				cartDomain = 'cartpre.cnsuning.com';
				break;
			case 'sit' :
				cartDomain =  'cartsit.cnsuning.com';
				break;
			case 'prd':
				cartDomain = 'cart.suning.com';
		}
		// 查询购物车内容
		invokeMiniCart = function (openCart) {

			if( !invokeFlag ){
				return false;
			}

			var flag = typeof openCart == "undefined" ? false : true;

			var quantity = d("totalProdQty") || 0;
			// 悬浮状态切数量未发生改变，拉开动作
			if ( cartFixedStatus == true && flag == true && $("#snCartFixed").find(".g-cart-table").size() != 0 && quantity == oldNum) {
				// 显示相应元素并调整高度
				$("#J_cart_slide_arr").hide();
				if( quantity==0 ){
					cartTitle.hide();
				} else {
					cartTitle.show();
				}
				$(".g-cart-bottom").show();
				cartListInner.show();
				var wrapper = $(".g-cart-slide-wrapper");
				var targetHeight = $("#snCartList").height();
				oldNum != 0 ? targetHeight += 30 : null;
				wrapper.stop().animate({height: targetHeight, opacity:1});
				return false;
			}

			try{
				$("#J_cart_slide_arr").hide();
				if(flag){
					if (cartFixedStatus == true) {
						$(".g-cart-slide-wrapper").stop().animate({height:92});
					} else {
						cartBottom.hide();
					}
					cartListInner.show().html(cartLoadingDom);
					cartTitle.hide();
					if( cartFixedStatus == false ){
						cartBottom.hide();
					} else {
						cartBottom.show();
					}

				}
				var url = httpType + "://" + cartDomain + sn.context + "/MiniCartSearchView?catalogId=" + sn.catalogId + "&storeId=" + sn.storeId;
				$.ajax({
					type: "get",
					dataType: "jsonp",
					url: url,
					success: function (data) {
						cartOpen = openCart;
						cartLoadingStatus = true;
						$("#J_cart_slide_arr").hide();

						// 如果存在选中的商品，则显示批量删除按钮
						if ( typeof data.selectedNumber != "undefined" && data.selectedNumber > 0) {
							$(".g-cart-del-batch").show();
						} else {
							$(".g-cart-del-batch").hide();
						}

						if (data.totalNumber == 0) {
							cartTitle.hide();
							if(flag){
								cartListInner.show().html(cartEmptyDom);
								if( cartFixedStatus == false ){
									cartBottom.hide();
								} else {
									cartBottom.show();
								}

								// 展示总数、已选数量、价格
								$(".J_cart_total_num").text(0);
								$(".J_cart_selected_num").text(0);
								$(".J_cart_selected_money").text("0.00");
							}
						} else {
							if (isIE6()) {
								data.html = '<iframe class="cartMask"' + iframeHttpsSrc + '></iframe>' + data.html;
							}
							if(flag){
								cartListInner.show().html(data.html);
								cartTitle.show();
								if( cartFixedStatus == false ){
									cartBottom.show();
								}
							} else if( cartFixedStatus == true ) {
								// 将顶部的DOM移动至底部
								var targetDom = $("#snCartFixed");
								var fromDom = $("#snCartListWrapper");
								//targetDom.css({opacity:0});
								fromDom.children().appendTo(targetDom);
								fromDom.empty();
								$(".g-cart-slide-wrapper").css({height:0});
								cartBottom.show();

								// 隐藏按钮
								if( !cartFixedStatus ){
									$(".g-small-cartbtn").hide();
								}
								$(".g-cart-list").show();

								targetDom.stop().animate({opacity:1});
							}

							// 缓存现有数量
							if(flag){
								oldNum = d("totalProdQty") || 0;
							}

							// 展示总数、已选数量、价格
							$(".J_cart_total_num").text(data.totalNumber);
							$(".J_cart_selected_num").text(data.selectedNumber);
							//$(".J_cart_selected_money").text(priceUnitConvert(data.amount));
							
							// 如果选中的数量大于0，则异步请求应付总金额（包含运费）
							if(data.selectedNumber > 0) {
								$.ajax(
								{
									url : httpType + "://" + cartDomain + sn.context + "/SNCartOperationCmd",
									data : 'method=calculateFreight&freightRequestJson=' + data.freightRequestJson,
									dataType: "jsonp",
									success : function (data) {
										// 商品应付总金额（自营 + C店），包含运费
										$(".J_cart_selected_money").text(priceUnitConvert(data.totalPay));
									}
								});
							}

							if(data.totalNumber == data.selectedNumber) {
								$("#J_cart_checked_all").attr("checked", true);
							} else {
								$("#J_cart_checked_all").attr("checked", false);
							}
						}

						// 悬浮状态时显示相应元素并调整高度
						if (cartFixedStatus == true && flag == true) {
							var wrapper = $(".g-cart-slide-wrapper");
							var targetHeight = $("#snCartList").height();
							data.totalNumber != 0 ? targetHeight += 30 : null;
							wrapper.stop().animate({height: targetHeight, opacity:1});
						}
						if(flag == true){
							if( data.totalNumber==0 ){
								cartTitle.hide();
							} else {
								cartTitle.show();
							}
							$(".g-cart-bottom").show();
						}
					},
					error: function () {
						cartOpen = true;
						cartLoadingStatus = true;
						cartListInner.html(cartEmptyDom);
						cartTitle.hide();
						cartBottom.show();
					},
					complete : function(){
						invokeFlag = true;
						
						//ga监控
					    //$("a[name^=index_minicart_],input[name^=index_minicart_]").unbind("click", saFn).bind("click", saFn);
						$(".g-cart-list-bg") .find("a[name^=index_minicart_],input[name^=index_minicart_]").unbind("click", saFn).bind("click", saFn);
					}
				});
			}catch(e){};

			invokeFlag = false;
		};

		// 初始化数字
		miniCartReload();

		// 鼠标悬浮于头部迷你购物车标签
		var timer;
		var cartWrapper = $("#myCart");
		cartWrapper.mouseenter(function () {
			clearTimeout(timer);
			timer = setTimeout(function () {
				/*if(cartLoadingStatus == true){
					return false;
				}*/

				// 移动DOM到顶部
				var bottomDom = $("#snCartFixed").find(".g-cart-list");
				cartListInner.show();
				if( bottomDom.size() != 0 ){
					var targetDom = $("#snCartListWrapper");
					bottomDom.appendTo(targetDom);
					//cartListInner.show();
				}

				var quantity = d("totalProdQty") || 0;
				
				if (quantity != oldNum) {
					oldNum = quantity;
					cartNumBox.text(quantity);
					cartListInner.html(cartLoadingDom).attr("rel", "cartLoadingDom");
					cartTitle.hide();
					cartBottom.hide();
					invokeMiniCart(true);
				} else {
					if (quantity == 0) {
						//如果购物车数量为0但是迷你购物车没有请求过迷你购物车，需要重新请求一次
						if (cartListInner.attr("rel") == undefined ||(cartListInner.attr("rel")=="" && $(".g-cart-table").size() == 0)){
							invokeMiniCart(true);
						} else {
							oldNum = 0;
							if(cartListInner.attr("rel")=="cartEmptyDom"){
								return false;
							}
							cartListInner.html(cartEmptyDom).attr("rel", "cartEmptyDom");
							cartTitle.hide();
							cartBottom.hide();
							$(".J_cart_total_num").text(0);
							$(".J_cart_selected_num").text(0);
							$(".J_cart_selected_money").text("0.00");
						}
					} else if( $(".g-cart-table").size() == 0 ) {
						invokeMiniCart(true);
					}
					
				}
				$(".g-cart-list").show();
				$(".g-small-cartbtn").hide();
				cartWrapper.addClass("g-min-cart-hover");
				$(".g-cart-slide-wrapper").height("auto");
				cartListBox.show();
				if(quantity==0){
					cartBottom.hide();
				} else if( invokeFlag ) {
					cartTitle.show();
					cartBottom.show();
				}
				cartOpen = true;
				cartLoadingStatus = true;
			}, 200);
		}).mouseleave(function () {
				clearTimeout(timer);
				timer = setTimeout(function () {
					cartWrapper.removeClass("g-min-cart-hover");
					if(cartFixedStatus==false){
						cartListBox.hide();
					}
					hideConfirm();
					cartOpen = false;
					cartLoadingStatus = false;
					cartFixedStatus = false;
					cartListInner.attr("rel", "");
				}, 200);
			});

		// 绑定鼠标悬浮或离开列表区域
		topDom.delegate(".J_mincart_mouseover", "mouseover",function () {
			var hasEnd = $(this).hasClass("g-cart-sale-end");  // 是否已经结束
			var numShow = $(this).find(".g-cart-cout-text");  // 纯数字
			var numChange = $(this).find(".g-cart-cout");  // 微调控件
			var closeBtn = $(this).find(".g-cart-del-handle"); // 删除按钮
			if(!$(this).hasClass("g-cart-sale-end") && !$(this).hasClass("g-cart-packege-sale-end") && !$(this).hasClass("J_mincart_plus_disabled")){
				numShow.hide();
				numChange.show();
			}
			closeBtn.css({visibility: "visible"});
		}).delegate(".J_mincart_mouseover", "mouseleave", function () {
				var numShow = $(this).find(".g-cart-cout-text");  // 纯数字
				var numChange = $(this).find(".g-cart-cout");  // 微调控件
				var closeBtn = $(this).find(".g-cart-del-handle").not(".has-click"); // 删除按钮

				numShow.show();
				numChange.hide();
				closeBtn.css({visibility: "hidden"});
				numChange.blur();
			});

		// 数量增减
		var limit = {start: 1, end: 99};
		topDom.delegate(".g-cart-cout-btnl", "click",function () {  // 左按钮
			var numInput = $(this).siblings(".g-cart-cout-input");
			var numShow = $(this).parent().siblings(".g-cart-cout-text");  // 纯数字
			var leftBtn = $(this), rightBtn = $(this).siblings(".g-cart-cout-btnr");
			var targetNum = parseInt(numInput.val()) - 1;
			if (targetNum >= limit.start) {
				numInput.val(targetNum);
				numShow.text(targetNum);
				updateQuantity($(this));
			}
			changeBtnStatus(leftBtn, rightBtn, targetNum);
		}).delegate(".g-cart-cout-btnr", "click",function () {  // 右按钮
				var numInput = $(this).siblings(".g-cart-cout-input");
				var numShow = $(this).parent().siblings(".g-cart-cout-text");  // 纯数字
				var rightBtn = $(this), leftBtn = $(this).siblings(".g-cart-cout-btnl");
				var targetNum = parseInt(numInput.val()) + 1;
				if (targetNum <= limit.end) {
					numInput.val(targetNum);
					numShow.text(targetNum);
					updateQuantity($(this));
				}
				changeBtnStatus(leftBtn, rightBtn, targetNum);
			}).delegate(".g-cart-cout-input", "keyup",function (event) {
				var temp = $(this).val();
				if (event.which == 8 && temp == "") {
					return false;
				} else if (event.which == 13 || event.which == 38 || event.which == 37 || event.which == 39 || event.which == 40) {
					return false;
				} else {
					keybordOrMouseEvent($(this));
				}
			}).delegate(".g-cart-cout-input", "mouseup",function () {
				keybordOrMouseEvent($(this));
			}).delegate(".g-cart-cout-input", "blur", function () {
				keybordOrMouseEvent($(this));
				updateQuantity($(this));
			});

		// 键盘或鼠标更改数量
		function keybordOrMouseEvent(obj) {
			var targetNum = $(obj).val().replace(/\D/g, '');
			if (targetNum < limit.start) {
				targetNum = limit.start;
			} else if (targetNum > limit.end) {
				targetNum = limit.end;
			}
			var rightBtn = $(obj).siblings(".g-cart-cout-btnr");
			var leftBtn = $(obj).siblings(".g-cart-cout-btnl");
			var numShow = $(obj).parent().siblings(".g-cart-cout-text");

			$(obj).val(targetNum);
			numShow.text(targetNum);
			changeBtnStatus(leftBtn, rightBtn, targetNum);
		}

		// 改变加减按钮状态
		function changeBtnStatus(leftBtn, rightBtn, targetNum) {
			if (targetNum < limit.end) {
				rightBtn.removeClass("g-cart-cout-btnr-disabled");
			} else {
				rightBtn.addClass("g-cart-cout-btnr-disabled");
			}
			if (targetNum <= limit.start) {
				leftBtn.addClass("g-cart-cout-btnl-disabled");
			} else {
				leftBtn.removeClass("g-cart-cout-btnl-disabled");
			}
		}

		// 加减数量事件
		function updateQuantity(obj) {
			var td = $(obj).parents(".J_mincart_mouseover");
			// 如果是配件套餐，itemId是以逗号分隔的，如果传到后台，匹配不到对应的itemId，不会进行库存校验，即便校验了，迷你购物车也没有报错位
			var itemId = td.find(".g-cart-del-handle").attr("exdata");
			var all = topDom.find(".J_mincart_mouseover").not(".g-cart-sale-end");
			var quantityStr = "";
			$.each(all, function(i, n) {
				var id = $(n).find(".g-cart-del-handle").attr("exdata");
				var idArr = id.split(",");
				var quantity = $(n).find(".g-cart-cout-input").val();
				if(idArr.length > 1) {
					for(var j = 0; j < idArr.length; j++) {
						quantityStr += idArr[j] + "=" + quantity;
						if(idArr.length != (j + 1)) {
							quantityStr += ";;";
						}
					}
				} else {
					quantityStr += id + "=" + quantity;
				}
				if(all.length != (i + 1)) {
					quantityStr += ";;";
				}
			});
			var params = "method=updateQuantity&prodQuantity=" + quantityStr + "&itemId="+itemId;
			$.ajax({
				type: "get",
				dataType: "jsonp",
				url : httpType + "://" + cartDomain + sn.context + "/SNCartOperationCmd",
				data : params,
				success : function (m) {
					//如果修改数量返回不存在修改的行，需要刷新迷你购物车
					if (m.result == "failFindItemNotExist"){
						invokeMiniCart(true);
					}else {
						//if (m.result == "success") { // 此处去除是否成功的判断，不管成功失败，都不影响修改数量
						// 更新商品总件数
						$(".J_cart_total_num").text(m.totalQty);
	        			// 更新已勾选商品总数
	        			$(".J_cart_selected_num").text(m.totalProductQty);
	        			// 更新已勾选的商品总价（勾选商品的总价 + 阳光包总价（隐藏） + 运费 - 优惠）
	        			if (m.totalPrice == "") m.totalPrice = "0";
	        			if (m.totalDiscount == "") m.totalDiscount = "0";
	        			if (m.totalShipCharge == "") m.totalShipCharge = "0";
	        			var realTotalPrice = parseFloat(m.totalPrice) + parseFloat(m.totalShipCharge) - parseFloat(m.totalDiscount);
	        			$(".J_cart_selected_money").text(priceUnitConvert(realTotalPrice.toFixed(2)));
					//}
					}
				}
			});
		}
		
		function doSelectItem(itemIds, status) {
			$.ajax({
				type: "get",
				dataType: "jsonp",
				url: httpType + "://" + cartDomain + sn.context + "/SNCartOperationCmd?method=doSelectForItem&itemIds=" + itemIds + "&itemStatus=" + status + "&ts=" + new Date().getTime(),
				success: function (m) {
					if (m.result == "success") {
						// 更新已勾选商品总数
						$(".J_cart_selected_num").text(m.totalProductQty);
						// 更新已勾选的商品总价（勾选商品的总价 + 阳光包总价（隐藏） + 运费 - 优惠）
						if (m.totalPrice == "") m.totalPrice = "0";
						if (m.totalDiscount == "") m.totalDiscount = "0";
						if (m.totalShipCharge == "") m.totalShipCharge = "0";
						var realTotalPrice = parseFloat(m.totalPrice) + parseFloat(m.totalShipCharge) - parseFloat(m.totalDiscount);
						$(".J_cart_selected_money").text(priceUnitConvert(realTotalPrice.toFixed(2)));
					} else if (m.result == "failFindItemNotExist"){
						//如果返回勾选的行项目不存在了，则刷新迷你购物车
						invokeMiniCart(true);
					}
				}
			});
		}

		// 全选
		topDom.delegate("#J_cart_checked_all", "click", function () {
			var isChecked = $(this).is(":checked");
			var boxListDom = $(".g-cart-table").find(":checkbox").not(":disabled");
			if (isChecked == true) {
				boxListDom.attr("checked", true);
				$(".g-cart-del-batch").show();
			} else {
				boxListDom.attr("checked", false);
				$(".g-cart-del-batch").hide();
			}
			var itemIds = "";
			var status = "";
			$.each(boxListDom, function(i, n) {
				var td = $(n).parents(".J_mincart_mouseover");
				
				var id = td.find(".g-cart-del-handle").attr("exdata");
				var idArr = id.split(",");
				// 配件套餐传的是以逗号分隔的多个itemId，勾选时只需传主商品的itemId
				if(idArr.length > 1) {
					id = idArr[0];
				}
				itemIds += id + ",";
				if(isChecked) {
					status += "1" + ",";
				} else {
					status += "0" + ",";
				}
			});
			doSelectItem(itemIds, status);
		});

		// 行项目选中
		topDom.delegate(".g-cart-table :checkbox", "click", function () {
			if ($(this).not(":checked")) {
				$("#J_cart_checked_all").attr("checked", false);
			}
			var boxListDom = $(".g-cart-table").find(":checkbox").not(":disabled");
			var allChecked = true;
			var allNotChecked = true;
			boxListDom.each(function(){
				if ($(this).is(":checked")) {
					allNotChecked = false;
				} else {
					allChecked = false;
				}
			});
			if(allChecked==true){  // 全部勾选
				$("#J_cart_checked_all").attr("checked", true);
				$(".g-cart-del-batch").show();
			}
			if (allNotChecked) {  // 全部未勾选
				$(".g-cart-del-batch").hide();
			} else {
				$(".g-cart-del-batch").show();
			}

			var itemIds = "";
			var status = "";
			$.each(boxListDom, function(i, n) {
				var td = $(n).parents(".J_mincart_mouseover");
				var id = td.find(".g-cart-del-handle").attr("exdata");
				var idArr = id.split(",");
				// 配件套餐传的是以逗号分隔的多个itemId，勾选时只需传主商品的itemId
				if(idArr.length > 1) {
					id = idArr[0];
				}
				itemIds += id + ",";
				status += ($(n).attr("checked") ? "1" : "0") + ","
			});
			doSelectItem(itemIds, status);
		});

		// 删除确认
		var delFlag = null;
		topDom.delegate(".g-cart-del-handle", "click", function () {

			// 点击时保存变量用于删除DOM操作
			if ($(this).hasClass("g-cart-del-batch")) {
				delFlag = 'batch';
			} else {
				delFlag = $(this).parent();
			}

			$(this).addClass("has-click");
			var confirmBox = {width: 148, height: 68};
			var confirmDialog = $("#g_cart_del_confirm");
			confirmDialog.show();
			// 定位
			var cartOffset = $(".g-cart-slide-wrapper").offset();
			var offset = $(this).offset();
			var pLeft = offset.left - cartOffset.left, pTop = offset.top - cartOffset.top;
			var oWidth = $(this).width(), oHeight = $(this).height();
			if (!$(this).hasClass("g-cart-del-batch")) {
				oHeight += 6;
			}
			var pos = {left: 0, top: 0};
			pos.left = pLeft + oWidth / 2 - confirmBox.width + 24;
			pos.top = pTop + oHeight;
			confirmDialog.css(pos);

		});
		topDom.delegate(".g-cart-del-ok", "click", function () {

			// 进行DOM删除判断
			if( delFlag == null ){ // 无任何操作

			} else if( delFlag == "batch" ){ // 批量删除
				var checkList = $(".g-cart-table").find("input[type='checkbox']:checked");
				var itemIds = "";
				$.each(checkList, function(i, n) {
					var td = $(n).parents(".J_mincart_mouseover");
					var itemId = td.find(".g-cart-del-handle").attr("exdata");
					// 配件套餐传的是以逗号分隔的多个itemId，删除时只需传主商品的itemId
					var itemIdArr = itemId.split(",");
					if(itemIdArr.length > 1) {
						itemId = itemIdArr[0];
					}
					itemIds += itemId + ",";
				});
				$.ajax({
					type: "get",
					dataType: "jsonp",
					url: httpType + "://" + cartDomain + sn.context + "/SNCartOperationCmd?method=batchDeleteItem&itemIds=" + itemIds + "&ts=" + new Date().getTime(),
					success: function (data) {
						checkList.each(function(){
							var td = $(this).parents(".J_mincart_mouseover");
							td.animate({opacity:0}, function(){
								td.remove();
								checkCartLength();
							});
						});
						delFlag = null;
					}
				});
			} else {  // 单个删除
				var td = $(delFlag).parents(".J_mincart_mouseover");
				var itemId = td.find(".g-cart-del-handle").attr("exdata");
				// 配件套餐传的是以逗号分隔的多个itemId，删除时只需传主商品的itemId
				var itemIdArr = itemId.split(",");
				if(itemIdArr.length > 1) {
					itemId = itemIdArr[0];
				}
				$.ajax({
					type: "get",
					dataType: "jsonp",
					url: httpType + "://" + cartDomain + sn.context + "/SNCartOperationCmd?method=deleteItem&itemId=" + itemId + "&ts=" + new Date().getTime(),
					success: function (data) {
						td.animate({opacity:0}, function(){
							td.remove();
							checkCartLength();
						});
						delFlag = null;
					}
				});
			}

			// 检查购物车商品数量，为0时修改购物车状态
			var checkCartLength = function(){
				var quantity = d("totalProdQty") || 0;
				$(".g-cart-slide-wrapper").css({height:"auto"});
				if( quantity==0 ){
					setTimeout(function(){
						cartListInner.html(cartEmptyDom);
						cartTitle.hide();
						if( cartFixedStatus == false ){
							cartBottom.hide();
						} else {
							cartBottom.show();
							if(!logonStatus && cartFixedStatus == true){
								var checkBtnLength = $("#snCartFixed").find(".g-small-cartbtn").size();
								if(checkBtnLength==0){
									$("#snCartFixed").append(fixedUnloginEmptyDom);
								}
								var bottomDom = $("#snCartFixed").find(".g-cart-list");
								bottomDom.hide();
							}
						}
						// 展示总数
						$(".J_cart_total_num").text(0);
						$(".J_cart_selected_num").text(0);
						$(".J_cart_selected_money").text("0.00");
					}, 10);
				} else if( cartFixedStatus == true ) {
					invokeMiniCart(true);
				}
			};

			hideConfirm();
		});
		topDom.delegate(".g-cart-del-cancl", "click", function () {
			hideConfirm();
		});

		// 隐藏确认框
		var hideConfirm = function () {
			$("#g_cart_del_confirm").remove();
			g_cart_del_confirm.hide();
			$(".g-cart-list").append(g_cart_del_confirm);
			$("#snCartList").find(".g-cart-del-handle").not(".g-cart-del-batch").removeClass("has-click").css({visibility: "hidden"});
			delFlag = null;
		};

		// 内容滚动时需要隐藏确认框
		$(".g-cart-list-bg").scroll(function () {
			hideConfirm();
		});

		// 垂直方向收起悬浮购物车
		var minCartSlideDown = function () {
			hideConfirm();
			var wrapper = $(".g-cart-slide-wrapper");
			wrapper.stop().animate({height: 0}, function () {
				$("#J_cart_slide_arr").hide();
				cartOpen = false;
				cartLoadingStatus = false;
			});
		};

		// 垂直方向展开悬浮购物车
		var minCartSlideUp = function () {
			setTimeout(function () {
				if ($("body").data("clickMinCartBottom") == true) {
					return false;
				} else {
					invokeMiniCart(true);
					cartOpen = true;
				}
			}, 30);
		};

		var ArrTimer = null;

		// 显示小箭头
		var minCartShowArr = function () {
			var wrapper = $(".g-cart-slide-wrapper");
			$("#snCartList").hide();
			$(".g-cart-title").hide();
			$("#snCartList").hide();
			wrapper.stop().animate({height: 8}, function () {
				$("#J_cart_slide_arr").fadeIn(function(){
					setTimeout(function(){
						/*$("#snCartList").show();
						$(".g-cart-title").show();*/
						$("#snCartList").show();
					}, 400);  // 600
				});
			});
		};

		// 隐藏小箭头
		var minCartHideArr = function () {
			ArrTimer = setTimeout(function () {
				$("#J_cart_slide_arr").hide();
				$(".g-cart-title").hide();
				$("#snCartList").hide();
				var wrapper = $(".g-cart-slide-wrapper");
				wrapper.stop().animate({height: 0}, function () {
					$("#J_cart_slide_arr").hide();
				});
			}, 200);
		};

		// 开始悬浮
		var minCartFixed = function () {

			cartOpen = false;
			cartLoadingStatus = false;
			cartFixedStatus = true;

			// 为空且未登录
			var quantity = d("totalProdQty") || 0;
			if( !logonStatus && quantity==0 && cartFixedStatus == true ){
				snCartFixed.html(fixedUnloginEmptyDom).stop().animate({opacity:1});
			} else {
				var targetDom = $("#snCartFixed");
				var fromDom = $("#snCartListWrapper");
				targetDom.css({opacity:0});
				fromDom.children().appendTo(targetDom);
				fromDom.empty();
				$(".g-cart-slide-wrapper").css({height:0});
				cartBottom.show();
				targetDom.stop().animate({opacity:1});
			}
		};

		// 结束悬浮
		var minCartStatic = function(){
			cartOpen = false;
			cartLoadingStatus = false;
			cartFixedStatus = false;

			var quantity = d("totalProdQty") || 0;
			if( !logonStatus && quantity==0 ){
				$("#snCartFixed").stop().animate({opacity:0}, function(){
					var targetDom = $("#snCartListWrapper");
					var fromDom = $("#snCartFixed");
					fromDom.children().appendTo(targetDom);
					fromDom.empty();
					$(".g-small-cartbtn").remove();  // 移除登录按钮
				});
			} else {
				$("#snCartFixed").stop().animate({opacity:0}, function(){
					var targetDom = $("#snCartListWrapper");
					var fromDom = $("#snCartFixed");
					fromDom.children().appendTo(targetDom);
					fromDom.empty();
					$(".g-cart-slide-wrapper").css({height:"auto"});
				});
			}
		};

		// 拉开购物车
		$("body").delegate("#J_cart_slide_arr", "click", function (event) {
			$("body").data("clickMinCartBottom", false);
			minCartSlideUp();
			event.stopPropagation();
		});

		// 收起购物车
		$(document).click(function () {
			if (cartFixedStatus == true && cartOpen == true) {
				minCartSlideDown();
			}
		});

		// 悬停显示小箭头
		$("body").delegate(".g-cart-bottom, .g-cart-list", "mouseover",function () {
			if (cartFixedStatus != true) {
				return false;
			}
			var wrapper = $(".g-cart-slide-wrapper");
			if (wrapper.height() == 0) {
				clearTimeout(ArrTimer);
				ArrTimer = setTimeout(function(){
					minCartShowArr();
				}, 200);
			}
		}).delegate("#snCartFixed", "mouseleave",function () {
				if (cartOpen == true) {
					return false;
				}
				clearTimeout(ArrTimer);
				ArrTimer = setTimeout(function(){
					minCartHideArr();
				}, 200);
			}).delegate("#snCartFixed, #snCartListWrapper", "click",function (event) {
				event.stopPropagation();
			}).delegate(".g-cart-bottom-num", "click", function(event){
				var wrapper = $(".g-cart-slide-wrapper");
				if( cartFixedStatus == true ){
					if( cartOpen == true ){
						minCartSlideDown();
						return false;
					}
					// 点击底部黄色区域标识设为true
					$("body").data("clickMinCartBottom", false);
					minCartSlideUp();
					event.stopPropagation();
				}
			}).delegate(".g-cart-list-bg", "mousewheel", function (event) {
				//return false;
			});


		// 根据屏幕滚动情况开启或关闭迷你购物车悬浮
		var scrollTimer = null;
		var windowHeight = $(window).height();
		var changePositionStatus = function(){
			clearTimeout(scrollTimer);
			scrollTimer = setTimeout(function () {
                var minCartBottom = $("#myCart").offset().top + 35;
				var scrollTop = $(document).scrollTop();
				if (scrollTop > minCartBottom && cartFixedStatus == false) {  // 关闭可能已经打开的迷你购物车
					cartWrapper.removeClass("g-min-cart-hover");
					cartListBox.hide();
					hideConfirm();
					cartOpen = false;
					cartLoadingStatus = false;
				}
				if (scrollTop > minCartBottom) { // 开
					if( cartFixedStatus == false ){
						minCartFixed();
					}

					// IE6开始悬浮
					if(isIE6()){
						snCartFixed.css({
							bottom: "auto",
							position: "absolute",
							opacity: 1
						});
						var boxHeight = $(".g-min-cart-fixed").height() + 10;
						var _winHeight = $(window).height();  //可视区域高度
						var _newTop = scrollTop + _winHeight - boxHeight ;  // 悬浮购物车的top值
						snCartFixed.stop().animate({top: _newTop});
					}

				} else {  // 关闭
					if( cartFixedStatus == true ){
						minCartStatic();
					}
				}
			}, 10);
		};

		// 性能优化直接屏蔽 2014-08-06
		/*$(window).scroll(function(){
			changePositionStatus();
		}).resize(function(){
			changePositionStatus();
		});*/

		// 未登录小耳朵交互
		$("body").delegate(".g-small-cartbtn", "mouseover", function(){
			var _btn = $(this);
			var _text = _btn.find(".g-small-cart-text");
			if(_btn.hasClass("J_cartbtn_width")){
				return false;
			}
			_btn.stop().animate({width:168}, 200, function(){
				_btn.addClass("J_cartbtn_width");
				_text.html('登&nbsp;&nbsp;&nbsp;&nbsp;录');
			});
		}).delegate(".g-small-cartbtn", "mouseleave", function(){
				var _btn = $(this);
				var _text = _btn.find(".g-small-cart-text");
				if(!_btn.hasClass("J_cartbtn_width")){
					return false;
				}
				_btn.stop().animate({width:144}, 200, function(){
					_btn.removeClass("J_cartbtn_width");
					_text.html('购物车');
				});
			});

	};

	/*************************************** 2014-04 迷你购物车 ]] ***********************************/

	// 全部分类展开
	var next = false;
	var firstMoveIn = true;
	var trail = function () {
		var dataReady = false;
		var category = $('#category');
		var subCategory = $('#subCategory');
		var subCategoryMask = $('#subCategoryMask');
		var hook = $(".all-hook");
		var icon = $("#allSort_drop_icon");
		var isHome = category.is(":visible");
		var showSubMenu = function (index) {
			var target = "";
			if (isHome) {
				target = ' target="_blank" ';
			}
			if (dataReady && typeof publicCategoryOpenData != "undefined" && typeof publicCategoryOpenData[index] != "undefined") {
				// 拼接数据为html片段
				var cityId = d("cityId") || "9173";
				var data = publicCategoryOpenData[index];
				var html = "";
				if (isIE6()) {
					html += '<iframe class="category-open-mask"' + iframeHttpsSrc + '></iframe>';
				}
				html += '<div class="sub-category">';
				if (typeof data.sub != "undefined") {
					for (var i = 0; i < data.sub.length; i++) {
						var subData = data.sub[i];
						var split = subData.t[1].match(/cityId=.*&/gi) == null ? "" : "&";
						html += i == 0 ? '<dl class="sc01">' : '<dl>';
						if (subData.t[1] != "") {
							var thisLinkRedDom = subData.t[3] == "orange" ? ' class="g-hot-link" ' : "";
							html += '<dt><a ' + thisLinkRedDom + ' onclick="SFE.base.replaceCityPlaceHolder(this);" ' + target + '  href="' + subData.t[1].replace(/cityId=.*?&|cityId=.*$/gi, "cityId=" + cityId + split) + '" name="' + subData.t[2] + '" id="' + subData.t[3] + '">' + subData.t[0] + '</a></dt>';
						} else {
							html += '<dt>' + subData.t[0] + '</dt>';
						}
						html += '<dd>';
						for (var j = 0; j < subData.s.length; j++) {
							var aData = subData.s[j];
							var split = aData[1].match(/cityId=.*&/gi) == null ? "" : "&";
							var thisLinkRedDom = aData[3] == "orange" ? ' class="g-hot-link" ' : "";
							html += '<a ' + thisLinkRedDom + ' onclick="SFE.base.replaceCityPlaceHolder(this);" ' + target + '  href="' + aData[1].replace(/cityId=.*?&|cityId=.*$/gi, "cityId=" + cityId + split) + '" name="' + aData[2] + '">' + aData[0] + '</a>';
						}
						html += '</dd>';
						html += '</dl>';
					}
				}
				html += '</div>';
				html += '<div class="sub-brands">';
				var hasBrandText = typeof data.brandText != "undefined" && data.brandText.length > 0;
				var hasBrandPic = typeof data.brandPic != "undefined" && data.brandPic.length > 0;
				var brandTitle = typeof data.brandTitle != "undefined" ? data.brandTitle : "推荐品牌";
				if (hasBrandText) {
					html += '<dl><dt>' + brandTitle + '</dt><dd>';
					for (var i = 0; i < Math.min(data.brandText.length, 10); i++) {
						var aData = data.brandText[i];
						var tagDom = typeof aData[3] != "undefined" ? '<em class="' + aData[3] + '"></em>' : ''; // 标签DOM
						html += '<span><a ' + target + ' href="' + aData[1] + '" name="' + aData[2] + '">' + aData[0] + '</a>' + tagDom + '</span>';
					}
					html += '</dd></dl>';
				} else if (hasBrandPic) {
					html += '<dl><dt>' + brandTitle + '</dt><dd class="g-brand-logo">';
					for (var i = 0; i < Math.min(data.brandPic.length, 6); i++) {
						var aData = data.brandPic[i];
						html += '<span><a ' + target + ' href="' + aData[2] + '" name="' + aData[3] + '"><img src="' + aData[1] + '" alt="' + aData[0] + '" /></a></span>';
					}
					html += '</dd></dl>';
				}
				if (typeof data.pic != "undefined") {
					var aData = data.pic[0];
					html += '<div class="category-promotions-big"><a ' + target + ' href="' + aData[2] + '" name="' + aData[3] + '"><img src="' + aData[1] + '" alt="' + aData[0] + '" /></a></div>';
				}

				html += '</div>';
				html += '<a href="javascript:void(0);" title="关闭" class="close"></a>';
				var subCategoryWidth = 700;
				subCategory.html(html).show().css({width: 0});
				if (firstMoveIn) {
					subCategory.animate({width: subCategoryWidth}, 200);
				} else {
					subCategory.css({width: subCategoryWidth});
				}
				subCategoryMask.show();
				firstMoveIn = false;
			}
		};

		// 加载三级分类数据
		if (category.size() > 0) {
			$.ajax({
				dataType: 'script',
				url : httpType + "://" + sn.domain + sn.context + "/threeSort_10052_10051_.html",
				cache: true,
				success: function(){
					dataReady = true;
				}
			});
		}
		if (!isHome) {
			category.hide();
			icon.show();
			// 非首页展开二级分类
			var timer;
			hook.hover(function () {
				clearTimeout(timer);
				timer = setTimeout(function () {
					category.show();
					subCategory.hide();
					subCategoryMask.hide();
					category.children().removeClass("hover");
					firstMoveIn = true;
				}, 200);
			}, function () {
				clearTimeout(timer);
				timer = setTimeout(function () {
					category.hide();
					subCategory.hide();
					subCategoryMask.hide();
					category.children().removeClass("hover");
					firstMoveIn = true;
				}, 100);
			});
			category.hover(function () {
				clearTimeout(timer);
			}, function () {
				timer = setTimeout(function () {
					category.hide();
					category.children().removeClass("hover");
					subCategory.hide();
					subCategoryMask.hide();
					firstMoveIn = true;
				}, 60);
			});
			subCategory.hover(function () {
				clearTimeout(timer);
			}, function () {
				timer = setTimeout(function () {
					category.hide();
					category.children().removeClass("hover");
					subCategory.hide();
					subCategoryMask.hide();
					firstMoveIn = true;
				}, 300);
			});
			subCategoryMask.hover(function () {
				clearTimeout(timer);
			}, function () {
				clearTimeout(timer);
				timer = setTimeout(function () {
					subCategory.hide();
					subCategoryMask.hide();
					category.children().removeClass("hover");
					firstMoveIn = true;
				}, 300);
			});
		} else {
			//icon.hide();
			category.hover(function () {
				clearTimeout(timer);
			}, function () {
				timer = setTimeout(function () {
					subCategory.hide();
					subCategoryMask.hide();
					category.children().removeClass("hover");
					firstMoveIn = true;
				}, 100);
			});
			subCategory.hover(function () {
				clearTimeout(timer);
			}, function () {
				clearTimeout(timer);
				timer = setTimeout(function () {
					subCategory.hide();
					subCategoryMask.hide();
					category.children().removeClass("hover");
					firstMoveIn = true;
				}, 300);
			});
			subCategoryMask.hover(function () {
				clearTimeout(timer);
			}, function () {
				clearTimeout(timer);
				timer = setTimeout(function () {
					subCategory.hide();
					subCategoryMask.hide();
					category.children().removeClass("hover");
					firstMoveIn = true;
				}, 300);
			});
		}
		category.find("dl").mouseover(function () {
			var _this = $(this);
			var index = _this.index();
			if (isIE6()) {
				index -= 1; //IE6下因为插入了iframe，索引值需要减去 1
			}
			var dl = category.children("dl");
			clearTimeout(timer);
			timer = setTimeout(function () {
				showSubMenu(index);
				dl.removeClass("hover").eq(index).addClass("hover");
				// 插入左侧竖线
				if( dl.eq(index).find(".g-category-line").size() == 0 ){
					dl.eq(index).append('<dd class="g-category-line"></dd>');
				}
			}, 60);
		}).mouseleave(function () {
				clearTimeout(timer);
			});
		subCategory.delegate(".close", "click", function () {
			subCategory.hide();
			subCategoryMask.hide();
		});

	};

	// 全部分类二级菜单
	var allSort = function () {
		if ($("#category").size() == 0) {
			return false;
		}
		$.ajax({
			url: httpType + "://" + sn.domain + sn.context + "/sortlist_10052_10051_openSortByJsonpCallBack_.html",
			method: "get",
			dataType: "jsonp",
			jsonpCallback: "openSortByJsonpCallBack",
			cache: true,
			success: function (dom) {
				var cityId = d("cityId") || "9173";
				dom = dom.replace(/\{cityId\}/g, cityId).replace(/%7bcityId%7d/g, cityId);
				$("#category").html(dom);
				// 开发时为二级菜单的图标容器增加class
				/*$("#category").find("dl").each(function(i){
					var dl = $(this);
					*//*if(i==2){
						dl.addClass("hover");
					}*//*
					var icon = dl.children("dt").children("i");
					var index = isIE6() ? dl.index() : dl.index()+1;
					icon.addClass("g-category-icon-" + index);
				});*/

				trail();
			}
		});
	};

	// 浮动条
	var floatBar = function () {

		//默认参数
		var _d = {
			contents: null,             //滚动条的内容，可以是DOM字符或者jQuery对象
			align: "right",             //水平方向对齐
			vertical: "middle",         //垂直方向对齐
			zIndex: 7500,                //Z轴值
			css: {},                   //附加样式
			id: null,                    //包裹容器的id，必要时可以设置id用来操作DOM
			ieFixed: true               //IE6及更低版本是否模拟fixed效果
		};

		//检测某些垃圾浏览器版本，并保存至变量
		var _ie = ($.browser.msie) ? parseInt($.browser.version) : false;

		//检测并合并传递的参数
		if (arguments.length < 1 || !(arguments[0] instanceof Object)) {
			return $.error("ECode.floatBar: 参数必须为JSON对象");
		}
		$.extend(_d, arguments[0]);

		//挂载DOM
		var _hideCss = {
			position: "fixed",
			top: "-9999em",
			left: "-9999em"
		};
		if (_ie && _ie <= 6) {
			_hideCss.position = "absolute";
		}
		$('<div class="ECode-floatBar"></div>').css(_hideCss).appendTo("body");

		//修正位置
		var _bar = $("body").find(".ECode-floatBar:last");
		_bar.append(_d.contents);
		var _bw = _bar.width(),
			_bh = _bar.height(),
			_css = {zIndex: _d.zIndex};
		if (_d.id != null) {
			_bar.attr("id", _d.id);
		}
		switch (_d.align) {
			case 'right':
				_css.left = 'auto';
				_css.right = 0;
				break;
			case 'left':
				_css.right = 'auto';
				_css.left = 0;
				break;
			case 'center':
				_css.right = 'auto';
				_css.left = '50%';
				_css.marginLeft = -_bw / 2;
				break;
		}
		switch (_d.vertical) {
			case 'top':
				_css.top = 0;
				break;
			case 'bottom':
				_css.top = 'auto';
				_css.bottom = 0;
				break;
			case 'middle':
				_css.top = '50%';
				_css.marginTop = -_bh / 2;
				if (_ie && _ie <= 6) {
					_css.marginTop = 0;
				}
				break;
		}
		_bar.css($.extend(_css, _d.css));

		/*
		 * 以下代码针对IE6及更古老的版本
		 * 如果感觉不爽，可以将 _d.ieFixed 置为 false
		 * 那么IE6下将不会随屏滚动，囧~~
		 * */
		var fixIE6 = function () {
			var _topHide = $(document).scrollTop(),  //页面上部被卷去高度
				_winHeight = $(window).height(),  //可视区域高度
				_winWidth = $(document).width();  //可视区域宽度
			switch (_d.vertical) {
				case 'top':
					_bar.stop().animate({top: _topHide});
					break;
				case 'bottom':
					var _newTop = _winHeight + _topHide - _bh;
					if (typeof _d.css.marginBottom != "undefined" && _d.css.marginBottom != null) {
						var _mb = parseInt(_d.css.marginBottom);
						//若果IE6下出现 margin-bottom 为负值，则忽略掉，否则合并计算得出 top 值
						if (_mb >= 0) {
							_newTop -= _mb;
						}
					}
					_bar.css({marginTop: 0}).stop().animate({top: _newTop});
					break;
				case 'middle':
					_bar.stop().animate({top: _winHeight / 2 + _topHide - _bh / 2});
					break;
			}
		};
		if (_d.ieFixed && _ie && _ie <= 6) {
			fixIE6();
			$(window).scroll(function () {
				fixIE6();
			});
			$(window).resize(function () {
				fixIE6();
			});
		}
	};


	// 工具条方法打包
	var toolBarEvent = function () {
		appDowndloadCode();
		toolBarWelcome();
		levelTips();
		toolBarOpen();
		setCityUrl();
		//加载待评价数量
		$(".g-tool-link").eq(0).find("dl.g-child-node").mouseover(function (e) {
			appraiseCount();
		});
		//绑定二级目录点击替换cityId
		setSearchCity("#category a");
	};

	// 搜索框方法打包
	var searchEvent = function () {
		getSearchKeyword();
		searchInputEvent();
		searchAutoComplete();
	};

	// 导航条方法打包
	var mainNavEvent = function () {
		allSort();
		minCartEvent();
	};
	
	var getCity = function(callBack) {
		var cityId = d('cityId');
		var sn_city = d('SN_CITY');
		if (cityId) {
			if(typeof callBack == "function"){
				callBack(cityId);
			}
		} else if (sn_city) {
			var city = analyzeCookie(sn_city);
			if(typeof callBack == "function"){
				callBack(city.cityCommerceId);
			}
		} else {
			var ego_pre = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
			var ego_sit = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
			var ego_dev = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
			var _hostName = document.location.hostname;
				
			var ipservice = "http://ipservice.suning.com";
			if (ego_pre.test(_hostName)) {
				ipservice = "http://ipservicepre.cnsuning.com";
			} else if (ego_sit.test(_hostName)) {
				ipservice = "http://ipservicesit.cnsuning.com";
			} else if (ego_dev.test(_hostName)) {
				ipservice = "http://ipservicesit.cnsuning.com";
			}
			var url = ipservice + '/ipQuery.do';
			$.ajax( {
				type : "GET",
				url : url,
				cache : true,
				async : false,
				dataType : "jsonp",
				jsonpCallback : "cookieCallback",
				success : function(cookieJson) {
					cityId = cookieJson.cityCommerceId;
					cookieJson.flag = "2";
					cookieJson.count = 0;
					var cityStr = cityInfoToString(cookieJson);
					SetCookie('SN_CITY', cityStr);
					SetCookie('cityId', cookieJson.cityCommerceId);
					SetCookie('districtId', cookieJson.districtCommerceId);
					if(typeof callBack == "function"){
						callBack(cityId);
					}
				},
				error : function() {
					cityId = '9173';
					if(typeof callBack == "function"){
						callBack(cityId);
					}
				}
			});
		}
	};

	var analyzeCookie = function(cookieValue){
		var cityArrayTemp = cookieValue.split("|");
		var cityTemp = null;
		if(cityArrayTemp.length>0){
		var data = cityArrayTemp[0].split("_");//按照_分出各个部分
		cityTemp = {};
		cityTemp.provinceMDMId = data[0];
		cityTemp.provinceCommerceId = data[1];
		cityTemp.cityMDMId = data[2];
		cityTemp.cityCommerceId = data[3];
		cityTemp.districtMDMId = data[4];
		cityTemp.districtCommerceId = data[5];
		cityTemp.flag = data[6];
		cityTemp.count = data[7];
		}
		return cityTemp;
	};

	var cityInfoToString = function(cityValue){
		var cookieValueTemp = "";
		cookieValueTemp += cityValue.provinceMDMId;
		cookieValueTemp += "_";
		cookieValueTemp += cityValue.provinceCommerceId;
		cookieValueTemp += "_";
		cookieValueTemp += cityValue.cityMDMId;
		cookieValueTemp += "_";
		cookieValueTemp += cityValue.cityCommerceId;
		cookieValueTemp += "_";
		cookieValueTemp += cityValue.districtMDMId;
		cookieValueTemp += "_";
		cookieValueTemp += cityValue.districtCommerceId;
		cookieValueTemp += "_";
		cookieValueTemp += cityValue.flag;
		cookieValueTemp += "_";
		cookieValueTemp += cityValue.count;
		return cookieValueTemp;
	};
	
	function SetCookie(f, h) {
	    var e = 365;
	    var g = new Date;
	    g.setTime(g.getTime() + e * 24 * 60 * 60 * 1000);
	    document.cookie = f + "=" + escape(h) + ";path=/;domain=" + sn.cookieDomain + ";expires=" + g.toGMTString();
	};

	//返回方法供页面使用
	return {
		d: d,
		logonurl: logonurl,
		setSearchCity: setSearchCity,
		replaceCityParam: replaceCityParam,
		replaceCityPlaceHolder: replaceCityPlaceHolder,
		registerurl: registerurl,
		logoff: logoff,
		onlineService: onlineService,
		toolBarEvent: toolBarEvent,
		searchEvent: searchEvent,
		onSubmitSearch: onSubmitSearch,
		mainNavEvent: mainNavEvent,
		floatBar: floatBar,
		miniCartReload : miniCartReload,
		getCity: getCity
	};

})(jQuery);

function hrefLink(e) {
	if (navigator.userAgent.indexOf("Firefox") > 0) {
		window.location = e
	} else {
		var f = document.createElement("a");
		f.href = e;
		document.body.appendChild(f);
		if (/msie/i.test(navigator.userAgent.toLowerCase())) {
			f.click()
		} else {
			var d = document.createEvent("MouseEvent");
			d.initEvent("click", false, false);
			f.dispatchEvent(d)
		}
	}
};
function d(b) {
	var a;
	return (a = document.cookie.match(RegExp("(^| )" + b + "=([^;]*)(;|$)"))) ? decodeURIComponent(a[2]
		.replace(/\+/g, "%20"))
		: null
};

$(function () {
	// 头部方法
	SFE.base.toolBarEvent();
	SFE.base.searchEvent();
	SFE.base.mainNavEvent();
	SFE.base.setSearchCity(".cityId_replace a");
	// 替换主导航{cityId}占位符
	$(document).on("mouseover", ".cityId_replace a", function(){
		SFE.base.replaceCityPlaceHolder(this);
	});

	// 头部热搜词点击统计 pangnate 20140901
	$(document).on("click", "#snKeywordNew a", function(){
		if ("undefined" != typeof sa && "undefined" != typeof sa.click) {
			sa.click.sendDatasIndex(this);
		}
	});

});(function(b){b.fn.Jlazyload=function(n,e){if(!this.length){return}var a=("https:"==document.location.protocol)?"https://imgssl.suning.com/images/ShoppingArea/Common/blank.gif":"http://script.suning.cn/images/ShoppingArea/Common/blank.gif";var k=b.extend({type:null,offsetParent:null,source:"src2",placeholderImage:a,placeholderClass:"loading",threshold:200},n||{}),B=this,l,A,o=function(r){var c=r.scrollLeft,p=r.scrollTop,i=r.offsetWidth,q=r.offsetHeight;while(r.offsetParent){c+=r.offsetLeft;p+=r.offsetTop;r=r.offsetParent}return{left:c,top:p,width:i,height:q}},h=function(){var c=document.documentElement,s=document.body,q=window.pageXOffset?window.pageXOffset:(c.scrollLeft||s.scrollLeft),p=window.pageYOffset?window.pageYOffset:(c.scrollTop||s.scrollTop),i=c.clientWidth,r=c.clientHeight;return{left:q,top:p,width:i,height:r}},j=function(p,i){var r,q,v,u,t,c,s=k.threshold?parseInt(k.threshold):0;r=p.left+p.width/2;q=i.left+i.width/2;v=p.top+p.height/2;u=i.top+i.height/2;t=(p.width+i.width)/2;c=(p.height+i.height)/2;return Math.abs(r-q)<(t+s)&&Math.abs(v-u)<(c+s)},f=function(c){if(k.placeholderImage&&k.placeholderClass){c.attr("src",k.placeholderImage).addClass(k.placeholderClass)}},d=function(i,c,p){if(i){p.attr("src",c).removeAttr(k.source);if(e){e(c,p)}}},g=function(){A=h(),B=B.filter(function(){return b(this).attr(k.source)});b.each(B,function(){var c=b(this).attr(k.source);if(!c){return}switch(k.type){case"image":f(b(this));break;default:break}});b.each(B,function(){var c=b(this).attr(k.source);if(!c){return}var i=(!k.offsetParent)?A:o(b(k.offsetParent).get(0)),q=o(this),p=j(i,q);switch(k.type){case"image":d(p,c,b(this));break;default:break}})},m=function(){if(B.length>0){clearTimeout(l);l=setTimeout(function(){g()},10)}};g();if(!k.offsetParent){b(window).bind("scroll",function(){m()}).bind("reset",function(){m()}).bind("resize",function(){m()})}else{b(k.offsetParent).bind("scroll",function(){m()})}}})(jQuery);(function(b){b.fn.datalazyload=function(a,g){if(!this.length){return}var m=b.extend({type:null,offsetParent:null,source:"datalazyload",threshold:200},a||{}),d=this,n,f,e=function(q){var p=q.scrollLeft,i=q.scrollTop,r=q.offsetWidth,c=q.offsetHeight;while(q.offsetParent){p+=q.offsetLeft;i+=q.offsetTop;q=q.offsetParent}return{left:p,top:i,width:r,height:c}},l=function(){var q=document.documentElement,r=document.body,p=window.pageXOffset?window.pageXOffset:(q.scrollLeft||r.scrollLeft),i=window.pageYOffset?window.pageYOffset:(q.scrollTop||r.scrollTop),s=q.clientWidth,c=q.clientHeight;return{left:p,top:i,width:s,height:c}},k=function(p,i){var r,q,v,u,t,c,s=m.threshold?parseInt(m.threshold):0;r=p.left+p.width/2;q=i.left+i.width/2;v=p.top+p.height/2;u=i.top+i.height/2;t=(p.width+i.width)/2;c=(p.height+i.height)/2;return Math.abs(r-q)<(t+s)&&Math.abs(v-u)<(c+s)},j=function(c,i){if(c){b(i).css("display","none");b(i).removeClass(m.source);var p=document.createElement("div");i.parentNode.insertBefore(p,i);b(p).html(i.value)}},h=function(){f=l(),b("."+m.source).each(function(){var p=(!m.offsetParent)?f:e(b(m.offsetParent).get(0)),i=e(this),c=k(p,i);switch(m.type){case"textarea":j(c,this);break;default:break}})},o=function(){if(d.length>0){clearTimeout(n);n=setTimeout(function(){h()},10)}};h();if(!m.offsetParent){b(window).bind("scroll",function(){o()}).bind("reset",function(){o()}).bind("resize",function(){o()})}else{b(m.offsetParent).bind("scroll",function(){o()})}}})(jQuery);var login={};login.vipHover=function(){var a=$(".u-fst-login");$(".link-right").hover(function(){a.fadeIn("fast")},function(){a.hide()})};login.codeHover=function(){var a=$(".ico-codephoto");$(".code-art").hover(function(b){a.stop(true).animate({left:-150+"px",opacity:1},500)},function(){a.stop(true).animate({left:-45+"px",opacity:0},500)})};login.changeLogin=function(){var a=$(".login-form");var b=$(".login-photocode");$(".qrlogin-link").click(function(){var c=$(this).find("i").hasClass("def-login");if(!c){a.animate({left:-460+"px",opacity:0},500);setLogonStylebyImage()}else{a.animate({left:10+"px",opacity:1},500);setLogonStylebyUserName()}})};login.textInput=function(){$(".login-txtbox,.code-txtbox").focusin(function(){var c=$(this),a=c.find(".txt-input"),b=c.find(".input-label");if(a.hasClass("text-email")){b.css("color","#eee")}else{b.hide()}if(!c.hasClass("login-txtbox-error")){c.css("border","solid 1px #75abf3")}c.find(".text-email").keyup(function(){var d=$(this).val();if(d!=""){b.hide()}else{b.show()}})}).focusout(function(){var b=$(this),a=b.find("input").val();_txtInput=b.find(".txt-input"),_txtLabel=b.find(".input-label");if(a==""){if(_txtInput.hasClass("text-email")){_txtLabel.removeAttr("style")}else{_txtLabel.show()}}b.removeAttr("style")});$(".input-label").click(function(){$(this).siblings(".txt-input").focus()})};login.textEmail=function(b,a){b.css("top",a+62+"px")};login.autoFill=function(a,c){var g=!1,h=c,f=$(a),b=f.find(".text-email"),e=b.parents(".login-txtbox").position().top,d="";$(document).click(function(j){var i=$(j.target);if(i.hasClass("text-email")){j.stopPropagation()}else{g&&g.hide()}});b[0]&&b.val()!=b[0].defaultValue&&b.val(b[0].defaultValue).css("color","#999");b.focus(function(){var k=$(this),j=k.val();g=$(".email-list");login.textEmail(g,e);$.trim(k.val()).length&&k.change();var i=k.parents("dl").siblings("dl").find(".email-list");i&&i.hide()}).keyup(function(n){var k=$(this),q=n.keyCode,p=k.val(),o=g.find("li.hover"),l=g.find("li").size(),j=!1,i=!1,m={down:function(t,s){var r=o.index()>l-2;if(r){j=g.find("li").first();j.addClass("hover").siblings("li").removeClass("hover")}if(o.index()>=0){j=o.next();o.removeClass("hover").next().addClass("hover");d=j.html()}else{j=g.find("li").first();j.addClass("hover").siblings("li").removeClass("hover");o=j;d=j.html()}},up:function(s,r){if(o.index()>0){i=o.prev();o.removeClass("hover").prev().addClass("hover");d=i.html()}else{i=g.find("li").last();i.addClass("hover").siblings("li").removeClass("hover");d=i.html()}},enter:function(u,s){u.preventDefault();if(d.length){s.val(d)}var v=s.attr("id");var r=setTimeout(function(){g.hide();g.html("");s.focus();d="";clearTimeout(r)},1);return}};k.keydown();e=b.parents(".login-txtbox").position().top;login.textEmail(g,e);if(q==40){m.down(n,k)}else{if(q==38){m.up(n,k)}else{if(q==13){m.enter(n,k)}else{b.change()}}}}).keydown(function(k){if(k.keyCode==32){k.preventDefault();return}var j=$(this),i=j.val();if(i.length>25||i.length<1){g&&g.hide()&&g.html("");return}}).change(function(l){var k=$(this),q=k.val();if(q.length>25||q.length<1){return}if(/[\u4E00-\u9FA5]/i.test(q)){g.hide()&&g.html("");return}if(q.indexOf("@")<0){q+="@"}var p=q.substring(q.indexOf("@"),0),m=q.substring(q.indexOf("@")+1),j=["qq.com","163.com","126.com","sohu.com","sina.com","hotmail.com"],o=["qq.com","163.com","126.com","sohu.com","sina.com","hotmail.com","gmail.com","foxmail.com","139.com","189.cn","tom.com ","hotmail.com.cn","sina.cn","vip.qq.com","vip.sina.com","vip.163.com","wo.com.cn","21cn.com","yeah.net","netease.com"],i=new RegExp("^"+m);html="";if(h==2){if(k.val().indexOf("@")>0){html="<ol>"}else{return}}var n=q.split("@");if(n[1]==""){$.each(j,function(r,s){html+="<li title="+p+"@"+s+">"+p+"@"+s+"</li>\n"})}else{$.each(o,function(r,s){if(!i.test(s)){return}html+="<li title="+p+"@"+s+">"+p+"@"+s+"</li>\n"})}html+='</ol>\n<!--[if lt IE 7]><iframe frameborder="0" scrolling="0" src=""></iframe><![endif]-->\n';g.html(html).children("iframe").width(g.width()).height(g.height());g.removeClass("hide").show(0,function(){g.find("li").bind("mouseover mouseout mousedown",function(r){if(r.type=="mouseover"){$(this).addClass("hover").siblings("li").removeClass("hover")}if(r.type=="mousedown"){k.val(this.innerHTML);k.blur();g.hide();g.html("");var s=k.attr("id")}})});if(g.find("ol li").first().text()==q){g.hide()}if(g.find("ol li").first().text()==""){g.hide()}})};login.emailList=function(){$(".email-list li").live("mouseenter",function(){$(this).css({background:"#ff9c00",color:"#fff"})});$(".email-list li").live("mouseout",function(){$(this).removeAttr("style")})};$(function(){login.vipHover();login.codeHover();login.changeLogin();login.textInput();login.autoFill(".login-form .login-txtbox",2);login.emailList()});function getUserChannel(c){var b;var d="https://ssl.suning.com/emall/";var e=window.location.host;if(e.indexOf("dev")!=-1){d="https://ssldev.cnsuning.com/webapp/wcs/stores/servlet/"}else{if(e.indexOf("sit")!=-1){d="https://sslsit.cnsuning.com/emall/"}else{if(e.indexOf("pre")!=-1){d="https://sslpre.cnsuning.com/emall/"}}}var a=d+"AjaxCheckUserChannelCmd?storeId=10052&callback=?";$.getJSON(a,function(f){if(f!=null){if("successfull"==f.retResult){b=f.userChannel}else{if("failture"==f.retResult){b=f.userChannel}}}if(null!=c&&""!=c){$("#"+c).val(b)}return b});return false};var aqSuning=aqSuning||{};var aqjs=document.getElementsByTagName("script");var aqcss=document.getElementsByTagName("link");var aqIntervalVar,ascUrl,aqRefreshFlag=false;function isInclude(e,f){if(f){for(var d=0;d<aqjs.length;d++){if(aqjs[d][f?"src":"href"].indexOf(e)!=-1){return true}}return false}else{for(var d=0;d<aqcss.length;d++){if(aqcss[d][f?"src":"href"].indexOf(e)!=-1){return true}}return false}}function getCurVersion(){var b=new Date();var a=b.getYear()+"-"+b.getMonth()+"-"+b.getDate()+":"+b.getHours();return a}$(document).ready(function(){var a=document.location.hostname;judgeAsc(a);if(!isInclude("jquery",true)){alert("请引入jQuery.js")}});function judgeAsc(a){var c=window.location.protocol;var d=/^\w*?.suning.com$/;var e=/^(\w*)(pre)(\w*)(.cnsuning.com)$/;var b=/^(\w*)(sit)(\w*)(.cnsuning.com)$/;if(d.test(a)){ascUrl=c+"//aq.suning.com/asc/loginpro/getinfo.do"}else{if(e.test(a)){ascUrl=c+"//aqpre.cnsuning.com/asc/loginpro/getinfo.do"}else{if(b.test(a)){ascUrl=c+"//aqsit.cnsuning.com/asc/loginpro/getinfo.do"}else{ascUrl=c+"//aqsit.cnsuning.com/asc/loginpro/getinfo.do";ascUrl=c+"//aqdev.cnsuning.com:8080/asc-web/loginpro/getinfo.do"}}}}aqSuning.showMobilePopType=function(a,c,d,b){securityLoginProtect(c,d,b);aqRefreshFlag=a};var securityLoginProtect=function(i,e,a){var h=ascUrl+"?ticket="+i+"&targetUrl="+e+"&parentUrl="+a;var k="<div class='mask-layer' ></div>",j='<iframe id="security-loginProtect" frameborder=0 allowTransparency="true" src='+h+' style="overflow: hidden;position:fixed;top:50%;left:50%;margin-top:-150px;margin-left:-200px;width:420px;height:362px;border:none;background: transparent;z-index:9995;_position:absolute;"></iframe>',b="",f="",m="",g="",c="",n="";function l(){b=document.body.clientWidth,f=document.body.clientHeight,m=window.screen.availWidth,g=window.screen.availHeight;if(f>g){c=b;n=f}else{c=m;n=g}}l();$(k).appendTo($("body")).css({position:"absolute",top:0,left:0,width:c,height:n,background:"#000",opacity:0,zIndex:9990}).stop().animate({opacity:0.3});$(j).appendTo($("body")).css({opacity:0}).stop().animate({opacity:1});$(window).resize(function(){l();$(k).css({width:c,height:n})});if((navigator.userAgent.indexOf("MSIE 6.0")>0)){$(window).scroll(function(){l();$(k).css({width:c,height:n});var o=$(window).scrollTop(),d=$(window).height()/2;$("#security-loginProtect").css({top:o+d})})}else{$(window).scroll(function(){l();$(k).css({width:c,height:n})})}aqIntervalVar=window.setInterval(checkMsgFromLoginProtectIframe,200)};function checkMsgFromLoginProtectIframe(){var a=window.location.hash;if(a.length>1){var b=a.split("#");var c=b[1].split(":");switch(c[0]){case"aqclose":securityLoginProtectClose();break;case"success":securityLoginProtectClose();break;default:break}}}var securityLoginProtectClose=function(){var f=$("#security-loginProtect"),g=f.siblings(".mask-layer");f.stop().animate({opacity:0},function(){f.remove()});g.stop().animate({opacity:0},function(){g.remove()});clearInterval(aqIntervalVar);var c=window.location.href;var d=c.indexOf("#");var e=c.substring(0,d)+"#unknown:";window.location.href=e;if(aqRefreshFlag==true){window.location.reload()}};LoginProtect={QueryString:function(b){var a=location.search.match(new RegExp("[?&]"+b+"=([^&]*)(&?)","i"));return a?a[1]:a}};var JSEncryptExports={};(function(ap){var bE;var n=244837814094590;var aV=((n&16777215)==15715070);function bf(z,t,L){if(z!=null){if("number"==typeof z){this.fromNumber(z,t,L)}else{if(t==null&&"string"!=typeof z){this.fromString(z,256)}else{this.fromString(z,t)}}}}function bm(){return new bf(null)}function a7(bX,t,z,bW,bZ,bY){while(--bY>=0){var L=t*this[bX++]+z[bW]+bZ;bZ=Math.floor(L/67108864);z[bW++]=L&67108863}return bZ}function a6(bX,b2,b3,bW,b0,t){var bZ=b2&32767,b1=b2>>15;while(--t>=0){var L=this[bX]&32767;var bY=this[bX++]>>15;var z=b1*L+bY*bZ;L=bZ*L+((z&32767)<<15)+b3[bW]+(b0&1073741823);b0=(L>>>30)+(z>>>15)+b1*bY+(b0>>>30);b3[bW++]=L&1073741823}return b0}function a5(bX,b2,b3,bW,b0,t){var bZ=b2&16383,b1=b2>>14;while(--t>=0){var L=this[bX]&16383;var bY=this[bX++]>>14;var z=b1*L+bY*bZ;L=bZ*L+((z&16383)<<14)+b3[bW]+b0;b0=(L>>28)+(z>>14)+b1*bY;b3[bW++]=L&268435455}return b0}if(aV&&(navigator.appName=="Microsoft Internet Explorer")){bf.prototype.am=a6;bE=30}else{if(aV&&(navigator.appName!="Netscape")){bf.prototype.am=a7;bE=26}else{bf.prototype.am=a5;bE=28}}bf.prototype.DB=bE;bf.prototype.DM=((1<<bE)-1);bf.prototype.DV=(1<<bE);var bQ=52;bf.prototype.FV=Math.pow(2,bQ);bf.prototype.F1=bQ-bE;bf.prototype.F2=2*bE-bQ;var a="0123456789abcdefghijklmnopqrstuvwxyz";var g=new Array();var aH,E;aH="0".charCodeAt(0);for(E=0;E<=9;++E){g[aH++]=E}aH="a".charCodeAt(0);for(E=10;E<36;++E){g[aH++]=E}aH="A".charCodeAt(0);for(E=10;E<36;++E){g[aH++]=E}function Y(t){return a.charAt(t)}function aX(z,t){var L=g[z.charCodeAt(t)];return(L==null)?-1:L}function d(z){for(var t=this.t-1;t>=0;--t){z[t]=this[t]}z.t=this.t;z.s=this.s}function h(t){this.t=1;this.s=(t<0)?-1:0;if(t>0){this[0]=t}else{if(t<-1){this[0]=t+this.DV}else{this.t=0}}}function bi(t){var z=bm();z.fromInt(t);return z}function bI(bZ,z){var bW;if(z==16){bW=4}else{if(z==8){bW=3}else{if(z==256){bW=8}else{if(z==2){bW=1}else{if(z==32){bW=5}else{if(z==4){bW=2}else{this.fromRadix(bZ,z);return}}}}}}this.t=0;this.s=0;var bY=bZ.length,L=false,bX=0;while(--bY>=0){var t=(bW==8)?bZ[bY]&255:aX(bZ,bY);if(t<0){if(bZ.charAt(bY)=="-"){L=true}continue}L=false;if(bX==0){this[this.t++]=t}else{if(bX+bW>this.DB){this[this.t-1]|=(t&((1<<(this.DB-bX))-1))<<bX;this[this.t++]=(t>>(this.DB-bX))}else{this[this.t-1]|=t<<bX}}bX+=bW;if(bX>=this.DB){bX-=this.DB}}if(bW==8&&(bZ[0]&128)!=0){this.s=-1;if(bX>0){this[this.t-1]|=((1<<(this.DB-bX))-1)<<bX}}this.clamp();if(L){bf.ZERO.subTo(this,this)}}function bA(){var t=this.s&this.DM;while(this.t>0&&this[this.t-1]==t){--this.t}}function u(z){if(this.s<0){return"-"+this.negate().toString(z)}var L;if(z==16){L=4}else{if(z==8){L=3}else{if(z==2){L=1}else{if(z==32){L=5}else{if(z==4){L=2}else{return this.toRadix(z)}}}}}var bX=(1<<L)-1,b0,t=false,bY="",bW=this.t;var bZ=this.DB-(bW*this.DB)%L;if(bW-->0){if(bZ<this.DB&&(b0=this[bW]>>bZ)>0){t=true;bY=Y(b0)}while(bW>=0){if(bZ<L){b0=(this[bW]&((1<<bZ)-1))<<(L-bZ);b0|=this[--bW]>>(bZ+=this.DB-L)}else{b0=(this[bW]>>(bZ-=L))&bX;if(bZ<=0){bZ+=this.DB;--bW}}if(b0>0){t=true}if(t){bY+=Y(b0)}}}return t?bY:"0"}function bC(){var t=bm();bf.ZERO.subTo(this,t);return t}function bB(){return(this.s<0)?this.negate():this}function bN(t){var L=this.s-t.s;if(L!=0){return L}var z=this.t;L=z-t.t;if(L!=0){return(this.s<0)?-L:L}while(--z>=0){if((L=this[z]-t[z])!=0){return L}}return 0}function q(z){var bW=1,L;if((L=z>>>16)!=0){z=L;bW+=16}if((L=z>>8)!=0){z=L;bW+=8}if((L=z>>4)!=0){z=L;bW+=4}if((L=z>>2)!=0){z=L;bW+=2}if((L=z>>1)!=0){z=L;bW+=1}return bW}function bt(){if(this.t<=0){return 0}return this.DB*(this.t-1)+q(this[this.t-1]^(this.s&this.DM))}function bv(L,z){var t;for(t=this.t-1;t>=0;--t){z[t+L]=this[t]}for(t=L-1;t>=0;--t){z[t]=0}z.t=this.t+L;z.s=this.s}function a2(L,z){for(var t=L;t<this.t;++t){z[t-L]=this[t]}z.t=Math.max(this.t-L,0);z.s=this.s}function s(b0,bW){var z=b0%this.DB;var t=this.DB-z;var bY=(1<<t)-1;var bX=Math.floor(b0/this.DB),bZ=(this.s<<z)&this.DM,L;for(L=this.t-1;L>=0;--L){bW[L+bX+1]=(this[L]>>t)|bZ;bZ=(this[L]&bY)<<z}for(L=bX-1;L>=0;--L){bW[L]=0}bW[bX]=bZ;bW.t=this.t+bX+1;bW.s=this.s;bW.clamp()}function bT(bZ,bW){bW.s=this.s;var bX=Math.floor(bZ/this.DB);if(bX>=this.t){bW.t=0;return}var z=bZ%this.DB;var t=this.DB-z;var bY=(1<<z)-1;bW[0]=this[bX]>>z;for(var L=bX+1;L<this.t;++L){bW[L-bX-1]|=(this[L]&bY)<<t;bW[L-bX]=this[L]>>z}if(z>0){bW[this.t-bX-1]|=(this.s&bY)<<t}bW.t=this.t-bX;bW.clamp()}function bs(z,bW){var L=0,bX=0,t=Math.min(z.t,this.t);while(L<t){bX+=this[L]-z[L];bW[L++]=bX&this.DM;bX>>=this.DB}if(z.t<this.t){bX-=z.s;while(L<this.t){bX+=this[L];bW[L++]=bX&this.DM;bX>>=this.DB}bX+=this.s}else{bX+=this.s;while(L<z.t){bX-=z[L];bW[L++]=bX&this.DM;bX>>=this.DB}bX-=z.s}bW.s=(bX<0)?-1:0;if(bX<-1){bW[L++]=this.DV+bX}else{if(bX>0){bW[L++]=bX}}bW.t=L;bW.clamp()}function bJ(z,bW){var t=this.abs(),bX=z.abs();var L=t.t;bW.t=L+bX.t;while(--L>=0){bW[L]=0}for(L=0;L<bX.t;++L){bW[L+t.t]=t.am(0,bX[L],bW,L,0,t.t)}bW.s=0;bW.clamp();if(this.s!=z.s){bf.ZERO.subTo(bW,bW)}}function au(L){var t=this.abs();var z=L.t=2*t.t;while(--z>=0){L[z]=0}for(z=0;z<t.t-1;++z){var bW=t.am(z,t[z],L,2*z,0,1);if((L[z+t.t]+=t.am(z+1,2*t[z],L,2*z+1,bW,t.t-z-1))>=t.DV){L[z+t.t]-=t.DV;L[z+t.t+1]=1}}if(L.t>0){L[L.t-1]+=t.am(z,t[z],L,2*z,0,1)}L.s=0;L.clamp()}function a9(b3,b0,bZ){var b9=b3.abs();if(b9.t<=0){return}var b1=this.abs();if(b1.t<b9.t){if(b0!=null){b0.fromInt(0)}if(bZ!=null){this.copyTo(bZ)}return}if(bZ==null){bZ=bm()}var bX=bm(),z=this.s,b2=b3.s;var b8=this.DB-q(b9[b9.t-1]);if(b8>0){b9.lShiftTo(b8,bX);b1.lShiftTo(b8,bZ)}else{b9.copyTo(bX);b1.copyTo(bZ)}var b5=bX.t;var L=bX[b5-1];if(L==0){return}var b4=L*(1<<this.F1)+((b5>1)?bX[b5-2]>>this.F2:0);var cc=this.FV/b4,cb=(1<<this.F1)/b4,ca=1<<this.F2;var b7=bZ.t,b6=b7-b5,bY=(b0==null)?bm():b0;bX.dlShiftTo(b6,bY);if(bZ.compareTo(bY)>=0){bZ[bZ.t++]=1;bZ.subTo(bY,bZ)}bf.ONE.dlShiftTo(b5,bY);bY.subTo(bX,bX);while(bX.t<b5){bX[bX.t++]=0}while(--b6>=0){var bW=(bZ[--b7]==L)?this.DM:Math.floor(bZ[b7]*cc+(bZ[b7-1]+ca)*cb);if((bZ[b7]+=bX.am(0,bW,bZ,b6,0,b5))<bW){bX.dlShiftTo(b6,bY);bZ.subTo(bY,bZ);while(bZ[b7]<--bW){bZ.subTo(bY,bZ)}}}if(b0!=null){bZ.drShiftTo(b5,b0);if(z!=b2){bf.ZERO.subTo(b0,b0)}}bZ.t=b5;bZ.clamp();if(b8>0){bZ.rShiftTo(b8,bZ)}if(z<0){bf.ZERO.subTo(bZ,bZ)}}function bh(t){var z=bm();this.abs().divRemTo(t,null,z);if(this.s<0&&z.compareTo(bf.ZERO)>0){t.subTo(z,z)}return z}function aT(t){this.m=t}function aI(t){if(t.s<0||t.compareTo(this.m)>=0){return t.mod(this.m)}else{return t}}function c(t){return t}function V(t){t.divRemTo(this.m,null,t)}function p(t,L,z){t.multiplyTo(L,z);this.reduce(z)}function aF(t,z){t.squareTo(z);this.reduce(z)}aT.prototype.convert=aI;aT.prototype.revert=c;aT.prototype.reduce=V;aT.prototype.mulTo=p;aT.prototype.sqrTo=aF;function ab(){if(this.t<1){return 0}var t=this[0];if((t&1)==0){return 0}var z=t&3;z=(z*(2-(t&15)*z))&15;z=(z*(2-(t&255)*z))&255;z=(z*(2-(((t&65535)*z)&65535)))&65535;z=(z*(2-t*z%this.DV))%this.DV;return(z>0)?this.DV-z:-z}function K(t){this.m=t;this.mp=t.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<(t.DB-15))-1;this.mt2=2*t.t}function by(t){var z=bm();t.abs().dlShiftTo(this.m.t,z);z.divRemTo(this.m,null,z);if(t.s<0&&z.compareTo(bf.ZERO)>0){this.m.subTo(z,z)}return z}function bl(t){var z=bm();t.copyTo(z);this.reduce(z);return z}function bV(t){while(t.t<=this.mt2){t[t.t++]=0}for(var L=0;L<this.m.t;++L){var z=t[L]&32767;var bW=(z*this.mpl+(((z*this.mph+(t[L]>>15)*this.mpl)&this.um)<<15))&t.DM;z=L+this.m.t;t[z]+=this.m.am(0,bW,t,L,0,this.m.t);while(t[z]>=t.DV){t[z]-=t.DV;t[++z]++}}t.clamp();t.drShiftTo(this.m.t,t);if(t.compareTo(this.m)>=0){t.subTo(this.m,t)}}function ac(t,z){t.squareTo(z);this.reduce(z)}function bz(t,L,z){t.multiplyTo(L,z);this.reduce(z)}K.prototype.convert=by;K.prototype.revert=bl;K.prototype.reduce=bV;K.prototype.mulTo=bz;K.prototype.sqrTo=ac;function ad(){return((this.t>0)?(this[0]&1):this.s)==0}function am(b0,b1){if(b0>4294967295||b0<1){return bf.ONE}var bZ=bm(),L=bm(),bY=b1.convert(this),bX=q(b0)-1;bY.copyTo(bZ);while(--bX>=0){b1.sqrTo(bZ,L);if((b0&(1<<bX))>0){b1.mulTo(L,bY,bZ)}else{var bW=bZ;bZ=L;L=bW}}return b1.revert(bZ)}function aG(L,t){var bW;if(L<256||t.isEven()){bW=new aT(t)}else{bW=new K(t)}return this.exp(L,bW)}bf.prototype.copyTo=d;bf.prototype.fromInt=h;bf.prototype.fromString=bI;bf.prototype.clamp=bA;bf.prototype.dlShiftTo=bv;bf.prototype.drShiftTo=a2;bf.prototype.lShiftTo=s;bf.prototype.rShiftTo=bT;bf.prototype.subTo=bs;bf.prototype.multiplyTo=bJ;bf.prototype.squareTo=au;bf.prototype.divRemTo=a9;bf.prototype.invDigit=ab;bf.prototype.isEven=ad;bf.prototype.exp=am;bf.prototype.toString=u;bf.prototype.negate=bC;bf.prototype.abs=bB;bf.prototype.compareTo=bN;bf.prototype.bitLength=bt;bf.prototype.mod=bh;bf.prototype.modPowInt=aG;bf.ZERO=bi(0);bf.ONE=bi(1);function f(){var t=bm();this.copyTo(t);return t}function b(){if(this.s<0){if(this.t==1){return this[0]-this.DV}else{if(this.t==0){return -1}}}else{if(this.t==1){return this[0]}else{if(this.t==0){return 0}}}return((this[1]&((1<<(32-this.DB))-1))<<this.DB)|this[0]}function bF(){return(this.t==0)?this.s:(this[0]<<24)>>24}function ag(){return(this.t==0)?this.s:(this[0]<<16)>>16}function aU(t){return Math.floor(Math.LN2*this.DB/Math.log(t))}function aZ(){if(this.s<0){return -1}else{if(this.t<=0||(this.t==1&&this[0]<=0)){return 0}else{return 1}}}function I(t){if(t==null){t=10}if(this.signum()==0||t<2||t>36){return"0"}var bW=this.chunkSize(t);var L=Math.pow(t,bW);var bZ=bi(L),b0=bm(),bY=bm(),bX="";this.divRemTo(bZ,b0,bY);while(b0.signum()>0){bX=(L+bY.intValue()).toString(t).substr(1)+bX;b0.divRemTo(bZ,b0,bY)}return bY.intValue().toString(t)+bX}function av(b1,bY){this.fromInt(0);if(bY==null){bY=10}var bW=this.chunkSize(bY);var bX=Math.pow(bY,bW),L=false,t=0,b0=0;for(var z=0;z<b1.length;++z){var bZ=aX(b1,z);if(bZ<0){if(b1.charAt(z)=="-"&&this.signum()==0){L=true}continue}b0=bY*b0+bZ;if(++t>=bW){this.dMultiply(bX);this.dAddOffset(b0,0);t=0;b0=0}}if(t>0){this.dMultiply(Math.pow(bY,t));this.dAddOffset(b0,0)}if(L){bf.ZERO.subTo(this,this)}}function aP(bW,L,bY){if("number"==typeof L){if(bW<2){this.fromInt(1)}else{this.fromNumber(bW,bY);if(!this.testBit(bW-1)){this.bitwiseTo(bf.ONE.shiftLeft(bW-1),ak,this)}if(this.isEven()){this.dAddOffset(1,0)}while(!this.isProbablePrime(L)){this.dAddOffset(2,0);if(this.bitLength()>bW){this.subTo(bf.ONE.shiftLeft(bW-1),this)}}}}else{var z=new Array(),bX=bW&7;z.length=(bW>>3)+1;L.nextBytes(z);if(bX>0){z[0]&=((1<<bX)-1)}else{z[0]=0}this.fromString(z,256)}}function aK(){var z=this.t,L=new Array();L[0]=this.s;var bW=this.DB-(z*this.DB)%8,bX,t=0;if(z-->0){if(bW<this.DB&&(bX=this[z]>>bW)!=(this.s&this.DM)>>bW){L[t++]=bX|(this.s<<(this.DB-bW))}while(z>=0){if(bW<8){bX=(this[z]&((1<<bW)-1))<<(8-bW);bX|=this[--z]>>(bW+=this.DB-8)}else{bX=(this[z]>>(bW-=8))&255;if(bW<=0){bW+=this.DB;--z}}if((bX&128)!=0){bX|=-256}if(t==0&&(this.s&128)!=(bX&128)){++t}if(t>0||bX!=this.s){L[t++]=bX}}}return L}function bG(t){return(this.compareTo(t)==0)}function W(t){return(this.compareTo(t)<0)?this:t}function bu(t){return(this.compareTo(t)>0)?this:t}function aJ(z,bY,bW){var L,bX,t=Math.min(z.t,this.t);for(L=0;L<t;++L){bW[L]=bY(this[L],z[L])}if(z.t<this.t){bX=z.s&this.DM;for(L=t;L<this.t;++L){bW[L]=bY(this[L],bX)}bW.t=this.t}else{bX=this.s&this.DM;for(L=t;L<z.t;++L){bW[L]=bY(bX,z[L])}bW.t=z.t}bW.s=bY(this.s,z.s);bW.clamp()}function o(t,z){return t&z}function bO(t){var z=bm();this.bitwiseTo(t,o,z);return z}function ak(t,z){return t|z}function aS(t){var z=bm();this.bitwiseTo(t,ak,z);return z}function aa(t,z){return t^z}function B(t){var z=bm();this.bitwiseTo(t,aa,z);return z}function i(t,z){return t&~z}function aD(t){var z=bm();this.bitwiseTo(t,i,z);return z}function T(){var z=bm();for(var t=0;t<this.t;++t){z[t]=this.DM&~this[t]}z.t=this.t;z.s=~this.s;return z}function aN(z){var t=bm();if(z<0){this.rShiftTo(-z,t)}else{this.lShiftTo(z,t)}return t}function R(z){var t=bm();if(z<0){this.lShiftTo(-z,t)}else{this.rShiftTo(z,t)}return t}function bc(t){if(t==0){return -1}var z=0;if((t&65535)==0){t>>=16;z+=16}if((t&255)==0){t>>=8;z+=8}if((t&15)==0){t>>=4;z+=4}if((t&3)==0){t>>=2;z+=2}if((t&1)==0){++z}return z}function aq(){for(var t=0;t<this.t;++t){if(this[t]!=0){return t*this.DB+bc(this[t])}}if(this.s<0){return this.t*this.DB}return -1}function bj(t){var z=0;while(t!=0){t&=t-1;++z}return z}function ao(){var L=0,t=this.s&this.DM;for(var z=0;z<this.t;++z){L+=bj(this[z]^t)}return L}function aL(z){var t=Math.floor(z/this.DB);if(t>=this.t){return(this.s!=0)}return((this[t]&(1<<(z%this.DB)))!=0)}function U(L,z){var t=bf.ONE.shiftLeft(L);this.bitwiseTo(t,z,t);return t}function a1(t){return this.changeBit(t,ak)}function ah(t){return this.changeBit(t,i)}function aO(t){return this.changeBit(t,aa)}function S(z,bW){var L=0,bX=0,t=Math.min(z.t,this.t);while(L<t){bX+=this[L]+z[L];bW[L++]=bX&this.DM;bX>>=this.DB}if(z.t<this.t){bX+=z.s;while(L<this.t){bX+=this[L];bW[L++]=bX&this.DM;bX>>=this.DB}bX+=this.s}else{bX+=this.s;while(L<z.t){bX+=z[L];bW[L++]=bX&this.DM;bX>>=this.DB}bX+=z.s}bW.s=(bX<0)?-1:0;if(bX>0){bW[L++]=bX}else{if(bX<-1){bW[L++]=this.DV+bX}}bW.t=L;bW.clamp()}function bg(t){var z=bm();this.addTo(t,z);return z}function aA(t){var z=bm();this.subTo(t,z);return z}function bH(t){var z=bm();this.multiplyTo(t,z);return z}function bU(){var t=bm();this.squareTo(t);return t}function bd(t){var z=bm();this.divRemTo(t,z,null);return z}function bP(t){var z=bm();this.divRemTo(t,null,z);return z}function bk(t){var L=bm(),z=bm();this.divRemTo(t,L,z);return new Array(L,z)}function e(t){this[this.t]=this.am(0,t-1,this,0,0,this.t);++this.t;this.clamp()}function aR(z,t){if(z==0){return}while(this.t<=t){this[this.t++]=0}this[t]+=z;while(this[t]>=this.DV){this[t]-=this.DV;if(++t>=this.t){this[this.t++]=0}++this[t]}}function Z(){}function bw(t){return t}function bK(t,L,z){t.multiplyTo(L,z)}function ai(t,z){t.squareTo(z)}Z.prototype.convert=bw;Z.prototype.revert=bw;Z.prototype.mulTo=bK;Z.prototype.sqrTo=ai;function Q(t){return this.exp(t,new Z())}function aQ(t,bX,bW){var L=Math.min(this.t+t.t,bX);bW.s=0;bW.t=L;while(L>0){bW[--L]=0}var z;for(z=bW.t-this.t;L<z;++L){bW[L+this.t]=this.am(0,t[L],bW,L,0,this.t)}for(z=Math.min(t.t,bX);L<z;++L){this.am(0,t[L],bW,L,0,bX-L)}bW.clamp()}function a0(t,bW,L){--bW;var z=L.t=this.t+t.t-bW;L.s=0;while(--z>=0){L[z]=0}for(z=Math.max(bW-this.t,0);z<t.t;++z){L[this.t+z-bW]=this.am(bW-z,t[z],L,0,0,this.t+z-bW)}L.clamp();L.drShiftTo(1,L)}function bR(t){this.r2=bm();this.q3=bm();bf.ONE.dlShiftTo(2*t.t,this.r2);this.mu=this.r2.divide(t);this.m=t}function H(t){if(t.s<0||t.t>2*this.m.t){return t.mod(this.m)}else{if(t.compareTo(this.m)<0){return t}else{var z=bm();t.copyTo(z);this.reduce(z);return z}}}function bM(t){return t}function D(t){t.drShiftTo(this.m.t-1,this.r2);if(t.t>this.m.t+1){t.t=this.m.t+1;t.clamp()}this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);while(t.compareTo(this.r2)<0){t.dAddOffset(1,this.m.t+1)}t.subTo(this.r2,t);while(t.compareTo(this.m)>=0){t.subTo(this.m,t)}}function aM(t,z){t.squareTo(z);this.reduce(z)}function x(t,L,z){t.multiplyTo(L,z);this.reduce(z)}bR.prototype.convert=H;bR.prototype.revert=bM;bR.prototype.reduce=D;bR.prototype.mulTo=x;bR.prototype.sqrTo=aM;function N(b4,bZ){var b2=b4.bitLength(),b0,bW=bi(1),b7;if(b2<=0){return bW}else{if(b2<18){b0=1}else{if(b2<48){b0=3}else{if(b2<144){b0=4}else{if(b2<768){b0=5}else{b0=6}}}}}if(b2<8){b7=new aT(bZ)}else{if(bZ.isEven()){b7=new bR(bZ)}else{b7=new K(bZ)}}var b3=new Array(),bY=3,b5=b0-1,L=(1<<b0)-1;b3[1]=b7.convert(this);if(b0>1){var ca=bm();b7.sqrTo(b3[1],ca);while(bY<=L){b3[bY]=bm();b7.mulTo(ca,b3[bY-2],b3[bY]);bY+=2}}var b1=b4.t-1,b8,b6=true,bX=bm(),b9;b2=q(b4[b1])-1;while(b1>=0){if(b2>=b5){b8=(b4[b1]>>(b2-b5))&L}else{b8=(b4[b1]&((1<<(b2+1))-1))<<(b5-b2);if(b1>0){b8|=b4[b1-1]>>(this.DB+b2-b5)}}bY=b0;while((b8&1)==0){b8>>=1;--bY}if((b2-=bY)<0){b2+=this.DB;--b1}if(b6){b3[b8].copyTo(bW);b6=false}else{while(bY>1){b7.sqrTo(bW,bX);b7.sqrTo(bX,bW);bY-=2}if(bY>0){b7.sqrTo(bW,bX)}else{b9=bW;bW=bX;bX=b9}b7.mulTo(bX,b3[b8],bW)}while(b1>=0&&(b4[b1]&(1<<b2))==0){b7.sqrTo(bW,bX);b9=bW;bW=bX;bX=b9;if(--b2<0){b2=this.DB-1;--b1}}}return b7.revert(bW)}function aB(L){var z=(this.s<0)?this.negate():this.clone();var bZ=(L.s<0)?L.negate():L.clone();if(z.compareTo(bZ)<0){var bX=z;z=bZ;bZ=bX}var bW=z.getLowestSetBit(),bY=bZ.getLowestSetBit();if(bY<0){return z}if(bW<bY){bY=bW}if(bY>0){z.rShiftTo(bY,z);bZ.rShiftTo(bY,bZ)}while(z.signum()>0){if((bW=z.getLowestSetBit())>0){z.rShiftTo(bW,z)}if((bW=bZ.getLowestSetBit())>0){bZ.rShiftTo(bW,bZ)}if(z.compareTo(bZ)>=0){z.subTo(bZ,z);z.rShiftTo(1,z)}else{bZ.subTo(z,bZ);bZ.rShiftTo(1,bZ)}}if(bY>0){bZ.lShiftTo(bY,bZ)}return bZ}function aj(bW){if(bW<=0){return 0}var L=this.DV%bW,z=(this.s<0)?bW-1:0;if(this.t>0){if(L==0){z=this[0]%bW}else{for(var t=this.t-1;t>=0;--t){z=(L*z+this[t])%bW}}}return z}function bS(z){var bY=z.isEven();if((this.isEven()&&bY)||z.signum()==0){return bf.ZERO}var bX=z.clone(),bW=this.clone();var L=bi(1),t=bi(0),b0=bi(0),bZ=bi(1);while(bX.signum()!=0){while(bX.isEven()){bX.rShiftTo(1,bX);if(bY){if(!L.isEven()||!t.isEven()){L.addTo(this,L);t.subTo(z,t)}L.rShiftTo(1,L)}else{if(!t.isEven()){t.subTo(z,t)}}t.rShiftTo(1,t)}while(bW.isEven()){bW.rShiftTo(1,bW);if(bY){if(!b0.isEven()||!bZ.isEven()){b0.addTo(this,b0);bZ.subTo(z,bZ)}b0.rShiftTo(1,b0)}else{if(!bZ.isEven()){bZ.subTo(z,bZ)}}bZ.rShiftTo(1,bZ)}if(bX.compareTo(bW)>=0){bX.subTo(bW,bX);if(bY){L.subTo(b0,L)}t.subTo(bZ,t)}else{bW.subTo(bX,bW);if(bY){b0.subTo(L,b0)}bZ.subTo(t,bZ)}}if(bW.compareTo(bf.ONE)!=0){return bf.ZERO}if(bZ.compareTo(z)>=0){return bZ.subtract(z)}if(bZ.signum()<0){bZ.addTo(z,bZ)}else{return bZ}if(bZ.signum()<0){return bZ.add(z)}else{return bZ}}var az=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997];var k=(1<<26)/az[az.length-1];function bL(bY){var bX,L=this.abs();if(L.t==1&&L[0]<=az[az.length-1]){for(bX=0;bX<az.length;++bX){if(L[0]==az[bX]){return true}}return false}if(L.isEven()){return false}bX=1;while(bX<az.length){var z=az[bX],bW=bX+1;while(bW<az.length&&z<k){z*=az[bW++]}z=L.modInt(z);while(bX<bW){if(z%az[bX++]==0){return false}}}return L.millerRabin(bY)}function aE(bY){var bZ=this.subtract(bf.ONE);var L=bZ.getLowestSetBit();if(L<=0){return false}var b0=bZ.shiftRight(L);bY=(bY+1)>>1;if(bY>az.length){bY=az.length}var z=bm();for(var bX=0;bX<bY;++bX){z.fromInt(az[Math.floor(Math.random()*az.length)]);var b1=z.modPow(b0,this);if(b1.compareTo(bf.ONE)!=0&&b1.compareTo(bZ)!=0){var bW=1;while(bW++<L&&b1.compareTo(bZ)!=0){b1=b1.modPowInt(2,this);if(b1.compareTo(bf.ONE)==0){return false}}if(b1.compareTo(bZ)!=0){return false}}}return true}bf.prototype.chunkSize=aU;bf.prototype.toRadix=I;bf.prototype.fromRadix=av;bf.prototype.fromNumber=aP;bf.prototype.bitwiseTo=aJ;bf.prototype.changeBit=U;bf.prototype.addTo=S;bf.prototype.dMultiply=e;bf.prototype.dAddOffset=aR;bf.prototype.multiplyLowerTo=aQ;bf.prototype.multiplyUpperTo=a0;bf.prototype.modInt=aj;bf.prototype.millerRabin=aE;bf.prototype.clone=f;bf.prototype.intValue=b;bf.prototype.byteValue=bF;bf.prototype.shortValue=ag;bf.prototype.signum=aZ;bf.prototype.toByteArray=aK;bf.prototype.equals=bG;bf.prototype.min=W;bf.prototype.max=bu;bf.prototype.and=bO;bf.prototype.or=aS;bf.prototype.xor=B;bf.prototype.andNot=aD;bf.prototype.not=T;bf.prototype.shiftLeft=aN;bf.prototype.shiftRight=R;bf.prototype.getLowestSetBit=aq;bf.prototype.bitCount=ao;bf.prototype.testBit=aL;bf.prototype.setBit=a1;bf.prototype.clearBit=ah;bf.prototype.flipBit=aO;bf.prototype.add=bg;bf.prototype.subtract=aA;bf.prototype.multiply=bH;bf.prototype.divide=bd;bf.prototype.remainder=bP;bf.prototype.divideAndRemainder=bk;bf.prototype.modPow=N;bf.prototype.modInverse=bS;bf.prototype.pow=Q;bf.prototype.gcd=aB;bf.prototype.isProbablePrime=bL;bf.prototype.square=bU;function bp(){this.i=0;this.j=0;this.S=new Array()}function af(bX){var bW,z,L;for(bW=0;bW<256;++bW){this.S[bW]=bW}z=0;for(bW=0;bW<256;++bW){z=(z+this.S[bW]+bX[bW%bX.length])&255;L=this.S[bW];this.S[bW]=this.S[z];this.S[z]=L}this.i=0;this.j=0}function be(){var z;this.i=(this.i+1)&255;this.j=(this.j+this.S[this.i])&255;z=this.S[this.i];this.S[this.i]=this.S[this.j];this.S[this.j]=z;return this.S[(z+this.S[this.i])&255]}bp.prototype.init=af;bp.prototype.next=be;function P(){return new bp()}var y=256;var j;var l;var C;if(l==null){l=new Array();C=0;var ba;if(window.crypto&&window.crypto.getRandomValues){var a8=new Uint32Array(256);window.crypto.getRandomValues(a8);for(ba=0;ba<a8.length;++ba){l[C++]=a8[ba]&255}}var F=function(z){this.count=this.count||0;if(this.count>=256||C>=y){if(window.removeEventListener){window.removeEventListener("mousemove",F)}else{if(window.detachEvent){window.detachEvent("onmousemove",F)}}return}this.count+=1;var t=z.x+z.y;l[C++]=t&255};if(window.addEventListener){window.addEventListener("mousemove",F)}else{if(window.attachEvent){window.attachEvent("onmousemove",F)}}}function bb(){if(j==null){j=P();while(C<y){var t=Math.floor(65536*Math.random());l[C++]=t&255}j.init(l);for(C=0;C<l.length;++C){l[C]=0}C=0}return j.next()}function aY(z){var t;for(t=0;t<z.length;++t){z[t]=bb()}}function G(){}G.prototype.nextBytes=aY;function w(z,t){return new bf(z,t)}function m(L,bW){var t="";var z=0;while(z+bW<L.length){t+=L.substring(z,z+bW)+"\n";z+=bW}return t+L.substring(z,L.length)}function br(t){if(t<16){return"0"+t.toString(16)}else{return t.toString(16)}}function bD(bW,bZ){if(bZ<bW.length+11){console.error("Message too long for RSA");return null}var bY=new Array();var L=bW.length-1;while(L>=0&&bZ>0){var bX=bW.charCodeAt(L--);if(bX<128){bY[--bZ]=bX}else{if((bX>127)&&(bX<2048)){bY[--bZ]=(bX&63)|128;bY[--bZ]=(bX>>6)|192}else{bY[--bZ]=(bX&63)|128;bY[--bZ]=((bX>>6)&63)|128;bY[--bZ]=(bX>>12)|224}}}bY[--bZ]=0;var z=new G();var t=new Array();while(bZ>2){t[0]=0;while(t[0]==0){z.nextBytes(t)}bY[--bZ]=t[0]}bY[--bZ]=2;bY[--bZ]=0;return new bf(bY)}function A(){this.n=null;this.e=0;this.d=null;this.p=null;this.q=null;this.dmp1=null;this.dmq1=null;this.coeff=null}function an(z,t){if(z!=null&&t!=null&&z.length>0&&t.length>0){this.n=w(z,16);this.e=parseInt(t,16)}else{console.error("Invalid RSA public key")}}function bq(t){return t.modPowInt(this.e,this.n)}function al(L){var t=bD(L,(this.n.bitLength()+7)>>3);if(t==null){return null}var bW=this.doPublic(t);if(bW==null){return null}var z=bW.toString(16);if((z.length&1)==0){return z}else{return"0"+z}}A.prototype.doPublic=bq;A.prototype.setPublic=an;A.prototype.encrypt=al;function bo(bW,bY){var t=bW.toByteArray();var L=0;while(L<t.length&&t[L]==0){++L}if(t.length-L!=bY-1||t[L]!=2){return null}++L;while(t[L]!=0){if(++L>=t.length){return null}}var z="";while(++L<t.length){var bX=t[L]&255;if(bX<128){z+=String.fromCharCode(bX)}else{if((bX>191)&&(bX<224)){z+=String.fromCharCode(((bX&31)<<6)|(t[L+1]&63));++L}else{z+=String.fromCharCode(((bX&15)<<12)|((t[L+1]&63)<<6)|(t[L+2]&63));L+=2}}}return z}function aC(L,t,z){if(L!=null&&t!=null&&L.length>0&&t.length>0){this.n=w(L,16);this.e=parseInt(t,16);this.d=w(z,16)}else{console.error("Invalid RSA private key")}}function O(bZ,bW,bX,L,z,t,b0,bY){if(bZ!=null&&bW!=null&&bZ.length>0&&bW.length>0){this.n=w(bZ,16);this.e=parseInt(bW,16);this.d=w(bX,16);this.p=w(L,16);this.q=w(z,16);this.dmp1=w(t,16);this.dmq1=w(b0,16);this.coeff=w(bY,16)}else{console.error("Invalid RSA private key")}}function ax(L,b2){var z=new G();var bZ=L>>1;this.e=parseInt(b2,16);var bW=new bf(b2,16);for(;;){for(;;){this.p=new bf(L-bZ,1,z);if(this.p.subtract(bf.ONE).gcd(bW).compareTo(bf.ONE)==0&&this.p.isProbablePrime(10)){break}}for(;;){this.q=new bf(bZ,1,z);if(this.q.subtract(bf.ONE).gcd(bW).compareTo(bf.ONE)==0&&this.q.isProbablePrime(10)){break}}if(this.p.compareTo(this.q)<=0){var b1=this.p;this.p=this.q;this.q=b1}var b0=this.p.subtract(bf.ONE);var bX=this.q.subtract(bf.ONE);var bY=b0.multiply(bX);if(bY.gcd(bW).compareTo(bf.ONE)==0){this.n=this.p.multiply(this.q);this.d=bW.modInverse(bY);this.dmp1=this.d.mod(b0);this.dmq1=this.d.mod(bX);this.coeff=this.q.modInverse(this.p);break}}}function ay(t){if(this.p==null||this.q==null){return t.modPow(this.d,this.n)}var L=t.mod(this.p).modPow(this.dmp1,this.p);var z=t.mod(this.q).modPow(this.dmq1,this.q);while(L.compareTo(z)<0){L=L.add(this.p)}return L.subtract(z).multiply(this.coeff).mod(this.p).multiply(this.q).add(z)}function r(z){var L=w(z,16);var t=this.doPrivate(L);if(t==null){return null}return bo(t,(this.n.bitLength()+7)>>3)}A.prototype.doPrivate=ay;A.prototype.setPrivate=aC;A.prototype.setPrivateEx=O;A.prototype.generate=ax;A.prototype.decrypt=r;(function(){var z=function(b3,b1,b2){var bZ=new G();var bW=b3>>1;this.e=parseInt(b1,16);var bY=new bf(b1,16);var b0=this;var bX=function(){var b5=function(){if(b0.p.compareTo(b0.q)<=0){var b8=b0.p;b0.p=b0.q;b0.q=b8}var ca=b0.p.subtract(bf.ONE);var b7=b0.q.subtract(bf.ONE);var b9=ca.multiply(b7);if(b9.gcd(bY).compareTo(bf.ONE)==0){b0.n=b0.p.multiply(b0.q);b0.d=bY.modInverse(b9);b0.dmp1=b0.d.mod(ca);b0.dmq1=b0.d.mod(b7);b0.coeff=b0.q.modInverse(b0.p);setTimeout(function(){b2()},0)}else{setTimeout(bX,0)}};var b6=function(){b0.q=bm();b0.q.fromNumberAsync(bW,1,bZ,function(){b0.q.subtract(bf.ONE).gcda(bY,function(b7){if(b7.compareTo(bf.ONE)==0&&b0.q.isProbablePrime(10)){setTimeout(b5,0)}else{setTimeout(b6,0)}})})};var b4=function(){b0.p=bm();b0.p.fromNumberAsync(b3-bW,1,bZ,function(){b0.p.subtract(bf.ONE).gcda(bY,function(b7){if(b7.compareTo(bf.ONE)==0&&b0.p.isProbablePrime(10)){setTimeout(b6,0)}else{setTimeout(b4,0)}})})};setTimeout(b4,0)};setTimeout(bX,0)};A.prototype.generateAsync=z;var t=function(bX,b3){var bW=(this.s<0)?this.negate():this.clone();var b2=(bX.s<0)?bX.negate():bX.clone();if(bW.compareTo(b2)<0){var bZ=bW;bW=b2;b2=bZ}var bY=bW.getLowestSetBit(),b0=b2.getLowestSetBit();if(b0<0){b3(bW);return}if(bY<b0){b0=bY}if(b0>0){bW.rShiftTo(b0,bW);b2.rShiftTo(b0,b2)}var b1=function(){if((bY=bW.getLowestSetBit())>0){bW.rShiftTo(bY,bW)}if((bY=b2.getLowestSetBit())>0){b2.rShiftTo(bY,b2)}if(bW.compareTo(b2)>=0){bW.subTo(b2,bW);bW.rShiftTo(1,bW)}else{b2.subTo(bW,b2);b2.rShiftTo(1,b2)}if(!(bW.signum()>0)){if(b0>0){b2.lShiftTo(b0,b2)}setTimeout(function(){b3(b2)},0)}else{setTimeout(b1,0)}};setTimeout(b1,10)};bf.prototype.gcda=t;var L=function(b0,bX,b3,b2){if("number"==typeof bX){if(b0<2){this.fromInt(1)}else{this.fromNumber(b0,b3);if(!this.testBit(b0-1)){this.bitwiseTo(bf.ONE.shiftLeft(b0-1),ak,this)}if(this.isEven()){this.dAddOffset(1,0)}var bZ=this;var bY=function(){bZ.dAddOffset(2,0);if(bZ.bitLength()>b0){bZ.subTo(bf.ONE.shiftLeft(b0-1),bZ)}if(bZ.isProbablePrime(bX)){setTimeout(function(){b2()},0)}else{setTimeout(bY,0)}};setTimeout(bY,0)}}else{var bW=new Array(),b1=b0&7;bW.length=(b0>>3)+1;bX.nextBytes(bW);if(b1>0){bW[0]&=((1<<b1)-1)}else{bW[0]=0}this.fromString(bW,256)}};bf.prototype.fromNumberAsync=L})();var a4="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";var J="=";function ae(L){var z;var bW;var t="";for(z=0;z+3<=L.length;z+=3){bW=parseInt(L.substring(z,z+3),16);t+=a4.charAt(bW>>6)+a4.charAt(bW&63)}if(z+1==L.length){bW=parseInt(L.substring(z,z+1),16);t+=a4.charAt(bW<<2)}else{if(z+2==L.length){bW=parseInt(L.substring(z,z+2),16);t+=a4.charAt(bW>>2)+a4.charAt((bW&3)<<4)}}while((t.length&3)>0){t+=J}return t}function aW(bX){var L="";var bW;var t=0;var z;for(bW=0;bW<bX.length;++bW){if(bX.charAt(bW)==J){break}v=a4.indexOf(bX.charAt(bW));if(v<0){continue}if(t==0){L+=Y(v>>2);z=v&3;t=1}else{if(t==1){L+=Y((z<<2)|(v>>4));z=v&15;t=2}else{if(t==2){L+=Y(z);L+=Y(v>>2);z=v&3;t=3}else{L+=Y((z<<2)|(v>>4));L+=Y(v&15);t=0}}}}if(t==1){L+=Y(z<<2)}return L}function M(bW){var L=aW(bW);var z;var t=new Array();for(z=0;2*z<L.length;++z){t[z]=parseInt(L.substring(2*z,2*z+2),16)}return t}
/*! asn1-1.0.2.js (c) 2013 Kenji Urushima | kjur.github.com/jsrsasign/license
 */
var at=at||{};at.env=at.env||{};var bn=at,aw=Object.prototype,ar="[object Function]",X=["toString","valueOf"];at.env.parseUA=function(bW){var bX=function(b1){var b2=0;return parseFloat(b1.replace(/\./g,function(){return(b2++==1)?"":"."}))},b0=navigator,bZ={ie:0,opera:0,gecko:0,webkit:0,chrome:0,mobile:null,air:0,ipad:0,iphone:0,ipod:0,ios:null,android:0,webos:0,caja:b0&&b0.cajaVersion,secure:false,os:null},L=bW||(navigator&&navigator.userAgent),bY=window&&window.location,z=bY&&bY.href,t;bZ.secure=z&&(z.toLowerCase().indexOf("https")===0);if(L){if((/windows|win32/i).test(L)){bZ.os="windows"}else{if((/macintosh/i).test(L)){bZ.os="macintosh"}else{if((/rhino/i).test(L)){bZ.os="rhino"}}}if((/KHTML/).test(L)){bZ.webkit=1}t=L.match(/AppleWebKit\/([^\s]*)/);if(t&&t[1]){bZ.webkit=bX(t[1]);if(/ Mobile\//.test(L)){bZ.mobile="Apple";t=L.match(/OS ([^\s]*)/);if(t&&t[1]){t=bX(t[1].replace("_","."))}bZ.ios=t;bZ.ipad=bZ.ipod=bZ.iphone=0;t=L.match(/iPad|iPod|iPhone/);if(t&&t[0]){bZ[t[0].toLowerCase()]=bZ.ios}}else{t=L.match(/NokiaN[^\/]*|Android \d\.\d|webOS\/\d\.\d/);if(t){bZ.mobile=t[0]}if(/webOS/.test(L)){bZ.mobile="WebOS";t=L.match(/webOS\/([^\s]*);/);if(t&&t[1]){bZ.webos=bX(t[1])}}if(/ Android/.test(L)){bZ.mobile="Android";t=L.match(/Android ([^\s]*);/);if(t&&t[1]){bZ.android=bX(t[1])}}}t=L.match(/Chrome\/([^\s]*)/);if(t&&t[1]){bZ.chrome=bX(t[1])}else{t=L.match(/AdobeAIR\/([^\s]*)/);if(t){bZ.air=t[0]}}}if(!bZ.webkit){t=L.match(/Opera[\s\/]([^\s]*)/);if(t&&t[1]){bZ.opera=bX(t[1]);t=L.match(/Version\/([^\s]*)/);if(t&&t[1]){bZ.opera=bX(t[1])}t=L.match(/Opera Mini[^;]*/);if(t){bZ.mobile=t[0]}}else{t=L.match(/MSIE\s([^;]*)/);if(t&&t[1]){bZ.ie=bX(t[1])}else{t=L.match(/Gecko\/([^\s]*)/);if(t){bZ.gecko=1;t=L.match(/rv:([^\s\)]*)/);if(t&&t[1]){bZ.gecko=bX(t[1])}}}}}}return bZ};at.env.ua=at.env.parseUA();at.isFunction=function(t){return(typeof t==="function")||aw.toString.apply(t)===ar};at._IEEnumFix=(at.env.ua.ie)?function(L,z){var t,bX,bW;for(t=0;t<X.length;t=t+1){bX=X[t];bW=z[bX];if(bn.isFunction(bW)&&bW!=aw[bX]){L[bX]=bW}}}:function(){};at.extend=function(bW,bX,L){if(!bX||!bW){throw new Error("extend failed, please check that all dependencies are included.")}var z=function(){},t;z.prototype=bX.prototype;bW.prototype=new z();bW.prototype.constructor=bW;bW.superclass=bX.prototype;if(bX.prototype.constructor==aw.constructor){bX.prototype.constructor=bX}if(L){for(t in L){if(bn.hasOwnProperty(L,t)){bW.prototype[t]=L[t]}}bn._IEEnumFix(bW.prototype,L)}};if(typeof KJUR=="undefined"||!KJUR){KJUR={}}if(typeof KJUR.asn1=="undefined"||!KJUR.asn1){KJUR.asn1={}}KJUR.asn1.ASN1Util=new function(){this.integerToByteHex=function(t){var z=t.toString(16);if((z.length%2)==1){z="0"+z}return z};this.bigIntToMinTwosComplementsHex=function(b0){var bY=b0.toString(16);if(bY.substr(0,1)!="-"){if(bY.length%2==1){bY="0"+bY}else{if(!bY.match(/^[0-7]/)){bY="00"+bY}}}else{var t=bY.substr(1);var bX=t.length;if(bX%2==1){bX+=1}else{if(!bY.match(/^[0-7]/)){bX+=2}}var bZ="";for(var bW=0;bW<bX;bW++){bZ+="f"}var L=new bf(bZ,16);var z=L.xor(b0).add(bf.ONE);bY=z.toString(16).replace(/^-/,"")}return bY};this.getPEMStringFromHex=function(t,z){var bX=CryptoJS.enc.Hex.parse(t);var L=CryptoJS.enc.Base64.stringify(bX);var bW=L.replace(/(.{64})/g,"$1\r\n");bW=bW.replace(/\r\n$/,"");return"-----BEGIN "+z+"-----\r\n"+bW+"\r\n-----END "+z+"-----\r\n"}};KJUR.asn1.ASN1Object=function(){var L=true;var z=null;var bW="00";var bX="00";var t="";this.getLengthHexFromValue=function(){if(typeof this.hV=="undefined"||this.hV==null){throw"this.hV is null or undefined."}if(this.hV.length%2==1){throw"value hex must be even length: n="+t.length+",v="+this.hV}var b1=this.hV.length/2;var b0=b1.toString(16);if(b0.length%2==1){b0="0"+b0}if(b1<128){return b0}else{var bZ=b0.length/2;if(bZ>15){throw"ASN.1 length too long to represent by 8x: n = "+b1.toString(16)}var bY=128+bZ;return bY.toString(16)+b0}};this.getEncodedHex=function(){if(this.hTLV==null||this.isModified){this.hV=this.getFreshValueHex();this.hL=this.getLengthHexFromValue();this.hTLV=this.hT+this.hL+this.hV;this.isModified=false}return this.hTLV};this.getValueHex=function(){this.getEncodedHex();return this.hV};this.getFreshValueHex=function(){return""}};KJUR.asn1.DERAbstractString=function(L){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);var z=null;var t=null;this.getString=function(){return this.s};this.setString=function(bW){this.hTLV=null;this.isModified=true;this.s=bW;this.hV=stohex(this.s)};this.setStringHex=function(bW){this.hTLV=null;this.isModified=true;this.s=null;this.hV=bW};this.getFreshValueHex=function(){return this.hV};if(typeof L!="undefined"){if(typeof L.str!="undefined"){this.setString(L.str)}else{if(typeof L.hex!="undefined"){this.setStringHex(L.hex)}}}};at.extend(KJUR.asn1.DERAbstractString,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractTime=function(L){KJUR.asn1.DERAbstractTime.superclass.constructor.call(this);var z=null;var t=null;this.localDateToUTC=function(bX){utc=bX.getTime()+(bX.getTimezoneOffset()*60000);var bW=new Date(utc);return bW};this.formatDate=function(b1,b3){var bW=this.zeroPadding;var b2=this.localDateToUTC(b1);var b4=String(b2.getFullYear());if(b3=="utc"){b4=b4.substr(2,2)}var b0=bW(String(b2.getMonth()+1),2);var b5=bW(String(b2.getDate()),2);var bX=bW(String(b2.getHours()),2);var bY=bW(String(b2.getMinutes()),2);var bZ=bW(String(b2.getSeconds()),2);return b4+b0+b5+bX+bY+bZ+"Z"};this.zeroPadding=function(bX,bW){if(bX.length>=bW){return bX}return new Array(bW-bX.length+1).join("0")+bX};this.getString=function(){return this.s};this.setString=function(bW){this.hTLV=null;this.isModified=true;this.s=bW;this.hV=stohex(this.s)};this.setByDateValue=function(b0,b2,bX,bW,bY,bZ){var b1=new Date(Date.UTC(b0,b2-1,bX,bW,bY,bZ,0));this.setByDate(b1)};this.getFreshValueHex=function(){return this.hV}};at.extend(KJUR.asn1.DERAbstractTime,KJUR.asn1.ASN1Object);KJUR.asn1.DERAbstractStructured=function(z){KJUR.asn1.DERAbstractString.superclass.constructor.call(this);var t=null;this.setByASN1ObjectArray=function(L){this.hTLV=null;this.isModified=true;this.asn1Array=L};this.appendASN1Object=function(L){this.hTLV=null;this.isModified=true;this.asn1Array.push(L)};this.asn1Array=new Array();if(typeof z!="undefined"){if(typeof z.array!="undefined"){this.asn1Array=z.array}}};at.extend(KJUR.asn1.DERAbstractStructured,KJUR.asn1.ASN1Object);KJUR.asn1.DERBoolean=function(){KJUR.asn1.DERBoolean.superclass.constructor.call(this);this.hT="01";this.hTLV="0101ff"};at.extend(KJUR.asn1.DERBoolean,KJUR.asn1.ASN1Object);KJUR.asn1.DERInteger=function(t){KJUR.asn1.DERInteger.superclass.constructor.call(this);this.hT="02";this.setByBigInteger=function(z){this.hTLV=null;this.isModified=true;this.hV=KJUR.asn1.ASN1Util.bigIntToMinTwosComplementsHex(z)};this.setByInteger=function(L){var z=new bf(String(L),10);this.setByBigInteger(z)};this.setValueHex=function(z){this.hV=z};this.getFreshValueHex=function(){return this.hV};if(typeof t!="undefined"){if(typeof t.bigint!="undefined"){this.setByBigInteger(t.bigint)}else{if(typeof t["int"]!="undefined"){this.setByInteger(t["int"])}else{if(typeof t.hex!="undefined"){this.setValueHex(t.hex)}}}}};at.extend(KJUR.asn1.DERInteger,KJUR.asn1.ASN1Object);KJUR.asn1.DERBitString=function(t){KJUR.asn1.DERBitString.superclass.constructor.call(this);this.hT="03";this.setHexValueIncludingUnusedBits=function(z){this.hTLV=null;this.isModified=true;this.hV=z};this.setUnusedBitsAndHexValue=function(z,bW){if(z<0||7<z){throw"unused bits shall be from 0 to 7: u = "+z}var L="0"+z;this.hTLV=null;this.isModified=true;this.hV=L+bW};this.setByBinaryString=function(bW){bW=bW.replace(/0+$/,"");var bX=8-bW.length%8;if(bX==8){bX=0}for(var bY=0;bY<=bX;bY++){bW+="0"}var bZ="";for(var bY=0;bY<bW.length-1;bY+=8){var L=bW.substr(bY,8);var z=parseInt(L,2).toString(16);if(z.length==1){z="0"+z}bZ+=z}this.hTLV=null;this.isModified=true;this.hV="0"+bX+bZ};this.setByBooleanArray=function(bW){var L="";for(var z=0;z<bW.length;z++){if(bW[z]==true){L+="1"}else{L+="0"}}this.setByBinaryString(L)};this.newFalseArray=function(bW){var z=new Array(bW);for(var L=0;L<bW;L++){z[L]=false}return z};this.getFreshValueHex=function(){return this.hV};if(typeof t!="undefined"){if(typeof t.hex!="undefined"){this.setHexValueIncludingUnusedBits(t.hex)}else{if(typeof t.bin!="undefined"){this.setByBinaryString(t.bin)}else{if(typeof t.array!="undefined"){this.setByBooleanArray(t.array)}}}}};at.extend(KJUR.asn1.DERBitString,KJUR.asn1.ASN1Object);KJUR.asn1.DEROctetString=function(t){KJUR.asn1.DEROctetString.superclass.constructor.call(this,t);this.hT="04"};at.extend(KJUR.asn1.DEROctetString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNull=function(){KJUR.asn1.DERNull.superclass.constructor.call(this);this.hT="05";this.hTLV="0500"};at.extend(KJUR.asn1.DERNull,KJUR.asn1.ASN1Object);KJUR.asn1.DERObjectIdentifier=function(L){var z=function(bW){var bX=bW.toString(16);if(bX.length==1){bX="0"+bX}return bX};var t=function(b1){var b0="";var bX=new bf(b1,10);var bW=bX.toString(2);var bY=7-bW.length%7;if(bY==7){bY=0}var b3="";for(var bZ=0;bZ<bY;bZ++){b3+="0"}bW=b3+bW;for(var bZ=0;bZ<bW.length-1;bZ+=7){var b2=bW.substr(bZ,7);if(bZ!=bW.length-7){b2="1"+b2}b0+=z(parseInt(b2,2))}return b0};KJUR.asn1.DERObjectIdentifier.superclass.constructor.call(this);this.hT="06";this.setValueHex=function(bW){this.hTLV=null;this.isModified=true;this.s=null;this.hV=bW};this.setValueOidString=function(bY){if(!bY.match(/^[0-9.]+$/)){throw"malformed oid string: "+bY}var bZ="";var bW=bY.split(".");var b0=parseInt(bW[0])*40+parseInt(bW[1]);bZ+=z(b0);bW.splice(0,2);for(var bX=0;bX<bW.length;bX++){bZ+=t(bW[bX])}this.hTLV=null;this.isModified=true;this.s=null;this.hV=bZ};this.setValueName=function(bX){if(typeof KJUR.asn1.x509.OID.name2oidList[bX]!="undefined"){var bW=KJUR.asn1.x509.OID.name2oidList[bX];this.setValueOidString(bW)}else{throw"DERObjectIdentifier oidName undefined: "+bX}};this.getFreshValueHex=function(){return this.hV};if(typeof L!="undefined"){if(typeof L.oid!="undefined"){this.setValueOidString(L.oid)}else{if(typeof L.hex!="undefined"){this.setValueHex(L.hex)}else{if(typeof L.name!="undefined"){this.setValueName(L.name)}}}}};at.extend(KJUR.asn1.DERObjectIdentifier,KJUR.asn1.ASN1Object);KJUR.asn1.DERUTF8String=function(t){KJUR.asn1.DERUTF8String.superclass.constructor.call(this,t);this.hT="0c"};at.extend(KJUR.asn1.DERUTF8String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERNumericString=function(t){KJUR.asn1.DERNumericString.superclass.constructor.call(this,t);this.hT="12"};at.extend(KJUR.asn1.DERNumericString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERPrintableString=function(t){KJUR.asn1.DERPrintableString.superclass.constructor.call(this,t);this.hT="13"};at.extend(KJUR.asn1.DERPrintableString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERTeletexString=function(t){KJUR.asn1.DERTeletexString.superclass.constructor.call(this,t);this.hT="14"};at.extend(KJUR.asn1.DERTeletexString,KJUR.asn1.DERAbstractString);KJUR.asn1.DERIA5String=function(t){KJUR.asn1.DERIA5String.superclass.constructor.call(this,t);this.hT="16"};at.extend(KJUR.asn1.DERIA5String,KJUR.asn1.DERAbstractString);KJUR.asn1.DERUTCTime=function(t){KJUR.asn1.DERUTCTime.superclass.constructor.call(this,t);this.hT="17";this.setByDate=function(z){this.hTLV=null;this.isModified=true;this.date=z;this.s=this.formatDate(this.date,"utc");this.hV=stohex(this.s)};if(typeof t!="undefined"){if(typeof t.str!="undefined"){this.setString(t.str)}else{if(typeof t.hex!="undefined"){this.setStringHex(t.hex)}else{if(typeof t.date!="undefined"){this.setByDate(t.date)}}}}};at.extend(KJUR.asn1.DERUTCTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERGeneralizedTime=function(t){KJUR.asn1.DERGeneralizedTime.superclass.constructor.call(this,t);this.hT="18";this.setByDate=function(z){this.hTLV=null;this.isModified=true;this.date=z;this.s=this.formatDate(this.date,"gen");this.hV=stohex(this.s)};if(typeof t!="undefined"){if(typeof t.str!="undefined"){this.setString(t.str)}else{if(typeof t.hex!="undefined"){this.setStringHex(t.hex)}else{if(typeof t.date!="undefined"){this.setByDate(t.date)}}}}};at.extend(KJUR.asn1.DERGeneralizedTime,KJUR.asn1.DERAbstractTime);KJUR.asn1.DERSequence=function(t){KJUR.asn1.DERSequence.superclass.constructor.call(this,t);this.hT="30";this.getFreshValueHex=function(){var L="";for(var z=0;z<this.asn1Array.length;z++){var bW=this.asn1Array[z];L+=bW.getEncodedHex()}this.hV=L;return this.hV}};at.extend(KJUR.asn1.DERSequence,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERSet=function(t){KJUR.asn1.DERSet.superclass.constructor.call(this,t);this.hT="31";this.getFreshValueHex=function(){var z=new Array();for(var L=0;L<this.asn1Array.length;L++){var bW=this.asn1Array[L];z.push(bW.getEncodedHex())}z.sort();this.hV=z.join("");return this.hV}};at.extend(KJUR.asn1.DERSet,KJUR.asn1.DERAbstractStructured);KJUR.asn1.DERTaggedObject=function(t){KJUR.asn1.DERTaggedObject.superclass.constructor.call(this);this.hT="a0";this.hV="";this.isExplicit=true;this.asn1Object=null;this.setASN1Object=function(z,L,bW){this.hT=L;this.isExplicit=z;this.asn1Object=bW;if(this.isExplicit){this.hV=this.asn1Object.getEncodedHex();this.hTLV=null;this.isModified=true}else{this.hV=null;this.hTLV=bW.getEncodedHex();this.hTLV=this.hTLV.replace(/^../,L);this.isModified=false}};this.getFreshValueHex=function(){return this.hV};if(typeof t!="undefined"){if(typeof t.tag!="undefined"){this.hT=t.tag}if(typeof t.explicit!="undefined"){this.isExplicit=t.explicit}if(typeof t.obj!="undefined"){this.asn1Object=t.obj;this.setASN1Object(this.isExplicit,this.hT,this.asn1Object)}}};at.extend(KJUR.asn1.DERTaggedObject,KJUR.asn1.ASN1Object);(function(z){var t={},L;t.decode=function(bW){var bY;if(L===z){var bZ="0123456789ABCDEF",b3=" \f\n\r\t\u00A0\u2028\u2029";L=[];for(bY=0;bY<16;++bY){L[bZ.charAt(bY)]=bY}bZ=bZ.toLowerCase();for(bY=10;bY<16;++bY){L[bZ.charAt(bY)]=bY}for(bY=0;bY<b3.length;++bY){L[b3.charAt(bY)]=-1}}var bX=[],b0=0,b2=0;for(bY=0;bY<bW.length;++bY){var b1=bW.charAt(bY);if(b1=="="){break}b1=L[b1];if(b1==-1){continue}if(b1===z){throw"Illegal character at offset "+bY}b0|=b1;if(++b2>=2){bX[bX.length]=b0;b0=0;b2=0}else{b0<<=4}}if(b2){throw"Hex encoding incomplete: 4 bits missing"}return bX};window.Hex=t})();(function(z){var t={},L;t.decode=function(bW){var bZ;if(L===z){var bY="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b3="= \f\n\r\t\u00A0\u2028\u2029";L=[];for(bZ=0;bZ<64;++bZ){L[bY.charAt(bZ)]=bZ}for(bZ=0;bZ<b3.length;++bZ){L[b3.charAt(bZ)]=-1}}var bX=[];var b0=0,b2=0;for(bZ=0;bZ<bW.length;++bZ){var b1=bW.charAt(bZ);if(b1=="="){break}b1=L[b1];if(b1==-1){continue}if(b1===z){throw"Illegal character at offset "+bZ}b0|=b1;if(++b2>=4){bX[bX.length]=(b0>>16);bX[bX.length]=(b0>>8)&255;bX[bX.length]=b0&255;b0=0;b2=0}else{b0<<=6}}switch(b2){case 1:throw"Base64 encoding incomplete: at least 2 bits missing";case 2:bX[bX.length]=(b0>>10);break;case 3:bX[bX.length]=(b0>>16);bX[bX.length]=(b0>>8)&255;break}return bX};t.re=/-----BEGIN [^-]+-----([A-Za-z0-9+\/=\s]+)-----END [^-]+-----|begin-base64[^\n]+\n([A-Za-z0-9+\/=\s]+)====/;t.unarmor=function(bX){var bW=t.re.exec(bX);if(bW){if(bW[1]){bX=bW[1]}else{if(bW[2]){bX=bW[2]}else{throw"RegExp out of sync"}}}return t.decode(bX)};window.Base64_RSA=t})();(function(bY){var z=100,t="\u2026",L={tag:function(b0,b1){var bZ=document.createElement(b0);bZ.className=b1;return bZ},text:function(bZ){return document.createTextNode(bZ)}};function bX(bZ,b0){if(bZ instanceof bX){this.enc=bZ.enc;this.pos=bZ.pos}else{this.enc=bZ;this.pos=b0}}bX.prototype.get=function(bZ){if(bZ===bY){bZ=this.pos++}if(bZ>=this.enc.length){throw"Requesting byte offset "+bZ+" on a stream of length "+this.enc.length}return this.enc[bZ]};bX.prototype.hexDigits="0123456789ABCDEF";bX.prototype.hexByte=function(bZ){return this.hexDigits.charAt((bZ>>4)&15)+this.hexDigits.charAt(bZ&15)};bX.prototype.hexDump=function(b3,bZ,b0){var b2="";for(var b1=b3;b1<bZ;++b1){b2+=this.hexByte(this.get(b1));if(b0!==true){switch(b1&15){case 7:b2+="  ";break;case 15:b2+="\n";break;default:b2+=" "}}}return b2};bX.prototype.parseStringISO=function(b2,bZ){var b1="";for(var b0=b2;b0<bZ;++b0){b1+=String.fromCharCode(this.get(b0))}return b1};bX.prototype.parseStringUTF=function(b3,bZ){var b1="";for(var b0=b3;b0<bZ;){var b2=this.get(b0++);if(b2<128){b1+=String.fromCharCode(b2)}else{if((b2>191)&&(b2<224)){b1+=String.fromCharCode(((b2&31)<<6)|(this.get(b0++)&63))}else{b1+=String.fromCharCode(((b2&15)<<12)|((this.get(b0++)&63)<<6)|(this.get(b0++)&63))}}}return b1};bX.prototype.parseStringBMP=function(b4,b0){var b3="";for(var b2=b4;b2<b0;b2+=2){var bZ=this.get(b2);var b1=this.get(b2+1);b3+=String.fromCharCode((bZ<<8)+b1)}return b3};bX.prototype.reTime=/^((?:1[89]|2\d)?\d\d)(0[1-9]|1[0-2])(0[1-9]|[12]\d|3[01])([01]\d|2[0-3])(?:([0-5]\d)(?:([0-5]\d)(?:[.,](\d{1,3}))?)?)?(Z|[-+](?:[0]\d|1[0-2])([0-5]\d)?)?$/;bX.prototype.parseTime=function(b2,b0){var b1=this.parseStringISO(b2,b0),bZ=this.reTime.exec(b1);if(!bZ){return"Unrecognized time: "+b1}b1=bZ[1]+"-"+bZ[2]+"-"+bZ[3]+" "+bZ[4];if(bZ[5]){b1+=":"+bZ[5];if(bZ[6]){b1+=":"+bZ[6];if(bZ[7]){b1+="."+bZ[7]}}}if(bZ[8]){b1+=" UTC";if(bZ[8]!="Z"){b1+=bZ[8];if(bZ[9]){b1+=":"+bZ[9]}}}return b1};bX.prototype.parseInteger=function(b4,b0){var bZ=b0-b4;if(bZ>4){bZ<<=3;var b2=this.get(b4);if(b2===0){bZ-=8}else{while(b2<128){b2<<=1;--bZ}}return"("+bZ+" bit)"}var b3=0;for(var b1=b4;b1<b0;++b1){b3=(b3<<8)|this.get(b1)}return b3};bX.prototype.parseBitString=function(bZ,b0){var b4=this.get(bZ),b2=((b0-bZ-1)<<3)-b4,b7="("+b2+" bit)";if(b2<=20){var b6=b4;b7+=" ";for(var b3=b0-1;b3>bZ;--b3){var b5=this.get(b3);for(var b1=b6;b1<8;++b1){b7+=(b5>>b1)&1?"1":"0"}b6=0}}return b7};bX.prototype.parseOctetString=function(b3,b0){var bZ=b0-b3,b2="("+bZ+" byte) ";if(bZ>z){b0=b3+z}for(var b1=b3;b1<b0;++b1){b2+=this.hexByte(this.get(b1))}if(bZ>z){b2+=t}return b2};bX.prototype.parseOID=function(b6,b0){var b3="",b5=0,b4=0;for(var b2=b6;b2<b0;++b2){var b1=this.get(b2);b5=(b5<<7)|(b1&127);b4+=7;if(!(b1&128)){if(b3===""){var bZ=b5<80?b5<40?0:1:2;b3=bZ+"."+(b5-bZ*40)}else{b3+="."+((b4>=31)?"bigint":b5)}b5=b4=0}}return b3};function bW(b2,b3,b1,bZ,b0){this.stream=b2;this.header=b3;this.length=b1;this.tag=bZ;this.sub=b0}bW.prototype.typeName=function(){if(this.tag===bY){return"unknown"}var b1=this.tag>>6,bZ=(this.tag>>5)&1,b0=this.tag&31;switch(b1){case 0:switch(b0){case 0:return"EOC";case 1:return"BOOLEAN";case 2:return"INTEGER";case 3:return"BIT_STRING";case 4:return"OCTET_STRING";case 5:return"NULL";case 6:return"OBJECT_IDENTIFIER";case 7:return"ObjectDescriptor";case 8:return"EXTERNAL";case 9:return"REAL";case 10:return"ENUMERATED";case 11:return"EMBEDDED_PDV";case 12:return"UTF8String";case 16:return"SEQUENCE";case 17:return"SET";case 18:return"NumericString";case 19:return"PrintableString";case 20:return"TeletexString";case 21:return"VideotexString";case 22:return"IA5String";case 23:return"UTCTime";case 24:return"GeneralizedTime";case 25:return"GraphicString";case 26:return"VisibleString";case 27:return"GeneralString";case 28:return"UniversalString";case 30:return"BMPString";default:return"Universal_"+b0.toString(16)}case 1:return"Application_"+b0.toString(16);case 2:return"["+b0+"]";case 3:return"Private_"+b0.toString(16)}};bW.prototype.reSeemsASCII=/^[ -~]+$/;bW.prototype.content=function(){if(this.tag===bY){return null}var b3=this.tag>>6,b0=this.tag&31,b2=this.posContent(),bZ=Math.abs(this.length);if(b3!==0){if(this.sub!==null){return"("+this.sub.length+" elem)"}var b1=this.stream.parseStringISO(b2,b2+Math.min(bZ,z));if(this.reSeemsASCII.test(b1)){return b1.substring(0,2*z)+((b1.length>2*z)?t:"")}else{return this.stream.parseOctetString(b2,b2+bZ)}}switch(b0){case 1:return(this.stream.get(b2)===0)?"false":"true";case 2:return this.stream.parseInteger(b2,b2+bZ);case 3:return this.sub?"("+this.sub.length+" elem)":this.stream.parseBitString(b2,b2+bZ);case 4:return this.sub?"("+this.sub.length+" elem)":this.stream.parseOctetString(b2,b2+bZ);case 6:return this.stream.parseOID(b2,b2+bZ);case 16:case 17:return"("+this.sub.length+" elem)";case 12:return this.stream.parseStringUTF(b2,b2+bZ);case 18:case 19:case 20:case 21:case 22:case 26:return this.stream.parseStringISO(b2,b2+bZ);case 30:return this.stream.parseStringBMP(b2,b2+bZ);case 23:case 24:return this.stream.parseTime(b2,b2+bZ)}return null};bW.prototype.toString=function(){return this.typeName()+"@"+this.stream.pos+"[header:"+this.header+",length:"+this.length+",sub:"+((this.sub===null)?"null":this.sub.length)+"]"};bW.prototype.print=function(b0){if(b0===bY){b0=""}document.writeln(b0+this);if(this.sub!==null){b0+="  ";for(var b1=0,bZ=this.sub.length;b1<bZ;++b1){this.sub[b1].print(b0)}}};bW.prototype.toPrettyString=function(b0){if(b0===bY){b0=""}var b2=b0+this.typeName()+" @"+this.stream.pos;if(this.length>=0){b2+="+"}b2+=this.length;if(this.tag&32){b2+=" (constructed)"}else{if(((this.tag==3)||(this.tag==4))&&(this.sub!==null)){b2+=" (encapsulates)"}}b2+="\n";if(this.sub!==null){b0+="  ";for(var b1=0,bZ=this.sub.length;b1<bZ;++b1){b2+=this.sub[b1].toPrettyString(b0)}}return b2};bW.prototype.toDOM=function(){var b0=L.tag("div","node");b0.asn1=this;var b6=L.tag("div","head");var b8=this.typeName().replace(/_/g," ");b6.innerHTML=b8;var b4=this.content();if(b4!==null){b4=String(b4).replace(/</g,"&lt;");var b3=L.tag("span","preview");b3.appendChild(L.text(b4));b6.appendChild(b3)}b0.appendChild(b6);this.node=b0;this.head=b6;var b7=L.tag("div","value");b8="Offset: "+this.stream.pos+"<br/>";b8+="Length: "+this.header+"+";if(this.length>=0){b8+=this.length}else{b8+=(-this.length)+" (undefined)"}if(this.tag&32){b8+="<br/>(constructed)"}else{if(((this.tag==3)||(this.tag==4))&&(this.sub!==null)){b8+="<br/>(encapsulates)"}}if(b4!==null){b8+="<br/>Value:<br/><b>"+b4+"</b>";if((typeof oids==="object")&&(this.tag==6)){var b1=oids[b4];if(b1){if(b1.d){b8+="<br/>"+b1.d}if(b1.c){b8+="<br/>"+b1.c}if(b1.w){b8+="<br/>(warning!)"}}}}b7.innerHTML=b8;b0.appendChild(b7);var bZ=L.tag("div","sub");if(this.sub!==null){for(var b2=0,b5=this.sub.length;b2<b5;++b2){bZ.appendChild(this.sub[b2].toDOM())}}b0.appendChild(bZ);b6.onclick=function(){b0.className=(b0.className=="node collapsed")?"node":"node collapsed"};return b0};bW.prototype.posStart=function(){return this.stream.pos};bW.prototype.posContent=function(){return this.stream.pos+this.header};bW.prototype.posEnd=function(){return this.stream.pos+this.header+Math.abs(this.length)};bW.prototype.fakeHover=function(bZ){this.node.className+=" hover";if(bZ){this.head.className+=" hover"}};bW.prototype.fakeOut=function(b0){var bZ=/ ?hover/;this.node.className=this.node.className.replace(bZ,"");if(b0){this.head.className=this.head.className.replace(bZ,"")}};bW.prototype.toHexDOM_sub=function(b2,b1,b3,b4,bZ){if(b4>=bZ){return}var b0=L.tag("span",b1);b0.appendChild(L.text(b3.hexDump(b4,bZ)));b2.appendChild(b0)};bW.prototype.toHexDOM=function(b0){var b3=L.tag("span","hex");if(b0===bY){b0=b3}this.head.hexNode=b3;this.head.onmouseover=function(){this.hexNode.className="hexCurrent"};this.head.onmouseout=function(){this.hexNode.className="hex"};b3.asn1=this;b3.onmouseover=function(){var b5=!b0.selected;if(b5){b0.selected=this.asn1;this.className="hexCurrent"}this.asn1.fakeHover(b5)};b3.onmouseout=function(){var b5=(b0.selected==this.asn1);this.asn1.fakeOut(b5);if(b5){b0.selected=null;this.className="hex"}};this.toHexDOM_sub(b3,"tag",this.stream,this.posStart(),this.posStart()+1);this.toHexDOM_sub(b3,(this.length>=0)?"dlen":"ulen",this.stream,this.posStart()+1,this.posContent());if(this.sub===null){b3.appendChild(L.text(this.stream.hexDump(this.posContent(),this.posEnd())))}else{if(this.sub.length>0){var b4=this.sub[0];var b2=this.sub[this.sub.length-1];this.toHexDOM_sub(b3,"intro",this.stream,this.posContent(),b4.posStart());for(var b1=0,bZ=this.sub.length;b1<bZ;++b1){b3.appendChild(this.sub[b1].toHexDOM(b0))}this.toHexDOM_sub(b3,"outro",this.stream,b2.posEnd(),this.posEnd())}}return b3};bW.prototype.toHexString=function(bZ){return this.stream.hexDump(this.posStart(),this.posEnd(),true)};bW.decodeLength=function(b2){var b0=b2.get(),bZ=b0&127;if(bZ==b0){return bZ}if(bZ>3){throw"Length over 24 bits not supported at position "+(b2.pos-1)}if(bZ===0){return -1}b0=0;for(var b1=0;b1<bZ;++b1){b0=(b0<<8)|b2.get()}return b0};bW.hasContent=function(b0,bZ,b5){if(b0&32){return true}if((b0<3)||(b0>4)){return false}var b4=new bX(b5);if(b0==3){b4.get()}var b3=b4.get();if((b3>>6)&1){return false}try{var b2=bW.decodeLength(b4);return((b4.pos-b5.pos)+b2==bZ)}catch(b1){return false}};bW.decode=function(b6){if(!(b6 instanceof bX)){b6=new bX(b6,0)}var b5=new bX(b6),b8=b6.get(),b3=bW.decodeLength(b6),b2=b6.pos-b5.pos,bZ=null;if(bW.hasContent(b8,b3,b6)){var b0=b6.pos;if(b8==3){b6.get()}bZ=[];if(b3>=0){var b1=b0+b3;while(b6.pos<b1){bZ[bZ.length]=bW.decode(b6)}if(b6.pos!=b1){throw"Content size is not correct for container starting at offset "+b0}}else{try{for(;;){var b7=bW.decode(b6);if(b7.tag===0){break}bZ[bZ.length]=b7}b3=b0-b6.pos}catch(b4){throw"Exception while decoding undefined length content: "+b4}}}else{b6.pos+=b3}return new bW(b5,b2,b3,b8,bZ)};bW.test=function(){var b4=[{value:[39],expected:39},{value:[129,201],expected:201},{value:[131,254,220,186],expected:16702650}];for(var b1=0,bZ=b4.length;b1<bZ;++b1){var b3=0,b2=new bX(b4[b1].value,0),b0=bW.decodeLength(b2);if(b0!=b4[b1].expected){document.write("In test["+b1+"] expected "+b4[b1].expected+" got "+b0+"\n")}}};window.ASN1=bW})();ASN1.prototype.getHexStringValue=function(){var t=this.toHexString();var L=this.header*2;var z=this.length*2;return t.substr(L,z)};A.prototype.parseKey=function(b1){try{var b6=0;var bW=0;var t=/^\s*(?:[0-9A-Fa-f][0-9A-Fa-f]\s*)+$/;var b5=t.test(b1)?Hex.decode(b1):Base64_RSA.unarmor(b1);var bX=ASN1.decode(b5);if(bX.sub.length===3){bX=bX.sub[2].sub[0]}if(bX.sub.length===9){b6=bX.sub[1].getHexStringValue();this.n=w(b6,16);bW=bX.sub[2].getHexStringValue();this.e=parseInt(bW,16);var z=bX.sub[3].getHexStringValue();this.d=w(z,16);var b0=bX.sub[4].getHexStringValue();this.p=w(b0,16);var bZ=bX.sub[5].getHexStringValue();this.q=w(bZ,16);var b3=bX.sub[6].getHexStringValue();this.dmp1=w(b3,16);var b2=bX.sub[7].getHexStringValue();this.dmq1=w(b2,16);var L=bX.sub[8].getHexStringValue();this.coeff=w(L,16)}else{if(bX.sub.length===2){var b7=bX.sub[1];var bY=b7.sub[0];b6=bY.sub[0].getHexStringValue();this.n=w(b6,16);bW=bY.sub[1].getHexStringValue();this.e=parseInt(bW,16)}else{return false}}return true}catch(b4){return false}};A.prototype.getPrivateBaseKey=function(){var z={array:[new KJUR.asn1.DERInteger({"int":0}),new KJUR.asn1.DERInteger({bigint:this.n}),new KJUR.asn1.DERInteger({"int":this.e}),new KJUR.asn1.DERInteger({bigint:this.d}),new KJUR.asn1.DERInteger({bigint:this.p}),new KJUR.asn1.DERInteger({bigint:this.q}),new KJUR.asn1.DERInteger({bigint:this.dmp1}),new KJUR.asn1.DERInteger({bigint:this.dmq1}),new KJUR.asn1.DERInteger({bigint:this.coeff})]};var t=new KJUR.asn1.DERSequence(z);return t.getEncodedHex()};A.prototype.getPrivateBaseKeyB64=function(){return ae(this.getPrivateBaseKey())};A.prototype.getPublicBaseKey=function(){var L={array:[new KJUR.asn1.DERObjectIdentifier({oid:"1.2.840.113549.1.1.1"}),new KJUR.asn1.DERNull()]};var t=new KJUR.asn1.DERSequence(L);L={array:[new KJUR.asn1.DERInteger({bigint:this.n}),new KJUR.asn1.DERInteger({"int":this.e})]};var bX=new KJUR.asn1.DERSequence(L);L={hex:"00"+bX.getEncodedHex()};var bW=new KJUR.asn1.DERBitString(L);L={array:[t,bW]};var z=new KJUR.asn1.DERSequence(L);return z.getEncodedHex()};A.prototype.getPublicBaseKeyB64=function(){return ae(this.getPublicBaseKey())};A.prototype.wordwrap=function(L,t){t=t||64;if(!L){return L}var z="(.{1,"+t+"})( +|$\n?)|(.{1,"+t+"})";return L.match(RegExp(z,"g")).join("\n")};A.prototype.getPrivateKey=function(){var t="-----BEGIN RSA PRIVATE KEY-----\n";t+=this.wordwrap(this.getPrivateBaseKeyB64())+"\n";t+="-----END RSA PRIVATE KEY-----";return t};A.prototype.getPublicKey=function(){var t="-----BEGIN PUBLIC KEY-----\n";t+=this.wordwrap(this.getPublicBaseKeyB64())+"\n";t+="-----END PUBLIC KEY-----";return t};A.prototype.hasPublicKeyProperty=function(t){t=t||{};return(t.hasOwnProperty("n")&&t.hasOwnProperty("e"))};A.prototype.hasPrivateKeyProperty=function(t){t=t||{};return(t.hasOwnProperty("n")&&t.hasOwnProperty("e")&&t.hasOwnProperty("d")&&t.hasOwnProperty("p")&&t.hasOwnProperty("q")&&t.hasOwnProperty("dmp1")&&t.hasOwnProperty("dmq1")&&t.hasOwnProperty("coeff"))};A.prototype.parsePropertiesFrom=function(t){this.n=t.n;this.e=t.e;if(t.hasOwnProperty("d")){this.d=t.d;this.p=t.p;this.q=t.q;this.dmp1=t.dmp1;this.dmq1=t.dmq1;this.coeff=t.coeff}};var bx=function(t){A.call(this);if(t){if(typeof t==="string"){this.parseKey(t)}else{if(this.hasPrivateKeyProperty(t)||this.hasPublicKeyProperty(t)){this.parsePropertiesFrom(t)}}}};bx.prototype=new A();bx.prototype.constructor=bx;var a3=function(t){t=t||{};this.default_key_size=parseInt(t.default_key_size)||1024;this.default_public_exponent=t.default_public_exponent||"010001";this.log=t.log||false;this.key=null};a3.prototype.setKey=function(t){if(this.log&&this.key){console.warn("A key was already set, overriding existing.")}this.key=new bx(t)};a3.prototype.setPrivateKey=function(t){this.setKey(t)};a3.prototype.setPublicKey=function(t){this.setKey(t)};a3.prototype.decrypt=function(t){try{return this.getKey().decrypt(aW(t))}catch(z){return false}};a3.prototype.encrypt=function(t){try{return ae(this.getKey().encrypt(t))}catch(z){return false}};a3.prototype.getKey=function(t){if(!this.key){this.key=new bx();if(t&&{}.toString.call(t)==="[object Function]"){this.key.generateAsync(this.default_key_size,this.default_public_exponent,t);return}this.key.generate(this.default_key_size,this.default_public_exponent)}return this.key};a3.prototype.getPrivateKey=function(){return this.getKey().getPrivateKey()};a3.prototype.getPrivateKeyB64=function(){return this.getKey().getPrivateBaseKeyB64()};a3.prototype.getPublicKey=function(){return this.getKey().getPublicKey()};a3.prototype.getPublicKeyB64=function(){return this.getKey().getPublicBaseKeyB64()};ap.JSEncrypt=a3})(JSEncryptExports);var JSEncrypt=JSEncryptExports.JSEncrypt;