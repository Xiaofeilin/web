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
		$user = new \Home\Model\RegModel();
		$info = $user->create();//判断用户信息

		$_SESSION['regMsg']['account'] = I("account");

		$this->error($user->getError());
	}

	public function checkPass(){
		$user = new \Home\Model\RegModel();
		$info = $user->create();//判断用户信息

		$_SESSION['regMsg']['pwd'] = I("password");

		$this->error($user->getError());
	}

	public function checkCode(){
		$code = I('code');
		$verify = new \Think\Verify();  
		$result = $verify->check($code);//判断验证码

		if(!$result) $this->error("验证码错误！");
	}

}