<?php
	namespace Admin\Model;
	use Think\Model;
	class EqualModel extends Model{

		public function search( $name='',$field='*',$where=array(),$order=array(),$join='' ){
			$data = array();
			$count = $this->where($where)->count();
			$page = new \Think\Page($count,C('YeShu'));
			$page->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录 第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');  
		    $page->setConfig('prev', '上一页');  
		    $page->setConfig('next', '下一页');  
		    $page->setConfig('last', '末页');  
		    $page->setConfig('first', '首页');  
		    $page->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');  
		    $page->lastSuffix = false;//最后一页不显示为总页数 
			$data['show'] = $page->show();
			if(!$name)
				$name=lcfirst(CONTROLLER_NAME.'List');
			$data[$name] = $this->field($field)->alias('a')->join($join)->where($where)->limit($page->firstRow.','.$page->listRows)->order($order)->select();
			return $data;
		}
	}
