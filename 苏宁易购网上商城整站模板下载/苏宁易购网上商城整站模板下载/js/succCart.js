var envType = "PRD";
var domain_prd_reg = /^\w*?.suning.com$/;
var domain_pre_reg = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
var domain_sit_reg = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
var domain_dev_reg = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
var _hostName = document.location.hostname;
if (domain_prd_reg.test(_hostName)) {
    envType = "PRD"
} else {
    if (domain_pre_reg.test(_hostName)) {
        envType = "PRE"
    } else {
        if (domain_sit_reg.test(_hostName)) {
            envType = "SIT"
        } else {
            if (domain_dev_reg.test(_hostName)) {
                envType = "DEV"
            } else {
                envType = "PRD"
            }
        }
    }
}
var ccfDomain = "shopping.suning.com";
if (envType == "PRE") {
    ccfDomain = "shoppingpre.cnsuning.com"
} else {
    if (envType == "SIT") {
        ccfDomain = "shoppingsit.cnsuning.com"
    } else {
        if (envType == "DEV") {
            ccfDomain = "ccfdev.cnsuning.com:8080"
        }
    }
}
var cityId = getCookie("cityId");
sn.cityId = cityId;
var succCart = succCart || {};
succCart.tab = function() {
    $(".love .nav li").each(function(a, b) {
        $(this).click(function() {
            $(".love .nav li.action").removeClass("action");
            $(this).addClass("action");
            $(".love-list ul:eq(" + a + ")").show().siblings().hide()
        })
    })
};
succCart.addCart = function() {
    var a = $(".ic-cart");
    a.live("click", function() {
        var c = $(this), b = c.closest("li").find(".pic img");
        if (b.length) {
            add2Cart(c)
        }
    })
};
function afterAddCart(g, b) {
    if (b) {
        var d = g.offset().top, e = g.offset().left, c = g.closest("li").find(".pic img");
        var f = c.offset().top, a = c.offset().left, h = $('<div><img src="' + c.attr("src") + '" /></div>').css({position: "absolute", "z-index": 999999, top: f + 30, left: a + 30, width: "100px", height: "100px"}).appendTo("body");
        h.animate({top: d, left: e, width: "20px", height: "20px"}, 400, function() {
            h.remove();
            var i = $('<span class="icon-plusone"></span>').appendTo(g);
            i.animate({bottom: "+=10px", opacity: 0}, 600, function() {
                i.remove()
            })
        });
        SFE.base.miniCartReload()
    } else {
        g.closest("li").addClass("out").append('<div class="shadow"><i></i><b>加入失败</b></div>')
    }
}
function add2Cart(f) {
    var e = $.parseJSON(f.attr("params"));
    if (null != e && e != undefined) {
        var c = e.promotionType;
        var d = "";
        if (c == "1" || c == "2" || c == "3" || c == "4" || c == "5" || c == "6") {
            d = "4"
        }
        e.priceType = d;
        var b = e.vendorCode;
        if (b != undefined && b != "") {
            var a = "http://" + sn.cartPath + "/emall/SNGetVendorTypeCmd";
            var g = "vendorCode=" + b;
            $.ajax({url: a, data: g, dataType: "jsonp", crossDomain: true, success: function(h) {
                    if (h.vendorType == 3 || h.vendorType == 4) {
                        e.vendorType = h.vendorType;
                        addToCCF(f, e)
                    } else {
                        addToCommerce(f, e)
                    }
                }, error: function() {
                    showSysErrDialog()
                }})
        } else {
            addToCommerce(f, e)
        }
    } else {
        afterAddCart(f, false)
    }
}
function addToCCF(d, c) {
    var b = c.priceType;
    var a = "01";
    var f = "";
    var g = "http://" + ccfDomain + "/overSeaAddCart.do";
    var e = {sourcePageType: "", activityType: a, activityId: f, cmmdtyCode: c.partNumber, shopCode: c.vendorCode, cmmdtyQty: c.buyNum, overSeasFlag: c.vendorType == 3 ? "927HWG1" : "927HWG"};
    $.ajax({url: g, data: e, cache: false, async: false, dataType: "jsonp", crossDomain: true, success: function(j) {
            var h = j.isSuccess;
            var k = "";
            var i = "";
            if (j.addCartErrorList != null && j.addCartErrorList != undefined && j.addCartErrorList.length > 0) {
                k = j.addCartErrorList[0].errorCode;
                i = j.addCartErrorList[0].errorMessage
            }
            if (h == "Y") {
                afterAddCart(d, true)
            } else {
                if (isEmpty(i) || k == "001") {
                    showSysErrDialog()
                } else {
                    afterAddCart(d, false)
                }
            }
        }, error: function() {
            showSysErrDialog()
        }})
}
function addToCommerce(c, b) {
    var a = $("#cartFlag").val();
    if (a != undefined && "B" == a) {
        addToCommerceB(c, b)
    } else {
        addToCommerceA(c, b)
    }
}
function addToCommerceA(d, c) {
    c.sellType = 0;
    c.priceType = "0";
    var a = "http://" + sn.cartPath + "/emall/addMiniSoppingCart";
    var b = {ERROEVIEW: "miniShoppingCartView", URL: "miniShoppingCartView", quantity: c.buyNum, fullInventoryCheck: "0", inventoryCheckType: "0", fullVoucherCheck: "0", voucherCheckType: "0", inventoryRemoteCheck: "0", voucherRemoteCheck: "1", storeId: "10052", catalogId: "10051", orderId: ".", partnumber: c.partNumber, sellType: c.sellType, supplierCode: c.vendorCode, priceType: c.priceType, promotionActiveId: c.promotionId};
    $.ajax({url: a, data: b, cache: false, async: false, dataType: "jsonp", crossDomain: true, jsonp: "callback", success: function(e) {
            if (e.userStatus != "") {
                afterAddCart(d, false)
            } else {
                if (e.errorCode == "wrongInput") {
                    showSysErrDialog()
                } else {
                    if ((!isEmpty(e.errorCode) && e.errorCode != "NO") || e.isOverLimitCnt == "OVERLIMIT") {
                        afterAddCart(d, false)
                    } else {
                        if (e.hasInventor == 1 && e.treaph == 0) {
                            afterAddCart(d, true)
                        } else {
                            if (e.hasInventor == 0 && (e.invErrFlow == 3 || e.invErrFlow == 0)) {
                                afterAddCart(d, true)
                            } else {
                                afterAddCart(d, false)
                            }
                        }
                    }
                }
            }
        }, error: function() {
            showSysErrDialog()
        }})
}
function addToCommerceB(e, d) {
    var a = d.vendorCode;
    if ("" == d.vendorType || "0" == d.vendorType) {
        a = "0000000000"
    }
    var c = "01";
    var g = "";
    if (d.priceType == "4") {
        c = "02";
        g = d.promotionId
    }
    var h = "http://" + ccfDomain + "/addCart.do?callback=?";
    var b = [{activityId: g, activityType: c, cmmdtyCode: d.partNumber, cmmdtyQty: d.buyNum, shopCode: a}];
    d.cmmdtyVOList = b;
    var f = {cartVO: obj2string(d)};
    $.getJSON(h, f).done(function(l) {
        var j = l.returnCode;
        if (null != j && "" != j && "4000" == j) {
            Util.alertErrorBox("您访问的太频繁， 网络拥堵，请您稍后再试！");
            return false
        }
        var i = l.isSuccess;
        if (i == "Y") {
            afterAddCart(e, true)
        } else {
            var k = l.addCartErrorList[0].errorMessage;
            var m = l.addCartErrorList[0].errorCode;
            if (m == "017") {
                afterAddCart(e, false)
            } else {
                if (m == "018") {
                    afterAddCart(e, false)
                } else {
                    if (m == "019") {
                        afterAddCart(e, false)
                    } else {
                        if (m == "015" || m == "025") {
                            afterAddCart(e, false)
                        } else {
                            if (m == "024") {
                                afterAddCart(e, false)
                            } else {
                                if (k != undefined && k != "") {
                                    afterAddCart(e, false)
                                } else {
                                    showSysErrDialog()
                                }
                            }
                        }
                    }
                }
            }
        }
    }).fail(function() {
        showSysErrDialog()
    })
}
function obj2string(c) {
    var b = [];
    if (null == c || typeof (c) == "undefined") {
        return""
    }
    if (typeof c == "string") {
        return c
    }
    if (typeof c == "object") {
        if (!c.sort) {
            for (var a in c) {
                if ("string" == typeof (c[a])) {
                    b.push('"' + a + '":"' + obj2string(c[a]) + '"')
                } else {
                    b.push('"' + a + '":' + obj2string(c[a]))
                }
            }
            if (!!document.all && !/^\n?function\s*toString\(\)\s*\{\n?\s*\[native code\]\n?\s*\}\n?\s*$/.test(c.toString)) {
                b.push("toString:" + c.toString.toString())
            }
            b = "{" + b.join() + "}"
        } else {
            for (var a = 0; a < c.length; a++) {
                b.push(obj2string(c[a]))
            }
            b = "[" + b.join() + "]"
        }
        return b
    }
    return c.toString()
}
succCart.replaceFn = function(a, d) {
    var b = 0;
    $(a).click(function() {
        if (b == Math.ceil($(d).toArray().length / 5) - 1) {
            b = 0
        } else {
            b++
        }
        c(b)
    });
    function c(e) {
        $(d).css("display", "none");
        var f = 0;
        $(d).each(function() {
            if (Math.floor(f / 5) == e) {
                $(this).css("display", "block")
            }
            f++
        })
    }}
;
succCart.bestChoiceProd = function(d, c, e, b, a) {
    $.ajax({url: sn.tuijianDomain + "/recommend-portal/dyBase.jsonp", data: {u: b, c: a, parameter: d, vendorId: c, cityId: e, sceneIds: "10-30", count: 10}, cache: false, async: false, dataType: "jsonp", jsonp: "callback", success: function(f) {
            if (null != f && typeof f.sugGoods != "undefined" && f.sugGoods.length > 0 && typeof f.sugGoods[0].skus != "undefined" && f.sugGoods[0].skus.length >= 8) {
                $("#loveDiv1").val("1");
                var y = f.sugGoods[0].skus;
                var n = "";
                var m = [];
                var w = 0, v = 0;
                for (var s = 0; s < y.length; s++) {
                    var k = y[s];
                    var j = k.vendorId;
                    var l = k.sugGoodsCode;
                    m.push(l + "-" + j);
                    if (k.promotionType == "6") {
                        j = "mp"
                    }
                    w = s % 5 == 0 ? w + 1 : w;
                    v = s % 5 + 1;
                    var t = l.substring(9, 19);
                    var r = sn.productDomain + "/" + j + "/" + t + ".html";
                    var x = sn.imageDomianDir + "/content/catentries/" + l.substring(0, 14) + "/" + l + "/" + l + "_ls1.jpg";
                    var g = "baoguang_recyhsp_" + w + "-" + v + "_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var h = "cart_" + d.substring(9, 19) + "_recyhsp_" + w + "-" + v + "_p_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var p = "cart_" + d.substring(9, 19) + "_recyhsp_" + w + "-" + v + "_c_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var q = "cart_" + d.substring(9, 19) + "_recyhsp_" + w + "-" + v + "_b_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var u = '{"buyNum":1,"vendorCode":"' + k.vendorId + '","partNumber":"' + l + '","cityId":' + e + ',"promotionType":"' + k.promotionType + '","promotionId":"' + k.promotionId + '"}';
                    var o = k.vendorId + "_" + t;
                    n += getProdHtml(k, o, r, x, u, g, h, p, q)
                }
                $(".love-list ul").html(n);
                afterLoad()
            } else {
                $("#loveDiv1").val("2");
                afterLoad()
            }
        }, error: function() {
            $("#loveDiv1").val("2");
            afterLoad()
        }})
};
succCart.belowTenProd = function(d, c, e, b, a) {
    $.ajax({url: sn.tuijianDomain + "/recommend-portal/dyBase.jsonp", data: {u: b, c: a, parameter: d, vendorId: c, cityId: e, sceneIds: "10-35", count: 15}, cache: false, async: false, dataType: "jsonp", jsonp: "callback", success: function(f) {
            if (null != f && typeof f.sugGoods != "undefined" && f.sugGoods.length > 0 && typeof f.sugGoods[0].skus != "undefined" && f.sugGoods[0].skus.length >= 5) {
                $("#salesDiv").val("1");
                var y = f.sugGoods[0].skus;
                if (y.length <= 5) {
                    $("a[name='tjjh_none_module2_hyz']").hide()
                }
                var n = "";
                var m = [];
                var w = 0, v = 0;
                for (var s = 0; s < y.length; s++) {
                    var k = y[s];
                    var j = k.vendorId;
                    var l = k.sugGoodsCode;
                    m.push(l + "-" + j);
                    if (k.promotionType == "6") {
                        j = "mp"
                    }
                    w = s % 5 == 0 ? w + 1 : w;
                    v = s % 5 + 1;
                    var t = l.substring(9, 19);
                    var r = sn.productDomain + "/" + j + "/" + t + ".html";
                    var x = sn.imageDomianDir + "/content/catentries/" + l.substring(0, 14) + "/" + l + "/" + l + "_ls1.jpg";
                    var g = "baoguang_recthsp_" + w + "-" + v + "_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var h = "cart_" + d.substring(9, 19) + "_recthsp_" + w + "-" + v + "_p_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var p = "cart_" + d.substring(9, 19) + "_recthsp_" + w + "-" + v + "_c_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var q = "cart_" + d.substring(9, 19) + "_recthsp_" + w + "-" + v + "_b_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var u = '{"buyNum":1,"vendorCode":"' + k.vendorId + '","partNumber":"' + l + '","cityId":' + e + ',"promotionType":"' + k.promotionType + '","promotionId":"' + k.promotionId + '"}';
                    var o = k.vendorId + "_" + t;
                    n += getProdHtml(k, o, r, x, u, g, h, p, q)
                }
                $("div.sales ul").html(n);
                afterLoad()
            } else {
                $("#salesDiv").val("2");
                afterLoad()
            }
        }, error: function() {
            $("#salesDiv").val("2");
            afterLoad()
        }})
};
succCart.guessLikeProd = function(d, c, e, b, a) {
    $.ajax({url: sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp", data: {u: b, c: a, parameters: d, vendorId: c, cityId: e, sceneIds: "10-33", count: 15}, cache: false, async: false, dataType: "jsonp", jsonp: "callback", success: function(f) {
            if (null != f && typeof f.sugGoods != "undefined" && f.sugGoods.length > 0 && typeof f.sugGoods[0].skus != "undefined" && f.sugGoods[0].skus.length >= 5) {
                $("#likeDiv").val("1");
                var y = f.sugGoods[0].skus;
                if (y.length <= 5) {
                    $("a[name='tjjh_none_module3_hyz']").hide()
                }
                var n = "";
                var m = [];
                var w = 0, v = 0;
                for (var s = 0; s < y.length; s++) {
                    var k = y[s];
                    var j = k.vendorId;
                    var l = k.sugGoodsCode;
                    m.push(l + "-" + j);
                    if (k.promotionInfo == "6") {
                        j = "mp"
                    }
                    w = s % 5 == 0 ? w + 1 : w;
                    v = s % 5 + 1;
                    var t = l.substring(9, 19);
                    var r = sn.productDomain + "/" + j + "/" + t + ".html";
                    var x = sn.imageDomianDir + "/content/catentries/" + l.substring(0, 14) + "/" + l + "/" + l + "_ls1.jpg";
                    var g = "baoguang_recgcx_" + w + "-" + v + "_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var h = "cart_" + d.substring(9, 19) + "_recgcx_" + w + "-" + v + "_p_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var p = "cart_" + d.substring(9, 19) + "_recgcx_" + w + "-" + v + "_c_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var q = "cart_" + d.substring(9, 19) + "_recgcx_" + w + "-" + v + "_b_" + k.vendorId + "_" + t + "_" + k.handwork;
                    var u = '{"buyNum":1,"vendorCode":"' + k.vendorId + '","partNumber":"' + l + '","cityId":' + e + ',"promotionType":"' + k.promotionType + '","promotionId":"' + k.promotionId + '"}';
                    var o = k.vendorId + "_" + t;
                    n += getProdHtml(k, o, r, x, u, g, h, p, q)
                }
                $("div.like ul").html(n);
                afterLoad()
            } else {
                $("#likeDiv").val("2");
                afterLoad()
            }
        }, error: function() {
            $("#likeDiv").val("2");
            afterLoad()
        }})
};
function getProdHtml(h, c, a, k, e, b, f, i, j) {
    var d = isEmpty(h.salesVolume) ? "0" : h.salesVolume;
    var g = "";
    g += "<li id='" + c + "'>";
    g += "<div class='pic'><a href='" + a + "?src=" + f + "' name='" + f + "' target='_blank' ><img src='" + k + "' alt='" + h.sugGoodsName + "'/></a></div>";
    g += "<p class='text'>" + getPromotionTip(h.promotionType) + "<a href='" + a + "?src=" + i + "' title='" + h.sugGoodsName + "' id='" + b + "' name='" + i + "' target='_blank'>" + h.sugGoodsName + "</a></p>";
    g += "<p class='price'><i>&yen;</i><strong>" + h.price + "</strong></p>";
    g += "<p class='evaluation'><span>" + d + "</span>人已购买</p>";
    g += "<p class='ic-cart' params='" + e + "' name='" + j + "'></p>";
    g += "</li>";
    return g
}
function afterLoad() {
    var b = $("#loveDiv1").val();
    var a = $("#salesDiv").val();
    var d = $("#likeDiv").val();
    if (!isEmpty(b) && !isEmpty(a) && !isEmpty(d)) {
        if (b == "1") {
            $("div.love .cont .load-cont").hide();
            $(".love-list ul").show();
            $("div.love").show()
        } else {
            $("div.love").hide()
        }
        if (a == "1") {
            $("div.sales .cont .load-cont").hide();
            $("div.sales .cont .list-box").show();
            $("div.sales").show()
        } else {
            $("div.sales").hide()
        }
        if (d == "1") {
            $("div.like .cont .load-cont").hide();
            $("div.like .cont .list-box").show();
            $("div.like").show()
        } else {
            $("div.like").hide()
        }
        try {
            runAnalyseExpo()
        } catch (c) {
        }
        refreshFooter()
    }
}
function showSysErrDialog() {
    $.mLionDialog({css: {width: "438px"}, title: "", http: function(a, b) {
            a.find(".content").html($("#sysErrTip").html())
        }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
}
function getPromotionTip(b) {
    var a = "";
    if (isEmpty(b)) {
        return a
    }
    a += "<span class='ju'>";
    if (b == "1") {
        a += "大聚惠"
    } else {
        if (b == "2") {
            a += "抢购"
        } else {
            if (b == "3") {
                a += "团购"
            } else {
                if (b == "4") {
                    a += "闪购"
                } else {
                    if (b == "5") {
                        a += "专享"
                    } else {
                        if (b == "6") {
                            a += "名品特卖"
                        } else {
                            if (b == "7") {
                                a += "返券"
                            } else {
                                if (b == "8") {
                                    a += "直降"
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    a += "</span>";
    return a
}
function isEmpty(a) {
    return a == null || a == undefined || a == ""
}
function getCookie(a) {
    var b = document.cookie.split("; ");
    for (var d = 0; d < b.length; d++) {
        var c = b[d].split("=");
        if (c[0] == a) {
            return unescape(c[1])
        }
    }
}
function runAnalyseExpo() {
    if (typeof _analyseExpoTags == "function") {
        _analyseExpoTags("a")
    } else {
        setTimeout(runAnalyseExpo, 1000)
    }
}
$(function() {
    succCart.tab();
    succCart.addCart();
    succCart.replaceFn(".sales .replace", ".sales li");
    succCart.replaceFn(".like .replace", ".like li");
    var f = $("#partnumber").val();
    var c = $("#vendorcode").val();
    var b = getCookie("custno");
    if (typeof (b) == "undefined") {
        b = ""
    }
    var a = "";
    var d = "000000000";
    var e = getCookie("_snma");
    if (e != null && e != undefined) {
        e = e.split("|");
        a = e.length > 1 ? e[1] : ""
    }
    if (isEmpty(cityId) || isEmpty(f)) {
//        $(".cart_list").hide();
        refreshFooter()
    } else {
        f = f.length == 9 ? d + f : f;
        c = isEmpty(c) ? "0" + d : c;
        succCart.bestChoiceProd(f, c, cityId, b, a);
        succCart.belowTenProd(f, c, cityId, b, a);
        succCart.guessLikeProd(f, c, cityId, b, a)
    }
});
function refreshFooter() {
//    var d = $("#footer-dom-01"), b = $("#footer-dom-01"), c = $("#footer-dom-01").text(), a = $("#footer-dom-02").text();
//    d.remove();
//    b.remove();
//    $(".ng-footer").append(c + a)
}
;