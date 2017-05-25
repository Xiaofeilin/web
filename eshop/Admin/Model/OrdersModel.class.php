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
		$page->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录 第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');  
	    $page->setConfig('prev', '上一页');  
	    $page->setConfig('next', '下一页');  
	    $page->setConfig('last', '末页');  
	    $page->setConfig('first', '首页');  
	    $page->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');  
	    $page->lastSuffix = false;//最后一页不显示为总页数 
		$data['show'] = $page->show();
		$ordersList = $this->field('orders.id id,user.username,address.tel tel,orders.total total,orders.buytime buytime,orders.state state,address.name linkman,concat(address.province,address.city,address.street,address.detailed) address')->join('LEFT JOIN user ON orders.user_id = user.id')->join('LEFT JOIN address ON orders.address_id = address.id')->where($where)->limit($page->firstRow.','.$page->listRows)->select();

		$data['ordersList'] = $ordersList;
		return $data;
		}

		public function detail($id){
			
			$detailList = $this->field('goods.goods_name goods_name,goods_attr.attr_value attr_value,detail.price price,detail.num num')->join('LEFT JOIN detail ON orders.id = detail.orders_id')->join('LEFT JOIN goods ON detail.goods_id = goods.id')->join('LEFT JOIN goods_attr ON detail.goods_attr_id = goods_attr.id')->join('LEFT JOIN attr ON goods_attr.attr_id = attr.id')->where("orders.id = {$id}")->select();
			return $detailList;
		}

	}
