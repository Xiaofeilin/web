<?php
namespace Home\Controller;
//use Think\Controller;
class UserController extends EqualController {
	protected $model;

	public function __construct(){
		parent::__construct();
		$this->model = D('User');
	}

	public function index(){
		$time = time();
		$this->assign('time',$time);
		$this->display();
	}

	public function information(){
		if(IS_POST){
			$_POST['birthdate'] = strtotime(I('birthdate'));
			$sub = I('sub',0);
			if($sub == 1){
				parent::information('information');
				$id = I('id');
				$data['userOne'] = $this->model->find($id);
				$this->assign($data);
				$this->display();
			}
		}else{
			//$user = D('User');
			$map['id'] = $_SESSION['info']['id'];
			$userinfo = $this->model->where($map)->getAll();
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
}