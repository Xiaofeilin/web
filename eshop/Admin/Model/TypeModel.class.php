<?php
	namespace Admin\Model;
	use Think\Model;
	class TypeModel extends Model{

		//post表单自动验证的规则
		protected $_validate = array(
			array('type_name','require','请填写分类名',1),
			array('type_name','','分类名唯一',1,'unique'),
		);

		/**
		*[搜索+分页]
		*@return array 		$data[搜索后+分页的数据]
		*/
		public function search(){

			//******************************搜索****************************
			$where = array();

			//搜索type_name类型名，id号
			if( ( $search_key=I('get.search_key','') ) && ( $search_val=I('get.search_val','') ) ){
				if($search_key=='type_name')
					$where['type_name'] = array('like','%'.$search_val.'%') ;
				elseif($search_key=='id')
					$where[$search_key] = array('eq',$search_val);
			}

			
			//*****************************分页*******************************
			$data = array();
			$count = $this->where($where)->count();
			$page = new \Think\Page($count,C('YeShu'));
			$page->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录 第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');  
		    $page->setConfig('prev', '上一页');  
		    $page->setConfig('next', '下一页');  
		    $page->setConfig('last', '末页');  
		    $page->setConfig('first', '首页');  
		    $page->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');  
		    $page->lastSuffix = false;//最后一页不显示为总页数 
			$data['show'] = $page->show();
			$data['typeList'] = $this->where($where)->limit($page->firstRow.','.$page->listRows)->select();
			return $data;
		}
	}
