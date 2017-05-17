-- phpMyAdmin SQL Dump
-- version 4.5.2
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 2017-05-13 17:28:19
-- 服务器版本： 5.7.9
-- PHP Version: 7.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eshop`
--

-- --------------------------------------------------------

--
-- 表的结构 `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_name` varchar(32) NOT NULL COMMENT '管理员账号',
  `admin_nick` varchar(32) NOT NULL COMMENT '管理员名称',
  `password` char(32) NOT NULL COMMENT '密码',
  `icon` varchar(128) NOT NULL DEFAULT 'Admin/Icon/default.jpg' COMMENT '头像',
  `tel` bigint(11) UNSIGNED NOT NULL COMMENT '手机号码',
  `email` varchar(128) NOT NULL COMMENT '电子邮箱',
  `is_use` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否启用  1:启用 0:禁用',
  `addtime` int(10) UNSIGNED NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `admin_name` (`admin_name`),
  UNIQUE KEY `tel` (`tel`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COMMENT='管理员表';

--
-- 转存表中的数据 `admin`
--

INSERT INTO `admin` (`id`, `admin_name`, `admin_nick`, `password`, `icon`, `tel`, `email`, `is_use`, `addtime`) VALUES
(1, 'root', 'root', 'a12f9de30f257a8dba24770b8824f4f3', 'Admin/Icon/default.jpg', 13000000000, 'root@root.com', 1, 1494405571),
(2, 'xiaofeilin', '小肥林', '123456', 'Admin/Icon/default.jpg', 13071422017, '363209741@qq.com', 1, 0),
(3, 'z123456', '测试3号', '123456', 'Admin/Icon/2017-05-11/591478bac0329.jpg', 10293847564, '123@qq.com', 1, 1494428009),
(4, 'asddsadsa', '参数2', '123123', 'Admin/Icon/2017-05-12/591503f368e16.png', 32132132121, '321321@qq.com', 1, 1494430709),
(5, 'dsa321321321', '321321321', '123123', 'Admin/Icon/default.jpg', 32132165432, '132654987@qq.com', 0, 1494430746),
(6, 'vcxjhg321', '321654098', '123123', 'Admin/Icon/default.jpg', 76543287623, '123123@qq.com', 0, 1494430775),
(7, 'dsagfkjhewqhytriuy', 'dsa1432765', '123456', 'Admin/Icon/default.jpg', 13257609865, '213546@qq.cn', 0, 1494464383),
(8, 'xzczx21343254', '测试员666', '123456', 'Admin/Icon/default.jpg', 13563365443, '432hgft@qq.com', 0, 1494514093);

-- --------------------------------------------------------

--
-- 表的结构 `admin_msg`
--

DROP TABLE IF EXISTS `admin_msg`;
CREATE TABLE IF NOT EXISTS `admin_msg` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) UNSIGNED NOT NULL COMMENT '管理员id',
  `title` varchar(64) NOT NULL COMMENT '留言标题',
  `msg` longtext NOT NULL COMMENT '留言内容',
  `addtime` int(10) UNSIGNED NOT NULL COMMENT '添加时间',
  `keep` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '保留时间 0:7天 1:永久',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员留言表';

-- --------------------------------------------------------

--
-- 表的结构 `admin_pri`
--

DROP TABLE IF EXISTS `admin_pri`;
CREATE TABLE IF NOT EXISTS `admin_pri` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) UNSIGNED NOT NULL COMMENT '管理员id',
  `pri_id` int(10) UNSIGNED NOT NULL COMMENT '权限id',
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `role_id` (`pri_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员权限关联表';

-- --------------------------------------------------------

--
-- 表的结构 `admin_role`
--

DROP TABLE IF EXISTS `admin_role`;
CREATE TABLE IF NOT EXISTS `admin_role` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `admin_id` int(10) UNSIGNED NOT NULL COMMENT '管理员id',
  `role_id` int(10) UNSIGNED NOT NULL COMMENT '角色id',
  PRIMARY KEY (`id`),
  KEY `admin_id` (`admin_id`),
  KEY `role_id` (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='管理员角色关联表';

-- --------------------------------------------------------

--
-- 表的结构 `attr`
--

DROP TABLE IF EXISTS `attr`;
CREATE TABLE IF NOT EXISTS `attr` (
  `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `attr_name` varchar(30) NOT NULL COMMENT '属性名',
  `attr_type` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '属性的类型 0:唯一,1:可选',
  `attr_option_values` varchar(150) NOT NULL DEFAULT '' COMMENT '属性的可选值,多个可选值用，隔开',
  `type_id` tinyint(3) UNSIGNED NOT NULL COMMENT '类型id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='属性';

-- --------------------------------------------------------

--
-- 表的结构 `brand`
--

DROP TABLE IF EXISTS `brand`;
CREATE TABLE IF NOT EXISTS `brand` (
  `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(45) NOT NULL COMMENT '品牌名',
  `site_url` varchar(150) NOT NULL COMMENT '品牌位置网址',
  `logo` varchar(150) NOT NULL DEFAULT '' COMMENT '品牌logo',
  `sm_logo` varchar(150) NOT NULL DEFAULT '' COMMENT '缩略图',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COMMENT='品牌表';

--
-- 转存表中的数据 `brand`
--

INSERT INTO `brand` (`id`, `brand_name`, `site_url`, `logo`, `sm_logo`) VALUES
(3, '百度', 'www.baidu.com', 'Brand/2017-05-10/59127021db08a.png', 'Brand/2017-05-10/sm_59127021db08a.png'),
(4, '小米', 'www.xiao.com', 'Brand/2017-05-10/5912806aea804.jpg', 'Brand/2017-05-10/sm_5912806aea804.jpg'),
(5, '魅族', 'www.mz.com', 'Brand/2017-05-10/5913075347372.jpg', 'Brand/2017-05-10/sm_5913075347372.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `cat`
--

DROP TABLE IF EXISTS `cat`;
CREATE TABLE IF NOT EXISTS `cat` (
  `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(30) NOT NULL COMMENT '分类名称',
  `parent_id` smallint(5) UNSIGNED NOT NULL DEFAULT '0' COMMENT '父级分类',
  `cat_path` varchar(32) NOT NULL DEFAULT '0' COMMENT '分类路径',
  `cat_desc` varchar(128) NOT NULL DEFAULT '' COMMENT '分类描述',
  `is_show` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否显示 1:显示，0:不显示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='商品类型';

--
-- 转存表中的数据 `cat`
--

INSERT INTO `cat` (`id`, `cat_name`, `parent_id`, `cat_path`, `cat_desc`, `is_show`) VALUES
(1, '手机1', 0, '0', '手机1', 1),
(2, '百度', 1, '0,1', '', 0),
(3, 'dwadwa', 2, '0,1,2', '', 0);

-- --------------------------------------------------------

--
-- 表的结构 `goods`
--

DROP TABLE IF EXISTS `goods`;
CREATE TABLE IF NOT EXISTS `goods` (
  `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `goods_name` varchar(45) NOT NULL COMMENT '商品名称',
  `cat_id` smallint(5) UNSIGNED NOT NULL COMMENT '主分类id',
  `brand_id` smallint(5) UNSIGNED NOT NULL COMMENT '品牌id',
  `market_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '市场价',
  `shop_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '本店价',
  `integral` int(10) UNSIGNED NOT NULL COMMENT '积分',
  `integral_price` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '如果要用积分兑换,需要积分',
  `exp` int(10) UNSIGNED NOT NULL COMMENT '经验',
  `is_sale` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否促销0：不促销，1:促销',
  `promote_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '促销价',
  `promote_start_time` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '促销开始时间',
  `promote_end_time` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '促销结束时间',
  `logo` varchar(150) NOT NULL DEFAULT '' COMMENT '商品logo',
  `sm_logo` varchar(150) NOT NULL DEFAULT '' COMMENT '商品缩略图',
  `goods_desc` longtext COMMENT '商品描述',
  `is_hot` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否热卖',
  `is_new` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否新品',
  `is_best` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否精品',
  `is_on_sale` tinyint(3) UNSIGNED NOT NULL DEFAULT '1' COMMENT '是否上架:1:上架 0:下架',
  `seo_keyword` varchar(150) NOT NULL DEFAULT '1' COMMENT 'seo_关键字',
  `seo_description` varchar(150) NOT NULL DEFAULT '' COMMENT 'seo_描述',
  `type_id` mediumint(8) UNSIGNED NOT NULL DEFAULT '0' COMMENT '商品类型id',
  `sort_num` tinyint(3) UNSIGNED NOT NULL DEFAULT '100' COMMENT '排序数字',
  `is_delete` tinyint(3) UNSIGNED NOT NULL DEFAULT '0' COMMENT '是否删除,1:删除 0:未删除',
  `addtime` int(10) UNSIGNED NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  KEY `shop_price` (`shop_price`),
  KEY `cat_id` (`cat_id`),
  KEY `type_id` (`type_id`),
  KEY `brand_id` (`brand_id`),
  KEY `is_on_sale` (`is_on_sale`),
  KEY `is_hot` (`is_hot`),
  KEY `is_new` (`is_new`),
  KEY `is_best` (`is_best`),
  KEY `sort_num` (`sort_num`),
  KEY `promote_start_time` (`promote_start_time`),
  KEY `promote_end_time` (`promote_end_time`),
  KEY `is_delete` (`is_delete`),
  KEY `addtime` (`addtime`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COMMENT='商品';

--
-- 转存表中的数据 `goods`
--

INSERT INTO `goods` (`id`, `goods_name`, `cat_id`, `brand_id`, `market_price`, `shop_price`, `integral`, `integral_price`, `exp`, `is_sale`, `promote_price`, `promote_start_time`, `promote_end_time`, `logo`, `sm_logo`, `goods_desc`, `is_hot`, `is_new`, `is_best`, `is_on_sale`, `seo_keyword`, `seo_description`, `type_id`, `sort_num`, `is_delete`, `addtime`) VALUES
(1, '小米', 3, 4, '100.00', '100.00', 100, 0, 100, 1, '0.00', 1494345601, 1494431999, 'Goods/2017-05-10/5913049ce9e20.jpg', 'Goods/2017-05-10/sm_5913049ce9e20.jpg', NULL, 0, 1, 0, 0, '雷军', '雷军', 0, 100, 0, 1494418588),
(2, 'ergg', 3, 3, '100.00', '80.00', 20, 0, 20, 1, '0.00', 0, 0, 'Goods/2017-05-10/591304e35ebad.gif', 'Goods/2017-05-10/sm_591304e35ebad.gif', '&lt;p&gt;&lt;img src=&quot;/ueditor/php/upload/image/20170510/1494418656918212.jpg&quot; title=&quot;1494418656918212.jpg&quot; alt=&quot;bj.jpg&quot;/&gt;&lt;/p&gt;', 1, 0, 0, 0, '100', '100', 0, 100, 1, 1494418659),
(3, 'hongmi', 3, 4, '120.00', '60.00', 60, 0, 60, 1, '0.00', 0, 0, 'Goods/2017-05-10/59130613e0b6f.gif', 'Goods/2017-05-10/sm_59130613e0b6f.gif', '&lt;p&gt;1231313&lt;/p&gt;', 0, 1, 1, 0, '10', '10', 2, 100, 1, 1494418963),
(4, 'hongmi', 3, 4, '120.00', '60.00', 60, 0, 60, 1, '0.00', 0, 0, 'Goods/2017-05-10/59130623cea06.gif', 'Goods/2017-05-10/sm_59130623cea06.gif', '&lt;p&gt;1231313&lt;/p&gt;', 1, 1, 1, 0, '10', '10', 2, 100, 0, 1494418979),
(5, 'mz5', 3, 5, '200.00', '120.00', 30, 0, 30, 1, '0.00', 0, 0, 'Goods/2017-05-10/591307aaca909.png', 'Goods/2017-05-10/sm_591307aaca909.png', '&lt;p&gt;23&lt;/p&gt;', 1, 0, 1, 0, '130', '302', 3, 13, 0, 1494419370),
(6, 'sppp', 3, 5, '300.00', '300.00', 30, 0, 3, 1, '0.00', 1970, 1970, 'Goods/2017-05-11/59147c26654c8.jpg', 'Goods/2017-05-11/sm_59147c26654c8.jpg', '<p>&lt;p&gt;3333&lt;/p&gt;</p>', 1, 1, 1, 1, '333', '333', 0, 33, 0, 1494420399),
(7, 'gg', 3, 4, '33.00', '33.00', 33, 0, 33, 0, '0.00', 0, 0, 'Goods/2017-05-10/5913122bcdef4.jpg', 'Goods/2017-05-10/sm_5913122bcdef4.jpg', '&lt;p&gt;333&lt;/p&gt;', 1, 1, 1, 0, '33', '33', 2, 33, 1, 1494422059);

-- --------------------------------------------------------

--
-- 表的结构 `goods_attr`
--

DROP TABLE IF EXISTS `goods_attr`;
CREATE TABLE IF NOT EXISTS `goods_attr` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) UNSIGNED NOT NULL COMMENT '商品id',
  `attr_id` mediumint(8) UNSIGNED NOT NULL COMMENT '属性id',
  `attr_value` varchar(150) NOT NULL DEFAULT '' COMMENT '属性值',
  `attr_price` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '属性价格',
  PRIMARY KEY (`id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='商品属性';

--
-- 转存表中的数据 `goods_attr`
--

INSERT INTO `goods_attr` (`id`, `goods_id`, `attr_id`, `attr_value`, `attr_price`) VALUES
(1, 4, 2, '123', '0.00'),
(2, 4, 3, '321', '0.00'),
(3, 4, 4, '456', '0.00'),
(4, 5, 7, 'xll', '33.00'),
(5, 5, 7, 'xx', '23.00'),
(6, 6, 7, 'xll', '0.00');

-- --------------------------------------------------------

--
-- 表的结构 `goods_pics`
--

DROP TABLE IF EXISTS `goods_pics`;
CREATE TABLE IF NOT EXISTS `goods_pics` (
  `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) UNSIGNED NOT NULL COMMENT '商品id',
  `pic` varchar(150) NOT NULL COMMENT '图片',
  `sm_pic` varchar(150) NOT NULL COMMENT '缩略图',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='商品图片';

--
-- 转存表中的数据 `goods_pics`
--

INSERT INTO `goods_pics` (`id`, `goods_id`, `pic`, `sm_pic`) VALUES
(1, 6, 'Goods/2017-05-10/59130baff34da.jpg', 'Goods/2017-05-10/sm_59130baff34da.jpg'),
(2, 6, 'Goods/2017-05-10/59130bb04e44c.jpg', 'Goods/2017-05-10/sm_59130bb04e44c.jpg'),
(3, 7, 'Goods/2017-05-10/5913122c1a7eb.jpg', 'Goods/2017-05-10/sm_5913122c1a7eb.jpg');

-- --------------------------------------------------------

--
-- 表的结构 `member_level`
--

DROP TABLE IF EXISTS `member_level`;
CREATE TABLE IF NOT EXISTS `member_level` (
  `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `level_name` varchar(30) NOT NULL COMMENT '级别名称',
  `bottom_num` int(10) UNSIGNED NOT NULL COMMENT '积分下限',
  `top_num` int(10) UNSIGNED NOT NULL COMMENT '积分上限',
  `rate` tinyint(3) UNSIGNED NOT NULL DEFAULT '100' COMMENT '折扣率,9折:90',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='会员级别';

-- --------------------------------------------------------

--
-- 表的结构 `member_price`
--

DROP TABLE IF EXISTS `member_price`;
CREATE TABLE IF NOT EXISTS `member_price` (
  `id` mediumint(8) UNSIGNED NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) UNSIGNED NOT NULL COMMENT '商品id',
  `level_id` mediumint(8) UNSIGNED NOT NULL COMMENT '级别id',
  `price` decimal(10,2) NOT NULL COMMENT '会员级别价格',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COMMENT='会员级价格';

--
-- 转存表中的数据 `member_price`
--

INSERT INTO `member_price` (`id`, `goods_id`, `level_id`, `price`) VALUES
(1, 5, 1, '30.00'),
(2, 5, 3, '45.00'),
(3, 5, 4, '50.00'),
(4, 6, 1, '33.00'),
(5, 6, 3, '3.00'),
(6, 6, 4, '1.00'),
(7, 7, 1, '22.00'),
(8, 7, 3, '22.00'),
(9, 7, 4, '22.00');

-- --------------------------------------------------------

--
-- 表的结构 `module`
--

DROP TABLE IF EXISTS `module`;
CREATE TABLE IF NOT EXISTS `module` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL COMMENT '名称',
  `app` varchar(45) DEFAULT NULL COMMENT '项目',
  `group` varchar(45) DEFAULT NULL COMMENT '分组',
  `module` varchar(45) DEFAULT NULL COMMENT '模块',
  `function` varchar(45) DEFAULT NULL COMMENT '方法',
  `status` varchar(45) DEFAULT NULL COMMENT '状态',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='module表';

-- --------------------------------------------------------

--
-- 表的结构 `privilege`
--

DROP TABLE IF EXISTS `privilege`;
CREATE TABLE IF NOT EXISTS `privilege` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `pri_name` varchar(32) NOT NULL COMMENT '权限名称',
  `moduel_name` varchar(32) NOT NULL COMMENT '模块名称',
  `controller_name` varchar(32) NOT NULL COMMENT '控制器名称',
  `action_name` varchar(32) NOT NULL COMMENT '方法名称',
  `parent_id` int(10) UNSIGNED NOT NULL DEFAULT '0' COMMENT '父级id,0为顶级',
  `pri_path` varchar(32) NOT NULL DEFAULT '0' COMMENT '权限路径',
  `addtime` int(10) UNSIGNED NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `pri_name` (`pri_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COMMENT='权限表';

--
-- 转存表中的数据 `privilege`
--

INSERT INTO `privilege` (`id`, `pri_name`, `moduel_name`, `controller_name`, `action_name`, `parent_id`, `pri_path`, `addtime`) VALUES
(1, 'Admin权限', 'Admin', 'Admin', 'All', 0, '0', 1494405571),
(2, 'Admin查看权限', 'Admin', 'Admin', 'List', 1, '0,1', 1494405571),
(3, 'Admin添加权限', 'Admin', 'Admin', 'Add', 1, '0,1', 1494405571);

-- --------------------------------------------------------

--
-- 表的结构 `role`
--

DROP TABLE IF EXISTS `role`;
CREATE TABLE IF NOT EXISTS `role` (
  `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `role_name` varchar(32) NOT NULL COMMENT '角色名称',
  `addtime` int(10) UNSIGNED NOT NULL COMMENT '添加时间',
  PRIMARY KEY (`id`),
  UNIQUE KEY `role_name` (`role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COMMENT='角色表';

--
-- 转存表中的数据 `role`
--

INSERT INTO `role` (`id`, `role_name`, `addtime`) VALUES
(1, '测试权限', 1494405571),
(3, '男主角', 1494552937),
(4, '女主角', 1494552957);

-- --------------------------------------------------------

--
-- 表的结构 `type`
--

DROP TABLE IF EXISTS `type`;
CREATE TABLE IF NOT EXISTS `type` (
  `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT,
  `type_name` varchar(30) NOT NULL COMMENT '类型名称',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COMMENT='商品类型';

--
-- 转存表中的数据 `type`
--

INSERT INTO `type` (`id`, `type_name`) VALUES
(1, '不知道');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
