<?php
	namespace Home\Model;
	class GoodsCommentModel extends CommonModel{

		public function file_com(){
			$commet = array();
			foreach($_POST['score'] as $key=>$val){
				foreach ($val as $key1 => $val1) {
					$key1 = $key1=='0'?'':$key1;
					$comment[] = array(
						'goods_comment'=>$_POST['goods_comment'][$key][$key1],
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
						$files[] = array(
							'name'=>$_FILES['pic']['name'][$key][$key1][$key2],
							'type'=>$_FILES['pic']['type'][$key][$key1][$key2],
							'tmp_name'=>$_FILES['pic']['tmp_name'][$key][$key1][$key2],
							'error'=>$_FILES['pic']['error'][$key][$key1][$key2],
							'size'=>$_FILES['pic']['size'][$key][$key1][$key2],
						);
					}
				}
			}

			$data['comment'] = $comment;
			$data['files'] = $files;
			return $data;
		}
	}
