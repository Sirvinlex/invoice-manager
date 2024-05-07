/*
  Warnings:

  - You are about to drop the column `completed` on the `InvoiceItem` table. All the data in the column will be lost.
  - Added the required column `city` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCity` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientCountry` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientPostCode` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientStreet` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `curr` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `email` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `invoiceDate` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `paymentTerm` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `postCode` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `street` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InvoiceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "invoiceNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "clientStreet" TEXT NOT NULL,
    "clientCity" TEXT NOT NULL,
    "clientPostCode" TEXT NOT NULL,
    "clientCountry" TEXT NOT NULL,
    "invoiceDate" TEXT NOT NULL,
    "dueDate" TEXT NOT NULL,
    "paymentTerm" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "others" TEXT,
    "totalAmount" TEXT NOT NULL,
    "curr" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" TEXT NOT NULL DEFAULT 'pending'
);
INSERT INTO "new_InvoiceItem" ("content", "createdAt", "id", "invoiceNumber") SELECT "content", "createdAt", "id", "invoiceNumber" FROM "InvoiceItem";
DROP TABLE "InvoiceItem";
ALTER TABLE "new_InvoiceItem" RENAME TO "InvoiceItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
