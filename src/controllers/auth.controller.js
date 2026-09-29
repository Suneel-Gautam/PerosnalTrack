import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiReponse } from "../utils/ApiReponse.js";

const registerUser = asyncHandler(async (req, res) => {
    // registerUser 

})
const loginUser = asyncHandler(async (req, res) => {
    // loginUser

})

const logout = asyncHandler(async (req, res) => {
    // logout
})

export {
    registerUser,
    loginUser,
    logout

}