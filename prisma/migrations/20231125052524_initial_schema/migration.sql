-- CreateTable
CREATE TABLE "Whisper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" DATETIME NOT NULL,
    "deleteOnOpen" BOOLEAN NOT NULL DEFAULT true,
    "showDeleteOnReadWarning" BOOLEAN NOT NULL DEFAULT true
);
