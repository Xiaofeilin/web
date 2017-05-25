<?php
	namespace Admin\Model;
	use Think\Model;
	class AttrModel extends Model{

		//post表单自动验证的规则
		protected $_validate = array(
			array('attr_name','require','属性名必须填',1),
			array('attr_type',array(0,1),'请不要乱修改html',1,'in'),
			array('type_id','require','请不要乱修改html'),
		);

		/**
		*['类型下属性类型转换']
		*@param number 	$type_id['类型id']
		*@return array 		$attrList['转换后的数组']
		*/
		public function handle($type_id){
			$attrList = $this->where('type_id='.$type_id)->select();
			foreach ($attrList as $key => $value) {
				if( $value['attr_type'] )
					$attrList[$key]['attr_type_name'] = '可选';
				else
					$attrList[$key]['attr_type_name'] = '唯一';
			}
			return $attrList;
		}
	}
