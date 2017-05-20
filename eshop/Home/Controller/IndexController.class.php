<?php
	namespace Home\Controller;
	class IndexController extends CommonController {
		protected $model;

		public function __construct(){
			parent::__construct();
			$this->model = D('Index');
		}

	    	public function index(){
	    		$data['css'] = array('am-u-sm-7 am-u-md-4 text-two sug',
						'am-u-sm-7 am-u-md-4 text-two',
						'am-u-sm-3 am-u-md-2 text-three big',
						'am-u-sm-3 am-u-md-2 text-three sug',
						'am-u-sm-3 am-u-md-2 text-three',
						'am-u-sm-3 am-u-md-2 text-three last big'
					);
	    		$data['color'] = array('#ccc','Tan','Turquoise','', 'PaleTurquoise');
	    		$data['goods'] = $this->model->goodsSelect();
	    		$data['catAll'] = $this->model->catSelect();
	    		$data['floorGoods'] = $this->model->floorSelect();
	      		$this->assign($data);
	      		$this->display();
	   	}
	}
