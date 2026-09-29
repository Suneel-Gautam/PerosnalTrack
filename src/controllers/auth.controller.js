import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiReponse } from "../utils/ApiReponse.js";


const generateAcessRefreshToken = async (userid) => {
    const user = await User.findById(userid)
    if (!user) {
        throw new ApiError(403, "User not found!!")
    }
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save({ validateBeforeSave: false })
    return { accessToken, refreshToken }

}
const registerUser = asyncHandler(async (req, res) => {
    // registerUser
    const { fullname, email, phoneNumber, password } = req.body

    if (!fullname.trim(), !email.trim(), !phoneNumber.trim(), !password.trim()) {
        throw new ApiError(401, "All the feild are required!!")
    }

    


})
const loginUser = asyncHandler(async (req, res) => {
    // loginUser
    const { email, password } = req.body

    if (!email.trim()) {
        throw new ApiError(401, "Email is required!!")
    }
    if (!password.trim()) {
        throw new ApiError(401, "password is required!!")
    }


})

const logout = asyncHandler(async (req, res) => {
    // logout
})

export {
    registerUser,
    loginUser,
    logout

} 