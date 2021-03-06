<?php
namespace Home\Model;
use Think\Model;
class ForgetModel extends Model{
	protected $model;

	/********** 构造方法实例化 **********/
	public function __construct(){
		$this->model = D('User');
	}

	protected $_validate = array(
		array('password','/^[~!@#$%^&*-_=+,.?\d\w]{8,16}$/','密码存在非法字符或密码长度不够8个！',0),
		array('repassword','password','两次输入的密码不一致',0,'confirm'),
		array('tel','/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/','手机号码不符合规范！','0'),
		array('tel','checkTel','手机号码没有绑定该账号！',0,'callback'),
		array('account','checkAcc','账号不存在！',0,'callback'),
	);

	/**
	*['回调函数检测用户名是否存在']
	*@param string	$val[用户输入的用户名]
	*@return  boolean	返回true或false
	*/
	public function checkAcc($val){
		$map['account'] = $val;
		$info = $this->model->where($map)->find();
		if($info){
			return true;
		}else{
			return false;
		}
	}

	/**
	*['回调函数检测手机是否与用户名绑定']
	*@param string	$val[用户输入的用户名]
	*@return  boolean	返回true或false
	*/
	public function checkTel($val){
		$map['tel'] = $val;
		$map['account'] = I('account');
		$info = $this->model->where($map)->find();
		if($info){
			return true;
		}else{
			return false;
		}
	}
}