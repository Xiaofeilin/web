<?php
namespace Home\Model;
use Think\Model;
class UserModel extends Model{
	public function getAll(){
		$userinfo = $this->select();
		$sex = array('女','男','保密');
		foreach ($userinfo as &$val) {
			$val['sex'] = $sex[ $val['sex'] ];
		}
		return $userinfo;
	}
}