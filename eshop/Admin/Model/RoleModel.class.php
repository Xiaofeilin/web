<?php
	namespace Admin\Model;
	use Think\Model;
	class RoleModel extends Model{

		// 添加时间
		protected $_auto = array(
			array('addtime','time',1,'function'),
		);

		//post表单自动验证的规则
		protected $_validate = array(
			
		);

		/**
		*[查询关联的其他表]
		*/
		public function roleLink(){
			$data = array();
			$pri = D('privilege');
			$priAll = $pri->field('id,pri_name,parent_id,pri_path')->select();
			$data['priAll'] = getTree($priAll);

			return $data;
		}



		/**
		*[搜索+分页]
		*@return array 		$data[搜索后+分页的数据]
		*/
		public function search(){

		//******************************搜索****************************
		$where = array();
		//搜索role_name类型名，id号
		if( ( $search_key=I('get.search_key','') ) && ( $search_val=I('get.search_val','') ) ){
			if($search_key=='role_name')
				$where['role_name'] = array('like','%'.$search_val.'%') ;
			elseif($search_key=='id')
				$where[$search_key] = array('eq',$search_val);
		}


		
		//*****************************分页*******************************
		$data = array();
		$count = $this->where($where)->count();
		$page = new \Think\Page($count,C('YeShu'));
		$data['show'] = $page->show();

		$roleList = $this->where($where)->limit($page->firstRow.','.$page->listRows)->select();
		$data['roleList'] = $roleList;
		return $data;
		}

		/**
		*[修改显示]
		*@param int 		$id[要显示的数据id]
		*@return array 		$roleOne[修改后的数据]
		*/
		public function getRoleOne($id){
			$roleOne = $this->find($id);
			return $roleOne;
		}

	}
