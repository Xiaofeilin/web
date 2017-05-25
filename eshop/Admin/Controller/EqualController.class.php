<?php
	namespace Admin\Controller;
	use Think\Controller;
	class EqualController extends Controller{
		protected $model;

		/**
		*[常规数据添加]
		*/
		public function add($url='',$arr=array(),$trans=0){
				if(IS_POST){	
					if($data = $this->model->create()){
						if( $this->model->add($data) ){
							if($trans)
								$this->model->commit();
							$this->success('添加成功',U($url,$arr));
							exit;
						}
					}
					$error = $this->model->getError();
					$this->error($error);
					exit;
				}
		}


		/**
		*[常规数据修改]
		*/
		public function edit( $url='list', $arr=array(),$trans=0 ){
			if(IS_POST){
				$p = I('post.p',0);
				if($data = $this->model->create()){
					if( $this->model->save($data)!==false ){
						if($trans)
							$this->model->commit();
						$arr = array_merge(array('p'=>$p),$arr);
						$this->success('修改成功',U($url, $arr) );
						exit;
					}
					$error = $this->model->getError();
					$this->error($error);
					exit;
				}
			}
		}


		
		/**
		*[设置头部信息]
		*@param string 	$title[标题]
		*@param string 	$url[连接名]
		*@param string 	$urlName[连接地址]
		*/
		public function assignHead($title,$url,$urlName){
			$this->assign('title',$title);
			$this->assign('url',$url);
			$this->assign('urlName',$urlName);
		}


		// 判断是否登录
		public function _initialize()
		   { 
		   		//做权限的认证
		   		//判断用户是否已经登录
		   		if(!session('?admininfo')) { 
		   			$this->redirect('Login/login');
		   		}

		   		$ControllerName = CONTROLLER_NAME;
		   		$ActionName = ACTION_NAME;

		   		$isPriList = D('privilege')->field('id')->where("`controller_name` = '{$ControllerName}' and `action_name` = '{$ActionName}'")->find();

		   		$priList = $_SESSION['admininfo']['priList']['group_concat(distinct role_pri.pri_id)'];

		   		$priArr = explode(',', $priList);

		   		if(empty($isPriList['id']) && !in_array($isPriList['id'],$priArr)) { 
		   			$this->error('对不起,没有访问权限!','');
		   		}

		   }
	}
