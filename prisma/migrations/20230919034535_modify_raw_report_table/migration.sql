/*
  Warnings:

  - You are about to drop the column `country_id` on the `RawReport` table. All the data in the column will be lost.
  - Added the required column `weather_code` to the `RawReport` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weather_icon` to the `RawReport` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RawReport" DROP COLUMN "country_id",
ADD COLUMN     "weather_code" INTEGER NOT NULL,
ADD COLUMN     "weather_icon" TEXT NOT NULL;
