/*
  Warnings:

  - You are about to drop the column `classes` on the `classModel` table. All the data in the column will be lost.
  - Added the required column `students` to the `classModel` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "classModel" DROP COLUMN "classes",
ADD COLUMN     "students" JSONB NOT NULL;
