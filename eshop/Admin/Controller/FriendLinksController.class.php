<?php 
namespace Admin\Controller;
use Think\Controller;

class FriendLinksController extends Controller{
	public function list(){
		$links = D('friend_link');
		$linkslist = $links ->select();
		// dump($linkslist);

		$this->assign('title','友情连接');
		$this->assign('url',U('add'));
		$this->assign('urlName','友情添加');

		$this ->assign('linkslist',$linkslist);
		$this ->display();

	
	}

	public function add(){
			echo 'aa';
	}

	public function del(){
		$id = $_GET['id'];
		$links = D('friend_link');
		$links ->delete($id);
		$this->redirect('list');
	}

}
