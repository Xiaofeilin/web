<?php
	namespace Admin\Controller;
	class CatController extends EqualController{

		/**
		*['创建cat类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('cat');
		}

		/**
		*[cat数据表添加数据]
		*/
		public function add(){
			parent::add();
			$data['typeAll'] = D('type')->select();
			$data['brandAll'] = D('brand')->select();
			$data['catAll'] = $this->model->lvIt3();
			$this->assign($data);
			$this->display();
		}



		/**
		*[cat数据表字段修改]
		*/
		public function edit(){

			$id = I('get.id','');
			parent::edit('',array('id'=>$id));
			$data = array();
			$data['html'] = $this->model->restore($id);
			$data['catOne'] = $this->model->getCatOne($id);
			$this->assign($data);
			$this->display();
		}



		/**
		*[ajax无刷新修改is_show]
		*/
		public function ajaxIsShow(){
			$id = I('get.id','');
			$catOne = $this->model->find($id);
			$catData['id'] = $catOne['id'];
			$catData['is_show'] = $catOne['is_show']?0:1;
			
			if($this->model->save($catData))
				$this->ajaxReturn( $catData['is_show']);
		}

		public function ajaxGetAttr(){
			if($type_id=I('get.type_id','')){
				$attrList = D('attr')->field('id,attr_name')->where('type_id='.$type_id)->select();
				$this->ajaxReturn($attrList);
			}
		}

		/**
		*[cat数据删除]
		*/
		public function del(){
			$id = I('get.id','');
			$lv = I('get.lv','0');
			$p = I('get.p',0);

			if($lv<2){
				$catList = $this->model->where('parent_id='.$id)->select();
				if(!empty($catList)){
					$this->error('该分类有子分类无法删除');
					exit;
				}
				$this->model->delete($id);
				$this->success( '删除成功',U( 'list',array( 'p'=>$p) ) );
			}else{
				$goods = D('Goods');
				$n = $goods->field('count(0) num')->where('cat_id='.$id)->find();
				if($n['num']=='0') {
					$this->model->delete($id);
					$this->success( '删除成功',U( 'list',array( 'p'=>$p) ) );
				}else
					$this->error('该分类有商品无法删除');
			}
			
		}


		/**
		*[cat数据表显示和搜索]
		*/
		public function list(){
			$data = $this->model->search();
			$data['y'] = 4;
			$this->assign($data);
			$this->assignHead('添加分类',U('add'),'分类列表');
			$this->display();
		}
	}
