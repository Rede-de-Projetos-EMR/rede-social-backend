-- AlterTable
ALTER TABLE "Reaction" ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT;
DROP SEQUENCE "Reaction_id_seq";
