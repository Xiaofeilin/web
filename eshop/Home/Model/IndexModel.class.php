<?php
	namespace Home\Model;
	class IndexModel extends CommonModel{
		 protected $autoCheckFields = false;


		 /**
		*[显示热门商品和促销商品]
		*@return array 		$data[商品数组]
		 */
		 public function goodsSelect(){
		 	if(!S('goods_data')){
			 	$data = array();
				$goods = D('goods');
				$field = 'a.id,goods_name,shop_price,logo,promote_price,promote_end_time';
				
				$data['goods_is_hot_list'] = $goods->field($field)->alias('a')->join('left join  goods_rep b on a.id=b.goods_id')->where('is_hot=1 and is_del=0 and is_on_sale=1  ')->order('sort_num asc')->group('goods_id')->having('sum(goods_number)>0')->limit(3)->select();

				$data['goods_is_sale_list'] = $goods->field($field)->alias('a')->join('left join  goods_rep b on a.id=b.goods_id')->where('is_sale=1 and is_on_sale=1 and promote_start_time<'.time().' and promote_end_time>'.time())->group('goods_id')->having('sum(goods_number)>0')->limit(4)->select();
				S('goods_data',$data);
			}
			$data = S('goods_data');
			return $data;
		}


		 /**
		*[显示楼层]
		*@return array 		$data[楼层数组]
		 */
		public function floorSelect(){
			if(!S('floor_data')){
				$data = array();
				$floor = D('floor');
				$goods = D('goods');
				$brand = D('brand');
				$cat = D('cat');
				$data['floorList'] = $floor->where('is_show=1 and (one_cat !=0 or two_cat!=0)')->select();

				foreach ($data['floorList'] as $key => $value) {
					$data['floorList'][$key]['goodsList']= $goods->field('a.id,goods_name,shop_price,logo')->alias('a')->join('left join  goods_rep b on a.id=b.goods_id')->where('cat_id = '.$value['one_cat'].' or cat_id = '.$value['two_cat'])->group('goods_id')->having('sum(goods_number)>0')->limit(6)->select();
					$data['cat'][$key] = $cat->where('id = '.$value['one_cat'].' or id = '.$value['two_cat'])->select();
					foreach($data['cat'][$key] as $key1=>$value1){
						$data['floorList'][$key]['catList'] = $cat->where('parent_id='.$value1['parent_id'] )->limit(6)->select();
						if($value1['brand_id']){
							$data['floorList'][$key]['brandList'] = $brand->where('id in('.$value1['brand_id'].')')->limit(6)->select();
						}
					}

				}
				S('floor_data',$data);
			}
			$data = S('floor_data');

			return $data;
			
		}
	}
