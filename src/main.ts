import App from './App.vue'
import { createApp } from 'vue'

import router from './router'
import { createPinia } from 'pinia'

import './style/index.css'

import { makeServer } from './mock/server'
makeServer()

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')
