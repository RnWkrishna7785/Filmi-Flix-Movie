import cloudinary from "../config/cloudinary.js";
import fs from "fs";

export const uploadToCloudinary = async (req, res, next) => {
  try {
    const posterFile =
      req.file || (req.files && req.files.poster && req.files.poster[0]);
    const backdropFile =
      req.files && req.files.backdrop && req.files.backdrop[0];

    if (!posterFile && !req.body.poster) {
      return res.status(400).json({
        success: false,
        message:
          "Poster image is required. Please upload an image or provide a valid poster URL.",
      });
    }

    const handleUpload = async (file, keyPrefix) => {
      if (!file) return null;
      console.log(`☁️ Uploading ${keyPrefix} to Cloudinary (${file.path})...`);
      const result = await cloudinary.uploader.upload(file.path, {
        folder: "filmiflix_posters",
        resource_type: "image",
      });

      req.body[`${keyPrefix}`] = result.secure_url;
      req.body[`${keyPrefix}PublicId`] = result.public_id;
      req.body[`${keyPrefix}Local`] = `/uploads/movies/${file.filename}`;

      console.log(
        `✅ Uploaded ${keyPrefix} to Cloudinary and preserved local copy.`,
      );
      return result;
    };

    await handleUpload(posterFile, "poster");
    await handleUpload(backdropFile, "backdrop");

    return next();
  } catch (error) {
    console.error("❌ Cloudinary Upload Failed:", error.message);

    if (req.files) {
      if (req.files.poster && req.files.poster[0]) {
        req.body.posterLocal = `/uploads/movies/${req.files.poster[0].filename}`;
        req.body.poster = `/uploads/movies/${req.files.poster[0].filename}`;
      }
      if (req.files.backdrop && req.files.backdrop[0]) {
        req.body.backdropLocal = `/uploads/movies/${req.files.backdrop[0].filename}`;
        req.body.backdrop = `/uploads/movies/${req.files.backdrop[0].filename}`;
      }
      return next();
    }

    if (req.file) {
      req.body.posterLocal = `/uploads/movies/${req.file.filename}`;
      req.body.poster = `/uploads/movies/${req.file.filename}`;
      return next();
    }

    return res.status(500).json({
      success: false,
      message: `Image upload failed: ${error.message}`,
    });
  }
};
export default uploadToCloudinary;
