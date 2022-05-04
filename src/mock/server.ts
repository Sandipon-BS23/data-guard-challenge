import db from './db.json'
import { createServer } from 'miragejs'

let server = createServer({
    routes() {
        this.timing = 500
        this.namespace = 'api'
        this.get('/plugins', () => {
            return db.data.plugins
        })
        this.get('/tabs', () => {
            return db.data.tabs
        })
        this.get('/tabdata', () => {
            return db.data.tabdata
        })
        this.get('/tabdata/:id', (schema, request) => {
            let id = request.params.id
            return {
                [id]: db.data.tabdata[id],
            }
        })
        this.post('/tabdata/:id', (schema, request) => {
            // console.log('in post request:', request.requestBody)
            // console.log('in post schema:', schema.db)
            let id = request.params.id
            // console.log('in post id:', id)
            return {
                [id]: db.data.tabdata[id],
            }
        })
    },
})
server.db.loadData(db)

export default server
