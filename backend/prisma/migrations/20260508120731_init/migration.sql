-- CreateTable
CREATE TABLE "Player" (
    "id" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "trophies" INTEGER NOT NULL,
    "highestTrophies" INTEGER NOT NULL,
    "expLevel" INTEGER NOT NULL,
    "totalVictories3v3" INTEGER NOT NULL,
    "soloVictories" INTEGER NOT NULL,
    "duoVictories" INTEGER NOT NULL,
    "clubTag" TEXT,
    "clubName" TEXT,
    "iconId" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Player_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Battle" (
    "id" TEXT NOT NULL,
    "battleTime" TIMESTAMP(3) NOT NULL,
    "mode" TEXT NOT NULL,
    "type" TEXT,
    "result" TEXT,
    "duration" INTEGER,
    "trophyChange" INTEGER,
    "map" TEXT,
    "playerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Battle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BattleParticipant" (
    "id" TEXT NOT NULL,
    "battleId" TEXT NOT NULL,
    "tag" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "brawlerId" INTEGER NOT NULL,
    "brawlerName" TEXT NOT NULL,
    "brawlerPower" INTEGER NOT NULL,
    "brawlerTrophies" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BattleParticipant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brawler" (
    "id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Brawler_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Player_tag_key" ON "Player"("tag");

-- CreateIndex
CREATE INDEX "Battle_battleTime_idx" ON "Battle"("battleTime");

-- CreateIndex
CREATE INDEX "BattleParticipant_tag_idx" ON "BattleParticipant"("tag");

-- AddForeignKey
ALTER TABLE "Battle" ADD CONSTRAINT "Battle_playerId_fkey" FOREIGN KEY ("playerId") REFERENCES "Player"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BattleParticipant" ADD CONSTRAINT "BattleParticipant_battleId_fkey" FOREIGN KEY ("battleId") REFERENCES "Battle"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
