<?php
namespace Home\Controller;
use Think\Controller;
class EqualController extends Controller{
	protected $model;

	public function _initialize(){
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
			//$this->redirect("__CONTROLLER__/");
		}
		if(!session('?info')){
			$this->error('你尚未登录，请先登录再操作！',U('Login/login'),2);
		}
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