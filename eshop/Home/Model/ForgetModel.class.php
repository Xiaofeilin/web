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
		array('password','/^[~!@#$%^&*-_=+,.?\d\w]{8,16}$/','密码存在非法字符或密码长度不够8个！',0),
		array('repassword','password','两次输入的密码不一致',0,'confirm'),
		//array('email','/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/','邮箱格式不符合规范！','0'),	
		array('tel','/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/','手机号码不符合规范！','0'),
	);

	/**
	*['检测用户信息是否存在与验证码是否错误']
	*@param array 	$info[用户信息]
	*@param array 	$result[验证码结果]
	*@return  array 	返回相对应的提示信息
	*/
	public function forgetAcc($result,$info){
		if(!$result && !$info){
			$data['status'] = 4;
			$data['error_r'] = "验证码错误！";
			$data['error_i'] = $this->model->getError();
			return $data;
		}else if(!$result && $info){
			$data['status'] = 3;
			$data['error_r'] = "验证码错误！";
			return $data;
		}else if($result && !$info){
			$data['status'] = 2;
			$data['error_i'] = $this->model->getError();
			return $data;
		}else if($result && $info){
			$data['status'] = 1;
			return $data;
		}
	}
}