$(function(){cloudCart2Invoice.init()});var cloudCart2Invoice={init:function(){this.bindEven.init()},validationCompanyInvoice:function(invoiceType,dataFlag){if(dataFlag!="invoice"){return true}else{if(invoiceType=="01"){return validateCompanyName()&&validateTaxNo()&&validateRegAdd()&&validateRegPhone()&&validateRegBank()&&validateRegAccount()&&validateReceiverName()&&validateReceiverTel()&&validateReceiverAdd()}else{if(invoiceType=="02"){return valCommonInvoice()}else{if(invoiceType=="04"){return valElectronInvoice()}else{return true}}}}},packageData:function(invoiceType,cart2No,dataFlag){var data={};data.cart2No=cart2No;data.cmmdtyType=$("#commodityType_ID").val();if(dataFlag!="invoice"){data.invoiceType="05";data.invoiceTitle=""}else{data.invoiceType=invoiceType;if(invoiceType=="01"){data.invoiceTitle=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceTitle")));data.taxPayerNo=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceTaxPayerNo")));data.regAddr=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceRegAddr")));data.regPhone=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceRegPhone")));data.accntBank=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceAccntBank")));data.bankAccntNum=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceBankAccntNum")));data.taxPayerName=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceTaxPayerName")));data.taxpayerPhone=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceTaxPayerPhone")));data.taxPayerAddr=$.trim(cloudCart2Common.getInputVal($("#companyInvoiceTaxPayerAddr")))}else{if(invoiceType=="04"){data.invoiceTitle=$.trim(cloudCart2Common.getInputVal($("#eInvoiceId")))}else{data.invoiceTitle=$.trim(cloudCart2Common.getInputVal($(".voi-select").find("input")))}}}return data},deleteInvoiceTitle:function(id,isDefault){probeAuthStatus(function(){var delUrl="http://cart.suning.com/emall/deleteUserInvoice?storeId=10052&catalogId=10051&id=";delUrl=delUrl+id+"&isDefault="+(isDefault?"1":"0");$.ajax({type:"get",url:delUrl,dataType:"jsonp",cache:true,success:function(data){},error:function(){}})},function(){cloudCart2Common.cart2Logon()});probeAuthStatus(function(){$.ajax({type:"post",url:"updateInvoiceTitle.do",dataType:"json",data:{id:id,isDelete:"Y"},success:function(data){},error:function(){}})},function(){cloudCart2Common.cart2Logon()});return false},clearCommonInvoiceError:function(){$("#error-message").addClass("hide").html("")},clearVATInvoiceError:function(){$("#companyInvoiceTitle").parent().find(".tip-message").html("");$("#companyInvoiceTaxPayerNo").parent().find(".tip-message").html("");$("#companyInvoiceRegAddr").parent().find(".tip-message").html("");$("#companyInvoiceRegPhone").parent().find(".tip-message").html("");$("#companyInvoiceAccntBank").parent().find(".tip-message").html("");$("#companyInvoiceBankAccntNum").parent().find(".tip-message").html("");$("#companyInvoiceTaxPayerName").parent().find(".tip-message").html("");$("#companyInvoiceTaxPayerPhone").parent().find(".tip-message").html("");$("#companyInvoiceTaxPayerAddr").parent().find(".tip-message").html("")},clearElectronInvoiceError:function(){$("#eInvoiceId").parent().find(".tip-message").html("")},bindEven:{init:function(){$("#step4").on("click","#modifyInvoice",function(e){probeAuthStatus(function(){cloudCart2Invoice.bindEven.doModifyInvoice("N")},function(){cloudCart2Common.cart2Logon()});e.preventDefault()});this.doSaveInvoice();this.validation()},doModifyInvoice:function(showSaved){var cart2No=$("#cart2No").val();$.ajax({type:"post",url:"doModifyInvoice.do",async:false,dataType:"json",data:{cart2No:cart2No,cmmdtyType:$("#commodityType_ID").val(),showSaved:showSaved,footballGroup:$("#footballProduct").val()},success:function(data){if(data.returnCode==="200"){$("#step4").html(data.html);if(showSaved==="N"){$("#step4").find("input[name='invoice-type'][checked='checked']").trigger("click");cloudCart2Invoice.loadVatInfo();cloudCart2Invoice.queryInvoiceTitleList()}cloudCart2Common.checkSubmit()}else{if(data.returnCode==="004"){window.location.href="http://shopping.suning.com/error.do"}else{if(data.returnCode==="4000"){cloudCart2Common.alertBox("您访问的太频繁， 网络拥堵，请您稍后再试！")}else{cloudCart2Common.alertBox("小苏太忙，稍后再来试试")}}}},error:function(){cloudCart2Common.alertBox("小苏太忙，稍后再来试试")}})},validation:function(){var dStep4=$("#step4");dStep4.on("blur",".company-invoice-content input",function(){if($(this).hasClass("companyName")){validateCompanyName()}else{if($(this).hasClass("invoiceTaxPayerNo")){validateTaxNo()}else{if($(this).hasClass("invoiceRegAddr")){validateRegAdd()}else{if($(this).hasClass("invoiceRegPhone")){validateRegPhone()}else{if($(this).hasClass("invoiceAccntBank")){validateRegBank()}else{if($(this).hasClass("invoiceBankAccntNum")){validateRegAccount()}else{if($(this).hasClass("invoiceTaxPayerName")){validateReceiverName()}else{if($(this).hasClass("invoiceTaxPayerPhone")){validateReceiverTel()}else{if($(this).hasClass("invoiceTaxPayerAddr")){validateReceiverAdd()}else{if($(this).hasClass("eInvoiceTitle")){valElectronInvoice()}}}}}}}}}}});dStep4.on("blur",".e-invoice-content input",function(){if($(this).hasClass("eInvoiceTitle")){valElectronInvoice()}else{return true}})},doSaveInvoice:function(){var dStep4=$("#step4");dStep4.on("click","#save-invoice-btn, #save-no-invoice-btn",function(e){var agreementFlag=$("#agreement").prop("checked");if(!agreementFlag){$("#error-message").removeClass("hide");$("#error-message").html('<i class="tip-icon tip-error-16"></i>请阅读《发票须知》!');$("#normalInvoiceTitle").parents(".row").removeClass("error-row");$("#normalInvoiceTitle").parent().find(".tip-message").html("");return}$("#disable-btn-h28-1").removeClass("hide").siblings().addClass("hide");var invoiceType=dStep4.find(".invoice-current .cart-radio-boxes .selected input").val();var dataFlag=$(this).attr("dataflag");probeAuthStatus(function(){var cart2No=$("#cart2No").val();if(cloudCart2Invoice.validationCompanyInvoice(invoiceType,dataFlag)){$("#update-loading").removeClass("hide");$("#disable-btn-h28-1").addClass("hide");if(invoiceType=="02"){var normalTitle=cloudCart2Common.getInputVal($(".voi-select").find("input"));var isDefault=0;if($(".voi-select").find("span").length>0||$("#checkbox").prop("checked")){isDefault=1}if(dataFlag=="invoice"){if(typeof($(".voi-select").find("input").attr("comid"))=="undefined"){cloudCart2Invoice.bindEven.saveInvoiceTitle("",normalTitle,isDefault,"")}else{cloudCart2Invoice.bindEven.saveInvoiceTitle($(".voi-select").find("input").attr("comid"),normalTitle,isDefault,"")}}}var comTypeFlag=$("#comTypeFlag").val();if(!$("#companyInvoiceTitle").hasClass("ui-text-unable")&&!comTypeFlag&&invoiceType=="01"){$.ajax({type:"post",url:"updateMemberVATInfo.do",dataType:"json",data:{orgPartyName:$.trim(cloudCart2Common.getInputVal($("#companyInvoiceTitle"))),certNo:$.trim(cloudCart2Common.getInputVal($("#companyInvoiceTaxPayerNo"))),orgAddr:$.trim(cloudCart2Common.getInputVal($("#companyInvoiceRegAddr"))),orgTeleNum:$.trim(cloudCart2Common.getInputVal($("#companyInvoiceRegPhone"))),bankName:$.trim(cloudCart2Common.getInputVal($("#companyInvoiceAccntBank"))),bankDepositAcnt:$.trim(cloudCart2Common.getInputVal($("#companyInvoiceBankAccntNum")))}})}$.ajax({type:"post",url:"doSaveInvoice.do",async:false,dataType:"json",data:cloudCart2Invoice.packageData(invoiceType,cart2No,dataFlag),success:function(data){if(data.returnCode=="N"){$("#save-invoice-btn").removeClass("hide");if(dataFlag!="invoice"){$("#save-no-invoice-btn").removeClass("hide")}$("#update-loading").addClass("hide");$("#error-message").removeClass("hide");$("#error-message").html("<i class='tip-icon tip-error-16'></i>保存失败!");return}else{if(data.returnCode=="110004"){$("#save-invoice-btn").removeClass("hide");$("#update-loading").addClass("hide");$("#error-message").removeClass("hide");$("#error-message").html("<i class='tip-icon tip-error-16'></i>个人发票可作为您的相关凭证，暂不支持更改发票信息");return}else{if(data.returnCode=="4000"){$("#save-invoice-btn").removeClass("hide");$("#update-loading").addClass("hide");$("#error-message").removeClass("hide");$("#error-message").html("<i class='tip-icon tip-error-16'></i>您访问的太频繁， 网络拥堵，请您稍后再试！");return}else{$("#step4").html(data.html);$(".subsidy-box").remove();$(".subsidy-warning").remove();$(".product-promo").remove();var invoiceVO=data.invoiceVO;$("#cmmdyTotalID").html(invoiceVO.totalAmount);$("#shippingChargeID").html(invoiceVO.transportFee);$("#cmmdyDiscountID").html(invoiceVO.voucherTotalAmount);$("#freeAmountID").html((parseFloat(invoiceVO.cardAmount)+parseFloat(invoiceVO.couponAmount)).toFixed(2));$("#payAmountID").html(invoiceVO.payAmount);$("#energySubsidiesID").html(invoiceVO.energySubsidiesAmount);if($("#cloudDaimondInputId").parent().hasClass("cart-checkbox-checked")){$("#cloudAccountId").html(invoiceVO.integralAmount)}$.ajax({type:"post",url:"queryEnergySubsidies.do",async:false,dataType:"json",data:{cart2No:cart2No},success:function(data){var energySubsidiesHtmls=data.htmls;if(energySubsidiesHtmls.length>0){for(var i=0;i<energySubsidiesHtmls.length;i++){var energySubsidiesHtml=energySubsidiesHtmls[i];var itemNO=$(energySubsidiesHtml).attr("itemNO");var productDetailObject=$("#"+itemNO+"");var productObject=productDetailObject.parents(".product,.group-box");productObject.find(".product-img").after("<p class='product-promo'>节能补贴</p>");productObject.find(".col-td-box").after($(energySubsidiesHtml).html())}}},error:function(){cloudCart2Common.alertBox("小苏太忙，稍后再来试试")}});cloudCart2.controlEnergySubsidiesAmount();cloudCart2Common.checkSubmit()}}}},error:function(){$("#save-invoice-btn").removeClass("hide");$("#update-loading").addClass("hide");$("#disable-btn-h28-1").addClass("hide");$("#error-message").removeClass("hide");$("#error-message").html("保存失败!")}});return}else{$("#save-invoice-btn").removeClass("hide");$("#disable-btn-h28-1").addClass("hide");$("#save-no-invoice-btn").removeClass("hide");if(invoiceType=="02"){$(".voi-select").find("input").removeAttr("readonly")}return}},function(){cloudCart2Common.cart2Logon()});e.preventDefault()})},saveInvoiceTitle:function(id,title,isDefault,isDelete){var saveUrl="http://cart.suning.com/emall/saveUserInvoice?storeId=10052&catalogId=10051&";var encodeTitle=encodeURIComponent(title);if(id.length>0){saveUrl=saveUrl+"id="+id+"&title="+encodeTitle+"&isDefault="+isDefault}else{saveUrl=saveUrl+"&title="+encodeTitle+"&isDefault="+isDefault}$.ajax({type:"get",url:saveUrl,dataType:"jsonp",cache:true,success:function(data){},error:function(){}});probeAuthStatus(function(){$.ajax({type:"post",url:"updateInvoiceTitle.do",dataType:"json",data:{id:id,normalTitle:encodeTitle,isDefault:isDefault},success:function(data){},error:function(){}})},function(){cloudCart2Common.cart2Logon()})}},queryInvoiceTitleList:function(){probeAuthStatus(function(){$.ajax({type:"post",url:"queryInvoiceTitle.do",dataType:"json",cache:false,success:function(data){cloudCart2Invoice.dealInvoiceTitle($.toJSON(data),$("#cart2InvoiceTitleId").val())},error:function(){cloudCart2Invoice.dealInvoiceTitle("",$("#cart2InvoiceTitleId").val())}})},function(){cloudCart2Common.cart2Logon()})},dealInvoiceTitle:function(invoiceTitleResult,invoiceTitle){var dataparam={};if(invoiceTitleResult.length>1){dataparam.invoiceTitleResult=invoiceTitleResult;dataparam.invoiceTitle=invoiceTitle}else{dataparam.invoiceTitle=invoiceTitle}$.ajax({type:"post",url:"dealInvoiceTitleList.do",dataType:"json",data:dataparam,success:function(result){$(".voice-control").html(result.html);if($(".subsidy-box .cart-checkbox-checked").length>0){if($("#invoiceWarning").length>0){$("#invoiceWarning").remove()}if($(".voice-control .pr").length>0){$(".voice-control .pr").remove()}$($(".voi-item")[0]).after("<div class='l' id='invoiceWarning'><i class='l tip-icon tip-warning mr5 mt5 ml5'></i>发票抬头需填写申请节能补贴人的真实姓名</div>")}if($(".voi-item").length>3&&$(".voi-showall").length==0){$(".voi-add").before('<div class="voi-showall"><a href="javascript:;" class="show-all">展开全部发票 ︾</a></div>');$(".voi-item").each(function(i){if(i>2){$(this).addClass("hide")}});if($(".voi-item").length==10){$(".voi-add").remove()}}else{if($(".voi-item").length<=3){$(".voi-showall").remove();$(".voi-item").removeClass("hide");if(($(".voi-item").length==1)&&isEmpty($(".voi-item").find("input").val())){$(".voi-item").find("input").val($("#receiverNameId").html())}}}},error:function(){}})},loadVatInfo:function(){probeAuthStatus(function(){$.ajax({type:"post",url:"queryMemberVATInfo.do",cache:false,dataType:"json",success:function(data){if(data.queryFlag=="Y"){$("#companyInvoiceTitle").addClass("ui-text-unable").attr("disabled","disabled").val(data.orgPartyName);$("#companyInvoiceTaxPayerNo").addClass("ui-text-unable").attr("disabled","disabled").val(data.certNo);$("#companyInvoiceRegAddr").addClass("ui-text-unable").attr("disabled","disabled").val(data.regAddr);$("#companyInvoiceRegPhone").addClass("ui-text-unable").attr("disabled","disabled").val(data.regPhone);$("#companyInvoiceAccntBank").addClass("ui-text-unable").attr("disabled","disabled").val(data.bankName);$("#companyInvoiceBankAccntNum").addClass("ui-text-unable").attr("disabled","disabled").val(data.bankDepositAcnt);$("#vatInvoiceInfoUpdate").removeClass("hide");$("#vatInvoiceInfoNo").addClass("hide");if(isEmpty(cloudCart2Common.getInputVal($("#companyInvoiceTaxPayerName")))&&data.consigneeName!=""){$("#companyInvoiceTaxPayerName").val(data.consigneeName)}if(isEmpty(cloudCart2Common.getInputVal($("#companyInvoiceTaxPayerPhone")))&&data.consigneeMobileNum!=""){$("#companyInvoiceTaxPayerPhone").val(data.consigneeMobileNum)}if(isEmpty(cloudCart2Common.getInputVal($("#companyInvoiceTaxPayerAddr")))&&data.address!=""){$("#companyInvoiceTaxPayerAddr").val(data.address)}}else{if(data.orgPartyName!=""){$("#companyInvoiceTitle").val(data.orgPartyName)}if(data.certNo!=""){$("#companyInvoiceTaxPayerNo").val(data.certNo)}if(data.regAddr!=""){$("#companyInvoiceRegAddr").val(data.regAddr)}if(data.regPhone!=""){$("#companyInvoiceRegPhone").val(data.regPhone)}if(data.bankName!=""){$("#companyInvoiceAccntBank").val(data.bankName)}if(data.bankDepositAcnt!=""){$("#companyInvoiceBankAccntNum").val(data.bankDepositAcnt)}$("#vatInvoiceInfoNo").removeClass("hide");$("#vatInvoiceInfoUpdate").addClass("hide")}cloudCart.supportPlaceHolder.init("#step4")},error:function(){cloudCart.supportPlaceHolder.init("#step4");cloudCart2Common.alertBox("小苏太忙，稍后再来试试")}})},function(){cloudCart2Common.cart2Logon()})}};