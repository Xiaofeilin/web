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
			$data['brandList'] = $this->order('id asc')->where($where)->limit($page->firstRow.','.$page->listRows)->select();
			$data['show'] = $page->show();
			return $data;
		}

	}
