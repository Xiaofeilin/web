<?php
	namespace Admin\Controller;
	class TypeController extends EqualController{

		public function __construct(){
			parent::__construct();
			$this->model = D('type');
		}

		public function add(){
			parent::add();
			$this->display();
		}

		public function list(){
			$data = array();
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('类型列表',U('add'),'添加类型');
			$this->display();
		}

		public function edit(){
			parent::edit();
			$id = I('get.id','');
			$data = array();
			$data['typeOne'] = $this->model->find();
			$this->assign($data);
			$this->display();
		}
	}
