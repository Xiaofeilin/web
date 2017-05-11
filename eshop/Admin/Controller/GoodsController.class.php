<?php
	namespace Admin\Controller;
	class goodsController extends EqualController{

		/**
		*['创建goods类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('goods');
		}

		public function list(){
			$data = $this->model->search();
			$this->assign($data);
			
			$this->assignHead('商品列表',U('add'),'商品添加');
			$this->display();
		}

		public function add(){
			parent::add();
			$data = $this->model->goodsAss();
			$this->assign($data);
			$this->assignHead('商品添加',U('list'),'商品列表');
			$this->display();
		}

		public function edit(){

		}

		public function ajaxGetAttr(){
			if( !$type_id = I('type_id','') ){
				$this->ajaxReturn(0);
			}else{
				$attr = D('attr');
				$attrList = $attr->where('type_id='.$type_id)->order('attr_type desc')->select();
				$this->ajaxReturn($attrList);
			}
		}

		public function del(){

		}

		public function ajaxGetStatus(){
			$data = array();
			$status = I('get.status','');
			$id = I('get.id','');
			if( $goodsOne = $this->model->find($id) ){
				$goodsOne[$status] = $goodsOne[$status]?0:1;
				if($this->model->save($goodsOne) )
					$this->ajaxReturn( $goodsOne[$status] );
			}
		}
	}
