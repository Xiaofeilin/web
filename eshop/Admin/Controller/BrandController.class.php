<?php
	namespace Admin\Controller;
	class BrandController extends EqualController{
		
		/**
		*['创建brand类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('brand');
		}


		public function add(){
			parent::add();
			$this->assignHead('品牌添加',U('list'),'品牌列表');
			$this->display();
		}

		public function list(){
			$data = array();
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('品牌列表',U('add'),'添加品牌');
			$this->display();
		}

		public function edit(){
			parent::edit();
			$data = array();
			$id = I('get.id','');
			$data['brandOne'] = $this->model->find($id);
			$this->assign($data);
			$this->assignHead('品牌修改',U('list'),'品牌列表');
			$this->display();
		}

		public function del(){
			$id = I('get.id','');
			$p = I('get.p','');
			$goods = D('goods');
			$goodsNum = $goods->field('count(0) num')->where('brand_id='.$id)->find();
			if($goodsNum['num'])
				$this->error('部分商品含有此品牌');
			else{
				$this->model->delete($id);
				$this->success( '删除成功',U( 'list',array( 'p'=>$p) ) );
			}
			exit;
		}
	}
