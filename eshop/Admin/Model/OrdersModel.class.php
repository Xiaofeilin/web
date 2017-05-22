<?php
	namespace Admin\Model;
	use Think\Model;
	class OrdersModel extends Model{

		/**
		*[搜索+分页]
		*@return array 		$data[搜索后+分页的数据]
		*/
		public function search($type){

		//******************************搜索****************************
		$where = array();
		//搜索type_name类型名，id号
		if( ( $search_key=I('get.search_key','') ) && ( $search_val=I('get.search_val','') ) ){
			if($search_key=='username')
				$where['username'] = array('like','%'.$search_val.'%') ;
			if($search_key=='linkman')
				$where['linkman'] = array('like','%'.$search_val.'%') ;
			if($search_key=='tel')
				$where['orders.tel'] = array('like','%'.$search_val.'%') ;
			if($search_key=='address')
				$where['concat(address.province,address.city,address.street,address.detailed)'] = array('like','%'.$search_val.'%') ;
			if($search_key=='total')
				$where['total'] = array('like','%'.$search_val.'%') ;
			elseif($search_key=='id')
				$where['orders.id'] = array('eq',$search_val);
		}

		//按state是否显示搜索
		if ($type == 'list') {
			$where['state'] = array('neq','3');
			if( ($state=I('get.state',false))===false || ($state=I('get.state',false))===""){
				$where['state'] = array('neq','3');
			}else{
				$where['state'] = array('eq',$state);	
			}
		}else{
			$where['state'] = array('eq','3');
		}
		
		
		//*****************************分页*******************************
		$data = array();
		$count = $this->field('orders.id id,user.username,orders.tel tel,orders.total total,orders.buytime buytime,orders.state state,orders.linkman linkman,concat(address.province,address.city,address.street,address.detailed) address')->join('LEFT JOIN user ON orders.user_id = user.id')->join('LEFT JOIN address ON orders.address_id = address.id')->where($where)->count();
		$page = new \Think\Page($count,C('YeShu'));
		$data['count'] = $count;
		$data['show'] = $page->show();
		$ordersList = $this->field('orders.id id,user.username,orders.tel tel,orders.total total,orders.buytime buytime,orders.state state,orders.linkman linkman,concat(address.province,address.city,address.street,address.detailed) address')->join('LEFT JOIN user ON orders.user_id = user.id')->join('LEFT JOIN address ON orders.address_id = address.id')->where($where)->limit($page->firstRow.','.$page->listRows)->select();

		$data['ordersList'] = $ordersList;
		return $data;
		}

		public function detail($id){
			$detail = D('detail');
			$detailList = $detail->field('')->join('LEFT JOIN goods ON detail.goods_id = goods.id')->join('LEFT JOIN goods_attr ON detail.goods_attr_id = goods_attr.id')->where("detail.orders_id = $id")->find();
			return $detailList;
		}

	}
