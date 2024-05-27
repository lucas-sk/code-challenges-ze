/*
  Warnings:

  - You are about to drop the column `coverageArea` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `ownerName` on the `Partner` table. All the data in the column will be lost.
  - You are about to drop the column `tradingName` on the `Partner` table. All the data in the column will be lost.
  - Added the required column `coverage_area` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner_name` to the `Partner` table without a default value. This is not possible if the table is not empty.
  - Added the required column `trading_name` to the `Partner` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Partner" DROP COLUMN "coverageArea",
DROP COLUMN "ownerName",
DROP COLUMN "tradingName",
ADD COLUMN     "coverage_area" JSONB NOT NULL,
ADD COLUMN     "owner_name" TEXT NOT NULL,
ADD COLUMN     "trading_name" TEXT NOT NULL;
