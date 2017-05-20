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
			array('password','/^[\\~!@#$%^&*()-_=+|{}\[\],.?\/:;\'\"\d\w]*$/','密码存在非法字符',0),
			array('password','6,12','密码长度为6-12',0,'length'),
			array('repass','password','两次输入的密码不一致',0,'confirm'),
			array('tel','require','请填写手机号码',0),
			array('tel','number','请正确书写手机号码',0),
			array('tel','11','请正确书写手机号码',0,'length'),
			array('tel','','号码已被使用',0,'unique'),
			array('email','require','请填写电子邮箱',0),
			array('email','email','请正确填写电子邮箱',0),
			array('email','0,128','邮箱超出长度',0,'length'),
			array('email','','邮箱已被使用',0,'unique'),
			array('is_use',array(0,1),'请不要乱修改html',0,'in'),
			array('role_id','cb','请选择角色',0,'callback'),
		);

		protected function cb(){
			if (empty(I('post.role_id',''))) {
				return false;
			}
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
			if($search_key=='admin_name'){
				$where['admin_name'] = array('like','%'.$search_val.'%') ;
			}
			if($search_key=='admin_nick'){
				$where['admin_nick'] = array('like','%'.$search_val.'%') ;
			}
			if($search_key=='tel'){
				$where['tel'] = array('like','%'.$search_val.'%') ;
			}
			if($search_key=='email'){
				$where['email'] = array('like','%'.$search_val.'%') ;
			}
			if($search_key=='role_name'){
				$papa = 1;
			}
			elseif($search_key=='admin.id'){
				$where[$search_key] = array('eq',$search_val);
			}
		}
		//按is_use是否显示搜索
		if( ($is_use=I('get.is_use',false))!==false )
			$where['is_use'] = array('eq' , $is_use);

		
		//*****************************分页*******************************
		if($papa == 1){
			$data = array();
			if ($is_use != '') {
				$and = "and is_use = '{$is_use}'";
			}else{
				$and = '';
			}
				$count = $this->query("SELECT COUNT(*) FROM `admin` left join admin_role on admin.id = admin_role.admin_id left join role on admin_role.role_id = role.id where role.role_name LIKE '%{$search_val}%' $and");
				$count = implode($count[0]);
				$data['count'] = $count;
				$page = new \Think\Page($count,C('YeShu'));
				$data['show'] = $page->show();
				
				$adminList = $this->query("SELECT admin.id,admin_name,GROUP_CONCAT(role_name),admin.addtime,admin_nick,tel,email,is_use,icon FROM `admin` left join admin_role on admin.id = admin_role.admin_id left join role on admin_role.role_id = role.id where admin.id in ( SELECT admin.id FROM `admin` left join admin_role on admin.id = admin_role.admin_id left join role on admin_role.role_id = role.id where role.role_name LIKE '%{$search_val}%' $and GROUP BY admin.id ) GROUP BY admin.id limit " . $page->firstRow.','.$page->listRows );
				foreach($adminList as $key => $value){
					$is_use = '0';
					if($value['is_use'])
						$is_use = '1';
					$adminList[$key]['is_use'] = $is_use;
				}
				$data['adminList'] = $adminList;
				return $data;
			}else{
				$data = array();
				$count = $this->where($where)->count();
				$data['count'] = $count;
				$page = new \Think\Page($count,C('YeShu'));
				$data['show'] = $page->show();

				$adminList = $this->field('admin.id,admin_name,GROUP_CONCAT(role_name),admin.addtime,admin_nick,tel,email,is_use,icon')->join('left join admin_role on admin.id = admin_role.admin_id left join role on admin_role.role_id = role.id')->group('admin.id')->where($where)->limit($page->firstRow.','.$page->listRows)->select();

				foreach($adminList as $key => $value){
					$is_use = '0';
					if($value['is_use'])
						$is_use = '1';
					$adminList[$key]['is_use'] = $is_use;
				}

				$data['adminList'] = $adminList;
				return $data;
			}
		
		}

		/**
		*[修改显示]
		*@param int 		$id[要显示的数据id]
		*@return array 		$adminOne[修改后的数据]
		*/
		public function getAdminOne($id){
			$adminOne = $this->query("SELECT admin.id,admin_name,GROUP_CONCAT(role_id),admin.addtime,admin_nick,tel,email,is_use,icon FROM `admin` left join admin_role on admin.id = admin_role.admin_id left join role on admin_role.role_id = role.id where admin.id in ( SELECT admin.id FROM `admin` left join admin_role on admin.id = admin_role.admin_id left join role on admin_role.role_id = role.id where admin.id = '{$id}' GROUP BY admin.id ) GROUP BY admin.id");
			return $adminOne;
		}

		// 修改上传图片
		protected function _before_update(&$data){
			if($_FILES['icon']['size']){
				imgDel($this,$_POST['id'],'icon');
				$imgData = imgUpLoad('icon','Admin/Icon');
				if(isset( $imgData['error'])){
					$this->error = $imgData['error'];
					return false;
				}else{
					$data['icon'] = $imgData['icon'];
				}
			}
		}

		// 添加上传图片
		protected function _before_insert(&$data){

			if($_FILES['icon']['size']){
				$imgData = imgUpLoad('icon','Admin/Icon');
				if(isset( $imgData['error'])){
					$this->error = $imgData['error'];
					return false;
				}else{
					$data['icon'] = $imgData['icon'];
				}
			}
			//密码加密
			if ($_POST['password']) {
				$npw = I('password','','md5');
				$data['password'] = $npw;
			}
		}

		/**
		*[在修改角色后的操作]
		*@param array 	$data[自动验证过滤后的form表单数据]
		*/
		protected function _after_update($data){
			// 出来form表单数据，插入数据库
			if($role_id = I('post.role_id','')){
				foreach ($role_id as $key => $value) {
					if(!$value) continue;
					$attrData[] = array(
						'role_id' => $value,
						'admin_id'=>$_POST['id'],
					);
				}
				$AdminRole = D('AdminRole');
				$AdminRole->where("admin_id = {$data['id']}")->delete();
				$AdminRole->addAll($attrData);
			}

		}

		// 登录获取权限
		public function login(){
			$list = $this->find();
			$time = time();
			if (empty($list)) {
				return false;
			}
			if ($list['is_use'] == '0') {
				return false;
			}
			if (($list['logtime'] + 1) >= 6 && $time - $list['lasttime'] < 1800){
				return false;
			}

			//查询用户所属权限id所组成的字符串
			$aid = $list['id'];
			$priList = D('RolePri')->query("SELECT group_concat(distinct role_pri.pri_id) FROM `role_pri` LEFT JOIN `admin_role` ON role_pri.role_id = admin_role.role_id where admin_role.admin_id = {$aid} ");
			$list['priList'] = $priList[0];
			$this->execute("update `admin` set `logtime` = '0',`lasttime` = '{$time}' where `id` = '{$aid}'");
			return $list;
		}

		//登录错误处理
		public function errorLog(){
			$admin_name = I('admin_name');
			$res = $this->where("admin_name = '{$admin_name}'")->find();
			$time = time();


			
			//登录次数处理
			if(!empty($res)){
				if ($res['is_use'] == '0') {
					$msg = '该用户被封禁或尚未激活';
					return $msg;
				}
				if(($res['logtime'] + 1) >= 6 ){
					if ($time - $res['lasttime'] > 1800) {
						$this->execute("update `admin` set `logtime` = '0' where `id` = '{$res['id']}'");
					}else{
						$msg = '该账户已被禁止登录';
						return $msg;
					}
				}
				$res = $this->where("id = '{$res['id']}'")->find();
				$logtime = $res['logtime'];
				$logtime += 1;
				$this->execute("update `admin` set `logtime` = '{$logtime}',`lasttime` = '{$time}' where `id` = '{$res['id']}'");
				$msg = '登录错误,请确认账号密码';
				
				return $msg;
			}
			$msg = '登录错误,请确认账号密码';
			return $msg;
			
		}


	}
