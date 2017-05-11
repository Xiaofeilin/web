<?php
	namespace Admin\Model;
	use Think\Model;
	class AdminModel extends Model{

		// 添加时间
		protected $_auto = array(
			array('addtime','time',1,'function'),
		);

		//post表单自动验证的规则
		protected $_validate = array(
			array('admin_name','require','请填写管理员账号',1),
			array('admin_name','/^[a-zA-Z][a-zA-Z0-9_]*$/','账号应为英文开头的数字字母组合(不区分大小写)',1),
			array('admin_name','0,32','账号超出长度',0,'length'),
			array('admin_name','','账号已被使用',1,'unique'),
			array('admin_nick','require','请填写名称',1),
			array('admin_nick','0,32','名称超出长度',0,'length'),
			array('password','require','请填写密码',0),
			array('password','/^[\\~!@#$%^&*()-_=+|{}\[\],.?\/:;\'\"\d\w]*$/','密码存在非法字符',1),
			array('password','6,12','密码长度为6-12',0,'length'),
			array('repass','password','两次输入的密码不一致',0,'confirm'),
			array('tel','require','请填写手机号码',1),
			array('tel','number','请正确书写手机号码',1),
			array('tel','11','请正确书写手机号码',0,'length'),
			array('tel','','号码已被使用',1,'unique'),
			array('email','require','请填写电子邮箱',1),
			array('email','email','请正确填写电子邮箱',1),
			array('email','0,128','邮箱超出长度',0,'length'),
			array('email','','邮箱已被使用',1,'unique'),
			array('is_use',array(0,1),'请不要乱修改html',0,'in'),
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
			if($search_key=='admin_name')
				$where['admin_name'] = array('like','%'.$search_val.'%') ;
			if($search_key=='admin_nick')
				$where['admin_nick'] = array('like','%'.$search_val.'%') ;
			if($search_key=='tel')
				$where['tel'] = array('like','%'.$search_val.'%') ;
			if($search_key=='email')
				$where['email'] = array('like','%'.$search_val.'%') ;
			elseif($search_key=='id')
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

		$adminList = $this->where($where)->limit($page->firstRow.','.$page->listRows)->select();
		foreach($adminList as $key => $value){
			$is_use = '0';
			if($value['is_use'])
				$is_use = '1';
			$adminList[$key]['is_use'] = $is_use;
		}
		$data['adminList'] = $adminList;
		return $data;
		}

		/**
		*[修改显示]
		*@param int 		$id[要显示的数据id]
		*@return array 		$adminOne[修改后的数据]
		*/
		public function getAdminOne($id){
			$adminOne = $this->find($id);
			return $adminOne;
		}

		// 修改上传图片
		protected function _before_update(&$data){
			if($_FILES['icon']['size']){
				imgDel($this,$data['id']);
				$imgData = imgUpLoad('icon','Admin/Icon');
				if(isset( $imgData['error'])){
					$this->error = $imgData['error'];
					return false;
				}else{
					$data['icon'] = $imgData['logo'];
				}
			}
		}


	}
