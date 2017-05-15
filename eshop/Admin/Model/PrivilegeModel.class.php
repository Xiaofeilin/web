<?php
	namespace Admin\Model;
	use Think\Model;
	class PrivilegeModel extends Model{

		// 添加时间
		protected $_auto = array(
			array('addtime','time',1,'function'),
		);

		//post表单自动验证的规则
		protected $_validate = array(
			array('pri_name','require','请填写权限名称',1),
		);


		/**
		*[数据插入前的操作，主要拼接父路径]
		*@param array 	$data[经过自动验证的数据]
		*/
		protected function _before_insert(&$data){
			if($data['parent_id']!=0){
				$privilegeOne = $this->find($data['parent_id']);
				$data['pri_path'] = $privilegeOne['pri_path'] .  $privilegeOne['id'] . ',';
			}
		}

		/**
		*[不显示权限级别大于3的分类数据]
		*@return array 		$catAll[处理过的分类数据]
		*/
		public function lvIt3(){
			$priAll = $this->select();
			$priAll = getTree($priAll);
			foreach ($priAll as $key => $value) {
				$priAll[$key]['pri_name'] = str_repeat('----', $value['lv']+1) . $value['pri_name'];
				if($value['lv']>1)
					unset($priAll[$key]);
			}
			return $priAll;
		}



		/**
		*[搜索+分页]
		*@return array 		$data[搜索后+分页的数据]
		*/
		public function search(){

		//******************************搜索****************************
		$where = array();
		//搜索type_name类型名，id号
		if( ( $search_key=I('get.search_key','') ) && ( $search_val=I('get.search_val','') ) ){
			if($search_key=='pri_name')
				$where['pri_name'] = array('like','%'.$search_val.'%') ;
			if($search_key=='moduel_name')
				$where['moduel_name'] = array('like','%'.$search_val.'%') ;
			if($search_key=='controller_name')
				$where['controller_name'] = array('like','%'.$search_val.'%') ;
			if($search_key=='action_name')
				$where['action_name'] = array('like','%'.$search_val.'%') ;
			elseif($search_key=='id' || $search_key=='parent_id')
				$where[$search_key] = array('eq',$search_val);
		}

		
		//*****************************分页*******************************
		$data = array();
		$count = $this->where($where)->count();
		$page = new \Think\Page($count,C('YeShu'));
		$data['show'] = $page->show();

		$privilegeList = $this->order('concat(pri_path,id) asc')->where($where)->limit($page->firstRow.','.$page->listRows)->select();
		foreach ($privilegeList as $key => $value) {
				$privilegeList[$key]['lv'] = substr_count($value['pri_path'] , ',');
			}
		$data['privilegeList'] = $privilegeList;
		return $data;
		}

		/**
		*[修改显示]
		*@param int 		$id[要显示的数据id]
		*@return array 		$adminOne[修改后的数据]
		*/
		public function getPrivilegeOne($id){
			$privilegeOne = $this->find($id);
			if($privilegeOne['parent_id']!=0){
				$privilegeParent = $this->find( $privilegeOne['parent_id']);
				$privilegeOne['parent_name']= $privilegeParent['pri_name'];
			}else
				$privilegeOne['parent_name'] = 'root';
			return $privilegeOne;
		}

	}
