<?php
	namespace Home\Model;
	class GoodsModel extends CommonModel{
		public function search($search=''){
			

			
			$order = 'sort_num asc';
			$search = explode('|', $search);
			
			//*****************************分类搜索***********************************
			if($cid = I('get.cid')){
				$where['cat_id'] = array('eq',$cid); 
				

				//******************************属性搜索***********************************
				if( ($attr_search = $search[0])&&$search[0]!=='0.0.0.0' ){
					$attr_search = explode( '.' ,  $attr_search );
					$goods_id = array();
					$goodsAttr = D('GoodsAttr');
					foreach ($attr_search as $key => $value) {
						if($value=='0') continue;
						$arr = explode('-', $value);
						$arr = $goodsAttr->where('attr_id = '. $arr[1].' and attr_value="'.$arr[0].'"')->getField('goods_id',true);
						$goods_id = empty($goods_id)?$arr:array_intersect($goods_id,$arr);
					}
					if(empty($goods_id)) $goods_id[0] = 0;

					$where['id'] = array('in',$goods_id);
				}
				
				//***********************************品牌搜索**********************************
				if($brand_search = $search[1])
					$where['brand_id'] = array('eq',$search[1]);


				//***********************************价格搜索**********************************
				if($price = $search[2]){
					$price = explode('--', $price);
					$where['shop_price'] = array('between',$price);
				}

				
			}

			//******************************商品名**************************************
			if(!$cid&&$search[0])
				$where['goods_name'] = array('like','%'.$search[0].'%');


			//********************************排序****************************************
			if( $search['3'] )
				$order = $search['3'];
			elseif($search['1']&&!$cid)
				$order = $search['1'];


			//*****************************分页*******************************
			$data = array();
			$count = $this->where($where)->count();
			$page = new \Think\Page($count,C('YeShu'));
			$data['show'] = $page->show();
			$goodsList = $this->where($where)->order($order)->limit($page->firstRow.','.$page->listRows)->select();
			$data['goodsList'] = $goodsList;
			$data['count'] = $count;
			return $data;

		}

	}
