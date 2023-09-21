-- CreateTable
CREATE TABLE "authModel" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "class" TEXT NOT NULL,
    "token" TEXT,
    "avatar" TEXT,
    "avatarID" TEXT,
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "contact" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "authModel_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "authModel_email_key" ON "authModel"("email");
