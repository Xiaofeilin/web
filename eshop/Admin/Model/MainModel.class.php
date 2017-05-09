<?php
namespace Admin\Model;
use Think\Model;

class MainModel extends Model
{
	$v = $this->query("select VERSION() as ver");
}
