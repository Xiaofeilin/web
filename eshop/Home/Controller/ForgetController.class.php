<?php
namespace Home\Controller;
use Think\Controller;
class ForgetController extends Controller {
	protected $pCode;

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

	/**
	*['检测用户与验证码对错']
	*/
	public function checkAcc(){
		if(IS_POST){
			$code = I('code');
			$verify = new \Think\Verify();  
			$result = $verify->check($code);//判断验证码

			$user = D('user');
			$info = $user->validate($rule)->create();//判断用户信息

			$check = new \Home\Model\ForgetModel();
			$res = $check->forgetAcc($result,$info);

			$_SESSION['forgetMsg'] = $info;
			$this->ajaxReturn($res);
		}else{
			$this->display();
		}
	}

	/**
	*['检测手机号码规范']
	*/
	public function checkTel(){
		$tel = new \Home\Model\ForgetModel();
		$info = $tel->create();

		$_SESSION['forgetMsg']['tel'] = I("tel");

		$this->error($tel->getError());
	}

	/**
	*['发送手机验证码']
	*/
	public function sendTelCode(){
		$toTel = I("tel");
		$pCode = mt_rand(1,999999);
		$sendTel = send_message($pCode,$toTel);

		$_SESSION['forgetMsg']['pCode'] = $pCode;

		if($sendTel){
			$this->success("短信发送成功，请打开短信填写验证码！");
		}else{
			$this->error("短信发送失败！");
		}
	}

	/**
	*['检测手机验证码是否错误']
	*/
	public function checkCode(){
		$cCode = I("tCode");
		$pCode = $_SESSION['forgetMsg']['pCode'];
		if($cCode == $pCode && $cCode != null){
			unset($_SESSION['forgetMsg']['pCode']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}

	/**
	*['检测密码是否规范']
	*/
	public function checkPassword(){
		$password = new \Home\Model\ForgetModel();
		$info = $password->create();

		$_SESSION['forgetMsg']['pwd'] = I("password");

		$this->error($password->getError());
	}

	/**
	*['检测重复密码与密码是否一致']
	*/
	public function checkRePassword(){
		$repassword = new \Home\Model\ForgetModel();
		$info = $repassword->create();

		$this->error($repassword->getError());
	}

	/**
	*['更新用户信息']
	*/
	public function resetSuccess(){
		$user = D("user");
		$data["pwd"] = md5($_SESSION['forgetMsg']['pwd']);
		$where['account'] = $_SESSION['forgetMsg']['account'];
		$where['tel'] = $_SESSION['forgetMsg']['phone'];

		$result = $user->data($data)->where($where)->save();

		unset($_SESSION['forgetMsg']);
	}
}