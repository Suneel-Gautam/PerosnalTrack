import { v2 as cloudinary } from "cloudinary";
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


export const fileUpload = (localfilepath) => {
    try {
        const response = cloudinary.uploader.upload(localfilepath, {
            resource_type: 'auto'

        })
        fs.unlinkSync(localfilepath);
        return response.url
    } catch (error) {
        console.log(error)
        if (localfilepath) {
            fs.unlinkSync(localfilepath);
        }
        return null
    }

}