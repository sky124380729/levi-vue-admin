import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { registerGC } from './components'
import './utils/storage'

// mock
import './mock'

// auth
import './permission'

// Vite does not support partial import yet
import Antd from 'ant-design-vue'

// global less
import '/@/styles/index.less'

// create vue app
const app = createApp(App)
app.config.globalProperties.appName = 'Levi'

// mount
app.use(Antd).use(router).use(store).mount('#app')

// register global components
registerGC(app)
