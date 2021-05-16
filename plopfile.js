const promptDirectory = require('inquirer-directory')
const pageGenerator = require('./template/page/prompt')
const apisGenerator = require('./template/apis/prompt')
module.exports = function (plop) {
    plop.setPrompt('directory', promptDirectory)
    plop.setGenerator('page', pageGenerator)
    plop.setGenerator('apis', apisGenerator)
}
