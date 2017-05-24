<?php 
namespace Admin\Controller;
use Think\Controller;

class FriendLinkController extends Controller{
	public function list(){
		$links = D('Friendlink'); 
		// $linkslist = $links ->select();
		$linkslist = $links ->getAll();
		// dump($linkslist);
		$this->assign('title','友情连接');
		$this->assign('url',U('add'));
		$this->assign('urlName','友情添加');

		$this ->assign('linkslist',$linkslist);
		$this ->display();

	
	}


	public function add(){
		$this->assign('title','友情连接');
		$this->assign('url',U('list'));
		$this->assign('urlName','友情连接列表');

		if(IS_POST){			
			$newlink = I('post.');
			// var_dump($newlink);
			$links = D('Friendlink');
			$links->add($newlink);
			$this->redirect('list');
		}else{
			$this->display();
		}	
	}


	public function del(){
		$id = $_GET['id'];
		$links = D('Friendlink');
		$links ->delete($id);
		$this->redirect('list');
	}


	public function edit(){
		$this->assign('title','修改友情连接');
		$this->assign('url',U('list'));
		$this->assign('urlName','友情连接列表');
		$links = D('Friendlink');
		if(IS_POST){			
			$editlink = $_POST;
			$links->save($editlink);
			$this->redirect('list');
		}else{
			$id = $_GET['id'];
			$where = array(
				'id' => $id,
			);
			$list = $links->where($where)->select();
			$this->assign('list',$list);
			$this->display();
		}	
	}

}
