<?php
	namespace Admin\Controller;
	class TypeController extends EqualController{

		public function __construct(){
			parent::__construct();
			$this->model = D('type');
		}

		public function add(){
			parent::add();
			$this->assignHead('添加类型',U('list'),'类型列表');
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
			$this->assignHead('修改类型',U('list'),'类型列表');
			$this->display();
		}

		public function del(){
			$id = I('get.id','');
			$p = I('get.p','');
			$goods = D('goods');
			$goodsNum = $goods->field('count(0) num')->where('type_id='.$id)->find();
			if($goodsNum['num'])
				$this->error('部分商品含有此类型');
			else{
				$this->model->delete($id);
				$this->success( '删除成功',U( 'list',array( 'p'=>$p) ) );
			}
			exit;
		}
	}
