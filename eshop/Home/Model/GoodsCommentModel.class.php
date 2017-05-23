<?php
	namespace Home\Model;
	class GoodsCommentModel extends CommonModel{

		public function file_com(){
			$commet = array();
			$is = '';
			foreach($_POST['score'] as $key=>$val){
				foreach ($val as $key1 => $val1) {
					if(!isset( $_POST['is'][$key][$key1] )) continue;
					$is.=$_POST['is'][$key][$key1].',';
					$com = $_POST['goods_comment'][$key][$key1] ;
					$key1 = $key1=='0'?'':$key1;
					$comment[] = array(
						'goods_comment'=>$com,
						'goods_id'=>$key,
						'attr_value'=>$key1,
						'user_id'=>1,
						'score'=>$val1,
						'addtime'=>time(),
					);
				}
			}
			
			
			$files = array();
			foreach($_FILES['pic']['size'] as $key=>$val){
				foreach($val as $key1=>$val1){
					foreach($val1 as $key2=>$val2){
						if( !$val2 ) continue;
						$a = $key1==""?$key1:'0';
						$files[$key][$a][] = array(
							'name'=>$_FILES['pic']['name'][$key][$key1][$key2],
							'type'=>$_FILES['pic']['type'][$key][$key1][$key2],
							'tmp_name'=>$_FILES['pic']['tmp_name'][$key][$key1][$key2],
							'error'=>$_FILES['pic']['error'][$key][$key1][$key2],
							'size'=>$_FILES['pic']['size'][$key][$key1][$key2],
						);
					}
				}
			}

			foreach($comment as $key=>$val){
				foreach ($files as $key1 => $val1) {
					foreach ($val1 as $key2 => $val2) {
						if($key1==$val['goods_id']&&$key2==$val['attr_value']){
							$comment[$key]['pic'] = $val2;
						}
					}
				}
			}
			
			$data['is'] = rtrim($is,',');
			$data['comment'] = $comment;
			$data['files'] = $files;
			return $data;
		}
	}
