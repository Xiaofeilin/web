<?php
	namespace Admin\Controller;

	class PrivilegeController extends EqualController{
		/**
		*['创建Privilege类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('privilege');
		}

		/**
		*['privilege数据表添加数据']
		*/
		public function add(){
			parent::add();
			$this->assignHead('添加权限',U('list'),'权限列表');
			$this->display();
		}


		/**
		*['privilege数据表字段修改']
		*/
		public function edit(){
			parent::edit();
			$id = I('get.id','');
			$data = array();
			$data['privilegeOne'] = $this->model->getPrivilegeOne($id);
			$this->assign($data);
			$this->assignHead('修改权限资料',U('list'),'权限列表');
			$this->display();
		}

		/**
		*[ajax无刷新修改is_use]
		*/
		public function ajaxIsUse(){
			$id = I('get.id','');
			$privilegeOne = $this->model->find($id);
			$privilegeOne['is_use'] = $privilegeOne['is_use']?0:1;
			if($this->model->save($privilegeOne))
				echo $privilegeOne['is_use'];
		}


		/**
		*[privilege数据删除]
		*/



		/**
		*[privilege数据表显示和搜索]
		*/
		public function list(){
			$data = array();
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('权限列表',U('add'),'添加权限');
			$this->display();
		}
	}
