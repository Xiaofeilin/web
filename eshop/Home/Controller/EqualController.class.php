<?php
namespace Home\Controller;
use Think\Controller;
class EqualController extends Controller{
	protected $model;

	/**
	*[前调方法]
	*1.判断cookie是否存在，存在则自动登录
	*2.若cookie不存在，则判断session，用户信息没有则提醒登录
	*/
	public function _initialize(){
		if($_SESSION['info'] && $_SESSION['info']['is_use'] != 1){
			session('info',null);
			cookie('acc',null);
			cookie('pwd',null);
			$this->error('你的账户被禁用或被拉进黑名单！',U('Index/index'),3);
		}
		if(cookie('acc') && cookie('pwd')){
			$str = cookie('acc');
			$preg = "/^((13[0-9])|(15[^4])|(18[0-9])|(17[0-8])|(147,145))\\d{8}$/";
			$res = preg_match($preg, $str);
			if($res){
				$map['tel'] = cookie('acc');
			}else{
				$map['account'] = cookie('acc');
			}
			$map['pwd'] = md5(cookie('pwd'));
			$user = D('user');
			$userInfo = $user->where($map)->find();

			$_SESSION['info'] = $userInfo;
		}
		if(!session('?info')){
			$this->error('你尚未登录，请先登录再操作！',U('Login/login'),2);
		}
		$sum = 0;
		$data = $_SESSION['cart'];
		foreach ($data as $key => $value) {
			$sum += count($key);
		}
		$this->assign('sum',$sum);
	}

	/**
	*[常规数据修改]
	*/
	public function information( $url='list', $arr=array(),$trans=0 ){
		if(IS_POST){
			$sub = I('sub',0);
			if($sub == 1){
				if($data = $this->model->create()){
					if( $this->model->save($data)!==false ){
						if($trans)
							$this->model->commit();
						$_SESSION['info']['username'] = $data['username'];
						$_SESSION['info']['realname'] = $data['realname'];
						$_SESSION['info']['sex'] = $data['sex'];
						$this->success('修改成功',U($url));
						exit;
					}
					$error = $this->model->getError();
					$this->error($error);
					exit;
				}
			}
		}
	}
}