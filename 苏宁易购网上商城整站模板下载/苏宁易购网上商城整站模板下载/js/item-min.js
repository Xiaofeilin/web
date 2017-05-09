var FourPage = FourPage || {};
var PriceShow = PriceShow || {};
var Recommend = Recommend || {};
var Cart = Cart || {};
var YuShou = YuShou || {};
var shopInfoList = shopInfoList || {};
sn.cFreightFreeFlag = false;
sn.saleStatus = 0;
sn.groupType = 0;
sn.chanCity = true;
sn.status = false;
sn.groupFlag = false;
sn.promoCount = 0;
sn.ychf = "";
sn.gjrw = "";
sn.snslt = 0;
sn.snsltFare = 0;
sn.invStatus = "";
sn.barePhoneDesc = "";
sn.promotionDesc = "";
sn.promItemDesc = "";
sn.storeServiceList = "";
sn.selectedDistrictId = "";
sn.selectedStoreService = "";
sn.itemSource = "";
sn.isPavilion = false;
var phoneTyFlg = false;
var cshopHtml = "";
var cshopDesc = "";
var cshopList = "";
var snShopFlag = false;
sn.TMFlag = false;
sn.priceLoad = false;
sn.hasGroupCmm = false;
sn.scodeType = "0";
sn.scode = false;
var remain = 0;
var isFareFree = 0;
var isExistshop = "";
var lazyElems;
FourPage.lazyElems = function() {
    lazyElems = iFourth.lazyAjax(".lazy-ajax", function(c, a, b) {
    })
};
FourPage.lazyFunction = function() {
    if (!sn.donateFlag) {
        if ($("#J-tieIn").length > 0) {
            lazyElems["J-tieIn"].enable = false;
            $("#J-tieIn").html('<div class=" loading-holder" ></div>')
        }
        lazyElems.hotRank.enable = false;
        $("#hotRank").html('<div class=" loading-holder" ></div>');
        $("#hotRank").show();
        lazyElems.buyAlsoBuy.enable = false;
        $("#buyAlsoBuy").html('<div class=" loading-holder" ></div>');
        $("#view_Also_ViewProduct").remove();
        $("#view_Also_BuyProduct").remove();
        $("#buy_Also_BuyProduct").remove();
        if ($("#J-slide1").length > 0) {
            lazyElems["J-slide1"].enable = false;
            $("#J-slide1").html('<div class=" loading-holder" ></div>')
        }
        lazyElems["J-historyList"].enable = false;
        $("#J-historyList").html('<div class=" loading-holder" ></div>');
        lazyElems["J-historyRec"].enable = false;
        $("#J-historyRec").html('<div class=" loading-holder" ></div>')
    }
    lazyElems.appraise.handle = FourPage.appraise;
    lazyElems.consult.handle = FourPage.consult
};
FourPage.initialize = function() {
    FourPage.initCity();
    FourPage.initCityButton();
    FourPage.makeRightPara();
    FourPage.commentJump();
    CommonFourPage.storeService.init()
};
FourPage.Recommend = function() {
    CommonFourPage.Recommend.getHotRank(sn.partNumber, "Recommend.callbackFunp");
    CommonFourPage.Recommend.getAlsoBuy(sn.partNumber, "Recommend.getRecomData");
    lazyElems["J-historyList"].handle = FourPage.showMyHistory;
    lazyElems["J-historyList"].enable = true
};
FourPage.initCity = function() {
    FourPage.getCity(function(a) {
        sn.cityId = a.cityCommerceId;
        sn.cityName = a.cityName;
        sn.districtId = a.districtCommerceId;
        sn.districtName = a.districtName;
        sn.provinceCode = a.provinceCommerceId;
        sn.provinceName = a.provinceName;
        $("#mdmProvinceId").val(sn.provinceCode);
        $("#mdmCityId").val(sn.cityId);
        $("#mdmDistrictId").val(sn.districtId);
        sn.mdmProvinceId = a.provinceMDMId;
        sn.mdmCityId = a.cityMDMId;
        sn.mdmDistrictId = a.districtMDMId;
        sn.lesCityId = a.cityLESId;
        sn.lesDistrictId = a.districtLESId;
        if (sn.lesCityId == null || sn.lesCityId == "null" || sn.lesCityId == "" || sn.lesDistrictId == null || sn.lesDistrictId == "null" || sn.lesDistrictId == "") {
            sn.lesCityId = "010";
            sn.lesDistrictId = "01"
        }
        if (sn.simBuyType == "3" || sn.simBuyType == "4") {
            simInitialize()
        } else {
            if (typeof scmInfo != "undefined" && sn.catenIds == scmInfo.broadBandId) {
                initBroadBrand()
            } else {
                if (sn.donateFlag) {
                    initDonate()
                } else {
                    initialize(sn.cityId)
                }
            }
        }
    })
};
FourPage.initCityButton = function() {
    $("#sncity").mCity({used: true, cityCb: function(a) {
        }, distCb: function(a) {
            clearTimeout(cDown);
            sn.districtName = a.district.name;
            sn.chanCity = false;
            sn.provinceCode = a.province.id;
            sn.districtId = a.district.cid;
            sn.districtName = a.district.name;
            $("#mdmProvinceId").val(sn.provinceCode);
            $("#mdmCityId").val(sn.cityId);
            $("#mdmDistrictId").val(sn.districtId);
            sn.mdmProvinceId = a.province.id;
            sn.mdmCityId = a.city.id;
            sn.mdmDistrictId = a.district.id;
            sn.lesCityId = a.city.lesId;
            sn.lesDistrictId = a.district.lesId;
            if (sn.shopType == "-1") {
                sn.vendorCode = "";
                sn.swlShopFlag = false;
                sn.hwgShopFlag = false
            }
            if (sn.simBuyType == "3" || sn.simBuyType == "4") {
                simInitialize()
            } else {
                if (typeof scmInfo != "undefined" && sn.catenIds == scmInfo.broadBandId) {
                    initBroadBrand()
                } else {
                    if (sn.donateFlag) {
                        initDonate()
                    } else {
                        initialize(a.city.id)
                    }
                }
            }
        }, getCity: function(a) {
        }, changeCb: function(a) {
            clearTimeout(cDown);
            sn.chanCity = false;
            isFareFree = 0;
            sn.provinceCode = a.province.id;
            sn.provinceName = a.province.name;
            sn.cityId = a.city.cid;
            sn.cityName = a.city.name;
            sn.districtId = a.district.cid;
            sn.districtName = a.district.name;
            $("#mdmProvinceId").val(sn.provinceCode);
            $("#mdmCityId").val(sn.cityId);
            $("#mdmDistrictId").val(sn.districtId);
            $("#shipOffset").val("-1");
            sn.mdmProvinceId = a.province.id;
            sn.mdmCityId = a.city.id;
            sn.mdmDistrictId = a.district.id;
            sn.lesCityId = a.city.lesId;
            sn.lesDistrictId = a.district.lesId;
            if (sn.shopType == "-1") {
                sn.vendorCode = "";
                sn.swlShopFlag = false;
                sn.hwgShopFlag = false
            }
            $(".proinfo-tip").hide();
            $(".luoji-tip").hide();
            if (sn.simBuyType == "3" || sn.simBuyType == "4") {
                simInitialize()
            } else {
                if (sn.catenIds == scmInfo.broadBandId) {
                    initBroadBrand()
                } else {
                    if (sn.donateFlag) {
                        initDonate()
                    } else {
                        initialize(a.city.cid)
                    }
                }
            }
            FourPage.lazyFunction();
            if (!sn.donateFlag) {
                FourPage.Recommend()
            }
        }})
};
FourPage.getCity = function(b) {
    var i = d("cityId");
    var h = d("SN_CITY");
    var e = d("districtId");
    var j = "";
    var a = "";
    var c = "";
    if (h != "" && h != null) {
        var g = h.split("_");
        if (g.length > 0) {
            j = g[3];
            c = g[4];
            a = g[5]
        }
    }
    if (i != "" && h != "" && i != j) {
        FourPage.IP(i, b)
    } else {
        if (h) {
            var f = FourPage.analyzeCookie(h);
            if (typeof c == "undefined" || c.length != 2) {
                FourPage.IP(i, b)
            } else {
                if (e != "" && a != "" && e == a) {
                    if (typeof b == "function") {
                        b(f)
                    }
                } else {
                    if (typeof b == "function") {
                        b(f)
                    }
                }
            }
        } else {
            FourPage.IP(i, b)
        }
    }
};
FourPage.IP = function(i, g) {
    var c = /^(\w*)(pre)(\w*)(.cnsuning.com)$/;
    var b = /^(\w*)(sit)(\w*)(.cnsuning.com)$/;
    var f = /^(\w*)(dev)(\w*)(.cnsuning.com)$/;
    var a = document.location.hostname;
    var h = "http://ipservice.suning.com";
    if (c.test(a)) {
        h = "http://ipservicepre.cnsuning.com"
    } else {
        if (b.test(a)) {
            h = "http://ipservicesit.cnsuning.com"
        } else {
            if (f.test(a)) {
                h = "http://ipservicesit.cnsuning.com"
            }
        }
    }
    var e = h + "/ipQuery.do";
    if (i) {
        e = h + "/ipQuery.do?cityId=" + i
    }
    $.ajax({type: "GET", url: e, cache: true, async: false, dataType: "jsonp", jsonpCallback: "cookieCallback1", success: function(j) {
            i = j.cityCommerceId;
            j.flag = "2";
            j.count = 0;
            var k = FourPage.cityInfoToString(j);
            FourPage.SetCookie("SN_CITY", k);
            FourPage.SetCookie("cityId", j.cityCommerceId);
            FourPage.SetCookie("districtId", j.districtCommerceId);
            if (typeof g == "function") {
                g(j)
            }
        }, error: function() {
            var j = {provinceName: "北京", cityName: "北京", districtName: "东城区", provinceCommerceId: "10", cityCommerceId: "9017", districtCommerceId: "10106", provinceMDMId: "10", cityMDMId: "1000000", districtMDMId: "10000001", cityLESId: "010", districtLESId: "01"};
            if (typeof g == "function") {
                g(j)
            }
        }})
};
FourPage.analyzeCookie = function(e) {
    var b = e.split("|");
    var a = null;
    if (b.length > 0) {
        var c = b[0].split("_");
        a = {};
        a.provinceMDMId = c[0];
        a.provinceCommerceId = c[0];
        a.cityLESId = c[1];
        a.cityMDMId = c[2];
        a.cityCommerceId = c[3];
        a.districtMDMId = c[4];
        a.districtLESId = c[4];
        a.districtCommerceId = c[5];
        a.flag = c[6];
        a.count = c[7]
    }
    return a
};
FourPage.cityInfoToString = function(a) {
    var b = "";
    b += a.provinceMDMId;
    b += "_";
    b += a.cityLESId;
    b += "_";
    b += a.cityMDMId;
    b += "_";
    b += a.cityCommerceId;
    b += "_";
    b += a.districtLESId;
    b += "_";
    b += a.districtCommerceId;
    b += "_";
    b += a.flag;
    b += "_";
    b += a.count;
    return b
};
FourPage.SetCookie = function(c, a) {
    var i = 365;
    var b = new Date;
    b.setTime(b.getTime() + i * 24 * 60 * 60 * 1000);
    document.cookie = c + "=" + escape(a) + ";path=/;domain=" + sn.cookieDomain + ";expires=" + b.toGMTString()
};
FourPage.itemMainTab = function() {
    iFourth.Tab(".procon .tabarea-items", ".procon .tabarea-content", function(c, a, b) {
        if (c.attr("id") == "J-procon-comment" || c.attr("id") == "J-procon-refer") {
            if (lazyElems.appraise.enable) {
                FourPage.appraise();
                lazyElems.appraise.enable = false
            }
            if (lazyElems.consult.enable) {
                FourPage.consult();
                lazyElems.consult.enable = false
            }
            $("#serviceArea").insertAfter($("#consult"));
            if (c.attr("id") == "J-procon-comment") {
                $("#appraise").show();
                $("#appAdv").show()
            } else {
                $("#appraise").hide();
                $("#appAdv").hide()
            }
        } else {
            $("#serviceArea").insertBefore($("#appraise"))
        }
        if (c.attr("id") == "J-procon-param" || c.attr("id") == "J-procon-desc") {
            if ($("#itemParameter").length == 0) {
                FourPage.getParameter()
            }
        }
        lazyelem.detect()
    })
};
FourPage.hash = function() {
    $(".totalReview").click(function() {
        $("#productCommTitle").click()
    });
    var c = $.trim(location.hash);
    var a = ["#pro_detail_tab"];
    var b = ["#productParTitle"];
    if ($.inArray(c, a) > -1) {
        $("#productCommTitle").click()
    } else {
        if ($.inArray(c, b) > -1) {
            $("#productParTitle").click()
        }
    }
};
FourPage.appraise = function() {
    var a = sn.reviewIsNew == 1 ? (sn.newResServer + "/project/review/js/getreview.js") : (sn.newResServer + "/project/zone/newFourthPage/js/getreview.js");
    $.getScript(a, function() {
        if (window.review) {
            review.getContent($("#appraise"))
        }
    })
};
FourPage.consult = function() {
    var a = sn.reviewIsNew == 1 ? (sn.newResServer + "/project/review/js/getconsultation.js") : (sn.newResServer + "/project/zone/newFourthPage/js/getconsultation.js");
    $.getScript(a, function() {
        if (window.consultation) {
            consultation.getContent($("#consult"))
        }
    })
};
function initBroadBrand() {
    sn.vendorCode = "";
    $(".proinfo-title").addClass("proinfo-title-short");
    qCodeHide();
    getBroadBandSalePointInfo(sn.partNumber, sn.provinceCode, sn.cityId, sn.districtId, broadBrandInfo);
    CommonFourPage.FourPage.getPromotiondesc(sn.partNumber, FourPage.getPromotiondescCallBack);
    sn.vendorCode = "0000000000";
    FourPage.getReview();
    FourPage.getConsulation();
    $("#returnCate").html('<a class="tui-disable" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_tuihuan" target="_blank" href="http://help.suning.com/page/id-205.htm"><i class="icon"></i>不支持无理由退换货</a>');
    $("#returnCate").attr("title", "不支持无理由退换货");
    $("#returnCate").show();
    $("#shopName").html("由当地运营商确认预约信息并提供安装及售后服务").show();
    iFourth.servLabel();
    $("#hwgService").hide();
    $(".rxf").parent().hide();
    $("#installment").hide()
}
function broadBrandInfo(e) {
    $("#swlService").hide();
    $("#cService").hide();
    $("#snService").show();
    $("#selectCB").hide();
    $("#inerestBox").hide();
    $(".proinfo-serv .zqfw").parent().hide();
    if (sn.published == "1") {
        FourPage.initCss();
        sn.promotionPrice = "";
        if (e != null && e.errorCode == "0") {
            sn.promotionPrice = e.broadbandPrice;
            sn.broadbandSellPoint = e.broadbandSellPoint;
            $("#c_kucun").html("现货").show();
            $("#nowProduct").html("现在下单，即可进行预约").show();
            $("#addCart").removeClass().addClass("btn-install").html("");
            $("#addCart").attr("href", "javascript:addBroadbandShoppingCartCheck('" + sn.partNumber + "','" + sn.provinceCode + "','" + sn.cityId + "','" + sn.districtId + "')").removeAttr("target");
            $("#tabAddCart").show();
            $("#addCart2").removeClass().addClass("btn-install-mini");
            $("#addCart2").attr("href", "javascript:addBroadbandShoppingCartCheck('" + sn.partNumber + "','" + sn.provinceCode + "','" + sn.cityId + "','" + sn.districtId + "')").removeAttr("target");
            $("#addCart2").html("");
            $("#cart2Price").html(sn.promotionPrice);
            $("#proPriceBox").html("<span id='promotionPrice' class='mainprice'>" + FourPage.getDisPrice(sn.promotionPrice) + "</span><a id='PriceNotice2' class='link' href='javascript:FourPage.subscribePriceNotice();'>降价通知</a>");
            $("#existPrice").show();
            $("#noPrice").hide();
            $("#promotionPriceBox").find("dt span").html("易购价");
            $("#promotionPriceBox").show();
            $("#addCart").show();
            $("#addCart2").show()
        } else {
            $("#noPrice").show();
//            $("#existPrice").hide();
            $("#c_kucun").hide();
            $("#nowProduct").hide();
            $("#addCart").removeClass().addClass("btn-install-disable").html("");
            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
            $("#cart2Price").html("");
            $("#tabAddCart").show();
            $("#addCart2").removeClass().addClass("btn-install-mini-disable");
            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
            $("#addCart2").html("");
            CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods")
        }
        var c = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "__.html";
        var b = "findpassBrand2('','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + c + "','');";
        $("#callme").attr("href", "javascript:" + b);
        $("#callmeSide").attr("href", "javascript:" + b);
        $("#callme").removeClass().addClass("btn-online ml10");
        $("#callme").html("<img class='btn-online' src='" + sn.resRoot + "/images/online.gif' alt='在线客服' width='69' height='18'/>");
        $("#cshopBox").hide();
        $("#loginFeedBack").show();
        $(".proinfo-container").addClass("proinfo-container-nopro")
    } else {
        qCodeHide();
        $(".proinfo-main").hide();
        $(".proinfo-main").html("");
        $(".nopro").show();
        $("#cart2Price").html("");
        var a = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "__.html";
        $("#callme").attr("href", "javascript:findpassBrand2('" + sn.vendor + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
        $("#callmeSide").attr("href", "javascript:findpassBrand2('" + sn.vendor + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
        $(".proinfo-container").addClass("proinfo-container-nopro");
        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
        CommonFourPage.Recommend.noPublishItems(sn.partNumber, "Recommend.noPublishItemsHtml")
    }
    FourPage.initCluster();
    FourPage.runDapushWhenReady();
    iFourth.mainHeight()
}
function initDonate() {
    getItemSaleStatus(sn.partNumber, "showSaleStatus")
}
function initialize(a) {
    $("#selectCB span.result-text").html("");
    $("#selectCB span#phoneText").html("");
    $("#phonedl ul").html("");
    $("#phoned2 dd").html("");
    sn.giftInfo = "";
    shopInfoList = "";
    sn.priceInvData = "";
    sn.shipOffSetText = "";
    sn.inventoryText = "";
    sn.mobilePrice = "";
    sn.freight = "-1";
    sn.groupType = 0;
    sn.isPreBuy = 0;
    sn.sendCityName = "";
    sn.shopList = "";
    sn.govPrice = "";
    sn.cuxiaoType = "";
    sn.silenceType = "";
    sn.silenceTip = "";
    sn.cuxiaoSoldOut = "";
    sn.proPriceBoxHtml = "";
    sn.cShopListFlag = "";
    $("#yudingTips").hide();
    $("#cuxiaoEnd").hide();
    $("#cuxiaoNoNum").hide();
    $("#addCart").show();
    sn.pssPrceFlag = true;
    sn.hasGroupCmm = false;
    sn.isPavilion = false;
    sn.groupFlag = false;
    $("#cshopBox").show();
    $("#c_yunfei").html("").hide();
    $("#c_kucun").html("");
    $("#nowProduct").html("");
    $("#bookPrice").hide();
    $("#bookRule").hide();
    $("#yushouCount1").hide();
    $("#colorItemList a").attr("href", "javascript:void(0);");
    $("#versionItemList a").attr("href", "javascript:void(0);");
    $("#buyNum").val("1");
    PriceShow.actionId = "";
    PriceShow.status = "";
    PriceShow.bkflag = "0";
    iFourth.buyNum();
    $("#allcuxiao li:not(#scodeTitle) p").html("");
    $("#allcuxiao li:not(#scodeTitle)").hide();
    $("#allcuxiao").hide();
    $(".proinfo-o2o").hide();
    $("#groupItemList").remove();
    Renxf.runFlag = "N";
    Renxf.freenessInfo = "";
    Renxf.loginFlag = "N";
    Renxf.turnGrayFlag = "N";
    $("#freenessPay").hide();
    sn.cFreightFreeFlag = false;
    sn.TMFlag = false;
    CommonFourPage.storeService.jsdHide();
    snShopFlag = false;
    getItemSaleStatus(sn.partNumber, "showSaleStatus")
}
function showSaleStatus(a) {
    if (sn.isPreBuy == 1) {
        var c = a.saleInfo;
        if (c != undefined && c.length > 0) {
            if (typeof c[0].promotionPrice == "undefined" || c[0].promotionPrice == "") {
                sn.priceLoad = false;
                clearTimeout(cDown);
                initialize(sn.cityId)
            } else {
                prcessPSSPrice(c[0])
            }
        }
    } else {
        if (sn.groupFlag) {
            var c = a.saleInfo;
            if (c != undefined && c.length > 0) {
                initGroupCmmdtyPrice(c[0])
            }
        } else {
            if (!sn.priceLoad) {
                var b = a.saleInfo;
                if (typeof b != "undefined" && b.length > 0) {
                    sn.yanbaoSet = b[0].warrantyList
                }
                sn.priceLoad = true;
                if (!sn.donateFlag) {
                    try {
                        var c = a.saleInfo;
                        if (c != undefined && c.length > 0) {
                            sn.priceInvData = c[0];
                            sn.promotionPrice = sn.priceInvData.promotionPrice;
                            sn.vendorType = sn.priceInvData.vendorType;
                            sn.ownerPlace = sn.priceInvData.ownerPlace;
                            sn.cuxiaoType = sn.priceInvData.priceType;
                            sn.invStatus = sn.priceInvData.invStatus;
                            sn.scodeType = (sn.priceInvData.priceType).indexOf("4-7") >= 0 ? (sn.priceInvData.priceType.substring(2, 3)) : "0";
                            sn.scode = sn.scodeType == "7" ? true : false;
                            sn.priceInvData.priceType = (sn.priceInvData.priceType).indexOf("4") >= 0 ? "4" : (sn.priceInvData.priceType);
                            if (sn.priceInvData.priceType == "9") {
                                sn.priceInvData.priceType = "0"
                            }
                            if (sn.priceInvData.vendorType == "925SWL") {
                                $("#vendorType").val(3);
                                sn.swlShopFlag = true
                            } else {
                                if (sn.priceInvData.vendorType == "927HWG" || sn.priceInvData.vendorType == "927HWG1") {
                                    $("#vendorType").val(4);
                                    sn.hwgShopFlag = true
                                }
                            }
                        } else {
                            sn.priceInvData = ""
                        }
                        if (sn.shopType == "-1") {
                            sn.vendorCode = sn.priceInvData.vendorCode
                        }
                        if (sn.vendorCode != undefined && (sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003")) {
                            $("#supplierID").val("0000000000")
                        } else {
                            $("#supplierID").val(sn.vendorCode)
                        }
                    } catch (f) {
                    }
                    sn.isPreBuy = 0;
                    if (typeof sn.promotionPrice == "undefined" || sn.promotionPrice == "") {
                        sn.isPreBuy = 0
                    } else {
                        if (sn.priceInvData.priceType.substring(0, 1) == "7") {
                            sn.isPreBuy = 1
                        } else {
                            if (sn.priceInvData.priceType.substring(0, 1) == "8") {
                                sn.isPreBuy = 2
                            }
                        }
                    }
                    FourPage.getSubscribeHtml()
                } else {
                    try {
                        donateSaleStatus(a.saleInfo)
                    } catch (f) {
                    }
                }
                CommonFourPage.FourPage.getItemDescInfo(sn.partNumber, CommonFourPage.FourPage.processItemdescInfo);
                CommonFourPage.FourPage.getPromotiondesc(sn.partNumber, FourPage.getPromotiondescCallBack);
                if (sn.vendorCode == "" && sn.isPreBuy != 1 && sn.isPreBuy != 2 && sn.phoneFlag == "Y") {
                    getSellPointByCity(sn.partNumber, sn.cityId, FourPage.processBarePhoneDesc)
                }
                CommonFourPage.FourPage.getProductLablePricture(sn.partNumber, "sLablePicture");
                if (!(sn.donateFlag && sn.vendorCode == "")) {
                    getShopInfoList(sn.partNumber, "FourPage.showShopList")
                }
                runAnalyseByClass("")
            } else {
                showMobileSaleStatus(a)
            }
        }
    }
}
function donateSaleStatus(a) {
    donateCss();
    donateSale(a);
    FourPage.shareWb();
    FourPage.getReview()
}
function donateCss() {
    $("#netPriceBox").hide();
    $(".price-promo .w3").html("捐&nbsp;赠");
    $("#limitTime").hide();
    $("#PriceNotice2").hide();
    $("#c_yunfei").hide();
    $("#nowProduct").hide();
    $("#allcuxiao").hide();
    $(".proinfo-o2o").hide();
    $(".proinfo-serv").hide();
    $("#yanbao").hide();
    $("#preTime").hide();
    $("#itHelp").hide();
    $(".proinfo-memo").hide();
    $("#hotRank").hide();
    $("#buyAlsoBuy").hide();
    $(".history").hide();
    $(".proinfo-serv .zqfw").parent().hide();
    qCodeHide();
    $("#inerestBox").show();
    $("#snService").hide();
    $("#cService").show();
    $("#swlService").hide();
    $("#hwgService").hide();
    $(".proinfo-deliver-oversea").hide();
    $("#tariff").hide();
    $(".oversea-logo").hide();
    $("#productOverseaTitle").hide();
    $("#productProconSaleTitle").hide();
    $("#serviceArea").hide();
    $(".pro-detail-oversea").hide();
    $(".J-procon-sale").hide();
    $(".after-market").each(function() {
        $(this).hide()
    })
}
function donateSale(c) {
    if (c != undefined && c.length > 0) {
        sn.priceInvData = c[0];
        var b = sn.priceInvData;
        sn.promotionPrice = b.promotionPrice;
        sn.vendorType = b.vendorType;
        sn.invStatus = b.invStatus;
        sn.productStatus = b.invStatus;
        snga.productStatus = b.invStatus;
        sn.priceType = b.priceType;
        sn.vendorCode = b.vendorCode;
        var a = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "_" + sn.vendorCode + "_.html";
        $("#callme").attr("href", "javascript:findpassSupplier('" + sn.vendorCode + "','" + a + "','','');");
        getSupplierState("#callme", sn.vendorCode);
        if (sn.vendorCode == "") {
            sn.promotionPrice = "";
            $(".proinfo-main").hide();
            $(".proinfo-main").html("");
            $(".nopro").show();
            var a = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "__.html";
            $("#callme").attr("href", "javascript:findpassBrand2('" + (sn.vendor == undefined ? "" : sn.vendor) + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
            $("#callmeSide").attr("href", "javascript:findpassBrand2('" + (sn.vendor == undefined ? "" : sn.vendor) + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
            $("#shopName").html('由"苏宁"发起捐助，并提供服务');
            $(".proinfo-container").addClass("proinfo-container-nopro");
            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
            $("#cart2Price").html("")
        } else {
            if (sn.promotionPrice == "" || sn.invStatus == "" || sn.invStatus == "0" || sn.invStatus == "2" || sn.invStatus == "3") {
                if (sn.promotionPrice == "") {
//                    $("#existPrice").hide();
                    $("#noPrice").show()
                } else {
                    $("#promotionPrice").html(FourPage.getDisPrice(sn.promotionPrice));
                    $("#existPrice").show();
                    $("#noPrice").hide()
                }
                $("#c_kucun").html("无货");
                if (sn.promotionPrice == "") {
                    $("#c_kucun").html("暂不销售")
                }
                $("#addCart").removeClass().addClass("btn-addcart-disable");
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                $("#buycount").hide();
                $("#buyNowAddCart").removeClass().addClass("btn-donate-disable").attr("href", "javascript:void(0);").show();
                $("#tabAddCart").show();
                $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                $("#cart2Price").html(sn.promotionPrice)
            } else {
                $("#promotionPrice").html(FourPage.getDisPrice(sn.promotionPrice));
                $("#existPrice").show();
                $("#noPrice").hide();
                $("#c_kucun").html("现货");
                $("#addCart").removeClass().addClass("btn-addcart");
                $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                $("#buycount").show();
                $("#buyNowAddCart").removeClass().addClass("btn-donate").attr("href", "javascript:Cart.buyNowTime();").show();
                $("#tabAddCart").show();
                $("#addCart2").removeClass().addClass("btn-addcart-mini");
                $("#addCart2").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                $("#cart2Price").html(sn.promotionPrice)
            }
        }
    } else {
//        $("#existPrice").hide();
        $("#noPrice").show();
        $("#c_kucun").html("暂不销售");
        $("#addCart").removeClass().addClass("btn-addcart-disable");
        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
        $("#buycount").hide();
        $("#buyNowAddCart").removeClass().addClass("btn-donate-disable").attr("href", "javascript:void(0);").show();
        $("#tabAddCart").show();
        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
        $("#cart2Price").html(sn.promotionPrice)
    }
}
FourPage.getSubscribeHtml = function() {
    response = sn.priceInvData;
    if (sn.isPreBuy != 1) {
        FourPage.initCss()
    } else {
        FourPage.yuShouCss()
    }
    if (sn.hwgShopFlag) {
        CommonFourPage.hwgInitCss()
    }
    try {
        preBuy.actionID = response.bookActionID;
        preBuy.purchaseType = response.purChaseType;
        sn.bookGoodsId = response.bookGoodID;
        if (sn.isPreBuy == 1) {
            prcessPSSPrice(response);
            Recommend.yushouSaPageView("1")
        } else {
            if (sn.isPreBuy == 2) {
                bookInfo.bookPrice = typeof response.promotionPrice != "undefined" && response.promotionPrice != "" ? parseFloat(response.promotionPrice).toFixed(2) : "";
                bookInfo.depositAmount = response.bookPrice;
                getItemSubscribeAction(sn.partNumber, processBookInfo, processErrorBookInfo);
                Recommend.yushouSaPageView("2")
            } else {
                Recommend.yushouSaPageView();
                if ($("#inerestBox").siblings(".memo").length > 0) {
                    $("#inerestBox").siblings(".memo").remove()
                }
                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                    $(".mainbtns").siblings("#jhsm").remove()
                }
                initProductSale()
            }
        }
    } catch (a) {
        initProductSale()
    }
};
function initProductSale() {
    try {
        if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
            $("#scodeTitle").hide();
            $("#preTime").hide();
            $("#scode").hide()
        }
        if (sn.vendorCode != "" && sn.vendorCode != "undefined" && sn.vendorCode != undefined && sn.vendorCode.substring(0, 3) != "003") {
            sn.cflag = "0";
            $("#callme").html("");
            getSupplierState("#callme", sn.vendorCode);
            FourPage.initCShopPrice();
            if (sn.swlShopFlag == true) {
                $("#snService").hide();
                $("#cService").hide();
                $("#swlService").show();
                $("#hwgService").hide();
                $("#vendorType").val(3)
            } else {
                if (sn.hwgShopFlag) {
                    $("#snService").hide();
                    $("#cService").hide();
                    $("#swlService").hide();
                    $("#hwgService").show();
                    $("#vendorType").val(4)
                } else {
                    $("#cService").show();
                    $("#snService").hide();
                    $("#swlService").hide();
                    $("#hwgService").hide()
                }
            }
            FourPage.initCluster()
        } else {
            if (sn.vendorCode != undefined && (sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003")) {
                sn.cflag = "1";
                $("#callme").html("<img class='btn-online' src='" + sn.resRoot + "/images/online.gif' alt='在线客服' width='69' height='18'/>");
                FourPage.initProductPrice();
                $("#swlService").hide();
                $("#cService").hide();
                $("#snService").show();
                $("#hwgService").hide();
                $("#vendorType").val(1)
            }
        }
        if (sn.vendorCode != "" && sn.reportFlag == "0") {
            $("#report").show()
        } else {
            $("#report").hide()
        }
    } catch (a) {
    }
    FourPage.getReview();
    FourPage.getConsulation();
    iFourth.mainHeight();
    iFourth.win.scroll()
}
FourPage.initJSD = function() {
    CommonFourPage.storeService.jsdHide();
    var a = {partnumber: sn.partNumber, cityId: sn.cityId};
    if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
        JSD.base.initJsdLabel(a, CommonFourPage.storeService.jsdShow)
    } else {
        CommonFourPage.storeService.jsdHide()
    }
};
FourPage.initProductPrice = function() {
    try {
        if ($("#J-tieIn").length > 0) {
            $("#J-tieIn").html("")
        }
        if ((sn.isPreBuy == 1 && (preBuy.status == 1 || preBuy.status == 2 || preBuy.status == 3 || preBuy.status == 5 || preBuy.status == 7))) {
            sn.published = "1"
        }
        if (sn.published == "1") {
            FourPage.initProductPriceProcess()
        } else {
            sn.promotionPrice = "";
            $("#productStatus").val("0");
            $("#shipOffset").val("-1");
            $("#productStatusDesc").val("-1");
            qCodeHide();
            $(".proinfo-main").hide();
            $(".proinfo-main").html("");
            $(".nopro").show();
            $("#bookProcedure").hide();
            var a = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "__.html";
            $("#callme").attr("href", "javascript:findpassBrand2('" + (sn.vendor == undefined ? "" : sn.vendor) + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
            $("#callmeSide").attr("href", "javascript:findpassBrand2('" + (sn.vendor == undefined ? "" : sn.vendor) + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
            $(".proinfo-container").addClass("proinfo-container-nopro");
            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
            CommonFourPage.Recommend.noPublishItems(sn.partNumber, "Recommend.noPublishItemsHtml");
            FourPage.runDapushWhenReady()
        }
        FourPage.initCluster();
        iFourth.mainHeight();
        getOldForNew("oldForNewShow")
    } catch (b) {
    }
};
FourPage.initProductPriceProcess = function() {
    try {
        var b = sn.priceInvData;
        sn.promotionPrice = sn.isPreBuy == 1 ? sn.promotionPrice : b.promotionPrice;
        sn.invStatus = b.invStatus;
        if (sn.isPreBuy != "1" && sn.promotionPrice != "" && sn.promotionPrice != undefined && sn.notSaleProductGroup != "Y" && sn.scodeType != "7" && (sn.invStatus == "1" || sn.invStatus == "4")) {
            Renxf.freenessPay()
        } else {
            $("#freenessPay").hide()
        }
        sn.govPrice = b.govPrice;
        sn.netPrice = b.netPrice;
        sn.itemPrice = b.itemPrice;
        sn.refPrice = b.refPrice;
        sn.salesOrg = b.salesOrg;
        sn.deptNo = b.deptNo;
        sn.vendor = b.vendor;
        sn.sendCityId = b.sendCityId;
        sn.vendorType = b.vendorType;
        sn.ownerPlace = b.ownerPlace;
        sn.accountPlace = b.accountPlace;
        sn.manageInvFlag = b.manageInvFlag;
        sn.factorySendFlag = b.factorySendFlag;
        sn.sendAvalidTime = b.sendAvalidTime;
        sn.priceType = sn.isPreBuy == 1 ? sn.priceType : b.priceType;
        if (typeof b.manageInvFlag != "undefined" && b.manageInvFlag != "") {
            $("#manageInvFlag").val(b.manageInvFlag)
        }
        if (sn.isPreBuy != 1) {
            sn.priceType = (b.priceType).indexOf("4") >= 0 ? "4" : (b.priceType)
        }
        if (sn.notSaleProductGroup == "Y") {
            b.invStatus = "0"
        }
        sn.productStatus = b.invStatus;
        snga.productStatus = sn.isPreBuy == 1 && b.invStatus == "2" ? "" : b.invStatus;
        PriceShow.actionId = b.juId;
        sn.TMFlag = sn.vendorType == "928TM" ? true : false;
        if (sn.TMFlag && sn.vendorCode == "") {
            sn.invStatus = "0";
            sn.priceInvData.invStatus = "0"
        }
        $("#shopNetPrice" + sn.vendorCode).find(".price").html("<i>&yen;</i><em>" + sn.promotionPrice + "</em>");
        var a = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "__.html";
        $("#callme").attr("href", "javascript:findpassBrand2('" + sn.vendor + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
        $("#callmeSide").attr("href", "javascript:findpassBrand2('" + sn.vendor + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
        if (sn.promotionPrice != "" && sn.promotionPrice != undefined) {
            $("#existPrice").show();
            $("#noPrice").hide();
            if (typeof b.invStatus != "undefined" && b.invStatus == "1") {
                $("#productStatus").val("1");
                $("#productStatusDesc").val("-1")
            } else {
                if (typeof b.invStatus != "undefined" && b.invStatus == "0") {
                    $("#productStatus").val("4");
                    $("#productStatusDesc").val("2")
                } else {
                    $("#productStatus").val("2")
                }
            }
            PriceShow.setPrice(sn.priceType, sn.netPrice, sn.promotionPrice, sn.priceController);
            $("#cart2Price").html(sn.promotionPrice);
            getItemPromStatus(sn.partNumber, "FourPage.showPromStatus")
        } else {
            $("#noPrice").show();
            $(".proinfo-deliver-oversea").hide();
            $("#productStatus").val("3");
            $("#productStatusDesc").val("1");
            $("#shipOffset").val("-1");
            if (sn.sizeAttr == "2") {
                sn.ziti = true;
                $(".ziti").parent().show()
            } else {
                sn.ziti = false;
                $(".ziti").parent().hide()
            }
            snga.productStatus = "3";
            sn.invStatus = "";
            saleStatusThree();
            FourPage.runDapushWhenReady();
            sn.shopName = "苏宁";
            sn.reviewShopName = "苏宁"
        }
        initServiceOffInstall();
        getFreightList(sn.partNumber, "showFreightList", showFreightListErr, showFreightList);
        CommonFourPage.FourPage.initReturnOrChange(sn.partNumber, "FourPage.showReturnOrchange");
        setTimeout(setiDiggerTrackingCodes, 1000)
    } catch (c) {
    }
    iFourth.mainHeight();
    iFourth.servLabel()
};
FourPage.initProductSaleStatus = function() {
    try {
        $("#vendorType").val(1);
        var a = sn.priceInvData;
        sn.preBuyFlag = 0;
        if ((sn.isPreBuy == 1 && (preBuy.status == 1 || preBuy.status == 2 || preBuy.status == 3 || preBuy.status == 5 || preBuy.status == 7))) {
            sn.preBuyFlag = 1
        }
        if (sn.notSaleProductGroup == "Y") {
            a.invStatus = "0"
        }
        if (sn.preBuyFlag != 1) {
            if (a.invStatus == "1" || a.invStatus == "4") {
                $("#addCart").removeClass().addClass("btn-addcart");
                $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                if (sn.scodeType == "7") {
                    FourPage.scodeBuyStyle();
                    $("#buyNowAddCart").show()
                } else {
                    $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                }
                $("#addCart2").removeClass().addClass("btn-addcart-mini");
                $("#addCart2").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                $("#tabAddCart").show();
                if (typeof a.invStatus != "undefined" && a.invStatus == "1") {
                    $("#productStatus").val("1");
                    $("#productStatusDesc").val("-1")
                } else {
                    if (typeof a.invStatus != "undefined" && a.invStatus == "0") {
                        $("#productStatus").val("4");
                        $("#productStatusDesc").val("2")
                    } else {
                        $("#productStatus").val("2");
                        $("#productStatusDesc").val("-1")
                    }
                }
                sn.status = true;
                if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
                    var b = "";
                    if (preBuy.type == 2 && preBuy.status == 4) {
                        b = "注：抢购仅限获取预约特权购资格的用户";
                        $("#addCart").removeClass().addClass("btn-privilege")
                    } else {
                        $("#addCart").removeClass().addClass("btn-rush");
                        b = "注：抢购仅限获取预约资格用户"
                    }
                    $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + b + "</p>");
                    $("#yushouCount").hide();
                    if (preBuy.type == 2 && preBuy.status == 4) {
                        $("#addCart2").removeClass().addClass("btn-privilege-mini")
                    } else {
                        $("#addCart2").removeClass().addClass("btn-rush-mini")
                    }
                    $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                    $("#buyNowAddCart").hide();
                    if (preBuy.preLimit == 1) {
                        $("#addCart").removeClass().addClass("btn-privilege-end");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                    }
                }
                if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                    $("#preTime").hide();
                    $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                    $("#c_kucun").html("暂不销售").show();
                    $("#buyNowAddCart").hide();
                    $("#addCart").removeClass().addClass("btn-addcart-disable");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#yushouCount").hide();
                    $("#buycount").hide();
                    $("#tellMe").hide()
                }
                CommonFourPage.Cart.getSunShine(sn.partNumber, Cart.sunShine);
                if (document.reflashForm.sellType.value == 0) {
                    $("#buycount").show()
                } else {
                    $("#buycount").hide()
                }
                if (a.factorySendFlag == "1") {
                    $(".ziti").parent().hide();
                    sn.ziti = false
                } else {
                    if (sn.sizeAttr == "2") {
                        sn.ziti = true;
                        $(".ziti").parent().show()
                    } else {
                        sn.ziti = false;
                        $(".ziti").parent().hide()
                    }
                }
                if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
                    $("#itHelp").show()
                } else {
                    $("#itHelp").hide()
                }
                $("#J-slide1").hide();
                $("#tellMe").hide();
                $("#inerestBox").show()
            } else {
                if (a.invStatus == "2") {
                    $("#productStatus").val("2");
                    $("#productStatusDesc").val("-1");
                    if (sn.sizeAttr == "2") {
                        sn.ziti = true;
                        $(".ziti").parent().show()
                    } else {
                        sn.ziti = false;
                        $(".ziti").parent().hide()
                    }
                    $("#buycount").hide();
                    $("#yanbao").hide();
                    $("#itHelp").hide();
                    $("#netPrice").show();
                    $("#tellMe").show();
                    $("#addCart").removeClass().addClass("btn-addcart-disable");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#buyNowAddCart").hide();
                    $("#tabAddCart").show();
                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
                        FourPage.initPhoneCss()
                    }
                    sn.shipOffSetText = "暂无货&nbsp 点<a class='b' name='item_" + sn.ninePartNumber + "_gmq_daohuotz02' href='javascript:FourPage.subscribeArrivalNotice();'>到货通知</a>，到货第一时间通知您!";
                    $("#nowProduct").html("暂无货&nbsp 点<a class='b'  href='javascript:FourPage.subscribeArrivalNotice();'>到货通知</a>，到货第一时间通知您!");
                    $("#nowProduct").addClass("red");
                    $("#c_kucun").html("无货");
                    $("#c_yunfei").hide();
                    $("#listProContent").hide();
                    if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
                        var b = "";
                        if (preBuy.type == 2 && preBuy.status == 4) {
                            b = "注：抢购仅限获取预约特权购资格的用户";
                            $("#addCart").removeClass().addClass("btn-privilege-disable")
                        } else {
                            $("#addCart").removeClass().addClass("btn-rush-disable");
                            b = "注：抢购仅限获取预约资格用户"
                        }
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + b + "</p>");
                        $("#yushouCount").hide();
                        if (preBuy.type == 2 && preBuy.status == 4) {
                            $("#addCart2").removeClass().addClass("btn-privilege-mini-disable")
                        } else {
                            $("#addCart2").removeClass().addClass("btn-rush-mini-disable")
                        }
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#buyNowAddCart").hide();
                        sn.shipOffSetText = "本商品在该城市暂无货";
                        $("#nowProduct").html("本商品在该城市暂无货");
                        $("#nowProduct").removeClass("red");
                        $("#tellMe").hide()
                    }
                    if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                        $("#preTime").hide();
                        $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                        $("#c_kucun").html("暂不销售").show();
                        $("#buyNowAddCart").hide();
                        $("#addCart").removeClass().addClass("btn-addcart-disable");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#yushouCount").hide();
                        $("#buycount").hide();
                        $("#tellMe").hide()
                    }
                    sn.status = true;
                    CommonFourPage.storeService.jsdHide();
                    qCodeHide();
                    CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods");
                    FourPage.runDapushWhenReady()
                } else {
                    if (a.shipOffSetText == "") {
                        $("#productStatus").val("3");
                        $("#productStatusDesc").val("3");
                        snga.productStatus = "3";
                        sn.shipOffSetText = "很抱歉，本商品在此地暂不支持配送";
                        $("#nowProduct").html("很抱歉，本商品在此地暂不支持配送");
                        $("#nowProduct").addClass("red");
                        $("#c_kucun").html("暂不销售");
                        $("#c_yunfei").hide();
                        $("#buycount").hide();
                        $("#yanbao").hide();
                        $("#itHelp").hide();
                        $("#addCart").removeClass().addClass("btn-addcart-disable");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#buyNowAddCart").hide();
                        $("#tabAddCart").show();
                        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
                            FourPage.initPhoneCss()
                        }
                        sn.status = false;
                        $("#PriceNotice1").hide();
                        CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods");
                        $("#listProContent").hide();
                        $("#nowProduct").addClass("red")
                    } else {
                        snga.productStatus = "3";
                        sn.shipOffSetText = "建议您选购其它商品";
                        saleStatusThree()
                    }
                    if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
                        var b = "";
                        if (preBuy.type == 2 && preBuy.status == 4) {
                            b = "注：抢购仅限获取预约特权购资格的用户";
                            $("#addCart").removeClass().addClass("btn-privilege-disable")
                        } else {
                            $("#addCart").removeClass().addClass("btn-rush-disable");
                            b = "注：抢购仅限获取预约资格用户"
                        }
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + b + "</p>");
                        $("#yushouCount").hide();
                        if (preBuy.type == 2 && preBuy.status == 4) {
                            $("#addCart2").removeClass().addClass("btn-privilege-mini-disable")
                        } else {
                            $("#addCart2").removeClass().addClass("btn-rush-mini-disable")
                        }
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#buyNowAddCart").hide()
                    }
                    if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                        $("#preTime").hide();
                        $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                        $("#c_kucun").html("暂不销售").show();
                        $("#buyNowAddCart").hide();
                        $("#addCart").removeClass().addClass("btn-addcart-disable");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#yushouCount").hide();
                        $("#buycount").hide();
                        $("#tellMe").hide()
                    }
                    if (sn.sizeAttr == "2") {
                        sn.ziti = true;
                        $(".ziti").parent().show()
                    } else {
                        sn.ziti = false;
                        $(".ziti").parent().hide()
                    }
                    qCodeHide();
                    CommonFourPage.storeService.jsdHide();
                    FourPage.runDapushWhenReady()
                }
            }
        } else {
            if (a.invStatus == "1" || a.invStatus == "4") {
                if (a.invStatus == "1" || a.invStatus == "4") {
                    $("#c_kucun").html(a.inventoryText);
                    $("#nowProduct").html(a.shipOffSetText);
                    $("#nowProduct").removeClass("red")
                }
                if (a.factorySendFlag == "1") {
                    $(".ziti").parent().hide();
                    sn.ziti = false
                } else {
                    if (sn.sizeAttr == "2") {
                        sn.ziti = true;
                        $(".ziti").parent().show()
                    } else {
                        sn.ziti = false;
                        $(".ziti").parent().hide()
                    }
                }
                $("#buycount").show()
            } else {
                if (a.invStatus == "2") {
                    $("#c_kucun").html("无货");
                    $("#nowProduct").html("本商品在该城市暂无货");
                    $("#nowProduct").removeClass("red");
                    $("#tellMe").hide();
                    if (sn.sizeAttr == "2") {
                        sn.ziti = true;
                        $(".ziti").parent().show()
                    } else {
                        sn.ziti = false;
                        $(".ziti").parent().hide()
                    }
                    $("#buycount").hide();
                    qCodeHide()
                } else {
                    snga.productStatus = "3";
                    if (a.shipOffSetText == "") {
                        $("#nowProduct").html("很抱歉，本商品在此地暂不支持配送");
                        $("#nowProduct").addClass("red");
                        $("#c_kucun").html("暂不销售")
                    } else {
                        $("#nowProduct").html("建议您选购其它商品");
                        $("#nowProduct").addClass("red");
                        $("#c_kucun").html("暂不销售")
                    }
                    if (sn.sizeAttr == "2") {
                        sn.ziti = true;
                        $(".ziti").parent().show()
                    } else {
                        sn.ziti = false;
                        $(".ziti").parent().hide()
                    }
                    $("#buycount").hide();
                    qCodeHide()
                }
            }
            CommonFourPage.Cart.getSunShine(sn.partNumber, Cart.sunShine);
            $("#buyNowAddCart").hide();
            $("#c_kucun").hide();
            $("#nowProduct").hide();
            if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                $("#preTime").hide();
                $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                $("#c_kucun").html("暂不销售").show();
                $("#buyNowAddCart").hide();
                $("#addCart").removeClass().addClass("btn-addcart-disable");
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                if ($("#inerestBox").siblings(".memo").length > 0) {
                    $("#inerestBox").siblings(".memo").remove()
                }
                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                    $(".mainbtns").siblings("#jhsm").remove()
                }
                $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                $("#yushouCount").hide();
                $("#buycount").hide();
                $("#tellMe").hide()
            }
        }
        getDeliveryInfofunction(sn.partNumber, "showDeliveryInfo", showDeliveryInfoErr);
        sn.shopName = "苏宁";
        sn.reviewShopName = "苏宁";
        if (sn.isPreBuy == 2) {
            resetBookCss()
        }
    } catch (c) {
    }
    iFourth.mainHeight();
    FourPage.shareWb()
};
function initServiceOffInstall() {
    var b = $("#shop_code").val();
    var c = $("#shop_status").val();
    var a = sn.shopPath + sn.shopMainPh + "/" + b.substring(2, 10) + "/index.html";
    if (sn.factorySendFlag == "1") {
        if (b != null && b != "" && c == "0") {
            $("#shopName").html('由"<span><a href=' + a + ' name="item_' + sn.ninePartNumber + '_gmq_dianpu01" target="_blank">苏宁</a></span>"销售，厂家发货，并享受售后服务')
        } else {
            $("#shopName").html('由"<span>苏宁</span>"销售，厂家发货，并享受售后服务')
        }
    } else {
        if (b != null && b != "" && c == "0") {
            $("#shopName").html('由"<span><a href=' + a + ' name="item_' + sn.ninePartNumber + '_gmq_dianpu01" target="_blank">苏宁</a></span>"销售和发货，并享受售后服务')
        } else {
            $("#shopName").html('由"<span>苏宁</span>"销售和发货，并享受售后服务')
        }
    }
}
function initServiceHtml(e) {
    var b = $("#shop_code").val();
    var c = $("#shop_status").val();
    var a = sn.shopPath + sn.shopMainPh + "/" + b.substring(2, 10) + "/index.html";
    if (typeof e == "undefined" || e.installType == "0") {
        if (sn.factorySendFlag == "1") {
            if (b != null && b != "" && c == "0") {
                $("#shopName").html('由"<span><a href=' + a + ' name="item_' + sn.ninePartNumber + '_gmq_dianpu01" target="_blank">苏宁</a></span>"销售并提供售后服务，厂家直接发货')
            } else {
                $("#shopName").html('由"<span>苏宁</span>"销售并提供售后服务，厂家直接发货')
            }
        } else {
            if (b != null && b != "" && c == "0") {
                $("#shopName").html('由"<span><a href=' + a + ' name="item_' + sn.ninePartNumber + '_gmq_dianpu01" target="_blank">苏宁</a></span>"直接销售和发货，并提供售后服务')
            } else {
                $("#shopName").html('由"<span>苏宁</span>"销售和发货，并提供售后服务')
            }
        }
    } else {
        if (e.installType == "1") {
            if (sn.factorySendFlag == "1") {
                if (b != null && b != "" && c == "0") {
                    $("#shopName").html('由"<span><a href=' + a + ' name="item_' + sn.ninePartNumber + '_gmq_dianpu01" target="_blank">苏宁</a></span>"销售和安装，并提供售后服务，厂家直接发货')
                } else {
                    $("#shopName").html('由"<span>苏宁</span>"销售和安装，并提供售后服务，厂家直接发货')
                }
            } else {
                if (b != null && b != "" && c == "0") {
                    $("#shopName").html('由"<span><a href=' + a + ' name="item_' + sn.ninePartNumber + '_gmq_dianpu01" target="_blank">苏宁</a></span>"销售发货和安装，并提供售后服务')
                } else {
                    $("#shopName").html('由"<span>苏宁</span>"销售发货和安装，并提供售后服务')
                }
            }
        } else {
            if (e.installType == "2") {
                if (sn.factorySendFlag == "1") {
                    if (b != null && b != "" && c == "0") {
                        $("#shopName").html('由"<span><a href=' + a + ' name="item_' + sn.ninePartNumber + '_gmq_dianpu01" target="_blank">苏宁</a></span>"销售并提供售后服务，厂家提供发货和安装')
                    } else {
                        $("#shopName").html('由"<span>苏宁</span>"销售并提供售后服务，厂家提供发货和安装')
                    }
                } else {
                    if (b != null && b != "" && c == "0") {
                        $("#shopName").html('由"<span><a href=' + a + ' name="item_' + sn.ninePartNumber + '_gmq_dianpu01" target="_blank">苏宁</a></span>"销售和发货，厂家提供安装')
                    } else {
                        $("#shopName").html('由"<span>苏宁</span>"销售和发货，厂家提供安装')
                    }
                }
            }
        }
    }
}
function showDeliveryInfo(a) {
    if (sn.cuxiaoType == "4-10") {
        $("#addCart").show();
        $("#addCart2").show()
    }
    if (a != null && a != "") {
        snga.shipOffset = a.shipOffSet;
        sn.shipOffSet = a.shipOffSet;
        sn.shipOffSetText = a.shipOffSetText;
        sn.inventoryText = a.inventoryText;
        sn.sendCityName = a.sendCityName;
        if (sn.shipOffSet != "" && sn.shipOffSet >= 0) {
            $("#shipOffset").val(sn.shipOffSet)
        }
    }
    if (sn.cflag == "0") {
        try {
            $("#vendorType").val(2);
            if (sn.swlShopFlag) {
                $("#vendorType").val(3);
                $("#shopName").html('由"苏宁"直接发货，并提供售后服务');
                if (sn.shipOffSet == "" || sn.shipOffSet < 0) {
                    sn.shipOffSetText = "很抱歉，本商品在此地暂不支持配送";
                    $("#nowProduct").html("很抱歉，本商品在此地暂不支持配送");
                    $("#nowProduct").addClass("red");
                    $("#c_kucun").html("暂不销售");
                    $("#c_yunfei").hide();
                    $("#buycount").hide();
                    $("#yanbao").hide();
                    $("#itHelp").hide();
                    $("#productStatus").val("5");
                    $("#productStatusDesc").val("3");
                    if (sn.isPreBuy != 1) {
                        $("#addCart").removeClass().addClass("btn-addcart-disable");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#buyNowAddCart").hide();
                        $("#tabAddCart").show();
                        if (!(PriceShow.published == "2" && (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10")) && sn.silenceType != "Y") {
                            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                        }
                        $("#PriceNotice1").hide()
                    } else {
                        if (sn.isPreBuy == 1) {
                            if (preBuy.type == 2 && preBuy.status == 4) {
                                $("#addCart").removeClass().addClass("btn-privilege-disable");
                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#addCart2").removeClass().addClass("btn-privilege-mini-disable");
                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                            } else {
                                if (preBuy.type == 2 && preBuy.status == 6) {
                                    $("#addCart").removeClass().addClass("btn-rush-disable");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-disable");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                }
                            }
                        }
                    }
                } else {
                    if (sn.shipOffSet != "" && sn.shipOffSet >= 0) {
                        $("#shipOffset").val(sn.shipOffSet)
                    }
                    $("#nowProduct").html(a.shipOffSetText);
                    if (typeof PriceShow.bkflag != "undefined" && PriceShow.bkflag != null && PriceShow.bkflag != "1" && sn.cuxiaoType == "4-10") {
                        $("#addCart").hide();
                        $("#addCart2").hide()
                    }
                }
            } else {
                if (a.shipOffSetText != undefined) {
                    $("#nowProduct").html(a.shipOffSetText)
                }
                if (typeof PriceShow.bkflag != "undefined" && PriceShow.bkflag != null && PriceShow.bkflag != "1" && sn.cuxiaoType == "4-10") {
                    $("#addCart").hide();
                    $("#addCart2").hide()
                }
            }
            if (sn.preBuyFlag != 1 && !sn.groupFlag) {
                if (!((sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10") && sn.silenceType == "Y") && !(sn.priceType == "4" && PriceShow.status == 1)) {
                    $("#nowProduct").show()
                }
                $("#c_kucun").show();
                if (a.sendCityName != undefined && a.sendCityName != "" && (!sn.hwgShopFlag || (sn.hwgShopFlag && (sn.ownerPlace.indexOf("H") != 0 && sn.ownerPlace.indexOf("B") != 0 && sn.ownerPlace.indexOf("L") != 0)))) {
                    if (typeof ($("#cShopFlag").val()) != undefined && $("#cShopFlag").val() == "1") {
                        $("#shopName").html('由"<span>' + sn.shopName + '</span>"从&nbsp;&nbsp;' + a.sendCityName + "&nbsp;&nbsp;销售和发货，并提供售后服务")
                    } else {
                        $("#shopName").html('由"' + sn.shopName + '"从&nbsp;&nbsp;' + a.sendCityName + "&nbsp;&nbsp;销售和发货，并提供售后服务")
                    }
                }
            } else {
                $("#nowProduct").hide()
            }
            if (sn.isPreBuy == 1 && !preBuy.isEffect && !sn.groupFlag) {
                $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                $("#c_kucun").html("暂不销售").show()
            }
            if (!sn.swlShopFlag) {
                CommonFourPage.hwgDelivery(sn.hwgShopFlag)
            }
            if (sn.vendorCode != "" && sn.invStatus == "1" && sn.freight != "-1" && !sn.groupFlag && (!sn.swlShopFlag || (typeof sn.shipOffSet != "undefined" && sn.shipOffSet >= 0))) {
                processQcode();
                FourPage.processCShopO2OInfo();
                setTimeout(processQcode, 500)
            } else {
                FourPage.withoutProductNum();
                qCodeHide()
            }
        } catch (c) {
        }
    } else {
        if (sn.phoneFlag == "Y" && sn.notSaleFlag) {
            sn.shipOffSet = -1;
            sn.shipOffSetText = ""
        }
        if (sn.shipOffSet < 0 && (sn.invStatus == "1" || sn.invStatus == "4")) {
            $("#vendorType").val(1);
            $("#bigPolyVerify").hide();
            sn.shipOffSetText = "很抱歉，本商品在此地暂不支持配送";
            $("#nowProduct").html("很抱歉，本商品在此地暂不支持配送");
            $("#nowProduct").addClass("red");
            $("#c_kucun").html("暂不销售");
            $("#c_yunfei").hide();
            $("#buycount").hide();
            $("#yanbao").hide();
            $("#itHelp").hide();
            if (sn.isPreBuy != 1) {
                if ((PriceShow.activityFlag != undefined || typeof PriceShow.activityFlag != "undefined" || PriceShow.activityFlag == "2") && PriceShow.status == 1) {
                    $("#buyNowAddCart").hide();
                    if (!sn.hwgShopFlag && PriceShow.serviceType == "3") {
                        $("#addCart").removeClass().addClass("btn-group-wait").attr("href", "javascript:void(0);");
                        $("#addCart2").removeClass().addClass("btn-group-mini-wait").attr("href", "javascript:void(0);");
                        $("#tellMe").hide()
                    } else {
                        $("#addCart").removeClass().addClass("btn-rush-wait").attr("href", "javascript:void(0);");
                        $("#addCart2").removeClass().addClass("btn-rush-mini-wait").attr("href", "javascript:void(0);");
                        $("#tellMe").hide()
                    }
                } else {
                    $("#addCart").removeClass().addClass("btn-addcart-disable");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#buyNowAddCart").hide();
                    $("#tabAddCart").show();
                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                }
                if ((PriceShow.activityFlag != undefined && typeof PriceShow.activityFlag != "undefined" && PriceShow.activityFlag == "2") && PriceShow.status == 1) {
                    $("#preTime").show()
                } else {
                    $("#preTime").hide()
                }
            }
            if (sn.isPreBuy != 1 && sn.isPreBuy != 2 && sn.phoneFlag == "Y") {
                getTreatyInfo(sn.partNumber, sn.provinceCode, sn.cityId, sn.districtId, sn.mdmProvinceId, sn.mdmCityId, FourPage.initPhoneStatus)
            } else {
                FourPage.initPhoneCss()
            }
            sn.status = false;
            $("#PriceNotice1").hide();
            if (sn.sellType != 1) {
                CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods")
            }
            $("#listProContent").hide();
            if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
                var b = "";
                if (preBuy.type == 2 && preBuy.status == 4) {
                    b = "注：抢购仅限获取预约特权购资格的用户";
                    $("#addCart").removeClass().addClass("btn-privilege-disable")
                } else {
                    $("#addCart").removeClass().addClass("btn-rush-disable");
                    b = "注：抢购仅限获取预约资格用户"
                }
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                if ($("#inerestBox").siblings(".memo").length > 0) {
                    $("#inerestBox").siblings(".memo").remove()
                }
                $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                    $(".mainbtns").siblings("#jhsm").remove()
                }
                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + b + "</p>");
                $("#yushouCount").hide();
                if (preBuy.type == 2 && preBuy.status == 4) {
                    $("#addCart2").removeClass().addClass("btn-privilege-mini-disable")
                } else {
                    $("#addCart2").removeClass().addClass("btn-rush-mini-disable")
                }
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                $("#buyNowAddCart").hide()
            }
            if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                $("#preTime").hide();
                $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                $("#c_kucun").html("暂不销售").show();
                $("#buyNowAddCart").hide();
                $("#addCart").removeClass().addClass("btn-addcart-disable");
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                if ($("#inerestBox").siblings(".memo").length > 0) {
                    $("#inerestBox").siblings(".memo").remove()
                }
                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                    $(".mainbtns").siblings("#jhsm").remove()
                }
                $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                $("#yushouCount").hide();
                $("#buycount").hide();
                $("#tellMe").hide()
            }
            $("#listProContent").hide();
            CommonFourPage.storeService.jsdHide()
        } else {
            if (sn.shipOffSet != "" && sn.shipOffSet >= 0) {
                $("#shipOffset").val(sn.shipOffSet)
            }
            if (sn.invStatus == "1" || sn.invStatus == "4") {
                if (PriceShow.activityFlag != undefined && typeof PriceShow.activityFlag != "undefined" && PriceShow.activityFlag == "2" && PriceShow.status == 2) {
                    verifyBigPoly()
                }
                if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
                    if ((PriceShow.activityFlag != undefined && typeof PriceShow.activityFlag != "undefined" && PriceShow.activityFlag == "2") && (PriceShow.status == 1 || (PriceShow.status == 2 && !sn.hwgShopFlag))) {
                        if (sn.cuxiaoSoldOut != "Y") {
                            $("#preTime").show()
                        }
                    }
                    if ((PriceShow.activityFlag != undefined || typeof PriceShow.activityFlag != "undefined" || PriceShow.activityFlag == "2") && PriceShow.status == 1) {
                        $("#buyNowAddCart").hide();
                        if (!sn.hwgShopFlag && PriceShow.serviceType == "3") {
                            $("#addCart").removeClass().addClass("btn-group-wait").attr("href", "javascript:void(0);");
                            $("#addCart2").removeClass().addClass("btn-group-mini-wait").attr("href", "javascript:void(0);");
                            $("#tellMe").hide()
                        } else {
                            $("#addCart").removeClass().addClass("btn-rush-wait").attr("href", "javascript:void(0);");
                            $("#addCart2").removeClass().addClass("btn-rush-mini-wait").attr("href", "javascript:void(0);");
                            $("#tellMe").hide()
                        }
                    } else {
                        if (sn.silenceType != "Y" && sn.cuxiaoSoldOut != "Y" && PriceShow.serviceType != "7") {
                            $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                        } else {
                            if (PriceShow.serviceType == "7") {
                                FourPage.scodeBuyStyle();
                                $("#buyNowAddCart").show()
                            }
                        }
                        if (sn.cuxiaoType == "4-10") {
                            $("#addCart").hide();
                            $("#addCart2").hide()
                        } else {
                            if (!(PriceShow.published == "2" && (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3")) && sn.silenceType != "Y") {
                                $("#addCart").removeClass().addClass("btn-addcart").attr("href", "javascript:Cart.addCart();");
                                $("#addCart2").removeClass().addClass("btn-addcart-mini").attr("href", "javascript:Cart.addCart();")
                            }
                        }
                    }
                    $("#c_kucun").html(a.inventoryText);
                    $("#c_yunfei").hide();
                    $("#nowProduct").html(a.shipOffSetText);
                    $("#nowProduct").removeClass("red");
                    if ($("#J-tieIn").length > 0) {
                        if ($("#J-tieIn").length > 0) {
                            lazyElems["J-tieIn"].handle = Recommend.initFittingReady(sn.partNumber, "Recommend.callBackInitFittingReady");
                            lazyElems["J-tieIn"].enable = true
                        } else {
                            $("#J-tieIn").html("");
                            $("#J-tieIn").hide();
                            $("li[rel=#J-tieIn]").hide()
                        }
                        if ($("#J-setMeal").length > 0) {
                            lazyElems["J-setMeal"].enable = false;
                            $("#listProContent").find("li[rel=#J-tieIn]").addClass("current")
                        }
                    } else {
                        if ($("#J-setMeal").length > 0) {
                            lazyElems["J-setMeal"].enable = false;
                            $("#listProContent").find("li[rel=#J-setMeal]").addClass("current")
                        }
                    }
                } else {
                    $("#c_kucun").html(a.inventoryText);
                    $("#c_yunfei").hide();
                    $("#nowProduct").html(a.shipOffSetText);
                    $("#nowProduct").removeClass("red")
                }
                if (sn.isPreBuy != 1 && sn.isPreBuy != 2 && sn.phoneFlag == "Y" && !sn.preBuyFlag) {
                    getTreatyInfo(sn.partNumber, sn.provinceCode, sn.cityId, sn.districtId, sn.mdmProvinceId, sn.mdmCityId, FourPage.initPhoneStatus)
                } else {
                    FourPage.initPhoneCss()
                }
                FourPage.initJSD();
                if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
                    var b = "";
                    if (preBuy.type == 2 && preBuy.status == 4) {
                        b = "注：抢购仅限获取预约特权购资格的用户";
                        $("#addCart").removeClass().addClass("btn-privilege")
                    } else {
                        $("#addCart").removeClass().addClass("btn-rush");
                        b = "注：抢购仅限获取预约资格用户"
                    }
                    $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + b + "</p>");
                    $("#yushouCount").hide();
                    if (preBuy.type == 2 && preBuy.status == 4) {
                        $("#addCart2").removeClass().addClass("btn-privilege-mini")
                    } else {
                        $("#addCart2").removeClass().addClass("btn-rush-mini")
                    }
                    $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                    $("#buyNowAddCart").hide();
                    if (preBuy.preLimit == 1) {
                        $("#addCart").removeClass().addClass("btn-privilege-end");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                    }
                }
                if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                    $("#preTime").hide();
                    $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                    $("#c_kucun").html("暂不销售").show();
                    $("#buyNowAddCart").hide();
                    $("#addCart").removeClass().addClass("btn-addcart-disable");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#yushouCount").hide();
                    $("#buycount").hide();
                    $("#tellMe").hide()
                }
                getDeliveryInstallfunction(sn.partNumber, sn.shipOffSet, "deliveryInstall")
            }
        }
        if (!((sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10") && sn.silenceType == "Y") && !(sn.priceType == "4" && PriceShow.status == 1)) {
            if (sn.preBuyFlag != 1 || (sn.isPreBuy == 1 && !preBuy.isEffect)) {
                $("#c_kucun").show();
                $("#nowProduct").show()
            } else {
                $("#c_kucun").hide();
                $("#nowProduct").hide()
            }
        }
        $("#c_yunfei").hide();
        snItemFree();
        FourPage.processO2OInfo()
    }
    if (sn.isPreBuy == 2) {
        resetBookCss()
    }
    iFourth.mainHeight();
    FourPage.runDapushWhenReady()
}
function showDeliveryInfoErr() {
    snga.shipOffset = "";
    sn.shipOffset = "";
    sn.shipOffSetText = "";
    sn.inventoryText = "";
    showDeliveryInfo("");
    if (sn.vendorCode != "" && sn.invStatus == "1" && sn.freight != "-1") {
        processQcode();
        setTimeout(processQcode, 500)
    } else {
        qCodeHide()
    }
    if (sn.isPreBuy == 2) {
        resetBookCss()
    }
}
FourPage.initCShopPrice = function() {
    document.reflashForm.sellType.value = "0";
    FourPage.initPhoneCss();
    sn.preheat = false;
    $("#vendorType").val(2);
    if ($("#J-tieIn").length > 0) {
        $("#J-tieIn").html("")
    }
    CommonFourPage.getgroupCmmdtyRelation(FourPage.initGroupCmmdtyRelation, initCShopPriceProcess)
};
FourPage.initGroupCmmdtyRelation = function(b) {
    if (typeof b != "undefined" && b.length > 0 && $("#groupItemList").length == 0) {
        sn.hasGroupCmm = true;
        var a = '<dl id="groupItemList" class="proinfo-buytype proattr-radio">';
        a += "<dt>选择套餐</dt><dd><ul>";
        a += '<li title="官方标配"><a onclick="FourPage.changeGroupCmmdty(\'1\',this);return false;" href="javascript:void(0);">官方标配<i></i></a></li>';
        $.each(b, function(c, e) {
            if (c == 0) {
                a += '<li title="' + e.characterValueDesc + '" class="selected" disName="' + e.itemName + '" disCount="' + e.imageCount + '"><a onclick="FourPage.changeGroupCmmdty(\'' + e.groupCmmdtyCode + '\',this);return false;" href="javascript:void(0);">' + e.characterValueDesc + "<i></i></a></li>"
            } else {
                a += '<li title="' + e.characterValueDesc + '"  disName="' + e.itemName + '"><a onclick="FourPage.changeGroupCmmdty(\'' + e.groupCmmdtyCode + '\',this);return false;" href="javascript:void(0);">' + e.characterValueDesc + "<i></i></a></li>"
            }
        });
        a += '</ul><input type="hidden"/><dd></dl>';
        $("#J-TZM").before(a);
        CommonFourPage.Recommend.shopListItems(sn.partNumber, "Recommend.shopListItemsHtml");
        $("#groupItemList ul").find(".selected").find("a").click()
    } else {
        initCShopPriceProcess()
    }
};
FourPage.changeGroupCmmdty = function(c, e) {
    $(e).parent().addClass("selected").siblings().removeClass("selected");
    if (c == "1") {
        if ($("#cslpBox li").length > 1) {
            FourPage.cShopListStatus();
            $("#J-sideRec").hide()
        } else {
            if ($("#tuijianShopList li").length > 0) {
                $("#J-sideRec").show();
                $("#c_shop_list").hide()
            } else {
                FourPage.cShopListStatus();
                $("#J-sideRec").hide()
            }
        }
        sn.groupFlag = false;
        if (sn.groupType == 0 && sn.isPreBuy != "1") {
            sn.groupType = "1";
            initCShopPriceProcess()
        } else {
            initChangeGroupCmmdtyCss("2")
        }
    } else {
        if ($("#tuijianShopList li").length > 0) {
            $("#J-sideRec").show();
            $("#c_shop_list").hide()
        } else {
            FourPage.cShopListStatus();
            $("#J-sideRec").hide()
        }
        if (!sn.groupFlag) {
            sn.proPriceBoxHtml = $("#proPriceBox").html()
        }
        sn.groupFlag = true;
        sn.groupPartnumber = c;
        var a = $(e).parent().attr("disName");
        var b = $(e).parent().attr("disCount");
        sn.groupImageCount = b != "undefined" && b != "" ? b : 0;
        a = a != "undefined" && a != "" ? a : "";
        $("#itemDisplayName").html(a);
        getItemSaleStatus(c, "showSaleStatus")
    }
};
function initGroupCmmdtyPrice(b) {
    try {
        sn.groupInvPrice = b;
        sn.groupPromotionPrice = b.promotionPrice;
        initChangeGroupCmmdtyCss(sn.groupPartnumber);
        if ((sn.vendorType == "921C店" || sn.vendorType == "925SWL") && sn.catenIds != sn.jypwCatenIds) {
            $("#jypw").show()
        } else {
            $("#jypw").hide()
        }
        var a = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "_" + sn.vendorCode + "_.html";
        $("#callme").attr("href", "javascript:findpassSupplier('" + sn.vendorCode + "','" + a + "','','');");
        $("#callmeSide").attr("href", "javascript:findpassSupplier('" + sn.vendorCode + "','" + a + "','','');");
        if (sn.groupPromotionPrice != "" && typeof sn.groupPromotionPrice != "undefined") {
            $("#existPrice").show();
            $("#cart2Price").html(sn.groupPromotionPrice);
            if (typeof b.invStatus != "undefined" && b.invStatus == "1") {
                $("#productStatus").val("1");
                $("#productStatusDesc").val("-1")
            } else {
                if (typeof b.invStatus != "undefined" && b.invStatus == "0") {
                    $("#productStatus").val("3");
                    $("#productStatusDesc").val("2")
                } else {
                    $("#productStatus").val("2");
                    $("#productStatusDesc").val("-1")
                }
            }
            getFreightList(sn.partNumber, "showFreightList", showFreightListErr, showFreightList)
        } else {
            $("#noPrice").find("dt span").html("易购价");
            $("#noPrice").show();
            $(".proinfo-deliver-oversea").hide();
            $("#addCart").removeClass().addClass("btn-addcart-disable");
            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
            $("#tabAddCart").show();
            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
            $("#addCart2").show();
            $("#buyNowAddCart").hide();
            $("#c_kucun").html("暂不销售");
            $("#c_kucun").show();
            $("#mianyunfei").parent().hide();
            $("#c_yunfei").hide();
            $("#buycount").hide();
            $("#nowProduct").html("建议您选购其它商品");
            sn.shipOffSetText = "建议您选购其它商品";
            $("#nowProduct").addClass("red");
            $("#nowProduct").show();
            $("#cart2Price").html("");
            CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods")
        }
        if (sn.swlShopFlag && sn.sizeAttr == "2") {
            $("#vendorType").val(3);
            sn.ziti = true;
            $(".ziti").parent().show()
        } else {
            sn.ziti = false;
            $(".ziti").parent().hide()
        }
        if (sn.swlShopFlag) {
            $("#shopName").html('由"苏宁"直接发货，并享受售后服务')
        } else {
            if (sn.sendCityName != undefined && sn.sendCityName != "" && (!sn.hwgShopFlag || (sn.hwgShopFlag && (b.ownerPlace.indexOf("H") != 0 && b.ownerPlace.indexOf("B") != 0 && b.ownerPlace.indexOf("L") != 0)))) {
                if (typeof ($("#cShopFlag").val()) != undefined && $("#cShopFlag").val() == "1") {
                    $("#shopName").html('由"<span>' + sn.shopName + '</span>"从&nbsp;&nbsp;' + sn.sendCityName + "&nbsp;&nbsp;销售和发货，并提供售后服务")
                } else {
                    $("#shopName").html('由"' + sn.shopName + '"从&nbsp;&nbsp;' + sn.sendCityName + "&nbsp;&nbsp;销售和发货，并提供售后服务")
                }
            } else {
                $("#shopName").html('由"' + sn.shopName + '"销售和发货，并提供售后服务')
            }
        }
        CommonFourPage.FourPage.initReturnOrChange(sn.partNumber, "FourPage.showReturnOrchange");
        setTimeout(setiDiggerTrackingCodes, 1000);
        qCodeHide()
    } catch (c) {
    }
    iFourth.mainHeight();
    FourPage.shareWb()
}
function processImageCss(f, a) {
    var e = "";
    var c = "";
    var g = sn.imageDomianDir + "/b2c/catentries/" + f;
    for (var b = 0;
            b < a;
            b++) {
        e += "<li ";
        if (b == 0) {
            e += 'class="current"'
        }
        e += '><a href="javascript:void(0);"><img alt="" src-large="' + g + "_" + (b + 1) + '_800x800.jpg"src-medium="' + g + "_" + (b + 1) + '_400x400.jpg" src="' + g + "_" + (b + 1) + '_60x60.jpg"></a></li>';
        c += '<li><a href="javascript:void(0);"><img src="' + g + "_" + (b + 1) + '_100x100.jpg" src-large="' + g + "_" + (b + 1) + '_800x800.jpg" alt="" /></a></li>'
    }
    $(".imgzoom-thumb-main").find("ul").html(e);
    $("#partNum").html(f.substring(9, 18));
    $("#partNumberLable").html(f.substring(9, 18));
    $("#bigImage").attr("src", $(".imgzoom-thumb-main").find("li[class=current]").find("a img").attr("src-large"));
    $("#bigPic").html(c);
    $(".imgview-count span").html(a)
}
function initChangeGroupCmmdtyCss(h) {
    if (!sn.hasGroupCmm) {
        return
    }
    $("#freenessPay").hide();
    $("#loginFeedBack").hide();
    $("#buyNum").val(1);
    $("#buyNum").attr("max", 99);
    $("#productLimit").hide();
    $("#preTime").hide();
    $("#noPrice").hide();
//    $("#existPrice").hide();
    $("#c_yunfei").hide();
    $("#nowProduct").html("");
    $("#addCart").siblings().hide();
    $("#inerestBox").show();
    if ($(".mainbtns").siblings("#jhsm").length > 0) {
        $(".mainbtns").siblings("#jhsm").remove()
    }
    $("#bookProcedure").hide();
    $("#bigPolyVerify").hide();
    if (h == "1" || h == "2") {
        $("#loginFeedBack").show();
        if (sn.isPavilion) {
            $("#itemDisplayName").html('<a href="http://china.suning.com/" target="_blank"><span class="tsg">特色馆</span></a>' + sn.itemDisplayName)
        } else {
            $("#itemDisplayName").html(sn.itemDisplayName)
        }
        $("#partNumberLable").html(sn.partNumber.substring(9, 18))
    } else {
        $("#partNumberLable").html(sn.groupPartnumber.substring(9, 18))
    }
    if (h == "1") {
        if ($("#tuijianShopList").find("li").length == 0) {
            FourPage.cShopListStatus()
        }
        if (sn.isPreBuy == 1 || sn.isPreBuy == 2) {
            FourPage.initGroupCmmdtyPreAction()
        }
    } else {
        if (h == "2") {
            if (typeof sn.proPriceBoxHtml != "undefined" && sn.proPriceBoxHtml != "") {
                $("#proPriceBox").html(sn.proPriceBoxHtml)
            }
            FourPage.showServiceName();
            var c = $("#allcuxiao .promotion-content");
            $.each(c, function(j, k) {
                if ($(k).html() != "") {
                    $("#allcuxiao").show()
                }
            });
            if ($("#tuijianShopList").find("li").length == 0) {
                FourPage.cShopListStatus()
            }
            if (typeof sn.promotionPrice != "undefined" && sn.promotionPrice != "") {
                $("#noPrice").hide();
                $("#existPrice").show();
                $("#promotionPriceBox").show()
            } else {
                $("#noPrice").show();
//                $("#existPrice").hide()
            }
            if (sn.isPreBuy == 1 || sn.isPreBuy == 2) {
                processQcode();
                FourPage.initGroupCmmdtyPreAction()
            } else {
                if (sn.promotionPrice != "" && typeof sn.promotionPrice != "undefined") {
                    if (sn.invStatus == "1") {
                        if (sn.scodeType != "7") {
                            Renxf.freenessPay()
                        } else {
                            $("#freenessPay").hide()
                        }
                        processQcode();
                        if (PriceShow.activityFlag == undefined || typeof PriceShow.activityFlag == "undefined" || PriceShow.activityFlag == "") {
                            $("#addCart").removeClass().addClass("btn-addcart");
                            $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                            $("#addCart").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'");
                            $("#addCart2").removeClass().addClass("btn-addcart-mini");
                            $("#addCart2").attr("href", "javascript:Cart.addCart();");
                            $("#addCart2").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'").removeAttr("target");
                            $("#buyNowAddCart").show();
                            $("#buycount").show();
                            $("#preTime").hide();
                            FourPage.initCProductSaleStatus()
                        } else {
                            if (PriceShow.activityFlag != undefined || typeof PriceShow.activityFlag != "undefined" || PriceShow.activityFlag == "2") {
                                if ($.trim($("#bigPolyVerify").find("dd").html()) != "") {
                                    $("#bigPolyVerify").show()
                                }
                                if (PriceShow.status == 1) {
                                    $("#limitTime").html("即将开始");
                                    $("#limitTime").show();
                                    PriceShow.activityFlag = "2";
                                    $("#PriceNotice2").hide();
                                    $("#beginOrEnd").html("抢购开始");
                                    if (PriceShow.maxPerNum != 0) {
                                        $("#productLimit").html("正在促销，每人限购<em>" + PriceShow.maxPerNum + "</em>件");
                                        $("#productLimit").show();
                                        $("#buyNum").attr("max", PriceShow.maxPerNum);
                                        $("#buycount").show()
                                    } else {
                                        $("#buycount").hide()
                                    }
                                    iFourth.buyNum();
                                    $("#preTime").show();
                                    $("#buyNowAddCart").hide();
                                    $("#addCart").removeClass().addClass("btn-rush-wait").attr("href", "javascript:void(0);");
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-wait").attr("href", "javascript:void(0);");
                                    PriceShow.activityFlag = "2"
                                } else {
                                    if (PriceShow.status == 2) {
                                        PriceShow.activityFlag = "2";
                                        $("#PriceNotice2").hide();
                                        $("#beginOrEnd").html("倒计时");
                                        if (PriceShow.maxPerNum != 0) {
                                            $("#productLimit").html("正在促销，每人限购<em>" + PriceShow.maxPerNum + "</em>件");
                                            $("#productLimit").show();
                                            $("#buyNum").attr("max", PriceShow.maxPerNum);
                                            $("#buycount").show()
                                        } else {
                                            $("#buycount").hide()
                                        }
                                        $("#preTime").show();
                                        iFourth.buyNum();
                                        var b = (parseInt(PriceShow.endTime) - parseInt(PriceShow.curTime)) / 1000;
                                        if (parseInt(PriceShow.endTime) > parseInt(PriceShow.curTime)) {
                                            if ((sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSetText != "")) {
                                                $("#preTime").show();
                                                if (PriceShow.serviceType == "7") {
                                                    FourPage.scodeBuyStyle();
                                                    $("#buyNowAddCart").show()
                                                } else {
                                                    $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                                                }
                                                if (PriceShow.serviceType == "2" || PriceShow.serviceType == "3") {
                                                    $("#buyReminder").show()
                                                }
                                                $("#addCart").removeClass().addClass("btn-addcart").attr("href", "javascript:Cart.addCart();");
                                                $("#addCart2").removeClass().addClass("btn-addcart-mini").attr("href", "javascript:Cart.addCart();")
                                            } else {
                                                if (sn.freight == "-1" || sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0" || ((sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSetText == "")) {
                                                    $("#preTime").hide();
                                                    $("#buyNowAddCart").hide();
                                                    $("#buyReminder").hide();
                                                    $("#addCart").removeClass().addClass("btn-addcart-disable").attr("href", "javascript:void(0);");
                                                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable").attr("href", "javascript:void(0);");
                                                    if (sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0") {
                                                        $("#tellMe").show()
                                                    }
                                                }
                                            }
                                            $(".proinfo-cd").find("input:hidden").val(b)
                                        }
                                        if (PriceShow.published == "2" && (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10")) {
                                            $("#cuxiaoNoNum").show();
                                            $("#cuxiaoEnd").hide();
                                            $("#buyNowAddCart").hide();
                                            $("#addCart").hide();
                                            $("#inerestBox").hide();
                                            $("#freenessPay").hide();
                                            $("#buyReminder").hide();
                                            $("#preTime").show();
                                            $("#buyReminder").hide();
                                            $("#addCart2").removeClass().attr("href", "javascript:void(0);").addClass("btn-rush-mini-no")
                                        }
                                    } else {
                                        $("#addCart").removeClass().addClass("btn-addcart");
                                        $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                                        $("#addCart").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'");
                                        $("#addCart2").removeClass().addClass("btn-addcart-mini");
                                        $("#addCart2").attr("href", "javascript:Cart.addCart();");
                                        $("#addCart2").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'").removeAttr("target");
                                        if (PriceShow.serviceType == "7") {
                                            FourPage.scodeBuyStyle();
                                            $("#buyNowAddCart").show()
                                        } else {
                                            if (sn.silenceType != "Y") {
                                                $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                                            }
                                        }
                                        $("#buycount").show();
                                        $("#preTime").hide();
                                        var a = parseInt(PriceShow.endTime);
                                        var g = parseInt(PriceShow.curTime);
                                        if (typeof PriceShow.silenceTime != "undefined" && PriceShow.silenceTime != "") {
                                            var e = parseInt(PriceShow.silenceTime)
                                        }
                                        if (typeof e != "undefined" && e != "") {
                                            if (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10") {
                                                if (g > a && g <= e) {
                                                    sn.silenceType = "Y";
                                                    $("#limitTime").show();
                                                    $("#cuxiaoEnd").show();
                                                    $("#c_kucun").hide();
                                                    $("#nowProduct").hide();
                                                    $("#c_yunfei").hide();
                                                    $("#buyNowAddCart").hide();
                                                    $("#addCart").hide();
                                                    $("#inerestBox").hide();
                                                    $("#freenessPay").hide();
                                                    $("#addCart2").removeClass().attr("href", "javascript:void(0);").addClass("btn-presell-mini-over")
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (sn.preheat) {
                            if (FourPage.comparePrice(sn.promotionPrice, sn.netPrice) != -1) {
                                if (sn.refPrice != undefined && sn.refPrice != "") {
                                    PriceShow.priceController()
                                } else {
                                    $("#netPriceBox").hide()
                                }
                                $("#promotionPriceBox").show()
                            } else {
                                PriceShow.priceController()
                            }
                        } else {
                            if (FourPage.comparePrice(sn.promotionPrice, sn.netPrice) != -1) {
                                if (sn.refPrice != undefined && sn.refPrice != "") {
                                    PriceShow.priceController()
                                } else {
                                    $("#netPriceBox").hide()
                                }
                                $("#promotionPriceBox").show()
                            } else {
                                PriceShow.priceController();
                                if (sn.priceType == "4") {
                                    $("#PriceNotice2").hide()
                                }
                            }
                        }
                        getDeliveryInfofunction(sn.partNumber, "showDeliveryInfo", showDeliveryInfoErr)
                    } else {
                        $("#buycount").hide();
                        if (sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费") {
                            $("#mianyunfei").parent().show()
                        } else {
                            $("#mianyunfei").parent().hide()
                        }
                        swlItemFree();
                        $("#buycount").hide();
                        $("#yanbao").hide();
                        $("#itHelp").hide();
                        $("#nowProduct").html("暂无货&nbsp 点<a class='b' href='javascript:FourPage.subscribeArrivalNotice();'>到货通知</a>，到货第一时间通知您!");
                        $("#nowProduct").addClass("red");
                        $("#nowProduct").show();
                        $("#tellMe").show();
                        $("#c_kucun").html("无货");
                        $("#c_yunfei").hide();
                        $("#netPrice").show();
                        $("#buyNowAddCart").hide();
                        $(".proinfo-deliver-oversea").hide();
                        if (PriceShow.activityFlag != undefined || typeof PriceShow.activityFlag != "undefined" || PriceShow.activityFlag == "2") {
                            if (PriceShow.status == 1) {
                                $("#limitTime").html("即将开始");
                                $("#limitTime").show();
                                PriceShow.activityFlag = "2";
                                $("#beginOrEnd").html("抢购开始");
                                $("#preTime").show();
                                $("#buyNowAddCart").hide();
                                $("#addCart").removeClass().addClass("btn-rush-wait").attr("href", "javascript:void(0);");
                                $("#addCart2").removeClass().addClass("btn-rush-mini-wait").attr("href", "javascript:void(0);");
                                PriceShow.activityFlag = "2"
                            } else {
                                if (PriceShow.status == 2) {
                                    PriceShow.activityFlag = "2";
                                    var b = (parseInt(PriceShow.endTime) - parseInt(PriceShow.curTime)) / 1000;
                                    if (parseInt(PriceShow.endTime) > parseInt(PriceShow.curTime)) {
                                        $("#preTime").hide();
                                        $("#buyNowAddCart").hide();
                                        $("#buyReminder").hide();
                                        $("#addCart").removeClass().addClass("btn-addcart-disable").attr("href", "javascript:void(0);");
                                        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable").attr("href", "javascript:void(0);");
                                        if (sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0") {
                                            $("#tellMe").show()
                                        }
                                    }
                                } else {
                                    $("#preTime").hide();
                                    $("#buyNowAddCart").hide();
                                    $("#buyReminder").hide();
                                    $("#addCart").removeClass().addClass("btn-addcart-disable").attr("href", "javascript:void(0);");
                                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable").attr("href", "javascript:void(0);");
                                    var a = parseInt(PriceShow.endTime);
                                    var g = parseInt(PriceShow.curTime);
                                    if (typeof PriceShow.silenceTime != "undefined" && PriceShow.silenceTime != "") {
                                        var e = parseInt(PriceShow.silenceTime)
                                    }
                                    if (typeof e != "undefined" && e != "") {
                                        if (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10") {
                                            if (g > a && g <= e) {
                                                sn.silenceType = "Y";
                                                $("#limitTime").show();
                                                $("#cuxiaoEnd").show();
                                                $("#c_kucun").hide();
                                                $("#nowProduct").hide();
                                                $("#c_yunfei").hide();
                                                $("#buyNowAddCart").hide();
                                                $("#addCart").hide();
                                                $("#inerestBox").hide();
                                                $("#freenessPay").hide();
                                                $("#addCart2").removeClass().attr("href", "javascript:void(0);").addClass("btn-presell-mini-over")
                                            }
                                        }
                                    }
                                }
                            }
                        } else {
                            if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
                                var f = "";
                                if (preBuy.type == 2 && preBuy.status == 4) {
                                    f = "注：抢购仅限获取预约特权购资格的用户";
                                    $("#addCart").removeClass().addClass("btn-privilege-disable")
                                } else {
                                    $("#addCart").removeClass().addClass("btn-rush-disable");
                                    f = "注：抢购仅限获取预约资格用户"
                                }
                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                    $("#inerestBox").siblings(".memo").remove()
                                }
                                $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + f + "</p>");
                                $("#yushouCount").hide();
                                if (preBuy.type == 2 && preBuy.status == 4) {
                                    $("#addCart2").removeClass().addClass("btn-privilege-mini-disable")
                                } else {
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-disable")
                                }
                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#buyNowAddCart").hide();
                                sn.shipOffSetText = "本商品在该城市暂无货";
                                $("#nowProduct").html("本商品在该城市暂无货");
                                $("#nowProduct").removeClass("red");
                                $("#tellMe").hide()
                            } else {
                                $("#addCart").removeClass().addClass("btn-addcart-disable");
                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#tabAddCart").show();
                                $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                            }
                        }
                        if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                            $("#preTime").hide();
                            $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                            $("#c_kucun").html("暂不销售").show();
                            $("#buyNowAddCart").hide();
                            $("#addCart").removeClass().addClass("btn-addcart-disable");
                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#yushouCount").hide();
                            $("#buycount").hide();
                            $("#tellMe").hide()
                        }
                        qCodeHide();
                        FourPage.withoutProductNum()
                    }
                } else {
                    $("#noPrice").show();
                    $(".proinfo-deliver-oversea").hide();
                    $("#productStatus").val("3");
                    $("#productStatusDesc").val("1");
                    initCShopOffSaleStatus()
                }
            }
            iFourth.mainHeight()
        } else {
            if (h != "0" && h != "1") {
                if ($("#tuijianShopList").find("li").length > 0) {
                    $("#tuijianShopList").show()
                }
                FourPage.showServiceName();
                $("#c_shop_list").hide();
                $("#buyReminder").hide();
                $("#bigPolyVerify").hide();
                $("#listProContent").hide();
                $("#allcuxiao").hide();
                $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                $("#addCart").attr("name", "'item_" + sn.groupPartnumber + "_gmq_buy01'");
                $("#addCart2").removeClass().addClass("btn-addcart-mini");
                $("#addCart2").attr("href", "javascript:Cart.addCart();");
                $("#addCart2").attr("name", "'item_" + sn.groupPartnumber + "_gmq_buy01'").removeAttr("target");
                $("#buyNowAddCart").show();
                $("#buyNum").val(1);
                $("#buyNum").attr("max", 99);
                $("#preTime").hide();
                $("#inerestBox").show();
                $("#qrCode").hide();
                iFourth.buyNum()
            }
        }
    }
}
FourPage.initGroupCmmdtyPreAction = function() {
    $("#buyNowAddCart").hide();
    if (sn.isPreBuy == 2) {
        $("#bookProcedure").show();
        iFourth.presell();
        resetBookCss()
    } else {
        if (sn.isPreBuy == 1) {
            if (!preBuy.isEffect) {
                $("#preTime").hide();
                $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                $("#c_kucun").html("暂不销售").show();
                $("#buyNowAddCart").hide();
                $("#addCart").removeClass().addClass("btn-addcart-disable");
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                if ($("#inerestBox").siblings(".memo").length > 0) {
                    $("#inerestBox").siblings(".memo").remove()
                }
                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                    $(".mainbtns").siblings("#jhsm").remove()
                }
                $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                $("#yushouCount").hide();
                $("#buycount").hide()
            } else {
                if (preBuy.type == 1) {
                    if (preBuy.status == 1) {
                        $("#nowProduct").hide();
                        $("#c_kucun").hide();
                        $("#addCart").removeClass().addClass("btn-order-wait");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $("#addCart2").removeClass().addClass("btn-order-mini-wait");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#yushouCount").hide()
                    } else {
                        if (preBuy.status == 2) {
                            $("#nowProduct").hide();
                            $("#c_kucun").hide();
                            $("#addCart").removeClass().addClass("btn-order");
                            $("#addCart").attr("href", appointUrl);
                            $("#addCart").attr("target", "_blank");
                            $("#addCart").attr("name", "item_" + sn.ninePartNumber + "_gmq_yyljyy");
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $("#yushouCount").html("<span>已有</span><strong>" + preBuy.appiontCount + "</strong><span>人成功预约</span>");
                            $("#yushouCount").show();
                            $("#addCart2").removeClass().addClass("btn-order-mini");
                            $("#addCart2").attr("href", appointUrl);
                            $("#addCart2").attr("target", "_blank")
                        } else {
                            if (preBuy.status == 3) {
                                $("#nowProduct").hide();
                                $("#c_kucun").hide();
                                $("#addCart").removeClass().addClass("btn-rush-wait");
                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                    $("#inerestBox").siblings(".memo").remove()
                                }
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#yushouCount").hide();
                                if (preBuy.purStartTime == "" && preBuy.purEndTime == "") {
                                    $("#inerestBox").after('<span class="memo">抢购时间暂时未定，敬请关注</a></span>')
                                }
                            } else {
                                if (preBuy.status == 4) {
                                    $("#nowProduct").show();
                                    $("#c_kucun").show();
                                    if (data.preLimit == 1) {
                                        $("#addCart").removeClass().addClass("btn-privilege-end");
                                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                            $("#inerestBox").siblings(".memo").remove()
                                        }
                                        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                            $(".mainbtns").siblings("#jhsm").remove()
                                        }
                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                        $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                        $("#yushouCount").hide()
                                    } else {
                                        $("#addCart").removeClass().addClass("btn-rush");
                                        $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                            $("#inerestBox").siblings(".memo").remove()
                                        }
                                        $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                            $(".mainbtns").siblings("#jhsm").remove()
                                        }
                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                        $("#addCart2").removeClass().addClass("btn-rush-mini");
                                        $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(0);").removeAttr("target");
                                        $("#yushouCount").hide()
                                    }
                                } else {
                                    $("#nowProduct").hide();
                                    $("#c_kucun").hide();
                                    $("#addCart").removeClass().addClass("btn-rush-no");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#yushouCount").hide()
                                }
                            }
                        }
                    }
                    if (preBuy.personBuysLimit != "0" && preBuy.personBuysLimit != "" && preBuy.personBuysLimit != undefined) {
                        $("#productLimit").html("每人限购<em>" + preBuy.personBuysLimit + "</em>件");
                        $("#productLimit").show();
                        $("#buyNum").attr("max", preBuy.personBuysLimit);
                        $("#buycount").show();
                        iFourth.buyNum()
                    }
                    if (preBuy.status == 3 && preBuy.purStartTime == "" && preBuy.purEndTime == "") {
                        $("#preTime").hide()
                    } else {
                        $("#preTime").show()
                    }
                } else {
                    if (preBuy.type == "2") {
                        if (preBuy.status == 1) {
                            $("#nowProduct").hide();
                            $("#c_kucun").hide();
                            $("#addCart").removeClass().addClass("btn-order-wait");
                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $("#addCart2").removeClass().addClass("btn-order-mini-wait");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#yushouCount").hide()
                        } else {
                            if (preBuy.status == 2) {
                                $("#preTime").find("dt").html("预约结束");
                                $(".duration-time").val((data.scheduleEndTime - data.curTime) / 1000);
                                $("#nowProduct").hide();
                                $("#c_kucun").hide();
                                $("#addCart").removeClass().addClass("btn-order");
                                $("#addCart").attr("href", appointUrl);
                                $("#addCart").attr("target", "_blank");
                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                    $("#inerestBox").siblings(".memo").remove()
                                }
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $("#yushouCount").html("<span>已有</span><strong>" + preBuy.appiontCount + "</strong><span>人成功预约</span>");
                                $("#yushouCount").show();
                                $("#addCart2").removeClass().addClass("btn-order-mini");
                                $("#addCart2").attr("href", appointUrl);
                                $("#addCart2").attr("target", "_blank")
                            } else {
                                if (preBuy.status == 3) {
                                    $("#nowProduct").hide();
                                    $("#c_kucun").hide();
                                    $("#addCart").removeClass().addClass("btn-rush-wait");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#yushouCount").hide();
                                    if (preBuy.priorPurchaseStartTime == "" && preBuy.priorPurchaseEndTime == "") {
                                        $("#inerestBox").after('<span class="memo">抢购时间暂时未定，敬请关注</a></span>')
                                    }
                                } else {
                                    if (preBuy.status == 4) {
                                        if (data.preLimit == 1) {
                                            $("#nowProduct").show();
                                            $("#c_kucun").show();
                                            $("#addCart").removeClass().addClass("btn-privilege-end");
                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                            $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                            $("#yushouCount").hide()
                                        } else {
                                            $("#nowProduct").show();
                                            $("#c_kucun").show();
                                            $("#addCart").removeClass().addClass("btn-privilege");
                                            $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                            $("#addCart").attr("name", "item_" + sn.ninePartNumber + "_gmq_yytqgm");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                            $("#addCart2").removeClass().addClass("btn-privilege-mini");
                                            $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(0);").removeAttr("target");
                                            $("#yushouCount").hide()
                                        }
                                    } else {
                                        if (preBuy.status == 5) {
                                            $("#nowProduct").hide();
                                            $("#c_kucun").hide();
                                            $("#addCart").removeClass().addClass("btn-rush-wait");
                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                            $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                            $("#yushouCount").hide();
                                            if (preBuy.purStartTime == "" && preBuy.purEndTime == "") {
                                                $("#inerestBox").after('<span class="memo">抢购时间暂时未定，敬请关注</a></span>')
                                            }
                                        } else {
                                            if (preBuy.status == 6) {
                                                if (data.preLimit == 1) {
                                                    $("#nowProduct").show();
                                                    $("#c_kucun").show();
                                                    $("#addCart").removeClass().addClass("btn-privilege-end");
                                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                        $(".mainbtns").siblings("#jhsm").remove()
                                                    }
                                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                    $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                                    $("#yushouCount").hide()
                                                } else {
                                                    $("#nowProduct").show();
                                                    $("#c_kucun").show();
                                                    $("#addCart").removeClass().addClass("btn-rush");
                                                    $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                                    $("#addCart").attr("name", "item_" + sn.ninePartNumber + "_gmq_yyljqg");
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                        $(".mainbtns").siblings("#jhsm").remove()
                                                    }
                                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                    $("#addCart2").removeClass().addClass("btn-rush-mini");
                                                    $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(0);").removeAttr("target");
                                                    $("#addCart2").attr("name", "item_" + sn.ninePartNumber + "_gmq_yyljqg");
                                                    $("#yushouCount").hide()
                                                }
                                            } else {
                                                if (preBuy.status == 7) {
                                                    $("#nowProduct").hide();
                                                    $("#c_kucun").hide();
                                                    $("#addCart").removeClass().addClass("btn-rush-no");
                                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                        $(".mainbtns").siblings("#jhsm").remove()
                                                    }
                                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                    $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                                    $("#yushouCount").hide()
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                        if (preBuy.type == 2 && preBuy.status <= 4) {
                            $("#productLimit").html("每人限购<em>" + preBuy.personBuysLimit + "</em>件");
                            $("#productLimit").show();
                            $("#buyNum").attr("max", preBuy.personBuysLimit);
                            $("#buycount").show();
                            iFourth.buyNum()
                        } else {
                            if (preBuy.personBuysLimit != "0" && preBuy.personBuysLimit != "" && preBuy.personBuysLimit != undefined) {
                                $("#productLimit").html("每人限购<em>" + preBuy.personBuysLimit + "</em>件");
                                $("#productLimit").show();
                                $("#buyNum").attr("max", preBuy.personBuysLimit);
                                $("#buycount").show();
                                iFourth.buyNum()
                            }
                        }
                        if ((preBuy.status == 3 && data.priorPurchaseStartTime == "" && data.priorPurchaseEndTime == "") || (preBuy.status == 5 && data.purStartTime == "" && data.purEndTime == "")) {
                            $("#preTime").hide()
                        } else {
                            $("#preTime").show()
                        }
                    } else {
                        $("#nowProduct").hide();
                        $("#c_kucun").hide();
                        $("#addCart").removeClass().addClass("btn-mobile-disable");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        $("#inerestBox").after('<span class="memo">该商品为移动专享，如需购买请扫上方二维码</span>');
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $("#yushouCount").hide();
                        $("#addCart2").removeClass().addClass("btn-mobile-mini-disable");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#preTime").show()
                    }
                }
            }
        }
    }
};
FourPage.initGroupCmmdtySaleStatus = function(a) {
    try {
        $("#netPriceBox").hide();
        $("#promotionPriceBox").find("dt span").html("易购价");
        $("#promotionPriceBox").show();
        var b = sn.groupPromotionPrice + "";
        var f = parseFloat(b).toFixed(2);
        priceHtml = "<i>&yen;</i>" + f.substring(0, f.indexOf(".")) + ".<span>" + f.substring(f.indexOf(".") + 1) + "</span>";
        $("#proPriceBox").html('<span id="promotionPrice" class="mainprice">' + priceHtml + '</span><span id="limitTime" class="label hide"></span><a id="PriceNotice2" class="link" href="javascript:FourPage.subscribePriceNotice();">降价通知</a>');
        $("#netPriceBox").hide();
        if (a.invStatus == "1") {
            if (sn.shipOffSet != "" && sn.shipOffSet >= 0) {
                $("#shipOffset").val(sn.shipOffSet)
            }
            if (sn.freight != "-1") {
                Renxf.freenessPay();
                if (sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费" || sn.swlShopFlag) {
                    $("#c_kucun").html("现货");
                    $("#c_yunfei").hide();
                    $("#mianyunfei").parent().show()
                } else {
                    $("#c_kucun").html("现货");
                    $("#c_yunfei").html("运费 &yen;" + sn.freight);
                    $("#c_yunfei").show();
                    $("#mianyunfei").parent().hide();
                    if (sn.cFreightFreeFlag) {
                        $("#c_yunfei").html("");
                        $("#c_yunfei").hide();
                        $("#fare" + sn.vendorCode).html("<span>免运费</span>")
                    }
                }
                if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
                    if ($("#J-tieIn").length > 0) {
                        lazyElems["J-tieIn"].enable = true;
                        lazyElems["J-tieIn"].handle = CommonFourPage.runInitCFittingReady(sn.partNumber, CommonFourPage.initCFitting);
                        $("#listProContent").find("li[rel=#J-tieIn]").addClass("current")
                    }
                }
                swlItemFree();
                $("#nowProduct").html("");
                $("#nowProduct").removeClass("red");
                getDeliveryInfofunction(sn.partNumber, "showDeliveryInfo", showDeliveryInfoErr);
                $("#buycount").show();
                $("#addCart").removeClass().addClass("btn-addcart");
                $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                $("#addCart").show();
                $("#buyNowAddCart").show();
                $("#tabAddCart").show();
                $("#addCart2").removeClass().addClass("btn-addcart-mini");
                $("#addCart2").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                $("#addCart2").show();
                $("#netPriceBox").hide();
                $("#promotionPriceBox").show();
                $("#limitTime").hide();
                $("#J-slide1").hide()
            } else {
                $(".proinfo-deliver-oversea").hide();
                $("#productStatus").val("3");
                $("#productStatusDesc").val("4");
                $("#nowProduct").html("建议您选购其它商品");
                sn.shipOffSetText = "建议您选购其它商品";
                $("#c_kucun").html("暂不销售");
                $("#c_kucun").show();
                $("#nowProduct").addClass("red");
                $("#nowProduct").show();
                $("#cart2Price").html("");
                $("#buyNowAddCart").hide();
                $("#addCart").removeClass().addClass("btn-addcart-disable").show();
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods")
            }
        } else {
            if (sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费") {
                $("#mianyunfei").parent().show()
            } else {
                $("#mianyunfei").parent().hide()
            }
            $("#productStatus").val("2");
            $("#productStatusDesc").val("-1");
            swlItemFree();
            $("#buycount").hide();
            $("#yanbao").hide();
            $("#itHelp").hide();
            $("#nowProduct").html("暂无货&nbsp 点<a class='b' href='javascript:FourPage.subscribeArrivalNotice();'>到货通知</a>，到货第一时间通知您!");
            $("#nowProduct").addClass("red");
            $("#nowProduct").show();
            $("#tellMe").show();
            $("#c_kucun").html("无货");
            $("#c_kucun").show();
            $("#c_yunfei").hide();
            $("#netPrice").show();
            $("#buyNowAddCart").hide();
            $(".proinfo-deliver-oversea").hide();
            $("#addCart").removeClass().addClass("btn-addcart-disable");
            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
            $("#addCart").show();
            $("#tabAddCart").show();
            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
            qCodeHide();
            FourPage.withoutProductNum();
            CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods")
        }
    } catch (c) {
    }
    iFourth.mainHeight()
};
function initCShopPriceProcess() {
    try {
        var b = sn.priceInvData;
        sn.promotionPrice = sn.isPreBuy == 1 ? sn.promotionPrice : b.promotionPrice;
        if (sn.isPreBuy != "1" && sn.promotionPrice != "" && sn.promotionPrice != undefined && sn.scodeType != "7") {
            Renxf.freenessPay()
        } else {
            $("#freenessPay").hide()
        }
        sn.netPrice = b.netPrice;
        sn.itemPrice = b.itemPrice;
        sn.refPrice = b.refPrice;
        sn.salesOrg = b.salesOrg;
        sn.deptNo = b.deptNo;
        sn.vendor = b.vendor;
        sn.sendCityId = b.sendCityId;
        sn.vendorType = b.vendorType;
        sn.ownerPlace = b.ownerPlace;
        sn.accountPlace = b.accountPlace;
        sn.manageInvFlag = b.manageInvFlag;
        sn.factorySendFlag = b.factorySendFlag;
        sn.sendAvalidTime = b.sendAvalidTime;
        sn.priceType = sn.isPreBuy == 1 ? sn.priceType : b.priceType;
        if (b.manageInvFlag != "" && typeof b.manageInvFlag != "undefined") {
            $("#manageInvFlag").val(b.manageInvFlag)
        }
        if (sn.isPreBuy != 1) {
            sn.priceType = (b.priceType).indexOf("4") >= 0 ? "4" : (b.priceType)
        }
        sn.invStatus = b.invStatus;
        sn.productStatus = b.invStatus;
        snga.productStatus = sn.isPreBuy == 1 && b.invStatus == "2" ? "" : b.invStatus;
        PriceShow.actionId = b.juId;
        initChangeGroupCmmdtyCss("1");
        if ((sn.vendorType == "921C店" || sn.vendorType == "925SWL") && sn.catenIds != sn.jypwCatenIds) {
            $("#jypw").show()
        } else {
            $("#jypw").hide()
        }
        var a = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "_" + sn.vendorCode + "_.html";
        $("#callme").attr("href", "javascript:findpassSupplier('" + sn.vendorCode + "','" + a + "','','');");
        $("#callmeSide").attr("href", "javascript:findpassSupplier('" + sn.vendorCode + "','" + a + "','','');");
        getFreightList(sn.partNumber, "showFreightList", showFreightListErr, showFreightList);
        $("#shopNetPrice" + sn.vendorCode).find(".price").html("<i>&yen;</i><em>" + sn.promotionPrice + "</em>");
        if (sn.isPreBuy == 1) {
            $("#shop" + sn.vendorCode + " .price").eq(0).siblings("i").remove()
        }
        if (sn.promotionPrice != "" && typeof sn.promotionPrice != "undefined") {
            $("#existPrice").show();
            $("#noPrice").hide();
            $("#cart2Price").html(sn.promotionPrice);
            if (typeof b.invStatus != "undefined" && b.invStatus == "1") {
                $("#productStatus").val("1");
                $("#productStatusDesc").val("-1")
            } else {
                if (typeof b.invStatus != "undefined" && b.invStatus == "0") {
                    $("#productStatus").val("3");
                    $("#productStatusDesc").val("2")
                } else {
                    $("#productStatus").val("2");
                    $("#productStatusDesc").val("-1")
                }
            }
            getItemPromStatus(sn.partNumber, "FourPage.showPromStatus")
        } else {
            $("#noPrice").show();
            $(".proinfo-deliver-oversea").hide();
            $("#productStatus").val("3");
            $("#productStatusDesc").val("1");
            initCShopOffSaleStatus()
        }
        if (sn.swlShopFlag && sn.sizeAttr == "2") {
            $("#vendorType").val(3);
            sn.ziti = true;
            $(".ziti").parent().show()
        } else {
            sn.ziti = false;
            $(".ziti").parent().hide()
        }
        FourPage.showServiceName();
        CommonFourPage.FourPage.initReturnOrChange(sn.partNumber, "FourPage.showReturnOrchange");
        setTimeout(setiDiggerTrackingCodes, 1000)
    } catch (c) {
    }
    if (!sn.hwgShopFlag) {
        FourPage.getCShopAttr()
    }
    if (sn.vendorCode != "" && sn.invStatus == "1" && sn.freight != "-1") {
        processQcode();
        setTimeout(processQcode, 500)
    } else {
        qCodeHide()
    }
    iFourth.mainHeight();
    FourPage.shareWb()
}
FourPage.initCProductSaleStatus = function() {
    try {
        var a = sn.priceInvData;
        sn.preBuyFlag = 0;
        if ((sn.isPreBuy == 1 && (preBuy.status == 1 || preBuy.status == 2 || preBuy.status == 3 || preBuy.status == 5 || preBuy.status == 7))) {
            sn.preBuyFlag = 1
        }
        snga.productStatus = sn.isPreBuy == 1 && a.invStatus == "2" ? "" : a.invStatus;
        snga.shipOffset = a.shipOffSet;
        sn.invStatus = a.invStatus;
        if (typeof snga.productStatus != "undefined" && snga.productStatus == "1") {
            $("#productStatus").val("1");
            $("#productStatusDesc").val("-1")
        } else {
            if (typeof snga.productStatus != "undefined" && snga.productStatus == "0") {
                $("#productStatus").val("3");
                $("#productStatusDesc").val("2")
            } else {
                $("#productStatus").val("2");
                $("#productStatusDesc").val("-1")
            }
        }
        if (sn.preBuyFlag != 1) {
            if (a.invStatus == "1") {
                if (sn.shipOffSet != "" && sn.shipOffSet >= 0) {
                    $("#shipOffset").val(sn.shipOffSet)
                }
                if (sn.freight != "-1") {
                    if (sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费" || sn.swlShopFlag) {
                        $("#c_kucun").html("现货");
                        $("#c_yunfei").hide();
                        $("#mianyunfei").parent().show()
                    } else {
                        $("#c_kucun").html("现货");
                        $("#c_yunfei").html("运费 &yen;" + sn.freight);
                        $("#c_yunfei").show();
                        $("#mianyunfei").parent().hide();
                        if (sn.cFreightFreeFlag) {
                            $("#c_yunfei").html("");
                            $("#c_yunfei").hide();
                            $("#fare" + sn.vendorCode).html("<span>免运费</span>")
                        }
                    }
                    if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
                        if ($("#J-tieIn").length > 0) {
                            lazyElems["J-tieIn"].enable = true;
                            lazyElems["J-tieIn"].handle = CommonFourPage.runInitCFittingReady(sn.partNumber, CommonFourPage.initCFitting);
                            $("#listProContent").find("li[rel=#J-tieIn]").addClass("current")
                        }
                    }
                    swlItemFree();
                    $("#nowProduct").html("");
                    $("#nowProduct").removeClass("red");
                    getDeliveryInfofunction(sn.partNumber, "showDeliveryInfo", showDeliveryInfoErr);
                    $("#buycount").show();
                    if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
                        var b = "";
                        if (preBuy.type == 2 && preBuy.status == 4) {
                            b = "注：抢购仅限获取预约特权购资格的用户";
                            $("#addCart").removeClass().addClass("btn-privilege")
                        } else {
                            $("#addCart").removeClass().addClass("btn-rush");
                            b = "注：抢购仅限获取预约资格用户"
                        }
                        $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + b + "</p>");
                        $("#yushouCount").hide();
                        if (preBuy.type == 2 && preBuy.status == 4) {
                            $("#addCart2").removeClass().addClass("btn-privilege-mini")
                        } else {
                            $("#addCart2").removeClass().addClass("btn-rush-mini")
                        }
                        $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                        $("#buyNowAddCart").hide();
                        if (preBuy.preLimit == 1) {
                            $("#addCart").removeClass().addClass("btn-privilege-end");
                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                        }
                    } else {
                        $("#addCart").removeClass().addClass("btn-addcart");
                        $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                        $("#addCart").show();
                        if (sn.scodeType == "7") {
                            FourPage.scodeBuyStyle();
                            $("#buyNowAddCart").show()
                        } else {
                            $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                        }
                        $("#tabAddCart").show();
                        $("#addCart2").removeClass().addClass("btn-addcart-mini");
                        $("#addCart2").attr("href", "javascript:Cart.addCart();").removeAttr("target")
                    }
                    if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                        $("#preTime").hide();
                        $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                        $("#c_kucun").html("暂不销售").show();
                        $("#buyNowAddCart").hide();
                        $("#addCart").removeClass().addClass("btn-addcart-disable");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#yushouCount").hide();
                        $("#buycount").hide();
                        $("#tellMe").hide()
                    }
                    if (FourPage.comparePrice(sn.promotionPrice, sn.netPrice) == -1) {
                        PriceShow.priceController()
                    } else {
                        if (sn.refPrice != undefined && sn.refPrice != "") {
                            PriceShow.priceController()
                        } else {
                            $("#netPriceBox").hide()
                        }
                        $("#promotionPriceBox").show();
                        $("#limitTime").hide()
                    }
                    $("#J-slide1").hide();
                    if (sn.swlShopFlag) {
                        $("#itHelp").show()
                    }
                    if (sn.swlShopFlag) {
                        FourPage.initJSD()
                    }
                    if (sn.vendorCode != "" && sn.invStatus == "1" && sn.freight != "-1") {
                        processQcode();
                        setTimeout(processQcode, 500)
                    } else {
                        qCodeHide()
                    }
                } else {
                    $(".proinfo-deliver-oversea").hide();
                    $("#productStatus").val("3");
                    $("#productStatusDesc").val("4");
                    initCShopOffSaleStatus();
                    FourPage.withoutProductNum()
                }
            } else {
                if (sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费") {
                    $("#mianyunfei").parent().show()
                } else {
                    $("#mianyunfei").parent().hide()
                }
                $("#productStatus").val("2");
                $("#productStatusDesc").val("-1");
                swlItemFree();
                $("#buycount").hide();
                $("#yanbao").hide();
                $("#itHelp").hide();
                $("#nowProduct").html("暂无货&nbsp 点<a class='b' href='javascript:FourPage.subscribeArrivalNotice();'>到货通知</a>，到货第一时间通知您!");
                $("#nowProduct").addClass("red");
                $("#nowProduct").show();
                $("#tellMe").show();
                $("#c_kucun").html("无货");
                $("#c_yunfei").hide();
                $("#netPrice").show();
                $("#buyNowAddCart").hide();
                $(".proinfo-deliver-oversea").hide();
                if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
                    var b = "";
                    if (preBuy.type == 2 && preBuy.status == 4) {
                        b = "注：抢购仅限获取预约特权购资格的用户";
                        $("#addCart").removeClass().addClass("btn-privilege-disable")
                    } else {
                        $("#addCart").removeClass().addClass("btn-rush-disable");
                        b = "注：抢购仅限获取预约资格用户"
                    }
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + b + "</p>");
                    $("#yushouCount").hide();
                    if (preBuy.type == 2 && preBuy.status == 4) {
                        $("#addCart2").removeClass().addClass("btn-privilege-mini-disable")
                    } else {
                        $("#addCart2").removeClass().addClass("btn-rush-mini-disable")
                    }
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#buyNowAddCart").hide();
                    sn.shipOffSetText = "本商品在该城市暂无货";
                    $("#nowProduct").html("本商品在该城市暂无货");
                    $("#nowProduct").removeClass("red");
                    $("#tellMe").hide()
                } else {
                    $("#addCart").removeClass().addClass("btn-addcart-disable");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#tabAddCart").show();
                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                }
                if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                    $("#preTime").hide();
                    $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                    $("#c_kucun").html("暂不销售").show();
                    $("#buyNowAddCart").hide();
                    $("#addCart").removeClass().addClass("btn-addcart-disable");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#yushouCount").hide();
                    $("#buycount").hide();
                    $("#tellMe").hide()
                }
                qCodeHide();
                FourPage.withoutProductNum();
                CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods")
            }
        } else {
            $("#buyNowAddCart").hide();
            $("#buycount").show();
            if (sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费") {
                $("#mianyunfei").parent().show()
            } else {
                $("#mianyunfei").parent().hide()
            }
            if (sn.freight != "-1") {
                if (sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费" || sn.swlShopFlag) {
                    $("#c_kucun").html("现货");
                    $("#c_yunfei").hide();
                    $("#mianyunfei").parent().show()
                } else {
                    $("#c_kucun").html("现货");
                    $("#c_yunfei").html("运费 &yen;" + sn.freight);
                    $("#c_yunfei").show();
                    $("#mianyunfei").parent().hide();
                    if (sn.cFreightFreeFlag) {
                        $("#c_yunfei").html("");
                        $("#c_yunfei").hide();
                        $("#fare" + sn.vendorCode).html("<span>免运费</span>")
                    }
                }
                if (sn.vendorCode != "" && sn.invStatus == "1" && sn.freight != "-1") {
                    processQcode();
                    setTimeout(processQcode, 500)
                } else {
                    qCodeHide()
                }
            }
            swlItemFree();
            if (a.invStatus == "1") {
                if (sn.freight != "-1") {
                    $("#c_kucun").html("现货");
                    sn.shipOffSetText = "";
                    $("#nowProduct").html("");
                    $("#nowProduct").removeClass("red");
                    getDeliveryInfofunction(sn.partNumber, "showDeliveryInfo", showDeliveryInfoErr)
                } else {
                    snga.productStatus = "3";
                    $("#c_kucun").html("暂不销售");
                    sn.shipOffSetText = "建议您选购其它商品";
                    $("#nowProduct").html("建议您选购其它商品");
                    $("#nowProduct").addClass("red");
                    $(".proinfo-deliver-oversea").hide();
                    qCodeHide()
                }
            } else {
                $("#c_kucun").html("无货");
                sn.shipOffSetText = "本商品在该城市暂无货";
                $("#nowProduct").html("本商品在该城市暂无货");
                $("#nowProduct").removeClass("red");
                $("#tellMe").hide();
                if (sn.preBuyFlag == 1) {
                    $("#nowProduct").hide()
                } else {
                    $("#nowProduct").show()
                }
                $(".proinfo-deliver-oversea").hide();
                qCodeHide();
                FourPage.withoutProductNum()
            }
            $("#c_kucun").hide();
            $("#nowProduct").hide();
            if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                $("#preTime").hide();
                $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                $("#c_kucun").html("暂不销售").show();
                $("#buyNowAddCart").hide();
                $("#addCart").removeClass().addClass("btn-addcart-disable");
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                if ($("#inerestBox").siblings(".memo").length > 0) {
                    $("#inerestBox").siblings(".memo").remove()
                }
                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                    $(".mainbtns").siblings("#jhsm").remove()
                }
                $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                $("#yushouCount").hide();
                $("#buycount").hide();
                $("#tellMe").hide()
            }
        }
    } catch (c) {
    }
    if (sn.isPreBuy == 2) {
        resetBookCss()
    }
    FourPage.runDapushWhenReady();
    iFourth.mainHeight()
};
function showFreightList(a) {
    sn.fareList = a;
    FourPage.fareHtml()
}
function showFreightListErr() {
    try {
        if (sn.vendorCode == "" || sn.swlShopFlag) {
            var a = parseFloat(sn.snslt);
            var b = parseFloat(sn.promotionPrice);
            if (a <= 0 || sn.shipChargeLimitAmount == "" || sn.shipChargeLimitAmount == undefined) {
                $("#mianyunfei").html('<i class="icon"></i>免运费');
                $("#mianyunfei").parent().removeAttr("title")
            } else {
                if (sn.promotionPrice == "" || sn.promotionPrice == undefined || b >= a) {
                    $("#mianyunfei").html('<i class="icon"></i>免运费');
                    $("#mianyunfei").parent().attr("title", a + "元以上订单免运费（限苏宁配送商品）")
                } else {
                    if (b < a) {
                        $("#mianyunfei").html('<i class="icon"></i>满' + sn.snslt + "元免运费");
                        $("#mianyunfei").parent().attr("title", a + "元以上订单免运费（限苏宁配送商品）")
                    }
                }
            }
        } else {
            sn.shippingCharge = "-1";
            sn.freight = "-1";
            PriceShow.setPrice(sn.priceType, sn.netPrice, sn.promotionPrice, sn.priceController)
        }
    } catch (c) {
    }
}
FourPage.fareHtml = function(h) {
    try {
        var k = sn.fareList;
        var a = false;
        if (typeof k != "undefined") {
            if (h == "1" && sn.shopList.length > 0) {
                var b = "";
                if (sn.shopList[0].vendorCode == "0000000000" || sn.shopList[0].vendorCode == "" || sn.shopList[0].vendorCode == "undefined") {
                    b = ""
                } else {
                    b = sn.shopList[0].vendorCode
                }
                if ($("#fare" + b).html() == "") {
                    for (var c = 0;
                            c < k.length;
                            c++) {
                        var g = k[c].vendorCode == "0000000000" ? "" : k[c].vendorCode;
                        var f = $("#shopNetPrice" + g + " em").html();
                        if (k[c].fare == "-1") {
                            $("#fare" + g).hide()
                        } else {
                            $("#fare" + g).show();
                            if (k[c].fare == "" || k[c].fare == "0" || k[c].fare == "0.00" || k[c].fare == ".00" || k[c].fare == "免运费" || typeof f == "undefined" || f == "") {
                                $("#fare" + g).html("<span>免运费</span>")
                            } else {
                                $("#fare" + g).html('<span>运费:</span><span class="price"><i>&yen;</i><em>' + parseFloat(k[c].fare).toFixed(2) + "</em></span>")
                            }
                        }
                        if (k[c].vendorCode == "0000000000" && (parseFloat(sn.shipChargeLimitAmount) <= parseFloat(f) || sn.promotionPrice == "")) {
                            $("#fare" + g).html("<span>免运费</span>")
                        }
                    }
                    snItemFree();
                    if (sn.cFreightFreeFlag && sn.vendorCode != "") {
                        $("#c_yunfei").html("");
                        $("#c_yunfei").hide();
                        $("#fare" + sn.vendorCode).html("<span>免运费</span>")
                    }
                }
            } else {
                for (var c = 0;
                        c < k.length;
                        c++) {
                    if ((k[c].vendorCode == "0000000000" && (sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003" || sn.swlShopFlag == true)) || (k[c].vendorCode == sn.vendorCode)) {
                        sn.shippingCharge = sn.isPreBuy != 2 ? k[c].fare : "";
                        sn.freight = k[c].fare;
                        a = true
                    }
                    if (k[c].vendorCode == "0000000000") {
                        sn.snsltFare = k[c].fare;
                        sn.shipChargeLimitAmount = k[c].snslt != undefined ? k[c].snslt : "";
                        sn.snslt = sn.shipChargeLimitAmount
                    }
                    var g = k[c].vendorCode == "0000000000" ? "" : k[c].vendorCode;
                    var f = $("#shopNetPrice" + g + " em").html();
                    if (k[c].fare == "-1") {
                        $("#fare" + g).hide()
                    } else {
                        $("#fare" + g).show();
                        if (k[c].fare == "" || k[c].fare == "0" || k[c].fare == "0.00" || k[c].fare == ".00" || k[c].fare == "免运费" || f == undefined || f == "") {
                            $("#fare" + g).html("<span>免运费</span>")
                        } else {
                            $("#fare" + g).html('<span>运费:</span><span class="price"><i>&yen;</i><em>' + parseFloat(k[c].fare).toFixed(2) + "</em></span>")
                        }
                    }
                    if (k[c].vendorCode == "0000000000" && (parseFloat(sn.shipChargeLimitAmount) <= parseFloat(f) || sn.promotionPrice == "")) {
                        $("#fare" + g).html("<span>免运费</span>")
                    }
                }
                if (!a) {
                    if (!(sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003" || sn.swlShopFlag)) {
                        sn.freight = "-1";
                        sn.shippingCharge = "-1"
                    } else {
                        sn.freight = "免运费";
                        sn.shippingCharge = "免运费"
                    }
                }
                if (sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003") {
                    snItemFree()
                } else {
                    if (sn.swlShopFlag) {
                        swlItemFree()
                    }
                    if (sn.promotionPrice != "") {
                        PriceShow.setPrice(sn.priceType, sn.netPrice, sn.promotionPrice, sn.priceController)
                    }
                }
                if (sn.groupFlag) {
                    FourPage.initGroupCmmdtySaleStatus(sn.groupInvPrice)
                }
            }
            initShopListSWLFare();
            if (sn.cFreightFreeFlag && sn.vendorCode != "") {
                $("#c_yunfei").html("");
                $("#c_yunfei").hide();
                $("#fare" + sn.vendorCode).html("<span>免运费</span>")
            }
        }
        if (!sn.groupFlag) {
            if (sn.isPreBuy == 2) {
                sn.freight = "0";
                sn.shippingCharge = "0";
                shipChargeLimitAmount = "0";
                $("#fare" + sn.vendorCode).html("<span>免运费</span>").show();
                $("#mianyunfei").html('<i class="icon"></i>免运费');
                $("#mianyunfei").parent().show()
            } else {
                if (sn.vendorCode != "" && typeof sn.freight != "undefined" && sn.freight != "" && sn.freight != "-1" && !sn.swlShopFlag && !(sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费")) {
                    $("#c_yunfei").html("运费 &yen;" + sn.freight);
                    $("#c_yunfei").show()
                } else {
                    $("#c_yunfei").html();
                    $("#c_yunfei").show()
                }
            }
        }
    } catch (j) {
    }
};
function initShopListSWLFare() {
    var e = sn.shopList;
    if (e != null && e.length > 0) {
        for (var a = 0;
                a < e.length;
                a++) {
            if (e[a].shopType == "925SWL") {
                var b = e[a].vendorCode;
                var c = e[a].productPrice == "" ? 0 : parseFloat(e[a].productPrice);
                if (typeof sn.shipChargeLimitAmount == "undefined" || sn.shipChargeLimitAmount == "" || parseFloat(sn.shipChargeLimitAmount) <= 0 || c >= parseFloat(sn.shipChargeLimitAmount) || sn.snsltFare == 0) {
                    $("#fare" + b).html("<span>免运费</span>")
                } else {
                    $("#fare" + b).html('<span>运费:</span><span class="price"><i>&yen;</i><em>' + parseFloat(sn.snsltFare).toFixed(2) + "</em></span>")
                }
            }
        }
    }
}
function snItemFree() {
    if (sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003") {
        if (sn.isPreBuy == 2) {
            sn.snslt = "0"
        }
        var a = parseFloat(sn.snslt);
        var b = parseFloat(sn.promotionPrice);
        if (a <= 0 || sn.shipChargeLimitAmount == "" || sn.shipChargeLimitAmount == undefined) {
            $("#mianyunfei").html('<i class="icon"></i>免运费');
            $("#mianyunfei").parent().removeAttr("title");
            $("#fare" + sn.vendorCode).html("<span>免运费</span>")
        } else {
            if (sn.promotionPrice == "" || sn.promotionPrice == undefined || b >= a) {
                $("#mianyunfei").html('<i class="icon"></i>免运费');
                $("#mianyunfei").parent().attr("title", a + "元以上订单免运费（限苏宁配送商品）");
                $("#fare" + sn.vendorCode).html("<span>免运费</span>")
            } else {
                if (b < a) {
                    $("#mianyunfei").html('<i class="icon"></i>满' + sn.snslt + "元免运费");
                    $("#mianyunfei").parent().attr("title", a + "元以上订单免运费（限苏宁配送商品）");
                    $("#fare" + sn.vendorCode).html('<span>运费:</span><span class="price"><i>¥</i><em>' + parseFloat(sn.freight).toFixed(2) + "</em></span>");
                    if ($(".ziti").parent().is(":visible")) {
                        $(".ziti").html('<i class="icon"></i>自提(免运费)')
                    }
                }
            }
        }
    }
}
function swlItemFree() {
    if (sn.swlShopFlag) {
        if (sn.isPreBuy == 2) {
            sn.snslt = "0"
        }
        var a = parseFloat(sn.snslt);
        var b = parseFloat(sn.promotionPrice);
        if (a <= 0 || sn.shipChargeLimitAmount == "" || sn.shipChargeLimitAmount == undefined) {
            $("#mianyunfei").html('<i class="icon"></i>免运费');
            $("#mianyunfei").parent().removeAttr("title");
            $("#fare" + sn.vendorCode).html("<span>免运费</span>");
            $("#mianyunfei").parent().show()
        } else {
            if (sn.promotionPrice == "" || sn.promotionPrice == undefined || b >= a) {
                $("#mianyunfei").html('<i class="icon"></i>免运费');
                $("#mianyunfei").parent().attr("title", sn.snslt + "元以上订单免运费（限苏宁配送商品）");
                $("#fare" + sn.vendorCode).html("<span>免运费</span>");
                $("#mianyunfei").parent().show()
            } else {
                if (b < a) {
                    $("#mianyunfei").html('<i class="icon"></i>满' + sn.snslt + "元免运费");
                    $("#mianyunfei").parent().attr("title", sn.snslt + "元以上订单免运费（限苏宁配送商品）");
                    $("#fare" + sn.vendorCode).html('<span>运费:</span><span class="price"><i>¥</i><em>' + parseFloat(sn.freight).toFixed(2) + "</em></span>");
                    $("#mianyunfei").parent().show();
                    if ($(".ziti").parent().is(":visible")) {
                        $(".ziti").html('<i class="icon"></i>自提(免运费)')
                    }
                }
            }
        }
    }
}
FourPage.showShopList = function(b) {
    try {
        var t = false;
        var v = b;
        var l = "";
        var w = "";
        sn.brandHtml = "";
        var m = "";
        var a = $("#shop_code").val();
        var u = $("#shop_name").val();
        var j = $("#shop_status").val();
        sn.brandShopCode = a;
        sn.brandShopName = u;
        sn.brandShopStatus = j;
        if (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) {
            if (a != null && a != "") {
                sn.brandHtml = "si-wrap si-ultimate"
            } else {
                sn.brandHtml = "si-wrap si-own"
            }
        } else {
            sn.brandHtml = "si-wrap si-own"
        }
        var g = "";
        if (a != null && a != "") {
            g = sn.shopPath + sn.shopMainPh + "/" + a.substring(2, 10) + "/index.html"
        } else {
            g = sn.brandDomain + "/" + a + "/index.html"
        }
        sn.shopUrl = g;
        if (v != null && v.length > 0) {
            m = sn.sellerDomain + sn.ninePartNumber + ".html";
            sn.shopCount = v.length;
            var r = "";
            for (var n = 0;
                    n < v.length;
                    n++) {
                if (typeof v[n].shopType == "undefined" && typeof v[n].bizType != "undefined") {
                    if (v[n].bizType == 1) {
                        v[n].shopType = "925SWL"
                    } else {
                        if (v[n].bizType == 3) {
                            v[n].shopType = "927HWG"
                        } else {
                            v[n].shopType = v[n].bizType
                        }
                    }
                }
                var c = "";
                if (v[n].bizCode == "0000000000" || v[n].bizCode == "" || v[n].bizCode == "undefined") {
                    c = ""
                } else {
                    c = v[n].bizCode
                }
                if (sn.shopType == "-1" && (sn.vendorCode == v[n].bizCode || (sn.vendorCode == "" && v[n].bizCode == "0000000000"))) {
                    t = true;
                    r = v[n];
                    if (typeof sn.vendorType == "undefined" || sn.vendorType == "") {
                        sn.vendorType = c.shopType
                    }
                }
                if (n < 5) {
                    var o = "";
                    var k = "";
                    try {
                        var h = window.location.href.split("?")[1];
                        k = typeof h != "undefined" ? ("?" + h) : ""
                    } catch (p) {
                    }
                    var q = k.indexOf("#");
                    if (q != -1) {
                        k = k.substring(0, q)
                    }
                    if (v[n].bizCode == "0000000000" || v[n].bizCode == "" || v[n].bizCode == "undefined") {
                        if (a != null && a != "") {
                            l += '<li id="shop" rating="0%" class="' + (n == 0 ? "first" : "") + '">';
                            o = sn.itemDomain + "/0000000000/" + sn.partNumber.substring(9, 18) + ".html" + k;
                            l += '<a name="item_' + sn.ninePartNumber + "_shop_allshop010" + (n + 1) + '" title="苏宁自营" href="' + o + '"><div class="si-name">苏宁自营</div>'
                        } else {
                            l += '<li id="shop" rating="0%" class="' + (n == 0 ? "first" : "") + '">';
                            o = sn.itemDomain + "/0000000000/" + sn.partNumber.substring(9, 18) + ".html" + k;
                            l += '<a name="item_' + sn.ninePartNumber + "_shop_allshop010" + (n + 1) + '" title="" href="' + o + '"><div class="si-name"></div>'
                        }
                    } else {
                        l += '<li id="shop' + v[n].bizCode + '" rating="0%" class="' + (n == 0 ? "first" : "") + '">';
                        o = sn.itemDomain + "/" + v[n].bizCode + "/" + sn.partNumber.substring(9, sn.partNumber.length) + ".html" + k;
                        l += '<a name="item_' + sn.ninePartNumber + "_shop_allshop010" + (n + 1) + '" title="" href="' + o + '"><div class="si-name"></div>'
                    }
                    if (typeof v[n].priceType != "undefined" && v[n].priceType != "1" && v[n].priceType != "") {
                        l += '<div class="si-main-info"><div id="shopNetPrice' + c + '" class="si-fl"><i class="tag tag-cu"></i><span class="price"><i>&yen;</i><em>' + ((v[n].price != "" && !isNaN(v[n].price)) ? (parseFloat(v[n].price).toFixed(2)) : v[n].price) + "</em></span></div>"
                    } else {
                        l += '<div class="si-main-info"><div id="shopNetPrice' + c + '" class="si-fl"><span class="price"><i>&yen;</i><em>' + ((v[n].price != "" && !isNaN(v[n].price)) ? (parseFloat(v[n].price).toFixed(2)) : v[n].price) + "</em></span></div>"
                    }
                    l += '<div class="trans-charge si-fr" id="fare' + c + '">';
                    l += "</div></div></a>";
                    l += "</li>"
                }
            }
        }
        if (sn.shopType == "-1" && !t) {
            sn.shopCount += 1
        }
        sn.shopList = v;
        shopInfoList = v;
        w += '<span class="si-role si-fl">更多商家</span><span class="si-name si-fr"><a name="item_' + sn.ninePartNumber + '_shop_allshop01" title="' + v.length + '家" target="_blank" href="' + m + '">' + v.length + "家</a></span>";
        if (sn.shopType != "-1" && sn.shopType == "0") {
            FourPage.brandShopInfoHtml();
            var f = $("#curShop").html();
            if (typeof f != "undefined" && f != null && f != "") {
                cshopDesc = f
            }
        }
        cshopList = w + l;
        $("#moreShop").html(w);
        $("#cslpBox").html(l);
        $("#cshopBox").show();
        if ((sn.shopType == "0" || sn.shopType == "-1") && sn.vendorCode == "" && $("#curShop").length < 1) {
            $("#cshopBox").html('<div class="proinfo-side-inner"><div id="curShop" class="si-wrap si-own">' + cshopDesc + '</div><div id="c_shop_list" class="si-wrap store-more"><h3 id="moreShop" class="si-head">' + w + '</h3><div class="si-main"><ul id="cslpBox" class="clearfix">' + l + '</ul><div class="more-info"><div class="info-row"><span class="row-name">评分：</span><span class="row-val star-bg"><i class="star-val"></i></span></div><div class="info-row"><span class="row-name">好评：</span><span class="row-val good-val">96%</span></div><i class="icon-arrow-right"></i></div></div></div><div id="J-sideRec" class="si-rec" style="display:none;"><div class="si-rec-head"><a name="item_' + sn.ninePartNumber + '_shop_next" class="more" href="javascript:void(0);">换一组</a><h3>同类推荐</h3></div><ul id="tuijianShopList" class="si-rec-list"><div class="loading-holder"></div></ul></div></div>')
        }
        if (sn.shopType == "-1") {
            iFourth.showRating.start()
        }
        FourPage.getVendorListInfo(sn.shopList);
        if (v != null && v.length == 1) {
            snShopFlag = true;
            $("#c_shop_list").hide();
            if (sn.brandFlag == "" && !sn.donateFlag) {
                CommonFourPage.Recommend.shopListItems(sn.partNumber, "Recommend.shopListItemsHtml")
            }
        } else {
            FourPage.cShopListStatus();
            $("#tuijianShopList").html('<div class="loading-holder"></div>');
            $("#J-sideRec").hide()
        }
        $("#shop" + sn.vendorCode).addClass("selected");
        $("#shopNetPrice" + sn.vendorCode).find(".price").html("<i>&yen;</i><em>" + sn.promotionPrice + "</em>")
    } catch (p) {
    }
    FourPage.showServiceName();
    getShopScoreList("shopReviewScore");
    if (!sn.donateFlag) {
        FourPage.fareHtml("1")
    }
    FourPage.addShopListCss();
    iFourth.mainHeight()
};
FourPage.getVendorListInfo = function(b) {
    isExistshop = false;
    var e = b.length;
    if (e > 0) {
        var a = "";
        for (var c = 0;
                c < 5;
                c++) {
            if (typeof b[c] != "undefined" && b[c].bizCode != "") {
                a += b[c].bizCode;
                a += "-"
            }
        }
        if (a != "") {
            a = a.substring(0, a.length - 1)
        }
//        $.ajax({url: sn.itemDomain + "/pds-web/ajax/getVendorListInfo_" + a + ".html", type: "get", async: false, dataType: "json", success: function(j) {
//                if (typeof j.shopInfoList != "undefined") {
//                    var f = j.shopInfoList;
//                    if (f != "" && f.length > 0) {
//                        for (var g = 0;
//                                g < f.length;
//                                g++) {
//                            var h = f[g].vendorCode == "0000000000" ? "" : f[g].vendorCode;
//                            $("#shop" + h + " .si-name").html(f[g].shopName);
//                            if (sn.vendorCode == h) {
//                                isExistshop = true;
//                                if (sn.shopType == "-1") {
//                                    var k = FourPage.showShopInfoHtml(f[g])
//                                }
//                                $("#curShop").html(k);
//                                FourPage.showServiceName();
//                                FourPage.scoreHtml()
//                            }
//                        }
//                    }
//                }
//                if ($.trim($("#cshopBox").html()).length > 0) {
//                    cshopHtml = $("#cshopBox").html()
//                }
//                if (sn.groupFlag) {
//                    sn.cShopListFlag = "1";
//                    $("#c_shop_list").hide()
//                }
//                if (!isExistshop && sn.shopType == "-1") {
//                    getVendorInfo(showCurVendorInfo)
//                }
//                iFourth.mainHeight()
//            }, error: function() {
//                if (sn.shopType == "-1") {
//                    getVendorInfo(showCurVendorInfo)
//                }
//            }})
    }
};
FourPage.brandShopInfoHtml = function() {
    var a = "";
    if (sn.brandShopCode != null && sn.brandShopCode != "") {
        if (sn.brandFlag != "") {
            if (sn.brandShopStatus == "0" || sn.brandShopStatus == null || sn.brandShopStatus == "") {
                $("#shopMain").html('<span class="si-role">商家：</span><span id="curShopName" class="si-name"><a name="item_' + sn.ninePartNumber + '_shop_dianpu02" target="_blank" href="' + sn.shopUrl + '">' + sn.brandShopName + '<i class="ie"></i></a></span>')
            } else {
                $("#shopMain").html('<span class="si-role fwn">商家：</span><span id="curShopName" class="si-name fwn">' + sn.brandShopName + '</span><i class="ie"></i>')
            }
            sn.reviewShopName = sn.brandShopName
        } else {
            if (sn.brandShopStatus == "0" || sn.brandShopStatus == null || sn.brandShopStatus == "") {
                $("#shopMain").html('<span class="si-role">商家：</span><span id="curShopName" class="si-name"><a name="item_' + sn.ninePartNumber + '_shop_dianpu02" target="_blank" href="' + sn.shopUrl + '">苏宁自营<i class="ie"></i></a></span>')
            } else {
                $("#shopMain").html('<span class="si-role fwn">商家：</span><span id="curShopName" class="si-name fwn">苏宁自营</span><i class="ie"></i>')
            }
            sn.reviewShopName = sn.brandShopName
        }
        if (sn.brandShopStatus == "0" || sn.brandShopStatus == null || sn.brandShopStatus == "") {
            a += '<div class="si-website"><a class="si-btn si-btn-yellow" target="_blank" name="item_' + sn.ninePartNumber + '_shop_jinru01" href=' + sn.shopUrl + "><span>进入店铺</span></a></div>"
        } else {
            a += '<div class="si-website"><span class="si-btn si-btn-disabled" title="店铺装修中">店铺装修中</span></div>'
        }
        $("#satisfaction").siblings().remove();
        $("#satisfaction").after(a);
        $("#curShop").removeClass().addClass("si-wrap si-ultimate")
    } else {
        if ((sn.brandShopCode == null || sn.brandShopCode == "") && (sn.vendorCode.substring(0, 3) == "003")) {
            $("#shopMain").html('<span class="si-role fwn">商家：</span><span id="curShopName" class="si-name fwn">苏宁自营</span>');
            $("#curShop").removeClass().addClass("si-wrap si-own")
        } else {
            $("#curShop").removeClass().addClass("si-wrap si-own")
        }
    }
};
FourPage.addShopListCss = function() {
    if (sn.hwgShopFlag) {
        if ($(".si-main-oversea").length < 1) {
            $("#curShop").find(".si-main").addClass("si-main-oversea")
        }
    } else {
        $("#curShop").find(".si-main").removeClass("si-main-oversea")
    }
};
FourPage.showShopInfoHtml = function(b) {
    var a = "";
    if (typeof b.vendorCode == "undefined" && typeof b.bizCode != "undefined") {
        b.vendorCode = b.bizCode
    }
    if (b.vendorCode == "SN_001") {
        b.vendorCode = "0000000000"
    }
    if (typeof b.shopName == "undefined") {
        b.shopName = ""
    }
    try {
        if (b.shopStatus != undefined && b.shopStatus == "0" && b.vendorCode != "" && b.vendorCode != "0000000000" && b.vendorCode != "undefined") {
            if (b.secUrl != undefined && b.secUrl != "") {
                sn.secUrl = b.secUrl
            }
            $("#curShop").removeClass().addClass("si-wrap si-own");
            a += '<h3 id="shopMain" class="si-shopname"><span class="si-role">商家：</span><span id="curShopName" class="si-name"><a name="item_' + sn.ninePartNumber + '_shop_dianpu02" target="_blank" href="' + (b.secUrl != undefined && b.secUrl != "" ? b.secUrl : (sn.shopPath + sn.shopMainPh + "/" + b.vendorCode.substring(2, 10) + "/index.html")) + '">' + b.shopName + "</a></span></h3>"
        } else {
            if (b.vendorCode == "" || b.vendorCode == "0000000000" || b.vendorCode == "undefined") {
                if (sn.brandShopCode != null && sn.brandShopCode != "") {
                    if (sn.brandShopStatus == "0" || sn.brandShopStatus == null || sn.brandShopStatus == "") {
                        a += '<h3 class="si-shopname"><span class="si-role">商家：</span><span id="curShopName" class="si-name"><a name="item_' + sn.ninePartNumber + '_shop_dianpu02" target="_blank" href="' + sn.shopUrl + '" title="苏宁自营">苏宁自营<i class="ie"></i></a></span></h3>'
                    } else {
                        a += '<h3 class="si-shopname"><span class="si-role fwn">商家：</span><span id="curShopName" class="si-name fwn">苏宁自营</span><i class="ie"></i></h3>'
                    }
                    $("#curShop").removeClass().addClass("si-wrap si-ultimate")
                } else {
                    a += '<h3 class="si-shopname"><span class="si-role fwn">商家：</span><span id="curShopName" class="si-name fwn">' + b.shopName + "</span></h3>";
                    $("#curShop").removeClass().addClass("si-wrap si-own")
                }
            } else {
                a += '<h3 class="si-shopname"><span class="si-role fwn">商家：</span><span id="curShopName" class="si-name fwn">' + b.shopName + "</span></h3>";
                $("#curShop").removeClass().addClass("si-wrap si-own")
            }
        }
        sn.reviewShopName = b.shopName;
        a += '<div class="si-main">';
        a += '<ul class="clearfix"><li><div class="si-rating si-fl"><span class="rating-name">商家满意度</span><span class="rating-val"><em></em></span></div>';
        a += '<div class="si-range si-range-title si-fr"><span>与同行业相比</span></div></li>';
        a += '<li><div class="si-rating si-fl"><span class="rating-name">商品评分：</span><span class="rating-val"><em id="gSatisfy"></em>分</span></div>';
        a += '<div class="si-range si-fr" id="gSatisfyP"></div></li>';
        a += '<li><div class="si-rating si-fl"><span class="rating-name">服务态度：</span><span class="rating-val"><em id="sSatisfy"></em>分</span></div>';
        a += '<div class="si-range si-fr" id="sSatisfyP"></div></li>';
        a += '<li><div class="si-rating si-fl"><span class="rating-name">物流速度：</span><span class="rating-val"><em id="dSatisfy"></em>分</span></div>';
        a += '<div class="si-range si-fr" id="dSatisfyP"></div></li></ul>';
        if (sn.vendorCode == "" || b.vendorCode == "0000000000" || b.vendorCode == "undefined") {
            sn.vendorCode = "";
            if (sn.brandShopCode != null && sn.brandShopCode != "") {
                if (sn.brandShopStatus == "0") {
                }
                if (sn.brandShopStatus == "1") {
                    a += '<div class="si-website"><span class="si-btn si-btn-disabled" title="店铺装修中">店铺装修中</span></div></div>'
                } else {
                    a += '<div class="si-website"><a class="si-btn si-btn-yellow" target="_blank" name="item_' + sn.ninePartNumber + '_shop_jinru01" href=' + sn.shopUrl + "><span>进入店铺</span></a></div></div>"
                }
            } else {
                a += "</div>"
            }
        } else {
            if (b.shopStatus == "0") {
                if ((typeof b.companyName != "undefined" && b.companyName != "") || (typeof b.telPhone != "undefined" && b.telPhone != "")) {
                    a += '<div class="si-detail">';
                    if (typeof b.companyName != "undefined" && b.companyName != "") {
                        a += '<p><span class="detail-name">公司：</span><span class="detail-val">' + b.companyName + "</span></p>"
                    }
                    if (typeof b.telPhone != "undefined" && b.telPhone != "") {
                        if ((sn.shopType != undefined && sn.shopType == "3") || sn.vendorType == "927HWG1" || sn.vendorType == "927HWG") {
                            a += '<p><span class="detail-name" style="letter-spacing: 2px;">服务电话：</span><span class="detail-val">' + b.telPhone + "</span></p>"
                        } else {
                            a += '<p><span class="detail-name" style="letter-spacing: 2px;">TEL：</span><span class="detail-val">' + b.telPhone + "</span></p>"
                        }
                    }
                    a += "</div>"
                }
                a += '<div class="si-website"><a name="item_' + sn.ninePartNumber + '_shop_jinru02" class="si-btn si-btn-yellow" title="进入店铺" target="_blank" href="' + (b.secUrl != undefined && b.secUrl != "" ? b.secUrl : (sn.shopPath + sn.shopMainPh + "/" + b.vendorCode.substring(2, 10) + "/index.html")) + '">进入店铺</a> <a name="item_' + sn.ninePartNumber + '_shop_shoucang02" class="si-btn" title="收藏店铺" href="javascript:FourPage.addShopFavorite();">收藏店铺</a></div></div>'
            } else {
                a += '<div class="si-website"><span class="si-btn si-btn-disabled" title="店铺装修中">店铺装修中</span></div>'
            }
        }
        if (sn.vendorType == "925SWL") {
            $("#vendorType").val(3);
            sn.swlShopFlag = true;
            a = '<div  class="si-flag si-flag-fw"><a href="http://help.suning.com/page/id-494.htm" target="_blank" class="link"></a></div>' + a
        } else {
            if (sn.vendorType == "927HWG" || sn.vendorType == "927HWG1") {
                sn.hwgShopFlag = true;
                a = '<div class="si-flag si-flag-oversea"></div>' + a
            } else {
                if (sn.vendorCode != "") {
                    a = '<div  class="si-flag si-flag-sj"></div>' + a
                } else {
                    a = '<div  class="si-flag si-flag-zy"></div>' + a
                }
            }
        }
        cshopDesc = a
    } catch (c) {
    }
    if (sn.hwgShopFlag) {
        CommonFourPage.hwgInitCss()
    }
    return a
};
function showCurVendorInfo(b) {
    var a = FourPage.showShopInfoHtml(b);
    $("#curShop").html(a);
    if ($.trim($("#cshopBox").html()).length > 0) {
        cshopHtml = $("#cshopBox").html()
    }
    FourPage.showServiceName();
    FourPage.scoreHtml();
    FourPage.addShopListCss();
    iFourth.mainHeight()
}
FourPage.showServiceName = function() {
    if ($("#curShopName").html() != null) {
        sn.shopName = $("#curShopName").html()
    } else {
        sn.shopName = ""
    }
    if (sn.donateFlag) {
        $("#shopName").html('由"' + sn.shopName + '"发起捐助，并提供服务')
    } else {
        if (sn.cflag == "0") {
            try {
                if (sn.swlShopFlag) {
                    $("#shopName").html('由"苏宁"直接发货，并享受售后服务')
                } else {
                    if (sn.sendCityName != undefined && sn.sendCityName != "" && (!sn.hwgShopFlag || (sn.hwgShopFlag && (sn.ownerPlace.indexOf("H") != 0 && sn.ownerPlace.indexOf("B") != 0 && sn.ownerPlace.indexOf("L") != 0)))) {
                        if (typeof ($("#cShopFlag").val()) != undefined && $("#cShopFlag").val() == "1") {
                            $("#shopName").html('由"<span>' + sn.shopName + '</span>"从&nbsp;&nbsp;' + sn.sendCityName + "&nbsp;&nbsp;销售和发货，并提供售后服务")
                        } else {
                            $("#shopName").html('由"' + sn.shopName + '"从&nbsp;&nbsp;' + sn.sendCityName + "&nbsp;&nbsp;销售和发货，并提供售后服务")
                        }
                    } else {
                        $("#shopName").html('由"' + sn.shopName + '"销售和发货，并提供售后服务')
                    }
                }
                if (sn.shipOffSetText != undefined && sn.invStatus == "1") {
                    $("#nowProduct").html(sn.shipOffSetText);
                    if (sn.isPreBuy == 1 && !preBuy.isEffect) {
                        $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
                        $("#c_kucun").html("暂不销售").show()
                    }
                }
            } catch (a) {
            }
            sn.reviewShopName = $("#cShopName").val()
        }
    }
};
function shopReviewScore(a) {
    if (a.returnCode == "1") {
        sn.scoreList = a.shopReviewScoreList;
        if (sn.vendorCode != "-1") {
            FourPage.scoreHtml()
        }
    }
}
FourPage.scoreHtml = function() {
    try {
        var a = sn.scoreList;
        if (a != undefined) {
            for (var b = 0;
                    b < a.length;
                    b++) {
                if ((a[b].shopId == "0000000000" && (sn.vendorCode == "" || sn.vendorCode.substring(0, 3) == "003")) || (a[b].shopId == sn.vendorCode)) {
                    $("#gSatisfy").html(parseFloat(a[b].qualityStar).toFixed(2));
                    $("#gSatisfyP").html(FourPage.scoreUtil(a[b].qualitySup));
                    $("#sSatisfy").html(parseFloat(a[b].attitudeStar).toFixed(2));
                    $("#sSatisfyP").html(FourPage.scoreUtil(a[b].attitudeSup));
                    $("#dSatisfy").html(parseFloat(a[b].deliverySpeedStar).toFixed(2));
                    $("#dSatisfyP").html(FourPage.scoreUtil(a[b].deliverySpeedSup))
                }
                var c = a[b].shopId == "0000000000" ? "" : a[b].shopId;
                var g = Math.round(a[b].shopStar * 20) + "%";
                $("#shop" + c).attr("rating", g)
            }
        }
    } catch (f) {
    }
    iFourth.showRating.start()
};
FourPage.scoreUtil = function(b) {
    b = parseFloat(b).toFixed(2) + "%";
    var a = "";
    if (parseFloat(b) >= 0) {
        a += '<i class="si-icon icon-upper"></i><span class="rating-val">' + (b) + "</span>"
    } else {
        b = b.substring(1, b.length);
        a += '<i class="si-icon icon-lower"></i><span class="rating-val">' + (b) + "</span>"
    }
    return a
};
var freeCoupon = [];
FourPage.showPromStatus = function(a) {
    try {
        freeCoupon = [];
        var b = a.activityList;
        if (b.length > 0 && sn.promotionPrice != "") {
            $.each(b, function(f, h) {
                if (h.activityTypeId == "3") {
                    if (sn.isPreBuy != 1 && h.activityLink != "") {
                        $("#istuangouBox").html('团购中&nbsp<a class="b" target="_blank" href="' + h.activityLink + '">立即预订</a>');
                        $("#istuangouTitle").css("display", "block");
                        $("#allcuxiao").show()
                    }
                } else {
                    if (h.activityTypeId == "4") {
                        var g = h.voucherShopType;
                        var e = "";
                        if (h.activityLink != "") {
                            e += h.activityDescription + " <a href='" + h.activityLink + "' target='_blank' class='b'>查看详情</a>"
                        } else {
                            e += h.activityDescription
                        }
                        if (typeof g != "undefined" && g != "" && g == "1") {
                            if (sn.vendorCode != "" && sn.vendorCode != "undefined" && sn.vendorCode != undefined && sn.vendorCode.substring(0, 3) != "003") {
                                if ($("#lhvoucherBox").html() != "") {
                                    $("#lhvoucherBox").after("<p class='promotion-content'>" + e + "</p>")
                                } else {
                                    $("#lhvoucherBox").html(e)
                                }
                                $("#lhvoucherTitle").css("display", "block");
                                $("#allcuxiao").show()
                            }
                        } else {
                            if ($("#voucherBox").html() != "") {
                                $("#voucherBox").after("<p class='promotion-content'>" + e + "</p>")
                            } else {
                                $("#voucherBox").html(e)
                            }
                            if (typeof h.activityFlag != "undefined" && h.activityFlag == "1") {
                                $("#buyNum").val("2")
                            } else {
                                $("#buyNum").val("1")
                            }
                            iFourth.buyNum();
                            $("#voucherTitle").css("display", "block");
                            $("#allcuxiao").show()
                        }
                    } else {
                        if (h.activityTypeId == "5") {
                            var e = "";
                            if (h.activityLink != "") {
                                e += h.activityDescription + " <a href='" + h.activityLink + "' target='_blank' class='b'>查看详情</a>"
                            } else {
                                e += h.activityDescription
                            }
                            if ($("#couponBox").html() != "") {
                                $("#couponBox").after("<p class='promotion-content'>" + e + "</p>")
                            } else {
                                $("#couponBox").html(e)
                            }
                            $("#couponTitle").css("display", "block");
                            $("#allcuxiao").show()
                        } else {
                            if (h.activityTypeId == "6" && sn.isPreBuy != 1) {
                                $("#isXYuanNItemBox").html(h.activityDescription + ' <a class="b" target="_blank" href="' + h.activityLink + '">查看详情</a>');
                                $("#isXYuanNItemTitle").css("display", "block");
                                $("#allcuxiao").show()
                            } else {
                                if (h.activityTypeId == "7") {
                                    if (sn.vendorCode != "") {
                                        $("#freightfreeTitle").show();
                                        $("#freightfreeBox").html(h.activityDescription);
                                        $("#allcuxiao").show();
                                        isFareFree = 1;
                                        if (h.activityLink != "" && h.activityLink == "1") {
                                            sn.cFreightFreeFlag = true;
                                            $("#c_yunfei").html("");
                                            $("#c_yunfei").hide();
                                            $("#fare" + sn.vendorCode).html("<span>免运费</span>")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            })
        }
    } catch (c) {
    }
    if (sn.cflag == "1") {
        getGiftInfo(sn.partNumber, "FourPage.callbackGiftInfo")
    }
    if (!sn.hwgShopFlag || (sn.hwgShopFlag && (sn.ownerPlace.indexOf("H") != 0 && sn.ownerPlace.indexOf("B") != 0 && sn.ownerPlace.indexOf("L") != 0))) {
        getCloudDrill("FourPage.yunzuanCallbackFunp")
    }
    if (sn.scodeType != "7") {
        FourPage.govPrice()
    }
    if (sn.cflag == "1" && sn.isPreBuy != 2) {
        getConServationInfo(sn.partNumber, "conServationInfoBack")
    }
    getNewPromInfo(sn.partNumber, "processNewPromInfo");
    iFourth.mainHeight();
    iFourth.servLabel()
};
FourPage.govPrice = function() {
    if (sn.govPrice != undefined && sn.govPrice != "" && parseFloat(sn.govPrice) < parseFloat(sn.promotionPrice)) {
        if (typeof (probeAuthStatus) == "function") {
            probeAuthStatus(function() {
                ms_memberOrgs.queryIsEnterprise(FourPage.govPriceHtmlBuild)
            }, function() {
                var a = "";
                a += "<label>政企特价</label>";
                a += '<p class="promotion-content">企业会员';
                a += '<a href="javascript:FourPage.govPriceLogin();" class="b" name="item_' + sn.ninePartNumber + '_zhengqi_login">登录</a>';
                a += "查看会员专享价";
                a += '<a name="item_' + sn.ninePartNumber + '_zhengqi_xq" href="http://b.suning.com" class="b ml10" target="_blank">查看详情</a>';
                a += "</p>";
                $("#govTitle").html(a);
                $("#govTitle").css("display", "block");
                $("#allcuxiao").show()
            })
        }
    } else {
        $("#govTitle").hide()
    }
};
FourPage.govPriceLogin = function() {
    $("body").AjaxLogin({success: function() {
            ms_memberOrgs.queryIsEnterprise(FourPage.govPriceHtmlBuild)
        }})
};
FourPage.govPriceHtmlBuild = function(b) {
    if (b != null && b.status == "success" && b.code == "true") {
        var a = "";
        a += "<label>政企特价</label>";
        a += '<p class="promotion-content">企业会员专享价 ¥' + sn.govPrice + ' <a name="item_' + sn.ninePartNumber + '_jifen_xq" href="http://b.suning.com" class="b ml10" target="_blank">查看详情</a></p>';
        $("#govTitle").html(a);
        $("#govTitle").css("display", "block");
        $("#allcuxiao").show()
    } else {
        $("#govTitle").hide()
    }
};
FourPage.yunzuanCallbackFunp = function(f) {
    try {
        if (f.accountAmt != null && f.accountAmt != "") {
            var b = sn.vipDomain;
            var a = Math.floor(f.accountAmt);
            if (a > 0) {
                var c = "";
                c += "购买可返" + a + "云钻";
                c += ' <a name="item_' + sn.ninePartNumber + '_jifen_xq" href="' + b + '" class="b ml10" target="_blank">看看能换啥</a>';
                $("#pointBox").html(c);
                $("#pointBox").show();
                $("#pointTitle").css("display", "block");
                $("#allcuxiao").show()
            } else {
                $("#pointBox").hide();
                $("#pointTitle").css("display", "none")
            }
        } else {
            $("#pointBox").hide();
            $("#pointTitle").css("display", "none")
        }
        if (sn.priceType != "2" && sn.priceType != "3" && sn.priceType != "4" && sn.isPreBuy != 1 && !sn.hwgShopFlag) {
            cloudInfo.cloudDiamondInfo()
        } else {
            $("#yunzuan").html("");
            $("#yunzuan").hide()
        }
    } catch (g) {
    }
    iFourth.mainHeight()
};
cloudInfo = {activityID: "", exchangeType: "", activityPrice: "", cdiamondPrice: "", addCartState: "0", state: "00", initCartState: function() {
        this.addCartState = "0"
    }, cloudDiamondInfo: function() {
        $("#yunzuan").hide();
        $.ajax({url: "http://" + sn.domain + sn.context + "/pCloud_" + sn.storeId + "_" + sn.catalogId + "_" + sn.partNumber + "_" + sn.salesOrg + "_" + sn.vendorCode + "_cloudInfo.initAct_.html", cache: true, async: false, dataType: "jsonp", jsonpCallback: "cloudInfo.initAct", success: function() {
            }})
    }, initAct: function(b) {
        cloudInfo.activityID = b.activityID;
        cloudInfo.exchangeType = b.exchangeType;
        cloudInfo.activityPrice = b.activityPrice;
        cloudInfo.cdiamondPrice = b.cdiamondPrice;
        if (this.activityID != undefined && this.activityID != "") {
            var a = "";
            if (this.exchangeType == "01") {
                a += '<span class="desc">' + this.cdiamondPrice + "云钻全额兑</span>";
                a += '<a id="btn_yzuan" href="javascript:cloudInfo.activiteAddCart();" name="item_' + sn.partNumber.substr(9, 18) + '_yunzu_dh" class="combtn">立即兑换</a>'
            } else {
                if (this.exchangeType == "02") {
                    a += '<span class="desc">' + this.cdiamondPrice + "云钻+" + this.activityPrice + "元购买</span>";
                    a += '<a id="btn_yzuan" href="javascript:cloudInfo.activiteAddCart();" name="item_' + sn.partNumber.substr(9, 18) + '_yunzu_dh" class="combtn">立即兑换</a>'
                }
            }
            $("#yunzuan").html(a);
            this.getActivityStatus()
        } else {
            $("#yunzuan").html("");
            $("#yunzuan").hide()
        }
    }, getExchengeStatus: function() {
        if (!FourPage.checkSaleStatus()) {
            $("#btn_yzuan").attr({href: "javascript:void(0);"});
            $("#btn_yzuan").html("立即兑换").removeClass().addClass("combtn-disable");
            $("#yunzuan").show();
            $("#pointTitle").show();
            $("#allcuxiao").show()
        } else {
            if ((this.state == "00" || this.state == "02" || this.state == "05" || this.state == "06") && (FourPage.checkSaleStatus())) {
                $("#btn_yzuan").attr({href: "javascript:cloudInfo.activiteAddCart();"});
                $("#btn_yzuan").html("立即兑换").removeClass().addClass("combtn");
                $("#yunzuan").show();
                $("#pointTitle").show();
                $("#allcuxiao").show()
            } else {
                if (this.state == "01") {
                    $("#yunzuan").html("");
                    $("#yunzuan").hide()
                } else {
                    if (this.state == "03") {
                        $("#btn_yzuan").attr({href: "javascript:void(0);"});
                        $("#btn_yzuan").html("已兑光").removeClass().addClass("combtn-disable");
                        $("#yunzuan").show();
                        $("#pointTitle").show();
                        $("#allcuxiao").show()
                    } else {
                        if (this.state == "04") {
                            $("#btn_yzuan").attr({href: "javascript:void(0);"});
                            $("#btn_yzuan").html("云钻不足").removeClass().addClass("combtn-disable");
                            $("#yunzuan").show();
                            $("#pointTitle").show();
                            $("#allcuxiao").show()
                        }
                    }
                }
            }
        }
    }, activiteAddCart: function() {
        $("body").AjaxLogin({success: function() {
                cloudInfo.addCartState = "1";
                Cart.addCart()
            }})
    }, getActivityStatus: function() {
        if (typeof (probeAuthStatus) == "function") {
            probeAuthStatus(function() {
                if (SFE.base.d("logonStatus") != null && SFE.base.d("logonStatus") != "") {
                    var b = "";
                    var a = "";
                    if (sn.salesOrg == "C") {
                        b = "00";
                        a = sn.vendorCode
                    } else {
                        b = "01";
                        a = "0000000000"
                    }
                    ajaxCrossDomain(sn.vipDomain + "/jsonp/checkQualify.do", "activityCode=" + cloudInfo.activityID + "&cmmdtyCode=" + sn.partNumber + "&supplierCode=" + a + "&purchaseNum=1&vendorFlag=" + b, function(c) {
                        cloudInfo.state = c.state;
                        cloudInfo.getExchengeStatus()
                    }, function() {
                        cloudInfo.getExchengeStatus()
                    })
                } else {
                    cloudInfo.getExchengeStatus()
                }
            }, function() {
                cloudInfo.getExchengeStatus()
            })
        } else {
            setTimeout(cloudInfo.getActivityStatus, 200)
        }
    }};
iFourth.initFreeCoupon = function(k) {
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
                j += "<a class='b ml10' target='_blank' href='" + f.activityLink + "' name='item_" + sn.partNumber.substr(9, 18) + "_gmq_lj00'>立即领取</a>"
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
                        o += "<li class='coupon-" + q + "'><a target='_blank' href='" + k[l].activityLink + "' name='item_" + sn.partNumber.substr(9, 18) + "_gmq_lj0" + (l + 1) + "'><span class='coupon-amount";
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
                            o += "<span>" + a + "</span><span>&nbsp</span>"
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
};
FourPage.checkSaleStatus = function() {
    if (sn.vendorCode == undefined || sn.vendorCode == "") {
        if (sn.promotionPrice != "" && (sn.invStatus == "1" || sn.invStatus == "4") && sn.shipOffSet != "-1") {
            if (sn.shipOffSet != "" && sn.shipOffSet >= 0) {
                $("#shipOffset").val(sn.shipOffSet)
            }
            return true
        } else {
            return false
        }
    } else {
        if (sn.swlShopFlag) {
            if (sn.promotionPrice != "" && sn.invStatus == "1" && sn.shipOffSet != "-1") {
                if (sn.shipOffSet != "" && sn.shipOffSet >= 0) {
                    $("#shipOffset").val(sn.shipOffSet)
                }
                return true
            } else {
                return false
            }
        } else {
            if (sn.promotionPrice != "" && sn.invStatus == "1" && sn.shippingCharge != "-1") {
                if (sn.shipOffSet != "" && sn.shipOffSet >= 0) {
                    $("#shipOffset").val(sn.shipOffSet)
                }
                return true
            } else {
                return false
            }
        }
    }
};
function saleStatusThree() {
    sn.shipOffSetText = "建议您选购其它商品";
    $("#nowProduct").html("建议您选购其它商品");
    $("#nowProduct").addClass("red");
    $("#c_kucun").html("暂不销售");
    $("#c_yunfei").hide();
    $("#buycount").hide();
    $("#yanbao").hide();
    $("#itHelp").hide();
    $("#cart2Price").html("");
    FourPage.initPhoneCss();
    sn.status = false;
    $("#listProContent").hide();
    $("#buyNowAddCart").hide();
    if (sn.isPreBuy != 1) {
        $("#addCart").removeClass().addClass("btn-addcart-disable");
        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
        $("#addCart").show();
        $("#tabAddCart").show();
        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
    }
    if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
        var a = "";
        if (preBuy.type == 2 && preBuy.status == 4) {
            a = "注：抢购仅限获取预约特权购资格的用户";
            $("#addCart").removeClass().addClass("btn-privilege-disable")
        } else {
            $("#addCart").removeClass().addClass("btn-rush-disable");
            a = "注：抢购仅限获取预约资格用户"
        }
        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
        if ($("#inerestBox").siblings(".memo").length > 0) {
            $("#inerestBox").siblings(".memo").remove()
        }
        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
        if ($(".mainbtns").siblings("#jhsm").length > 0) {
            $(".mainbtns").siblings("#jhsm").remove()
        }
        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + a + "</p>");
        $("#yushouCount").hide();
        if (preBuy.type == 2 && preBuy.status == 4) {
            $("#addCart2").removeClass().addClass("btn-privilege-mini-disable")
        } else {
            $("#addCart2").removeClass().addClass("btn-rush-mini-disable")
        }
        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
    }
    if (sn.isPreBuy == 1 && !preBuy.isEffect) {
        $("#preTime").hide();
        $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
        $("#c_kucun").html("暂不销售").show();
        $("#buyNowAddCart").hide();
        $("#addCart").removeClass().addClass("btn-addcart-disable");
        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
        if ($("#inerestBox").siblings(".memo").length > 0) {
            $("#inerestBox").siblings(".memo").remove()
        }
        if ($(".mainbtns").siblings("#jhsm").length > 0) {
            $(".mainbtns").siblings("#jhsm").remove()
        }
        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
        $("#yushouCount").hide();
        $("#buycount").hide();
        $("#tellMe").hide()
    }
    CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods");
    if (sn.vendorCode == "") {
        FourPage.processO2OInfo()
    }
    if (sn.isPreBuy == 2) {
        resetBookCss()
    }
    iFourth.mainHeight()
}
FourPage.callbackGiftInfo = function(f) {
    try {
        if (f != undefined && f != "" && f.length > 0) {
            var c = f.length > 5 ? 5 : f.length;
            var j = "<table><tbody>";
            var b = 0;
            for (var a = 0;
                    a < c;
                    a++) {
                if (f[a].remainGiftNumber == 0 || f[a].invEnough != "0") {
                    j += '<tr class="hide">'
                } else {
                    b = 1;
                    j += "<tr>"
                }
                j += '<td class="img"><img src="' + sn.imageDomianDir + "/b2c/catentries/" + f[a].giftId + '_1_30x30.jpg" src-large="' + sn.imageDomianDir + "/b2c/catentries/" + f[a].giftId + '_1_200x200.jpg" alt=""></td>';
                j += '<td class="title">';
                if (f[a].giftProductType == "1") {
                    if (f[a].giftId != "" && f[a].giftId.length == 18) {
                        var h = f[a].giftId.substring(9, 18);
                        j += '<a href="' + sn.elecProductDomain + "/" + h + '.html" target="_blank" name="item_' + sn.ninePartNumber + "_cuxiao_zengpin" + (a + 1) + '">';
                        j += '<div title="' + f[a].giftName + '">' + f[a].giftName + "</div>";
                        j += "</a>"
                    }
                } else {
                    j += '<div title="' + f[a].giftName + '">' + f[a].giftName + "</div>"
                }
                j += "</td>";
                if (f[a].remainGiftNumber != 0 && f[a].invEnough == "0") {
                    if (sn.giftInfo != undefined && sn.giftInfo != "") {
                        sn.giftInfo += "@@@1@@" + f[a].giftId + "@@" + f[a].giftName + "@@" + f[a].giftNumberOnetime
                    } else {
                        sn.giftInfo = "1@@" + f[a].giftId + "@@" + f[a].giftName + "@@" + f[a].giftNumberOnetime
                    }
                    j += '<td class="num">×' + f[a].giftNumberOnetime + "</td>"
                }
                if (f[a].giftPrice != undefined && f[a].giftPrice != "") {
                    j += '<td class="price">&yen;' + f[a].giftPrice.toFixed(2) + "</td></tr>"
                } else {
                    j += '<td class="price"></td></tr>'
                }
            }
            j += "</tbody></table>";
            if (b == 0 || (sn.invStatus != "1" && sn.invStatus != "4")) {
                $("#giftTitle").hide();
                return
            }
            $("#giftBox").html(j);
            iFourth.zengpin();
            $("#giftTitle").css("display", "block");
            $("#allcuxiao").show();
            iFourth.mainHeight()
        }
    } catch (g) {
    }
};
function initCShopOffSaleStatus() {
    if (sn.isPreBuy != 1) {
        $("#addCart").removeClass().addClass("btn-addcart-disable");
        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
        $("#tabAddCart").show();
        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
    }
    if (sn.isPreBuy == 1 && (preBuy.status == 4 || preBuy.status == 6) && preBuy.isEffect) {
        var a = "";
        if (preBuy.type == 2 && preBuy.status == 4) {
            a = "注：抢购仅限获取预约特权购资格的用户";
            $("#addCart").removeClass().addClass("btn-privilege-disable")
        } else {
            $("#addCart").removeClass().addClass("btn-rush-disable");
            a = "注：抢购仅限获取预约资格用户"
        }
        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
        if ($("#inerestBox").siblings(".memo").length > 0) {
            $("#inerestBox").siblings(".memo").remove()
        }
        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
        if ($(".mainbtns").siblings("#jhsm").length > 0) {
            $(".mainbtns").siblings("#jhsm").remove()
        }
        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">' + a + "</p>");
        $("#yushouCount").hide();
        if (preBuy.type == "2" && preBuy.status == 4) {
            $("#addCart2").removeClass().addClass("btn-privilege-mini-disable")
        } else {
            $("#addCart2").removeClass().addClass("btn-rush-mini-disable")
        }
        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
        $("#buyNowAddCart").hide()
    }
    $("#buyNowAddCart").hide();
    $("#c_kucun").html("暂不销售");
    $("#mianyunfei").parent().hide();
    $("#c_yunfei").hide();
    $("#buycount").hide();
    $("#nowProduct").html("建议您选购其它商品");
    sn.shipOffSetText = "建议您选购其它商品";
    $("#nowProduct").addClass("red");
    $("#cart2Price").html("");
    if (sn.vendorCode != "" && typeof sn.freight != "undefined" && sn.freight != "" && sn.freight != "-1" && !sn.swlShopFlag && !(sn.freight == "" || sn.freight == "0" || sn.freight == "0.00" || sn.freight == ".00" || sn.freight == "免运费")) {
        $("#c_yunfei").html("运费 &yen;" + sn.freight);
        $("#c_yunfei").show()
    } else {
        $("#c_yunfei").html();
        $("#c_yunfei").show()
    }
    if (sn.isPreBuy == 1 && !preBuy.isEffect) {
        $("#preTime").hide();
        $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
        $("#c_kucun").html("暂不销售").show();
        $("#buyNowAddCart").hide();
        $("#addCart").removeClass().addClass("btn-addcart-disable");
        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
        if ($("#inerestBox").siblings(".memo").length > 0) {
            $("#inerestBox").siblings(".memo").remove()
        }
        if ($(".mainbtns").siblings("#jhsm").length > 0) {
            $(".mainbtns").siblings("#jhsm").remove()
        }
        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
        $("#yushouCount").hide();
        $("#buycount").hide();
        $("#tellMe").hide()
    }
    if (sn.isPreBuy == 2) {
        resetBookCss()
    }
    CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods");
    iFourth.mainHeight();
    FourPage.runDapushWhenReady()
}
function simInitialize() {
    sn.vendorCode = "";
    $(".proinfo-title").addClass("proinfo-title-short");
    qCodeHide();
    getSimPrice(sn.partNumber, sn.cityId, sn.simBuyType, siminit);
    CommonFourPage.FourPage.getPromotiondesc(sn.partNumber, FourPage.getPromotiondescCallBack);
    sn.vendorCode = "0000000000";
    FourPage.getReview();
    FourPage.getConsulation();
    $("#returnCate").html('<a class="tui-disable" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_tuihuan" target="_blank" href="http://help.suning.com/page/id-205.htm"><i class="icon"></i>不支持无理由退换货</a>');
    $("#returnCate").attr("title", "不支持无理由退换货");
    $("#returnCate").show();
    iFourth.servLabel()
}
function siminit(g) {
    try {
        $("#swlService").hide();
        $("#cService").hide();
        $("#snService").show();
        $("#hwgService").hide();
        $(".proinfo-serv .zqfw").parent().hide();
        $("#selectCB").hide();
        $("#inerestBox").hide();
        if (sn.published == "1") {
            FourPage.initCss();
            sn.promotionPrice = "";
            if (g.returnCode == 0) {
                sn.promotionPrice = g.simPrice;
                $("#c_kucun").html("现货");
                var c = $("#itemDisplayName").text();
                if (c != "" && c != undefined && c.indexOf("苏宁互联卡") != -1) {
                    $("#nowProduct").html("现在下单 ，预计次日送达").removeClass("red")
                } else {
                    $("#nowProduct").html("现在下单 ，预计次日送达（月底3天不发货）").removeClass("red")
                }
                if (sn.simBuyType == "3") {
                    $("#addCart").removeClass().addClass("btn-tel2");
                    $("#addCart").attr("href", "javascript:addSimShoppingCartCheck('" + sn.partNumber + "'," + sn.cityId + ",'" + sn.simBuyType + "',function(obj){Util.alertErrorBox(obj)});").removeAttr("target");
                    $("#tabAddCart").show();
                    $("#addCart2").removeClass().addClass("btn-tel2-mini");
                    $("#addCart2").attr("href", "javascript:addSimShoppingCartCheck('" + sn.partNumber + "'," + sn.cityId + ",'" + sn.simBuyType + "',function(obj){Util.alertErrorBox(obj)});").removeAttr("target")
                } else {
                    $("#addCart").removeClass().addClass("btn-addcart");
                    $("#addCart").attr("href", "javascript:addSimShoppingCartCheck('" + sn.partNumber + "'," + sn.cityId + ",'" + sn.simBuyType + "',function(obj){Util.alertErrorBox(obj)});").removeAttr("target");
                    $("#tabAddCart").show();
                    $("#addCart2").removeClass().addClass("btn-addcart-mini");
                    $("#addCart2").attr("href", "javascript:addSimShoppingCartCheck('" + sn.partNumber + "'," + sn.cityId + ",'" + sn.simBuyType + "',function(obj){Util.alertErrorBox(obj)});").removeAttr("target")
                }
                $("#cart2Price").html(g.simPrice);
                $("#proPriceBox").html("<span id='promotionPrice' class='mainprice'>" + FourPage.getDisPrice(g.simPrice) + "</span><a id='PriceNotice2' class='link' href='javascript:FourPage.subscribePriceNotice();'>降价通知</a>");
                $("#existPrice").show();
                $("#promotionPriceBox").find("dt span").html("易购价");
                $("#promotionPriceBox").show();
                $("#addCart").show();
                $("#addCart2").show()
            } else {
                $("#noPrice").show();
                $("#c_kucun").html("暂不销售");
                sn.shipOffSetText = "建议您选购其它商品";
                $("#nowProduct").html("建议您选购其它商品");
                $("#nowProduct").addClass("red");
                $("#addCart").removeClass().addClass("btn-tel2-disable");
                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                $("#tabAddCart").show();
                $("#addCart2").removeClass().addClass("btn-tel2-mini-disable");
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                CommonFourPage.Recommend.getOffSaleRecom(sn.partNumber, "Recommend.callBackGetnoGoods")
            }
            sn.shopName = "苏宁";
            sn.reviewShopName = "苏宁";
            $("#shopName").html('由"<span>苏宁</span>"销售和发货，并享受售后服务');
            var f = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "__.html";
            var b = "findpassBrand2('','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + f + "','');";
            $("#callme").attr("href", "javascript:" + b);
            $("#callmeSide").attr("href", "javascript:" + b);
            $("#callme").removeClass().addClass("btn-online ml10");
            $("#callme").html("<img class='btn-online' src='" + sn.resRoot + "/images/online.gif' alt='在线客服' width='69' height='18'/>");
            $("#cshopBox").hide();
            $("#loginFeedBack").show();
            $(".proinfo-container").addClass("proinfo-container-nopro")
        } else {
            qCodeHide();
            $(".proinfo-main").hide();
            $(".proinfo-main").html("");
            $(".nopro").show();
            var a = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "__.html";
            $("#callme").attr("href", "javascript:findpassBrand2('" + sn.vendor + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
            $("#callmeSide").attr("href", "javascript:findpassBrand2('" + sn.vendor + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + a + "','');");
            $(".proinfo-container").addClass("proinfo-container-nopro");
            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
            CommonFourPage.Recommend.noPublishItems(sn.partNumber, "Recommend.noPublishItemsHtml")
        }
    } catch (h) {
    }
    FourPage.initCluster();
    FourPage.runDapushWhenReady();
    iFourth.mainHeight()
}
FourPage.getPromotiondescCallBack = function(a) {
    try {
        var g = a.itemDetail;
        $("#productService").html(g.service);
        $("#cProductService").html(g.service);
        sn.itemSource = g.itemSource != undefined ? g.itemSource : "";
        var b = g.pavilion;
        if (typeof b != "undefined" && b != "") {
            sn.isPavilion = true;
            $("#itemDisplayName").html('<a href="http://china.suning.com/" target="_blank"><span class="tsg">特色馆</span></a>' + sn.itemDisplayName)
        }
        if (sn.newItemDesSwith != "0" || (sn.partNumber != "000000000109482053" && sn.partNumber != "000000000109489150")) {
            $("#productDetail").html(g.detailUrl)
        }
        if (g && typeof g.detailParkingList != "undefined" && g.detailParkingList != "") {
            $("#bzqd_tag .val").html(g.detailParkingList);
            $("#bzqd_tag").show()
        } else {
            $("#bzqd_tag").hide()
        }
        if (typeof a.comItemdetail.comitemDetailsList != "undefined") {
            var f = a.comItemdetail.comitemDetailsList;
            if (f != "" && f.length > 0) {
                for (var c = 0;
                        c < f.length;
                        c++) {
                    if (f[c].orderCode == "30") {
                        var h = '<table border="0" cellpadding="1" cellspacing="1" style="width: 750px"><tbody><tr><td>';
                        h += '<object align="middle" classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,40,0" height="420" width="750"><param name="play" value="false">';
                        h += '<param name="quality" value="high"><param name="wmode" value="transparent"><param name="allowScriptAccess" value="samedomain"><param name="flashvars" value="ap=0" /><param name="movie" value="';
                        h += f[c].detailsUrl + '"><embed allowscriptaccess="samedomain" allowFullScreen="true" flashvars="ap=0" height="420" play="false" pluginspage="http://www.macromedia.com/go/getflashplayer" quality="high" src="';
                        h += f[c].detailsUrl;
                        h += '" type="application/x-shockwave-flash" width="750" wmode="transparent"></object>';
                        h += "</td></tr></tbody></table>";
                        $("#productDetail").prepend(h)
                    }
                }
                for (var c = 0;
                        c < f.length;
                        c++) {
                    if (f[c].orderCode == "00" || f[c].orderCode == "01") {
                        $("#productDetail").prepend(f[c].detailsUrl)
                    } else {
                        if (f[c].orderCode == "20" || f[c].orderCode == "11") {
                            $("#productDetail").append(f[c].detailsUrl)
                        }
                    }
                }
            }
        }
        $("#itemSource").html("商品来源地：" + sn.itemSource)
    } catch (j) {
    }
    $("img[src2]").Jlazyload({type: "image", placeholderClass: "err-product"})
};
FourPage.processBarePhoneDesc = function(a) {
    if (a != null && a.returnCode == "0" && a.sellPointInfo != undefined && a.sellPointInfo != "") {
        sn.barePhoneDesc = a.sellPointInfo
    } else {
        sn.barePhoneDesc = ""
    }
    $("#promotionDesc").html(sn.promItemDesc + (sn.promItemDesc != "" ? "&nbsp;&nbsp;" : "") + sn.promotionDesc + (sn.barePhoneDesc == "" ? "" : "<br/>") + sn.barePhoneDesc)
};
FourPage.initPhoneStatus = function(f) {
    if (f != null && typeof f.recommend != "undefined" && f.recommend.recommendTitle != "") {
        var e = f.recommend;
        sn.contractTypeCode = e.treatyCode;
        sn.operatorId = e.buyTypeCode;
        if (typeof f.treatyInfo != "undefined" && typeof f.treatyInfo.buyTypeList != "undefined" && f.treatyInfo.buyTypeList.length > 0) {
            if (e.busiType == "1") {
                $("#phonedl input").before('<div class="luoji-tip" style="display: block;" onclick="Cart.addShoppingCartCheck(\'' + sn.partNumber + "','" + sn.provinceCode + "','" + sn.cityId + "','" + sn.districtId + "','" + sn.mdmProvinceId + "','" + sn.mdmCityId + "','" + e.buyTypeCode + "','" + e.treatyCode + "','" + sn.itemId + "','" + e.phoneSupplierCode + "','" + e.treatyParam + '\',function(obj){Util.alertErrorBox(obj)})" name="item_' + sn.ninePartNumber + '_ysc_gm0101"><span class="content">' + e.recommendTitle + '</span><a class="view" href="javascript:void(0);">去看看</a></div>')
            } else {
                if (e.busiType == "2") {
                    $("#phonedl input").before('<div class="luoji-tip" id="phoneGoLook" style="display: block;" name="item_' + sn.ninePartNumber + '_ysc_gm0101"><span class="content">' + e.recommendTitle + '</span><a class="view g-hyj-btn" href="javascript:void(0);">去看看</a></div>');
                    iFourth.hyjDialog.clickFun()
                }
            }
            if (sn.saleStatus != "1") {
                $(".luoji-tip").hide()
            }
        } else {
            if (e.busiType == "2") {
                $(".proinfo-num").before('<dl class="proinfo-tip"><div class="getTip" id="phoneGoLook"><span class="content">' + e.recommendTitle + '</span><a class="view g-hyj-btn" href="javascript:void(0);" name="item_' + sn.ninePartNumber + '_ysc_gm0101">去看看</a></div></dl>');
                iFourth.hyjDialog.clickFun()
            }
            if (sn.saleStatus != "1") {
                $(".proinfo-tip").hide()
            }
        }
    }
    sn.treatyInfo = f.treatyInfo;
    if (f != null && typeof f.treatyInfo != "undefined" && typeof f.treatyInfo.buyTypeList != "undefined" && f.treatyInfo.buyTypeList.length > 0) {
        var l = "";
        var k = "";
        if (sn.treatCode == "" && sn.buyCode == "") {
            l += '<li data-id="1" title="裸机版" class="selected"><a href="javascript:void(0);">裸机<i></i></a></li>'
        } else {
            l += '<li data-id="1" title="裸机版"><a href="javascript:void(0);">裸机<i></i></a></li>'
        }
        var c = 1;
        for (var g = 0;
                g < f.treatyInfo.buyTypeList.length;
                g++) {
            var j = f.treatyInfo.buyTypeList[g];
            if (j.treatyTypeList.length > 0) {
                l += "<li ";
                l += typeof sn.buyCode != "undefined" && sn.buyCode === j.buyTypeCode ? 'class="selected"' : "";
                l += 'title="' + j.buyTypeName + '" data-id="' + (g + 2) + '" bt="' + j.buyTypeCode + '"><a href="javascript:void(0);" name="item_' + sn.ninePartNumber + "_ysc_gm" + ((g + 2) < 10 ? ("0" + (g + 2)) : (g + 2)) + '">' + j.buyTypeName + "<i></i></a></li>";
                k += "<ul>";
                $.each(j.treatyTypeList, function(m, n) {
                    c++;
                    k += "<li ";
                    k += typeof sn.buyCode != "undefined" && sn.buyCode == j.buyTypeCode && typeof sn.treatCode != "undefined" && sn.treatCode == n.treatyCode ? 'class="selected"' : "";
                    k += ' title="' + n.treatyName + '" bt="' + j.buyTypeCode + '" tt="' + n.treatyCode + '"><a href="javascript:void(0);" name="item_' + sn.ninePartNumber + "_ysc_hy" + (c < 10 ? ("0" + c) : c) + '">' + n.treatyName + "<i></i></a></li>"
                });
                k += "</ul>"
            }
        }
        l += "</ul>";
        $("#phonedl ul").html(l);
        $("#phonedl").show();
        $("#phoned2 dd").html(k);
        if (sn.notSaleFlag) {
            $(".proinfo-hyj dd li[data-id=1]").hide();
            if (sn.treatCode == "" && sn.buyCode == "") {
                $(".proinfo-hyj dd li[data-id=2]").addClass("selected").siblings().removeClass("selected");
                $("#phoned2 li").eq(0).addClass("selected").siblings().removeClass("selected")
            }
        }
        iFourth.attrChoose();
        iFourth.heyueji(FourPage.changePhone);
        var b = $("#phonedl ul li.selected");
        var a = $("#phoned2 dd li.selected");
        if (b && b.index() > 0) {
            var h = b.index();
            $("#phoned2 ul").eq(h - 1).show().siblings().hide();
            $("#phoned2").show()
        }
        if (a && a.index() >= 0) {
            a.parent().show().siblings().hide()
        } else {
            if (!(b && b.index() > 0)) {
                $("#phonedl li").eq(0).addClass("selected");
                $("#phoned2").hide()
            }
        }
        FourPage.changePhone(a)
    } else {
        FourPage.initPhoneCss();
        $("#phoneDetail").hide();
        if (sn.priceType == "0") {
            if ((sn.invStatus == "1" || sn.invStatus == "4") && sn.shipOffSet >= 0) {
                $("#addCart").removeClass().addClass("btn-addcart");
                $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                $("#buyNowAddCart").show();
                $("#tabAddCart").show();
                $("#addCart2").removeClass().addClass("btn-addcart-mini");
                $("#addCart2").attr("href", "javascript:Cart.addCart();").removeAttr("target")
            } else {
                $("#addCart").removeClass().addClass("btn-addcart-disable");
                $("#addCart").attr("href", "javascript:void();").removeAttr("target");
                $("#buyNowAddCart").hide();
                $("#tabAddCart").show();
                $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
                $("#addCart2").attr("href", "javascript:void();").removeAttr("target")
            }
        }
        if (phoneTyFlg && document.reflashForm.sellType.value != 0) {
            CommonFourPage.FourPage.getItemInfo(sn.partNumber, FourPage.cateDetail);
            CommonFourPage.FourPage.getPromotiondesc(sn.partNumber, FourPage.getPromotiondescCallBack)
        }
        document.reflashForm.sellType.value = 0;
        if (sn.invStatus == "1") {
            $("#buycount").show()
        }
    }
    iFourth.mainHeight()
};
FourPage.changePhone = function(o) {
    var f, r, b, h, q, a, p, k, t, n;
    t = sn.invStatus;
    r = typeof ($(o).attr("bt")) == "undefined" ? "" : ($(o).attr("bt"));
    b = typeof ($(o).attr("tt")) == "undefined" ? "" : ($(o).attr("tt"));
    sn.phoneTypePromoDesc = "";
    sn.phonePrice = "";
    sn.phonePartNumber = "";
    var m, s, u;
    if (r == "" && b == "") {
        $("#promotionDesc").html(sn.promItemDesc + (sn.promItemDesc != "" ? "&nbsp;&nbsp;" : "") + sn.promotionDesc + (sn.barePhoneDesc == "" ? "" : "<br/>") + sn.barePhoneDesc);
        document.reflashForm.sellType.value = 0;
        f = sn.sellType = 0;
        u = sn.promotionPrice;
        k = sn.partNumber;
        if (Renxf.freenessInfo != "") {
            $("#freenessPay").parent().show()
        }
    } else {
        $("#freenessPay").parent().hide();
        document.reflashForm.sellType.value = 1;
        f = sn.sellType = 1;
        $("#yanbao").find("li").each(function() {
            $(this).removeClass("selected")
        });
        $("#yanbao").hide();
        $("#phonedl .luoji-tip").hide();
        $.each(sn.treatyInfo.buyTypeList, function(w, v) {
            if (r == v.buyTypeCode) {
                $.each(v.treatyTypeList, function(x, y) {
                    if (b == y.treatyCode) {
                        m = y;
                        q = sn.ychf = typeof y.imageUrl != "undefined" && y.imageUrl != "null" ? y.imageUrl : "";
                        sn.phoneTypePromoDesc = y.sellPoint;
                        u = y.treatyPrice;
                        h = y.shipOffSetText;
                        a = y.phoneSupplierCode;
                        p = y.treatyParam;
                        n = y.spCartTextNum;
                        k = "000000000" + y.treatyPartNumber
                    }
                })
            }
        })
    }
    sn.phonePrice = u;
    sn.phonePartNumber = k;
    $("#cart2Price").html(u);
    $("#tellMe").hide();
    $("#buyReminder").hide();
    if (f == 1) {
        $("#bigPolyVerify").hide();
        CommonFourPage.storeService.jsdHide();
        $(".ziti").parent().hide();
        if (null != $("#labelPicture") && "undefined" != $("#labelPicture") && $("#labelPicture").length > 0 && $("#labelPicture b").attr("class") != "") {
            $("#labelPicture").hide()
        }
        if ($("#yanbao").html() != "") {
            $("#yanbao").hide()
        }
        $("#listProContent").hide();
        $("#allcuxiao").hide();
        $("#loginFeedBack").hide();
        $("#nowProduct").removeClass("red");
        $("#nowProduct").html(h);
        qCodeHide()
    } else {
        if ($.trim($("#bigPolyVerify").find("dd").html()) != "") {
            $("#bigPolyVerify").show()
        }
        JSD.base.showLabel();
        if (sn.ziti) {
            $(".ziti").parent().show()
        }
        if (null != $("#labelPicture") && "undefined" != $("#labelPicture") && $("#labelPicture").length > 0 && $("#labelPicture b").attr("class") != "") {
            $("#labelPicture").show()
        }
        if ($("#dapei_slide").find("li").length > 0) {
            $("#listProContent").show();
            if (sn.scodeType == "7") {
                $("#listProContent").find("div ul li[rel=#J-setMeal]").hide();
                $("#J-setMeal").hide();
                if ($("#J-tieIn").html() == "" || $("#J-tieIn").html() == null) {
                    $("#listProContent").hide()
                }
            }
        }
        CommonFourPage.Cart.getSunShine(sn.partNumber, Cart.sunShine);
        $(".promotion-content").each(function() {
            var v = $.trim($(this).html());
            if (v != "") {
                $("#allcuxiao").show()
            }
        });
        $("#loginFeedBack").show();
        if ((t == "1" || t == "4")) {
            if (sn.shipOffSet >= 0) {
                $("#nowProduct").removeClass("red");
                $("#nowProduct").html(sn.shipOffSetText);
                processQcode()
            } else {
                $("#nowProduct").addClass("red");
                $("#nowProduct").html(sn.shipOffSetText);
                qCodeHide()
            }
        } else {
            if (t == "2") {
                $("#nowProduct").addClass("red");
                $("#nowProduct").html("暂无货&nbsp 点<a class='b' name='item_" + sn.ninePartNumber + "_gmq_daohuotz02' href='javascript:FourPage.subscribeArrivalNotice();'>到货通知</a>，到货第一时间通知您!");
                qCodeHide()
            } else {
                $("#nowProduct").addClass("red");
                $("#nowProduct").html("建议您选购其它商品");
                qCodeHide()
            }
        }
    }
    if (f == 1) {
        $("#promotionPriceBox").show();
        $("#proPriceBox").html('<span id="promotionPrice" class="mainprice">' + FourPage.getDisPrice(u) + '</span><a id="PriceNotice2" class="link" href="javascript:FourPage.subscribePriceNotice();">降价通知</a>');
        $("#netPriceBox").hide();
        if (n == "1") {
            $("#addCart").removeClass().addClass("btn-hyj btn-hyj-2");
            $("#addCart2").removeClass().addClass("btn-hyj-mini btn-hyj-2-mini")
        } else {
            if (n == "2") {
                $("#addCart").removeClass().addClass("btn-hyj btn-hyj-4");
                $("#addCart2").removeClass().addClass("btn-hyj-mini btn-hyj-4-mini")
            } else {
                if (n == "3") {
                    $("#addCart").removeClass().addClass("btn-hyj btn-hyj-1");
                    $("#addCart2").removeClass().addClass("btn-hyj-mini btn-hyj-1-mini")
                } else {
                    if (n == "4") {
                        $("#addCart").removeClass().addClass("btn-hyj btn-hyj-5");
                        $("#addCart2").removeClass().addClass("btn-hyj-mini btn-hyj-5-mini")
                    } else {
                        if (n == "5") {
                            $("#addCart").removeClass().addClass("btn-hyj btn-hyj-6");
                            $("#addCart2").removeClass().addClass("btn-hyj-mini btn-hyj-6-mini")
                        } else {
                            $("#addCart").removeClass().addClass("btn-tel");
                            $("#addCart2").removeClass().addClass("btn-tel-mini")
                        }
                    }
                }
            }
        }
        $("#addCart").attr("href", "javascript:Cart.addShoppingCartCheck('" + sn.partNumber + "','" + sn.provinceCode + "','" + sn.cityId + "','" + sn.districtId + "','" + sn.mdmProvinceId + "','" + sn.mdmCityId + "','" + r + "','" + b + "','" + sn.itemId + "','" + a + "','" + p + "',function(obj){Util.alertErrorBox(obj)});");
        $("#addCart").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'").removeAttr("target");
        $("#addCart").show();
        $("#cuxiaoEnd").hide();
        $("#cuxiaoNoNum").hide();
        $("#addCart2").attr("href", "javascript:Cart.addShoppingCartCheck('" + sn.partNumber + "','" + sn.provinceCode + "','" + sn.cityId + "','" + sn.districtId + "','" + sn.mdmProvinceId + "','" + sn.mdmCityId + "','" + r + "','" + b + "','" + sn.itemId + "','" + a + "','" + p + "',function(obj){Util.alertErrorBox(obj)});");
        $("#addCart2").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'").removeAttr("target");
        $("#buyNowAddCart").hide();
        $("#c_kucun").html('<span class="sale-state">现货</span>');
        $("#buycount").hide();
        $("#buyNum").val(1);
        $("#buyNum").attr("max", 99);
        $("#preTime").hide();
        $("#inerestBox").show();
        iFourth.buyNum();
        CommonFourPage.storeService.hide()
    } else {
        if (f == 0 && (t == "1" || t == "4") && sn.shipOffSet >= 0) {
            if (PriceShow.activityFlag == undefined || typeof PriceShow.activityFlag == "undefined" || PriceShow.activityFlag == "") {
                $("#addCart").removeClass().addClass("btn-addcart");
                $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                $("#addCart").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'");
                $("#addCart2").removeClass().addClass("btn-addcart-mini");
                $("#addCart2").attr("href", "javascript:Cart.addCart();");
                $("#addCart2").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'").removeAttr("target");
                $("#buyNowAddCart").show();
                $("#buycount").show();
                $("#preTime").hide()
            } else {
                if (PriceShow.activityFlag != undefined || typeof PriceShow.activityFlag != "undefined" || PriceShow.activityFlag == "2") {
                    if (PriceShow.status == 1) {
                        $("#limitTime").html("即将开始");
                        $("#limitTime").show();
                        PriceShow.activityFlag = "2";
                        $("#PriceNotice2").hide();
                        $("#beginOrEnd").html("抢购开始");
                        if (PriceShow.maxPerNum != 0) {
                            $("#productLimit").html("正在促销，每人限购<em>" + PriceShow.maxPerNum + "</em>件");
                            $("#productLimit").show();
                            $("#buyNum").attr("max", PriceShow.maxPerNum);
                            $("#buycount").show()
                        } else {
                            $("#buycount").hide()
                        }
                        iFourth.buyNum();
                        $("#preTime").show();
                        $("#buyNowAddCart").hide();
                        $("#addCart").removeClass().addClass("btn-rush-wait").attr("href", "javascript:void(0);");
                        $("#addCart2").removeClass().addClass("btn-rush-mini-wait").attr("href", "javascript:void(0);");
                        PriceShow.activityFlag = "2"
                    } else {
                        if (PriceShow.status == 2) {
                            if (PriceShow.serviceType == "2") {
                                $("#limitTime").html("抢购")
                            } else {
                                if (PriceShow.serviceType == "3") {
                                    $("#limitTime").html("团购")
                                } else {
                                    if (PriceShow.serviceType == "7") {
                                        $("#limitTime").html("S码专享")
                                    } else {
                                        if (PriceShow.serviceType == "4") {
                                            $("#limitTime").html("闪购")
                                        } else {
                                            if (PriceShow.serviceType == "10") {
                                                $("#limitTime").html("爆款抢购")
                                            } else {
                                                $("#limitTime").html("大聚惠")
                                            }
                                        }
                                    }
                                }
                            }
                            $("#limitTime").show();
                            PriceShow.activityFlag = "2";
                            $("#PriceNotice2").hide();
                            $("#beginOrEnd").html("倒计时");
                            if (PriceShow.maxPerNum != 0) {
                                $("#productLimit").html("正在促销，每人限购<em>" + PriceShow.maxPerNum + "</em>件");
                                $("#productLimit").show();
                                $("#buyNum").attr("max", PriceShow.maxPerNum);
                                $("#buycount").show()
                            } else {
                                $("#buycount").hide()
                            }
                            $("#preTime").show();
                            iFourth.buyNum();
                            var e = (parseInt(PriceShow.endTime) - parseInt(PriceShow.curTime)) / 1000;
                            if (parseInt(PriceShow.endTime) > parseInt(PriceShow.curTime)) {
                                if ((sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSetText != "")) {
                                    $("#preTime").show();
                                    if (PriceShow.serviceType == "7") {
                                        FourPage.scodeBuyStyle();
                                        $("#buyNowAddCart").show()
                                    } else {
                                        $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                                    }
                                    if (PriceShow.serviceType == "2" || PriceShow.serviceType == "3") {
                                        $("#buyReminder").show()
                                    }
                                    if (PriceShow.serviceType == "10") {
                                        $("#addCart").hide();
                                        $("#addCart2").hide()
                                    } else {
                                        $("#addCart").removeClass().addClass("btn-addcart").attr("href", "javascript:Cart.addCart();");
                                        $("#addCart2").removeClass().addClass("btn-addcart-mini").attr("href", "javascript:Cart.addCart();")
                                    }
                                } else {
                                    if (sn.freight == "-1" || sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0" || ((sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSetText == "")) {
                                        $("#preTime").hide();
                                        $("#buyNowAddCart").hide();
                                        $("#buyReminder").hide();
                                        $("#addCart").removeClass().addClass("btn-addcart-disable").attr("href", "javascript:void(0);");
                                        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable").attr("href", "javascript:void(0);");
                                        if (sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0") {
                                            $("#tellMe").show()
                                        }
                                    }
                                }
                                $(".proinfo-cd").find("input:hidden").val(e)
                            }
                            if (PriceShow.published == "2" && (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10")) {
                                $("#cuxiaoNoNum").show();
                                $("#cuxiaoEnd").hide();
                                $("#buyNowAddCart").hide();
                                $("#addCart").hide();
                                $("#inerestBox").hide();
                                $("#freenessPay").hide();
                                $("#buyReminder").hide();
                                $("#preTime").show();
                                $("#buyReminder").hide();
                                $("#addCart2").removeClass().attr("href", "javascript:void(0);").addClass("btn-rush-mini-no")
                            }
                        } else {
                            $("#addCart").removeClass().addClass("btn-addcart");
                            $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
                            $("#addCart").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'");
                            $("#addCart2").removeClass().addClass("btn-addcart-mini");
                            $("#addCart2").attr("href", "javascript:Cart.addCart();");
                            $("#addCart2").attr("name", "'item_" + sn.ninePartNumber + "_gmq_buy01'").removeAttr("target");
                            if (PriceShow.serviceType == "7") {
                                FourPage.scodeBuyStyle();
                                $("#buyNowAddCart").show()
                            } else {
                                if (sn.silenceType != "Y") {
                                    $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                                }
                            }
                            $("#buycount").show();
                            $("#preTime").hide();
                            if (PriceShow.serviceType == "2") {
                                $("#limitTime").html("抢购")
                            } else {
                                if (PriceShow.serviceType == "3") {
                                    $("#limitTime").html("团购")
                                } else {
                                    if (PriceShow.serviceType == "7") {
                                        $("#limitTime").html("S码专享")
                                    } else {
                                        if (PriceShow.serviceType == "4") {
                                            $("#limitTime").html("闪购")
                                        } else {
                                            if (PriceShow.serviceType == "10") {
                                                $("#limitTime").html("爆款抢购")
                                            } else {
                                                $("#limitTime").html("大聚惠")
                                            }
                                        }
                                    }
                                }
                            }
                            var g = parseInt(PriceShow.endTime);
                            var i = parseInt(PriceShow.curTime);
                            if (typeof PriceShow.silenceTime != "undefined" && PriceShow.silenceTime != "") {
                                var l = parseInt(PriceShow.silenceTime)
                            }
                            if (typeof l != "undefined" && l != "") {
                                if (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10") {
                                    if (i > g && i <= l) {
                                        if (PriceShow.serviceType == "2") {
                                            $("#limitTime").html("抢购")
                                        } else {
                                            if (PriceShow.serviceType == "3") {
                                                $("#limitTime").html("团购")
                                            } else {
                                                if (PriceShow.serviceType == "10") {
                                                    $("#limitTime").html("爆款抢购")
                                                }
                                            }
                                        }
                                        sn.silenceType = "Y";
                                        $("#limitTime").show();
                                        $("#cuxiaoEnd").show();
                                        $("#c_kucun").hide();
                                        $("#nowProduct").hide();
                                        $("#c_yunfei").hide();
                                        $("#buyNowAddCart").hide();
                                        $("#addCart").hide();
                                        $("#inerestBox").hide();
                                        $("#freenessPay").hide()
                                    }
                                }
                            }
                        }
                    }
                }
            }
            if (sn.invStatus == "1" || sn.invStatus == "4") {
                $("#c_kucun").html(sn.inventoryText)
            }
            if (sn.preheat) {
                if (FourPage.comparePrice(sn.promotionPrice, sn.netPrice) != -1) {
                    if (sn.refPrice != undefined && sn.refPrice != "") {
                        PriceShow.priceController()
                    } else {
                        $("#netPriceBox").hide()
                    }
                    $("#promotionPriceBox").show()
                } else {
                    PriceShow.priceController()
                }
            } else {
                if (FourPage.comparePrice(sn.promotionPrice, sn.netPrice) != -1) {
                    if (sn.refPrice != undefined && sn.refPrice != "") {
                        PriceShow.priceController()
                    } else {
                        $("#netPriceBox").hide()
                    }
                    $("#promotionPriceBox").show();
                    if (sn.priceType != "4") {
                        $("#proPriceBox").html('<span id="promotionPrice" class="mainprice">' + FourPage.getDisPrice(u) + '</span><span id="limitTime" class="label hide"></span><a id="PriceNotice2" class="link" href="javascript:FourPage.subscribePriceNotice();">降价通知</a>')
                    } else {
                        if (sn.priceType == "4" && PriceShow.status == 1) {
                            $("#proPriceBox").html('<span id="promotionPrice" class="mainprice">' + FourPage.getDisPrice(u) + '</span><span id="limitTime" class="label">即将开始</span><a id="PriceNotice2" class="link hide" href="javascript:FourPage.subscribePriceNotice();">降价通知</a>')
                        } else {
                            var j = "";
                            if (PriceShow.serviceType == "2") {
                                j = "抢购"
                            } else {
                                if (PriceShow.serviceType == "3") {
                                    j = "团购"
                                } else {
                                    if (PriceShow.serviceType == "7") {
                                        j = "S码专享"
                                    } else {
                                        if (PriceShow.serviceType == "4") {
                                            j = "闪购"
                                        } else {
                                            if (PriceShow.serviceType == "10") {
                                                j = "爆款抢购"
                                            } else {
                                                j = "大聚惠"
                                            }
                                        }
                                    }
                                }
                            }
                            $("#proPriceBox").html('<span id="promotionPrice" class="mainprice">' + FourPage.getDisPrice(u) + '</span><span id="limitTime" class="label">' + j + '</span><a id="PriceNotice2" class="link hide" href="javascript:FourPage.subscribePriceNotice();">降价通知</a>')
                        }
                    }
                } else {
                    PriceShow.priceController();
                    $("#proPriceBox").html('<span id="promotionPrice" class="mainprice">' + FourPage.getDisPrice(u) + '</span><span id="limitTime" class="label"></span><a id="PriceNotice2" class="link" href="javascript:FourPage.subscribePriceNotice();">降价通知</a>');
                    if (sn.priceType == "1") {
                        $("#limitTime").html("限时促销")
                    } else {
                        if (sn.priceType == "2") {
                            $("#limitTime").html("抢购价");
                            $("#PriceNotice2").hide()
                        } else {
                            if (sn.priceType == "3") {
                                $("#limitTime").html("团购价");
                                $("#PriceNotice2").hide()
                            } else {
                                if (sn.priceType == "4" && PriceShow.status == 1) {
                                    $("#limitTime").html("即将开始");
                                    $("#PriceNotice2").hide()
                                } else {
                                    if (sn.priceType == "4" && PriceShow.status == 2) {
                                        if (PriceShow.serviceType == "2") {
                                            $("#limitTime").html("抢购")
                                        } else {
                                            if (PriceShow.serviceType == "3") {
                                                $("#limitTime").html("团购")
                                            } else {
                                                if (PriceShow.serviceType == "7") {
                                                    $("#limitTime").html("S码专享")
                                                } else {
                                                    if (PriceShow.serviceType == "4") {
                                                        $("#limitTime").html("闪购")
                                                    } else {
                                                        if (PriceShow.serviceType == "10") {
                                                            $("#limitTime").html("爆款抢购")
                                                        } else {
                                                            $("#limitTime").html("大聚惠")
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                        $("#PriceNotice2").hide()
                                    } else {
                                        if (sn.priceType == "4") {
                                            if (PriceShow.serviceType == "2") {
                                                $("#limitTime").html("抢购")
                                            } else {
                                                if (PriceShow.serviceType == "3") {
                                                    $("#limitTime").html("团购")
                                                } else {
                                                    if (PriceShow.serviceType == "7") {
                                                        $("#limitTime").html("S码专享")
                                                    } else {
                                                        if (PriceShow.serviceType == "4") {
                                                            $("#limitTime").html("闪购")
                                                        } else {
                                                            if (PriceShow.serviceType == "10") {
                                                                $("#limitTime").html("爆款抢购")
                                                            } else {
                                                                $("#limitTime").html("大聚惠")
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                            $("#PriceNotice2").hide()
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
            iFourth.mainHeight();
            CommonFourPage.storeService.show()
        } else {
            if (FourPage.comparePrice(sn.promotionPrice, sn.netPrice) != -1) {
                if (sn.refPrice != undefined && sn.refPrice != "") {
                    PriceShow.priceController()
                } else {
                    $("#netPriceBox").hide()
                }
                $("#proPriceBox").html('<span id="promotionPrice" class="mainprice">' + FourPage.getDisPrice(u) + '</span><a id="PriceNotice2" class="link" href="javascript:FourPage.subscribePriceNotice();">降价通知</a>');
                $("#promotionPriceBox").show()
            } else {
                $("#netPrice").html("<del><i>&yen;</i>" + u + "</del>");
                PriceShow.priceController()
            }
            $("#addCart").removeClass().addClass("btn-addcart-disable");
            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
            $("#buyNowAddCart").hide();
            if (f == 1) {
                $("#tellMe").hide();
                $("#c_kucun").html("无货")
            } else {
                if (t == "2") {
                    $("#tellMe").show();
                    $("#c_kucun").html("无货")
                } else {
                    $("#tellMe").hide();
                    $("#c_kucun").html("暂不销售")
                }
            }
            CommonFourPage.storeService.show()
        }
    }
    if (q != "") {
        s = sn.imageDomianDir + "/content/catentries/" + q
    } else {
        s = ""
    }
    if (s == "" && f == 1) {
        $("#cshopBox").html("");
        $("#cshopBox").hide()
    } else {
        if (s != "" && (f == 1)) {
            $("#cshopBox").html("<img height='441' width='179' src='" + s + "'>");
            $("#cshopBox").show()
        } else {
            if (f == 0) {
                if (cshopHtml != "") {
                    $("#cshopBox").html(cshopHtml)
                }
                $("#cshopBox").show();
                FourPage.fareHtml();
                FourPage.scoreHtml();
                $("#shop" + sn.vendorCode).addClass("cur");
                var c = "http://" + sn.domain + sn.context + "/sprdonline_" + sn.storeId + "_" + sn.catalogId + "_" + sn.itemId + "__.html";
                $("#callme").attr("href", "javascript:findpassBrand2('" + sn.vendor + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + c + "','');");
                $("#callmeSide").attr("href", "javascript:findpassBrand2('" + sn.vendor + "','" + sn.catenIds + "','" + sn.brandId + "','" + sn.categoryId + "','" + c + "','');");
                $("#shopNetPrice" + sn.vendorCode).find(".price").html("<i>&yen;</i><em>" + sn.promotionPrice + "</em>");
                $("#shopNetPrice" + sn.vendorCode).parents("li").addClass("selected");
                if (snShopFlag) {
                    $("#c_shop_list").hide();
                    if (sn.brandFlag == "" && !sn.donateFlag) {
                        CommonFourPage.Recommend.shopListItems(sn.partNumber, "Recommend.shopListItemsHtml")
                    }
                }
            }
        }
    }
    if (f == 0) {
        if (sn.priceType == "1" || sn.priceType == "2" || sn.priceType == "3" || sn.priceType == "4") {
            $("#shopNetPrice" + sn.vendorCode).find(".tag-cu").remove();
            $("#shopNetPrice" + sn.vendorCode).find(".price").before('<i class="tag tag-cu"></i>');
            $("#promotionPriceBox").find("span.w3").html("促销价")
        } else {
            if (sn.priceType.substring(0, 1) == "7" || sn.priceType.substring(0, 1) == "8") {
                $("#shopNetPrice" + sn.vendorCode).find(".tag-cu").remove();
                $("#shopNetPrice" + sn.vendorCode).find(".price").before('<i class="tag tag-cu"></i>')
            } else {
                $("#shopNetPrice" + sn.vendorCode).find(".tag-cu").remove();
                $("#promotionPriceBox").find("span.w3").html("易购价")
            }
        }
    } else {
        if (f == 1) {
            if ($("#netPriceBox").is(":hidden")) {
                $("#promotionPriceBox").find("span.w3").html("易购价")
            } else {
                $("#netPriceBox").find("span.w3").html("易购价");
                $("#promotionPriceBox").find("span.w3").html("促销价")
            }
        }
    }
    CommonFourPage.FourPage.getItemInfo(k, getPhoneItemDesc);
    CommonFourPage.FourPage.getPromotiondesc(k, getPhoneItemDetail);
    if (f == 0) {
        $("#phoneDetail").hide()
    }
    FourPage.addShopListCss();
    iFourth.mainHeight()
};
function getPhoneItemDesc(c) {
    try {
        if (c != null) {
            var a = (c.itemDisplayName != "" && c.itemDisplayName != null) ? c.itemDisplayName : ((c.itemName != "" && c.itemName != null) ? c.itemName : "");
            $("#productName").html(a.length > 18 ? a.substring(0, 18) + "..." : a);
            $(".proinfo-mini").find(".pro-name").html(a);
            $(".proinfo-mini").find(".pro-img").attr("alt", a);
            var b = "<h1 title='" + a + "'>" + a + "</h1><h2 id='promotionDesc'>";
            if (sn.sellType == 1 && typeof sn.phoneTypePromoDesc != "undefined") {
                b += sn.phoneTypePromoDesc
            } else {
                b += sn.promItemDesc + (sn.promItemDesc != "" ? "&nbsp;&nbsp;" : "") + sn.promotionDesc + (sn.barePhoneDesc == "" ? "" : "<br/>") + sn.barePhoneDesc
            }
            b += "</h2>";
            $(".proinfo-title").html(b)
        } else {
            $("#productName").html("");
            $(".proinfo-mini").find(".pro-name").html("");
            $(".proinfo-mini").find(".pro-img").attr("alt", "");
            $(".proinfo-title").html("")
        }
    } catch (f) {
    }
}
function getPhoneItemDetail(a) {
    try {
        if (a != "") {
            if (sn.sellType == 1) {
                $("#phoneDetail").html(typeof a.itemDetail.detailUrl == "undefined" ? "" : a.itemDetail.detailUrl);
                $("#phoneDetail").show()
            }
            $("img[src2]").Jlazyload({type: "image", placeholderClass: "err-product"})
        } else {
            $("#phoneDetail").hide()
        }
        iFourth.mainHeight()
    } catch (b) {
    }
}
PriceShow.setPrice = function(b, h, f, a) {
    try {
        if (sn.groupFlag) {
            return
        }
        if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
            if (sn.vendorCode == "" && sn.TMFlag) {
                FourPage.showInvStatus()
            } else {
                if (b == "2" || b == "3" || b == "4") {
                    getItemBigPolyAction(sn.partNumber, showBigPoly, errShowBigPoly)
                } else {
                    getMobileBigPoly(sn.partNumber, showMobileBigPoly, errShowMobileBigPoly)
                }
            }
        } else {
            FourPage.showInvStatus()
        }
        var g = sn.vendorCode;
        if (g.length == 10 && g.substring(0, 3) == "003") {
            g = ""
        }
        if (b == "0") {
            $("#promotionPriceBox").find("dt span").html("易购价");
            $("#promotionPrice").html(FourPage.getDisPrice(f));
            if (typeof sn.refPrice != "undefined" && sn.refPrice != "") {
                PriceShow.priceController()
            } else {
                $("#netPriceBox").hide()
            }
            if (sn.isPreBuy == 1) {
                $("#limitTime").show();
                $("#PriceNotice2").hide()
            } else {
                $("#limitTime").hide();
                $("#PriceNotice2").show()
            }
            $("#promotionPriceBox").show();
            if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
                CommonFourPage.Cart.itemLimit(sn.partNumber, "Cart.itemLimitHtml");
                $("#shopNetPrice" + g).find(".tag-cu").remove();
                $("#shopNetPrice" + g).find(".price").html("<i>&yen;</i><em>" + f + "</em>")
            }
        } else {
            if (b == "1") {
                $("#promotionPriceBox").find("dt span").html("促销价");
                $("#netPrice").html("<del><i>&yen;</i>" + h + "</del>");
                PriceShow.priceController();
                $("#promotionPrice").html(FourPage.getDisPrice(f));
                $("#promotionPriceBox").show();
                $("#limitTime").html("限时促销");
                $("#limitTime").show();
                if (sn.isPreBuy != 1) {
                    CommonFourPage.Cart.itemLimit(sn.partNumber, "Cart.itemLimitHtml");
                    $("#shopNetPrice" + g).find(".tag-cu").remove();
                    $("#shopNetPrice" + g).find(".price").before('<i class="tag tag-cu"></i>');
                    $("#shopNetPrice" + g).find(".price").html("<i>&yen;</i><em>" + f + "</em>")
                }
            } else {
                if (b == "4") {
                    $("#promotionPriceBox").find("dt span").html("促销价");
                    $("#netPrice").html("<del><i>&yen;</i>" + h + "</del>");
                    PriceShow.priceController();
                    $("#promotionPrice").html(FourPage.getDisPrice(f));
                    $("#promotionPriceBox").show();
                    if (sn.vendorCode == "" && sn.TMFlag) {
                        $("#limitTime").html("大聚惠")
                    } else {
                        $("#limitTime").html("")
                    }
                    $("#limitTime").show();
                    if (sn.isPreBuy != 1) {
                        $("#shopNetPrice" + g).find(".tag-cu").remove();
                        $("#shopNetPrice" + g).find(".price").before('<i class="tag tag-cu"></i>');
                        $("#shopNetPrice" + g).find(".price").html("<i>&yen;</i><em>" + f + "</em>")
                    }
                }
            }
        }
        if (sn.isPreBuy == 1) {
            $("#limitTime").html("预约");
            $("#promotionPriceBox").find("dt span").html("预约价")
        }
        if (typeof sn.refPrice != "undefined" && sn.refPrice != "") {
            $("#netPriceBox dt span").html("参考价");
            $("#netPrice").html("<del><i>&yen;</i> " + sn.refPrice + "</del>")
        } else {
            $("#netPriceBox dt span").html("易购价")
        }
        if (sn.vendorCode != "" && sn.invStatus == "1" && sn.freight != "-1" && !sn.groupFlag) {
            processQcode();
            setTimeout(processQcode, 500)
        } else {
            qCodeHide()
        }
        if (sn.isPreBuy == 2) {
            resetBookCss()
        }
        iFourth.mainHeight()
    } catch (c) {
    }
};
function showBigPoly(p) {
    FourPage.showInvStatus();
    PriceShow.activityFlag = "2";
    try {
        if (p != null && p.length != 0 && p.commList != null && p.commList.length != 0) {
            var f = sn.priceInvData;
            var a = p.commList.length;
            var o = p.commList;
            var b = "0";
            if (sn.priceType == "3") {
                b = "1"
            } else {
                if (sn.priceType == "4") {
                    b = "2"
                }
            }
            for (var h = 0;
                    h < a;
                    h++) {
                PriceShow.isLimitTake = o[h].isLimitTake;
                PriceShow.promotionType = "2";
                PriceShow.beginTime = o[h].gbBeginDate;
                PriceShow.endTime = o[h].gbEndDate;
                PriceShow.warmUpTime = o[h].gbWarmupDate;
                PriceShow.curTime = o[h].currentDate;
                PriceShow.price = o[h].gbPrice;
                PriceShow.maxPerNum = o[h].limitBuyNum;
                PriceShow.isPhoneBind = o[h].isPhoneBind;
                PriceShow.isBrondPay = o[h].isBrondPay;
                PriceShow.serviceType = o[h].serviceType;
                PriceShow.silenceTime = o[h].gbQuietDate;
                PriceShow.published = o[h].published
            }
            var k = parseInt(PriceShow.warmUpTime);
            var g = parseInt(PriceShow.beginTime);
            var j = parseInt(PriceShow.endTime);
            var c = parseInt(PriceShow.curTime);
            if (typeof PriceShow.silenceTime != "undefined" && PriceShow.silenceTime != "") {
                var n = parseInt(PriceShow.silenceTime)
            }
            if (sn.priceType == "4" && PriceShow.promotionType == "2") {
                if (PriceShow.isLimitTake == "1") {
                    sn.ziti = false;
                    $(".ziti").parent().hide()
                }
                if (k <= c && c <= g) {
                    PriceShow.bkflag = 1;
                    PriceShow.status = 1;
                    $("#limitTime").html("即将开始");
                    $("#limitTime").show();
                    PriceShow.activityFlag = "2";
                    $("#PriceNotice2").hide();
                    if (!sn.hwgShopFlag && PriceShow.serviceType == "3") {
                        $("#beginOrEnd").html("团购开始")
                    } else {
                        if (PriceShow.serviceType == "10") {
                            $("#beginOrEnd").html("距离开始")
                        } else {
                            $("#beginOrEnd").html("抢购开始")
                        }
                    }
                    if (PriceShow.maxPerNum != 0) {
                        $("#productLimit").html("正在促销，每人限购<em>" + PriceShow.maxPerNum + "</em>件");
                        $("#productLimit").show();
                        $("#buyNum").attr("max", PriceShow.maxPerNum);
                        $("#buycount").show()
                    } else {
                        $("#buycount").hide()
                    }
                    iFourth.buyNum();
                    if (!sn.hwgShopFlag && PriceShow.serviceType == "3") {
                        $("#addCart").removeClass().addClass("btn-group-wait").attr("href", "javascript:void(0);");
                        $("#addCart2").removeClass().addClass("btn-group-mini-wait").attr("href", "javascript:void(0);");
                        $("#tellMe").hide()
                    } else {
                        $("#addCart").removeClass().addClass("btn-rush-wait").attr("href", "javascript:void(0);");
                        $("#addCart2").removeClass().addClass("btn-rush-mini-wait").attr("href", "javascript:void(0);");
                        $("#tellMe").hide()
                    }
                    $("#preTime").show();
                    $("#buyNowAddCart").hide();
                    PriceShow.activityFlag = "2";
                    var l = (parseInt(g) - parseInt(c)) / 1000;
                    if (l > 0) {
                        $(".proinfo-cd").find("input:hidden").val(l);
                        iFourth.countdown(BigPolyCountDown)
                    }
                    $("#freenessPay").hide();
                    if ((sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet != "-1")) {
                        $("#nowProduct").hide()
                    }
                    if (PriceShow.serviceType == "9") {
                        $("#preTime").hide()
                    }
                } else {
                    if (g <= c && c <= j) {
                        PriceShow.status = 2;
                        if (PriceShow.serviceType == "2") {
                            $("#limitTime").html("抢购")
                        } else {
                            if (PriceShow.serviceType == "3") {
                                $("#limitTime").html("团购")
                            } else {
                                if (PriceShow.serviceType == "7") {
                                    $("#limitTime").html("S码专享")
                                } else {
                                    if (PriceShow.serviceType == "4") {
                                        $("#limitTime").html("闪购")
                                    } else {
                                        if (PriceShow.serviceType == "10") {
                                            $("#limitTime").html("爆款抢购")
                                        } else {
                                            $("#limitTime").html("大聚惠")
                                        }
                                    }
                                }
                            }
                        }
                        $("#limitTime").show();
                        PriceShow.activityFlag = "2";
                        $("#PriceNotice2").hide();
                        if (!sn.hwgShopFlag && PriceShow.serviceType == "3") {
                            $("#beginOrEnd").html("团购结束")
                        } else {
                            if (PriceShow.serviceType == "7" || PriceShow.serviceType == "10") {
                                $("#beginOrEnd").html("距离结束")
                            } else {
                                $("#beginOrEnd").html("抢购结束")
                            }
                        }
                        if (PriceShow.maxPerNum != 0) {
                            $("#productLimit").html("正在促销，每人限购<em>" + PriceShow.maxPerNum + "</em>件");
                            $("#productLimit").show();
                            $("#buyNum").attr("max", PriceShow.maxPerNum);
                            $("#buycount").show()
                        } else {
                            $("#buycount").hide()
                        }
                        $("#preTime").show();
                        iFourth.buyNum();
                        var l = (parseInt(j) - parseInt(c)) / 1000;
                        if (parseInt(j) > parseInt(c)) {
                            if (sn.promotionPrice != "" && (sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet != "-1")) {
                                $("#preTime").show();
                                if (PriceShow.serviceType == "7") {
                                    FourPage.scodeBuyStyle();
                                    $("#buyNowAddCart").show()
                                } else {
                                    $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                                }
                                if (PriceShow.serviceType == "2" || PriceShow.serviceType == "3") {
                                    $("#buyReminder").show()
                                }
                                if (PriceShow.serviceType == "10") {
                                    $("#addCart").hide();
                                    $("#addCart2").hide()
                                } else {
                                    $("#addCart").removeClass().addClass("btn-addcart").attr("href", "javascript:Cart.addCart();");
                                    $("#addCart2").removeClass().addClass("btn-addcart-mini").attr("href", "javascript:Cart.addCart();")
                                }
                            } else {
                                if (sn.freight == "-1" || f.invStatus == "2" || f.invStatus == "3" || f.invStatus == "0" || ((sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet == "-1")) {
                                    $("#preTime").hide();
                                    $("#buyNowAddCart").hide();
                                    $("#buyReminder").hide();
                                    $("#addCart").removeClass().addClass("btn-addcart-disable").attr("href", "javascript:void(0);");
                                    $("#addCart2").removeClass().addClass("btn-addcart-mini-disable").attr("href", "javascript:void(0);");
                                    if (f.invStatus == "2" || f.invStatus == "3" || f.invStatus == "0") {
                                        $("#tellMe").show()
                                    }
                                }
                            }
                            if (PriceShow.published == "2" && (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10")) {
                                $("#cuxiaoNoNum").show();
                                $("#cuxiaoEnd").hide();
                                $("#buyNowAddCart").hide();
                                $("#addCart").hide();
                                $("#inerestBox").hide();
                                $("#freenessPay").hide();
                                $("#buyReminder").hide();
                                $("#preTime").show();
                                $("#buyReminder").hide();
                                $("#addCart2").removeClass().attr("href", "javascript:void(0);").addClass("btn-rush-mini-no");
                                sn.cuxiaoSoldOut = "Y"
                            }
                            $(".proinfo-cd").find("input:hidden").val(l);
                            iFourth.countdown(BigPolyCountDown)
                        }
                        if (PriceShow.serviceType == "9") {
                            $("#limitTime").html("限时促销");
                            $("#preTime").hide()
                        }
                    } else {
                        if (typeof n != "undefined" && n != "") {
                            if (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10") {
                                if (c > j && c <= n) {
                                    if (PriceShow.serviceType == "2") {
                                        $("#limitTime").html("抢购")
                                    } else {
                                        if (PriceShow.serviceType == "3") {
                                            $("#limitTime").html("团购")
                                        } else {
                                            if (PriceShow.serviceType == "9") {
                                                $("#limitTime").html("限时促销")
                                            } else {
                                                if (PriceShow.serviceType == "10") {
                                                    $("#limitTime").html("爆款抢购")
                                                }
                                            }
                                        }
                                    }
                                    sn.silenceType = "Y";
                                    $("#limitTime").show();
                                    $("#cuxiaoEnd").show();
                                    $("#c_kucun").hide();
                                    $("#nowProduct").hide();
                                    $("#c_yunfei").hide();
                                    $("#buyNowAddCart").hide();
                                    $("#addCart").hide();
                                    $("#inerestBox").hide();
                                    $("#freenessPay").hide();
                                    $("#addCart2").removeClass().attr("href", "javascript:void(0);").addClass("btn-presell-mini-over")
                                } else {
                                    if (c > n) {
                                        $("#limitTime").html("大聚惠")
                                    }
                                }
                            } else {
                                $("#limitTime").html("大聚惠")
                            }
                        } else {
                            $("#limitTime").html("大聚惠")
                        }
                    }
                }
                FourPage.scodeCuxiaoTab(PriceShow.serviceType);
                if (sn.promotionPrice != "" && (sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet != "-1")) {
                    verifyBigPoly()
                }
            } else {
                PriceShow.activityFlag = ""
            }
        } else {
            $("#limitTime").html("大聚惠")
        }
    } catch (m) {
    }
    FourPage.initmdjt();
    iFourth.mainHeight()
}
function BigPolyCountDown() {
    if (remain == 0) {
        if (PriceShow.status == 1) {
            sn.silenceTip = "Y";
            PriceShow.status = 2;
            if (PriceShow.serviceType == "2") {
                $("#limitTime").html("抢购")
            } else {
                if (PriceShow.serviceType == "3") {
                    $("#limitTime").html("团购")
                } else {
                    if (PriceShow.serviceType == "7") {
                        $("#limitTime").html("S码专享")
                    } else {
                        if (PriceShow.serviceType == "4") {
                            $("#limitTime").html("闪购")
                        } else {
                            if (PriceShow.serviceType == "9") {
                                $("#limitTime").html("限时促销")
                            } else {
                                if (PriceShow.serviceType == "10") {
                                    $("#limitTime").html("爆款抢购")
                                } else {
                                    $("#limitTime").html("大聚惠")
                                }
                            }
                        }
                    }
                }
            }
            $("#limitTime").show();
            PriceShow.activityFlag = "2";
            FourPage.scodeCuxiaoTab(PriceShow.serviceType);
            $("#PriceNotice2").hide();
            if (!sn.hwgShopFlag && PriceShow.serviceType == "3") {
                $("#beginOrEnd").html("团购结束")
            } else {
                if (PriceShow.serviceType == "7" || PriceShow.serviceType == "10") {
                    $("#beginOrEnd").html("距离结束")
                } else {
                    $("#beginOrEnd").html("抢购结束")
                }
            }
            if (PriceShow.maxPerNum != 0) {
                $("#productLimit").html("正在促销，每人限购<em>" + PriceShow.maxPerNum + "</em>件");
                $("#productLimit").show();
                $("#buyNum").attr("max", PriceShow.maxPerNum);
                $("#buycount").show()
            } else {
                $("#buycount").hide()
            }
            iFourth.buyNum();
            var a = (parseInt(PriceShow.endTime) - parseInt(PriceShow.curTime)) / 1000;
            if (parseInt(PriceShow.endTime) > parseInt(PriceShow.curTime)) {
                $(".proinfo-cd").find("input:hidden").val(a);
                remain = a;
                if ((sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet != "-1")) {
                    $("#nowProduct").show();
                    $("#preTime").show();
                    if (PriceShow.serviceType == "7") {
                        FourPage.scodeBuyStyle();
                        $("#buyNowAddCart").show()
                    } else {
                        $("#buyNowAddCart").removeClass().addClass("btn-buynow").show()
                    }
                    if (PriceShow.serviceType == "2" || PriceShow.serviceType == "3") {
                        $("#buyReminder").show()
                    }
                    if (PriceShow.serviceType == "10") {
                        $("#addCart").hide();
                        $("#addCart2").hide()
                    } else {
                        $("#addCart").removeClass().addClass("btn-addcart").attr("href", "javascript:Cart.addCart();");
                        $("#addCart2").removeClass().addClass("btn-addcart-mini").attr("href", "javascript:Cart.addCart();")
                    }
                } else {
                    if (sn.promotionPrice == "" || sn.freight == "-1" || sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0" || ((sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet == "-1")) {
                        $("#preTime").hide();
                        $("#buyNowAddCart").hide();
                        $("#buyReminder").hide();
                        $("#addCart").removeClass().addClass("btn-addcart-disable").attr("href", "javascript:void(0);");
                        $("#addCart2").removeClass().addClass("btn-addcart-mini-disable").attr("href", "javascript:void(0);");
                        if (sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0") {
                            $("#tellMe").show()
                        }
                    }
                }
            }
            if (typeof (probeAuthStatus) == "function") {
                probeAuthStatus(function() {
                    $.ajax({type: "get", url: sn.rxfCompetency, cache: true, async: false, dataType: "jsonp", jsonpCallback: "Renxf.rxfCompetencyCallBack", success: function() {
                        }})
                }, function() {
                })
            }
            if (sn.scodeType == "7") {
                $("#freenessPay").parent().hide()
            }
        } else {
            $(".d").text("00");
            $(".h").text("00");
            $(".m").text("00");
            $(".s").text("00");
            clearTimeout(cDown);
            if (sn.hwgShopFlag) {
                $("#preTime").hide()
            }
            goToSilenceTime()
        }
        if (PriceShow.serviceType == "9") {
            $("#preTime").hide()
        }
        iFourth.mainHeight()
    }
}
function goToSilenceTime() {
    var a = parseInt(PriceShow.endTime);
    var c = parseInt(PriceShow.curTime);
    if (typeof PriceShow.silenceTime != "undefined" && PriceShow.silenceTime != "") {
        var b = parseInt(PriceShow.silenceTime)
    }
    if (typeof b != "undefined" && b != "" && PriceShow.status == 2 && sn.silenceTip != "Y") {
        if (sn.cuxiaoType == "4-2" || sn.cuxiaoType == "4-3" || sn.cuxiaoType == "4-10") {
            if (c <= b) {
                if (PriceShow.serviceType == "2") {
                    $("#limitTime").html("抢购")
                } else {
                    if (PriceShow.serviceType == "3") {
                        $("#limitTime").html("团购")
                    } else {
                        if (PriceShow.serviceType == "9") {
                            $("#limitTime").html("限时促销")
                        } else {
                            if (PriceShow.serviceType == "10") {
                                $("#limitTime").html("爆款抢购")
                            }
                        }
                    }
                }
                sn.silenceType = "Y";
                $("#limitTime").show();
                $("#cuxiaoEnd").show();
                $("#c_kucun").hide();
                $("#nowProduct").hide();
                $("#c_yunfei").hide();
                $("#cuxiaoNoNum").hide();
                $("#buyNowAddCart").hide();
                $("#addCart").hide();
                $("#inerestBox").hide();
                $("#buyReminder").hide();
                $("#preTime").hide();
                $("#freenessPay").hide();
                $("#addCart2").removeClass().attr("href", "javascript:void(0);").addClass("btn-presell-mini-over");
                $("#listProContent").hide();
                iFourth.mainHeight()
            }
        }
    }
}
function errShowBigPoly() {
    $("#limitTime").html("大聚惠");
    FourPage.showInvStatus()
}
function showMobileBigPoly(c) {
    try {
        if (c != null && c.length != 0 && c.commList != null && c.commList.length != 0) {
            var b = c.commList.length;
            var a = c.commList;
            PriceShow.isLimitTake = a[0].isLimitTake;
            if (PriceShow.isLimitTake == "1") {
                $(".ziti").hide();
                $(".ziti").parent().hide();
                sn.ziti = false
            }
            if (b > 0) {
                getMobileItemSaleStatus(sn.partNumber, "showSaleStatus", errShowMobileSaleStatus)
            } else {
                FourPage.showInvStatus()
            }
        } else {
            FourPage.showInvStatus()
        }
    } catch (f) {
    }
    iFourth.mainHeight()
}
function showMobileSaleStatus(b) {
    var e = b.saleInfo;
    if (typeof e != "undefined" && e.length > 0) {
        var a = e[0];
        sn.scodeType = (a.priceType).indexOf("4-7") >= 0 ? (a.priceType.substring(2, 3)) : "0";
        sn.scode = sn.scodeType == "7" ? true : false;
        var c = a.promotionPrice;
        if (typeof c != "undefined" && c != "") {
            if (parseFloat(c) < parseFloat(sn.promotionPrice)) {
                sn.mobilePrice = (parseFloat(sn.promotionPrice) - parseFloat(c)).toFixed(2)
            }
        }
    }
    FourPage.showInvStatus();
    iFourth.mainHeight()
}
function errShowMobileSaleStatus() {
    FourPage.showInvStatus();
    iFourth.mainHeight()
}
function errShowMobileBigPoly(a) {
    FourPage.showInvStatus();
    iFourth.mainHeight()
}
FourPage.showInvStatus = function() {
    $("#addCart").show();
    $("#addCart2").show();
    if (sn.cflag == "0") {
        $("#vendorType").val(2);
        FourPage.initCProductSaleStatus();
        if (sn.vendorCode != "" && sn.invStatus == "1" && sn.freight != "-1") {
            processQcode();
            setTimeout(processQcode, 500)
        } else {
            qCodeHide()
        }
        CommonFourPage.storeService.hide()
    } else {
        FourPage.initProductSaleStatus();
        getOldForNew("oldForNewShow")
    }
};
FourPage.processO2OInfo = function() {
    if (sn.cflag == "0") {
        if (sn.promotionPrice == "" || sn.invStatus == "0") {
            sn.saleStatus = 0
        } else {
            if (sn.invStatus == "2" || sn.invStatus == "3") {
                sn.saleStatus = 2
            } else {
                if (sn.freight == "-1" || typeof sn.freight == "undefined") {
                    sn.saleStatus = 4
                } else {
                    sn.saleStatus = 1
                }
            }
        }
    } else {
        if (sn.promotionPrice == "" || sn.invStatus == "0" || sn.invStatus == "3") {
            sn.saleStatus = 0
        } else {
            if (sn.invStatus == "2") {
                sn.saleStatus = 2
            } else {
                if (sn.shipOffSet < 0 || typeof sn.shipOffSet == "undefined") {
                    sn.saleStatus = 3
                } else {
                    sn.saleStatus = 1
                }
            }
        }
    }
    if (sn.invStatus == "0" || sn.saleStatus == "2" || sn.saleStatus == "3" || sn.saleStatus == "4") {
        if (Renxf.runFlag == "N") {
            Renxf.turnGray();
            Renxf.runFlag = "Y"
        }
    }
    if (sn.saleStatus == "1") {
        processQcode()
    } else {
        qCodeHide()
    }
    if (sn.isPreBuy != "1" && sn.isPreBuy != "2") {
        CommonFourPage.storeService.getStroeServiceList(sn.ninePartNumber, sn.saleStatus)
    } else {
        CommonFourPage.storeService.hide()
    }
    if (sn.scodeType == "7") {
        $("#freenessPay").parent().hide()
    }
};
FourPage.processCShopO2OInfo = function() {
    if (sn.promotionPrice != "" && sn.invStatus == "1" && sn.freight != "-1" && typeof sn.freight != "undefined") {
        CommonFourPage.storeService.getGuideShop()
    }
};
FourPage.withoutProductNum = function() {
    if (sn.invStatus == "0" || sn.invStatus == "2" || sn.invStatus == "3" || sn.freight == "-1" || typeof sn.freight == "undefined" || (sn.swlShopFlag && (typeof sn.shipOffSet == "undefined" || sn.shipOffSet < 0))) {
        if (Renxf.runFlag == "N") {
            Renxf.turnGray();
            Renxf.runFlag = "Y"
        }
    }
};
PriceShow.fixTime = function(a, b) {
    return("" + a).length < b ? ((new Array(b + 1)).join("0") + a).slice(-b) : "" + a
};
PriceShow.getDetailDate = function(j, e) {
    var h = new Date(j);
    var a = new Date(e);
    var f = h.getDate();
    var i = a.getDate();
    var g = true;
    if (f != i) {
        g = false
    }
    return g
};
PriceShow.priceController = function() {
    var a = $("#netPriceBox").html();
    try {
        if (sn.controller != [] && sn.controller[0].PRICE_FLAG != undefined) {
            if (sn.controller[0].PRICE_FLAG == "0" && (sn.refPrice != "" || (sn.priceType != "0" && sn.netPrice != ""))) {
                if (((parseFloat(sn.netPrice) > parseFloat(sn.promotionPrice) && sn.refPrice == "") || (parseFloat(sn.refPrice) > parseFloat(sn.promotionPrice) && sn.refPrice != ""))) {
                    $("#netPriceBox").show()
                } else {
                    $("#netPriceBox").hide()
                }
            } else {
                $("#netPriceBox").hide()
            }
        } else {
            $("#netPriceBox").show();
            if (((parseFloat(sn.netPrice) > parseFloat(sn.promotionPrice) && sn.refPrice == "") || (parseFloat(sn.refPrice) > parseFloat(sn.promotionPrice) && sn.refPrice != ""))) {
                $("#netPriceBox").show()
            } else {
                $("#netPriceBox").hide()
            }
        }
        if (sn.isPreBuy == 1) {
            $("#netPriceBox").hide()
        }
        if (sn.controller != [] && sn.controller[0].REPORT_FLAG != undefined) {
            sn.reportFlag = sn.controller[0].REPORT_FLAG
        } else {
            sn.reportFlag = "1"
        }
    } catch (b) {
    }
};
function sLablePicture(c) {
    try {
        if (c != null && c.imageUrl != "") {
            var b = c.patternCss;
            var a = c.imageUrl;
            $(".g-sticker-80 b").attr("style", "background-image:url(" + a + ")");
            $(".g-sticker-80 b").attr("class", b);
            $(".g-sticker-80").show()
        }
    } catch (f) {
    }
}
FourPage.cateDetail = function(a) {
    try {
        $("#productName").html(a.itemDisplayName.length > 18 ? a.itemDisplayName.substring(0, 18) + "..." : a.itemDisplayName);
        var c = a.itemDisplayName;
        if (sn.isPavilion) {
            c = '<a href="http://china.suning.com/" target="_blank"><span class="tsg">特色馆</span></a>' + c
        }
        $("#itemDisplayName").html(c)
    } catch (b) {
    }
};
FourPage.getParameter = function() {
    try {
        if (sn.getParameter == undefined || sn.getParameter != true) {
            sn.getParameter = true;
            $.ajax({url: sn.itemDomain + "/pds-web/ajax/itemParameter_" + sn.partNumber + "_" + sn.catenIds + "_" + sn.catalogId + ".html", type: "get", async: false, dataType: "json", success: function(h) {
                    if (h != null && h != "" && h.eleParameterList != undefined && h.eleParameterList != "") {
                        var g = [];
                        var e = '<table id="itemParameter" class="pro-para-tbl"><tbody>';
                        $.each(h.eleParameterList, function(k, j) {
                            $.each(j, function(i, l) {
                                e += '<tr><th colspan="3">' + i + "</th></tr>";
                                if (l != "" && l.length > 0) {
                                    $.each(l, function(m, n) {
                                        e += '<tr><td class="name">' + n.snparameterdesc + '</td><td class="val">' + n.snparameterVal + '</td><td class="err"><a href="javascript:void(0);">纠错</a></td></tr>';
                                        if (n.coreFlag == "X") {
                                            g.push(n)
                                        }
                                    })
                                }
                            })
                        });
                        e += "</tbody></table>";
                        if ($("#itemParameter").length < 1) {
                            $(".procon-param").append(e)
                        }
                        if (g.length > 0) {
                            var b = '<div class="hd"><h4>核心参数</h4>';
                            b += '<span class="opt"><a href="javascript:FourPage.productParTitleClick();">更多参数</a></span></div>';
                            b += '<ul class="cnt clearfix">';
                            var c = g.length > 15 ? 15 : g.length;
                            for (var f = 0;
                                    f < c;
                                    f++) {
                                b += '<li title="' + g[f].snparameterVal + '">' + g[f].snparameterdesc + "：" + g[f].snparameterVal + "</li>"
                            }
                            b += "</ul>";
                            $(".pro-detail-parameter").html(b);
                            $(".pro-detail-parameter").show()
                        }
                    }
                }, error: function() {
                }})
        }
    } catch (a) {
    }
};
FourPage.productParTitleClick = function() {
    $("#productParTitle").click()
};
FourPage.showReturnOrchange = function(a) {
    try {
        var b = a.returnFlag;
        var f = a.dayLimitDescprition;
        if ((b == "3" || b == "1") && sn.isPreBuy != 2) {
            $("#returnCate").html('<a class="tui" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_tuihuan" target="_blank" href="' + scmInfo.hanBackLink + '"><i class="icon"></i>' + f + '</a><a target="_blank" href="' + scmInfo.hanBackLink + '" class="new"></a>');
            $("#returnCate").attr("title", f);
            $("#returnCate").show();
            CommonFourPage.FourPage.getFreightInsuranceFlag()
        } else {
            if (sn.isPreBuy == 2) {
                $("#returnCate").html('<a class="tui-disable" name="item1_' + sn.partNumber.substring(9, 18) + '_gmq_tuihuan" href="javascript:void(0);"><i class="icon"></i>不支持无理由退换货</a>');
                $("#returnCate").attr("data-tip", "不支持无理由退换货");
                $("#returnCate").attr("data-link", scmInfo.hanBackLink);
                $("#returnCate").show();
                $("#yfxian").hide();
                return
            }
            $("#returnCate").html('<a class="tui-disable" name="item_' + sn.partNumber.substring(9, 18) + '_gmq_tuihuan" target="_blank" href="' + scmInfo.hanBackLink + '"><i class="icon"></i>' + f + "</a>");
            $("#returnCate").attr("title", f);
            $("#returnCate").show();
            $("#yfxian").hide()
        }
    } catch (c) {
    }
    iFourth.servLabel()
};
FourPage.initCluster = function() {
    try {
        if (typeof sn.clusterMap != "undefined" && sn.clusterMap.length != 0) {
            var a = "";
            $.each(sn.clusterMap, function(f, e) {
                $.each(e.itemCuPartNumber, function(h, g) {
                    if (g.partNumber == sn.partNumber) {
                        a = g.versionId;
                        if ($("#colorItemList").find("li.selected").length == 0) {
                            $("li[colorid='" + e.color + "']").addClass("selected")
                        }
                    }
                })
            });
            $("li[versionid='" + a + "']").addClass("selected");
            $.each(sn.clusterMap, function(f, e) {
                if (e.color == $("#colorItemList").find("li[class='selected']").attr("colorid")) {
                    $.each(e.itemCuPartNumber, function(h, g) {
                        $("li[versionid='" + g.versionId + "']").removeClass("disabled")
                    })
                }
            });
            $("li[class=disabled]").each(function() {
                $(this).children("a").removeAttr("onclick")
            })
        } else {
            $("#versionItemList").find("li").each(function() {
                var e = $(this).attr("sku");
                if (sn.partNumber == e) {
                    $(this).addClass("selected");
                    $(this).siblings().removeClass("selected")
                }
                $(this).removeClass("disabled")
            })
        }
        var b = "";
        $(".proattr-radio").each(function() {
            var e = $(this);
            e.find("li").each(function() {
                var f = $(this);
                if (f.is(".selected")) {
                    b += '"' + f.attr("title") + '"&nbsp'
                }
            })
        });
        if (b != "") {
            $("#selectCB").find(".result-text").html(b);
            $("#selectCB").show()
        } else {
            $("#selectCB").hide()
        }
        iFourth.attrChoose()
    } catch (c) {
    }
};
FourPage.changeVersion = function(j, h, g, b) {
    var i = "";
    try {
        var k = window.location.href.split("?")[1];
        i = typeof k != "undefined" ? ("?" + k) : ""
    } catch (f) {
    }
    try {
        var a = "";
        var c = "";
        if ($(b).parent().attr("colorid") != undefined) {
            a = $(b).parent().attr("colorid");
            c = $("#versionItemList").find("li.selected").attr("versionid")
        } else {
            c = $(b).parent().attr("versionid");
            a = $("#colorItemList").find("li.selected").attr("colorid")
        }
        $.each(sn.clusterMap, function(l, e) {
            if (e.color == a) {
                $.each(e.itemCuPartNumber, function(n, m) {
                    if (m.versionId == c) {
                        h = m.partNumber
                    }
                })
            }
        });
        if (j == h) {
            return false
        }
        if ("" != h && h.length > 9) {
            h = h.substr(9, h.length)
        }
        if (sn.shopType == "-1") {
            window.location.href = sn.itemDomain + "/" + h + ".html" + i
        } else {
            if ("" != sn.vendorCode) {
                window.location.href = sn.itemDomain + "/" + sn.vendorCode + "/" + h + ".html" + i
            } else {
                window.location.href = sn.itemDomain + "/0000000000/" + h + ".html" + i
            }
        }
        return false
    } catch (f) {
    }
};
FourPage.selectIT = function(a) {
    try {
        if (a.checked) {
            if (a.id == "bk1") {
                $("#catEntryId_2").val(sn.itHelpOne)
            }
            if (a.id == "bk2") {
                $("#catEntryId_3").val(sn.itHelpTwo)
            }
        } else {
            if (a.id == "bk1") {
                $("#catEntryId_2").val("")
            }
            if (a.id == "bk2") {
                $("#catEntryId_3").val("")
            }
        }
    } catch (b) {
    }
};
FourPage.runInitFittingReady = function() {
    try {
        $.ajax({url: "http://" + sn.domain + sn.context + "/fit_10052_" + sn.catalogId + "_" + sn.partNumber + "_" + sn.vendorCode + "_" + sn.cityId + "_FourPage.initFitting_.html", type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "FourPage.initFitting", success: function(b) {
                iFourth.win.scroll()
            }})
    } catch (a) {
    }
};
Recommend.initFittingPrice = function(a) {
    try {
        if (a != "") {
            $.ajax({url: "http://" + sn.domain + "/webapp/wcs/stores/accessoryPrice/" + a + "_" + sn.itemId + "_getFittingPrice.html", type: "get", cache: true, dataType: "jsonp", jsonpCallback: "getFittingPrice", success: function(g) {
                    if (g.length > 0) {
                        for (var f = 0;
                                f < g.length;
                                f++) {
                            var c = iFourth.tieInRec2.list.children("li").filter("'[data-id=\"" + g[f].partNumber + "\"]'");
                            if (g[f].massocceceId != undefined && g[f].massocceceId != "") {
                                if (c.length > 0) {
                                    var h = $(c[0]);
                                    if (h.find(".price").length <= 0) {
                                        var e = '<p class="price"><span>套餐价：</span><i>&yen;</i>' + g[f].accessoryPrice + "</p>";
                                        if (parseFloat(g[f].price) - parseFloat(g[f].accessoryPrice) > 0) {
                                            e += '<span class="label">已优惠&yen;' + parseFloat(parseFloat(g[f].price) - parseFloat(g[f].accessoryPrice)).toFixed(2) + "</span>"
                                        }
                                        e += '<i class="plus"></i><input class="high" type="hidden" value="' + g[f].price + '"><input class="low" type="hidden" value="' + g[f].accessoryPrice + '">';
                                        h.find(".check").val(g[f].massocceceId);
                                        h.find(".check").before(e)
                                    }
                                }
                            } else {
                                c.remove()
                            }
                        }
                        iFourth.tieInRec2.update()
                    }
                }})
        }
    } catch (b) {
    }
};
FourPage.initFitting = function(j) {
    if (sn.silenceType == "Y" || sn.cuxiaoSoldOut == "Y") {
        $("#listProContent").hide();
        iFourth.mainHeight();
        return
    }
    try {
        if (j != "" && j.returnCode == "0" && j.kitware2Components.length > 0) {
            var c = '<div class="tiein-top"><a href="' + sn.elecProductDomain + "/0000000000/" + j.mainPartNumber.substring(9, 18) + '.html" target="_blank"><img src="' + sn.imageDomianDir + "/b2c/catentries/" + sn.partNumber + '_1_120x120.jpg" alt="' + j.mainProductName + '"/></a>';
            c += '<p class="title"><a target="_blank" href="' + sn.elecProductDomain + "/0000000000/" + j.mainPartNumber.substring(9, 18) + '.html">' + j.mainProductName + '</a></p><p class="price" id="pro_jiage"><i>&yen</i></p><i class="plus"></i></div>';
            c += '<div class="tiein-nav"><a name="item_' + sn.ninePartNumber + '_dapei_alldp" data-type="0" href="javascript:void(0);" class="current">全部搭配</a>  <span>|</span>';
            if (j.kitware2Names.length > 0) {
                for (var f = 0;
                        f < j.kitware2Names.length;
                        f++) {
                    c += '<a name="item_' + sn.ninePartNumber + "_dapei_group0" + (f + 1) + '" data-type="' + j.kitware2Names[f].sequence + '" href="javascript:void(0);">' + j.kitware2Names[f].groupName + "</a>  ";
                    if (f != j.kitware2Names.length - 1) {
                        c += "<span>|</span>"
                    }
                }
            }
            c += '</div><div class="tiein-main" id="J-slide-tieIn">';
            c += '<a name="item_' + sn.ninePartNumber + '_dapei_tabup" class="btn-dir prev" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
            c += '<a name="item_' + sn.ninePartNumber + '_dapei_tabdown" class="btn-dir next" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
            c += '<div class="tiein-list"><ul id="dapei_slide">';
            if (j.kitware2Components.length > 0) {
                for (var f = 0;
                        f < j.kitware2Components.length;
                        f++) {
                    var h = j.kitware2Components[f].partNumber;
                    var g = j.kitware2Components[f].productPrice.price;
                    var b = j.kitware2Components[f].productPrice.accessoryPrice;
                    if (b == null) {
                        b = ""
                    }
                    var a = sn.elecProductDomain + "/0000000000/" + h.substring(9, 18) + ".html";
                    c += '<li class="" data-type="' + j.kitware2Components[f].sequence + '"><a name="item_' + sn.ninePartNumber + '_dapei_tj01p" target="_blank" href="' + a + '"><img alt="' + j.kitware2Components[f].productName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + h + '_1_60x60.jpg" ></a>';
                    c += '<p class="title"><a name="item_' + sn.ninePartNumber + '_dapei_tj01c" target="_blank" href="' + a + '">' + j.kitware2Components[f].productName + "</a></p>";
                    c += '<p class="price"><span>套餐价：</span><i>&yen;</i>' + b + "</p>";
                    if (g != null && g != "" && b != null && b != "" && (parseFloat(g) - parseFloat(b) > 0)) {
                        c += '<span class="label">已优惠&yen;' + parseFloat(parseFloat(g) - parseFloat(b)).toFixed(2) + "</span>"
                    }
                    c += '<i class="plus"></i><input class="fitPartNumber" type="hidden" value="' + h + '"><input class="accessoryId" type="hidden" value="' + (j.kitware2Components[f].productPrice.accessoryId == undefined ? "" : j.kitware2Components[f].productPrice.accessoryId) + '"><input class="high" type="hidden" value="' + g + '"><input class="low" type="hidden" value="' + b + '"><input mas="' + j.kitware2Components[f].MASSOCCECE_ID + '" name="item_' + sn.ninePartNumber + '_dapei_tj01p" class="check" value="' + j.kitware2Components[f].MASSOCCECE_ID + '" type="checkbox"></li>'
                }
            }
            c += '</ul></div><div class="tiein-main-empty"><i></i><span>抱歉，您选择的搭配商品已售完，欢迎您选择其他商品！</span></div></div>';
            c += ' <div class="tiein-count"><p class="count">已搭配 <em>0</em> 件</p>';
            c += '<dl><dt>套餐价：</dt><dd class="price"><i>&yen;</i>  <span id="yuanjia" class="price-total">0.00</span></dd></dl><dl style="display:none;"><dt>已优惠：</dt><dd class="price"><i>&yen;</i>  <span id="yhj" class="price-diff">0.00</span></dd></dl>';
            c += '<div class="handle"><a name="item_' + sn.ninePartNumber + '_dapei_buy02" href="javascript:Cart.addCartPJ();" class="btn-addcart-mini"></a><a name="item_' + sn.ninePartNumber + '_dapei_delete" href="javascript:void(0);" class="reset">清除全部</a></div></div>';
            $("#J-tieIn").html(c);
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
            if (sn.scodeType == "7") {
                $("#listProContent").find("div ul li[rel=#J-setMeal]").hide();
                $("#J-setMeal").hide();
                if ($("#J-tieIn").html() == "" || $("#J-tieIn").html() == null) {
                    $("#listProContent").hide()
                }
            }
            iFourth.tieInRec()
        } else {
            $("#J-tieIn").hide();
            $("#J-setMeal").html("");
            $("li[rel=#J-tieIn]").hide();
            if ($("#J-setMeal").length > 0 && $("#J-setMeal").html() != "") {
                $("#listProContent").show();
                if (sn.scodeType == "7") {
                    $("#listProContent").find("div ul li[rel=#J-setMeal]").hide();
                    $("#J-setMeal").hide();
                    if ($("#J-tieIn").html() == "" || $("#J-tieIn").html() == null) {
                        $("#listProContent").hide()
                    }
                }
            } else {
                $("#listProContent").hide()
            }
        }
        iFourth.win.scroll()
    } catch (k) {
    }
};
FourPage.packageReady = function() {
    if (typeof (showComoboStatus) == "function") {
        if ($("#J-setMeal").length > 0) {
            lazyElems["J-setMeal"].url = "http://" + sn.domain + "/webapp/wcs/stores/comboPrice/" + sn.cityId + "_" + sn.virtualPartNumber + "_showComoboStatus.html";
            lazyElems["J-setMeal"].handle = showComoboStatus;
            lazyElems["J-setMeal"].enable = true;
            setTimeout(function() {
                iFourth.win.scroll()
            }, 500)
        }
    } else {
        setTimeout(FourPage.packageReady, 1000)
    }
};
function showComoboStatus(b) {
    if (sn.silenceType == "Y" || sn.cuxiaoSoldOut == "Y") {
        $("#listProContent").hide();
        iFourth.mainHeight();
        return
    }
    try {
        if (b != "" && typeof b.combo != "undefined" && typeof b.bundlePrice != "undefined" && b.combo.length > 0 && b.bundlePrice != "") {
            var f = b;
            var a = "";
            var c = 1;
            var h = "";
            var i = "";
            a += '<div class="tiein-top"><a name="item_' + sn.ninePartNumber + '_dapei_tc01p" target="_blank" href="' + sn.elecProductDomain + "/" + sn.partNumber.substring(9, 18) + '.html"><img alt="" src="' + sn.imageDomianDir + "/b2c/catentries/" + sn.partNumber + '_1_120x120.jpg"/></a>';
            a += '<p class="title"><a name="item_' + sn.ninePartNumber + '_dapei_tc01c" target="_blank" href="' + sn.elecProductDomain + "/" + sn.partNumber.substring(9, 18) + '.html">' + sn.itemDisplayName + '</a></p><i class="plus"></i></div>';
            a += '<div class="tiein-nav"><a name="item_' + sn.ninePartNumber + '_dapei_taocan01" class="current" href="javascript:void(0);" data-group="1">组合套餐1</a></div>';
            a += '<div id="J-slide-setMeal" class="tiein-main">';
            if (f.combo.length > 4) {
                a += '<a class="btn-dir prev" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>';
                a += '<a class="btn-dir next" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">1</i></span><i class="arr"></i></a>'
            }
            a += '<div class="tiein-list"><ul class="" data-group="1">';
            $.each(f.combo, function(e, j) {
                if (j.partNumber != sn.partNumber) {
                    c++;
                    a += '<li class="" data-type="0">';
                    a += '<a name="item_' + sn.ninePartNumber + "_dapei_tc0" + (e + 1) + 'p" target="_blank" href="' + sn.elecProductDomain + "/" + j.partNumber.substring(9, 18) + '.html"><img alt="' + j.productName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + j.partNumber + '_1_60x60.jpg"/></a><p class="title"><a name="item_' + sn.ninePartNumber + "_dapei_tc0" + (e + 1) + 'c" target="_blank" href="' + sn.elecProductDomain + "/" + j.partNumber.substring(9, 18) + '.html">' + j.productName + '</a></p><i class="plus"></i></li>'
                }
                h += j.partNumber + ",";
                i += j.productCount + ","
            });
            h = h.substring(0, h.length - 1);
            i = i.substring(0, i.length - 1);
            a += "</ul></div></div>";
            a += '<div class="tiein-count"><p class="count">已选择：<span>组合套餐1</span></p>';
            a += '<dl><dt>套餐价：</dt><dd class="price"><i>&yen;</i><span class="price-total">' + (f.bundlePrice != "" ? parseFloat(f.bundlePrice).toFixed(2) : 0) + "</span></dd></dl>";
            if (f.pacTotalPrice != "" && f.bundlePrice != "" && parseFloat(f.pacTotalPrice - f.bundlePrice).toFixed(2) != 0) {
                a += '<dl><dt>已优惠：</dt><dd class="price"><i>&yen;</i><span class="price-diff">' + parseFloat(f.pacTotalPrice - f.bundlePrice).toFixed(2) + "</span></dd></dl>"
            }
            a += '<div class="handle"><a name="item_' + sn.ninePartNumber + "_dapei_gmtc\" class=\"btn-addcart-mini\" href=\"javascript:addCartForPackage('1','','" + sn.virtualPartNumber + "','" + h + "','','" + i + "','','','','');\"></a></div></div>";
            $("#J-setMeal").html(a);
            if ($("#J-tieIn").html() != "" && $("#J-tieIn").html() != null) {
                $("#listProContent").find("li[rel=#J-tieIn]").removeClass().addClass("current");
                $("#listProContent").find("li[rel=#J-setMeal]").removeClass();
                $("#J-setMeal").hide()
            } else {
                $("#listProContent").find("li[rel=#J-setMeal]").removeClass().addClass("current");
                $("#listProContent").find("li[rel=#J-tieIn]").removeClass();
                $("#listProContent").find("li[rel=#J-tieIn]").hide();
                $("#J-setMeal").show()
            }
            $("li[rel=#J-setMeal]").show();
            $("#listProContent").show();
            if (sn.scodeType == "7") {
                $("#listProContent").find("li[rel=#J-setMeal]").hide();
                $("#J-setMeal").hide();
                if ($("#J-tieIn").html() == "" || $("#J-tieIn").html() == null) {
                    $("#listProContent").hide()
                }
            }
            iFourth.setMeal()
        } else {
            $("#J-setMeal").hide();
            $("#J-setMeal").html("");
            $("li[rel=#J-setMeal]").hide();
            if ($("#J-tieIn").length && $("#J-tieIn").html() != "" && $("#J-tieIn").html() != null) {
                $("#listProContent").show();
                if (sn.scodeType == "7") {
                    $("#listProContent").find("div ul li[rel=#J-setMeal]").hide();
                    $("#J-setMeal").hide();
                    if ($("#J-tieIn").html() == "" || $("#J-tieIn").html() == null) {
                        $("#listProContent").hide()
                    }
                }
            } else {
                $("#listProContent").hide()
            }
        }
    } catch (g) {
    }
}
FourPage.getCShopAttr = function() {
    try {
        $.ajax({url: sn.itemDomain + "/pds-web/ajax/giftCard_" + sn.vendorCode + ".html", type: "get", async: false, dataType: "json", success: function(b) {
                if (b.giftCardVendor != undefined && b.giftCardVendor != "") {
                    $("#giftCard").show()
                }
            }})
    } catch (a) {
    }
};
var browseHistory, currentProduct, SEPERATOR, count, productIds, historylen, cat, hisCount, myHistory = "";
var skus, hisSkus = [];
FourPage.showMyHistory = function() {
    try {
        browseHistory = FourPage.getCookieBonus("smhst");
        currentProduct = (sn.partNumber).substring(9, 18);
        SEPERATOR = "a";
        count = 1;
        hisCount = 0;
        productIds = FourPage.updateHistory(browseHistory, currentProduct, SEPERATOR);
        historylen;
        if (productIds == null || (productIds.length == 1 && currentProduct == productIds[0])) {
            historylen = 1;
            productIds = [];
            productIds[0] = currentProduct;
            skus = productIds
        } else {
            skus = [];
            historylen = productIds.length;
            var b = 0;
            $.each(productIds, function(a, e) {
                if (e != currentProduct) {
                    skus[b + 1] = e;
                    b++
                }
            });
            skus[0] = currentProduct;
            historylen++
        }
        myHistory = '<a class="btn-dir prev prev-disable" href="javascript:void(0);"></a><div class="scroll-box" id=""><ul>';
        FourPage.mysetHistoryValue(skus, count, sn.cityId, sn.imageDomianDir, sn.storeId, sn.catalogId, "-7", historylen);
        var g = [];
        if (skus.length > 4) {
            for (var c = 0;
                    c < 4;
                    c++) {
                g[c] = skus[c]
            }
        } else {
            g = skus
        }
        CommonFourPage.Recommend.historyRec(g, "Recommend.historyRecHtml")
    } catch (f) {
    }
};
function setiDiggerTrackingCodes() {
    var a = "";
    if (typeof sn.category1 != "undefined") {
        a = sn.category1
    }
    if (typeof sn.category2 != "undefined") {
        a += "_" + sn.category2
    }
    if (typeof sn.categoryId != "undefined") {
        a += "_" + sn.categoryId
    }
    iDiggerTrackingCodes(sn.partNumber, a, _wmmq)
}
FourPage.updateHistory = function(a, h, b) {
    try {
        var g;
        var c;
        if (FourPage.isNotEmpty(h)) {
            if (FourPage.isNotEmpty(a)) {
                if (a.indexOf(h) < 0) {
                    g = a.split(b);
                    if (g.length < 20) {
                        c = h + b + a
                    } else {
                        c = h + b + a.substring(0, a.lastIndexOf(b))
                    }
                } else {
                    return a.split(b)
                }
            } else {
                c = h
            }
            FourPage.setCookieBonus("smhst", c, 30);
            if (a == null) {
                return c.split(b)
            } else {
                return a.split(b)
            }
        } else {
            return a == null ? null : a.split(b)
        }
    } catch (f) {
    }
};
FourPage.isNotEmpty = function(a) {
    return a != null && $.trim(a).length > 0
};
FourPage.getCookieBonus = function(c) {
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
};
FourPage.setCookieBonus = function(b, e, a) {
    var c = new Date();
    c.setTime(c.getTime() + (a * 1000 * 3600 * 24));
    document.cookie = b + "=" + e + ((a == null) ? "" : "; expires=" + c.toGMTString()) + ";path=/;domain=" + sn.cookieDomain
};
FourPage.mysetHistoryValue = function(g, f, e, j, i, b, h, c) {
    cat = g[f - 1];
    var a = "http://" + sn.domain + sn.context + "/bHistory_10052_" + b + "_" + cat + "_" + e + "_FourPage.histroyHtml_.html";
    $.ajax({url: a, cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "histroyHtml", success: function(k) {
        }})
};
FourPage.histroyHtml = function(a) {
    try {
        if (a != null && a.price != "") {
            myHistory += '<li sku="' + cat + '"><a name="item_' + sn.ninePartNumber + "_llls_pic0" + count + '" target="_blank" href="' + sn.elecProductDomain + "/" + cat + '.html"><img alt="' + a.name + '" src="' + sn.imageDomianDir + "/b2c/catentries/000000000" + cat + '_1_160x160.jpg"/></a><p class="title"><a name="item_' + sn.ninePartNumber + "_llls_word0" + count + '" target="_blank" href="' + sn.elecProductDomain + "/" + cat + '.html">' + a.name + '</a></p><p class="price"><i>&yen;</i>' + (a.price == "" ? "" : parseFloat(a.price).toFixed(2)) + "</p></li>";
            hisSkus[hisCount] = cat;
            hisCount++
        }
        if (count < skus.length) {
            count = count + 1;
            FourPage.mysetHistoryValue(skus, count, sn.cityId, sn.imageDomain, sn.storeId, sn.catalogId, "-7", historylen)
        } else {
            myHistory += '</ul></div><a class="btn-dir next" href="javascript:void(0);"></a>';
            $("#J-historyList").html(myHistory);
            if (hisCount == 0) {
                $("#historyListDiv").hide()
            } else {
                $("#historyListDiv").show()
            }
            if (hisCount < 6) {
                $("#J-historyList .prev").css("visibility", "hidden");
                $("#J-historyList .next").css("visibility", "hidden")
            }
            if ($("#J-historyList").find("li").length > 0) {
                $("#historyListDiv").show();
                iFourth.listloop({wrap: "#J-historyList", loopBox: ".scroll-box ul", step: {wide: 5, narrow: 4}, scrollWidth: {wide: 900, narrow: 720}, labelObj: $("#J-historyList-pager"), delay: 5000})
            } else {
                $("#historyListDiv").hide()
            }
        }
    } catch (b) {
    }
};
FourPage.initmdjt = function() {
};
FourPage.getShopGrade = function() {
    var b = sn.vendorCode;
    if ("undefined" == b || "" == b || (b.length == 10 && b.substring(0, 3) == "003")) {
        b = "0000000000"
    }
    var a = sn.zoneDomain + "/review/ajax/supplierEval/" + b + "-FourPage.shopGrade.htm";
    $.ajax({url: a, type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "FourPage.shopGrade", success: function(c) {
        }})
};
FourPage.shopGrade = function(a) {
};
FourPage.getReview = function() {
    var a = "";
    if (sn.reviewIsNew != 1) {
        a = sn.zoneDomain + "/review/json/productscore_reviewcount/" + sn.partNumber + "--" + sn.prdType + "-" + sn.prdTypeVal + "---satisfy.html"
    } else {
        a = FourPage.buildReviewUrl()
    }
    $.ajax({url: a, cache: true, async: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "satisfy", success: function(b) {
            if (sn.reviewIsNew != 1) {
                try {
                    if (b.success == true) {
                        FourPage.productSatisfy(b.data.score, b.data.totalCount);
                        $("li[rel=#J-procon-comment]").html('<a name="item_' + sn.ninePartNumber + '_tab_pingjia" href="javascript:void(0);">评价（' + b.data.totalCount + "）</a>");
                        FourPage.hash()
                    }
                } catch (g) {
                }
            } else {
                if (b.returnCode == "1") {
                    var f = b.reviewCounts[0].qualityStar;
                    var c = b.reviewCounts[0].totalCount;
                    FourPage.productSatisfy(f, c);
                    $("li[rel=#J-procon-comment]").html('<a name="item_' + sn.ninePartNumber + '_tab_pingjia" href="javascript:void(0);">评价（' + c + "）</a>");
                    FourPage.hash()
                }
            }
        }})
};
FourPage.buildReviewUrl = function() {
    var a = "";
    if (sn.vendorCode == "") {
        a = "0000000000"
    } else {
        a = sn.vendorCode
    }
    if (sn.shopType == "-1") {
        a = ""
    }
    var b = sn.reviewNew + "ajax/review_satisfy/general-" + sn.partNumber + "-" + a + "-----satisfy.htm";
    return b
};
FourPage.judgeValue = function(a) {
    if (a == undefined || a == null) {
        a = ""
    }
    return a
};
FourPage.productSatisfy = function(c, b) {
    var a = c;
    if (a <= 0.2) {
        a = 0
    } else {
        if (a <= 0.7) {
            a = 0.5
        } else {
            if (a <= 1.2) {
                a = 1
            } else {
                if (a <= 1.7) {
                    a = 1.5
                } else {
                    if (a <= 2.2) {
                        a = 2
                    } else {
                        if (a <= 2.7) {
                            a = 2.5
                        } else {
                            if (a <= 3.2) {
                                a = 3
                            } else {
                                if (a <= 3.7) {
                                    a = 3.5
                                } else {
                                    if (a <= 4.2) {
                                        a = 4
                                    } else {
                                        if (a <= 4.7) {
                                            a = 4.5
                                        } else {
                                            if (a <= 5) {
                                                a = 5
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    if (a == 3.5) {
        a = Math.floor(a * 20) + 1
    } else {
        if (a == 4.5) {
            a = Math.floor(a * 20) + 2
        } else {
            a = Math.floor(a * 20)
        }
    }
    $(".proinfo-star").each(function() {
        $(this).html('<dt>&nbsp;</dt><dd><span class="stars"><em style="width:' + (a) + '%;"></em></span><span>' + c + '分</span><a name="item_' + sn.partNumber.substring(9, 18) + '_gmq_pingjia" class="totalReview" href="#pro_detail_tab">共有' + b + "条评价</a></dd>")
    })
};
FourPage.getConsulation = function() {
    var a = sn.zoneDomain + "/review/ajax/wcs_consulation_rank/" + sn.partNumber + "-" + sn.vendorCode + "-false-" + sn.subcodeflag + "-FourPage.consulationCallback.html";
    $.ajax({url: a, cache: true, async: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "FourPage.consulationCallback", success: function() {
        }})
};
FourPage.consulationCallback = function(a) {
    try {
        if (a.returnCode == "0") {
            $("li[rel=#J-procon-refer]").html('<a name="item_' + sn.ninePartNumber + '_tab_zixun" href="javascript:void(0);">咨询（' + a.totalCount + "）</a>")
        }
    } catch (b) {
    }
};
FourPage.shareWb = function() {
    sn.productShareName = $("#productName").text();
    sn.productShareName = sn.productShareName.length > 100 ? (sn.productShareName.substring(0, 100) + "...") : sn.productShareName;
    var h = window.location + "";
    var n = h.substr(0, h.indexOf("htm")) + "html";
    var c = encodeURI(n);
    var q = encodeURI(sn.productShareName);
    var e = encodeURI(sn.productShareName);
    var l = "";
    var j = "";
    if (sn.promotionPrice != null && sn.promotionPrice != "") {
        l = sn.productShareName + "，易购价：￥" + sn.promotionPrice + " 苏宁易购让您尽享购物乐趣（分享自 @苏宁易购）";
        j = sn.productShareName + "，易购价：¥" + sn.promotionPrice + " 苏宁易购让您尽享购物乐趣（分享自 @苏宁易购）"
    } else {
        l = sn.productShareName + " 苏宁易购让您尽享购物乐趣（分享自 @苏宁易购）";
        j = sn.productShareName + " 苏宁易购让您尽享购物乐趣（分享自 @苏宁易购）"
    }
    q = encodeURI(l);
    _ts = encodeURI(sn.productShareName);
    $(".kaixin").attr("href", "http://www.kaixin001.com/repaste/bshare.php?rtitle=" + q + "&rurl=" + c + "&from=maxthon");
    $(".sina").attr("href", "http://v.t.sina.com.cn/share/share.php?url=" + c + "&appkey=400813291&title=" + q + "&pic=");
    var g = "推荐苏宁电器网上商城(suning.cn) " + document.title + "价格便宜，评价也不错，快去看看详细介绍吧\n" + window.location + "\n苏宁承诺：所售商品均为正品行货，带发票，凭质保证书及发票可全国联保";
    $(".douban").attr("href", "http://www.douban.com/recommend/?url=" + c + "&title=" + _ts + "&comment=" + encodeURI(g));
    $(".renren").attr("href", "http://share.renren.com/share/buttonshare.do?link=" + c + "&title=" + q);
    var b = encodeURI("65e3731f449e42a484c25c668160b355");
    var k = encodeURI(sn.pic);
    var m = encodeURI("http://www.suning.com");
    var o = "http://v.t.qq.com/share/share.php?title=" + q + "&url=" + c + "&appkey=" + b + "&site=" + m + "&pic=" + k;
    $(".tengxun").attr("href", o);
    $(".souhu").attr("href", "http://t.sohu.com/third/post.jsp?&url=" + c + "&title=" + q + "&content=utf-8&pic=");
    var a = {url: location.href, desc: "", summary: "", title: j, site: "苏宁易购", pics: sn.pic};
    var r = [];
    for (var f in a) {
        r.push(f + "=" + encodeURIComponent(a[f] || ""))
    }
    $(".qzone").attr("href", "http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?" + r.join("&"))
};
FourPage.loginFeedBackDialog = function() {
    $("body").AjaxLogin({success: function() {
            iFourth.priceFeedbackDialog()
        }})
};
FourPage.subscribePriceNotice = function() {
    var b = "0000000000";
    if (sn.vendorCode != "") {
        b = sn.vendorCode
    }
    partNumber = sn.partNumber;
    var a = sn.promotionPrice;
    if (sn.groupFlag) {
        a = sn.groupPromotionPrice;
        partNumber = sn.groupPartnumber
    } else {
        if (sn.sellType == 1 && typeof sn.phonePrice != "undefined") {
            a = sn.phonePrice;
            partNumber = sn.phonePartNumber
        }
    }
    mySuning.subscribePriceNotice(partNumber, b, a, "productDetail")
};
FourPage.addProductFavorite = function() {
    var a = "0000000000";
    if (sn.vendorCode != "") {
        a = sn.vendorCode
    }
    mySuning.add2ProductFavorite(sn.partNumber, a, "productDetail", "", "prd_" + sn.itemId)
};
FourPage.addShopFavorite = function() {
    var a = "0000000000";
    if (sn.vendorCode != "") {
        a = sn.vendorCode
    }
    mySuning.add2ShopFavorite(a, "productDetail")
};
FourPage.subscribeArrivalNotice = function() {
    var a = "0000000000";
    if (sn.vendorCode != "") {
        a = sn.vendorCode
    }
    mySuning.subscribeArrivalNotice(sn.partNumber, a, "productDetail")
};
FourPage.runDapushWhenReady = function() {
    if (typeof (_dapush) == "function") {
        _dapush()
    } else {
        setTimeout(FourPage.runDapushWhenReady, 1000)
    }
};
FourPage.getDisPrice = function(b) {
    var a = "";
    if (!(sn.isPreBuy == 1 && preBuy.priceType != 2)) {
        b += "";
        var c = parseFloat(b).toFixed(2);
        a = "<i>&yen;</i>" + c.substring(0, c.indexOf(".")) + ".<span>" + c.substring(c.indexOf(".") + 1) + "</span>"
    } else {
        a = "<i>&yen;</i>" + b
    }
    return a
};
FourPage.comparePrice = function(a, c) {
    var b = a == "" ? "0" : a;
    var c = c == "" ? "0" : c;
    if (parseFloat(a) == parseFloat(c)) {
        return 0
    } else {
        if (parseFloat(a) > parseFloat(c)) {
            return 1
        } else {
            return -1
        }
    }
};
FourPage.starUtil = function(a) {
    if (a <= 0.2) {
        a = 0
    } else {
        if (a <= 0.7) {
            a = 0.5
        } else {
            if (a <= 1.2) {
                a = 1
            } else {
                if (a <= 1.7) {
                    a = 1.5
                } else {
                    if (a <= 2.2) {
                        a = 2
                    } else {
                        if (a <= 2.7) {
                            a = 2.5
                        } else {
                            if (a <= 3.2) {
                                a = 3
                            } else {
                                if (a <= 3.7) {
                                    a = 3.5
                                } else {
                                    if (a <= 4.2) {
                                        a = 4
                                    } else {
                                        if (a <= 4.7) {
                                            a = 4.5
                                        } else {
                                            if (a <= 5) {
                                                a = 5
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    a = Math.floor(a * 13.8) + 1;
    return a
};
FourPage.makeRightPara = function() {
    var a = $(".pro-para-table").find("tr");
    a.bind({mouseover: function() {
            $(this).find(".erro_recovery").show()
        }, mouseout: function() {
            $(this).find(".erro_recovery").hide()
        }});
    a.find(".erro_recovery").bind("click", function() {
        var b = $(this).parents().find("td").eq(0).find("span").text();
        $("#seachtext").text(b);
        SNProduct.Util.alertBox({id: "proWrongPop", closeId: "proWrongCloseBtn", submit: "proWrongSubmit"})
    })
};
FourPage.commentJump = function() {
    $(".commentJump").each(function() {
        $(this).click(function() {
            $(".procon-toolbar").find("li[rel=#J-procon-comment]").click()
        })
    })
};
FourPage.changeCharacter = function(b) {
    var a = new RegExp("-", "g");
    if (null != b && b.indexOf("-") > 0) {
        return b.replace(a, "%252D")
    } else {
        return b
    }
};
FourPage.initPhoneCss = function() {
    $("#phonedl").hide();
    $("#phoned2").hide();
    $("#selectCB").hide();
    $("#phonedl ul,#phoned2 ul").html("");
    $("#phoneText").html("");
    if ($.trim($("#selectCB span.result-text").html()) != "" || $.trim($("#selectCB span#phoneText").html()) != "") {
        $("#selectCB").show()
    }
};
FourPage.initCss = function() {
    return;
    $(".proinfo-main").show();
    $(".nopro").hide();
    $(".proinfo-serv").show();
    $(".mainbtns").show();
    $("#existPrice").hide();
    $("#noPrice").hide();
    $("#netPriceBox").hide();
    $("#promotionPriceBox").hide();
    $("#allcuxiao").hide();
    $("#istuangouTitle").css("display", "none");
    $("#voucherTitle").css("display", "none");
    $("#lhvoucherTitle").css("display", "none");
    $("#couponTitle").css("display", "none");
    $("#isXYuanNItemTitle").css("display", "none");
    $("#freightfreeTitle").css("display", "none");
    $("#pointTitle").css("display", "none");
    $("#giftTitle").css("display", "none");
    $("#rayBuyTitle").css("display", "none");
    $("#freeCouponTitle").css("display", "none");
    $("#newcouponTitle").css("display", "none");
    $("#jnbtTitle").css("display", "none");
    $("#couponBox").html("");
    $("#newcouponBox").html("");
    $("#voucherBox").html("");
    $("#lhvoucherBox").html("");
    $("#giftBox").html("");
    $("#couponBox").siblings(".promotion-content").remove();
    $("#newcouponBox").siblings(".promotion-content").remove();
    $("#voucherBox").siblings(".promotion-content").remove();
    $("#lhvoucherBox").siblings(".promotion-content").remove();
    $("#jnbtBox").siblings(".promotion-content").remove();
    $("#tellMe").hide();
    $("#freeFare").hide();
    $("#phonedl").hide();
    $("#phoned2").hide();
    $("#buycount").hide();
    $("#productLimit").hide();
    $(".ziti").parent().hide();
    sn.ziti = false;
    $("#szyt").hide();
    $("#yanbao").hide();
    $("#itHelp").hide();
    $("#preTime").hide();
    $("#buyNowAddCart").hide();
    $("#buyReminder").hide();
    $("#J-slide1").hide();
    $("#yjhx").hide();
    sn.promoCount = 0;
    if (sn.catenIds != "R0115001" && sn.catenIds != "R0115003") {
        $("#loginFeedBack").show()
    }
    $(".proinfo-container").removeClass("proinfo-container-nopro");
    $("#listProContent").hide();
    $("#inerestBox").show();
    $("#nowProduct").removeClass("red");
    $(".proinfo-deliver-oversea").hide();
    $("#tariff").hide();
    $(".oversea-logo").hide();
    $("#productOverseaTitle").hide();
    $(".pro-detail-oversea").hide();
    if (sn.catenIds != scmInfo.broadBandId && sn.simBuyType != "3" && sn.simBuyType != "4") {
        $(".after-market").each(function() {
            $(this).hide()
        })
    }
    $("#bigPolyVerify").hide();
    $(".luoji-tip").remove();
    $(".proinfo-tip").remove()
};
FourPage.yuShouCss = function() {
    $("#existPrice").hide();
    $("#noPrice").hide();
    $("#allcuxiao").hide();
    $("#PriceNotice1").hide();
    $("#istuangouTitle").css("display", "none");
    $("#voucherTitle").css("display", "none");
    $("#lhvoucherTitle").css("display", "none");
    $("#couponTitle").css("display", "none");
    $("#isXYuanNItemTitle").css("display", "none");
    $("#freightfreeTitle").css("display", "none");
    $("#pointTitle").css("display", "none");
    $("#rayBuyTitle").css("display", "none");
    $("#newcouponTitle").css("display", "none");
    $("#jnbtTitle").css("display", "none");
    $("#couponBox").html("");
    $("#newcouponBox").html("");
    $("#voucherBox").html("");
    $("#couponBox").siblings(".promotion-content").remove();
    $("#voucherBox").siblings(".promotion-content").remove();
    $("#newcouponBox").siblings(".promotion-content").remove();
    $("#jnbtBox").siblings(".promotion-content").remove();
    $("#tellMe").hide();
    $(".proinfo-deliver-oversea").hide();
    $("#tariff").hide();
    $(".oversea-logo").hide();
    $("#productOverseaTitle").hide();
    $(".pro-detail-oversea").hide();
    $(".after-market").each(function() {
        $(this).hide()
    })
};
Recommend.callBackGetnoGoods = function(f) {
    try {
        var h = "";
        var a = "";
        var c = f.sugGoods[0];
        if (c.resCode != "02") {
            if (c.skus.length > 4) {
                a += '<a class="btn-dir prev" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">2</i></span><i class="arr"></i></a>';
                a += '<a class="btn-dir next" href="javascript:void(0);"><span class="screen-count"><em class="cur-count">1</em>/<i class="total-count">2</i></span><i class="arr"></i></a>'
            }
            a += '<div class="proinfo-rec-list"><ul>';
            var g = Recommend.getLiNoGoods(c, false);
            if (g !== "") {
                h = "<h3>类似商品</h3>" + a + g + "</ul></div>";
                $("#J-slide1").html(h);
                $("#J-slide1").show();
                iFourth.listloop({wrap: "#J-slide1", loopBox: ".proinfo-rec-list ul"});
                iFourth.mainHeight()
            }
            setTimeout(function() {
                iFourth.win.scroll()
            }, 500)
        }
    } catch (b) {
    }
    runAnalyseByClass("baoguang_recwhtjn");
    iFourth.mainHeight()
};
Recommend.getLiNoGoods = function(b, a) {
    var f = "";
    try {
        $.each(b.skus, function(e, g) {
            if (e > 7) {
                return false
            }
            f += '<li><a target="_blank" name="item_' + (sn.partNumber).substring(9, 18) + "_recwhtjn_1-" + (e + 1) + "_p_" + g.vendorId + "_" + (g.sugGoodsCode).substring(9, 18) + "_" + g.handwork + '" href="' + sn.elecProductDomain + "/" + g.vendorId + "/" + (g.sugGoodsCode).substring(9, 18) + ".html?src=item_" + (sn.partNumber).substring(9, 18) + "_recwhtjn_1-" + (e + 1) + "_p_" + g.vendorId + "_" + (g.sugGoodsCode).substring(9, 18) + "_" + g.handwork + '" title="' + g.sugGoodsName + '">';
            f += '<img alt="' + g.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + g.sugGoodsCode + '_1_100x100.jpg"/></a>';
            f += '<p class="title"><a target="_blank" id="baoguang_recwhtjn_1-' + (e + 1) + "_" + g.vendorId + "_" + (g.sugGoodsCode).substring(9, 18) + "_" + g.handwork + '" name="item_' + (sn.partNumber).substring(9, 18) + "_recwhtjn_1-" + (e + 1) + "_c_" + g.vendorId + "_" + (g.sugGoodsCode).substring(9, 18) + "_" + g.handwork + '" title="' + g.sugGoodsName + '" href="' + sn.elecProductDomain + "/" + g.vendorId + "/" + (g.sugGoodsCode).substring(9, 18) + ".html?src=item_" + (sn.partNumber).substring(9, 18) + "_recwhtjn_1-" + (e + 1) + "_c_" + g.vendorId + "_" + (g.sugGoodsCode).substring(9, 18) + "_" + g.handwork + '">';
            if ((g.sugGoodsName).length < 17) {
                f += g.sugGoodsName
            } else {
                f += (g.sugGoodsName).substring(0, 16) + "..."
            }
            f += "</a></p>";
            f += '<p class="price"><i>&yen; </i>' + g.price + CommonFourPage.Recommend.getPromotionContent(g.promotionType, " ") + "</p></li>"
        })
    } catch (c) {
    }
    return f
};
Recommend.callbackFunp = function(j) {
    try {
        var k = "";
        var o = "";
        var f = "";
        var m = false;
        var i = "";
        var h = false;
        var b = "";
        var c = false;
        var n = "";
        var a = '<div class="area-head"><h3>' + sn.categoryName3.substring(0, 9) + "排行榜</h3></div>";
        a += '<ul class="toppro-tab clearfix" id="hot_sort">';
        var g = j.sugGoods;
        g = $.grep(g, function(e, p) {
            if (e.skus.length != 0 && e.skus.length > 2) {
                return true
            }
        }, false);
        g.sort(function(p, e) {
            var r = parseInt(p.order);
            var q = parseInt(e.order);
            if (r < q) {
                return -1
            } else {
                if (r > q) {
                    return 1
                }
            }
            return 0
        });
        $.each(g, function(e, p) {
            if (p.resCode != "02" && p.skus.length > 2) {
                if (p.sceneId == "1-4") {
                    k = "baoguang_rectjwn_1-";
                    o = "item_" + (sn.partNumber).substring(9, 18) + "_rectjwn_1-";
                    f = '<ul class="toppro-list" id="J-topPro-1" ';
                    if (e == 0) {
                        f += ' style="display:block;" '
                    } else {
                        f += ' style="display:none;" '
                    }
                    f += ">";
                    $.each(p.skus, function(q, r) {
                        if (q >= 6) {
                            return false
                        }
                        f += "<li>";
                        f += '<a name="' + o + (q + 1) + "_p_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" target="_blank" href="' + sn.elecProductDomain + "/" + r.vendorId + "/" + (r.sugGoodsCode).substring(9, 18) + ".html?src=" + o + (q + 1) + "_p_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" title="' + r.sugGoodsName + '"><img alt="' + r.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + r.sugGoodsCode + '_1_60x60.jpg"></a>';
                        f += '<p class="title"><a id="' + k + (q + 1) + "_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" name="' + o + (q + 1) + "_c_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" title="' + r.sugGoodsName + '" target="_blank" href="' + sn.elecProductDomain + "/" + r.vendorId + "/" + (r.sugGoodsCode).substring(9, 18) + ".html?src=" + o + (q + 1) + "_c_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '">' + r.sugGoodsName + "</a></p>";
                        f += '<p class="price"><i>&yen;</i>' + r.price + CommonFourPage.Recommend.getPromotionContent(r.promotionType) + "</p>";
                        if (q > 2) {
                            f += '<span class="num">' + (q + 1) + "</span></li>"
                        } else {
                            f += '<span class="num highlight">' + (q + 1) + "</span></li>"
                        }
                    });
                    f += "</ul>";
                    m = true;
                    a += '<li rel="#J-topPro-1"><a name="item_' + sn.ninePartNumber + '_tab_price" href="javascript:void(0);">同价位</a></li>';
                    n += f
                } else {
                    if (p.sceneId == "1-5") {
                        k = "baoguang_rectppn_1-";
                        o = "item_" + (sn.partNumber).substring(9, 18) + "_rectppn_1-";
                        i = '<ul class="toppro-list hide" id="J-topPro-2" ';
                        if (e == 0) {
                            i += ' style="display:block;" '
                        } else {
                            i += ' style="display:none;" '
                        }
                        i += ">";
                        $.each(p.skus, function(q, r) {
                            if (q >= 6) {
                                return false
                            }
                            i += "<li>";
                            i += '<a name="' + o + (q + 1) + "_p_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" target="_blank" href="' + sn.elecProductDomain + "/" + r.vendorId + "/" + (r.sugGoodsCode).substring(9, 18) + ".html?src=" + o + (q + 1) + "_p_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" title="' + r.sugGoodsName + '"><img alt="' + r.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + r.sugGoodsCode + '_1_60x60.jpg"></a>';
                            i += '<p class="title"><a id="' + k + (q + 1) + "_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" name="' + o + (q + 1) + "_c_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" title="' + r.sugGoodsName + '" target="_blank" href="' + sn.elecProductDomain + "/" + r.vendorId + "/" + (r.sugGoodsCode).substring(9, 18) + ".html?src=" + o + (q + 1) + "_c_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '">' + r.sugGoodsName + "</a></p>";
                            i += '<p class="price"><i>&yen;</i>' + r.price + CommonFourPage.Recommend.getPromotionContent(r.promotionType) + "</p>";
                            if (q > 2) {
                                i += '<span class="num">' + (q + 1) + "</span></li>"
                            } else {
                                i += '<span class="num highlight">' + (q + 1) + "</span></li>"
                            }
                        });
                        i += "</ul>";
                        h = true;
                        a += '<li rel="#J-topPro-2"><a name="item_' + sn.ninePartNumber + '_tab_pingpai" href="javascript:void(0);">同品牌</a></li>';
                        n += i
                    } else {
                        if (p.sceneId == "1-6") {
                            k = "baoguang_rectlbn_1-";
                            o = "item_" + (sn.partNumber).substring(9, 18) + "_rectlbn_1-";
                            b += '<ul class="toppro-list hide" id="J-topPro-3" ';
                            if (e == 0) {
                                b += ' style="display:block;" '
                            } else {
                                b += ' style="display:none;" '
                            }
                            b += ">";
                            $.each(p.skus, function(q, r) {
                                if (q >= 6) {
                                    return false
                                }
                                b += "<li>";
                                b += '<a name="' + o + (q + 1) + "_p_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" target="_blank" href="' + sn.elecProductDomain + "/" + r.vendorId + "/" + (r.sugGoodsCode).substring(9, 18) + ".html?src=" + o + (q + 1) + "_p_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" title="' + r.sugGoodsName + '"><img alt="' + r.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + r.sugGoodsCode + '_1_60x60.jpg"></a>';
                                b += '<p class="title"><a id="' + k + (q + 1) + "_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" name="' + o + (q + 1) + "_c_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '" title="' + r.sugGoodsName + '" target="_blank" href="' + sn.elecProductDomain + "/" + r.vendorId + "/" + (r.sugGoodsCode).substring(9, 18) + ".html?src=" + o + (q + 1) + "_c_" + r.vendorId + "_" + (r.sugGoodsCode).substring(9, 18) + "_" + r.handwork + '">' + r.sugGoodsName + "</a></p>";
                                b += '<p class="price"><i>&yen;</i>' + r.price + CommonFourPage.Recommend.getPromotionContent(r.promotionType) + "</p>";
                                if (q > 2) {
                                    b += '<span class="num">' + (q + 1) + "</span></li>"
                                } else {
                                    b += '<span class="num highlight">' + (q + 1) + "</span></li>"
                                }
                            });
                            b += "</ul>";
                            a += '<li rel="#J-topPro-3"><a name="item_' + sn.ninePartNumber + '_tab_cata" href="javascript:void(0);">同类别</a></li>';
                            c = true;
                            n += b
                        }
                    }
                }
            }
        });
        a = a.replace("<li rel=", '<li class="current" rel=') + "</ul>";
        if (m || h || c) {
            $("#hotRank").html(a + n);
            if (m == false && h == true && c == true) {
                $("#J-topPro-1").removeClass("pro-tab-box").addClass("hide");
                $("#J-topPro-2").removeClass("hide").addClass("pro-tab-box")
            } else {
                if (m == false && h == true && c == false) {
                    $("#J-topPro-2").removeClass("hide").addClass("pro-tab-box")
                } else {
                    if (m == false && h == false && c == true) {
                        $("#J-topPro-3").removeClass("hide").addClass("pro-tab-box")
                    }
                }
            }
            $("#hotRank").show();
            iFourth.Tab(".toppro-tab", ".toppro-list", function(q, e, p) {
            })
        } else {
            $("#hotRank").html("");
            $("#hotRank").hide()
        }
        if ($("#hotRank .toppro-tab").find("li").length != 3) {
            $("#hot_sort").addClass("toppro-tab-single")
        }
    } catch (l) {
    }
    runAnalyseByClass("baoguang_rectjwn");
    runAnalyseByClass("baoguang_rectppn");
    runAnalyseByClass("baoguang_rectlbn")
};
Recommend.getRecomData = function(f) {
    try {
        var a = f.sugGoods;
        var i = "";
        var g = "";
        var c = "";
        var j = [];
        var k = [];
        var b = "";
        $.each(a, function(e, l) {
            if (l.resCode != "02") {
                if (l.sceneId == "1-1") {
                    i = Recommend.getLiV9(l, 1);
                    if (i !== "") {
                        i = '<div class="area mt10 hide" id="view_Also_ViewProduct"><div class="area-head"><h3>看了还看</h3></div><ul class="exprec" id="vav">' + i + "</ul></div>"
                    }
                    k[l.order] = i;
                    j.push(l.order)
                } else {
                    if (l.sceneId == "1-2") {
                        g = Recommend.getLiV9(l, 2);
                        if (g !== "") {
                            g = '<div class="area mt10 hide" id="view_Also_BuyProduct"><div class="area-head"><h3>看了最终买</h3></div><ul class="exprec" id="vab">' + g + "</ul></div>"
                        }
                        k[l.order] = g;
                        j.push(l.order)
                    } else {
                        if (l.sceneId == "1-3") {
                            c = Recommend.getLiV9(l, 3);
                            if (c !== "") {
                                c = '<div class="area mt10 hide" id="buy_Also_BuyProduct"><div class="area-head"><h3>买了还买</h3></div><ul class="exprec" id="bab">' + c + "</ul></div>"
                            }
                            k[l.order] = c;
                            j.push(l.order)
                        }
                    }
                }
            }
        });
        j.sort(function(l, e) {
            return l > e ? 1 : -1
        });
        $.each(j, function(e, l) {
            b += k[l]
        });
        $("#buyAlsoBuy").after(b);
        $("#buyAlsoBuy").hide();
        $("#view_Also_ViewProduct").show();
        $("#view_Also_BuyProduct").show();
        $("#buy_Also_BuyProduct").show()
    } catch (h) {
    }
    runAnalyseByClass("baoguang_recviewviewn");
    runAnalyseByClass("baoguang_recviewbuyn");
    runAnalyseByClass("baoguang_recbuybuyn")
};
Recommend.getLiV9 = function(f, a) {
    var h = "";
    try {
        var c = "";
        var b = "";
        if (a == 1) {
            c = "baoguang_recviewviewn_1-";
            b = "item_" + (sn.partNumber).substring(9, 18) + "_recviewviewn_1-"
        } else {
            if (a == 2) {
                c = "baoguang_recviewbuyn_1-";
                b = "item_" + (sn.partNumber).substring(9, 18) + "_recviewbuyn_1-"
            } else {
                if (a == 3) {
                    c = "baoguang_recbuybuyn_1-";
                    b = "item_" + (sn.partNumber).substring(9, 18) + "_recbuybuyn_1-"
                }
            }
        }
        $.each(f.skus, function(e, j) {
            if (e > 4) {
                return false
            }
            h += "<li>";
            h += '<a target="_blank" name="' + b + (e + 1) + "_p_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '" href="' + sn.elecProductDomain + "/" + j.vendorId + "/" + (j.sugGoodsCode).substring(9, 18) + ".html?src=" + b + (e + 1) + "_p_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '" title="' + j.sugGoodsName + '">';
            h += '<img class="image" alt="' + j.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + j.sugGoodsCode + '_1_120x120.jpg" /></a>';
            h += '<p class="title"><a target="_blank" id="' + c + (e + 1) + "_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '" name="' + b + (e + 1) + "_c_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '" title="' + j.sugGoodsName + '" href="' + sn.elecProductDomain + "/" + j.vendorId + "/" + (j.sugGoodsCode).substring(9, 18) + ".html?src=" + b + (e + 1) + "_c_" + j.vendorId + "_" + (j.sugGoodsCode).substring(9, 18) + "_" + j.handwork + '">';
            h += j.sugGoodsName;
            h += j.sugGoodsDes;
            h += "</a></p>";
            h += '<p class="price"><span><i>&yen; </i>' + j.price + "</span>" + CommonFourPage.Recommend.getPromotionContent(j.promotionType, " ") + "</p></li>"
        })
    } catch (g) {
    }
    return h
};
Recommend.historyRecHtml = function(c) {
    try {
        var a = "";
        if (c != "" && c.sugGoods != undefined) {
            $.each(c.sugGoods, function(f, g) {
                if ((g.resCode == "01" || g.resCode == "03") && g.sceneId == "8-3") {
                    a += '<a class="btn-dir prev" href="javascript:void(0);"></a>';
                    a += '<div class="scroll-box"><ul>';
                    var e = "";
                    var h = "item_" + sn.partNumber.substring(9, 18) + "_recllcnxhn_";
                    $.each(g.skus, function(j, k) {
                        e = Math.floor(j / 5) + 1;
                        a += '<li><a name="' + h + e + "-" + (j + 1) + "_p_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" title="' + k.sugGoodsName + '" target="_blank" href="' + sn.elecProductDomain + "/" + k.vendorId + "/" + k.sugGoodsCode.substring(9, 18) + ".html?src=" + h + e + "-" + (j + 1) + "_p_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '"><img alt="' + k.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + k.sugGoodsCode + '_1_160x160.jpg"></a><p class="title"><a name="' + h + e + "-" + (j + 1) + "_c_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" id="baoguang_recllcnxhn_' + e + "-" + (j + 1) + "_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" target="_blank" href="' + sn.elecProductDomain + "/" + k.vendorId + "/" + k.sugGoodsCode.substring(9, 18) + ".html?src=" + h + e + "-" + (j + 1) + "_p_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '">' + k.sugGoodsName + '</a></p><p class="price"><i>&yen;</i>' + k.price + CommonFourPage.Recommend.getPromotionContent(k.promotionType, " ") + "</p></li>"
                    });
                    a += "</ul></div>";
                    a += '<a class="btn-dir next" href="javascript:void(0);"></a>';
                    if (g.skus.length > 5) {
                        $("#J-historyRec").siblings(".area-head").find(".history-rec-pager").show()
                    } else {
                        $("#J-historyRec").siblings(".area-head").find(".history-rec-pager").hide();
                        $("#J-historyRec .prev").css("visibility", "hidden");
                        $("#J-historyRec .next").css("visibility", "hidden")
                    }
                    $("#J-historyRec").html(a);
                    iFourth.listloop({wrap: "#J-historyRec", loopBox: ".scroll-box ul", step: {wide: 5, narrow: 4}, scrollWidth: {wide: 900, narrow: 720}, labelObj: $("#J-historyRec-pager"), delay: 5000});
                    runAnalyseByClass("baoguang_recllcnxhn")
                } else {
                    $("#historyRecDiv").hide()
                }
            });
            if ($("#J-historyRec").find("li").length > 0) {
                $("#historyRecDiv").show()
            } else {
                $("#historyRecDiv").hide()
            }
        } else {
            $("#historyRecDiv").hide()
        }
    } catch (b) {
    }
};
Recommend.shopListItemsHtml = function(h) {
    try {
        var c = h.sugGoods;
        var b = "";
        if ((c[0].resCode == "01" || c[0].resCode == "03") && c[0].sceneId == "11-1") {
            var a = "";
            var g = "item_" + sn.partNumber.substring(9) + "_recliken_";
            $.each(c[0].skus, function(e, j) {
                a = "baoguang_recliken_" + (Math.floor(e / 2) + 1);
                b += '<li><a name="' + g + (Math.floor(e / 2) + 1) + "-" + (e % 2 + 1) + "_p_" + j.vendorId + "_" + j.sugGoodsCode.substring(9, 18) + "_" + j.handwork + '" title="' + j.sugGoodsName + '" target="_blank" href="' + sn.elecProductDomain + "/" + j.vendorId + "/" + j.sugGoodsCode.substring(9, 18) + ".html?src=" + g + (Math.floor(e / 2) + 1) + "-" + (e % 2 + 1) + "_p_" + j.vendorId + "_" + j.sugGoodsCode.substring(9, 18) + "_" + j.handwork + '"><img alt="' + j.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + j.sugGoodsCode + '_1_60x60.jpg"></a><p class="title"><a name="' + g + (Math.floor(e / 2) + 1) + "-" + (e % 2 + 1) + "_c_" + j.vendorId + "_" + j.sugGoodsCode.substring(9, 18) + "_" + j.handwork + '" id="' + a + "-" + (e + 1) + "_" + j.vendorId + "_" + j.sugGoodsCode.substring(9, 18) + "_" + j.handwork + '" target="_blank" href="' + sn.elecProductDomain + "/" + j.vendorId + "/" + j.sugGoodsCode.substring(9, 18) + ".html?src=" + g + (Math.floor(e / 2) + 1) + "-" + (e % 2 + 1) + "_c_" + j.vendorId + "_" + j.sugGoodsCode.substring(9, 18) + "_" + j.handwork + '">' + j.sugGoodsName + '</a></p><p class="price"><i>&yen;</i>' + j.price + CommonFourPage.Recommend.getPromotionContent(j.promotionType) + "</p></li>"
            });
            if (b != "") {
                $("#tuijianShopList").html(b);
                $("#J-sideRec").show();
                $("#c_shop_list").hide();
                if (c[0].skus.length < 3) {
                    $("#J-sideRec").find(".more").hide()
                } else {
                    $("#J-sideRec").find(".more").show()
                }
            } else {
                $("#J-sideRec").hide();
                if (sn.groupFlag) {
                    $("#c_shop_list").hide()
                } else {
                    FourPage.cShopListStatus()
                }
            }
            iFourth.sideRec();
            runAnalyseByClass("baoguang_recliken");
            iFourth.mainHeight()
        } else {
            $("#J-sideRec").hide();
            FourPage.cShopListStatus()
        }
    } catch (f) {
    }
    iFourth.sideRec()
};
Recommend.noPublishItemsHtml = function(f) {
    try {
        var a = "";
        var b = "";
        $.each(f.sugGoods, function(e, h) {
            if ((h.resCode == "01" || h.resCode == "03") && h.sceneId == "11-2") {
                var g = "item_" + sn.partNumber.substring(9, 18) + "_recxjtj01n_1-";
                $.each(h.skus, function(j, k) {
                    a += '<li><a name="' + g + (j + 1) + "_p_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" title="' + k.sugGoodsName + '" target="_blank" href="' + sn.elecProductDomain + "/" + k.vendorId + "/" + k.sugGoodsCode.substring(9, 18) + ".html?src=" + g + (j + 1) + "_p_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '"><img alt="' + k.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + k.sugGoodsCode + '_1_100x100.jpg"></a><p class="title"><a name="' + g + (j + 1) + "_c_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" id="baoguang_recxjtj01n_1-' + (j + 1) + "_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" target="_blank" href="' + sn.elecProductDomain + "/" + k.vendorId + "/" + k.sugGoodsCode.substring(9, 18) + ".html?src=" + g + (j + 1) + "_c_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '">' + k.sugGoodsName + '</a></p><p class="price"><i>&yen;</i>' + k.price + "</p></li>"
                })
            } else {
                if ((h.resCode == "01" || h.resCode == "03") && h.sceneId == "10-1") {
                    var g = "item_" + sn.partNumber.substring(9, 18) + "_recxjtj02n_1-";
                    $.each(h.skus, function(j, k) {
                        b += '<li><a name="' + g + (j + 1) + "_p_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" title="' + k.sugGoodsName + '" target="_blank" href="' + sn.elecProductDomain + "/" + k.vendorId + "/" + k.sugGoodsCode.substring(9, 18) + ".html?src=" + g + (j + 1) + "_p_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '"><img alt="' + k.sugGoodsName + '" src="' + sn.imageDomianDir + "/b2c/catentries/" + k.sugGoodsCode + '_1_100x100.jpg"></a><p class="title"><a name="' + g + (j + 1) + "_c_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" id="baoguang_recxjtj02n_1-' + (j + 1) + "_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '" target="_blank" href="' + sn.elecProductDomain + "/" + k.vendorId + "/" + k.sugGoodsCode.substring(9, 18) + ".html?src=" + g + (j + 1) + "_c_" + k.vendorId + "_" + k.sugGoodsCode.substring(9, 18) + "_" + k.handwork + '">' + k.sugGoodsName + '</a></p><p class="price"><i>&yen;</i>' + k.price + "</p></li>"
                    })
                }
            }
        });
        if (a != "") {
            $("#noPublish").html(a);
            $("#J-slide2").show()
        }
        if (b != "") {
            $("#noPublishLike").html(b);
            $("#J-slide3").show()
        }
    } catch (c) {
    }
    runAnalyseByClass("baoguang_recxjtj01n");
    iFourth.mainHeight()
};
Cart.itemLimitHtml = function(a) {
    try {
        if (a.isSuccess == "1" && a.isLimit == "1" && a.limitDesc != undefined) {
            $("#buyNum").attr("max", a.limitQty);
            $("#productLimit").html(a.limitDesc);
            $("#productLimit").show()
        } else {
            $("#buyNum").attr("max", 99);
            $("#productLimit").html("每人限购<em>99</em>件");
            $("#productLimit").hide()
        }
    } catch (b) {
    }
    iFourth.buyNum()
};
Cart.getSunShine = function() {
    try {
        if (sn.isPreBuy != 1) {
            var a = "http://" + sn.domain + sn.context + "/snwarrprd_10052_10051_" + sn.partNumber + "_" + sn.cityId + "_Cart.sunShine_html";
            $.ajax({url: a, type: "get", cache: true, dataType: "jsonp", jsonp: "callback", jsonpCallback: "Cart.sunShine", success: function(c) {
                }})
        } else {
            $("#yanbao").hide()
        }
    } catch (b) {
    }
};
Cart.sunShine = function(c) {
    try {
        if (c.warrProductLst.length > 0) {
            var h = "<dt>购买延保</dt><dd><ul>";
            var b = "";
            var a = "";
            var g = "";
            $.each(c.warrProductLst, function(e, j) {
                if (e <= 2) {
                    if (j.warrType == "EXW") {
                        b = "延长保修";
                        a = "icon1";
                        g = "item_" + sn.ninePartNumber + "_gmq_yanchang01"
                    } else {
                        if (j.warrType == "ADP") {
                            b = "意外保障";
                            a = "icon4";
                            g = "item_" + sn.ninePartNumber + "_gmq_yiwai02"
                        } else {
                            if (j.warrType == "PRP") {
                                b = "货品替换";
                                a = "icon3";
                                g = "item_" + sn.ninePartNumber + "_gmq_tihuan03"
                            } else {
                                if (j.warrType == "SPRP") {
                                    b = "空调保内替换";
                                    a = "icon3";
                                    g = "item_" + sn.ninePartNumber + "_gmq_kongtiao04"
                                } else {
                                    if (j.warrType == "SPB") {
                                        b = "碎屏保";
                                        a = "icon2";
                                        g = "item_" + sn.ninePartNumber + "_gmq_suiping05"
                                    } else {
                                        if (j.warrType == "APRP") {
                                            b = "意外替换";
                                            a = "icon3";
                                            g = "item_" + sn.ninePartNumber + "_gmq_yiwai06"
                                        } else {
                                            if (j.warrType == "SPEW") {
                                                b = "碎屏延保";
                                                a = "icon2";
                                                g = "item_" + sn.ninePartNumber + "_gmq_suiping07"
                                            } else {
                                                if (j.warrType == "BNTH") {
                                                    b = "保内替换";
                                                    a = "icon3";
                                                    g = "item_" + sn.ninePartNumber + "_gmq_baonei08"
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (j.extendPrice != "0") {
                        h += '<li data-id="' + j.warrPartnumber + '" data-vendor="' + j.goodsSupplyCode + '" title="' + b + j.warrYearLimit + j.limitUnit + " &yen;" + j.extendPrice + '"><a name="' + g + '" href="javascript:void(0);"><i class="' + a + '"></i>' + b + j.warrYearLimit + j.limitUnit + " &yen;" + j.extendPrice + '<i class="flag"></i></a></li>'
                    }
                }
            });
            h += '</ul><a name="item_' + sn.ninePartNumber + '_gmq_ybxq" target="_blank" class="b link" href="' + scmInfo.yanbaoLink + '">详情&gt;</a><input type="hidden"/></dd>';
            $("#yanbao").html(h);
            if (sn.isPreBuy != 1 && sn.isPreBuy != 2) {
                $("#yanbao").show()
            } else {
                $("#yanbao").hide()
            }
            iFourth.attrChoose();
            iFourth.mainHeight()
        }
    } catch (f) {
    }
};
Cart.spotGoods = function(c) {
    var e = document.reflashForm.sellType.value;
    var b = $("#buyNum").val() == undefined ? 1 : $("#buyNum").val();
    var h = sn.partNumber;
    var a = sn.vendorCode;
    var g = "";
    if ($("#catEntryId_2").val() == sn.itHelpOne) {
        h += "," + sn.itHelpOne
    }
    if ($("#catEntryId_3").val() == sn.itHelpTwo) {
        h += "," + sn.itHelpTwo
    }
    var f = "";
    if ($("#yanbao").find("li[class='selected']").length > 0) {
        $("#yanbao").find("li[class='selected']").each(function() {
            if (f != "") {
                f += "," + $(this).attr("data-id") + "-" + $(this).attr("data-vendor")
            } else {
                f += $(this).attr("data-id") + "-" + $(this).attr("data-vendor")
            }
        })
    }
    $("body").AjaxLogin({success: function() {
            buyNow(e, b, a, g, f, h, sn.priceType, PriceShow.actionId, sn.giftInfo, c, "", "")
        }})
};
Cart.buyNowTime = function() {
    var e = document.reflashForm.sellType.value;
    var b = $("#buyNum").val() == undefined ? 1 : $("#buyNum").val();
    var h = sn.partNumber;
    if (sn.groupFlag) {
        h = sn.groupPartnumber
    }
    var a = sn.vendorCode;
    var g = "";
    if ($("#catEntryId_2").val() == sn.itHelpOne) {
        h += "," + sn.itHelpOne
    }
    if ($("#catEntryId_3").val() == sn.itHelpTwo) {
        h += "," + sn.itHelpTwo
    }
    var f = "";
    if ($("#yanbao").find("li[class='selected']").length > 0) {
        $("#yanbao").find("li[class='selected']").each(function() {
            if (f != "") {
                f += "," + $(this).attr("data-id") + "-" + $(this).attr("data-vendor")
            } else {
                f += $(this).attr("data-id") + "-" + $(this).attr("data-vendor")
            }
        })
    }
    if (!Cart.treatPhoneCheck()) {
        return
    }
    var c = "";
    Cart.buyNowTime1(e, b, h, a, g, f, c)
};
Renxf.buyNowFreenessPay = function() {
    if (!Cart.treatPhoneCheck()) {
        return
    }
    var e = "";
    if ($(".renxf-list li.current").attr("data-id") != undefined) {
        e = $(".renxf-list li.current").attr("data-id")
    } else {
        return
    }
    var c = document.reflashForm.sellType.value;
    var b = $("#buyNum").val() == undefined ? 1 : $("#buyNum").val();
    var h = sn.partNumber;
    if (sn.groupFlag) {
        h = sn.groupPartnumber
    }
    var a = sn.vendorCode;
    var g = "";
    if ($("#catEntryId_2").val() == sn.itHelpOne) {
        h += "," + sn.itHelpOne
    }
    if ($("#catEntryId_3").val() == sn.itHelpTwo) {
        h += "," + sn.itHelpTwo
    }
    var f = "";
    if ($("#yanbao").find("li[class='selected']").length > 0) {
        $("#yanbao").find("li[class='selected']").each(function() {
            if (f != "") {
                f += "," + $(this).attr("data-id") + "-" + $(this).attr("data-vendor")
            } else {
                f += $(this).attr("data-id") + "-" + $(this).attr("data-vendor")
            }
        })
    }
    Cart.buyNowTime1(c, b, h, a, g, f, e)
};
Cart.buyNowTime1 = function(e, b, h, a, g, f, c) {
    iFourth.addCartPop.hide();
    $("body").AjaxLogin({success: function() {
            if (sn.groupFlag) {
                buyNow(e, b, a, g, f, h, "0", "", "", "", c, "")
            } else {
                if (sn.cuxiaoType == "4-10") {
                    buyNow(e, b, a, g, f, h, sn.priceType, PriceShow.actionId, sn.giftInfo, "", c, "10")
                } else {
                    buyNow(e, b, a, g, f, h, sn.priceType, PriceShow.actionId, sn.giftInfo, "", c, "")
                }
            }
        }})
};
Cart.addCart = function() {
    var c = document.reflashForm.sellType.value;
    var b = $("#buyNum").val() == undefined ? 1 : $("#buyNum").val();
    var h = sn.partNumber;
    if (sn.groupFlag) {
        h = sn.groupPartnumber
    }
    var a = sn.vendorCode;
    var g = "";
    if ($("#catEntryId_2").val() == sn.itHelpOne) {
        h += "," + sn.itHelpOne
    }
    if ($("#catEntryId_3").val() == sn.itHelpTwo) {
        h += "," + sn.itHelpTwo
    }
    var f = "";
    if ($("#yanbao").find("li[class='selected']").length > 0) {
        $("#yanbao").find("li[class='selected']").each(function() {
            if (f != "") {
                f += "," + $(this).attr("data-id") + "-" + $(this).attr("data-vendor")
            } else {
                f += $(this).attr("data-id") + "-" + $(this).attr("data-vendor")
            }
        })
    }
    var i = sn.cityId;
    var e = sn.isPreBuy;
    if (sn.groupFlag) {
        e = "0"
    }
    if (!Cart.treatPhoneCheck()) {
        return
    }
    if (sn.priceType == "4" && !sn.groupFlag) {
        $("body").AjaxLogin({success: function() {
                Cart.fourAddCart(c, b, a, g, f, i, e, h)
            }})
    } else {
        Cart.fourAddCart(c, b, a, g, f, i, e, h)
    }
};
Cart.treatPhoneCheck = function() {
    var b = false;
    if (sn.phoneFlag == "Y" && $("#phonedl").is(":visible")) {
        if (typeof $("#phonedl li.selected") != "undefined") {
            var c = $("#phonedl li.selected").index();
            var a = $("#phoned2 ul").eq(c - 1).find("li.selected").index();
            if (c == 0 || (c != 0 && a >= 0)) {
                b = true
            }
        }
    } else {
        b = true
    }
    if (!b) {
        iFourth.TZM.show()
    }
    return b
};
Cart.addShoppingCartCheck = function(m, j, h, e, f, a, g, b, i, l, k, c) {
    if (Cart.treatPhoneCheck()) {
        addShoppingCartCheck(m, j, h, e, f, a, g, b, i, l, k, c)
    }
};
Cart.fourAddCart = function(c, b, a, g, f, i, e, h) {
    iFourth.addCartPop.hide();
    if (sn.groupFlag) {
        add2Cart(c, b, a, g, f, i, e, h, "0", "")
    } else {
        add2Cart(c, b, a, g, f, i, e, h, sn.priceType, PriceShow.actionId)
    }
};
Cart.addCartPJ = function() {
    var h = 0;
    var b = $("#buyNum").val() == undefined ? 1 : $("#buyNum").val();
    var g = sn.partNumber;
    var c = $("#J-slide-tieIn").find("input[class=check]");
    var c = $.grep(c, function(k, j) {
        if ($(k).attr("checked") == "checked") {
            return true
        }
    }, false);
    var a = "";
    var f = "";
    var e = "";
    var i = "";
    $.each(c, function(k, j) {
        if (k != c.length - 1) {
            f += $(this).siblings(".fitPartNumber").val() + ",";
            e += $(this).siblings(".accessoryId").val() + ",";
            i += "1,"
        } else {
            f += $(this).siblings(".fitPartNumber").val();
            e += $(this).siblings(".accessoryId").val();
            i += "1"
        }
        h++
    });
    if (h != 0) {
        if (sn.priceType == "4") {
            $("body").AjaxLogin({success: function() {
                    addCartForPackage("1", "", g, f, e, i, sn.vendorCode, sn.priceType, PriceShow.actionId, "")
                }})
        } else {
            addCartForPackage("1", "", g, f, e, i, sn.vendorCode, sn.priceType, PriceShow.actionId, "")
        }
    } else {
        Util.alertErrorBox("请选择你要购买的配件!")
    }
};
Cart.quickPress = function(a) {
    if (a) {
        $("#buyNowAddCart").removeClass().addClass("btn-buynow-loading")
    } else {
        $("#buyNowAddCart").removeClass().addClass("btn-buynow")
    }
};
Cart.cartPress = function(a) {
    if (a) {
        $("#addCart").removeClass().addClass("btn-addcart-loading")
    } else {
        $("#addCart").removeClass().addClass("btn-addcart")
    }
};
YuShou.initPreBuy = function(a) {
    if (a != null) {
        preBuy.scheduleStartTime = a.scheduleStartTime / 1000;
        preBuy.scheduleEndTime = a.scheduleEndTime / 1000;
        preBuy.priorPurchaseStartTime = a.priorPurchaseStartTime / 1000;
        preBuy.priorPurchaseEndTime = a.priorPurchaseEndTime / 1000;
        preBuy.purStartTime = a.purStartTime / 1000;
        preBuy.purEndTime = a.purEndTime / 1000;
        preBuy.curTime = a.curTime / 1000;
        preBuy.disCityList = a.disCityList;
        preBuy.appiontCount = a.appiontCount;
        preBuy.preLimit = a.preLimit;
        preBuy.personBuysLimit = a.personBuysLimit;
        preBuy.adapteTerminal = a.adapteTerminal;
        preBuy.recomText = a.recomText;
        preBuy.recomUrl = a.recomUrl;
        if (preBuy.disCityList != null) {
            $.each(preBuy.disCityList, function(g, h) {
                if (h == sn.cityId) {
                    preBuy.isEffect = false
                }
            })
        }
        var f = sn.vendorCode == "" ? "0000000000" : sn.vendorCode;
        var e = sn.yushouDomain + "/appoint/gotoAppoint.do?partNumber=" + sn.partNumber + "&actionId=" + preBuy.actionID + "&purchaseType=P01";
        var c = sn.yushouDomain + "/appointFront-web/scode/bindScodeNew.htm?actionId=" + preBuy.actionID + "&partNumber=" + sn.partNumber + "&vendorId=" + f;
        preBuy.scodeBindUrl = c;
        $("#J-slide1").remove();
        $("#listProContent").hide();
        if (!preBuy.isEffect) {
            $("#preTime").hide();
            $("#nowProduct").html("该地区不参加预约活动").addClass("red").show();
            $("#c_kucun").html("暂不销售").show();
            $("#buyNowAddCart").hide();
            $("#addCart").removeClass().addClass("btn-addcart-disable");
            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
            if ($("#inerestBox").siblings(".memo").length > 0) {
                $("#inerestBox").siblings(".memo").remove()
            }
            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                $(".mainbtns").siblings("#jhsm").remove()
            }
            $("#addCart2").removeClass().addClass("btn-addcart-mini-disable");
            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
            $("#yushouCount").hide();
            $("#buycount").hide()
        } else {
            if (preBuy.type == 1) {
                if (a.curTime < a.scheduleStartTime) {
                    preBuy.status = 1;
                    $("#preTime").find("dt").html("预约开始");
                    $(".duration-time").val((a.scheduleStartTime - a.curTime) / 1000);
                    $("#nowProduct").hide();
                    $("#c_kucun").hide();
                    $("#addCart").removeClass().addClass("btn-order-wait");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $("#addCart2").removeClass().addClass("btn-order-mini-wait");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#yushouCount").hide();
                    YuShou.countdown(e)
                } else {
                    if (a.curTime >= a.scheduleStartTime && a.curTime <= a.scheduleEndTime) {
                        preBuy.status = 2;
                        $("#preTime").find("dt").html("预约结束");
                        $(".duration-time").val((a.scheduleEndTime - a.curTime) / 1000);
                        $("#nowProduct").hide();
                        $("#c_kucun").hide();
                        $("#addCart").removeClass().addClass("btn-order");
                        $("#addCart").attr("href", e);
                        $("#addCart").attr("target", "_blank");
                        $("#addCart").attr("name", "item_" + sn.ninePartNumber + "_gmq_yyljyy");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $("#yushouCount").html("<span>已有</span><strong>" + preBuy.appiontCount + "</strong><span>人成功预约</span>");
                        $("#yushouCount").show();
                        $("#addCart2").removeClass().addClass("btn-order-mini");
                        $("#addCart2").attr("href", e);
                        $("#addCart2").attr("target", "_blank");
                        $("#addCart2").attr("name", "item_" + sn.ninePartNumber + "_gmq_yyljyy");
                        YuShou.countdown(e)
                    } else {
                        if ((a.curTime > a.scheduleEndTime && a.curTime < a.purStartTime) || (a.purStartTime == "" && a.purEndTime == "")) {
                            preBuy.status = 3;
                            $("#preTime").find("dt").html("抢购开始");
                            $(".duration-time").val((a.purStartTime - a.curTime) / 1000);
                            $("#nowProduct").hide();
                            $("#c_kucun").hide();
                            $("#addCart").removeClass().addClass("btn-rush-wait");
                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                            $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#yushouCount").hide();
                            if (a.purStartTime == "" && a.purEndTime == "") {
                                $("#inerestBox").after('<span class="memo">抢购时间暂时未定，敬请关注</a></span>')
                            } else {
                                YuShou.countdown(e)
                            }
                        } else {
                            if (a.curTime >= a.purStartTime && a.curTime <= a.purEndTime) {
                                if (a.preLimit <= 0) {
                                    preBuy.status = 5;
                                    $("#preTime").find("dt").html("抢购结束");
                                    $(".duration-time").val(0);
                                    $("#nowProduct").hide();
                                    $("#c_kucun").hide();
                                    $("#addCart").removeClass().addClass("btn-rush-no");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#yushouCount").hide();
                                    YuShou.countdown(e)
                                } else {
                                    if (a.preLimit == 1) {
                                        preBuy.status = 4;
                                        $("#preTime").find("dt").html("抢购结束");
                                        $(".duration-time").val((a.purEndTime - a.curTime) / 1000);
                                        $("#nowProduct").show();
                                        $("#c_kucun").show();
                                        $("#addCart").removeClass().addClass("btn-privilege-end");
                                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                            $("#inerestBox").siblings(".memo").remove()
                                        }
                                        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                            $(".mainbtns").siblings("#jhsm").remove()
                                        }
                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                        $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                        $("#yushouCount").hide();
                                        YuShou.countdown(e)
                                    } else {
                                        preBuy.status = 4;
                                        $("#preTime").find("dt").html("抢购结束");
                                        $(".duration-time").val((a.purEndTime - a.curTime) / 1000);
                                        $("#nowProduct").show();
                                        $("#c_kucun").show();
                                        $("#addCart").removeClass().addClass("btn-rush");
                                        $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                            $("#inerestBox").siblings(".memo").remove()
                                        }
                                        $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                            $(".mainbtns").siblings("#jhsm").remove()
                                        }
                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                        $("#addCart2").removeClass().addClass("btn-rush-mini");
                                        $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(0);").removeAttr("target");
                                        $("#yushouCount").hide();
                                        YuShou.countdown(e)
                                    }
                                }
                            } else {
                                preBuy.status = 5;
                                $("#preTime").find("dt").html("抢购结束");
                                $(".duration-time").val(0);
                                $("#nowProduct").hide();
                                $("#c_kucun").hide();
                                $("#addCart").removeClass().addClass("btn-rush-no");
                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                    $("#inerestBox").siblings(".memo").remove()
                                }
                                $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#yushouCount").hide();
                                YuShou.countdown(e)
                            }
                        }
                    }
                }
                if (preBuy.personBuysLimit != "0" && preBuy.personBuysLimit != "" && preBuy.personBuysLimit != undefined) {
                    $("#productLimit").html("每人限购<em>" + preBuy.personBuysLimit + "</em>件");
                    $("#productLimit").show();
                    $("#buyNum").attr("max", preBuy.personBuysLimit);
                    $("#buycount").show();
                    iFourth.buyNum()
                }
                if (preBuy.status == 3 && a.purStartTime == "" && a.purEndTime == "") {
                    $("#preTime").hide()
                } else {
                    $("#preTime").show()
                }
            } else {
                if (preBuy.type == "2") {
                    if (a.curTime < a.scheduleStartTime) {
                        preBuy.status = 1;
                        $("#preTime").find("dt").html("预约开始");
                        $(".duration-time").val((a.scheduleStartTime - a.curTime) / 1000);
                        $("#nowProduct").hide();
                        $("#c_kucun").hide();
                        $("#addCart").removeClass().addClass("btn-order-wait");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        $("#addCart2").removeClass().addClass("btn-order-mini-wait");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#yushouCount").hide();
                        YuShou.countdown(e)
                    } else {
                        if (a.curTime >= a.scheduleStartTime && a.curTime <= a.scheduleEndTime) {
                            preBuy.status = 2;
                            $("#preTime").find("dt").html("预约结束");
                            $(".duration-time").val((a.scheduleEndTime - a.curTime) / 1000);
                            $("#nowProduct").hide();
                            $("#c_kucun").hide();
                            $("#addCart").removeClass().addClass("btn-order");
                            $("#addCart").attr("href", e);
                            $("#addCart").attr("target", "_blank");
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $("#yushouCount").html("<span>已有</span><strong>" + preBuy.appiontCount + "</strong><span>人成功预约</span>");
                            $("#yushouCount").show();
                            $("#addCart2").removeClass().addClass("btn-order-mini");
                            $("#addCart2").attr("href", e);
                            $("#addCart2").attr("target", "_blank");
                            YuShou.countdown(e)
                        } else {
                            if ((a.curTime > a.scheduleEndTime && a.curTime < a.priorPurchaseStartTime) || (a.priorPurchaseStartTime == "" && a.priorPurchaseEndTime == "")) {
                                preBuy.status = 3;
                                $("#preTime").find("dt").html("抢购开始");
                                $(".duration-time").val((a.priorPurchaseStartTime - a.curTime) / 1000);
                                $("#nowProduct").hide();
                                $("#c_kucun").hide();
                                $("#addCart").removeClass().addClass("btn-rush-wait");
                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                    $("#inerestBox").siblings(".memo").remove()
                                }
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#yushouCount").hide();
                                if (a.priorPurchaseStartTime == "" && a.priorPurchaseEndTime == "") {
                                    $("#inerestBox").after('<span class="memo">抢购时间暂时未定，敬请关注</a></span>')
                                } else {
                                    YuShou.countdown(e)
                                }
                            } else {
                                if (a.curTime >= a.priorPurchaseStartTime && a.curTime <= a.priorPurchaseEndTime) {
                                    if (a.preLimit <= 0) {
                                        preBuy.status = 5;
                                        $("#preTime").find("dt").html("抢购开始");
                                        $(".duration-time").val((a.priorPurchaseEndTime - a.curTime) / 1000);
                                        $("#nowProduct").hide();
                                        $("#c_kucun").hide();
                                        $("#addCart").removeClass().addClass("btn-rush-wait");
                                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                            $("#inerestBox").siblings(".memo").remove()
                                        }
                                        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                            $(".mainbtns").siblings("#jhsm").remove()
                                        }
                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                        $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                        $("#yushouCount").hide();
                                        YuShou.countdown(e)
                                    } else {
                                        if (a.preLimit == 1) {
                                            preBuy.status = 4;
                                            $("#preTime").find("dt").html("抢购结束");
                                            $(".duration-time").val((a.priorPurchaseEndTime - a.curTime) / 1000);
                                            $("#nowProduct").show();
                                            $("#c_kucun").show();
                                            $("#addCart").removeClass().addClass("btn-privilege-end");
                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                            $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                            $("#yushouCount").hide();
                                            YuShou.countdown(e)
                                        } else {
                                            preBuy.status = 4;
                                            $("#preTime").find("dt").html("抢购结束");
                                            $(".duration-time").val((a.priorPurchaseEndTime - a.curTime) / 1000);
                                            $("#nowProduct").show();
                                            $("#c_kucun").show();
                                            $("#addCart").removeClass().addClass("btn-privilege");
                                            $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                            $("#addCart").attr("name", "item_" + sn.ninePartNumber + "_gmq_yytqgm");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                            $("#addCart2").removeClass().addClass("btn-privilege-mini");
                                            $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(0);").removeAttr("target");
                                            $("#addCart2").attr("name", "item_" + sn.ninePartNumber + "_gmq_yytqgm");
                                            $("#yushouCount").hide();
                                            YuShou.countdown(e)
                                        }
                                    }
                                } else {
                                    if ((a.curTime > a.scheduleEndTime && a.curTime < a.purStartTime) || (a.purStartTime == "" && a.purEndTime == "")) {
                                        preBuy.status = 5;
                                        $("#preTime").find("dt").html("抢购开始");
                                        $(".duration-time").val((a.purStartTime - a.curTime) / 1000);
                                        $("#nowProduct").hide();
                                        $("#c_kucun").hide();
                                        $("#addCart").removeClass().addClass("btn-rush-wait");
                                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                            $("#inerestBox").siblings(".memo").remove()
                                        }
                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                            $(".mainbtns").siblings("#jhsm").remove()
                                        }
                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                        $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                        $("#yushouCount").hide();
                                        if (a.purStartTime == "" && a.purEndTime == "") {
                                            $("#inerestBox").after('<span class="memo">抢购时间暂时未定，敬请关注</a></span>')
                                        } else {
                                            YuShou.countdown(e)
                                        }
                                    } else {
                                        if (a.curTime >= a.purStartTime && a.curTime <= a.purEndTime) {
                                            if (a.preLimit <= 0) {
                                                preBuy.status = 7;
                                                $("#preTime").find("dt").html("抢购结束");
                                                $(".duration-time").val(0);
                                                $("#nowProduct").hide();
                                                $("#c_kucun").hide();
                                                $("#addCart").removeClass().addClass("btn-rush-no");
                                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                                    $("#inerestBox").siblings(".memo").remove()
                                                }
                                                $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                    $(".mainbtns").siblings("#jhsm").remove()
                                                }
                                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                                $("#yushouCount").hide();
                                                YuShou.countdown(e)
                                            } else {
                                                if (a.preLimit == 1) {
                                                    preBuy.status = 6;
                                                    $("#preTime").find("dt").html("抢购结束");
                                                    $(".duration-time").val((a.purEndTime - a.curTime) / 1000);
                                                    $("#nowProduct").show();
                                                    $("#c_kucun").show();
                                                    $("#addCart").removeClass().addClass("btn-privilege-end");
                                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                        $(".mainbtns").siblings("#jhsm").remove()
                                                    }
                                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                    $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                                    $("#yushouCount").hide();
                                                    YuShou.countdown(e)
                                                } else {
                                                    preBuy.status = 6;
                                                    $("#preTime").find("dt").html("抢购结束");
                                                    $(".duration-time").val((a.purEndTime - a.curTime) / 1000);
                                                    $("#nowProduct").show();
                                                    $("#c_kucun").show();
                                                    $("#addCart").removeClass().addClass("btn-rush");
                                                    $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                                    $("#addCart").attr("name", "item_" + sn.ninePartNumber + "_gmq_yyljqg");
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>');
                                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                        $(".mainbtns").siblings("#jhsm").remove()
                                                    }
                                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                    $("#addCart2").removeClass().addClass("btn-rush-mini");
                                                    $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(0);").removeAttr("target");
                                                    $("#addCart2").attr("name", "item_" + sn.ninePartNumber + "_gmq_yyljqg");
                                                    $("#yushouCount").hide();
                                                    YuShou.countdown(e)
                                                }
                                            }
                                        } else {
                                            preBuy.status = 7;
                                            $("#preTime").find("dt").html("抢购结束");
                                            $(".duration-time").val(0);
                                            $("#nowProduct").hide();
                                            $("#c_kucun").hide();
                                            $("#addCart").removeClass().addClass("btn-rush-no");
                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                            $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                            $("#yushouCount").hide();
                                            YuShou.countdown(e)
                                        }
                                    }
                                }
                            }
                        }
                    }
                    if (preBuy.type == 2 && preBuy.status <= 4) {
                        $("#productLimit").html("每人限购<em>" + preBuy.personBuysLimit + "</em>件");
                        $("#productLimit").show();
                        $("#buyNum").attr("max", preBuy.personBuysLimit);
                        $("#buycount").show();
                        iFourth.buyNum()
                    } else {
                        if (preBuy.personBuysLimit != "0" && preBuy.personBuysLimit != "" && preBuy.personBuysLimit != undefined) {
                            $("#productLimit").html("每人限购<em>" + preBuy.personBuysLimit + "</em>件");
                            $("#productLimit").show();
                            $("#buyNum").attr("max", preBuy.personBuysLimit);
                            $("#buycount").show();
                            iFourth.buyNum()
                        }
                    }
                    if ((preBuy.status == 3 && a.priorPurchaseStartTime == "" && a.priorPurchaseEndTime == "") || (preBuy.status == 5 && a.purStartTime == "" && a.purEndTime == "")) {
                        $("#preTime").hide()
                    } else {
                        $("#preTime").show()
                    }
                } else {
                    preBuy.status = 1;
                    $("#preTime").find("dt").html("抢购结束");
                    var b = (a.purEndTime - a.curTime > 0) ? (a.purEndTime - a.curTime) : 0;
                    $(".duration-time").val(b / 1000);
                    $("#nowProduct").hide();
                    $("#c_kucun").hide();
                    $("#addCart").removeClass().addClass("btn-mobile-disable");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    $("#inerestBox").after('<span class="memo">该商品为移动专享，如需购买请扫上方二维码</span>');
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $("#yushouCount").hide();
                    $("#addCart2").removeClass().addClass("btn-mobile-mini-disable");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#preTime").show();
                    YuShou.countdown(e)
                }
            }
        }
        initProductSale()
    } else {
        sn.isPreBuy = 0;
        $("#preTime").hide();
        $("#addCart").removeClass().addClass("btn-addcart");
        $("#addCart").attr("href", "javascript:Cart.addCart();").removeAttr("target");
        $("#addCart2").removeClass().addClass("btn-addcart-mini");
        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
        initProductSale()
    }
    iFourth.mainHeight()
};
var countTotal = 0;
YuShou.countdown = function(b) {
    try {
        iFourth.countdown(function(c) {
            $("#c_yunfei").show();
            if (c == 0) {
                $("#addCart2").removeClass().addClass("btn-addcart-mini");
                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                if (preBuy.type == "1") {
                    if (preBuy.status == 1) {
                        getItemSaleStatus(sn.partNumber, "showSaleStatus");
                        var e = setInterval(function() {
                            if (sn.isLoadPricePrice) {
                                window.clearInterval(e);
                                preBuy.status = 2;
                                remain = preBuy.scheduleEndTime - preBuy.scheduleStartTime;
                                $("#preTime").find("dt").html("预约结束");
                                $(".duration-time").val((preBuy.scheduleEndTime - preBuy.curTime));
                                $("#nowProduct").hide();
                                $("#c_kucun").hide();
                                $("#addCart").removeClass().addClass("btn-order");
                                $("#addCart").attr("href", b);
                                $("#addCart").attr("target", "_blank");
                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                    $("#inerestBox").siblings(".memo").remove()
                                }
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $("#yushouCount").html("<span>已有</span><strong>" + preBuy.appiontCount + "</strong><span>人成功预约</span>");
                                $("#yushouCount").show();
                                $("#addCart2").removeClass().addClass("btn-order-mini");
                                $("#addCart2").attr("href", b);
                                $("#addCart2").attr("target", "_blank")
                            }
                        }, sn.waitPriceTime)
                    } else {
                        if (preBuy.status == 2) {
                            preBuy.status = 3;
                            getItemSaleStatus(sn.partNumber, "showSaleStatus");
                            var e = setInterval(function() {
                                if (sn.isLoadPricePrice) {
                                    window.clearInterval(e);
                                    remain = preBuy.purStartTime - preBuy.scheduleEndTime;
                                    $("#preTime").find("dt").html("抢购开始");
                                    $(".duration-time").val((preBuy.purStartTime - preBuy.curTime));
                                    $("#nowProduct").hide();
                                    $("#c_kucun").hide();
                                    $("#addCart").removeClass().addClass("btn-rush-wait");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    if (preBuy.purStartTime == "" && preBuy.purEndTime == "") {
                                        $("#inerestBox").after('<span class="memo">抢购时间暂时未定，敬请关注</a></span>')
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                    $("#yushouCount").hide();
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                }
                            }, sn.waitPriceTime)
                        } else {
                            if (preBuy.status == 3) {
                                getItemSaleStatus(sn.partNumber, "showSaleStatus");
                                var e = setInterval(function() {
                                    if (sn.isLoadPricePrice) {
                                        window.clearInterval(e);
                                        if (preBuy.preLimit <= 0) {
                                            preBuy.status = 5;
                                            remain = 0;
                                            $("#preTime").find("dt").html("抢购结束");
                                            $(".duration-time").val(0);
                                            $("#nowProduct").show();
                                            $("#c_kucun").show();
                                            $("#addCart").removeClass().addClass("btn-rush-no");
                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                            $("#yushouCount").hide();
                                            $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                        } else {
                                            if (preBuy.preLimit == 1) {
                                                preBuy.status = 4;
                                                remain = preBuy.purEndTime - preBuy.purStartTime;
                                                $("#preTime").find("dt").html("抢购结束");
                                                $(".duration-time").val((preBuy.purEndTime - preBuy.curTime));
                                                $("#nowProduct").show();
                                                $("#c_kucun").show();
                                                $("#addCart").removeClass().addClass("btn-privilege-end");
                                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                                    $("#inerestBox").siblings(".memo").remove()
                                                }
                                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                    $(".mainbtns").siblings("#jhsm").remove()
                                                }
                                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                $("#yushouCount").hide();
                                                $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                                if (sn.promotionPrice == "" || sn.freight == "-1" || sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0" || ((sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet == "-1")) {
                                                    $("#addCart").removeClass().addClass("btn-rush-disable");
                                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                    $("#addCart2").removeClass().addClass("btn-rush-mini-disable");
                                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                                }
                                            } else {
                                                preBuy.status = 4;
                                                remain = preBuy.purEndTime - preBuy.purStartTime;
                                                $("#preTime").find("dt").html("抢购结束");
                                                $(".duration-time").val((preBuy.purEndTime - preBuy.curTime));
                                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                                    $("#inerestBox").siblings(".memo").remove()
                                                }
                                                if (sn.promotionPrice != "" && (sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet != "-1")) {
                                                    $("#addCart").removeClass().addClass("btn-rush");
                                                    $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                                    $("#addCart2").removeClass().addClass("btn-rush-mini");
                                                    $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                                    $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>')
                                                } else {
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                                    $("#addCart").removeClass().addClass("btn-rush-disable");
                                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                    $("#addCart2").removeClass().addClass("btn-rush-mini-disable");
                                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                                }
                                                $("#nowProduct").show();
                                                $("#c_kucun").show();
                                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                    $(".mainbtns").siblings("#jhsm").remove()
                                                }
                                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                $("#yushouCount").hide()
                                            }
                                        }
                                    }
                                }, sn.waitPriceTime)
                            } else {
                                if (preBuy.status == 4) {
                                    preBuy.status = 5;
                                    remain = 0;
                                    $("#preTime").find("dt").html("抢购结束");
                                    $(".duration-time").val(0);
                                    $("#nowProduct").hide();
                                    $("#c_kucun").hide();
                                    $("#addCart").removeClass().addClass("btn-rush-no");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                    $("#yushouCount").hide();
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                }
                            }
                        }
                    }
                    if (preBuy.status == 3 && preBuy.purStartTime == "" && preBuy.purEndTime == "") {
                        $("#preTime").hide()
                    } else {
                        $("#preTime").show()
                    }
                } else {
                    if (preBuy.type == "2") {
                        if (preBuy.status == 1) {
                            getItemSaleStatus(sn.partNumber, "showSaleStatus");
                            var e = setInterval(function() {
                                if (sn.isLoadPricePrice) {
                                    window.clearInterval(e);
                                    preBuy.status = 2;
                                    remain = preBuy.scheduleEndTime - preBuy.scheduleStartTime;
                                    $("#preTime").find("dt").html("预约结束");
                                    $(".duration-time").val((preBuy.scheduleEndTime - preBuy.curTime));
                                    $("#nowProduct").hide();
                                    $("#c_kucun").hide();
                                    $("#addCart").removeClass().addClass("btn-order");
                                    $("#addCart").attr("href", b);
                                    $("#addCart").attr("target", "_blank");
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                        $(".mainbtns").siblings("#jhsm").remove()
                                    }
                                    $("#yushouCount").html("<span>已有</span><strong>" + preBuy.appiontCount + "</strong><span>人成功预约</span>");
                                    $("#yushouCount").show();
                                    $("#addCart2").removeClass().addClass("btn-order-mini");
                                    $("#addCart2").attr("href", b);
                                    $("#addCart2").attr("target", "_blank")
                                }
                            }, sn.waitPriceTime)
                        } else {
                            if (preBuy.status == 2) {
                                preBuy.status = 3;
                                getItemSaleStatus(sn.partNumber, "showSaleStatus");
                                var e = setInterval(function() {
                                    if (sn.isLoadPricePrice) {
                                        window.clearInterval(e);
                                        remain = preBuy.priorPurchaseStartTime - preBuy.scheduleEndTime;
                                        $("#preTime").find("dt").html("抢购开始");
                                        $(".duration-time").val((preBuy.priorPurchaseStartTime - preBuy.curTime));
                                        $("#nowProduct").hide();
                                        $("#c_kucun").hide();
                                        $("#addCart").removeClass().addClass("btn-rush-wait");
                                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                            $("#inerestBox").siblings(".memo").remove()
                                        }
                                        if (preBuy.purStartTime == "" && preBuy.purEndTime == "") {
                                            $("#inerestBox").after('<span class="memo">抢购时间暂时未定，敬请关注</a></span>')
                                        }
                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                            $(".mainbtns").siblings("#jhsm").remove()
                                        }
                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                        $("#yushouCount").hide();
                                        $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                    }
                                }, sn.waitPriceTime)
                            } else {
                                if (preBuy.status == 3) {
                                    getItemSaleStatus(sn.partNumber, "showSaleStatus");
                                    var e = setInterval(function() {
                                        if (sn.isLoadPricePrice) {
                                            window.clearInterval(e);
                                            if (preBuy.preLimit <= 0) {
                                                preBuy.status = 5;
                                                remain = preBuy.priorPurchaseEndTime - preBuy.priorPurchaseStartTime;
                                                $("#preTime").find("dt").html("抢购开始");
                                                $(".duration-time").val(preBuy.priorPurchaseEndTime - preBuy.curTime);
                                                $("#nowProduct").show();
                                                $("#c_kucun").show();
                                                $("#addCart").removeClass().addClass("btn-rush-wait");
                                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                                    $("#inerestBox").siblings(".memo").remove()
                                                }
                                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                    $(".mainbtns").siblings("#jhsm").remove()
                                                }
                                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                                $("#yushouCount").hide();
                                                $("#addCart2").removeClass().addClass("btn-rush-mini-wait");
                                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                            } else {
                                                if (preBuy.preLimit == 1) {
                                                    preBuy.status = 4;
                                                    remain = preBuy.priorPurchaseEndTime - preBuy.priorPurchaseStartTime;
                                                    $("#preTime").find("dt").html("抢购结束");
                                                    $(".duration-time").val((preBuy.priorPurchaseEndTime - preBuy.curTime));
                                                    $("#nowProduct").show();
                                                    $("#c_kucun").show();
                                                    $("#addCart").removeClass().addClass("btn-privilege-end");
                                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                        $(".mainbtns").siblings("#jhsm").remove()
                                                    }
                                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                                    $("#yushouCount").hide();
                                                    $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                                    if (sn.promotionPrice == "" || sn.freight == "-1" || sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0" || ((sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet == "-1")) {
                                                        $("#addCart").removeClass().addClass("btn-privilege-disable");
                                                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                        $("#addCart2").removeClass().addClass("btn-privilege-mini-disable");
                                                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                                    }
                                                } else {
                                                    preBuy.status = 4;
                                                    remain = preBuy.priorPurchaseEndTime - preBuy.priorPurchaseStartTime;
                                                    $("#preTime").find("dt").html("抢购结束");
                                                    $(".duration-time").val((preBuy.priorPurchaseEndTime - preBuy.curTime));
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    if (sn.promotionPrice != "" && (sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet != "-1")) {
                                                        $("#addCart").removeClass().addClass("btn-privilege");
                                                        $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                                        $("#addCart2").removeClass().addClass("btn-privilege-mini");
                                                        $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                                        $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>')
                                                    } else {
                                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                                            $("#inerestBox").siblings(".memo").remove()
                                                        }
                                                        $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                                        $("#addCart").removeClass().addClass("btn-privilege-disable");
                                                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                        $("#addCart2").removeClass().addClass("btn-privilege-mini-disable");
                                                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                                    }
                                                    $("#nowProduct").show();
                                                    $("#c_kucun").show();
                                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                        $(".mainbtns").siblings("#jhsm").remove()
                                                    }
                                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>');
                                                    $("#yushouCount").hide()
                                                }
                                            }
                                        }
                                    }, sn.waitPriceTime)
                                } else {
                                    if (preBuy.status == 4 || preBuy.status == 5) {
                                        getItemSaleStatus(sn.partNumber, "showSaleStatus");
                                        var e = setInterval(function() {
                                            if (sn.isLoadPricePrice) {
                                                window.clearInterval(e);
                                                if (preBuy.preLimit <= 0) {
                                                    preBuy.status = 7;
                                                    remain = 0;
                                                    $("#preTime").find("dt").html("抢购结束");
                                                    $(".duration-time").val(0);
                                                    $("#nowProduct").show();
                                                    $("#c_kucun").show();
                                                    $("#addCart").removeClass().addClass("btn-rush-no");
                                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                                        $("#inerestBox").siblings(".memo").remove()
                                                    }
                                                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                        $(".mainbtns").siblings("#jhsm").remove()
                                                    }
                                                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                    $("#yushouCount").hide();
                                                    $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                                } else {
                                                    if (preBuy.preLimit == 1) {
                                                        preBuy.status = 6;
                                                        remain = preBuy.purEndTime - preBuy.purStartTime;
                                                        $("#preTime").find("dt").html("抢购结束");
                                                        $(".duration-time").val((preBuy.purEndTime - preBuy.curTime));
                                                        $("#nowProduct").show();
                                                        $("#c_kucun").show();
                                                        $("#addCart").removeClass().addClass("btn-privilege-end");
                                                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                                            $("#inerestBox").siblings(".memo").remove()
                                                        }
                                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                            $(".mainbtns").siblings("#jhsm").remove()
                                                        }
                                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                        $("#yushouCount").hide();
                                                        $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                                        if (sn.promotionPrice == "" || sn.freight == "-1" || sn.invStatus == "2" || sn.invStatus == "3" || sn.invStatus == "0" || ((sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet == "-1")) {
                                                            $("#addCart").removeClass().addClass("btn-rush-disable");
                                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                            $("#addCart2").removeClass().addClass("btn-rush-mini-disable");
                                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                                        }
                                                    } else {
                                                        preBuy.status = 6;
                                                        remain = preBuy.purEndTime - preBuy.purStartTime;
                                                        $("#preTime").find("dt").html("抢购结束");
                                                        $(".duration-time").val((preBuy.purEndTime - preBuy.curTime));
                                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                                            $("#inerestBox").siblings(".memo").remove()
                                                        }
                                                        if (sn.promotionPrice != "" && (sn.invStatus == "1" && sn.vendorCode != "" && sn.freight != "-1" && sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) != "003") || ((sn.invStatus == "4" || sn.invStatus == "1") && (sn.vendorCode == "" || (sn.vendorCode.length == 10 && sn.vendorCode.substring(0, 3) == "003")) && sn.shipOffSet != "-1")) {
                                                            $("#addCart").removeClass().addClass("btn-rush");
                                                            $("#addCart").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                                            $("#addCart2").removeClass().addClass("btn-rush-mini");
                                                            $("#addCart2").attr("href", "javascript:YuShou.toPreBuy(1);").removeAttr("target");
                                                            $("#inerestBox").after('<span class="memo">请在下单后15分钟之内完成支付</span>')
                                                        } else {
                                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                                $("#inerestBox").siblings(".memo").remove()
                                                            }
                                                            $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                                            $("#addCart").removeClass().addClass("btn-rush-disable");
                                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                                            $("#addCart2").removeClass().addClass("btn-rush-mini-disable");
                                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                                        }
                                                        $("#nowProduct").show();
                                                        $("#c_kucun").show();
                                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                            $(".mainbtns").siblings("#jhsm").remove()
                                                        }
                                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                                        $("#yushouCount").hide()
                                                    }
                                                }
                                            }
                                        }, sn.waitPriceTime)
                                    } else {
                                        if (preBuy.status == 6) {
                                            preBuy.status = 7;
                                            remain = 0;
                                            $("#preTime").find("dt").html("抢购结束");
                                            $(".duration-time").val(0);
                                            $("#nowProduct").hide();
                                            $("#c_kucun").hide();
                                            $("#addCart").removeClass().addClass("btn-rush-no");
                                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                                $("#inerestBox").siblings(".memo").remove()
                                            }
                                            $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                                $(".mainbtns").siblings("#jhsm").remove()
                                            }
                                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                                            $("#yushouCount").hide();
                                            $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target")
                                        }
                                    }
                                }
                            }
                        }
                        if ((preBuy.status == 3 && preBuy.priorPurchaseStartTime == "" && preBuy.priorPurchaseEndTime == "") || (preBuy.status == 5 && preBuy.purStartTime == "" && preBuy.purEndTime == "")) {
                            $("#preTime").hide()
                        } else {
                            $("#preTime").show()
                        }
                    } else {
                        if (preBuy.status == 1) {
                            preBuy.status = 2;
                            remain = 0;
                            $("#preTime").find("dt").html("抢购结束");
                            $(".duration-time").val(0);
                            $("#nowProduct").hide();
                            $("#c_kucun").hide();
                            $("#addCart").removeClass().addClass("btn-mobile-disable");
                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            $("#inerestBox").after('<span class="memo">该商品为移动专享，如需购买请扫上方二维码</span>');
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                            $("#yushouCount").hide();
                            $("#addCart2").removeClass().addClass("btn-mobile-mini-disable");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#preTime").show()
                        }
                    }
                }
            }
            if (preBuy.type != 3) {
                if (preBuy.type == 2 && preBuy.status <= 4) {
                    $("#productLimit").html("每人限购<em>" + preBuy.personBuysLimit + "</em>件");
                    $("#productLimit").show();
                    $("#buyNum").attr("max", preBuy.personBuysLimit);
                    $("#buycount").show();
                    iFourth.buyNum()
                } else {
                    if (preBuy.personBuysLimit != "0" && preBuy.personBuysLimit != "" && preBuy.personBuysLimit != undefined) {
                        $("#productLimit").html("每人限购<em>" + preBuy.personBuysLimit + "</em>件");
                        $("#productLimit").show();
                        $("#buyNum").attr("max", preBuy.personBuysLimit);
                        $("#buycount").show();
                        iFourth.buyNum()
                    }
                }
            }
            countTotal++;
            iFourth.mainHeight()
        })
    } catch (a) {
    }
};
YuShou.toPreBuy = function(a) {
    $("body").AjaxLogin({success: function() {
            YuShou.isCanBuy(a, 0)
        }, error: function() {
        }})
};
YuShou.isCanBuy = function(f, b) {
    var c = preBuy.status == 4 && preBuy.type == 2 ? "P03" : "P01";
    var a = sn.vendorCode == "" ? "0000000000" : sn.vendorCode;
    var e = sn.yushouDomain + "/jsonp/appoint/checkQualificationStatus-" + preBuy.actionID + "-" + sn.partNumber + "-" + a + "-" + c + "-1-inits.do";
    $.ajax({url: e, dataType: "jsonp", cache: false, jsonpCallback: "inits", success: function(g) {
            if (g == 0) {
                Cart.addCart()
            } else {
                if (g == -1 || g == 3) {
                    Util.alertErrorBox("此商品抢购已结束，您可以尝试选购其他商品");
                    $("#addCart").removeClass().addClass("btn-rush-no");
                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                    $("#tabAddCart").show();
                    if ($("#inerestBox").siblings(".memo").length > 0) {
                        $("#inerestBox").siblings(".memo").remove()
                    }
                    $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                    if ($(".mainbtns").siblings("#jhsm").length > 0) {
                        $(".mainbtns").siblings("#jhsm").remove()
                    }
                    $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                    remain = 0;
                    $("#preTime .d").text("00");
                    $("#preTime .h").text("00");
                    $("#preTime .m").text("00");
                    $("#preTime .s").text("00")
                } else {
                    if (g == 1) {
                        $("#addCart").removeClass().addClass("btn-rush-disable");
                        $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#addCart2").removeClass().addClass("btn-rush-mini-disable");
                        $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                        $("#tabAddCart").show();
                        if ($("#inerestBox").siblings(".memo").length > 0) {
                            $("#inerestBox").siblings(".memo").remove()
                        }
                        $("#inerestBox").after('<span class="memo">非常抱歉！您之前未预约该商品或预约资格已用完，暂无抢购资格</span>');
                        if (c == "P03") {
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            $("#inerestBox").after('<span class="memo">非常抱歉，您暂无特权购资格或资格已用完，无法购买</span>');
                            $("#addCart").removeClass().addClass("btn-privilege-disable");
                            $("#addCart2").removeClass().addClass("btn-privilege-mini-disable")
                        }
                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                            $(".mainbtns").siblings("#jhsm").remove()
                        }
                        if (c == "P03") {
                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约特权购资格的用户</p>')
                        } else {
                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>')
                        }
                        if (f == 0) {
                            if (c == "P03") {
                                Util.alertErrorBox("非常抱歉，您暂无特权购资格或资格已用完，无法购买")
                            } else {
                                Util.alertErrorBox("非常抱歉！您之前未预约该商品或预约资格已用完，暂无抢购资格")
                            }
                        }
                    } else {
                        if (g == 4) {
                            $("#addCart").removeClass().addClass("btn-rush-no");
                            $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#addCart2").removeClass().addClass("btn-rush-mini-no");
                            $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                            $("#tabAddCart").show();
                            if ($("#inerestBox").siblings(".memo").length > 0) {
                                $("#inerestBox").siblings(".memo").remove()
                            }
                            $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="' + preBuy.recomUrl + '" name="item_' + sn.ninePartNumber + '_gmq_ckqtsp">' + preBuy.recomText + "</a></span>");
                            if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                $(".mainbtns").siblings("#jhsm").remove()
                            }
                            $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>');
                            remain = 0;
                            $("#preTime .d").text("00");
                            $("#preTime .h").text("00");
                            $("#preTime .m").text("00");
                            $("#preTime .s").text("00")
                        } else {
                            if (g == 5) {
                                $("#addCart").removeClass().addClass("btn-privilege-end");
                                $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#addCart2").removeClass().addClass("btn-privilege-mini-end");
                                $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                $("#tabAddCart").show();
                                if ($("#inerestBox").siblings(".memo").length > 0) {
                                    $("#inerestBox").siblings(".memo").remove()
                                }
                                $("#inerestBox").after('<span class="memo"><a class="b" target="_blank" href="http://yushou.suning.com" name="item_' + sn.ninePartNumber + '_gmq_yycksp">查看更多预售商品</a></span>');
                                if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                    $(".mainbtns").siblings("#jhsm").remove()
                                }
                                $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>')
                            } else {
                                if (g == 6) {
                                    $("#addCart").removeClass().addClass("btn-rush-disable");
                                    $("#addCart").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#addCart2").removeClass().addClass("btn-rush-mini-disable");
                                    $("#addCart2").attr("href", "javascript:void(0);").removeAttr("target");
                                    $("#tabAddCart").show();
                                    if ($("#inerestBox").siblings(".memo").length > 0) {
                                        $("#inerestBox").siblings(".memo").remove()
                                    }
                                    $("#inerestBox").after('<span class="memo">非常抱歉，您暂无特权购资格或资格已用完，无法购买</span>')
                                } else {
                                    if (g == 7) {
                                        Util.alertErrorBox("抱歉，系统繁忙，请稍后再试哦")
                                    } else {
                                        Util.alertErrorBox("此商品抢购未开始，暂不支持购买");
                                        if ($("#inerestBox").siblings(".memo").length > 0) {
                                            $("#inerestBox").siblings(".memo").remove()
                                        }
                                        $("#inerestBox").after('<span class="memo">此商品抢购未开始，暂不支持购买</span>');
                                        if ($(".mainbtns").siblings("#jhsm").length > 0) {
                                            $(".mainbtns").siblings("#jhsm").remove()
                                        }
                                        $(".mainbtns").after('<p id="jhsm" class="proinfo-memo">注：抢购仅限获取预约资格用户</p>')
                                    }
                                }
                            }
                        }
                    }
                }
            }
            iFourth.mainHeight()
        }, error: function() {
        }})
};
FourPage.imgUrl = function(a) {
    if (a == null || a == "") {
        return""
    }
    if (sn.imgHost == null || sn.imgHost == "") {
        sn.imgHost = "http://image?.suning.cn"
    }
    if (sn.imgHostNumber == null || sn.imgHostNumber == "") {
        sn.imgHostNumber = 5
    }
    if (sn.imgHostTag == null || sn.imgHostTag == "") {
        sn.imgHostTag = "?"
    }
    var b = Math.abs(FourPage.hashCode(a)) % sn.imgHostNumber;
    b = b + 1;
    if (b < 1 || b > sn.imgHostNumber) {
        b = 1
    }
    var c = sn.imgHost.replace(sn.imgHostTag, b);
    var e = c + a;
    return e
};
FourPage.hashCode = function(c) {
    var b = 0;
    if (!(c == null || c.value == "")) {
        for (var a = 0;
                a < c.length;
                a++) {
            b = b * 31 + c.charCodeAt(a);
            b = FourPage.numToInt(b)
        }
    }
    return b
};
FourPage.numToInt = function(a) {
    var b = 2147483647;
    var c = -2147483648;
    if (a > b || a < c) {
        return a &= 4294967295
    }
    return a
};
FourPage.commGroup = function() {
    $(".breadcrumb .dropdown").click(function() {
        if ($(this).find(".dropdown-option").length <= 0) {
            var a = $(this).find("span").attr("gid");
            var b = $(this);
            $.ajax({url: sn.itemDomain + "/pds-web/ajax/commGroup_" + a + ".html", type: "get", async: false, dataType: "json", success: function(c) {
                    try {
                        if (c != "" && c.sameGroup != "" && c.sameGroup.length > 0) {
                            var g = c.sameGroup;
                            var f = '<ul class="dropdown-option">';
                            $.each(g, function(e, j) {
                                f += '<li><a name="item_' + sn.ninePartNumber + '_mulu0"';
                                if (typeof j.categoryUrl != "undefined" && j.categoryUrl != "") {
                                    f += 'href="' + j.categoryUrl + '"'
                                } else {
                                    if (sn.catalogId == "14655") {
                                        f += 'href="' + sn.listHost + "0-" + j.categoryId + "-0-1-0-" + sn.cityId + '-0-0-0-1.html"'
                                    } else {
                                        if (sn.catalogId == "14656") {
                                            f += 'href="' + sn.listHost + "0-" + j.categoryId + "-0-1-0-" + sn.cityId + '-0-0-0-2.html"'
                                        } else {
                                            f += 'href="' + sn.listHost + "0-" + j.categoryId + '-0.html"'
                                        }
                                    }
                                }
                                f += 'title="' + j.categoryName + '">';
                                if (j.categoryName.length > 18) {
                                    f += j.categoryName.substring(0, 18) + "...</a></li>"
                                } else {
                                    f += j.categoryName + "</a></li>"
                                }
                            });
                            f += "</ul>";
                            b.find("p").after(f);
                            iFourth.breadcrumbSize(b.find(".dropdown-option"))
                        }
                    } catch (h) {
                    }
                }, error: function() {
                }})
        } else {
            iFourth.breadcrumbSize($(this).find(".dropdown-option"))
        }
    })
};
FourPage.showRelClass = function(response) {
    try {
        response = eval("(" + response + ")");
        if (response != "" && response.sameGroup != "" && (response.sameGroup).length > 0) {
            var data = response.sameGroup;
            var commGroup = '<div class="area-head"><h3>相关分类</h3></div><ul class="procon-relate">';
            commGroup += '<li><a name="item_' + sn.ninePartNumber + '_xgcata_cata01" target="_blank" title="' + sn.categoryName3 + '" href="' + sn.listHost + "0-" + sn.categoryId + '-0.html">' + (sn.categoryName3.length <= 10 ? sn.categoryName3 : sn.categoryName3.substring(0, 10)) + "</a></li>";
            var maidian = "";
            $.each(data, function(i, group) {
                if (i < 19) {
                    maidian = i < 8 ? (i + 2) : (i + 1);
                    commGroup += '<li><a name="item_' + sn.ninePartNumber + "_xgcata_cata" + maidian + '" target="_blank" title="' + group.categoryName + '"';
                    if (group.categoryUrl != "") {
                        commGroup += 'href="' + group.categoryUrl + '">'
                    } else {
                        commGroup += 'href="' + sn.listHost + "0-" + group.categoryId + '-0.html">'
                    }
                    commGroup += (group.categoryName.length <= 10 ? group.categoryName : group.categoryName.substring(0, 10)) + "</a></li>"
                }
            });
            commGroup += "</ul>";
            $("#relClass").html(commGroup);
            $("#relClass").show()
        } else {
            $("#relClass").hide()
        }
    } catch (e) {
    }
};
FourPage.scodeCuxiaoTab = function(b) {
    if (b == "7") {
        var a = "";
        a += "此商品仅限S码购买 ";
        a += ' <a name="item_' + sn.ninePartNumber + '_jifen_xq" href="http://sma.suning.com/sma/self/toBind.htm" class="b ml10" target="_blank">查看详情</a>';
        $("#scodeBox").html(a);
        $("#scodeBox").show();
        $("#scodeTitle").css("display", "block");
        $("#allcuxiao").show()
    } else {
        $("#scodeBox").hide();
        $("#scodeTitle").css("display", "none")
    }
};
FourPage.scodeBuyStyle = function() {
    $("#buyNowAddCart").removeClass().addClass("btn-scode-buy2");
    $("#buyNowAddCart").find("span").html("S码购买");
    if (!sn.scode) {
        sn.scode = true
    }
};
FourPage.cShopListStatus = function() {
    if (sn.cShopListFlag == "1") {
        $("#c_shop_list").hide();
        sn.cShopListFlag = "0"
    } else {
        $("#c_shop_list").show()
    }
};
FourPage.getShopNameHtml = function(b) {
    var a = b.shopName;
    if (b.shopStatus != undefined && b.shopStatus == "0" && b.vendorCode != "" && b.vendorCode != "0000000000" && b.vendorCode != "undefined") {
        if (b.secUrl != undefined && b.secUrl != "") {
            sn.secUrl = b.secUrl
        }
        a = '<a name="item_' + sn.ninePartNumber + '_shop_dianpu02" target="_blank" href="' + (b.secUrl != undefined && b.secUrl != "" ? b.secUrl : (sn.shopPath + sn.shopMainPh + "/" + b.vendorCode.substring(2, 10) + "/index.html")) + '">' + b.shopName + "</a>"
    } else {
        if (b.vendorCode == "" || b.vendorCode == "0000000000" || b.vendorCode == "undefined") {
            if (sn.brandShopCode != null && sn.brandShopCode != "") {
                if (sn.brandShopStatus == "0" || sn.brandShopStatus == null || sn.brandShopStatus == "") {
                    a = '<a name="item_' + sn.ninePartNumber + '_shop_dianpu02" target="_blank" href="' + sn.shopUrl + '" title="苏宁自营">苏宁自营<i class="ie"></i></a>'
                } else {
                    a = "苏宁自营"
                }
            } else {
                a = b.shopName
            }
        } else {
            a = b.shopName
        }
    }
    return a
};