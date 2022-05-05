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
import { TabsType, PluginsType } from './types'
let server = createServer({
    routes() {
        /* Adding some artificial delay. */
        this.timing = 500
        this.namespace = 'api'

        this.get('/tabs', () => {
            return db.data.tabs
        })

        this.get('/tabdata', (schema) => {
            return getDBTabs(schema)
        })

        /**
         * One Specific tab data can be fetched
         */
        this.get('/tabdata/:id', (schema, request) => {
            let id = request.params.id
            return {
                [id]: getDBTabs(schema)[id],
            }
        })

        /**
         * Updating specific one tab data
         */
        this.post('/tabdata/:id', (schema, request) => {
            // getting request param
            const reqParam = JSON.parse(request.requestBody)

            // getting data form db
            const tabdata = schema.db._collections.find(
                (el) => el.name === 'tabdata'
            )._records[0]

            const id = request.params.id

            /*
                Although, this functions need more structured checking for possible errors, 
                however, not going deep on that, as these are not the main priority of the challenge.
            */
            try {
                let value = reqParam.value
                /*  
                    Converting string to an string array , 
                    so that this end point can support 
                    both a single string and also array of strings
                */
                if (typeof value === 'string') value = [value]

                const type: 'active' | 'inactive' = reqParam.type

                const tab = tabdata[id]

                value.forEach((el) => {
                    // updating the value as needed (if exists)
                    if (!tab[type].includes(el)) {
                        tab[type].push(el)
                    }

                    // removing from the other type array (if exists)
                    // ? assuming, a same plugin can't exist in both active and inactive
                    const otherType = type === 'active' ? 'inactive' : 'active'
                    if (tab[otherType].includes(el)) {
                        tab[otherType] = tab[otherType].filter((item) => {
                            return item !== el
                        })
                    }
                })

                // returning the current status
                return {
                    [id]: tabdata[id],
                }
            } catch (err) {
                // Simple error through.
                // However, many more can be done, like custom error messages with reasons, custom error codes etc.
                return {
                    error: 'Something Went wrong',
                }
            }
        })

        this.post('/tabdata/disable/all', (schema, request) => {
            const reqParam = JSON.parse(request.requestBody)
            const tabdata: TabsType = getDBTabs(schema)

            try {
                const isEnable = reqParam.isEnable

                /**
                 *  Looping through all the tabs and updating their 'active', 'inactive' and 'disabled' array data.
                 */
                Object.values(tabdata).forEach((tab) => {
                    if (isEnable)
                        /**
                         *  Is user want it to be enabled,
                         *  removing plugins data from 'disabled' array that also belongs to 'active' and 'inactive' array
                         *  ? assuming: When all plugins enabled power button is clicked, previous state of disabled data should also be preserved.
                         */
                        tab.disabled = tab.disabled.filter((val) => {
                            return (
                                !tab.active.includes(val) &&
                                !tab.inactive.includes(val)
                            )
                        })
                    else {
                        /**
                         *  Is user want it to be disabled,
                         *  adding plugins data from 'active' and 'inactive' array to 'disabled' array.
                         */
                        tab.disabled = [
                            ...tab.disabled,
                            ...tab.active,
                            ...tab.inactive,
                        ]
                    }
                })
                return tabdata
            } catch (err) {
                // Simple error through. Can be done more.
                return {
                    error: 'Something Went wrong',
                }
            }
        })

        this.get('/plugins', (schema) => {
            return getDBPlugs(schema)
        })

        // helper functions --------------------------------

        /**
         *  As these were common code, extracted in one reusable function.
         *
         * @param schema miragejs basic data base reference
         * @returns All TabsType data form the data base
         */
        const getDBTabs = (schema): TabsType => {
            // getting data form db
            const tabData = schema.db._collections.find(
                (el) => el.name === 'tabdata'
            )._records[0]

            // Extra Id key gets added by "miragejs"
            // which is out of scope of this coding challenge,
            // hence handling it in a simple way.
            delete tabData.id

            return tabData
        }

        /**
         *  As these were common code, extracted in one reusable function.
         *
         * @param schema miragejs basic data base reference
         * @returns full plugin list of type PluginsType data form the data base
         */
        const getDBPlugs = (schema): PluginsType => {
            // getting data form db
            const pluginData = schema.db._collections.find(
                (el) => el.name === 'plugins'
            )._records[0]

            // Extra Id key gets added by "miragejs"
            // which is out of scope of this coding challenge,
            // hence handling it in a simple way.
            delete pluginData.id

            return pluginData
        }
    },
})

// loading json data into "miragejs" data base
server.db.loadData({
    tabdata: db.data.tabdata,
    plugins: db.data.plugins,
})
