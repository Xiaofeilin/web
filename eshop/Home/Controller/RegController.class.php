<?php
namespace Home\Controller;
use Think\Controller;
class RegController extends Controller {
	public function index(){
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
}