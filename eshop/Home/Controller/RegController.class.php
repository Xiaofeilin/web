<?php
namespace Home\Controller;
use Think\Controller;
class RegController extends Controller {
	protected $eCode;

	public function reg(){
		$this->display();
	}

	/**
	*['检查用户名']
	*/
	public function checkAcc(){
		$user = new \Home\Model\RegModel();
		$info = $user->create();

		$_SESSION['regMsg']['account'] = I("account");

		$this->error($user->getError());
	}

	/**
	*['检查密码']
	*/
	public function checkPass(){
		$user = new \Home\Model\RegModel();
		$info = $user->create();

		$_SESSION['regMsg']['pwd'] = I("password");

		$this->error($user->getError());
	}

	/**
	*['检查手机']
	*/
	public function checkTel(){
		$tel = new \Home\Model\RegModel();
		$info = $tel->create();

		$_SESSION['regMsg']['tel'] = I("tel");

		$this->error($tel->getError());
	}

	/**
	*['发送手机验证码']
	*/
	public function sendTelCode(){
		$tophone = I("tel");
		$eCode = mt_rand(1,999999);
		$sendPhone = send_message($eCode,$tophone);

		$_SESSION['regMsg']['eCode'] = $eCode;

		if($sendPhone){
			$this->success("短信发送成功，请打开短信填写验证码！");
		}else{
			$this->error("短信发送失败！");
		}
	}

	/**
	*['检查手机验证码']
	*/
	public function checkTelCode(){
		$cCode = I("ecode");
		$eCode = $_SESSION['regMsg']['eCode'];
		if($cCode == $eCode && $eCode != null){
			unset($_SESSION['regMsg']['eCode']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}

	/**
	*['记录注册信息']
	*/
	public function regSuccess(){
		$user = D("user");
		$data["account"] = $_SESSION['regMsg']['account'];
		$data["pwd"] = md5($_SESSION['regMsg']['pwd']);
		$data["tel"] = $_SESSION['regMsg']['tel'];
		$data["regtime"] = time();

		$result = $user->data($data)->add();
		
		unset($_SESSION['regMsg']);

		if($result){
			$this->success("注册成功！正在跳转到登录页面！",U('Login/login'),4);
		}else{
			$this->error("注册失败！正在返回注册页面！",U('Reg/regisuter'),4);
		}
	}
}