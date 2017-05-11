<?php
	namespace Admin\Model;
	class GoodsModel extends EqualModel{

		  protected $_auto = array ( 
		  	 array('addtime','time',1,'function') , 
		  );

		   protected $_validate = array(
		   	array('goods_name','require','商品名必须填',1),
		   	array('cat_id','number','请不要乱改html代码',1),
		   	array('brand_id','number','请不要乱改html代码',2),
		   	array('market_price','number','市场价是正整数',1),
		   	array('market_price','require','市场价必须填',1),
		   	array('shop_price','number','本店价是正整数',1),
		   	array('shop_price','require','本店价必须填',1),
		   	array('integral','number','积分是正整数',2),
		   	array('integral_price','number','积分兑换是正整数',2),
		   	array('exp','number','经验值是正整数',2),
		   	array('is_sale',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('is_hot',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('is_new',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('is_best',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('is_on_sale',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('type_id','number','请不要乱改html代码',1),
		   	array('sort_num','number','排序是正整数',2),
		   );

		/**
		*[查询商品表关联的其他表]
		*/
		public function goodsAss(){
			$data = array();
			$cat = D('cat');
			$catAll = $cat->field('id,cat_name,parent_id')->select();
			$data['catAll'] = getTree($catAll);
			
			$brand = D('brand');
			$data['brandAll'] = $brand->field('id,brand_name')->select();
			
			$type = D('type');
			$data['typeAll'] = $type->field('id,type_name')->select();

			$MemberLevel = D('MemberLevel');
			$data['MemberLevelAll'] = $MemberLevel->field('id,Level_name,rate')->select();
	
			return $data;
		}


		protected function _before_insert(&$data){

			$imgData = imgUpLoad('logo','','Brand/');
			if(isset( $imgData['error'])){
				$this->error = $imgData['error'];
				return false;
			}else{
				$data['logo'] = $imgData['logo'];
				$data['sm_logo'] = $imgData['sm_logo'];
			}

			if($data['is_sale']==1){
				$data['promote_start_time'] = strtotime($data['promote_start_time'].' 00:00:01');
				$data['promote_end_time'] = strtotime($data['promote_end_time'].' 23:59:59');
			}

		}


		protected function _after_insert($data){
			if( $attr_id = I('post.attr_id','') ){
				$attr_price = I('post.attr_price','');
				$attrData = array();
				foreach ($attr_id as $key => $value) {
					foreach ($value as $key1 => $value1) {
						if(!$value1) continue;
						$price = isset($attr_price[$key][$key1])?$attr_price[$key][$key1]:0;
						$attrData[] = array(
							'goods_id'=>$data['id'],
							'attr_id'=>$key1,
							'attr_value'=>$value1,
							'attr_price'=>$price,
						);
					}
				}
				$goodsAttr = D('GoodsAttr');
				$goodsAttr->addAll($attrData);
			}

			if( $pics = $_FILES['pics'] ){
				$num = count( $pics['name'] );
				$picsData = array();
				for($i=0 ; $i<$num ; $i++){
					if(!$pics['size'][$i])  continue;
					$_FILES['logo'] = array(
						'name'=>$pics['name'][$i],
						'type'=>$pics['type'][$i],
						'tmp_name'=>$pics['tmp_name'][$i],
						'error'=>$pics['error'][$i],
						'size'=>$pics['size'][$i],
					);
					$imgData = imgUpLoad('logo');

					$picsData[] = array(
						'goods_id' => $data['id'],
						'pic' => $imgData['logo'],
						'sm_pic' => $imgData['sm_logo'],
					);
				}
				$goodsPics = D('GoodsPics');
				$goodsPics->addAll($picsData);
			}

			if( $memberPrice = I('post.member_price','') ){
				$memberPriceData = array();
				foreach ($memberPrice as $key => $value) {
					$memberPriceData[] = array(
						'goods_id'=>$data['id'],
						'level_id'=>$key,
						'price'=>$value,
					);
				}
				$memberPrice = D('MemberPrice');
				$memberPrice->addAll($memberPriceData);
			}
		}


		public function search(){
			$where = array();
			$order = 'id desc';
			$field = 'a.id,goods_name,cat_name,brand_name,market_price,shop_price,is_sale,is_hot,is_new,is_best,is_on_sale,type_name,sort_num,a.logo,addtime';
			$join = 'left JOIN brand b on a.brand_id=b.id LEFT JOIN cat c on a.cat_id=c.id LEFT JOIN type d on a.type_id=d.id';
			$data = parent::search($name='',$field,$where,$order ,$join);
			foreach ($data['goodsList'] as $key => $value) {
				$data['goodsList'][$key]['addtime'] = date('Y-m-d H:i:s',$value['addtime']);
			}
			return $data;
		}
	}
