import { Elysia } from 'elysia'
import { db } from './db'

new Elysia()
    .decorate('db', db)
    .listen(3000)
