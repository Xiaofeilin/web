<?php
namespace Home\Controller;
//use Think\Controller;
class UserController extends EqualController {
	protected $model;

	public function __construct(){
		parent::__construct();
		$this->model = D('User');
	}

	/**
	*[用户主页面显示]
	*/
	public function index(){
		$id = $_SESSION['info']['id'];
		$orders = D('orders');
		$ordst0 = $orders->where("state = 0 and user_id = '$id'")->count();
		$ordst1 = $orders->where("state = 1 and user_id = '$id'")->count();
		$ordst2 = $orders->where("state = 2 and user_id = '$id'")->count();
		$time = time();
		$this->assign('ordst0',$ordst0);
		$this->assign('ordst1',$ordst1);
		$this->assign('ordst2',$ordst2);
		$this->assign('time',$time);
		$this->display();
	}

	/**
	*[用户详细页面显示]
	*/
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
			$map['id'] = $_SESSION['info']['id'];
			$userinfo = $this->model->where($map)->getAll();
			$this->assign('userinfo',$userinfo);
			$this->display();
		}
	}

	/**
	*[检测账号是否合法]
	*/
	public function checkAcc(){
		$user = D('User');
		$info = $user->create();

		$_SESSION['infoMsg']['account'] = I("account");

		$this->error($user->getError());
	}
}