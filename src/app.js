import express from 'express'


const app = express()

app.get('/', (req, res) => {
    res.send("DailyTracker Backend runnningg")
})


export { app }