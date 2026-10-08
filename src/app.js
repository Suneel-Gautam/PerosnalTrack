import express from 'express'
import cors from "cors"
import { handleError } from './middlewares/error.middleware.js'
import authUser from './routes/auth.route.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use(handleError)


//import user route
import authUser from './routes/auth.route.js'
app.use('/v2/api/auth', authUser)

app.get('/', (req, res) => {
    res.send("DailyTracker Backend runnningg")
})

export { app }