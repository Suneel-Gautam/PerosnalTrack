import mongoose from "mongoose";

const habitSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: mongoose.Schema.ObjectId,
        ref: "Category",
        required: true
    },
    target: {
        type: Number,
        required: true
    },
    unit: {
        type: String,
        required: true
    },
    frequency: {
        type: String,
        enum: ['Daily', "Weekly"]
    },
    date: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
    }

}, {
    timestamps: true
})

const Habit = mongoose.Model("Habit", habitSchema)

export default Habit