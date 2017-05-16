<?php
namespace Home\Model;
use Think\Model;
class SafeModel extends Model{
	protected $model;

	protected $_validate = array(
		array('password','/^[~!@#$%^&*-_=+,.?\d\w]{8,16}$/','密码存在非法字符或密码长度不够8个！',0),
		array('repassword','password','两次输入的密码不一致',0,'confirm'),
		array('email','/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/','邮箱格式不符合规范！',0),	
		array('tel','/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/','手机号码不符合规范！',0),
	);

}