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
			array('price_section','sortIt100','排序只能大于0小于等于100',1,'callback'),
		);
		
		public function sortIt100($sort_num){
			if( I('post.price_section','') ){
				if(I('post.price_section','')>100||I('post.price_section','')<0){
					$this->error = "排序只能大于0小于等于100";
					return false;	
				}
			}
		}

		/**
		*[数据插入前的操作，主要拼接父路径]
		*@param array 	$data[经过自动验证的数据]
		*/
		protected function _before_insert(&$data){

			if($data['search_attr_id'] = $this->join_path($data['search_attr_id']))
				return false;
			
			if($data['brand_id'] = $this->join_path($data['brand_id']))
				return false;

			if($data['parent_id']!==0){
				$catOne = $this->find($data['parent_id']);
				$data['cat_path'] = $catOne['cat_path']  . $catOne['id'] . ',';
			}else
				$data['cat_path'] = '0,';
		}

		protected function _before_update(&$data){
	
			if(count($data)<=3) return;

			if(  $data['search_attr_id'] ){
				if( !( $data['search_attr_id'] = $this->join_path($data['search_attr_id']) ) )
					return false;
			}
			if( $data['brand_id']) {
				if( !($data['brand_id'] = $this->join_path($data['brand_id'])) )
					return false;
			} 
		}

		protected function join_path($path){
			if( !empty($path) ){
				if(!is_array($path) ){
					$this->error = '筛选属性错误';
					return false;
				}
				$path_str= "";
				foreach($path as $key=>$val){
					if( is_numeric($val) )
						$path_str.= $val . ',';
				}
				$path_str= rtrim($path_str , ',' );
			}
			return $path_str;
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

		public function restore($id){
			$attr = D('attr');
			$type = D('type');
			$brand = D('brand');

			$typeList = $type->select();
			$search_id = $this->field('search_attr_id,brand_id')->where('id='.$id)->find();
			if(!empty($search_id['search_attr_id']) ){
				$attrList = $attr->where('id in('. $search_id['search_attr_id'] .')' )->select();
				$type_ids = '';
				foreach ($attrList as $key => $value) {
					$type_ids .= $value['type_id'] . ',';
				}
				$type_ids = rtrim($type_ids,',');
				$attrTypeList = $attr->where('type_id in ('. $type_ids .')')->select();
				$attrHtml = '';
				foreach ($attrList as $key => $value) {
					$str = $key==0 ? '+': '-';
					$attrHtml .= '<p><span><a onclick="addnew(this)"" javascript="void(0)">[' . $str . ']</a><select type="type" ><option value="">请选择</option>';
					
					foreach ($typeList as $key1 => $value1) {
						$selected = $value['type_id']==$value1['id']?'selected':'';
						$attrHtml.='<option  value=' . $value1['id'] . ' ' . $selected.' >'.$value1['type_name'].'</option>';
					}
					$attrHtml .= '</select>';

					$attrHtml .= '  <span name="attr_span"><select name="search_attr_id[ ]">';
					foreach ($attrTypeList as $key1 => $value1) {
						$selected = $value['id']==$value1['id']?'selected':'';
						if($value['type_id']==$value1['type_id'])
							$attrHtml .= '<option value='.$value1['id'].' '. $selected .'>'.$value1['attr_name'].'</option>';
					}
					$attrHtml.="</select></span></span></p>";
				}
			}else{
				$typeAll = $type->select();
				$attrHtml = '<p><span><a onclick="addnew(this)"" javascript="void(0)">[+]</a><select type="type" ><option value="">请选择</option>';
					if($typeAll){
						foreach( $typeAll as $val){
							$attrHtml.='<option value=' .$val["id"] . '>' . $val["type_name"] . '</option>';
							
						}
					}
				$attrHtml .='</select><span name="attr_span"></span></p>';
			}

			if(!empty($search_id['brand_id']) ){
				$brandList =  $brand->where('id in('. $search_id['brand_id'] .')' )->select();
				$brandAll = $brand->select();
				$brandHtml='';
				foreach ($brandList as $key => $value) {
					$str = $key==0 ? '+': '-';
					$brandHtml.= '<div class="formControls col-xs-8 col-sm-9"><a onclick="addnew(this)"" javascript="void(0)">[' . $str . ']</a><select name="brand_id[]" ><option value="">请选择</option>';
					foreach ($brandAll as $key1 => $value1) {
						$str = $value1['id']==$value['id']?'selected':'';
						$brandHtml.='<option value="'.$value1['id'].'"  '.$str.'>'.$value1['brand_name'].'</option>';
					}
					$brandHtml .= '</select></div>';
				}
			}else{
				$brandAll = $brand->select();
				$brandHtml.= '<div class="formControls col-xs-8 col-sm-9"><a onclick="addnew(this)"" javascript="void(0)">[+]</a><select name="brand_id[]" ><option value="">请选择</option>';
				foreach ($brandAll as $key1 => $value1) {
					$brandHtml.='<option value="'.$value1['id'].'"  '.$str.'>'.$value1['brand_name'].'</option>';
				}
				$brandHtml .= '</select></div>';
	
			}
			$html['attrHtml'] = $attrHtml;
			$html['brandHtml'] = $brandHtml;
			return $html;
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
			$join = "";
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
			$catList = $this->where($where)->order('concat(cat_path,id) asc')->limit($page->firstRow.','.$page->listRows)->select();
			foreach ($catList as $key => $value) {
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
