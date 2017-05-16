<?php
namespace Home\Controller;
use Think\Controller;
class SafeController extends Controller {
	public function safe(){
		$this->display();
	}

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

	/**
	*['检测手机号码规范']
	*/
	public function checkTel(){
		$tel = new \Home\Model\SafeModel();
		$info = $tel->create();

		$_SESSION['info']['tel'] = I("tel");

		$this->error($tel->getError());
	}

	public function resetSuccess(){
		$user = D('User');
		$data["tel"] = $_SESSION['info']['tel'];
		$where['account'] = $_SESSION['info']['account'];

		$result = $user->data($data)->where($where)->save();
	}
}