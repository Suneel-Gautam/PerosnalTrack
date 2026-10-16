import Habit from "../models/habit.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiReponse } from "../utils/ApiReponse.js";



const createHabit = asyncHandler(async (req, res) => {

    const userId = req.user._id;
    const { name, category, target, trackingTypes, unit, frequency, custom, date, isActive, visibility } = req.body

    const habit = await Habit.create({
        name,
        category,
        target,
        trackingTypes,
        unit,
        frequency,
        custom,
        date,
        isActive,
        visibility,
        userId
    })

    res.status(201).json(new ApiReponse(
        201,
        habit,
        "Habit Created Sucessfully!!!"
    ))

})

const fetchAllHabits = asyncHandler(async (req, res) => {

})
const fetchUserHabit = asyncHandler(async (req, res) => {

})
const editHabit = asyncHandler(async (req, res) => {

})
const deleteHabit = asyncHandler(async (req, res) => {

})

export {
    createHabit
}
