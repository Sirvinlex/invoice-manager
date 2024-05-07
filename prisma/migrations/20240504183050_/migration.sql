/*
  Warnings:

  - You are about to drop the column `city` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `clientCity` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `clientCountry` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `clientPostCode` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `clientStreet` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `curr` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceDate` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `invoiceNumber` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `others` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `paymentTerm` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `street` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `Task` table. All the data in the column will be lost.
  - Added the required column `content` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

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
INSERT INTO "new_InvoiceItem" ("city", "clientCity", "clientCountry", "clientPostCode", "clientStreet", "country", "createdAt", "curr", "description", "dueDate", "email", "id", "invoiceDate", "invoiceNumber", "name", "others", "paymentTerm", "postCode", "status", "street", "totalAmount") SELECT "city", "clientCity", "clientCountry", "clientPostCode", "clientStreet", "country", "createdAt", "curr", "description", "dueDate", "email", "id", "invoiceDate", "invoiceNumber", "name", "others", "paymentTerm", "postCode", "status", "street", "totalAmount" FROM "InvoiceItem";
DROP TABLE "InvoiceItem";
ALTER TABLE "new_InvoiceItem" RENAME TO "InvoiceItem";
CREATE TABLE "new_Task" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false
);
INSERT INTO "new_Task" ("completed", "content", "createdAt", "id") SELECT "completed", "content", "createdAt", "id" FROM "Task";
DROP TABLE "Task";
ALTER TABLE "new_Task" RENAME TO "Task";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
