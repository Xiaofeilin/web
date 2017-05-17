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
			$data = $this->model->roleLink();
			$this->assign($data);
			$data['pri_id'] = array();
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
			$data = $this->model->roleLink();
			$data['roleOne'] = $this->model->getRoleOne($id);
			$data['roleOne'] = $data['roleOne'][0];
			$data['roleOne']['pri_list'] = $data['roleOne']['group_concat(pri_id)'];
			$this->assign($data);
			$this->assignHead('修改角色资料',U('list'),'角色列表');
			$this->display();
		}

		/**
		*[role数据删除]
		*/
		public function del(){
			$id = I('get.id','');
			$lv = I('get.lv','0');
			$p = I('get.p',0);

			D('admin_role')->where('role_id='.$id)->delete();
			$this->model->delete($id);

			$this->success( '删除成功',U('list',array('p'=>$p)) );
		}


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
