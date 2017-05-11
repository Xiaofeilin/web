<?php
namespace Home\Model;
use Think\Model;
class ForgetModel extends Model{
	protected $model;

	/********** 构造方法实例化 **********/
	public function __construct(){
		$this->model = D('user');
	}

	public function forgetAcc($result,$info){
		if(!$result && !$info){
			$data['status'] = 4;
			$data['error_r'] = "验证码错误！";
			$data['error_i'] = $this->model->getError();
			return $data;
		}else if(!$result && $info){
			$data['status'] = 3;
			$data['error_r'] = "验证码错误！";
			return $data;
		}else if($result && !$info){
			$data['status'] = 2;
			$data['error_i'] = $this->model->getError();
			return $data;
		}else if($result && $info){
			$data['status'] = 1;
			return $data;
		}
	}
}