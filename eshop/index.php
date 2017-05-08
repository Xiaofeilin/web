<?php
	if(version_compare(PHP_VERSION, '5.3.0','<')) exit('require PHP > 5.3.0 !');
	
	define('APP_DEBUG',true);
	
	require('../Think/ThinkPHP/ThinkPHP.php');
