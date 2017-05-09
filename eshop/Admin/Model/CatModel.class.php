<?php
	namespace Admin\Model;
	use Think\Model;
	class CatModel extends Model{

		//post表单自动验证的规则
		protected $_validate = array(
			array('parent_id','require','请不要乱修改html',1),
			array('cat_name','require','请填写分类名',1),
			array('cat_name','','分类名唯一',1,'unique'),
			array('cat_desc','0,128','超出长度',0,'length'),
			array('is_show',array(0,1),'请不要乱修改html',1,'in'),
		);



		/**
		*[数据插入前的操作，主要拼接父路径]
		*@param array 	$data[经过自动验证的数据]
		*/
		protected function _before_insert(&$data){
			if($data['parent_id']!=0){
				$catOne = $this->find($data['parent_id']);
				$data['cat_path'] = $catOne['cat_path'] . ',' . $catOne['id'];
			}
		}



		/**
		*[不显示分类级别大于3的分类数据]
		*@return array 		$catAll[处理过的分类数据]
		*/
		public function lvIt3(){
			$catAll = $this->select();
			$catAll = getTree($catAll);
			foreach ($catAll as $key => $value) {
				$catAll[$key]['cat_name'] = str_repeat('----', $value['lv']+1) . $value['cat_name'];
				if($value['lv']>1)
					unset($catAll[$key]);
			}
			return $catAll;
		}



		/**
		*[搜索+分页]
		*@return array 		$data[搜索后+分页的数据]
		*/
		public function search(){

			//******************************搜索****************************
			$where = array();

			//按id,cat_name,parent_id搜索
			if( ( $search_key=I('get.search_key','') ) && ( $search_val=I('get.search_val','') ) ){
				if($search_key=='cat_name')
					$where['cat_name'] = array('like','%'.$search_val.'%') ;
				elseif($search_key=='id' || $search_key=='parent_id')
					$where[$search_key] = array('eq',$search_val);
			} 

			//按is_show是否显示搜索
			if( ($is_show=I('get.is_show',false))!==false )
				$where['is_show'] = array('eq' , $is_show);

			
			//*****************************分页*******************************
			$data = array();
			$count = $this->where($where)->count();
			$page = new \Think\Page($count,C('YeShu'));
			$data['show'] = $page->show();
			$catList = $this->order('concat(cat_path,id) desc')->where($where)->limit($page->firstRow.','.$page->listRows)->select();
			foreach ($catList as $key => $value) {
				$is_show = 'no';
				if($value['is_show'])
					$is_show = 'yes';
				$catList[$key]['is_show'] = $is_show;
				$catList[$key]['lv'] = substr_count($value['cat_path'] , ',');
			}
			$data['catList'] = $catList;
			return $data;
		}



		/**
		*[为单一数据添加父类的名称]
		*@param int 		$id[要添加的数据id]
		*@return array 		$catOne[修改后的数据]
		*/
		public function getCatOne($id){
			$catOne = $this->find($id);
			if($catOne['parent_id']!=0){
				$catParent = $this->find( $catOne['parent_id']);
				$catOne['parent_name']= $catParent['cat_name'];
			}else
				$catOne['parent_name'] = '顶级分类';
			return $catOne;
	
		}
	}
