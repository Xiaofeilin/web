var RedBaby=RedBaby||{};$(function(){$(".goodsChoose-title li").on("mouseenter",function(){$(this).addClass("active").siblings("li").removeClass("active");var b=$(this).index();$(".goodsChoose-item").eq(b).addClass("current").siblings(".goodsChoose-item").removeClass("current");$(".goodsChoose-item").eq(b).find("img[data-src2]").each(function(){var c=$(this);if(RedBaby.isInScreen(c)){c.attr("src",c.attr("data-src2")).removeAttr("data-src2").addClass("err-product")}});$(".goodsChoose-item").eq(b).find("img[data-src3]").each(function(){var c=$(this);if(RedBaby.isInScreen(c)){c.attr("src",c.attr("data-src3")).removeAttr("data-src3").addClass("err-product")}});lazyelem.listen("div[data-sku]","fn",function(c){supermarket1.priceDOM.push(c);if(supermarket1.getPriceFlag){return}supermarket1.getPrice()})});var a;setTimeout(function(){RedBaby.lazyLoad()},300);$(window).scroll(function(){clearTimeout(a);a=setTimeout(function(){RedBaby.lazyLoad()},300)})});RedBaby.lazyLoad=function(){var b=$("img[data-src2]"),a=$(".datalazyload");inScreenParents=[];b.each(function(){var c=$(this);if(RedBaby.isInScreen(c)){c.attr("src",c.attr("data-src2")).removeAttr("data-src2").addClass("err-product")}});a.each(function(){var i=$(this);if(RedBaby.isInScreen(i.parent())){inScreenParents.push(i.parent());var d=i.text(),h=d.length;if(h==0){return}var k=/\n+/g,g=/<!--.*?-->/ig,m=/\/\*.*?\*\//ig,e=/[ ]+</ig,j=d.replace(k,""),l=j.replace(g,""),f=l.replace(m,""),c=f.replace(e,"<");i.before(c).remove()}});if(RedBaby.isInScreen($(".titleGuessLove"))){if($("#tulingDiv").attr("tuling")&&$("#tulingDiv").attr("tuling")!=""){ProductObj.lazyLoadInit($("#tulingDiv"))}}};RedBaby.isInScreen=function(b){var a=b;if(a.length>0){return($(window).scrollTop()+$(window).height()+580>a.offset().top)&&a.offset().top>$(window).scrollTop()-580}};