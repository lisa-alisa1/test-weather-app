import './assets/main.scss'
import router from './router'
import { createPinia } from 'pinia'

const pinia = createPinia()

import { createApp } from 'vue'
import App from './App.vue'

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')

