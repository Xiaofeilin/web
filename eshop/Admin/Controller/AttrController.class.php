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

		public function list(){
			$data = array();
			$type = D('type');
			$data['typeAll'] = $type->select();

			$type_id = I('type_id','');
			$data['type_id'] = $type_id?$type_id: I('id','');
			$data['attrList'] = $this->model->handle($data['type_id']);
			$this->assign($data);

			$this->assignHead('属性列表',U('add',array('type_id'=>$data['type_id'])),'添加属性');
			$this->display();
		}

		public function add(){
			$type_id = I('get.type_id','');
			parent::add( array('type_id'=>$type_id) );
			$data = array();
			$data['type_id'] = $type_id;
			$this->assignHead('添加属性',U('list',array('id'=>$data['type_id'])),'属性列表');
			$this->assign($data);
			$this->display();
		}

		public function edit(){
			parent::edit( 'list' , array( 'id'=>I('post.type_id','' ) ) );
			$data = array();
			$data['id'] = I('get.id','');
			$data['type_id'] = I('get.type_id','');
			$data['attrOne'] = $this->model->find( $data['id'] );
			$this->assignHead('修改属性',U('list',array('id'=>$data['type_id'])),'属性列表');
			$this->assign($data);
			$this->display();
		}

		public function del(){
			$p = I('get.p','');
			$id = I('get.id','');
			$type_id = I('get.type_id','');
			
			$goodsAttr = D('GoodsAttr');
			$goodsAttrNum = $goodsAttr->field('count(0) num')->where('id='.$id)->find();
			if($goodsAttrNum['num'])
				$this->error('部分商品含有此属性');
			else{
				$this->model->delete($id);
				$this->success( '删除成功',U( 'list',array('type_id'=>$type_id , 'p'=>$p) ) );
			}
			exit;

		}
	}
