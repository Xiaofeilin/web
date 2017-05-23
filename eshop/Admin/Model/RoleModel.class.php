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
			array('role_name','require','请填写角色名',1),
			array('pri_id','cb','请选择权限',1,'callback'),
		);

		protected function cb(){
			if (empty(I('post.pri_id',''))) {
				return false;
			}
		}

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
		*[在添加角色后的操作]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		protected function _after_insert($data){
			// 出来form表单数据，插入数据库
			if( $pri_id = I('post.pri_id','') ){
				foreach ($pri_id as $key => $value) {

					if(!$value) continue;
					$attrData[] = array(
						'pri_id'=>$value,
						'role_id'=>$data['id'],
					);
					
				}
				$RolePri = D('RolePri');
				$RolePri->addAll($attrData);
			}
		}

		/**
		*[在修改角色后的操作]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		protected function _after_update($data){
			// 出来form表单数据，插入数据库
			if($pri_id = I('post.pri_id','')){
				foreach ($pri_id as $key => $value) {
					if(!$value) continue;
					$attrData[] = array(
						'pri_id' => $value,
						'role_id'=>$data['id'],
					);
				}
				$RolePri = D('RolePri');
				$RolePri->where("role_id = {$data['id']}")->delete();
				$RolePri->addAll($attrData);
			}

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
			if($search_key=='role_name'){
				$where['role_name'] = array('like','%'.$search_val.'%') ;
			}
			elseif($search_key=='pri_name'){
				$data = array();
				$count = $this->query("SELECT COUNT(*) FROM `role` left join role_pri on role.id = role_pri.role_id left join privilege on role_pri.pri_id = privilege.id where privilege.pri_name LIKE '%{$search_val}%'");
				$count = implode($count[0]);
				$data['count'] = $count;
				$page = new \Think\Page($count,C('YeShu'));
				$page->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录 第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');  
			    $page->setConfig('prev', '上一页');  
			    $page->setConfig('next', '下一页');  
			    $page->setConfig('last', '末页');  
			    $page->setConfig('first', '首页');  
			    $page->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');  
			    $page->lastSuffix = false;//最后一页不显示为总页数 
				$data['show'] = $page->show();

				$data['roleList'] = $this->query("SELECT role.id,`role_name`,GROUP_CONCAT(pri_name),role.addtime FROM `role` left join role_pri on role.id = role_pri.role_id left join privilege on role_pri.pri_id = privilege.id where role.id in ( SELECT role.id FROM `role` left join role_pri on role.id = role_pri.role_id left join privilege on role_pri.pri_id = privilege.id where privilege.pri_name LIKE '%{$search_val}%' GROUP BY role.id ) GROUP BY role.id limit " . $page->firstRow.','.$page->listRows );
				return $data;
			}
			elseif($search_key=='role.id'){
				$where[$search_key] = array('eq',$search_val);
			}
		}


		
		//*****************************分页*******************************
		$data = array();
		$count = $this->where($where)->count();
		$data['count'] = $count;
		$page = new \Think\Page($count,C('YeShu'));
		$page->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录 第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');  
	    $page->setConfig('prev', '上一页');  
	    $page->setConfig('next', '下一页');  
	    $page->setConfig('last', '末页');  
	    $page->setConfig('first', '首页');  
	    $page->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');  
	    $page->lastSuffix = false;//最后一页不显示为总页数 
		$data['show'] = $page->show();

		$roleList = $this->field('role.id,role_name,GROUP_CONCAT(pri_name),role.addtime')->join('left join role_pri on role.id = role_pri.role_id left join privilege on role_pri.pri_id = privilege.id')->group('role.id')->where($where)->limit($page->firstRow.','.$page->listRows)->select();
		$data['roleList'] = $roleList;
		return $data;
		}

		/**
		*[修改显示]
		*@param int 		$id[要显示的数据id]
		*@return array 		$roleOne[修改后的数据]
		*/
		public function getRoleOne($id){
			$roleOne = $this->query("SELECT role.id,`role_name`,GROUP_CONCAT(pri_id),role.addtime FROM `role` left join role_pri on role.id = role_pri.role_id left join privilege on role_pri.pri_id = privilege.id where role.id in ( SELECT role.id FROM `role` left join role_pri on role.id = role_pri.role_id left join privilege on role_pri.pri_id = privilege.id where role.id = '{$id}' GROUP BY role.id ) GROUP BY role.id");
			return $roleOne;
		}

	}
