-- CreateTable
CREATE TABLE "PlayerSnapshot" (
    "id" TEXT NOT NULL,
    "playerId" TEXT NOT NULL,
    "trophies" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PlayerSnapshot_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "PlayerSnapshot_playerId_createdAt_idx" ON "PlayerSnapshot"("playerId", "createdAt");

-- AddForeignKey
ALTER TABLE "PlayerSnapshot" ADD CONSTRAINT "PlayerSnapshot_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
