import { defineConfig } from 'vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import pkg from './package.json'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueJSx from '@vitejs/plugin-vue-jsx'
const pathResolve = (dir: string) => resolve(__dirname, '.', dir)
const { dependencies, devDependencies, name, version } = pkg
import moment from 'moment'
const __APP_INFO__ = {
    pkg: { dependencies, devDependencies, name, version },
    lastBuildTime: moment().format('YYYY-MM-DD HH:mm:ss')
}
const viteConfig = defineConfig({
    // the key **must start and end with a slash**
    resolve: {
        alias: {
            '/@': pathResolve('./src'),
            '/imgs': pathResolve('./src/assets/images'),
            '/apis': pathResolve('./src/apis/modules')
        }
    },
    base: '/',
    define: {
        __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    envDir: pathResolve('./env'),
    css: {
        preprocessorOptions: {
            less: {
                // modifyVars: {
                //   // reference:  Avoid repeated references
                //   hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
                //   ...modifyVars,
                // },
                javascriptEnabled: true
            }
        }
    },
    server: {
        host: true,
        port: 3399,
        open: true
    },
    optimizeDeps: {
        include: ['@ant-design/icons-vue', 'ant-design-vue/es/locale/zh_CN', 'ant-design-vue/es/locale/en_US']
    },
    plugins: [vue(), vueJSx(), PurgeIcons()]
})

export default viteConfig
