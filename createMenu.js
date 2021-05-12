/**
 *
 * =================MENU CONFIG======================
 *
 * this javascript created to genarate SQL for Java
 *
 * ====================================================
 *
 */

const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const execSync = require('child_process').execSync //同步子进程
const resolve = (dir) => path.join(__dirname, dir)
const moment = require('moment')
// get the Git user name to trace who exported the SQL
const gitName = execSync('git show -s --format=%cn').toString().trim()
const md5 = require('md5')
// use md5 to generate id

/* =========GLOBAL CONFIG=========== */

// 导入路径
const INPUT_PATH = resolve('src/router/menu.json')
// 导出的文件目录位置
const OUTPUT_PATH = resolve('./menu.sql')
// 表名
const TABLE_NAME = 't_sys_menu'

/* =========GLOBAL CONFIG=========== */

function createSQL(data, name = '', pid, arr = []) {
    data.forEach(function (v, d) {
        if (v.children && v.children.length) {
            createSQL(v.children, name + '-' + v.name, v.id, arr)
        }
        arr.push({
            id: v.id || md5(v.name), // name is unique,so we can use name to generate id
            created_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            modified_at: moment().format('YYYY-MM-DD HH:mm:ss'),
            created_by: gitName,
            modified_by: gitName,
            version: 1,
            is_delete: false,
            code: (name + '-' + v.name).slice(1),
            name: v.name,
            title: v.title,
            icon: v.icon,
            path: v.path,
            sort: d + 1,
            parent_id: pid,
            type: v.type,
            component: v.component,
            redirect: v.redirect,
            // 以下几个参数没传都默认为false
            full_screen: v.fullScreen || false,
            hidden: v.hidden || false,
            no_cache: v.noCache || false
        })
    })
    return arr
}

fs.readFile(INPUT_PATH, 'utf-8', (err, data) => {
    if (err) chalk.red(err)
    const menuList = createSQL(JSON.parse(data))
    const sql = menuList
        .map((sql) => {
            let value = ''
            for (const v of Object.values(sql)) {
                value += ','
                if (v === true) {
                    value += 1
                } else if (v === false) {
                    value += 0
                } else {
                    value += v ? `'${v}'` : null
                }
            }
            return 'INSERT INTO `' + TABLE_NAME + '` VALUES (' + value.slice(1) + ')' + '\n'
        })
        .join(';')
    const mySQL =
        'DROP TABLE IF EXISTS `' +
        TABLE_NAME +
        '`;' +
        '\n' +
        'CREATE TABLE `' +
        TABLE_NAME +
        '` (' +
        '\n' +
        '`id` varchar(64) NOT NULL,' +
        '\n' +
        "`created_at` timestamp NULL DEFAULT NULL COMMENT '创建时间'," +
        '\n' +
        "`modified_at` timestamp NULL DEFAULT NULL COMMENT '更新时间'," +
        '\n' +
        "`created_by` varchar(64) DEFAULT NULL COMMENT '创建人'," +
        '\n' +
        "`modified_by` varchar(64) DEFAULT NULL COMMENT '更新人'," +
        '\n' +
        "`version` int(11) DEFAULT NULL COMMENT '版本（乐观锁）'," +
        '\n' +
        "`is_delete` int(11) DEFAULT NULL COMMENT '逻辑删除'," +
        '\n' +
        "`code` varchar(150) NOT NULL COMMENT '编码'," +
        '\n' +
        "`name` varchar(50) DEFAULT NULL COMMENT '名称'," +
        '\n' +
        "`title` varchar(50) DEFAULT NULL COMMENT '标题'," +
        '\n' +
        "`icon` varchar(50) DEFAULT NULL COMMENT '图标'," +
        '\n' +
        "`path` varchar(250) DEFAULT NULL COMMENT '路径'," +
        '\n' +
        "`sort` int(11) DEFAULT NULL COMMENT '排序'," +
        '\n' +
        "`parent_id` varchar(64) DEFAULT NULL COMMENT '父id'," +
        '\n' +
        "`type` char(10) DEFAULT NULL COMMENT '类型'," +
        '\n' +
        "`component` varchar(250) DEFAULT NULL COMMENT '组件路径'," +
        '\n' +
        "`redirect` varchar(250) DEFAULT NULL COMMENT '重定向路径'," +
        '\n' +
        "`full_screen` int(11) DEFAULT NULL COMMENT '全屏'," +
        '\n' +
        "`hidden` int(11) DEFAULT NULL COMMENT '隐藏'," +
        '\n' +
        "`no_cache` int(11) DEFAULT NULL COMMENT '缓存'," +
        '\n' +
        'PRIMARY KEY (`id`),' +
        '\n' +
        'UNIQUE KEY `code` (`code`) USING BTREE' +
        '\n' +
        ") ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='资源';" +
        '\n' +
        sql
    fs.writeFile(OUTPUT_PATH, mySQL, (err) => {
        if (err) return chalk.red(err)
        console.log(chalk.cyanBright(`恭喜你，创建sql语句成功，位置：${OUTPUT_PATH}`))
    })
})
