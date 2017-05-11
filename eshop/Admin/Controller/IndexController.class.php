<?php
	namespace Admin\Controller;
	use Think\Controller;

	class IndexController extends Controller{

		// main系统信息
		public function main(){

			$model = M();
			$v = $model->query("select VERSION() as ver");

			$main['php_os'] = PHP_OS;
			$main['SERVER_SOFTWARE'] = $_SERVER['SERVER_SOFTWARE'];

			$main['phpver'] = PHP_VERSION;
			$main['mysqlver'] = $v[0]['ver'];
			
			$main['sockets'] = extension_loaded('sockets')?'是':'否';
			$main['timezone'] = date_default_timezone_get();

			$jpeg = gd_info()['JPEG Support']?'JPEG':'';
			$png = gd_info()['PNG Support']?'PNG':'';
			$gif = gd_info()['GIF Read Support'] && gd_info()['GIF Create Support']?'GIF':'';

			$main['gdver'] = gd_info()['GD Version'].'('.$jpeg.' '.$gif.' '.$png.')';
			$main['zlib'] = extension_loaded('zlib')?'是':'否';

			$main['file_limit'] = get_cfg_var ("upload_max_filesize")?get_cfg_var ("upload_max_filesize"):"不允许上传附件"; 

			$this->assign('main',$main);
			$this->display('main');
		}

		//清理缓存 
		private function _deleteDir($R){
			$handle = opendir($R);
			while(($item = readdir($handle)) !== false){
				if($item != '.' and $item != '..'){
					if(is_dir($R.'/'.$item)){
						$this->_deleteDir($R.'/'.$item);
					}else{
						if(!unlink($R.'/'.$item))
						die('error!');
					}
				}
			}
			closedir( $handle );
			return rmdir($R); 
		}
		//清理缓存 执行方法
		public function clearRuntime(){
			$R = $_GET['path'] ? $_GET['path'] : RUNTIME_PATH;
			if($this->_deleteDir($R)) die("cleared!");
		}
	}
