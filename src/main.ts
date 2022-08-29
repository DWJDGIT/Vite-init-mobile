import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/css/style.css'
import 'normalize.css'
import App from './App.vue'

const app = createApp(App)

app.use(createPinia()).mount('#app')
