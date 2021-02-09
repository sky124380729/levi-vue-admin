import Mock from 'mockjs'

import { API_MOCK } from '/@/config'

const modules = API_MOCK ? import.meta.globEager('./modules/*.ts') : []

console.log(modules)

Mock.setup({
    timeout: '100-300'
})
