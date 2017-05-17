<?php
	namespace Admin\Controller;
	class LoginController extends EqualController{

		public function __construct(){
			parent::__construct();
			$this->model = D('admin');
		}

		//登录
		public function login(){
			if(IS_POST){
				$Verify = new \Think\Verify();
				$res = $Verify->check(I('code'));

				if (!$res) {
					$this->error('验证码错误');
					exit;
				}
				$map['admin_name'] = I('admin_name');
				$map['password'] = I('password','','md5');
				$info = $this->model->where($map)->login();
				if (empty($info)) {
					$this->error('用户名或者密码错误!');
				}else{
					session('admininfo',$info);
					$this->redirect('Index/index');
				}
			}else{
				$this->display();
			}
		}

		//退出登录
		public function logout(){
			session('admininfo',null);
			$this->redirect('Login/login');
		}

		//验证码
		public function code(){
			$config = array(
				'fontSize'	=>	30,
				'length'	=>	4,
				'useNoise'	=>	true,
				'useCurve'	=> false,
			);

			$Verify = new \Think\Verify($config);
			$Verify->entry();
		}

	}
