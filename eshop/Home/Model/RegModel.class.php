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
		array('tel','/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/','手机号码不符合规范！','0'),
		array('tel','checkTel','手机号码已被注册，请登录！',0,'callback'),
	);

	/**
	*['回调函数检测用户名是否已存在']
	*@param string	$val[用户输入的用户名]
	*@return  boolean	返回true或false
	*/
	public function checkAcc($val){
		$map['account'] = $val;
		$info = $this->model->where($map)->find();
		if($info){
			return false;
		}else{
			return true;
		}
	}

	public function checkTel($val){
		$map['tel'] = $val;
		$info = $this->model->where($map)->find();
		if($info){
			return false;
		}else{
			return true;
		}
	}
}