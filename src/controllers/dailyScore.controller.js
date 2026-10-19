import { ApiError } from "../utils/ApiError.js";
import { ApiReponse } from "../utils/ApiReponse";
import DailyScore from "../models/dailyScore.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";


const createDailyScore = asyncHandler(async (req, res) => {

    const userId = req.user._id
    const { habitId, actualDone, completed, note } = req.body

    const date = Date.now()

    const dailyScore = await DailyScore.create({
        habitId,
        actualDone,
        completed,
        note,
        userId,
        date
    })

    res.status(201).json(new ApiReponse(
        201,
        dailyScore,
        "DailyScore create successfully!!"
    ))
})

const editDailyScore = asyncHandler(async (req, res) => {
    const id = req.params.id

    const dailyScore = await DailyScore.findByIdAndUpdate(id,
        {
            $set: req.body
        },
        {
            new: true
        }
    )
    if (!dailyScore) {
        throw new ApiError(
            404,
            "dailyscore not found!!!"
        )
    }
    res.status(200).json(new ApiReponse(
        200,
        dailyScore,
        "DailyScore edited Successfully!!"
    ))

})

const deleteDailyScore = asyncHandler(async (req, res) => {
    const id = req.params.id

    const dailyScore = await DailyScore.findOneAndDelete(id)

    if (!dailyScore) {
        throw new ApiError(
            404,
            "DailyScore deleted!!!"
        )
    }
    res.status(200).json(new ApiReponse(
        200,
        {},
        "DailyScore Deleted Sucessfullly!!"
    ))

})

const fetchAllDailyScore = asyncHandler(async (req, res) => {

    const dailyScore = await DailyScore.find()

    res.status(200).json(new ApiReponse(
        200,
        dailyScore,
        "DailyScore fetched sucessfully!!"
    ))

})

const fetchUserdailyScore = asyncHandler(async (req, res) => {
    const userId = req.user._id

    const dailyScore = await DailyScore.find({
        userId
    })

    res.status(200).json(new ApiReponse(
        200,
        dailyScore,
        "Fetched user data successfully!!"
    ))
})


export {
    createDailyScore,
    editDailyScore,
    deleteDailyScore,
    fetchAllDailyScore,
    fetchUserdailyScore
}
