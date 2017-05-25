<?php
	namespace Admin\Controller;
	class AttrController extends EqualController{
		
		/**
		*['创建attr类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('attr');
		}

		/**
		*['创建attr视图']
		*/
		public function list(){
			$data = array();
			$type = D('type');
			$data['typeAll'] = $type->select();
			$type_id = I('type_id','');
			$data['type_id'] = $type_id?$type_id: I('id','');
			$data['attrList'] = $this->model->handle($data['type_id']);
			$this->assign($data);
			$this->assignHead('属性添加',U('add',array('type_id'=>$data['type_id'])),'属性列表');
			$this->display();
		}

		/**
		*['attr添加']
		*/
		public function add(){
			$type_id = I('get.type_id','');
			parent::add('',array('type_id'=>$type_id) );
			$data = array();
			$data['type_id'] = $type_id;
			$this->assign($data);
			$this->display();
		}

		/**
		*['attr修改']
		*/
		public function edit(){
			$data = array();
			$data['id'] = I('get.id','');
			parent::edit( '' , array( 'id'=>$data['id']  ) );
			$data['type_id'] = I('get.type_id','');
			$data['attrOne'] = $this->model->find( $data['id'] );
			$this->assign($data);
			$this->display();
		}

		/**
		*['attr删除']
		*/
		public function del(){
			$p = I('get.p','');
			$id = I('get.id','');
			 $type_id = I('get.type_id','');
			
			$goodsAttr = D('GoodsAttr');
			$goodsAttrNum = $goodsAttr->field('count(0) num')->where('attr_id='.$id)->find();
			
			if($goodsAttrNum['num'])
				$this->error('部分商品含有此属性');
			else{
				$this->model->delete($id);
				$this->success( '删除成功',U( 'list',array('type_id'=>$type_id , 'p'=>$p) ) );
			}
			exit;
		}
	}
