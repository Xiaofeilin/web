
drop table if exists `user`;
create table `user`(
	`id` int unsigned not null primary key auto_increment comment 'id',
	`account` varchar(32) not null unique comment '账户 用于登录所以唯一',
	`username` varchar(32) comment '用户名',
	`realname` varchar(32) comment '真实姓名',
	`pwd` varchar(32) not null comment '密码',
	`tel` char(11) not null unique comment '电话 也可用于登录所以唯一',
	`email` varchar(32) comment '邮箱', 
	`age` int not null default 0 comment '年龄 0为保密',
	`birthdate` int unsigned not null default 0 comment '出生日期 0为保密',
	`sex`  tinyint unsigned default 2 comment '性别 0女，1男，2保密',
	`icon` varchar(255) default 'default.jpg' comment '头像',
	`sm_icon` varchar(255) default 'default.jpg' comment '缩略图';
	`regtime` int unsigned not null comment '注册时间',
	`lastregtime` int unsigned not null default 0 comment '最后一次登录时间',
	`errorlogin` tinyint unsigned default 0 comment '登录失败次数',
	`errortime` int unsigned comment '最后一次登录失败的时间',
	`status` tinyint unsigned default 1 comment '用户状态 0禁用，1启用',
	`credit` int unsigned default 0 comment '用户积分',
	`exp` int unsigned default 0 comment '用户经验',
	`level` int unsigned default 0 comment '用户等级',
	key username(username),
	key tel(tel),
	key email(email),
	key regtime(regtime),
	key lastregtime(lastregtime),
	key status(status),
	key level(level),
	key credit(credit)
)engine=innodb default charset=utf8;


alter table `user` add `account` varchar(32) not null unique comment '账户 用于登录所以唯一';

alter table `user` add `birthdate` int unsigned not null default 0 comment '出生日期 0为保密';

alter table `user` modity `tel` char(11) not null unique comment '电话 也可用于登录所以唯一';

alter table `user` modity `username` varchar(32) comment '用户名';

alter table `user` add `realname` varchar(32) comment '真实姓名';


alter table `user` add `icon` varchar(255) default 'default.jpg' comment '头像';

/*alter table `user` add `usernum` varchar(255) unsigned unique not null comment '用户编号';*/


drop table if exists `address`;
create table `address`(
	`id` int unsigned not null primary key auto_increment comment 'id',
	`uid` int unsigned not null comment '用户id',
	`name` varchar(32) not null comment '收货人',
	`tel` char(11) not null unique comment '联系电话',
	`province` varchar(32) not null comment '省份',
	`city` varchar(32) not null comment '城市',
	`street` varchar(32) not null comment '区/县',
	`detailed` varchar(255) not null comment '详细地址',
	`status` tinyint unsigned default 0 comment '默认状态 0否 1是'
)engine=innodb default charset=utf8;

alter table `address` add `status` tinyint unsigned default 0 comment '默认状态 0否 1是';