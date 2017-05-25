<?php 
namespace Admin\Model;
use Think\Model;

class CarouselModel extends Model{
	protected function _before_insert(&$data){
		$data['link'] = 'http://' . $_POST['link'];
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
			if($search_key=='name'){
				$where['name'] = array('like','%'.$search_val.'%') ;
			}
			if($search_key=='link'){
				$where['link'] = array('like','%'.$search_val.'%') ;
			}
			elseif($search_key=='id'){
				$where[$search_key] = array('eq',$search_val);
			}
		}

		
		//*****************************分页*******************************
		$data = array();
		$count = $this->where($where)->count();
		$data['count'] = $count;
		$page = new \Think\Page($count,C('YeShu'));
		$page->setConfig('header', '<li class="rows">共<b>%TOTAL_ROW%</b>条记录 第<b>%NOW_PAGE%</b>页/共<b>%TOTAL_PAGE%</b>页</li>');  
		$page->setConfig('prev', '上一页');  
		$page->setConfig('next', '下一页');  
		$page->setConfig('last', '末页');  
		$page->setConfig('first', '首页');  
		$page->setConfig('theme', '%FIRST%%UP_PAGE%%LINK_PAGE%%DOWN_PAGE%%END%%HEADER%');  
		$page->lastSuffix = false;//最后一页不显示为总页数 
		$data['show'] = $page->show();

		$carList = $this->field('id,name,link,pic,isshow,addtime')->where($where)->limit($page->firstRow.','.$page->listRows)->select();

		$show = array('不显示','显示');
		foreach ($carList as &$val) {
			$val['isshow'] = $show[$val['isshow']];
		}
		
		$data['carList'] = $carList;
		return $data;
	}
}