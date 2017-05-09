var cloudCart2Payment = {doSavePayment: function(selector, oldPayChecked) {
        probeAuthStatus(function() {
            var cart2No = $("#cart2No").val();
            var payType = selector.attr("payType");
            var childPayType = selector.attr("childPayType");
            if (typeof childPayType == "undefined" || childPayType == "undefined") {
                childPayType = ""
            }
            var payPeriods = "";
            if (payType == 9) {
                payPeriods = selector.attr("period")
            }
            $.ajax({type: "post", url: "savePayMode.do", async: false, dataType: "json", data: {payType: payType, cart2No: cart2No, payPeriods: payPeriods, childPayType: childPayType}, success: function(data) {
                    if (data.returnCode === "200") {
                        if (oldPayChecked.hasClass("pay-complex-fn")) {
                            $(".payment-container .pay-list .tip-product-dom").unbind("hover").remove();
                            var payType = oldPayChecked.attr("payType");
                            oldPayChecked.remove();
                            var payList = $(".payment-container .step-content .clearfix").children("li");
                            payList.each(function() {
                                if ($(this).attr("payType") == payType) {
                                    $(this).removeClass("hide")
                                }
                            })
                        }
                        if (typeof data.html != "undefined" && data.html && data.html != "undefined") {
                            var htmlObject = $(data.html);
                            var payEnsureObject = $(htmlObject.find("#view-pay-list-01").html());
                            payEnsureObject.find(".J-dialog-ensure03").removeClass("J-dialog-ensure03").addClass("J-dialog-ensure01");
                            payEnsureObject.find(".J-dialog-ensure04").removeClass("J-dialog-ensure04").addClass("J-dialog-ensure02");
                            payEnsureObject.find(".J-dialog-ensure02").after("<a href='javascript:void(0);' class='cart-btn close'>知道了</a>");
                            $.mLionDialog({css: {width: "440px"}, title: "确认支付方式", http: function(e, o) {
                                    e.find(".content").html(payEnsureObject);
                                    cartListLoop.listloop({wrap: ".J-dialog-ensure01", loopBox: ".ensure-list ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: false});
                                    cartListLoop.listloop({wrap: ".J-dialog-ensure02", loopBox: ".ensure-list ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: false})
                                }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                            selector.removeClass("pay-checked").addClass("hide").siblings("li").removeClass("pay-checked");
                            selector.after(data.html)
                        } else {
                            selector.addClass("pay-checked").siblings("li").removeClass("pay-checked");
                            cloudCart2Payment.priceShowFn()
                        }
                        if (data.invoiceAvailableFlag == "02") {
                            cloudCart2Invoice.bindEven.doModifyInvoice("N")
                        }
                        cloudCart2Payment.otherPaySwitch();
                        cloudCart2Payment.showRXFTip();
                        cloudCart2Payment.storeShopTip();
                        cloudCart2Common.showTipForOnlinePay();
                        cloudCart2Common.checkSubmit();
                        $("#step6").find(".order-address").find(".pay-name").text($("#step2").find(".pay-checked").find(".pay-way").text());
                        $(".subsidy-box").remove();
                        $(".subsidy-warning").remove();
                        $(".product-promo").remove();
                        var payModeVO = data.payModeVO;
                        $("#cmmdyTotalID").html(payModeVO.totalAmount);
                        $("#shippingChargeID").html(payModeVO.transportFee);
                        $("#cmmdyDiscountID").html(payModeVO.voucherTotalAmount);
                        $("#freeAmountID").html((parseFloat(payModeVO.cardAmount) + parseFloat(payModeVO.couponAmount)).toFixed(2));
                        $("#payAmountID").html(payModeVO.payAmount);
                        $("#energySubsidiesID").html(payModeVO.energySubsidiesAmount);
                        if ($("#cloudDaimondInputId").parent().hasClass("cart-checkbox-checked")) {
                            $("#cloudAccountId").html(payModeVO.integralAmount)
                        }
                        $.ajax({type: "post", url: "queryEnergySubsidies.do", async: false, dataType: "json", data: {cart2No: cart2No}, success: function(data) {
                                var energySubsidiesHtmls = data.htmls;
                                if (energySubsidiesHtmls.length > 0) {
                                    for (var i = 0; i < energySubsidiesHtmls.length; i++) {
                                        var energySubsidiesHtml = energySubsidiesHtmls[i];
                                        var itemNO = $(energySubsidiesHtml).attr("itemNO");
                                        var productDetailObject = $("#" + itemNO + "");
                                        var productObject = productDetailObject.parents(".product,.group-box");
                                        productObject.find(".product-img").after("<p class='product-promo'>节能补贴</p>");
                                        productObject.find(".col-td-box").after($(energySubsidiesHtml).html())
                                    }
                                }
                            }, error: function() {
                                cloudCart2Common.alertBox("小苏太忙，稍后再来试试")
                            }});
                        cloudCart2.controlEnergySubsidiesAmount()
                    } else {
                        if (data.returnCode === "004") {
                            window.location.href = "http://shopping.suning.com/error.do"
                        } else {
                            if (data.returnCode === "4000") {
                                cloudCart2Common.alertBox("您访问的太频繁， 网络拥堵，请您稍后再试！")
                            } else {
                                cloudCart2Common.alertBox("支付方式保存失败，请重新保存！")
                            }
                        }
                    }
                }, error: function() {
                    cloudCart2Common.alertBox("小苏太忙，稍后再来试试")
                }})
        }, function() {
            cloudCart2Common.cart2Logon()
        })
    }, doModifyPayment: function(phoneNo) {
        probeAuthStatus(function() {
            var cart2No = $("#cart2No").val();
            var cartFlag = $(".bookingCart").length != 0 ? "02" : "01";
            $.ajax({type: "post", url: "showPayMode.do", async: false, dataType: "json", data: {cart2No: cart2No, cmmdtyType: $("#commodityType_ID").val(), pickupType: $("#deliveryFinishDiv").attr("pickuptype"), cartFlag: cartFlag}, success: function(data) {
                    if (data.returnCode === "200") {
                        $("#step2").html(data.html);
                        $("#otherPaySwitch").val(data.otherPaySwitch);
                        $("#otherPay").val(data.otherPay);
                        cloudCart2Payment.otherPaySwitch();
                        cloudCart2Payment.priceShowFn();
                        if ($(".bookingCart").length != 0) {
                            bookingCart.resetNum();
                            cloudCart2.payMethod.bookingCartClassLoad();
                            $("#bookingPhoneNum").html(phoneNo);
                            $(".finalPayTelphone").html(phoneNo)
                        }
                        cloudCart2Payment.storeShopTip();
                        cloudCart2Common.showTipForOnlinePay();
                        cloudCart2Common.checkSubmit()
                    } else {
                        if (data.returnCode === "004") {
                            window.location.href = "http://shopping.suning.com/error.do"
                        } else {
                            if (data.returnCode === "4000") {
                                cloudCart2Common.alertBox("您访问的太频繁， 网络拥堵，请您稍后再试！")
                            } else {
                                cloudCart2Common.alertBox("小苏太忙，稍后再来试试")
                            }
                        }
                    }
                }, error: function() {
                    cloudCart2Common.alertBox("小苏太忙，稍后再来试试")
                }})
        }, function() {
            cloudCart2Common.cart2Logon()
        })
    }, showRXFTip: function() {
        if ($(".pay-checked").length > 0) {
            var selector = $(".pay-checked");
            var payType = selector.attr("paytype");
            var childPayType = selector.attr("childPayType");
            if (typeof childPayType == "undefined" || childPayType == "undefined") {
                childPayType = ""
            }
            if (payType === "09") {
                var payPeriods = $(".pay-checked").attr("period");
                var rxfTip = (payPeriods === "1" ? "30天免息" : (payPeriods + "期"));
                $("#step6").find(".sum-pay-price").removeClass("sum-pay-price-sp");
                $("#step6").find(".capricious-pay").removeClass("hide").find("#pay-period").html(rxfTip);
                $("#sum-pay-text").html("应付金额（未加手续费）：")
            } else {
                if (payType === "01" && childPayType == "01") {
                    $("#step6").find(".sum-pay-price").removeClass("sum-pay-price-sp")
                } else {
                    if (payType === "01" && childPayType == "02") {
                        $("#step6").find(".sum-pay-price").addClass("sum-pay-price-sp")
                    } else {
                        $("#step6").find(".sum-pay-price").addClass("sum-pay-price-sp");
                        $("#step6").find(".capricious-pay").addClass("hide").find("#pay-period").html("");
                        $("#sum-pay-text").html("应付金额：")
                    }
                }
            }
        }
    }, otherPaySwitch: function() {
        var otherPaySwitch = $("#otherPaySwitch").val() == "true";
        var otherPay = $("#otherPay").val() == "true";
        var power = $("#anotherPaySwitch").val() == "true";
        var otherPayDesc = $("#anotherPayTip").val();
        if (power) {
            $("#otherPayDesc").html(otherPayDesc);
            if (otherPaySwitch) {
                if ($("#comTypeFlag").val() == "true") {
                    $("#otherPayTip3").removeClass("hide")
                } else {
                    if ($(".pay-checked").length > 0 && ($(".pay-checked").attr("paytype") == "01" || $(".pay-checked").attr("paytype") == "09")) {
                        if ($("#otherPayCheck").prop("disabled")) {
                            $("#otherPayCheck").removeAttr("disabled");
                            $(".other-pay-box").removeClass("other-pay-box-disable")
                        }
                        if (otherPay) {
                            $("#otherPayCheck").parents("span").addClass("cart-checkbox-checked");
                            $("#otherPayCheck").attr("checked", "checked")
                        }
                        $("#otherPayTip1").addClass("hide");
                        $("#otherPayTip2").addClass("hide")
                    } else {
                        $("#otherPayCheck").attr("disabled", "disabled");
                        $(".other-pay-box").addClass("other-pay-box-disable");
                        $("#otherPayCheck").prop("checked", false);
                        $("#otherPayCheck").parents("span").removeClass("cart-checkbox-checked");
                        $("#otherPay").val("false");
                        $("#otherPayTip1").removeClass("hide")
                    }
                }
            } else {
                if (!$("#otherPayCheck").prop("disabled")) {
                    $("#otherPayCheck").attr("disabled", "disabled");
                    $(".other-pay-box").addClass("other-pay-box-disable")
                }
                if ($("#comTypeFlag").val() == "true") {
                    $("#otherPayTip3").removeClass("hide")
                } else {
                    $("#otherPayTip2").removeClass("hide")
                }
            }
        } else {
            $(".other-pay-box").hide()
        }
    }, otherPay: function(payType) {
        probeAuthStatus(function() {
            var cart2No = $("#cart2No").val();
            $.ajax({type: "post", url: "savePayMode.do", async: false, dataType: "json", data: {payType: payType, cart2No: cart2No, payPeriods: ""}, success: function(data) {
                    cloudCart2.promotion.unLock();
                    if (data.returnCode == "200") {
                    } else {
                        if (data.returnCode === "4000") {
                            cloudCart2Common.alertBox("您访问的太频繁， 网络拥堵，请您稍后再试！")
                        } else {
                            cloudCart2Common.alertBox("代付请求失败，请重新选择！")
                        }
                    }
                }, error: function() {
                    cloudCart2.promotion.unlock();
                    cloudCart2.alertBox("小苏太忙，稍后再来试试")
                }})
        }, function() {
            cart2Logon()
        })
    }, priceShowByPay: function(payType, childPayType) {
        if ($(".bookingCart").length > 0) {
            $(".or-sn-price").remove()
        }
        if (payType == "01" && childPayType == "01") {
            $(".booking_price_one").show();
            $(".booking_price_total").hide();
            $(".booking_price_two").show();
            $(".booking_price_amount").hide();
            $("#payPhoneId").show();
            $(".booking-check-box").show()
        } else {
            $(".booking_price_one").hide();
            $(".booking_price_total").show();
            $(".booking_price_two").hide();
            $(".booking_price_amount").show();
            $("#payPhoneId").hide();
            $(".booking-check-box").hide()
        }
    }, priceShowFn: function() {
        var payChecked = $(".pay-checked");
        if (payChecked.length > 0) {
            var payType = payChecked.attr("paytype");
            var childPayType = "";
            if (payType == "01") {
                childPayType = payChecked.attr("childpaytype");
                if (typeof childPayType == "undefined" || childPayType == "undefined") {
                    childPayType = ""
                }
            }
            cloudCart2Payment.priceShowByPay(payType, childPayType)
        } else {
            cloudCart2Payment.priceShowByPay("", "")
        }
    }, storeShopTip: function() {
        if ($(".pay-checked").length > 0) {
            if ($(".pay-checked").attr("paytype") == "02") {
                if ($(".addr-selected").attr("pickupaddress") == "true") {
                    $(".store-shop-step-box").find(".store-shop-one").html("待货物到达门店");
                    $(".store-shop-step-box").find(".store-shop-two").html("收到短信通知");
                    $(".store-shop-step-box").find(".store-shop-three").html("前往门店支付并提货");
                    $(".store-shop-step-box").show()
                } else {
                    $(".store-shop-step-box").find(".store-shop-one").html("提交订单后24小时内前往任一附近门店付款");
                    $(".store-shop-step-box").find(".store-shop-two").html("苏宁安排物流发货");
                    $(".store-shop-step-box").find(".store-shop-three").html("等待配送上门");
                    $(".store-shop-step-box").show()
                }
            } else {
                $(".store-shop-step-box").hide()
            }
        } else {
            $(".store-shop-step-box").hide()
        }
    }};
var cloudCart2Cmmdty = {deliveryClick: function(_this, scheme) {
        var delivery = $(_this).val();
        if (isEmpty(delivery)) {
            delivery = "0"
        }
        var cart2No = $('input[name="cart2No"]').val();
        var supportedSelfPickUp = isEmpty($("#supportedSelfPickUp").val()) ? false : true;
        $.ajax({type: "post", url: "changeDelivery.do", async: false, dataType: "json", data: {delivery: delivery, cart2No: cart2No, scheme: scheme, supportedSelfPickUp: supportedSelfPickUp}, success: function(data) {
                if (data.returnCode === "001") {
                    cloudCart2Common.alertBox("抱歉，商品信息加载失败了，请刷新页面重试一下吧~")
                } else {
                    if (data.returnCode === "004") {
                        window.location.href = "http://shopping.suning.com/error.do"
                    } else {
                        if (data.returnCode === "4000") {
                            cloudCart2Common.alertBox("您访问的太频繁， 网络拥堵，请您稍后再试！")
                        } else {
                            $("#step3").html(data.html);
                            if ($("#commodityType_ID").val() !== "0") {
                                cloudCart2Cmmdty.cInstallquery()
                            }
                            if ($("#directFlag").val() === "1") {
                                $("#step3").find("#back_to_one").remove()
                            }
                            cloudCart2Cmmdty.noReasonReturnIcon();
                            $(function() {
                                ECode.cartCalendar()
                            });
                            lazyelem.listen();
                            cloudCart2.controlEnergySubsidiesAmount();
                            $("#toatalPiontsId").attr("data-max", data.availVlue);
                            $("#toatalPiontsId2").html(data.availVlue)
                        }
                    }
                }
            }, error: function() {
                cloudCart2Common.alertBox("抱歉，商品信息加载失败了，请刷新页面重试一下吧~")
            }})
    }, noReasonReturnIcon: function() {
        var selectorList = $("p[name='noReason']");
        if (selectorList != null) {
            var vendorCode = "";
            var partNumber = "";
            var params = "";
            var param = "";
            for (var i = 0; i < selectorList.length; i++) {
                var that = $(selectorList[i]);
                var id = that.attr("id");
                var array = id.split("_");
                if (array.length > 1) {
                    partNumber = array[0];
                    vendorCode = array[1];
                    if (param.indexOf(partNumber + "_" + vendorCode) < 0) {
                        param = param.concat(partNumber + "_" + vendorCode).concat(",")
                    }
                } else {
                    partNumber = array[0];
                    if (param.indexOf(partNumber) < 0) {
                        param = param.concat(partNumber).concat(",")
                    }
                }
            }
            params = "params=" + param.substring(0, param.length - 1);
            $.ajax({url: "http://cart.suning.com/emall/SNGetNoReasonReturnCmd", data: params, cache: false, dataType: "jsonp", jsonp: "callback", success: function(result) {
                    var resultList = result.data;
                    var noReasonObj, showObj, itemNoReasonReturnInfo;
                    for (var j = 0; j < resultList.length; j++) {
                        noReasonObj = resultList[j];
                        itemNoReasonReturnInfo = noReasonObj.itemNoReasonReturnInfo;
                        if ("trueinsurance" == itemNoReasonReturnInfo || "true7insurance" == itemNoReasonReturnInfo) {
                            var divInsuranceIcon = $("#divfreightInsurance_" + noReasonObj.itemKey);
                            divInsuranceIcon.before('<i class="store-icon transport ico-reset1"></i>退运费险 <span class="tip-icon tip-help vta-mid tip-common-hover-fn-btn" data-html="退货成功后，退货产生的运费由保险公司为您理赔，理赔金额5-25元。" data-type="hover" data-placement="top" data-style="{\'width\': \'394px\',\'background\':\'#FEFFF1\',\'border\':\'1px solid #FC6\'}" data-toggle="tooltip"></span><span class="c9">（商家已为您购买退运费险）</span>');
                            divInsuranceIcon.remove()
                        }
                    }
                }})
        }
    }, cInstallquery: function() {
        var dataparam = {};
        dataparam.cityCode = $("#addressbox").attr("citycode");
        dataparam.region = $("#addressbox").attr("distcode");
        var array = new Array();
        $(".c-store").each(function() {
            var cStoreItem = new Object();
            var code = $(this).attr("shopCode");
            cStoreItem.vendorCode = code;
            var partNumberList = new Array();
            $(this).find(".product .fouth-column").each(function() {
                var cmmdtycode = $(this).attr("cmmdtycode");
                var partNumber = {};
                partNumber.partNumber = cmmdtycode.substring(9);
                partNumberList.push(partNumber)
            });
            cStoreItem.partNumberList = partNumberList;
            array.push(cStoreItem)
        });
        dataparam.cStoreItems = $.toJSON(array);
        var queryCInstallFlagUrl = "http://cart.suning.com/emall/SNCshopOrdersInstallCmd";
        $.ajax({type: "get", url: queryCInstallFlagUrl, dataType: "jsonp", cache: false, data: dataparam, success: function(data) {
                var list = data;
                $(".c-store").each(function() {
                    var shopcode = $.trim($(this).find(".cInstall").attr("shopCode"));
                    for (var i = 0; i < list.length; i++) {
                        var cStoreItem = list[i];
                        var vendorCode = $.trim(cStoreItem.vendorCode);
                        if (vendorCode == shopcode) {
                            var flagList = cStoreItem.partNumberList;
                            var flag = false;
                            for (var j = 0; j < flagList.length; j++) {
                                flag = flagList[j].installFalg;
                                if (flag) {
                                    break
                                }
                            }
                            if (flag) {
                                $(this).find(".cInstall").html("商家发货后将尽快为您安排上门安装，可联系商家咨询。")
                            } else {
                                $(this).find(".cInstall").html("")
                            }
                        }
                    }
                })
            }})
    }, showTipForReserve: function() {
        if ($(".reserve").length > 0) {
            var checkoutDiv = $(".checkout-bar").find(".checkout-bar-r");
            var addstr = "";
            if ($(".capricious-pay").hasClass("hide")) {
                $(".sum-pay-price").removeClass("sum-pay-price-sp");
                addstr = "<p class='checkout-warning capricious-pay'><i class='tip-icon tip-warning mr5'></i>预约抢购商品库存有限，订单最多为您保留15分钟</p>";
                checkoutDiv.find("div").append(addstr)
            } else {
                addstr = "<p class='checkout-warning'><i class='tip-icon tip-warning mr5'></i>预约抢购商品库存有限，订单最多为您保留15分钟</p>";
                checkoutDiv.append(addstr)
            }
        }
    }, packParamForCoupo: function() {
        var jsonStr;
        jsonStr = '{"sourceSystemNo":"' + $("#cart2No").val() + '", "cityId": "' + $("#addressbox").attr("citycode") + '", "deliveryMode":"' + $("#deliveryType").val() + '","payment":"' + $("#payType").val() + '","productList":[';
        $(".product-name:not('.package-name')").find("a").each(function() {
            if ($(this).attr("activitytype") != "05" && $(this).attr("activitytype") != "12") {
                jsonStr += '{"itemId":"' + $(this).attr("id") + '", "commdtyCode":"' + $(this).attr("commdtycode") + '", "businessSign":"' + $(this).attr("businesssign") + '", "marketingActivityType":"' + $(this).attr("marketingactivitytype") + '", "listPrice":"' + $(this).attr("salesprice") + '", "salesPrice":"' + $(this).attr("salesprice") + '", "productName": "' + $(this).attr("cmmdtyname") + '", "storeId":"' + $(this).attr("storeid") + '", "productQty":"' + $(this).attr("qty") + '"},'
            }
        });
        $(".group-box-title").find("a").each(function() {
            if ($(this).attr("activitytype") == "12" || $(this).attr("activitytype") == "05") {
                jsonStr += '{"itemId":"' + $(this).attr("id") + '", "commdtyCode":"' + $(this).attr("commdtycode") + '", "businessSign":"' + $(this).attr("businesssign") + '", "marketingActivityType":"' + $(this).attr("marketingactivitytype") + '", "listPrice":"' + $(this).attr("listprice") + '", "salesPrice":"' + $(this).attr("salesprice") + '", "productName": "' + $(this).attr("cmmdtyname") + '", "storeId":"' + $(this).attr("storeid") + '", "productQty":"' + $(this).attr("qty") + '"},'
            }
        });
        jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
        jsonStr += "],";
        jsonStr += '"shopList":[';
        $(".sn-store").find(".shopinfo").each(function() {
            jsonStr += '{"shopCode":"' + $(this).attr("shopcode") + '", "shopName":"' + $(this).attr("shopname") + '", "freightAmount":"' + $(this).attr("shopdeliveryfee") + '"},'
        });
        $(".c-store").each(function() {
            jsonStr += '{"shopCode":"' + $(this).attr("shopcode") + '", "shopName":"' + $(this).attr("shopname") + '", "freightAmount":"' + $(this).attr("shopdeliveryfee") + '"},'
        });
        jsonStr = jsonStr.substring(0, (jsonStr.length - 1));
        jsonStr += "],";
        jsonStr += '"aftersaleProductList":[';
        $(".warrantyextension").each(function() {
            jsonStr += '{"aftersaleProductItemNo":"' + $(this).attr("id") + '", "aftersaleCommdtyCode":"' + $(this).attr("code") + '", "aftersaleProductQty":"' + $(this).attr("qty") + '", "aftersaleProductPrice":"' + $(this).attr("price") + '"},'
        });
        if ($(".warrantyextension").length > 0) {
            jsonStr = jsonStr.substring(0, (jsonStr.length - 1))
        }
        jsonStr += "]}";
        return jsonStr
    }};
var cloudCart2Submit = {init: function() {
        this.bindEvent()
    }, bindEvent: function() {
        $("#submit-btn").click(function(event, payname, payidnum) {
            event.preventDefault();
            probeAuthStatus(function() {
                try {
                    pageSaleCookieUtil.updateCustNo()
                } catch (e) {
                }
                $("#step6 .checkout-submit-btn:not(.cart-btn-disable)").hide();
                $("#step6 .checkout-submit-btn-load").show();
                var storeMemo = "";
                if ($("#commodityType_ID").val() === "0") {
                    storeMemo = "[]"
                } else {
                    var orderMemo;
                    var shopCode;
                    $("#step3").find(".c-store-message").each(function() {
                        orderMemo = $.trim($(this).val());
                        shopCode = $(this).attr("shop");
                        if (orderMemo !== "" && orderMemo !== cloudCart2.cStoreMessage.tpl._default) {
                            storeMemo += "{'shopCode':'" + shopCode + "','orderMemo':'" + orderMemo.replace(/'/g, "^%27$") + "'},"
                        }
                    });
                    if (storeMemo === "") {
                        storeMemo = "[]"
                    } else {
                        storeMemo = "[" + storeMemo.substring(0, (storeMemo.length - 1)) + "]"
                    }
                }
                cloudCart2Submit.submitOrder(storeMemo, payname, payidnum)
            }, function() {
                cloudCart2Common.cart2Logon()
            })
        })
    }, submitOrder: function(storeMemo, payname, payidnum) {
        $.ajax({type: "post", url: "submitOrder.do", async: false, dataType: "json", data: {payName: payname, payIdNumber: payidnum, storeMemo: storeMemo, cart2No: $("#cart2No").val(), deviceId: _getCookie("_device_session_id")}, success: function(data) {
                if (data.returnCode === "Y") {
                    var orderId = data.orderId;
                    var payStatus = data.payStatus;
                    var payUrl = "";
                    try {
                        var saOrderInfo = $("#saOrderInfo").val();
                        saOrderInfo = orderId + ":" + saOrderInfo.substring(0, saOrderInfo.length - 1);
                        if (_sendOrderInfo && (typeof (_sendOrderInfo)).toLowerCase() == "function") {
                            _sendOrderInfo(orderId, saOrderInfo)
                        }
                    } catch (e) {
                    }
                    if ($("#directFlag").val() === "0") {
                        try {
                            var totalProdQty = new Number(cloudCart2Common.getCookie("totalProdQty"));
                            var cart2Qty = new Number($("#cart2_qty").attr("qty"));
                            var newQty = (totalProdQty - cart2Qty);
                            document.cookie = "totalProdQty=" + newQty + ";domain=" + sn.cookieDomain + ";path=/"
                        } catch (e) {
                        }
                    }
                    var goodsId = "";
                    $(".pageSale").each(function(i) {
                        goodsId = goodsId + "|" + $(this).attr("pageSale")
                    });
                    if (goodsId.length > 1) {
                        goodsId = goodsId.substring(1, goodsId.length);
                        try {
                            pageSaleCookieUtil.sendCookie(orderId, goodsId)
                        } catch (e) {
                        }
                    }
                    if (payStatus === "01") {
                        payUrl = "http://cart.suning.com/emall/SNOrderPaySuccessView?orderId=" + orderId + "&langId=-7&catalogId=10051&storeId=10052"
                    } else {
                        if (payStatus === "02") {
                            payUrl = "http://cart.suning.com/emall/SNPayBeforeComfirmView?orderId=" + orderId + "&storeId=10052&catalogId=10051"
                        } else {
                            if (payStatus === "04") {
                                payUrl = "http://cart.suning.com/emall/SNPayForAnotherCmd?storeId=10052&catalogId=10051&langId=-7&orderId=" + orderId
                            } else {
                                if (payStatus === "05") {
                                    payUrl = "http://cart.suning.com/emall/SNTwicePayRedirectCmd?storeId=10052&catalogId=10051&langId=-7&payType=01&channel=&orderId=" + orderId
                                } else {
                                    payUrl = "http://cart.suning.com/emall/SNRedirectPaymentProcess?orderId=" + orderId + "&checkType=true&policyId=11613&subPolicyId=20001&storeId=10052&catalogId=10051&langId=-7&sourceUrl=" + window.location.href
                                }
                            }
                        }
                    }
                    window.location.href = payUrl
                } else {
                    if (data.returnCode === "R") {
                        cloudCart2Common.alertBox("订单已提交，请到订单中心查看");
                        $(".m-lion-dialog").find(".return-cart").attr("href", "member_order.html?storeId=10052&catalogId=10051").text("前往订单中心");
                        $("#step6 #submit-btn").show();
                        $("#step6 .checkout-submit-btn-load").hide()
                    } else {
                        if (data.returnCode === "4000") {
                            cloudCart2Common.alertBox("您访问的太频繁， 网络拥堵，请您稍后再试！");
                            $("#step6 #submit-btn").show();
                            $("#step6 .checkout-submit-btn-load").hide()
                        } else {
                            var errors = data.errors;
                            var len = errors.length;
                            var errorTip = "", code = "", cmmdtyUrl = "", cmmdtyName = "", lihtml = "", imgUrl = "";
                            if ($("#directFlag").val() === "1") {
                                cmmdtyUrl = $("#step3").find(".product-name a")[0].href
                            }
                            for (var i = 0; i < len; i++) {
                                if (code == "") {
                                    code = errors[0].errorCode
                                }
                                if (code != "" && code != errors[i].errorCode) {
                                    continue
                                }
                                if ($("#directFlag").val() === "1") {
                                    appendInput("Submitorder2");
                                    sendSaMessage("Submitorder2", errors[i].errorMessage + "CODE:" + code + ",USER:" + getCookie("custno"))
                                } else {
                                    appendInput("Submitorder1");
                                    sendSaMessage("Submitorder1", errors[i].errorMessage + "CODE:" + code + ",USER:" + getCookie("custno"))
                                }
                                errorTip = errors[i].errorMessage;
                                if (code === "004") {
                                    window.location.href = "http://shopping.suning.com/error.do";
                                    return
                                } else {
                                    if (code == "002" || code == "005" || code == "006" || code == "007" || code == "064") {
                                        cmmdtyName = $("#" + errors[i].itemNo).html();
                                        if (isEmpty(cmmdtyName)) {
                                            continue
                                        }
                                        if (code == "005") {
                                            lihtml += '<li class="list"><div class="service-warming-product-img-box" title="' + cmmdtyName + '"></div></li>'
                                        } else {
                                            imgUrl = $("#" + errors[i].itemNo).parents(".product-detail").siblings("a").find("img").attr("src");
                                            lihtml += '<li class="list"><img src="' + imgUrl + '" alt="' + cmmdtyName + '" title="' + cmmdtyName + '"></li>'
                                        }
                                        continue
                                    } else {
                                        if (code === "075") {
                                            cmmdtyUrl = $("#" + $("#" + errors[i].itemNo).attr("mianid")).attr("href");
                                            cmmdtyName = $("#" + errors[i].itemNo).attr("title").split("x")[0];
                                            if (isEmpty(cmmdtyName)) {
                                                cmmdtyName = "赠品"
                                            }
                                            if (errors[i].errorMessage === "0") {
                                                lihtml += "<li><span class='has-over r'>已赠完</span><span class='pre-first bg-over'>赠品</span><span class='present-name fcl' title='" + cmmdtyName + "'>" + cmmdtyName + "</span></li>"
                                            } else {
                                                lihtml += "<li><span class='remain r'>剩余" + errors[i].errorMessage + "件</span><span class='pre-first'>赠品</span><span class='present-name fcl' title='" + cmmdtyName + "'>" + cmmdtyName + "</span></li>"
                                            }
                                            continue
                                        } else {
                                            if (code === "076") {
                                                cmmdtyName = $("#" + errors[i].itemNo).html();
                                                if (isEmpty(cmmdtyName)) {
                                                    cmmdtyName = "赠品"
                                                }
                                                cmmdtyUrl = $("#" + errors[i].itemNo).attr("href");
                                                lihtml += "<li><span class='fcl' title='" + cmmdtyName + "'>" + cmmdtyName + "</span></li>";
                                                continue
                                            }
                                        }
                                    }
                                }
                            }
                            $("#step6 #submit-btn").show();
                            $("#step6 .checkout-submit-btn-load").hide();
                            cloudCart2Submit.alertErrortip(code, errorTip, lihtml, cmmdtyUrl, true)
                        }
                    }
                }
            }, error: function() {
                cloudCart2Common.alertBox("小苏太忙，稍后再来试试");
                $("#step6 #submit-btn").show();
                $("#step6 .checkout-submit-btn-load").hide()
            }})
    }, alertErrortip: function(code, errorTip, lihtml, cmmdtyUrl, isSubmit) {
        var html = "";
        if (code == "002" || code == "005" || code == "006" || code == "007" || code == "064") {
            html = '<div class="limit-buy limit-nogoods J-dialog-limit01"><p class="tips tips-more"><i class="tip-icon tip-warning-24"></i>' + errorTip + '</p><a href="javascript:void(0);" class="arr prev"></a><a href="javascript:void(0);" class="arr next"></a><div class="list-pro-box "><ul class="list-box">' + lihtml + "</ul></div>" + ($("#directFlag").val() === "1" ? "<a target='_self' href='" + cmmdtyUrl + "' class='cart-btn return-cart'>返回商品详情</a>" : "<a target='_self' href='cart.html?langId=-7&storeId=10052&catalogId=10051' class='cart-btn return-cart'>返回购物车</a>") + '<a href="javascript:void(0);" class="close">关闭</a></div>';
            $.mLionDialog({css: {width: "440"}, http: function(e, o) {
                    e.find(".content").html(html)
                }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
            var proLen = $(".J-dialog-limit01 .list-box li").length, arr = $(".J-dialog-limit01 .arr");
            if (proLen >= 2) {
                cartListLoop.listloop({wrap: ".J-dialog-limit01", loopBox: ".list-box", step: {wide: 2, narrow: 2}, scrollWidth: {wide: 300, narrow: 304}, hasLabel: false, isRandom: false})
            } else {
                if (proLen == 1) {
                    $(".J-dialog-limit01 .list-box li").addClass("one");
                    arr.hide()
                }
            }
        } else {
            if (code == "075" || code == "076") {
                html = "<div class='layer_present'><div class='main'><div class='warn wd300'><span class='warn_text'><b class='warn_icon'></b>" + (code === "075" ? "以下赠品剩余数量不足，是否继续购买？" : "以下商品的赠送活动已结束，是否继续购买？") + "</span></div><div class='present-cont wd290'><ul>" + lihtml + "</ul></div><div class='present-btn'><a href='javascript:;' class='continue-acc close'>继续购买</a>" + ($("#directFlag").val() === "1" ? "<a target='_self' href='" + cmmdtyUrl + "' class='abandon-acc'>回商品详情</a>" : "<a target='_self' href='cart.html?langId=-7&storeId=10052&catalogId=10051' class='abandon-acc' name='new_icart2_account_back'>返回购物车</a>") + "</div></div></div>";
                $.mLionDialog({css: {width: "440px"}, http: function(e, o) {
                        e.find(".content").html(html);
                        if (isSubmit) {
                            $(".m-lion-dialog .continue-acc").click(function() {
                                $("#submit-btn").trigger("click")
                            })
                        }
                    }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
            } else {
                if (code === "055" || code === "091") {
                    cloudCart2Common.alertBox(errorTip);
                    $(".m-lion-dialog").find(".content .close").text("继续");
                    $("body").on("click", ".m-lion-dialog .content .close", function() {
                        window.location.reload()
                    })
                } else {
                    if (code === "103") {
                        cmmdtyUrl = $($("#step3").find("table").find(".package-name a")[0]).attr("href");
                        cloudCart2Common.alertBox(errorTip);
                        $(".m-lion-dialog").find(".return-cart").attr("href", cmmdtyUrl)
                    } else {
                        if (code === "098" || (isSubmit && code === "203")) {
                            html = "<div class='idcard-confirm'><div class='tip-word rel clearfix' id='tipword'><i class='suona fl'></i><p class='fl'>确认身份信息很重要哦，出错了就不能通过中国海关的检查</p><div class='why fl'><a href='javascript:void(0);' class='why-idcard ml20'>为什么要身份证？</a><div class='reasons'><p>苏宁海外购商品需清关后入境，根据海关要求，需要您填写您的身份证进行个人物品入境申报。</p><p>因为海关会对您的身份信息进行验证，请确保填写正确，否则商品可能无法正常通关。</p><p>身份证信息将加密保管，绝不对外泄露。</p><div class='ui-tooltip-arrow'><i class='ui-tooltip-arrow-front'>◆</i><i class='ui-tooltip-arrow-back'>◆</i></div></div></div></div><div class='idcard-form'><dl class='confirm-row clearfix'><dt>支付人姓名：</dt><dd><input id ='payname' type='text' class='ui-text'></dd><dd class='hide'><i class='tip-icon-orange'></i><em class='c-f90'></em></dd></dl><dl class='confirm-row clearfix'><dt>身份证号：</dt><dd><input id='payidnum' type='text' class='ui-text'></dd><dd class='hide'><i class='tip-icon-orange'></i><em class='c-f90'></em></dd></dl></div><div class='dialog-action mt20 clearfix'><a href='javascript:;' class='confirm-btn mr20'>确认</a><a href='javascript:;' class='cancel-btn close'>取消</a></div></div>";
                            $.mLionDialog({css: {width: "648px"}, http: function(e, o) {
                                    e.find(".content").html(html);
                                    $(".m-lion-dialog .confirm-btn").click(function() {
                                        if (valPayName() && valPayIdNum()) {
                                            var payname = cloudCart2Common.getInputVal($("#payname")), payidnum = cloudCart2Common.getInputVal($("#payidnum"));
                                            $.unmLionDialog();
                                            $("#submit-btn").trigger("click", [payname, payidnum])
                                        }
                                    })
                                }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                            var idcard = $(".idcard-confirm "), whyIdcard = idcard.find(".why");
                            whyIdcard.hover(function() {
                                $(this).addClass("why-hover")
                            }, function() {
                                $(this).removeClass("why-hover")
                            })
                        } else {
                            cloudCart2Common.alertBox(errorTip)
                        }
                    }
                }
            }
        }
    }};
var cloudCart2Common = {getInputVal: function(inputObj) {
        var inputVal = $.trim(inputObj.val());
        var defaultVal = inputObj.attr("placetext");
        if (inputVal == defaultVal && inputObj.attr("data-is-enter") == 0) {
            inputVal = ""
        }
        return inputVal
    }, alertBox: function(message) {
        var tagA = "";
        if ($("#directFlag").val() === "1") {
            tagA = "<a target='_self' href='" + $("#step3").find(".product-name a")[0].href + "' class='cart-btn return-cart'>返回商品详情</a>"
        } else {
            tagA = "<a target='_self' href='cart.html?langId=-7&storeId=10052&catalogId=10051' class='cart-btn return-cart'>返回购物车</a>"
        }
        var html = "<div class='limit-buy limit-nogoods'><p class='tips auto-height'><i class='tip-icon tip-warning-24'></i>" + message + "</p>" + tagA + "<a href='javascript:void(0);' class='close'>关闭</a></div>";
        $.mLionDialog({css: {width: "436"}, http: function(e, o) {
                e.find(".content").html(html)
            }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300})
    }, checkSubmit: function() {
        var deliverySaved = ($(".addr-selected").length !== 0);
        var payModeSaved = ($(".pay-checked").length !== 0);
        var invoiceSaved = ($("#step4 #finishDivInvoice").length !== 0);
        if (deliverySaved) {
            $("#step6 .order-address").removeClass("hide")
        }
        var bookingCartFlag = $(".bookingCart").length != 0;
        if (!deliverySaved) {
            cloudCart2Common.showSubmitTip();
            $(".checkout-float-warning-content").html("您需先选择配送地址，再提交订单")
        } else {
            if (!payModeSaved) {
                cloudCart2Common.showSubmitTip();
                $(".checkout-float-warning-content").html("您需先选择支付方式，再提交订单")
            } else {
                if (!invoiceSaved) {
                    cloudCart2Common.showSubmitTip();
                    $(".checkout-float-warning-content").html("您需先保存发票信息，再提交订单")
                } else {
                    if (bookingCartFlag && $(".pay-checked").attr("paytype") == "01" && $(".pay-checked").attr("childpaytype") == "01" && !$("#finalPayAgreeId").prop("checked")) {
                        cloudCart2Common.showSubmitTip();
                        $(".checkout-float-warning-content").html("同意支付定金后可提交订单")
                    } else {
                        if (bookingCartFlag && $(".pay-checked").attr("paytype") == "01" && $(".pay-checked").attr("childpaytype") == "01" && $("#finalPayAgreeId").prop("checked")) {
                            $(".checkout-float-warning").show();
                            $(".checkout-float-warning-content").html("请在30分钟内完成支付，过期后订单自动取消");
                            $("#step6 .checkout-submit-btn:not(.cart-btn-disable)").show();
                            $("#step6 .cart-btn-disable").hide()
                        } else {
                            $(".checkout-float-warning").hide();
                            $("#step6 .checkout-submit-btn:not(.cart-btn-disable)").show();
                            $("#step6 .cart-btn-disable").hide()
                        }
                    }
                }
            }
        }
    }, showSubmitTip: function() {
        $(".checkout-float-warning").show();
        $("#step6 .checkout-submit-btn:not(.cart-btn-disable)").hide();
        $("#step6 .cart-btn-disable").show()
    }, cart2Logon: function() {
        var targetUrl = "cart.html?langId=-7&storeId=10052&catalogId=10051";
        if ($("#directFlag").val() === "1") {
            targetUrl = $("#step3").find(".product-name a")[0].href
        }
        var url = "https://passport.suning.com/ids/login?service=" + encodeURIComponent("https://aq.suning.com/asc/auth?targetUrl=") + encodeURIComponent(targetUrl) + "&loginTheme=b2c";
        window.location.href = url
    }, getCookie: function(key) {
        var value = document.cookie.match(new RegExp("(^| )" + key + "=([^;]*)(;|$)"));
        if (!isEmpty(value)) {
            return unescape(value[2])
        }
        return""
    }, showTipForOnlinePay: function() {
        if ($(".reserve").length <= 0 && $(".bookingCart").length <= 0) {
            var pay = $(".pay-checked");
            if (pay.length > 0) {
                var tip = $(".checkout-warning.capricious-pay");
                if (tip.length > 0) {
                    if (pay.attr("paytype") == "01") {
                        tip.show()
                    } else {
                        tip.hide()
                    }
                } else {
                    if (pay.attr("paytype") == "01") {
                        var checkoutDiv = $(".checkout-bar").find(".checkout-bar-r");
                        var addstr = "";
                        if ($(".capricious-pay").hasClass("hide")) {
                            $(".sum-pay-price").removeClass("sum-pay-price-sp");
                            addstr = "<p class='checkout-warning capricious-pay'><i class='tip-icon tip-warning mr5'></i>提交订单后尽快支付，商品才不会被人抢走哦！</p>";
                            checkoutDiv.find("div").append(addstr)
                        } else {
                            addstr = "<p class='checkout-warning'><i class='tip-icon tip-warning mr5'></i>提交订单后尽快支付，商品才不会被人抢走哦！</p>";
                            checkoutDiv.append(addstr)
                        }
                    }
                }
            }
        }
    }};
var _wmmq = _wmmq || [];
function haoyeInit() {
    _wmmq.push(["db", "ifc"], ["sitecode", "T-000130-01"]);
    var cmmdtyArray = $("#step3").find(".fouth-column[cmmdtycode]");
    $.each(cmmdtyArray, function(n, cmmdtyInfo) {
        var cmmdtyCode = $(cmmdtyInfo).attr("cmmdtyCode").substr(9, 19);
        var cmmdtyQty = $.trim($(cmmdtyInfo).text());
        _wmmq.push(["cgid", cmmdtyCode, "cgnum", cmmdtyQty])
    });
    _wmmq.push(["_trackPoint"])
}
;