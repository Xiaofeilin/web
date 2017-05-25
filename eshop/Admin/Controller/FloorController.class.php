<?php
	namespace Admin\Controller;
	class FloorController extends EqualController{

		/**
		*['创建floor类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('floor');
		}


		public function add(){
			parent::add();
			$data['catList'] = $this->catSelect();
			$this->assign($data);
			$this->display();
		}


		public function edit(){
			if( ( $id=I('get.id','')) && is_numeric($id) ){
				parent::edit('',array('id'=>$id));
				$data['floorOne'] = $this->model->where('id='.$id)->find();
				$data['catList'] = $this->catSelect();
				$this->assign($data);
				$this->display();
			}else
				$this->error('非法进入');
		}

		public function list(){
			$data= $this->model->search();
			$this->assign($data);
			$this->assignHead('楼层添加',U('add'),'楼层列表');
			$this->display();
		}

		public function del(){
			if(  ( $id=I('get.id','') )  && is_numeric( $id ) ){
				if($this->model->delete($id)){
					$this->success( '删除成功',U('list',array('p'=>$p)) );
					exit;
				}
			}
			$error = $this->model->getError()?$this->model->getError():'非法进入';
			$this->error($error);
			exit;
		}

		public function catSelect(){
			$cat = D('cat');
			$catAll = $cat->select();
			$data = array();
			foreach($catAll as $k=>$v){
				if(substr_count($v['cat_path'], ',')==3)
					$data[] = $v;
			}
			return $data;
		}

		/**
		*[ajax无刷新修改is_show]
		*/
		public function ajaxIsShow(){
			$id = I('get.id','');
			$floorOne = $this->model->find($id);
			$floorOne['is_show'] = $floorOne['is_show']?0:1;
			if($this->model->save( $floorOne))
				$this->ajaxReturn(  $floorOne['is_show'] );
		}
	}
