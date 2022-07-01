import dotenv from 'dotenv'
import express from 'express'
import { createServer } from '@graphql-yoga/node'
import cors from 'cors'
import mongoose from 'mongoose'

import schema from './schema/schema.js'

dotenv.config()

const { PORT, MONGO_DB_LINK } = process.env

const app = express()
app.use(cors())
app.use('/graphql', createServer({
    schema,
}))

const run = async () => {
    await mongoose.connect(MONGO_DB_LINK, { dbName: 'graph' })
    app.listen(PORT, () => console.log(`START ON ${PORT}`))
}
run()