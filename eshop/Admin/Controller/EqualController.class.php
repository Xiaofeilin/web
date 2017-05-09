<?php
	namespace Admin\Controller;
	use Think\Controller;
	class EqualController extends Controller{
		protected $model;

		/**
		*[常规数据添加]
		*/
		public function add($arr=array()){
				if(IS_POST){	
					if($data = $this->model->create()){
						if( $this->model->add($data) )
							$this->success('添加成功',U('',$arr));
						exit;
					}
					$error = $this->model->getError();
					$this->error($error);
					exit;
				}
		}


		/**
		*[常规数据修改]
		*/
		public function edit( $url='list', $arr=array() ){
			if(IS_POST){
				$p = I('post.p',0);
				if($data = $this->model->create()){
					if( $this->model->save($data)!==false ){
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

		public function assignHead($title,$url,$urlName){
			$this->assign('title',$title);
			$this->assign('url',$url);
			$this->assign('urlName',$urlName);
		}
	}
