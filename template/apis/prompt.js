const { notEmpty } = require('../utils.js')

const path = require('path')

// 斜杠转驼峰
function toCamel(str) {
    return str.replace(/(.*)\/(\w)(.*)/g, function (_, $1, $2, $3) {
        return $1 + $2.toUpperCase() + $3
    })
}
// 选项框
const choices = ['create', 'update', 'get', 'delete', 'check', 'fetchList', 'fetchPage'].map((type) => ({
    name: type,
    value: type,
    checked: true
}))

module.exports = {
    description: 'generate api template',
    prompts: [
        {
            type: 'directory',
            name: 'from',
            message: 'Please select the file storage address',
            basePath: path.join(__dirname, '../../src/apis')
        },
        {
            type: 'input',
            name: 'name',
            message: 'api name',
            validate: notEmpty('name')
        },
        {
            type: 'checkbox',
            name: 'types',
            message: 'api types',
            choices
        }
    ],
    actions: (data) => {
        const { from, name, types } = data
        const actions = [
            {
                type: 'add',
                path: path.join('src/apis', from, toCamel(name) + '.ts'),
                templateFile: 'template/apis/index.hbs',
                data: {
                    name,
                    create: types.includes('create'),
                    update: types.includes('update'),
                    get: types.includes('get'),
                    check: types.includes('check'),
                    delete: types.includes('delete'),
                    fetchList: types.includes('fetchList'),
                    fetchPage: types.includes('fetchPage')
                }
            }
        ]

        return actions
    }
}
