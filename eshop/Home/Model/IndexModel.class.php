<?php
	namespace Home\Model;
	class IndexModel extends CommonModel{
		 protected $autoCheckFields = false;

		 public function goodsSelect(){
		 	$data = array();
			$goods = D('goods');
			$field = 'id,goods_name,shop_price,logo,promote_price,promote_end_time';

			$data['goods_is_hot_list'] = $goods->field($field)->where('is_hot=1 and is_del=0 and is_on_sale=1')->order('sort_num asc')->limit(3)->select();

			$data['goods_is_sale_list'] = $goods->field($field)->where('is_sale=1 and is_on_sale=1 and promote_start_time<'.time().' and promote_end_time>'.time())->limit(4)->select();
			return $data;
		}
	}
