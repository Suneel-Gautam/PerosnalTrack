import mongoose from "mongoose";
import { configDotenv } from "dotenv";
import { DATABASE_NAME } from "../constant.js";
configDotenv()
const mongurl = process.env.MONOGO_URL

export const dbConnnect = async () => {
    try {
        await mongoose.connect(`${mongurl}/${DATABASE_NAME}`).then(() => {
            console.log("Database connected!!")
        })
    } catch (error) {
        console.log(error)
        throw error;
    }
}