import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiReponse } from "../utils/ApiReponse.js";

const options = {
    httpOnly: true,
    secure: true
}

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
    const existingUser = await User.findOne({
        $or: [{ email, phoneNumber }]
    })
    if (existingUser) {
        throw new ApiError(400, "User Already exist!!Please login")
    }
    const user = await User.create({
        fullname,
        email,
        phoneNumber,
        password
    })
    const filterUser = await User.findOne(user._id).select('-password -refreshToken')

    const { accessToken, refreshToken } = await generateAccessToken(user)

    res.status(201)
        .json(ApiReponse(
            201,
            {
                user: filterUser,
                accessToken,
                refreshToken
            },
            "User Created Sucessfully!!"
        ))
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)



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

    const user = await User.findOne({ email })
    if (!user) {
        throw new ApiError(401, "Invalid credintails")
    }
    const checkPassword = await User.isPasswordCorrect(password)

    if (!checkPassword) {
        throw new ApiError(401, "Invalid credintails")
    }
    const filterUser = await User.findOne(user._id).select('-password -refreshToken')
    if (!filterUser) {
        throw new ApiError(401, "Invalid credintails")
    }
    const { accessToken, refreshToken } = await generateAcessRefreshToken(user._id)
    res.status(200)
        .json(ApiReponse(
            200,
            {
                user: filterUser,
                accessToken,
                refreshToken
            },
            "User login Sucessfully!!!"
        ))
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)

})

const logout = asyncHandler(async (req, res) => {
    // logout
    const userId = req.user._id

    const user = await user.findOne(userId)

    if (!user) {
        throw new ApiError(404, "User not found!!")
    }

    res.status(200)
        .json(ApiReponse(
            200,
            [],
            "User Logout Sucessfully!!"
        ))
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)


})

export {
    registerUser,
    loginUser,
    logout
} 