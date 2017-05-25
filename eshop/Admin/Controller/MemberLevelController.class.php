<?php
	namespace Admin\Controller;
	class MemberLevelController extends EqualController{
		/**
		*['创建memberlevel类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('MemberLevel');
		}

		/**
		*['创建memberlevel添加']
		*/
		public function add(){
			parent::add();
			$this->display();
		}

		/**
		*['创建memberlevel视图']
		*/
		public function list(){
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('等级列表',U('add'),'等级添加');
			$this->display();
		}

		/**
		*['创建memberlevel修改']
		*/
		public function edit(){
			$id = I('get.id','');
			parent::edit('',array('id'=>$id));
			$data = array();
			$data['memberLevelOne'] = $this->model->find($id);
			$this->assign($data);
			$this->display();
		}

		/**
		*['创建memberlevel删除']
		*/
		public function del(){
			$id = I('get.id','');
			if( $this->model->delete($id) )
				$this->success( '删除成功',U( 'list',array( 'p'=>$p) ) );
			else{
				$error = $this->model->getError();
				$this->error($error);
			}
		}
	}
