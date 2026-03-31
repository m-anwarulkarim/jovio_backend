import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../lib/cloudinary";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "task-attachments",
    resource_type: "auto",
  } as any,
});

export const upload = multer({ storage });
