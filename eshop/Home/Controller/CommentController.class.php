<?php
	namespace Home\Controller;
	class CommentController extends CommonController {

		protected $model;

		public function __construct(){
			parent::__construct();
			$this->model = D('GoodsComment');
		}

		public function commentlist(){


			if(IS_POST){

			}
			$detail = D('detail');
			$detailList = $detail->field('a.*,b.logo,b.goods_name')->alias('a')->join('left join goods b on a.goods_id=b.id')->where('a.is_com=0')->select();
			$this->assign('detailList',$detailList);
			$this->display();
		}

	}
