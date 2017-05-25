<?php 
namespace Admin\Model;
use Think\Model;

class FriendLinkModel extends Model{
	public function getAll()
	{
		
		$list = $this ->select();
		// var_dump($list);
		$show = array('不显示','显示');

		foreach ($list as &$val) {
			$val['isshow'] = $show[$val['isshow']];
		}
			return $list;
	}

}