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
    const habit = await Habit.find()
    res.status(200).json(new ApiReponse(
        200,
        habit,
        "Habit fetched Sucessfully!!"
    ))

})

const fetchUserHabit = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const habit = await Habit.find({
        userId
    })
    res.status(200).json(new ApiReponse(
        200,
        habit,
        "User Habit fetched sucessfully!!!"
    ))
})

const editHabit = asyncHandler(async (req, res) => {
    const id = req.params.id

    const habit = await Habit.findByIdAndUpdate(id,
        {
            $set: req.body
        },
        {
            new: true
        }
    )

    res.status(200).json(new ApiReponse(
        200,
        habit,
        "Habit edited Sucessfully"
    ))
})

const deleteHabit = asyncHandler(async (req, res) => {
    const id = req.params.id

    const habit = await Habit.findOneAndDelete(id)

    if (!habit) {
        throw new ApiError(404, "Habit not found!!!")
    }
    res.status(200).json(new ApiReponse(
        200,
        {},
        "Habit deleted Sucessfully!!"
    ))

})

export {
    createHabit,
    deleteHabit,
    editHabit,
    fetchAllHabits,
    fetchUserHabit
}
