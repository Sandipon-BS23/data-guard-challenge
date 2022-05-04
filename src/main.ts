import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import './style/index.css'

import { Server } from 'miragejs'

new Server({
    routes() {
        this.get('/api/todos', () => {
            return [
                {
                    name: 'todo1',
                },
                {
                    name: 'todo2',
                },
            ]
        })
    },
})

createApp(App).use(router).mount('#app')
