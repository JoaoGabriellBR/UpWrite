/*
  Warnings:

  - The primary key for the `Notes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_id_author_fkey";

-- AlterTable
ALTER TABLE "Notes" DROP CONSTRAINT "Notes_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "id_author" SET DATA TYPE TEXT,
ADD CONSTRAINT "Notes_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Notes_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AddForeignKey
ALTER TABLE "Notes" ADD CONSTRAINT "Notes_id_author_fkey" FOREIGN KEY ("id_author") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
