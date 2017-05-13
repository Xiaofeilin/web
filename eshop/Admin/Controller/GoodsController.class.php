<?php
	namespace Admin\Controller;
	class goodsController extends EqualController{

		/**
		*['创建goods类实例']
		*/
		public function __construct(){
			parent::__construct();
			$this->model =D('goods');
		}

		public function list(){
			$sort_val = I('get.sort_val',false);
			$sort_val = $sort_val?0:1;
			$data = $this->model->search();
			$this->assign($data);
			$this->assign('sort_val',$sort_val);
			$this->assignHead('商品列表',U('add'),'商品添加');
			$this->display();
		}

		public function add(){

			parent::add();
			$data = $this->model->goodsLink();
			$this->assign($data);
			$this->assignHead('商品添加',U('list'),'商品列表');
			$this->display();
		}

		public function edit(){
			parent::edit();
			$id = I('get.id','');
			$data = array();
			$goodsOne = $this->model->find($id);
			$data = array_merge($this->model->goodsLink(),$this->model->restore($id,$goodsOne['type_id']) );
			$data['goodsOne'] = $goodsOne;
			$this->assignHead('商品修改',U('list'),'商品列表');
			$this->assign($data);
			$this->display();
		}


		public function recycle(){
			$data = $this->model->search(1);
			$this->assign($data);
			$this->assignHead('回收站',U('list'),'商品列表');
			$this->display();
		}


		public function del(){
			if( $id = I('get.id','') ){
				$p = I('get.p','');
				if( $this->model->save(array('is_del'=>1,'id'=>$id)) )
					$this->success( '回收成功' , U( 'list' , array('p'=>$p) ) );
				exit;
			}
			exit;
			$error = $this->model->getError();
			$this->error($error);
		}

		public function restore(){
			if( $id = I('get.id','') ){
				$p = I('get.p','');
				if( $this->model->save(array('is_del'=>0,'id'=>$id)) )
					$this->success( '还原成功' , U( 'recycle' , array('p'=>$p) ) );
				exit;
			}
			$error = $this->model->getError();
			$this->error($error);
		}

		public function repertory(){
			$goods_id = I('get.id','');
			if(IS_POST){
				$goods_attr = I('post.goods_attr','');
			 	$goods_num = I('post.goods_num','');
			 	$goodsRep = D('GoodsRep');
			 	if($goodsrepData = $this->model->repertoryNew( $goods_id , $goods_attr , $goods_num ) ){
			 		if($goodsRep->addAll($goodsrepData))
			 			$this->success('添加成功',U( '' , array('id'=>$goods_id) ) );
			 			exit;
			 	}
		 		$error = $goodsRep->getError();
		 		$this->error($error);
			}
			
			$data = $this->model->repertory();
			$this->assign('goods_id',$goods_id);
			$this->assign($data);
			$this->assignHead('库存列表',U('list'),'商品列表');
			if($data['goodsRepList'])

				$this->display('repertoryEdit');
			else
				$this->display();
		}

		public function repertoryEdit(){
			if(IS_POST){
				$goods_id = I('post.goods_id','');
				$old_goods_attr = I('old_goods_attr','');
				$old_goods_num = I('old_goods_num','');
				$goodsRepOldData = $this->model->repertoryOld( $goods_id , $old_goods_attr , $old_goods_num );
				
				$goodsRep = D('GoodsRep');
				$goodsRep->startTrans();

				if( $goodsRepOldData ){
					foreach ($goodsRepOldData  as $key => $value) {
						if( !($goodsRep->save($value)!==false ) ){
							$goodsRep->rollback();
							$error = $goodsRep->getError();
				 			$this->error($error);
				 			exit;
						}
					}
				}
				$goods_attr = I('post.goods_attr','');
				$goods_num = I('post.goods_num','');
				$goodsRepData = $this->model->repertoryNew( $goods_id , $goods_attr , $goods_num );
				 if($goodsRepData ){
			 		if( $goodsRep->addAll($goodsRepData) ){
			 			$goodsRep->commit();
				 		$this->success('添加成功',U( 'repertory' , array('id'=>$goods_id) ) );
				 		exit;
				 	}
			 	}else{
			 		 $goodsRep->commit();
			 		$this->success('添加成功',U( 'repertory' , array('id'=>$goods_id) ) );
			 		exit;
			 	}
			}
			$goodsRep->rollback();
			$error = $this->model->getError();
			$this->error($error);
			exit;
		}

		public function ajaxDelRep(){
			if( $id = I('get.id') ){
				if(D('GoodsRep')->delete($id))
					$this->ajaxReturn(1);
			}
		}

		public function ajaxGetAttr(){
			if( !$type_id = I('type_id','') ){
				$this->ajaxReturn(0);
			}else{
				$attr = D('attr');
				$attrList = $attr->where('type_id='.$type_id)->order('attr_type desc')->select();
				$this->ajaxReturn($attrList);
			}
		}

		public function ajaxGetStatus(){
			$data = array();
			$status = I('get.status','');
			if($status!=='is_sale'){
				$id = I('get.id','');
				if( $goodsOne = $this->model->find($id) ){
					$goodsOne[$status] = $goodsOne[$status]?0:1;
					if($this->model->save($goodsOne) )
						$this->ajaxReturn( $goodsOne[$status] );
				}
			}
		}

		public function ajaxDelAttr(){
			if( $id = I('get.id') ){
				if(D('GoodsAttr')->delete($id))
					$this->ajaxReturn(1);
			}
		}


		public function ajaxDelImg(){
			if( $id = I('get.id','') ){
				if(D('GoodsPics')->delete($id))
					$this->ajaxReturn(1);
			}
		}
	}
