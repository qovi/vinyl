import { Elysia, t } from 'elysia'
import { db } from './db'

const app = new Elysia({
    aot: true,
})
    .decorate('db', db)
    .get('/', ({ query }) => query, {
        query: t.Object({
            name: t.String()
        })
    })

    .listen(3000)

console.log(`Server is running on ${app.server?.url}`)