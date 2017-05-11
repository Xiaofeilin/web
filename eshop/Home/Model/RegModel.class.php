<?php
namespace Home\Model;
use Think\Model;
class ForgetModel extends Model{
	protected $model;

	/********** 构造方法实例化 **********/
	public function __construct(){
		$this->model = D('user');
	}

	protected $_validate = array(
		array('account','','账号已被使用',1,'unique'),
		array('account','/^[a-zA-Z][a-zA-Z0-9_]*$/','账号应为英文开头的数字字母组合(不区分大小写)',1),
		array('password','/^[\\~!@#$%^&*()-_=+|{}\[\],.?\/:;\'\"\d\w]*$/','密码存在非法字符',1),
	);
}