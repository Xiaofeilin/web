<?php
	namespace Admin\Controller;

	class OrdersController extends EqualController{
		/**
		*['创建Order类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('orders');
		}

		/**
		*[order数据表显示和搜索]
		*/
		public function list(){
			$data = array();
			$data = $this->model->search('list');
			$this->assign($data);
			$this->assignHead('无效订单列表',U('list'),'订单列表');
			$this->display();
		}

		public function wasterlist(){
			$data = array();
			$data = $this->model->search('wasterlist');
			$this->assign($data);
			$this->assignHead('订单列表',U('wasterlist'),'无效订单列表');
			$this->display();
		}

		// ajax无刷新修改state
		public function ajaxSel(){
			$id = I('get.id','');
			$state = I('get.state','');

			$orderOne = $this->model->find($id);
			$orderOne['state'] = $state;
			if($this->model->save($orderOne))
				echo $orderOne['state']; 
		}

		//订单详细
		public function ordersdetail(){
			$data = array();
			$val = I('get.');
			$id = $val['id'];
			$data['orders'] = $val;
			$data['detailList'] = $this->model->detail($id);
			if ($data['orders']['state'] == '0') {
				$data['orders']['statecn'] = '新订单';
			}
			if ($data['orders']['state'] == '1') {
				$data['orders']['statecn'] = '已发货';
			}
			if ($data['orders']['state'] == '2') {
				$data['orders']['statecn'] = '已收货';
			}
			if ($data['orders']['state'] == '3') {
				$data['orders']['statecn'] = '无效订单';
			}
			$this->assign($data);
			$this->display();
		}

	}
