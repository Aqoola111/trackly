'use client'
import {Button} from "@/components/ui/button";
import AddHabitModal from "@/feautres/habits/add-habit-modal";
import {HabitsWrapper} from "@/feautres/habits/habits-wrapper";
import NoHabitsFound from "@/feautres/habits/no-habits-found";
import {useAddHabitModal} from "@/feautres/habits/store/use-add-habit-modal";
import {getUtcMidnightIso} from "@/lib/utils";
import {trpc} from "@/trpc/client";
import {HydrateClient} from "@/trpc/sever";
import {startOfDay} from "date-fns";
import {PlusIcon} from "lucide-react";
import {useState} from "react";

export const Habits = () => {
	const habits = trpc.getUserHabits.useQuery()
	const habitsForToday = trpc.getHabitsForDate.useQuery({
		date: getUtcMidnightIso(new Date())
	})
	const {open} = useAddHabitModal()
	
	return (
		<div className='flex flex-col gap-4 flex-1'>
			<div className='w-full flex items-center justify-between'>
				<div className='flex flex-col gap-2'>
					<h1 className='text-xl md:text-2xl lg:text-3xl font-bold'>
						Your habits
					</h1>
					<p className='text-muted-foreground hidden md:block'>
						Track your daily progress and build consistency
					</p>
				</div>
				<Button  onClick={open} variant='ghost'>
					Add Habit
					<PlusIcon/>
				</Button>
			</div>
			<AddHabitModal/>
			<HabitsWrapper habitsByDate={habitsForToday.data} habits={habits.data}/>
		</div>
	)
};