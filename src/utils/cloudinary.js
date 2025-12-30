import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import path from "path";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;

    // ✅ Convert Windows path to POSIX
    const normalizedPath = localFilePath.replace(/\\/g, "/");

    // ✅ Upload to cloudinary
    const response = await cloudinary.uploader.upload(normalizedPath, {
      resource_type: "image",
    });

    // ✅ Remove temp file AFTER successful upload
    if (fs.existsSync(normalizedPath)) {
      fs.unlinkSync(normalizedPath);
    }

    console.log("File uploaded to Cloudinary:", response.secure_url);

    return response;
  } catch (error) {
    console.error("Cloudinary upload failed:", error.message);

    // ✅ Safe cleanup
    try {
      if (localFilePath && fs.existsSync(localFilePath)) {
        fs.unlinkSync(localFilePath);
      }
    } catch (cleanupError) {
      console.error("File cleanup failed:", cleanupError.message);
    }

    return null;
  }
};

export { uploadOnCloudinary };
