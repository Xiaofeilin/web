<?php
namespace Home\Controller;
use Think\Controller;
class ShopController extends Controller {
	public function shopcart(){
		$this->display();
	}

	public function payment(){
		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		$addinfo = $add->where($map)->select();
		$addcount = $add->count();
		$this->assign('addinfo',$addinfo);
		$this->assign('addcount',$addcount);
		$this->display();
	}

	public function setDefault(){
		$count = I("count");

		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		$data['status'] = 0;
		$clear = $add->where($map)->where('status = 1')->save($data);
		$addinfo = $add->where($map)->select();

		$mp['id'] = $addinfo[$count]['id'];
		$da['status'] = 1;
		$result = $add->where($mp)->save($da);
	}

	public function delAdd(){
		$count = I("count");

		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		$addinfo = $add->where($map)->select();

		$map['id'] = $addinfo[$count]['id'];

		$result = $add->where($map)->delete();

		if($result){
			$this->ajaxReturn(1);
		}
	}

	public function checkTel(){
		$user = D('User');
		$info = $user->create();

		$this->error($user->getError());
	}

	public function setSuccess(){
		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		$addcount = $add->where($map)->count();

		$data['name'] = I('name');
		$data['tel'] = I('tel');
		$data['province'] = I('province');
		$data['city'] = I('city');
		$data['street'] = I('street');
		$data['detailed'] = I('detailed');
		$data['uid'] = $_SESSION['info']['id'];

		if($addcount >= 5){
			$this->ajaxReturn("你的收货地址已经超过5个，无法继续添加！","eval");
		}else{
			$result = $add->add($data);
			if($result){
				$this->ajaxReturn(1);
			}
		}	
	}

	public function reSuccess(){
		$add = D("address");
		$map['id'] = I("id");

		$data['name'] = I('name');
		$data['tel'] = I('tel');
		$data['province'] = I('province');
		$data['city'] = I('city');
		$data['street'] = I('street');
		$data['detailed'] = I('detailed');

		$result = $add->where($map)->save($data);
		if($result){
			$this->ajaxReturn(1);
		}
	}
}