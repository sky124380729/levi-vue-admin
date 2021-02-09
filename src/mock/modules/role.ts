import Mock from 'mockjs'

const roleTemp = {
    'id|+1': 1,
    roleName: '@word',
    note: '@csentence'
}

// 角色列表
Mock.mock('role/list', 'post', {
    code: 0,
    'data|10': [roleTemp],
    success: true
})

// 角色分页
Mock.mock('role/page', 'post', {
    code: 0,
    data: {
        current: 1,
        pages: 1,
        'records|2': [roleTemp],
        size: 10,
        total: 2
    },
    success: true
})

// 角色查询
Mock.mock(/role\/.+/, 'get', {
    code: 0,
    data: roleTemp,
    success: true
})

// 用户删除
Mock.mock(/role\/.+/, 'delete', {
    code: 0,
    data: null,
    success: true
})
