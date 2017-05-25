<?php
	namespace Home\Controller;
	use Think\Controller;
	class EmptyController extends Controller{    
		public function _empty(){ 
			var_dump(md5('123456'));
		   $this->display('Empty/index');
		}
	}
