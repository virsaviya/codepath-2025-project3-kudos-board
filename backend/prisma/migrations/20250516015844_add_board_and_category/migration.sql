/*
  Warnings:

  - You are about to drop the column `title` on the `Card` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "CATEGORY" AS ENUM ('ALL', 'RECENT', 'CELEBRATION', 'THANK_YOU', 'INSPIRATION');

-- AlterTable
ALTER TABLE "Card" DROP COLUMN "title",
ADD COLUMN     "author" TEXT;

-- CreateTable
CREATE TABLE "Board" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "title" TEXT NOT NULL,
    "category" "CATEGORY" NOT NULL DEFAULT 'ALL',
    "author" TEXT,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);
