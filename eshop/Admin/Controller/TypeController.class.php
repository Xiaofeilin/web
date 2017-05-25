<?php
	namespace Admin\Controller;
	class TypeController extends EqualController{

		/**
		*['创建type实例‘]
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('type');
		}

		/**
		*['创建type添加‘]
		*/
		public function add(){
			parent::add();
			$this->display();
		}

		/**
		*['创建type视图‘]
		*/
		public function list(){
			$data = array();
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('添加类型',U('add'),'类型列表');
			$this->display();
		}

		/**
		*['创建type修改‘]
		*/
		public function edit(){
			$id = I('get.id','');
			parent::edit('',array('id'=>$id));
			$data = array();
			$data['typeOne'] = $this->model->where('id='.$id)->find();
			$this->assign($data);
			$this->display();
		}

		/**
		*['创建type删除‘]
		*/
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
