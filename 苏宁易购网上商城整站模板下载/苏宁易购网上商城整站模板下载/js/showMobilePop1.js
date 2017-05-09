/**
 * 账号安全中心对外提供公共js服务，引用aqSuning1.showMobilePopType(refreshFlag,callback)即可
 * 
 */
var aqSuning1 = aqSuning1 || {};
var aqjs1 = document.getElementsByTagName("script");
var aqcss1 = document.getElementsByTagName("link");
aqSuning1.aqIntervalVar=null,aqSuning1.aqPasportUrl=null,aqSuning1.ascUrl=null,aqSuning1.aqRefreshFlag=false,aqSuning1.aqCallback=null,aqSuning1.aqSuccessFlag="false";
function isInclude(a, c) {
	if (c) {
		for ( var b = 0; b < aqjs1.length; b++) {
			if (aqjs1[b][c ? "src" : "href"].indexOf(a) != -1) {
				return true;
			}
		}
		return false;
	} else {
		for ( var b = 0; b < aqcss1.length; b++) {
			if (aqcss1[b][c ? "src" : "href"].indexOf(a) != -1) {
				return true;
			}
		}
		return false;
	}
}
//设置临时版本参数函数
function getCurVersion(){
	var myDate = new Date();
	var result = myDate.getYear()+'-'+myDate.getMonth()+'-'+myDate.getDate()+':'+myDate.getHours();
	return result;
}
$(document)
		.ready(
				function() {
					var _logonhostName = document.location.hostname;
					aqSuning1.aqPasportUrl ='https://passport.suning.com/ids'+'/';
					aqSuning1.ascUrl = 'https://aq.suning.com/asc'+'/';
					if (!isInclude("jquery", true)) {
						alert("请引入jQuery.js");
					}
					if (!isInclude("passport", true)) {
						var envName='PROD',c=null;
						if('DEV' == envName){
							c = '<script>var passport_config = { base: '+'"${asc.project.authstatus.url.prefix}"'+',loginTheme: "b2c_pop"};<\/script>';
						}else{
							c = "<script>var passport_config = { base: '"+aqSuning1.ascUrl+"',loginTheme: 'b2c_pop'};<\/script>";
						}
						$("title").after(c);
						var a = document.createElement("script");
						//本地环境测试
						var version=getCurVersion();
						//发测试环境时，需要将passport环境替换PROD
						a.src = aqSuning1.aqPasportUrl+"js/passport.js?V="+version;
						a.type = "text/javascript";
						var b = document.getElementsByTagName("head")[0];
						b.appendChild(a);
					}
				});

/**
 * flag: true or false 调用完成是否需要刷新
 * 
 */
aqSuning1.showMobilePopType = function(flag,callback) {
	probeAuthStatus(function() {
		// 页面刷新标志
		aqSuning1.aqRefreshFlag=flag;
		aqSuning1.aqCallback=callback;
		securityBindPhone();
		
	}, function() {
		ensureLogin(function() {
			aqSuning1.showMobilePopType(flag,callback);
		});
	});
};

var securityBindPhone = function() {
	var currentLocation = window.location.href;
	// change
	var d = aqSuning1.ascUrl+"popout/showBoxType.do"
			+ "?topLocation="
			+ encodeURIComponent(currentLocation.split("#")[0]) + "#success";
	// 申明所需变量
	var _mask = "<div class='mask-layer'></div>", _if = '<iframe id="security-bind-phone" frameborder=0 allowTransparency="true" src='
			+ d
			+ ' style="position:fixed;top:50%;left:50%;margin-top:-300px;margin-left:-231px;width:462px;height:600px;border:none;background: transparent;z-index:9995;_position:absolute;"></iframe>', _dWidth = '', _dHeight = '', _wWidth = '', _wHeight = '', width = '', height = '';
	// 获取遮罩层宽高的方法
	function maskSet() {
		_dWidth = document.body.clientWidth,
				_dHeight = document.body.clientHeight,
				_wWidth = window.screen.availWidth,
				_wHeight = window.screen.availHeight;
		// 判断文档和窗口高度，下面是文档比较高的情况
		if (_dHeight > _wHeight) {
			// 设置宽高
			width = _dWidth;
			height = _dHeight;
			// 这是窗口比较高的情况
		} else {
			// 设置宽高
			width = _wWidth;
			height = _wHeight;
		}
	}
	// 获取遮罩层的目标宽高
	maskSet();
	// 遮罩层插入body
	$(_mask).appendTo($("body")).css({
		position : "absolute",
		top : 0,
		left : 0,
		width : width,
		height : height,
		background : "#000",
		opacity : 0,
		zIndex:9990
	}).stop().animate({
		opacity : 0.3
	});
	// iframe插入body
	$(_if).appendTo($("body")).css({
		opacity : 0
	}).stop().animate({
		opacity : 1
	});
	// 浏览器窗口大小改变的时候触发
	$(window).resize(function() {
		// 获取遮罩层的目标宽高
		maskSet();
		// 设置遮罩层的宽高
		$(_mask).css({
			width : width,
			height : height
		});

	});
	// 判断是否为ie6，在ie6下实现类似fixed的效果
	if ((navigator.userAgent.indexOf("MSIE 6.0") > 0)) {
		// 浏览器上下滚动的时候触发
		$(window).scroll(
				function() {
					// 获取遮罩层的目标宽高
					maskSet();
					// 设置遮罩层的宽高
					$(_mask).css({
						width : width,
						height : height
					});
					// 获取窗口的scrollTop和窗口高度的一半
					var _scrollTop = $(window).scrollTop(), _windowHeight = $(
							window).height() / 2;
					// 设置iframe的top值
					$("#security-bind-phone").css({
						top : _scrollTop + _windowHeight
					});

				});
		// 非ie6的情况，直接设置遮罩层的宽高就ok
	} else {
		// 浏览器上下滚动的时候触发
		$(window).scroll(function() {
			// 获取遮罩层的目标宽高
			maskSet();
			// 设置遮罩层的宽高
			$(_mask).css({
				width : width,
				height : height
			});

		});
	}
    //设置定时任务，每隔200ms扫描浏览器地址
	aqSuning1.aqIntervalVar = window.setInterval(checkMsgFromBindPhoneIframe, 200);
};

// check message from popup login page.
function checkMsgFromBindPhoneIframe() {
	var newHash = window.location.hash;
	if (newHash.length > 1) {
		var value = newHash.split('#');
		var params = value[1].split(':');
		switch (params[0]) {
		case 'close':
			securityBindPhoneClose();
			break;
		case 'bindSuccess':
			securityBindPhoneClose();
			break;
		default:
			break;
		}
	}
}

// 关闭iframe方法，如需要关闭，直接调用此方法
var securityBindPhoneClose = function() {
	var _parIf = $("#security-bind-phone"), _ms = _parIf
			.siblings(".mask-layer");
	_parIf.stop().animate({
		opacity : 0
	}, function() {
		_parIf.remove();
	});
	_ms.stop().animate({
		opacity : 0
	}, function() {
		_ms.remove();
	});
	clearInterval(aqSuning1.aqIntervalVar);
	var url = window.location.href;
	var a = url.indexOf("#");
	var locl = url.substring(0, a) + "#unknown:";
	window.location.href = locl;
	var index=url.indexOf(":?");
	if(index>-1){
		aqSuning1.aqSuccessFlag=url.substring(index).split("=")[1];
	}
	//判断是否要刷新页面
	if(aqSuning1.aqRefreshFlag==true){
		window.location.reload();
	}
	//判断是绑定成功还是直接关闭弹框
	var callBackFlag=(aqSuning1.aqCallback!=undefined && aqSuning1.aqCallback!=null);
	if(aqSuning1.aqSuccessFlag=="true" && callBackFlag){
		//如果有回调函数便执行		
		aqSuning1.aqCallback(true);
	}else{
		if(callBackFlag){
			aqSuning1.aqCallback(false);
		}
	}
};
