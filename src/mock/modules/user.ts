import Mock from 'mockjs'

const userTemp = {
    'id|+1': 1,
    username: '@name',
    realName: '@cname',
    'userNo|1-100': 0,
    mobile: 18852992000,
    dept: '@word',
    note: '@csentence',
    email: '@email'
}

// 用户列表
Mock.mock('user/list', 'post', {
    code: 0,
    'data|10': [userTemp],
    success: true
})

// 用户分页
Mock.mock('user/page', 'post', {
    code: 0,
    data: {
        current: 1,
        pages: 4,
        'records|33': [userTemp],
        size: 10,
        total: 33
    },
    success: true
})

// 用户查询
Mock.mock(/user\/.+/, 'get', {
    code: 0,
    data: userTemp,
    success: true
})

// 用户删除
Mock.mock(/user\/.+/, 'delete', {
    code: 0,
    data: null,
    success: true
})
