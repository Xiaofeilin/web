<?php
namespace Home\Model;
use Think\Model;
class RegModel extends Model{
	protected $model;

	/********** 构造方法实例化 **********/
	public function __construct(){
		$this->model = D('user');
	}

	protected $_validate = array(
		array('account','/^[a-zA-Z]{1}[a-zA-Z0-9_]{7,15}$/','账号应为英文开头的8-16个数字字母组合(不区分大小写)！',0),
		array('account','checkAcc','账号已被使用！',0,'callback'),
		array('password','/^[~!@#$%^&*-_=+,.?\d\w]{8,16}$/','密码存在非法字符或密码长度不够8个！',0),
		array('email','/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/','邮箱格式不符合规范！','0'),
	);

	public function checkAcc($val){
		$map['account'] = $val;
		$info = $this->model->where($map)->find();
		if($info){
			return false;
		}else{
			return true;
		}
	}

}