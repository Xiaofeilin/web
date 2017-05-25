<?php 
namespace Admin\Controller;
//use Think\Controller;
class FriendlinkController extends EqualController{
	/**
	*['创建Friendlink类实例']
	*/
	public function __construct(){
		parent::__construct();
		$this->model = D('Friendlink');
	}

	/**
	*[Friendlink数据表显示和搜索]
	*/
	public function list(){
		$data = array();
		$data = $this->model->search();
		$this->assign($data);
		$this->assignHead('友情添加',U('add'),'友情连接');
		$this->display();
	}

	/**
	*[Friendlink数据表添加]
	*/
	public function add(){
		parent::add('list');
		$this->display();
	}

	/**
	*[Friendlink数据表删除]
	*/
	public function del(){
		$id = $_GET['id'];
		$links = D('Friendlink');
		$links ->delete($id);
		$this->redirect('list');
	}

	/**
	*[Friendlink数据表编辑]
	*/
	public function edit(){
		$links = D('Friendlink');
		if(IS_POST){			
			$editlink = $_POST;
			$links->save($editlink);
			$this->success("修改成功!",U('list'),3);
		}else{
			$id = $_GET['id'];
			$where = array(
				'id' => $id,
			);
			$list = $links->where($where)->find();
			$this->assign('list',$list);
			$this->display();
		}	
	}
}
