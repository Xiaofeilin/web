<?php
	namespace Home\Model;
	use Think\Model;
	class CommonModel extends Model{

		/**
		*[全部分类]
		*@return array 		$data[分类数组]
		*/
		public function catSelect($cid=''){
			if(!S('cat_data')){
				$cat = D('cat');
				$catList = $cat->where('is_show=1')->select();
				$data = array();
				foreach($catList as $key=>$val){
					if($val['parent_id']==0){
						$data[$key] = $val;
						foreach($catList as $key1=>$val1){
							if($val['id']==$val1['parent_id']){
								$data[$key]['cat2'][$key1] = $val1;
								foreach ($catList as $key2 => $val2) {
									if($val2['parent_id']==$val1['id'])
										$data[$key]['cat2'][$key1]['cat3'][] = $val2;
								}
							}
						}	
					}
				}
				S('cat_data',$data);
			}
			$data = S('cat_data');
			return $data;
		}
	}
