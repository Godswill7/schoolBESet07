/*
  Warnings:

  - You are about to drop the column `class` on the `authModel` table. All the data in the column will be lost.
  - Added the required column `className` to the `authModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "authModel" DROP COLUMN "class",
ADD COLUMN     "className" TEXT NOT NULL;
