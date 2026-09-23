import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilePic: {
        type: String
    },
    refreshToken: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


userSchema.pre('save', async function () {
    if (!this.isModified('password')) return
    this.password = await bcrypt.hash(this.password, 10)
})

userSchema.methods.isPasswordCorrect = function (password) {
    return bcrypt.compare(password, this.password)
}
userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id,
        fullname: this.fullname,
        email: this.email,
        phoneNumber: this.phoneNumber
    },
        process.env.ACCESSTOKEN_JWT_SECRET,
        {
            expiresIn: process.env.ACCESSTOKEN_EXPIREY
        }
    )
}
userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id,
        fullname: this.fullname,
        email: this.email,
        phoneNumber: this.phoneNumber
    },
        process.env.REFRESHTOKEN_JWT_SECRET,
        {
            expiresIn: process.env.REFRESHTOKEN_EXPIREY
        }
    )

}

const User = mongoose.model("User", userSchema)

export default User