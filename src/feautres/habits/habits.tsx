'use client'
import AddHabitModal from "@/feautres/habits/add-habit-modal";
import NoHabitsFound from "@/feautres/habits/no-habits-found";
import {trpc} from "@/trpc/client";
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
		<div>
			//Habits list + button to add habit modal
		</div>
	)
};