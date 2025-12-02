// typescript
import {addHabitFormSchema} from "@/feautres/habits/schemas";
import prisma from "@/lib/prisma";
import {parseDateToUtcMidnight} from "@/lib/utils";
import {z} from 'zod';
import {baseProcedure, createTRPCRouter, protectedProcedure} from '../init';

export const appRouter = createTRPCRouter({
	getUserHabits: protectedProcedure.query(async (ctx) => {
		const userId = ctx.ctx.auth.user.id;
		if (!userId) {
			throw new Error('Unauthorized');
		}
		const habits = await prisma.habit.findMany({
			where: {userId}
		});
		
		return habits;
	}),
	getUserHabitById: protectedProcedure.input(z.object({
		habitId: z.string(),
	})).query(async ({ctx, input}) => {
		const userId = ctx.auth.user.id;
		if (!userId) {
			throw new Error('Unauthorized');
		}
		const habit = await prisma.habit.findFirst({
			where: {
				id: input.habitId,
				userId: userId
			},
			include: {
				completions: true
			}
		})
		return habit
	}),
	getHabitCompletionsById: protectedProcedure.input(z.object({
		habitId: z.string()
	})).query(async ({ctx, input}) => {
		const userId = ctx.auth.user.id;
		if (!userId) {
			throw new Error('Unauthorized');
		}
		const completions = await prisma.habitCompletion.findMany({
			where: {
				habitId: input.habitId,
				userId: userId
			}
		})
		return completions
	}),
	getHabitsForDate: protectedProcedure
		.input(z.object({date: z.string()}))
		.query(async ({ctx, input}) => {
			const userId = ctx.auth.user.id;
			if (!userId) throw new Error("Unauthorized");
			
			const date = parseDateToUtcMidnight(input.date); // UTC-полночь
			const nextDay = new Date(date.getTime() + 24 * 60 * 60 * 1000); // следующая UTC-полночь
			
			const weekDayLong = date
				.toLocaleString("en-US", {weekday: "long", timeZone: "UTC"})
				.toUpperCase(); // e.g. "MONDAY"
			const dayOfMonth = date.getUTCDate();
			
			
			const habits = await prisma.habit.findMany({
				where: {
					userId,
				},
				include: {
					completions: {
						where: {
							date: {
								gte: date,
								lt: nextDay,
							},
						},
					},
				},
			});
			const result = habits.filter(h => h.completions.length > 0);
			return result
			
		}),
	getCompletionsByDate: protectedProcedure
		.input(z.object(
			{
				date: z.string(),
			}
		))
		.query(async ({ctx, input}) => {
			const userId = ctx.auth.user.id;
			if (!userId) throw new Error("Unauthorized");
			
			const date = parseDateToUtcMidnight(input.date);
			
			const completions = await prisma.habitCompletion.findMany({
				where: {
					userId,
					date: {equals: date},
				},
			});
			
			return completions;
		}),
	toggleHabitCompletion: protectedProcedure
		.input(z.object(
			{
				habitId: z.string(),
				date: z.string(),
			}
		))
		.mutation(async ({ctx, input}) => {
			const userId = ctx.auth.user.id;
			if (!userId) throw new Error("Unauthorized");
			
			const {habitId, date} = input;
			const completionDate = parseDateToUtcMidnight(date);
			
			
			const habit = await prisma.habit.findFirst({
				where: {
					id: habitId,
					userId,
				}
			})
			
			if (!habit) {
				throw new Error("Habit not found");
			}
			
			const weekDay = completionDate.toLocaleString("en-US", {weekday: "long", timeZone: "UTC"}).toUpperCase();
			if (habit.weekDays) {
				if (!weekDay.includes(habit.weekDays)) {
					throw new Error(`Cannot complete habit on ${weekDay}`);
				}
			}
			
			
			// использовать UTC-день для сравнения
			if (habit.frequency === "MONTHLY" && habit.monthDay && completionDate.getUTCDate() !== habit.monthDay) {
				throw new Error(`Cannot complete habit on day ${completionDate.getUTCDate()}`);
			}
			
			const existing = await prisma.habitCompletion.findFirst({
				where: {
					habitId: habitId,
					userId,
					date: {equals: completionDate}
				}
			})
			
			
			if (!existing) {
				return prisma.habitCompletion.create({
					data: {
						habitId,
						userId,
						date: completionDate,
						done: true,
					},
				});
			}
			
			
			return prisma.habitCompletion.update({
				where: {id: existing.id},
				data: {
					done: !existing.done,
				},
			});
			
		}),
	
	createHabit: protectedProcedure
		.input(addHabitFormSchema)
		.mutation(async ({ctx, input}) => {
			const userId = ctx.auth.user.id;
			if (!userId) throw new Error("Unauthorized");
			
			const {name, color, frequency, category, weekDay, monthDay} = input;
			
			// === VALIDATION ===
			if (frequency === "WEEKLY" && !weekDay) {
				throw new Error("Week day is required for weekly habits");
			}
			
			if (frequency === "MONTHLY" && monthDay === 0) {
				throw new Error("Month day is required for monthly habits");
			}
			
			// === CREATE HABIT ===
			const habit = await prisma.habit.create({
				data: {
					userId,
					title: name,
					color,
					frequency,
					category,
					weekDays: weekDay,
					monthDay,
				},
			});
			
			// === CREATE COMPLETIONS FOR NEXT 30 DAYS ===
			const completionsToCreate: {
				habitId: string;
				userId: string;
				date: Date;
				done: boolean;
			}[] = [];
			
			const now = new Date();
			const DAYS_TO_GENERATE = 30;
			const DAYS_BACK = 45
			
			for (let i = -DAYS_BACK; i < DAYS_TO_GENERATE; i++) {
				const d = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + i));
				
				const weekdayShort = d
					.toLocaleString("en-US", {weekday: "short", timeZone: "UTC"})
					.toUpperCase(); // e.g., "MON", "TUE"
				
				// DAILY — every day for 30 days
				if (frequency === "DAILY") {
					completionsToCreate.push({
						habitId: habit.id,
						userId,
						date: d,
						done: false,
					});
				}
				
				// WEEKLY — only specific weekday
				if (frequency === "WEEKLY" && weekDay) {
					const selectedShort = weekDay.substring(0, 3).toUpperCase(); // MONDAY → MON
					
					if (weekdayShort === selectedShort) {
						completionsToCreate.push({
							habitId: habit.id,
							userId,
							date: d,
							done: false,
						});
					}
				}
				
				// MONTHLY — only one day (используем UTC-день)
				if (frequency === "MONTHLY" && monthDay > 0) {
					if (d.getUTCDate() === monthDay) {
						completionsToCreate.push({
							habitId: habit.id,
							userId,
							date: d,
							done: false,
						});
					}
				}
			}
			
			// Bulk insert all completions
			if (completionsToCreate.length > 0) {
				await prisma.habitCompletion.createMany({
					data: completionsToCreate,
				});
			}
			
			return habit;
		}),
});

export type AppRouter = typeof appRouter;
