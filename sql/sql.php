CREATE TABLE IF NOT EXISTS goods(
	id mediumint unsigned not null auto_increment,
	goods_name varchar(45) not null default '' comment '商品名称',
	logo varchar(150) not null default '' comment '商品logo',
	sm_logo varchar(150) not null default '' comment '商品缩略logo',
	price decimal(10,2) not null default '0.00' comment '商品价格',
	goods_desc longtext comment '商品描述',
	is_on_sale tinyint unsigned not null default '1' comment '是否上架:1:上架 0:下架',
	is_delete tinyint unsigned not null default '0' comment '是否删除,1:删除 0:未删除',
	addtime int unsigned not null comment '添加时间',
	primary key(id),
	key price(price),
	key is_on_sale(is_on_sale),
	key is_delete(is_delete),
	key addtime(addtime)
)engine=InnoDB default charset=utf8;



11

#########################RBAC###########################
CREATE TABLE privilege(
	id smallint unsigned not null auto_increment,
	pri_name varchar(30) not null comment '权限名称',
	module_name varchar(10) not null comment '模块名',
	controller_name varchar(10)  not null comment'控制器名',
	action_name varchar(10) not null comment'方法名',
	parent_id smallint unsigned not null default '0' comment '上级权限:0',
	primary key(id)
)engine=InnoDB default charset=utf8 comment '权限表';


CREATE TABLE role(
	id tinyint unsigned not null auto_increment,
	role_name varchar(30) not null comment '角色名称',
	primary key (id)
)engine=InnoDB default charset=utf8 comment'角色表';

CREATE TABLE role_privilege(
	id smallint unsigned not null auto_increment,
	pri_id smallint unsigned not null comment'权限id',
	role_id smallint unsigned not null comment '角色id',
	primary key(id),
	key pri_id(pri_id),
	key role_id(role_id)
)engine=innoDB default charset=utf8 comment'角色权限关联表';


CREATE TABLE admin(
	id tinyint unsigned not null auto_increment,
	username varchar(30) not null comment '账号',
	password char(32) not null comment '密码',
	is_use tinyint unsigned not null default '1' comment '是否启用  1:启用 0:禁用',
	primary key (id)
)engine=InnoDB default charset=utf8 comment'管理员表';
insert into admin values(1,'root','a12f9de30f257a8dba24770b8824f4f3',1);


CREATE TABLE  admin_role(
	id smallint unsigned not null auto_increment,
	admin_id smallint unsigned not null comment'管理员id',
	role_id smallint unsigned not null comment '角色id',
	primary key(id),
	key admin_id(admin_id),
	key role_id(role_id)
)engine=InnoDB default charset=utf8 comment'管理员角色表';






################################商品########################################
DROP TABLE IF EXISTS cat;
CREATE TABLE cat(
	id tinyint unsigned not null auto_increment,
	cat_name varchar(30) not null comment '分类名称',
	parent_id smallint unsigned not null default '0' comment '父级分类',
	primary key(id)
)engine=InnoDB default charset=utf8 comment'商品类型';

DROP TABLE IF EXISTS type;
CREATE TABLE type(
	id tinyint unsigned not null auto_increment,
	type_name varchar(30) not null comment '类型名称',
	primary key(id)
)engine=InnoDB default charset=utf8 comment'商品类型';

DROP TABLE IF EXISTS attribute;
CREATE TABLE attribute(
	id mediumint unsigned not null auto_increment,
	attr_name varchar(30) not null comment '属性名',
	attr_type tinyint unsigned not null default '0' comment'属性的类型 0:唯一,1:可选',
	attr_option_values varchar(150) not null default '' comment '属性的可选值,多个可选值用，隔开',
	type_id tinyint unsigned not null comment'类型id',
	primary key(id)
)engine=InnoDB default charset=utf8 comment'属性';

DROP TABLE IF EXISTS member_level;
CREATE TABLE member_level(
	id mediumint unsigned not null auto_increment,
	level_name varchar(30) not null comment'级别名称',
	bottom_num int unsigned not null comment'积分下限',
	top_num int unsigned not null comment'积分上限',
	rate tinyint unsigned not null default 100 comment '折扣率,9折:90',
	primary key(id)
)engine=InnoDB default charset=utf8 comment'会员级别';

DROP TABLE IF EXISTS member_price;
CREATE TABLE member_price(
	id mediumint unsigned not null auto_increment,
	goods_id mediumint unsigned not null comment'商品id',
	level_id mediumint unsigned not null comment'级别id',
	price decimal(10,2) not null comment '会员级别价格',
	primary key(id)
)engine=InnoDB default charset=utf8 comment'会员级价格';

DROP TABLE IF EXISTS goods_pics
CREATE TABLE goods_pics(
	id mediumint unsigned not null auto_increment,
	goods_id mediumint unsigned not null comment'商品id',
	pic varchar(150) not null comment '图片',
	sm_pic varchar(150)  not null comment'缩略图',
	primary key(id)
)engine=InnoDB default charset=utf8 comment'商品图片';

DROP TABLE IF EXISTS goods_attr;
CREATE TABLE goods_attr(
	id int unsigned not null auto_increment,
	goods_id mediumint unsigned not null comment'商品id',
	attr_id mediumint unsigned not null comment '属性id',
	attr_value varchar(150) not null default '' comment'属性值',
	attr_price decimal(10,2) not null default 0  comment '属性价格',
	primary key(id),
	key goods_id(goods_id)
)engine=InnoDB default charset=utf8 comment'商品属性';


DROP TABLE IF EXISTS goods_rep
CREATE TABLE goods_rep(
	id int unsigned not null auto_increment,
	goods_id mediumint unsigned not null comment'商品id',
	goods_number int unsigned not null comment'库存量',
	goods_attr_id varchar(150) not null comment '商品属性ID: id保存goods_attr表中的id,通过id可知值是什么,属性是什么,多个id用，隔开并且升序存,前台到后台也有升序',
	primary key(id),
	key goods_id(goods_id)
)engine=InnoDB default charset=utf8 comment'商品库存';


DROP TABLE IF EXISTS num_price;
CREATE TABLE num_price(
	goods_id mediumint unsigned not null comment'商品id',
	num int unsigned not null comment'数量'，
	num_price decimal(10,2) not null comment '优惠价格',
	key goods(goods_id)
);

DROP TABLE IF EXISTS goods;
CREATE TABLE goods(
	id mediumint unsigned not null auto_increment,
	goods_name varchar(45) not null comment '商品名称',
	cat_id smallint unsigned not null comment'主分类id',
	brand_id smallint unsigned not null comment '品牌id',
	market_price decimal(10,2) not null default '0.00' comment '市场价',
	shop_price decimal(10,2) not null default '0.00' comment '本店价',
	integral int unsigned not null comment '积分',
	integral_price int unsigned not null default '0' comment '如果要用积分兑换,需要积分',
	exp int unsigned not null comment '经验',
	promote_price decimal(10,2) not null default '0' comment '促销价',
	promote_start_time int unsigned not null default '0' comment '促销开始时间',
	promote_end_time int unsigned not null default '0' comment '促销结束时间',
	logo varchar(150) not null default '' comment '商品logo',
	sm_logo varchar(150) not null default '' comment '商品缩略图',
	goods_desc longtext comment '商品描述',
	is_hot tinyint unsigned not null default '0' comment '是否热卖',
	is_new tinyint unsigned not null default '0' comment '是否新品',
	is_best tinyint unsigned not null default '0' comment '是否精品',
	is_on_sale tinyint unsigned not null default '1' comment '是否上架:1:上架 0:下架',
	seo_keyword varchar(150) not null default '1' comment 'seo_关键字',
	seo_description varchar(150) not null default '' comment 'seo_描述',
	type_id mediumint unsigned not null default '0' comment '商品类型id',
	sort_num tinyint unsigned not null  default '100' comment '排序数字',
	is_delete tinyint unsigned not null default '0' comment '是否删除,1:删除 0:未删除',
	addtime int unsigned not null comment '添加时间',
	primary key(id),
	key shop_price (shop_price),
	key cat_id (cat_id),
	key type_id (type_id),
	key brand_id(brand_id),
	key is_on_sale(is_on_sale),
	key is_hot (is_hot),
	key is_new(is_new),
	key is_best(is_best),
	key sort_num(sort_num),
	key promote_start_time(promote_start_time),
	key promote_end_time(promote_end_time),
	key is_delete(is_delete),
	key addtime(addtime)
)engine=InnoDB default charset=utf8 comment'商品';

DROP TABLE IF EXISTS brand;
CREATE TABLE brand(
	id smallint unsigned not null auto_increment,
	brand_name varchar(45) not null comment'品牌名',
	site_url varchar(150) not null comment'品牌位置地址',
	logo varchar(150) not null default '' comment '品牌logo',
	sm_logo varchar(150) not null default '' comment '缩略图',
	primary key(id)
)engine=InnoDB default charset=utf8 comment'品牌表';