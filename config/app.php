<?php
return array(
    "debug" => false,
    "namespaces" => array('zl'),
    "apps" => array( 'site', 'ext',"admin"),
    'siteHalt' => false,//网站维护
    'haltMsg' => '网站维护中，请稍后访问!',
    "isRewrite" => 0,
    "static_version" => "20140532",
    "salt" => "arwqw34453rgsdf",
    "public_path" => "public",
    "page_size"=>20,
    "rand_job"=>0.3,
    "super_admin"=>"admin@admin.com",
    "logger_path"=>ROOT_PATH."/data/logs",
    "db" => array(
        "host" => "",
        "user" => "",
        "port"=>"3306",
        "password" => "",
        "db_name" => "",
        "encode" => "",
        "prefix" => "",
        "auto_time" => true,
    ),
    "siteTitle" => "2tag",
    "siteName"=>"2tag",
    "siteUrl"=>"http://2tag.cn",
    "beian"=>"",
    "mail"=>array(
        "enable"=>false,
        "smtp"=>array(
            'host' => 'smtp.qq.com',
            'username' => '1234854444',
            'password' => 'xxxxx',
            'secure' => 'ssl',
            "port"=>"465",//578
            "timeout"=>"30",
        ),
        "sender"=>'qq <1234854444@qq.com>',
    ),
    'memcached' => 'localhost:11211',
    "arc_timeout"=>3600,
);
