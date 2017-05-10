<?php
    if(C('LAYOUT_ON')) {
        echo '{__NOLAYOUT__}';
    }
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>跳转提示</title>
<style type="text/css">
*{ padding: 0; margin: 0; }
body{ background: #F5F5F5; font-family: '微软雅黑'; color: #333; font-size: 16px; }
.page{ position: relative;height: 600px;width:600px;margin: 0 auto; }
.system-message{ padding: 24px 48px;position: absolute;left: 23%;top:20%; }
.system-message h1{ font-size: 100px; font-weight: normal; line-height: 120px; margin-bottom: 12px; }
.system-message .jump{ padding-top: 10px}
.system-message .jump a{ color: #333;}
.system-message .success,.system-message .error{ line-height: 1em; font-size: 20px }
.system-message .detail{ font-size: 12px; line-height: 20px; margin-top: 12px; display:none}

	@-webkit-keyframes rotate-animation {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@keyframes rotate-animation {
		0% {
			-webkit-transform: rotate(0deg);
			transform: rotate(0deg);
		}
		100% {
			-webkit-transform: rotate(360deg);
			transform: rotate(360deg);
		}
	}
	@-webkit-keyframes move-animation {
		0% {
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
		25% {
			-webkit-transform: translate(-64px, 0);
			transform: translate(-64px, 0);
		}
		75% {
			-webkit-transform: translate(32px, 0);
			transform: translate(32px, 0);
		}
		100% {
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
	}
	@-webkit-keyframes move-animation {
	 0%{
		 -webkit-transform: translate(0,0);
		 transform: translate(0,0);
	 }
	 }
	@keyframes move-animation {
		0% {
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
		25% {
			-webkit-transform: translate(-64px, 0);
			transform: translate(-64px, 0);
		}
		75% {
			-webkit-transform: translate(32px, 0);
			transform: translate(32px, 0);
		}
		100% {
			-webkit-transform: translate(0, 0);
			transform: translate(0, 0);
		}
	}

	.circle-loader {
		display: block;
		width: 64px;
		height: 64px;
		margin-left: -32px;
		margin-top: -32px;
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform-origin: 16px 16px;
		transform-origin: 16px 16px;
		-webkit-animation: rotate-animation 5s infinite;
		animation: rotate-animation 5s infinite;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
	}
	.circle-loader .circle {
		-webkit-animation: move-animation 2.5s infinite;
		animation: move-animation 2.5s infinite;
		-webkit-animation-timing-function: linear;
		animation-timing-function: linear;
		position: absolute;
		left: 50%;
		top: 50%;
	}
	.circle-loader .circle-line {
		width: 64px;
		height: 24px;
		position: absolute;
		top: 4px;
		left: 0;
		-webkit-transform-origin: 4px 4px;
		transform-origin: 4px 4px;
	}
	.circle-loader .circle-line:nth-child(0) {
		-webkit-transform: rotate(0deg);
		transform: rotate(0deg);
	}
	.circle-loader .circle-line:nth-child(1) {
		-webkit-transform: rotate(90deg);
		transform: rotate(90deg);
	}
	.circle-loader .circle-line:nth-child(2) {
		-webkit-transform: rotate(180deg);
		transform: rotate(180deg);
	}
	.circle-loader .circle-line:nth-child(3) {
		-webkit-transform: rotate(270deg);
		transform: rotate(270deg);
	}
	.circle-loader .circle-line .circle:nth-child(1) {
		width: 8px;
		height: 8px;
		top: 50%;
		left: 50%;
		margin-top: -4px;
		margin-left: -4px;
		border-radius: 4px;
		-webkit-animation-delay: -0.3s;
		animation-delay: -0.3s;
	}
	.circle-loader .circle-line .circle:nth-child(2) {
		width: 16px;
		height: 16px;
		top: 50%;
		left: 50%;
		margin-top: -8px;
		margin-left: -8px;
		border-radius: 8px;
		-webkit-animation-delay: -0.6s;
		animation-delay: -0.6s;
	}
	.circle-loader .circle-line .circle:nth-child(3) {
		width: 24px;
		height: 24px;
		top: 50%;
		left: 50%;
		margin-top: -12px;
		margin-left: -12px;
		border-radius: 12px;
		-webkit-animation-delay: -0.9s;
		animation-delay: -0.9s;
	}
	.circle-loader .circle-blue {
		background-color: #1f4e5a;
	}
	.circle-loader .circle-red {
		background-color: #ff5955;
	}
	.circle-loader .circle-yellow {
		background-color: #ffb265;
	}
	.circle-loader .circle-green {
		background-color: #00a691;
	}

</style>
</head>
<body>
<div class="page">

<div class="system-message">

<?php if(isset($message)) {?>
<!--<h1>:)</h1>-->
<p class="success"><?php echo($message); ?></p>
<?php }else{?>
<!--<h1>:(</h1>-->
<p class="error"><?php echo($error); ?></p>
<?php }?>

<p class="detail"></p>
<p class="jump">
页面自动 <a id="href" href="<?php echo($jumpUrl); ?>">跳转</a> 等待时间： <b id="wait"><?php echo($waitSecond); ?></b>
</p>
</div>

<div class="circle-loader">
	<div class="circle-line">
		<div class="circle circle-blue"></div>
		<div class="circle circle-blue"></div>
		<div class="circle circle-blue"></div>
	</div>
	<div class="circle-line">
		<div class="circle circle-yellow"></div>
		<div class="circle circle-yellow"></div>
		<div class="circle circle-yellow"></div>
	</div>
	<div class="circle-line">
		<div class="circle circle-red"></div>
		<div class="circle circle-red"></div>
		<div class="circle circle-red"></div>
	</div>
	<div class="circle-line">
		<div class="circle circle-green"></div>
		<div class="circle circle-green"></div>
		<div class="circle circle-green"></div>
	</div>
</div>

</div>


<script type="text/javascript">
(function(){
var wait = document.getElementById('wait'),href = document.getElementById('href').href;
var interval = setInterval(function(){
	var time = --wait.innerHTML;
	if(time <= 0) {
		location.href = href;
		clearInterval(interval);
	};
}, 1000);
})();
</script>
</body>
</html>
