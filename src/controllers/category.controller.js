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
    const id = req.params.id

    const { name, description, color } = req.body

    const category = await Category.findByIdAndUpdate(
        id,
        {
            $set: {
                name,
                description,
                color
            }
        },
        {
            new: true,
            runValidators: true
        }
    )

    if (!category) {
        throw new ApiError(404, "Category not Found!!")
    }
    res.status(200).json(new ApiReponse(
        200,
        category,
        "Updated Category!!!"
    ))


})

const fetchallHabit = asyncHandler(async (req, res) => {

    const category = await Category.find({})

    res.status(200).json(new ApiReponse(
        200,
        category,
        "All category fetched!!"
    ))


})

const deleteHabit = asyncHandler(async (req, res) => {
    const id = req.params.id


    const category = await Category.findOneAndDelete(id)
    if (!category) {
        throw new ApiError(404, "Category not found!!")
    }

    res.status(200).json(new ApiReponse(
        200,
        {},
        "Category deleted Sucessfully!!"
    ))
})

export {
    createCategory,
    editCategory,
    fetchallHabit,
    deleteHabit

}