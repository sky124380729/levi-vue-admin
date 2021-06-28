import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import directives from './directives'
import { registerGC } from './components'

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

// register directives
app.use(directives)

// mount
app.use(Antd).use(router).use(store).mount('#app')

// register global components
registerGC(app)
