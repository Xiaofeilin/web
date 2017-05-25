<?php
	namespace Admin\Controller;
	class CommentController extends EqualController{
		
		/**
		*['创建comment类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('GoodsComment');
		}

		/**
		*['创建comment视图']
		*/
		public function list(){
			$data= $this->model->search();
			$this->assign($data);
			$this->display();
		}

		/**
		*['创建未审comment视图']
		*/
		public function nolist(){
			$data= $this->model->search(1);
			$this->assign($data);
			$this->display();
		}

		/**
		*['创建comment修改']
		*/
		public function edit(){
			$id = I('id','');
			parent::edit('',array('id'=>$id));
			$user = D('user');
			$cPics = D('CommentPics');
			$goods = D('goods');
			$data['comment'] = $this->model->where('id='.$id)->find();
			$data['user'] = $user->field('username')->where('id='.$data['comment']['user_id'])->find();
			$data['goods'] = $goods->field('goods_name,logo')->where('id='.$data['comment']['goods_id'])->find();
			$data['pics'] = $cPics->field('goods_pric')->where('comment_id='.$data['comment']['id'])->select();
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
	}
