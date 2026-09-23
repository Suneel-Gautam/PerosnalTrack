import mongoose from "mongoose";


const userSchema = mongoose.Schema({
    fullname: {
        type: String,
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    password: {
        type: String
    },
    refreshToken: {
        type: String
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)

export default User