<?php
namespace Home\Model;
use Think\Model;
class SafeModel extends Model{
	protected $model;

	/********** 构造方法实例化 **********/
	public function __construct(){
		$this->model = D('user');
	}

	protected $_validate = array(
		array('oldpwd','checkOldPwd','原密码不正确！',0,'callback'),
		array('pwd','/^[~!@#$%^&*-_=+,.?\d\w]{8,16}$/','密码存在非法字符或密码长度不够8个！',0),
		array('repwd','pwd','两次输入的密码不一致',0,'confirm'),
		array('email','/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/','邮箱格式不符合规范！',0),	
		array('tel','checkTel','该手机号码已经被使用！',0,'callback'),
		array('tel','/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/','手机号码不符合规范！',0),	
	);

	/**
	*['回调函数检测手机号码是否存在']
	*@param string	$val[用户输入的手机号码]
	*@return  boolean	返回true或false
	*/
	public function checkTel($val){
		$map['tel'] = $val;
		$info = $this->model->where($map)->find();
		if($info){
			return false;
		}else{
			return true;
		}
	}

	/**
	*['回调函数检测原密码是否正确']
	*@param string	$val[用户输入的原密码]
	*@return  boolean	返回true或false
	*/
	public function checkOldPwd($val){
		$map['pwd'] = md5($val);
		$map['id'] = $_SESSION['info']['id'];
		$info = $this->model->where($map)->find();
		if($info){
			return true;
		}else{
			return false;
		}
	}
}