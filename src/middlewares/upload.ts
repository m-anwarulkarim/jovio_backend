import multer from "multer";
import cloudinary from "../config/cloudinary";

const storage = multer.memoryStorage();

export const upload = multer({ storage });

export const uploadToCloudinaryTask = (
  file: Express.Multer.File,
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "task-attachments",
        resource_type: "auto",
      },
      (error, result) => {
        if (error || !result) {
          reject(error || new Error("Upload failed"));
        } else {
          resolve({
            url: result.secure_url,
            publicId: result.public_id,
          });
        }
      },
    );

    uploadStream.end(file.buffer);
  });
};
