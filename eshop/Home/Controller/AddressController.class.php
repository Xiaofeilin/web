<?php
namespace Home\Controller;
use Think\Controller;
class AddressController extends Controller {
	public function address(){
		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		$addinfo = $add->where($map)->select();
		$addcount = $add->count();
		$this->assign('addinfo',$addinfo);
		$this->assign('addcount',$addcount);
		$this->display();
	}

	public function checkTel(){
		$user = D('User');
		$info = $user->create();

		//$_SESSION['addMsg']['tel'] = I("tel");

		$this->error($user->getError());
	}

	public function setDefault(){
		$count = I("count");

		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		$clear = $add->where($map)->execute("update `address` set `status` = 0 where `status` = 1");
		$addinfo = $add->where($map)->select();

		$map['id'] = $addinfo[$count]['id'];

		$data['status'] = 1;

		$result = $add->where($map)->save($data);
	}

	public function delAdd(){
		$count = I("count");
		//echo $count;

		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		//$clear = $add->where($map)->execute("update `address` set `status` = 0 where `status` = 1");
		$addinfo = $add->where($map)->select();
		//var_dump($addinfo);

		$map['id'] = $addinfo[$count]['id'];
		//var_dump($map);

		//$data['status'] = 1;

		$result = $add->where($map)->delete();

		if($result){
			$this->ajaxReturn(1);
		}
	}

	public function setSuccess(){
		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		$addcount = $add->where($map)->count();
		//var_dump($addcount);

		$data['name'] = I('name');
		$data['tel'] = I('tel');
		$data['province'] = I('province');
		$data['city'] = I('city');
		$data['street'] = I('street');
		$data['detailed'] = I('detailed');
		$data['uid'] = $_SESSION['info']['id'];
		//var_dump($data);

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
		//var_dump($map);

		$data['name'] = I('name');
		$data['tel'] = I('tel');
		$data['province'] = I('province');
		$data['city'] = I('city');
		$data['street'] = I('street');
		$data['detailed'] = I('detailed');
		//$data['uid'] = $_SESSION['info']['id'];
		//var_dump($data);

		$result = $add->where($map)->save($data);
		if($result){
			$this->ajaxReturn(1);
		}
	}
}