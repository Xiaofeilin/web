<?php
namespace Home\Controller;
use Think\Controller;
class LoginController extends Controller {
	/**
	*['登录页面']
	*/
	public function login(){
		if(cookie('acc') && cookie('pwd')){
			$str = cookie('acc');
			$preg = "/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/";
			$res = preg_match($preg, $str);
			if($res){
				$map['tel'] = cookie('acc');
			}else{
				$map['account'] = cookie('acc');
			}
			$map['pwd'] = md5(cookie('pwd'));
			$user = D('user');
			$userInfo = $user->where($map)->find();

			if($userInfo['is_use'] == 1){
				$_SESSION['info'] = $userInfo;
				$this->redirect("Index/index");
			}else{
				session('info',null);
				cookie('acc',null);
				cookie('pwd',null);
				$this->error('你的账户被禁用或被拉进黑名单！',U('Login/login'),3);
			}
		}
		if(IS_POST){
			$rule = array(
				array('account','checkAcc','用户名或手机不存在！',0,'function'),
				array('password','checkPwd','密码不正确！',0,'function'),
			);
			$user = D('user');
			$info = $user->validate($rule)->create();//判断用户信息

			$str = I('account');
			$preg = "/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/";
			$res = preg_match($preg, $str);
			if($res){
				$map['tel'] = I('account');
			}else{
				$map['account'] = I('account');
			}
			$userInfo = $user->where($map)->find();//查找用户信息

			if($userInfo['is_use'] == 1){
				$check = new \Home\Model\LoginModel();
				$res = $check->checkErrorlogin($info,$userInfo);//获取检测结果

				$rem = I("rem");
				if($res == 1){
					if($rem == 1){
						cookie('acc',I("account"),60*60*24*7);
						cookie('pwd',I("password"),60*60*24*7);
					}
					$this->ajaxReturn(1);
				}else{
					$this->ajaxReturn($res,"eval");
				}
			}else{
				$this->ajaxReturn("你的账户被禁用或被拉进黑名单！","eval");
			}
		}else{
			$this->display();
		}
	}

	public function logout(){
		session('info',null);
		session('cart',null);
		cookie('acc',null);
		cookie('pwd',null);
		$this->success("退出成功！",U('Login/login'),3);
	}
}
