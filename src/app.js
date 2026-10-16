import express from 'express'
import cors from "cors"
import { handleError } from './middlewares/error.middleware.js'


const app = express()
app.use(express.json())
app.use(cors())
app.use(handleError)


//import route
import authRoute from './routes/auth.route.js'
import categoryRoute from './routes/category.route.js'

app.use('/v2/api/auth', authRoute)
app.use('/v2/api/category', categoryRoute)


app.get('/', (req, res) => {
    res.send("DailyTracker Backend runnningg")
})

export { app }