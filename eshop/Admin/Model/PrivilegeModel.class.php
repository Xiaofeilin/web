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
		//按is_use是否显示搜索
		if( ($is_use=I('get.is_use',false))!==false )
			$where['is_use'] = array('eq' , $is_use);

		
		//*****************************分页*******************************
		$data = array();
		$count = $this->where($where)->count();
		$page = new \Think\Page($count,C('YeShu'));
		$data['show'] = $page->show();

		$privilegeList = $this->where($where)->limit($page->firstRow.','.$page->listRows)->select();

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
			return $privilegeOne;
		}

	}
