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

	/**
	*[发送验证邮件]
	*@param string 	$toemail[用户的邮件地址]
	*@param string 	$title[邮件的标题]
	*@param string 	$content[邮件的内容]
	*@return  boolean	返回true或者false，true为发送成功，false为发送失败
	*/
	function send_email($toemail, $title, $content) {
		//示例化PHPMailer核心类
		$mail = new \Org\Util\PHPMailer();
		
		$mail->SMTPDebug = 0;//是否启用smtp的debug进行调试 开发环境建议开启 生产环境注释掉即可 默认关闭debug调试模式  

		$mail->isSMTP();//使用smtp鉴权方式发送邮件，当然你可以选择pop方式 sendmail方式等  可以参考http://phpmailer.github.io/PHPMailer/当中的详细介绍

		$mail->SMTPSecure = C('email_config.secure'); //这里要注意, QQ发送邮件使用的ssl方式,如果不设置, 则会失败! 请认真查看下面的配置文件!!! 
		
		$mail->SMTPAuth=true;//smtp需要鉴权 这个必须是true  
		 
		$mail->Host = C('email_config.host');//链接qq域名邮箱的服务器地址 
		  
		$mail->Port = C('email_config.port');//设置ssl连接smtp服务器的远程服务器端口号 可选465或587
		
		$mail->Username =C('email_config.username');//smtp登录的账号 这里填入字符串格式的qq号即可  
		
		$mail->Password = C('email_config.psw');//smtp登录的密码 这里填入“独立密码” 若为设置“独立密码”则填入登录qq的密码 建议设置“独立密码”  
		
		$mail->From = C('email_config.From');//设置发件人邮箱地址 这里填入上述提到的“发件人邮箱”  
		
		$mail->FromName = C('email_config.FromName');//设置发件人姓名（昵称） 任意内容，显示在收件人邮件的发件人邮箱地址前的发件人姓名  
		
		$mail->CharSet = 'UTF-8';//设置发送的邮件的编码 可选GB2312 我喜欢utf-8 据说utf8在某些客户端收信下会乱码  
		
		$mail->isHTML(true);//邮件正文是否为html编码 注意此处是一个方法 不再是属性 true或false  
		//设置收件人邮箱地址 该方法有两个参数 第一个参数为收件人邮箱地址 第二参数为给该地址设置的昵称 不同的邮箱系统会自动进行处理变动 这里第二个参数的意义不大
		
		if(is_array($toemail)){// 添加收件人地址，可以多次使用来添加多个收件人
			foreach($toemail as $to_email){
				$mail->AddAddress($to_email);
			}
		}else{
			$mail->AddAddress($toemail);
		}
		
		$mail->Subject = $title;//添加该邮件的主题  
	
		$mail->Body = $content;//添加邮件正文 上方将isHTML设置成了true，则可以是完整的html字符串 如：使用file_get_contents函数读取本地的html文件  

		//为该邮件添加附件 该方法也有两个参数 第一个参数为附件存放的目录（相对目录、或绝对目录均可） 第二参数为在邮件附件中该附件的名称  
		//$mail->addAttachment('./d.jpg','mm.jpg');  
		//同样该方法可以多次调用 上传多个附件  
		//$mail->addAttachment('./Jlib-1.1.0.js','Jlib.js');  
		//dump($mail);exit;	
		
		$status = $mail->send();//发送命令 返回布尔值   PS：经过测试，要是收件人不存在，若不出现错误依然返回true 也就是说在发送之前 自己需要些方法实现检测该邮箱是否真实有效  
		
		if($status) {//简单的判断与提示信息  
			//echo 'success';
			return true;  
		}else{  
			//dump($mail->ErrorInfo);   
			return false;  
		}  
	}	

	/**
	*[发送验证短信]
	*@param string 	$eCode[短信验证码]
	*@param string 	$tophone[发送短信到该手机]
	*@return  boolean	返回true或者false，true为发送成功，false为发送失败
	*/
	function send_message($eCode,$tophone){
		$host = "http://sms.market.alicloudapi.com";
		$path = "/singleSendSms";
		$method = "GET";
		$appcode = "395cbd5dac954aad99aee61a38dd1266	";
		$headers = array();
		array_push($headers, "Authorization:APPCODE " . $appcode);
		$querys = "ParamString=%7B%22num%22%3A%22" . $eCode . "%22%7D&RecNum=" . $tophone . "&SignName=%E8%B6%85%E7%BA%A7%E6%98%93%E8%B4%AD%E5%BA%97&TemplateCode=SMS_66965051";
		$bodys = "";
		$url = $host . $path . "?" . $querys;

		$curl = curl_init();
		curl_setopt($curl, CURLOPT_CUSTOMREQUEST, $method);
		curl_setopt($curl, CURLOPT_URL, $url);
		curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
		curl_setopt($curl, CURLOPT_FAILONERROR, false);
		curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
		curl_setopt($curl, CURLOPT_HEADER, true);
		if (1 == strpos("$".$host, "https://")){
			curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
			curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false);
		}

		$str = curl_exec($curl);
		$preg = "/(true)|(false)/";

		preg_match($preg, $str,$arr);

		return $arr[0];
	}

	