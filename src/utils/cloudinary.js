import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const cloudinaryFileUpload = async (localFilePath)=>{
    try {
        if(!localFilePath) return null;

        // try upload file to cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })

        // if file upload is successful
        console.log('File is successfully uploaded to cloudinary.', response.url)

        fs.unlinkSync(localFilePath); // remove file after successful upload on cloudinary

        return response
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove the locally saved temporary file if the upload is failed
        return null;
    }
}

export {cloudinaryFileUpload};