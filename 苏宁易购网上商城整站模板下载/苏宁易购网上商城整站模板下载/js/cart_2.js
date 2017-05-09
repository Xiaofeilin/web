var cloudCart2 = {init: function() {
        cloudCart.supportPlaceHolder.init();
        cloudCart.changeInputBorder();
        this.address.init();
        this.payMethod.init();
        cloudCart2Payment.storeShopTip();
        if ($(".bookingCart").length > 0) {
            this.payMethod.bookingCartClassLoad();
            bookingCart.init()
        }
        this.cStoreMessage.init();
        this.invoice.init();
        this.invoice.bindEvent();
        this.serviceInfo.init();
        this.promotion.init();
        cloudCart2Submit.init();
        this.cartSubsidy();
        cart2Util.tipFn();
        this.fixBottom();
        this.controlEnergySubsidiesAmount();
        cloudCart.floatBar({zIndex: 7700, contents: $(".cart-float-bar"), align: "right", vertical: "bottom", css: {"margin-bottom": 180}});
        if ($(".addr-selected").length !== 0 && $("#commodityType_ID").val() !== "0") {
            cloudCart2Cmmdty.cInstallquery()
        }
        if ($("#finish_coupon_page").length === 0 && $(".bookingCart").length == 0) {
            $("#coupon_title").addClass("open");
            cloudCart2Coupon.bindEvent.editCoupon(false)
        }
        cloudCart2Payment.otherPaySwitch();
        cloudCart2Common.checkSubmit();
        cloudCart2Payment.priceShowFn()
    }, address: {lock: 0, getLock: function() {
            cloudCart2.address.lock = 1;
            $(".label-tips").removeClass("hide")
        }, unLock: function() {
            cloudCart2.address.lock = 0;
            $(".label-tips").addClass("hide")
        }, init: function() {
            this.selectDeliveryMode();
            this.addressSelect();
            this.selfPick();
            this.validation();
            this.initSelfApart();
            addressUtil.displayShowAll();
            addressUtil.initSNAddress();
            addressUtil.displayShow()
        }, addressSelect: function() {
            var that = this;
            $(document).on("hover", ".address-finish .addr:not(.add-addr)", function(e) {
                var _that = $(this);
                _that.addClass("addr-cur").siblings(".addr").removeClass("addr-cur");
                e.stopPropagation()
            });
            $(document).on("mouseleave", ".address-finish .addr:not(.add-addr)", function() {
                var _that = $(this);
                _that.removeClass("addr-cur")
            });
            $(document).on("click", ".address-finish .addr:not(.add-addr)", function() {
                var addrLi = $(this);
                if (cloudCart2.address.lock == 1) {
                    return
                } else {
                    cloudCart2.address.getLock()
                }
                probeAuthStatus(function() {
                    var optType = (addrLi.attr("pickupAddress") == "true") ? "1" : "0";
                    var addrInfo = {cart2No: $("#cart2No").val(), optType: optType, addressID: addrLi.attr("id"), provinceName: addrLi.attr("provname"), provinceCode: addrLi.attr("provcode"), cityName: addrLi.attr("cityname"), cityCode: addrLi.attr("citycode"), districtName: addrLi.attr("distname"), districtCode: addrLi.attr("distcode"), townName: addrLi.attr("townname"), townCode: addrLi.attr("towncode"), smTownCode: addrLi.attr("smtowncode"), receiverName: addrLi.attr("receivername"), receiverMobile: addrLi.attr("receivermobile"), detailAddress: addrLi.attr("detailaddr"), receiverTelAreaCode: addrLi.attr("areacode"), receiverTel: addrLi.attr("telephone"), receiverTelExtNum: addrLi.attr("extnum"), deliveryRegionCode: addrLi.attr("deliveryregioncode"), overSeaFlag: $("#overSeaFlag_ID").val()};
                    if (addrInfo.overSeaFlag == "1" || $("#footballProduct").val() == "true") {
                        addrInfo.idNumber = addrLi.attr("idnumber")
                    }
                    if (addrInfo.overSeaFlag != "0") {
                        addrInfo.postalCode = addrLi.attr("postalcode")
                    }
                    if (addrInfo.optType == "1") {
                        function doneAfterGetSite(siteList) {
                            var siteAvailable = false, townname = "", detailaddr = "";
                            for (var i = 0; i < siteList.length; i++) {
                                if (addrLi.attr("selftakeshopcode") == siteList[i].id) {
                                    townname = siteList[i].name;
                                    detailaddr = siteList[i].detailAddr;
                                    siteAvailable = true;
                                    break
                                }
                            }
                            if (siteAvailable) {
                                addrInfo.selfPickupType = addrLi.attr("selfpickuptype");
                                addrInfo.selfTakeShopCode = addrLi.attr("selftakeshopcode");
                                addrInfo.selfPickupCode = addrLi.attr("selfpickupcode");
                                addrInfo.townName = townname;
                                addrInfo.townCode = addrInfo.deliveryRegionCode.substring(5);
                                addrInfo.detailAddress = detailaddr;
                                if (checkAddrInfo(addrInfo)) {
                                    addressUtil.confDeliInfo(addrInfo)
                                } else {
                                    cloudCart2.address.unLock();
                                    $("#step1").find("#" + addrInfo.addressID + "").find(".modify-addr").trigger("click")
                                }
                            } else {
                                cloudCart2.address.unLock();
                                $("#step1").find("#" + addrInfo.addressID + "").find(".modify-addr").trigger("click")
                            }
                        }
                        addressUtil.sites.getSiteList(addrInfo.cart2No, addrInfo.provinceCode, addrInfo.cityCode, addrInfo.districtCode, $("#commodityType_ID").val() !== "0", doneAfterGetSite)
                    } else {
                        if (checkAddrInfo(addrInfo)) {
                            addressUtil.confDeliInfo(addrInfo)
                        } else {
                            cloudCart2.address.unLock();
                            $("#step1").find("#" + addrInfo.addressID + "").find(".modify-addr").trigger("click")
                        }
                    }
                }, function() {
                    cloudCart2Common.cart2Logon()
                })
            });
            $(document).on("click", ".addr .del", function(e) {
                var _that = $(this);
                $.mLionDialog({css: {width: "270px"}, title: "温馨提示", http: function(e, o) {
                        var html = '<div class="add-cart-prompt del-address"><p class="tips"><i class="tip-icon tip-warning-24"></i>确定删除地址？</p><div class="know"><a href="javascript:void(0)" class="cart-btn ok-btn">确定</a> <a href="javascript:void(0)" class="cart-btn cancel-btn close">取消</a></div></div>';
                        e.find(".content").html(html);
                        $(".cart-btn.ok-btn").click(function(e) {
                            if (cloudCart2.address.lock == 1) {
                                return
                            } else {
                                cloudCart2.address.getLock()
                            }
                            probeAuthStatus(function() {
                                addressUtil.deleteAddress(_that);
                                if ($(".m-lion-dialog").length > 0) {
                                    $.unmLionDialog()
                                }
                            }, function() {
                                cloudCart2Common.cart2Logon()
                            });
                            e.preventDefault()
                        })
                    }, overlayCss: {background: "black", opacity: "0.3"}, fadeIn: 300, fadeOut: 300});
                e.preventDefault();
                e.stopPropagation()
            });
            $(document).on("click", ".address-finish .show-all", function(e) {
                var _that = $(this);
                _that.remove();
                that.addressLabel();
                e.preventDefault()
            });
            $(document).on("click", ".address-finish .set-default", function(e) {
                if (cloudCart2.address.lock == 1) {
                    return
                } else {
                    cloudCart2.address.getLock()
                }
                var _that = $(this);
                probeAuthStatus(function() {
                    addressUtil.setDefaultAddr(_that)
                }, function() {
                    cloudCart2Common.cart2Logon()
                });
                e.preventDefault();
                e.stopPropagation()
            });
            $(document).on("click", ".address-finish .modify-addr", function(e) {
                if (cloudCart2.address.lock == 1) {
                    return
                }
                var addrLi = $(this).parents("li");
                var optType = (addrLi.attr("pickupAddress") == "true") ? "5" : "3";
                var addrInfo = {cart2No: $("#cart2No").val(), optType: optType, addressID: addrLi.attr("id"), provinceName: addrLi.attr("provname"), provinceCode: addrLi.attr("provcode"), provWCSCode: addrLi.attr("provwcscode"), cityName: addrLi.attr("cityname"), cityCode: addrLi.attr("citycode"), cityWCSCode: addrLi.attr("citywcscode"), districtName: addrLi.attr("distname"), districtCode: addrLi.attr("distcode"), distWCSCode: addrLi.attr("distwcscode"), townName: addrLi.attr("townname"), townCode: addrLi.attr("towncode"), townWCSCode: addrLi.attr("townwcscode"), receiverName: addrLi.attr("receivername"), receiverMobile: addrLi.attr("receivermobile"), detailAddress: addrLi.attr("detailaddr"), receiverTelAreaCode: addrLi.attr("areacode"), receiverTel: addrLi.attr("telephone"), receiverTelExtNum: addrLi.attr("extnum"), deliveryRegionCode: addrLi.attr("deliveryregioncode"), smTownCode: addrLi.attr("smtowncode"), idNumber: addrLi.attr("idnumber"), postalCode: addrLi.attr("postalcode"), overSeaFlag: $("#overSeaFlag_ID").val(), selfPickupType: addrLi.attr("selfpickuptype"), selfTakeShopCode: addrLi.attr("selftakeshopcode"), selfPickupCode: addrLi.attr("selfpickupcode"), defaultAddress: addrLi.attr("defaultaddress")};
                addressUtil.showAddrInput(addrInfo, true);
                e.preventDefault();
                e.stopPropagation()
            });
            $(document).on("click", ".address-finish .add-addr,.address-finish .edit", function() {
                if (cloudCart2.address.lock == 1) {
                    return
                }
                if (new Number($("#addressbox").attr("count")) >= 20) {
                    cloudCart2Common.alertBox("您的地址个数已达上限，删除部分地址才能添加哦！")
                } else {
                    var currentAddr = $("#addressbox");
                    var addrInfo = {cart2No: $("#cart2No").val(), optType: "", addressID: "", provinceName: currentAddr.attr("provname"), provinceCode: currentAddr.attr("provcode"), cityName: currentAddr.attr("cityname"), cityCode: currentAddr.attr("citycode"), districtName: currentAddr.attr("distname"), districtCode: currentAddr.attr("distcode")};
                    addressUtil.showAddrInput(addrInfo, false)
                }
            });
            $(document).on("click", ".address-finish .pickup-title .name,.address-finish .pickup-title a", function() {
                if (cloudCart2.address.lock == 1) {
                    return
                }
                if (new Number($("#addressbox").attr("count")) >= 20) {
                    cloudCart2Common.alertBox("您的地址个数已达上限，删除部分地址才能添加哦！")
                } else {
                    if ($(".address-finish .addr:not(.add-addr)[pickupaddress='true']").length >= 5) {
                        cloudCart2Common.alertBox("您的自提地址已满5条，不能再添加新的自提地址，您可以修改现有自提地址。")
                    } else {
                        var currentAddr = $("#addressbox");
                        var addrInfo = {cart2No: $("#cart2No").val(), optType: "", addressID: "", selectedSite: true, provinceName: currentAddr.attr("provname"), provinceCode: currentAddr.attr("provcode"), cityName: currentAddr.attr("cityname"), cityCode: currentAddr.attr("citycode"), districtName: currentAddr.attr("distname"), districtCode: currentAddr.attr("distcode")};
                        addressUtil.showAddrInput(addrInfo, false)
                    }
                }
            });
            $(document).on("click", "#sava-addr-btn.cart-btn", function() {
                $("#sava-addr-btn").removeClass("cart-btn").addClass("save-loading").html("<b></b>保存中...");
                $(".save-addr-error").addClass("hide").html("");
                var optType = addressUtil.isEditBox() ? (addressUtil.isSelfPickUp() ? "5" : "3") : (addressUtil.isSelfPickUp() ? "4" : "2");
                var addrTab = addressUtil.isSelfPickUp() ? $("#pickup_tab") : $("#delivery_tab");
                var addrForm = addressUtil.isSelfPickUp() ? $(".zt-address-form") : $(".sh-address-form");
                var addrInfo = {cart2No: $("#cart2No").val(), optType: optType, addressID: addrTab.attr("addressid"), provinceName: addrTab.attr("provname"), provinceCode: addrTab.attr("provcode"), provWCSCode: addrTab.attr("provwcscode"), cityName: addrTab.attr("cityname"), cityCode: addrTab.attr("citycode"), cityWCSCode: addrTab.attr("citywcscode"), districtName: addrTab.attr("distname"), districtCode: addrTab.attr("distcode"), distWCSCode: addrTab.attr("distwcscode"), townName: addrTab.attr("townname"), townCode: addrTab.attr("towncode"), townWCSCode: addrTab.attr("townwcscode"), receiverName: cloudCart2Common.getInputVal(addrForm.find(".user")), receiverMobile: cloudCart2Common.getInputVal(addrForm.find(".mobile")), overSeaFlag: $("#overSeaFlag_ID").val(), receiverTelAreaCode: cloudCart2Common.getInputVal(addrForm.find(".area-number")), smTownCode: addrTab.attr("smtowncode"), receiverTel: cloudCart2Common.getInputVal(addrForm.find(".tel-number")), selfPickupType: addrTab.attr("selfpickuptype"), receiverTelExtNum: cloudCart2Common.getInputVal(addrForm.find(".ext-number")), selfTakeShopCode: addrTab.attr("selftakeshopcode"), deliveryRegionCode: addrTab.attr("deliveryregioncode"), selfPickupCode: addrTab.attr("selfpickupcode")};
                if (addrInfo.overSeaFlag == "1" || $("#footballProduct").val() == "true") {
                    addrInfo.idNumber = cloudCart2Common.getInputVal(addrForm.find(".card-id"))
                }
                if (addrInfo.overSeaFlag != "0") {
                    addrInfo.postalCode = cloudCart2Common.getInputVal(addrForm.find(".postalcode"))
                }
                if (!addressUtil.isSelfPickUp()) {
                    addrInfo.defaultAddress = $(".sh-address-form").find("#set-default").prop("checked");
                    addrInfo.detailAddress = cloudCart2Common.getInputVal(addrForm.find(".detial-address"))
                } else {
                    addrInfo.detailAddress = addrTab.attr("detailaddress")
                }
                if (!checkDelInfo(addrForm)) {
                    $("#sava-addr-btn").removeClass("save-loading").addClass("cart-btn").html("保存");
                    return
                }
                probeAuthStatus(function() {
                    addressUtil.confDeliInfo(addrInfo)
                }, function() {
                    cloudCart2Common.cart2Logon()
                })
            })
        }, validation: function() {
            var oldNum = "";
            $(document).on("blur", ".delivery-item-content input", function() {
                if ($(this).hasClass("user")) {
                    valDlvReceiver($(this))
                } else {
                    if ($(this).hasClass("mobile") && !addressUtil.isEditBox()) {
                        valDlvRecMobile($(this))
                    } else {
                        if ($(this).hasClass("area-number")) {
                            valDlvRecTel($(this).parents(".address-form"))
                        } else {
                            if ($(this).hasClass("tel-number")) {
                                valDlvRecTel($(this).parents(".address-form"))
                            } else {
                                if ($(this).hasClass("ext-number")) {
                                    valDlvRecTel($(this).parents(".address-form"))
                                } else {
                                    if ($(this).hasClass("detial-address")) {
                                        valDlvDetail($(this))
                                    } else {
                                        if ((($("#overSeaFlag_ID").val() == "1") || $("#footballProduct").val() == "true") && $(this).hasClass("card-id")) {
                                            valCardId($(this))
                                        } else {
                                            if (($("#overSeaFlag_ID").val() != "0") && $(this).hasClass("postalcode")) {
                                                valPostalCode($(this))
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
            $(document).on("focus", ".delivery-item-content .mobile", function() {
                if (addressUtil.isEditBox()) {
                    oldNum = $(this).val();
                    if (oldNum) {
                        $(this).val("");
                        $(this).siblings("span").html("");
                        $(this).css("color", "#333")
                    } else {
                        $(this).val($(this).attr("placetext")).css("color", "#bbb")
                    }
                }
            });
            $(document).on("blur", ".delivery-item-content .mobile", function() {
                if (addressUtil.isEditBox()) {
                    if ($(this).val().length <= 0) {
                        $(this).val(oldNum)
                    } else {
                        $(this).css("color", "#333")
                    }
                    valCardId($(this))
                }
            });
            $(document).on("focus", ".delivery-item-content .card-id", function() {
                if (addressUtil.isEditBox()) {
                    oldNum = $(this).val();
                    if (oldNum) {
                        $(this).val("");
                        $(this).siblings("span").html("");
                        $(this).css("color", "#333")
                    } else {
                        $(this).val($(this).attr("placetext")).css("color", "#bbb")
                    }
                }
            });
            $(document).on("blur", ".delivery-item-content .card-id", function() {
                if (addressUtil.isEditBox()) {
                    if ($(this).val().length <= 0) {
                        $(this).val(oldNum)
                    } else {
                        $(this).css("color", "#333")
                    }
                    valCardId($(this))
                }
            });
            $("body").on("blur", "#payname", function() {
                valPayName()
            });
            $("body").on("blur", "#payidnum", function() {
                valPayIdNum()
            })
        }, addressLabel: function() {
            var moreAddr = $(".addr-list"), addrLen = moreAddr.find(".addr").length, addrHeight, startIndex, extraHeight = 0, lastHeight;
            if (screen.width >= 1200) {
                addrHeight = Math.ceil(addrLen / 5);
                startIndex = 5
            } else {
                addrHeight = Math.ceil(addrLen / 4);
                startIndex = 4
            }
            extraHeight = Math.ceil((moreAddr.find(".addr-self-top").length) / startIndex);
            lastHeight = 120 * addrHeight + extraHeight * 12;
            moreAddr.css({height: lastHeight + "px", opacity: "show"})
        }, initSelfApart: function() {
            var moreAddr = $(".addr-list"), addLi = moreAddr.find(".addr"), addrLen = moreAddr.find(".addr").length, startIndex, currentRow, startFlag, endFlag;
            addLi.removeClass("addr-self-top");
            if (screen.width >= 1200) {
                startIndex = 5
            } else {
                startIndex = 4
            }
            for (var i = startIndex; i < addrLen; i++) {
                if (addLi.eq(i).find(".addr-flag").length != 0) {
                    currentRow = Math.ceil((i + 1) / startIndex);
                    startFlag = (currentRow - 1) * startIndex;
                    endFlag = (currentRow - 1) * startIndex + (startIndex - 1);
                    if (endFlag > addrLen - 1) {
                        endFlag = addrLen - 1
                    }
                    for (var j = startFlag; j <= endFlag; j++) {
                        addLi.eq(j).addClass("addr-self-top")
                    }
                }
            }
        }, selectDeliveryMode: function() {
            var that = this;
            $(document).on("click", ".delivery-mode .delivery-way-bd", function(e) {
                var box = $(this).closest(".delivery-mode");
                var _index = $(this).index();
                $(this).addClass("delivery-way-checked").siblings(".delivery-way-bd").removeClass("delivery-way-checked");
                var deliveryBox = $(this).closest(".delivery-mode").find(".delivery-item-content");
                deliveryBox.hide().eq(_index - 1).show();
                if (_index == 2) {
                    that.selfPickScroll(box)
                }
                if ($(this).parents(".m-lion-dialog")) {
                    $.resizeLionDialog()
                }
            })
        }, selfPick: function() {
            $(document).on("mouseenter mouseleave click", ".pick-self-box li", function(e) {
                var that = $(this);
                switch (e.type) {
                    default:
                    case"mouseenter":
                        if (that.hasClass("full-disable")) {
                            return
                        }
                        that.addClass("cursor");
                        break;
                    case"mouseleave":
                        that.parent().find("li").removeClass("cursor");
                        break;
                    case"click":
                        if (that.hasClass("full-disable")) {
                            return
                        }
                        that.addClass("selected").siblings("li").removeClass("selected");
                        addressUtil.sites.selectSite();
                        break
                    }
            });
            $(document).on("click", ".delivery-mode .checkbox", function(e) {
                var selected = $(this).prop("checked");
                if (selected) {
                    $(this).closest(".cart-checkbox").addClass("cart-checkbox-checked");
                    $("#set-default-tip").removeClass("hide")
                } else {
                    $(this).closest(".cart-checkbox").removeClass("cart-checkbox-checked");
                    $("#set-default-tip").addClass("hide")
                }
            })
        }, selfPickScroll: function(obj) {
            var selectLi = obj.find(".pick-self-box .selected");
            if (selectLi.length != 0) {
                var scrollTop = selectLi.position().top;
                $(".pick-self-box").scrollTop(scrollTop)
            }
        }}, payMethod: {init: function() {
            this.selectPayWay()
        }, selectPayWay: function() {
            var _this = this;
            $(document).on("mouseenter mouseleave click", ".payment-container .pay-item", function(e) {
                var that = $(this);
                switch (e.type) {
                    default:
                    case"mouseenter":
                        that.addClass("pay-hover");
                        if (that.hasClass("pay-complex-fn") && that.hasClass("pay-complex-fn pay-checked")) {
                            _this.showProduct(that, e)
                        }
                        break;
                    case"mouseleave":
                        that.removeClass("pay-hover");
                        if (that.hasClass("pay-complex-fn") && that.hasClass("pay-complex-fn pay-checked")) {
                            _this.hideProduct(that, e)
                        }
                        break;
                    case"click":
                        var oldPayChecked = $(".pay-checked");
                        if ($(".bookingCart").length != 0) {
                            if ((oldPayChecked.attr("childPayType") == that.attr("childPayType"))) {
                                return
                            }
                        } else {
                            if ((oldPayChecked.attr("payType") == that.attr("payType")) && oldPayChecked.find("#view-pay-list-01").length == that.find("#view-pay-list-01").length) {
                                return
                            }
                        }
                        cloudCart2Payment.doSavePayment(that, oldPayChecked);
                        if (that.hasClass("pay-complex-fn")) {
                            _this.showProduct(that, e)
                        } else {
                            if (that.hasClass("booking-pay-fn")) {
                                _this.showBookingPhone(that, e)
                            } else {
                                _this.checkOtherFn(that, e)
                            }
                        }
                        break
                    }
            });
            $(document).on("mouseenter mouseleave", ".payment-container .tip-icon", function(e) {
                switch (e.type) {
                    case"mouseenter":
                        _this.showWarning($(this), e);
                        break;
                    case"mouseleave":
                        _this.hideWarning($(this), e);
                        break
                    }
            })
        }, showBookingPhone: function(dom) {
            var dPaymentContainer = dom.closest(".payment-container");
            if ($(".addr-selected").length > 0) {
                dPaymentContainer.addClass("booking-payment-container-phone-show")
            }
        }, checkOtherFn: function(dom) {
            var dPaymentContainer = dom.closest(".payment-container");
            if (dPaymentContainer.hasClass("booking-payment-container")) {
                dPaymentContainer.removeClass("booking-payment-container-phone-show")
            }
        }, showWarning: function(dom, even) {
            var iDomPosition = dom.position(), thisPayItem = dom.closest(".pay-item"), tipDom = dom.siblings(".single-tooltip");
            if (tipDom.length > 0) {
                tipDom.stop().css({opacity: 1});
                return
            }
            $(".payment-container .pay-list .single-tooltip").not(".tip-product-dom").stop().unbind("hover").remove();
            var obj = {msg: dom.siblings(".pay-info-boxes").html(), wrap: thisPayItem, pos: "top", style: {left: iDomPosition.left + dom.width() / 2 - 28, top: iDomPosition.top - dom.height() - 20}, callback: function() {
                    tipDom = dom.siblings(".single-tooltip");
                    if (cloudCart.ieVersion(7)) {
                        tipDom.css("width", tipDom.find(".pay-info-box").width() + 10)
                    }
                    tipDom.hover(function() {
                        $(this).stop().css({opacity: 1})
                    }, function() {
                        $(this).animate({opacity: 0}, 1000, function() {
                            tipDom.unbind("hover").remove()
                        })
                    })
                }};
            if (bigscreen) {
                if (thisPayItem.index() == 4 || thisPayItem.index() == 5) {
                    obj.flag = "tip-ui-left-show";
                    obj.style.left = "auto";
                    obj.style.right = "-4px"
                }
            } else {
                if (thisPayItem.index() == 3 || thisPayItem.index() == 4) {
                    obj.flag = "tip-ui-left-show";
                    obj.style.left = "auto";
                    obj.style.right = "-4px"
                }
            }
            cart2Util.tip(obj)
        }, hideWarning: function(dom, even) {
            var tipDom = dom.siblings(".single-tooltip");
            tipDom.animate({opacity: 0}, 1000, function() {
                tipDom.unbind("hover").remove()
            })
        }, showProduct: function(dom, even) {
            var iDomPosition = dom.position(), dPayList = $(".payment-container .pay-list"), tipDom = dPayList.find(".tip-product-dom");
            if (tipDom.length > 0) {
                tipDom.stop().css({opacity: 1});
                return
            }
            var obj = {msg: $("#view-pay-list-01").html(), wrap: dPayList, pos: "bottom", style: {left: iDomPosition.left + dom.width() / 2 - 28, top: iDomPosition.top + dom.height() + 12}, flag: "tip-product-dom", callback: function() {
                    tipDom = dPayList.find(".tip-product-dom");
                    tipDom.hover(function() {
                        $(this).stop().css({opacity: 1})
                    }, function() {
                        $(this).animate({opacity: 0}, 1000, function() {
                            tipDom.unbind("hover").remove()
                        })
                    });
                    cartListLoop.listloop({wrap: ".J-dialog-ensure01", loopBox: ".ensure-list ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: false});
                    cartListLoop.listloop({wrap: ".J-dialog-ensure02", loopBox: ".ensure-list ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: false})
                }};
            var domIndex = dom.index();
            if (bigscreen) {
                if (domIndex == 4 || domIndex == 10) {
                    obj.extraClass = "tip-product-dom1"
                } else {
                    if (domIndex == 5 || domIndex == 11) {
                        obj.extraClass = "tip-product-dom2"
                    }
                }
            } else {
                if (domIndex == 3 || domIndex == 9) {
                    obj.extraClass = "tip-product-dom1"
                } else {
                    if (domIndex == 4 || domIndex == 10) {
                        obj.extraClass = "tip-product-dom2"
                    }
                }
            }
            cart2Util.tip(obj);
            cartListLoop.listloop({wrap: ".single-tooltip .J-dialog-ensure03", loopBox: ".ensure-list ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: false});
            cartListLoop.listloop({wrap: ".single-tooltip .J-dialog-ensure04", loopBox: ".ensure-list ul", step: {wide: 3, narrow: 3}, scrollWidth: {wide: 276, narrow: 276}, hasLabel: false, isRandom: false, hoverArr: false})
        }, hideProduct: function(dom, even) {
            var tipDom = $(".payment-container .pay-list .tip-product-dom");
            tipDom.animate({opacity: 0}, 1000, function() {
                tipDom.unbind("hover").remove()
            })
        }, bookingCartClassLoad: function() {
            if ($("#selectedChildPayTypeId").val() == "01" && $(".addr-selected").length > 0) {
                $(".booking-payment-container").addClass("booking-payment-container-phone-show")
            } else {
                if ($("#selectedChildPayTypeId").val() == "02") {
                    $("#payPhoneId").addClass("hide")
                }
            }
        }}, cStoreMessage: {tpl: {_default: "选填：对本次交易的补充说明（所填内容建议已经和卖家达成一致意见）", _errorTxt: "您输入的内容中包含非法字符！", _tip: "您最多可以输入85个字符"}, bindEvent: function() {
            var _this = this;
            var _reg = /[<>]+/;
            var iWords, _interval;
            $(document).on({focus: function() {
                    clearInterval(_interval);
                    $(this).addClass("focus").css("color", "#333");
                    if ($(this).val() == _this.tpl._default) {
                        $(this).val("")
                    }
                    var $this = $(this);
                    _interval = setInterval(function() {
                        iWords = $this.val();
                        if (_reg.test(iWords)) {
                            $this.parent().siblings(".tip-info").html("<span class='c-error'>" + _this.tpl._errorTxt + "</span>");
                            $this.addClass("error");
                            return
                        }
                        if (iWords.length > 85) {
                            $this.val(iWords.substring(0, 85));
                            $this.parent().siblings(".tip-info").html(_this.tpl._tip);
                            return
                        }
                        if (iWords.length < 85) {
                            $this.parent().siblings(".tip-info").empty()
                        }
                        $this.parent().siblings(".message-length").find(".current-length").html($this.val().length);
                        $this.removeClass("error")
                    }, 200)
                }, blur: function() {
                    clearInterval(_interval);
                    $(this).removeClass("focus");
                    if ($.trim($(this).val()) == "") {
                        $(this).val(_this.tpl._default).removeAttr("style")
                    }
                }}, ".message-input-box textarea")
        }, init: function() {
            this.bindEvent()
        }}, invoice: {init: function() {
            var _index;
            $(document).on("click", ".invoice-type li", function(event) {
                var invoiceTypeItem = $(".invoice-type li");
                if ($(this).find(":radio").attr("disabled") == "disabled" || $(this).index() > 2) {
                    return
                }
                $(this).addClass("selected");
                $(this).find(":radio").attr("checked", "checked");
                var siblingsLi = $(this).siblings("li");
                siblingsLi.removeClass("selected");
                siblingsLi.find(":radio").removeAttr("checked");
                _index = invoiceTypeItem.index(this);
                if (_index == 0) {
                    var specie_c = $("#commodityType_ID").val() == "1" || $("#commodityType_ID").val() == "2";
                    var supplierDeliveryFlag = $("#supplierDeliveryFlag").length == 0;
                    if (!supplierDeliveryFlag && specie_c) {
                        $("#invocieNoticeDiv").removeClass("hide");
                        $("#invoiceNoticeOneId").removeClass("hide");
                        $("#snDeliverFlagId").removeClass("hide");
                        $("#invoiceNoticeTwoId").removeClass("hide");
                        $("#cDeliverFlagId").removeClass("hide")
                    } else {
                        if (!supplierDeliveryFlag) {
                            $("#invocieNoticeDiv").removeClass("hide");
                            $("#snDeliverFlagId").removeClass("hide")
                        } else {
                            if (specie_c) {
                                $("#invocieNoticeDiv").removeClass("hide");
                                $("#cDeliverFlagId").removeClass("hide")
                            }
                        }
                    }
                    cloudCart2Invoice.clearVATInvoiceError();
                    if ($("#ePaperInvoice").length > 0) {
                        cloudCart2Invoice.clearElectronInvoiceError()
                    }
                } else {
                    $("#invocieNoticeDiv").addClass("hide");
                    $("#cDeliverFlagId").addClass("hide")
                }
                $(".invoice-content").hide().eq(_index).show();
                if (_index == 1) {
                    cloudCart2Invoice.clearCommonInvoiceError();
                    if ($("#ePaperInvoice").length > 0) {
                        cloudCart2Invoice.clearElectronInvoiceError()
                    }
                    var companyInvoiceTaxPayerName = $("#companyInvoiceTaxPayerName").val();
                    var companyInvoiceTaxPayerPhone = $("#companyInvoiceTaxPayerPhone").val();
                    var companyInvoiceTaxPayerAddr = $("#companyInvoiceTaxPayerAddr").val();
                    var deliveryType = $("#deliveryType").attr("deliveryType");
                    if (isEmpty(companyInvoiceTaxPayerName) && isEmpty(companyInvoiceTaxPayerPhone) && isEmpty(companyInvoiceTaxPayerAddr)) {
                        if (deliveryType == 1) {
                            var receiverNameId = $("#receiverNameId").html();
                            var receiverMobileId = $("#receiverMobileId").html();
                            var receiverAddress = $("#receiverAddressOneId").html() + $("#receiverAddressTwoId").html();
                            $("#companyInvoiceTaxPayerName").val(receiverNameId);
                            $("#companyInvoiceTaxPayerPhone").val(receiverMobileId);
                            $("#companyInvoiceTaxPayerAddr").val(receiverAddress)
                        }
                    }
                }
                if (_index == 2) {
                    cloudCart2Invoice.clearVATInvoiceError();
                    cloudCart2Invoice.clearCommonInvoiceError()
                }
            });
            if ($("#step4 #finishDivInvoice").length == 0) {
                $("#step4").find("input[name='invoice-type'][checked='checked']").trigger("click")
            } else {
                if ($("#invoiceTypeId").val() == "02") {
                    probeAuthStatus(function() {
                        cloudCart2Invoice.bindEven.saveInvoiceTitle("", $.trim($("#invoiceTitle").html()), 0, "")
                    }, function() {
                        cloudCart2Common.cart2Logon()
                    })
                }
            }
            if ($("#step4 .invoice-current").length > 0) {
                probeAuthStatus(function() {
                    cloudCart2Invoice.queryInvoiceTitleList();
                    cloudCart2Invoice.loadVatInfo()
                }, function() {
                    cloudCart2Common.cart2Logon()
                })
            }
            $(document).on("click", ".invoice-container .checkbox", function(e) {
                var selected = $(this).prop("checked");
                if (selected) {
                    $(this).closest(".cart-checkbox").addClass("cart-checkbox-checked")
                } else {
                    $(this).closest(".cart-checkbox").removeClass("cart-checkbox-checked")
                }
            });
            this.isVoiHide();
            if ($(".voi-item").length == 1) {
                $(".float-ins").find(".voi-del").remove()
            }
            $(".voi-add").hover(function() {
                $(this).addClass("add-hov")
            }, function() {
                $(this).removeClass("add-hov")
            });
            if ($(".voi-item").length == 10) {
                $(".voi-add").addClass("hide")
            }
        }, isVoiHide: function() {
            if ($(".voi-item").length > 3 && $(".voi-showall").length == 0) {
                $(".voi-add").before('<div class="voi-showall"><a href="javascript:;" class="show-all">展开全部发票 ︾</a></div>');
                $(".voi-item").each(function(i) {
                    if (i > 2) {
                        $(this).addClass("hide")
                    }
                })
            } else {
                if ($(".voi-item").length <= 3) {
                    $(".voi-showall").remove();
                    $(".voi-item").removeClass("hide")
                }
            }
        }, bindEvent: function() {
            $(document).on("click", ".voice-control .show-all", function() {
                $(".voi-item").removeClass("hide");
                $(this).attr("class", "hide-all").html("收起全部发票 ︽");
                $(this).attr("name", "new_icart2_invoice_pack");
                sa.click.sendDatasIndex(this)
            });
            $(document).on("click", ".voice-control .hide-all", function() {
                $(".voi-item").each(function(i) {
                    if (i > 2) {
                        $(this).addClass("hide")
                    }
                });
                $(this).attr("class", "show-all").html("展开全部发票 ︾")
            });
            $(document).on("mouseenter", ".voi-item", function() {
                if ($(this).find(".voi-ipt").attr("readonly") == "readonly") {
                    $(this).addClass("voi-hov")
                }
            });
            $(document).on("mouseleave", ".voi-item", function() {
                $(this).removeClass("voi-hov")
            });
            $(document).on("click", ".voi-item", function() {
                $(".voi-ipt").removeClass("for-save");
                if ($(".voi-ipt").eq(0).attr("readonly") != "readonly" && $(this).index() != 0) {
                    $(".voi-ipt").eq(0).attr("readonly", "readonly")
                }
                $(this).addClass("voi-select").find(".voi-ipt").addClass("for-save").end().siblings().removeClass("voi-select")
            });
            $(document).on("blur", ".voi-ipt", function() {
                $(this).attr("readonly", "readonly")
            });
            $(document).on("click", ".voi-default", function() {
                var invoiceTitleObject = $(".invoice-container .spc-col");
                invoiceTitleObject.each(function() {
                    $(this).parent().prepend('<a class="voi-default" href="javascript:void(0);">设为常用发票</a>').end().remove()
                });
                $(this).parent().prepend('<span class="spc-col">常用发票</span>').end().remove()
            });
            $(document).on("click", ".voi-modi", function(e) {
                $(".voi-ipt").removeClass("for-save");
                $(this).parent().prev().removeAttr("readonly").addClass("for-save").focus().parent().removeClass("voi-hov").siblings().removeClass("voi-select")
            });
            $(document).on("click", ".voi-del", function() {
                var temp = $(this).parents(".voi-item");
                if ($(".voi-item").hasClass("hide")) {
                    $(".voice-control").find(".hide").first().removeClass("hide")
                }
                if ($(".voi-item").length >= 2) {
                    if (temp.next().hasClass("rel")) {
                        temp.next().remove()
                    }
                    temp.remove()
                }
                if (temp.hasClass("voi-select")) {
                    $(".voi-item").eq(0).addClass("voi-select")
                }
                cloudCart2.invoice.isVoiHide();
                if ($(".voi-item").length == 1) {
                    $(".voi-del").remove()
                }
                if ($(".voi-item").length == 9 && $(".voi-add").hasClass("hide")) {
                    $(".voi-add").removeClass("hide")
                }
                var id = temp.find("input").attr("comid");
                var isDefault = temp.find(".spc-col").length > 0;
                if ($(".subsidy-box .cart-checkbox-checked").length > 0) {
                    if ($("#invoiceWarning").length > 0) {
                        $("#invoiceWarning").remove()
                    }
                    if ($(".voice-control .pr").length > 0) {
                        $(".voice-control .pr").remove()
                    }
                    $($(".voi-item")[0]).after("<div class='l' id='invoiceWarning'><i class='l tip-icon tip-warning mr5 mt5 ml5'></i>发票抬头需填写申请节能补贴人的真实姓名</div>")
                }
                cloudCart2Invoice.deleteInvoiceTitle(id, isDefault)
            });
            $(document).on("click", ".voi-add", function() {
                var lastIpt = null;
                $(this).siblings().removeClass("voi-select").end().before('<div class="voi-item voi-select"><input type="text" class="voi-ipt" value="" name="taxTitle" placetext="姓名，单位名称" data-is-enter="0"/><div class="float-ins"><a href="javascript:;" class="voi-modi">修改</a><a class="voi-del" href="javascript:void(0);">删除</a><i class="ins-ico"></i></div></div><div class="rel cart-checkbox"><input type="checkbox" id="checkbox" class="checkbox" class="chk"><label for="checkbox"><i class="check-icon"></i><span>设为常用发票</span></label></div>').remove();
                cloudCart.supportPlaceHolder.init($(".voi-select"));
                lastIpt = $(".voi-item:last").find(".voi-ipt");
                var defaultValue = lastIpt.attr("placetext");
                if ($.trim(lastIpt.val()) == "") {
                    lastIpt.val(defaultValue).css("color", "#999")
                }
                lastIpt.focus(function() {
                    if ($.trim(lastIpt.val()) == defaultValue) {
                        lastIpt.val("").css("color", "#333")
                    }
                });
                lastIpt.blur(function() {
                    if ($.trim(lastIpt.val()) == "") {
                        lastIpt.val(defaultValue).css("color", "#999")
                    }
                });
                lastIpt.focus()
            })
        }}, serviceInfo: {init: function() {
            this.bindEvent()
        }, bindEvent: function() {
            $("#step3").on("change", ".m-date-input", function() {
                var _this = $(this);
                var timeType = _this.attr("time-type");
                var servTime = _this.attr("selectdate");
                var dateType = _this.attr("datetype");
                if (timeType == "2" && dateType == "6") {
                    servTime = $("#step3").find("input[combined-relation='" + _this.attr("combined-relation") + "'][time-type='1']").attr("selectdate")
                }
                probeAuthStatus(function() {
                    var combDeliType = "";
                    if ($(":checked[name='choose-package-type']").length !== 0) {
                        combDeliType = $(":checked[name='choose-package-type']").val()
                    } else {
                        combDeliType = "0"
                    }
                    $.ajax({type: "post", url: "saveServTime.do", data: {cart2No: $("#cart2No").val(), combDeliType: combDeliType, combinedRelation: _this.attr("combined-relation"), servTime: servTime, timeType: timeType, itemNos: _this.attr("item-no"), datetype: dateType}, cache: false, dataType: "json", success: function(data) {
                            if (data.returnCode === "N") {
                                cloudCart2Common.alertBox("服务信息保存失败，请重试！")
                            } else {
                                if (data.returnCode === "4000") {
                                    cloudCart2Common.alertBox("您访问的太频繁， 网络拥堵，请您稍后再试！")
                                } else {
                                    var arridates = $("#step3").find("input[combined-relation='" + _this.attr("combined-relation") + "'][time-type='1']");
                                    var instdate;
                                    for (var i = 0; i < data.length; i++) {
                                        instdate = $("#step3").find("input[combined-relation='" + _this.attr("combined-relation") + "'][item-no='" + data[i].itemNo + "'][time-type='2']");
                                        if (data[i].returnCode === "N") {
                                            cloudCart2Common.alertBox("服务信息保存失败，请重试！");
                                            if (i === 0) {
                                                $(arridates[0]).attr("selectdate", data[0].seleArriTime)
                                            }
                                            $(instdate).attr("selectdate", data[i].seleInstTime)
                                        } else {
                                            if (data[i].returnCode === "Y") {
                                                if (i === 0) {
                                                    $(arridates[0]).attr("selectdate", data[0].seleArriTime);
                                                    $(arridates[0]).attr("disabledate", data[0].arriDisableTime);
                                                    $(arridates[0]).attr("startdate", data[0].arriStartTime);
                                                    $(arridates[0]).attr("isdatesection", data[0].isdatesection);
                                                    $(arridates[0]).attr("isnight", data[0].isnight)
                                                }
                                                $(instdate).attr("selectdate", data[i].seleInstTime);
                                                $(instdate).attr("disabledate", data[i].instDisableTime);
                                                $(instdate).attr("startdate", data[i].instStartTime);
                                                var iswholetype = data[i].iswholetype;
                                                var installDateType = data[i].installDateType;
                                                $(instdate).attr("dateType", installDateType);
                                                if (installDateType == "6") {
                                                    if (!$(instdate).parents("td").hasClass("ship-install-sync")) {
                                                        $(instdate).parents("td").addClass("ship-install-sync");
                                                        $(arridates[0]).parents("td").addClass("ship-install-sync")
                                                    }
                                                    $(instdate).attr("iswholetype", "true")
                                                } else {
                                                    if ($(instdate).parents("td").hasClass("ship-install-sync")) {
                                                        $(instdate).parents("td").removeClass("ship-install-sync");
                                                        $(arridates[0]).parents("td").removeClass("ship-install-sync")
                                                    }
                                                    if (iswholetype == "0") {
                                                        $(instdate).attr("iswholetype", "false")
                                                    } else {
                                                        $(instdate).attr("iswholetype", "true")
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    ECode.cartCalendar()
                                }
                            }
                        }})
                }, function() {
                    cloudCart2Common.cart2Logon()
                })
            })
        }}, promotion: {lock: 0, getLock: function() {
            cloudCart2.promotion.lock = 1
        }, unLock: function() {
            cloudCart2.promotion.lock = 0
        }, init: function() {
            this.bindEvent();
            this.cloudDiamond();
            this.getCheck.init()
        }, bindEvent: function() {
            var dStep = $("#step5"), dGride = dStep.find(".gride"), dToggleTitle = dStep.find(".toggle-title"), dToggleContent = dStep.find(".toggle-content");
            dToggleTitle.unbind("click").click(function() {
                if ($(this).hasClass("open")) {
                    $(this).removeClass("open");
                    $(this).siblings(".toggle-content").hide();
                    if ($(this).parent().hasClass("coupon-item")) {
                        $(this).find("a").attr("name", "new_icart2_account_useticket")
                    } else {
                        if ($(this).parent().hasClass("gift-card-item")) {
                            $(this).find("a").attr("name", "new_cart2_bal_gfcflod")
                        }
                    }
                } else {
                    if ($(this).parent().hasClass("coupon-item")) {
                        $(this).find("a").attr("name", "new_cart2_bal_tic")
                    } else {
                        if ($(this).parent().hasClass("gift-card-item")) {
                            $(this).find("a").attr("name", "new_cart2_bal_card")
                        }
                    }
                    dToggleContent.each(function() {
                        if (!$(this).find(".coupon-finish-fn").length > 0) {
                            $(this).siblings(".toggle-title").removeClass("open");
                            $(this).hide()
                        }
                    });
                    $(this).addClass("open");
                    $(this).siblings(".toggle-content").show();
                    if ($(this).parent(".item").hasClass("coupon-item") && $.trim($("#coupon_finish_id").html()) === "") {
                        cloudCart2Coupon.bindEvent.editCoupon(true)
                    }
                    if ($(this).parent(".item").hasClass("other-coupon-item") && $.trim($("#other_coupon_content").html()) === "") {
                        cloudCart2Mobile.editMobile("N", "N")
                    }
                    if ($("#onlyOverSea_ID").val() === "true" || $("#onlyServiceProduct_ID").val() === "true") {
                        return
                    }
                    if ($(this).parent(".item").hasClass("gift-card-item") && $.trim($("#card_content_id").html()) === "") {
                        cloudCart2Card.showCard()
                    }
                }
            });
            dStep.find(".add-coupon-btn .btn").unbind("click").click(function() {
                $(this).toggleClass("btn-up");
                $(this).closest(".add-coupon-box").find(".add-coupon-form").toggle()
            });
            dGride.find("tr.item:not(.freeze)").unbind("hover").hover(function() {
                $(this).addClass("hover")
            }, function() {
                $(this).removeClass("hover")
            });
            dGride.find("input").unbind("click").bind("click", function() {
                var selected = $(this).prop("checked");
                if (selected) {
                    $(this).closest("tr").addClass("selected cart-checkbox-checked")
                } else {
                    $(this).closest("tr").removeClass("selected cart-checkbox-checked")
                }
                if ($(this).closest(".coupon-content").length > 0) {
                    cloudCart2Coupon.bindEvent.clickCoupon($(this))
                }
            });
            dStep.find(".add-gift-card-box .btn").unbind("click").click(function() {
                $(this).toggleClass("btn-up");
                $(this).closest(".add-gift-card-box").find(".add-gift-card-form").toggle()
            })
        }, cloudDiamond: function() {
            var cart2No = $("#cart2No").val();
            var dStep = $("#step5"), _this = this, dCheckoutPromotionItem = dStep.find(".checkout-promotion-item"), dDiamondCheck = dStep.find(".diamond-check");
            dCheckoutPromotionItem.find(".checkbox").unbind("click").click(function() {
                var selected = $(this).prop("checked");
                var parent = $(this).closest(".checkout-promotion-item");
                var thisId = $(this).attr("id");
                if (selected) {
                    if (parent.hasClass("checkout-promotion-input-item")) {
                        dDiamondCheck.show();
                        $(".diamond-check .input-box").focus();
                        parent.siblings(".other-pay-box").find(".cart-checkbox").css({zoom: 1})
                    }
                    $(this).closest(".cart-checkbox").addClass("cart-checkbox-checked")
                } else {
                    if (parent.hasClass("checkout-promotion-input-item")) {
                        dDiamondCheck.hide();
                        parent.siblings(".other-pay-box").find(".cart-checkbox").css({zoom: 0})
                    }
                    $(this).closest(".cart-checkbox").removeClass("cart-checkbox-checked");
                    if ($("#toatalPiontsId").val() != 0 && thisId == "cloudDaimondInputId") {
                        cloudCloudDiamond.saveCloudDiamondAmount(0, cart2No);
                        $("#toatalPiontsId").val(0);
                        $("#cloudAccountId").html(0)
                    }
                }
                if (!(parent.hasClass("checkout-promotion-input-item"))) {
                    if (cloudCart2.promotion.lock == 1) {
                        return
                    } else {
                        cloudCart2.promotion.getLock()
                    }
                    var payType;
                    if ($("#otherPayCheck").prop("checked")) {
                        payType = "11"
                    } else {
                        payType = "01"
                    }
                    cloudCart2Payment.otherPay(payType)
                }
            });
            var dInputBox = dCheckoutPromotionItem.find(".input-box");
            dInputBox.unbind("keyup focus blur").bind("keyup focus blur", function(e) {
                var max = parseInt(dInputBox.attr("data-max") || 0);
                var value = $(this).val() || "", nowVal = "";
                value = value.replace(/[^\d]/g, "");
                if (parseInt(value) > max) {
                    clearTimeout(_this.cloudDiamondTimeOut);
                    nowVal = max;
                    var dInputItem = $(".checkout-promotion-input-item");
                    var styleArg = {right: "118px", top: "-36px"};
                    if (cloudCart.ieVersion(6)) {
                        styleArg = {right: "168px", top: "-30px"}
                    }
                    var obj = {msg: '<i class="tip-icon tip-error-16" style="vertical-align:middle;margin:-2px 4px 0 0;"></i>本次最多可用' + max + "个 ", wrap: dInputItem, pos: "top", style: styleArg, callback: function() {
                            dInputItem.find(".ui-tooltip-arrow").addClass("ui-input-box");
                            _this.cloudDiamondTimeOut = setTimeout(function() {
                                dInputItem.find(".single-tooltip").animate({opacity: 0}, 1000, function() {
                                    $(this).remove()
                                })
                            }, 1000)
                        }};
                    cart2Util.tip(obj)
                } else {
                    nowVal = value
                }
                $(this).val(nowVal);
                $(this).closest(".checkout-promotion-item").find(".sn-price em").html((nowVal / 100).toFixed(2));
                if (e.type == "keyup") {
                    clearTimeout(_this.cloudDiamondAJTimeOut);
                    _this.cloudDiamondAJTimeOut = setTimeout(function() {
                        var pointAccount = $("#toatalPiontsId").val();
                        cloudCloudDiamond.saveCloudDiamondAmount(pointAccount, cart2No)
                    }, 1000)
                }
            })
        }, cloudDiamondAJTimeOut: "", cloudDiamondTimeOut: "", getCheck: {init: function() {
                this.bindEvent()
            }, bindEvent: function() {
                var dStep = $("#step5");
                $(document).off("click", ".get-check-btn:not(.cart-btn-disable)").on("click", ".get-check-btn:not(.cart-btn-disable)", cloudCart2Card.sendAuthCode);
                dStep.find(".union-phone-list .item").hover(function() {
                    $(this).addClass("hover")
                }, function() {
                    $(this).removeClass("hover")
                })
            }, getNum: function(data) {
                var handle = $(".get-check-btn");
                var tip = handle.siblings(".tip-message");
                var timer;
                var t = 60;
                tip.show();
                if (handle.hasClass("cart-btn-disable")) {
                    return
                }
                handle.addClass("cart-btn-disable");
                timer = setInterval(function() {
                    if (t > 0) {
                        t--;
                        tip.html("验证码已发出，请注意查收短信，如果没有收到，您可以在" + t + "秒后点击获取按钮重新发送");
                        handle.addClass("cart-btn-disable")
                    } else {
                        t = 60;
                        clearInterval(timer);
                        tip.html("");
                        handle.removeClass("cart-btn-disable")
                    }
                }, 1000)
            }}}, fixBottom: function() {
        var dCheckoutBarFixBoxes = $(".checkout-bar-boxes");
        if (dCheckoutBarFixBoxes.length == 0) {
            return
        }
        var dCheckoutBarFixBox = dCheckoutBarFixBoxes.find(".checkout-bar-box");
        if ($.browser.version != "6.0") {
            $(window).on("scroll", function() {
                var dCheckoutBarFixBoxesTop = dCheckoutBarFixBoxes.offset().top;
                if ($(window).scrollTop() >= (dCheckoutBarFixBoxesTop - $(window).height() + dCheckoutBarFixBoxes.height())) {
                    dCheckoutBarFixBox.removeClass("checkout-bar-box-fix")
                } else {
                    dCheckoutBarFixBox.addClass("checkout-bar-box-fix")
                }
            })
        }
    }, cartSubsidy: function() {
        $(document).on("click", ".cart-table .subsidy-box .check-icon", function(e) {
            e.stopPropagation();
            var dSubsidyBox = $(this).closest(".subsidy-box"), dCartCheckbox = dSubsidyBox.find(".cart-checkbox"), checkBox = dCartCheckbox.find(".checkbox");
            checked = checkBox.prop("checked");
            if (checked) {
                dCartCheckbox.removeClass("cart-checkbox-checked")
            } else {
                dCartCheckbox.addClass("cart-checkbox-checked")
            }
            var productType = checkBox.attr("productType");
            var checkStatus;
            if (!checked) {
                checkStatus = 1
            } else {
                checkStatus = 0
            }
            var itemNo = checkBox.attr("itemNo");
            cloudCart2.energySubsidies(checkStatus, itemNo, dSubsidyBox, productType)
        })
    }, energySubsidies: function(checkStatus, itemNo, dSubsidyBox, productType) {
        probeAuthStatus(function() {
            var cart2No = $("#cart2No").val();
            $.ajax({type: "post", url: "operateEnergySubsidies.do", async: false, dataType: "json", data: {cart2No: cart2No, checkStatus: checkStatus, itemNo: itemNo}, success: function(data) {
                    var energySubsidiesVO = data.energySubsidiesVO;
                    if (energySubsidiesVO.isSuccess == "Y") {
                        dTr = $(dSubsidyBox).closest("tr");
                        if (checkStatus == 1) {
                            dTr.find(".subsidy-warning").show();
                            dTr.addClass("subsidy-checked");
                            if (dTr.hasClass("group-box")) {
                                dTr.addClass("group-subsidy-checked")
                            }
                        } else {
                            dTr.find(".subsidy-warning").hide();
                            dTr.removeClass("subsidy-checked");
                            if (dTr.hasClass("group-box")) {
                                dTr.removeClass("group-subsidy-checked")
                            }
                        }
                        $("#cmmdyTotalID").html(energySubsidiesVO.totalAmount);
                        $("#shippingChargeID").html(energySubsidiesVO.transportFee);
                        $("#cmmdyDiscountID").html(energySubsidiesVO.voucherTotalAmount);
                        $("#freeAmountID").html((parseFloat(energySubsidiesVO.cardAmount) + parseFloat(energySubsidiesVO.couponAmount)).toFixed(2));
                        $("#payAmountID").html(energySubsidiesVO.payAmount);
                        $("#energySubsidiesID").html(energySubsidiesVO.energySubsidiesAmount);
                        if ($("#cloudDaimondInputId").parent().hasClass("cart-checkbox-checked")) {
                            $("#cloudAccountId").html(energySubsidiesVO.integralAmount)
                        }
                        var energyObject = $(dSubsidyBox).find(".energySubsidiesPrice");
                        if (checkStatus == 1) {
                            energyObject = $(dSubsidyBox).find(".energySubsidiesPrice");
                            energyObject.html("北京用户首件最多补贴<span class='c-f60'>" + energySubsidiesVO.energyAmount + "</span>元");
                            $("#modifyInvoice").click()
                        } else {
                            energyObject.html("")
                        }
                        $(".subsidy-box").each(function() {
                            var _that = $(this);
                            var checkBox = _that.find("input[type=checkbox]");
                            if (checkBox.attr("itemNo") != itemNo && checkBox.attr("productType") == productType && checkBox.prop("checked") && checkStatus == 1) {
                                _that.find(".cart-checkbox").removeClass("cart-checkbox-checked");
                                checkBox.prop("checked", false);
                                dTr = _that.closest("tr");
                                dTr.find(".subsidy-warning").hide();
                                dTr.removeClass("subsidy-checked");
                                if (dTr.hasClass("group-box")) {
                                    dTr.removeClass("group-subsidy-checked")
                                }
                            }
                        });
                        if ($(".bookingCart").length > 0) {
                            cloudCart2Cmmdty.deliveryClick($(":checked[name='choose-package-type']").get(0), "N");
                            cloudCart2Payment.priceShowFn()
                        }
                    } else {
                        var checkBoxObject = $(dSubsidyBox).find(".checkbox");
                        if (checkStatus == 1) {
                            $(dSubsidyBox).find(".cart-checkbox").removeClass("cart-checkbox-checked");
                            checkBoxObject.prop("checked", false)
                        } else {
                            $(dSubsidyBox).find(".cart-checkbox").addClass("cart-checkbox-checked");
                            checkBoxObject.prop("checked", true)
                        }
                    }
                }, error: function() {
                    cloudCart2Common.alertBox("小苏太忙，稍后再来试试");
                    return false
                }})
        }, function() {
            cloudCart2Common.cart2Logon()
        })
    }, controlEnergySubsidiesAmount: function() {
        if ($(".subsidy-box").length > 0) {
            $("#energySubsidiesAmountDiv").show()
        } else {
            $("#energySubsidiesAmountDiv").hide()
        }
    }};
$(function() {
    cloudCart2.init();
    cloudCart2Cmmdty.noReasonReturnIcon();
    cloudCart2Cmmdty.showTipForReserve();
    cloudCart2Common.showTipForOnlinePay();
    lazyelem.listen();
    _loadAsyncJs(_getJsFilePath("da_opt.js"));
    _loadAsyncJs(_getJsFilePath("sa-analytics.js"));
    $(document).on("click", "a[name^=new_cart2_],a[name^=new_icart2_],li[name^=new_icart2_],div[name^=new_icart2_],span[name^=new_icart2_],input[name^=new_icart2_]", function() {
        sa.click.sendDatasIndex(this)
    });
    haoyeInit()
});