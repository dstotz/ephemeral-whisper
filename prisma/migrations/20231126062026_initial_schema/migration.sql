-- CreateTable
CREATE TABLE "Whisper" (
    "id" TEXT NOT NULL,
    "data" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deleteAt" TIMESTAMP(3) NOT NULL,
    "deleteOnOpen" BOOLEAN NOT NULL DEFAULT true,
    "showDeleteOnReadWarning" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Whisper_pkey" PRIMARY KEY ("id")
);
