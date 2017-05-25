<?php
	namespace Home\Controller;
	class GoodsController extends CommonController {
		public function __construct(){
			parent::__construct();
			$this->model = D('goods');
			
			
		}

		public function search(){
			$search =explode('|', I('search',''));
			
			
			//******************************************分类**************************************************************
			if($cid = I('get.cid')){
				

				$data['cid'] = $cid;

				$cat = D('cat');
				$catOne = $cat->field('id,search_attr_id,brand_id,price_section,cat_name')->where('id='.$cid)->find();
				$data['cat_name'] = $catOne['cat_name'];
				$data['cid'] = $catOne['id'];
				
				//************************************************商品属性筛选*****************************************
				$search_attr_id = $catOne['search_attr_id'];
				if($search_attr_id){
					$goodsAttr = D('GoodsAttr');
					$goodsList = $goodsAttr->field('a.attr_id,a.attr_value,attr_name')->alias('a')->join('left join attr b on a.attr_id=b.id')->where('a.attr_id in ('.$search_attr_id.')')->select();
					$goodsList = array_unique($goodsList,SORT_REGULAR);
					$attrSearch = array();
					foreach($goodsList as $key=>$value){
						$attrSearch[$value['attr_name']][] = $value;
						if(!in_array($value['attr_name'], $attr_name))
							$attr_name[] = $value['attr_name'];
					}
					$data['attrSearch'] = $attrSearch;
					$cn = count($attrSearch);

					$attr_search = I('get.attr_search','');
					$data['i'] = 0;
					if($search['0']&&$attr_search){
						$data['search_arr'] = explode('.', $attr_search);
					}else{
						if(substr_count($attr_search,'.')==($cn-1)){
							$data['search_arr'] = explode('.', $attr_search);
						}elseif(!$search['0'])
							$data['search_arr'] = array_fill(0, $cn, 0);
					}
					$search_arr =  implode('.', $data['search_arr'] );
					if($attr_search!='0')
						$search['0'] =$search_arr ?$search_arr :$search['0']; 
					else
						$search['0']='';
				}else
					$search['0'] ='';
				
				//******************************************商品品牌筛选************************************************
				$brand_id = $catOne['brand_id'];
				if($brand_id){
					$brand = D('brand');
					$brandList = $brand->where('id in ('.$brand_id.')')->select();
					$data['brandList'] = $brandList;
					if(($brand_search = I('get.brand_id',''))!='no' )
						$search['1'] = $brand_search?$brand_search:$search['1'];
					else
						$search['1'] = '';
				}else
					$search['1'] ='';
				

				//**********************************价格筛选*************************************
				$num = $catOne['price_section'];
				if($num){
					$shop_price = $this->model->field('max(shop_price) maxp, min(shop_price) minp')->where('cat_id='.$cid)->find();
					$diff = ceil( ( $shop_price['maxp'] - $shop_price['minp'] ) / $num );
					$price_arr = array();
					$minp = intval($shop_price['minp']);
					for($i=0;$i<$num;$i++){
						$price_arr[$i] = $minp + $diff;
						$price_section[] = $minp.'--'.$price_arr[$i];
						$minp = $price_arr[$i];
					}
					$data['price_section'] = $price_section;
					if( ( $price = I('price','') )!='no')
						$search['2'] = $price?$price:$search['2'];
					else
						$search['2'] ='';

				}else
					$search['2'] ='';

				//****************************显示信息**************************************
				$search_val = '';
				foreach ($search as $key => $value) {
					if($key==0){
						$attr_val = explode('.', $value);
						foreach ($attr_val as $key => $value) {
							if($value){
								$value = $value!='0'?$value:'无';
								$search_val.=$attr_name[$key] . ' : ' . $value . '  ';
							}
						}
					}
					if($key==1){
						$value = $value?$value:'无';
						$search_val.='  价格 : ' . $value;
					}
					if($key==2){
						$value = $value?$value:'无';
						$search_val.='  品牌 : ' . $value;
					}
				}
				$data['search_val'] = $search_val;

			}

			//**********************************商品名*****************************************
			if($index_sysc=I('get.index_sysc',''))
				$search['0'] = $index_sysc?$index_sysc:$search['0'];

			//************************************排序******************************************
			$order = I('get.order','sort_num');
			$by = I('get.value','desc')=='desc' ? 'asc':'desc';
			$data['by'] = $by;
			$sort =  ($order.' '.$by);
			if($cid)
				$search['3'] = $order?$sort:$search['3'];
			else
				$search['1'] = $order?$sort:$search['3'];
			
			//************************************热销商品**************************************
			$where['is_hot'] = array('eq',1);
			if($cid)
				$where['cat_id'] = array('eq',$cid);
			$data['hot_goods'] = $this->model->field('id,shop_price,logo,goods_name,addtime')->where($where)->limit(4)->select();



			$n = $cid?4:2;
			$search = array_slice($search,0,$n);
			$data['search'] = implode('|', $search);
			$data['catAll']= $this->model->catSelect();
			$goodsList = $this->model->search($data['search'],$cn);
			$data['goodsList'] = $goodsList['goodsList'];
			$data['show'] = $goodsList['show'];
			$data['count'] = $goodsList['count'];

			$this->assign($data);
			$this->display();
		}

		/**
		*[详情页]
		*/
		public function details(){
	
			$id = I('get.id','');
			$goodsPics = D('GoodsPics');
			$goodsAttr = D('GoodsAttr');
			$goodsRep = D('GoodsRep');
			$comment = D('GoodsComment');
			$cat = D('cat');
			$data['goods_history'] = $this->history($id);

			$data['goodsOne'] = $this->model->where('id='.$id)->find();

			$cat_id = $data['goodsOne']['cat_id'];

			$data['goodsPicsOne'] = $goodsPics->where('goods_id='.$id)->select();
		
			$data['goodsAttr'] = $goodsAttr->field('a.*,b.attr_name,b.attr_type,type_id')->alias('a')->join('left join attr b on a.attr_id=b.id')->where('goods_id='.$id)->select();

			foreach($data['goodsAttr'] as $key=>$val){
				if($val['attr_type']==0)
					$data['goodsAttr']['type0'][] = $val;
				else
					$type1[] = $val;
			}
			$goodsRepList = $goodsRep->where('goods_id='.$id)->getField('goods_attr_id',true);
			
			$str = '';
			foreach ($goodsRepList as $key => $value) {
				$str .= $value . ',' ;
			}
			$str = explode(',', rtrim($str,',') );
			$str = array_unique($str);

			foreach ($type1 as $key => $value) {
				if(in_array($value['id'] , $str) )
					$data['goodsAttr']['attr_type'][$value['attr_name']][] = $value;
			}

			$data['catAll']= $this->model->catSelect();
			$cat_path = $cat->field('cat_path')->where('id='.$cat_id )->getField('cat_path');
			$cat_path = rtrim( $cat_path, ',');
			$data['path'] = $cat->field('cat_name')->where('id in ('. $cat_path .')')->select();
			$commentNum = $comment->field('score,count(0)')->where('is_show=1 and goods_id='.$id)->group('score')->select();
			$score = array();
			$sum = 0;
			foreach ($commentNum as $key => $value) {
				$score[$value['score']] = $value['count(0)'];
				$sum+=($value['score']*$value['count(0)'] );
			}
			$num = array_sum($score)*3;
			$data['num'] = array_sum($score);
			$data['csum'] = intval(ceil( ($sum/$num)*100 ));
			$data['score'] = $score;
	
			$this->assign($data);
			$this->display();
		}

		/**
		*[历史记录]
		*/
		public function history($id,$cur_time=0){

			//如是COOKIE 里面不为空，则往里面增加一个商品ID
			if (!empty($_COOKIE['SHOP']['history'])){
				//取得COOKIE里面的值，并用逗号把它切割成一个数组
				$history = explode(',', $_COOKIE['SHOP']['history']);
				
				//在这个数组的开头插入当前正在浏览的商品ID
				array_unshift($history, $id);
				
				//去除数组里重复的值
				$history = array_unique($history);
				
				//当数组的长度大于5里循环执行里面的代码
				while (count($history) > 5){
				
					//将数组最后一个单元弹出，直到它的长度小于等于5为止
					array_pop($history);
				}
				
				//把这个数组用逗号连成一个字符串写入COOKIE，并设置其过期时间为30天
				cookie('SHOP[history]', implode(',', $history), $cur_time + 3600 * 24 * 30);
				
			}else{
				//如果COOKIE里面为空，则把当前浏览的商品ID写入COOKIE ，这个只在第一次浏览该网站时发生
				cookie('SHOP[history]', $id);
			}

			//以上均为记录浏览的商品ID到COOKIE里,下面将讲到怎样用这样COOKIE里的数据

			//取得COOKIE里的数据 ,格式为1,2,3,4 这样，当然也有可以为0
			$history =isset ($_COOKIE['SHOP']['history']) ? $_COOKIE['SHOP']['history'] : 0;

			//写SQL语句，用IN 来查询出这些ID的商品列表
			 return $goods_history = $this->model->field('id,goods_name,logo,shop_price')->where('id in('.$history.')')->select();
			
		}

		/**
		*[ajax获取库存价格]
		*/
		public function ajaxGetRep(){
			$goods_attr_id = I('get.goodsAttrId','');
			$id = I('get.id','');
			$goods_attr_id = str_replace(".", ",", $goods_attr_id);
			$goodsRepOne = D('GoodsRep')->where('goods_attr_id="'.$goods_attr_id.'" and goods_id='.$id)->find();
			$this->ajaxReturn($goodsRepOne);
		}

		/**
		*[ajax获取评论]
		*/
		public function ajaxComment(){
			$data = array();
			$id = I('get.id','');
			$goodsComment = D('GoodsComment');
			$count = $goodsComment ->where('is_show=1 and goods_id='.$id)->count();
			$page = new \Think\Page($count,1);
			$comment= $goodsComment->field('a.*,b.username,b.icon,GROUP_CONCAT(c.goods_pric) pic')->alias('a')->join('left join user b on a.user_id=b.id left join comment_pics c on a.id=c.comment_id')->order('addtime desc')->group('a.id')->where('(c.goods_pric!=""||a.goods_comment!="") and is_show=1 and a.goods_id='.$id)->limit($page->firstRow.','.$page->listRows)->select();
			
			$data['show'] = $page->show();
			$html = '';
			$pic ='';
			foreach ($comment as $k => $v) {
				if($v['pic']){
					$picArr = explode(  ',' , $v['pic'] );
					foreach ($picArr as $key => $value) {
						$pic.='<li><img src="'.__ROOT__.'/Uploads/'.$value.'"></li>';
					}
				}
				
				$html.= '<li class="am-comment"><a href=""><img class="am-comment-avatar" src="'.__ROOT__.'/Uploads/'.$v['icon'].'" /></a><div class="am-comment-main"><header class="am-comment-hd"><div class="am-comment-meta"><a href="#link-to-user" class="am-comment-author">'.$v['username'].' (匿名)</a><time datetime="">'.date('Y-m-d',$v['addtime']).'</time></div></header><div class="am-comment-bd"><div class="tb-rev-item " data-id="255776406962"><div class="J_TbcRate_ReviewContent tb-tbcr-content ">'.$v['goods_comment'].'<br><ul>'.$pic.'</ul></div><div class="tb-r-act-bar">'.$v['attr_value'].'</div></div></div></div></li>';
				$pic = '';
			}
			$data['comment'] = $html;
			$this->ajaxReturn($data);
		}



	}
