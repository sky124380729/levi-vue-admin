import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import { setApp } from '/@/useApp'
import 'bootstrap/dist/css/bootstrap.min.css'

// auth
import './permission'

// Vite does not support partial import yet
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// global less
import '/@/styles/index.less'

// create vue app
const app = createApp(App)
app.config.globalProperties.appName = 'Levi'

// mount
app.use(Antd).use(router).use(store).mount('#app')

// Used to share app instances in other modules
setApp(app)

// register global components
