-- AlterEnum
ALTER TYPE "MessageConversationType" ADD VALUE 'DIRECT';

-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_projectId_fkey";

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "receiverId" TEXT,
ALTER COLUMN "projectId" DROP NOT NULL;

-- CreateIndex
CREATE INDEX "messages_receiverId_idx" ON "messages"("receiverId");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "projects"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
