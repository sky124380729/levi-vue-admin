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

// global less
import '/@/styles/index.less'

// create vue app
const app = createApp(App)
app.config.globalProperties.appName = 'Levi'

// register global components
registerGC(app)

// register directives
app.use(directives)

// mount
app.use(router).use(store).mount('#app')
