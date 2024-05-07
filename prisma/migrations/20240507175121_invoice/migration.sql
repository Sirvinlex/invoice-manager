/*
  Warnings:

  - You are about to drop the `InvoiceItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "InvoiceItem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clerkId" TEXT NOT NULL,
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
