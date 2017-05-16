<?php
namespace Home\Controller;
use Think\Controller;
class UserController extends Controller {
	//protected $pCode;

	public function information(){
		$user = D('User');
		$map['usernum'] = $_SESSION['info']['usernum'];
		$userinfo = $user->where($map)->getAll();
		$this->assign('userinfo',$userinfo);
		$this->display();
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