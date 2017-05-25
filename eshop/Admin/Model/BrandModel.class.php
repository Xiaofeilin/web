<?php
	namespace Admin\Model;
	use Think\Model;
	class BrandModel extends Model{
		//post表单自动验证的规则
		protected $_validate = array(
			array('brand_name','require','品牌名必须填',1),
			array('brand_name','','分类名唯一',1,'unique'),
		);

		protected function _before_insert(&$data){
			$imgData = imgUpLoad('logo','Floor');
			if(isset( $imgData['error'])){
				$this->error = $imgData['error'];
				return false;
			}else{
				$data['logo'] = $imgData['logo'];
				$data['sm_logo'] = $imgData['sm_logo'];
			}
		}


		protected function _before_update(&$data){
			imgDel($this,$data['id']);
			$imgData = imgUpLoad('logo','Floor');
			if(isset( $imgData['error'])){
				$this->error = $imgData['error'];
				return false;
			}else{
				$data['logo'] = $imgData['logo'];
				$data['sm_logo'] = $imgData['sm_logo'];
			}
		}



		public function search(){

			//******************************搜索****************************
			$where = array();

			//按id,brand_name,url搜索
			if( ( $search_key=I('get.search_key','') ) && ( $search_val=I('get.search_val','') ) ){
				if($search_key=='brand_name'|| $search_key=="site_url")
					$where[$search_key] = array('like','%'.$search_val.'%') ;
				elseif($search_key=='id')
					$where[$search_key] = array('eq',$search_val);
			} 
			
			//*****************************分页*******************************
			$data = array();
			$count = $this->where($where)->count();
			$page = new \Think\Page($count , C('YeShu'));
			$page->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录 第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');  
		    $page->setConfig('prev', '上一页');  
		    $page->setConfig('next', '下一页');  
		    $page->setConfig('last', '末页');  
		    $page->setConfig('first', '首页');  
		    $page->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');  
		    $page->lastSuffix = false;//最后一页不显示为总页数 
			$data['brandList'] = $this->order('id asc')->where($where)->limit($page->firstRow.','.$page->listRows)->select();
			$data['show'] = $page->show();
			return $data;
		}

	}
