<?php
	namespace Home\Controller;
	class CommentController extends CommonController {

		protected $model;

		public function __construct(){
			parent::__construct();
			$this->model = D('GoodsComment');
		}

		public function commentlist(){

			$detail = D('detail');
			if(IS_POST){
				$data = $this->model->file_com();
				if($data['comment']){
					$this->model->startTrans();
					foreach ($data['comment'] as $key => $value) {
						unset($value['pic']);
						$comData[] = $value;
					}
					if( $id = $this->model->addAll($data['comment']) ){
						if($data['is']){
							if( !$detail->where('id in('.$data['is'].')')->save(array('is_com'=>1)) ){
								$this->model->rollback();
							}else{
								if(!empty($data['files']) ){
									foreach ($data['comment']  as $key => $value) {
										if( isset($value['pic']) ){
											$_FILES = $value['pic'];
											foreach ($_FILES as $key1 => $value1) {
												$imgData = imgUpLoad($key1,'Comment');
												$picsData[] = array(
													'user_id'=>1,
													'comment_id' => $id + $key,
													'goods_pric' => $imgData[$key1],
												);
											}
											
										}	
									}
						
									if( D('CommentPics')->addAll($picsData) )
										$this->model->commit();
								}else
									$this->model->commit();
							}
						}

					}else
						$this->model->rollback();
				}
			}
			
			$detailList = $detail->field('a.*,b.logo,b.goods_name')->alias('a')->join('left join goods b on a.goods_id=b.id')->where('a.is_com=0')->select();
			$this->assign('detailList',$detailList);
			$this->display();
		}

		public function comment(){
			$picsList = array();
			$commentList = $this->model->field('a.*,b.logo,b.goods_name')->alias('a')->join('left join goods b on a.goods_id=b.id')->select();
			$commentPic = D('CommentPics');
			$commentPicList = $commentPic->where('user_id=1')->select();
			foreach($commentList as $key=>$value){
				foreach($commentPicList as $key1=>$value1){
					if($value['id']==$value1['comment_id']){
						if(!isset($picsList[$key])) $picsList[$key]=$value;
						$picsList[$key]['pic'][] = $value1['goods_pric'];
					}
				}
			}
			var_dump($picsList);
			$this->assign('picsList',$picsList);
			$this->assign('commentList',$commentList);
			$this->display();
		}
	}
