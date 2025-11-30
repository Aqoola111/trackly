-- CreateEnum
CREATE TYPE "HabitFrequency" AS ENUM ('DAILY', 'WEEKLY', 'MONTHLY');

-- CreateEnum
CREATE TYPE "WeekDay" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- AlterTable
ALTER TABLE "Habit" ADD COLUMN     "frequency" "HabitFrequency" NOT NULL DEFAULT 'DAILY',
ADD COLUMN     "monthDay" INTEGER,
ADD COLUMN     "weekDays" "WeekDay";
