/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password_salt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `status_Id` on the `User` table. All the data in the column will be lost.
  - Added the required column `hashed_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `verified_email` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_status_Id_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password",
DROP COLUMN "password_salt",
DROP COLUMN "status_Id",
ADD COLUMN     "hashed_password" VARCHAR(255) NOT NULL,
ALTER COLUMN "verified_email" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_status_id_fkey" FOREIGN KEY ("status_id") REFERENCES "Account_Status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
