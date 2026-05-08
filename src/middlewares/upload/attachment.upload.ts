import path from "path";
import type { Request } from "express";
import multer, { type Options } from "multer";
import cloudinary from "../../config/cloudinary";

// মেমোরিতে ফাইল রাখবে, তারপর সরাসরি Cloudinary তে আপলোড হবে
const storage = multer.memoryStorage();

export const fileFilter = (
  _req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback,
) => {
  const allowedMimeTypes = [
    "image/jpeg",
    "image/png",
    "image/webp",
    "image/gif",
    "application/pdf",
    "application/zip",
    "application/x-zip-compressed",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "text/plain",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file format. Only jpg, jpeg, png, webp, gif, pdf, zip, doc, docx, txt are allowed.",
      ) as any,
      false,
    );
  }
};

const multerOptions: Options = {
  storage,
  fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024,
    files: 2,
  },
};

export const uploadAttachment = multer(multerOptions);

// Cloudinary তে সরাসরি আপলোড করার ফাংশন
export const uploadToCloudinary = (
  file: Express.Multer.File,
): Promise<{ url: string; publicId: string }> => {
  return new Promise((resolve, reject) => {
    const fileExtension = path.extname(file.originalname);
    const fileNameWithoutExt = path.basename(file.originalname, fileExtension);

    const cleanFileName = fileNameWithoutExt
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();

    const isImage = file.mimetype.startsWith("image/");

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "attachments",
        resource_type: "auto",
        public_id: `${Date.now()}-${cleanFileName}`,
        ...(isImage
          ? { transformation: [{ quality: "auto", fetch_format: "auto" }] }
          : {}),
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
