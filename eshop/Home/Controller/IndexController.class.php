<?php
	namespace Home\Controller;
	use Think\Controller;
	class IndexController extends Controller {
		protected $model;

		public function __construct(){
			parent::__construct();
			$this->model = D('Index');
		}

	    	public function index(){
	    		$data = $this->model->goodsSelect();
	    		$data['catAll'] = $this->model->catSelect();
	    		
	      		$this->assign($data);
	      		$this->display();
	   	}
	}
