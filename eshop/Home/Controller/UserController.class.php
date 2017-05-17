<?php
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller {
	//protected $pCode;

	public function information(){
		$user = D('User');
		$map['id'] = $_SESSION['info']['id'];
		$userinfo = $user->where($map)->getAll();
		$this->assign('userinfo',$userinfo);
		$this->display();
	}

	public function checkAcc(){
		$user = D('User');
		$info = $user->create();

		$_SESSION['infoMsg']['account'] = I("account");

		$this->error($user->getError());
	}

	public function checkTel(){
		$user = D('User');
		$info = $user->create();

		//$_SESSION['addMsg']['tel'] = I("tel");

		$this->error($user->getError());
	}

	/*
	public function code(){
		$config = array(
			'fontSize'       =>    15,  // 验证码字体大小    
			'length'          =>    4,     // 验证码位数
			'useNoise'    =>    false, // 关闭验证码杂点;
		);
		$verify = new \Think\Verify($config);
		$verify->entry();
	}
	*/
}