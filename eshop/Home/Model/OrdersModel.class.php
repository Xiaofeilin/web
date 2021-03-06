<?php
namespace Home\Model;
use Think\Model;
class OrdersModel extends Model{
	public function search($id,$state){
		if($state == 1){
			$where['state'] = array('eq','1');
		}else if($state == 2){
			$where['state'] = array('eq','2');
		}else if($state == 0){
			$where['state'] = array('eq','0');
		}else if($state == 3){
			$where['state'] = array('eq','3');
		}else{
			$where['state'] = array('between','0,3');
		}

		$detail = D('detail');

		$dlist = $detail->field('goods.goods_name,detail.goods_attr_id,detail.price,detail.num,orders.total,orders.state,orders.buytime,orders.user_id,goods.sm_logo,detail.orders_id')->join('LEFT JOIN goods ON detail.goods_id = goods.id')->join('LEFT JOIN goods_attr ON detail.goods_attr_id = goods_attr.id')->join('LEFT JOIN attr ON goods_attr.attr_id = attr.id')->join('LEFT JOIN orders ON detail.orders_id = orders.id')->where($where)->where("orders.user_id = '$id'")->select();

		$stateName = array('待发货','已发货','已收货','无效订单');

		foreach ($dlist as &$val) {
			$val['state'] = $stateName[ $val['state'] ];
		}
		
		$data['dlist'] = $dlist;
		return $data;
	}
}