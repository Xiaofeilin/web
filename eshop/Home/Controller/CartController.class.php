<?php
	namespace Home\Controller;
	class CartController extends CommonController {
		
		public function ajaxGetCart(){
			$cart = new \Org\Util\Cart();
			$goods_id = I('post.id','');
			$name = I('post.name','');
			$goodsArr = array(
				'attr_id'=>I('post.goodsAttrId',''),
				'attr_val'=>I('post.goodsAttrVal',''),
				'num'=>I('post.num','1'),
				'market'=>I('post.market',''),
				'logo' => I('post.logo','')
			);
			
			if(  $goods_id && $name ){
				$cart->addItem($goods_id,$name,$goodsArr);
				$this->ajaxReturn(1);
			}
		}

		public function shopcart(){
			
			$goodsRep = D('GoodsRep');
			
			foreach ($_SESSION['cart'] as $key => $value) {
				foreach ($value as $key1 => $value1) {
					if($key1!=='name'){
						$attr_id = $key1==0?'':str_replace('.', ',', $key1);
						$goodsRepOne = $goodsRep->where('goods_id='.$key.' and goods_attr_id="'.$attr_id.'"')->find();
						$_SESSION['cart'][$key][$key1]['attr_val_arr'] = explode("|", $_SESSION['cart'][$key][$key1]['attr_val']);
						$_SESSION['cart'][$key][$key1]['price'] = $goodsRepOne['goods_price'];		
						$_SESSION['cart'][$key][$key1]['rep_num'] = $goodsRepOne['goods_number'];
						$_SESSION['cart'][$key][$key1]['sum'] = $value1['num']*$goodsRepOne['goods_price'];
					}
				}
			}
			$data['cart'] = $_SESSION['cart'];
			echo '<pre>';
			print_r($data);
			echo '</pre>';
			$this->assign($data);
			$this->display();
		}
		
		public function ajaxRep(){
			$play = I('get.play','');
			$num = I('get.num','');
			$gid = I('get.gid','');
			$attrId = I('get.attrId','');
			if(is_numeric($gid)){
				if($play=='add' && is_numeric($num)){	
					if($_SESSION['cart'][$gid][$attrId]['rep_num']>$num){
						$_SESSION['cart'][$gid][$attrId]['num'] += 1;
						$this->ajaxReturn(1);
					}
				}elseif($play=='min'){
					$_SESSION['cart'][$gid][$attrId]['num'] -= 1;
					$this->ajaxReturn(1);
				}elseif($play=='now' && is_numeric($num) && $num>=0){
					if($_SESSION['cart'][$gid][$attrId]['rep_num']>$num){
						$_SESSION['cart'][$gid][$attrId]['num'] = $num;
						$this->ajaxReturn(1);
					}
				}
			}
		}

		public function ajaxPay(){
			 if( isset($_SESSION['info']['id']) )
			 	$this->ajaxReturn(1);
		}
		

		public function payment(){
			var_dump($_POST);
			$items = I('post.items');
			$data = array();
			if(!I('select-all','')){
				foreach ($items as $key => $value) {
					foreach($value as $value1){
						$data[$key][$value1] = $_SESSION['cart'][$key][$value1];
					}
					
				}
			}else
				$data = $_SESSION['cart'];
			echo '<pre>';
			print_r($_SESSION);
			echo '</pre>';
			$add = D("address");
			$map['uid'] = $_SESSION['info']['id'];
			$addinfo = $add->where($map)->select();
			$addcount = $add->count();
			$this->assign('data',$data);
			$this->assign('addinfo',$addinfo);
			$this->assign('addcount',$addcount);
			$this->display();
		}

		public function setDefault(){
			$count = I("count");

			$add = D("address");
			$map['uid'] = $_SESSION['info']['id'];
			$data['status'] = 0;
			$clear = $add->where($map)->where('status = 1')->save($data);
			$addinfo = $add->where($map)->select();

			$mp['id'] = $addinfo[$count]['id'];
			$da['status'] = 1;
			$result = $add->where($mp)->save($da);
		}

		public function delAdd(){
			$count = I("count");

			$add = D("address");
			$map['uid'] = $_SESSION['info']['id'];
			$addinfo = $add->where($map)->select();

			$map['id'] = $addinfo[$count]['id'];

			$result = $add->where($map)->delete();

			if($result){
				$this->ajaxReturn(1);
			}
		}

		public function checkTel(){
			$user = D('User');
			$info = $user->create();

			$this->error($user->getError());
		}

		public function setSuccess(){
			$add = D("address");
			$map['uid'] = $_SESSION['info']['id'];
			$addcount = $add->where($map)->count();

			$data['name'] = I('name');
			$data['tel'] = I('tel');
			$data['province'] = I('province');
			$data['city'] = I('city');
			$data['street'] = I('street');
			$data['detailed'] = I('detailed');
			$data['uid'] = $_SESSION['info']['id'];

			if($addcount >= 5){
				$this->ajaxReturn("你的收货地址已经超过5个，无法继续添加！","eval");
			}else{
				$result = $add->add($data);
				if($result){
					$this->ajaxReturn(1);
				}
			}	
		}

		public function reSuccess(){
			$add = D("address");
			$map['id'] = I("id");

			$data['name'] = I('name');
			$data['tel'] = I('tel');
			$data['province'] = I('province');
			$data['city'] = I('city');
			$data['street'] = I('street');
			$data['detailed'] = I('detailed');

			$result = $add->where($map)->save($data);
			if($result){
				$this->ajaxReturn(1);
			}
		}

		public function Success(){

		}
	}
	

