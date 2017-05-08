<?php
return array(
	//'配置项'=>'配置值'
	/******************数据库配置*********************/
	'DB_TYPE' 	=>	 'mysql',
	'DB_HOST'	=>	'localhost',
	'DB_USER'	=>	'lgbya',
	'DB_PWD'	=>	'123456',
	'DB_NAME'	=>	'eshop',


	/***************上传文件配置**********************/
	'UpLoad_Config'	=>	array(
		'maxSize' 	=>	31457280,
		'rootPath'	=>	'./Uploads/',
		'savePath'	=>	'Goods/',
		'exts'	=>	array('jpg','gif','png','jpeg'),
		'autoSub'	=>	true,
		'subName'	=>	array('date','Y-m-d'),
	),


	/****************图片处理***********************/
	'Img_Width'	=>	100,
	'Img_Height'	=>	100,


	/*****************分页样式***********************/
	'YeShu'	=>	4,


	/******************验证码样式*********************/
	'Verify_Config'	=> array(
		'fontSize'	=>	20,
		'length'		=>	4,
		'imageW'	=>	150,
		'imageH'	=>	50,
	),

	/***********************md5**************************/
	 'MD5_KEY'		=>	'@#$%^&*',
	 
	 'URL_MODEL'            => 2, //URL模式
);
