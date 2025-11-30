-- CreateEnum
CREATE TYPE "HabitColor" AS ENUM ('RED', 'BLUE', 'GREEN', 'YELLOW', 'ORANGE', 'PURPLE', 'PINK', 'GRAY');

-- CreateEnum
CREATE TYPE "HabitCategory" AS ENUM ('HEALTH', 'FITNESS', 'WORK', 'STUDY', 'SLEEP');

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "category" "HabitCategory",
ADD COLUMN     "color" "HabitColor" NOT NULL DEFAULT 'GRAY';
