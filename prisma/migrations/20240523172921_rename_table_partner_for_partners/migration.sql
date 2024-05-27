/*
  Warnings:

  - You are about to drop the `Partner` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Partner";

-- CreateTable
CREATE TABLE "partners" (
    "id" TEXT NOT NULL,
    "trading_name" TEXT NOT NULL,
    "owner_name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "coverage_area" JSONB NOT NULL,
    "address" JSONB NOT NULL,

    CONSTRAINT "partners_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "partners_document_key" ON "partners"("document");
