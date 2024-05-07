/*
  Warnings:

  - You are about to drop the column `profile` on the `InvoiceItem` table. All the data in the column will be lost.
  - Added the required column `invoiceNumber` to the `InvoiceItem` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_InvoiceItem" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completed" BOOLEAN NOT NULL DEFAULT false,
    "invoiceNumber" TEXT NOT NULL
);
INSERT INTO "new_InvoiceItem" ("completed", "content", "createdAt", "id") SELECT "completed", "content", "createdAt", "id" FROM "InvoiceItem";
DROP TABLE "InvoiceItem";
ALTER TABLE "new_InvoiceItem" RENAME TO "InvoiceItem";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
