<?php
return array(
	//'配置项'=>'配置值'
	/******************数据库配置*********************/
	'DB_TYPE' 	=>	 'mysql',
	'DB_HOST'	=>	'192.168.22.66',
	'DB_USER'	=>	'lgbya',
	'DB_PWD'	=>	'123456',
	'DB_NAME'	=>	'eshop',

	// 'DB_USER'	=>	'root',
	// 'DB_PWD'	=>	'123',


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
	 
	 'URL_MODEL'            => 2, //URL模式,

	 'SHOW_PAGE_TRACE'   	=>	true,

	/*******************email发信设置******************/
	'email_config' => array(
		'secure'	=>	 'tls',     //链接加密方式 Options: "", "ssl" or "tls"; 为空时, 端口一般是25; ssl , 端口一般为 465 ; 
		'host'		=>	 'smtp-mail.outlook.com',     //SMTP 服务器
		'port'		=>	 '587',    //SMTP 端口, 一般为25, QQ为465或587 
		'username'	=>	'necomori246@outlook.com', //邮箱帐号
		'psw'		=>	'Kuroneko2461357', //邮箱密码 QQ使用SMTP授权码 uwrfbgqqfodjfaea
		'From'		=>	'necomori246@outlook.com', //发件人地址
		'FromName'	=>	'Necomori', //发件人姓名
	),       
);
