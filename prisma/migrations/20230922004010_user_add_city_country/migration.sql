-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cityCountry" TEXT NOT NULL DEFAULT 'AR',
ALTER COLUMN "cityName" SET DEFAULT 'Buenos Aires';
