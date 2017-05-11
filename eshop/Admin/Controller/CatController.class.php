<?php
	namespace Admin\Controller;
	class CatController extends EqualController{

		/**
		*['创建cat类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('cat');
		}

		/**
		*[cat数据表添加数据]
		*/
		public function add(){
			parent::add();
			$data['catAll'] = $this->model->lvIt3();
			$this->assign($data);
			$this->assignHead('添加分类',U('list'),'分类列表');
			$this->display();
		}



		/**
		*[cat数据表字段修改]
		*/
		public function edit(){
			parent::edit();
			$id = I('get.id','');
			$data = array();
			$data['catOne'] = $this->model->getCatOne($id);
			$this->assign($data);
			$this->assignHead('修改分类',U('list'),'分类列表');
			$this->display();
		}



		/**
		*[ajax无刷新修改is_show]
		*/
		public function ajaxIsShow(){
			$id = I('get.id','');
			$catOne = $this->model->find($id);
			$catOne['is_show'] = $catOne['is_show']?0:1;
			if($this->model->save($catOne))
				$this->ajaxReturn( $catOne['is_show'] );
		}



		/**
		*[cat数据删除]
		*/
		public function del(){
			$id = I('get.id','');
			$lv = I('get.lv','0');
			$p = I('get.p',0);

			if($lv<2)
				$catList = $this->model->where('parent_id='.$id)->select();	
			else
				$catList = D('goods')->where('cat_id='.$id)->select();
				
			if(!empty($catList)){
				$error = $this->model->getError();
				$this->error($error);
				exit;
			}

			$this->success( '修改成功',U('list',array('p'=>$p)) );
		}


		/**
		*[cat数据表显示和搜索]
		*/
		public function list(){
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('分类列表',U('add'),'添加分类');
			$this->display();
		}
	}
