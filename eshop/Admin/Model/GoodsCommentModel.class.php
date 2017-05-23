<?php
	namespace Admin\Model;
	class GoodsCommentModel extends EqualModel{
		public function search($is_show=0){
			$where = array('is_show'=>array('eq',$is_show));

			if( ( $search_key=I('get.search_key','') ) && ( $search_val=I('get.search_val','') ) ){
				$where[$search_key] = array('like','%'.$search_val.'%') ;
			} 
			$order = array();
			$field = 'a.*,b.logo,b.goods_name,c.username';
			$join = 'left join goods b on a.goods_id=b.id left join user c on a.user_id=c.id';
			$data = parent::search('',$field,$where,$order,$join);
			return $data;
		}
	}
