<?php
	namespace Admin\Model;
	class GoodsModel extends EqualModel{

		//自动填充
		protected $_auto = array( 
		  	 array('addtime','time',1,'function') , 
		);
   
		//自动验证
		protected $_validate = array(
		   	array('goods_name','require','商品名必须填',1),
		   	array('cat_id','number','请不要乱改html代码',1),
		   	array('brand_id','number','请不要乱改html代码',2),
		   	array('market_price','is_numeric','市场价是正整数',1,'function'),
		   	array('market_price','require','市场价必须填',1),
		   	array('shop_price','is_numeric','本店价是正整数',1,'function'),
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
		   	array('sort_num','0,99','排序1-100',2,'length'),
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
		public function restore($id,$type_id){
			$data = array();

			//获取当前商品相册
			$GoodsPics = D('GoodsPics');
			$data['goodsPicsList'] = $GoodsPics->where('goods_id='.$id)->select();
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
			$data['goodsAttrList'] = $goodsAttr->field('a.*,b.attr_name,b.attr_type,b.attr_option_values,type_id')->alias('a')->join('left join attr b on a.attr_id=b.id')->where('goods_id='.$id)->order('attr_type,attr_id desc')->select();
			
			//获取当前的所有属性id
			$attrId = array();
			foreach ($data['goodsAttrList'] as $key => $val) {
				$attrId[] = $val['attr_id'];
			}
			$attrId=array_unique($attrId);
			
			//判断该类型有没有添加了新属性,有新属性添加到数组中
			$attr = D('attr');
			$attrId = empty( $attrId )?array(0):$attrId;

			$attrList = $attr->field('id attr_id,attr_name,attr_type,attr_option_values,type_id')->where( array( 'type_id'=>array('eq',$type_id) , 'id'=>array('not in',$attrId ) ) )->order('attr_type desc')->select();
			$data['goodsAttrList']= array_merge($data['goodsAttrList'],$attrList);
			
			// var_dump($data['goodsAttrList']);
			//还原当前商品的属性表
			$data['goodsAttrHtml'] = '';
			$attrId = array();
			foreach ($data['goodsAttrList'] as $key => $val) {
				$data['goodsAttrHtml'].= '<div class="row cl" ><label class="form-label col-xs-4 col-sm-2">';
				if($val['attr_type']==1){
					if(!in_array($val['attr_id'],$attrId)){
						$attrId[] = $val['attr_id'];
						$data['goodsAttrHtml'].="<a onclick='addnew(this)' javascript='void(0)'>[+]</a>";
					}else{
						$data['goodsAttrHtml'].="<a onclick='addnew(this)' javascript='void(0)'  id=".$val['id'].">[-]</a>";
					}
				}
				$data['goodsAttrHtml'].=$val['attr_name']."：</label>";
				$str = isset($val['attr_value'])?'old_':'';
				$str1 = isset($val['attr_value'])?'':'attr_';
				if(!$val['attr_option_values'])
					$data['goodsAttrHtml'].='&nbsp;<input type="text" class="input-text" style="width:250px" attr_id='.$val['attr_id'].'  name="'.$str.'attr_id[]['.$val[$str1.'id'].']" value="'.$val['attr_value'].'">';
				else{
					$arr = explode(',', $val['attr_option_values']);
					$data['goodsAttrHtml'].='<span class="select-box" style="width:250px;"><select  attr_id='.$val['attr_id'].'  name="'.$str.'attr_id[]['.$val[($str1.'id')].']" class="select"><option value="">请选择</option>';
					
					foreach ($arr as $key1 => $val1) {
						$data['goodsAttrHtml'].='<option value='. $val1 .  ($val['attr_value']==$val1?'  selected':'').'>'.$val1.'</option>';
	
					}
					$data['goodsAttrHtml'].='</select></span>';
				}
				$data['goodsAttrHtml'].='</div>';
			}
			return $data;
		}


		/**
		*[在添加商品前上传图片并获取上传图片路径]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		protected function _before_insert(&$data){
		
			if(!empty($data['sort_num'])){
				if($data['sort_num']>100||$data['sort_num']<=0){
					$this->error="排序大于100或小于0";
					return false;
				}
			}
			//调用imgData函数上传图片，并获取上传路径
			$imgData = imgUpLoad('logo');
			if(isset( $imgData['error'])){
				$this->error = $imgData['error'];
				return false;
			}else{
				$data['logo'] = $imgData['logo'];
				$data['sm_logo'] = $imgData['sm_logo'];
			}

			//判断有没有促销，将促销时间转为时间戳
			if($data['is_sale']==1){
				if( ($start = I('post.promote_start_time','')) && ($end = I('post.promote_end_time','')) ){
					 $data['promote_start_time'] = strtotime($start);
					 $data['promote_end_time'] = strtotime($end);
				}	
			}
		}


		/**
		*[在添加商品后的操作]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		protected function _after_insert($data){

		//处理form表单中属性数据，并插入数据库
			if( $attr_id = I('post.attr_id','') ){
				$attrData = array();
				foreach ($attr_id as $key => $value) {
					if( !( $val = implode('', $value) ) ) continue;
					$attrData[] = array(
						'goods_id'=>$data['id'],
						'attr_id'=>array_keys($value)[0],
						'attr_value'=>$val,
					);
				}
				$goodsAttr = D('GoodsAttr');
				$goodsAttr->addAll($attrData);
			}

			//处理相册的数据，调用函数上传图片，并把路径写进数据库
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

			//处理不同的会员价格
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


		/**
		*[数据修改前操作]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		protected function _before_update(&$data){
			
			if(count($data)<=5) return;
			
			if( ($data['is_del']==1||$data['is_del']===0) ) return true;
			
			//判断有没有上传新图片，有调用imgData函数上传图片，并获取上传路径
			if($_FILES['logo']['size']){
				imgDel($this,$data['id']);
				$imgData = imgUpLoad('logo');
				if(isset( $imgData['error'])){
					$this->error = $imgData['error'];
					return false;
				}else{
					$data['logo'] = $imgData['logo'];
					$data['sm_logo'] = $imgData['sm_logo'];
				}
			}

			//判断有没有促销，将促销时间转为时间戳
			if($data['is_sale']==1){
				if( ($start = I('post.promote_start_time','')) && ($end = I('post.promote_end_time','')) ){
					 $data['promote_start_time'] = strtotime($start);
					 $data['promote_end_time'] = strtotime($end);
				}

			}
		}


		/**
		*[数据修改后操作]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		protected function _after_update($data){
			if(count($data)<=5) return;
			

			if( ($data['is_del']==1||$data['is_del']===0) ) return true;


			//****************************修改商品属性*****************************
			$goodsAttr = D('GoodsAttr');

			//如果没有改变类型修改属性，类型改变删除原有属性
			if($old_attr_id=I('post.old_attr_id','')){
				$attrOldData = array();
				foreach ($old_attr_id as $key => $value) {
					if(empty( $attr_value=implode(',', $value) )) continue;
					$attrOldData = array(
						'id'=>array_keys($value)[0],
						'attr_value'=>$attr_value,
					);
					$goodsAttr->save($attrOldData);
				}
			}else
			 	D('GoodsAttr')->where('goods_id='.$data['id'])->delete();
				
			

			//将新添加的属性添加到属性表中
			if($attr_id = I('post.attr_id','')){
				$attrData = array();
				foreach ($attr_id as $key => $value) {
					if(empty( $attr_value=implode(',', $value) ) ) continue;
					$attrData[] = array(
						'goods_id'=>$data['id'],
						'attr_id'=>array_keys($value)[0],
						'attr_value'=>$attr_value,
					);
				}
				$goodsAttr->addAll($attrData);
			}

			

			//*************************修改会员价格******************************
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
					$memberPrice->where('goods_id='.$data['id'])->delete();
					$memberPrice->addAll($memberPriceData);
				}
			}

			//*************************修改图片************************************
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
		}


		/**
		*[回收与还原的id和is_del数据判断]
		*@param number	$id[商品id]
		*@param number	$is_del[1:回收 , 0:还原]
		*/
		public function idAndIs_del($id,$is_del){
			$data = array();
			if($is_del==0||$is_del==1){
				if(is_numeric( $id )){
					$data['id'] = $id;
					$data['is_del'] = $is_del;
				}
				elseif(is_array( I('post.id','') ) ){
					$ids =  I('post.id','') ;
					$data['id'] = implode(',', $ids);
					$data['is_del'] = $is_del;
				}
				return $data;
			}
			return false;
		}


		/**
		*[还原库存表]
		*/
		public function repertory(){
			$data = array();
			$goodsAttr = D('GoodsAttr');
			if( $id = I('get.id','') ){
				$goodsAttrList = $goodsAttr->field('a.*,b.attr_name,b.attr_type,b.attr_type,b.type_id')->alias('a')->join('join attr b on a.attr_id=b.id')->where('goods_id='.$id.' and ' . 'attr_type=1')->select();
				foreach ($goodsAttrList as $key => $value) {
					$attr_name[] = $value['attr_name'];

				}

				$attr_name = array_unique($attr_name);
				$data['attr_name'] = $attr_name;
				foreach ($goodsAttrList as $key => $value) {
					foreach( $attr_name as $key1=>$value1){
						if($value1==$value['attr_name']){
							$data['repertoryAttr'][$value1][ ] =  $value;
						}
					}
				}

				$goodsRep=D('GoodsRep');
				if( $data['goodsRepList'] = $goodsRep->where('goods_id='.$id)->select() )
					$data['status'] = 'old_';
				
			}
			return $data;
		}


		/**
		*[处理库存新添加的数据]
		*@param number 	$goods_id[商品id]
		*@param array 	$goods_attr[商品属性]
		*@param array 	$goods_num[商品数]
		*@return array 		$goodsRepData[商品属性与商品数一一对应的数组]
		*/
		public function repertoryNew($goods_id, $goods_attr,$goods_num ,  $goods_price ){
		
			if($goods_attr){
				foreach($goods_attr as $key => $value) {
					foreach ($value as $key1 => $value1) {
						$goodsAttr[$key1][] = $value1;
					}
				}
				foreach ($goodsAttr as $key => $value) {
					$num = $goods_num[$key];
					$price = $goods_price[$key];
					if(!is_numeric( $num )) continue;
					if(!is_numeric( $price )) continue;
					sort($value);
					$str = implode(',', $value);
					
					$goodsRepData[] = array(
						'goods_id'=>$goods_id,
						'goods_number'=>$num,
						'goods_attr_id' => $str,
						'goods_price' => $price,
					);
				}
			}else{
				$num = $goods_num[0];
				$price = $goods_price[0];
				if(!is_numeric( $num )) return;
				if(!is_numeric( $price )) return;
				$goodsRepData[] = array(
					'goods_id'=>$goods_id,
					'goods_number'=>$num,
					'goods_price' => $price,
				);
			}	
			return $goodsRepData;	
		}


		/**
		*[处理库存旧数据]
		*@param number 	$goods_id[商品id]
		*@param array 	$old_goods_attr[旧商品属性]
		*@param array 	$old_goods_num[旧商品数]
		*@return array 		$goodsRepData[商品属性与商品数一一对应的数组]
		*/
		public function repertoryOld($goods_id,$old_goods_attr,$old_goods_num,$old_goods_price){

			if($old_goods_attr){
				foreach ($old_goods_attr  as $key => $value) {
					foreach ($value as $key1 => $value1) {
						$old_goods_attrArr[$key1][]=$value1[0];
					}
				}
				
				foreach ($old_goods_attrArr as $key => $value) {
					$num = $old_goods_num[$key];
					$price = $old_goods_price[$key];
					if( !is_numeric( $num ) && $price < 0 ) continue;
					if( !is_numeric( $price ) && $price< 0 ) continue;
					sort($value);
					$str = ltrim(implode(',', $value) , ',') ;
					
					
					$oldGoodsRepData[] = array(
						'id'=>$key,
						'goods_id'=>$goods_id,
						'goods_number'=>$num,
						'goods_attr_id' => $str,
						'goods_price'=>$price,
					);

				}
			}else{
				foreach ($old_goods_num as $key => $value) {
					$oldGoodsRepData[] = array(
						'id'=>$key,
						'goods_id'=>$goods_id,
						'goods_number'=>$old_goods_num[$key],
						'goods_attr_id' => '',
						'goods_price'=>$old_goods_price[$key],
					);
				}
				
			}
			return $oldGoodsRepData;
		}


		/**
		*[搜索+分页]
		*@param number 	$is_del[0:商品列表，1:回收站]
		*@return array 		$data[搜索+分页的数组]
		*/
		public function search($is_del=0){

			//清除搜索
			if(I('get.unset',0))
				$_GET='';

			//********************************搜索*********************************************
			$where = array('is_del'=>array('eq',$is_del));

			//搜索 商品名称，分类，品牌，类型
			if( ( $search_val = I('get.search_val','') ) && ( $search_key = I('get.search_key','') ) )
				$where[$search_key] = array( 'like' , '%'.$search_val.'%' );

			//搜索添加时间
			$start_time = I('get.start_time')?strtotime( I('get.start_time')):0;
			$last_time = I('get.last_time')?strtotime( I('get.last_time')):0;
			if( $start_time && $last_time )
				$where['addtime'] = array('between',array($start_time,$last_time) );
			elseif($start_time)
				$where['addtime'] = array('egt',$start_time);
			elseif($last_time)
				$where['addtime'] = array('elt',$last_time);
			
			//搜索市场价，本店价
			$price = I('get.price','');
			$min_price = I('get.min_price',0);
			$max_price = I('get.max_price',0);

			if( $min_price && $max_price && $price )
				$where[$price] = array( 'between' , array( $min_price , $max_price ) );
			elseif( $min_price && $price)
				$where[$price] = array( 'egt' , $min_price );
			elseif( $max_price && $price)
				$where[$price] = array( 'elt' , $max_price );


			//搜索是否上架，是否促销，是否热销，是否最新，是否精品
			if( $is_name = I('is_name',0) ){
			 	$is_name_key = array_keys($is_name)[0]; 
				$where[ $is_name_key ] = array( 'eq' , $is_name[$is_name_key ] ); 
			}


			//排序 市场价 本店价	添加时间 排序
			$order = 'id desc';
			if($sort = I('get.sort','')){
				$sort_val = I('get.sort_val','0');
				$order = $sort_val?' asc':' desc';
				$order = $sort . $order;
			}

			
			//*****************************************连表查询分页***********************************
			
			$field = 'a.id,goods_name,cat_name,brand_name,market_price,shop_price,is_sale,is_hot,is_new,is_best,is_on_sale,type_name,sort_num,a.logo,addtime';
			$join = 'left JOIN brand b on a.brand_id=b.id LEFT JOIN cat c on a.cat_id=c.id LEFT JOIN type d on a.type_id=d.id';
			$data = parent::search($name='',$field,$where,$order ,$join);
			foreach ($data['goodsList'] as $key => $value) {
				$data['goodsList'][$key]['addtime'] = date('Y-m-d H:i:s',$value['addtime']);
			}
			return $data;
		}
	}
