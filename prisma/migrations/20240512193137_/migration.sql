/*
  Warnings:

  - Added the required column `senderName` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clerkId" TEXT NOT NULL,
    "invoiceNumber" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "postCode" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "senderName" TEXT NOT NULL,
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
INSERT INTO "new_Invoice" ("city", "clerkId", "clientCity", "clientCountry", "clientPostCode", "clientStreet", "country", "createdAt", "curr", "description", "dueDate", "email", "id", "invoiceDate", "invoiceNumber", "name", "others", "paymentTerm", "postCode", "status", "street", "totalAmount") SELECT "city", "clerkId", "clientCity", "clientCountry", "clientPostCode", "clientStreet", "country", "createdAt", "curr", "description", "dueDate", "email", "id", "invoiceDate", "invoiceNumber", "name", "others", "paymentTerm", "postCode", "status", "street", "totalAmount" FROM "Invoice";
DROP TABLE "Invoice";
ALTER TABLE "new_Invoice" RENAME TO "Invoice";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
