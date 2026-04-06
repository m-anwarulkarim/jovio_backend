/*
  Warnings:

  - Added the required column `conversationType` to the `messages` table without a default value. This is not possible if the table is not empty.
  - Made the column `projectId` on table `messages` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MessageConversationType" AS ENUM ('ADMIN_CLIENT', 'ADMIN_EMPLOYEE');

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_projectId_fkey";

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "conversationType" "MessageConversationType" NOT NULL,
ALTER COLUMN "projectId" SET NOT NULL;

-- CreateIndex
CREATE INDEX "messages_conversationType_idx" ON "messages"("conversationType");

-- CreateIndex
CREATE INDEX "messages_projectId_conversationType_idx" ON "messages"("projectId", "conversationType");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
