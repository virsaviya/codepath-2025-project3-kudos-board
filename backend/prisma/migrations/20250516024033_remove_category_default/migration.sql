/*
  Warnings:

  - The values [INSPIRATION] on the enum `CATEGORY` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CATEGORY_new" AS ENUM ('ALL', 'RECENT', 'CELEBRATION', 'THANK_YOU', 'INSPO');
ALTER TABLE "Board" ALTER COLUMN "category" DROP DEFAULT;
ALTER TABLE "Board" ALTER COLUMN "category" TYPE "CATEGORY_new" USING ("category"::text::"CATEGORY_new");
ALTER TYPE "CATEGORY" RENAME TO "CATEGORY_old";
ALTER TYPE "CATEGORY_new" RENAME TO "CATEGORY";
DROP TYPE "CATEGORY_old";
COMMIT;

-- AlterTable
ALTER TABLE "Board" ALTER COLUMN "category" DROP DEFAULT;
