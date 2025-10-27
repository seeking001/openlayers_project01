import { createApp } from 'vue'
import App from './App.vue'
// 引入全局样式
import './style.css'

// 创建Vue应用实例并挂载到#app元素，createApp用于创建应用实例
const app = createApp(App)

app.mount('#app')