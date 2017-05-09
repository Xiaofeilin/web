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
			$type_id = I('id','');
			$data = array();
			$data['attrList'] = $this->model->where('type_id='.$type_id)->select();
			$this->assign($data);
			$this->assignHead('属性列表',U('add'),'添加属性');
			$this->display();
		}
	}
