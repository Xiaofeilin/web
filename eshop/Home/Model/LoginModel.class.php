<?php
namespace Home\Model;
use Think\Model;
class LoginModel extends Model{
	protected $model;

	/********** 构造方法实例化 **********/
	public function __construct(){
		$this->model = D('user');
	}

	/**
	*[用户登录检测]
	*@param int 		$time [当前时间戳]
	*@param array 	$info [利用自动验证得出的结果]
	*@param array 	$userInfo [查找到的用户信息] 
	*@param int 		$userInfo['status'] [用户状态]
	*@param int		$userInfo['errorlogin'] [登录失败次数]
	*@param int		$userInfo['errortime'] [登录失败的时间戳]
	*@return  int/string 	[检测后的结果]
	*/
	public function checkErrorlogin($info,$userInfo){
		$time = time();

		if(!empty($userInfo)){
			if($userInfo['is_use'] == 1){
				if($time - $userInfo['errortime'] > 1800){//判断时间差
					$data['status'] = 1;
					$this->model->where("id={$userInfo['id']}")->field('status')->save($data);//符合条件则更改用户状态
				}
			}else{
				return "你的账户被禁用或被拉进黑名单！";
			}
		}

		if($info){
			if($userInfo['status'] == 1){
				$_SESSION['info'] = $userInfo;//把用户信息存入$_SESSION

				$data['errorlogin'] = 0;
				$data['lastregtime'] = $time;
				$res = $this->model->where("id={$userInfo['id']}")->field('errorlogin,lastregtime')->save($data);
				return 1;//若用户状态为1，则用户信息写入$_SESSION和登录时间且重置登录错误次数，返回1表示登录成功
			}else{
				return "密码输入错误超过5次，你的账户已被锁定30分钟。";
			}
		}else{
			if(empty($userInfo)){
				return $this->model->getError();
			}else{
				
				$data['errorlogin'] = $userInfo['errorlogin'] + 1;
				$data['errortime'] = $userInfo['errorlogin'] > 5 ? $userInfo['errortime'] : $time;//判断登录错误次数，若大于5使用原时间戳，小于则用当前时间戳
				$data['status'] = $userInfo['errorlogin'] > 5 ? 0 : 1;//判断登录次数，若大于5则禁用用户，小于5则启用用户
				$this->model->where("id={$userInfo['id']}")->save($data);
				
				if($time - $userInfo['errortime'] < 1800 && $userInfo['errorlogin'] > 5){//判断时间戳差是不是小于1800秒，且登录错误次数是否大于5次
					return "密码输入错误超过5次，你的账户已被锁定30分钟。";
				}else{
					return $this->model->getError();
				}
			}
		}
	}
}