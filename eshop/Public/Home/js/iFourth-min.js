(function(c){var b=c.screen,a=c.document.documentElement;
if(b.width>1200){a.className+=a.className.length?" root1200":"root1200"
}})(window);
var Util={printf:function(a){var b=arguments,c=1;
return a.replace(/%s/g,function(){return b[c]?b[c++]:""
})
},toClockStr:function(b){var e=Math.floor((b%(24*3600))/3600).toString(),a=Math.floor((b%3600)/(60)).toString(),c=Math.floor(b%60).toString();
e=e.length===1?"0"+e:e;
a=a.length===1?"0"+a:a;
c=c.length===1?"0"+c:c;
return e+":"+a+":"+c
},checkkey:function(b,a){b.value=b.value.replace(/[^\d.]/g,"");
b.value=b.value.replace(/^\./g,"");
b.value=b.value.replace(/\.{2,}/g,".");
b.value=b.value.replace(/^\d{1,10}\.\d{3}?$/g,b.value.substr(0,b.value.length-1));
b.value=b.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
},lazyload:function(a){$(window).scroll(function(){$(a).find("img").each(function(){if($(window).scrollTop()>$(this).offset().top-$(window).height()&&$(this).attr("src2")){$(this).attr("src",$(this).attr("src2")).removeAttr("src2")
}})
})
},alertBox:function(p){var f={id:"proPop",closeId:"proPopCloseBtn",submit:"proPopSubmit",hasMask:true,submitRemove:false,iconType:"info",msg:""};
$("#attrWrongInfo").html("");
var a=$.extend({},f,p);
var l=document.getElementById(a.id);
var i=document.documentElement.scrollHeight;
var n=document.body.clientWidth;
var c=!!window.ActiveXObject;
var h=c&&!window.XMLHttpRequest;
var k=a.hasMask?0.7:0;
if($("#mask").length>0){$("#mask").remove()
}var o=document.createElement("div");
o.id="mask";
l.style.display="block";
var m=n/2-l.clientWidth/2;
var b=(document.body.scrollTop||document.documentElement.scrollTop)+window.screen.height/2-l.clientHeight/2-100;
o.style.cssText="position:absolute;top:0;left:0;background:#333;height:"+i+"px;width:"+n+"px;z-index:10010;opacity:"+k+";filter:alpha(opacity="+k*100+");";
document.body.appendChild(o);
if(h){var g=document.createElement("iframe");
g.style.position="absolute";
g.style.top=0;
g.style.left=0;
g.style.zIndex="10010";
g.style.height=i+"px";
g.style.width=n-10+"px";
g.style.filter="alpha(opacity=0)";
document.body.appendChild(g)
}l.style.zIndex="10011";
l.style.cssText=" ;display:block;left:"+m+"px;top:"+b+"px;z-index:10011;";
document.getElementById(a.closeId).onclick=e;
if(document.getElementById(a.submit)){document.getElementById(a.submit).onclick=function(){if(a.submitRemove){if($("#proPop").find(".msg").html().indexOf("此商品库存不足")!=-1||$("#proPop").find(".msg").html().indexOf("您购买的数量超过库存上限")!=-1){window.location.reload()
}e()
}}
}function e(){$("#attrWrongInfo").html("");
l.style.display="none";
o.parentNode.removeChild(o);
if(h){g.parentNode.removeChild(g)
}}var j=$(l).find(".tipIcon");
switch(a.iconType){case"ok":j.attr("class","tipIcon fl tipOK3");
break;
case"info":j.attr("class","tipIcon fl tipInfo3");
break;
case"false":j.attr("class","tipIcon fl tipFalse3");
break;
case"help":j.attr("class","tipIcon fl tipHelp3");
break
}if(a.msg){$(l).find(".msg").html(a.msg)
}},alertBoxForClose:function(a){this.alertBox({id:"proPop",closeId:"proPopCloseBtn",submit:"proPopSubmit",iconType:"help",submitRemove:true,msg:a});
sn.status=false;
if(sn.vendorCode==""){initProductPrice(sn.cityId)
}else{initCShopPrice(sn.cityId)
}},alertErrorBox:function(a){this.alertBox({id:"proPop",closeId:"proPopCloseBtn",submit:"proPopSubmit",iconType:"false",submitRemove:true,msg:a})
},alertHelpBox:function(a){this.alertBox({id:"proPop",closeId:"proPopCloseBtn",submit:"proPopSubmit",iconType:"help",submitRemove:true,msg:a})
},alertOkBox:function(a){this.alertBox({id:"proPop",closeId:"proPopCloseBtn",submit:"proPopSubmit",iconType:"ok",submitRemove:true,msg:a})
}};
var iFourth=iFourth||{ie6:!window.XMLHttpRequest,win:$(window),body:$("body"),mask:$("#J-overlay")};
iFourth.init=function(){iFourth.body=$("body");
iFourth.mask=$("#J-overlay");
var a=new iFourth.Zoom("#imgZoom");
iFourth.breadcrumb();
iFourth.buyNum();
iFourth.attrChoose();
iFourth.servLabel();
iFourth.TZM.init();
iFourth.proSideIndex();
iFourth.showRating.start();
iFourth.shareBtn();
iFourth.listloop({wrap:"#J-slide1",loopBox:".proinfo-rec-list ul"});
iFourth.listloop({wrap:"#J-slide2",loopBox:".nopro-rec-list ul",step:{wide:5,narrow:4},scrollWidth:{wide:775,narrow:580}});
iFourth.listloop({wrap:"#J-slide3",loopBox:".nopro-rec-list ul",step:{wide:5,narrow:4},scrollWidth:{wide:775,narrow:580}});
iFourth.priceFeedbackDialog();
iFourth.zitiPop();
iFourth.procon();
iFourth.Tab(".toppro-tab",".toppro-list",function(e,b,c){});
iFourth.Tab(".tiein-box .tabarea-items",".tiein-box .tabarea-content",function(e,b,c){});
iFourth.tiein();
iFourth.tieInRec();
iFourth.setMeal();
lazyelem.listen();
iFourth.floatBar({zIndex:11000,contents:$("#snSideTools"),align:"right",vertical:"bottom",css:{right:60,marginBottom:260}});
iFourth.overseDeliver()
};
iFourth.bookConNav=function(){var e=iFourth.win,f=$(".bookcon"),c=$(".bookcon-side");
var b=f.height(),a=c.height();
if(a>b){f.attr("style","min-height:"+a+"px;_height:"+a+"px")
}f.on("click",".bookcon-side ul li",function(){var g=$(this),h=$(g.attr("rel")).offset().top-45;
g.addClass("current").siblings().removeClass("current");
e.scrollTop(h)
});
e.scroll(function(){if(c.is(":visible")){var g=e.scrollTop(),i=f.offset().top,j=i-36,h=f[0].scrollHeight+i-400;
if(g>j&&g<h){c.css("top",g-i+36+"px")
}else{if(g>=h){c.css("top",h-i+"px")
}else{c.css("top","0")
}}}else{c.css("top","0")
}})
};
iFourth.floatBar=function(){var f={contents:null,align:"right",vertical:"middle",zIndex:7500,css:null,id:null,ieFixed:true};
var i=($.browser.msie)?parseInt($.browser.version):false;
if(arguments.length<1||!(arguments[0] instanceof Object)){return $.error("ECode.floatBar: 参数必须为JSON对象")
}$.extend(f,arguments[0]);
var b={position:"fixed",top:"-9999em",left:"-9999em"};
if(i&&i<=6){b.position="absolute"
}$('<div class="ECode-floatBar"></div>').css(b).appendTo("body");
var j=$("body").find(".ECode-floatBar:last");
j.append(f.contents);
var e=j.width(),a=j.height(),h={zIndex:f.zIndex};
if(f.id!=null){j.attr("id",f.id)
}switch(f.align){case"right":h.left="auto";
h.right=0;
break;
case"left":h.right="auto";
h.left=0;
break;
case"center":h.right="auto";
h.left="50%";
h.marginLeft=-e/2;
break
}switch(f.vertical){case"top":h.top=0;
break;
case"bottom":h.top="auto";
h.bottom=0;
break;
case"middle":h.top="50%";
h.marginTop=-a/2;
if(i&&i<=6){h.marginTop=0
}break
}j.css($.extend(h,f.css));
var c=function(){var o=$(document).scrollTop(),k=$(window).height(),l=$(document).width();
switch(f.vertical){case"top":j.stop().animate({top:o});
break;
case"bottom":var n=k+o-a;
if(f.css.marginBottom!=null){var m=parseInt(f.css.marginBottom);
if(m>=0){n-=m
}}j.css({marginTop:0}).stop().animate({top:n});
break;
case"middle":j.stop().animate({top:k/2+o-a/2});
break
}};
if(f.ieFixed&&i&&i<=6){c();
$(window).scroll(function(){c()
});
$(window).resize(function(){c()
})
}$(window).scroll(function(){var k=$(document).scrollTop();
var l=$("#gotop");
if(k>20){l.show()
}else{l.hide()
}});
var g;
$(".erweima").hover(function(){clearTimeout(g);
$("#ewmPic").show().find("img").attr("src",$("#ewmPic").show().find("img").attr("src3"))
},function(){clearTimeout(g);
g=setTimeout(function(){$("#ewmPic").hide()
},200)
})
};
iFourth.gotop=function(){$("html,body").scrollTop(0)
};
iFourth.lazyAjax=function(b,a){var e={},c=true,h,f,g=iFourth.win;
$(b).each(function(){var i=$(this);
e[i.attr("id")]={obj:i,url:i.attr("data-url"),type:i.attr("data-type"),handle:null,enable:true,_cache:true}
});
g.scroll(function(){if(c){for(f in e){(function(){var m=e[f],o=m.obj,j=m.url,k=m.type||"json",i=m.enable,l=m.handle,n=m.cache!=undefined&&!m.cache?false:true;
trigger=(g.scrollTop()+g.height())>(o.offset().top-50);
if(!i||!trigger){return false
}if(j){k=="jsonp"&&$.ajax({url:j,cache:n,dataType:"jsonp",jsonpCallback:l,error:function(p,q){a(o,j,{error:q?q:"unknown"})
}})||$.ajax({url:j,cache:n,type:"get",success:function(p){k=="json"&&a(o,j,p);
k=="html"&&o.html(p);
l(p)
},error:function(p,q){a(o,j,{error:q?q:"unknown"})
}});
e[f].enable=false
}if(k=="function"&&m.handle){m.handle();
e[f].enable=false
}})()
}c=false;
setTimeout(function(){c=true
},200)
}});
g.scroll();
return e
};
iFourth.listloop=function(b){var e={wrap:"",loopBox:"",triggerLeft:".prev",triggerRight:".next",curCount:".cur-count",totalCount:".total-count",step:{wide:4,narrow:4},scrollWidth:{wide:580,narrow:580},hasCount:true,isLoop:true,isLazyLoad:true,delay:0,hasLabel:false,labelObj:null,vertical:false};
$.extend(e,b);
var m=$(e.wrap),u=m.find(e.triggerLeft),a=m.find(e.triggerRight),w=m.find(e.loopBox),j=w.find("li:not(.hide)"),g=e.step.wide,p=e.scrollWidth.wide,y=Math.ceil(j.length/g),h=j.length,n=m.find(e.curCount),z=m.find(e.totalCount),x=0;
if(screen.width<1280){g=e.step.narrow;
p=e.scrollWidth.narrow;
var A=j.length%g;
y=Math.ceil(j.length/g);
y=y==0?1:y;
h=j.length-A
}e.hasCount&&z.html(y);
u.unbind().click(function(){s()
});
a.unbind().click(function(){t()
});
n.text("1");
if(!e.isLoop){u.addClass("prev-disable")
}if(y==1){a.addClass("next-disable")
}var q=b.labelObj,c="",k;
if(q){if(y<=1){q.hide()
}q.find(".prev").unbind().click(function(){s()
});
q.find(".next").unbind().click(function(){t()
});
for(k=0;
k<y;
k++){c+="<li></li>"
}q.find("ul").html(c).find("li").click(function(){x=$(this).index();
v(false,$(this).index())
}).first().addClass("current")
}function t(){if(y==1||w.is(":animated")){return false
}if(!e.isLoop){x++;
if(x>=y){x=y-1
}v(function(){if(x==y-1){a.addClass("next-disable")
}u.removeClass("prev-disable")
},x);
return
}if(x==y-1){for(var i=0;
i<g;
i++){if(e.vertical){j.eq(i).css({position:"relative",top:y*p+"px"})
}else{j.eq(i).css({position:"relative",left:y*p+"px"})
}}}x++;
v(function(){if(x==y){x=0;
j.removeAttr("style");
if(e.vertical){w.css("top",x*p)
}else{w.css("left",x*p)
}}},x)
}function s(){if(y==1||w.is(":animated")){return false
}if(!e.isLoop){x--;
if(x<=0){x=0
}v(function(){if(x==0){u.addClass("prev-disable")
}a.removeClass("next-disable")
},x);
return
}if(x==0){for(var i=1;
i<=g;
i++){if(e.vertical){j.eq(h-i).css({position:"relative",top:-y*p+"px"})
}else{j.eq(h-i).css({position:"relative",left:-y*p+"px"})
}}}x--;
v(function(){if(x==-1){x=y-1;
j.removeAttr("style");
if(e.vertical){w.css("top",-x*p)
}else{w.css("left",-x*p)
}}},x)
}function v(B,i){o();
if(e.hasCount){if(i>y-1){i=0
}if(i<0){i=y-1
}n.html(i+1)
}if(!B){B=function(){}
}if(e.vertical){w.stop().animate({top:-x*p},300,B)
}else{w.stop().animate({left:-x*p},300,B)
}r(x==y?0:x);
if(q){q.find("li").removeClass("current").eq(x==y?0:x).addClass("current")
}}function o(){if(!e.isLazyLoad){return
}for(var B=0;
B<g;
B++){var i=j.eq(x*g+B).find("img");
if(i.attr("src3")){i.attr("src",i.attr("src3")).removeAttr("src3").addClass("err-product")
}}}function l(){var C=[],B,D;
C.push('<ul class="pager">');
for(B=1;
B<=y;
B++){C.push("<li"+(B==1?' class="current"':"")+">"+B+"</li>")
}C.push("</ul>");
var i=$(C.join("")).appendTo(m);
i.find("li").hover(function(){var E=$(this).index();
D=setTimeout(function(){w.find("li").eq((E+1)*g).prevAll().andSelf().find("img[src3]").each(function(){var F=$(this);
F.attr("src",F.attr("src3")).removeAttr("src3").addClass("err-product")
});
w.stop().animate({left:-E*p},300);
r(E);
x=E
},100)
},function(){clearTimeout(D)
})
}function r(B){m.find(".pager li").removeClass("current").eq(B).addClass("current")
}if(e.hasLabel){l()
}if(e.delay){var f=setInterval(function(){t()
},e.delay);
m.hover(function(){clearInterval(f)
},function(){f=setInterval(function(){t()
},e.delay)
})
}};
iFourth.singleloop=function(c){var f={wrap:"",loopBox:"",triggerLeft:".prev",triggerRight:".next",curCount:".cur-count",totalCount:".total-count",loopWidth:180,prePageWide:5,prePageNarrow:4,isLoop:false};
$.extend(f,c);
var i=$(f.wrap),g=i.find(f.loopBox),m=i.find(f.triggerLeft),j=i.find(f.triggerRight),a=f.isLoop,n=i.find(f.totalCount),b=i.find(f.curCount),k;
if(screen.width>=1200){k=f.prePageWide
}else{k=f.prePageNarrow
}n.text(i.find("li").size());
b.text("1");
if(i.find("li").size()<=f.prePageWide){m.hide();
j.hide()
}function e(p){var o="+="+f.loopWidth+"px";
l(o,-1,p)
}function h(o){l("-="+f.loopWidth+"px",1,o)
}function l(o,s,r){var t=parseInt(b.html()),q=parseInt(n.html()),p=t+s;
if(parseInt(b.html())<=1){m.addClass("ctr-disabled");
j.removeClass("ctr-disabled")
}if(g.is(":animated")||r.is(".ctr-disabled")){return false
}g.stop().animate({left:o});
b.text(p);
if(!a){if(q-p<k){j.addClass("ctr-disabled");
m.removeClass("ctr-disabled")
}else{m.removeClass("ctr-disabled");
j.removeClass("ctr-disabled")
}}if(p<=1){m.addClass("ctr-disabled")
}}m.unbind().click(function(){e($(this))
});
j.unbind().click(function(){h($(this))
})
};
iFourth.breadcrumb=function(){var a=iFourth.body;
if(iFourth.ie6){$(".breadcrumb .dropdown").each(function(){var b=$(this);
b.css("width",b.width())
})
}$(".breadcrumb .dropdown-text a").click(function(b){b.stopPropagation()
});
a.on("click",".breadcrumb .dropdown",function(b){if($(this).find(".dropdown-option").size()==0){return false
}$(this).toggleClass("dropdown-active").siblings().removeClass("dropdown-active");
b.stopPropagation()
});
a.click(function(){$(".breadcrumb .dropdown").removeClass("dropdown-active")
})
};
iFourth.breadcrumbSize=function(b){var a=b.children().size();
a=a>6?6:a;
b.width(a*80)
};
iFourth.buyNum=function(){var g=$(".proinfo-num"),h=g.find(".minus"),f=g.find(".plus"),c=g.find("input:text"),a=parseInt(c.attr("max")||99),e=parseInt(c.val())||1;
a=a>99?99:a;
function b(){e==1&&h.addClass("minus-disable")||h.removeClass("minus-disable");
e==a&&f.addClass("plus-disable")||f.removeClass("plus-disable")
}h.unbind().click(function(){!$(this).is(".minus-disable")&&c.val(--e),b()
});
f.unbind().click(function(){!$(this).is(".plus-disable")&&c.val(++e),b()
});
c.unbind().on("keyup paste click drop",function(i){var j=parseInt(c.val());
j=j?j:1;
j=j>a?a:j;
if(i.type=="drop"){setTimeout(function(){c.val(e=j);
b()
},100)
}else{c.val(e=j);
b()
}});
b()
};
iFourth.servLabel=function(){var a;
$(".proinfo-serv span[tooltip], .mainbtns a[tooltip]").hover(function(f){if(f.target.className=="tooltip"){return false
}var c=$(this),b=c.attr("tooltip");
if(b){a=setTimeout(function(){$('<div class="tooltip"><i></i>'+b+"</div>").appendTo(c).fadeIn(100)
},100)
}},function(){clearTimeout(a);
$(this).find(".tooltip").fadeOut(100,function(){$(this).remove()
})
})
};
iFourth.attrChoose=function(){var b=$(".proattr-result"),a=b.find("dd .result-text");
function e(){var f="";
$(".proattr-radio li.selected, .proattr-check li.selected").each(function(){f+='"'+$(this).attr("title")+'" '
});
$(".proinfo-bangke input:checked").each(function(){f+='"'+$(this).next("label").text()+'" '
});
a.text(f);
(f==""&&$("#phonedl li.selected").size()==0)&&b.hide()||b.show()
}function c(){var f=true;
$("#J-TZM dl:visible dd input:hidden").each(function(){if($(this).val()==""){f=false
}});
f&&iFourth.TZM.hide()
}$(".proattr-radio").each(function(){var h=$(this),f=h.find("li:not(.disabled,.c-disabled)"),g=h.find("input:hidden");
f.click(function(){var j=$(this);
j.addClass("selected").siblings().removeClass("selected");
g.val(j.attr("data-id"));
if(sn.pageFlag!=undefined&&sn.pageFlag==1){var i=$(this).attr("sid");
gMain.initSubCss(i,$(this).index())
}e();
c()
})
});
$(".proattr-check").each(function(){var h=$(this),f=h.find("li:not(.disabled)"),g=h.find("input:hidden");
f.unbind("click").click(function(){var j=$(this),i=[];
j.toggleClass("selected");
h.find("li.selected").each(function(){i.push($(this).attr("data-id"))
});
g.val(i.join("|"));
e();
c()
})
});
$(".proinfo-bangke input").change(function(){e()
});
e()
};
iFourth.TZM={init:function(){var a=this,b=$(".tzm");
this.border=b.find(".tzm-border");
this.btnClose=b.find(".close");
this.btnClose.click(function(){a.hide()
})
},show:function(){this.border.show();
this.btnClose.show();
if($.browser.msie&&$.browser.version=="7.0"){this.border.css("zoom","1")
}$(".tzm").css("z-index","3")
},hide:function(){this.border.hide();
this.btnClose.hide();
$(".tzm").css("z-index","2")
}};
iFourth.proSideIndex=function(){var b=$(".proinfo-side"),a=$(".proinfo-main"),c=b.height(),e=a.height();
iFourth.mainHeight();
b.hover(function(){$(this).addClass("proinfo-side-hover")
},function(){$(this).removeClass("proinfo-side-hover")
});
$(".proinfo-side-switch").click(function(){var f=$(this),g=f.find("p");
if(b.is(".proinfo-side-show")){g.html("&lt;");
b.removeClass("proinfo-side-show").animate({width:0},300);
f.removeClass("proinfo-side-switch-unfold").animate({right:0},300)
}else{g.html("&gt;");
b.addClass("proinfo-side-show").animate({width:199},300);
f.addClass("proinfo-side-switch-unfold").animate({right:198},300)
}});
if(!$("html").is(".root1200")){b.append('<div class="temp-blank"></div>')
}};
iFourth.mainHeight=function(){var b=$(".proinfo-side").css("height","auto"),a=$(".proinfo-main").css("height","auto");
if(b[0]&&a[0]){var e=b[0].scrollHeight,f=a[0].scrollHeight,c=0;
if(f<e){c=e<430?430:e;
a.height(c-40);
b.height(c)
}else{c=f<430?430:f;
a.height(c-40);
b.height(c)
}}};
iFourth.priceFeedbackDialog=function(){$(".btn-price-feedback").unbind("click");
$(".btn-price-feedback").click(function(){$("body").AjaxLogin({success:function(){var f=sn.shopName;
$("#feedbackShopName").html(f);
var c=$(".address-placement span").eq(1).html();
if(c==""||c=="undefined"){var b=$(".address-placement span").eq(1).html();
$("#feedbackCity").attr("default",b)
}else{$("#feedbackCity").attr("default",c)
}var e=$("#feedback_image").val();
$("#feedBackImg").attr("src",e);
var a=sn.promotionPrice!=undefined?sn.promotionPrice:"";
if(sn.priceType=="0"){$("#feedback_price_name label").text("易购价：")
}else{if(sn.priceType=="1"){$("#feedback_price_name label").text("促销价：")
}else{if(sn.priceType=="4"&&PriceShow.serviceType=="2"){$("#feedback_price_name label").text("抢购价：")
}else{if(sn.priceType=="4"&&PriceShow.serviceType=="3"){$("#feedback_price_name label").text("团购价：")
}else{if(sn.priceType=="4"){$("#feedback_price_name label").text("大聚惠：")
}}}}}$("#feedbackPrice").html("<i>&yen;</i> "+a);
$("input[name=priceplace]:eq(0)").attr("checked","checked");
$(".price-feedback-text").each(function(){var h=$(this),g=h.attr("default");
h.val(g);
h.focus(function(){var i=$(this);
if(i.val()==g){i.val("");
i.addClass("price-feedback-text-dark")
}});
h.blur(function(){var i=$(this);
if(i.val()==""){i.val(g);
i.removeClass("price-feedback-text-dark")
}})
});
$("#foundDate").val(iFourth.getCurDate());
$.mDialog({title:"请告诉我们更低的价格？",message:$("#win_priceFeedback"),css:{width:"480px"},overlay:true,overlayCss:{background:"black",opacity:"0.3"},overlayClick:true})
}});
$("#foundDate").click(function(){$("#J-calendar").click();
return false
});
ECode.calendar({inputBox:"#J-calendar",showbox:"#foundDate",pos:{right:0,top:-230},range:{mindate:null,maxdate:new Date()},notdate:[],isWeek:false,callback:function(){var a=document.getElementById("foundDate");
iFourth.checkFeedBackInput(a)
}})
});
$("input[name=priceplace]").die().live("click",function(){var a=parseInt($(this).val());
$(".price-feedback-form-item").hide().eq(a).show()
});
$(".price-feedback-button .btn-submit").die().live("click",function(){$("body").AjaxLogin({success:function(){iFourth.submitFeedBack()
}})
})
};
iFourth.addCartPop={elem:$("#addCartPop"),init:function(){var b=this,a=this.elem;
a.find(".close").click(function(){b.hide()
})
},hide:function(){this.elem.hide();
iFourth.mask.hide()
},show:function(){var c=this,b=this.elem,a=this.mask,e=$(window);
b.css({marginTop:(e.height()-b.outerHeight())/2,marginLeft:(e.width()-b.outerWidth())/2}).show();
iFourth.mask.show()
}};
iFourth.sideRec=function(){var f=$("#J-sideRec"),c=f.find(".more"),a=f.find(".si-rec-list li"),b=Math.ceil(a.size()/2),e=1;
c.click(function(){e=e==b?1:e+1;
var g=a.hide().eq((e-1)*2);
g.add(g.next().get(0)).show().find("img[src3]").each(function(){var h=$(this);
h.attr("src",h.attr("src3")).removeAttr("src3")
})
})
};
iFourth.procon=function(){var e=$(".procon"),b=$(".procon-toolbar"),c=$("#J-fixBar"),h=c.find(".area"),g=e.find(".proinfo-mini"),f=iFourth.win,a=0;
e.find(".tabarea-items li").click(function(){var i=e.offset().top;
if(f.scrollTop()>i){f.scrollTop(i)
}});
e.find(".handle").hover(function(){if(sn.pageFlag!=undefined&&sn.pageFlag==1){gMain.initMiniCartInfo()
}else{$(".proinfo-mini span.count em").html($(".proinfo-num input").val())
}g.stop().show(200)
},function(){g.stop().hide(200)
});
f.scroll(function(){var i=f.scrollTop(),j=e.offset().top;
if(i>=j&&a==0){b.children().appendTo(h);
c.show();
a=1
}if(i<j&&a==1){h.children().appendTo(b).find(".proinfo-mini").hide();
c.hide();
a=0
}})
};
iFourth.shareBtn=function(){var a=$(".share"),b=$(".share-btn");
b.click(function(c){a.toggleClass("share-active");
c.stopPropagation()
});
iFourth.body.click(function(){a.removeClass("share-active")
})
};
var cDown;
iFourth.countdown=function(b){var g=$(".proinfo-cd"),i=g.find(".d"),f=g.find(".h"),a=g.find(".m"),e=g.find(".s"),c=0;
remain=parseInt(g.find("input:hidden").val());
Time1=parseInt(remain/3600/24);
if(Time1>99){$(".proinfo-cd .d").addClass("d-three");
c=1
}function j(){if(remain>=1){remain--;
var l=remain;
var k=0;
var h=0;
var m=0;
m=parseInt(remain/3600/24);
h=parseInt(remain/3600%24);
k=parseInt(remain/60%60);
l=parseInt(remain%60);
l=l<10?"0"+l:l.toString();
k=k<10?"0"+k:k.toString();
h=h<10?"0"+h:h.toString();
if(m>=10&&c==1){m=m<100?"0"+m:m.toString()
}else{if(m>=10&&c==0){m=m
}else{if(m<10&&c==1){m="00"+m
}else{m="0"+m
}}}i.text(m);
f.text(h);
a.text(k);
e.text(l);
b(remain)
}cDown=setTimeout(arguments.callee,1000)
}j()
};
iFourth.putRight=function(a){$("#J-procon-param").on("mouseenter","tr",function(){$(this).find(".err").addClass("hover")
}).on("mouseleave","tr",function(){$(this).find(".err").removeClass("hover")
});
$("#J-procon-param").on("click",".err a",function(){var b=this;
$("body").AjaxLogin({success:function(){$.mDialog({title:"参数纠错",message:$("#paramWrongPop"),css:{width:"420px"},overlay:true,overlayCss:{background:"black",opacity:"0.3"},overlayClick:true});
a&&a(b)
}})
});
$("#J-procon-param").on("click",".pro-para-help",function(){$(".pro-para-tip").hide();
$(".pro-para-tbl .name-inner").removeAttr("style");
$(this).siblings(".pro-para-tip").show().parent().css("z-index","11")
});
$("#J-procon-param").on("click",".pro-para-tip .close",function(){$(this).parent().hide().parent().removeAttr("style")
})
};
iFourth.zitiPop=function(){$(".btn-ziti").click(function(){$.mDialog({title:"现货门店列表",message:$("#win_ziti"),css:{width:"460px"},overlay:true,overlayCss:{background:"black",opacity:"0.3"},overlayClick:true})
})
};
iFourth.zengpin=function(){var a=$("#zengpin-popimg"),b;
$(".zengpin tr").hover(function(){clearTimeout(b);
var c=$(this).find(".img img"),e=c.attr("src-large"),f=c.position();
b=setTimeout(function(){if(a.size()==0){a=$('<img style="position:absolute; width:200px; height:200px; border:solid 1px #EEE; z-index:6;"/>').css({left:f.left-205,top:f.top-105}).appendTo(".proinfo-main")
}a.attr("src",e).show().animate({top:f.top-85},200);
$(".proinfo-main").css("z-index",6)
},200)
},function(){clearTimeout(b);
b=setTimeout(function(){a.hide();
$(".proinfo-main").css("z-index",4)
},200)
})
};
iFourth.scodeHelp=function(){var a=$(".proinfo-main"),b;
$(".scode-help-icon").hover(function(){var c=$(this);
clearTimeout(b);
b=setTimeout(function(){var f=$('<div class="scode-help-tip"><i></i>'+c.attr("data-tip")+"</div>"),h=c.position(),g=h.left-50,e=587;
if(g+250>e){g=e-250
}f.css({position:"absolute",top:h.top+25,left:g}).find("i").css("left",h.left-g);
a.append(f)
},100)
},function(){clearTimeout(b);
b=setTimeout(function(){$(".scode-help-tip").remove()
},100)
})
};
iFourth.overseDeliver=function(){var a;
if(iFourth.ie6){$(".proinfo-deliver-oversea .process .bg").width($(".proinfo-deliver-oversea .process").outerWidth())
}$(".proinfo-deliver-oversea").find(".process, .process-dropdown").hover(function(){clearTimeout(a);
var b=$(this);
a=setTimeout(function(){b.parents(".proinfo-deliver-oversea").addClass("proinfo-deliver-oversea-unfold")
},100)
},function(){clearTimeout(a);
var b=$(this);
a=setTimeout(function(){b.parents(".proinfo-deliver-oversea").removeClass("proinfo-deliver-oversea-unfold")
},100)
})
};
iFourth.o2oPop={init:function(c){var b=this,a=$("#win_o2o");
$(".proinfo-o2o li:not(.item1) a").live("click",function(){var e=$(this).closest("li"),f=a.find(".title h3");
if(e.hasClass("item6")){f.text("体验店");
a.addClass("tiyandian")
}else{f.text("门店服务");
a.removeClass("tiyandian")
}$("#win_o2o .areas dd").removeClass("unfold");
b.show();
c(this)
});
iFourth.mask.click(function(){b.hide()
});
a.on("click",".close",function(){b.hide();
iFourth.mask.animate({opacity:0},200,function(){$(this).hide()
})
});
a.on("click",".areas .more",function(){$(this).parent().toggleClass("unfold")
});
a.on("mouseenter mouseleave",".o2o-service-main li",function(f){if(f.type=="mouseenter"){$(this).addClass("hover")
}if(f.type=="mouseleave"){$(this).removeClass("hover")
}})
},show:function(){var b=$("#win_o2o"),a=b.outerHeight();
b.fadeIn(200);
iFourth.mask.show().animate({opacity:0.3},200);
if(iFourth.ie6){b.css("top",iFourth.win.scrollTop()+(iFourth.win.height()-b.outerHeight())/2-20)
}else{b.css("margin-top",-a/2-20)
}},hide:function(){$("#win_o2o").fadeOut(200)
},updateFilter:function(){var a=$("#win_o2o .areas dd ul")[0].clientHeight;
if(iFourth.ie6){if(a>50){$("#win_o2o .areas dd").height(46)
}}if(a>50){$("#win_o2o .more").show()
}else{$("#win_o2o .more").hide()
}},updateContent:function(){var a=$("#win_o2o .o2o-service-main li:visible").size();
if(a<5){$("#win_o2o .watermark").height((5-a)*62)
}else{$("#win_o2o .watermark").height(0)
}}};
iFourth.showRating={setPosition:function(a){a.ele.stop().animate({top:a.val},400)
},setVal:function(a){a.ele1.stop().animate({width:a.val},300);
a.ele2.text(a.val)
},start:function(){var f=this;
var b=$(".store-more"),a=b.find(".more-info"),e=a.find(".star-val"),c=a.find(".good-val");
b.on("mouseenter",".si-main ul li",function(){var k=$(this),h=k.attr("rating"),j=k.position().top;
a.show();
k.addClass("hover");
var g={ele1:e,ele2:c,val:h};
var i={ele:a,val:j};
f.setVal(g);
f.setPosition(i)
});
b.on("mouseleave",".si-main ul li",function(){var g=$(this);
g.removeClass("hover");
a.hide()
})
}};
iFourth.Tab=function(b,c,a){$(b).children("li").click(function(){var f=$(this),e=$(f.attr("rel")),g=f.attr("data-url"),h=f.attr("data-type")||"json";
if(f.is(".current")){return false
}f.addClass("current").siblings().removeClass("current");
e.siblings(c).hide();
e.show().find("img[src3]").each(function(){var i=$(this);
i.attr("src",i.attr("src3")).removeAttr("src3")
});
if(g&&!f.attr("loaded")){h=="jsonp"&&$.ajax({url:g,dataType:"jsonp",jsonp:"jsonpcallback"})||$.get(g,function(i){h=="json"&&a(e,g,i);
h=="html"&&e.html(i)
});
f.attr("loaded","loaded")
}if(h=="function"){a(e)
}})
};
iFourth.tiein=function(){var a=$(".tiein");
a.on("mouseenter",".tiein-list li",function(){$(this).addClass("hover")
});
a.on("mouseleave",".tiein-list li",function(){$(this).removeClass("hover")
})
};
iFourth.wrapParam=function(){var l=$(".hover-liner"),m=$(".prods-param-list li"),h=$(".prods-param-list"),b=$(".prods-param-list .on"),i=b.index(),k=i,f=g*180,g=m.size(),a,e;
function j(n){l.stop().animate({left:n},200)
}function c(n,r){var q=$(".hover-liner").offset().left,p=$(".prods-param-list li").eq(n).offset().left;
var o=p-q;
if(o>0){o="+="+o+"px"
}else{o="-="+(-o)+"px"
}return o
}m.hover(function(){l.show();
var o=$(this),n=setTimeout(function(){var p=o.index();
a=c(p,k);
j(a);
k=p
},200)
},function(){clearTimeout(e)
});
h.mouseleave(function(){var n=b.offset().left,o=$(".list-wrapper").offset().left;
l.stop().animate({left:n-o},200,function(){l.hide()
});
k=b.index()
});
m.click(function(){$(this).siblings().removeClass("on");
$(this).addClass("on");
b=$(this);
var n=b.offset().left,o=$(".list-wrapper").offset().left;
k=b.index();
l.stop().animate({left:n-o},200);
var p=$(this).index();
$(".prods-show-rel").hide().eq(p).show()
}).first().click();
l.css("left",i*180+30+"px");
if(screen.width>=1200){if(g<5){$(".list-wrapper").css({width:f});
$(".prods-show .prev").hide();
$(".prods-show .next").hide()
}}else{if(g<4){$(".prods-show .prev").hide();
$(".prods-show .next").hide()
}}iFourth.singleloop({wrap:".prods-show",loopBox:".prods-param-list",triggerLeft:".prev",triggerRight:".next",loopWidth:180,prePageWide:5,prePageNarrow:4,isLoop:false})
};
iFourth.tieInRec=function(){iFourth.listloop({wrap:"#J-slide-tieIn",loopBox:".tiein-list ul",step:{wide:4,narrow:3},scrollWidth:{wide:768,narrow:561}});
var e=$("#J-tieIn"),a=e.find(".tiein-nav a"),h=e.find(".tiein-list ul"),j=h.children("li"),f=j.find(".check"),b=e.find(".btn-addcart-mini"),g=e.find(".tiein-count .count em"),k=e.find(".price-total"),i=e.find(".price-diff"),l=i.parents("dl");
e.find(".btn-dir").click(function(){iFourth.tieInTZM.close()
});
function c(){f.filter(":checked").prop("checked",false).click().removeAttr("checked")
}a.click(function(){var q=$(this),o=q.attr("data-type");
if(q.is(".current")){return false
}q.addClass("current").siblings("a").removeClass("current");
var n,p=$(".tiein-main-empty"),m=e.find(".btn-dir");
if(parseInt(o)){n=j.addClass("hide").filter('[data-type="'+o+'"]').removeClass("hide")
}else{n=j.removeClass("hide")
}if(n.size()==0){p.show();
m.hide()
}else{p.hide();
m.show()
}h.css("left",0);
e.find(".next, .prev").unbind();
iFourth.listloop({wrap:"#J-slide-tieIn",loopBox:".tiein-list ul",step:{wide:4,narrow:3},scrollWidth:{wide:768,narrow:561}})
});
f.click(function(){if($(".tiein-tzm-pop").is(":visible")){return false
}var n=$(this),w=n.parents("li"),m=parseFloat(w.find(".high").val()),u=parseFloat(w.find(".low").val()),q=w.index(),o=w.find("img"),p=o.offset();
var x=n.parents("li"),s=x.find(".tiein-list-tzm"),y=true;
if(iFourth.tieInTZM.enable&&w.find(".handle").size()>0){if(s.attr("loaded")){s.find("dl").each(function(){if($(this).find("li.selected").size()==0){y=false
}});
if(!y){iFourth.tieInTZM.addCart=true;
iFourth.tieInTZM.pop(x);
return false
}}else{iFourth.tieInTZM.addCart=true;
iFourth.tieInTZM.loadData(x);
return false
}}var v=n.is(":checked");
w[v?"addClass":"removeClass"]("selected");
var t=b.offset();
t.top=t.top-30;
t.left=t.left+37;
if(v){g.text(parseInt(g.text())+1);
k.text((parseFloat(k.text())+u).toFixed(2));
i.text((parseFloat(i.text())+m-u).toFixed(2));
parseFloat(i.text())>0&&l.show()||l.hide();
var r=$('<div><img src="'+o.attr("src")+'" /></div>').attr({id:"animateObj"+q,"class":"add-cart-animateObj"}).css({top:p.top,left:p.left}).appendTo("body");
r.animate({top:b.offset().top-30,left:t.left,width:30,height:30,opacity:1},600,function(){r.animate({top:"+=30px",height:0},400,function(){r.remove();
var z=$('<span class="icon-plusone"></span>').appendTo(b);
z.animate({bottom:"+=10px",opacity:0},600,function(){z.remove()
})
})
})
}else{g.text(parseInt(g.text())-1);
k.text((parseFloat(k.text())-u).toFixed(2));
i.text((parseFloat(i.text())-m+u).toFixed(2));
var r=$("#animateObj"+q);
r.stop().fadeOut(500,function(){r.remove()
});
parseFloat(i.text())>0&&l.show()||l.hide()
}});
e.find(".reset").click(function(){c()
});
j.find(".handle a").click(function(){var n=$(this).parents("li"),m=n.find(".check");
if(m.is(":checked")){m.prop("checked",false).click().removeAttr("checked")
}iFourth.tieInTZM.pop(n)
})
};
iFourth.tieInRec2={init:function(){iFourth.listloop({wrap:"#J-slide-tieIn",loopBox:".tiein-list ul",step:{wide:4,narrow:3},scrollWidth:{wide:768,narrow:561}});
var e=$("#J-tieIn"),a=e.find(".tiein-nav a"),h=e.find(".tiein-list ul"),k=h.children("li"),f=k.find(".check"),b=e.find(".btn-addcart-mini"),g=e.find(".tiein-count .count em"),l=e.find(".price-total"),j=e.find(".price-diff"),m=j.parents("dl");
e.find(".btn-dir").click(function(){iFourth.tieInTZM.close()
});
this.box=e;
this.list=h;
function c(){e.find(".tiein-list li :checked").prop("checked",false).click().removeAttr("checked")
}var i=[];
k.each(function(){i.push($(this).attr("data-id"))
});
this.existent=i;
a.click(function(){var o=$(this),n=o.attr("data-type");
if(o.is(".current")){return false
}o.addClass("current").siblings("a").removeClass("current");
$(".tiein-main-empty").hide();
if(!n){h.children("li").addClass("hide").filter("[data-rec]").removeClass("hide");
iFourth.tieInRec2.update()
}else{if(o.attr("loaded")){iFourth.tieInRec2.showType(n);
iFourth.tieInRec2.update()
}else{h.children("li").addClass("hide")
}}});
e.on("click",".check",function(){if($(".tiein-tzm-pop").is(":visible")){return false
}var o=$(this),w=o.is(":checked"),x=o.parents("li"),n=parseFloat(x.find(".high").val()),v=parseFloat(x.find(".low").val()),r=x.index(),p=x.find("img"),q=p.offset();
var y=o.parents("li"),t=y.find(".tiein-list-tzm"),z=true;
if(iFourth.tieInTZM.enable&&x.find(".handle").size()>0){if(t.attr("loaded")){t.find("dl").each(function(){if($(this).find("li.selected").size()==0){z=false
}});
if(!z){iFourth.tieInTZM.addCart=true;
iFourth.tieInTZM.pop(y);
return false
}}else{iFourth.tieInTZM.addCart=true;
iFourth.tieInTZM.loadData(y);
return false
}}var w=o.is(":checked");
x[w?"addClass":"removeClass"]("selected");
var u=b.offset();
u.top=u.top-30;
u.left=u.left+37;
if(w){g.text(parseInt(g.text())+1);
l.text((parseFloat(l.text())+v).toFixed(2));
j.text((parseFloat(j.text())+n-v).toFixed(2));
parseFloat(j.text())>0&&m.show()||m.hide();
var s=$('<div><img src="'+p.attr("src")+'" /></div>').attr({id:"animateObj"+r,"class":"add-cart-animateObj"}).css({top:q.top,left:q.left}).appendTo("body");
s.animate({top:b.offset().top-30,left:u.left,width:30,height:30,opacity:1},600,function(){s.animate({top:"+=30px",height:0},400,function(){s.remove();
var A=$('<span class="icon-plusone"></span>').appendTo(b);
A.animate({bottom:"+=10px",opacity:0},600,function(){A.remove()
})
})
})
}else{g.text(parseInt(g.text())-1);
l.text((parseFloat(l.text())-v).toFixed(2));
j.text((parseFloat(j.text())-n+v).toFixed(2));
var s=$("#animateObj"+r);
s.stop().fadeOut(500,function(){s.remove()
});
parseFloat(j.text())>0&&m.show()||m.hide()
}});
e.find(".reset").click(function(){c()
});
k.find(".handle a").click(function(){var o=$(this).parents("li"),n=o.find(".check");
if(n.is(":checked")){n.prop("checked",false).click().removeAttr("checked")
}iFourth.tieInTZM.pop(o)
})
},update:function(){this.list.css("left",0);
this.box.find(".next, .prev").unbind();
iFourth.listloop({wrap:"#J-slide-tieIn",loopBox:".tiein-list ul",step:{wide:4,narrow:3},scrollWidth:{wide:768,narrow:561}})
},showType:function(b){var a=this.list.children("li").addClass("hide").filter('[data-type="'+b+'"]').removeClass("hide");
if(a.size()==0){$(".tiein-main-empty").show()
}}};
iFourth.setMeal=function(){iFourth.listloop({wrap:"#J-slide-setMeal",loopBox:".tiein-list ul:not(.hide)",step:{wide:4,narrow:3},scrollWidth:{wide:768,narrow:561}});
iFourth.listloop({wrap:"#J-setMeal-list",loopBox:".meal-list",triggerLeft:".prev",triggerRight:".next",step:{wide:4,narrow:3},scrollWidth:{wide:880,narrow:660}});
var e=$(".meal-list li").size();
if(screen.width>=1200){if(e<4){$(".meal-wrapper .prev").hide();
$(".meal-wrapper .next").hide()
}}var b=$("#J-setMeal"),a=b.find(".tiein-nav a"),c=b.find(".tiein-list ul"),f=c.children("li");
a.click(function(){var h=$(this),g=h.attr("data-group");
if(h.is(".current")){return false
}h.addClass("current").siblings("a").removeClass("current");
b.find(".tiein-list ul").addClass("hide").filter('[data-group="'+g+'"]').removeClass("hide");
b.find(".next, .prev").unbind();
c.css("left",0);
iFourth.listloop({wrap:"#J-slide-setMeal",loopBox:".tiein-list ul:not(.hide)",step:{wide:4,narrow:3},scrollWidth:{wide:768,narrow:561}})
})
};
iFourth.tieInTZM={enable:false,addCart:false,currentItem:null,loadData:null,init:function(e){var f=this,c=$(".tiein-tzm-pop");
f.enable=true;
f.loadData=e;
var g=$(this),a=g.find("li:not(.disabled,.c-disabled)"),b=g.find("input:hidden");
c.on("click",".main dl dd li:not(.disabled,.c-disabled)",function(){var n=$(this);
n.addClass("selected").siblings().removeClass("selected");
var m="已选择：",h="",k=[],l=[],j="",i="";
c.find(".main dl li.selected").each(function(){k.push($(this).attr("title"));
l.push($(this).attr("cid"))
});
m+=k.join("，");
h+=l.join("");
j=$(this).parents("dl").attr("pass");
if(typeof j!="undefined"&&j!=""){CommonFourPage.checkSub(j,this);
$.each(fitInfo,function(p,q){if(typeof q!="undefined"&&q.passPart==j){var o=q.subInfo[0][h];
if(typeof o!="undefined"){$('.tiein-list-tzm[pass="'+j+'"]').siblings(".fitPartNumber").val(o.partNumber);
$(".tiein-tzm-pop .btn-ok").attr("sub",o.partNumber);
$(".tiein-tzm-pop .btn-ok").attr("pass",j)
}}})
}c.find(".tip .normal").text(m).siblings().text("")
});
c.on("click",".btn-ok",function(){CommonFourPage.getSubFitPrice(this)
});
c.on("click",".close,.btn-cancel",function(){f.close()
})
},pop:function(b){if(b[0]==this.currentItem){return
}var a=b.find(".tiein-list-tzm");
if(a.attr("loaded")){iFourth.tieInTZM.show(b)
}else{iFourth.tieInTZM.loadData(b)
}},show:function(g){var f=g.find(".tiein-list-tzm"),i=f.html(),b=$(".tiein-tzm-pop");
f.attr("loaded","loaded");
this.currentItem=g[0];
var a=g.offset().left,c=$(".tiein-box").offset().left;
b.css("left",a-c+120).show().find(".main").html(i);
var h="已选择：",e=[];
b.find(".main dl li.selected").each(function(){e.push($(this).attr("title"))
});
if(e.length>0){h+=e.join("，");
b.find(".tip .normal").text(h).siblings().text("")
}},close:function(){this.currentItem=null;
this.addCart=false;
$(".tiein-tzm-pop").hide().find(".tip span").text("")
},select:function(){var e=this,c=$(".tiein-tzm-pop"),b=true,i=true,a=c.find(".tiein-tzm-color"),h=c.find(".tiein-tzm-buytype"),g=c.find(".tip .error");
if(a.size()>0&&a.find("li.selected").size()==0){b=false
}if(h.size()>0&&h.find("li.selected").size()==0){i=false
}if(!b||!i){g.text("请选择颜色和尺码");
if(b){g.text("请选尺码")
}if(i){g.text("请选择颜色")
}g.siblings().text("");
return
}var f=$(e.currentItem);
f.find(".tiein-list-tzm").html(c.find(".main").html());
if(e.addCart){iFourth.tieInTZM.close();
f.find("input.check").prop("checked",true).click().prop("checked",true)
}else{iFourth.tieInTZM.close()
}}};
iFourth.Zoom=function(a){var b=$(a);
this.box=b;
this.mainArea=b.find(".imgzoom-main");
this.popArea=b.find(".imgzoom-pop");
this.shot=b.find(".imgzoom-shot");
this.mainImg=this.mainArea.children("img");
this.largeImg=this.popArea.children("img");
this.thumbList=b.find(".imgzoom-thumb-main ul");
this.thumbItems=this.thumbList.children("li");
this.btnPrev=b.find(".prev");
this.btnNext=b.find(".next");
this.count=this.thumbItems.size();
this.page=1;
this.pageCount=this.count-4;
this.index=0;
this.srcMedium="";
this.srcLarge="";
this._init()
};
iFourth.Zoom.prototype={_init:function(){var a=this,c,b=this.thumbItems.find("img").first();
this.srcMedium=b.attr("src-medium");
this.srcLarge=b.attr("src-large");
this.thumbList.css("left",0);
this.btnPrev.addClass("prev-disable");
if(this.thumbItems.size()<=5){this.btnNext.addClass("next-disable")
}else{this.btnNext.removeClass("next-disable")
}this.thumbItems.hover(function(){var e=$(this);
c=setTimeout(function(){a.choose(e.index())
},100)
},function(){clearTimeout(c)
});
this.btnPrev.unbind().click(function(){!$(this).is(".prev-disable")&&a._paging(0)
});
this.btnNext.unbind().click(function(){!$(this).is(".next-disable")&&a._paging(1)
});
this._zoom();
this._video();
this._popInit();
this.choose(0)
},_paging:function(b){if(b){this.thumbList.animate({left:"-=67px"},200);
this.page++
}else{this.thumbList.animate({left:"+=67px"},200);
this.page--
}if(this.page==this.pageCount){this.btnNext.addClass("next-disable")
}else{this.btnNext.removeClass("next-disable")
}if(this.page==1){this.btnPrev.addClass("prev-disable")
}else{this.btnPrev.removeClass("prev-disable")
}var a=this.thumbItems.eq(this.page+3).find("img[src3]");
a.attr("src",a.attr("src3"))
},_zoom:function(){var a=this,b;
this.mainArea.hover(function(c){if(!a.srcLarge){return false
}a.mainArea.mousemove(function(f){a._shotPosition(f.pageX,f.pageY)
});
b=setTimeout(function(){a.largeImg.attr("src",a.srcLarge);
a.popArea.fadeIn(200);
a.shot.animate({opacity:".5"},200)
},100)
},function(){clearTimeout(b);
a.mainArea.unbind("mousemove");
a.popArea.fadeOut(200);
a.shot.animate({opacity:"0"},200)
})
},_shotPosition:function(g,c){var h=this.mainArea.offset(),f=this.shot;
var a=g-h.left,i=c-h.top,b=a-101,e=i-101;
if(a-101<=0){b=0
}if(a+101>=400){b=198
}if(i-101<=0){e=0
}if(i+101>=400){e=198
}f.css({left:b,top:e});
this.largeImg.css({top:-e/400*800,left:-b/400*800})
},_video:function(){var a=$(".imgzoom-video"),b=$("#videoHtml").html();
$(".imgzoom-video-play").unbind().click(function(){a.append(b).show()
});
a.find(".close").unbind().click(function(){$(this).next().remove();
a.hide()
})
},choose:function(b){var a=this.thumbItems.eq(b),c=this.box.find(".imgzoom-main img"),e=a.find("img");
this.srcMedium=e.attr("src-medium");
this.srcLarge=e.attr("src-large");
this.index=b;
a.addClass("current").siblings().removeClass("current");
c.attr("src",this.srcMedium)
},_popInit:function(){var j=this,k=$(".imgview"),q=k.find(".imgview-main img"),c=k.find(".mask-l"),e=k.find(".mask-r"),p=k.find(".imgview-count span"),g=k.find(".imgview-count em"),a=k.find(".imgview-thumb-main"),n=a.children("ul"),f=n.children("li"),s=k.find(".imgview-thumb .prev"),t=k.find(".imgview-thumb .next"),i=k.find("a.close"),h=1,r=6,m=Math.ceil(f.size()/6);
function o(u){var v=f.removeClass("current").eq(u).addClass("current");
q.attr("src",v.find("img").attr("src-large"));
j.index=u;
b(Math.ceil((u+1)/6));
g.text(j.index+1)
}function l(){j.choose(j.index);
k.fadeOut(300);
iFourth.mask.animate({opacity:0},300,function(){$(this).hide()
})
}function b(u){if(u==h){return false
}n.animate({top:-(u-1)*552},300);
h=u
}if(m>1){$(".imgview-thumb").removeClass("imgview-thumb-single")
}else{$(".imgview-thumb").addClass("imgview-thumb-single")
}n.css("top",0);
g.text(j.index+1);
p.text(j.count);
this.mainArea.unbind("click").click(function(){if(!j.srcLarge){return false
}o(j.index);
if(k.height()>iFourth.win.height()){k.css({position:"absolute",top:iFourth.win.scrollTop()+10+"px","margin-top":"0"})
}k.fadeIn(300).find("img[src3]").each(function(){$(this).attr("src",$(this).attr("src3")).removeAttr("src3")
});
iFourth.mask.show().animate({opacity:0.5},300)
});
i.unbind().click(function(){l()
});
iFourth.mask.click(function(){l()
});
f.click(function(){o($(this).index())
});
c.unbind().click(function(){var v=j.thumbItems.size(),u=j.index==0?(v-1):(j.index-1);
o(u)
});
e.unbind().click(function(){var v=j.thumbItems.size(),u=j.index==(v-1)?0:(j.index+1);
o(u)
});
s.unbind().click(function(){if(n.is(":animated")){return false
}b(h==1?m:h-1)
});
t.unbind().click(function(){if(n.is(":animated")){return false
}b(h==m?1:h+1)
})
}};
iFourth.submitFeedBack=function(){var m=$("input[name=priceplace]:checked").val();
var v="";
var a="";
var l="";
var c="";
var b="";
if(m==0){var h=$("#productNetAddr").val();
if(h==""||h=="请输入您发现的销售网址"){$("#productNetAddrTip").removeClass("hide");
$("#productNetAddr").addClass("price-feedback-text-err");
$("#productNetAddrTip span").text("请输入对方商品的网址");
return false
}else{$("#productNetAddrTip").addClass("hide");
$("#productNetAddr").removeClass("price-feedback-text-err")
}if(h.length>200){$("#productNetAddrTip").removeClass("hide");
$("#productNetAddr").addClass("price-feedback-text-err");
$("#productNetAddrTip span").text("请输入有效的网址");
return false
}else{$("#productNetAddrTip").addClass("hide");
$("#productNetAddr").removeClass("price-feedback-text-err")
}h=h.indexOf("#")!=-1?h.substr(0,h.indexOf("#")):h;
v=h;
var q=$("#feedbackPrice1").val()=="单位（元）"?"":$("#feedbackPrice1").val();
if(q==""){$("#feedbackPrice1Tip").removeClass("hide");
$("#feedbackPrice1").addClass("price-feedback-text-err");
$("#feedbackPrice1Tip span").text("请输入对方商品的价格");
return false
}else{$("#feedbackPrice1Tip").addClass("hide");
$("#feedbackPrice1").removeClass("price-feedback-text-err")
}if(!iFourth.checkPrice($("#feedbackPrice1"))||q.length>10){$("#feedbackPrice1Tip").removeClass("hide");
$("#feedbackPrice1").addClass("price-feedback-text-err");
$("#feedbackPrice1Tip span").text("请输入有效的金额");
return false
}else{$("#feedbackPrice1Tip").addClass("hide");
$("#feedbackPrice1").removeClass("price-feedback-text-err")
}a=q;
var j=$("#feedbackFreight").val()=="单位（元）"?"":$("#feedbackFreight").val();
if(j!=""){if(!iFourth.checkPrice($("#feedbackFreight"))||j.length>10){$("#feedbackFreightTip").removeClass("hide");
$("#feedbackFreight").addClass("price-feedback-text-err");
$("#feedbackFreightTip span").text("请输入有效的运费");
return false
}else{$("#feedbackFreightTip").addClass("hide");
$("#feedbackFreight").removeClass("price-feedback-text-err")
}}else{$("#feedbackFreightTip").addClass("hide");
$("#feedbackFreight").removeClass("price-feedback-text-err")
}l=j
}else{var f=$("#feedbackRealShopName").val()=="请输入实体店的名称"?"":$("#feedbackRealShopName").val();
if(f==""){$("#feedbackRealShopNameTip").removeClass("hide");
$("#feedbackRealShopName").addClass("price-feedback-text-err");
$("#feedbackRealShopNameTip span").text("请输入实体店的名称");
return false
}else{$("#feedbackRealShopNameTip").addClass("hide");
$("#feedbackRealShopName").removeClass("price-feedback-text-err")
}if(f.length>50){$("#feedbackRealShopNameTip").removeClass("hide");
$("#feedbackRealShopName").addClass("price-feedback-text-err");
$("#feedbackRealShopNameTip span").text("请输入有效的实体店名称");
return false
}else{$("#feedbackRealShopNameTip").addClass("hide");
$("#feedbackRealShopName").removeClass("price-feedback-text-err")
}v=f;
var q=$("#feedbackPrice2").val()=="单位（元）"?"":$("#feedbackPrice2").val();
if(q==""){$("#feedbackPrice2Tip").removeClass("hide");
$("#feedbackPrice2").addClass("price-feedback-text-err");
$("#feedbackPrice2Tip span").text("请输入实体店商品的价格");
return
}else{$("#feedbackPrice2Tip").addClass("hide");
$("#feedbackPrice2").removeClass("price-feedback-text-err")
}if(!iFourth.checkPrice($("#feedbackPrice2"))||q.length>10){$("#feedbackPrice2Tip").removeClass("hide");
$("#feedbackPrice2").addClass("price-feedback-text-err");
$("#feedbackPrice2Tip span").text("请输入有效的金额");
return
}else{$("#feedbackPrice2Tip").addClass("hide");
$("#feedbackPrice2").removeClass("price-feedback-text-err")
}a=q;
var s=$("#feedbackCity").val()=="请输入您发现的实体店城市"?"":$(".address-placement span").eq(1).html();
if(s.length>20){$("#feedbackCityTip").removeClass("hide");
$("#feedbackCity").addClass("price-feedback-text-err");
$("#feedbackCityTip span").text("请输入有效的城市");
return false
}else{$("#feedbackCityTip").addClass("hide");
$("#feedbackCity").removeClass("price-feedback-text-err")
}c=s;
var g=$("#foundDate").val();
if(g==""){$("#foundDateTip").removeClass("hide");
$("#foundDate").addClass("price-feedback-text-err")
}else{$("#foundDateTip").addClass("hide");
$("#foundDate").removeClass("price-feedback-text-err")
}b=g.split(" ")[0]
}var p="http://"+sn.domain+sn.context+"/SNFeedbackCmd?ftype="+m+"&catalog="+sn.catalogId;
if(typeof sn.categoryName1!="undefined"&&sn.categoryName1!=""){p+="&first="+sn.categoryName1
}if(typeof sn.categoryName2!="undefined"&&sn.categoryName2!=""){p+="&second="+sn.categoryName2
}if(typeof sn.categoryName3!="undefined"&&sn.categoryName3!=""){p+="&third="+sn.categoryName3
}if(typeof sn.categoryName4!="undefined"&&sn.categoryName4!=""){p+="&fouth="+sn.categoryName4
}if(typeof sn.categoryName5!="undefined"&&sn.categoryName5!=""){p+="&fifth="+sn.categoryName5
}p+="&partnumber="+$("#curPartNumber").val();
var x=sn.vendorCode==""?"0":"1";
p+="&vtype="+x;
var n=sn.vendorCode==""?"0000000000":sn.vendorCode;
p+="&vendorCode="+n;
var r=$("#itemDisplayName").html()==null?$("#productDisplayName").html():$("#itemDisplayName").html();
p+="&catName="+r;
var t=window.location.href;
t=t.indexOf("#")!=-1?t.substr(0,t.indexOf("#")):t;
p+="&pageUrl="+t;
var u=sn.priceType=="4"&&PriceShow.serviceType!="3"?sn.promotionPrice:"";
p+="&rushPrice="+u;
var o=sn.priceType=="4"&&PriceShow.serviceType=="3"?sn.promotionPrice:"";
p+="&groupPrice="+o;
var k=sn.priceType=="1"?sn.promotionPrice:"";
p+="&promotionPrice="+k;
var e=sn.priceType=="0"?sn.promotionPrice:"";
p+="&netPrice="+e;
var j=(sn.freight==-1||sn.freight=="免运费")?"":sn.freight;
p+="&freight="+j;
var i=$(".ui-city span").eq(1).html();
p+="&cityName="+i;
var w=d("idsEppLastLogin")!=null?d("idsEppLastLogin"):(d("logonUserIdLastTime")!=null?d("logonUserIdLastTime"):d("idsLoginUserIdLastTime"));
p+="&userNmae="+w;
p+="&compete="+v;
p+="&competePrice="+a;
p+="&competeFreight="+l;
p+="&competeCityname="+c;
p+="&competeTS="+b;
p=encodeURI(p);
$.ajax({url:p,type:"GET",cache:false,async:false,dataType:"jsonp",error:function(y,A,z){},success:function(y){$.unmDialog();
$.mDialog({title:"温馨提示",message:$("#win_success"),css:{width:"480px"},overlay:true,overlayCss:{background:"black",opacity:"0.3"},overlayClick:true})
}})
};
iFourth.checkFeedBackInput=function(f){var i=f;
if($(i).attr("id")=="productNetAddr"){var b=$(i).val();
if(b==""){$("#productNetAddrTip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#productNetAddrTip span").text("请输入对方商品的网址");
return
}else{$("#productNetAddrTip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}if(b.length>200){$("#productNetAddrTip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#productNetAddrTip span").text("请输入有效的网址");
return
}else{$("#productNetAddrTip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}}if($(i).attr("id")=="feedbackPrice1"){var c=$(i).val();
if(c==""||c=="单位（元）"){$("#feedbackPrice1Tip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#feedbackPrice1Tip span").text("请输入对方商品的价格");
return
}else{$("#feedbackPrice1Tip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}if(!iFourth.checkPrice($(i))||c.length>10){$("#feedbackPrice1Tip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#feedbackPrice1Tip span").text("请输入有效的金额");
return
}else{$("#feedbackPrice1Tip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}}if($(i).attr("id")=="feedbackPrice2"){var c=$(i).val();
if(c==""||c=="单位（元）"){$("#feedbackPrice2Tip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#feedbackPrice2Tip span").text("请输入实体店商品的价格");
return
}else{$("#feedbackPrice2Tip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}if(!iFourth.checkPrice($(i))||c.length>10){$("#feedbackPrice2Tip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#feedbackPrice2Tip span").text("请输入有效的金额");
return
}else{$("#feedbackPrice2Tip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}}if($(i).attr("id")=="feedbackFreight"){var a=$(i).val();
if(a!=""){if(!iFourth.checkPrice($(i))||a.length>10){$("#feedbackFreightTip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#feedbackFreightTip span").text("请输入有效的运费");
return
}else{$("#feedbackFreightTip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}}else{$("#feedbackFreightTip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}}if($(i).attr("id")=="feedbackRealShopName"){var h=$(i).val()=="请输入实体店的名称"?"":$(i).val();
if(h==""){$("#feedbackRealShopNameTip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#feedbackRealShopNameTip span").text("请输入实体店的名称");
return
}else{$("#feedbackRealShopNameTip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}if(h.length>50){$("#feedbackRealShopNameTip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#feedbackRealShopNameTip span").text("请输入有效的实体店名称");
return
}else{$("#feedbackRealShopNameTip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}}if($(i).attr("id")=="feedbackCity"){var g=$(i).val();
if(g.length>20){$("#feedbackCityTip").removeClass("hide");
$(i).addClass("price-feedback-text-err");
$("#feedbackCityTip span").text("请输入有效的城市");
return
}else{$("#feedbackCityTip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}}if($(i).attr("id")=="foundDate"){var e=$(i).val();
if(e==""){$("#foundDateTip").removeClass("hide");
$(i).addClass("price-feedback-text-err")
}else{$("#foundDateTip").addClass("hide");
$(i).removeClass("price-feedback-text-err")
}}};
iFourth.getCurDate=function(){var h=new Date();
var e=h.getFullYear();
var f=iFourth.add_zero(h.getMonth()+1);
var i=iFourth.add_zero(h.getDate());
var a=iFourth.add_zero(h.getHours());
var c=iFourth.add_zero(h.getMinutes());
var g=iFourth.add_zero(h.getSeconds());
var b=e+"-"+f+"-"+i;
return b
};
iFourth.add_zero=function(a){if(a<10){return"0"+a
}else{return a
}};
iFourth.IsURL=function(c){var b="^((https|http|ftp|rtsp|mms)?://)?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?(([0-9]{1,3}.){3}[0-9]{1,3}|([0-9a-z_!~*'()-]+.)*([0-9a-z][0-9a-z-]{0,61})?[0-9a-z].[a-z]{2,6})(:[0-9]{1,4})?((/?)|(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
var a=new RegExp(b);
if(a.test(c)){return(true)
}else{return(false)
}};
iFourth.checkPrice=function(b){var e=b.val();
var a=0;
if(e.length!=0){for(var c=0;
c<e.length;
c++){if((e.charAt(c)>"9"||e.charAt(c)<"0")&&e.charAt(c)!="."&&e.charAt(c)!=","){return(false)
}if(e.charAt(c)=="."){a++
}}if(a>1){return(false)
}}else{b.val("");
return false
}return true
};
iFourth.checkkey=function(b,a){b.value=b.value.replace(/[^\d.]/g,"");
b.value=b.value.replace(/^\./g,"");
b.value=b.value.replace(/\.{2,}/g,".");
b.value=b.value.replace(/^\d{1,10}\.\d{3}?$/g,b.value.substr(0,b.value.length-1));
b.value=b.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".")
};
iFourth.showQRCode=function(){var c=$(".proinfo-focus").eq(0),a=c.children(".qrcode-main,.qrcode-main-mobile");
if(a.is(":visible")){c.addClass("proinfo-focus-qrcode");
if(c.children("dl:visible").size()<3){c.addClass("proinfo-focus-qrcode-short")
}else{c.removeClass("proinfo-focus-qrcode-short")
}}else{c.removeClass("proinfo-focus-qrcode proinfo-focus-qrcode-short")
}var b=$(".qrcode-main-handle .dropdown");
var e=$(".qrcode-main-img");
var f=$.browser.msie&&$.browser.version<=8;
if(f){e.find("i").css("opacity",0)
}b.click(function(g){if(e.is(":animated")){return
}if(b.is(".dropdown-cur")){b.removeClass("dropdown-cur");
e.animate({top:50,opacity:0},200);
if(f){e.find("i").animate({opacity:0},200)
}}else{b.addClass("dropdown-cur");
e.animate({top:80,opacity:1},200);
if(f){e.find("i").animate({opacity:1},200)
}}g.stopPropagation()
});
$("body").click(function(){if(b.is(".dropdown-cur")){b.removeClass("dropdown-cur");
e.animate({top:50,opacity:0},200)
}})
};
iFourth.renxingfu=function(){$(".renxf-item").click(function(){var a=$(this);
if(a.parent().is(".renxf-list-disable")){return false
}if(a.is(".renxf-item-mianxi")&&!a.is(".current")){$(".renxf-btn .btn-mianxi").show();
$(".renxf-btn .btn-fenqi").hide();
if(window.Renxf){Renxf.buttonId="rxfmx";
Renxf.buttonClass="btn-mianxi"
}}else{$(".renxf-btn .btn-mianxi").hide();
$(".renxf-btn .btn-fenqi").show();
if(window.Renxf){Renxf.buttonId="rxffq";
Renxf.buttonClass="btn-fenqi"
}}a.toggleClass("current").siblings().removeClass("current");
$(".renxf-box .tzm-border").hide()
});
$(".renxf-btn .btn-fenqi").click(function(){if($(".renxf-list").find(".current").size()==0){$(".renxf-box .tzm-border").show();
return false
}})
};
iFourth.heyueji=function(a){$(".proinfo-hyj-rel dd li").click(function(){$(this).addClass("selected").siblings().removeClass("selected");
a(this);
iFourth.mainHeight()
});
$(".proinfo-hyj dd li").click(function(){var e=$(this),f=e.index(),c=$(".proinfo-hyj-rel"),g=$(".luoji-tip");
c.find("li.selected").removeClass("selected");
if(f==0){c.hide();
g.show();
a(this)
}else{g.hide();
c.show().find("dd ul").hide().eq(f-1).show().children("li:first").click()
}b();
iFourth.mainHeight()
});
function b(){var e=$(".proattr-result"),c=e.find("dd .result-text");
var f="";
$(".proattr-radio li.selected, .proattr-check li.selected").each(function(){f+='"'+$(this).attr("title")+'" '
});
$(".proinfo-bangke input:checked").each(function(){f+='"'+$(this).next("label").text()+'" '
});
c.text(f);
(f==""&&$("#phonedl li.selected").size()==0)&&e.hide()||e.show()
}};
iFourth.presell=function(){$(".presell-rule").unbind("click").click(function(a){$(this).find(".content").toggle(100);
a.stopPropagation()
});
$("body").unbind("click.presell").bind("click.presell",function(){$(".presell-rule .content").hide(100)
})
};
iFourth.hyjDialog={obj:"",callbackFun:function(b){var a=b.html;
obj.find(".content").html(a);
$(".m-dialog").css("top","20%")
},clickFun:function(){$("#phoneGoLook").click(function(){$.mDialog({css:{width:"692px"},http:function(a,b){obj=a;
$.ajax({url:sn.qkkUrl+"/fourPageLook/goLook.hs?phoneSku="+sn.ninePartNumber+"&provinceId="+sn.provinceCode+"&contractTypeCode="+sn.contractTypeCode+"&operatorId="+sn.operatorId+"&busiType=2&cityId="+sn.cityId,cache:false,dataType:"jsonp",jsonpCallback:"iFourth.hyjDialog.callbackFun",async:false,success:function(c){}})
},closeFn:function(){},title:"套餐变更",overlayClick:true,fadeIn:300,fadeOut:500})
})
}};