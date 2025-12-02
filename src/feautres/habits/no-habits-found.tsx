import {Button} from "@/components/ui/button";
import {useAddHabitModal} from "@/feautres/habits/store/use-add-habit-modal";
import {PlusIcon} from "lucide-react";

interface NoHabitsFoundProps {
	text?: string
}

const NoHabitsFound = ({text}: NoHabitsFoundProps) => {
	const {open} = useAddHabitModal()
	return (
		<div className='flex flex-1 items-center flex-col gap-4 justify-center '>
			<h1 className='text-2xl'>
				{text ?? "No habits found. Please add a habit to get started!"}
			</h1>
			<Button onClick={open} variant='outline'>
				Add Habit
				<PlusIcon/>
			</Button>
		</div>
	)
}
export default NoHabitsFound
