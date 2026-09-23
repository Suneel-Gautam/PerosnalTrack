import jwt from 'jsonwebtoken'
import User from '../models/user.model'
import { ApiError } from '../utils/ApiError'
import { asyncHandler } from '../utils/asyncHandler'


// const jwtVerify = async (req, res, next) => {
//     try {
//         const token = req.cookies?.accessToken || req.header('authorization').replace('Bearer', '')
//         if (!token) {
//             throw new ApiError(401, "Missing Token!!")
//         }
//         const decoded = jwt.verify(token, process.env.JWT_SECRET)
//         const user = await User.findById(decoded._id).select('-password -refreshToken')
//         if (!user) {
//             throw new ApiError(401, "UnAuthorized!! invalid Token!!")
//         }
//         req.user = user
//         next()

//     } catch (error) {
//         next(error)
//     }

// }
const jwtVerify = asyncHandler(async (req, _, next) => {

    const token = req.cookies?.accessToken || (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null);
    if (!token) {
        throw new ApiError(401, "Missing Token!!")
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decoded._id).select('-password -refreshToken')
    if (!user) {
        throw new ApiError(401, "UnAuthorized!! invalid Token!!")
    }
    req.user = user
    next()
})

export { jwtVerify }

