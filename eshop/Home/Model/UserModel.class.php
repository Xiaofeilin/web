<?php
namespace Home\Model;
use Think\Model;
class UserModel extends Model{
	protected $_validate = array(
		array('account','/^[a-zA-Z]{1}[a-zA-Z0-9_]{7,15}$/','账号应为英文开头的8-16个数字字母组合(不区分大小写)！',0),
		array('account','checkAcc','账号已被使用！',0,'callback'),
		//array('password','/^[~!@#$%^&*-_=+,.?\d\w]{8,16}$/','密码存在非法字符或密码长度不够8个！',0),
		//array('email','/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/','邮箱格式不符合规范！','0'),	
		array('tel','/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/','手机号码不符合规范！','0'),
		//array('tel','checkTel','手机号码已被注册，请登录！',0,'callback'),
	);

	public function getAll(){
		$userinfo = $this->select();
		$sex = array('女','男','保密');
		foreach ($userinfo as &$val) {
			$val['sex'] = $sex[ $val['sex'] ];
		}
		return $userinfo;
	}

	/**
	*['回调函数检测用户名是否已存在']
	*@param string	$val[用户输入的用户名]
	*@return  boolean	返回true或false
	*/
	public function checkAcc($val){
		$map['account'] = $val;
		$info = $this->where($map)->find();
		if($info){
			return false;
		}else{
			return true;
		}
	}

	protected function _before_insert(&$data){
		$imgData = imgUpLoad('icon','Home/Icon');
		if(isset( $imgData['error'])){
			$this->error = $imgData['error'];
			return false;
		}else{
			$data['icon'] = $imgData['icon'];
			$data['sm_icon'] = $imgData['sm_icon'];
		}
	}


	protected function _before_update(&$data){
		imgDel($this,$data['id'],"icon");
		$imgData = imgUpLoad('icon','Home/Icon');
		if(isset( $imgData['error'])){
			$this->error = $imgData['error'];
			return false;
		}else{
			$data['icon'] = $imgData['icon'];
			$data['sm_icon'] = $imgData['sm_icon'];
		}
	}
}