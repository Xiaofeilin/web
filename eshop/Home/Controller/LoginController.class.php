<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
	/**
	*['登录页面']
	*/
	public function login(){
		if(IS_POST){
			/*
			$code = I('code');
			$verify = new \Think\Verify();  
			$result = $verify->check($code);//判断验证码
			if(!$result) $this->ajaxReturn("验证码不正确！","eval");
			*/
			
			$rule = array(
				array('account','checkAcc','用户名或手机不存在！',0,'function'),
				array('password','checkPwd','密码不正确！',0,'function'),
			);
			$user = D('user');
			$info = $user->validate($rule)->create();//判断用户信息
			//var_dump($info);

			$str = I('account');
			$preg = "/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/";
			$res = preg_match($preg, $str);
			if($res){
				$map['tel'] = I('account');
			}else{
				$map['account'] = I('account');
			}
			//$map['pwd'] = md5(I('password'));
			$userInfo = $user->where($map)->find();//查找用户信息

			//var_dump($userInfo);

			$check = new \Home\Model\LoginModel();
			$res = $check->checkErrorlogin($info,$userInfo,$map);//获取检测结果
			if($res == 1){
				$this->ajaxReturn(1);
			}else{
				$this->ajaxReturn($res,"eval");
			}
		}else{
			$this->display();
		}
	}

	public function logout(){
		unset($_SESSION['info']);
		$this->success("退出成功！",U('Login/login'),3);
	}

	/**
	*['验证码显示']
	*/
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
