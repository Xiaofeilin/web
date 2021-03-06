<?php
	namespace Admin\Model;
	class FloorModel extends EqualModel{

		protected $_validate = array(
			array('one_cat','require','第一分类必须填',1),
			array('one_cat','number','请不要乱改html代码',1),
			array('two_cat','number','请不要乱改html代码',2),
			array('is_show',array(0,1),'请不要乱改html代码',1,'in'),
		);

		/**
		*[在添加floor前上传图片并获取上传图片路径]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		public function _before_insert(&$data){

			$imgData = imgUpLoad('logo','Brand');
			if(isset( $imgData['error'])){
				$this->error = $imgData['error'];
				return false;
			}else{
				$data['logo'] = $imgData['logo'];
				$data['sm_logo'] = $imgData['sm_logo'];
			}


			if( $this->sortIt100($data['sort_num']) )
				return false;
			if(empty($data['floor_name'])){
				$data['floor_name'] =  $this->floorName($data['one_cat'],$data['two_cat']);
			}
		}


		/**
		*[在修改brand前上传图片并获取上传图片路径]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		public function _before_update(&$data){

			if(count($data)<3) return;

			imgDel($this,$data['id']);
			$imgData = imgUpLoad('logo','Brand');
			if(isset( $imgData['error'])){
				$this->error = $imgData['error'];
				return false;
			}else{
				$data['logo'] = $imgData['logo'];
				$data['sm_logo'] = $imgData['sm_logo'];
			}

			if( $this->sortIt100($data['sort_num']) )
				return false;

			if(empty($data['floor_name']))
				$data['floor_name'] =  $this->floorName($data['one_cat'],$data['two_cat']);
			
		}

		/**
		*[拼接楼层名]
		*@param string 	$one[第1分类名]
		*@param string 	$two[第2分类名]
		*@return string 	$name['楼层名']
		*/
		public function floorName($one='',$two=''){
			$cat = D('cat');
			$name = "";
			if($one && $two ){
				$catList = $cat->field('cat_name')->where('id in ('. $one .','. $two . ')')->getField('cat_name',true);
				$name = implode('/', $catList);
			}elseif($data['one_cat']){
				$catOne = $cat->field('cat_name')->where('id='.$one)->find();
				$name = $catOne['cat_name'];
			}elseif($data['two_cat']){
				$catOne = $cat->field('cat_name')->where('id='.$two)->find();
				$name = $catOne['cat_name'];
			}
			return $name;
		}

		/**
		*[排序小于100]
		*@param number 	$sort_num['排序']
		*/
		public function sortIt100($sort){
			if( !empty($sort) ){
				if($sort>100||$sort<0){
					$this->error = "排序只能大于0小于等于100";
					return false;	
				}
			}
		}

		/**
		*[搜索+分页]
		*@return array 		$data[搜索后+分页的数据]
		*/
		public function search(){
			$cat = D('cat');
			$catAll = $cat->field('cat_name,id')->select();
			$field = 'id,one_cat,two_cat,floor_name,is_show';
			
			//*************************搜索********************************
			$where = array();

			//按id,cat_name,parent_id搜索
			if( ( $search_key=I('get.search_key','') ) && ( $search_val=I('get.search_val','') ) ){
				if($search_key=='floor_name')
					$where[$search_key] = array('like','%'.$search_val.'%') ;
				elseif($search_key=='one_cat' || $search_key=='two_cat'){
					$catId = D('cat')->where('cat_name like "%'.$search_val.'%"')->getField('id',true);
					$where[$search_key] = array('in',$catId);
				}
			} 

			//按is_show是否显示搜索
			if( ($is_show=I('get.is_show',false))!==false )
				$where['is_show'] = array('eq' , $is_show);



			//**************************分页*******************************
			
			$data = parent::search($name='',$field,$where,$order);
			foreach ($data['floorList'] as $key => $value){
				if($value['one_cat']==0){
					$data['floorList'][$key]['one_cat'] = '暂无绑定';
				}
				if($value['two_cat']==0){
					$data['floorList'][$key]['two_cat'] = '暂无绑定';
				}
				foreach ($catAll as $key1 => $value1) {
					if($value1['id']==$value['one_cat'])
						$data['floorList'][$key]['one_cat'] = $value1['cat_name'];
					if($value1['id']==$value['two_cat'])
						$data['floorList'][$key]['two_cat'] = $value1['cat_name'];
				}
			}
			return $data;
		}
	}
