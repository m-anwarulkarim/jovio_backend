-- AlterTable
ALTER TABLE "attachments" ADD COLUMN     "mimeType" TEXT,
ADD COLUMN     "originalName" TEXT,
ADD COLUMN     "publicId" TEXT,
ADD COLUMN     "size" INTEGER;
