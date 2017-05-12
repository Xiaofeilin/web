<?php
namespace Home\Controller;
use Think\Controller;
class RegController extends Controller {
	protected $eCode;

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

	/**
	*['验证码显示']
	*/
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

	public function checkPhone(){
		$phone = new \Home\Model\RegModel();
		$info = $phone->create();

		$_SESSION['regMsg']['phone'] = I("phone");

		$this->error($phone->getError());
	}

	public function sendPhoneCode(){
		$tophone = I("phone");
		$eCode = mt_rand(1,999999);
		$sendPhone = send_message($eCode,$tophone);

		$_SESSION['regMsg']['eCode'] = $eCode;

		if($sendPhone){
			$this->success("短信发送成功，请打开短信填写验证码！");
		}else{
			$this->error("短信发送失败！");
		}
	}

	public function checkPhoneCode(){
		$cCode = I("ecode");
		$eCode = $_SESSION['regMsg']['eCode'];
		if($cCode == $eCode && $eCode != null){
			unset($_SESSION['regMsg']['eCode']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}

	public function regSuccess(){
		$user = D("user");
		$data["account"] = $_SESSION['regMsg']['account'];
		$data["pwd"] = md5($_SESSION['regMsg']['pwd']);
		$data["tel"] = $_SESSION['regMsg']['phone'];
		$data["regtime"] = time();

		$result = $user->data($data)->add();
		var_dump($result);

		if($result){
			$this->success($result);
		}else{
			$this->error("错误！");
		}
	}
}