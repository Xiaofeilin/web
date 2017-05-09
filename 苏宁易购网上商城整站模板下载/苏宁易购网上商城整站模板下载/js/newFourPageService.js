/**

 * 根据手机编码和城市id获取四级页所需合约机信息
      * @param phonePartNum 商品SKU
	 * @param receiveProvinceId 收货省ID
	 * @param receiveCityId 收货城市ID
	 * @param receiveDistrictId 收货区ID
	 * @param provinceCode 省编码
	 * @param cityCode
 */
function getTreatyInfo(phonePartNum, receiveProvinceId, receiveCityId,receiveDistrictId, provinceCode, cityCode, callback) {
	$.ajax({
		url : "http://hyj.suning.com/newFourPageService/treatyInfo_"
				+ phonePartNum + "_" + receiveProvinceId + "_" + receiveCityId
				+"_"+receiveDistrictId+ "_" + provinceCode + "_" + cityCode+ ".hs",
		cache:false,//正式环境需要改成true
		dataType : "jsonp",
		jsonp:"callback",
		jsonpCallback:"callbackFun",
		success : function(data) {
			callback(data);
		},
		error : function() {
			// addShoppingCartTip();
		}
	});
}

/**
 * 加入购车
 * 
 * @param phonePartNum
 *            裸机商品编码
 * @param cityId
 *            送达城市id
 * @param buyTypeId
 *            购买方式id
 * @param phoneCatentryId
 *            手机商品id
 * @param callback
 */
function addShoppingCartCheck(commodityID, provinceId, cityId, districtId,provinceCode, cityCode, 
			buyTypeCode, treatyCode, phoneCatentryId, phoneSupplierCode, treatyParam, callback) {
	// judge login status
	ensureLogin(function(){ 
		$.ajax({
			url : "http://hyj.suning.com/newFourPageService/addShoppingCartCheck_"+commodityID+"_"+provinceId+"_"+cityId+"_"+districtId
			+"_"+provinceCode+"_"+cityCode+"_"+buyTypeCode+"_"+treatyCode+"_"+phoneCatentryId+"_"+phoneSupplierCode+"_"+treatyParam+ ".tp",
			dataType : "jsonp",
			jsonp:"callback",
			jsonpCallback:"callbackFun",
			success : function(data) {
				if (data.returnCode == "1") {
					//callback(data.returnMsg);
					if(data.returnMsg=="您已达到购买上限！"){
						callback(data.returnMsg);
					}else{
						callback("加入购物车失败，请联系客服！");
					}
				} else {
					var pageFlag = data.pageFlag;
					// 加入购物车成功，跳转购物车1
					var params = "?type="+treatyCode+"_"+buyTypeCode+"_null_"+pageFlag;
					window.location.href = "http://hyj.suning.com/treadyPlan.tp"+params;
				}
			},
			error : function() {
				addShoppingCartTip();
			}
		});
	});
}

var treatyPhoneAddCartFailMsg = "您选择的商品，在您选择的城市暂无法购买";
function addShoppingCartTip() {
	alert(treatyPhoneAddCartFailMsg);
}

/**
 * 选号入网和3G上网卡:根据手机编码和城市id获取四级页所需价格信息
 * 
 * @param simPartnum
 *            手机商品编码，18位
 * @param cityId
 *            送达城市id
 * @param buyType
 *            购买方式
 * @param callback
 *            回调函数
 */
function getSimPrice(simPartnum, cityId, buyType, callback) {
	$.ajax({
		url : "http://hyj.suning.com/fourPageService/simPrice_"
				+ simPartnum + "_" + cityId +"_"+ buyType + ".hs",
		cache:true,
		dataType : "jsonp",
		jsonp : "callback",
		jsonpCallback : "callbackFun",// 回调函数名需固定
		success : function(data) {
			callback(data);
		},
		error : function() {
		}
	});
}

/**
 * 裸机按地市获取卖点:根据裸机商品编码与送货城市id获取四级页卖点信息
 * 
 * @author 14072593
 * 
 * @param phonePartNum
 *              手机商品编码，18位
 * @param sendCityId
 *              送达城市id
 * @param callback
 *              回调函数
 */
 function getSellPointByCity(phonePartNum,sendCityId,callback) {
 	$.ajax({
		url : "http://hyj.suning.com/fourPageService/sellPointInfo_"
				+ phonePartNum + "_" + sendCityId + ".hs",
		cache:true,
		dataType : "jsonp",
		jsonp : "callback",
		jsonpCallback : "sellPointCallBackFun",// 回调函数名需固定
		success : function(data) {
			callback(data);
		},
		error : function() {
		}
	});
 }
 
/**
 *  选号入网和3G上网卡加入购车
 * 
 * @param simPartnum
 *            sim卡商品编码
 * @param cityId
 *            送达城市id
 * @param buyTypeId
 *            购买方式id
 * @param callback
 */
function addSimShoppingCartCheck(simPartnum, cityId, buyTypeId, callback) {
	// judge login status
	ensureLogin(function(){ 
		$.ajax({
				url : "http://hyj.suning.com/shoppingCart/addSimShoppingCart.tp",
				data : {
					"simPartnum" : simPartnum,
					"cityId" : cityId,
					"buyTypeId" : buyTypeId
				},
				dataType : "jsonp",
				jsonp : "callback",
				success : function(data) {
					// 如果购物车加入失败，回调处理
					if (data.returnCode == "1") {
						if(data.returnMsg=="您已达到购买上限！"){
							callback(data.returnMsg);
						}else{
							callback(treatyPhoneAddCartFailMsg);
						}
					}else{
						// 加入购物车成功，跳转购物车1
						var params = "?type="+3+"_"+buyTypeId+"_null";
						window.location.href = "http://hyj.suning.com/treadyPlan.tp"+params;
					}
				},
				error : function() {
					addShoppingCartTip();
				}
		});
	});
}

//function goLogon(partnum, cityId, buyTypeId, phoneCatentryId) {
//	var redirectUrl;
//	if(phoneCatentryId == null){
//		redirectUrl = "http://hyj.suning.com/shoppingCart/addSimShoppingCartRe_" + partnum+"_" + cityId
//				+ "_" + buyTypeId + ".tp";
//	}else{
//		redirectUrl = "http://hyj.suning.com/shoppingCart/addTreatyShoppingCart_" + partnum+"_" + cityId
//			+ "_" + buyTypeId + "_" + phoneCatentryId+ ".tp";
//	}
//	window.location.href = "https://member.suning.com/emall/servlet/LogonForm?storeId=10052&catalogId=10051&URL="
//			+ redirectUrl;
//}


/*
 * 判断是否已经引入了XX.js
 */
function _isInclude(name){
    var js= /js$/i.test(name);
    var es=document.getElementsByTagName(js?'script':'link');
    for(var i=0;i<es.length;i++) {
    	if(es[i][js?'src':'href'].indexOf(name)!=-1){
    		return true;
    	}
    }
    return false;
}

/**
 * 根据SKU和城市id获取四级页所需的宽带卖点和价格信息
 * @param cmmdtyCode 根据SKU
 * @param cityId 送达城市id
 * @param callback 回调函数
 * by 14101508
 */
function getBroadBandSalePointInfo(cmmdtyCode,provinceCode,cityCode,districtCode,callback){
	$.ajax({
		url : "http://hyj.suning.com/appoint/getBroadbandSalePoint_"
				+ cmmdtyCode + "_" + provinceCode + "_" + cityCode
				+"_"+districtCode + ".hs",
		dataType : "jsonp",
		jsonp:"callback",
		jsonpCallback:"callbackFun",
		success : function(data) {
			callback(data);
		},
		error : function() {
		}
	});
}

/**
 *  宽带添加购物车
 * 
 * @param cmmdtyCode
 *            sku
 * @param provinceCode
 *            省id
 * @param cityCode
 *            城市id
 * @param districtCode
 * 				区id
 */
function addBroadbandShoppingCartCheck(cmmdtyCode, provinceCode, cityCode,districtCode) {
	// judge login status
	ensureLogin(function(){ 
		window.location.href = "http://hyj.suning.com/appoint/addBroadbandShoppingCartCheck.tp?cmmdtyCode="+cmmdtyCode+"&provinceCode="+provinceCode+"&cityCode="+cityCode+"&districtCode="+districtCode;
	});
}

$(document).ready(function() {
	var version="";
	$("script").each(function(){
		if ($(this).attr("src") != undefined && $(this).attr("src").indexOf("newFourPageService.js") != -1) {
			version = $(this).attr("src").substring($(this).attr("src").indexOf("?"));
		}
	});
	if(!_isInclude("passport.js")){
		var passportConfig = '<script>'+
			'var passport_config = { '+
				'base: "http://hyj.suning.com/", '+
				'loginTheme: "b2c_pop" '+
			'};'+
			'</script>';
		$("title").append(passportConfig);
		var src = '<script type="text/javascript" src="http://passport.suning.com/ids/js/passport.js'+version+'"/>';
		$("title").append(src);
	}
});