import {z} from "zod";
import {HabitCategory, HabitColor, HabitFrequency, WeekDay} from "@/generated/prisma/enums";

export const addHabitFormSchema = z.object({
	name: z.string().min(1, 'Name is required').max(100),
	color: z.enum(HabitColor),
	frequency: z.enum(HabitFrequency),
	category: z.enum(HabitCategory).nullable().optional(),
	weekDay: z.enum(WeekDay).nullable().optional(),
	monthDay: z.number().min(0).max(31),
});

export type AddHabitFormType = z.infer<typeof addHabitFormSchema>;