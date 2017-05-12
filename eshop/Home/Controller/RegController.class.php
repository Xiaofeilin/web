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

	public function checkEmail(){
		$email = new \Home\Model\RegModel();
		$info = $email->create();

		$_SESSION['regMsg']['email'] = I("email");

		$this->error($email->getError());
	}

	public function sendEmailCode(){
		$toemail = I("email");
		$eCode = mt_rand(1,999999);
		$content = "你的验证码为" . $eCode;
		$sendEmail = send_email($toemail,"验证码",$content);

		$_SESSION['regMsg']['eCode'] = $eCode;

		if($sendEmail){
			$this->success("邮件发送成功，请登录邮箱填写验证码！");
		}else{
			$this->error("邮件发送失败！");
		}
	}

	public function checkEmailCode(){
		$cCode = I("ecode");
		$eCode = $_SESSION['regMsg']['eCode'];
		if($cCode == $eCode && $eCode != null){
			//unset($_SESSION['regMsg']['eCode']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}
}