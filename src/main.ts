/*
 * @Description  :
 * @Version      :
 * @Author       : ydw
 * @Date         : 2022-08-04 17:51:19
 * @LastEditors  : ydw
 * @LastEditTime : 2022-08-29 17:59:02
 */
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import FastClick from 'fastclick'
import router from '@/router'
import App from './App.vue'
import '@/router/permission'
import '@/assets/css/style.css'
import 'normalize.css'
new FastClick(document.body)
const app = createApp(App)

app.use(router).use(createPinia()).mount('#app')
