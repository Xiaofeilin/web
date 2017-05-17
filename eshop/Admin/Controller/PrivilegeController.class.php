<?php
	namespace Admin\Controller;

	class PrivilegeController extends EqualController{
		/**
		*['创建Privilege类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model = D('privilege');
		}

		/**
		*['privilege数据表添加数据']
		*/
		public function add(){
			parent::add();
			$data['priAll'] = $this->model->lvIt3();
			$data['mvcAll'] = $this->getMVCData();
			$this->assign($data);
			$this->assignHead('添加权限',U('list'),'权限列表');
			$this->display();
		}

		public function ajaxC(){
			$c = I('get.controller_name','');
			$data['mvcAll'] = $this->getMVCData();
			$result = $data['mvcAll']['Admin'][$c]?$data['mvcAll']['Admin'][$c]:'';
			$this->ajaxReturn( $result );
		}


		/**
		*['privilege数据表字段修改']
		*/
		public function edit(){
			parent::edit();
			$id = I('get.id','');
			$data = array();
			$data = $this->model->getPrivilegeOne($id);
			$this->assignHead('修改权限资料',U('list'),'权限列表');
			$this->assign($data);
			$this->display();
		}

		/**
		*[ajax无刷新修改is_use]
		*/
		public function ajaxIsUse(){
			$id = I('get.id','');
			$privilegeOne = $this->model->find($id);
			$privilegeOne['is_use'] = $privilegeOne['is_use']?0:1;
			if($this->model->save($privilegeOne))
				echo $privilegeOne['is_use'];
		}


		/**
		*[privilege数据删除]
		*/
		public function del(){
			$id = I('get.id','');
			$lv = I('get.lv','0');
			$p = I('get.p',0);
			if($lv<=2){
				$priList = $this->model->where('parent_id='.$id)->select();
				if (!empty($priList)) {
					$this->error('此权限含有子权限');
					exit;
				}
			}
				
			D('role_pri')->where('pri_id='.$id)->delete();
			$this->model->delete($id);
			$this->success( '删除成功',U('list',array('p'=>$p)) );
			
		}


		/**
		*[privilege数据表显示和搜索]
		*/
		public function list(){
			$data = array();
			$data = $this->model->search();
			$this->assign($data);
			$this->assignHead('权限列表',U('add'),'添加权限');
			$this->display();
		}



		/**
		* @note 获取控制器和action存放数据库
		*/
	    public function getMVCData(){
	        $modules = array('Admin');  //模块名称
	        $i = 0;
	        foreach ($modules as $module) {
	            $all_controller = $this->getController($module);
	            foreach ($all_controller as $controller) {
	                $controller_name = $controller;
	                $all_action = $this->getAction($module, $controller_name);

	                    $data[$module][$controller] = $all_action;

	            }
	        }
	        return $data;
	    }

	    /**
	     * @note 获取控制器
	     * @param $module
	     * @return array|null
	     */
	    protected function getController($module){
	        if(empty($module)) return null;
	        $module_path = APP_PATH . '/' . $module . '/Controller/';  //控制器路径
	        if(!is_dir($module_path)) return null;
	        $module_path .= '/*.class.php';
	        $ary_files = glob($module_path);
	        foreach ($ary_files as $file) {
	            if (is_dir($file)) {
	                continue;
	            }else {
	                $files[] = basename($file, C('DEFAULT_C_LAYER').'.class.php');
	            }
	        }
	        return $files;
	    }

	    /**
	     * @note 获取方法
	     *
	     * @param $module
	     * @param $controller
	     *
	     * @return array|null
	     */
	    protected function getAction($module, $controller){
	        if(empty($controller)) return null;
	        $content = file_get_contents(APP_PATH . '/'.$module.'/Controller/'.$controller.'Controller.class.php');

	        preg_match_all("/.*?public.*?function(.*?)\(.*?\)/i", $content, $matches);
	        $functions = $matches[1];

	        //排除部分方法
	        $inherents_functions = array('login','logout','uppassword','_initialize','__construct','getController','ajaxC');//如有排除方法添加此数组
	        foreach ($functions as $func){
	            $func = trim($func);
	            if(!in_array($func, $inherents_functions)){
	                if (strlen($func)>0)   $customer_functions[] = $func;
	            }
	        }
	        return $customer_functions;
	    }


	}
