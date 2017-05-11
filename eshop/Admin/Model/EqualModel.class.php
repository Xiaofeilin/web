<?php
	namespace Admin\Model;
	use Think\Model;
	class EqualModel extends Model{

		public function search( $name='',$field='*',$where=array(),$order=array(),$join='' ){
			$data = array();
			$count = $this->where($where)->count();
			$page = new \Think\Page($count,C('YeShu'));
			$data['show'] = $page->show();
			if(!$name)
				$name=lcfirst(CONTROLLER_NAME.'List');
			$data[$name] = $this->field($field)->alias('a')->join($join)->where($where)->limit($page->firstRow.','.$page->listRows)->order($order)->select();
			return $data;
		}
	}
