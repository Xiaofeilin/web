<?php 
namespace Admin\Controller;
//use Think\Controller;
class CarouselController extends EqualController{
	/**
	*['创建carousel类实例']
	*/
	public function __construct(){
		parent::__construct();
		$this->model = D('Carousel');
	}

	/**
	*[Carousel数据表显示和搜索]
	*/
	public function list(){
		$data = array();
		$data = $this->model->search();
		$this->assign($data);
		$this->assignHead('轮播图添加',U('add'),'轮播图管理');
		$this->display();
	}

	/**
	*[Carousel数据表添加]
	*/
	public function add(){
		$this->assign('title','轮播图');
		$this->assign('url',U('add'));
		$this->assign('urlName','轮播图添加');

		if(IS_POST){
			$newcar = I('post.');
			$newcar['pic'] = $this->upload($_FILES['pic']);
			if (empty($newcar['pic'])) {
				$this->error('请上传图片');
			}
			M('Carousel') ->add($newcar);
			$this->redirect('list');
		}
		$this ->display();	
	}

	/**
	*[Carousel数据表图片上传]
	*/
	public function upload($file){
		$upload = new \Think\Upload();// 实例化上传类   
		$upload->maxSize   =     3145728 ;// 设置附件上传大小
		$upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型    
		$upload->rootPath  =      'Uploads';
		$upload->savePath  =      '/Car/'; // 设置附件上传目录   
		$upload->saveName  =  array('uniqid', 'md5'); //上传文件命名规则，[0]-函数名，[1]-参数，多个参数使用数组
		 // 上传文件     
		$info = $upload->uploadOne($file);	 
		return !empty($info) ? $info['savepath'].$info['savename'] : '';
	}

	/**
	*[Carousel数据表编辑]
	*/	
	public function edit(){
		$car = M('Carousel');
		$where = array('id' => I('id') );
		if(IS_POST){
			if($_FILES['pic']['name']){
				$info = $this ->upload($_FILES['pic']);
				if(!$info){
					$this -> error($info ->getError());
				}else{
					$_POST['pic'] = $info;
				}
			}
			if($car ->create()){
				if($car ->save()){
					$this ->success('修改成功',U('Carousel/list'));
				}else{
					$this ->error('修改失败',U('Carousel/list'));
				}
			}else{
				$this ->error($car ->getError());
			}
		}else{
			//分配数据
			$editcar = $car ->where($where) ->find();
			$this->assign('editcar',$editcar);
			//显示模板
			$this->display();
		}
	}
    
    	/**
	*[Carousel数据表删除]
	*/
	public function del(){
		$id = $_GET['id'];
		$car = D('Carousel');
		$car->delete($id);
		$this->redirect('list');
	}

}