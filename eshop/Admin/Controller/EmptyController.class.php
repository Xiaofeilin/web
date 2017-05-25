<?php
	namespace Admin\Controller;
	use Think\Controller;
	class EmptyController extends Controller{    
		
		/**
		*['404']
		*/
		public function _empty(){ 
		   $this->display('Home@Empty/index');
		}
	}
