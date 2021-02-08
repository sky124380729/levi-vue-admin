import Mock from 'mockjs'

import { BASE_URL } from '/@/config'

import menu from '/@/router/menu.json'

Mock.setup({
    // timeout: 500
})

// 登录
Mock.mock(`${BASE_URL}/login`, 'post', function (req) {
    const { username, password } = JSON.parse(req.body)
    if (username === 'admin1' && password === '1234') {
        return {
            code: 0,
            data: {
                token: 'whosyourdaddy'
            },
            user: {
                username: 'levi'
            },
            success: true
        }
    }
    return {
        code: 9001,
        message: '登录失败',
        success: false
    }
})

// 数据字典
Mock.mock(`${BASE_URL}/sysDict/map`, 'get', function () {
    return {
        code: 0,
        data: {
            weixiu: {
                w01: '直振',
                w02: '圆振',
                w03: '直振控制器',
                w04: '圆振控制器'
            }
        },
        success: true
    }
})

// 用户列表
Mock.mock(`${BASE_URL}/user/list`, 'post', {
    code: 0,
    'data|10': [
        {
            'id|+1': 1,
            username: '@name',
            realName: '@cname',
            'userNo|1-100': 0,
            mobile: 18852992000,
            dept: '@word',
            note: '@csentence',
            email: '@email'
        }
    ],
    success: true
})

// 用户分页
Mock.mock(`${BASE_URL}/user/page`, 'post', {
    code: 0,
    data: {
        current: 1,
        pages: 4,
        'records|33': [
            {
                'id|+1': 1,
                username: '@name',
                realName: '@cname',
                'userNo|1-100': 0,
                mobile: 18852992000,
                dept: '@word',
                note: '@csentence',
                email: '@email'
            }
        ],
        size: 10,
        total: 33
    },
    success: true
})

// 用户查询
Mock.mock(new RegExp(BASE_URL + '/user/' + '.+'), 'get', {
    code: 0,
    data: {
        'id|+1': 1,
        username: '@name',
        realName: '@cname',
        'userNo|1-100': 0,
        mobile: 18852992000,
        dept: '@word',
        note: '@csentence',
        email: '@email'
    },
    success: true
})

// 用户删除
Mock.mock(new RegExp(BASE_URL + '/user/' + '.+'), 'delete', {
    code: 0,
    data: null,
    success: true
})

// 角色列表
Mock.mock(`${BASE_URL}/role/list`, 'post', {
    code: 0,
    'data|10': [
        {
            'id|+1': 1,
            roleName: '@word',
            note: '@csentence'
        }
    ],
    success: true
})

// 角色分页
Mock.mock(`${BASE_URL}/role/page`, 'post', {
    code: 0,
    data: {
        current: 1,
        pages: 1,
        'records|2': [
            {
                'id|+1': 1,
                roleName: '@word',
                note: '@csentence'
            }
        ],
        size: 10,
        total: 2
    },
    success: true
})

// 角色查询
Mock.mock(new RegExp(BASE_URL + '/role/' + '.+'), 'get', {
    code: 0,
    data: {
        'id|+1': 1,
        roleName: '@word',
        note: '@csentence'
    },
    success: true
})

// 用户删除
Mock.mock(new RegExp(BASE_URL + '/role/' + '.+'), 'delete', {
    code: 0,
    data: null,
    success: true
})

// 资源树
Mock.mock(`${BASE_URL}/menu/tree`, 'get', {
    code: 0,
    data: menu,
    success: true
})

// 角色绑定资源查询
Mock.mock(new RegExp(BASE_URL + '/roleMenu/roleId/' + '.+'), 'get', {
    code: 0,
    data: [],
    success: true
})

// 角色绑定资源提交
Mock.mock(new RegExp(BASE_URL + '/roleMenu/saveOrUpdate/' + '.+'), 'post', {
    code: 0,
    data: null,
    success: true
})

// 用户绑定角色查询
Mock.mock(new RegExp(BASE_URL + '/userRole/userId/' + '.+'), 'get', {
    code: 0,
    data: [],
    success: true
})

// 用户绑定角色提交
Mock.mock(new RegExp(BASE_URL + '/userRole/saveOrUpdate/' + '.+'), 'post', {
    code: 0,
    data: null,
    success: true
})
