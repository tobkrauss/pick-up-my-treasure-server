const { CloudinaryStorage } = require("multer-storage-cloudinary")
const cloudinary = require("cloudinary").v2
const multer = require ("multer")

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET

})

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
      allowed_formats: ["jpg", "png"],
      folder: "image-uploads" // The name of the folder in cloudinary
      
    }
  });

const uploader = multer({ storage})

module.exports = {
    uploader,
    cloudinary
}