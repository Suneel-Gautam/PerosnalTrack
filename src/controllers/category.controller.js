import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiReponse } from "../utils/ApiReponse.js";
import Category from "../models/category.model.js";

const createCategory = asyncHandler(async (req, res) => {

    const { name, description, color } = req.body

    if (!name.trim()) {
        throw new ApiError(400, "All The fields are required!")
    }

    const category = await Category.create({
        name,
        description,
        color
    })

    res.status(200).json(new ApiReponse(
        200,
        category,
        "Category Created Sucessfully!!"
    ))

})
const editCategory = asyncHandler(async (req, res) => {

})
const fetchallHabit = asyncHandler(async (req, res) => {

})

export {
    createCategory
}