-- AlterTable
ALTER TABLE "BattleParticipant" ADD COLUMN     "isMainPlayer" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "position" INTEGER,
ADD COLUMN     "team" INTEGER;
