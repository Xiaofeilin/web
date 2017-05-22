<?php
	namespace Admin\Controller;

	class UserController extends EqualController{//
		/**
		*['创建User类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('User');
		}

		/**
		*[ajax无刷新修改is_use]
		*/
		public function ajaxIsUse(){
			$id = I('get.id','');
			$userOne = $this->model->find($id);
			$userOne['is_use'] = $userOne['is_use']?0:1;
			if($this->model->save($userOne))
				echo $userOne['is_use'];
		}

		/**
		*['user数据显示']
		*/
		public function show(){
			$id = I('get.id','');
			$data = array();
			$data['userOne'] = $this->model->getUserOne($id);
			$data['userOne'] = $data['userOne'][0];
			$this->assign($data);
			$this->assignHead('会员详细信息',U('list'),'会员详细信息');
			$this->display();
		}

		/**
		*[user数据表显示和搜索]
		*/
		public function list(){
			$font = 1;
			$data = array();
			$data = $this->model->search($font);
			$this->assign($data);
			//$this->assignHead('黑名单列表',U('add'),'黑名单列表');
			$this->display();
		}

		/**
		*[user数据表黑名单显示和搜索]
		*/
		public function black(){
			$font = 0;
			$data = array();
			$data = $this->model->search();
			$this->assign($data);
			//$this->assignHead('黑名单列表',U('add'),'黑名单列表');
			$this->display();
		}

		/**
		*[user数据拉进黑名单]
		*/
		public function inblack(){
			$where['id'] = I('get.id','');
			$data['is_use'] = 2;
			$p = I('get.p',0);

			$this->model->where($where)->save($data);

			$this->success( '拉进黑名单成功',U('list',array('p'=>$p)) );
		}

		/**
		*[user数据拉离黑名单]
		*/
		public function outblack(){
			$where['id'] = I('get.id','');
			$data['is_use'] = 1;
			$p = I('get.p',0);

			$this->model->where($where)->save($data);

			$this->success( '离开黑名单成功',U('black',array('p'=>$p)) );
		}
	}