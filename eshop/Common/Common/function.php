<?php
	
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


	function pwd($password){
		if(!strlen($password))
			return false;
		return md5( C( 'MD5_KEY').$password );
	}
	

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
	
	
	function imgUpLoad($imgName,$size=array(),$savePath=''){
		$data = array();
		if(isset($_FILES[$imgName])&&$_FILES[$imgName]['error']==0){
			$config = C('UpLoad_Config');
			if($savePath)
				$config['savePath'] = $savePath;
			$upload = new \Think\Upload($config);
			$info = $upload->upload(array($imgName=>$_FILES[$imgName]) );
			if($info){
				$data['logo'] = $info[$imgName]['savepath'] . $info[$imgName]['savename'];
				$logoPath = C('UpLoad_Config')['rootPath'];
				$smlogoName = $info[$imgName]['savepath'] . 'sm_' . $info[$imgName]['savename'];
				$image = new \Think\Image();
				$image->open($logoPath.$data['logo']);
				$width = empty($size)?C('Img_width'):$size[0];
				$height = empty($size)?C('Img_height'):$size[1];
				$image->thumb($width,$height)->save($logoPath . $smlogoName);
				$data['sm_logo'] = $smlogoName;
			}else{
				$data['error'] = $upload->getError();
			}
		}else{
			$data['error'] = $_FILES[$imgName]['error'];
		}
		return $data;
	}
	


	 function imgDel($obj){
		$path = C('UpLoad_Config')['rootPath'];
		$data = $obj->find($obj->id);
		$logo =  $path . $data['logo'];
		$sm_logo = $path . $data['sm_logo'];
		unlink($logo);
		unlink($sm_logo);
	}
