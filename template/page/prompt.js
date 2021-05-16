const { notEmpty } = require('../utils.js')

const path = require('path')

module.exports = {
    description: 'generate vue template',
    prompts: [
        {
            type: 'directory',
            name: 'from',
            message: 'Please select the file storage address',
            basePath: path.join(__dirname, '../../src/views')
        },
        {
            type: 'input',
            name: 'fileName',
            message: 'file name',
            validate: notEmpty('fileName')
        },
        {
            type: 'input',
            name: 'name',
            message: 'name',
            validate: notEmpty('name')
        }
    ],
    actions: data => {
        const { fileName, name, from } = data
        const filePath = path.join('src/views', from, fileName + '.vue')
        const actions = [
            {
                type: 'add',
                path: filePath,
                templateFile: 'template/page/index.hbs',
                data: { name }
            }
        ]
        return actions
    }
}
