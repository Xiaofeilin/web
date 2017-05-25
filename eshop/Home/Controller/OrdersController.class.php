<?php
namespace Home\Controller;
//use Think\Controller;
class OrdersController extends EqualController {
	/**
	*['创建Order类实例']
	*/
	public function __construct(){
		parent::__construct();
		$this->model = D('Orders');
	}

	/**
	*['订单页面显示']
	*/
	public function orders(){
		$id = $_SESSION['info']['id'];
		$state = 7;
		$data = array();
		$data = $this->model->search($id,$state);
		$ordersList = array();
		foreach ($data as $key => $val) {
			foreach ($val as $k => $v) {
				$ordersList[$v['orders_id']][] = $v;
			}
		}
		$this->assign('ordersList',$ordersList);
		$this->display();
	}

	/**
	*['ajax请求显示订单']
	*/
	public function ajaxOrders(){
		$id = $_SESSION['info']['id'];
		$state = I('get.state','7');
		$data = array();
		$data = $this->model->search($id,$state);

		$ordersList = array();
		foreach ($data as $key => $val) {
			foreach ($val as $k => $v) {
				$ordersList[$v['orders_id']][] = $v;
			}
		}

		$html = '';
		foreach ($ordersList as $list) {
			$html.='<div class="order-list"><div class="order-status2"><div class="order-title"><span>成交时间：'.date("Y-m-d",$list[0]['buytime']).'</span></div><div class="order-content"><div class="order-left">';
			foreach ($list as $val) {
				$html.='<ul class="item-list"><li class="td td-item"><div class="item-pic"><a href="javascript:void(0);" class="J_MakePoint"><img src="'.__ROOT__.'/Uploads/'.$val['sm_logo'].'" class="itempic J_ItemImg"></a></div><div class="item-info"><div class="item-basic-info"><a href="javascript:void(0);"><p>'.$val['goods_name'].'</p><p class="info-little">颜色：'.$val['attr_name'].'<br/>包装：盒装 </p></a></div></div></li><li class="td td-price"><div class="item-price">'.$val['price'].'</div></li><li class="td td-number"><div class="item-number"><span>×</span>'.$val['num'].'</div></li><li class="td td-operation"><div class="item-operation"><a href="refund.html">退款/退货</a></div></li></ul>';
			}
			$html.='</div><div class="order-right"><li class="td td-amount"><div class="item-amount">合计：'.$list[0]['total'].'<p>含运费：<span>10.00</span></p></div></li><div class="move-right"><li class="td td-status"><div class="item-status">';
			if($val['state'] == '待发货'){
				$html.='<p class="Mystatus">买家已付款</p></div></li><li class="td td-change"><div class="am-btn am-btn-danger anniu"><a href="javascript:void(0);" style="color:white">提醒发货</a></div></li></div></div></div></div></div>';
			}else if($val['state'] == '已发货'){
				$html.="<p class='Mystatus'>卖家已发货</p></div></li><li class='td td-change'><div class='am-btn am-btn-danger anniu'><a href='".U('Orders/sureOrders',array('id'=>$list[0][orders_id]))."' style='color:white'>确认收货</a></div></li></div></div></div></div></div>";
			}else if($val['state'] == '已收货'){
				$html.='<p class="Mystatus">交易成功</p></div></li><li class="td td-change"><div class="am-btn am-btn-danger anniu"><a href="javascript:void(0);" style="color:white">评价商品</a></div></li></div></div></div></div></div>';
			}
		}
		$this->ajaxReturn($html);
	}

	/**
	*['确认订单']
	*/
	public function sureOrders(){
		$id = I('get.id');
		$data['state'] = 2;
		$where['id'] = $id;
		$res = $this->model->where($where)->save($data);
		$this->success("确认收货成功！",U('Orders/orders'),3);
	}
}