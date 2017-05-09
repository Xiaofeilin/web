/**
 * 获取合约机卖点
 * 
 * @param phonePartnum
 *            手机商品编码，18位
 * @param cityId
 *            城市id
 * @param buyType
 *            购买方式（1：存费送机；2：购机送费）
 * @param callback
 *            回调函数
 */
function getSellPoint( phonePartnum, cityId, buyType, callback) {
	$.ajax({
		url : "http://hyj.suning.com/sellPointService/sellPoint_"
				+ phonePartnum + "_" + cityId + "_" + buyType
				+ ".hs",
		cache:true,
		dataType : "jsonp",
		timeout : 3000,
		jsonp : "callback",
		jsonpCallback : "callbackFun",// jsonp回调函数名需固定
		success : function(data) {
			data.phonePartnum = phonePartnum;
			callback(data);
		}
	});
}

/**
 * 获取合约机卖点 for search
 * @param phoneCommdtyID
 *            搜索提供的商品标识
 * @param phonePartnum
 *            手机商品编码，18位
 * @param cityId
 *            城市id
 * @param buyType
 *            购买方式（1：存费送机；2：购机送费）
 * @param callback
 *            回调函数
 */
function getSellPointForSS(phoneCommdtyID, phonePartnum, cityId, buyType, callback) {
	$.ajax({
		url : "http://hyj.suning.com/sellPointService/sellPointForSS_"
				+ phonePartnum + "_" + cityId + "_" + buyType + "_" + phoneCommdtyID
				+ ".hs",
		cache:true,
		dataType : "script",
		timeout : 3000,
		jsonp : "callback",
		jsonpCallback : "callbackFunForSS"// jsonp回调函数名需固定
		//success : function(data) {
		//	callback(data);
		//}
	});
}

function callbackFunForSS(data){
	sellPoints(data);
}