<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
	public function login(){
		if(IS_POST){
			//var_dump($_POST);
			$rule = array(
				array('account','checkAcc','用户名不存在！',0,'function'),
				array('password','checkPwd','密码不正确！',0,'function'),
				array('code','checkCode','验证码不正确！',0,'function'),
			);
			$user = D('user');
			$info = $user->validate($rule)->create();
			//var_dump($info);

			$map['account'] = I('account');
			//$map['pwd'] = md5(I('password'));
			//var_dump($map);
			$userInfo = $user->where($map)->find();
			//var_dump($userInfo);
			$time = time();

			if($info){
				$_SESSION['info'] = $userInfo;
				//var_dump($_SESSION);

				$data['errorlogin'] = 0;
				$data['lastregtime'] = $time;
				$user->where("id={$userInfo['id']}")->save($data);

				$this->ajaxReturn(1);
			}else{
				$data['errorlogin'] = $userInfo['errorlogin'] + 1;
				$data['errortime'] = $time;
				$user->where("id={$userInfo['id']}")->save($data);

				if($time - $errortime < 1800 && $userInfo['errorlogin'] > 5){
					$this->ajaxReturn("账户名或密码输入错误超过5次，你的账户已被锁定30分钟。","eval");
				}else{
					$this->ajaxReturn($user->getError(),"eval");
				}
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
