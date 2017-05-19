<?php
namespace Home\Controller;
use Think\Controller;
class EqualController extends Controller{
	protected $model;

	/**
	*[常规数据修改]
	*/
	public function information( $url='list', $arr=array(),$trans=0 ){
		if(IS_POST){
			//$p = I('post.p',0);
			$sub = I('sub',0);
			if($sub == 1){
				if($data = $this->model->create()){
					//var_dump($data);
					if( $this->model->save($data)!==false ){
						if($trans)
							$this->model->commit();
						$_SESSION['info']['username'] = $data['username'];
						$_SESSION['info']['realname'] = $data['realname'];
						$_SESSION['info']['sex'] = $data['sex'];
						//$arr = array_merge(array('p'=>$p),$arr);
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