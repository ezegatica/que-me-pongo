-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_rawReportId_fkey";

-- DropForeignKey
ALTER TABLE "Report" DROP CONSTRAINT "Report_userId_fkey";

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_rawReportId_fkey" FOREIGN KEY ("rawReportId") REFERENCES "RawReport"("id") ON DELETE CASCADE ON UPDATE CASCADE;
