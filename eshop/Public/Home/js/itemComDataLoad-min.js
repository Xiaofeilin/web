var CommonFourPage = CommonFourPage || {};
var Recommend = Recommend || {};
var sn_prd_reg = /^\w*?.suning.com$/;
var hostName = document.location.hostname;
var protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
var server = getServer();
var paraCorrectInfo = paraCorrectInfo || {};
var fitInfo = [];
var fitSub = function(b, c, a) {
    this.gType = b;
    this.passPart = c;
    this.subInfo = a
};
fitSub.prototype = {gType: "", passPart: "", subInfo: null};
_tag = "|";
function runAnalyseByClass(a) {
    if (a == "") {
        runAnalyseExpo()
    } else {
        runAnalyseExpoCus(a)
    }
}
var expoCusCount = 0;
function runAnalyseExpoCus(a) {
    if (typeof _analyseExpoTags == "function") {
        _analyseExpoTags("a", a)
    } else {
        if (expoCusCount < 10) {
            setTimeout(function() {
                runAnalyseExpoCus(a)
            }, 1000);
            expoCusCount++
        }
    }
}
var expoCount = 0;
function runAnalyseExpo() {
    if (typeof _analyseExpoTags == "function") {
        _analyseExpoTags("a")
    } else {
        if (expoCount < 10) {
            setTimeout(runAnalyseExpo, 1000);
            expoCount++
        }
    }
}
function sendDatasIndex(g) {
    var b = g.name;
    var c = g.id;
    var e = c + "|" + b;
    var j = protocol + server + "/ajaxClick.gif";
    var f = getOnlyIdIndex();
    var h = "_snck";
    _addCookie4Index(h, f, "/", "", "");
    var k = getCookieIndex("_snmp");
    var i = f + _tag + k + _tag + e;
    var a = j + "?_snmk=" + i;
    httpGifSendIndex(a)
}
function getOnlyIdIndex() {
    var b = new Date();
    var a = Math.round(100000 * Math.random());
    var c = b.getTime().toString().concat(a);
    return c
}
function getCookieIndex(b) {
    var e = document.cookie.split("; ");
    for (var c = 0;
            c < e.length;
            c++) {
        var a = e[c].split("=");
        if (a[0] == b) {
            return unescape(a[1])
        }
    }
}
function httpGifSendIndex(c) {
    var a = c;
    var b = document.createElement("img");
    b.src = a
}
function getServer() {
    if (sn_prd_reg.test(hostName)) {
        return"click.suning.cn/sa"
    } else {
        return"clicksit.suning.cn/sa"
    }
}
function _addCookie4Index(e, g, h, a, f) {
    var i = e + "=" + escape(g);
    if (a != "") {
        var c = new Date();
        c.setTime(c.getTime() + a);
        i += ";expires=" + c.toGMTString()
    }
    if (h != "") {
        i += ";path=" + h
    }
    var b = hostName;
    if (b.indexOf(".suning.com") != -1) {
        i += ";domain=.suning.com"
    } else {
        if (b.indexOf(".cnsuning.com") != -1) {
            i += ";domain=.cnsuning.com"
        } else {
            i += ";domain=" + f
        }
    }
    document.cookie = i
}
function changeAttr(b) {
    var a = new RegExp("-", "g");
    return b.indexOf("-") > 0 ? b.replace(a, "%252D") : b
}
function getRndArray(b) {
    arr1 = new Array();
    len = b.length;
    for (var a = 0;
            a < len;
            a++) {
        rnd = Math.floor(Math.random() * b.length);
        arr1[a] = b[rnd];
        b.splice(rnd, 1)
    }
    return arr1
}
function aps_adboard_romancecpc(a) {
    if (a != null && a.length > 0) {
        var b = '<div class="area-head"><h3>云台推荐</h3></div><ul class="exprec">';
        $.each(a, function(c, e) {
            b += '<li><a target="_blank" href="' + e.apsClickUrl + '"><img src="' + e.adSrc + '" alt="' + e.title + '" class="image" /></a>';
            b += '<p class="title"><a target="_blank" href="' + e.apsClickUrl + '" title="' + e.title + '">' + e.title + "</a></p>";
            b += '<p class="price"><span><i>&yen;</i>' + parseFloat(cmdPrice).toFixed(2) + "</span></p></li>"
        });
        if (b != "") {
            $(".apsDIV").html(b).show()
        } else {
            $(".apsDIV").html("").hide()
        }
    } else {
        $(".apsDIV").html("").hide()
    }
}
CommonFourPage.Recommend = {getAPSInfo: function() {
        if (typeof lazyElems != "undefined") {
            apsAdboardObj.aps_adboard_loadAdCpc(sn.apsId, sn.categoryId, 2, "");
            iFourth.win.scroll()
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getAPSInfo()
            }, 100)
        }
    }, getShopCategory: function(a, b) {
        $.ajax({url: sn.shopPath + sn.shopMainPh + "/" + a + "/resources/query_category/" + b + ".html", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: b, success: function(c) {
            }})
    }, getHotRank: function(a, b) {
        if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined" && typeof sn.promotionPrice != "undefined") {
            lazyElems.hotRank.url = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&catalogueId=" + sn.categoryId + "&cityId=" + sn.cityId + "&sceneIds=1-4&sceneIds=1-6&sceneIds=1-5&price=" + sn.promotionPrice + "&count=10";
            lazyElems.hotRank.enable = true;
            lazyElems.hotRank.handle = b;
            iFourth.win.scroll()
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getHotRank(a, b)
            }, 100)
        }
    }, getAlsoBuy: function(a, b) {
        if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined") {
            $("#view_Also_ViewProduct").remove();
            $("#view_Also_BuyProduct").remove();
            $("#buy_Also_BuyProduct").remove();
            if (sn.catalogId == "22001") {
                lazyElems.buyAlsoBuy.url = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=1-7&sceneIds=10-2&count=5"
            } else {
                lazyElems.buyAlsoBuy.url = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=1-1&sceneIds=1-2&count=5"
            }
            lazyElems.buyAlsoBuy.enable = true;
            lazyElems.buyAlsoBuy.handle = b;
            iFourth.win.scroll()
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getAlsoBuy(a, b)
            }, 100)
        }
    }, historyRec: function(b, e) {
        if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined") {
            var c = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?";
            if (SFE.base.d("logonStatus") != null && SFE.base.d("logonStatus") != "") {
                c += "&u=" + SFE.base.d("custno")
            } else {
                c += "&u="
            }
            var a = SFE.base.d("_snma").split("|");
            c += "&c=" + (a.length > 1 ? a[1] : "");
            c += "&cityId=" + sn.cityId + "&sceneIds=8-3&count=20";
            lazyElems["J-historyRec"].url = c;
            lazyElems["J-historyRec"].enable = true;
            lazyElems["J-historyRec"].handle = e;
            lazyElems["J-historyRec"].cache = false
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.historyRec(b, e)
            }, 100)
        }
    }, shopListItems: function(a, b) {
        $.ajax({url: sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=11-1&count=6&callback=" + b, cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: b, success: function(c) {
            }})
    }, getOffSaleRecom: function(a, b) {
        if (typeof sn.passPartNumber != "undefined") {
            $.ajax({url: sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=10-1&count=8", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: b, success: function(c) {
                }})
        } else {
            if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined") {
                lazyElems["J-slide1"].url = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=10-1&count=8";
                lazyElems["J-slide1"].enable = true;
                lazyElems["J-slide1"].handle = b;
                iFourth.win.scroll()
            } else {
                setTimeout(function() {
                    CommonFourPage.Recommend.getOffSaleRecom(a, b)
                }, 100)
            }
        }
    }, noPublishItems: function(a, b) {
        $.ajax({url: sn.tuijianDomain + "/recommend-portal/recommendv3/scenesBiz.jsonp?parameter=" + a + "&catalogueId=" + sn.categoryId + "&cityId=" + sn.cityId + "&sceneIds=11-2&sceneIds=10-1&count=10&callback=" + b, cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: b, success: function(c) {
            }})
    }, getUniformHot: function(a) {
        if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined") {
            lazyElems.uniformHot.url = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + sn.thirdCategoryId + "&cityId=" + sn.cityId + "&sceneIds=10-9&count=5";
            lazyElems.uniformHot.enable = true;
            lazyElems.uniformHot.handle = a;
            iFourth.win.scroll()
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getUniformHot(a)
            }, 100)
        }
    }, getUniformNew: function(a, b) {
        if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined") {
            lazyElems.uniformNew.url = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=7-6&count=5";
            lazyElems.uniformNew.enable = true;
            lazyElems.uniformNew.handle = b;
            iFourth.win.scroll()
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getUniformNew(a, b)
            }, 100)
        }
    }, getShopRecom: function(a, b) {
        if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined") {
            $("#view_Also_BuyProduct").remove();
            $("#buy_Also_BuyProduct").remove();
            if ($("#buyAlsoBuy").length > 0) {
                lazyElems.buyAlsoBuy.url = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=10-15&vendorId=" + sn.vendorCode + "&count=6";
                lazyElems.buyAlsoBuy.enable = true;
                lazyElems.buyAlsoBuy.handle = b;
                iFourth.win.scroll()
            }
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getShopRecom(a, b)
            }, 100)
        }
    }, getShopViewAlsoView: function(a, b) {
        if (typeof sn.cityId != "undefined") {
            $.ajax({url: sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=10-14&vendorId=" + sn.vendorCode + "&count=10&callback=" + b, cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: b, success: function(c) {
                }})
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getShopViewAlsoView(a, b)
            }, 100)
        }
    }, getShopRightRec: function(a, b) {
        if (typeof sn.cityId != "undefined" && sn.isPreBuy != 1) {
            $.ajax({url: sn.tuijianDomain + "/recommend-portal/recommend/paramsBiz.jsonp?parameter=" + a + "&priceSpread=" + sn.promotionPrice + "&vendorId=" + sn.vendorCode + "&cityId=" + sn.cityId + "&sceneIds=6-27&count=10&callback=" + b, cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: b, success: function(c) {
                }})
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getShopRightRec(a, b)
            }, 100)
        }
    }, getShopHotSale: function(a, b) {
        if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined") {
            if ($("#shopHot").length > 0) {
                lazyElems.shopHot.url = sn.tuijianDomain + "/recommend-portal/recommendv2/biz.jsonp?parameter=" + a + "&cityId=" + sn.cityId + "&sceneIds=10-13&vendorId=" + sn.vendorCode + "&count=5";
                lazyElems.shopHot.enable = true;
                lazyElems.shopHot.handle = b;
                iFourth.win.scroll()
            }
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getShopHotSale(a, b)
            }, 100)
        }
    }, getShopFavorite: function(a) {
        if (typeof lazyElems != "undefined" && typeof sn.cityId != "undefined") {
            if ($("#shopCollection").length > 0) {
                lazyElems.shopCollection.url = sn.tuijianDomain + "/recommend-portal/recommend/paramsBiz.jsonp?vendorId=" + sn.vendorCode + "&cityId=" + sn.cityId + "&sceneIds=6-25&count=5";
                lazyElems.shopCollection.enable = true;
                lazyElems.shopCollection.handle = a;
                iFourth.win.scroll()
            }
        } else {
            setTimeout(function() {
                CommonFourPage.Recommend.getShopFavorite(a)
            }, 100)
        }
    }, getPromotionContent: function(a, b) {
        if (typeof b == "undefined") {
            b = ""
        }
        if (a == "1") {
            return b + '<span class="label">大聚惠</span>'
        } else {
            if (a == "2") {
                return b + '<span class="label">抢购</span>'
            } else {
                if (a == "3") {
                    return b + '<span class="label">团购</span>'
                } else {
                    if (a == "4") {
                        return b + '<span class="label">闪购</span>'
                    } else {
                        if (a == "8") {
                            return b + '<span class="label">促</span>'
                        }
                    }
                }
            }
        }
        return""
    }};
CommonFourPage.Cart = {itemLimit: function(c, e) {
        var a = sn.vendorCode;
        if (a.length == 10 && a.substring(0, 3) == "003") {
            a = ""
        }
        var b = "http://" + sn.domain + sn.context + "/snpls_10052_" + sn.catalogId + "_" + c + "_" + a + "_" + sn.cityId + "_" + e + "_.html";
        $.ajax({url: b, type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: e, success: function(f) {
            }})
    }, getSunShine: function(c, f) {
        if (typeof sn.yanbaoSet == "undefined" || sn.yanbaoSet == null || sn.yanbaoSet == "" || sn.yanbaoSet.length <= 0) {
            return
        }
        var a = {};
        var e = sn.yanbaoSet;
        a.warrProductLst = e;
        for (var b = 0;
                b < a.warrProductLst.length;
                b++) {
            a.warrProductLst[b].extendPrice = a.warrProductLst[b].warrantyPrice;
            a.warrProductLst[b].warrPartnumber = a.warrProductLst[b].goodsCode;
            a.warrProductLst[b].warrType = a.warrProductLst[b].goodsType;
            a.warrProductLst[b].warrYearLimit = a.warrProductLst[b].timeLimit
        }
        f(a)
    }};
function getItemSaleStatus(f, g) {
    sn.yanbaoSet = "";
    sn.priceLoad = false;
    var a = sn.vendorCode;
    if (sn.vendorCode == "-1") {
        a = ""
    } else {
        if (sn.shopType == "0") {
            a = "0000000000"
        }
    }
    var c = "";
    var e = sn.icpsFlag;
    if (typeof e != "undefined" && e != "" && e == "1") {
        c = "http://" + sn.domain + "/webapp/wcs/stores/ItemPrice/" + f + "_" + a + "_" + sn.cityId + "_" + sn.districtId + "_1.html"
    } else {
        var b = sn.lesCityId + sn.lesDistrictId + "01";
        c = sn.icpsDomain + "/icps-web/getAllPriceFourPage/" + f + "_" + a + "_" + sn.lesCityId + "_" + b + "_1_pc_showSaleStatus.vhtm"
    }
    $.ajax({url: c, type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: g, success: function() {
        }})
}
function getPassItemStatus(f, g) {
    sn.priceLoad = false;
    var a = sn.shopType == "0" ? "0000000000" : sn.vendorCode;
    var e = "";
    var c = sn.icpsFlag;
    if (typeof c != "undefined" && c != "" && c == "1") {
        e = "http://" + sn.domain + "/webapp/wcs/stores/GeneralPrice/" + f + "_" + a + "_" + sn.cityId + "_" + sn.districtId + "_1.html"
    } else {
        var b = sn.lesCityId + sn.lesDistrictId + "01";
        e = sn.icpsDomain + "/icps-web/getAllPriceFourPage/" + f + "_" + a + "_" + sn.lesCityId + "_" + b + "_1_pc_showSaleStatus.vhtm"
    }
    $.ajax({url: e, cache: true, async: false, dataType: "jsonp", jsonpCallback: g, success: function() {
        }})
}
function getMobileItemSaleStatus(f, h, g) {
    var a = sn.vendorCode;
    if (sn.vendorCode == "-1") {
        a = ""
    } else {
        if (sn.shopType == "0") {
            a = "0000000000"
        }
    }
    var c = "";
    var e = sn.icpsFlag;
    if (typeof e != "undefined" && e != "" && e == "1") {
        c = "http://" + sn.domain + "/webapp/wcs/stores/ItemPrice/" + f + "_" + a + "_" + sn.cityId + "_" + sn.districtId + "_2.html"
    } else {
        var b = sn.lesCityId + sn.lesDistrictId + "01";
        c = sn.icpsDomain + "/icps-web/getAllPriceFourPage/" + f + "_" + a + "_" + sn.lesCityId + "_" + b + "_2_pc_showSaleStatus.vhtm"
    }
    $.ajax({url: c, type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: h, success: function() {
        }, error: function() {
            g()
        }})
}
function getMobilePassItemStatus(f, h, g) {
    var a = sn.shopType == "0" ? "0000000000" : sn.vendorCode;
    var e = "";
    var c = sn.icpsFlag;
    if (typeof c != "undefined" && c != "" && c == "1") {
        e = "http://" + sn.domain + "/webapp/wcs/stores/GeneralPrice/" + f + "_" + a + "_" + sn.cityId + "_" + sn.districtId + "_2.html"
    } else {
        var b = sn.lesCityId + sn.lesDistrictId + "01";
        e = sn.icpsDomain + "/icps-web/getAllPriceFourPage/" + f + "_" + a + "_" + sn.lesCityId + "_" + b + "_2_pc_showSaleStatus.vhtm"
    }
    $.ajax({url: e, cache: true, async: false, dataType: "jsonp", jsonpCallback: h, success: function() {
        }, error: function() {
            g()
        }})
}
function getSubscribeActionFlag(c, f, e) {
    if (sn.reserveSwitch == "0") {
        var a = sn.vendorCode;
        if (a != undefined && a.length == 10 && a.substring(0, 3) == "003") {
            a = ""
        }
        var b = sn.itemDomain + "/pds-web/ajax/scrice_" + c + "_" + a + ".html";
        $.ajax({url: b, type: "get", cache: true, dataType: "json", success: function(g) {
                f(g)
            }, error: function() {
                e()
            }})
    } else {
        var a = sn.vendorCode;
        if (a == "" || (a != undefined && a.length == 10 && a.substring(0, 3) == "003")) {
            a = "0000000000"
        }
        var b = sn.yushouDomain + "/jsonp/checkActionIsAppointOrBookForJsonp-" + c + "-" + a + "-scricedata.htm";
        $.ajax({url: b, type: "get", cache: true, dataType: "jsonp", jsonpCallback: "scricedata", success: function(g) {
                f(g)
            }, error: function() {
                e()
            }})
    }
}
sn.pssPrceFlag = true;
sn.isLoadPricePrice = false;
sn.waitPriceTime = 10;
function getPSSPrice(c) {
    sn.isLoadPricePrice = false;
    var a = sn.vendorCode == "" ? "0000000000" : sn.vendorCode;
    var b = sn.yushouDomain + "/jsonp/appoint/getGoodsPrice-" + c + "-" + a + "-" + preBuy.actionID + "-prcessPSSPrice.htm";
    $.ajax({url: b, type: "get", async: false, cache: true, dataType: "jsonp", jsonpCallback: "prcessPSSPrice", success: function() {
        }, error: function() {
        }})
}
function prcessPSSPrice(b) {
    if (b != null) {
        preBuy.type = 1;
        preBuy.priceType = 2;
        preBuy.isEffect = true;
        if (b.priceType == "7-1") {
            preBuy.priceType = 1
        }
        if (preBuy.purchaseType.indexOf("P03") >= 0) {
            preBuy.type = 2
        }
        if (b.invStatus == "5") {
            preBuy.type = 3
        }
        if (b.invStatus == "6") {
            preBuy.isEffect = false
        }
        preBuy.price = b.promotionPrice;
        $(".proinfo-focus").eq(0).show();
        $(".proinfo-focus").eq(1).hide();
        $(".price-promo span.w3").html("预约价");
        if (preBuy.priceType == 2) {
            $(".price-promo .mainprice").eq(0).html("<i>&yen;</i>" + parseInt(preBuy.price) + ".<span>" + ((preBuy.price + "").split(".")[1]) + "</span>");
            $(".price-promo .mainprice").next().html("预约").show();
            sn.promotionPrice = preBuy.price;
            sn.netPrice = sn.promotionPrice;
            sn.priceType = "0";
            $("#shop" + sn.vendorCode + " .price").eq(0).siblings("i").remove();
            $("#shop" + sn.vendorCode + " .price").eq(0).html("<i>¥</i><em>" + sn.promotionPrice + "</em>")
        } else {
            if (preBuy.priceType == 1 && preBuy.price != "暂无报价") {
                $(".price-promo .mainprice").eq(0).html("<i>&yen;</i>" + preBuy.price);
                $(".price-promo .mainprice").next().html("预约").show();
                $(".price-promo").show();
                $("#allcuxiao").hide();
                sn.promotionPrice = preBuy.price;
                sn.netPrice = preBuy.price;
                sn.priceType = "0";
                $("#shop" + sn.vendorCode + " .price").eq(0).siblings("i").remove();
                $("#shop" + sn.vendorCode + " .price").eq(0).html("<i>¥</i><em>" + preBuy.price + "</em>")
            } else {
                $(".proinfo-focus").eq(0).hide();
                $(".proinfo-focus").eq(1).show();
                $("#allcuxiao").hide();
                preBuy.price = "";
                sn.promotionPrice = "";
                sn.netPrice = "";
                $("#shop" + sn.vendorCode + " .price").eq(0).siblings("i").remove();
                $("#shop" + sn.vendorCode + " .price").eq(0).html("<i>¥</i><em></em>")
            }
        }
        sn.proPriceBoxHtml = $("#proPriceBox").html()
    }
    if (sn.promotionPrice == "") {
        if (sn.prdType == "S") {
            $("#invInfo").html("暂不销售");
            $("#noInven").html("建议您选购其它商品");
            $("#shipInfo").html("").hide()
        } else {
            $("#c_kucun").html("暂不销售");
            $("#nowProduct").html("建议您选购其它商品")
        }
    }
    if (sn.pssPrceFlag && sn.prdType != "S") {
        sn.pssPrceFlag = false;
        getItemSubscribeAction(sn.partNumber, YuShou.initPreBuy, initProductSale)
    } else {
        if (sn.pssPrceFlag && sn.prdType == "S") {
            sn.pssPrceFlag = false;
            var a = null;
            $.each(generalSub.saleInfo, function(e, c) {
                if (c.partNumber == sn.curSubPartNumber) {
                    a = c
                }
            });
            if (a == null) {
                a = a || {accountPlace: "", deptNo: "", factorySendFlag: "", invStatus: "", juId: "", manageInvFlag: "", netPrice: preBuy.price, ownerPlace: "", partNumber: sn.curSubPartNumber, priceType: "0", promotionPrice: preBuy.price, refPrice: "", salesOrg: "", sendAvalidTime: "", sendCityId: "", vendor: "", vendorCode: "", vendorType: ""};
                generalSub.saleInfo.push(a)
            } else {
                a.promotionPrice = preBuy.price;
                a.netPrice = preBuy.prce
            }
            gMain.processSubSaleInfo();
            if (sn.promotionPrice == "") {
                $("#allcuxiao").hide()
            }
        }
    }
    if (preBuy.priceType != 2 && (sn.vendorCode == "" || sn.swlShopFlag)) {
        if ($(".ziti").parent().is(":visible")) {
            $(".ziti").html('<i class="icon"></i>自提')
        }
        $(".proinfo-serv .mian").hide();
        $("#fare" + sn.vendorCode).hide()
    }
    sn.isLoadPricePrice = true;
    if (sn.prdType != "S") {
        FourPage.shareWb()
    } else {
        gMain.shareWb()
    }
}
var bookFirstFlag = false;
var bookInfo = bookInfo || {status: 0, bookActionId: "", bookType: "", "adapteTerminal;": "", noInventoryFlag: "", doubleIndemnityFlag: "", fullPaymentFlag: "", actionStartTime: "", actionEndTime: "", curTime: "", depositStartTime: "", depositEndTime: "", balanceStartTime: "", balanceEndTime: "", sendTime: "", vendorMobileNumber: "", parentPartNumber: "", totalGoodsNum: "", personBuyLimit: "", bookPrice: "", depositAmount: "", segmentType: "", realBookedCount: "", virtualBookedCount: "", bookRemain: "", cityStr: "", saleStatus: false};
var bookCountTime = 0;
function processBookInfo(a) {
    sn.bookData = a;
    if (a != null) {
        bookInfo.bookActionId = a.bookActionId;
        bookInfo.bookType = a.bookType;
        bookInfo.adapteTerminal = a.adapteTerminal;
        bookInfo.noInventoryFlag = a.noInventoryFlag;
        bookInfo.doubleIndemnityFlag = a.doubleIndemnityFlag;
        bookInfo.fullPaymentFlag = a.fullPaymentFlag;
        bookInfo.actionStartTime = a.actionStartTime / 1000;
        bookInfo.actionEndTime = a.actionEndTime / 1000;
        bookInfo.curTime = a.curTime / 1000;
        bookInfo.depositStartTime = a.depositStartTime / 1000;
        bookInfo.depositEndTime = a.depositEndTime / 1000;
        bookInfo.balanceStartTime = a.balanceStartTime / 1000;
        bookInfo.balanceEndTime = a.balanceEndTime / 1000;
        bookInfo.sendTime = a.sendTime;
        bookInfo.vendorMobileNumber = a.vendorMobileNumber;
        bookInfo.parentPartNumber = a.parentPartNumber;
        bookInfo.totalGoodsNum = a.totalGoodsNum;
        bookInfo.personBuyLimit = a.personBuyLimit;
        bookInfo.segmentType = a.segmentType;
        bookInfo.realBookedCount = a.realBookedCount;
        bookInfo.virtualBookedCount = a.virtualBookedCount;
        bookInfo.bookRemain = a.bookRemain;
        bookInfo.cityStr = a.cityStr;
        bookInfo.flag = true;
        if (sn.invStatus == "6") {
            bookInfo.flag = false
        } else {
            bookInfo.flag = false;
            if (typeof bookInfo.cityStr != "undefined" && bookInfo.cityStr != "") {
                $.each(bookInfo.cityStr.split(","), function(b, c) {
                    if (sn.lesCityId == c) {
                        bookInfo.flag = true
                    }
                })
            } else {
                bookInfo.flag = true
            }
        }
        if (sn.prdType != "S") {
            sn.netPrice = sn.priceInvData.netPrice
        } else {
            sn.netPrice = typeof sn.netPrice != "undefined" ? sn.netPrice : ""
        }
        if (sn.netPrice == "") {
            bookInfo.bookRemain = "3"
        }
        if (bookInfo.flag && bookInfo.bookRemain != "3") {
            $("#preTime").show();
            if (bookInfo.curTime < bookInfo.depositStartTime) {
                bookInfo.status = 1;
                $("#preTime dt").html("预订开始");
                $(".presell-process li").removeClass("current");
                bookCountTime = parseInt(bookInfo.depositStartTime) - parseInt(bookInfo.curTime)
            } else {
                if (bookInfo.curTime >= bookInfo.depositStartTime && bookInfo.curTime <= bookInfo.depositEndTime) {
                    bookInfo.status = 2;
                    $("#preTime dt").html("付定金结束");
                    $(".presell-process li").removeClass("current");
                    $(".step-1").addClass("current");
                    bookCountTime = parseInt(bookInfo.depositEndTime) - parseInt(bookInfo.curTime)
                } else {
                    if (bookInfo.curTime > bookInfo.depositEndTime && bookInfo.curTime < bookInfo.balanceStartTime) {
                        if (bookInfo.bookType == "11") {
                            $(".presell-process li").removeClass("current");
                            bookInfo.status = 6;
                            bookCountTime = 0
                        } else {
                            bookInfo.status = 3;
                            $("#preTime dt").html("付尾款开始 ");
                            $(".presell-process li").removeClass("current");
                            $(".step-2").addClass("current");
                            bookCountTime = parseInt(bookInfo.balanceStartTime) - parseInt(bookInfo.curTime)
                        }
                    } else {
                        if (bookInfo.curTime >= bookInfo.balanceStartTime && bookInfo.curTime <= bookInfo.balanceEndTime) {
                            if (bookInfo.bookType == "11") {
                                $(".presell-process li").removeClass("current");
                                bookInfo.status = 6;
                                bookCountTime = 0
                            } else {
                                bookInfo.status = 4;
                                $("#preTime dt").html("付尾款结束");
                                $(".presell-process li").removeClass("current");
                                $(".step-3").addClass("current");
                                bookCountTime = parseInt(bookInfo.balanceEndTime) - parseInt(bookInfo.curTime)
                            }
                        } else {
                            $("#preTime dt").html("距离结束");
                            $(".presell-process li").removeClass("current");
                            $(".step-4").addClass("current");
                            bookInfo.status = 5;
                            bookCountTime = 0
                        }
                    }
                }
            }
        }
        processBookPrice();
        processCart();
        fillBookProcedure();
        if (bookInfo.flag && bookInfo.bookRemain != "3") {
            bookCount(bookCountTime)
        }
        if (sn.prdType != "S") {
            initProductSale()
        }
        iFourth.presell();
        iFourth.mainHeight()
    } else {
        if (sn.prdType != "S") {
            initProductSale()
        }
    }
    if (sn.prdType != "S") {
        FourPage.shareWb()
    } else {
        gMain.shareWb()
    }
}
function psellAlterInfo(a) {
    $("#psellBookMessage").html(a);
    $.mDialog({title: "支付失败", message: $("#win_presell"), css: {width: "480px"}, overlayClick: true})
}
function resetBookCss() {
    if (sn.groupFlag) {
        return
    }
    processBookPrice();
    processCart();
    processOthers()
}
function bookCount(a) {
    $(".duration-time").val(a);
    iFourth.countdown(function(b) {
        if (b == 0) {
            if (bookInfo.status == 1) {
                bookInfo.status = 2;
                $("#preTime dt").html("付定金结束");
                $(".presell-process li").removeClass("current");
                $(".step-1").addClass("current");
                remain = parseInt(bookInfo.depositEndTime) - parseInt(bookInfo.depositStartTime)
            } else {
                if (bookInfo.status == 2) {
                    if (bookInfo.bookType == "11") {
                        bookInfo.status = 6;
                        $(".presell-process li").removeClass("current");
                        remain = 0
                    } else {
                        bookInfo.status = 3;
                        $(".presell-process li").removeClass("current");
                        $(".step-2").addClass("current");
                        $("#preTime dt").html("付尾款开始 ");
                        remain = parseInt(bookInfo.balanceStartTime) - parseInt(bookInfo.depositEndTime)
                    }
                } else {
                    if (bookInfo.status == 3) {
                        if (bookInfo.bookType == "11") {
                            bookInfo.status = 6;
                            $(".presell-process li").removeClass("current");
                            remain = 0
                        } else {
                            bookInfo.status = 4;
                            $(".presell-process li").removeClass("current");
                            $(".step-3").addClass("current");
                            $("#preTime dt").html("付尾款结束");
                            remain = parseInt(bookInfo.balanceEndTime) - parseInt(bookInfo.balanceStartTime)
                        }
                    } else {
                        if (bookInfo.status == 4) {
                            bookInfo.status = 5;
                            $(".presell-process li").removeClass("current");
                            $(".step-4").addClass("current");
                            $("#preTime dt").html("距离结束 ");
                            remain = 0
                        }
                    }
                }
            }
            $("#preTime").show();
            processBookPrice();
            processCart()
        }
    })
}
function processBookPrice() {
    sn.promotionPrice = bookInfo.bookPrice;
    $("#PriceNotice1").hide();
    $("#c_yunfei").hide();
    $("#yunfei").hide();
    $("#shop" + sn.vendorCode + " .price em").html(sn.promotionPrice);
    if ((sn.netPrice == "" && bookInfo.bookPrice == "") || (bookInfo.bookPrice == "")) {
        $(".proinfo-focus").eq(0).hide();
        $(".proinfo-focus").eq(1).show();
        $("#cart2Price").html("");
        $("#miniPrice").html("");
        if (bookInfo.status == 4 || (bookInfo.bookType == "11" && bookInfo.status == 2)) {
            $("#c_kucun").html("暂不销售").show();
            $("#nowProduct").addClass("red").html("建议您选购其它商品").show();
            $("#invInfo").html("暂不销售").show();
            $("#noInven").addClass("red").html("建议您选购其它商品").show();
            $(".proinfo-deliver-time").show()
        } else {
            $("#c_kucun").hide();
            $("#nowProduct").hide();
            $("#invInfo").hide();
            $("#shipInfo").hide();
            $("#noInven").hide();
            $(".proinfo-deliver-time").hide()
        }
    } else {
        if (sn.netPrice == "") {
            $(".price-sn").hide();
            $(".price-promo dt span.w3").html("预售价");
            $(".mainprice").eq(0).html("<i>&yen;</i>" + parseInt(bookInfo.bookPrice) + ".<span>" + ((bookInfo.bookPrice + "").split(".")[1]) + "</span>");
            $(".mainprice").next().hide();
            $(".mainprice").siblings("a.link").hide();
            $(".price-promo").show();
            $("#bookPrice em").html(parseFloat(bookInfo.depositAmount).toFixed(2));
            $("#bookPrice").show();
            $("#bookRule").show();
            $(".proinfo-focus").eq(0).show();
            $(".proinfo-focus").eq(1).hide();
            $("#cart2Price").html(bookInfo.bookPrice);
            $("#miniPrice").html(bookInfo.bookPrice);
            yudingStatus();
            if (bookInfo.status == 4 || (bookInfo.bookType == "11" && bookInfo.status == 2)) {
                $("#c_kucun").html("无货").show();
                $("#nowProduct").removeClass("red").html("本商品在该城市暂无货").show();
                $("#invInfo").html("无货").show();
                $("#shipInfo").removeClass("red").html("本商品在该城市暂无货").show();
                $("#noInven").hide();
                $(".proinfo-deliver-time").show()
            } else {
                $("#c_kucun").hide();
                $("#nowProduct").hide();
                $("#invInfo").hide();
                $("#shipInfo").hide();
                $("#noInven").hide();
                $(".proinfo-deliver-time").hide()
            }
        } else {
            if (parseFloat(bookInfo.bookPrice) < parseFloat(sn.netPrice)) {
                $(".price-sn dd").html("<del><i>&yen;</i> " + sn.netPrice + "</del>");
                $(".price-sn").show()
            } else {
                $(".price-sn").hide()
            }
            $(".price-promo dt span.w3").html("预售价");
            $(".mainprice").eq(0).html("<i>&yen;</i>" + parseInt(bookInfo.bookPrice) + ".<span>" + ((bookInfo.bookPrice + "").split(".")[1]) + "</span>");
            $(".mainprice").next().hide();
            $(".price-promo").show();
            $(".mainprice").siblings("a.link").hide();
            $("#bookPrice em").html(parseFloat(bookInfo.depositAmount).toFixed(2));
            $("#bookPrice").show();
            $("#bookRule").show();
            $(".proinfo-focus").eq(0).show();
            $(".proinfo-focus").eq(1).hide();
            $("#cart2Price").html(bookInfo.bookPrice);
            $("#miniPrice").html(bookInfo.bookPrice);
            yudingStatus();
            if (bookInfo.status == 4 || (bookInfo.bookType == "11" && bookInfo.status == 2)) {
                var a, b = "";
                if (((sn.invStatus != "1" && sn.invStatus != "4") && sn.vendorCode == "") || (sn.vendorCode != "" && sn.invStatus != "1")) {
                    a = "无货";
                    b = "本商品在该城市暂无货";
                    bookInfo.saleStatus = false
                } else {
                    if (sn.vendorCode == "" && (typeof sn.shipOffSet == "undefined" || sn.shipOffSet == "-1")) {
                        a = "暂不销售";
                        b = "很抱歉，本商品在此地暂不支持配送";
                        bookInfo.saleStatus = false
                    } else {
                        a = "现货";
                        b = "";
                        bookInfo.saleStatus = true
                    }
                }
                if (bookInfo.saleStatus) {
                    $("#c_kucun").html(a).show();
                    $("#nowProduct").removeClass("red").html(b).show();
                    $("#invInfo").html(a).show();
                    $("#shipInfo").removeClass("red").html(b).show();
                    $("#noInven").hide();
                    $(".proinfo-deliver-time").show()
                } else {
                    $("#c_kucun").html(a).show();
                    $("#nowProduct").addClass("red").html(b).show();
                    $("#invInfo").html(a).show();
                    $("#noInven").addClass("red").html(b).show();
                    $("#shipInfo").hide();
                    $(".proinfo-deliver-time").show()
                }
            } else {
                $("#c_kucun").hide();
                $("#nowProduct").hide();
                $("#invInfo").hide();
                $("#shipInfo").hide();
                $("#noInven").hide();
                $(".proinfo-deliver-time").hide()
            }
        }
    }
}
function yudingStatus() {
    if (bookInfo.bookType == "10") {
        $(".price-promo dt span.w3").html("预订价");
        if ($("#yudingTips").length == 0) {
            $("#bookPrice").before('<span id="yudingTips" class="label">预订</span>')
        } else {
            $("#yudingTips").html("预订")
        }
        $("#yudingTips").show()
    } else {
        if (bookInfo.bookType == "11") {
            $(".price-promo dt span.w3").html("团购价");
            if ($("#yudingTips").length == 0) {
                $("#bookPrice").before('<span id="yudingTips" class="label">定金团</span>')
            } else {
                $("#yudingTips").html("定金团")
            }
            $("#yudingTips").show()
        }
    }
}
function processCart() {
    var a = parseInt(bookInfo.realBookedCount) + parseInt(bookInfo.virtualBookedCount);
    var c = "javascript:toDepositCart();";
    var b = "javascript:toBalanceCart();";
    $("#tellMe").hide();
    if (bookInfo.personBuyLimit != "0" && bookInfo.personBuyLimit != "" && typeof bookInfo.personBuyLimit != "undefined") {
        if (sn.prdType == "S") {
            $("#limitSale").html("每人限购<em>" + bookInfo.personBuyLimit + "</em>件");
            $("#limitSale").show();
            $("#limit").attr("max", bookInfo.personBuyLimit);
            $(".proinfo-num").show()
        } else {
            $("#productLimit").html("每人限购<em>" + bookInfo.personBuyLimit + "</em>件");
            $("#productLimit").show();
            $("#buyNum").attr("max", bookInfo.personBuyLimit);
            $("#buycount").show()
        }
        iFourth.buyNum()
    }
    $("#buyNowAddCart").hide();
    if (bookInfo.flag && bookInfo.bookRemain != "3") {
        $("#preTime").show()
    }
    if (sn.prdType == "S") {
        if (!bookInfo.flag) {
            $("#invInfo").html("暂不销售").hide();
            $("#noInven").addClass("red").html("&nbsp;&nbsp;很抱歉，本商品在此地暂不参加预订").show();
            $("#shipInfo").hide();
            $(".mainbtns").html('<a id="addCart"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-payfirst-disable"><span>支付定金</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
            $("#miniCart").removeClass().addClass("btn-payfirst-mini-disable");
            $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank");
            $("#preTime").hide();
            $(".proinfo-deliver-time").show();
            $("#yushouCount1").hide()
        } else {
            if (sn.invStatus == "7" || bookInfo.bookRemain == "3") {
                $("#invInfo").html("暂不销售").hide();
                $("#noInven").addClass("red").html("&nbsp;&nbsp;很抱歉，本商品在此地暂不支持预订").show();
                $("#shipInfo").hide();
                $(".mainbtns").html('<a id="addCart"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-payfirst-disable"><span>支付定金</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                $("#miniCart").removeClass().addClass("btn-payfirst-mini-disable");
                $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank");
                $("#preTime").hide();
                $(".proinfo-deliver-time").show();
                $("#yushouCount1").hide()
            } else {
                if (bookInfo.status == 1) {
                    $(".mainbtns").html('<a id="addCart" tooltip="活动时间未到，请耐心等待"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-presell-wait"><span>等待预订</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                    if ($(".btn-collect").siblings(".memo").length > 0) {
                        $(".btn-collect").siblings(".memo").remove()
                    }
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $("#yushouCount1").hide();
                    $("#miniCart").removeClass().addClass("btn-presell-mini-wait");
                    $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank")
                } else {
                    if (bookInfo.status == 2) {
                        if (bookInfo.bookType != "11" || bookInfo.saleStatus) {
                            if (parseInt(bookInfo.bookRemain) == 1) {
                                $(".mainbtns").html('<a id="addCart" tooltip="稍等一小会儿，还有机会哦"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-presell-chance"><span>支付定金</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                                $("#miniCart").removeClass().addClass("btn-presell-mini-chance");
                                $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank")
                            } else {
                                if (parseInt(bookInfo.bookRemain) == 0) {
                                    $(".mainbtns").html('<a id="addCart" tooltip="商品已被预订完了，下次早一点哦"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-presell-none"><span>支付定金</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                                    $("#miniCart").removeClass().addClass("btn-presell-mini-none");
                                    $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank")
                                } else {
                                    $(".mainbtns").html('<a id="addCart" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_zfdj" href="' + c + '" class="btn-payfirst"><span>支付定金</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                                    $("#miniCart").removeClass().addClass("btn-payfirst-mini");
                                    $("#miniCart").attr("href", c).removeAttr("target", "_blank")
                                }
                            }
                        } else {
                            $(".mainbtns").html('<a id="addCart" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_zfdj" href="javascript:void(0);" class="btn-payfirst-disable"><span>支付定金</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                            $("#miniCart").removeClass().addClass("btn-payfirst-mini-disable");
                            $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank")
                        }
                        if ($(".btn-collect").siblings(".memo").length > 0) {
                            $(".btn-collect").siblings(".memo").remove()
                        }
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $(".mainbtns #yushouCount1").remove();
                        $(".mainbtns").append('<div id="yushouCount1" class="total" style=""><span>已成功预订</span><strong>' + a + "</strong><span>件</span></div>")
                    } else {
                        if (bookInfo.status == 3) {
                            $(".mainbtns").html('<a id="addCart"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-paylast-wait"><span>等待付尾款</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                            if ($(".btn-collect").siblings(".memo").length > 0) {
                                $(".btn-collect").siblings(".memo").remove()
                            }
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $("#yushouCount1").hide();
                            $("#miniCart").removeClass().addClass("btn-paylast-mini-wait");
                            $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank");
                            if ($(".btn-collect").siblings(".memo").length > 0) {
                                $(".btn-collect").siblings(".memo").remove()
                            }
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $(".mainbtns #yushouCount1").remove();
                            $(".mainbtns").append('<div id="yushouCount1" class="total" style=""><span>已成功预订</span><strong>' + a + "</strong><span>件</span></div>")
                        } else {
                            if (bookInfo.status == 4) {
                                if (bookInfo.saleStatus) {
                                    $(".mainbtns").html('<a id="addCart"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_zfwk" href="' + b + '" class="btn-paylast"><span>支付尾款</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                                    if ($(".btn-collect").siblings(".memo").length > 0) {
                                        $(".btn-collect").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#yushouCount1").hide();
                                    if (typeof sn.shipOffSetText != "undefined") {
                                        $("#shipInfo").html(sn.shipOffSetText).show()
                                    }
                                    $("#miniCart").removeClass().addClass("btn-paylast-mini");
                                    $("#miniCart").attr("href", b).removeAttr("target", "_blank")
                                } else {
                                    $(".mainbtns").html('<a id="addCart"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-paylast-disable"><span>支付尾款</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                                    if ($(".btn-collect").siblings(".memo").length > 0) {
                                        $(".btn-collect").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#yushouCount1").hide();
                                    $("#miniCart").removeClass().addClass("btn-paylast-mini-disable");
                                    $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank")
                                }
                                if ($(".btn-collect").siblings(".memo").length > 0) {
                                    $(".btn-collect").siblings(".memo").remove()
                                }
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $(".mainbtns #yushouCount1").remove();
                                $(".mainbtns").append('<div id="yushouCount1" class="total" style=""><span>已成功预订</span><strong>' + a + "</strong><span>件</span></div>")
                            } else {
                                if (bookInfo.status == 6) {
                                    $("#preTime").hide();
                                    $(".mainbtns").html('<a id="addCart" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-presell-none"><span>已订完</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                                    if ($(".btn-collect").siblings(".memo").length > 0) {
                                        $(".btn-collect").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#yushouCount1").hide();
                                    $("#miniCart").removeClass().addClass("btn-presell-mini-none");
                                    $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank");
                                    if ($(".btn-collect").siblings(".memo").length > 0) {
                                        $(".btn-collect").siblings(".memo").remove()
                                    }
                                    $(".btn-collect").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">查看更多预售商品</a></span>')
                                } else {
                                    $("#preTime").hide();
                                    $(".mainbtns").html('<a id="addCart" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-presell-over"><span>活动已结束</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                                    if ($(".btn-collect").siblings(".memo").length > 0) {
                                        $(".btn-collect").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#yushouCount1").hide();
                                    $("#miniCart").removeClass().addClass("btn-presell-mini-over");
                                    $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank");
                                    if ($(".btn-collect").siblings(".memo").length > 0) {
                                        $(".btn-collect").siblings(".memo").remove()
                                    }
                                    $(".btn-collect").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">查看更多预售商品</a></span>')
                                }
                            }
                        }
                    }
                }
            }
        }
    } else {
        if (!bookInfo.flag) {
            $("#c_kucun").hide();
            $("#nowProduct").addClass("red").html("&nbsp;&nbsp;很抱歉，本商品在此地暂不参加预订").show();
            $("#shipInfo").hide();
            $("#addCart").removeClass().addClass("btn-payfirst-disable");
            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
            $("#addCart").removeAttr("tooltip");
            $("#addCart2").removeClass().addClass("btn-payfirst-mini-disable");
            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
            $("#preTime").hide();
            $(".proinfo-deliver-time").show();
            $("#yushouCount1").hide()
        } else {
            if (sn.invStatus == "7" || bookInfo.bookRemain == "3") {
                $("#c_kucun").hide();
                $("#nowProduct").addClass("red").html("&nbsp;&nbsp;很抱歉，本商品在此地暂不支持预订").show();
                $("#shipInfo").hide();
                $("#addCart").removeClass().addClass("btn-payfirst-disable");
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                $("#addCart").removeAttr("tooltip");
                $("#addCart2").removeClass().addClass("btn-payfirst-mini-disable");
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                $("#preTime").hide();
                $(".proinfo-deliver-time").show();
                $("#yushouCount1").hide()
            } else {
                if (bookInfo.status == 1) {
                    $("#addCart").removeClass().addClass("btn-presell-wait");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#addCart").attr("tooltip", "活动时间未到，请耐心等待");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $("#addCart2").removeClass().addClass("btn-presell-mini-wait");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#yushouCount1").hide()
                } else {
                    if (bookInfo.status == 2) {
                        if (bookInfo.bookType != "11" || bookInfo.saleStatus) {
                            if (parseInt(bookInfo.bookRemain) == 1) {
                                $("#addCart").removeClass().addClass("btn-presell-chance");
                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#addCart").attr("tooltip", "稍等一小会儿，还有机会哦");
                                $("#addCart2").removeClass().addClass("btn-presell-mini-chance");
                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                            } else {
                                if (parseInt(bookInfo.bookRemain) == 0) {
                                    $("#addCart").removeClass().addClass("btn-presell-none");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#addCart").attr("tooltip", "商品已被预订完了，下次早一点哦");
                                    $("#addCart2").removeClass().addClass("btn-presell-mini-none");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                } else {
                                    $("#addCart").removeClass().addClass("btn-payfirst");
                                    $("#addCart").attr("href", c).removeAttr("target", "_blank").removeAttr("tooltip");
                                    $("#addCart2").removeClass().addClass("btn-payfirst-mini");
                                    $("#addCart2").attr("href", c).removeAttr("target", "_blank")
                                }
                            }
                        } else {
                            $("#addCart").removeClass().addClass("btn-payfirst-disable");
                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#addCart2").removeClass().addClass("btn-payfirst-mini-disable");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                        }
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $(".mainbtns #yushouCount1").remove();
                        $(".mainbtns").append('<div id="yushouCount1" class="total" style=""><span>已成功预订</span><strong>' + a + "</strong><span>件</span></div>")
                    } else {
                        if (bookInfo.status == 3) {
                            $("#addCart").removeClass().addClass("btn-paylast-wait");
                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target").removeAttr("tooltip");
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $("#addCart2").removeClass().addClass("btn-paylast-mini-wait");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#yushouCount1").hide();
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $(".mainbtns #yushouCount1").remove();
                            $(".mainbtns").append('<div id="yushouCount1" class="total" style=""><span>已成功预订</span><strong>' + a + "</strong><span>件</span></div>")
                        } else {
                            if (bookInfo.status == 4) {
                                if (bookInfo.saleStatus) {
                                    $("#addCart").removeClass().addClass("btn-paylast");
                                    $("#addCart").attr("href", b).removeAttr("tooltip").removeAttr("target", "_blank");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#addCart2").removeClass().addClass("btn-paylast-mini");
                                    $("#addCart2").attr("href", b).removeAttr("target", "_blank");
                                    if (typeof sn.shipOffSetText != "undefined") {
                                        $("#nowProduct").html(sn.shipOffSetText).show()
                                    }
                                    $("#yushouCount1").hide()
                                } else {
                                    $("#addCart").removeClass().addClass("btn-paylast-disable");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("tooltip").removeAttr("target", "_blank");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#addCart2").removeClass().addClass("btn-paylast-mini-disable");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target", "_blank");
                                    $("#yushouCount1").hide()
                                }
                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                    $("#inerestBox").siblings(".memo").remove()
                                }
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $(".mainbtns #yushouCount1").remove();
                                $(".mainbtns").append('<div id="yushouCount1" class="total" style=""><span>已成功预订</span><strong>' + a + "</strong><span>件</span></div>")
                            } else {
                                if (bookInfo.status == 6) {
                                    $("#preTime").hide();
                                    $("#addCart").removeClass().addClass("btn-presell-none");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target").removeAttr("tooltip");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#addCart2").removeClass().addClass("btn-presell-mini-none");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#yushouCount1").hide();
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">查看更多预售商品</a></span>')
                                } else {
                                    $("#preTime").hide();
                                    $("#addCart").removeClass().addClass("btn-presell-over");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target").removeAttr("tooltip");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#addCart2").removeClass().addClass("btn-presell-mini-over");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#yushouCount1").hide();
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">查看更多预售商品</a></span>')
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    iFourth.buyNum();
    iFourth.servLabel()
}
function fillBookProcedure() {
    var a = $("#depositTime");
    var e = $("#balanceTime");
    c(a, bookInfo.depositStartTime * 1000, bookInfo.depositEndTime * 1000);
    c(e, bookInfo.balanceStartTime * 1000, bookInfo.balanceEndTime * 1000);
    var f = new Date(parseInt(bookInfo.sendTime));
    var b = "预计" + (f.getMonth() + 1) + "月" + f.getDate() + "日发货";
    $("#sendTime dd").eq(0).html(b);
    $("#bookProcedure").show();
    function c(j, g, h) {
        var i = new Date(parseInt(g));
        start = "开始：" + (i.getMonth() + 1) + "月" + i.getDate() + "日" + i.getHours() + "时" + i.getMinutes() + "分" + i.getSeconds() + "秒";
        i = new Date(parseInt(h));
        end = "结束：" + (i.getMonth() + 1) + "月" + i.getDate() + "日" + i.getHours() + "时" + i.getMinutes() + "分" + i.getSeconds() + "秒";
        j.find("dd").eq(0).html(start);
        j.find("dd").eq(1).html(end)
    }}
function processOthers() {
    $(".ziti").parent().hide();
    $(".returnOrChange").hide();
    $(".rc3").show();
    $("#returnCate").html('<a class="tui-disable" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_tuihuan" target="_blank" href="http://help.suning.com/page/id-205.htm"><i class="icon"></i>不支持无理由退换货</a>');
    $("#returnCate").attr("title", "不支持无理由退换货");
    $("#returnCate").show();
    if (sn.prdType == "S") {
        $("#mianYF a").attr("title", "");
        $("#mianYF a").html('<i class="icon"></i>免运费');
        $("#mianYF").show()
    } else {
        $("#mianyunfei").html('<i class="icon"></i>免运费');
        $("#mianyunfei").parent().removeAttr("title");
        $("#mianyunfei").show()
    }
    $("#fare" + sn.vendorCode).html("<span>免运费</span>").show();
    if (sn.prdType != "S") {
        CommonFourPage.Cart.getSunShine(sn.partNumber, Cart.sunShine)
    }
}
function processErrorBookInfo() {
    if (sn.prdType != "S") {
        initProductSale()
    }
}
function toDepositCart() {
    var b = sn.prdType != "S" ? sn.partNumber : sn.curSubPartNumber;
    var a = $(".proinfo-num input").val();
    $("body").AjaxLogin({success: function() {
            if (sn.bookActionAddcartFlag == "0") {
                window.location.href = sn.yushouDomain + "/book/gotoBookOrderInfo.do?partNumber=" + b + "&bookGoodsId=" + sn.bookGoodsId + "&buyNum=" + a
            } else {
                buyNow("0", a, sn.vendorCode, "", "", b, sn.priceType, preBuy.actionID, "", "", "", "")
            }
        }, error: function() {
        }})
}
function toBalanceCart() {
    var b = sn.prdType != "S" ? sn.partNumber : sn.curSubPartNumber;
    var c = sn.vendorCode == "" ? "0000000000" : sn.vendorCode;
    var a = sn.yushouDomain + "/book/outerIntf/validatePayBalanceByJsonp-" + preBuy.actionID + "-" + b + "-" + c + "-inits.do";
    $("body").AjaxLogin({success: function() {
            $.ajax({url: a, cache: false, dataType: "jsonp", jsonpCallback: "inits", success: function(f) {
                    var e = "";
                    if (f.resultFlag) {
                        if (f.resultCode == "100-01-00") {
                            window.location.href = "member_coupon.html"
                        } else {
                            if (f.resultCode == "100-01-01") {
                                e = "很抱歉，还未到支付尾款时间,请耐心等待哦！"
                            } else {
                                if (f.resultCode == "100-01-02") {
                                    e = "很抱歉，尾款支付时间已过，下次早点哦！"
                                } else {
                                    if (f.resultCode == "100-00-03") {
                                        e = "很抱歉，此活动无效，请选购其他商品！"
                                    } else {
                                        e = "很抱歉，您目前没有符合付尾款条件的订单哦！";
                                        if (sn.prdType == "S") {
                                            $(".mainbtns").html('<a id="addCart"  name="item_' + sn.partNumber.substring(9, 18) + '_gmq_buy01" href="javascript:void(0);" class="btn-paylast-disable"><span>支付尾款</span></a><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_shoucang01" href="javascript:gMain.addProductFavorite();" class="btn-collect"><span>收藏</span></a>');
                                            if ($(".btn-collect").siblings(".memo").length > 0) {
                                                $(".btn-collect").siblings(".memo").remove()
                                            }
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $("#yushouCount1").hide();
                                            $("#miniCart").removeClass().addClass("btn-paylast-disable");
                                            $("#miniCart").attr("href", "javascript:void(0);").removeAttr("target", "_blank")
                                        } else {
                                            $("#addCart").removeClass().addClass("btn-paylast-disable");
                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("tooltip").removeAttr("target", "_blank");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $("#addCart2").removeClass().addClass("btn-paylast-disable-mini");
                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target", "_blank");
                                            $("#yushouCount1").hide()
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (e != "") {
                        psellAlterInfo(e)
                    }
                }})
        }, error: function() {
        }})
}
function getDeliveryInfofunction(b, c, e) {
    if ((sn.vendorCode != "" && !sn.swlShopFlag && sn.cDeliveryFlag == "1") || (sn.vendorCode == "" && (sn.deliveryFlag == "1" || sn.cmmdtyType == "ZSRV" || sn.cmmdtyType == "ZSRW")) || (sn.swlShopFlag && sn.deliveryFlag == "1")) {
        if (sn.vendorCode != "") {
            if (sn.swlShopFlag == true) {
                if (sn.prdType == "S") {
                    getDeliveryInfoAble(b, cDeliveryInfoHtml, e)
                } else {
                    getDeliveryInfoAble(b, showDeliveryInfo, e)
                }
            } else {
                if (sn.prdType == "S") {
                    getCDelivery(b, cDeliveryInfoHtml, e)
                } else {
                    getCDelivery(b, showDeliveryInfo, e)
                }
            }
        } else {
            getDeliveryInfoAble(b, showDeliveryInfo, e)
        }
    } else {
        var a = "";
        if (sn.vendorCode != "") {
            if (sn.swlShopFlag == true) {
                a = "http://" + sn.domain + "/emall/swlship_10052_10051_swl_" + b + "_" + sn.vendorCode + "_" + sn.cityId + "_" + sn.districtId + "_" + sn.ownerPlace + "_" + c + "_.html"
            } else {
                a = "http://" + sn.domain + "/emall/cship_10052_10051_" + b + "_" + sn.vendorCode + "_" + sn.cityId + "_" + sn.ownerPlace + "_" + c + "_.html"
            }
        } else {
            a = "http://" + sn.domain + sn.context + "/ship_" + sn.storeId + "_" + sn.catalogId + "_" + b + "_" + sn.vendor + "_" + sn.cityId + "_" + sn.districtId + "_" + sn.deptNo + "_" + sn.salesOrg + "_" + sn.ownerPlace + "_" + sn.accountPlace + "_" + sn.factorySendFlag + "_" + sn.manageInvFlag + "_" + sn.sendAvalidTime + "_" + sn.invStatus + "_" + c + "_.html"
        }
        $.ajax({url: a, cache: true, dataType: "jsonp", jsonpCallback: c, success: function(f) {
            }, error: function() {
                e()
            }})
    }
}
function getCDelivery(b, c, e) {
    var a = sn.solpUrl + "/solp/http/SOLP10103_PDS_" + sn.ownerPlace + "_" + sn.lesCityId + "_" + sn.vendorCode + "_" + b + "_queryCccAging.htm";
    $.ajax({url: a, cache: true, dataType: "jsonp", jsonpCallback: "showCccAging", success: function(f) {
            if (f.successFlag == "Y" && sn.invStatus == "1") {
                f.sendCityName = f.cityName;
                f.shipOffSetText = "";
                var g = f.shortTime;
                if (typeof g != "undefined" && g != "") {
                    f.shipOffSetText = "&nbsp;";
                    getCShopDeliveryText(g)
                }
            } else {
                f.sendCityName = "";
                f.shipOffSetText = ""
            }
            c(f)
        }, error: function() {
            e()
        }})
}
function getFreightList(c, e, f, b) {
    if (sn.fimsFreightSwith == "0") {
        var a = sn.fimsDomain + "/fims/http/FIMS01_" + c + "_" + sn.lesCityId + "_02_queryFreightForPage.htm";
        if (sn.prdType == "T") {
            a = sn.fimsDomain + "/fims/http/FIMS01_" + c + "_" + sn.lesCityId + "_01_queryFreightForPage.htm"
        }
        $.ajax({url: a, cache: true, async: true, dataType: "jsonp", jsonpCallback: "queryFreightForPage", success: function(g) {
                var h = new Array();
                if (typeof g != "undefined" && g.length > 0) {
                    for (var j = 0;
                            j < g.length;
                            j++) {
                        if (g[j].resultCode == "Y") {
                            g[j].fare = g[j].freightFare;
                            g[j].partNumber = g[j].partnumber;
                            h.push(g[j])
                        }
                    }
                }
                b(h)
            }, error: function() {
                f()
            }})
    } else {
        $.ajax({url: "http://" + sn.domain + sn.context + "/pfc_" + sn.storeId + "_" + sn.catalogId + "_" + c + "_" + sn.cityId + "_" + e + "_.html", cache: true, async: true, dataType: "jsonp", jsonpCallback: e, success: function(g) {
            }, error: function() {
                f()
            }})
    }
}
function getInstallType(a, c, b) {
    $.ajax({url: "http://" + sn.domain + sn.context + "/service_" + sn.storeId + "_" + sn.catalogId + "_" + a + "_" + sn.catenIds + "_" + sn.brandId + "_" + sn.cityId + "_" + sn.districtId + "_" + c + "_.html", cache: true, async: true, dataType: "jsonp", jsonpCallback: c, success: function(e) {
        }, error: function() {
            b()
        }})
}
function getItemPromStatus(b, c) {
    try {
        if (sn.priceType != "7-1") {
            var a = sn.cuxiaoType;
            if (a == "1") {
                a = "0"
            }
            $.ajax({url: "http://" + sn.domain + "/emall/snsearchprom_10052_10051_1__" + sn.cityId + "_" + sn.provinceCode + "_" + b + "_" + sn.vendor + "_" + sn.netPrice + "_" + sn.promotionPrice + "__" + sn.salesOrg + "_" + c + "_" + a + "_.html", type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: c, success: function(e) {
                }})
        }
    } catch (f) {
    }
}
function getNewPromInfo(b, c) {
    var g = sn.vendorCode == "" ? 1 : 2;
    var a = sn.cuxiaoType;
    if (a == "1") {
        a = "0"
    }
    try {
        $.ajax({url: "http://" + sn.domain + "/emall/snshowpromtag_10052_10051_31_" + sn.cityId + "_" + b + "_" + g + "_" + sn.vendor + "_" + sn.netPrice + "_" + c + "_" + a + "_.html", type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: c, success: function(e) {
            }})
    } catch (f) {
    }
}
function processNewPromInfo(c) {
    if (c != null && c.result == "1" && c.activityList.length > 0) {
        var b = 0;
        var a = false;
        $.each(c.activityList, function(f, g) {
            if (g.activityTypeId == "3") {
                $("#istuangouBox").html('团购中&nbsp<a class="b" target="_blank" href="' + g.activityLink + '">立即预订</a>');
                $("#istuangouTitle").css("display", "block");
                $("#allcuxiao").show()
            } else {
                if (g.activityTypeId == "4") {
                    var e = "";
                    if (g.activityLink != "") {
                        e += g.activityDescription + " <a href='" + g.activityLink + "' target='_blank' class='b'>活动详情</a>"
                    } else {
                        e += g.activityDescription
                    }
                    if (!a) {
                        $("#voucherBox").html("");
                        $("#voucherBox").siblings(".promotion-content").remove();
                        a = true
                    }
                    if ($("#voucherBox").html() != "") {
                        $("#voucherBox").after("<p class='promotion-content'>" + e + "</p>")
                    } else {
                        $("#voucherBox").html(e)
                    }
                    $("#lhvoucherTitle").css("display", "none");
                    $("#voucherTitle").css("display", "block");
                    $("#allcuxiao").show()
                } else {
                    if (g.activityTypeId == "5") {
                        var e = "";
                        if (g.activityLink != "") {
                            e += " <a href='" + g.activityLink + "' target='_blank' class='b'>" + g.activityDescription + "</a>"
                        } else {
                            e += g.activityDescription
                        }
                        if ($("#newcouponBox").html() != "") {
                            $("#newcouponBox").after("<p class='promotion-content'>" + e + "</p>")
                        } else {
                            $("#newcouponBox").html(e)
                        }
                        $("#couponTitle").css("display", "none");
                        $("#couponBox").siblings(".promotion-content").remove();
                        $("#couponBox").html("");
                        $("#newcouponTitle").css("display", "block");
                        $("#allcuxiao").show()
                    } else {
                        if (g.activityTypeId == "6") {
                            if ($("#isXYuanNItemBox").html() == "") {
                                $("#isXYuanNItemBox").html(g.activityDescription + ' <a class="b" target="_blank" href="' + g.activityLink + '">查看详情</a>');
                                $("#isXYuanNItemTitle").css("display", "block");
                                $("#allcuxiao").show()
                            }
                        } else {
                            if (g.activityTypeId == "8") {
                                if (b < 9) {
                                    b++;
                                    freeCoupon.push(g)
                                }
                            } else {
                                if (g.activityTypeId == "9") {
                                    var e = "";
                                    if (g.activityLink != "") {
                                        e += g.activityDescription + " <a href='" + g.activityLink + "' target='_blank' class='b'>活动详情</a>"
                                    }
                                    $("#taogouyhBox").html(e);
                                    $("#taogouyhTitle").css("display", "block");
                                    $("#lhvoucherTitle").css("display", "none");
                                    $("#voucherTitle").css("display", "none");
                                    $("#allcuxiao").show()
                                } else {
                                    if (g.activityTypeId == "7") {
                                        if (sn.vendorCode != "") {
                                            $("#freightfreeTitle").show();
                                            $("#freightfreeBox").html(g.activityDescription);
                                            $("#allcuxiao").show()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })
    }
    if (freeCoupon.length > 0) {
        processFreeCouponInfo(freeCoupon)
    }
    iFourth.mainHeight()
}
function processFreeCouponInfo(k) {
    try {
        var j = "";
        var b = "";
        var a = "";
        var o = "";
        var c = /^\d+$/;
        if (k.length > 0) {
            if (k.length == 1) {
                var f = k[0];
                b = f.salesPrice;
                a = f.activityDescription;
                j += b + "元&nbsp：" + a.substring(0, 35);
                j += "<a class='b ml10' href='javascript:void(0);' onclick='javascript:window.open(lingquan(\"" + f.activityLink + "\"))' name='item_" + sn.partNumber.substr(9, 18) + "_gmq_lj00'>立即领取</a>"
            } else {
                if (k.length > 1) {
                    j += "您有" + k.length + "&nbsp;张券可领";
                    j += "<a class='b ml10 more-coupon' href='javascript:void(0)'>立即领取</a>";
                    var h = k.length > 9 ? 9 : k.length;
                    var q = "";
                    o = "<div class='pop-coupon-win'><ul class='content clearfix'>";
                    for (var l = 0;
                            l < h;
                            l++) {
                        b = k[l].salesPrice;
                        a = k[l].activityDescription;
                        if ((l + 1) % 3 == 0) {
                            q = "5"
                        } else {
                            if ((l + 1) % 3 == 1) {
                                q = "10"
                            } else {
                                q = "100"
                            }
                        }
                        var g = (b + "").split(".")[0];
                        var p = (b + "").split(".")[1];
                        stoken = getCookieBonus("_device_session_id");
                        o += "<li class='coupon-" + q + "'><a href='javascript:void(0);' onclick='javascript:window.open(lingquan(\"" + k[l].activityLink + "\"))' name='item_" + sn.partNumber.substr(9, 18) + "_gmq_lj0" + (l + 1) + "'><span class='coupon-amount";
                        if (g.length > 4) {
                            o += " amount-large"
                        }
                        if (p == undefined) {
                            p = "00"
                        } else {
                            if (p.length == 1) {
                                p += "0"
                            }
                        }
                        o += "'><i>&yen;</i><em>" + (b + "").split(".")[0] + "</em><span class='yhq'>优惠券<br/><small>." + p + "</small></span></span>";
                        var m = a.indexOf("立");
                        if (m >= 0) {
                            o += "<span>" + a.substring(0, m) + "</span><span>" + a.substring(m, a.length) + "</span>"
                        } else {
                            o += "<span class='coupon-condition'>" + a + "</span><span>&nbsp</span>"
                        }
                        o += "<span class='get-coupon'>立即领取</span></a></li>"
                    }
                    o += "</ul></div>"
                }
            }
            $("#freeCouponBox").html(j);
            $("#freeCouponTitle").css("display", "block");
            $("#allcuxiao").show();
            $(".more-coupon").click(function() {
                $.mDialog({title: "领券", css: {width: "552px"}, http: function(i, r) {
                        i.find(".content").html(o)
                    }, overlayCss: {background: "black", opacity: "0.3"}, overlayClick: true, fadeIn: 300, fadeOut: 300})
            })
        }
    } catch (n) {
    }
}
function getShopInfoList(b, e) {
    if (sn.pcShopListChange != "1") {
        var f = sn.lesCityId + sn.lesDistrictId + sn.icpsPriceStreetId;
        var a = sn.icpsDomain + "/icps-web/getBizList/" + b + "_" + sn.lesCityId + "_" + f + "_1_" + sn.shoplistcacheSwitch + "_pds.htm";
        $.ajax({url: a, type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: e, success: function() {
            }})
    } else {
        var c = [{companyName: "", deliverSpeed: "0", dept: "", fare: "", giftCard: "", hwgType: "", inventoryInfo: "", isCShop: "1", priceType: "", productPrice: "", productSatisfy: "0", promoId: "0", promoPrice: "", salesOrg: "", salesStatus: "", secUrl: "", serviceAttitude: "0", shopGrade: "0", shopGradeInfo: null, shopName: "苏宁自营", shopStatus: "", shopType: "", telPhone: "", vendorCode: "0000000000", bizCode: ""}];
        if (sn.prdType != "S") {
            FourPage.showShopList(c)
        } else {
            gMain.processShopList(c)
        }
    }
}
function getShopScoreList(h) {
    try {
        var f = sn.reviewNew + "ajax/getShopScore/";
        var g = false;
        var c = sn.shopList;
        for (var b = 0;
                b < c.length;
                b++) {
            if (typeof c[b].vendorCode == "undefined" && typeof c[b].bizCode != "undefined") {
                c[b].vendorCode = c[b].bizCode
            }
            var a = c[b].vendorCode;
            if (a === "0000000000" || a == "") {
                f += "0000000000"
            } else {
                f += a
            }
            if ((c[b].vendorCode === sn.vendorCode) || ((sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003") && c[b].vendorCode == "0000000000")) {
                g = true
            }
            if (b != c.length - 1) {
                f += "|"
            }
        }
        if (!g) {
            f += "|" + ((sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003") ? "0000000000" : sn.vendorCode)
        }
        f += "-" + h + ".htm";
        $.ajax({url: f, cache: false, async: true, dataType: "jsonp", jsonpCallback: h, success: function(e) {
            }, error: function() {
            }})
    } catch (j) {
    }
}
function getCurrentTimeForPreBuy(a, c) {
//    var b = sn.itemDomain + "/pds-web/curtime.html";
//    $.ajax({url: b, type: "get", cache: true, dataType: "json", success: function(e) {
//            if (e == null || e.curTime == "") {
//                c(a)
//            } else {
//                if (a != null) {
//                    a.curTime = e.curTime
//                }
//                c(a)
//            }
//        }, error: function() {
//            c(a)
//        }})
}
function getItemSubscribeAction(c, g, e) {
    var a = (typeof sn.bookGoodsId != "undefined" && sn.bookGoodsId != null && sn.bookGoodsId != "null") ? sn.bookGoodsId : "";
    var f = sn.vendorCode != "" ? sn.vendorCode : (sn.isPreBuy == 2 ? (sn.prdType != "S" ? sn.priceInvData.vendor : sn.vendor) : sn.vendorCode);
    var b = sn.itemDomain + "/pds-web/ajax/getActionInfo_" + c + "_" + f + "_" + preBuy.actionID + "_" + a + ".html";
    $.ajax({url: b, type: "get", dataType: "json", cache: true, success: function(h) {
            getCurrentTimeForPreBuy(h, g)
        }, error: function() {
            e()
        }})
}
function getVendorInfo(a) {
    $.ajax({url: sn.itemDomain + "/pds-web/ajax/vendorInfo_" + sn.vendorCode + ".html", type: "get", dataType: "json", cache: true, success: function(b) {
            if (b.vendorCode == "SN_001") {
                b.vendorCode = "0000000000"
            }
            a(b)
        }})
}
function getCurrentTimeForPromotion(b, c) {
//    var a = sn.itemDomain + "/pds-web/curtime.html";
//    $.ajax({url: a, type: "get", cache: true, dataType: "json", success: function(f) {
//            if (f == null || f.curTime == "") {
//                c(b)
//            } else {
//                if (b != null && b.length != 0 && b.commList != null && b.commList.length != 0) {
//                    for (var e = 0;
//                            e < b.commList.length;
//                            e++) {
//                        b.commList[e].currentDate = f.curTime
//                    }
//                }
//                c(b)
//            }
//        }, error: function() {
//            c(b)
//        }})
}
function getItemBigPolyAction(c, h, g) {
    PriceShow.initFlag = "-1";
    PriceShow.promotionType = "-1";
    PriceShow.beginTime = "0";
    PriceShow.endTime = "0";
    PriceShow.warmUpTime = "0";
    PriceShow.remainNum = "-1";
    PriceShow.curTime = "-1";
    PriceShow.price = "-1";
    PriceShow.maxPerNum = "1";
    PriceShow.activityFlag = "";
    PriceShow.serviceType = "";
    PriceShow.isPhoneBind = "";
    PriceShow.isBrondPay = "";
    PriceShow.isLimitTake = "";
    var a = sn.vendorCode;
    if (a == "" || a == null || (a.length == 10 && a.substring(0, 3) == "003")) {
        a = "0000000000"
    }
    try {
        var b = sn.itemDomain + "/pds-web/ajax/bigPolyItem_" + PriceShow.actionId + "_.html";
        $.ajax({url: b, type: "get", cache: true, dataType: "json", success: function(e) {
                getCurrentTimeForPromotion(e, h)
            }, error: function() {
                g()
            }})
    } catch (f) {
    }
}
function getMobileBigPoly(c, h, g) {
    PriceShow.initFlag = "-1";
    PriceShow.promotionType = "-1";
    PriceShow.beginTime = "0";
    PriceShow.endTime = "0";
    PriceShow.warmUpTime = "0";
    PriceShow.remainNum = "-1";
    PriceShow.curTime = "-1";
    PriceShow.price = "-1";
    PriceShow.maxPerNum = "1";
    PriceShow.activityFlag = "";
    PriceShow.serviceType = "";
    PriceShow.isPhoneBind = "";
    PriceShow.isBrondPay = "";
    PriceShow.isLimitTake = "";
    var a = sn.vendorCode;
    if (a == "" || a == null || (a.length == 10 && a.substring(0, 3) == "003")) {
        a = "0000000000"
    }
    try {
        var b = sn.itemDomain + "/pds-web/ajax/bigPolyItemCom_" + c + "_" + a + "_.html";
        $.ajax({url: b, type: "get", cache: true, dataType: "json", success: function(e) {
                h(e)
            }, error: function() {
                g()
            }})
    } catch (f) {
    }
}
function verifyBigPoly() {
    if (PriceShow.isPhoneBind == "1" || PriceShow.isBrondPay == "1") {
        var a = "<dt>购买须知</dt><dd><span>购买此商品，您需要：</span>";
        if (PriceShow.isPhoneBind == "1" && PriceShow.isBrondPay != "1") {
            a += '<a id="isPhoneBind" href="' + sn.aqPhone + '" target="_blank" class="b">绑定手机号</a>'
        } else {
            if (PriceShow.isPhoneBind != "1" && PriceShow.isBrondPay == "1") {
                a += '<a id="isBrondPay" href="' + sn.paySuning + '" target="_blank" class="b">开通易付宝快捷支付</a>'
            } else {
                if (PriceShow.isPhoneBind == "1" && PriceShow.isBrondPay == "1") {
                    a += '<a id="isPhoneBind" href="' + sn.aqPhone + '" target="_blank" class="b">绑定手机号</a>&nbsp&nbsp同时&nbsp&nbsp<a id="isBrondPay" href="' + sn.paySuning + '" target="_blank" class="b">开通易付宝快捷支付</a>'
                }
            }
        }
        $("#bigPolyVerify").html(a);
        $("#bigPolyVerify").show()
    } else {
        $("#bigPolyVerify").hide()
    }
}
function getGiftInfo(b, c) {
    var a = sn.cuxiaoType;
    if (a == "1") {
        a = "0"
    }
    $.ajax({url: "http://" + sn.domain + "/emall/proGift_10052_10051_" + b + "_" + sn.salesOrg + "_" + sn.vendorCode + "_" + sn.promotionPrice + "_" + sn.cityId + "_" + sn.deptNo + "_" + sn.ownerPlace + "_" + c + "_" + a + "_.html", type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: c, success: function(e) {
        }})
}
function initHistoryCookie(c) {
    var a = FourPage.getCookieBonus("smhst");
    var e = (c).substring(9, 18);
    var b = "a";
    FourPage.updateHistory(a, e, b)
}
var iDiggerTrackingCodes = function(c, f, a) {
    var h = sn.vendorCode;
    if (h == undefined || "undefined" == h || "" == h || (h.length == 10 && h.substring(0, 3) == "003")) {
        h = "0000000000"
    }
    var e = sn.categoryName1 + ":" + sn.categoryName2 + ":" + sn.categoryName3;
    var i = sn.imageDomianDir + "/b2c/catentries/" + c + "_1_400x400.jpg";
    var a = a || [];
    var b = snga.productStatus ? snga.productStatus : "";
    var g = "";
    if (b.indexOf("1") != -1) {
        g = snga.shipOffset
    } else {
        if (b.indexOf("2") != -1) {
            g = "-1"
        } else {
            if (b.indexOf("3") != -1 || b.indexOf("-99") != -1) {
                g = "-2"
            } else {
                g = "-99"
            }
        }
    }
    if (sn.vendorCode != "") {
        g = "-99"
    }
    snga.productStatus = sn.isPreBuy == 1 && (sn.invStatus == "0" || sn.invStatus == "3" || sn.invStatus == "2") ? "-99" : snga.productStatus;
    a.push(["db", "ifc"], ["sitecode", "T-000130-01"]);
    a.push(["gid", c.substring(9, 18), "gcate", f, "supplierID", h, "gprice", sn.promotionPrice, "gcatename", e, "gimgurl", i, "gname", sn.itemDisplayName, "invent", g]);
    a.push(["userid", d("custno")], ["userflag", ""]);
    a.push(["_trackPoint"])
};
function getCloudDrill(b) {
    var a = 5;
    if (sn.vendorCode == "") {
        a = 6
    }
    $.ajax({url: "http://" + sn.domain + sn.context + "/calcPointAndSend_" + a + "_" + sn.catenIds + "_" + sn.promotionPrice + "_" + b + "_.html", type: "get", cache: true, dataType: "jsonp", jsonpCallback: b, success: function() {
        }})
}
function processQcode() {
    if (sn.groupFlag) {
        return
    }
    var c;
    if (sn.pageFlag != undefined && sn.pageFlag == 1) {
        c = sn.curSubPartNumber
    } else {
        c = sn.partNumber
    }
    if (typeof sn.mobilePrice != "undefined" && sn.mobilePrice != "") {
        if (c != "") {
            var b = "<p>手机购买立减</p>";
            var a = sn.vendorCode == "" ? "0000000000" : sn.vendorCode;
            sn.qrCodeDomain + "/AppOnlyCodeForP_" + c.substring(9, 18) + "_" + a + "_4000_115_f50_0.jpg";
            b += '<p class="qrcode-main-price"><em>' + sn.mobilePrice + "</em>元</p>";
            b += '<p class="qrcode-main-handle"><span>扫一扫</span><span class="dropdown"></span></p>';
            b += '<div class="qrcode-main-img"><img id="qrCodeImg" src="' + qrinit(a, c.substring(9, 18)) + '" alt="手机购买立减"><i></i></div>';
            $("#qrCode").html(b);
            $("#qrCodeImg").show();
            $("#qrCode").show();
            $("#qrCode").removeClass().addClass("qrcode-main-mobile")
        } else {
            $("#qrCode").hide()
        }
    } else {
        if (c != "") {
            var a = sn.vendorCode == "" ? "0000000000" : sn.vendorCode;
            var b = '<img id="qrCodeImg" onerror="javascript:$(\'#qrCode\').children().hide();" alt="' + scmInfo.qrCode + '" src="';
            b += qrinit(a, c.substring(9, 18)) + '"><p>' + scmInfo.qrCode + "</p>";
            $("#qrCode").html(b);
            $("#qrCodeImg").show();
            $("#qrCode").show();
            $("#qrCode").removeClass().addClass("qrcode-main")
        } else {
            $("#qrCode").hide()
        }
    }
    iFourth.showQRCode();
    if (sn.isPreBuy == 2) {
        qCodeHide()
    }
    iFourth.mainHeight()
}
function qrinit(c, l) {
    var f = "http://code.suning.cn/2uyuGl";
    f = encodeURIComponent(f);
    var g = "";
    if (typeof sn.qrCodeBookLongUrl != "undefined" && sn.catalogId == "22001") {
        g += sn.qrCodeBookLongUrl;
        g += "/dzs/landingpage/index_snbook.html?url=http://m.suning.com/product/" + c + "/" + l + ".html&"
    } else {
        g += sn.qrCodeLongUrl;
        g += "/project/landingpage/index_2.html?url=http://m.suning.com/product/" + c + "/" + l + ".html&"
    }
    g += "utm_source=qrcode&utm_medium=06&utm_content=4000&utm_term=01&utm_campaign=&adTypeCode=1013&adId=" + l + "_" + c + "&";
    g += "channeltype=06&store=4000_01_&haswake=1&downloadurl=" + f;
    var e = "JPG";
    var h = "115";
    var b = "ff5500";
    var m = "";
    var k = "-1";
    var a = conversionToString(g);
    var j = conversionToString(m);
    var i = sn.qrCodeDomainNew + "/qrcode/buildQrCodeUrlPCWap_" + a + "_" + e + "_" + h + "_" + b + "_" + j + "_" + k + ".html";
    return i
}
function conversionToString(c) {
    var e = "";
    if (null != c && "" != c.replace(/^\s*|\s*$/, "")) {
        for (var b = 0, a = c.length;
                b < a;
                b++) {
            e += c.charCodeAt(b).toString(16) + ","
        }
        if (null != e && "" != e.replace(/^\s*|\s*$/, "")) {
            e = e.substring(0, e.length - 1)
        }
    }
    return e
}
function qCodeHide() {
    $("#qrCode").hide();
    $("#ziti").hide();
    iFourth.showQRCode();
    iFourth.mainHeight()
}
function userCustom(a) {
    $("#shopContent").html(unescape(a));
    $("#shopContent img").each(function() {
        $(this).attr("src", $(this).attr("src2")).removeAttr("src2")
    })
}
function paramCorrect(a) {
    $(".m-dialog textarea").val("");
    paraCorrectInfo.paramType = $(a).parent().siblings(".name").find("span").html();
    $(".param-wrong-title").next().html(paraCorrectInfo.paramType);
    paraCorrectInfo.oldValue = $(a).parent().siblings(".val").html()
}
function paramCorrectSubmit() {
    paraCorrectInfo.newValue = $(".m-dialog textarea").val();
    paraCorrectInfo.divisionCode = sn.brandId != undefined ? sn.brandId.substring(0, 5) : "";
    paraCorrectInfo.parameterName = $(".param-wrong-title").next().html();
    paraCorrectInfo.memberId = d("custno");
    if (paraCorrectInfo.newValue == "") {
        $(".param-wrong-err").html("参数值不能为空").show()
    } else {
        if (paraCorrectInfo.newValue.length > 200) {
            $(".param-wrong-err").html("请输入正确的参数值").show()
        } else {
            var a = "http://" + sn.domain + sn.context + "/SNFPParameterCmd?catalogId=10051&storeId=10052&partnumber=" + sn.partNumber;
            a += "&divisionCode=" + paraCorrectInfo.divisionCode + "&parameterName=" + paraCorrectInfo.parameterName + "&oldValue=" + paraCorrectInfo.oldValue;
            a += "&newValue=" + paraCorrectInfo.newValue + "&memberId=" + paraCorrectInfo.memberId;
            $.ajax({url: a, type: "get", cache: true, dataType: "jsonp", success: function(b) {
                    $.unmDialog();
                    Util.alertOkBox("非常感谢您的反馈，我们会尽快核实和更正！")
                }, error: function() {
                    $.unmDialog();
                    Util.alertOkBox("非常感谢您的反馈，我们会尽快核实和更正！")
                }})
        }
    }
}
CommonFourPage.FourPage = {getFreightInsuranceFlag: function() {
        sn.yfxian = "0";
        if (sn.vendorCode != "") {
            var a = sn.itemDomain + "/pds-web/ajax/freIns_" + sn.vendorCode.substring(2, 10) + ".html";
            $.ajax({url: a, type: "get", cache: true, dataType: "json", success: function(b) {
                    if (b != null && b.items.length != 0) {
                        $("#yfxian").hide();
                        $.each(b.items, function(c, e) {
                            if (e.supplierCode == sn.vendorCode.substring(2, 10) && e.flag == "Y") {
                                $("#yfxian").show()
                            }
                        })
                    } else {
                        $("#yfxian").hide()
                    }
                }, error: function() {
                    $("#yfxian").hide()
                }})
        } else {
            $("#yfxian").hide()
        }
    }, initReturnOrChange: function(b, c) {
        var a = "http://" + sn.domain + sn.context + "/ret_10052_10051_" + b + "_" + sn.vendorCode + "_" + sn.catenIds + "_" + c + "_.html";
        $.ajax({url: a, type: "get", cache: true, dataType: "jsonp", jsonpCallback: c, success: function() {
            }})
    }, getPromotiondesc: function(b, c) {
        var a = sn.vendorCode;
        if (a == "" || a == null || (a.length == 10 && a.substring(0, 3) == "003")) {
            a = ""
        }
//        $.ajax({url: sn.itemDomain + "/pds-web/ajax/itemUniqueInfo_" + b + "_" + a + ".html", cache: true, dataType: "json", success: function(f) {
//                var e = "";
//                if (f != null && f.itemDetail != null) {
//                    e = f.itemDetail.service
//                }
//                CommonFourPage.aftermarket(e);
//                c(f)
//            }, error: function() {
//            }})
    }, getItemDescInfo: function(b, c) {
        var a = sn.vendorCode;
        if (a == "" || a == null || (a.length == 10 && a.substring(0, 3) == "003")) {
            a = ""
        }
//        $.ajax({url: sn.itemDomain + "/pds-web/ajax/getItemdesc_" + b + "_" + a + ".html", cache: true, dataType: "json", success: function(e) {
//                c(e)
//            }, error: function() {
//            }})
    }, processItemdescInfo: function(a) {
        sn.promItemDesc = "";
        sn.promotionDesc = "";
        if (a != null && a.length != 0) {
            $.each(a, function(c, e) {
                if (e != null && e.descType == "0") {
                    sn.promItemDesc = typeof e.description != "undefined" ? e.description : "";
                    sn.promUrl = typeof e.url != "undefined" ? e.url : "";
                    var b = "item_" + sn.ninePartNumber + "_gmp_cuxiaomd";
                    if (typeof sn.dstatus != "undefined") {
                        b = "citem_" + sn.ninePartNumber + "_gmp_cuxiaomd"
                    }
                    if (sn.promUrl != "") {
                        sn.promItemDesc = '<a target="_blank" href="' + sn.promUrl + '" name="' + b + '">' + sn.promItemDesc + "</a>"
                    }
                } else {
                    sn.promotionDesc = typeof e.description != "undefined" ? e.description : ""
                }
            });
            if (typeof sn.phoneFlag != "undefined" && sn.phoneFlag == "Y" && sn.vendorCode == "") {
                $("#promotionDesc").html(sn.promItemDesc + (sn.promItemDesc != "" ? "&nbsp;&nbsp;" : "") + sn.promotionDesc + (sn.barePhoneDesc == "" ? "" : "<br/>") + sn.barePhoneDesc)
            } else {
                $("#promotionDesc").html(sn.promItemDesc + (sn.promItemDesc != "" ? "&nbsp;&nbsp;" : "") + sn.promotionDesc)
            }
            if ($("#promotionDesc").html() != "") {
                $("#promotionDesc").show()
            } else {
                $("#promotionDesc").hide()
            }
        }
    }, getProductLablePricture: function(b, e) {
        var c = sn.vendorCode;
        if (c == undefined || "undefined" == c || "" == c || (c.length == 10 && c.substring(0, 3) == "003")) {
            c = "0000000000"
        }
        var a = "http://" + sn.domain + sn.context + "/labpic_" + sn.storeId + "_" + sn.catalogId + "_" + c + "_" + b + "__" + e + "_.html";
        $.ajax({url: a, type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: e, success: function(f) {
            }})
    }, getItemInfo: function(a, b) {
        $.ajax({url: sn.itemDomain + "/pds-web/ajax/itemInfo_" + a + ".html", type: "get", cache: true, async: false, dataType: "json", success: function(c) {
                b(c)
            }})
    }, getParameter: function(a, b) {
        if (sn.getParameter == undefined || sn.getParameter != true) {
            sn.getParameter = true;
            $.ajax({url: sn.itemDomain + "/pds-web/ajax/itemParameter_" + a + "_" + sn.catenIds + "_" + sn.catalogId + ".html", type: "get", async: false, dataType: "json", success: function(c) {
                    b(c)
                }, error: function() {
                }})
        }
    }, getCommGroup: function(a, b) {
        if (typeof lazyElems != "undefined") {
            if (a != "") {
                lazyElems.relClass.url = sn.itemDomain + "/pds-web/ajax/commGroup_" + a + ".html";
                lazyElems.relClass.enable = true;
                lazyElems.relClass.handle = b;
                iFourth.win.scroll()
            } else {
                lazyElems.relClass.enable = false;
                $("#relClass").html("").hide()
            }
        } else {
            setTimeout(function() {
                CommonFourPage.FourPage.getCommGroup(a, b)
            }, 100)
        }
    }, onShopSubmitSearch: function() {
        var i = $("#shopKeyWord");
        var f = $("#slowPrice");
        var e = $("#highPrice");
        var g = $.trim(i.val());
        var c = $.trim(f.val());
        var a = $.trim(e.val());
        var h = /^\d+$/;
        if (g == "请输入关键字" || g == "") {
            Util.alertErrorBox("请输入关键词！")
        } else {
            if (c != "" && a != "") {
                if (!h.test(c) || !h.test(a)) {
                    Util.alertErrorBox("请输入正确的价格！");
                    return
                } else {
                    var b = sn.shopPath + sn.shopMainPh + "/" + sn.vendorCode.substring(2, 10) + "/search?keyWord=" + encodeURIComponent(g) + "&price=" + c + "-" + a + "&page=1"
                }
            } else {
                if (c != "" && a == "") {
                    if (!h.test(c)) {
                        Util.alertErrorBox("请输入正确的价格！");
                        return
                    } else {
                        var b = sn.shopPath + sn.shopMainPh + "/" + sn.vendorCode.substring(2, 10) + "/search?keyWord=" + encodeURIComponent(g) + "&price=" + c + "-100000000&page=1"
                    }
                } else {
                    if (c == "" && a != "") {
                        if (!h.test(a)) {
                            Util.alertErrorBox("请输入正确的价格！");
                            return
                        } else {
                            var b = sn.shopPath + sn.shopMainPh + "/" + sn.vendorCode.substring(2, 10) + "/search?keyWord=" + encodeURIComponent(g) + "&price=0-" + a + "&page=1"
                        }
                    } else {
                        var b = sn.shopPath + sn.shopMainPh + "/" + sn.vendorCode.substring(2, 10) + "/search?keyWord=" + encodeURIComponent(g) + "&start=0&rows=100"
                    }
                }
            }
            window.location.href = b
        }
    }, initPriceSearch: function() {
        $("#slowPrice").keyup(function a() {
            var b = document.getElementById("slowPrice").value;
            document.getElementById("slowPrice").value = b.replace(/[^0-9]/g, "")
        });
        $("#highPrice").keyup(function a() {
            var b = document.getElementById("highPrice").value;
            document.getElementById("highPrice").value = b.replace(/[^0-9]/g, "")
        })
    }};
CommonFourPage.viewAlsoView = function(c) {
    try {
        var b = "";
        var a = "";
        b = "baoguang_reccviewviewn_1-";
        a = sn.point + "_" + sn.ninePartNumber + "_reccviewviewn_1-";
        $("#viewAlsoView").html("");
        if (c != "" && c.sugGoods != undefined && c.sugGoods != "" && c.sugGoods.length > 0) {
            $.each(c.sugGoods, function(e, g) {
                if (g.resCode != "02") {
                    if (g.sceneId == "10-14" && g.skus.length > 0) {
                        var h = "";
                        $.each(g.skus, function(j, k) {
                            if (j > 9) {
                                return false
                            }
                            h += "<li>";
                            h += '<a class="product-img" target="_blank" id="' + b + (j + 1) + "_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" name="' + a + (j + 1) + "_p_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" href="' + sn.elecProductDomain + "/detail_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + ".html?src=" + a + (j + 1) + "_p_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" title="' + k.sugGoodsName + '">';
                            h += '<img alt="' + k.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + k.sugGoodsCode + '_1_120x120.jpg" /></a>';
                            h += '<p><span class="price"><i>&yen;</i><em>' + k.price + '</em></span><a class="title" target="_blank" id="' + b + (j + 1) + "_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" name="' + a + (j + 1) + "_c_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" title="' + k.sugGoodsName + '" href="' + sn.elecProductDomain + "/detail_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + ".html?src=" + a + (j + 1) + "_c_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '">';
                            h += k.sugGoodsName;
                            h += "</a></p>"
                        });
                        if (h !== "") {
                            h = "<ul>" + h + "</ul>";
                            $("#viewAlsoView").html(h)
                        }
                    }
                }
            })
        }
        $(".customer-rec-title").html("<h3><span>看了又看</span></h3>")
    } catch (f) {
    }
    if ($("#viewAlsoView").find("li").length > 0) {
        $(".customer-rec-empty").hide();
        $("#viewAlsoView").show()
    } else {
        $(".customer-rec-empty").show();
        $("#viewAlsoView").hide()
    }
    iFourth.customerRec.resetHeight();
    runAnalyseByClass("baoguang_reccviewviewn");
    iFourth.customerRec.init();
    iFourth.mainHeight()
};
CommonFourPage.rightRec = function(c) {
    try {
        var b = "";
        var a = "";
        b = "baoguang_recdtsn_1-";
        a = sn.point + "_" + sn.ninePartNumber + "_recdtsn_1-";
        $("#viewAlsoView").html("");
        if (c != "" && c.sugGoods != undefined && c.sugGoods != "" && c.sugGoods.length > 0) {
            $.each(c.sugGoods, function(e, g) {
                if (g.resCode != "02") {
                    if (g.sceneId == "6-27" && g.skus.length > 2) {
                        var h = "";
                        $.each(g.skus, function(j, k) {
                            if (j > 9) {
                                return false
                            }
                            h += "<li>";
                            h += '<a class="product-img" target="_blank" name="' + a + (j + 1) + "_p_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" href="' + sn.elecProductDomain + "/detail_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + ".html?src=" + a + (j + 1) + "_p_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" title="' + k.sugGoodsName + '">';
                            h += '<img alt="' + k.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + k.sugGoodsCode + '_1_120x120.jpg" /></a>';
                            h += '<p><span class="price"><i>&yen;</i><em>' + k.price + '</em></span><a class="title" target="_blank" id="' + b + (j + 1) + "_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" name="' + a + (j + 1) + "_c_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '" title="' + k.sugGoodsName + '" href="' + sn.elecProductDomain + "/detail_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + ".html?src=" + a + (j + 1) + "_c_" + k.vendorId + "_" + (k.sugGoodsCode).substring(9, 18) + "_" + k.handwork + '">';
                            h += k.sugGoodsName;
                            h += "</a></p>"
                        });
                        if (h !== "") {
                            h = "<ul>" + h + "</ul>";
                            $("#viewAlsoView").html(h)
                        }
                    }
                }
            })
        }
        $(".customer-rec-title").html("<h3><span>网友推荐</span></h3>")
    } catch (f) {
    }
    if ($("#viewAlsoView").find("li").length > 0) {
        $(".customer-rec-empty").hide();
        $("#viewAlsoView").show()
    } else {
        $(".customer-rec-empty").show();
        $("#viewAlsoView").hide()
    }
    iFourth.customerRec.resetHeight();
    runAnalyseByClass("baoguang_recdtsn");
    iFourth.customerRec.init();
    iFourth.mainHeight()
};
CommonFourPage.getRecomData = function(i) {
    try {
        var g = i.sugGoods;
        var c = "";
        var a = "";
        var f = [];
        var b = [];
        var j = "";
        $.each(g, function(k, m) {
            if (m.resCode != "02") {
                if (m.sceneId == "10-15") {
                    var e = CommonFourPage.getLiV9(m, 2);
                    if (e !== "") {
                        if (sn.dstatus == "1") {
                            c = '<div class="area mt10" id="view_Also_BuyProduct">'
                        } else {
                            c = '<div class="template sea-pro editArea-abs mbt10" id="view_Also_BuyProduct">'
                        }
                        if (sn.dstatus == "1") {
                            c += '<div class="area-head"><h3>大家都在买</h3></div>'
                        } else {
                            if (sn.templateCode == "" || sn.templateCode == "T000") {
                                c += '<h2 class="default">大家都在买</h2>'
                            } else {
                                if (sn.templateCode == "T001") {
                                    c += '<h2 class="digital"><span class="ico"></span>大家都在买</h2>'
                                } else {
                                    if (sn.templateCode == "T002") {
                                        c += '<h2><span class="ico"></span>大家都在买</h2>'
                                    } else {
                                        if (sn.templateCode == "T003") {
                                            c += '<h2 class="purple">大家都在买</h2>'
                                        }
                                    }
                                }
                            }
                        }
                        c += '<div class="menu-con"><ul class="exprec" id="vab">' + e + "</ul></div></div>"
                    }
                } else {
                    if (m.sceneId == "10-16") {
                        var l = CommonFourPage.getLiV9(m, 3);
                        if (l !== "") {
                            if (sn.dstatus == "1") {
                                a = '<div class="area mt10" id="buy_Also_BuyProduct">'
                            } else {
                                a = '<div class="template sea-pro editArea-abs mbt10" id="buy_Also_BuyProduct">'
                            }
                            if (sn.dstatus == "1") {
                                a += '<div class="area-head"><h3>掌柜为您推荐</h3></div>'
                            } else {
                                if (sn.templateCode == "" || sn.templateCode == "T000") {
                                    a += '<h2 class="default">掌柜为您推荐</h2>'
                                } else {
                                    if (sn.templateCode == "T001") {
                                        a += '<h2 class="digital"><span class="ico"></span>掌柜为您推荐</h2>'
                                    } else {
                                        if (sn.templateCode == "T002") {
                                            a += '<h2><span class="ico"></span>掌柜为您推荐</h2>'
                                        } else {
                                            if (sn.templateCode == "T003") {
                                                a += '<h2 class="purple">掌柜为您推荐</h2>'
                                            }
                                        }
                                    }
                                }
                            }
                            a += '<div class="menu-con"><ul class="exprec" id="bab">' + l + "</ul></div></div>"
                        }
                    }
                }
            }
        });
        j += c;
        j += a;
        $("#buyAlsoBuy").after(j);
        $("#buyAlsoBuy").hide();
        $("#view_Also_BuyProduct").show();
        $("#buy_Also_BuyProduct").show()
    } catch (h) {
    }
    runAnalyseByClass("baoguang_reccviewbuyn");
    runAnalyseByClass("baoguang_reccviewbuyn");
    runAnalyseByClass("baoguang_reccbuybuyn");
    iFourth.mainHeight()
};
CommonFourPage.getLiV9 = function(f, a) {
    var h = "";
    try {
        var c = "";
        var b = "";
        if (a == 1) {
            c = "baoguang_reccviewviewn_1-";
            b = "item_" + (sn.partNumber).substring(9, 18) + "_reccviewviewn_1-"
        } else {
            if (a == 2) {
                c = "baoguang_reccviewbuyn_1-";
                b = sn.point + "_" + sn.ninePartNumber + "_reccviewbuyn_1-"
            } else {
                if (a == 3) {
                    c = "baoguang_reccbuybuyn_1-";
                    b = sn.point + "_" + sn.ninePartNumber + "_reccbuybuyn_1-"
                }
            }
        }
        $.each(f.skus, function(e, j) {
            if (e > 4) {
                return false
            }
            h += "<li>";
            h += '<a target="_blank" name="' + b + (e + 1) + "_p_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '" href="' + sn.elecProductDomain + "/detail_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + ".html?src=" + b + (e + 1) + "_p_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '" title="' + j.sugGoodsName + '">';
            h += '<img class="image" alt="' + j.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + j.sugGoodsCode + '_1_120x120.jpg" /></a>';
            h += '<p class="title"><a target="_blank" id="' + c + (e + 1) + "_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '" name="' + b + (e + 1) + "_c_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '" title="' + j.sugGoodsName + '" href="' + sn.elecProductDomain + "/detail_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + ".html?src=" + b + (e + 1) + "_c_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '">';
            h += j.sugGoodsName;
            h += j.sugGoodsDes;
            h += "</a></p>";
            h += '<p class="price"><span><i>&yen; </i>' + j.price + "</span>" + CommonFourPage.Recommend.getPromotionContent(j.promotionType, " ") + "</p></li>"
        })
    } catch (g) {
    }
    return h
};
CommonFourPage.getShopHotData = function(g) {
    try {
        var c = g.sugGoods;
        var i = "";
        var h = "";
        var b = sn.point + "_" + sn.ninePartNumber + "_recdxln_1-";
        var a = "baoguang_recdxln_1-";
        if (c != "" && c != undefined) {
            $.each(c, function(e, j) {
                if (j.resCode != "02") {
                    if (j.sceneId == "10-13" && j.skus.length > 0) {
                        var k = "";
                        $.each(j.skus, function(l, m) {
                            if (l > 4) {
                                return false
                            }
                            k += "<li>";
                            k += '<a target="_blank" name="' + b + (l + 1) + "_p_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '" href="' + sn.elecProductDomain + "/detail_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + ".html?src=" + b + (l + 1) + "_p_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '" title="' + m.sugGoodsName + '">';
                            k += '<img class="image" alt="' + m.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + m.sugGoodsCode + '_1_120x120.jpg" /></a>';
                            k += '<p class="title"><a target="_blank" id="' + a + (l + 1) + "_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '" name="' + b + (l + 1) + "_c_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '" title="' + m.sugGoodsName + '" href="' + sn.elecProductDomain + "/detail_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + ".html?src=" + b + (l + 1) + "_c_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '">';
                            k += m.sugGoodsName;
                            k += '</a></p><p class="price"><i>&yen;</i>' + m.price + CommonFourPage.Recommend.getPromotionContent(m.promotionType, " ") + "</p></li>"
                        });
                        if (k != "") {
                            $("#shopHotList").html(k);
                            $("#shopHot").show()
                        } else {
                            $("#shopHot").hide()
                        }
                    } else {
                        $("#shopHot").hide()
                    }
                }
            })
        }
        runAnalyseByClass("baoguang_recdxln")
    } catch (f) {
    }
};
CommonFourPage.getShopFavoriteData = function(g) {
    try {
        var c = g.sugGoods;
        var i = "";
        var h = "";
        var b = sn.point + "_" + sn.ninePartNumber + "_recdscn_1-";
        var a = "baoguang_recdscn_1-";
        if (c != "" && c != undefined) {
            $.each(c, function(e, j) {
                if (j.resCode != "02") {
                    if (j.sceneId == "6-25" && j.skus.length > 0) {
                        var k = "";
                        $.each(j.skus, function(l, m) {
                            if (l > 4) {
                                return false
                            }
                            k += "<li>";
                            k += '<a target="_blank" name="' + b + (l + 1) + "_p_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '" href="' + sn.elecProductDomain + "/detail_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + ".html?src=" + b + (l + 1) + "_p_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '" title="' + m.sugGoodsName + '">';
                            k += '<img class="image" alt="' + m.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + m.sugGoodsCode + '_1_120x120.jpg" /></a>';
                            k += '<p class="title"><a target="_blank" id="' + a + (l + 1) + "_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '" name="' + b + (l + 1) + "_c_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '" title="' + m.sugGoodsName + '" href="' + sn.elecProductDomain + "/detail_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + ".html?src=" + b + (l + 1) + "_c_" + m.vendorId + "_" + (m.sugGoodsCode).substring(9, 18) + "_" + m.handwork + '">';
                            k += m.sugGoodsName;
                            k += '</a></p><p class="price"><i>&yen;</i>' + m.price + CommonFourPage.Recommend.getPromotionContent(m.promotionType, " ") + "</p></li>"
                        });
                        if (k != "") {
                            $("#shopCollectionList").html(k);
                            $("#shopCollection").show()
                        } else {
                            $("#shopCollection").hide()
                        }
                    } else {
                        $("#shopCollection").hide()
                    }
                }
            })
        }
        runAnalyseByClass("baoguang_recdscn")
    } catch (f) {
    }
};
CommonFourPage.hwgInitCss = function() {
    $(".oversea-logo").show();
    $("#oversea").show();
    $("#installment").hide();
    $(".ziti").parent().hide();
    $("#itHelp").hide();
    $(".proinfo-deliver-oversea").show();
    $("#productOverseaTitle").show();
    $("#deliverName").html("送至");
    $(".after-market").each(function() {
        $(this).hide()
    });
    $("#hwgService").show()
};
CommonFourPage.hwgDelivery = function(a) {
    sn.hwgType = "";
    if (a) {
        if (sn.ownerPlace.indexOf("H") == 0) {
            if (typeof sn.sendCityName != "undefined" && sn.sendCityName != "") {
                $("#overSeaPlace").html("<span>由" + sn.sendCityName + '发货</span><span class="ml10">海外直邮</span>')
            } else {
                $("#overSeaPlace").html("")
            }
            $("#overSeaArea").html("国际物流配送流程");
            $(".process-dropdown").html('<img src="' + sn.newResServer + sn.pdsRelationURl + 'images/deliver-process1.jpg" width="465" height="70"/>');
            $(".proinfo-deliver-oversea").show();
            if ($(".current-city").length > 0) {
                $(".current-city").hide()
            }
            $("#tariff").show();
            $(".pro-detail-oversea").show();
            sn.hwgType = "1";
            iFourth.overseDeliver()
        } else {
            if (sn.ownerPlace.indexOf("B") == 0 || sn.ownerPlace.indexOf("L") == 0) {
                if (typeof sn.sendCityName != "undefined" && sn.sendCityName != "") {
                    $("#overSeaPlace").html('<span id="itemSource">商品来源地：' + sn.itemSource + '</span><span class="ml10">由' + sn.sendCityName + "发货</span>")
                } else {
                    $("#overSeaPlace").html('<span id="itemSource">商品来源地：' + sn.itemSource + "</span>")
                }
                $("#overSeaArea").html("保税区物流配送流程");
                $(".process-dropdown").html('<img src="' + sn.newResServer + sn.pdsRelationURl + 'images/deliver-process2.jpg" width="535" height="70"/>');
                $(".proinfo-deliver-oversea").show();
                $(".current-city").hide();
                if ($(".current-city").length > 0) {
                    $(".current-city").hide()
                }
                $("#tariff").show();
                $(".pro-detail-oversea").show();
                sn.hwgType = "1";
                iFourth.overseDeliver()
            } else {
                sn.hwgType = "0";
                $(".proinfo-deliver-oversea").hide();
                $(".pro-detail-oversea").hide();
                $("#tariff").hide()
            }
        }
    } else {
        $(".proinfo-deliver-oversea").hide()
    }
};
CommonFourPage.runInitCFittingReady = function(b, f) {
    var a = typeof sn.passPartNumber != "undefined" ? sn.curSubPartNumber : sn.partNumber;
    if ($("#J-tieIn").length > 0 && sn.isPreBuy != 2) {
        try {
            $.ajax({url: sn.itemDomain + "/pds-web/ajax/accessory_" + sn.vendorCode + "_" + b + "_" + a + "_" + sn.cityId + ".html", type: "get", async: true, dataType: "json", success: function(e) {
                    f(e)
                }})
        } catch (c) {
        }
    } else {
        $("#J-tieIn").html("");
        $("#J-tieIn").hide();
        $("li[rel=#J-tieIn]").hide()
    }
};
CommonFourPage.getPassInfo = function(c) {
    var a = $(c).attr("pass");
    try {
        $.ajax({url: sn.itemDomain + "/pds-web/ajax/getPassInfo_" + a + ".html", type: "get", async: true, dataType: "json", success: function(f) {
                var g = "";
                if (f != null) {
                    var e = new fitSub(f.passSubList.length, a, f.charPartNumbers);
                    fitInfo.push(e);
                    $.each(f.uniqueSubList, function(k, j) {
                        $.each(j, function(i, l) {
                            if (i.indexOf("颜色") >= 0) {
                                g += '<dl pass="' + a + '" class="tiein-tzm-color"><dt>颜色：</dt><dd><ul>';
                                $.each(l, function(m, n) {
                                    var o = sn.imageDomianDir + "/b2c/catentries/" + n.partNumber + "_1_30x30.jpg";
                                    g += '<li data-id="' + (m + 1) + '" sid="' + i + '" cid="' + n.characterValueId + '" title="' + n.characterValueDisplayName + '"><a href="javascript:void(0);"><img src="' + o + '" alt="' + n.characterValueDisplayName + '" /><i></i></a></li>'
                                });
                                g += "</ul></dd></dl>"
                            }
                        })
                    });
                    $.each(f.uniqueSubList, function(k, j) {
                        $.each(j, function(i, l) {
                            if (i.indexOf("颜色") < 0) {
                                g += '<dl pass="' + a + '" class="tiein-tzm-buytype"><dt>' + i + "：</dt><dd><ul>";
                                $.each(l, function(m, n) {
                                    g += '<li data-id="' + (m + 1) + '" sid="' + i + '" cid="' + n.characterValueId + '" title="' + n.characterValueDisplayName + '"><a href="javascript:void(0);">' + n.characterValueDisplayName + "<i></i></a></li>"
                                });
                                g += "</ul></dd></dl>"
                            }
                        })
                    });
                    c.find(".tiein-list-tzm").attr("pass", a);
                    c.find(".tiein-list-tzm").html(g);
                    if (fitSub.gType == "1") {
                        var h = c.find(".tiein-tzm-pop ul li");
                        $.each(h, function(j, l) {
                            var k = $(l).attr("cid");
                            if (typeof f.charPartNumbers[0][k] == "undefined") {
                                if ($(l).parents("dl").is(".tiein-tzm-color")) {
                                    $(l).removeClass().addClass("c-disabled")
                                } else {
                                    $(l).removeClass().addClass("disabled")
                                }
                            }
                        });
                        $(".tiein-tzm-pop .main dl dd li").unbind("click")
                    }
                    iFourth.tieInTZM.show(c)
                } else {
                    c.find(".tiein-list-tzm").html("")
                }
            }})
    } catch (b) {
    }
};
CommonFourPage.checkSub = function(b, c) {
    var a = null;
    $.each(fitInfo, function(h, g) {
        if (g.passPart == b) {
            a = g.subInfo;
            if (g.gType == "2") {
                if ($(c).attr("sid") == "0") {
                    var e = $(c).parents(".tiein-tzm-pop");
                    var f = $(e).find("ul").eq(1).find("li");
                    var j = $(c).attr("cid");
                    $.each(f, function(l, k) {
                        var i = $(k).attr("cid");
                        if (typeof a[0][j + i] == "undefined") {
                            if ($(k).parents("dl").is(".tiein-tzm-color")) {
                                $(k).removeClass().addClass("c-disabled")
                            } else {
                                $(k).removeClass().addClass("disabled")
                            }
                        }
                    })
                }
            }
        }
    })
};
CommonFourPage.getSubFitPrice = function(g) {
    var b = $(g).attr("sub");
    var e = $(g).attr("pass");
    var f = sn.imageDomianDir + "/b2c/catentries/" + b + "_1_60x60.jpg";
    var a = sn.elecProductDomain + "/" + (sn.vendorCode == "" ? "0000000000" : sn.vendorCode) + "/" + b.substring(9, 18) + ".html";
    $("li[pass=" + e + "] a").eq(0).find("img").attr("src", f);
    $("li[pass=" + e + "] a").eq(0).attr("href", a);
    $("li[pass=" + e + "] .title a").attr("href", a);
    var c = typeof sn.passPartNumber != "undefined" ? sn.curSubPartNumber : sn.partNumber;
    $.ajax({url: sn.itemDomain + "/pds-web/ajax/fitPrice_" + c + "_" + sn.vendorCode + "_" + b + "_" + sn.cityId + ".html", type: "get", async: true, dataType: "json", success: function(h) {
            if (h != null && h.childrenList != null) {
                $.each(h.childrenList, function(k, o) {
                    if (b == o.partNumber) {
                        var j = o.accessoryPrice;
                        var n = typeof o.discount != "undefined" ? o.discount : "0";
                        var m = (parseFloat(j) + parseFloat(n)).toFixed(2);
                        var l = typeof o.accessoryId != "undefined" && o.accessoryId != "" ? o.accessoryId : "";
                        if (typeof j != "undefined" && j != "0") {
                            $(".fitPartNumber[value=" + b + "]").siblings("input.high").val(m != undefined ? m : "");
                            $(".fitPartNumber[value=" + b + "]").siblings("input.low").val(j != undefined ? j : "");
                            $(".fitPartNumber[value=" + b + "]").siblings("p.price").html("<span>套餐价：</span><i>¥</i>" + j).show();
                            if (n != "0") {
                                $(".fitPartNumber[value=" + b + "]").siblings("span.label").html("已优惠 &yen;" + n).show()
                            } else {
                                $(".fitPartNumber[value=" + b + "]").siblings("span.label").hide()
                            }
                            if (l != "") {
                                $(".fitPartNumber[value=" + b + "]").siblings("input.check").val(l);
                                $(".fitPartNumber[value=" + b + "]").siblings("input.accessoryId").val(l)
                            } else {
                                $(".fitPartNumber[value=" + b + "]").siblings("input.check").val("");
                                $(".fitPartNumber[value=" + b + "]").siblings("input.accessoryId").val("")
                            }
                        } else {
                            $(".fitPartNumber[value=" + b + "]").siblings("p.price").hide();
                            $(".fitPartNumber[value=" + b + "]").siblings("span.label").hide();
                            $(".fitPartNumber[value=" + b + "]").siblings("input.check").val("");
                            $(".fitPartNumber[value=" + b + "]").siblings("input.accessoryId").val("")
                        }
                    }
                })
            }
            iFourth.tieInTZM.select()
        }})
};
CommonFourPage.initCFitting = function(c) {
    if (sn.silenceType == "Y" || sn.cuxiaoSoldOut == "Y") {
        $("#listProContent").hide();
        iFourth.mainHeight();
        return
    }
    var k = false;
    try {
        if (c != "" && c.priceList != undefined && c.priceList.length > 0) {
            var a = '<div class="tiein-top"><a href="' + sn.elecProductDomain + "/" + sn.vendorCode + "/" + c.mainPartNumber.substring(9, 18) + '.html" target="_blank"><img src="' + sn.imageDomianDir + "/b2c/catentries/" + c.mainPartNumber + '_1_120x120.jpg" alt="' + sn.itemDisplayName + '"/></a>';
            a += '<p class="title"><a target="_blank" href="' + sn.elecProductDomain + "/" + sn.vendorCode + "/" + c.mainPartNumber.substring(9, 18) + '.html">' + sn.itemDisplayName + '</a></p><p class="price" id="pro_jiage"><i>&yen</i>' + sn.promotionPrice + '</p><i class="plus"></i></div>';
            a += '<div class="tiein-nav"><a name="item_' + sn.ninePartNumber + '_dapei_alldp" data-type="0" href="javascript:void(0);" class="current">全部搭配</a>';
            a += '</div><div class="tiein-main" id="J-slide-tieIn">';
            a += '<a name="item_' + sn.ninePartNumber + '_dapei_tabup" class="btn-dir prev" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
            a += '<a name="item_' + sn.ninePartNumber + '_dapei_tabdown" class="btn-dir next" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
            a += '<div class="tiein-list"><ul id="dapei_slide">';
            for (var f = 0;
                    f < c.priceList.length;
                    f++) {
                var l = c.priceList[f].partNumber;
                var h = c.priceList[f].price;
                var g = c.priceList[f].discountAmount;
                if (g == undefined || g == "" || g == null) {
                    g = "0"
                }
                var b = sn.elecProductDomain + "/" + c.priceList[f].vendorCode + "/" + l.substring(9, 18) + ".html";
                a += '<li pass="' + l + '" class=""><a name="item_' + sn.ninePartNumber + '_dapei_tj01p" target="_blank" href="' + b + '">';
                if (c.priceList[f].type != "0") {
                    a += '<img alt="' + c.priceList[f].itemDisplayName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + c.priceList[f].type + '_1_60x60.jpg" ></a>';
                    k = true
                } else {
                    a += '<img alt="' + c.priceList[f].itemDisplayName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + l + '_1_60x60.jpg" ></a>'
                }
                a += '<p class="title"><a name="item_' + sn.ninePartNumber + '_dapei_tj01c" target="_blank" href="' + b + '">' + c.priceList[f].itemDisplayName + "</a></p>";
                a += '<p class="price"><span>套餐价：</span><i>&yen;</i>' + (parseFloat(h) - parseFloat(g)).toFixed(2) + "</p>";
                if (c.priceList[f].discountAmount != undefined && c.priceList[f].discountAmount != "") {
                    a += '<span class="label">已优惠&yen;' + parseFloat(c.priceList[f].discountAmount).toFixed(2) + "</span>"
                } else {
                    a += '<span class="label" style="display:none;">已优惠&yen;</span>'
                }
                if (c.priceList[f].type != "0") {
                    a += '<p pass="' + l + '" class="handle"><a href="javascript:void(0);">选择商品规格</a></p>'
                }
                a += '<i class="plus"></i><input class="fitPartNumber" type="hidden" value="' + l + '"><input class="accessoryId" type="hidden" value="' + (c.priceList[f].activityID == undefined ? "" : c.priceList[f].activityID) + '"><input class="high" type="hidden" value="' + c.priceList[f].price + '"><input class="low" type="hidden" value="' + (c.priceList[f].accessoryPrice == undefined ? h : c.priceList[f].accessoryPrice) + '"><input name="item_' + sn.ninePartNumber + '_dapei_tj01p" class="check" value="' + (c.priceList[f].activityID == undefined ? "" : c.priceList[f].activityID) + '" type="checkbox">';
                if (c.priceList[f].type != "0") {
                    a += '<div class="tiein-list-tzm"></div>'
                }
                a += "</li>"
            }
            a += "</ul></div></div>";
            a += ' <div class="tiein-count"><p class="count">已搭配 <em>0</em> 件</p>';
            a += '<dl><dt>套餐价：</dt><dd class="price"><i>&yen;</i>  <span id="yuanjia" class="price-total">' + sn.promotionPrice + '</span></dd></dl><dl style="display:none;"><dt>已优惠：</dt><dd class="price"><i>&yen;</i>  <span id="yhj" class="price-diff">0.00</span></dd></dl>';
            a += '<div class="handle"><a name="item_' + sn.ninePartNumber + '_dapei_buy02" href="javascript:Cart.addCartPJ();" class="btn-addcart-mini"></a><a name="item_' + sn.ninePartNumber + '_dapei_delete" href="javascript:void(0);" class="reset">清除全部</a></div></div>';
            $("#J-tieIn").html(a);
            if (k) {
                $("#J-tieIn").addClass("tiein-tzm")
            } else {
                $("#J-tieIn").removeClass("tiein-tzm")
            }
            $("#J-tieIn").show();
            $("li[rel=#J-tieIn]").show();
            $("#pro_jiage").html("<i>&yen</i>" + sn.promotionPrice);
            $("#yuanjia").text(sn.promotionPrice);
            if ($("#J-tieIn").html() != "" && $("#J-tieIn").html() != null) {
                $("#listProContent").find("li[rel=#J-tieIn]").removeClass().addClass("current");
                $("#listProContent").find("li[rel=#J-setMeal]").removeClass().addClass("hide");
                $("#J-setMeal").hide()
            }
            $("#listProContent").find(".tabarea-items").length > 0 ? $("#listProContent").show() : $("#listProContent").hide();
            iFourth.tieInTZM.init(function(e) {
                CommonFourPage.getPassInfo(e)
            });
            iFourth.tieInRec()
        } else {
            $("#J-tieIn").hide();
            $("#J-setMeal").html("");
            $("li[rel=#J-tieIn]").hide();
            if ($("#J-setMeal").length > 0 && $("#J-setMeal").html() != "") {
                $("#listProContent").show()
            } else {
                $("#listProContent").hide()
            }
        }
        iFourth.win.scroll()
    } catch (j) {
    }
};
CommonFourPage.initCsubFitting = function(f) {
    if (sn.silenceType == "Y" || sn.cuxiaoSoldOut == "Y") {
        $("#accessoryInfo").hide();
        iFourth.mainHeight();
        return
    }
    var l = false;
    try {
        if (f != "" && f.priceList != undefined && f.priceList.length > 0) {
            var a = '<div class="tiein-top"><a href="' + sn.elecProductDomain + "/" + sn.vendorCode + "/" + sn.curSubPartNumber.substring(9, 18) + '.html" target="_blank"><img src="' + sn.imageDomianDir + "/b2c/catentries/" + sn.curSubPartNumber + '_1_120x120.jpg" alt="' + sn.productName + '"/></a>';
            a += '<p class="title"><a target="_blank" href="' + sn.elecProductDomain + "/" + sn.vendorCode + "/" + sn.curSubPartNumber.substring(9, 18) + '.html">' + sn.productName + '</a></p><p class="price" id="pro_jiage"><i>&yen</i>' + sn.promotionPrice + '</p><i class="plus"></i></div>';
            a += '<div class="tiein-nav"><a name="item_' + sn.ninePartNumber + '_dapei_alldp" data-type="0" href="javascript:void(0);" class="current">全部搭配</a>';
            a += '</div><div class="tiein-main" id="J-slide-tieIn">';
            a += '<a name="item_' + sn.ninePartNumber + '_dapei_tabup" class="btn-dir prev" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
            a += '<a name="item_' + sn.ninePartNumber + '_dapei_tabdown" class="btn-dir next" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
            a += '<div class="tiein-list"><ul id="dapei_slide">';
            for (var g = 0;
                    g < f.priceList.length;
                    g++) {
                var m = f.priceList[g].partNumber;
                var j = f.priceList[g].price;
                var h = f.priceList[g].discountAmount;
                if (h == undefined || h == "" || h == null) {
                    h = "0"
                }
                var c = typeof f.priceList[g].accessoryPrice != "undefined" && f.priceList[g].accessoryPrice != "" ? f.priceList[g].accessoryPrice : "";
                var b = sn.elecProductDomain + "/" + sn.vendorCode + "/" + m.substring(9, 18) + ".html";
                a += '<li pass="' + m + '" class=""><a name="item_' + sn.ninePartNumber + '_dapei_tj01p" target="_blank" href="' + b + '">';
                if (f.priceList[g].type != "0") {
                    a += '<img alt="' + f.priceList[g].itemDisplayName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + f.priceList[g].type + '_1_60x60.jpg" ></a>';
                    l = true
                } else {
                    a += '<img alt="' + f.priceList[g].itemDisplayName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + m + '_1_60x60.jpg" ></a>'
                }
                a += '<p class="title"><a name="item_' + sn.ninePartNumber + '_dapei_tj01c" target="_blank" href="' + b + '">' + f.priceList[g].itemDisplayName + "</a></p>";
                a += '<p class="price"><span>套餐价：</span><i>&yen;</i>' + parseFloat(c != "" ? c : j).toFixed(2) + "</p>";
                if (f.priceList[g].discountAmount != undefined && f.priceList[g].discountAmount != "") {
                    a += '<span class="label">已优惠&yen;' + parseFloat(h).toFixed(2) + "</span>"
                } else {
                    a += '<span class="label" style="display:none;">已优惠&yen;</span>'
                }
                if (f.priceList[g].type != "0") {
                    a += '<p pass="' + m + '" class="handle"><a href="javascript:void(0);">选择商品规格</a></p>'
                }
                a += '<i class="plus"></i><input class="fitPartNumber" type="hidden" value="' + m + '"><input class="accessoryId" type="hidden" value="' + (f.priceList[g].activityID == undefined ? "" : f.priceList[g].activityID) + '"><input class="high" type="hidden" value="' + j + '"><input class="low" type="hidden" value="' + (c == "" ? j : c) + '"><input name="item_' + sn.ninePartNumber + '_dapei_tj01p" class="check" value="' + (f.priceList[g].activityID == undefined ? "" : f.priceList[g].activityID) + '" type="checkbox">';
                if (f.priceList[g].type != "0") {
                    a += '<div class="tiein-list-tzm"></div>'
                }
                a += "</li>"
            }
            a += "</ul></div></div>";
            a += ' <div class="tiein-count"><p class="count">已搭配 <em>0</em> 件</p>';
            a += '<dl><dt>套餐价：</dt><dd class="price"><i>&yen;</i>  <span id="yuanjia" class="price-total">' + sn.promotionPrice + '</span></dd></dl><dl style="display:none;"><dt>已优惠：</dt><dd class="price"><i>&yen;</i>  <span id="yhj" class="price-diff">0.00</span></dd></dl>';
            a += '<div class="handle"><a name="item_' + sn.ninePartNumber + '_dapei_buy02" href="javascript:gMain.addCartForPJ();" class="btn-addcart-mini"></a><a name="item_' + sn.ninePartNumber + '_dapei_delete" href="javascript:void(0);" class="reset">清除全部</a></div></div>';
            $("#J-tieIn").html(a);
            $("#accessoryTitle").html('<li rel="#J-tieIn" class="current"><a name="item_' + sn.partNumber.substring(9, 18) + '_dapei_tjdp" href="javascript:void(0);">推荐搭配</a></li>');
            $("#accessoryTitle").show();
            if (l) {
                $("#J-tieIn").addClass("tiein-tzm")
            } else {
                $("#J-tieIn").removeClass("tiein-tzm")
            }
            $("#J-tieIn").show();
            $("#accessoryInfo").show();
            if ($("#J-tieIn").html() != "" && $("#J-tieIn").html() != null) {
                $("#accessoryInfo").find("li[rel=#J-tieIn]").removeClass().addClass("current");
                $("#J-setMeal").hide()
            }
            iFourth.tieInTZM.init(function(e) {
                CommonFourPage.getPassInfo(e)
            });
            iFourth.tieInRec()
        } else {
            $("#J-tieIn").html("");
            $("#accessoryTitle").hide();
            $("#J-tieIn").hide();
            $("li[rel=#J-tieIn]").hide();
            if ($("#J-setMeal").length > 0 && $("#J-setMeal").html() != "") {
                $("#accessoryInfo").show()
            } else {
                $("#accessoryInfo").hide()
            }
        }
        iFourth.win.scroll()
    } catch (k) {
    }
};
Recommend.initFittingReady = function(a, c) {
    Recommend.fitPartNumber = a;
    if (sn.isPreBuy != 2) {
        try {
            $.ajax({url: sn.tuijianDomain + "/recommend-portal/recommend/paramsBiz.jsonp?parameter=" + Recommend.fitPartNumber + "&vendorId=" + (sn.vendorCode != "" ? sn.vendorCode : "0000000000") + "&catGroupId=" + sn.catenIds + "&cityId=" + sn.cityId + "&sceneIds=8-10&count=12", type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: c, success: function(e) {
                    iFourth.win.scroll()
                }})
        } catch (b) {
        }
    }
};
Recommend.callBackInitFittingReady = function(g) {
    if (sn.silenceType == "Y" || sn.cuxiaoSoldOut == "Y") {
        $("#listProContent").hide();
        iFourth.mainHeight();
        return
    }
    try {
        Recommend.fittingIndexs = [];
        Recommend.fitingPartNumber = [];
        var f = sn.vendorCode != "" ? sn.vendorCode : "0000000000";
        var l = g.sugGoods[0];
        if (typeof l != "undefined" && l.resCode != "02" && l.skus.length > 0) {
            var a = '<div class="tiein-top"><a href="' + sn.elecProductDomain + "/" + sn.partNumber.substring(9, 18) + '.html" target="_blank"><img src="' + sn.imageDomianDir + "/b2c/catentries/" + sn.partNumber + '_1_120x120.jpg" alt="' + sn.itemDisplayName + '"/></a>';
            a += '<p class="title"><a target="_blank" href="' + sn.elecProductDomain + "/" + sn.partNumber.substring(9, 18) + '.html">' + sn.itemDisplayName + '</a></p><p class="price" id="pro_jiage"><i>&yen</i></p><i class="plus"></i></div>';
            a += '<div class="tiein-nav">';
            a += '<a name="item_' + sn.ninePartNumber + '_rectjdpn_1-1_b_none_none_0" data-rec="true" href="javascript:void(0);" class="current">精选搭配</a><span>|</span>';
            for (var h = 0;
                    h < l.accCatgroups.length;
                    h++) {
                a += '<a name="item_' + sn.ninePartNumber + "_rectjdpn_1-" + (h + 2) + '_b_none_none_0" data-type="' + (h + 1) + '" href="javascript:Recommend.initCatFitting(' + (h + 1) + ",'" + l.accCatgroups[h].accCatgroupId + "');\">" + l.accCatgroups[h].accCatgroupName + "</a>  ";
                if (h != l.accCatgroups.length - 1) {
                    a += "<span>|</span>"
                }
            }
            a += '</div><div class="tiein-main" id="J-slide-tieIn">';
            a += '<a name="item_' + sn.ninePartNumber + '_dapei_tabup" class="btn-dir prev" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
            a += '<a name="item_' + sn.ninePartNumber + '_dapei_tabdown" class="btn-dir next" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
            a += '<div class="tiein-list"><ul id="dapei_slide">';
            if (l.skus.length > 0) {
                for (var h = 0;
                        h < l.skus.length;
                        h++) {
                    var n = l.skus[h].sugGoodsCode;
                    if ($.inArray(n, Recommend.fitingPartNumber) < 0) {
                        var c = l.skus[h].diffPrice;
                        var m = l.skus[h].accPrice;
                        if (m != "" && m > 0) {
                            var j = l.skus[h].accPrice;
                            if (c != null && c != "" && m != null && m != "") {
                                j = parseFloat(parseFloat(c) + parseFloat(m)).toFixed(2)
                            }
                            Recommend.fitingPartNumber.push(n);
                            var b = sn.elecProductDomain + "/" + n.substring(9, 18) + ".html";
                            a += '<li class="" data-id="' + n + '" data-rec="true"><a name="item_' + sn.ninePartNumber + "_rectjdpn_1-" + (h + 1) + "_p_0000000000_" + n.substring(9, 18) + "_" + l.skus[h].handwork + '" id="baoguang_rectjdpn_1-' + (h + 1) + "_0000000000_" + n.substring(9, 18) + "_" + l.skus[h].handwork + '" target="_blank" href="' + b + "?src=item_" + sn.ninePartNumber + "_rectjdpn_1-" + (h + 1) + "_p_0000000000_" + n.substring(9, 18) + "_" + l.skus[h].handwork + '"><img title="' + l.skus[h].sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + n + '_1_60x60.jpg" ></a>';
                            a += '<p class="title" title="' + l.skus[h].sugGoodsName + '"><a name="item_' + sn.ninePartNumber + "_rectjdpn_1-" + (h + 1) + "_c_0000000000_" + n.substring(9, 18) + "_" + l.skus[h].handwork + '" target="_blank" href="' + b + "?src=item_" + sn.ninePartNumber + "_rectjdpn_1-" + (h + 1) + "_c_0000000000_" + n.substring(9, 18) + "_" + l.skus[h].handwork + '">' + l.skus[h].sugGoodsName + "</a></p>";
                            a += '<p class="price"><span>套餐价：</span><i>&yen;</i>' + m + "</p>";
                            if (c != "" && c > 0) {
                                a += '<span class="label">已优惠&yen;' + c + "</span>"
                            }
                            a += '<i class="plus"></i>';
                            a += '<input class="fitPartNumber" type="hidden" value="' + l.skus[h].sugGoodsCode + '">';
                            a += '<input class="accessoryId" type="hidden" value="' + l.skus[h].activityId + '">';
                            a += '<input type="hidden" value="' + j + '" class="high">';
                            a += '<input type="hidden" value="' + m + '" class="low">';
                            a += '<input name="item_' + sn.ninePartNumber + "_rectjdpn_1-" + (h + 1) + "_e_0000000000_" + n.substring(9, 18) + "_" + l.skus[h].handwork + '" class="check"  type="checkbox" value=' + l.skus[h].activityId + "></li>"
                        }
                    }
                }
            }
            a += '</ul></div><div class="tiein-main-empty"><i></i><span>抱歉，您选择的搭配商品已售完，欢迎您选择其他商品！</span></div></div>';
            a += ' <div class="tiein-count"><p class="count">已搭配 <em>0</em> 件</p>';
            a += '<dl><dt>套餐价：</dt><dd class="price"><i>&yen;</i>  <span id="yuanjia" class="price-total">0.00</span></dd></dl><dl style="display:none;"><dt>已优惠：</dt><dd class="price"><i>&yen;</i>  <span id="yhj" class="price-diff">0.00</span></dd></dl>';
            a += '<div class="handle"><a name="item_' + sn.ninePartNumber + '_rectjdpn_1-1_b_0000000000_none_0" href="javascript:Cart.addCartPJ();" class="btn-addcart-mini"></a><a name="item_' + sn.ninePartNumber + '_dapei_delete" href="javascript:void(0);" class="reset">清除全部</a></div></div>';
            $("#J-tieIn").html(a);
            $("#J-tieIn").show();
            $("li[rel=#J-tieIn]").show();
            $("#pro_jiage").html("<i>&yen</i>" + sn.promotionPrice);
            $("#yuanjia").text(sn.promotionPrice);
            if ($("#J-tieIn").html() != "" && $("#J-tieIn").html() != null) {
                $("#listProContent").find("li[rel=#J-tieIn]").removeClass().addClass("current");
                $("#listProContent").find("li[rel=#J-setMeal]").removeClass();
                $("#J-setMeal").hide()
            } else {
                $("#listProContent").find("li[rel=#J-setMeal]").removeClass().addClass("current");
                $("#listProContent").find("li[rel=#J-tieIn]").removeClass();
                $("#J-setMeal").show()
            }
            $("#listProContent").find(".tabarea-items").length > 0 ? $("#listProContent").show() : $("#listProContent").hide();
            iFourth.tieInRec2.init();
            runAnalyseByClass("baoguang_rectjdpn_1")
        } else {
            $("#J-tieIn").hide();
            $("#J-setMeal").html("");
            $("li[rel=#J-tieIn]").hide();
            if ($("#J-setMeal").length > 0 && $("#J-setMeal").html() != "") {
                $("#listProContent").show()
            } else {
                $("#listProContent").hide()
            }
        }
    } catch (k) {
    }
};
Recommend.subCallBackInitFittingReady = function(f) {
    if (sn.silenceType == "Y" || sn.cuxiaoSoldOut == "Y") {
        $("#accessoryInfo").hide();
        iFourth.mainHeight();
        return
    }
    Recommend.fittingIndexs = [];
    Recommend.fitingPartNumber = [];
    var j = f.sugGoods[0];
    if (typeof j != "undefined" && j.resCode != "02" && j.skus.length > 0) {
        var a = '<div class="tiein-top"><a href="' + sn.elecProductDomain + "/" + sn.curSubPartNumber.substring(9, 18) + '.html" target="_blank"><img src="' + sn.imageDomianDir + "/b2c/catentries/" + sn.curSubPartNumber + '_1_120x120.jpg" alt="' + $("#productDisplayName").html() + '"/></a>';
        a += '<p class="title"><a target="_blank" href="' + sn.elecProductDomain + "/" + sn.curSubPartNumber.substring(9, 18) + '.html">' + $("#productDisplayName").html() + '</a></p><p class="price" id="pro_jiage"><i>&yen</i></p><i class="plus"></i></div>';
        a += '<div class="tiein-nav">';
        var e = sn.vendorCode == "" ? "0000000000" : sn.vendorCode;
        a += '<a name="item_' + sn.ninePartNumber + '_rectjdpn_1-1_b_none_none_0" data-rec="true" href="javascript:void(0);" class="current">精选搭配</a><span>|</span>';
        for (var g = 0;
                g < j.accCatgroups.length;
                g++) {
            a += '<a name="item_' + sn.ninePartNumber + "_rectjdpn_1-" + (g + 2) + '_b_none_none_0" data-type="' + (g + 1) + '" href="javascript:Recommend.initCatFitting(' + (g + 1) + ",'" + j.accCatgroups[g].accCatgroupId + "');\">" + j.accCatgroups[g].accCatgroupName + "</a>  ";
            if (g != j.accCatgroups.length - 1) {
                a += "<span>|</span>"
            }
        }
        a += '</div><div class="tiein-main" id="J-slide-tieIn">';
        a += '<a name="item_' + sn.ninePartNumber + '_dapei_tabup" class="btn-dir prev" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
        a += '<a name="item_' + sn.ninePartNumber + '_dapei_tabdown" class="btn-dir next" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
        a += '<div class="tiein-list"><ul id="dapei_slide">';
        if (j.skus.length > 0) {
            for (var g = 0;
                    g < j.skus.length;
                    g++) {
                var l = j.skus[g].sugGoodsCode;
                if ($.inArray(l, Recommend.fitingPartNumber) < 0) {
                    var c = j.skus[g].diffPrice;
                    var k = j.skus[g].accPrice;
                    if (k != "" && k > 0) {
                        var h = j.skus[g].accPrice;
                        if (c != null && c != "" && k != null && k != "") {
                            h = parseFloat(parseFloat(c) + parseFloat(k)).toFixed(2)
                        }
                        Recommend.fitingPartNumber.push(l);
                        var b = sn.elecProductDomain + "/" + l.substring(9, 18) + ".html";
                        a += '<li class="" data-id="' + l + '" data-rec="true"><a name="item_' + sn.ninePartNumber + "_rectjdpn_1-" + (g + 1) + "_p_0000000000_" + l.substring(9, 18) + "_" + j.skus[g].handwork + '" id="baoguang_rectjdpn_1-' + (g + 1) + "_0000000000_" + l.substring(9, 18) + "_" + j.skus[g].handwork + '" target="_blank" href="' + b + "?src=item_" + sn.ninePartNumber + "_rectjdpn_1-" + (g + 1) + "_p_0000000000_" + l.substring(9, 18) + "_" + j.skus[g].handwork + '"><img title="' + j.skus[g].sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + l + '_1_60x60.jpg" ></a>';
                        a += '<p class="title" title="' + j.skus[g].sugGoodsName + '"><a name="item_' + sn.ninePartNumber + "_rectjdpn_1-" + (g + 1) + "_c_0000000000_" + l.substring(9, 18) + "_" + j.skus[g].handwork + '" target="_blank" href="' + b + "?src=item_" + sn.ninePartNumber + "_rectjdpn_1-" + (g + 1) + "_c_0000000000_" + l.substring(9, 18) + "_" + j.skus[g].handwork + '">' + j.skus[g].sugGoodsName + "</a></p>";
                        a += '<p class="price"><span>套餐价：</span><i>&yen;</i>' + k + "</p>";
                        if (c != "" && c > 0) {
                            a += '<span class="label">已优惠&yen;' + c + "</span>"
                        }
                        a += '<i class="plus"></i>';
                        a += '<input class="fitPartNumber" type="hidden" value="' + j.skus[g].sugGoodsCode + '">';
                        a += '<input class="accessoryId" type="hidden" value="' + j.skus[g].activityId + '">';
                        a += '<input type="hidden" value="' + h + '" class="high">';
                        a += '<input type="hidden" value="' + k + '" class="low">';
                        a += '<input name="item_' + sn.ninePartNumber + "_rectjdpn_1-" + (g + 1) + "_e_0000000000_" + l.substring(9, 18) + "_" + j.skus[g].handwork + '" class="check"  type="checkbox" value=' + j.skus[g].activityId + "></li>"
                    }
                }
            }
        }
        a += '</ul></div><div class="tiein-main-empty"><i></i><span>抱歉，您选择的搭配商品已售完，欢迎您选择其他商品！</span></div></div>';
        a += ' <div class="tiein-count"><p class="count">已搭配 <em>0</em> 件</p>';
        a += '<dl><dt>套餐价：</dt><dd class="price"><i>&yen;</i>  <span id="yuanjia" class="price-total">0.00</span></dd></dl><dl style="display:none;"><dt>已优惠：</dt><dd class="price"><i>&yen;</i>  <span id="yhj" class="price-diff">0.00</span></dd></dl>';
        a += '<div class="handle"><a name="item_' + sn.ninePartNumber + '_rectjdpn_1-1_b_0000000000_none_0" href="javascript:gMain.addCartForPJ();" class="btn-addcart-mini"></a><a name="item_' + sn.ninePartNumber + '_dapei_delete" href="javascript:void(0);" class="reset">清除全部</a></div></div>';
        $("#J-tieIn").html(a);
        $("#pro_jiage").html("<i>&yen</i>" + sn.promotionPrice);
        $("#yuanjia").text(sn.promotionPrice);
        $("#accessoryTitle").html('<li rel="#J-tieIn" class="current"><a name="item_' + sn.partNumber.substring(9, 18) + '_dapei_tjdp" href="javascript:void(0);">推荐搭配</a></li>');
        $("#accessoryTitle").show();
        $("#J-tieIn").show();
        $("#accessoryInfo").show();
        iFourth.tieInRec2.init();
        runAnalyseByClass("baoguang_rectjdpn_1")
    } else {
        $("#J-tieIn").html("");
        $("#accessoryTitle").hide();
        $("#J-tieIn").hide()
    }
};
CommonFourPage.getgroupCmmdtyRelation = function(f, b) {
//    var a = typeof sn.passPartNumber != "undefined" ? sn.curSubPartNumber : sn.partNumber;
//    if (sn.vendorCode != "") {
//        try {
//            $.ajax({url: sn.itemDomain + "/pds-web/ajax/groupCmmdtyRelation_" + a + "_" + sn.vendorCode + ".html", type: "get", async: true, dataType: "json", success: function(e) {
//                    f(e)
//                }, error: function() {
//                    b()
//                }})
//        } catch (c) {
//        }
//    }
};
Recommend.initCatFitting = function(a, b) {
    try {
        if ($.inArray(a, Recommend.fittingIndexs) < 0) {
            Recommend.fittingIndexs.push(a);
            $.ajax({url: sn.tuijianDomain + "/recommend-portal/recommend/paramsBiz.jsonp?parameter=" + Recommend.fitPartNumber + "&vendorId=" + (sn.vendorCode != "" ? sn.vendorCode : "0000000000") + "&catGroupId=" + sn.catenIds + "&accCatGroupId=" + b + "&cityId=" + sn.cityId + "&sceneIds=8-11&count=12", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "callBackinitCatFitting", success: function(h) {
                    var l = h.sugGoods[0];
                    if (l != undefined && l.resCode != "02") {
                        if (l.skus.length > 0) {
                            var e = "";
                            for (var j = 0;
                                    j < l.skus.length;
                                    j++) {
                                var o = l.skus[j].sugGoodsCode;
                                if ($.inArray(o, Recommend.fitingPartNumber) < 0) {
                                    var g = l.skus[j].diffPrice;
                                    var m = l.skus[j].accPrice;
                                    if (m != "" && m > 0) {
                                        var k = l.skus[j].accPrice;
                                        if (g != null && g != "" && m != null && m != "") {
                                            k = parseFloat(parseFloat(g) + parseFloat(m)).toFixed(2)
                                        }
                                        Recommend.fitingPartNumber.push(o);
                                        var f = sn.elecProductDomain + "/" + o.substring(9, 18) + ".html";
                                        e += '<li class="" data-type="' + a + '" data-id="' + o + '"><a name="item_' + sn.ninePartNumber + "_rectjdpn_" + (a + 1) + "-" + (j + 1) + "_p_0000000000_" + o.substring(9, 18) + "_" + l.skus[j].handwork + '" id="baoguang_rectjdpn_' + (a + 1) + "-" + (j + 1) + "_0000000000_" + o.substring(9, 18) + "_" + l.skus[j].handwork + '" target="_blank" href="' + f + "?src=item_" + sn.ninePartNumber + "_rectjdpn_" + (a + 1) + "-" + (j + 1) + "_p_0000000000_" + o.substring(9, 18) + "_" + l.skus[j].handwork + '"><img title="' + l.skus[j].sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + o + '_1_60x60.jpg" ></a>';
                                        e += '<p class="title" title="' + l.skus[j].sugGoodsName + '"><a name="item_' + sn.ninePartNumber + "_rectjdpn_" + (a + 1) + "-" + (j + 1) + "_c_0000000000_" + o.substring(9, 18) + "_" + l.skus[j].handwork + '" target="_blank" href="' + f + "?src=item_" + sn.ninePartNumber + "_rectjdpn_" + (a + 1) + "-" + (j + 1) + "_c_0000000000_" + o.substring(9, 18) + "_" + l.skus[j].handwork + '">' + l.skus[j].sugGoodsName + "</a></p>";
                                        e += '<p class="price"><span>套餐价：</span><i>&yen;</i>' + m + "</p>";
                                        if (g != "" && g > 0) {
                                            e += '<span class="label">已优惠&yen;' + g + "</span>"
                                        }
                                        e += '<i class="plus"></i>';
                                        e += '<input class="fitPartNumber" type="hidden" value="' + l.skus[j].sugGoodsCode + '">';
                                        e += '<input class="accessoryId" type="hidden" value="' + l.skus[j].sugGoodsId + '">';
                                        e += '<input type="hidden" value="' + k + '" class="high">';
                                        e += '<input type="hidden" value="' + m + '" class="low">';
                                        e += '<input name="item_' + sn.ninePartNumber + "_rectjdpn_" + (a + 1) + "-" + (j + 1) + "_e_0000000000_" + o.substring(9, 18) + "_" + l.skus[j].handwork + '" class="check"  type="checkbox" value=' + l.skus[j].activityId + "></li>"
                                    }
                                } else {
                                    var n = iFourth.tieInRec2.list.children("li").filter("'[data-id=\"" + o + "\"]'");
                                    if (n.length > 0) {
                                        $(n[0]).attr("data-type", a)
                                    }
                                }
                            }
                            $("#dapei_slide").append(e)
                        }
                    }
                    iFourth.tieInRec2.showType(a);
                    iFourth.tieInRec2.update();
                    runAnalyseByClass("baoguang_rectjdpn_" + (a + 1))
                }})
        } else {
            iFourth.tieInRec2.showType(a);
            iFourth.tieInRec2.update()
        }
    } catch (c) {
    }
};
CommonFourPage.storeService = {init: function() {
        var a = this;
        sn.o2oNinePartNumber = "";
        iFourth.o2oPop.init(function(b) {
            a.afterShowPopPage(b)
        })
    }, hide: function() {
        $(".proinfo-o2o").hide();
        iFourth.mainHeight()
    }, show: function() {
        if (sn.storeServiceList != "") {
            $(".proinfo-o2o").show()
        }
        iFourth.mainHeight()
    }, jsdShow: function() {
        $("#btn_jsd").parent().show();
        $(".proinfo-o2o").show();
        iFourth.mainHeight()
    }, jsdHide: function() {
        $("#btn_jsd").parent().hide();
        iFourth.mainHeight()
    }, getStroeServiceList: function(a, b) {
        sn.o2oNinePartNumber = a;
        sn.storeServiceList = "";
        var c = this;
        sn.sgComplete = false, sn.vbComplete = false, sn.ffComplete = false;
        this.judgeIsShowRealExperience(a);
        if (b != "0") {
            c.judgeIsShowSpotGoods(a)
        } else {
            $(".proinfo-o2o").find(".item2").hide();
            sn.sgComplete = true
        }
        c.judgeIsShowVBuy();
        this.judgeIsShowFreeFilm()
    }, getGuideShop: function() {
        var a = "";
        if (sn.curSubPartNumber == undefined || sn.curSubPartNumber == "") {
            a = sn.partNumber
        } else {
            a = sn.curSubPartNumber
        }
        $.ajax({url: sn.itemDomain + "/pds-web/ajax/getGuideShop_" + a + "_" + sn.vendorCode + "_" + sn.mdmCityId + "_.html", type: "get", cache: true, dataType: "json", success: function(b) {
                if (b.errCode == "0") {
                    $(".proinfo-o2o").find(".item6").show();
                    $(".proinfo-o2o").show()
                } else {
                    $(".proinfo-o2o").hide();
                    $(".proinfo-o2o").find(".item6").hide()
                }
            }})
    }, judgeIsShowRealExperience: function(a) {
        $.ajax({url: sn.itemDomain + "/pds-web/ajax/isExsitPrototypeInfo_" + a + "_" + sn.cityId + ".html", type: "get", async: false, dataType: "json", success: function(b) {
                if (b && b.isExsitPrototypeInfo) {
                    sn.storeServiceList += "realExperience|";
                    $(".proinfo-o2o").find(".item5").show();
                    $(".proinfo-o2o").show()
                } else {
                    $(".proinfo-o2o").find(".item5").hide()
                }
                iFourth.mainHeight()
            }})
    }, judgeIsShowSpotGoods: function(a) {
        $.ajax({url: "http://" + sn.domain + "/emall/mdjt_10052_10051_000000000" + a + "_" + sn.districtId + "_" + sn.vendor + "_CommonFourPage.storeService.processSpotGoods_.html", type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "CommonFourPage.storeService.processSpotGoods", success: function(b) {
            }})
    }, processSpotGoods: function(a) {
        if (a.mdjtsupport == "1") {
            sn.storeServiceList += "spotGoods|";
            $(".proinfo-o2o").find(".item2").show();
            $(".proinfo-o2o").show()
        } else {
            $(".proinfo-o2o").find(".item2").hide()
        }
        sn.sgComplete = true;
        iFourth.mainHeight()
    }, judgeIsShowVBuy: function() {
        sn.selectedDistrictId = typeof sn.selectedDistrictId == "undefined" ? "" : sn.selectedDistrictId;
        $.ajax({url: sn.storeServiceRoot + "pds/ajax/isSupportVStand-" + sn.cityId + "-" + sn.selectedDistrictId + "-" + sn.catenIds + "-CommonFourPage.storeService.vbuyCallBack.jsonp", type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "CommonFourPage.storeService.vbuyCallBack", success: function(a) {
            }})
    }, vbuyCallBack: function(a) {
        if (a.resultCode == "Y") {
            sn.storeServiceList += "vBuy|";
            $(".proinfo-o2o").find(".item3").show();
            $(".proinfo-o2o").show()
        } else {
            $(".proinfo-o2o").find(".item3").hide()
        }
        sn.vbComplete = true;
        iFourth.mainHeight()
    }, judgeIsShowFreeFilm: function() {
        $.ajax({url: sn.storeServiceRoot + "pds/ajax/isSupportM-" + sn.cityId + "-" + sn.catenIds + "-CommonFourPage.storeService.freeFilmCallBack.jsonp", type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "CommonFourPage.storeService.freeFilmCallBack", success: function(a) {
            }})
    }, freeFilmCallBack: function(a) {
        if (a.resultCode == "Y") {
            sn.storeServiceList += "freeFilm|";
            $(".proinfo-o2o").find(".item4").show();
            $(".proinfo-o2o").show()
        } else {
            $(".proinfo-o2o").find(".item4").hide()
        }
        sn.ffComplete = true;
        iFourth.mainHeight()
    }, judgeIsShowStoreService: function() {
        if (sn.storeServiceList == "") {
            $(".proinfo-o2o").hide()
        } else {
            $(".proinfo-o2o").show()
        }
        iFourth.mainHeight();
        sn.sgComplete = false;
        sn.vbComplete = false;
        sn.ffComplete = false
    }, afterShowPopPage: function(a) {
        fillInDistrictInfo(a);
        initServiceTab($(a).parent().attr("class"));
        refreshStoreList()
    }};
function fillInDistrictInfo(b) {
    $("#o2o_service_clone_li_districtId").siblings("li").remove();
    sn.selectedDistrictId = "";
    sn.selectedDistrictName = "";
    var a = sn.ipServiceHost + "/districtList-" + sn.mdmCityId + "-districtListCallback.htm";
    $.ajax({url: a, type: "GET", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "districtListCallback", success: function(i) {
            if (i && i != "" && i != null) {
                var g = i.districts;
                for (var f = 0;
                        f < g.length;
                        f++) {
                    var h = g[f];
                    var c = $("#o2o_service_clone_li_districtId").clone().removeAttr("style").removeAttr("id");
                    c.attr("districtId", h.commerceId);
                    c.find("a").text(h.name).attr("name", "item_" + sn.ninePartNumber + "_mdfw_qu");
                    $("#o2o_service_clone_li_districtId").parent().append(c);
                    c.removeClass()
                }
                iFourth.o2oPop.updateFilter()
            }
            var e = $(b).parent().attr("class");
            if (e == "item2") {
                $("#o2o_service_clone_li_districtId").removeClass("current").addClass("disable");
                sn.selectedDistrictId = sn.districtId;
                var j = $("#o2o_service_ul_districtList li:not(#o2o_service_clone_li_districtId)");
                $.each(j, function(l, k) {
                    if ($(k).attr("districtid") == sn.districtId) {
                        $(k).addClass("current").siblings().removeClass("current")
                    }
                })
            } else {
                $("#o2o_service_clone_li_districtId").removeClass("disable").addClass("current");
                sn.selectedDistrictId = ""
            }
            sn.selectedDistrictName = ""
        }});
    $("#o2o_service_ul_districtList li").die().live("click", function() {
        var c = $("#o2o_service_store_service_ul li.current").attr("id");
        if (!(c == "win_o2o_spotGoods" && $(this).attr("id") == "o2o_service_clone_li_districtId")) {
            $(this).addClass("current").siblings("li").removeClass("current");
            sn.selectedDistrictId = $(this).attr("districtId");
            sn.selectedDistrictName = $("#o2o_service_ul_districtList li.current a").html();
            if (sn.selectedDistrictName == "全部") {
                sn.selectedDistrictName = ""
            }
            refreshStoreList()
        }
    })
}
function initServiceTab(a) {
    var f = $(this);
    var e = sn.storeServiceList;
    if (e != "") {
        var c = e.split("|");
        $("li[id^='win_o2o_']").hide();
        for (var b in c) {
            $("#win_o2o_" + c[b]).show()
        }
    }
    $("#win_o2o_vBuy").parent().find("li").removeAttr("class");
    if (a == "item2") {
        sn.selectedStoreService = "spotGoods";
        $("#win_o2o_spotGoods").attr("class", "current")
    } else {
        if (a == "item5") {
            sn.selectedStoreService = "realExperience";
            $("#win_o2o_realExperience").attr("class", "current")
        } else {
            if (a == "item3") {
                sn.selectedStoreService = "vBuy";
                $("#win_o2o_vBuy").attr("class", "current")
            } else {
                if (a == "item4") {
                    sn.selectedStoreService = "freeFilm";
                    $("#win_o2o_freeFilm").attr("class", "current")
                } else {
                    if (a == "item6") {
                        sn.selectedStoreService = "guideShop";
                        $("#win_o2o_guideShop").attr("class", "current");
                        $("#win_o2o_guideShop").show()
                    } else {
                        sn.selectedStoreService = ""
                    }
                }
            }
        }
    }
    $("#o2o_service_store_service_ul").find("li").unbind().bind("click", function() {
        $(this).attr("class", "current");
        $(this).siblings("li").removeAttr("class");
        var g = $(this).attr("id");
        if (g == "win_o2o_spotGoods") {
            sn.selectedStoreService = "spotGoods";
            $("#win_o2o_spotGoods").attr("class", "current");
            a = "item2"
        } else {
            if (g == "win_o2o_realExperience") {
                sn.selectedStoreService = "realExperience";
                $("#win_o2o_realExperience").attr("class", "current");
                a = "item3"
            } else {
                if (g == "win_o2o_vBuy") {
                    sn.selectedStoreService = "vBuy";
                    $("#win_o2o_vBuy").attr("class", "current");
                    a = "item4"
                } else {
                    if (g == "win_o2o_freeFilm") {
                        sn.selectedStoreService = "freeFilm";
                        $("#win_o2o_freeFilm").attr("class", "current");
                        a = "item4"
                    } else {
                        if (g == "win_o2o_guideShop") {
                            sn.selectedStoreService = "guideShop";
                            $("#win_o2o_guideShop").attr("class", "current");
                            a = "item6";
                            $("#win_o2o_guideShop").show()
                        } else {
                            sn.selectedStoreService = ""
                        }
                    }
                }
            }
        }
        if (a == "item2" && sn.selectedDistrictId == "") {
            $("#o2o_service_clone_li_districtId").removeClass("current").addClass("disable").siblings("li").removeClass("current");
            var h = $("#o2o_service_ul_districtList li:not(#o2o_service_clone_li_districtId)");
            $.each(h, function(k, j) {
                if ($(j).attr("districtid") == sn.districtId) {
                    $(j).addClass("current").siblings().removeClass("current")
                }
            })
        } else {
            if (a == "item2") {
                $("#o2o_service_clone_li_districtId").removeClass().addClass("disable")
            } else {
                $("#o2o_service_clone_li_districtId").removeClass("disable")
            }
        }
        refreshStoreList()
    })
}
function refreshStoreList() {
    var a = this;
    $(".o2o-service-main").addClass("o2o-com-loading");
    $("#o2o-service-clone-storeList-li").siblings("li").remove();
    $("#win_o2o .no-shop").hide();
    $("#win_o2o .no-goods").hide();
    $("#win_o2o .o2o-service-main").show();
    if (sn.selectedStoreService == "realExperience") {
        invokeRealExperience()
    } else {
        if (sn.selectedStoreService == "spotGoods") {
            invokeShowSpotGoods()
        } else {
            if (sn.selectedStoreService == "vBuy") {
                invokeVBuy()
            } else {
                if (sn.selectedStoreService == "freeFilm") {
                    invokeFreeFilm()
                } else {
                    if (sn.selectedStoreService == "guideShop") {
                        invokeGuideShop()
                    } else {
                    }
                }
            }
        }
    }
}
var guideShopMarker = "";
function invokeGuideShop() {
    var a = "";
    if (sn.curSubPartNumber == undefined || sn.curSubPartNumber == "") {
        a = sn.partNumber
    } else {
        a = sn.curSubPartNumber
    }
    $.ajax({url: sn.itemDomain + "/pds-web/ajax/getGuideShop_" + a + "_" + sn.vendorCode + "_" + sn.mdmCityId + "_" + encodeURIComponent(sn.selectedDistrictName) + ".html", type: "get", cache: true, dataType: "json", success: function(f) {
            if (f && f.guideShopList && f.guideShopList.length != 0) {
                var g = f.guideShopList;
                var b = "";
                for (var c = 0;
                        c < g.length;
                        c++) {
                    $(".o2o-service-main").removeClass("o2o-com-loading");
                    var e = $("#o2o-service-clone-storeList-li").clone().removeAttr("id");
                    b += g[c].storeCode + ",";
                    e.attr("class", "storeId_" + g[c].storeCode);
                    $("#o2o-service-clone-storeList-li").parent().append(e)
                }
                if (b != "") {
                    b = b.substring(0, b.length - 1)
                }
                guideShopMarker = "Y";
                fillStoreDetailInfoByCode(b, "很抱歉，该区域暂无门店支持到店试穿服务，正努力开放中。。。");
                $("#win_o2o .no-shop").hide();
                $("#win_o2o .no-goods").hide();
                $("#win_o2o .o2o-service-main").show()
            } else {
                $("#win_o2o .no-goods").hide();
                $("#win_o2o .o2o-service-main").hide();
                $("#win_o2o .no-shop").text("很抱歉，该区域暂无门店支持到店试穿服务，正努力开放中。。。");
                $("#win_o2o .no-shop").show()
            }
            $(".o2o-service-main").removeClass("o2o-com-loading")
        }})
}
function invokeRealExperience() {
    var a = sn.selectedDistrictId == "" ? "-1" : sn.selectedDistrictId;
    $.ajax({url: sn.itemDomain + "/pds-web/ajax/getPrototypeInfo_" + sn.o2oNinePartNumber + "_" + sn.cityId + "_" + a + ".html", type: "get", async: false, dataType: "json", success: function(h) {
            if (h && h.storeInfoList && h.storeInfoList.length != 0) {
                var i = h.storeInfoList;
                var f = "";
                for (var e in i) {
                    $(".o2o-service-main").removeClass("o2o-com-loading");
                    var g = $("#o2o-service-clone-storeList-li").clone().removeAttr("id");
                    if (i[e].custNum != "") {
                        var b = sn.vendorCode == "" ? "0000000000" : sn.vendorCode;
                        var c = sn.yxImRoot + "webChat.htm?cityId=" + sn.cityId + "&clerkId=" + i[e].custNum + "&productId=" + sn.ninePartNumber;
                        g.find(".handle>a").html("咨询店员&gt;").attr("href", c).attr("name", "item_" + sn.ninePartNumber + "_mdfw_yundaogou");
                        g.find(".handle").show()
                    }
                    f += i[e].storeCode + ",";
                    g.attr("class", "storeId_" + i[e].storeCode);
                    $("#o2o-service-clone-storeList-li").parent().append(g)
                }
                if (f != "") {
                    f = f.substring(0, f.length - 1)
                }
                fillStoreDetailInfoByCode(f, "很抱歉，该区域暂无门店有样机，正努力出样中•••");
                $("#win_o2o .no-shop").hide();
                $("#win_o2o .no-goods").hide();
                $("#win_o2o .o2o-service-main").show()
            } else {
                $("#win_o2o .no-shop").hide();
                $("#win_o2o .o2o-service-main").hide();
                $("#win_o2o .no-goods").text("很抱歉，该区域暂无门店有样机，正努力出样中•••");
                $("#win_o2o .no-goods").show()
            }
            $(".o2o-service-main").removeClass("o2o-com-loading")
        }})
}
function invokeShowSpotGoods() {
    $.ajax({url: "http://" + sn.domain + "/emall/mdjtCmd?partnumber=000000000" + sn.o2oNinePartNumber + "&districtId=" + sn.selectedDistrictId + "&oprType=1&price=" + sn.promotionPrice, type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "spotGoodsCallBack", success: function(a) {
        }})
}
function spotGoodsCallBack(e) {
    if (e.rs && e.rs.length != 0) {
        var e = e.rs;
        var b = "";
        for (var a in e) {
            $(".o2o-service-main").removeClass("o2o-com-loading");
            var c = $("#o2o-service-clone-storeList-li").clone().removeAttr("id");
            c.find(".handle>a").html("马上自提&gt;").removeAttr("target").attr("href", "javascript:Cart.spotGoods('" + e[a].storeId + "');").attr("name", "item_" + sn.ninePartNumber + "_mdfw_mszt");
            c.find(".handle").show();
            b += e[a].storeId + ",";
            c.attr("class", "storeId_" + e[a].storeId);
            $("#o2o-service-clone-storeList-li").parent().append(c)
        }
        fillStoreDetailInfoByCode(b, "很抱歉，该区域暂无门店有货，正努力补货中•••");
        $("#win_o2o .no-shop").hide();
        $("#win_o2o .no-goods").hide();
        $("#win_o2o .o2o-service-main").show()
    } else {
        $("#win_o2o .no-shop").hide();
        $("#win_o2o .o2o-service-main").hide();
        $("#win_o2o .no-goods").text("很抱歉，该区域暂无门店有货，正努力补货中•••");
        $("#win_o2o .no-goods").show()
    }
    $(".o2o-service-main").removeClass("o2o-com-loading")
}
function invokeVBuy() {
    $.ajax({url: sn.storeServiceRoot + "pds/ajax/storeorderstand-" + sn.cityId + "-" + sn.selectedDistrictId + "-vbuyStoreDetailInfoCallback.jsonp", type: "GET", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "vbuyStoreDetailInfoCallback", success: function(c) {
            if (c.length != 0) {
                for (var a in c) {
                    $(".o2o-service-main").removeClass("o2o-com-loading");
                    var b = $("#o2o-service-clone-storeList-li").clone().removeAttr("id");
                    b.find(".handle>a").html("预约V购&gt;").attr("href", sn.storeServiceRoot + "v.htm").attr("name", "item_" + sn.ninePartNumber + "_mdfw_yuyuevgou");
                    b.find(".handle").show();
                    b.find("h5>a").text(c[a].storeName).attr("href", sn.storeServiceRoot + c[a].bwStoreNo + ".htm").attr("name", "item_" + sn.ninePartNumber + "_mdfw_store");
                    b.find("p").text("地址：" + c[a].storeAddress).attr("title", c[a].storeAddress);
                    b.removeAttr("style");
                    $("#o2o-service-clone-storeList-li").parent().append(b)
                }
                iFourth.o2oPop.updateContent();
                $("#win_o2o .no-shop").hide();
                $("#win_o2o .no-goods").hide();
                $("#win_o2o .o2o-service-main").show()
            } else {
                $("#win_o2o .no-goods").hide();
                $("#win_o2o .o2o-service-main").hide();
                $("#win_o2o .no-shop").text("很抱歉，该区域暂无门店支持V购服务，正努力开放中•••");
                $("#win_o2o .no-shop").show()
            }
            $(".o2o-service-main").removeClass("o2o-com-loading")
        }})
}
function invokeFreeFilm() {
    $.ajax({url: sn.storeServiceRoot + "pds/ajax/storeliststand-" + sn.cityId + "-" + sn.selectedDistrictId + "--freeFilmStoreDetailInfoCallback.jsonp", type: "GET", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "freeFilmStoreDetailInfoCallback", success: function(c) {
            if (c.length != 0) {
                for (var a in c) {
                    $(".o2o-service-main").removeClass("o2o-com-loading");
                    var b = $("#o2o-service-clone-storeList-li").clone().removeAttr("id");
                    b.find("h5>a").text(c[a].storeName).attr("href", sn.storeServiceRoot + c[a].bwStoreNo + ".htm").attr("name", "item_" + sn.ninePartNumber + "_mdfw_store");
                    b.find("p").text("地址：" + c[a].storeAddress).attr("title", c[a].storeAddress);
                    b.removeAttr("style");
                    $("#o2o-service-clone-storeList-li").parent().append(b)
                }
                iFourth.o2oPop.updateContent();
                $("#win_o2o .no-shop").hide();
                $("#win_o2o .no-goods").hide();
                $("#win_o2o .o2o-service-main").show()
            } else {
                $("#win_o2o .no-goods").hide();
                $("#win_o2o .o2o-service-main").hide();
                $("#win_o2o .no-shop").text("很抱歉，该区域暂无门店支持贴膜服务，正努力开放中•••");
                $("#win_o2o .no-shop").show()
            }
            $(".o2o-service-main").removeClass("o2o-com-loading")
        }})
}
function fillStoreDetailInfoByCode(b, a) {
    $.ajax({url: sn.storeServiceRoot + "pds/ajax/storeinfo-" + b + "-storeDetailInfoCallback.jsonp", type: "GET", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "storeDetailInfoCallback", success: function(e) {
            for (var c in e) {
                var f = $(".o2o-service-main").find("li.storeId_" + e[c].bwStoreNo);
                if (guideShopMarker == "Y") {
                    f.find("h5").html("<i class='icon'></i><span>" + e[c].storeName + "</span>")
                } else {
                    f.find("h5>a").text(e[c].storeName).attr("href", sn.storeServiceRoot + e[c].bwStoreNo + ".htm").attr("name", "item_" + sn.ninePartNumber + "_mdfw_store")
                }
                f.find("p").text("地址：" + e[c].storeAddress).attr("title", e[c].storeAddress);
                f.removeAttr("style")
            }
            guideShopMarker = "";
            if ($(".o2o-service-main").find("li:visible").length == 0) {
                $("#win_o2o .no-shop").hide();
                $("#win_o2o .o2o-service-main").hide();
                $("#win_o2o .no-goods").text(a);
                $("#win_o2o .no-goods").show()
            }
            iFourth.o2oPop.updateContent()
        }})
}
var Renxf = Renxf || {};
Renxf.freenessInfo = "";
Renxf.turnGrayFlag = "N";
Renxf.loginFlag = "N";
Renxf.buttonId = "";
Renxf.buttonClass = "";
Renxf.runFlag = "N";
Renxf.freenessPay = function() {
    if ((sn.isPreBuy != 2 && sn.renxfSwitch == "1") || sn.groupFlag) {
        var a = sn.itemDomain + "/pds-web/ajax/getFreenessPayInfoNew_" + sn.promotionPrice + "_" + sn.vendorCode + "_" + sn.partNumber + ".html";
        if (sn.prdType == "S") {
            a = sn.itemDomain + "/pds-web/ajax/getFreenessPayInfoNew_" + sn.promotionPrice + "_" + sn.vendorCode + "_" + sn.curSubPartNumber + ".html"
        }
        if (sn.groupFlag) {
            a = sn.itemDomain + "/pds-web/ajax/getFreenessPayInfoNew_" + sn.groupPromotionPrice + "_" + sn.vendorCode + "_" + sn.groupPartnumber + ".html"
        }
        if (typeof (probeAuthStatus) == "function") {
            probeAuthStatus(function() {
                $.ajax({url: a, type: "get", async: false, dataType: "json", success: function(b) {
                        Renxf.freenessInfo = b;
                        $.ajax({type: "get", url: sn.rxfCompetency, cache: true, async: false, dataType: "jsonp", jsonpCallback: "Renxf.rxfCompetencyCallBack", success: function() {
                            }})
                    }, error: function() {
                        $("#freenessPay").hide();
                        iFourth.mainHeight()
                    }})
            }, function() {
                $.ajax({url: a, type: "get", async: false, dataType: "json", success: function(b) {
                        Renxf.freenessInfo = b;
                        Renxf.haveNoFreeness(b)
                    }, error: function(b) {
                        $("#freenessPay").hide();
                        iFourth.mainHeight()
                    }})
            })
        }
    }
};
Renxf.haveFreeness = function(e) {
    if (e != null && e != "" && e.freenessPay != undefined && e.freenessPay != "") {
        var f = e.freenessPay;
        var a = "";
        for (var b = 0;
                b < f.length;
                b++) {
            var c = f[b].payPeriods;
            if (c != "" && c.length == 2 && c.substring(0, 1) == "0") {
                c = c.substring(1, 2)
            }
            if (f[b].payAccrual == 0) {
                var g = c + "期";
                if (c == "1") {
                    g = "30天免息";
                    a += '<li data-id="' + c + '" class="renxf-item renxf-item-mianxi"><a href="javascript:void(0);" class="btn-fenqi" name="item_' + sn.ninePartNumber + "_gmq_rxffqfs" + c + '">' + g + "<br><span>(0手续费)</span><i></i></a></li>"
                } else {
                    g = f[b].payAmt + "×" + g;
                    a += '<li data-id="' + c + '" class="renxf-item"><a href="javascript:void(0);" class="btn-fenqi" name="item_' + sn.ninePartNumber + "_gmq_rxffqfs" + c + '">' + g + "<br><span>(0手续费)</span><i></i></a></li>"
                }
            } else {
                a += '<li data-id="' + c + '" class="renxf-item"><a href="javascript:void(0);" class="btn-fenqi" name="item_' + sn.ninePartNumber + "_gmq_rxffqfs" + c + '">¥' + f[b].payAmt + "×" + c + "期<br><span>（含手续费）</span><i></i></a></li>"
            }
        }
        if (f.length > 0) {
            a += '<li class="renxf-btn"><a id="rxffq" href="javascript:Renxf.buyNowFreenessPay();" class="btn-fenqi" name="item_' + sn.ninePartNumber + '_gmq_rxfwyfq"></a><a id="rxfmx" href="javascript:Renxf.buyNowFreenessPay();" class="btn-mianxi" style="display:none;" name="item_' + sn.ninePartNumber + '_gmq_rxfwymx"></a></li>'
        }
        if (a != "") {
            $("#freenessInfo").html(a);
            $("#freenessInfo").show();
            $("#freenessPay").show();
            $("#freenessUnable").hide();
            iFourth.renxingfu()
        }
    }
    if (sn.silenceType == "Y" || sn.cuxiaoSoldOut == "Y") {
        $("#freenessPay").hide()
    }
    iFourth.mainHeight()
};
Renxf.haveNoFreeness = function(e) {
    if (e != null && e != "" && e.freenessPay != undefined && e.freenessPay != "") {
        var f = e.freenessPay;
        var a = "";
        for (var b = 0;
                b < f.length;
                b++) {
            var c = f[b].payPeriods;
            if (c != "" && c.length == 2 && c.substring(0, 1) == "0") {
                c = c.substring(1, 2)
            }
            if (f[b].payAccrual == 0) {
                var g = c + "期";
                if (c == "1") {
                    g = "30天免息"
                } else {
                    g = f[b].payAmt + "×" + g
                }
                a += '<li class="renxf-item renxf-item-mianxi"><a href="javascript:void(0);">' + g + "<br><span>(0手续费)</span><i></i></a></li>"
            } else {
                a += '<li class="renxf-item"><a href="javascript:void(0);">¥' + f[b].payAmt + "×" + c + "期<br><span>（含手续费）</span><i></i></a></li>"
            }
        }
        if (f.length > 0) {
            a += '<li class="renxf-btn"><a href="javascript:void(0);" class="btn-fenqi-disable"></a></li>'
        }
        if (a != "") {
            $("#freenessUnable").html(a);
            $("#freenessUnable").show();
            $("#freenessLogin").show();
            $("#freenessOpen").hide();
            $("#freenessInfo").hide();
            $("#freenessPay").show();
            iFourth.renxingfu()
        }
    }
    if (sn.silenceType == "Y" || sn.cuxiaoSoldOut == "Y") {
        $("#freenessPay").hide()
    }
    iFourth.mainHeight()
};
Renxf.rxfCompetencyCallBack = function(a) {
    if (a != "" && a.accountState != undefined) {
        if (a.accountState == "00") {
            if (PriceShow.status != undefined && PriceShow.status == 1) {
                Renxf.turnGrayAtLogin()
            } else {
                if (Renxf.turnGrayFlag != "S") {
                    $("#freenessLogin").hide();
                    $("#freenessOpen").hide();
                    Renxf.haveFreeness(Renxf.freenessInfo);
                    if (Renxf.loginFlag == "Y") {
                        Renxf.withoutFreight()
                    }
                    if (Renxf.turnGrayFlag == "Y") {
                        Renxf.turnGrayAtLogin()
                    }
                }
            }
        } else {
            if (a.accountState == "01") {
                Renxf.haveNoFreeness(Renxf.freenessInfo);
                $("#freenessLogin").hide();
                $("#freenessOpen").show()
            } else {
                if (a.accountState == "02") {
                    $("#freenessPay").hide()
                }
            }
        }
    } else {
        $("#freenessPay").hide()
    }
    iFourth.mainHeight()
};
Renxf.login = function() {
    $("body").AjaxLogin({success: function() {
            if (sn.isPreBuy != "1" && sn.promotionPrice != "" && sn.promotionPrice != undefined) {
                if (sn.invStatus == "0" || sn.invStatus == "2" || sn.invStatus == "3") {
                    Renxf.turnGray()
                } else {
                    Renxf.loginFlag = "Y";
                    Renxf.freenessPay()
                }
            }
        }})
};
Renxf.turnGray = function() {
    if (Renxf.freenessInfo == "") {
        Renxf.turnGrayFlag = "Y"
    } else {
        Renxf.turnGrayFlag = "S";
        Renxf.haveNoFreeness(Renxf.freenessInfo);
        $("#freenessOpen").hide();
        $("#freenessLogin").hide();
        $("#freenessPay").hide()
    }
    iFourth.mainHeight()
};
Renxf.turnGrayAtLogin = function() {
    Renxf.haveNoFreeness(Renxf.freenessInfo);
    $("#freenessPay").hide();
    $("#freenessLogin").hide();
    $("#freenessPay").hide();
    iFourth.mainHeight()
};
Renxf.withoutFreight = function() {
    if (sn.prdType == "S") {
        if (sn.vendorCode == "") {
            if (sn.shipOffSet < 0 || typeof sn.shipOffSet == "undefined") {
                Renxf.turnGrayAtLogin()
            }
        } else {
            if (sn.shippingCharge == "-1" || typeof sn.shippingCharge == "undefined") {
                Renxf.turnGrayAtLogin()
            }
        }
    } else {
        if (sn.vendorCode == "") {
            if (sn.shipOffSet < 0 || typeof sn.shipOffSet == "undefined") {
                Renxf.turnGrayAtLogin()
            }
        } else {
            if (sn.freight == "-1" || typeof sn.freight == "undefined") {
                Renxf.turnGrayAtLogin()
            }
        }
    }
    Renxf.loginFlag == "N"
};
CommonFourPage.aftermarket = function(a) {
    if (sn.catalogId == 22001) {
        return
    }
    var f = "";
    f += '<div class="after-market-hd" id="suningService"><h4>售后服务</h4></div>';
    f += '<div class="after-market-cnt">';
    f += '<div class="guarantees">';
    f += '<p id="productService">' + a + "</#if></p>";
    f += "<p>苏宁易购向您保证所售商品均为正品行货，与您亲临商场选购的商品享受相同的质量保证。本站为您提供具有竞争力的商品价格和服务保障，请放心购买！</p>";
    f += "<p>注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p>";
    f += "</div>";
    f += "</div>";
    f += '<div class="after-market-hd">';
    f += '<h4>退换货流程</h4><span class="opt"><a href="' + sn.amDetailLink + '" target="_blank">' + sn.amDetail + "</a></span>";
    f += "</div>";
    f += '<div class="after-market-cnt">';
    f += '<div class="return-process"><img width="760" height="140" alt="退换货流程图" lazy-src="' + sn.amPdsRelation + 'images/return-process.jpg"></div>';
    f += "</div>";
    f += '<div class="after-market-hd"><h4>温馨提示</h4></div>';
    f += '<div class="after-market-cnt">';
    f += '<div class="declare">';
    f += "<p>1、网站为您提供的送货、安装、维修等服务可能需收取一定的服务费和远程费；</p>";
    f += "<p>2、服务中可能涉及的材料费请以服务工程师出示的报价单为准；</p>";
    f += '<p>3、亲爱的顾客，苏宁承诺所售产品均为正品，如您购物环节遇到任何问题，请第一时间<a target="_blank" href="http://online.suning.com/webchat/index.jsp?url=https%3A%2F%2Fmember.suning.com%2Femall%2FMyGiftTicket%3FstoreId%3D10052%26catalogId%3D10051%26URL%3DMyGiftTicket&h=%E8%B4%A6%E6%88%B7%E7%AE%A1%E7%90%86_%E6%88%91%E7%9A%84%E6%98%93%E8%B4%AD%E5%88%B8">联系客服人员</a>，我们会尽心为您处理问题。';
    f += "<p>4、请您收货后与快递人员一起开箱验货，确保产品完好，生产日期认可。如有问题请当场拒收。</p>";
    f += "</div>";
    f += '<div class="after-market-hd">';
    f += "<h4>特别声明</h4>";
    f += "</div>";
    f += '<div class="after-market-cnt">';
    f += '<div class="declare"><p>本站商品信息均来自苏宁自营商品，其真实性、准确性和合法性由信息拥有者（厂商）负责。本站不提供任何保证，并不承担任何法律责任。因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，我司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。网站商品的功能参数仅供参考，请以实物为准，我司只能确保网站经营商品均为原厂正品行货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，敬请谅解！</p></div>';
    f += "</div>";
    if ($("#suningService").length == 0) {
        $("#snAftermarket").after(f)
    }
    var c = "";
    c += '<div class="after-market-hd">';
    c += "<h4>售后服务</h4>";
    c += "</div>";
    c += '<div class="after-market-cnt">';
    c += '    <div class="guarantees">';
    c += '        <p id="cProductService"></p>';
    c += "    </div>";
    c += "</div>";
    c += '<div class="after-market-hd">';
    c += "    <h4>退货流程</h4>";
    c += '    <span class="opt"><a href="' + sn.amDetailLink + '" target="_blank">' + sn.amDetail + "</a></span>";
    c += "</div>";
    c += '<div class="after-market-cnt">';
    c += '    <div class="return-process">';
    c += '        <img width="760" height="300" lazy-src="' + sn.amPdsRelation + 'images/return-process-cd.jpg" alt="退换货流程图" />';
    c += "    </div>";
    c += "</div>";
    c += '<div class="after-market-hd">';
    c += "    <h4>温馨提示</h4>";
    c += "</div>";
    c += '<div class="after-market-cnt">';
    c += '    <div class="declare">';
    c += "        <p>亲爱的顾客，为保障您的权益，请您对配送商品查验确认合格后签收，如有问题，请及时与商家联系。如需退货，请将包装一并寄回哦。</p>";
    c += "    </div>";
    c += "</div>";
    c += '<div class="after-market-hd">';
    c += "    <h4>特别声明</h4>";
    c += "</div>";
    c += '<div class="after-market-cnt">';
    c += '    <div class="declare">';
    c += "        <p>本站商品信息均来自于苏宁云台商家，其真实性、准确性和合法性由信息发布者（商家）负责。本站不提供任何保证，并不承担任何法律责任。因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本站不能确保客户收到的货物与网站图片、产地、附件说明完全一致，网站商品的功能参数仅供参考，请以实物为准。若本站没有及时更新，请您谅解！</p>";
    c += "    </div>";
    c += "</div>";
    $("#cService").html(c);
    var e = "";
    e += '<div class="after-market-hd" id="swlSuningService"><h4>售后服务</h4></div>';
    e += '	<div class="after-market-cnt">';
    e += '		<div class="guarantees">';
    e += "		<p>本商家商品保证正品行货，严格按照国家三包政策提供售后服务，因质量问题或实物与描述不符产生的退换货服务运费由本店承担。</p>";
    e += "        <p>注：因厂家会在没有任何提前通知的情况下更改产品包装、产地或者一些附件，本司不能确保客户收到的货物与商城图片、产地、附件说明完全一致。只能确保为原厂正货！并且保证与当时市场上同样主流新品一致。若本商城没有及时更新，请大家谅解！</p>";
    e += "	</div>";
    e += "</div>";
    e += '	<div class="after-market-hd">';
    e += '		<h4>退换货流程</h4><span class="opt"><a href="' + sn.amDetailLink + '" target="_blank">' + sn.amDetail + "</a></span>";
    e += "	</div>";
    e += '<div class="after-market-cnt">';
    e += '	<div class="return-process"><img width="760" height="140" alt="退换货流程图" lazy-src="' + sn.amPdsRelation + 'images/return-process.jpg"></div>';
    e += "</div>";
    e += '<div class="after-market-hd"><h4>温馨提示</h4></div>';
    e += '	<div class="after-market-cnt">';
    e += '	<div class="declare">';
    e += "	<p>1、网站为您提供的送货、安装、维修等服务可能需收取一定的服务费和远程费；</p>";
    e += "	<p>2、服务中可能涉及的材料费请以服务工程师出示的报价单为准；</p>";
    e += '	<p>3、如存在收费争议，可咨询<a target="_blank" href="http://online.suning.com/webchat/index.jsp?url=https%3A%2F%2Fmember.suning.com%2Femall%2FMyGiftTicket%3FstoreId%3D10052%26catalogId%3D10051%26URL%3DMyGiftTicket&h=%E8%B4%A6%E6%88%B7%E7%AE%A1%E7%90%86_%E6%88%91%E7%9A%84%E6%98%93%E8%B4%AD%E5%88%B8">在线客服</a>。</p></div>';
    e += "</div>";
    if ($("#swlSuningService").length == 0) {
        $("#swlAftermarket").after(e)
    }
    var b = "";
    b += '<div class="after-market-hd"><h4>售后服务</h4></div>';
    b += '	<div class="after-market-cnt">';
    b += '		<div class="guarantees">';
    b += "		<p>本店商品享有正品保障，因质量问题或实物与描述不符产生的退换货服务运费由商家承担</p>";
    b += "	</div>";
    b += "</div>";
    b += '	<div class="after-market-hd">';
    b += '		<h4>退换货流程</h4><span class="opt"><a name="' + sn.amAbroadName + '" href="' + sn.amAbroadDetailLink + '" target="_blank">' + sn.amAbroadDetail + "</a></span>";
    b += "	</div>";
    b += '	<div class="after-market-cnt">';
    b += '		<div class="return-process"><img width="760" height="250" alt="退换货流程图" lazy-src="' + sn.amPdsRelation + 'images/return-process-oversea.jpg"></div>';
    b += "	</div>";
    b += '	<div class="after-market-hd"><h4>温馨提示</h4></div>';
    b += '	<div class="after-market-cnt">';
    b += '	    <div class="declare">';
    b += "	<p>亲爱的顾客，为保障您的权益，请您对配送商品查验确认合格后签收，如有问题，请及时与商家联系。如需退货，请将包装一并寄回哦。</p>";
    b += "	</div>";
    b += "</div>";
    b += '<div class="after-market-hd">';
    b += "    <h4>特别声明</h4>";
    b += "</div>";
    b += '<div class="after-market-cnt">';
    b += '    <div class="declare">';
    b += "        <p>苏宁易购为第三方网络交易平台，苏宁海外购的商品信息均由海外购商家自行发布，其真实性、准确性和合法性由海外购商家负责。苏宁易购对此不提供任何保证，也不承担任何法律责任。苏宁易购提醒用户购买商品/服务前注意谨慎核实。如用户对商品/服务的标题、价格、详情等任何信息有任何疑问的，请在购买前通过与商家沟通确认；如用户发现店铺内有任何违法信息，请向苏宁客服举报并提供有效依据。</p>";
    b += "    </div>";
    b += "</div>";
    $("#hwgService").html(b);
    lazyelem.listen()
};
function processShopCategory(b) {
    if (b != null && b.ctype == "1") {
        var c = "";
        var a = sn.vendorCode;
        $.each(b.categoryList, function(f, g) {
            if (g.cgrade == "2") {
                c += g.dshow == "0" ? '<dl class="on">' : "<dl>";
                var h = sn.shopPath + sn.shopMainPh + "/" + a.substring(2) + "/list_" + g.cid + "_1.html";
                var e = sn.point + "_" + sn.partNumber.substring(9) + "_cata_fcata" + ((f + 1) > 10 ? (f + 1) : ("0" + f));
                if (typeof g.curl != "undefined" && g.curl != "") {
                    c += '<dt class="type-img"><a target="_blank" href="javascript:void(0);" class="folder"></a>';
                    c += '<a name="' + e + '" target="_blank" href="' + h + '">';
                    c += '<img src="' + g.curl + '" alt="' + g.cname + '"></a></dt>'
                } else {
                    c += '<dt><a href="javascript:void(0);" class="folder"></a>';
                    c += '<a name="' + e + '" target="_blank" href="' + h + '">' + g.cname + "</a></dt>"
                }
                if (typeof g.curl != "undefined" && g.curl != "") {
                    c += '<dd class="type-img-detail"><ul class="type-list-img">';
                    $.each(b.categoryList, function(k, i) {
                        if (i.pid == g.pid && (typeof i.curl != "undefined" && i.curl != "") && i.cgrade == "3") {
                            var m = sn.shopPath + sn.shopMainPh + "/" + a.substring(2) + "/list_" + i.cid + "_1.html";
                            var l = sn.point + "_" + sn.partNumber.substring(9) + "_cata_fcata" + ((k + 1) > 10 ? (k + 1) : ("0" + k));
                            c += '<li><a name="' + l + '" title="' + i.cname + '" target="_blank" href="' + m + '">';
                            c += '<img src="' + i.curl + '" alt="' + i.cname + '"></a></li>'
                        }
                    });
                    c += "</ul>"
                } else {
                    c += "<dd>"
                }
                c += '<ul class="type-list">';
                $.each(b.categoryList, function(j, i) {
                    if (i.pid == g.pid && (typeof i.curl == "undefined" || i.curl == "") && i.cgrade == "3") {
                        var m = sn.shopPath + sn.shopMainPh + "/" + a.substring(2) + "/list_" + i.cid + "_1.html";
                        var l = sn.point + "_" + sn.partNumber.substring(9) + "_cata_fcata" + ((j + 1) > 10 ? (j + 1) : ("0" + j));
                        c += '<li><a name="' + l + '" title="' + i.cname + '" target="_blank" href="' + m + '">' + i.cname + "</a></li>"
                    }
                });
                c += "</ul></dd></dl>"
            }
        });
        $(".sfsDIV .type-sort").after(c);
        if (c != "") {
            $(".sfsDIV").attr("id", "shopSort").show();
            $(".searchDIV").attr("id", "").hide();
            iFourth.detailSide()
        } else {
            $(".sfsDIV").attr("id", "").hide();
            $(".searchDIV").attr("id", "shopSort").show()
        }
    } else {
        $(".sfsDIV").attr("id", "").hide();
        $(".searchDIV").attr("id", "shopSort").show()
    }
}
Recommend.yushouSaPageView = function(a) {
};
Recommend.saPageView = function() {
    try {
        if (_saPageViewInit && (typeof (_saPageViewInit)).toLowerCase() == "function") {
            _saPageViewInit()
        }
    } catch (a) {
    }
};
function getDeliveryInstallfunction(b, e, c) {
    var a = "http://" + sn.cartHost + "/webapp/wcs/stores/servlet/disc_10052_10051_" + sn.cityId + "_" + sn.districtId + "_" + b + "_" + e + "_deliveryInstallList_.html";
    $.ajax({url: a, cache: true, dataType: "jsonp", jsonpCallback: c, success: function(f) {
        }})
}
function deliveryInstall(b) {
    var c = b.deliveryInstallList;
    if (c != undefined && c.length > 0) {
        var e = c[0];
        var a = e.flag;
        if (a != "" && a == "1") {
            $("#szyt").show()
        }
    }
}
function getCookieBonus(c) {
    var e = document.cookie.split(";");
    for (var b = 0;
            b < e.length;
            b++) {
        var a = e[b].split("=");
        if ($.trim(a[0]) == c) {
            return a[1]
        }
    }
    return null
}
function lingquan(c) {
    var b = "";
    var a = "";
    var e = "";
    if (typeof bd != "undefined" && bd && bd != "undefined") {
        b = bd.rst();
        a = getCookieBonus("_device_session_id");
        e = "&detect=" + b + "&token=" + a
    }
    return c + e
}
function getConServationInfo(b, c) {
    var a = sn.itemDomain + "/pds-web/ajax/getConServationInfo_" + b + "_" + sn.lesCityId + ".html";
    $.ajax({url: a, cache: true, dataType: "jsonp", jsonpCallback: c, success: function(e) {
        }})
}
function conServationInfoBack(a) {
    var b = a.queryStat;
    if (b != undefined) {
        if (b != "" && b == "01") {
            $("#jnbtBox").html(scmInfo.jnbtDetail + "<a href='" + scmInfo.jnbtUrl + "' target='_blank' class='b'>  详情</a>");
            $("#jnbtTitle").show();
            $("#allcuxiao").show()
        }
    }
}
function getOldForNew(g) {
    var a = sn.oldForNewBrandIds;
    var f = false;
    if (typeof a != "undefined" && a != null && a != "") {
        var e = a.split(",");
        for (var c = 0;
                c < e.length;
                c++) {
            if (sn.brandId.indexOf(e[c]) >= 0) {
                f = true;
                break
            }
        }
    }
    if (f) {
        var b = sn.ecsDomain + "/fourstage/checkhx.do?brandId=" + sn.brandId;
        $.ajax({url: b, cache: true, dataType: "jsonp", jsonpCallback: g, success: function(h) {
            }})
    }
}
function oldForNewShow(a) {
    var b = a.msg;
    if (typeof b != "undefined" && b != "" && b == "Y") {
        $("#yjhx").show()
    }
}
function getDeliveryInfoAble(c, f, g) {
    if (sn.cmmdtyType == "ZSRV" || sn.cmmdtyType == "ZSRW") {
        var e = {};
        e.shipOffSet = "0";
        e.inventoryText = "";
        e.shipOffSetText = "&nbsp;";
        if (sn.invStatus == "1" || sn.invStatus == "4") {
            getDeliveryInfoAging(c)
        }
        f(e)
    } else {
        if (sn.phoneFlag == "Y" && sn.notSaleFlag) {
            var e = {};
            e.shipOffSet = "-1";
            e.inventoryText = "";
            e.shipOffSetText = "";
            f(e)
        } else {
            var a = getDeliveryProductInfo(c);
            var b = sn.solpUrl + "/solp/http/SOLP10101_PDS_10_" + a + "_queryB2cDeliverable.htm";
            $.ajax({url: b, cache: true, dataType: "jsonp", jsonpCallback: "showB2cDeliverable", success: function(h) {
                    var i = {};
                    if (h && h.successFlag == "Y" && h.deliverableFlag == "Y") {
                        i.shipOffSet = "0";
                        i.inventoryText = "";
                        i.shipOffSetText = "&nbsp;";
                        if (sn.invStatus == "1" || sn.invStatus == "4") {
                            getDeliveryInfoAging(c)
                        }
                    } else {
                        i.shipOffSet = "-1";
                        i.inventoryText = "";
                        i.shipOffSetText = ""
                    }
                    f(i)
                }, error: function() {
                    g()
                }})
        }
    }
}
function getDeliveryInfoAging(c) {
    var a = getDeliveryProductInfo(c, "1");
    var b = sn.solpUrl + "/solp/http/SOLP10104_PDS_10_" + a + "_queryB2cAging.htm";
    $.ajax({url: b, cache: true, dataType: "jsonp", jsonpCallback: "showB2cAging", success: function(e) {
            if (e && e.successFlag == "Y") {
                getDeliveryText(e)
            }
        }, error: function() {
        }})
}
function getDeliveryProductInfo(k, i) {
    var g = "";
    var a = "1";
    if (sn.manageInvFlag == "0") {
        a = "0"
    }
    if (sn.factorySendFlag == "1") {
        a = "3"
    }
    var j = sn.vendor;
    if (j && j.length == 10) {
        j = j.substring(2, 10)
    }
    if (typeof sn.accountPlace != "undefined" && sn.accountPlace.substring(0, 1) == "Z") {
        storeAddress1 = sn.accountPlace;
        storeAddress2 = sn.ownerPlace
    } else {
        storeAddress1 = sn.ownerPlace;
        if (sn.accountPlace == "") {
            storeAddress2 = sn.ownerPlace
        } else {
            storeAddress2 = sn.accountPlace
        }
    }
    var l = sn.deptNo;
    var m = "";
    if (sn.swlShopFlag) {
        m = sn.nowDate;
        accountPlace = sn.ownerPlace;
        l = "0001";
        a = "0"
    } else {
        var c = new Date(parseInt(sn.sendAvalidTime.toString()));
        var f = (c.getMonth() + 1) > 9 ? (c.getMonth() + 1) : "0" + (c.getMonth() + 1);
        var b = c.getDate() > 9 ? c.getDate() : "0" + c.getDate();
        m = "" + c.getFullYear() + f + b
    }
    var e = sn.lesCityId + sn.lesDistrictId + "01";
    if (i == 1) {
        var h = "DEFU";
        if (sn.cmmdtyType == "ZSRV" || sn.cmmdtyType == "ZSRW") {
            h = sn.cmmdtyType
        }
        g = k + "_" + h + "_01_" + a + "_" + storeAddress1 + "_" + storeAddress2 + "_" + l + "_" + e + "_" + j + "_" + sn.lesCityId + "_" + m
    } else {
        g = k + "_01_" + a + "_" + storeAddress1 + "_" + storeAddress2 + "_" + l + "_" + e + "_" + j + "_" + sn.lesCityId + "_" + m
    }
    return g
}
function getDeliveryText(a) {
    if (a) {
        var b = sn.itemDomain + "/pds-web/ajax/getLogisticsPrescriptionText_" + a.earliestArriveDate + "_" + a.earliestArriveTime + "_" + a.currentDayFlag + "_" + a.nearestCuttime + "_" + sn.invStatus + ".html";
        $.ajax({url: b, cache: true, dataType: "jsonp", jsonpCallback: "logisticsPrescription", success: function(e) {
                if (e && e.prescription && sn.shipOffSetText == "&nbsp;") {
                    sn.shipOffSetText = e.prescription.shipOffSetText;
                    sn.inventoryText = e.prescription.inventoryText;
                    if (typeof initGetDeliveryText == "function") {
                        initGetDeliveryText()
                    } else {
                        if (sn.prdType == "S") {
                            var c = $("#shipInfo").html();
                            if (c == "&nbsp;") {
                                $("#invInfo").html(e.prescription.inventoryText);
                                $("#shipInfo").html(e.prescription.shipOffSetText)
                            }
                        } else {
                            var c = $("#nowProduct").html();
                            if (c == "&nbsp;") {
                                $("#c_kucun").html(e.prescription.inventoryText);
                                $("#nowProduct").html(e.prescription.shipOffSetText)
                            }
                        }
                    }
                }
            }, error: function() {
            }})
    }
}
function getCShopDeliveryText(b) {
    if (b) {
        var a = sn.itemDomain + "/pds-web/ajax/getCLogicText_" + b + ".html";
        $.ajax({url: a, cache: true, dataType: "jsonp", jsonpCallback: "logisticsCShopPrescription", success: function(e) {
                if (e && e.shipOffSetText != "undefined" && e.shipOffSetText != "") {
                    if (sn.prdType == "S") {
                        var c = $("#shipInfo").html();
                        if (c == "&nbsp;") {
                            $("#shipInfo").html(e.shipOffSetText)
                        }
                    } else {
                        var c = $("#nowProduct").html();
                        if (c == "&nbsp;") {
                            $("#nowProduct").html(e.shipOffSetText)
                        }
                    }
                }
            }, error: function() {
            }})
    }
}
;