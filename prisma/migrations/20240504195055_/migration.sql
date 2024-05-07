/*
  Warnings:

  - You are about to drop the column `content` on the `InvoiceItem` table. All the data in the column will be lost.

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
INSERT INTO "new_InvoiceItem" ("city", "clientCity", "clientCountry", "clientPostCode", "clientStreet", "country", "createdAt", "curr", "description", "dueDate", "email", "id", "invoiceDate", "invoiceNumber", "name", "others", "paymentTerm", "postCode", "status", "street", "totalAmount") SELECT "city", "clientCity", "clientCountry", "clientPostCode", "clientStreet", "country", "createdAt", "curr", "description", "dueDate", "email", "id", "invoiceDate", "invoiceNumber", "name", "others", "paymentTerm", "postCode", "status", "street", "totalAmount" FROM "InvoiceItem";
DROP TABLE "InvoiceItem";
ALTER TABLE "new_InvoiceItem" RENAME TO "InvoiceItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
