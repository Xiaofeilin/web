<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
	public function login(){
		if(IS_POST){
			//var_dump($_POST);
			$rule = array(
				array('account','checkAcc','用户名不正确！',0,'function'),
				array('password','checkPwd','密码不正确！',0,'function'),
				array('code','checkCode','验证码不正确！',0,'function'),
			);
			$user = D('user');
			$info = $user->validate($rule)->create();
			//var_dump($info);
			if($info){
				$this->ajaxReturn(1);
			}else{
				$this->ajaxReturn($user->getError(),"eval");
			}
		}else{
			$this->display();
		}
	}

	public function code(){
		$config = array(
			'fontSize'       =>    15,  // 验证码字体大小    
			'length'          =>    4,     // 验证码位数
			'useNoise'    =>    false, // 关闭验证码杂点;
		);
		$verify = new \Think\Verify($config);
		$verify->entry();
	}
}
