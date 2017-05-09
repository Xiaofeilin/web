var supermarket1 = supermarket1 || {};
supermarket1.priceDOM = [];
supermarket1.getPriceFlag = false;
supermarket1.switchPriceFlag = ""; //价格请求切换开关

$(function () {
	// 价格懒加载
    lazyelem.listen('div[data-sku]', 'fn', function(obj) {
    	supermarket1.priceDOM.push(obj);
    	if(supermarket1.getPriceFlag) {
            return;
        }
    	supermarket1.getPrice();
    });
});

// 判断是否在屏幕之内
supermarket1.isInScreen=function (obj) {
    var box = obj;
    if (box.length > 0) {
        return ($(window).scrollTop() + $(window).height()+580 > box.offset().top) && box.offset().top> $(window).scrollTop()-580;
    }
};

// 获取价格
supermarket1.getPrice = function() {
	supermarket1.getPriceFlag = true;
	GetPrice.queryprice(supermarket1.priceDOM, "1", supermarket1.getpricecallback);
};

//icps价格查询回调函数
supermarket1.getpricecallback = function(data){
	for(var i=0;i<data.length;i++){
		if(data[i]) {
			var refPrice = "";//参考价
			var price = "";	  //售价
			var bizCode = ""; //商家编码
			var status = "";//库存状态
			var cmmdtyCode = "";//商品编码
			// 售价
			if(data[i].price){
				price = data[i].price;
			}
			// 商家编码
			if(data[i].bizCode){
				bizCode = data[i].bizCode;
			}
			// 库存状态
			if(data[i].status){
				status = data[i].status;
			}
			// 商品编码
			if(data[i].cmmdtyCode){
				cmmdtyCode = data[i].cmmdtyCode.substring(9,data[i].cmmdtyCode.length);
			}
			var obj = supermarket1.priceDOM[0];
			
			if(!price){//售价为空，暂无报价
				supermarket1.priceDOM[0].find(".curPrice").html('<span>暂无报价</span>');
				supermarket1.priceDOM[0].find(".curPrice").parent().css({'border-color':'#fff'});
				supermarket1.priceDOM[0].next(".disCount").remove();
			}else{
				/**if(bizCode == '0000000000' && data[i].refPrice){//自营商品取refPrice
					refPrice = data[i].refPrice;// 参考价
				}else if(data[i].snPrice){//c店商品取price
					refPrice = data[i].snPrice; // 参考价（浮点字符串）
				}*/
				// modified by guweiqiang 20160222
				// 先判断refPrice是否为空，如果refPrice不为空，则参考价取refPrice；
				// 如果refPrice为空，则判断snPrice是否为空，如果snPrice不为空，则参考价取snPrice，否则参考价取price
				if(data[i].refPrice){ // refPrice不为空
					refPrice = data[i].refPrice; // 参考价=refPrice
				} else { // refPrice为空
					if(data[i].snPrice){ // snPrice不为空
						refPrice = data[i].snPrice; // 参考价=snPrice
					} else {
						refPrice = data[i].price; // 参考价=price
					}
				}
				// 获取销售价
				var priceInt = '';  	// 整数部分
				var priceFloat = '';   	// 小数部分
				var priceArr = price.split(".");
				if(priceArr.length==1){
					priceInt = priceArr[0];
				}
				if(priceArr.length==2){
					priceInt = priceArr[0];
					priceFloat = priceArr[1];
				}
				
				//回填售价
				obj.find(".curPrice").html('¥<span>'+priceInt+'</span>.'+priceFloat);
				var refPrice_displayFlag = false;
				
				// 计算折扣
				if(obj.hasClass("introductPrice-wrap")){ // 首页精选推荐
					if(price && refPrice){ // 销售价和参考价都不为空，才计算折扣
						var discount = calcDiscount(price, refPrice);
						if(parseFloat(discount) >= 0.1 && parseFloat(discount) <= 9.5){
							obj.next(".disCount").html('<span>'+discount+"</span>折");
							refPrice_displayFlag = true;
						} else {
							obj.next(".disCount").html("抢购");
							refPrice_displayFlag = false;
						}
					} else { // 销售价和参考价有一个为空，不计算折扣
						obj.next(".disCount").remove();
					}
					
				} else if(obj.hasClass("salePrice-wrap")) { // 2.5级页楼层商品
					if(price && refPrice){ // 销售价和参考价都不为空，才计算折扣
						var discount = calcDiscount(price, refPrice);
						if(parseFloat(discount) >= 0.1 && parseFloat(discount) <= 9.5){
							obj.next(".disCount").html("<div class='salePrice-content'><span>"+discount+"折</span></div>");
							refPrice_displayFlag = true;
						} else {
							obj.next(".disCount").html("<div class='salePrice-content'><span>抢购</span></div>");
							refPrice_displayFlag = false;
						}
					} else { // 销售价和参考价有一个为空，不计算折扣
						obj.next(".disCount").remove();
					}
					
				} else { // 其他
					refPrice_displayFlag = true;
				}
				
				// 判断是否展示参考价
				if(refPrice_displayFlag){
					obj.find(".refPrice").html('¥<del>'+refPrice+'</del>');
				}
			}
			
			// 判断库存
			if(status != 1){
				$("div[data-1='sku_"+cmmdtyCode+"']").each(function(){
					$(this).addClass("saleOut--bg").show();
				});
				$("div[data-2='sku_"+cmmdtyCode+"']").each(function(){
					$(this).addClass("saleOut--color").show();
				});
			}
			
			/*var _this = obj.next(".introductPrice-discount");
	    	var disnew = obj.next(".introductPrice-discount").text();
	    	againStyle(_this,disnew);*/
	    	
		}else{
			// 无价格
			supermarket1.priceDOM[0].find(".curPrice").html('<span>暂无报价</span>');
			supermarket1.priceDOM[0].find(".curPrice").parent().css({'border-color':'#fff'});
			supermarket1.priceDOM[0].next(".disCount").remove();
		}
		
		// 从数组中移除当前元素
		supermarket1.priceDOM.shift();
	}

	 if(supermarket1.priceDOM.length>0) {
		 GetPrice.queryprice(supermarket1.priceDOM, "1", supermarket1.getpricecallback);
	 } else {
	 	supermarket1.getPriceFlag = false;
	 }
};

//计算折扣
function calcDiscount(price, refPrice){
	var disCount = "";
	
	var t1 = 10 / parseFloat(refPrice / price); // 计算折扣率
	if(t1 < 0.1){
		disCount = "0.0";
	} else {
		// 扩大10倍
		var t2 = t1 * 10;
		// 向上取整
		var t3 = Math.ceil(t2);
		// 缩小10倍
		var t4 = t3 / 10;
		// 保留1位小数
		disCount = String(t4).substring(0, 3);
	}

	return disCount;
}

//折扣样式调整
function againStyle(_this,dis){
    var textLen=dis;
    var re=/br/i;
    var re2=/[\u4e00-\u9fa5]{2}/g;
    var result='';
    var allResult='';

    if(re.test(textLen)==false){
        var result2=textLen.replace(re2,function(str){
        	result='<p>'+str+'</p>';
            allResult=result;
            return allResult;
        });

        _this.html(result2);
        var re3=/折/;
        var thisLen=_this.find('p').length;
        if(thisLen==1){
        	_this.find('p').css({'line-height':'32px','fontSize':'16px'});
        }
        if(re3.test(textLen)){
        	_this.css({'line-height':'32px','fontSize':'16px'});
        }else{
            var re3=/折/;
            var textLen=_this.text();
            if(re3.test(textLen)){
            	_this.css({'line-height':'16px','fontSize':'14px'});
            }
        }
    }
}