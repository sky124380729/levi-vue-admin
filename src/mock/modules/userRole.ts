import Mock from 'mockjs'

// 用户绑定角色查询
Mock.mock(/userRole\/userId\/.+/, 'get', {
    code: 0,
    data: [],
    success: true
})

// 用户绑定角色提交
Mock.mock(/userRole\/saveOrUpdate\/.+/, 'post', {
    code: 0,
    data: null,
    success: true
})
