<?php
	namespace Admin\Controller;
	use Think\Controller;

	class IndexController extends Controller{

		// main系统信息
		public function main(){

			$model = M();
			$v = $model->query("select VERSION() as ver");

			$array['php_os'] = PHP_OS;
			$array['SERVER_SOFTWARE'] = $_SERVER['SERVER_SOFTWARE'];

			$array['phpver'] = PHP_VERSION;
			$array['mysqlver'] = $v[0]['ver'];
			
			$array['sockets'] = extension_loaded('sockets')?'是':'否';
			$array['timezone'] = date_default_timezone_get();

			$jpeg = gd_info()['JPEG Support']?'JPEG':'';
			$png = gd_info()['PNG Support']?'PNG':'';
			$gif = gd_info()['GIF Read Support'] && gd_info()['GIF Create Support']?'GIF':'';

			$array['gdver'] = gd_info()['GD Version'].'('.$jpeg.' '.$gif.' '.$png.')';
			$array['zlib'] = extension_loaded('zlib')?'是':'否';

			$array['file_limit'] = get_cfg_var ("upload_max_filesize")?get_cfg_var ("upload_max_filesize"):"不允许上传附件"; 

			$this->assign('array',$array);
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
		//清理缓存
		public function clearRuntime(){
			$R = $_GET['path'] ? $_GET['path'] : RUNTIME_PATH;
			if($this->_deleteDir($R)) die("cleared!");
		}
	}
