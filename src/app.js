import express from 'express'
import cors from "cors"
import { handleError } from './middlewares/error.middleware.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use(handleError)

app.get('/', (req, res) => {
    res.send("DailyTracker Backend runnningg")
})

export { app }