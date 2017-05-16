<?php
	namespace Home\Model;
	use Think\Model;
	class CommonModel extends Model{
		public function catSelect(){
			$cat = D('cat');
			$catList = $cat->field('id,cat_name,parent_id')->where('is_show=1')->select();
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
			return $data;
		}


		
	}
