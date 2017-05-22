<?php
	namespace Home\Controller;
	use Think\Controller;
	class CommonController extends Controller {

		public function __construct(){
			parent::__construct();
			session_start;
		}

	}
