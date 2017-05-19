<?php
namespace Home\Controller;
use Think\Controller;
class EqualController extends Controller{
	protected $model;

	public function _initialize(){
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