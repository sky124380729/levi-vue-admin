import { createApp } from 'vue'
import App from './App'
import router from './router'
import store from './store'
import directives from './directives'
import Antd from 'ant-design-vue'
import { registerGC } from './components'

// mock
import './mock'

// auth
import './permission'

// global less
import '/@/styles/index.less'
import 'ant-design-vue/dist/antd.dark.css'

// create vue app
const app = createApp(App)
app.config.globalProperties.appName = 'Levi'

// register global components
registerGC(app)

// register directives
app.use(directives)

// register UI components
app.use(Antd)

// mount
app.use(router).use(store).mount('#app')
