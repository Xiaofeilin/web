<?php
namespace Home\Controller;
use Think\Controller;
class AddressController extends Controller {
	public function address(){
		$add = D("address");
		$map['uid'] = $_SESSION['info']['id'];
		$addinfo = $add->where($map)->select();
		$this->assign('addinfo',$addinfo);
		$this->display();
	}
}