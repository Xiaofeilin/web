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
		   	array('is_sale',array(0,1),'请不要乱改html代码',2,'in'),
		   	array('is_hot',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('is_new',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('is_best',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('is_on_sale',array(0,1),'请不要乱改html代码',1,'in'),
		   	array('type_id','number','请不要乱改html代码',2),
		   	array('sort_num','number','排序是正整数',2),
		   );

		/**
		*[查询商品表关联的其他表]
		*/
		public function goodsLink(){
			$data = array();
			$cat = D('cat');
			$catAll = $cat->field('id,cat_name,parent_id')->select();
			$data['catAll'] = getTree($catAll);
			
			$brand = D('brand');
			$data['brandAll'] = $brand->field('id,brand_name')->select();
			
			$type = D('type');
			$data['typeAll'] = $type->field('id,type_name')->select();

			$MemberLevel = D('MemberLevel');
			$data['memberLevelAll'] = $MemberLevel->field('id,Level_name,rate')->select();
	
			return $data;
		}

		/**
		*[还原商品的属性值，商品价格，商品相册]
		*/
		public function restore($id){
			$data = array();

			//获取当前商品相册
			$memberPrice = D('MemberPrice');
			$data['memberPriceList'] = $memberPrice->where('goods_id='.$id)->select();

			//**********************************************会员价格******************************************************************
			//获取所有会员等级
			$memberLevel = D('MemberLevel');
			$data['memberLevelAll'] = $memberLevel->select();

			//获取当前商品会员价
			$memberPrice = D('MemberPrice');
			$memberPriceList = $memberPrice->where('goods_id='.$id)->select();
			
			//处理商品会员价格
			$count = count($memberPriceList );
			foreach ($data['memberLevelAll']  as $key => $value) {
				foreach ($memberPriceList as $key1 => $value1) {
					if($value['id']==$value1['level_id']){
						$data['memberLevelAll'][$key]['price'] = $value1['price'];
						$count--;
					}

					if($count==0) break;
				}
			}


			//*******************************************商品属性*****************************************************************
			//获取当前商品属性
			$goodsAttr = D('GoodsAttr');
			$data['goodsAttrList'] = $goodsAttr->field('a.*,b.attr_name,b.attr_type,b.attr_option_values,type_id')->alias('a')->join('left join attr b on a.attr_id=b.id')->where('goods_id='.$id)->order('attr_type desc')->select();


			
			//获取当前的所有属性id
			$attrId = array();
			foreach ($data['goodsAttrList'] as $key => $val) {
				$attrId[] = $val['attr_id'];
			}
			$attrId=array_unique($attrId);

			//判断该类型有没有添加了新属性,有新属性添加到数组中
			$attr = D('attr');
			if($attrId){
				$attrList = $attr->field('id attr_id,attr_name,attr_type,attr_option_values,type_id')->where( array( 'type_id'=>array('eq',$data['goods']['type_id']) , 'id'=>array('not in',$attrId ) ) )->select();
				$data['goodsAttrList']= array_merge($data['goodsAttrList'],$attrList);
			}

			//欢迎当前商品的属性表
			$data['goodsAttrHtml'] = '';
			$attrId = array();
			foreach ($data['goodsAttrList'] as $key => $val) {
				$data['goodsAttrHtml'].= '<p>';
				$data['goodsAttrHtml'].=$val['attr_name'].':';
				$str = isset($val['attr_value'])?'old_':'';
				$str1 = isset($val['attr_value'])?'':'attr_';
				if(!$val['attr_option_values'])
					$data['goodsAttrHtml'].='<input type="text" name="'.$str.'attr_id[]['.$val[$str1.'id'].']" value="'.$val['attr_value'].'">';
				else{
					$arr = explode(',', $val['attr_option_values']);
					if($val['attr_type']==1){
						if(!in_array($val['attr_id'],$attrId)){
							$attrId[] = $val['attr_id'];
							$data['goodsAttrHtml'].="<a onclick='addnew(this)' javascript='void(0)'>[+]</a>";
						}else{
							$data['goodsAttrHtml'].="<a onclick='addnew(this)' javascript='void(0)'  id=".$val['id'].">[-]</a>";
						}
					}
					$data['goodsAttrHtml'].='<select name="'.$str.'attr_id[]['.$val[($str1.'id')].']"><option value="">请选择</option>';
					
					foreach ($arr as $key1 => $val1) {
						$data['goodsAttrHtml'].='<option value='. $val1 .  ($val['attr_value']==$val1?'  selected':'').'>'.$val1.'</option>';
	
					}
					$data['goodsAttrHtml'].='</select>';
					if($val['attr_type']==1)
						$data['goodsAttrHtml'].='<input type="text" name='.$str.'attr_price[]['.$val[$str1.'id'].'] value='.$val['attr_price'].'>';
				}
				$data['goodsAttrHtml'].='</p>';

			}
			return $data;
		}

		protected function _before_insert(&$data){

			$imgData = imgUpLoad('logo');
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
					if(!$value)  continue;
					$memberPriceData[] = array(
						'goods_id'=>$data['id'],
						'level_id'=>$key,
						'price'=>$value,
					);
				}
				if($memberPriceData){
					$memberPrice = D('MemberPrice');
					$memberPrice->addAll($memberPriceData);
				}
			}
		}

		protected function _before_update(&$data){
			imgDel($this,$data['id']);
			$imgData = imgUpLoad('logo');
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

		protected function _after_update($data){
			$goodsAttr = D('GoodsAttr');
			if($attr_id = I('get.attr_id','')){
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
				$goodsAttr->addAll($attrData);
			}

			if($old_attr_id=I('get.old_attr_id','')){
				$old_attr_price = I('post.old_attr_price','');
				$attrOldData = array();
				foreach ($old_attr_id as $key => $value) {
					foreach ($old_attr_price as $key1 => $value1) {
						if(!$value1) continue;
						$price = isset($old_attr_price[$key][$key1])?$old_attr_price[$key][$key1]:0;
						$attrOldData = array(
							'goods_id'=>I('post.id'),
							'id'=>$k,
							'attr_value'=>$v,
							'attr_price'=>$price,
						);
					}
					$goodsAttr->save($attrOldData );
				}
			}else
				D('GoodsAttr')->where('goods_id='.$data['id'])->delete();


			$memberPrice = D('MemberPrice');
			if( $memberPrice = I('post.member_price','') ){
				$memberPriceData = array();
				foreach ($memberPrice as $key => $value) {
					if(!$value)  continue;
					$memberPriceData[] = array(
						'goods_id'=>$data['id'],
						'level_id'=>$key,
						'price'=>$value,
					);
				}
				if($memberPriceData){
					$memberPrice = D('MemberPrice');
					$memberPrice->addAll($memberPriceData);
				}
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
