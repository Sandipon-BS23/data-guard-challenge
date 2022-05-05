import App from './App.vue'
import { createApp } from 'vue'

import router from './router'
import { createPinia } from 'pinia'

import './style/index.css'

const app = createApp(App)

app.use(router)
app.use(createPinia())

app.mount('#app')

// Mock Api ----------------------------------------------------------------

/* 
    Here I am using "miragejs" (link: https://miragejs.com/), API mocking library.
    Other options like "json-serve" can also be used. 
*/

import db from './mock/db.json'
import { createServer } from 'miragejs'

let server = createServer({
    routes() {
        /*
            Adding some artificial delay.
        */
        this.timing = 500
        this.namespace = 'api'

        this.get('/tabs', () => {
            return db.data.tabs
        })
        this.get('/tabdata', (schema) => {
            const data = schema.db._collections.find(
                (el) => el.name === 'tabdata'
            )._records[0]

            // Extra Id key was added by "miragejs" which is out of scope of this coding challenge, hence handling it in a simple way.
            const copiedData = JSON.parse(JSON.stringify(data))
            delete copiedData.id
            return copiedData
        })
        this.get('/tabdata/:id', (schema, request) => {
            const tabdata = schema.db._collections.find(
                (el) => el.name === 'tabdata'
            )._records[0]
            let id = request.params.id
            return {
                [id]: tabdata[id],
            }
        })
        this.post('/tabdata/:id', (schema, request) => {
            // getting request param
            const reqParam = JSON.parse(request.requestBody)

            // getting data form db
            const tabdata = schema.db._collections.find(
                (el) => el.name === 'tabdata'
            )._records[0]

            const id = request.params.id

            /*
                Although this functions need more structured checking for possible errors, not going deep here as this is not the main priority.
            */
            try {
                // extracting main needed values
                const value = reqParam.value
                const type = reqParam.type

                const tab = tabdata[id]

                // updating the value as needed (if exists)
                if (tab[type].includes(value)) {
                } else tab[type].push(value)

                // removing from the other type array (if exists)
                const otherType = type === 'active' ? 'inactive' : 'active'
                if (tab[otherType].includes(value)) {
                    tab[otherType] = tab[otherType].filter((item) => {
                        return item !== value
                    })
                }

                // returning the current status
                return {
                    [id]: tabdata[id],
                }
            } catch (err) {
                return {
                    error: 'Something Went wrong',
                }
            }
        })
        this.get('/plugins', (schema) => {
            const data = schema.db._collections.find(
                (el) => el.name === 'plugins'
            )._records[0]

            const copiedData = JSON.parse(JSON.stringify(data))
            delete copiedData.id
            // console.log('copiedData:', copiedData)
            return copiedData
        })
    },
})

server.db.loadData({
    tabdata: db.data.tabdata,
    plugins: db.data.plugins,
})
