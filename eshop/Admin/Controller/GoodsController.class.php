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

		/**
		*[商品列表]
		*/
		public function list(){
			//获取排序值
			$sort_val = I('get.sort_val',false);
			$sort_val = $sort_val?0:1;

			//搜索+分页
			$data = $this->model->search();

			//变量模板赋值
			$this->assign($data);
			$this->assign('sort_val',$sort_val);
			$this->assignHead('商品添加',U('add'),'商品列表');
			$this->display();
		}

		/**
		*[商品添加]
		*/
		public function add(){
			//调用父类添加方法
			parent::add();

			//获取与商品关联的其他表数据
			$data = $this->model->goodsLink();

			//变量模板赋值
			$this->assign($data);
			$this->display();
		}

		/**
		*[商品修改]
		*/
		public function edit(){

			//获取id值
			$id = I('get.id','');
			$data = array();

			//调用父类修改方法
			parent::edit('',array('id'=>$id));

			//将商品表的数据取出
			$goodsOne = $this->model->find($id);

			//取该商品的其他关联数据
			$goodsLink = $this->model->goodsLink();

			//还原该商品的属性表
			$restore = $this->model->restore($id,$goodsOne['type_id']);

			//将商品关联数据和商品属性表合并
			$data = array_merge($goodsLink,$restore);

			//变量模板赋值
			$data['goodsOne'] = $goodsOne;
			$this->assign($data);
			$this->display();
		}

		/**
		*[回收站]
		*/
		public function recycle(){
			//搜索回收的数据+分页
			$data = $this->model->search(1);

			//变量模板赋值
			$this->assign($data);
			$this->assignHead('回收站',U('list'),'商品列表');
			$this->display();
		}

		/**
		*[还原商品数据或删除商品数据]
		*/
		public function restoreOrDel(){
			//检验数据是否不合格
			if( $goodsData =$this->model-> idAndIs_del( I('get.id','') , I('get.is_del') )){

				//获取修改数据
				$data = array('is_del'=>$goodsData['is_del']);

				//判断修改是否成功
				if( $this->model->where('id in (' . $goodsData['id'] . ')')->save($data)!==false ){

					//判断跳转地址和提示信息
					 if($goodsData['is_del']==1){
						$url = 'list';
						$str = '回收成功';
					}else{
						$url = 'recycle';
						$str = '还原成功';
					}
					$this->success( $str , U( $url , array('p'=>$p) ) );
					exit;
				}
			}

			//错误跳转
			$error = $this->model->getError();
			$this->error($error);
		}

		public function del(){
			
			$id = I('get.id','');
			$is_del = I('get.is_del','');

			if($id&&$is_del=='0'){
				$detail = D('detail');
				$n = $detail->field('count(0) num')->where('goods_id='.$id)->find();
				if($n['num']=='0') {
					$this->model->delete($id);
					$this->success( '删除成功',U( 'recycle',array( 'p'=>$p) ) );
				}else
					$this->error('该商品已售买无法删除');
				
			}
		}

		/**
		*[商品库存]
		*/
		public function repertory(){
			
			//获取商品id
			$goods_id = I('get.id','');
			
			//判断是否添加商品库存
			if(IS_POST){
				//获取商品库存属性，库存数量
				$goods_attr = I('post.goods_attr','');
			 	$goods_num = I('post.goods_num','');
			 	$goods_price = I('post.goods_price');
			 	$goodsRep = D('GoodsRep');
			 	//调用repetoryNew处理传来的数据
			 	if($goodsrepData = $this->model->repertoryNew( $goods_id , $goods_attr , $goods_num , $goods_price ) ){
			 		
			 		//批量添加是否成功
			 		if($goodsRep->addAll($goodsrepData))
			 			$this->success('添加成功',U( '' , array('id'=>$goods_id) ) );
			 			exit;
			 	}
		 		$error = $goodsRep->getError();
		 		$this->error($error);
			}
			
			//获取该商品库存信息
			$data = $this->model->repertory();

			//变量模板赋值
			$this->assign('goods_id',$goods_id);
			$this->assign($data);
			$this->assignHead('库存列表',U('list'),'商品列表');
			
			//判断是否第一次添加还是修改
			if($data['goodsRepList'])
				$this->display('repertoryEdit'); //修改
			else
				$this->display(); //第一次添加
		}

		/**
		*[库存修改]
		*/
		public function repertoryEdit(){
			//判断是否post提交
			if(IS_POST){
				//获取post数据，并处理数据
				$goods_id = I('post.goods_id','');
				$old_goods_attr = I('old_goods_attr','');
				$old_goods_num = I('old_goods_num','');
				$old_goods_price = I('post.old_goods_price');
				$goodsRepOldData = $this->model->repertoryOld( $goods_id , $old_goods_attr , $old_goods_num ,$old_goods_price);
				
				//开启事物
				$goodsRep = D('GoodsRep');
				$goodsRep->startTrans();

				//将旧的库存数据修改
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

				//获取post新添加的数据，并处理数据
				$goods_attr = I('post.goods_attr','');
				$goods_num = I('post.goods_num','');
				$goods_price = I('post.goods_price');
				$goodsRepData = $this->model->repertoryNew( $goods_id , $goods_attr , $goods_num ,$goods_price);
				
				 //将新数据批量添加
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

			//商品回滚数据错误跳转
			$goodsRep->rollback();
			$error = $this->model->getError();
			$this->error($error);
			exit;
		}


		/**
		*[ajax删除库存]
		*/
		public function ajaxDelRep(){
			if( $id = I('get.id') ){
				if(D('GoodsRep')->delete($id))
					$this->ajaxReturn(1);
			}
		}

		/**
		*[ajax获取属性]
		*/
		public function ajaxGetAttr(){
			if( !$type_id = I('type_id','') ){
				$this->ajaxReturn(0);
			}else{
				$attr = D('attr');
				$attrList = $attr->where('type_id='.$type_id)->order('attr_type desc')->select();
				$this->ajaxReturn($attrList);
			}
		}


		/**
		*[ajax修改属性]
		*/
		public function ajaxGetStatus(){
			$data = array();
			$status = I('get.status','');
			if($status!=='is_sale'){
				$id = I('get.id','');
				if( $goodsOne = $this->model->find($id) ){
					$goodsData[$status] = $goodsOne[$status]?0:1;
					$goodsData['id'] = $id;
					if($this->model->save($goodsData) )
						$this->ajaxReturn( $goodsData[$status] );
				}
			}
		}

		/**
		*[ajax删除属性]
		*/
		public function ajaxDelAttr(){
			if( $id = I('get.id') ){
				if(D('GoodsAttr')->delete($id))
					$this->ajaxReturn(1);
			}
		}

		/**
		*[ajax删除相册图片]
		*/
		public function ajaxDelImg(){
			if( $id = I('get.id','') ){
				if(D('GoodsPics')->delete($id))
					$this->ajaxReturn(1);
			}
		}
	}
