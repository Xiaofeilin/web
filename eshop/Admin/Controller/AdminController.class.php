<?php
	namespace Admin\Controller;

	class AdminController extends EqualController{
		/**
		*['创建Admin类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('admin');
		}

		/**
		*['admin数据表添加数据']
		*/
		public function add(){
			parent::add();
			$this->assignHead('添加管理员',U('list'),'添加管理员');
			$this->display();
		}


		/**
		*['admin数据表字段修改']
		*/
		public function edit(){
			$id = I('get.id','');
			$data = array();
			parent::edit('',array('id'=>$id));
			$data['adminOne'] = $this->model->getAdminOne($id);
			$data['adminOne'] = $data['adminOne'][0];
			$this->assign($data);
			$this->assignHead('修改管理员资料',U('list'),'修改管理员资料');
			$this->display();
		}

		/**
		*[ajax无刷新修改is_use]
		*/
		public function ajaxIsUse(){
			$id = I('get.id','');
			$adminOne = $this->model->find($id);
			$adminOne['is_use'] = $adminOne['is_use']?0:1;
			if($this->model->save($adminOne))
				echo $adminOne['is_use'];
		}


		/**
		*[admin数据删除]
		*/
		public function del(){
			$id = I('get.id','');
			$lv = I('get.lv','0');
			$p = I('get.p',0);

			$this->model->delete($id);

			$this->success( '删除成功',U('list',array('p'=>$p)) );
		}


		/**
		*[admin数据表显示和搜索]
		*/
		public function list(){
			$data = array();
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('添加管理员',U('add'),'管理员列表');
			$this->display();
		}


		//添加角色
		public function addrole(){
			$id = I('get.id','');
			$data = array();
			parent::edit('',array('id'=>$id));
			$data['adminOne'] = $this->model->getAdminOne($id);
			$data['adminOne'] = $data['adminOne'][0];
			$data['roleAll'] = D('role')->select();
			$data['adminOne']['role_list'] = $data['adminOne']['group_concat(role_id)'];
			$this->assign($data);
			$this->assignHead('编辑管理员角色',U('list'),'编辑管理员角色');
			$this->display();
		}

		public function delall(){
			$ids = I('ids');
			$res = $this->model->where(array('id'=>array('in',$ids)))->delete();
			if ($res != false) {
				$this->success('删除成功');
			}else{
				$this->error('没有选项被选中');
			}
		}
	}
