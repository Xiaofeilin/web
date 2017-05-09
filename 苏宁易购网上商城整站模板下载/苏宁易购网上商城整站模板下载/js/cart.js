function _loadAsyncJs(src) {
    var _src = src;
    var _scripts = document.getElementsByTagName("script");
    for (var i = 0; i < _scripts.length; i++) {
        if (_scripts[i].src == _src) {
            return
        }
    }
    var _script = document.createElement("script");
    _script.type = "text/javascript";
    _script.async = true;
    _script.src = _src;
    var _s = _scripts[0];
    _s.parentNode.insertBefore(_script, _s)
}
function _getJsFilePath(js_file) {
    var _hostName = document.location.hostname;
    var _prd_reg = /^\w*?.suning.com$/;
    var _pre_reg = /^\w*?pre.cnsuning.com$/;
    var _sit_reg = /^\w*?sit.cnsuning.com$/;
    var sa_src = "";
    if (_prd_reg.test(_hostName)) {
        sa_src = ("https:" == document.location.protocol) ? "https://imgssl.suning.com" : "http://script.suning.cn"
    } else {
        if (_pre_reg.test(_hostName)) {
            sa_src = ("https:" == document.location.protocol) ? "https://preimgssl.suning.com" : "http://prescript.suning.cn"
        } else {
            if (_sit_reg.test(_hostName)) {
                sa_src = ("https:" == document.location.protocol) ? "https://sit1imgssl.suning.com" : "http://sit1script.suning.cn"
            } else {
                sa_src = ("https:" == document.location.protocol) ? "https://preimgssl.suning.com" : "http://prescript.suning.cn"
            }
        }
    }
    sa_src = sa_src + "/javascript/sn_da/" + js_file;
    return sa_src
}
;
var operateCheckCmmdty = [];
var updateNumCmmdty = [];
var againBuyClickTag = 0;
var cartRemovedObject = [];
var cmmdtyObject = {};
var againBuyClickTag = 0;
var validateCode;
var validateUuid;
var productDomain = "http://product.suning.com";
var snDomain = "cart.suning.com";
var cartTimeFlag = "";
var cloudCart1 = {init: function() {
        this.checkout.init();
        this.selectList.init();
        this.judgeFailure();
        this.changeNumber.init();
        this.judeFixBottom();
        this.fixBottom();
        this.snAddressInit();
        this.gatherOrder.addCart();
        this.allStoreDiscount.init();
        this.getAjaxFreight();
        this.getAjaxGift();
        this.sunPackage.sunPackageClickInit();
        cloudCart.floatBar({zIndex: 7700, contents: $(".cart-float-bar"), align: "right", vertical: "bottom", css: {"margin-bottom": 180}})
    }, judgeFailure: function() {
        if ($(".fail-icon").length == 0) {
            $(".del-fail").hide()
        }
    }, gatherOrder: {meetCutFn: function(options, tipDom, targetDom, tipFn) {
            var cmmdtyCodes = [];
            var custNum = $.cookie("custno");
            var visiterId = $.cookie("_snma");
            var arr = new Array();
            if (typeof visiterId != "undefined" && visiterId && visiterId != "undefined") {
                arr = visiterId.split("|")
            }
            var u = "";
            if (typeof custNum != "undefined" && custNum && custNum != "undefined") {
                u = u + custNum
            }
            var c = "";
            if (typeof arr[1] != "undefined" && arr[1] && arr[1] != "undefined") {
                c = c + arr[1]
            }
            var itemSubs = $(".item-sub,.item-main");
            var count = 1;
            $.each(itemSubs, function(n, itemSub) {
                var item = $(itemSub).parent();
                var check = item.find("input[type='checkbox']");
                var cmmdtyCode = $(itemSub).find("input[type='hidden']").attr("cmmdtyCode");
                var shopCode = $(itemSub).find("input[type='hidden']").attr("shopCode");
                if (check.attr("checked") == "checked" && shopCode == "0000000000") {
                    cmmdtyCode = $(itemSub).find("input[type='hidden']").attr("cmmdtyCode");
                    cmmdtyCodes.push("parameters=" + cmmdtyCode);
                    count++
                }
                if (count > 3) {
                    return false
                }
            });
            var parameters = cmmdtyCodes.join("&");
            var recommendDomain = "http://tuijian.suning.com";
            var cityId = null;
            var snCity = $.cookie("SN_CITY");
            if (null != snCity) {
                var tempCityArray = snCity.split("_");
                if (tempCityArray.length > 2) {
                    cityId = tempCityArray[1]
                }
            }
            if (cityId == null) {
                cityId = "010"
            }
            sn.cityId = cityId;
            if (parameters == "") {
                parameters = "parameters="
            }
            var priceSpread = "";
            var needBuy = $("#needBuy").val();
            if (typeof needBuy != "undefined" && needBuy && needBuy != "undefined") {
                priceSpread = "&priceSpread=" + needBuy
            }
            var _url = recommendDomain + "/recommend-portal/recommend/paramsBiz.jsonp?" + parameters + "&cityId=" + cityId + "&sceneIds=4-11&count=27&u=" + u + "&c=" + c + "" + priceSpread;
            $.ajax({url: _url, dataType: "jsonp", async: false, cache: true, success: function(data) {
                    gather_jsonpCallback(data, options, tipDom, targetDom, tipFn)
                }, error: function() {
                    tipDom.find(".ui-tooltip-inner").html(cloudCart1.cartRemoved.tpl.tipEmpty)
                }})
        }, cMeetCutFn: function(options, tipDom, targetDom, tipFn) {
            var cmmdtyCodes = [];
            var cmmdtyCodesTemp = [];
            var custNum = $.cookie("custno");
            var visiterId = $.cookie("_snma");
            var arr = new Array();
            if (typeof visiterId != "undefined" && visiterId && visiterId != "undefined") {
                arr = visiterId.split("|")
            }
            var c = "";
            if (typeof arr[1] != "undefined" && arr[1] && arr[1] != "undefined") {
                c = c + arr[1]
            }
            var u = "";
            if (typeof custNum != "undefined" && custNum && custNum != "undefined") {
                u = u + custNum
            }
            var _thatStore = targetDom.parents(".m-store");
            var freeShippingType = targetDom.attr("freeShippingType");
            var notSatisfied = targetDom.attr("notSatisfied");
            var flag = "";
            if (freeShippingType == "1") {
                flag = 2
            } else {
                if (freeShippingType == "2") {
                    flag = 1
                }
            }
            var itemSubs = $(_thatStore).find("input[type='hidden']");
            var vendorId = "";
            var cityId = null;
            var snCity = $.cookie("SN_CITY");
            if (null != snCity) {
                var tempCityArray = snCity.split("_");
                if (tempCityArray.length > 2) {
                    cityId = tempCityArray[1]
                }
            }
            if (cityId == null) {
                cityId = "010"
            }
            sn.cityId = cityId;
            var recommendDomain = "http://tuijian.suning.com";
            $.each(itemSubs, function(n, itemSub) {
                var itemParent = $(itemSub).parents(".item,.suit");
                var check = itemParent.find("input[type='checkbox']");
                var cmmdtyCode = $(itemSub).attr("cmmdtyCode");
                var shopCode = $(itemSub).attr("shopCode");
                vendorId = shopCode;
                if (check.attr("checked") == "checked") {
                    cmmdtyCodes.push("parameters=" + cmmdtyCode)
                } else {
                    cmmdtyCodesTemp.push("parameters=" + cmmdtyCode)
                }
            });
            var num = cmmdtyCodes.length;
            cmmdtyCodes = cmmdtyCodes.concat(cmmdtyCodesTemp);
            var parameters = cmmdtyCodes.join("&");
            if (parameters == "") {
                parameters = "parameters="
            }
            var _url = recommendDomain + "/recommend-portal/recommend/paramsBiz.jsonp?" + parameters + "&vendorId=" + vendorId + "&priceSpread=" + notSatisfied + "&flag=" + flag + "&num=" + num + "&cityId=" + cityId + "&sceneIds=10-36&count=27&u=" + u + "c=" + c;
            $.ajax({url: _url, dataType: "jsonp", async: false, cache: true, success: function(data) {
                    cgather_jsonpCallback(data, options, tipDom, targetDom, tipFn)
                }, error: function() {
                    tipDom.find(".ui-tooltip-inner").html(cloudCart1.cartRemoved.tpl.tipEmpty)
                }})
        }, addCart: function() {
            $(document).on("click", ".meet-cut-select .cart-btn", function(e) {
                e.preventDefault();
                var checkboxs = $(".meet-cut-select li input[type='checkbox']");
                var cart = {};
                var cmmdty = new Array();
                cart.sourcePageType = "05";
                $.each(checkboxs, function(n, checkbox) {
                    if ($(checkbox).prop("checked")) {
                        var cmmdtyCode = $(checkbox).attr("cmmdtyCode");
                        var shopCode = $(checkbox).attr("shopCode");
                        var cmmdtyName = $(checkbox).attr("cmmdtyName");
                        var cmmdtyObjetc = {};
                        cmmdtyObjetc.cmmdtyCode = cmmdtyCode;
                        cmmdtyObjetc.shopCode = shopCode;
                        cmmdtyObjetc.activityType = "01";
                        cmmdtyObjetc.cmmdtyQty = "1";
                        cmmdty.push(cmmdtyObjetc);
                        cmmdtyObject[cmmdtyCode] = cmmdtyName
                    }
                });
                if (cmmdty.length > 0) {
                    cart.cmmdty = cmmdty;
                    gatherAddcart(cart)
                }
            })
        }}, selectList: {init: function() {
            this.bindEvent();
            this.querySelect()
        }, bindEvent: function() {
            var that = this;
            $(document).on("click", ".m-cart-body .chk-item", function() {
                that.singleSelect(this)
            });
            $(document).on("click", ".store-title .checkbox", function() {
                that.storeAllSelect(this)
            });
            $(document).on("click", ".J-AllCheckBox", function() {
                that.cartAllSelect(this)
            });
            that.selectMeetcut()
        }, selectProcess: function(obj, isSelect) {
            $.each(obj, function(n, checkBoxList) {
                var reg = /^J_CheckBox_/;
                if (!reg.test(checkBoxList.id)) {
                    var cmmdtyItem = checkBoxList.id;
                    $.each(operateCheckCmmdty, function(n, value) {
                        var cmmItem = value.split("-")[0];
                        if (cmmItem == cmmdtyItem) {
                            operateCheckCmmdty.splice(n, 1);
                            return false
                        }
                    });
                    operateCheckCmmdty.push(cmmdtyItem + "-" + (isSelect ? "1" : "0"))
                }
            });
            if (operateCheckCmmdty.length == 0) {
                return false
            }
            this.checkOperateMethod()
        }, storeAllSelect: function(ele) {
            var that = this;
            var $ele = $(ele), $cartAllCheckBox = $(".J-AllCheckBox"), $parentNode = $ele.closest(".m-store"), isSelect = $ele.prop("checked");
            $parentNode.find(":checkbox.chk-item").each(function() {
                $(this).prop("checked", isSelect)
            });
            var cstoreId = "#" + $ele.attr("data-id");
            var allCheckBox = $(".checkbox", cstoreId);
            if (isSelect) {
                $parentNode.find("div.item,div.suit,div.item-sub").addClass("item-checked");
                if (this.queryCartAllSelect()) {
                    $cartAllCheckBox.prop("checked", true);
                    $cartAllCheckBox.closest(".cart-checkbox").addClass("cart-checkbox-checked")
                }
                $ele.closest(".store-title").addClass("store-checked")
            } else {
                $parentNode.find("div.item,div.suit,div.item-sub").removeClass("item-checked");
                $ele.closest(".store-title").removeClass("store-checked");
                $cartAllCheckBox.prop("checked", false);
                $cartAllCheckBox.closest(".cart-checkbox").removeClass("cart-checkbox-checked")
            }
            probeAuthStatus(function() {
                that.selectProcess(allCheckBox, isSelect)
            }, function() {
                var loginSign = $("#loginSign").val();
                if (loginSign == "true") {
                    ensureLogin(function() {
                        that.selectProcess(allCheckBox, isSelect)
                    })
                } else {
                    that.selectProcess(allCheckBox, isSelect)
                }
            })
        }, cartAllSelect: function(ele) {
            var that = this;
            var $ele = $(ele), isSelect = $ele.prop("checked"), dCartWrapper = $(".cart-wrapper"), dMCartBody = dCartWrapper.find(".m-cart-body"), $cartAllCheckBox = dCartWrapper.find(".J-AllCheckBox"), dStoreTitle = dCartWrapper.find(".store-title");
            var allCheckBox = $(".checkbox", ".m-cart-body");
            dMCartBody.find(":checkbox.checkbox").prop("checked", isSelect);
            dStoreTitle.find(":checkbox.checkbox").prop("checked", isSelect);
            $cartAllCheckBox.prop("checked", isSelect);
            if (isSelect) {
                dMCartBody.find(":checkbox.checkbox").each(function() {
                    $(this).closest("div.item,div.suit,div.item-sub").not(".item-fail,.suit-fail").addClass("item-checked")
                });
                $cartAllCheckBox.closest(".cart-checkbox").addClass("cart-checkbox-checked");
                dStoreTitle.addClass("store-checked")
            } else {
                dMCartBody.find(".item-checked").removeClass("item-checked");
                dStoreTitle.removeClass("store-checked");
                $cartAllCheckBox.closest(".cart-checkbox").removeClass("cart-checkbox-checked")
            }
            probeAuthStatus(function() {
                that.selectProcess(allCheckBox, isSelect)
            }, function() {
                var loginSign = $("#loginSign").val();
                if (loginSign == "true") {
                    ensureLogin(function() {
                        that.selectProcess(allCheckBox, isSelect)
                    })
                } else {
                    that.selectProcess(allCheckBox, isSelect)
                }
            })
        }, singleSelect: function(ele) {
            var that = this;
            var $ele = $(ele), $cartAllCheckBox = $(".J-AllCheckBox"), dThisStoreTitle = $ele.closest(".m-store").find(".store-title"), $storeAllCheckBox = dThisStoreTitle.find(".checkbox"), $parentNode = $ele.closest("div.item,div.suit,div.item-sub"), isSelect = $ele.prop("checked");
            if (isSelect) {
                $parentNode.addClass("item-checked");
                if (this.queryStoreAllSelect($ele)) {
                    $storeAllCheckBox.prop("checked", true);
                    dThisStoreTitle.addClass("store-checked");
                    if (this.queryCartAllSelect()) {
                        $cartAllCheckBox.prop("checked", true);
                        $cartAllCheckBox.closest(".cart-checkbox").addClass("cart-checkbox-checked")
                    }
                }
            } else {
                $parentNode.removeClass("item-checked");
                $cartAllCheckBox.closest(".cart-checkbox").removeClass("cart-checkbox-checked");
                dThisStoreTitle.removeClass("store-checked");
                $storeAllCheckBox.prop("checked", false);
                $cartAllCheckBox.prop("checked", false)
            }
            probeAuthStatus(function() {
                that.selectProcess($ele, isSelect)
            }, function() {
                var loginSign = $("#loginSign").val();
                if (loginSign == "true") {
                    ensureLogin(function() {
                        that.selectProcess($ele, isSelect)
                    })
                } else {
                    that.selectProcess($ele, isSelect)
                }
            })
        }, queryStoreAllSelect: function(ele) {
            var storeCheckBox = $(ele).closest(".m-store").find(":checkbox.chk-item"), result = true;
            storeCheckBox.each(function() {
                if ($(this).prop("checked") === false) {
                    result = false;
                    return false
                }
            });
            return result
        }, queryCartAllSelect: function() {
            var result = true;
            $(".m-cart-body :checkbox.chk-item").each(function() {
                if ($(this).prop("checked") === false) {
                    result = false;
                    return false
                }
            });
            return result
        }, querySelect: function() {
            var allSelectBox = $(".chk-item:checked", ".m-cart-body");
            if (allSelectBox.length == 0) {
                $(".checkout").addClass("checkout-disable-tip")
            } else {
                var checkoutFloat = false;
                $.each(allSelectBox, function(i, n) {
                    var itemNo = $(n).attr("id");
                    var msgObject = $("#" + itemNo + "-amount-msg");
                    var emObject = msgObject.next(".amount-tip");
                    if (itemNo != undefined) {
                        if (msgObject.length > 0 && msgObject.html() != "" && !emObject.length > 0) {
                            checkoutFloat = true;
                            return false
                        } else {
                            if ($(n).parents(".suit").length > 0) {
                                var subItems = $(n).parents(".suit").find(".item-sub").find("#haoye");
                                $.each(subItems, function(i, n) {
                                    itemNo = $(n).attr("itemno");
                                    msgObject = $("#" + itemNo + "-amount-msg");
                                    emObject = msgObject.next(".amount-tip");
                                    if (msgObject.length > 0 && msgObject.html() != "" && !emObject.length > 0) {
                                        checkoutFloat = true;
                                        return false
                                    }
                                })
                            }
                        }
                    }
                });
                if (checkoutFloat) {
                    $(".checkout").addClass("checkout-disable")
                } else {
                    $(".checkout").removeClass("checkout-disable")
                }
            }
        }, checkOperateMethod: function() {
            cloudCart1.selectList.disableCheckbox();
            var loginSign = $("#loginSign").val();
            var operateCheckCmmdtyData = operateCheckCmmdty.toString();
            operateCheckCmmdty = new Array();
            $.ajax({type: "get", dataType: "jsonp", url: "operateCartOneCheck.do", data: {loginSign: loginSign, operateCheckCmmdty: operateCheckCmmdtyData}, crossDomain: true, success: function(data) {
                    if (data.result == "false") {
                        return false
                    }
                    cloudCart1.refreshPage(data)
                }, complete: function(XMLHttpRequest, textStatus) {
                    cloudCart1.selectList.enableCheckbox()
                }})
        }, disableCheckbox: function() {
            $(".m-cart-body :checkbox").each(function() {
                $(this).attr("disabled", "false")
            })
        }, enableCheckbox: function() {
            $(".m-cart-body :checkbox").each(function() {
                $(this).removeAttr("disabled", "true")
            })
        }, selectMeetcut: function() {
            $(document).on("click", ".ui-tooltip .meet-cut-select label", function(e) {
                var _that = $(this);
                e.stopPropagation();
                var dParentLI = _that.closest("li");
                if (dParentLI.find(".cart-raido").length != 0) {
                    if (dParentLI.hasClass("pro-checked")) {
                        dParentLI.removeClass("pro-checked")
                    } else {
                        dParentLI.addClass("pro-checked")
                    }
                } else {
                    if (dParentLI.find(".cart-checkbox").length != 0) {
                        if (dParentLI.hasClass("item-checked")) {
                            dParentLI.removeClass("item-checked")
                        } else {
                            dParentLI.addClass("item-checked")
                        }
                    }
                }
            })
        }}, checkout: {init: function() {
            this.bindEvent();
            this.splitBuy();
            this.giftErrorPop()
        }, bindEvent: function() {
            var _that = this;
            $(document).on("click", ".checkout", function(e) {
                e.preventDefault();
                if ($(this).hasClass("checkout-disable") || $(this).hasClass("checkout-disable-tip") || $(this).hasClass("checkout-loading")) {
                    return false
                }
                ensureLogin(function() {
                    var inputObjects = $("input[name=icart1_goods_sel]");
                    var hwgCodeArray = new Array();
                    var normalCodeArray = new Array();
                    $.each(inputObjects, function(n, inputObject) {
                        if ($(inputObject).attr("checked")) {
                            var cmmdtyCode;
                            var activityType = $(inputObject).attr("activityType");
                            if (activityType == "04" || activityType == "05" || activityType == "06" || activityType == "12") {
                                var suitObject = $(inputObject).parents(".suit");
                                cmmdtyCode = $(suitObject.find("#haoye")[0]).attr("cmmdtyCode")
                            } else {
                                cmmdtyCode = $(inputObject).attr("cmmdtyCode")
                            }
                            if ($(inputObject).attr("overSeasFlag") == "927HWG" || $(inputObject).attr("overSeasFlag") == "927HWG1") {
                                hwgCodeArray.push(cmmdtyCode)
                            } else {
                                normalCodeArray.push(cmmdtyCode)
                            }
                        }
                    });
                    if (hwgCodeArray.length > 0 && normalCodeArray.length > 0) {
                        $.mLionDialog({css: {width: "500px"}, title: "温馨提示：限于法律规定，请分开结算【海外购商品】和【普通商品】", http: function(e, o) {
                                $.ajax({type: "get", url: "showPromptPaySplitftl.do", data: {normalCodeArray: normalCodeArray.toString(), hwgCodeArray: hwgCodeArray.toString()}, dataType: "html", success: function(data) {
                                        e.find(".content").html(data);
                                        e.find(".btn.close").attr("name", "icart1_ope_buyclose01");
                                        $.resizeLionDialog();
                                        cartListLoop.listloop({wrap: ".abroad-list", loopBox: ".abroad-ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: true});
                                        cartListLoop.listloop({wrap: ".common-list", loopBox: ".common-ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: true})
                                    }})
                            }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 100, fadeOut: 100});
                        return
                    }
                    _that.realCheckOut("")
                })
            })
        }, getCartOneProduct: function(shoppingCartPayError) {
            var shoppingCartPayErrorList = shoppingCartPayError;
            var failCmmdty = new Array();
            ($("input[type='checkbox']").each(function() {
                if (shoppingCartPayErrorList.length > 0) {
                    for (var i = 0; i < shoppingCartPayErrorList.length; i++) {
                        var CartOne = new Object();
                        CartOne.itemNo = "";
                        CartOne.cmmdtyName = "";
                        CartOne.salesPrice = "";
                        CartOne.cmmdtyCode = "";
                        CartOne.activityId = "";
                        CartOne.firstSubCmmdtyCode = "";
                        CartOne.firstSubCmmdtyName = "";
                        if (shoppingCartPayErrorList[i].itemNo == $(this).attr("id") && $(this).attr("checked") == "checked") {
                            CartOne.itemNo = $(this).attr("id");
                            CartOne.cmmdtyName = $(this).attr("cmmdtyName");
                            CartOne.cmmdtyCode = $(this).attr("cmmdtyCode");
                            CartOne.salesPrice = $(this).attr("salesPrice");
                            CartOne.shopCode = $(this).attr("shopCode");
                            CartOne.activityId = $(this).attr("activityId");
                            CartOne.activityType = $(this).attr("activityType");
                            if (!(CartOne.activityId != "" && CartOne.activityType == "06")) {
                                if (!cloudCart1.checkout.checkHaveCmmdty(failCmmdty, CartOne)) {
                                    failCmmdty.push(CartOne)
                                }
                            }
                        }
                        var itemSubs = $(this).parents(".suit");
                        var itemItems = $(itemSubs).find("#haoye");
                        $.each(itemItems, function(n, item) {
                            if (CartOne.activityId != "" && CartOne.activityType == "06" && n == 0) {
                                CartOne.firstSubCmmdtyCode = $(item).attr("cmmdtyCode");
                                CartOne.firstSubCmmdtyName = $(item).attr("cmmdtyName");
                                if (!cloudCart1.checkout.checkHaveCmmdty(failCmmdty, CartOne)) {
                                    failCmmdty.push(CartOne)
                                }
                            }
                            var itemNo = $(item).attr("itemNo");
                            if (shoppingCartPayErrorList[i].itemNo == itemNo) {
                                CartOne.cmmdtyName = $(item).attr("cmmdtyName");
                                CartOne.cmmdtyCode = $(item).attr("cmmdtyCode");
                                CartOne.salesPrice = $(item).attr("salesPrice");
                                CartOne.shopCode = $(item).attr("shopCode");
                                if (!cloudCart1.checkout.checkHaveCmmdty(failCmmdty, CartOne)) {
                                    failCmmdty.push(CartOne)
                                }
                            }
                        })
                    }
                }
            }));
            return failCmmdty
        }, realCheckOut: function(buyRule) {
            if (!$(".checkout").hasClass("checkout-loading")) {
                $(".checkout").addClass("checkout-loading")
            }
            var cart2Url = "order.do";
            var itemLi = "";
            var imgUrl = $("#imgUrl").val();
            var c2dt = "";
            if (typeof bd != "undefined" && bd && bd != "undefined") {
                c2dt = bd.rst()
            }
            $.ajax({url: "cartSettlement.do", type: "POST", data: {cityCode: $("#city").attr("cityCode"), districtCode: $("#city").attr("districtCode"), provinceCode: $("#city").attr("provincecode"), c2dt: c2dt, validateCode: validateCode, validateUuid: validateUuid, buyRule: buyRule}, dataType: "json", success: function(data) {
                    if ("4000" === data.returnCode) {
                        var errorMsg = '<div class="company-channel"><p class="tips">您访问的太频繁，网络拥堵，请您稍后再试！</p></div>';
                        $.mLionDialog({css: {width: "366px"}, title: "", http: function(e, o) {
                                e.find(".content").html(errorMsg);
                                cloudCart1.checkout.closePop()
                            }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                        return
                    }
                    if (data.result.isSuccess == "Y") {
                        window.location.href = cart2Url + "?cart2No=" + data.result.cart2No
                    } else {
                        var errorMsg = "";
                        var errorList = data.result.resultErrorList;
                        appendInput("Tosettlement");
                        sa.openAPI.sendMessage("Tosettlement", errorList[0][0].errorMessage + "CODE:" + errorList[0][0].errorCode + ",USER:" + getCookie("custno"));
                        if (!(errorList.length > 0 && errorList[0][0].systemErrorFlag == "Y")) {
                            if (errorList[0][0].errorCode === "009" || errorList[0][0].errorCode === "014") {
                                aqSuning1.showMobilePopType(false);
                                return
                            } else {
                                if (errorList[0][0].errorCode == "010" || errorList[0][0].errorCode == "011" || errorList[0][0].errorCode == "012" || errorList[0][0].errorCode == "013") {
                                    errorMsg += '<div class="system-error"><p class="tips"><i class="tip-icon tip-warning-24"></i>' + errorList[0][0].errorMessage + '</p> <a  href="javascript:;" class="cart-btn close" onclick="cloudCart1.reload()">知道了</a></div>';
                                    $.mLionDialog({css: {width: "436px"}, title: "温馨提示", http: function(e, o) {
                                            e.find(".content").html(errorMsg);
                                            cloudCart1.checkout.closePop()
                                        }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                                    return
                                } else {
                                    if (errorList[0][0].errorCode === "018") {
                                        errorMsg += '<div class="company-channel"><p class="tips">亲，大宗购物请点击<span><a href="http://b.suning.com">企业用户渠道&gt;</a></span>小苏的服务会更贴心！</p></div>';
                                        $.mLionDialog({css: {width: "366px"}, title: "", http: function(e, o) {
                                                e.find(".content").html(errorMsg);
                                                cloudCart1.checkout.closePop()
                                            }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                                        return
                                    } else {
                                        if (errorList[0][0].errorCode === "017") {
                                            $("#uuid").val(data.uuid);
                                            errorMsg += '<div class="identify-code"><p class="tips">亲，很抱歉，您购买的宝贝销售异常火爆，让小苏措手不及，请稍后再试~</p><div class="code-input clearfix"><dl><dt class="l">验证码</dt><dd class="l"><p class="item-ide"><input autocomplete="off" onkeyup="cloudCart1.validatSecurityCode.keyupFunc();" onfocus="cloudCart1.validatSecurityCode.focusFunc();" class="ui-text l" type="text" placeholder="以下字符不区分大小写" id="inputCode" ><i id="tipCode" ></i></p><p class="item-ide"><img onclick="cloudCart1.validatSecurityCode.changeCode();" id="imgCode" class="l" src="http://vcs.suning.com/vcs/imageCode.htm?uuid=' + data.uuid + "&yys=" + new Date().getTime() + '"><span class="change l">看不清楚？<a href="javascript:void(0);" onclick="cloudCart1.validatSecurityCode.changeCode();">换一张</a></span></p><p class="item-ide"><a class="lion-btn certain" href="javascript:void(0);" id="validateButton" onclick="cloudCart1.validatSecurityCode.validateCodeFunc();">确定</a><a class="lion-btn close" href="javascript:void(0);" onclick="cloudCart1.reload();return false;">关闭</a></p></dd></dl></div></div>';
                                            $.mLionDialog({css: {width: "448px"}, title: "", http: function(e, o) {
                                                    $("#tipCode").hide();
                                                    e.find(".content").html(errorMsg);
                                                    cloudCart1.checkout.closePop()
                                                }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                                            cloudCart.supportPlaceHolder.init();
                                            cloudCart.changeInputBorder();
                                            return
                                        } else {
                                            if (errorList[0][0].errorCode === "019") {
                                                errorMsg += '<div class="identify-code"><p class="tips">亲，很抱歉，您购买的宝贝销售异常火爆，让小苏措手不及，请稍后再试~</p></div>';
                                                $.mLionDialog({css: {width: "448px"}, title: "", http: function(e, o) {
                                                        $("#tipCode").hide();
                                                        e.find(".content").html(errorMsg);
                                                        cloudCart1.checkout.closePop()
                                                    }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                                                cloudCart.supportPlaceHolder.init();
                                                cloudCart.changeInputBorder();
                                                return
                                            } else {
                                                if (errorList[0][0].errorCode === "020") {
                                                    errorMsg += '<div class="system-busy"><div class="poor-lion more-font-lion clearfix"><i class="poor"></i><div class="tip-opt"><p>海外购商品需要<span class="c-ff6600">根据商家分开结算</span>，以便海外进口商品顺利通过海关。</p><a href="javascript:void(0);" class="cart-btn close" name="icart1_ope_iknow02">知道了</a></div></div></div>';
                                                    $.mLionDialog({css: {width: "436px"}, title: "温馨提示", http: function(e, o) {
                                                            e.find(".content").html(errorMsg);
                                                            e.find(".btn.close").attr("name", "icart1_ope_buyclose02");
                                                            cloudCart1.checkout.closePop()
                                                        }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                                                    return
                                                } else {
                                                    if (errorList[0][0].errorCode === "021") {
                                                        var inputObjects = $("input[name=icart1_goods_sel]");
                                                        var HWGCheckNum = 0;
                                                        $.each(inputObjects, function(n, inputObject) {
                                                            if ($(inputObject).attr("checked")) {
                                                                if ($(inputObject).attr("overSeasFlag") == "927HWG" || $(inputObject).attr("overSeasFlag") == "927HWG1") {
                                                                    HWGCheckNum++;
                                                                    itemLi += '<li class="list">' + $(inputObject).parents(".td-chk").siblings(".td-item").find(".item-pic").find("a").html() + "</li>"
                                                                }
                                                            }
                                                        });
                                                        errorMsg += '<div class="abroad-split abroad-split-one-store-limit"><h3 class="abroad-h3 abroad-h3-1 abroad-h3-bold">您已经超过<span class="price-color">海关限额<span class="sn-price"><i>&yen;</i>1000</span></span>,请回购物车将商品分开结算<i style="vertical-align:middle;" class="tip-icon tip-help-12 mr5 limit-help"></i></h3><p class="tc"><span class="c-ff6600">&nbsp;</span></p><div id="abroadTipDom" class="hide"><div class="abroad-tip-dom"><p class="font-bold">中国海关规定：</p><p>1.消费者购买进口商品，以“个人自用，合理数量”为原则，每单最大购买限额为￥1000（不含关税）。</p><p>2.如果订单中只含单件不可分割商品，则可以超过￥1000的限制。</p></div></div><div class="clearfix nobo ' + (HWGCheckNum < 2 ? "one-goods" : (HWGCheckNum == 2 ? "two-goods" : "")) + '"><div class="abroad-list"><a href="javascript:void(0);" class="prev"></a><div class="loop-div"><ul class="abroad-ul">' + itemLi + '</ul></div><a href="javascript:void(0);" class="next"></a></div><div class="pay-div"><a class="check-btn close" name="icart1_ope_iknow02">知道了</a></div></div></div>';
                                                        $.mLionDialog({css: {width: "442px"}, title: "温馨提示", http: function(e, o) {
                                                                e.find(".content").html(errorMsg);
                                                                e.find(".btn.close").attr("name", "icart1_ope_buyclose03");
                                                                $.resizeLionDialog();
                                                                cloudCart1.checkout.closePop();
                                                                cartListLoop.listloop({wrap: ".abroad-list", loopBox: ".abroad-ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: true});
                                                                cartListLoop.listloop({wrap: ".common-list", loopBox: ".common-ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: true})
                                                            }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                                                        return
                                                    } else {
                                                        if (errorList[0][0].errorCode === "022") {
                                                            var shoppingCartPayErrorList = errorList[0];
                                                            if (shoppingCartPayErrorList.length > 0) {
                                                                var giftErrorHtml = "<div class='layer_present'><div class='main'><div class='warn wd300'><span class='warn_text'><b class='warn_icon'></b>以下赠品剩余数量不足，是否继续购买？</span></div>";
                                                                giftErrorHtml += "<div class='present-cont wd290'><ul>";
                                                                for (var i = 0; i < shoppingCartPayErrorList.length; i++) {
                                                                    var errorMessage = shoppingCartPayErrorList[i].errorMessage;
                                                                    var giftName = shoppingCartPayErrorList[i].cmmdtyName;
                                                                    var cmmdtyQty = errorMessage;
                                                                    if (cmmdtyQty == 0) {
                                                                        giftErrorHtml += "<li><span class='has-over r'>已赠完</span><span class='pre-first bg-over'>赠品</span><span class='present-name fcl' title='" + giftName + "'>" + giftName + "</span></li>"
                                                                    } else {
                                                                        giftErrorHtml += "<li><span class='remain r'>剩余" + cmmdtyQty + "件</span><span class='pre-first'>赠品</span><span class='present-name fcl' title='" + giftName + "'>" + giftName + "</span></li>"
                                                                    }
                                                                }
                                                                giftErrorHtml += "</ul></div><div class='present-btn'><a href='javascript:;' class='continue-acc'>确定</a><a href='javascript:;' class='abandon-acc close'>取消</a></div></div></div>";
                                                                $.mLionDialog({css: {width: "440px"}, http: function(e, o) {
                                                                        e.find(".content").html(giftErrorHtml);
                                                                        cloudCart1.checkout.closePop()
                                                                    }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                                                                return
                                                            }
                                                        }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                            itemLi += '<div class="limit-buy">';
                            for (var i = 0; i < errorList.length; i++) {
                                var failCmmdty = errorList[i];
                                itemLi += '<p class="tips"><i class="tip-icon tip-warning-24"></i>' + errorList[i][0].errorMessage + '</p><a href="javascript:void(0);" class="arr prev"></a><a href="javascript:void(0);" class="arr next"></a><div class="list-pro-box "><ul class="list-box">';
                                for (var j = 0; j < failCmmdty.length; j++) {
                                    var cmmdtyCode = failCmmdty[j].cmmdtyCode;
                                    var cmmdtyName = failCmmdty[j].cmmdtyName;
                                    if (typeof cmmdtyCode != "undefined" && cmmdtyCode && cmmdtyCode != "undefined") {
                                        var imgMsg = "";
                                        if (errorList[i][j].errorCode == "007") {
                                            imgMsg = '<div class="service-warming-product-img-box" title="' + cmmdtyName + '"></div>'
                                        } else {
                                            imgMsg = '<img alt="' + cmmdtyName + '" src="' + imgUrl + "/" + cmmdtyCode.substr(0, 14) + "/" + cmmdtyCode + "/" + failCmmdty[j].cmmdtyCode + '_ls1.jpg">'
                                        }
                                        itemLi += '<li class="list">' + imgMsg + '</a><p class="pro-name">' + cmmdtyName + "</p></li>"
                                    }
                                }
                                itemLi += '</ul></div><a href="javascript:void(0)" onclick="cloudCart1.reload();return false;" class="close">知道了</a></div>';
                                break
                            }
                        } else {
                            itemLi += '<div class="system-busy"><div class="poor-lion clearfix"><i class="poor"></i><div class="tip-opt"><p>' + errorList[0][0].errorMessage + '</p><a href="javascript:void(0);" class="cart-btn close">知道了</a></div></div></div>'
                        }
                        $.mLionDialog({css: {width: "436px"}, title: "温馨提示", http: function(e, o) {
                                e.find(".content").html(itemLi);
                                cloudCart1.checkout.closePop();
                                var proLen = $(".limit-buy .list-box li").length, arr = $(".limit-buy .arr");
                                if (proLen >= 2) {
                                    cartListLoop.listloop({wrap: ".limit-buy", loopBox: ".list-box", step: {wide: 2, narrow: 2}, scrollWidth: {wide: 300, narrow: 304}, hasLabel: false, isRandom: false})
                                } else {
                                    if (proLen == 1) {
                                        $(".limit-buy .list-box li").addClass("one");
                                        arr.hide()
                                    }
                                }
                            }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
                    }
                }, error: function() {
                    itemLi = '<div class="system-busy"><div class="poor-lion clearfix"><i class="poor"></i><div class="tip-opt"><p>网络出错了，请稍后再试</p><a href="javascript:void(0);" class="cart-btn close">知道了</a></div></div></div>';
                    $.mLionDialog({css: {width: "436px"}, title: "温馨提示", http: function(e, o) {
                            e.find(".content").html(itemLi);
                            cloudCart1.checkout.closePop();
                            var proLen = $(".limit-buy .list-box li").length, arr = $(".limit-buy .arr");
                            if (proLen >= 2) {
                                cartListLoop.listloop({wrap: ".limit-buy", loopBox: ".list-box", step: {wide: 2, narrow: 2}, scrollWidth: {wide: 300, narrow: 304}, hasLabel: false, isRandom: false})
                            } else {
                                if (proLen == 1) {
                                    $(".limit-buy .list-box li").addClass("one");
                                    arr.hide()
                                }
                            }
                        }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
                }})
        }, checkHaveCmmdty: function(failCmmdty, cartOne) {
            for (var i = 0; i < failCmmdty.length; i++) {
                if (failCmmdty[i].cmmdtyCode == cartOne.cmmdtyCode) {
                    return true
                }
            }
        }, splitBuy: function() {
            $(document).on("click", "#normalBuy", function() {
                $.unmLionDialog();
                $(".checkout").addClass("checkout-loading");
                cloudCart1.checkout.realCheckOut(1)
            });
            $(document).on("click", "#hwgBuy", function() {
                $.unmLionDialog();
                $(".checkout").addClass("checkout-loading");
                cloudCart1.checkout.realCheckOut(2)
            })
        }, closePop: function() {
            $(".container .btn.close,.container .cart-btn.close,.container .check-btn.close").bind("click", function(e) {
                e.preventDefault();
                cloudCart1.reload()
            })
        }, giftErrorPop: function() {
            $(document).on("click", ".content .layer_present .continue-acc", function(e) {
                e.preventDefault();
                $.unmLionDialog();
                cloudCart1.checkout.realCheckOut(1)
            });
            $(document).on("click", ".content .layer_present .abandon-acc.close", function(e) {
                e.preventDefault();
                cloudCart1.reload()
            })
        }}, allChoose: {isAlchoseEmpty: function() {
            var hadBuy = $(".had-buy");
            hadBuyList = hadBuy.find(".list-box .list").length;
            hadBuyList == 0 ? $(".cart-toolbar").find(".alchose-span").hide() : $(".cart-toolbar").find(".alchose-span").show();
            return hadBuyList == 0 ? true : false
        }}, refreshPage: function(data) {
        $("#cart-one-delivery").remove();
        $("#cart-wrapper").html(data.html);
        $("#cart-one-header").append($("#cart-one-delivery").removeClass("hide"));
        this.snAddressInit();
        this.judgeFailure();
        this.selectList.querySelect();
        this.changeNumber.init();
        this.fixBottom();
        this.judeFixBottom();
        this.getAjaxFreight();
        this.getAjaxGift()
    }, validatSecurityCode: {validate: function() {
            var code = $("#inputCode").val();
            code = $.trim(code);
            if (code == "" || code == undefined) {
                $("#tipCode").hide();
                $("#inputCode").addClass("error-input");
                $("#inputCode").val("");
                $("#inputCode").attr("placeholder", "请输入正确的验证码");
                cloudCart1.validatSecurityCode.changeCode();
                return
            }
            var uuid = $("#uuid").val();
            var param = "code=" + code + "&uuid=" + uuid + "&delFlag=0";
            $.ajax({type: "POST", url: "http://vcs.suning.com/vcs/validate_jsonp.htm", data: param, dataType: "jsonp", jsonp: "callback", success: function(data) {
                    if (data[0].result == "true") {
                        $("#tipCode").addClass("tip-icon tip-ok-16 tip-ok l");
                        $("#tipCode").show()
                    } else {
                        $("#tipCode").hide();
                        $("#inputCode").addClass("error-input");
                        $("#inputCode").val("");
                        $("#inputCode").attr("placeholder", "请输入正确的验证码");
                        cloudCart1.validatSecurityCode.changeCode()
                    }
                }})
        }, changeCode: function() {
            var uuid = $("#uuid").val();
            var src = "http://vcs.suning.com/vcs/imageCode.htm?uuid=" + uuid + "&yys=" + new Date().getTime();
            $("#imgCode").attr("src", src)
        }, keyupFunc: function() {
            var length = $("#inputCode").val().length;
            if (length >= 4) {
                cloudCart1.validatSecurityCode.validate()
            }
        }, focusFunc: function() {
            $("#inputCode").removeClass("error-input");
            $("#inputCode").attr("placeholder", "以下字符不区分大小写")
        }, validateCodeFunc: function() {
            var code = $("#inputCode").val();
            code = $.trim(code);
            if (code == "" || code == undefined) {
                $("#tipCode").hide();
                $("#inputCode").addClass("error-input");
                $("#inputCode").val("");
                $("#inputCode").attr("placeholder", "请输入正确的验证码");
                cloudCart1.validatSecurityCode.changeCode();
                return
            }
            var uuid = $("#uuid").val();
            var param = "code=" + code + "&uuid=" + uuid + "&delFlag=0";
            $.ajax({type: "POST", url: "http://vcs.suning.com/vcs/validate_jsonp.htm", data: param, dataType: "jsonp", jsonp: "callback", success: function(data) {
                    if (data[0].result == "true") {
                        $("#tipCode").addClass("tip-icon tip-ok-16 tip-ok l");
                        $("#tipCode").show();
                        validateCode = code;
                        validateUuid = uuid;
                        $(".checkout").removeClass("checkout-loading");
                        $(".checkout").trigger("click")
                    } else {
                        $("#tipCode").hide();
                        $("#inputCode").addClass("error-input");
                        $("#inputCode").val("");
                        $("#inputCode").attr("placeholder", "请输入正确的验证码");
                        changeCode(uuid)
                    }
                }, error: function(data) {
                    alert("error")
                }})
        }}, changeNumber: {tpl: {_load: '<table><tr><td><p class="loading-message">处理中，请稍后...</p></td></tr></table>', _success: "<table><tr><td>商品数量修改成功</td></tr></table>", _error: '<table><tr><td><span class="c-error">处理失败，请从新尝试</span></td></tr></table>'}, init: function() {
            this.bindEvent()
        }, bindEvent: function() {
            var that = this;
            $("input.text-amount", ".item-amount").numer({callback: function(a, b) {
                    var plunNum = a;
                    if ("warranty" == b.attr("cmmdtyType")) {
                        var warrantyItemNo = b.attr("warrantyItemNo");
                        var cmmdtyItemNo = b.attr("cmmdtyItemNo");
                        var pSubs = $(b).parents(".sun-package-list");
                        var itemBoxs = pSubs.find(".item-box");
                        var totalNum = 0;
                        $.each(itemBoxs, function(i, itemBox) {
                            var itemNum = $(itemBox).find(".td-amount > .item-amount > .text-amount").val();
                            totalNum = parseInt(totalNum) + parseInt(itemNum)
                        });
                        var cmmdtyNum = $("#" + cmmdtyItemNo + "-text-amount").val();
                        if (cmmdtyNum == "") {
                            cmmdtyNum = $("#" + cmmdtyItemNo + "-text-amount").html()
                        }
                        if (parseInt(cmmdtyNum) < parseInt(totalNum)) {
                            $("#" + cmmdtyItemNo + "-amount-msg").html("商品数量应大于阳光包数量").next(".amount-tip").html("");
                            if (($("#" + cmmdtyItemNo).length == 0 && $("input[itemno='" + cmmdtyItemNo + "']").parents(".suit").hasClass("item-checked")) || $("#" + cmmdtyItemNo).attr("checked") == "checked") {
                                $(".checkout").addClass("checkout-disable")
                            }
                        } else {
                            $("#" + cmmdtyItemNo + "-amount-msg").html("").next(".amount-tip").html("")
                        }
                        var itemSubs = $(b).parents(".item-box");
                        var dj = itemSubs.find(".price-now > em").html();
                        itemSubs.find(".td-sum > .sn-price > em").html((parseFloat(dj) * parseInt(plunNum)).toFixed(2));
                        $.each(updateNumCmmdty, function(n, value) {
                            var cmmItem = value.split("-")[0];
                            if (cmmItem == warrantyItemNo) {
                                updateNumCmmdty.splice(n, 1);
                                return false
                            }
                        });
                        updateNumCmmdty.push(warrantyItemNo + "-" + plunNum)
                    } else {
                        var itemNo = b.attr("itemNo");
                        if ("04" == b.attr("activityType") || "05" == b.attr("activityType") || "06" == b.attr("activityType") || "12" == b.attr("activityType")) {
                            var pSubs = $(b).parents(".suit");
                            var headSub = pSubs.find(".item-header");
                            var itemSubs = pSubs.find(".item-sub");
                            var sCmmdtyQty = b.attr("packageScaleQty").split("-");
                            $.each(updateNumCmmdty, function(n, value) {
                                var cmmItem = value.split("-")[0];
                                if (cmmItem == itemNo) {
                                    updateNumCmmdty.splice(n, 1);
                                    return false
                                }
                            });
                            var zCmmdtyNum = parseInt(sCmmdtyQty[0]) * parseInt(plunNum);
                            updateNumCmmdty.push(itemNo + "-" + zCmmdtyNum);
                            $.each(itemSubs, function(subNum, subValue) {
                                var dj = $(subValue).find(".price-line .price-now  em").html();
                                var sCmmdtyNum = parseInt(sCmmdtyQty[subNum + 1]) * parseInt(plunNum);
                                $(subValue).find(".td-amount .item-amount:not('.amount-busy')").find("span").html(sCmmdtyNum);
                                $(subValue).find(".td-sum  .sn-price  em").html((parseFloat(dj) * parseInt(sCmmdtyNum)).toFixed(2));
                                var itemBoxs = $(subValue).siblings(".item-extra").find(".sun-package-list > .item-box");
                                $.each(itemBoxs, function(i, itemBox) {
                                    $(itemBox).find(".td-amount > .item-amount > span").html(sCmmdtyNum)
                                })
                            });
                            var tdj = headSub.find(".price-line  .sn-price  em").html();
                            headSub.find(".td-sum  .sn-price  em").html((parseFloat(tdj) * parseInt(plunNum)).toFixed(2))
                        } else {
                            if ("01" == b.attr("activityType") || "02" == b.attr("activityType")) {
                                var itemSubs = $(b).parents(".item-main");
                                var itemBoxs = itemSubs.siblings(".item-extra").find(".sun-package-list > .item-box");
                                $.each(itemBoxs, function(i, itemBox) {
                                    $(itemBox).find(".td-amount > .item-amount > span").html(plunNum)
                                });
                                var dj = itemSubs.find(".price-now  em").html();
                                itemSubs.find(".td-sum  .sn-price  em").html((parseFloat(dj) * parseInt(plunNum)).toFixed(2));
                                $.each(updateNumCmmdty, function(n, value) {
                                    var cmmItem = value.split("-")[0];
                                    if (cmmItem == itemNo) {
                                        updateNumCmmdty.splice(n, 1);
                                        return false
                                    }
                                });
                                updateNumCmmdty.push(itemNo + "-" + plunNum)
                            }
                        }
                    }
                    clearTimeout(cartTimeFlag);
                    cartTimeFlag = setTimeout(function() {
                        probeAuthStatus(function() {
                            that.updateNumMethod(b)
                        }, function() {
                            var loginSign = $("#loginSign").val();
                            if (loginSign == "true") {
                                ensureLogin(function() {
                                    that.updateNumMethod(b)
                                })
                            } else {
                                that.updateNumMethod(b)
                            }
                        })
                    }, 1000)
                }})
        }, updateNumMethod: function(ele) {
            var updateNumCmmdtyData = updateNumCmmdty.toString();
            updateNumCmmdty = new Array();
            var loginSign = $("#loginSign").val();
            $.ajax({type: "get", dataType: "jsonp", url: "updateCartOneProNum.do", data: {loginSign: loginSign, updateNumCmmdty: updateNumCmmdtyData}, crossDomain: true, success: function(data) {
                    if (data.result == "false") {
                        return false
                    }
                    cloudCart1.refreshPage(data)
                }, error: function(data) {
                }, complete: function(XMLHttpRequest, textStatus) {
                }})
        }}, cartRemoved: {tpl: {tipLoad: "<p class='message' style='padding: 4px 6px;'><i class='l tip-icon loading-message mr5' style='padding-left:0;'></i><span>正在努力加载，请稍后...</span></p>", tipError: "<p class='message c-error' style='padding: 4px 6px;'><i class='tip-icon tip-error mr5 l'></i><span>操作失败，请重新操作</span></p>", tipEmpty: "<p class='message c-error' style='padding: 4px 6px;'><i class='tip-icon tip-error mr5 l'></i><span>真抱歉，暂时还没有凑单商品哦</span></p>"}, addCart: function(options, tipDom, targetDom, tipFn) {
            var _this = this;
            tipDom.find(".ui-tooltip-inner").html(_this.tpl.tipLoad);
            _this.loadData(options, tipDom, targetDom, tipFn)
        }, loadData: function(options, tipDom, targetDom, tipFn) {
            var againBuyClickTag = targetDom.attr("againBuyClickTag");
            var cmmdtyArray = cartRemovedObject[againBuyClickTag];
            againBuy(cmmdtyArray, tipDom, targetDom)
        }, addRepurchase: function(html) {
            var _this = this;
            var dRepurchaseBox = $(".repurchase-box");
            if (dRepurchaseBox.length <= 0) {
                _this.getRepurchaseBoxFrame();
                dRepurchaseBox = $(".repurchase-box")
            }
            if (dRepurchaseBox.is(":hidden")) {
                dRepurchaseBox.show()
            }
            dRepurchaseBox.find(".tool-area-content-box").append(html);
            if (dRepurchaseBox.find(".repurchase-product").length > 5) {
                dRepurchaseBox.addClass("tool-area-box-has-more-btn");
                if (_this.setHeight == 0) {
                    _this.setHeight = 1;
                    dRepurchaseBox.find(".tool-area-content-box").css({height: 132})
                }
            }
        }, setHeight: 0, getRepurchaseBoxFrame: function() {
            $(".cart-wrapper").after('<div class="tool-area-box repurchase-box clearfix wrapper"><p class="tool-area-bank">已删除商品，您可以撤销删除或移入收藏：</p><div class="tool-area-content-box clearfix"></div><div class="more-content arrow-down">显示全部商品<i class="arrow"></i></div></div>');
            var dRepurchaseBox = $(".repurchase-box");
            dRepurchaseBox.on("click", ".more-content", function() {
                var _that = $(this);
                if (_that.hasClass("arrow-down")) {
                    _that.removeClass("arrow-down").addClass("arrow-up").html('收起部分商品<i class="arrow"></i>');
                    dRepurchaseBox.find(".tool-area-content-box").css({height: dRepurchaseBox.find(".repurchase-product").length * 26})
                } else {
                    if (_that.hasClass("arrow-up")) {
                        _that.removeClass("arrow-up").addClass("arrow-down").html('显示全部商品<i class="arrow"></i>');
                        dRepurchaseBox.find(".tool-area-content-box").css({height: 132})
                    }
                }
            })
        }, reomveRepurchaseBoxProduct: function(targetDom) {
            var dRepurchaseBox = $(".repurchase-box");
            targetDom.closest(".repurchase-product").remove();
            var productLen = dRepurchaseBox.find(".repurchase-product").length;
            if (productLen < 5 && dRepurchaseBox.find(".arrow").is(":visible")) {
                dRepurchaseBox.find(".tool-area-content-box").css({height: "auto"});
                dRepurchaseBox.removeClass("tool-area-box-has-more-btn")
            }
            if (productLen <= 0) {
                dRepurchaseBox.hide()
            }
        }}, sunPackage: {init: function(tipDom) {
            this.optionInit(tipDom);
            this.dropDown(tipDom)
        }, getData: function() {
        }, optionInit: function(tipDom) {
            var $selectTxt = tipDom.find(".select-txt");
            $selectTxt.each(function() {
                var $this = $(this), $item = $this.closest(".singleItem-wrap"), $optionWap = $item.find(".select-option"), optionlen = $optionWap.find("li").length;
                if (optionlen > 1) {
                    $item.find(".icon-dropdown").show()
                } else {
                    $item.find(".icon-dropdown").hide()
                }
                var seltxt = $optionWap.find("li:first").html();
                $this.html(seltxt)
            })
        }, dropDown: function(tipDom) {
            var $selectBox = tipDom.find(".sun-package-selectbox"), $ck = tipDom.find(".ck"), $selectOption = $selectBox.find(".select-option li"), that = this;
            $selectBox.on("click", function(event) {
                event.stopPropagation();
                var $this = $(this), optionlen = $this.find(".select-option li").length;
                if (optionlen > 1) {
                    $this.css("z-index", 9);
                    $this.toggleClass("selectedbox-open")
                }
                if (optionlen <= 1) {
                    $this.addClass("selectedbox")
                }
                that.closeList($selectBox.not($this))
            });
            $selectOption.on("click", function(event) {
                event.stopPropagation();
                var $this = $(this), seltxt = $this.html(), $wrap = $(this).parent().parent();
                $wrap.find(".select-txt").html(seltxt);
                $(this).parents(".sun-package-select").find(".warning-text").html("");
                $wrap.removeClass("selectedbox-open");
                $wrap.addClass("selectedbox")
            });
            $ck.on("click", function(event) {
                event.stopPropagation();
                var dSunPackageSelectbox = $(this).closest(".sun-package-selectbox");
                dSunPackageSelectbox.toggleClass("selectedbox");
                $(this).parents(".sun-package-select").find(".warning-text").html("");
                that.closeList(dSunPackageSelectbox)
            });
            $selectOption.mouseover(function() {
                $(this).addClass("hover")
            }).mouseleave(function() {
                $(this).removeClass("hover")
            });
            if (this.initReady == 0) {
                this.initReady = 1;
                $(document).click(function(event) {
                    var eo = $(event.target);
                    if (eo.attr("class") != "sun-package-selectbox") {
                        that.closeList($(".sun-package-selectbox"))
                    }
                })
            }
        }, initReady: 0, closeList: function(dom) {
            dom.removeClass("selectedbox-open").css({"z-index": 8})
        }, sunPackageClickInit: function() {
            $(document).on("click", ".ui-tooltip-inner .clearfix .cart-btn.r", function(event) {
                event.stopPropagation();
                var cmmdtyItemNo = $(this).attr("cmmdtyItemNo");
                var sunpackageObject = $(this).parents(".sun-package-select");
                var selectedObject = sunpackageObject.find(".selectedbox .select-txt .sunprd-name");
                var warrentyArray = [];
                selectedObject.each(function() {
                    var supplierCode = $(this).attr("supplierCode");
                    var cmmdtyQty = $(this).attr("cmmdtyQty");
                    var cmmdtyCode = $(this).attr("cmmdtyCode");
                    warrentyArray.push(supplierCode + "-" + cmmdtyQty + "-" + cmmdtyCode)
                });
                addWarranty(cmmdtyItemNo, warrentyArray, this)
            })
        }}, fixBottom: function() {
        var cartBarBox = $(".cart-toolbar-box"), _that = this;
        if (cartBarBox.length == 0) {
            return
        }
        if ($.browser.version != "6.0" && _that.fixBottomIsBind == 0) {
            _that.fixBottomIsBind = 1;
            $(window).on("scroll", function() {
                _that.judeFixBottom()
            })
        }
    }, fixBottomIsBind: 0, judeFixBottom: function(cartBar, cartBarTop) {
        var cartBarBox = $(".cart-toolbar-box");
        if (cartBarBox.length == 0) {
            return
        }
        var cartBar = cartBarBox.find(".cart-toolbar"), cartBarBoxTop = cartBarBox.offset().top;
        if ($.browser.version != "6.0") {
            if ($(window).scrollTop() >= (cartBarBoxTop - $(window).height() + cartBar.height())) {
                cartBar.removeClass("cart-toolbar-fix")
            } else {
                cartBar.addClass("cart-toolbar-fix")
            }
        }
    }, snAddressInit: function() {
        $("#city").mCity({used: true, cityCb: function(data) {
            }, distCb: function(data) {
                var cityCode = data.city.lesId;
                var provinceCode = "";
                var provinceId = data.province.id;
                if (provinceId.length > 2) {
                    provinceCode = provinceId
                } else {
                    provinceCode = "0" + provinceId
                }
                var districtCode = data.district.lesId;
                $.ajax({type: "GET", url: "updateCartOneCity.do", async: false, data: {provinceCode: provinceCode, cityCode: cityCode, districtCode: districtCode}, success: function(data) {
                    }});
                window.location.href = "cart.do"
            }, changeCb: function(data) {
                var cityCode = data.city.lesId;
                var provinceCode = "";
                var provinceId = data.province.id;
                if (provinceId > 2) {
                    provinceCode = provinceId
                } else {
                    provinceCode = "0" + provinceId
                }
                var districtCode = data.district.lesId;
                $.ajax({type: "GET", url: "updateCartOneCity.do", async: false, data: {provinceCode: provinceCode, cityCode: cityCode, districtCode: districtCode}, success: function(data) {
                    }});
                window.location.href = "cart.do"
            }, getCity: function(data) {
                $("#city").find("#provinceName").addClass("hide");
                $("#city").find("#districtName").addClass("hide")
            }})
    }, reload: function() {
        window.location.href = "cart.do"
    }, runAnalyseExpo: function() {
        if (typeof _analyseExpoTags == "function") {
            _analyseExpoTags("a")
        } else {
            setTimeout(cloudCart1.runAnalyseExpo, 1000)
        }
    }, getAjaxWarranty: function() {
        if ($(".m-store").length > 0) {
            var isCertValidStat = $("#isCertValidStat").val() == "true";
            var isCompany = $("#isCompany").val() == "true";
            $.ajax({type: "GET", url: "getAjaxWarranty.do", data: {isCertValidStat: isCertValidStat, isCompany: isCompany}, dataType: "jsonp", crossDomain: true, success: function(data) {
                    var warrantyHtmls = data.warrantyHtmls;
                    if (warrantyHtmls != "") {
                        for (var i = 0; i < warrantyHtmls.length; i++) {
                            var warrantyHtml = $("<div>" + warrantyHtmls[i] + "</div>");
                            var cmmdtyItemNo = warrantyHtml.find(".cart-btn-ok").attr("cmmdtyItemNo");
                            var cmmdtyObject = $("input[itemNo=" + cmmdtyItemNo + "][id=haoye]");
                            var remarkObject = cmmdtyObject.parent().find(".item-remark");
                            var sunpackageObject = cmmdtyObject.closest(".item").find(".sun-package-list");
                            if (sunpackageObject.length > 0) {
                                warrantyHtml.find(".sun-package-buy").remove()
                            } else {
                                warrantyHtml.find(".sun-package-modify").remove()
                            }
                            if (remarkObject.find(".c9").length > 0) {
                                remarkObject.html(remarkObject.find(".c9")).append(warrantyHtml.html())
                            } else {
                                remarkObject.html(warrantyHtml.html())
                            }
                        }
                    }
                }})
        }
    }, getAjaxFreight: function() {
        if ($(".m-store").length > 0) {
            var isCertValidStat = $("#isCertValidStat").val() == "true";
            var isCompany = $("#isCompany").val() == "true";
            $.ajax({type: "GET", url: "getAjaxFreight.do", data: {isCertValidStat: isCertValidStat, isCompany: isCompany}, dataType: "jsonp", crossDomain: true, success: function(data) {
                    var freightHtmls = data.freightHtmls;
                    if (freightHtmls != "") {
                        for (var i = 0; i < freightHtmls.length; i++) {
                            var freightHtml = $("<div>" + freightHtmls[i] + "</div>");
                            var shopCode = freightHtml.find(".save-ship").attr("shopCode");
                            var meetCutObject = $("#meet-cut-" + shopCode + "");
                            meetCutObject.prevAll("p").remove();
                            meetCutObject.before(freightHtml.html());
                            if (freightHtml.find("em").html() != "0.00" && shopCode != "0000000000" && meetCutObject.siblings(".gather").length > 0) {
                                meetCutObject.siblings(".gather").removeClass("hide")
                            }
                        }
                        $($(".cart-toolbar .cart-sub-total .sn-price em ")[1]).html(data.deliveryFeeAmount);
                        $(".cart-toolbar .cart-total-price .sn-price ").html("<i>¥</i>" + data.payAmount + "")
                    }
                    var snFreeShippingAmount = data.snFreeShippingAmount;
                    var snShopTotalAmout = $("#snSalesAmount").val();
                    if (typeof snFreeShippingAmount != "undefined" && snFreeShippingAmount && snFreeShippingAmount != "undefined" && typeof snShopTotalAmout != "undefined" && snShopTotalAmout && snShopTotalAmout != "undefined" && parseFloat(snShopTotalAmout) < parseFloat(snFreeShippingAmount)) {
                        var needBuy = (parseFloat(snFreeShippingAmount) - parseFloat(snShopTotalAmout)).toFixed(2);
                        $("#store-0000000000").find(".meet-cut-select .content-title").html("凑满" + snFreeShippingAmount + "元就可以免邮啦，不要更划算哦");
                        $("#store-0000000000").find(".gather").removeClass("hide").find("span").html("还差" + needBuy + "元就可免运费");
                        $("#needBuy").val(needBuy)
                    }
                }})
        }
    }, getAjaxGift: function() {
        if ($("#withGifts").length > 0 && $("#withGifts").val() == 1) {
            var isCertValidStat = $("#isCertValidStat").val() == "true";
            var isCompany = $("#isCompany").val() == "true";
            $.ajax({type: "GET", url: "getAjaxGift.do", data: {isCertValidStat: isCertValidStat, isCompany: isCompany}, dataType: "jsonp", crossDomain: true, success: function(data) {
                    var giftHtmls = data.GiftHtmls;
                    if (giftHtmls != "") {
                        for (var i = 0; i < giftHtmls.length; i++) {
                            var giftObject = $(giftHtmls[i]);
                            var itemNo = giftObject.attr("itemNo");
                            var cmmdtyObject = $("input[itemNo=" + itemNo + "][id=haoye]");
                            var itemExtraObject = cmmdtyObject.parent().next(".item-extra");
                            var sunPackageObject = itemExtraObject.find(".sun-package-list");
                            var itemEventObject = itemExtraObject.find(".item-event-list.coupon");
                            if (itemExtraObject.length > 0) {
                                itemExtraObject.children(":not(.sun-package-list,.item-event-list.coupon)").remove();
                                if (itemEventObject.length > 0) {
                                    giftObject.find(".item-event-list-last").removeClass("item-event-list-last")
                                }
                                if (sunPackageObject.length > 0) {
                                    sunPackageObject.after(giftObject.html())
                                } else {
                                    itemExtraObject.prepend(giftObject.html())
                                }
                            } else {
                                cmmdtyObject.parent().after('<div class="item-extra">' + giftObject.html() + "</div>")
                            }
                        }
                    }
                }})
        }
    }};
cloudCart1.recommendFn = {init: function() {
        var dCartRecommend = $(".cart-recommend");
        dCartRecommend.find(".recommend-name-box").eq(0).addClass("active");
        dCartRecommend.find(".recommend-box").eq(0).addClass("active");
        this.slideLineFn();
        dCartRecommend.find(".slide-line").show();
        this.bindTab();
        this.addCart()
    }, bindTab: function() {
        var _this = this;
        var dCartRecommend = $(".cart-recommend");
        dCartRecommend.find(".recommend-name").hover(function() {
            var dom = $(this);
            clearTimeout(_this.hoverTimeout);
            _this.hoverTimeout = setTimeout(function() {
                var dParent = dom.parent(".recommend-name-box");
                dParent.addClass("active").siblings().removeClass("active");
                dCartRecommend.find(".recommend-box").eq(dParent.index()).addClass("active").siblings().removeClass("active");
                _this.slideLineFn()
            }, 200);
            if ("icart1_recom_tab02" == dom.attr("name") && "recommend-name-box" == dom.parent(".recommend-name-box").attr("class")) {
                sa.click.sendDatasIndex(this)
            }
        }, function() {
            clearTimeout(_this.hoverTimeout)
        })
    }, hoverTimeout: "", slideLineFn: function() {
        var dCartRecommend = $(".cart-recommend");
        var dActive = dCartRecommend.find(".recommend-header .active");
        var dRecommendName = dActive.find(".recommend-name");
        var dSlideLine = dCartRecommend.find(".slide-line");
        dSlideLine.stop().animate({width: dRecommendName.outerWidth(), left: dRecommendName.position().left}, 300)
    }, addCart: function() {
        var dCartRecommend = $(".cart-recommend");
        dCartRecommend.delegate(".add-cart", "click", function() {
            var that = $(this);
            var cmmdtyCode = that.attr("cmmdtyCode");
            var shopCode = that.attr("shopCode");
            recommendAddCart("05", "01", "", cmmdtyCode, shopCode, 1, "", that)
        })
    }, successFn: function(domThis) {
        var thisPosition = domThis.position();
        var html = $('<div class="add-num"></div>');
        $(domThis).after(html);
        html.css({display: "block", top: thisPosition.top - html.height() + domThis.height() / 2, left: thisPosition.left + domThis.width() / 2 - html.width() / 2}).animate({top: thisPosition.top - html.height(), opacity: 0}, 500, function() {
            $(this).remove()
        })
    }, errorFn: function(domThis, message) {
        var thisPosition = domThis.position();
        var message = message || "操作失败，请重新操作...";
        var html = $('<div class="cart-recommend-tooltip"><div class="ui-tooltip-arrow"><i class="ui-tooltip-arrow-front">◆</i><i class="ui-tooltip-arrow-back">◆</i></div><div class="ui-tooltip-inner"><p style="color:red;"><i class="l tip-icon tip-error mr5"></i>' + message + "</div></div>");
        $(domThis).after(html);
        html.fadeOut(2000, function() {
            $(this).remove()
        })
    }};
cloudCart1.addFavFn = {run: function(options, tipDom, targetDom, tipFn) {
        var _this = this;
        tipDom.find(".ui-tooltip-inner").html(cloudCart1.addFavFn.messageList.begin);
        setTimeout(function() {
            if (!(targetDom.data("tipForce"))) {
                tipFn.oneHide(targetDom.data("tipNum"))
            }
        }, 2000);
        ensureLogin(function() {
            if (targetDom.data("tipForce") == 1) {
                return
            }
            targetDom.addClass("add-fav-already-click");
            $(".add-fav").data("tipForce", 1).css({cursor: "not-allowed"});
            _this.addFav(options, tipDom, targetDom, tipFn)
        })
    }, messageList: {begin: "<p class='message' style='width:101px;padding: 4px 8px;'><i class='l tip-icon loading-message mr5' style='padding-left:0;'></i>正在处理中</p>", load: "<p class='message' style='width:101px;padding: 4px 8px;'><i class='l tip-icon loading-message mr5' style='padding-left:0;'></i>正在移入收藏</p>", success: "<p class='message' style='width:101px;padding: 4px 8px;'><i class='l tip-icon tip-ok mr5'></i>成功移入收藏</p>", error: "<p class='message' style='width:149px;padding: 4px 8px;'><i class='l tip-icon tip-error mr5'></i>操作失败，请重新操作</p>", again: "<p class='message' style='width:113px;padding: 4px 8px;'><i class='l tip-icon tip-warning mr5'></i>已收藏过该商品</p>"}, addFav: function(options, tipDom, targetDom, tipFn) {
        if (targetDom.attr("name") != "tempProduct") {
            var itemNo = targetDom.closest("div").attr("itemNo");
            var cmmdtyCode = targetDom.closest("div").attr("cmmdtyCode");
            var shopCode = targetDom.closest("div").attr("shopCode");
            add2Favorite(cmmdtyCode, shopCode, itemNo, targetDom, tipDom)
        } else {
            var cmmdtyCode = targetDom.attr("cmmdtyCode");
            var shopCode = targetDom.attr("shopCode");
            add2Favorite(cmmdtyCode, shopCode, "", targetDom, tipDom)
        }
    }};
cloudCart1.deleteProduct = {tpl: {_delSelectedItem: "<div style='padding: 12px 8px 4px;width:156px;'><i class='tip-icon tip-warning mr5' style='vertical-align:middle;'></i><span>确定要删除选中商品吗？</span></div><div style='text-align:center;padding:5px 0;'><a href='javascript:;' class='cart-btn-ok cart-btn mr10'>确定</a><a href='javascript:;' class='cart-btn-cancel'>取消</a></div>", _delUnSelectedItem: "<p style='width: 160px;padding: 6px 8px;line-height: 15px;'><i class='tip-icon tip-warning mr5' style='vertical-align:middle;'></i>您还未选中要删除的商品</p>", _delFailItem: "<div style='padding: 12px 8px 4px;width:156px;'><i class='tip-icon tip-warning mr5' style='vertical-align:middle;'></i><span>确定要删除失效商品吗？</span></div><div style='text-align:center;padding:5px 0;'><a href='javascript:;' class='cart-btn-ok cart-btn mr10'>确定</a><a href='javascript:;' class='cart-btn-cancel'>取消</a></div>", _delAllItem: "<i class='tip-icon tip-info mr5'></i>确定要清空所有商品吗？<a href='javascript:;' class='cart-btn-ok cart-btn mr10'>确定</a><a href='javascript:;' class='cart-btn-cancel'>取消</a>", _delItem: "<div style='padding: 10px 12px 3px;width:146px;'><i class='tip-icon tip-warning mr5' style='vertical-align:middle;'></i><span>确定要删除此商品吗？</span></div><div style='text-align:center;padding:5px 0;'><a href='javascript:;' class='cart-btn-ok cart-btn mr10' name='icart1_goods_suredelate'>确定</a><a href='javascript:;' class='cart-btn-cancel' name='icart1_goods_canceldelate'>取消</a></div>", _loadItem: "<p class='message' style='width:134px;padding: 4px 8px;'><i class='l tip-icon loading-message mr5' style='padding-left:0;'></i>正在处理中，请稍后</p>", _delItemSp: "<i class='little-close-icon'></i><div style='padding: 18px 12px 3px;width:168px;' class='clearfix'><i class='tip-icon tip-warning mr5 l' style='vertical-align:middle;'></i><span class='l' style='width:144px;'>您可以选择移入到收藏夹，或删除商品？</span></div><div style='text-align:center;padding:5px 0 13px'><a href='javascript:;' class='cart-btn-ok cart-btn mr10' style='width:74px;' name='icart1_goods_shoucang'>移入收藏</a><a href='javascript:;' class='cart-btn-cancel' name='icart1_goods_shanchu2'>删除</a></div>"}, select: function(options, tipDom, targetDom, tipFn) {
        var $checks = $(".m-cart-body :checkbox.checkbox"), flag = false;
        $checks.each(function() {
            if ($(this).prop("checked") === true) {
                flag = true;
                return
            }
        });
        var message = "";
        if (flag == true) {
            message = this.tpl._delSelectedItem
        } else {
            message = this.tpl._delUnSelectedItem
        }
        tipDom.find(".ui-tooltip-inner").html(message)
    }, delSelect: function(options, tipDom, targetDom, tipFn) {
        probeAuthStatus(function() {
            cloudCart1.deleteProduct.delSelectItemProcess()
        }, function() {
            var loginSign = $("#loginSign").val();
            if (loginSign == "true") {
                ensureLogin(function() {
                    cloudCart1.deleteProduct.delSelectItemProcess()
                })
            } else {
                cloudCart1.deleteProduct.delSelectItemProcess()
            }
        })
    }, item: function(options, tipDom, targetDom, tipFn) {
        tipDom.find(".ui-tooltip-inner").html(this.tpl._delItem)
    }, delOne: function(options, tipDom, targetDom, tipFn, event) {
        tipDom.find(".ui-tooltip-inner").html(cloudCart1.deleteProduct.tpl._loadItem);
        if (!targetDom.hasClass("add-fav-already-click")) {
            targetDom.addClass("add-fav-already-click");
            targetDom.data("tipForce", 1).css({cursor: "not-allowed"})
        }
        tipFn.position(options, tipDom, targetDom);
        probeAuthStatus(function() {
            cloudCart1.deleteProduct.delItemProcess(targetDom, tipFn)
        }, function() {
            var loginSign = $("#loginSign").val();
            if (loginSign == "true") {
                ensureLogin(function() {
                    cloudCart1.deleteProduct.delItemProcess(targetDom, tipFn)
                })
            } else {
                cloudCart1.deleteProduct.delItemProcess(targetDom, tipFn)
            }
        })
    }, itemSp: function(options, tipDom, targetDom, tipFn) {
        tipDom.find(".ui-tooltip-inner").html(cloudCart1.deleteProduct.tpl._delItemSp)
    }, delOneSp: function(options, tipDom, targetDom, tipFn) {
        tipDom.find(".ui-tooltip-inner").html(cloudCart1.deleteProduct.tpl._loadItem);
        if (!targetDom.hasClass("add-fav-already-click")) {
            targetDom.addClass("add-fav-already-click");
            targetDom.data("tipForce", 1).css({cursor: "not-allowed"})
        }
        tipFn.position(options, tipDom, targetDom);
        probeAuthStatus(function() {
            cloudCart1.deleteProduct.delItemProcess(targetDom, tipFn)
        }, function() {
            var loginSign = $("#loginSign").val();
            if (loginSign == "true") {
                ensureLogin(function() {
                    cloudCart1.deleteProduct.delItemProcess(targetDom, tipFn)
                })
            } else {
                cloudCart1.deleteProduct.delItemProcess(targetDom, tipFn)
            }
        })
    }, delOneSpAddFav: function(options, tipDom, targetDom, tipFn) {
        tipDom.find(".ui-tooltip-inner").html(cloudCart1.deleteProduct.tpl._loadItem);
        tipFn.position(options, tipDom, targetDom);
        cloudCart1.addFavFn.run(options, tipDom, targetDom, tipFn)
    }, fail: function(options, tipDom, targetDom, tipFn) {
        tipDom.find(".ui-tooltip-inner").html(this.tpl._delFailItem)
    }, delFail: function(options, tipDom, targetDom, tipFn) {
        probeAuthStatus(function() {
            cloudCart1.deleteProduct.delFailItemProcess()
        }, function() {
            var loginSign = $("#loginSign").val();
            if (loginSign == "true") {
                ensureLogin(function() {
                    cloudCart1.deleteProduct.delFailItemProcess()
                })
            } else {
                cloudCart1.deleteProduct.delFailItemProcess()
            }
        })
    }, delItemProcess: function(selector, tipFn) {
        var itemNo = selector.parent().attr("itemNo");
        var oldStrucString = $("#oldStrucString").val();
        $.ajax({type: "get", dataType: "jsonp", url: "deleteCartOnePro.do", data: {cummtyItemNos: itemNo, oldStrucString: oldStrucString, loginSign: $("#loginSign").val()}, crossDomain: true, success: function(data) {
                if (data.result == "true" || data.result == "empty") {
                    cloudCart1.refreshPage(data);
                    tipFn.allHide();
                    var selectorParent = selector.parent();
                    var isOverdue = selectorParent.attr("isOverdue");
                    var cmmdtyCode = selectorParent.attr("cmmdtyCode");
                    var cmmdtyName = selectorParent.attr("cmmdtyName");
                    var shopCode = selectorParent.attr("shopCode");
                    var activityType = selectorParent.attr("activityType");
                    var activityId = selectorParent.attr("activityId");
                    var subActivityType = selectorParent.attr("subActivityType");
                    var cmmdtyArray = new Array();
                    if (isOverdue == 0) {
                        if (activityType == "04" || activityType == "05" || activityType == "06" || activityType == "12") {
                            var pSubs = selector.parents(".suit");
                            var headSub = pSubs.find(".item-header");
                            var itemSubs = pSubs.find(".item-sub");
                            var cmmdtyObject = new Object();
                            cmmdtyObject.cmmdtyCode = cmmdtyCode;
                            cmmdtyObject.cmmdtyName = cmmdtyName;
                            cmmdtyObject.shopCode = shopCode;
                            cmmdtyObject.activityType = activityType;
                            cmmdtyObject.activityId = activityId;
                            var cmmdtyQty = headSub.find(".td-amount input").val();
                            var cmmdtyAmount = headSub.find(".td-sum .sn-price em").html();
                            cmmdtyObject.cmmdtyQty = cmmdtyQty;
                            cmmdtyObject.cmmdtyAmount = cmmdtyAmount;
                            cmmdtyArray.push(cmmdtyObject);
                            $.each(itemSubs, function(n, itemSub) {
                                var cmmdtyName = $(itemSub).find(".item-title").html();
                                var cmmdtyCode = $(itemSub).find("#haoye").attr("cmmdtyCode");
                                var accessoryRelationID = $(itemSub).find(".td-op").attr("accessoryRelationID");
                                var cmmdtyQty = $(itemSub).find(".td-amount span").html();
                                var cmmdtyObject = new Object();
                                cmmdtyObject.cmmdtyCode = cmmdtyCode;
                                cmmdtyObject.cmmdtyName = cmmdtyName;
                                cmmdtyObject.shopCode = shopCode;
                                cmmdtyObject.cmmdtyQty = cmmdtyQty;
                                cmmdtyObject.accessoryRelationID = accessoryRelationID;
                                cmmdtyArray.push(cmmdtyObject)
                            });
                            var href = "";
                            if (activityType == "06") {
                                href = "<a href='http://" + snDomain + "/emall/xn_10052_10051_" + activityId + "_.html' title='" + cmmdtyArray[0].cmmdtyName + "'>" + cmmdtyArray[0].cmmdtyName + "</a>"
                            } else {
                                href = "<a href='" + productDomain + "/" + shopCode + "/" + cmmdtyCode.substring(9, 19) + ".html' title='" + cmmdtyArray[0].cmmdtyName + "'>" + cmmdtyArray[0].cmmdtyName + "</a>"
                            }
                            var _item1 = "<div class='repurchase-product clearfix'><span class='l repurchase-name'>" + href + "</span><span  class='l sn-price'><i>&yen;</i><em>" + cmmdtyArray[0].cmmdtyAmount + "</em></span><span class='l repurchase-num'>" + cmmdtyArray[0].cmmdtyQty + "</span><div class='l repurchase-tool'><a  href='javascript:;' class='repurchase-btn tip-common-click-fn-btn' data-tip-type='repurchase' data-placement='top' againBuyClickTag='" + againBuyClickTag + "'>撤销删除</a></span></div>";
                            cloudCart1.cartRemoved.addRepurchase(_item1);
                            cartRemovedObject[againBuyClickTag] = cmmdtyArray
                        } else {
                            if (selector.parent(".td-op").attr("cmmdtyType") != "warranty") {
                                var itemSub;
                                if (!activityType.length > 0) {
                                    itemSub = selector.parents(".item-sub")
                                } else {
                                    itemSub = selector.parents(".item-main")
                                }
                                var cmmdtyName = itemSub.find(".item-title").html();
                                var cmmdtyAmount = itemSub.find(".td-sum .sn-price em").html();
                                var cmmdtyQty;
                                if (activityType == "03" || activityType == "") {
                                    cmmdtyQty = itemSub.find(".td-amount span").html()
                                } else {
                                    cmmdtyQty = itemSub.find(".td-amount input").val()
                                }
                                if (!activityType.length > 0) {
                                    activityType = "01"
                                }
                                var cmmdtyObject = new Object();
                                cmmdtyObject.cmmdtyCode = cmmdtyCode;
                                cmmdtyObject.cmmdtyName = cmmdtyName;
                                cmmdtyObject.shopCode = shopCode;
                                cmmdtyObject.activityType = activityType;
                                cmmdtyObject.activityId = activityId;
                                cmmdtyObject.cmmdtyAmount = cmmdtyAmount;
                                cmmdtyObject.cmmdtyQty = cmmdtyQty;
                                cmmdtyArray.push(cmmdtyObject);
                                var href = "";
                                var fav = "";
                                if (subActivityType == "6") {
                                    href = "<a href='" + productDomain + "/mp/" + cmmdtyCode.substring(9, 19) + ".html' title='" + cmmdtyArray[0].cmmdtyName + "'>" + cmmdtyArray[0].cmmdtyName + "</a>"
                                } else {
                                    href = "<a href='" + productDomain + "/" + shopCode + "/" + cmmdtyCode.substring(9, 19) + ".html' title='" + cmmdtyArray[0].cmmdtyName + "'>" + cmmdtyArray[0].cmmdtyName + "</a>";
                                    fav = "<a  href='javascript:;' class='add-fav tip-common-click-fn-btn' data-tip-type='addFav' name='tempProduct' data-placement='top' cmmdtyCode='" + cmmdtyArray[0].cmmdtyCode + "' shopCode='" + cmmdtyArray[0].shopCode + "'>移入收藏</a>"
                                }
                                var _item1 = "<div class='repurchase-product clearfix'><span class='l repurchase-name'>" + href + "</span><span  class='l sn-price'><i>&yen;</i><em>" + cmmdtyArray[0].cmmdtyAmount + "</em></span><span class='l repurchase-num'>" + cmmdtyArray[0].cmmdtyQty + "</span><div class='l repurchase-tool'><a  href='javascript:;' class='repurchase-btn tip-common-click-fn-btn' data-tip-type='repurchase' data-placement='top' againBuyClickTag='" + againBuyClickTag + "'>撤销删除</a>" + fav + "</span></div>";
                                cloudCart1.cartRemoved.addRepurchase(_item1);
                                cartRemovedObject[againBuyClickTag] = cmmdtyArray
                            }
                        }
                        againBuyClickTag++
                    }
                } else {
                    selector.removeClass("add-fav-already-click");
                    selector.removeData("tipForce").css({cursor: "pointer"});
                    tipFn.allHide()
                }
            }, error: function(data) {
                selector.removeClass("add-fav-already-click");
                selector.removeData("tipForce").css({cursor: "pointer"});
                tipFn.allHide()
            }})
    }, delFailItemProcess: function() {
        $.ajax({type: "GET", url: "emptyCartOne.do", data: {emptyFlag: "2"}, dataType: "jsonp", crossDomain: true, success: function(data) {
                window.location.href = "cart.do"
            }})
    }, delSelectItemProcess: function() {
        var selectArrayItemNo = new Array();
        var selectCmmdtyArray = new Array();
        ($("input[type='checkbox']").each(function() {
            if ($(this).attr("checked") == "checked") {
                if (this.id != "" && this.id != "chooseAllCheckBox" && this.id != "chooseAllCheckBox2") {
                    var itemNo = this.id;
                    selectArrayItemNo.push(itemNo);
                    var cmmdtyArray = new Array();
                    var activityType = $(this).attr("activityType");
                    if (activityType == "04" || activityType == "05" || activityType == "06" || activityType == "12") {
                        var pSubs = $(this).parents(".suit");
                        var headSub = pSubs.find(".item-header");
                        var $selectorParent = headSub.find(".td-op a.del").parent();
                        var cmmdtyCode = $selectorParent.attr("cmmdtyCode");
                        var cmmdtyName = $selectorParent.attr("cmmdtyName");
                        var shopCode = $selectorParent.attr("shopCode");
                        var activityId = $selectorParent.attr("activityId");
                        var isOverdue = $selectorParent.attr("isOverdue");
                        var itemSubs = pSubs.find(".item-sub");
                        var cmmdtyQty = headSub.find(".td-amount input").val();
                        var cmmdtyObject = new Object();
                        cmmdtyObject.cmmdtyCode = cmmdtyCode;
                        cmmdtyObject.cmmdtyName = cmmdtyName;
                        cmmdtyObject.shopCode = shopCode;
                        cmmdtyObject.activityType = activityType;
                        cmmdtyObject.activityId = activityId;
                        cmmdtyObject.cmmdtyQty = cmmdtyQty;
                        var cmmdtyAmount = headSub.find(".td-sum .sn-price em").html();
                        cmmdtyObject.cmmdtyAmount = cmmdtyAmount;
                        if (isOverdue == "0") {
                            cmmdtyArray.push(cmmdtyObject);
                            $.each(itemSubs, function(n, itemSub) {
                                var cmmdtyName = $(itemSub).find(".item-title").html();
                                var cmmdtyCode = $(itemSub).find("#haoye").attr("cmmdtyCode");
                                var accessoryRelationID = $(itemSub).find(".item-pic input").attr("accessoryRelationID");
                                var cmmdtyAmount = $(itemSub).find(".td-sum .sn-price em").html();
                                var cmmdtyQty = $(itemSub).find(".td-amount span").html();
                                var cmmdtyObject = new Object();
                                cmmdtyObject.cmmdtyCode = cmmdtyCode;
                                cmmdtyObject.cmmdtyName = cmmdtyName;
                                cmmdtyObject.shopCode = shopCode;
                                cmmdtyObject.cmmdtyAmount = cmmdtyAmount;
                                cmmdtyObject.cmmdtyQty = cmmdtyQty;
                                cmmdtyObject.accessoryRelationID = accessoryRelationID;
                                cmmdtyArray.push(cmmdtyObject)
                            });
                            selectCmmdtyArray.push(cmmdtyArray)
                        }
                    } else {
                        var itemSub = $(this).parents(".item-main");
                        var accessoryRelationID = itemSub.find(".item-pic input").attr("accessoryRelationID");
                        var cmmdtyAmount = itemSub.find(".td-sum .sn-price em").html();
                        var $selectorParent = itemSub.find(".td-op a.del").parent();
                        var cmmdtyCode = $selectorParent.attr("cmmdtyCode");
                        var cmmdtyName = $selectorParent.attr("cmmdtyName");
                        var shopCode = $selectorParent.attr("shopCode");
                        var activityType = $selectorParent.attr("activityType");
                        var activityId = $selectorParent.attr("activityId");
                        var isOverdue = $selectorParent.attr("isOverdue");
                        var subActivityType = $selectorParent.attr("subActivityType");
                        var cmmdtyQty;
                        if (activityType == "03" || activityType == "") {
                            cmmdtyQty = itemSub.find(".td-amount span").html()
                        } else {
                            cmmdtyQty = itemSub.find(".td-amount input").val()
                        }
                        if (isOverdue == "0") {
                            var cmmdtyObject = new Object();
                            cmmdtyObject.cmmdtyCode = cmmdtyCode;
                            cmmdtyObject.cmmdtyName = cmmdtyName;
                            cmmdtyObject.shopCode = shopCode;
                            cmmdtyObject.activityType = activityType;
                            cmmdtyObject.activityId = activityId;
                            cmmdtyObject.cmmdtyAmount = cmmdtyAmount;
                            cmmdtyObject.cmmdtyQty = cmmdtyQty;
                            cmmdtyObject.subActivityType = subActivityType;
                            cmmdtyObject.accessoryRelationID = accessoryRelationID;
                            cmmdtyArray.push(cmmdtyObject);
                            selectCmmdtyArray.push(cmmdtyArray)
                        }
                    }
                }
            }
        }));
        $.ajax({type: "get", url: "deleteCartOnePro.do", dataType: "jsonp", crossDomain: true, data: {cummtyItemNos: selectArrayItemNo.toString(), loginSign: $("#loginSign").val()}, success: function(data) {
                if (data.result == "true" || data.result == "empty") {
                    cloudCart1.refreshPage(data);
                    $.each(selectCmmdtyArray, function(n, cmmdtyArray) {
                        if (cmmdtyArray.length > 1) {
                            var href = "";
                            if (cmmdtyArray[0].activityType == "06") {
                                href = "<a href='http://" + snDomain + "/emall/xn_10052_10051_" + cmmdtyArray[0].activityId + "_.html' title='" + cmmdtyArray[0].cmmdtyName + "'>" + cmmdtyArray[0].cmmdtyName + "</a>"
                            } else {
                                href = "<a href='" + productDomain + "/" + cmmdtyArray[0].shopCode + "/" + cmmdtyArray[0].cmmdtyCode.substring(9, 19) + ".html' title='" + cmmdtyArray[0].cmmdtyName + "'>" + cmmdtyArray[0].cmmdtyName + "</a>"
                            }
                            var _item1 = "<div class='repurchase-product clearfix'><span class='l repurchase-name'>" + href + "</span><span  class='l sn-price'><i>&yen;</i><em>" + cmmdtyArray[0].cmmdtyAmount + "</em></span><span class='l repurchase-num'>" + cmmdtyArray[0].cmmdtyQty + "</span><div class='l repurchase-tool'><a  href='javascript:;' class='repurchase-btn tip-common-click-fn-btn' data-tip-type='repurchase' data-placement='top' againBuyClickTag='" + againBuyClickTag + "'>撤销删除</a></span></div>";
                            cloudCart1.cartRemoved.addRepurchase(_item1);
                            cartRemovedObject[againBuyClickTag] = cmmdtyArray
                        } else {
                            var href = "";
                            var fav = "";
                            if (cmmdtyArray[0].subActivityType == "6") {
                                href = "<a href='" + productDomain + "/mp/" + cmmdtyArray[0].cmmdtyCode.substring(9, 19) + ".html' title='" + cmmdtyArray[0].cmmdtyName + "'>" + cmmdtyArray[0].cmmdtyName + "</a>"
                            } else {
                                href = "<a href='" + productDomain + "/" + cmmdtyArray[0].shopCode + "/" + cmmdtyArray[0].cmmdtyCode.substring(9, 19) + ".html' title='" + cmmdtyArray[0].cmmdtyName + "'>" + cmmdtyArray[0].cmmdtyName + "</a>";
                                fav = "<a  href='javascript:;' class='add-fav tip-common-click-fn-btn' data-tip-type='addFav' name='tempProduct' data-placement='top' cmmdtyCode='" + cmmdtyArray[0].cmmdtyCode + "' shopCode='" + cmmdtyArray[0].shopCode + "'>移入收藏</a>"
                            }
                            var _item1 = "<div class='repurchase-product clearfix'><span class='l repurchase-name'>" + href + "</span><span  class='l sn-price'><i>&yen;</i><em>" + cmmdtyArray[0].cmmdtyAmount + "</em></span><span class='l repurchase-num'>" + cmmdtyArray[0].cmmdtyQty + "</span><div class='l repurchase-tool'><a  href='javascript:;' class='repurchase-btn tip-common-click-fn-btn' data-tip-type='repurchase' data-placement='top' againBuyClickTag='" + againBuyClickTag + "'>撤销删除</a>" + fav + "</span></div>";
                            cloudCart1.cartRemoved.addRepurchase(_item1);
                            cartRemovedObject[againBuyClickTag] = cmmdtyArray
                        }
                        againBuyClickTag++
                    })
                }
            }, error: function(data) {
                window.location.href = "cart.do"
            }})
    }};
cloudCart1.allStoreDiscount = {init: function() {
        $(document).on("click", ".all-store-discount-box .more-content", function() {
            var dTtoolAreaContentBox = $(this).closest(".all-store-discount-box").find(".tool-area-content-box");
            if ($(this).hasClass("arrow-down")) {
                $(this).removeClass("arrow-down").addClass("arrow-up").html('收起部分活动<i class="arrow"></i>');
                dTtoolAreaContentBox.css("height", dTtoolAreaContentBox.find(".all-store-discount-content-box").length * 26)
            } else {
                $(this).removeClass("arrow-up").addClass("arrow-down").html('显示全部活动<i class="arrow"></i>');
                dTtoolAreaContentBox.css("height", "78px")
            }
        })
    }};
cloudCart1.tipfn = {tipBind: function() {
        st.tooltipNew.run({selector: ".coupon-bg", type: "click", node: "#coupon-1", placement: "bottom", closeBtn: 1, openFn: function(options, tipDom, targetDom, tipFn) {
                targetDom.addClass("coupon-bg-acitive")
            }, closeFn: function(tipDom, targetDom, tipFn) {
                targetDom.removeClass("coupon-bg-acitive")
            }});
        st.tooltipNew.run({selector: ".meet-cut-btn", type: "click", placement: "bottom", openFn: function(options, tipDom, targetDom, tipFn) {
                tipDom.find(".ui-tooltip-inner").html(cloudCart1.cartRemoved.tpl.tipLoad);
                if (targetDom.data().meetCutType == "1") {
                    cloudCart1.gatherOrder.meetCutFn(options, tipDom, targetDom, tipFn)
                } else {
                    cloudCart1.gatherOrder.cMeetCutFn(options, tipDom, targetDom, tipFn)
                }
            }, closeFn: function(tipDom, targetDom, tipFn) {
            }});
        st.tooltipNew.run({selector: ".sunshine-btn", type: "click", node: "#sun-package-1", placement: "bottom", flag: "sunshine-tooltip", closeBtn: 1, openFn: function(options, tipDom, targetDom, tipFn) {
                if (tipDom.find(".singleItem-wrap").length <= 1) {
                    tipDom.closest(".sunshine-tooltip").addClass("sunshine-tooltip-only");
                    var dSunPackageSelect = tipDom.find(".sun-package-select");
                    dSunPackageSelect.css({width: dSunPackageSelect.find(".singleItem-wrap-box").outerWidth()})
                }
                cloudCart1.sunPackage.init(tipDom);
                tipDom.find(".cart-btn-ok").one("click", function() {
                    cloudCart1.sunPackage.getData()
                });
                tipDom.find(".cart-btn-cancel").one("click", function() {
                    st.tooltipNew.allHide()
                })
            }, closeFn: function(tipDom, targetDom, tipFn) {
                var dBtn = tipDom.find(".cart-btn-ok, .cart-btn-cancel");
                if (dBtn > 0) {
                    dBtn.unbind("click")
                }
                dBtn = null
            }});
        st.tooltipNew.run({selector: ".toolbar-box .now-select-goods", type: "click", node: "#selected-pro", placement: "bottom", openFn: function(options, tipDom, targetDom, tipFn) {
                var li = tipDom.find(".list");
                var liLen = li.length;
                if (liLen == 0) {
                    return
                }
                var listBox = $(".ui-tooltip .ui-had-buy"), listBoxW, tipW;
                if (liLen <= 8) {
                    listBoxW = 80 * liLen + (liLen - 1) * 10;
                    listBox.css("width", listBoxW);
                    li.last().addClass("last");
                    tipW = listBoxW + 22 + "px"
                } else {
                    listBox.addClass("ui-had-buy-slide");
                    cartListLoop.listloop({wrap: ".ui-tooltip .J-selected-pro", loopBox: ".list-box", step: {wide: 8, narrow: 8}, scrollWidth: {wide: 720, narrow: 720}, hasLabel: false, isRandom: false});
                    tipW = "778px"
                }
                if (cloudCart1.ieVesion(6) || cloudCart1.ieVesion(7)) {
                    targetDom.data("style", "{'width': '" + tipW + "'}");
                    tipFn.position(options, tipDom, targetDom)
                }
                targetDom.find(".alchose-span").removeClass("alchose-up").addClass("alchose-down")
            }, closeFn: function(tipDom, targetDom, tipFn) {
                targetDom.find(".alchose-span").removeClass("alchose-down").addClass("alchose-up")
            }});
        st.tooltipNew.run({selector: ".tip-common-click-fn-btn", type: "click", placement: "top", openFn: function(options, tipDom, targetDom, tipFn) {
                var thisData = targetDom.data();
                var okFn, cancelFn;
                if (typeof thisData.tipType != "undefined" && thisData.tipType) {
                    switch (thisData.tipType) {
                        case"addFav":
                            cloudCart1.addFavFn.run(options, tipDom, targetDom, tipFn);
                            break;
                        case"delOne":
                            cloudCart1.deleteProduct.item(options, tipDom, targetDom, tipFn);
                            okFn = cloudCart1.deleteProduct.delOne;
                            break;
                        case"delOneSp":
                            cloudCart1.deleteProduct.itemSp(options, tipDom, targetDom, tipFn);
                            okFn = cloudCart1.deleteProduct.delOneSpAddFav;
                            cancelFn = cloudCart1.deleteProduct.delOneSp;
                            tipDom.find(".little-close-icon").one("click", function(e) {
                                tipFn.allHide()
                            });
                            break;
                        case"delSelect":
                            cloudCart1.deleteProduct.select(options, tipDom, targetDom, tipFn);
                            okFn = cloudCart1.deleteProduct.delSelect;
                            break;
                        case"delFail":
                            cloudCart1.deleteProduct.fail(options, tipDom, targetDom, tipFn);
                            okFn = cloudCart1.deleteProduct.delFail;
                            break;
                        case"repurchase":
                            cloudCart1.cartRemoved.addCart(options, tipDom, targetDom, tipFn);
                            break
                        }
                }
                if (okFn) {
                    tipDom.find(".cart-btn-ok").one("click", function(event) {
                        event.preventDefault();
                        event.stopPropagation();
                        okFn && okFn(options, tipDom, targetDom, tipFn)
                    });
                    tipDom.find(".cart-btn-cancel").one("click", function(e) {
                        if (cancelFn) {
                            e.stopPropagation();
                            cancelFn(options, tipDom, targetDom, tipFn)
                        } else {
                            tipFn.allHide()
                        }
                    })
                }
            }, closeFn: function(tipDom, targetDom, tipFn) {
                var dBtn = tipDom.find(".cart-btn-ok, .cart-btn-cancel");
                if (dBtn > 0) {
                    dBtn.unbind("click")
                }
                dBtn = null
            }});
        st.tooltipNew.run({selector: ".tip-common-hover-fn-btn", type: "hover", placement: "bottom", openFn: function(options, tipDom, targetDom, tipFn) {
            }, closeFn: function(tipDom, targetDom, tipFn) {
            }});
        st.tooltipNew.run({selector: ".cart-toolbar .checkout-disable-tip", type: "hover", placement: "top", wrapper: ".cart-checkout", flag: "sp-cart-checkout", openFn: function(options, tipDom, targetDom, tipFn) {
                tipDom.find(".ui-tooltip-inner").html('<p style="position:relative;z-index:2;padding: 5px 11px;">请至少选择一件商品，再去结算</p>')
            }, closeFn: function(tipDom, targetDom, tipFn) {
            }});
        st.tooltipNew.run({selector: ".cart-toolbar .checkout-subsidy-tip", type: "hover", placement: "top", wrapper: ".cart-checkout", flag: "sp-cart-checkout-subsidy", openFn: function(options, tipDom, targetDom, tipFn) {
                tipDom.find(".ui-tooltip-inner").html('<p style="position:relative;z-index:2;padding: 5px 11px;">您的订单中包含节能补贴商品，建议分开结算</p>')
            }, closeFn: function(tipDom, targetDom, tipFn) {
            }});
        st.tooltipNew.run({selector: ".all-store-discount-box .tip-btn", type: "click", placement: "bottom", flag: "all-store-discount-tip", openFn: function(options, tipDom, targetDom, tipFn) {
                var li = tipDom.find(".list");
                var liLen = li.length;
                if (liLen == 0) {
                    return
                }
                var listBox = tipDom.find(".ui-discount-pro"), listBoxW, tipW;
                if (liLen <= 5) {
                    tipDom.addClass("all-store-discount-tip-style" + liLen);
                    listBoxW = 80 * liLen + (liLen - 1) * 10;
                    listBox.css("width", listBoxW);
                    li.last().addClass("last");
                    tipW = listBoxW + 22 + "px"
                } else {
                    tipDom.addClass("all-store-discount-tip-style6");
                    listBox.addClass("ui-discount-pro-slide");
                    cartListLoop.listloop({wrap: ".ui-tooltip .J-discount-pro", loopBox: ".list-box", step: {wide: 5, narrow: 5}, scrollWidth: {wide: 441, narrow: 441}, hasLabel: false, isRandom: false});
                    tipW = "509px"
                }
                if (cloudCart1.ieVesion(6) || cloudCart1.ieVesion(7)) {
                    targetDom.data("style", "{'width': '" + tipW + "'}");
                    tipFn.position(options, tipDom, targetDom)
                }
                targetDom.find(".all-store-discount-icon").toggleClass("all-store-discount-icon-down")
            }, closeFn: function(tipDom, targetDom, tipFn) {
                targetDom.find(".all-store-discount-icon").toggleClass("all-store-discount-icon-down")
            }});
        st.tooltipNew.run({selector: ".m-lion-dialog .limit-help", type: "hover", placement: "bottom", wrapper: ".m-lion-dialog .abroad-h3-1", node: "#abroadTipDom", flag: "abroad-limit-tip", openFn: function(options, tipDom, targetDom, tipFn) {
            }, closeFn: function(tipDom, targetDom, tipFn) {
            }})
    }, resetBtn: function(domArrClass, domClass) {
        var dArr = $(domArrClass);
        dArr.removeData("tipForce").css({cursor: "pointer"});
        dArr.each(function() {
            if ($(this).hasClass(domClass)) {
                var targetNum = $(this).data("tipNum");
                $(this).removeData("tipNum").removeClass(domClass);
                $(this).removeData("tipShow");
                $(".ui-tooltip[data-tip-targetnum = " + targetNum + "]").remove();
                return
            }
        });
        dArr = null
    }};
cloudCart1.ieVesion = function(ver) {
    var b = document.createElement("b");
    b.innerHTML = "<!--[if IE " + ver + "]><i></i><![endif]-->";
    return b.getElementsByTagName("i").length === 1
};
function recommendInit() {
    var lastCmmdtyCode = $("#lastCmmdtyCode").val();
    var secondCmmdtyCode = $("#secondCmmdtyCode").val();
    var cityId = null;
    var snCity = $.cookie("SN_CITY");
    if (null != snCity) {
        var tempCityArray = snCity.split("_");
        if (tempCityArray.length > 2) {
            cityId = tempCityArray[1]
        }
    }
    var custNum = $.cookie("custno");
    var visiterId = $.cookie("_snma");
    var arr = new Array();
    if (visiterId != undefined && visiterId != "") {
        arr = visiterId.split("|")
    }
    var c = "";
    if (typeof arr[1] != "undefined" && arr[1] && arr[1] != "undefined") {
        c = c + arr[1]
    }
    if (cityId == null) {
        cityId = "010"
    }
    sn.cityId = cityId;
    var recommendURL = "";
    var recommendDomain = "http://tuijian.suning.com/recommend-portal/recommend/paramsBiz.jsonp?";
    var parameters = "";
    if ($(".chk-item").length == 0) {
        var parameter = [];
        var partnumbers = getCookie("smhst");
        if (null != partnumbers) {
            var count = 0;
            var goods = partnumbers.split("a");
            $(goods).each(function() {
                if (count > 4) {
                    return false
                }
                parameter.push("parameters=000000000" + this);
                count++
            });
            parameters = parameter.join("&")
        }
    } else {
        var parameter = [];
        if (typeof lastCmmdtyCode != "undefined" && lastCmmdtyCode && lastCmmdtyCode != "undefined") {
            parameter.push("parameters=" + lastCmmdtyCode);
            if (typeof secondCmmdtyCode != "undefined" && secondCmmdtyCode && secondCmmdtyCode != "undefined") {
                parameter.push("parameters=" + secondCmmdtyCode)
            }
        }
        parameters = parameter.join("&")
    }
    if (parameters == "") {
        parameters = "parameters="
    }
    var u = "&u=";
    if (typeof custNum != "undefined" && custNum && custNum != "undefined") {
        u = u + custNum
    }
    if ($(".chk-item").length != 0) {
        recommendURL = recommendDomain + parameters + "&cityId=" + cityId + "&sceneIds=10-23&count=8" + u + "&c=" + c + "&flag="
    } else {
        recommendURL = recommendDomain + parameters + "&cityId=" + cityId + "&sceneIds=10-23&count=8" + u + "&c=" + c + "&flag=1"
    }
    $.ajax({type: "get", url: recommendURL, dataType: "jsonp", cache: true, jsonpCallback: "jsonpCallback", success: function() {
        }})
}
function getItemLi(a, b, c, d, e, f, g, h, i) {
    var productDomain = "http://product.suning.com";
    var itemLi = [], positionIndex = (Math.floor((b - 1) / 4) + 1) + "-" + (b % 4 == 0 ? 4 : b % 4);
    var imgUrl = $("#imgUrl").val();
    itemLi.push('<li class="product-box" >');
    itemLi.push('<a name="cart1_' + d.substring(9, 19) + "_rectjsp_" + positionIndex + "_p_" + i + "_" + d.substring(9, 19) + "_" + h + '" href=' + productDomain + "/" + i + "/" + d.substring(9, 19) + ".html?src=cart1_" + d.substring(9, 19) + "_rectjsp_" + positionIndex + "_p_" + i + "_" + d.substring(9, 19) + "_" + h + ' target="_blank"><img src="' + imgUrl + "/000000000" + d.substring(9, 14) + "/" + d + "/" + d + '_ls1.jpg" class="product-img"/></a>');
    itemLi.push("<p><a href=" + productDomain + "/" + i + "/" + d.substring(9, 19) + ".html?src=cart1_" + d.substring(9, 19) + "_rectjsp_" + positionIndex + "_c_" + i + "_" + d.substring(9, 19) + "_" + h + ' class="product-content" target="_blank" id="baoguang_rectjsp_' + positionIndex + "_" + i + "_" + d.substring(9, 19) + "_" + h + '" name="cart1_' + d.substring(9, 19) + "_rectjsp_" + positionIndex + "_c_" + i + "_" + d.substring(9, 19) + "_" + h + '">' + e + "<b>" + f + "</b></a></p>");
    itemLi.push('<p class="product-price sn-price clearfix"><i class="price-icon l">&yen;</i><em class="price-big l">' + g.split(".")[0] + '</em><em class="price-small l">.' + g.split(".")[1] + "</em></p>");
    itemLi.push('<em class="add-cart" cmmdtyCode="' + d + '" shopCode="' + i + '" name="cart1_' + d.substring(9, 19) + "_rectjsp_" + positionIndex + "_b_" + i + "_" + d.substring(9, 19) + "_" + h + '"></em>');
    itemLi.push("</li>");
    return itemLi.join("")
}
function jsonpCallback(json) {
    var count = 0;
    $.each(json.sugGoods[0], function(k, v) {
        var items = [], skus = [];
        if (k == "skus") {
            skus = v;
            var skuLength = skus.length;
            if (skus.length != 0) {
                $.each(skus, function() {
                    count++;
                    items.push(getItemLi(skuLength, count, this.sugGoodsId, this.sugGoodsCode, this.sugGoodsName, this.sugGoodsDes, this.price, this.handwork, this.vendorId))
                })
            }
            $("#recommendDiv").append(items.join(""));
            cloudCart1.runAnalyseExpo()
        }
    })
}
function recommendAddCart(sourcePageType, activityType, activityId, cmmdtyCode, shopCode, cmmdtyQty, warrantyCmmdtyCodeArray, obj) {
    addCart(sourcePageType, activityType, activityId, cmmdtyCode, shopCode, cmmdtyQty, warrantyCmmdtyCodeArray, "", "", recommendCallBack);
    function recommendCallBack(data) {
        var errorList = data.addCartErrorList;
        if (data.isSuccess == "Y") {
            $.ajax({type: "GET", dataType: "jsonp", url: "addCallBack.do", crossDomain: true, success: function(data) {
                    if (data.result == "true" && data.html != "") {
                        cloudCart1.refreshPage(data)
                    }
                }});
            cloudCart1.recommendFn.successFn(obj)
        } else {
            if (errorList.length > 0) {
                if (errorList[0].errorCode == "002") {
                    cloudCart1.recommendFn.errorFn(obj, "超过购物车50件限制")
                } else {
                    if (errorList[0].errorCode == "003") {
                        cloudCart1.recommendFn.errorFn(obj, "此商品暂不销售")
                    } else {
                        if (errorList[0].errorCode == "004") {
                            cloudCart1.recommendFn.errorFn(obj, "此商品无货")
                        } else {
                            cloudCart1.recommendFn.errorFn(obj, "请前往详情页面购买")
                        }
                    }
                }
            } else {
                cloudCart1.recommendFn.errorFn(obj, "请前往详情页面购买")
            }
        }
    }}
function favoriteInit() {
    var cityId = null;
    var snCity = $.cookie("SN_CITY");
    if (null != snCity) {
        var tempCityArray = snCity.split("_");
        if (tempCityArray.length > 2) {
            cityId = tempCityArray[1]
        }
    }
    if (typeof cityId == "undefined" || !cityId || cityId == "undefined") {
        return
    }
    $("#myFavoriteProduct").show();
    $("#favoriteDiv").html("");
    probeAuthStatus(function() {
        mySuningFav.getProductFavToCartJsonp(cityId, 10, productFavoriteCallBack)
    }, function() {
        $("#favoriteDiv").html("");
        $("#myFavoriteProduct").hide()
    })
}
function productFavoriteCallBack(productInfoList) {
    var imgUrl = $("#imgUrl").val();
    var itemLi = [];
    if (typeof productInfoList != "undefined" && productInfoList && productInfoList != "undefined" && productInfoList.length != 0) {
        $.each(productInfoList, function() {
            itemLi.push('<li class="product-box" >');
            itemLi.push('<a name="icart1_recom_collectpic" href=' + productDomain + "/" + this.shopId + "/" + this.partnumber.substring(9, 19) + '.html  target="_blank"><img src="' + imgUrl + "/000000000" + this.partnumber.substring(9, 14) + "/" + this.partnumber + "/" + this.partnumber + '_ls1.jpg" class="product-img"/></a>');
            itemLi.push("<p><a href=" + productDomain + "/" + this.shopId + "/" + this.partnumber.substring(9, 19) + '.html  class="product-content" target="_blank"  name="icart1_recom_collectname">' + this.productName + "</a></p>");
            itemLi.push('<p class="product-price sn-price clearfix"><i class="price-icon l">&yen;</i><em class="price-big l">' + this.price.split(".")[0] + '</em><em class="price-small l">.' + this.price.split(".")[1] + "</em></p>");
            itemLi.push('<em class="add-cart" cmmdtyCode="' + this.partnumber + '" shopCode="' + this.shopId + '" name="icart1_recom_collectbuy"></em>');
            itemLi.push("</li>");
            itemLi.join("")
        });
        $("#favoriteDiv").append(itemLi.join(""))
    } else {
        $("#favoriteDiv").html("");
        $("#myFavoriteProduct").hide()
    }
}
;
function gather_jsonpCallback(json, options, tipDom, targetDom, tipFn) {
    var region = json.sugGoods[0].skus;
    var size = region.length;
    if (size == 0) {
        tipDom.find(".ui-tooltip-inner").html(cloudCart1.cartRemoved.tpl.tipEmpty);
        return
    }
    var html = '<ul class="list">';
    for (var i = 0; i < size; i++) {
        var index = i + 1;
        html += getItemLi_coudan(region[i].sugGoodsId, index, region[i].sugGoodsCode, region[i].sugGoodsName, region[i].sugGoodsDes, region[i].price, region[i].handwork, region[i].vendorId);
        if ((i + 1) % 9 == 0 && (i + 1) != size) {
            html += "</ul>";
            html += '<ul class="list">'
        }
    }
    html += "</ul>";
    var innerHtml = $($(targetDom.data().clonenode).clone().html());
    innerHtml.find(".list-box").html(html);
    tipDom.addClass("sp-meet-cut-select");
    tipDom.find(".ui-tooltip-inner").html(innerHtml);
    tipFn.position(options, tipDom, targetDom);
    var dataListloop = targetDom.data("listloop");
    cartListLoop.listloop({wrap: ".ui-tooltip ." + dataListloop, loopBox: ".list-box", step: {wide: 1, narrow: 1}, scrollWidth: {wide: 639, narrow: 639}, hasLabel: true, isRandom: false, hoverArr: true});
    cloudCart1.runAnalyseExpo()
}
function getItemLi_coudan(a, b, c, d, e, f, g, h) {
    var imgUrl = $("#imgUrl").val();
    var productDomain = "http://product.suning.com";
    var itemLi = [];
    var positionIndex = (Math.floor((b - 1) / 9) + 1);
    var index = b - (positionIndex - 1) * 9;
    positionIndex = positionIndex + "-" + index;
    itemLi.push("<li>");
    itemLi.push('<div class="cart-checkbox">');
    itemLi.push('<input type="checkbox"  class="checkbox chk-item" id="J_CheckBox_hg' + b + '" cmmdtyCode="' + c + '" shopCode="' + h + '" cmmdtyName="' + d + '" salesPrice="' + f + '">');
    itemLi.push('<label for="J_CheckBox_hg' + b + '"></label>');
    itemLi.push("</div>");
    itemLi.push('<div class="item-pic">');
    itemLi.push('<a name="cart1_' + c.substring(9, 19) + "_reccd_" + positionIndex + "_p_" + h + "_" + c.substring(9, 19) + "_" + g + '" href=' + productDomain + "/" + h + "/" + c.substring(9, 19) + ".html?src=cart1_" + c.substring(9, 19) + "_reccd_" + positionIndex + "_p_" + h + "_" + c.substring(9, 19) + "_" + g + ' target="_blank"><img src="' + imgUrl + "/000000000" + c.substring(9, 14) + "/" + c + "/" + c + '_ls1.jpg" /></a>');
    itemLi.push("</div>");
    itemLi.push('<div class="item-info">');
    itemLi.push('<a href="' + productDomain + "/" + h + "/" + c.substring(9, 19) + ".html?src=cart1_" + c.substring(9, 19) + "_reccd_" + positionIndex + "_c_" + h + "_" + c.substring(9, 19) + "_" + g + '" class="item-title" target="_blank" id="baoguang_reccd_' + positionIndex + "_" + h + "_" + c.substring(9, 19) + "_" + g + '" title="' + d + '" name="cart1_' + c.substring(9, 19) + "_reccd_" + positionIndex + "_c_" + h + "_" + c.substring(9, 19) + "_" + g + '">' + d + "</a>");
    itemLi.push('<b class="sn-price"><i>&yen;</i>' + f + "</em></b>");
    itemLi.push("</div>");
    itemLi.push("</li>");
    return itemLi.join("")
}
function cgather_jsonpCallback(json, options, tipDom, targetDom, tipFn) {
    var region = json.sugGoods[0].skus;
    var size = region.length;
    if (size == 0) {
        tipDom.find(".ui-tooltip-inner").html(cloudCart1.cartRemoved.tpl.tipEmpty);
        return
    }
    var html = '<ul class="list">';
    for (var i = 0; i < size; i++) {
        var index = i + 1;
        html += cgetItemLi_coudan(region[i].sugGoodsId, index, region[i].sugGoodsCode, region[i].sugGoodsName, region[i].sugGoodsDes, region[i].price, region[i].handwork, region[i].vendorId);
        if ((i + 1) % 9 == 0 && (i + 1) != size) {
            html += "</ul>";
            html += '<ul class="list">'
        }
    }
    html += "</ul>";
    var innerHtml = $($(targetDom.data().clonenode).clone().html());
    innerHtml.find(".list-box").html(html);
    tipDom.addClass("sp-meet-cut-select");
    tipDom.find(".ui-tooltip-inner").html(innerHtml);
    tipFn.position(options, tipDom, targetDom);
    var dataListloop = targetDom.data("listloop");
    cartListLoop.listloop({wrap: ".ui-tooltip ." + dataListloop, loopBox: ".list-box", step: {wide: 1, narrow: 1}, scrollWidth: {wide: 639, narrow: 639}, hasLabel: true, isRandom: false, hoverArr: true});
    cloudCart1.runAnalyseExpo()
}
function cgetItemLi_coudan(a, b, c, d, e, f, g, h) {
    var imgUrl = $("#imgUrl").val();
    var productDomain = "http://product.suning.com";
    var itemLi = [];
    var positionIndex = (Math.floor((b - 1) / 9) + 1);
    var index = b - (positionIndex - 1) * 9;
    positionIndex = positionIndex + "-" + index;
    itemLi.push("<li>");
    itemLi.push('<div class="cart-checkbox">');
    itemLi.push('<input type="checkbox"  class="checkbox chk-item" id="J_CheckBox_hg' + b + '" cmmdtyCode="' + c + '" shopCode="' + h + '" cmmdtyName="' + d + '" salesPrice="' + f + '">');
    itemLi.push('<label for="J_CheckBox_hg' + b + '"></label>');
    itemLi.push("</div>");
    itemLi.push('<div class="item-pic">');
    itemLi.push('<a name="cart1_' + c.substring(9, 19) + "_recccd_" + positionIndex + "_p_" + h + "_" + c.substring(9, 19) + "_" + g + '" href=' + productDomain + "/" + h + "/" + c.substring(9, 19) + ".html?src=cart1_" + c.substring(9, 19) + "_recccd_" + positionIndex + "_p_" + h + "_" + c.substring(9, 19) + "_" + g + ' target="_blank"><img src="' + imgUrl + "/000000000" + c.substring(9, 14) + "/" + c + "/" + c + '_ls1.jpg" /></a>');
    itemLi.push("</div>");
    itemLi.push('<div class="item-info">');
    itemLi.push('<a href="' + productDomain + "/" + h + "/" + c.substring(9, 19) + ".html?src=cart1_" + c.substring(9, 19) + "_recccd_" + positionIndex + "_c_" + h + "_" + c.substring(9, 19) + "_" + g + '" class="item-title" target="_blank" id="baoguang_recccd_' + positionIndex + "_" + h + "_" + c.substring(9, 19) + "_" + g + '" title="' + d + '" name="cart1_' + c.substring(9, 19) + "_recccd_" + positionIndex + "_c_" + h + "_" + c.substring(9, 19) + "_" + g + '">' + d + "</a>");
    itemLi.push('<b class="sn-price"><i>&yen;</i>' + f + "</em></b>");
    itemLi.push("</div>");
    itemLi.push("</li>");
    return itemLi.join("")
}
function gatherAddcart(cart) {
    addCartBatch(cart, gatherCallBack);
    function gatherCallBack(data) {
        if (data.isSuccess == "Y") {
            $.ajax({type: "GET", dataType: "jsonp", url: "addCallBack.do", crossDomain: true, success: function(data) {
                    if (data.result == "true" && data.html != "") {
                        cloudCart1.refreshPage(data);
                        st.tooltipNew.allHide()
                    }
                }})
        } else {
            var imgUrl = $("#imgUrl").val();
            var productDomain = "http://product.suning.com";
            var errorList = data.addCartErrorList;
            var itemLi = "";
            var isHasOverCart = false;
            itemLi += '<div class="limit-buy J-dialog-limit01">';
            itemLi += '<p class="tips"><i class="tip-icon tip-warning-24"></i>以下商品暂无法购买</p><a href="javascript:void(0);" class="arr prev"></a><a href="javascript:void(0);" class="arr next"></a><div class="list-pro-box "><ul class="list-box">';
            for (var j = 0; j < errorList.length; j++) {
                if (errorList[j].errorCode == "002") {
                    itemLi = '<div class="system-busy"><div class="poor-lion clearfix"><i class="poor"></i><div class="tip-opt"><p>购物车放满50件商品啦</p><a href="javascript:void(0);" class="cart-btn close">知道了</a></div></div></div>';
                    isHasOverCart = true;
                    break
                } else {
                    if (errorList[j].cmmdtyCode != "") {
                        itemLi += '<li class="list"><a target="_blank"  name="icart1_opeerror_pic"  href="' + productDomain + "/" + errorList[j].shopCode + "/" + errorList[j].cmmdtyCode.substr(9, 19) + '.html"><img alt="' + cmmdtyObject[errorList[j].cmmdtyCode] + '" src="' + imgUrl + "/" + errorList[j].cmmdtyCode.substr(0, 14) + "/" + errorList[j].cmmdtyCode + "/" + errorList[j].cmmdtyCode + '_ls1.jpg"></a><p class="pro-name"><a class="item-title" name="icart1_opeerror_name" title="' + cmmdtyObject[errorList[j].cmmdtyCode] + '" target="_blank"  href="' + productDomain + "/" + errorList[j].shopCode + "/" + errorList[j].cmmdtyCode.substr(9, 19) + '.html">' + cmmdtyObject[errorList[j].cmmdtyCode] + "</a></p></li>"
                    }
                }
            }
            if (!isHasOverCart) {
                itemLi += '</ul></div><a href="javascript:void(0)" onclick="cloudCart1.reload();return false;" class="close">知道了</a></div>'
            }
            $.mLionDialog({css: {width: "436px"}, title: "温馨提示", http: function(e, o) {
                    e.find(".content").html(itemLi);
                    var proLen = $(".limit-buy .list-box li").length, arr = $(".limit-buy .arr");
                    if (proLen >= 2) {
                        cartListLoop.listloop({wrap: ".limit-buy", loopBox: ".list-box", step: {wide: 2, narrow: 2}, scrollWidth: {wide: 304, narrow: 304}, hasLabel: false, isRandom: false})
                    } else {
                        if (proLen == 1) {
                            $(".limit-buy .list-box li").addClass("one");
                            arr.hide()
                        }
                    }
                }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
        }
    }}
;
var commPartnumber = "";
var recommendProductInfo = "";
function addCart(sourcePageType, activityType, activityId, cmmdtyCode, shopCode, cmmdtyQty, warrantyInfo, cmmdtyKind, overSeaFlag, callback) {
    var newCmmdtyCode = buildCmmdtyCode(cmmdtyCode);
    var cart = new Object();
    var cmmdtyArray = new Array();
    var cmmdty = new Object();
    cmmdty.activityType = activityType;
    cmmdty.activityId = activityId;
    cmmdty.cmmdtyCode = newCmmdtyCode;
    cmmdty.shopCode = shopCode;
    cmmdty.cmmdtyQty = cmmdtyQty;
    cmmdty.overSeaFlag = overSeaFlag;
    var cmmdtyWarranty = new Array();
    var warrantyArray = warrantyInfo.split(",");
    if (warrantyArray != "") {
        for (var i = 0; i < warrantyArray.length; i++) {
            var cmmdtyWarrantyObject = new Object();
            cmmdtyWarrantyObject.cmmdtyCode = warrantyArray[i];
            cmmdtyWarrantyObject.cmmdtyQty = "1";
            cmmdtyWarranty[i] = cmmdtyWarrantyObject
        }
    }
    cmmdty.cmmdtyWarranty = cmmdtyWarranty;
    cmmdtyArray[0] = cmmdty;
    cart.cmmdty = cmmdtyArray;
    var cartVO = cartObject2Json(cart);
    $.ajax({type: "get", url: "addCart.do", data: {cartVO: cartVO}, cache: false, crossDomain: true, dataType: "jsonp", success: function(result) {
            if (callback) {
                callback(result)
            } else {
                if (result.isSuccess == "Y") {
                    commPartnumber = newCmmdtyCode;
                    var custNum = $.cookie("custno");
                    var visiterId = $.cookie("_snma");
                    var arr = new Array();
                    if (visiterId != undefined && visiterId != "") {
                        arr = visiterId.split("|")
                    }
                    alsoBuy($.cookie("cityId"), cmmdtyKind, custNum, arr[1])
                } else {
                    var msg = "";
                    for (var i = 0; i < result.addCartErrorList.length; i++) {
                        msg += result.addCartErrorList[i].errorMessage
                    }
                    alert(msg)
                }
            }
        }})
}
function addCartBatch(cart, callback) {
    var cartVOInfo = cartObject2Json(cart);
    $.ajax({type: "get", dataType: "jsonp", url: "addCart.do", data: {cartVO: cartVOInfo}, cache: false, async: false, crossDomain: true, success: function(result) {
            if (callback) {
                callback(result)
            } else {
                if (result.isSuccess == "Y") {
                    window.location.href = "cart.do"
                } else {
                    var msg = "";
                    for (var i = 0; i < result.addCartErrorList.length; i++) {
                        msg += result.addCartErrorList[i].errorMessage
                    }
                    alert(msg)
                }
            }
        }})
}
;
function againBuy(cmmdtyInfo, tipDom, targetDom) {
    var loginTag = $("#loginSign").val();
    if (loginTag == "true") {
        probeAuthStatus(function() {
            againBuyMethod(cmmdtyInfo, tipDom, targetDom)
        }, function() {
            var loginSign = $("#loginSign").val();
            if (loginSign == "true") {
                ensureLogin(function() {
                    window.location.href = "cart.do"
                })
            }
        })
    } else {
        againBuyMethod(cmmdtyInfo, tipDom, targetDom)
    }
}
function againBuyMethod(cmmdtyInfo, tipDom, targetDom) {
    var itemTag = 0;
    var cart = {};
    cart.sourcePageType = "05";
    var cmmdty = new Array();
    var cmmdtyObjetc = {};
    var childCmmdty = new Array();
    if (typeof (cmmdtyInfo) != "undefined") {
        for (var i = 0; i < cmmdtyInfo.length; i++) {
            if (typeof (cmmdtyInfo[i].activityType) != "undefined" && cmmdtyInfo[i].activityType.length > 0) {
                cmmdtyObjetc.headerItemNo = itemTag;
                cmmdtyObjetc.activityType = attribute2Value(cmmdtyInfo[i].activityType);
                cmmdtyObjetc.activityId = attribute2Value(cmmdtyInfo[i].activityId);
                itemTag += 1;
                cmmdtyObjetc.itemNo = itemTag;
                cmmdtyObjetc.cmmdtyCode = buildCmmdtyCode(attribute2Value(cmmdtyInfo[i].cmmdtyCode));
                cmmdtyObjetc.cmmdtyName = attribute2Value(cmmdtyInfo[i].cmmdtyName);
                cmmdtyObjetc.shopCode = attribute2Value(cmmdtyInfo[i].shopCode);
                cmmdtyObjetc.shopName = attribute2Value(cmmdtyInfo[i].shopName);
                cmmdtyObjetc.cmmdtyQty = attribute2Value(cmmdtyInfo[i].cmmdtyQty)
            }
            if (typeof (cmmdtyInfo[i].activityType) == "undefined" || cmmdtyInfo[i].activityType == "" || cmmdtyInfo[i].activityType.length == 0) {
                var childCmmdtyObject = {};
                itemTag += 1;
                childCmmdtyObject.itemNo = itemTag;
                childCmmdtyObject.cmmdtyCode = buildCmmdtyCode(attribute2Value(cmmdtyInfo[i].cmmdtyCode));
                childCmmdtyObject.cmmdtyName = attribute2Value(cmmdtyInfo[i].cmmdtyName);
                childCmmdtyObject.cmmdtyQty = attribute2Value(cmmdtyInfo[i].cmmdtyQty);
                childCmmdtyObject.accessoryRelationID = attribute2Value(cmmdtyInfo[i].accessoryRelationID);
                childCmmdty[childCmmdty.length] = childCmmdtyObject
            }
        }
        cmmdtyObjetc.childCmmdty = childCmmdty
    }
    cmmdty[0] = cmmdtyObjetc;
    cart.cmmdty = cmmdty;
    var requestData = cartObject2Json(cart);
    $.ajax({type: "GET", dataType: "jsonp", url: "againBuy.do?", data: {cartVOInfo: requestData}, cache: false, crossDomain: true, success: function(data) {
            againBuyMethodBack(data, tipDom, targetDom)
        }, error: function() {
            tipDom.find(".ui-tooltip-inner").html(cloudCart1.cartRemoved.tpl.tipError)
        }})
}
function againBuyMethodBack(data, tipDom, targetDom) {
    if (data.result == "false") {
        tipDom.find(".ui-tooltip-inner").html("加入失败了，请稍后尝试");
        return false
    }
    cloudCart1.cartRemoved.reomveRepurchaseBoxProduct(targetDom);
    st.tooltipNew.allHide();
    cloudCart1.refreshPage(data)
}
;
function attribute2Value(attribute) {
    if (typeof (attribute) != "undefined") {
        return attribute
    } else {
        return""
    }
}
function cartObject2Json(cart) {
    var jsonStr = "";
    if (cart != "") {
        jsonStr += "{";
        jsonStr += '"sourcePageType":"' + attribute2Value(cart.sourcePageType) + '",';
        jsonStr += '"cmmdtyVOList":[';
        if (typeof (cart.cmmdty) != "undefined") {
            for (var i = 0; i < cart.cmmdty.length; i++) {
                jsonStr += "{";
                jsonStr += '"headerItemNo":"' + attribute2Value(cart.cmmdty[i].headerItemNo) + '",';
                jsonStr += '"activityType":"' + attribute2Value(cart.cmmdty[i].activityType) + '",';
                jsonStr += '"activityId":"' + attribute2Value(cart.cmmdty[i].activityId) + '",';
                jsonStr += '"itemNo":"' + attribute2Value(cart.cmmdty[i].itemNo) + '",';
                jsonStr += '"cmmdtyCode":"' + buildCmmdtyCode(attribute2Value(cart.cmmdty[i].cmmdtyCode)) + '",';
                jsonStr += '"shopCode":"' + attribute2Value(cart.cmmdty[i].shopCode) + '",';
                jsonStr += '"shopName":"' + attribute2Value(cart.cmmdty[i].shopName) + '",';
                jsonStr += '"cmmdtyQty":"' + attribute2Value(cart.cmmdty[i].cmmdtyQty) + '",';
                jsonStr += '"cmmdtyWarrantyVOList":[';
                if (typeof (cart.cmmdty[i].cmmdtyWarranty) != "undefined") {
                    var jsonStrTemp = "";
                    for (var n = 0; n < cart.cmmdty[i].cmmdtyWarranty.length; n++) {
                        jsonStrTemp += "{";
                        jsonStrTemp += '"itemNo":"' + attribute2Value(cart.cmmdty[i].cmmdtyWarranty[n].itemNo) + '",';
                        jsonStrTemp += '"cmmdtyCode":"' + buildCmmdtyCode(attribute2Value(cart.cmmdty[i].cmmdtyWarranty[n].cmmdtyCode)) + '",';
                        jsonStrTemp += '"cmmdtyQty":"' + attribute2Value(cart.cmmdty[i].cmmdtyWarranty[n].cmmdtyQty) + '"';
                        jsonStrTemp += "},"
                    }
                    jsonStrTemp = jsonStrTemp.substring(0, (jsonStrTemp.length - 1));
                    jsonStr += jsonStrTemp
                }
                jsonStr += "],";
                jsonStr += '"childCmmdtyVOList":[';
                if (typeof (cart.cmmdty[i].childCmmdty) != "undefined") {
                    var jsonStrChildTemp = "";
                    for (var m = 0; m < cart.cmmdty[i].childCmmdty.length; m++) {
                        jsonStrChildTemp += "{";
                        jsonStrChildTemp += '"itemNo":"' + attribute2Value(cart.cmmdty[i].childCmmdty[m].itemNo) + '",';
                        jsonStrChildTemp += '"cmmdtyCode":"' + buildCmmdtyCode(attribute2Value(cart.cmmdty[i].childCmmdty[m].cmmdtyCode)) + '",';
                        jsonStrChildTemp += '"cmmdtyQty":"' + attribute2Value(cart.cmmdty[i].childCmmdty[m].cmmdtyQty) + '",';
                        jsonStrChildTemp += '"shopCode":"' + attribute2Value(cart.cmmdty[i].shopCode) + '",';
                        jsonStrChildTemp += '"shopName":"' + attribute2Value(cart.cmmdty[i].shopName) + '",';
                        jsonStrChildTemp += '"accessoryRelationID":"' + attribute2Value(cart.cmmdty[i].childCmmdty[m].accessoryRelationID) + '",';
                        jsonStrChildTemp += '"childCmmdtyWarrantyVOList":[';
                        if (typeof (cart.cmmdty[i].childCmmdty[m].childCmmdtyWarranty) != "undefined") {
                            var jsonStrChildWarrantyTemp = "";
                            for (var t = 0; t < cart.cmmdty[i].childCmmdty[m].childCmmdtyWarranty.length; t++) {
                                jsonStrChildWarrantyTemp += "{";
                                jsonStrChildWarrantyTemp += '"itemNo":"' + attribute2Value(cart.cmmdty[i].childCmmdty[m].childCmmdtyWarranty[t].itemNo) + '",';
                                jsonStrChildWarrantyTemp += '"cmmdtyCode":"' + buildCmmdtyCode(attribute2Value(cart.cmmdty[i].childCmmdty[m].childCmmdtyWarranty[t].cmmdtyCode)) + '",';
                                jsonStrChildWarrantyTemp += '"cmmdtyQty":"' + attribute2Value(cart.cmmdty[i].childCmmdty[m].childCmmdtyWarranty[t].cmmdtyQty) + '"';
                                jsonStrChildWarrantyTemp += "},"
                            }
                            jsonStrChildWarrantyTemp = jsonStrChildWarrantyTemp.substring(0, (jsonStrChildWarrantyTemp.length - 1));
                            jsonStrChildTemp += jsonStrChildWarrantyTemp
                        }
                        jsonStrChildTemp += "]},"
                    }
                    jsonStrChildTemp = jsonStrChildTemp.substring(0, (jsonStrChildTemp.length - 1));
                    jsonStr += jsonStrChildTemp
                }
                jsonStr += "]},"
            }
            jsonStr = jsonStr.substring(0, (jsonStr.length - 1))
        }
        jsonStr += "]}";
        return jsonStr
    } else {
        return"{}"
    }
}
function buildCmmdtyCode(cmmdtyCode) {
    if (cmmdtyCode.length == 9) {
        return"000000000" + cmmdtyCode
    } else {
        return cmmdtyCode
    }
}
function shoppingCartPopBox(commPartnumber) {
    $.mDialog({css: {width: "460px"}, http: function(e, o) {
            if (recommendProductInfo == undefined || recommendProductInfo == "") {
                var data = '<div class="pop-car-win"><div class="pop-content">';
                data += '<div class="pop-success no-products"><h4><b></b>添加成功！</h4>';
                data += '<div class="clearfix"><a name="icart1_ope_buy02" href="javascript:void(0)" class="car-btn shopping-btn close l"><span>继续购物</span></a>';
                data += '<a name="icart1_ope_buy01" href="javascript:toShoppingCart();" class="car-btn account-btn close"><span>去购物车结算</span></a></div>';
                data += "</div>";
                data += "</div></div>";
                recommendProductInfo = data
            }
            e.find(".content").html(recommendProductInfo);
            e.find(".btn.close").attr("name", "prd_" + (commPartnumber).substring(9, 18) + "_gwctk_guanbi")
        }, overlayClick: true, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
}
function toShoppingCart() {
    window.location.href = "cart.do"
}
function alsoBuy(cityId, cmmdtyKind, custNum, visiterId) {
    if (cityId == "undefined") {
        cityId = "9173"
    }
    var _url = "";
    if (custNum != undefined && custNum != "") {
        if (cmmdtyKind == "0") {
            _url = "http://tuijian.suning.com/recommend-portal/recommendv2/biz.jsonp?parameter=" + commPartnumber + "&cityId=" + cityId + "&sceneIds=10-11&count=5&u=" + custNum + "&c=" + visiterId
        } else {
            if (cmmdtyKind == "1") {
                _url = "http://tuijian.suning.com/recommend-portal/recommendv2/biz.jsonp?parameter=" + commPartnumber + "&cityId=" + cityId + "&sceneIds=10-12&count=5&u=" + custNum + "&c=" + visiterId
            }
        }
    } else {
        if (cmmdtyKind == "0") {
            _url = "http://tuijian.suning.com/recommend-portal/recommendv2/biz.jsonp?parameter=" + commPartnumber + "&cityId=" + cityId + "&sceneIds=10-11&count=5&c=" + visiterId
        } else {
            if (cmmdtyKind == "1") {
                _url = "http://tuijian.suning.com/recommend-portal/recommendv2/biz.jsonp?parameter=" + commPartnumber + "&cityId=" + cityId + "&sceneIds=10-12&count=5&c=" + visiterId
            }
        }
    }
    $.ajax({url: _url, cache: true, dataType: "jsonp", jsonpCallback: "recommendData", success: function() {
        }})
}
function recommendData(jsondata) {
    var sugGoodsList = jsondata.sugGoods;
    $.each(sugGoodsList, function(i, sugGoods) {
        if (sugGoods.resCode != "02") {
            recommendProductInit(sugGoods)
        }
        shoppingCartPopBox(commPartnumber)
    })
}
function recommendProductInit(item) {
    var data = '<div class="pop-car-win"><div class="pop-content">';
    if (item.skus != undefined && item.skus.length >= 4) {
        data += '<div class="pop-success"><h4><b></b>添加成功！</h4>';
        data += '<div class="clearfix"><a name="icart1_ope_buy02" href="javascript:void(0)" class="car-btn shopping-btn close l"><span>继续购物</span></a>';
        data += '<a name="icart1_ope_buy01" href="javascript:toShoppingCart();" class="car-btn account-btn close"><span>去购物车结算</span></a></div>';
        data += '<div class="pop-others"><p>买了该商品的顾客还买了</p><ul>';
        for (var i = 0; i < 4; i++) {
            if (i == 3) {
                data += '<li class="last">'
            } else {
                data += "<li>"
            }
            data += '<a name="prd_' + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (i + 1) + "_p_0000000000_" + (item.skus[i].sugGoodsCode).substring(9, 18) + "_" + item.skus[i].handwork + '" href="' + sn.elecProductDomain + "/0000000000/" + (item.skus[i].sugGoodsCode).substring(9, 18) + ".html?src=prd_" + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (i + 1) + "_p_0000000000_" + (item.skus[i].sugGoodsCode).substring(9, 18) + "_" + item.skus[i].handwork + '" title="' + item.skus[i].sugGoodsName + '" class="picbox" target="_blank"><img src="' + sn.imageDomianDir + "/content/catentries/" + (item.skus[i].sugGoodsCode).substring(0, 14) + "/" + item.skus[i].sugGoodsCode + "/" + item.skus[i].sugGoodsCode + '_ls.jpg" alt="' + item.skus[i].sugGoodsName + '" /></a>';
            data += '<p name="prd_' + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (i + 1) + "_c_0000000000_" + (item.skus[i].sugGoodsCode).substring(9, 18) + "_" + item.skus[i].handwork + '" class="details"><a href="' + sn.elecProductDomain + "/0000000000/" + (item.skus[i].sugGoodsCode).substring(9, 18) + ".html?src=prd_" + (commPartnumber).substring(9, 18) + "_recbuymore_1-" + (i + 1) + "_c_0000000000_" + (item.skus[i].sugGoodsCode).substring(9, 18) + "_" + item.skus[i].handwork + '" title="' + item.skus[i].sugGoodsName + '" target="_blank">' + item.skus[i].sugGoodsName + "</a></p>";
            data += '<span class="snPrice"><i>¥</i><em>' + item.skus[i].price + "</em></span>";
            data += "</li>"
        }
        data += "</ul></div>"
    } else {
        data += '<div class="pop-success no-products"><h4><b></b>添加成功！</h4>';
        data += '<div class="clearfix"><a name="icart1_ope_buy02" href="javascript:void(0)" class="car-btn shopping-btn close l"><span>继续购物</span></a>';
        data += '<a name="icart1_ope_buy01" href="javascript:toShoppingCart();" class="car-btn account-btn close"><span>去购物车结算</span></a></div>';
        data += "</div>"
    }
    data += "</div></div>";
    recommendProductInfo = data
}
;
var addFavoriteItemNo;
var addFavoriteItemObj;
var showObject;
var tipDomObject;
function add2Favorite(q, p, c, obj, tipDom) {
    tipDom.find(".ui-tooltip-inner").html(cloudCart1.addFavFn.messageList.load);
    showObject = $(obj).closest(".item,.item-sub");
    var o = 18 - (q + "").length;
    for (var f = 0; f < o; f++) {
        q = "0" + q
    }
    if ("0000000000" != p) {
        var s = 10 - (p + "").length;
        for (var f = 0; f < s; f++) {
            p = "0" + p
        }
    }
    addFavoriteItemNo = c;
    addFavoriteItemObj = obj;
    tipDomObject = tipDom;
    mySuning.add2ProductFavorite(q, p, "shoppingCart1", "addFavoriteCallBack")
}
function addFavoriteCallBack(data) {
    if (data.returnCode == 0 || data.returnCode == 1) {
        if (addFavoriteItemNo != "") {
            tipDomObject.find(".ui-tooltip-inner").html(cloudCart1.addFavFn.messageList.success);
            delProductByFavorite(addFavoriteItemNo);
            favoriteInit()
        } else {
            cloudCart1.tipfn.resetBtn(".add-fav", "add-fav-already-click");
            cloudCart1.cartRemoved.reomveRepurchaseBoxProduct(addFavoriteItemObj);
            cloudCart1.tipfn.resetBtn(".del", "add-fav-already-click")
        }
    }
    if (data.returnCode == -2) {
        if (addFavoriteItemNo != "") {
            tipDomObject.find(".ui-tooltip-inner").html(cloudCart1.addFavFn.messageList.error);
            setTimeout(function() {
                cloudCart1.tipfn.resetBtn(".add-fav", "add-fav-already-click");
                cloudCart1.tipfn.resetBtn(".del", "add-fav-already-click")
            }, 200)
        } else {
            if (typeof (addFavoriteItemObj) == "object") {
                tipDomObject.find(".ui-tooltip-inner").html(cloudCart1.addFavFn.messageList.error);
                setTimeout(function() {
                    cloudCart1.tipfn.resetBtn(".add-fav", "add-fav-already-click");
                    cloudCart1.tipfn.resetBtn(".del", "add-fav-already-click")
                }, 200)
            }
        }
    }
}
function delProductByFavorite(itemNo) {
    $.ajax({dataType: "GET", url: "deleteCartOnePro.do", dataType:"jsonp", crossDomain: true, data: {cummtyItemNos: itemNo}, success: function(data) {
            cloudCart1.tipfn.resetBtn(".add-fav", "add-fav-already-click");
            cloudCart1.tipfn.resetBtn(".del", "add-fav-already-click");
            cloudCart1.refreshPage(data)
        }})
}
;
function addWarranty(cmmdtyitemNo, cmmdtyWarranty, obj) {
    probeAuthStatus(function() {
        addWarrantyMethod(cmmdtyitemNo, cmmdtyWarranty, obj)
    }, function() {
        var loginSign = $("#loginSign").val();
        if (loginSign == "true") {
            ensureLogin(function() {
                window.location.href = "cart.do"
            })
        } else {
            addWarrantyMethod(cmmdtyitemNo, cmmdtyWarranty, obj)
        }
    })
}
function addWarrantyMethod(cmmdtyitemNo, cmmdtyWarranty, obj) {
    $.ajax({url: "updateWarranty.do", type: "GET", data: {cmmdtyitemNo: cmmdtyitemNo, cmmdtyWarranty: cmmdtyWarranty.toString()}, cache: false, async: false, dataType: "jsonp", crossDomain: true, success: function(data) {
            if (data.result == "false") {
                $(obj).siblings(".warning-text").html("").html("<i class='tip-icon tip-error-16'></i>加入失败，请重新购买！");
                $(obj).siblings(".warning-text").show();
                return false
            }
            $(this).closest(".ui-tooltip").remove();
            st.tooltipNew.allHide();
            cloudCart1.refreshPage(data)
        }, error: function() {
            $(obj).siblings(".msg-box").html("加入失败，请重新购买！")
        }})
}
;