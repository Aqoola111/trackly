import {addHabitFormSchema} from "@/feautres/habits/add-habit-modal";
import prisma from "@/lib/prisma";
import {z} from 'zod';
import {baseProcedure, createTRPCRouter, protectedProcedure} from '../init';

export const appRouter = createTRPCRouter({
	getUserHabits: protectedProcedure.query(async (ctx) => {
		const userId = ctx.ctx.auth.user.id;
		if (!userId) {
			throw new Error('Unauthorized');
		}
		const habits = await prisma.habit.findMany({
			where: {userId},
			include: {
				completions: true
			}
		});
		
		return habits;
	}),
	createHabit: protectedProcedure.input(addHabitFormSchema).mutation(async ({ctx, input}) => {
			const userId = ctx.auth.user.id;
			
			if (!userId) {
				throw new Error('Unauthorized');
			}
			
			const {
				name,
				color,
				frequency,
				category,
				weekDay,
				monthDay,
			} = input;
			
			if (frequency === 'WEEKLY' && !weekDay) {
				throw new Error('Week day is required for weekly habits');
			}
			
			if (frequency === 'MONTHLY' && !monthDay) {
				throw new Error('Month day is required for monthly habits');
			}
			
			if (frequency === 'DAILY') {
				input.weekDay = null;
				input.monthDay = null;
			}
			
			const newHabit = await prisma.habit.create({
				data: {
					userId,
					title: name,
					color,
					frequency,
					category,
					weekDays: weekDay,
					monthDay,
				}
			})
			
			return newHabit
		}
	)
});

export type AppRouter = typeof appRouter;