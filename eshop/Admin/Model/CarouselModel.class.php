<?php 
namespace Admin\Model;
use Think\Model;

class CarouselModel extends Model{
	public function getAll()
	{
		$res = $this ->select();
		$show = array('不显示','显示');
		// dump($res);exit;
		foreach ($res as &$val) {
			$val['isshow'] = $show[$val['isshow']];
		}

		return $res;
	}


}