<?php
	namespace Admin\Controller;
	class MemberLevelController extends EqualController{
		public function __construct(){
			parent::__construct();
			$this->model = D('MemberLevel');
		}


		public function add(){
			parent::add();
			$this->display();
		}

		public function list(){
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('等级列表',U('add'),'等级添加');
			$this->display();
		}

		public function edit(){
			$id = I('get.id','');
			parent::edit('',array('id'=>$id));
			$data = array();
			$data['memberLevelOne'] = $this->model->find($id);
			$this->assign($data);
			$this->display();
		}

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
