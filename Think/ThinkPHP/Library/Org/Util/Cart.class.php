<?php
namespace Org\Util;
class Cart{

    public function __construct() {
        if(!isset($_SESSION['cart'])){
            $_SESSION['cart'] = array();
        }
    }
 
    /*
    添加商品
    param int $id 商品主键
          string $name 商品名称
          float $price 商品价格
          int $num 购物数量
    */
    public  function addItem($id,$name,$goodsArr) {
        //如果该商品已存在则直接加其数量
        if (!isset($_SESSION['cart'][$id])) {
                     $_SESSION['cart'][$id]=array(
                            'name'=>$name
                    );
        }

        if(isset($_SESSION['cart'][$id][$goodsArr['attr_id']])){
               $this->incNum($id,$goodsArr['attr_id'],$goodsArr['num']);
                return;
        }
        
        $_SESSION['cart'][$id][$goodsArr['attr_id']] = $goodsArr;
        
     
    }
    


    /*
    修改购物车中的商品数量
    int $id 商品主键
    int $num 某商品修改后的数量，即直接把某商品
    的数量改为$num
    */
    public function modNum($id,$num=1) {
        if (!isset($_SESSION['cart'][$id])) {
            return false;
        }
        $_SESSION['cart'][$id]['num'] = $num;
    }
 
    /*
    商品数量+1
    */
    public function incNum($id,$attr_id,$num=1) {
        if (isset($_SESSION['cart'][$id])) {
            $_SESSION['cart'][$id][$attr_id]['num'] += $num;
        }
    }
 
    /*
    商品数量-1
    */
    public function decNum($id,$num=1) {
        if (isset($_SESSION['cart'][$id])) {
            $_SESSION['cart'][$id][$attr_id]['num'] -= $num;
        }
 
        //如果减少后，数量为0，则把这个商品删掉
        if ($_SESSION['cart'][$id][$attr_id]['num'] <1) {
            $this->delItem($id,$attr_id);
        }
    }
 
    /*
    删除商品
    */
    public function delItem($id,$attr_id) {
          if(count( $_SESSION['cart'][$id][$attr_id] )<=0 )
                 unset($_SESSION['cart'][$id]);
          else
                unset($_SESSION['cart'][$id][$attr_id]);
    }
     
    /*
    获取单个商品
    */
    public function getItem($id) {
        return $_SESSION['cart'][$id];
    }
 
    /*
    查询购物车中商品的种类
    */
    public function getCnt() {
        return count($_SESSION['cart']);
    }
     
    /*
    查询购物车中某商品的属性
    */
    public function getAttr($id){
       $data = $_SESSION['cart'][$id];
       unset($data['name']);
       count($data);
    }

    /*
    查询购物车中商品的个数
    */
    public function getNum(){
        if ($this->getCnt() == 0) {
            //种数为0，个数也为0
            return 0;
        }
 
        $sum = 0;
        $data = $_SESSION['cart'];
        foreach ($data as $item) {
            foreach ($item as $key => $value) {
                if($key!='id')
                      $sum += $value['num'];
            }
          
        }
        return $sum;
    }
    

    
 
    /*
    清空购物车
    */
    public function clear() {
        $_SESSION['cart'] = array();
    }
}
