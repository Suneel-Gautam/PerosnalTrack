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
    trackingTypes: {
        type: String,
        enum: ["duration", "count", "quantity", "boolean"]
    },
    unit: {
        type: String,
    },
    frequency: {
        type: String,
        enum: ['Daily', "Weekly", "Custom"],
        default: 'Daily'
    },
    custom: {
        type: String,
        enum: ["S", "M", "T", "W", "T", "F", "S"]
    },
    date: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        required: true
    },
    visibility: {
        type: String,
        enum: ["private", "friends", "public"]
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