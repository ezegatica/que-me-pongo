-- CreateTable
CREATE TABLE "Report" (
    "id" SERIAL NOT NULL,
    "day" INTEGER NOT NULL,
    "upper" VARCHAR(255) NOT NULL,
    "lower" VARCHAR(255) NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Report_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Report" ADD CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
