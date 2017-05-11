<?php
namespace Home\Controller;
use Think\Controller;
class ForgetController extends Controller {
	public function forget(){
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
		if(IS_POST){
			$code = I('code');
			$verify = new \Think\Verify();  
			$result = $verify->check($code);//判断验证码

			$rule = array(
				array('account','checkAcc','用户名不存在！',0,'function'),
			);
			$user = D('user');
			$info = $user->validate($rule)->create();//判断用户信息

			$check = new \Home\Model\ForgetModel();
			$res = $check->forgetAcc($result,$info);

			$_SESSION['forgetAcc'] = $info;
			$this->ajaxReturn($res);
		}else{
			$this->display();
		}
	}
}