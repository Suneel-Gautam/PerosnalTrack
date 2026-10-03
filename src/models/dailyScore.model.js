import mongoose from "mongoose";


const dailyScoreSchema = mongoose.Schema({

}, {
    timestamps: true
})


const DailyScore = mongoose.Model("DailyScore", dailyScoreSchema)