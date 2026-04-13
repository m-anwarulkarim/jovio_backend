import multer from "multer";
import cloudinary from "../config/cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "task-attachments",
    resource_type: "auto",
  } as any,
});

export const upload = multer({ storage });
