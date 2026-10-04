import mongoose from "mongoose";


const dailyScoreSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User"
    },
    habitId: {
        type: mongoose.Schema.ObjectId,
        ref: "Habit"
    },
    date: {
        type: String,
        required: true
    },
    actualDone: {
        type: String,
        required: true,
    },
    completed: {
        type: Boolean,
        required: true,
        default: false
    },
    note: {
        type: String,
    }

}, {
    timestamps: true
})


const DailyScore = mongoose.Model("DailyScore", dailyScoreSchema)