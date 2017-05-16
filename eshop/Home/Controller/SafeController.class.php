<?php
namespace Home\Controller;
use Think\Controller;
class SafeController extends Controller {
	protected $oldCode;
	protected $newCode;
	//protected $eCode;

	public function safe(){
		$this->display();
	}

/*
	public function sendTelCode(){
		$toTel = I("tel");
		$pCode = mt_rand(1,999999);
		$sendTel = send_message($pCode,$toTel);

		//$_SESSION['safeMsg']['tel'] = $toTel;
		$_SESSION['safeMsg']['pCode'] = $pCode;

		if($sendTel){
			$this->success("短信发送成功，请打开短信填写验证码！");
		}else{
			$this->error("短信发送失败！");
		}
	}

	public function checkCode(){
		$cCode = I("tCode");
		$pCode = $_SESSION['safeMsg']['pCode'];
		if($cCode == $pCode && $cCode != null){
			unset($_SESSION['safeMsg']['pCode']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}

	public function checkTel(){
		$tel = new \Home\Model\SafeModel();
		$info = $tel->create();

		$_SESSION['info']['tel'] = I("tel");

		$this->error($tel->getError());
	}

	public function telSuccess(){
		$user = D('User');
		$data["tel"] = $_SESSION['info']['tel'];
		$where['account'] = $_SESSION['info']['account'];

		$result = $user->data($data)->where($where)->save();
	}

	public function checkOldPwd(){
		$oldpwd = new \Home\Model\SafeModel();
		$info = $oldpwd->create();

		$this->error($oldpwd->getError());
	}

	public function checkNewPwd(){
		$newpwd = new \Home\Model\SafeModel();
		$info = $newpwd->create();

		$_SESSION['pwdMsg']['pwd'] = I("newpwd");

		$this->error($newpwd->getError());
	}

	public function checkAgainPwd(){
		$againpwd = new \Home\Model\SafeModel();
		$info = $againpwd->create();

		$this->error($againpwd->getError());
	}

	public function pwdSuccess(){
		$user = D("User");
		$data["pwd"] = md5($_SESSION['pwdMsg']['pwd']);
		$where['account'] = $_SESSION['info']['account'];

		$result = $user->where($where)->save($data);

		unset($_SESSION['pwdMsg']);

		if($result){
			$this->success("密码修改成功！");
		}else{
			$this->error("密码修改失败！");
		}
	}

	public function sendEmailCode(){
		$toemail = I("e");
		var_dump($toemail);
		$eCode = mt_rand(1,999999);
		$content = "【超级易购店】你的邮件验证码为".$eCode;
		$email = send_email($toemail,"验证码",$content);

		$_SESSION['emailMsg']['code'] = $eCode;

		if($email){
			$this->ajaxReturn("邮件发送成功！","eval");
		}else{
			$this->ajaxReturn("邮件发送失败！","eval");
		}
	}

	public function checkEmailCode(){
		$cCode = I("ecode");
		$eCode = $_SESSION['emailMsg']['code'];
		if($cCode == $eCode && $cCode != null){
			unset($_SESSION['emailMsg']['code']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}
*/

	public function sendOldTelCode(){
		$oldCode = mt_rand(1,999999);
		$toTel = I("tel");
		$sendTel = send_message($oldCode,$toTel);

		$_SESSION['safeMsg']['oldCode'] = $oldCode;

		if($sendTel){
			$this->success("短信发送成功，请打开短信填写验证码！");
		}else{
			$this->error("短信发送失败！");
		}
	}

	public function checkOldCode(){
		$cCode = I("oldcode");
		$oldCode = $_SESSION['safeMsg']['oldCode'];
		if($cCode == $oldCode && $cCode != null){
			unset($_SESSION['safeMsg']['oldCode']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}

	public function checkNewTel(){
		//var_dump($_POST);
		//echo I("tel");
		$tel = new \Home\Model\SafeModel();
		$info = $tel->create();
		//var_dump($info);

		$_SESSION['safeMsg']['tel'] = I("tel");

		$this->error($tel->getError());
	}

	public function sendNewTelCode(){
		$newCode = mt_rand(1,999999);
		$toTel = I("tel");
		$sendTel = send_message($newCode,$toTel);

		$_SESSION['safeMsg']['newCode'] = $newCode;

		if($sendTel){
			$this->success("短信发送成功，请打开短信填写验证码！");
		}else{
			$this->error("短信发送失败！");
		}
	}

	public function checkNewCode(){
		$cCode = I("newcode");
		$newCode = $_SESSION['safeMsg']['newCode'];
		if($cCode == $newCode && $cCode != null){
			unset($_SESSION['safeMsg']['newCode']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}

	public function changeTel(){
		$user = D("User");
		$data['tel'] = $_SESSION['safeMsg']['tel'];
		$where['usernum'] = $_SESSION['info']['usernum'];

		$result = $user->where($where)->save($data);
		//var_dump($result);

		if($result){
			$_SESSION['info']['tel'] = $data['tel'];
			unset($_SESSION['safeMsg']);
			$this->ajaxReturn(1);
		}else{
			$this->ajaxReturn(2);
		}
	}

	public function checkEmail(){
		$email = new \Home\Model\SafeModel();
		$info = $email->create();
		//var_dump($info);

		$_SESSION['safeMsg']['email'] = I("email");

		$this->error($email->getError());
	}

	public function sendEmailCode(){
		$eCode = mt_rand(1,999999);
		$toemail = I("email");
		$content = "【超级易购店】你的邮件验证码为".$eCode;
		$email = send_email($toemail,"验证码",$content);

		$_SESSION['safeMsg']['emailcode'] = $eCode;

		if($email){
			$this->ajaxReturn("邮件发送成功！","eval");
		}else{
			$this->ajaxReturn("邮件发送失败！","eval");
		}
	}

	public function checkEmailCode(){
		$cCode = I("ecode");
		$eCode = $_SESSION['safeMsg']['emailcode'];
		if($cCode == $eCode && $cCode != null){
			unset($_SESSION['safeMsg']['emailcode']);
			$this->success();
		}else{
			$this->error("验证码错误！");
		}
	}

	public function changeEmail(){
		$user = D("User");
		$data['email'] = $_SESSION['safeMsg']['email'];
		$where['usernum'] = $_SESSION['info']['usernum'];

		$result = $user->where($where)->save($data);
		//var_dump($result);

		if($result){
			$_SESSION['info']['email'] = $data['email'];
			unset($_SESSION['safeMsg']);
			$this->ajaxReturn(1);
		}else{
			$this->ajaxReturn(2);
		}
	}

	public function checkOldPwd(){
		$oldpwd = new \Home\Model\SafeModel();
		$info = $oldpwd->create();

		$this->error($oldpwd->getError());
	}

	public function checkPwd(){
		$pwd = new \Home\Model\SafeModel();
		$info = $pwd->create();

		$_SESSION['safeMsg']['pwd'] = I("pwd");

		$this->error($pwd->getError());
	}

	public function checkRePwd(){
		$repwd = new \Home\Model\SafeModel();
		$info = $repwd->create();

		$this->error($repwd->getError());
	}

	public function changePwd(){
		$user = D("User");
		$data['pwd'] = md5($_SESSION['safeMsg']['pwd']);
		$where['usernum'] = $_SESSION['info']['usernum'];

		$result = $user->where($where)->save($data);
		//var_dump($result);

		if($result){
			$_SESSION['info']['pwd'] = $data['pwd'];
			unset($_SESSION['safeMsg']);
			unset($_SESSION['info']);
			$this->ajaxReturn(1);
		}else{
			$this->ajaxReturn(2);
		}
	}
}