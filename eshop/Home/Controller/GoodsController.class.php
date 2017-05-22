<?php
	namespace Home\Controller;
	class GoodsController extends CommonController {
		public function __construct(){
			parent::__construct();
			$this->model = D('goods');
		}

		public function search(){
			$this->display();
		}

		public function details(){
			echo'<pre>';
			print_r($_SESSION);
			echo'</pre>';
			$id = I('get.id','');
			$goodsPics = D('GoodsPics');
			$goodsAttr = D('GoodsAttr');
			$goodsRep = D('GoodsRep');

			$data['goodsOne'] = $this->model->where('id='.$id)->find();

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
			$data['catAll'] = $this->model->catSelect();
			$this->assign($data);
			$this->display();
		}


		public function ajaxGetRep(){
			$goods_attr_id = I('get.goodsAttrId','');
			$id = I('get.id','');
			$goods_attr_id = str_replace(".", ",", $goods_attr_id);
			$goodsRepOne = D('GoodsRep')->where('goods_attr_id="'.$goods_attr_id.'" and goods_id='.$id)->find();
			$this->ajaxReturn($goodsRepOne);
		}
	}
