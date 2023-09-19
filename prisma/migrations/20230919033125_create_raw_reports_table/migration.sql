/*
  Warnings:

  - A unique constraint covering the columns `[rawReportId]` on the table `Report` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `rawReportId` to the `Report` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Report" ADD COLUMN     "rawReportId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "RawReport" (
    "id" SERIAL NOT NULL,
    "temp" INTEGER NOT NULL,
    "temp_min" INTEGER NOT NULL,
    "temp_max" INTEGER NOT NULL,
    "pressure" INTEGER NOT NULL,
    "humidity" INTEGER NOT NULL,
    "wind_speed" INTEGER NOT NULL,
    "wind_deg" INTEGER NOT NULL,
    "city_id" INTEGER NOT NULL,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "country_id" INTEGER NOT NULL,
    "lon" DOUBLE PRECISION NOT NULL,
    "lat" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "RawReport_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Report_rawReportId_key" ON "Report"("rawReportId");

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_rawReportId_fkey" FOREIGN KEY ("rawReportId") REFERENCES "RawReport"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
