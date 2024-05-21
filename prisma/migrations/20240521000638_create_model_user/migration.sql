-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "tradingName" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "coverageArea" JSONB NOT NULL,
    "address" JSONB NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Partner_document_key" ON "Partner"("document");
