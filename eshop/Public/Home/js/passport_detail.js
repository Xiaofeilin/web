var loginCallbackStack=[];var intervalVar;var currentLocation;var wapPopSt=1;var isAppendLoginStyle=false;function popupLoginContainer(d){if(typeof d=="undefined"){if(typeof passport_config!="undefined"){d=passport_config}else{alert("You must define passport_config var.");return}}currentLocation=window.location.href;var c=((typeof d.successCallbackUrl=="undefined")?(d.base+"popupLoginSuccess?"):d.successCallbackUrl)+"topLocation="+encodeURIComponent(currentLocation.split("#")[0])+"&loginTheme="+d.loginTheme;$modalOverlay=$("#modalOverlay");if($modalOverlay.length>0){$modalOverlay.remove()}$modalContainer=$("#modalContainer");if($modalContainer.length>0){$modalContainer.remove()}$("body").append('<div id="modalOverlay" style="opacity: 0.3;filter:Alpha(opacity=30);background:none repeat scroll 0 0 #000000;position: absolute;border: 0 none;width: 100%;height: 100%;top: 0;left: 0;z-index:1000097;"></div><div id="modalContainer" style="z-index:1000098;position:fixed;_position: absolute;"></div>');$("#modalOverlay").hide();$("#modalOverlay").css("height",$(document).height()+"px");$("#modalContainer").html('<iframe id="iframeLogin" style="position: fixed ;" width="1" height="1" src="'+c+'" frameborder="0" scrolling="no" allowtransparency="yes"></iframe>');if(typeof intervalVar!="undefined"){clearInterval(intervalVar)}intervalVar=window.setInterval(checkMsgFromLoginIframe,200)}function checkMsgFromLoginIframe(){var e=window.location.hash;if(e.length>1){var d=e.split("#");var f=d[1].split(":");switch(f[0]){case"resize":resizeContainer(f[1]);break;case"close":closeContainer();break;case"loginSuccess":loginSuccess();break;case"loginRedirect":location.href=decodeURIComponent(f[1]);break;default:break}}}var ie6_num=0;function resizeContainer(l){$("#modalOverlay").show();var k=l.split(",");var q=k[0];var j=k[1];$iframe=$("#iframeLogin");$iframe.attr("width",q);$iframe.attr("height",j);var o=window.innerWidth?window.innerWidth:$(window).width();var r=window.innerHeight?window.innerHeight:$(window).height();var p=(o-q)/2;var m=(r-j)/2;var n=$(document).scrollTop();$modalContainer=$("#modalContainer");$modalContainer.css("top",Math.max(m,5));if(!window.XMLHttpRequest){ie6_num=1;m=m+n;$modalContainer.css("top",Math.max(m,5))}$modalContainer.css("left",p)}function closeContainer(){document.getElementById("modalOverlay").style.display="none";document.getElementById("modalContainer").style.display="none";$("html").removeClass("login-noscroll2");$("body").removeClass("login-noscroll");if(wapPopSt!=1){$("body").scrollTop(wapPopSt);wapPopSt=1}window.location.href=(currentLocation.indexOf("#")==-1)?currentLocation+"#unknown":currentLocation;clearInterval(intervalVar)}function loginSuccess(){closeContainer();var b=loginCallbackStack.pop();if(b!=null){b()}}function probeAuthStatus(f,d,e){if(typeof e=="undefined"){if(typeof passport_config!="undefined"){e=passport_config}else{alert("You must define passport_config var.");return}}$.ajax({url:e.base+"authStatus",crossDomain:true,cache:false,dataType:"jsonp",success:function(b){if(b.hasLogin){var a=b.principal;f(a)}else{d()}}})}function ensureLogin(c,d){if(typeof d=="undefined"){if(typeof passport_config!="undefined"){d=passport_config}else{alert("You must define passport_config var.");return}}loginCallbackStack.push(c);popupLoginContainer(d)}function ensureLoginWap(f,e){if(typeof e=="undefined"){if(typeof passport_config!="undefined"){e=passport_config}else{alert("You must define passport_config var.");return}}loginCallbackStack.push(f);currentLocation=window.location.href;var d=((typeof e.successCallbackUrl=="undefined")?(e.base+"popupLoginSuccess?"):e.successCallbackUrl)+"topLocation="+encodeURIComponent(currentLocation.split("#")[0])+"&loginTheme="+e.loginTheme;$modalOverlay=$("#modalOverlay");if($modalOverlay.length>0){$modalOverlay.remove()}$modalContainer=$("#modalContainer");if($modalContainer.length>0){$modalContainer.remove()}$("body").append('<div id="modalOverlay" style="position: absolute; top: 0; left: 0; z-index: 998;"></div><div id="modalContainer"></div>');$("#modalOverlay").height("100%").width("100%");$("#modalOverlay").html('<iframe id="iframeLogin"  src="'+d+'" width="100%" height="100%" scrolling="no" frameborder="0"></iframe>');if(!isAppendLoginStyle){$("head").append("<style>.login-noscroll{overflow:hidden;height:100%} .login-noscroll2{overflow:scroll;height:100%}</style>");isAppendLoginStyle=true}wapPopSt=$("body").scrollTop();$("html").addClass("login-noscroll2");$("body").addClass("login-noscroll");if(typeof intervalVar!="undefined"){clearInterval(intervalVar)}intervalVar=window.setInterval(checkMsgFromLoginIframe,200)}function ajaxInSameDomain(l,j,i,k,g,h){if(typeof h=="undefined"){if(typeof passport_config!="undefined"){h=passport_config}else{alert("You must define passport_config var.");return}}$.ajax({url:l,data:j,type:i,cache:false,error:g,success:function(c){if(c.idsIntercepted){var a=function(){ajaxInSameDomain(l,j,i,k,g,h)};if(c.policy=="GATEWAY"&&c.status=="UNKNOWN"){probeAuthStatus(a,a,h);return}if(c.policy="RESTRICTED"){if(c.status=="ANONYMOUS"){loginCallbackStack.push(a);popupLoginContainer(h);return}else{if(c.status=="UNKNOWN"){var b=function(){loginCallbackStack.push(a);popupLoginContainer(h)};probeAuthStatus(a,b,h);return}}}console.log("Illegal status.");return}k(c)}})}function ajaxCrossDomain(j,h,i,f,g){if(typeof g=="undefined"){if(typeof passport_config!="undefined"){g=passport_config}else{alert("You must define passport_config var.");return}}$.ajax({url:j,data:h==null?"crossDomainJsonpRequest=true":h+"&crossDomainJsonpRequest=true",crossDomain:true,dataType:"jsonp",cache:false,error:f,success:function(b){if(b.authStatusResponse){var a=function(){ajaxCrossDomain(j,h,i,f,g)};if(b.hasLogin){a()}else{loginCallbackStack.push(a);popupLoginContainer(g)}return}i(b)}})}if(!window.XMLHttpRequest){$(window).scroll(function(){var f=$(document).scrollTop();var e=$(window).height();var h=$("#modalContainer").find("iframe").height();var g=Math.max(0,(e-h)/2);$("#modalContainer").css({top:f+g})})}function ensureReg(c,d){probeAuthStatus(function(){if(c!=null){c()}},function(){popupRegContainer(c,d)},d)}function popupRegContainer(f,e){if(typeof e=="undefined"||e==null){if(typeof passport_config!="undefined"){e=passport_config}else{alert("You must define passport_config var.");return}}if(!e.hasOwnProperty("regDomain")){alert("You must define passport_config.regDomain");return}loginCallbackStack.push(f);currentLocation=window.location.href;var d=e.regDomain+"/popreg.do?topLocation="+encodeURIComponent(currentLocation.split("#")[0]);$modalOverlay=$("#modalOverlay");if($modalOverlay.length>0){$modalOverlay.remove()}$modalContainer=$("#modalContainer");if($modalContainer.length>0){$modalContainer.remove()}$("body").append('<div id="modalOverlay" style="opacity: 0.3;filter:Alpha(opacity=30);background:none repeat scroll 0 0 #000000;position: absolute;border: 0 none;width: 100%;height: 100%;top: 0;left: 0;z-index:1000097;"></div><div id="modalContainer" style="z-index:1000098;position:fixed;_position: absolute;"></div>');$("#modalOverlay").hide();$("#modalOverlay").css("height",$(document).height()+"px");$("#modalContainer").html('<iframe id="iframeLogin" style="position: fixed ;" width="412" height="1" src="'+d+'" frameborder="0" scrolling="no" allowtransparency="yes"></iframe>');if(typeof intervalVar!="undefined"){clearInterval(intervalVar)}intervalVar=window.setInterval(checkMsgFromLoginIframe,200)};