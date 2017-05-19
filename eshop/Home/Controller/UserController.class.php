<?php
namespace Home\Controller;
//use Think\Controller;
class UserController extends EqualController {
	//protected $pCode;
	protected $model;

	public function __construct(){
		parent::__construct();
		$this->model = D('User');
	}

	public function index(){
		//$user = D('User');
		//$map['id'] = $_SESSION['info']['id'];
		//$userinfo = $user->where($map)->getAll();
		//$this->assign('userinfo',$userinfo);
		$time = time();
		$this->assign('time',$time);
		$this->display();
	}

	public function information(){
		if(IS_POST){
			//var_dump($_POST);exit;
			$sub = I('sub',0);
			if($sub == 1){
				parent::information('information');
				$id = I('id');
				$data['userOne'] = $this->model->find($id);
				$this->assign($data);
				$this->display();
			}
		}else{
			$user = D('User');
			$map['id'] = $_SESSION['info']['id'];
			$userinfo = $user->where($map)->getAll();
			$this->assign('userinfo',$userinfo);
			$this->display();
		}
	}

	public function checkAcc(){
		$user = D('User');
		$info = $user->create();

		$_SESSION['infoMsg']['account'] = I("account");

		$this->error($user->getError());
	}

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