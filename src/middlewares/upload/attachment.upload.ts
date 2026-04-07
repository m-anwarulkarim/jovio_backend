import path from "path";
import type { Request } from "express";
import multer, { type Options } from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../../config/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: async (_req: Request, file: Express.Multer.File) => {
    const fileExtension = path.extname(file.originalname);
    const fileNameWithoutExt = path.basename(file.originalname, fileExtension);

    const cleanFileName = fileNameWithoutExt
      .replace(/\s+/g, "-")
      .replace(/[^a-zA-Z0-9-]/g, "")
      .toLowerCase();

    const rawFormat = file.mimetype.split("/")[1];
    const finalFormat = rawFormat === "svg+xml" ? "svg" : rawFormat;

    const isImage = file.mimetype.startsWith("image/");

    return {
      folder: "attachments",
      resource_type: "auto",
      public_id: `${Date.now()}-${cleanFileName}`,
      ...(isImage
        ? {
            format: finalFormat,
            transformation: [{ quality: "auto", fetch_format: "auto" }],
          }
        : {}),
    };
  },
});

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
