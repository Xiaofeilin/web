ms_common = {};

ms_common.userManage = function(){
    $(".ms-nav").find(".nav-manage").mouseover(function(){
        $(".list-nav-manage").removeClass("hide");
    }).mouseleave(function(){
            $(".list-nav-manage").addClass("hide");
        });
}
ms_common.userAvatar = function(){
    $(".useinfo-avatar").live("mouseover",function(){
    	$(this).addClass("avatar-mouse-over");
	});
    $(".useinfo-avatar").live("mouseleave",function(){
    	$(this).removeClass("avatar-mouse-over");
	});
}

ms_common.treeOrder = function(){
    $(".switch-tree-order").toggle(function(){
        $(this).parent("dd").addClass("hide-order-list");
        $(this).addClass("close-tree-order").removeClass("open-tree-order");
    },function(){
        $(this).parent("dd").removeClass("hide-order-list");
        $(this).addClass("open-tree-order").removeClass("close-tree-order");
    });
}
ms_common.sideMenu_switch = function(){
    $(".switch-side-menu").click(function(){
//        $(".side-menu-tree").slideToggle();
        var _switch = $(this).attr("isOn");
        if( _switch == "off"){
            $(".side-menu-tree").slideDown();
            $(this).attr("isOn","on").removeClass("icon-down-side").addClass("icon-up-side");
        }
        else{
       		//关闭任性付提示泡，同时写入cookie
			$(".rxf-close").click();
            $(".side-menu-tree").slideUp();
            $(this).attr("isOn","off").removeClass("icon-up-side").addClass("icon-down-side");
        }
        

    });
}
//判断是否支持html5
ms_common.checkhHtml5 = function()
{
    if (typeof(Worker) !== "undefined")
    {
        return false;
    } else
    {
        $(".ms-side").addClass("b-col");
        $(".list-nav-manage").addClass("b-col");

    }
}
//判断宽窄屏
ms_common.checkScreenSize=function () {
  var bodyTag=document.getElementsByTagName("body")[0];
  if ( screen.width<1240 ) {
      bodyClassName = bodyTag.getAttribute("className") || bodyTag.getAttribute("class");
      bodyTag.className = (bodyClassName ? bodyClassName+" " : " ")+"w990";
  }
}
//调用搜索
ms_common.msiOnSubmitSearch = function(keyId) {
	var keyWords = $("#"+keyId).val();
	var tmp = $.trim(keyWords);
	if (tmp == '') {
		$("#"+keyId).focus();
		$("#"+keyId).select();
	} else { 
		$("#searchKeywords").val(keyWords);
		//$("#msiSearchForm").submit();
		ms_common.onSubmitSearch(keyWords);//搜索提供方法
	};
};
//搜索提供方法
ms_common.onSubmitSearch = function (keyWords) {
	var url = sn.searchDomain.replace("emall/", "") + encodeURIComponent(ms_common.resolveStr(keyWords));
	var cityId = ms_common.getCookie("cityId") || "9173"; //获取cookie 中城市id
	url += "/cityId=" + cityId;
	window.location.href = url;
	return false;
};
//搜索提供方法
ms_common.resolveStr = function(str) {
	str = str.replace(/\-/g, "%2d");
	str = str.replace(/\&/g, "%26");
	str = str.replace(/\./g, "%2E");
	str = str.replace(/\+/g, "%2B");
	return str;
};
ms_common.getCookie = function(b){
	var a;
	return (a = document.cookie.match(RegExp("(^| )" + b + "=([^;]*)(;|$)"))) ? decodeURIComponent(a[2].replace(/\+/g, "%20")): null
};

// 获取当前环境是sit/pre/prd
ms_common.getEnv = function(domainName){
	var _hostResultDomain = '';
	var ego_pre_reg = /^(\w*)(pre)(\w*)(.cnsuning.com)$/,
        ego_sit_reg = /^(\w*)(sit)(\w*)(.cnsuning.com)$/,
        ego_dev_reg = /^(\w*)(dev)(\w*)(.cnsuning.com)$/,
        _hostName = window.location.hostname;
	var envType = 'prd';
        if (ego_pre_reg.test(_hostName)) {
            envType = 'pre';
        } else if (ego_sit_reg.test(_hostName)) {
            envType = 'sit';
        } else if (ego_dev_reg.test(_hostName)) {
            envType = 'sit';
        }
        switch (envType) {
            case 'prd':
                switch (domainName) {
                	case 'passportDomain':
                		_hostResultDomain = 'passport.suning.com'
                		break;
                	case 'rxfDomain':
                		_hostResultDomain = 'rxf.suning.com'
                		break;
                	case 'sncfDomain':
                		_hostResultDomain = 'sncfc.suning.com'
                		break;
                	case 'shoppingDomain':
                		_hostResultDomain = 'shopping.suning.com'
                		break;
                	case 'msiDomain':
		                _hostResultDomain = 'my.suning.com'
		                break;
		            case 'mmsDomain':
		                _hostResultDomain = 'msg.suning.com'
		                break;
		            case 'domain':
		                _hostResultDomain = 'www.suning.com'
		                break;
		        }
                break;
            case 'pre':
                switch (domainName) {
                	case 'passportDomain':
                		_hostResultDomain = 'passportpre.cnsuning.com'
                		break;
                	case 'rxfDomain':
                		_hostResultDomain = 'rxfpre.cnsuning.com'
                		break;
                	case 'sncfDomain':
                		_hostResultDomain = 'sncfcpre.cnsuning.com'
                		break;
                	case 'shoppingDomain':
                		_hostResultDomain = 'shoppingpre.cnsuning.com'
                		break;
                	case 'msiDomain':
		                _hostResultDomain = 'mypre.cnsuning.com'
		                break;
		            case 'mmsDomain':
		                _hostResultDomain = 'msgpre.cnsuning.com'
		                break;
		            case 'domain':
		                _hostResultDomain = 'b2cpre.cnsuning.com'
		                break;
		        }
                break;
            case 'sit':
                switch (domainName) {
                	case 'passportDomain':
                		_hostResultDomain = 'passportsit.cnsuning.com'
                		break;
                	case 'rxfDomain':
                		_hostResultDomain = 'rxfsit.cnsuning.com'
                		break;
                	case 'sncfDomain':
                		_hostResultDomain = 'sncfcsit.cnsuning.com'
                		break;
                	case 'shoppingDomain':
                		_hostResultDomain = 'shoppingsit.cnsuning.com'
                		break;
                	case 'msiDomain':
		                _hostResultDomain = 'mysit.cnsuning.com/msi-web'
		                break;
		            case 'mmsDomain':
		                _hostResultDomain = 'msgsit.cnsuning.com'
		                break;
		            case 'domain':
		                _hostResultDomain = 'b2csit.cnsuning.com'
		                break;
		        }
                break;
        }
	return _hostResultDomain;
};
$(function(){
    //    js监听窗口大小改变
    $(document).ready(function(){
        var _width = $(window).width();
        if(_width+15 <= 880){
            $(".side-menu-tree").hide();
            $(".switch-side-menu").attr("isOn","off").removeClass("icon-up-side").addClass("icon-down-side");
        }
        else{
            $(".side-menu-tree").slideDown();
            $(this).attr("isOn","on").removeClass("icon-down-side").addClass("icon-up-side");
        }
//        $(window).resize(function() {
//            var _width = $(window).width();
//            if(_width+15 <= 880){
//                    $(".side-menu-tree").hide();
//                    $(".switch-side-menu").attr("isOn","off").removeClass("icon-up-side").addClass("icon-down-side");
//                $(this).unbind();
//            }
//            else{
//                $(".side-menu-tree").show();
//                $(".switch-side-menu").attr("isOn","on").removeClass("icon-down-side").addClass("icon-up-side");
//            }
//            $("#lis").val(_width+15);
//        });

    });
    ms_common.checkhHtml5();
    ms_common.checkScreenSize();
    ms_common.userManage();
    ms_common.userAvatar();
    ms_common.treeOrder();
    ms_common.sideMenu_switch();
	$("#searchKeywordFixed").live('keydown', function(ev){
		if(ev.keyCode==13){
			ms_common.msiOnSubmitSearch('searchKeywordFixed');
		}
	});
})