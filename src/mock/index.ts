import Mock from 'mockjs'

import { API_MOCK } from '/@/config'

Mock.setup({
    timeout: '0-200'
})

const modules: any = API_MOCK ? import.meta.globEager('./modules/*.ts') : []

const mockModules: any[] = []
Object.keys(modules).forEach((key) => {
    mockModules.push(...modules[key].default)
})

mockModules.forEach(({ url, method, t }) => {
    Mock.mock(url, method, t)
})
