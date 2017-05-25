$(function(){

	setInterval(function(){
		$('#pacman').toggleClass('pacman_eats');
	}, 300);

	// speed in milliseconds
	var scrollSpeed = 20;

	var bgscroll = '';

	// set the direction
	var direction = 'h';

	// set the default position
	var current = 0;

	//Calls the scrolling function repeatedly
	setInterval(function(){

		// 1 pixel row at a time
		current -= 1;

		// move the background with backgrond-position css properties        
		$('body').css("backgroundPosition", (direction == 'h') ? current+"px 0" : "0 " + current+"px");
	}, scrollSpeed); 

});
/*
本代码由js代码网网友上传，js代码网收集并编辑整理;
尊重他人劳动成果;
转载请保留js代码链接 - www.jsdaima.com
*/