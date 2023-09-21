/*
  Warnings:

  - You are about to drop the `authModel` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "authModel";

-- CreateTable
CREATE TABLE "classModel" (
    "id" TEXT NOT NULL,
    "className" TEXT NOT NULL,
    "classes" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "classModel_pkey" PRIMARY KEY ("id")
);
