var ECode=ECode||{};ECode.calendar=function(u){var y={inputBox:null,isSelect:false,showbox:null,range:{mindate:new Date(),maxdate:"2020-12-31"},count:1,startdate:null,flag:true,pos:{right:0,top:0},isWeek:true,isTime:false,startTime:[],notdate:["2013-12-20","2013-12-28"],flagWeek:true,callback:function(){}};var x={today:"\u4eca\u5929",yuandan:"\u5143\u65e6",chuxi:"\u9664\u5915",chunjie:"\u6625\u8282",yuanxiao:"\u5143\u5bb5\u8282",qingming:"\u6e05\u660e",wuyi:"\u52b3\u52a8\u8282",duanwu:"\u7aef\u5348\u8282",zhongqiu:"\u4e2d\u79cb\u8282",guoqing:"\u56fd\u5e86\u8282"};var G={today:[D(new Date())],yuandan:["2012-01-01","2013-01-01","2014-01-01","2015-01-01","2016-01-01","2017-01-01","2018-01-01","2019-01-01","2020-01-01"],chuxi:["2012-01-22","2013-02-09","2014-01-30","2015-02-18","2016-02-07","2017-01-27","2018-02-15","2019-02-04","2020-01-24"],chunjie:["2012-01-23","2013-02-10","2014-01-31","2015-02-19","2016-02-08","2017-01-28","2018-02-16","2019-02-05","2020-01-25"],yuanxiao:["2012-02-06","2013-02-24","2014-2-14","2015-03-05","2016-02-22","2017-02-11","2018-03-02","2019-02-19","2020-02-8"],qingming:["2012-04-04","2013-04-04","2014-04-05","2015-04-05","2016-04-04","2017-04-04","2018-04-05","2019-04-05","2020-04-04"],wuyi:["2012-05-01","2013-05-01","2014-05-01","2015-05-01","2016-05-01","2017-05-01","2018-05-01","2019-05-01","2020-05-01"],duanwu:["2012-06-23","2013-06-12","2014-06-02","2015-06-20","2016-06-09","2017-05-30","2018-06-18","2019-06-07","2020-06-25"],zhongqiu:["2012-09-30","2013-09-19","2014-09-08","2015-09-27","2016-09-15","2017-10-04","2018-09-24","2019-09-13","2020-10-01"],guoqing:["2012-10-01","2013-10-01","2014-10-01","2015-10-01","2016-10-01","2017-10-01","2018-10-01","2019-10-01","2020-10-01"]};function t(a){return a.toString().replace(/^(\d)$/,"0$1")}function r(a){return a.charAt(0)=="0"?a.substring(1,2):a}function D(a){switch(typeof a){case"string":a=a.split(/-|\//g);return a[0]+"-"+t(a[1])+"-"+t(a[2]);break;case"object":return a.getFullYear()+"-"+t(a.getMonth()+1)+"-"+t(a.getDate());break}}function F(a){return D(a).replace(/-|\//g,"")}if(arguments.length>0&&typeof(arguments[0])=="object"){$.extend(y,u)}else{return false}var C=$(y.inputBox);var v=y.showbox;var s=y.callback;var z=y.startdate;var E=y.isWeek;var A=y.isTime;var B=y.startTime;var w={init:function(){var a=this;C.bind("click",function(b){var d;if(v==null){$(this)[0].tagName.toUpperCase()==="INPUT"?d=$(this).val():d=$(this).text()}else{$(v)[0].tagName.toUpperCase()==="INPUT"?d=$(v).val():d=$(v).text()}b.stopPropagation();$(".calendar").remove();a.createContainer();a._creade();if(z!==null){var c=z.split(/-|\//g);a.render(new Date(c[0],c[1]-1,c[2]))}else{if(new RegExp(/^\d{4}(\-|\/)\d{2}\1\d{2}$/).test(d)){var e=d.split(/-|\//g);a.render(new Date(e[0],e[1]-1,e[2]))}else{a.render(new Date())}}})},_creade:function(){var e=[],a=[],c='<span class="cal-close">close</span>',d='<span class="cal-prev">prev</span>',b='<span class="cal-next">next</span>';this.dateWarp=$("<div></div>");this.dateWarp.attr("class","calendar");this.count=y.count;if(y.isSelect){this.count=1}for(i=this.count;i--;){e=e.concat(this._template)}a=a.concat(this.timeTemp);if(this.count>1){y.isTime=false}this.dateWarp.append($(d+c+e.join("")+b+(y.isTime&&a.join(""))));this.container.append(this.dateWarp);var f=!!window.ActiveXObject&&!window.XMLHttpRequest;if(f){this.dateWarp.append($(this.createIframe()))}},render:function(a){var a=a,c=this.container.find(".cal-container"),e,d,f,b;e=a.getFullYear();d=a.getMonth()+1;this.year=e;this.month=d;for(f=0,b=c.length;f<b;f++){e+=(d+(f?1:0))>12?1:0;d=(d+(f?1:0))%12||12;this.drawDate(c.eq(f),{year:e,month:d})}y.isSelect?this.selectChange():this.btnEvent()},_template:['<div class="cal-container">',"<dl>",'<dt class="title-date">',"</dt>","<dt><strong>日</strong></dt>","<dt>一</dt>","<dt>二</dt>","<dt>三</dt>","<dt>四</dt>","<dt>五</dt>","<dt><strong>六</strong></dt>","<dd></dd>","</dl>","</div>"],timeTemp:['<div class="calendar-time">','<div class="time-title">','时间 <strong><em class="hour"></em>:<em class="minute"></em></strong>',"</div>",'<div class="plan" id="plan-h">','<span>时</span><div class="barM"><div class="bar"></div></div>',"</div>",'<div class="plan" id="plan-m">','<span>分</span><div class="barM"><div class="bar"></div></div>',"</div>",'<em class="confirm-btn" href="javascript:void(0)">确认</em>',"</div>"],createContainer:function(){var c=$("#"+C.attr("id")+"-date");if(!!c){c.remove()}var a=C.offset();var b=this.container=$("<div></div>");b.attr("id",C.attr("id")+"-date");b.css({position:"absolute","float":"left",zIndex:8003,left:a.left-y.pos.right,top:a.top+C.outerHeight()+y.pos.top});b.bind("click",function(d){d.stopPropagation()});$("body").append(b)},drawDate:function(S,Q){var n,l,c,f,b,d,R,o,U,h,q=[],k=[],m,W,V,g,a,P;var T=document.createDocumentFragment();f=Q.year;b=Q.month;n=this.dateWarp;this.titleDate=l=S.find(".title-date");if(y.isSelect){var e=[];e.push("<select>");for(var U=2020;U>1970;U--){U!=this.year?e.push('<option value="'+U+'">'+U+"</option> "):e.push('<option value="'+U+'" selected>'+U+"</option> ")}e.push("</select>");e.push(" <b>年</b> ");e.push("<select>");for(U=1;U<13;U++){U!=this.month?e.push('<option value ="'+U+'">'+U+"</option>"):e.push('<option value ="'+U+'" selected>'+U+"</option>")}e.push("</select>");e.push(" <b>月</b> ");l.html($(e.join("")));$(".cal-prev").remove();$(".cal-next").remove();this.dateWarp.css("padding","0 0 15px")}else{l.html(f+"年"+b+"月")}this.dd=c=S.find("dd");R=new Date(f,b,0).getDate();o=new Date(f,b-1,1).getDay();for(U=0;U<o;U++){k.push(0)}for(U=1;U<=R;U++){k.push(U)}while(k.length){for(U=0;U<k.length;U++){if(k.length){m=document.createElement("a");W=k.shift();if(!W){m.className="disabled";m.innerHTML="&nbsp;"}else{m.href="javascript:;";m.innerHTML=W;m["data-date"]=(f+"-"+t(b)+"-"+t(W));if(y.flagWeek){a=m["data-date"].split(/-|\//g);P=new Date(a[0],a[1]-1,a[2]);g=P.getDay();if(g==0||g==6){m.className="weekend"}}if(m["data-date"]==z){m.className="startdate"}V=F(m["data-date"])}if(y.range.mindate){V<F(D(y.range.mindate))&&(m.className="disabled")}if(y.range.maxdate){V>F(D(y.range.maxdate))&&(m.className="disabled")}if(y.flag){if(z!==null){V>F(z)&&m.className!=="disabled"&&(m.className="hover")}}for(var j in x){if(m.className=="disabled"){continue}if(new RegExp(m["data-date"]).test(G[j].join())){m.className=j;m.innerHTML="<span>"+m.innerHTML.replace(/<[^>]+>/,"")+"</span>"}}for(var p=0;p<y.notdate.length;p++){if(m.className=="disabled"){continue}if(m["data-date"]==y.notdate[p]){m.className="disabled"}}T.appendChild(m)}}}c.html($(T));this.removeDate();this.container.html(n);this.linkOn();this.outClick();this.eventClose();if(y.isTime){this.dragTime("#plan-h","hour");this.dragTime("#plan-m","min")}},dragTime:function(n,j){var h=new Date(),b=h.getHours(),e=h.getMinutes(),p=this;var l=$(n);var I;var q=j;var o=l.find(".bar");var g=l.find(".barM");var a=g.outerWidth()-o.outerWidth();var f=0;q=="hour"?I=Math.ceil(a/23):I=parseFloat(a/59).toFixed(2);var c=$(".time-title").find(".hour");var m=$(".time-title").find(".minute");if(B.length>1){c.text(B[0]);m.text(B[1])}else{c.text(t(b));m.text(t(e))}var d=parseInt(q=="hour"?r(c.text()):r(m.text()));o.css("left",d*I);o.click(function(H){H.stopPropagation()});o.bind("mousedown",function(H){var K=this;f=H.pageX-o.position().left;$(document).bind("mousemove",function(J){var M=J.pageX-f;M<=0&&(M=0);M>=a&&(M=a);o.css("left",M);q=="hour"?c.text(t(Math.ceil(M/I))):m.text(t(Math.ceil(M/I)));return false});$(document).bind("mouseup",function(){$(document).unbind("mousemove").unbind("mouseup")});return false});if(A){var k=this.dateWarp.find(".confirm-btn");k.bind("click",function(){if(z==null){if(v==null){C[0].tagName.toUpperCase()==="INPUT"?C.val(D(h)+" "+c.text()+":"+m.text()):C.text(D(h)+" "+c.text()+":"+m.text())}else{$(v)[0].tagName.toUpperCase()==="INPUT"?$(v).val(D(h)+" "+c.text()+":"+m.text()):$(v).text(D(h)+" "+c.text()+":"+m.text())}}else{if(v==null){C[0].tagName.toUpperCase()==="INPUT"?C.val(z+" "+c.text()+":"+m.text()):C.text(z+" "+c.text()+":"+m.text())}else{$(v)[0].tagName.toUpperCase()==="INPUT"?$(v).val(z+" "+c.text()+":"+m.text()):$(v).text(z+" "+c.text()+":"+m.text())}}B=[c.text(),m.text()];p.removeDate()})}},createIframe:function(){var a=document.createElement("iframe");a.src="about:blank";a.style.position="absolute";a.style.zIndex=-1;a.style.left="-1px";a.style.top=0;a.style.border=0;a.style.filter="alpha(opacity= 0 )";a.style.width=this.container.width()+"px";a.style.height=this.container.height()+"px";return a},removeDate:function(){var a=this.container.find(".calendar");if(!!a){this.container.empty()}},btnEvent:function(){var b=this.container.find(".cal-prev"),c=this.container.find(".cal-next"),a=this;b.click(function(){var d=new Date(a.year,a.month-2,1);a.render(d)});c.click(function(){var d=new Date(a.year,a.month,1);a.render(d)})},selectChange:function(){var a,b,c=this;a=this.container.find(".cal-container").find("select").eq(0);b=this.container.find(".cal-container").find("select").eq(1);a.change(function(){var e=a.val();var d=b.val();c.render(new Date(e,d-1))});b.change(function(){var e=a.val();var d=b.val();c.render(new Date(e,d-1))})},linkOn:function(){var b=this.dateWarp.find("a").not(".disabled"),a=this;b.each(function(c){$(this).click(function(){var e=$(".time-title").find(".hour").text();var d=$(".time-title").find(".minute").text();var f=$(this)[0]["data-date"].split(/-|\//g);var g=new Date(f[0],f[1]-1,f[2]);var h=g.getDay();switch(h){case 1:h="星期一";break;case 2:h="星期二";break;case 3:h="星期三";break;case 4:h="星期四";break;case 5:h="星期五";break;case 6:h="星期六";break;case 0:h="星期日";break;default:break}if(v==null){C[0].tagName.toUpperCase()==="INPUT"?C.val($(this)[0]["data-date"]+" "+(E?h:(A?e+":"+d:""))):C.text($(this)[0]["data-date"]+" "+(E?h:(A?e+":"+d:"")))}else{$(v)[0].tagName.toUpperCase()==="INPUT"?$(v).val($(this)[0]["data-date"]+" "+(E?h:(A?e+":"+d:""))):$(v).text($(this)[0]["data-date"]+" "+(E?h:(A?e+":"+d:"")))}z=$(this)[0]["data-date"];B=[e,d];A?$(this).addClass("on").siblings().removeClass("on"):a.removeDate();if(s){s()}})})},eventClose:function(){var a=this;$(".cal-close").bind("click",function(){a.removeDate()})},outClick:function(){var a=this;$(document).bind("click",function(){a.removeDate()})}};w.init()};