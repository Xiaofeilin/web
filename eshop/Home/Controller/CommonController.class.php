<?php
	namespace Home\Controller;
	use Think\Controller;
	class CommonController extends Controller {

		public function __construct(){
			parent::__construct();
			session_start;
			
		}

		public function _initialize(){
			$sum = 0;
			$data = $_SESSION['cart'];
			foreach ($data as $key => $value) {
				$sum += count($key);
			}
			$this->assign('sum',$sum);
		}

	}
