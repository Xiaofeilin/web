<?php
	namespace Admin\Controller;
	use Think\Controller;
	class LoginController extends Controller{
		protected $model;
		public function __construct(){
			parent::__construct();
			$this->model = D('login');
		}
		public function login(){
			
			if(IS_POST){

				if($data = $this->model->validate($_login_validate)->create()){
					if($this->model->login()){
						$this->ajaxReturn(1);
						exit();
					}
				}
				$error = $this->model->getError();
				$this->ajaxReturn($error);
				exit();
			}
			$this->display();
		}
		
		public function code(){
			$verify = new \Think\Verify(C('Verify_Config'));
			$verify->entry();
		}

		public function nologin(){
			session(null);
			$this->redirect('Admin/Login/login');
		}
	}
