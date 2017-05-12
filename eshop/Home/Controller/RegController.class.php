<?php
namespace Home\Controller;
use Think\Controller;
class RegController extends Controller {
	public function reg(){
		$this->display();
	}

	/**
	*['验证码显示']
	*/
	public function code(){
		$config = array(
			'fontSize'       =>    15,  // 验证码字体大小    
			'length'          =>    4,     // 验证码位数
			'useNoise'    =>    false, // 关闭验证码杂点;
		);
		$verify = new \Think\Verify($config);
		$verify->entry();
	}

	public function checkAcc(){
		$rule = array(
			array('account','/^[a-zA-Z][a-zA-Z0-9_]*$/','账号应为英文开头的数字字母组合(不区分大小写)！',1),
			array('account','','账号已被使用！',0,'unique'),	
		);
		$user = D('user');
		$info = $user->validate($rule)->create();//判断用户信息

		$this->error(json_encode($user->getError()));
	}

	public function setPass(){
		$rule = array(
			array('password','/^[\\~!@#$%^&*()-_=+|{}\[\],.?\/:;\'\"\d\w]*$/','密码存在非法字符！',1)
		);
		$user = D('user');
		$info = $user->validate($rule)->create();//判断用户信息

		$this->error(json_encode($user->getError()));
	}

	public function setCode(){
		$code = I('code');
		$verify = new \Think\Verify();  
		$result = $verify->check($code);//判断验证码

		if(!$result){
			$this->ajaxError("验证码错误！","eval");
		}else{
			$this->ajaxError(1);
		}
	}
}