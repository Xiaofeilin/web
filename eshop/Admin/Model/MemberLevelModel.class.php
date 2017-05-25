<?php
	namespace Admin\Model;
	class MemberLevelModel extends EqualModel{
		protected $_validate = array(
			array('level_name','require','级别名必须填',1),
			array('level_name','','分类名唯一',1,'unique'),
			array('bottom_num','number','积分范围是整正数',1),
			array('top_num','gtBottomNum','上限必须大于下限',1,'callback'),
			array('rate','number','1',2),
		);

		/**
		*[积分的大小比较]
		*/
		protected function gtBottomNum($top_num){
			if(!($top_num>I('post.bottom_num',0) )&&!is_numeric($top_num) )
				return false;
		}

		public function search(){
			$where = array();
			//**********************搜索*********************
			//搜索id，rate，level_name
			if( ( $search_key=I('get.search_key','') ) && ( $search_val = I('get.search_val','') ) ){
				if($search_key=='level_name')
					$where[$search_key] = array('like','%'.$search_val .'%');
				elseif($search_key=='rate' || $search_key=="id")
					$where[$search_key] = array('eq',$search_val);
			}

			//搜索积分范围
			$bottom_num=I('get.bottom_num','');
			$top_num=I('get.top_num','');
			if( ($bottom_num!=='') && $top_num){
				$where['bottom_num'] = array('elt',$bottom_num);
				$where['top_num'] = array('egt',$top_num);
			}elseif( $bottom_num!=='' )
				$where['bottom_num'] = array('elt',$bottom_num);
			elseif ($top_num) 
				$where['top_num'] = array('egt',$top_num);

			//**********************分页*********************
			$data = parent::search('',$where);
			return $data;
		}
	}
