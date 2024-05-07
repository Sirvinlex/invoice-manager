/*
  Warnings:

  - You are about to drop the column `city` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `clientCity` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `clientCountry` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `clientPostCode` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `clientStreet` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `curr` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceDate` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceNumber` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `others` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `paymentTerm` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `InvoiceItem` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `InvoiceItem` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InvoiceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_InvoiceItem" ("content", "createdAt", "id") SELECT "content", "createdAt", "id" FROM "InvoiceItem";
DROP TABLE "InvoiceItem";
ALTER TABLE "new_InvoiceItem" RENAME TO "InvoiceItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
