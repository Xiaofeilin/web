<?php 
namespace Admin\Controller;
use Think\Controller;

class AdController extends Controller{
	public function list()
	{
		$ad = D('Ad');
		$adlist = $ad ->getAll();
		// var_dump($adlist);

		$this->assign('title','广告列表');
		$this->assign('url',U('add'));
		$this->assign('urlName','添加广告');
		$this ->assign('adlist',$adlist);

		$this ->display();
	}

	public function add()
	{
	
		$this->assign('title','添加广告');
		$this->assign('url',U('list'));
		$this->assign('urlName','广告列表');

		if(IS_POST){
			$newad = I('post.');
			$newad['pic'] = $this->upload($_FILES['pic']);
			if (empty($newad['pic'])) {
				$this->error('请上传图片');
			}
			M('ad') ->add($newad);
			$this->redirect('list');
		}
		$this ->display();	
	}

	public function upload($file){
	    $upload = new \Think\Upload();// 实例化上传类   
	    $upload->maxSize   =     3145728 ;// 设置附件上传大小
	    $upload->exts      =     array('jpg', 'gif', 'png', 'jpeg');// 设置附件上传类型    
	    $upload->rootPath  =      './Public/Uploads';
	    $upload->savePath  =      '/ad/'; // 设置附件上传目录   
	    $upload->saveName  =  array('uniqid', 'md5'); //上传文件命名规则，[0]-函数名，[1]-参数，多个参数使用数组
	     // 上传文件     
	    $info = $upload->uploadOne($file);	 
	    return !empty($info) ? $info['savepath'].$info['savename'] : '';
	}


	public function edit()
    {
        $ad = M('Ad');
        $where = array('id' => I('id') );
        if(IS_POST){
        	// var_dump($_FILES);exit;
        	if($_FILES['pic']['name']){
        		// var_dump($_FILES['pic']);exit;
        		$info = $this ->upload($_FILES['pic']);
        		if(!$info){
        			$this -> error($info ->getError());
        		}else{
        			$_POST['pic'] = $info;
        		}
        	}

        	if($ad ->create()){
        		if($ad ->save()){
        			$this ->success('修改成功',U('Ad/list'));
        		}else{
        			$this ->error('修改失败',U('Ad/list'));
        		}
        	}else{
        		$this ->error($car ->getError());
        	}
        }else{
        	 //分配数据
        	$adlist = $ad ->where($where) ->find();
            $this->assign('adlist',$adlist);
            //显示模板
            $this->display();
        }

           
        	
    }

	public function del(){
		$id = $_GET['id'];
		$pos = D('Ad');
		$pos ->delete($id);
		$this->redirect('list');
	}
}