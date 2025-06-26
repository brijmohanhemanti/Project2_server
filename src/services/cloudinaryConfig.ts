import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINAR_CLOUD_NAME,   //yo sab clodinay ley dinxa 
    api_key : process.env.CLOUDINAR_API_KEY ,
    api_secret : process.env.CLOUDINAR_API_SECRECT
})

const storage = new CloudinaryStorage({
    cloudinary,
    params : async(req,file)=>{
        folder:"full strack_saas"
    }
})


export {cloudinary,storage}