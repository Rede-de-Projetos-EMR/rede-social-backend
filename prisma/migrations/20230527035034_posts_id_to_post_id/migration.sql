/*
  Warnings:

  - You are about to drop the column `postsId` on the `Comment` table. All the data in the column will be lost.
  - You are about to drop the column `postsId` on the `Reaction` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Comment" DROP CONSTRAINT "Comment_postsId_fkey";

-- DropForeignKey
ALTER TABLE "Reaction" DROP CONSTRAINT "Reaction_postsId_fkey";

-- AlterTable
ALTER TABLE "Comment" DROP COLUMN "postsId",
ADD COLUMN     "postId" TEXT;

-- AlterTable
ALTER TABLE "Reaction" DROP COLUMN "postsId",
ADD COLUMN     "postId" TEXT;

-- AddForeignKey
ALTER TABLE "Reaction" ADD CONSTRAINT "Reaction_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE SET NULL ON UPDATE CASCADE;
