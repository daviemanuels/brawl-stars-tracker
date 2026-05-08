-- AlterTable
ALTER TABLE "Battle" ADD COLUMN     "eventId" INTEGER,
ADD COLUMN     "modeId" INTEGER,
ADD COLUMN     "rank" INTEGER;

-- CreateIndex
CREATE INDEX "Battle_playerId_idx" ON "Battle"("playerId");

-- CreateIndex
CREATE INDEX "Battle_mode_idx" ON "Battle"("mode");

-- CreateIndex
CREATE INDEX "Battle_eventId_idx" ON "Battle"("eventId");

-- CreateIndex
CREATE INDEX "BattleParticipant_brawlerId_idx" ON "BattleParticipant"("brawlerId");

-- CreateIndex
CREATE INDEX "BattleParticipant_battleId_idx" ON "BattleParticipant"("battleId");

-- CreateIndex
CREATE INDEX "Player_tag_idx" ON "Player"("tag");
