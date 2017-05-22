<?php
	namespace Admin\Model;
	use Think\Model;
	class UserModel extends Model{//
		/**
		*[搜索+分页]
		*@return array 		$data[搜索后+分页的数据]
		*/
		public function search($font){

			/**********************搜索**********************/
			$where = array();
			if( ( $search_key = I('get.search_key','') ) && ( $search_val = I('get.search_val','') ) ){
				if($search_key == 'account'){
					$where['account'] = array('like','%'.$search_val.'%');
				}
				if($search_key == 'username'){
					$where['username'] = array('like','%'.$search_val.'%');
				}
				if($search_key == 'tel'){
					$where['tel'] = array('like','%'.$search_val.'%');
				}
				if($search_key == 'email'){
					$where['email'] = array('like','%'.$search_val.'%');
				}
				elseif($search_key == 'id'){
					$where[$search_key] = array('eq',$search_val);
				}
			}

			if( ($is_use = I('get.is_use',false)) === false ){
				if($font == 1){
					$where['is_use'] = array('between','0,1');
				}elseif($font == 0){
					$where['is_use'] = array('eq','2');
				}
			}

			//按is_use是否显示搜索
			if( ($is_use = I('get.is_use',false)) !== false ){
				$where['is_use'] = array('eq',$is_use);
			}

			/**********************分页**********************/
			$data = array();
			$count = $this->where($where)->count();
			$data['count'] = $count;
			$page = new \Think\Page($count,C('YeShu'));
			$data['show'] = $page->show();

			$userList = $this->field('id,sm_icon,account,username,tel,email,regtime,is_use')->where($where)->limit($page->firstRow.','.$page->listRows)->select();

			foreach ($userList as $key => $value) {
				$is_use = '0';
				if($value['is_use']){
					$is_use = '1';
				}
				$userList[$key]['is_use'] = $is_use;
			}
			$data['userList'] = $userList;
			return $data;
		}

		/**
		*[修改显示]
		*@param int 		$id[要显示的数据id]
		*@return array 		$userOne[修改后的数据]
		*/
		public function getUserOne($id){
			$data['id'] = $id;
			$userOne = $this->field('icon,account,username,tel,email,regtime,credit,exp,level,birthdate,realname')->where($data)->select();
			return $userOne;
		}
	}