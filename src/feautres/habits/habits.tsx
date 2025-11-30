'use client'
import {Button} from "@/components/ui/button";
import AddHabitModal from "@/feautres/habits/add-habit-modal";
import {HabitsWrapper} from "@/feautres/habits/habits-wrapper";
import NoHabitsFound from "@/feautres/habits/no-habits-found";
import {trpc} from "@/trpc/client";
import {PlusIcon} from "lucide-react";
import {useState} from "react";

export const Habits = () => {
	const habits = trpc.getUserHabits.useQuery()
	const [isOpen, setIsOpen] = useState(false);
	
	if (habits.isLoading) {
		return <div>
			Loading...
		</div>
	}
	if (!habits.data || habits.data.length === 0) {
		return <>
			<NoHabitsFound onAddHabit={() => setIsOpen(true)}/>
			<AddHabitModal isOpen={isOpen} onOpenChange={setIsOpen}/>
		</>
	}
	return (
		<>
			<Button onClick={() => setIsOpen(true)} className='w-fit' variant='outline'>
				Add Habit
				<PlusIcon/>
			</Button>
			<AddHabitModal isOpen={isOpen} onOpenChange={setIsOpen}/>
			<HabitsWrapper habits={habits.data}/>
		</>
	)
};