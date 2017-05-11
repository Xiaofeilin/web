<?php
	
	/**
	*[Xss过滤]
	*@param string 	$val[需要过滤的字符]
	*@return  string 	[过滤后的字符]
	*【实例】
	*/
	function removeXss($val){
		static $obj = null;
		if($obj===null){
			require("./HTMLPurifier/library/HTMLPurifier.includes.php");
			$config = HTMLPurifier_Config::createDefault();
			$config->set('HTML.TargetBlank',TRUE);
			$obj = new HTMLPurifier($config);
		}
		return $obj->purify($val);
	}



	/**
	*[MD5加密]
	*@param string	$password[需要加密的字符串]
	*@return  array/bool 	[md5加密的字符或false]
	*【实例】
	*pwd('1234');
	*/
	function pwd($password){
		if(!strlen($password))
			return false;
		return md5( C( 'MD5_KEY').$password );
	}
	


	/**
	*[获取子孙树]
	*@param array 	$arr[有parent_id的数组]
	*@param int 	 	$p[parent_id的值] 
	*@param int 		$lv[数组的等级] 
	*@return  array 	$treeArr[排列好的数组]
	*【实例】
	*$catAll = D('cat')->select();
	*var_dump(getTree($catAll));
	*/
	function getTree($arr, $p=0 , $lv=0){
		$treeArr = array();
		foreach( $arr as $val){
			if($p == $val['parent_id']){
				$val['lv'] = $lv;
				$treeArr[] = $val;
				$treeArr = array_merge( $treeArr,getTree($arr,$val['id'],$lv+1) );
			}					
		}
		return $treeArr;
	}
	
	

	/**
	*[上传图片]
	*@param string 	$imgName[上传图片的名字]
	*@param array 	$size[缩略图的大小小] 默认大小100px
	*@param string 	$savePath[上传文件所在的文件夹路径] 默认文件夹UpLoad/Goods
	*@return  array 	$data[成功返回上传文件的路径和缩略图路径/失败返回错误信息]
	*【实例】
	*	imgUpLoad('logo',array(200,200),'Brand');
	*/
	function imgUpLoad($imgName="logo",$savePath='',$size=array()){
		$data = array();
		if(isset($_FILES[$imgName])&&$_FILES[$imgName]['error']==0){
			$config = C('UpLoad_Config');
			if($savePath)
				$config['savePath'] = $savePath.'/';
			$upload = new \Think\Upload($config);
			$info = $upload->upload(array($imgName=>$_FILES[$imgName]) );
			if($info){
				$data[$imgName] = $info[$imgName]['savepath'] . $info[$imgName]['savename'];
				$logoPath = C('UpLoad_Config')['rootPath'];
				$smlogoName = $info[$imgName]['savepath'] . 'sm_' . $info[$imgName]['savename'];
				$image = new \Think\Image();
				$image->open($logoPath.$data[$imgName]);
				$width = empty($size)?C('Img_width'):$size[0];
				$height = empty($size)?C('Img_height'):$size[1];
				$image->thumb($width,$height)->save($logoPath . $smlogoName);
				$data['sm_'.$imgName] = $smlogoName;
			}else{
				$data['error'] = $upload->getError();
			}
		}else{
			$data['error'] = $_FILES[$imgName]['error'];
		}
		return $data;
	}

	/**
	*[删除上传图片和缩略图]
	*@param object 	$obj[删除图片路径所在表实例化的对象]
	*@param int		$id[删除图片的id]
	*【实例】
	*$goods = D('goods');
	*imgDel($goods,1);
	*/
	 function imgDel($obj,$id,$imgName="logo"){
		$path = C('UpLoad_Config')['rootPath'];
		$data = $obj->find($id);
		$logo =  $path . $data[$imgName];
		$sm_logo = $path . $data['sm_'.$imgName];
		unlink($logo);
		unlink($sm_logo);
	}
	
	/**
	*[验证密码是否正确]
	*@param string 	$val[用户输入的密码]
	*/
	function checkPwd($val){
		$map['pwd'] = md5($val);
		$user = M('user')->where($map)->find();
		if($user){
			return true;
		}else{
			return false;
		}
	}

	/**
	*[验证用户名是否存在]
	*@param string 	$val[用户输入的用户名]
	*/
	function checkAcc($val){
		$map['account'] = $val;
		$user = M('user')->where($map)->find();
		if($user){
			return true;
		}else{
			return false;
		}
	}


	
