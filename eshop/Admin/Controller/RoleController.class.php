<?php
	namespace Admin\Controller;

	class RoleController extends EqualController{
		/**
		*['创建Role类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('role');
		}

		/**
		*['role数据表添加数据']
		*/
		public function add(){
			parent::add();
			$this->assignHead('添加角色',U('list'),'角色列表');
			$this->display();
		}


		/**
		*['admin数据表字段修改']
		*/
		public function edit(){
			parent::edit();
			$id = I('get.id','');
			$data = array();
			$data['roleOne'] = $this->model->getAdminOne($id);
			$this->assign($data);
			$this->assignHead('修改角色资料',U('list'),'角色列表');
			$this->display();
		}

		/**
		*[role数据删除]
		*/



		/**
		*[role数据表显示和搜索]
		*/
		public function list(){
			$data = array();
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('角色列表',U('add'),'添加角色');
			$this->display();
		}
	}
