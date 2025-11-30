import {Button} from "@/components/ui/button";
import {PlusIcon} from "lucide-react";

interface NoHabitsFoundProps {
	onAddHabit: () => void;
}

const NoHabitsFound = ({onAddHabit}: NoHabitsFoundProps) => {
	return (
		<div className='flex flex-1 items-center flex-col gap-4 justify-center '>
			<h1 className='text-2xl'>
				No habits found. Please add a habit to get started!
			</h1>
			<Button onClick={onAddHabit} variant='outline'>
				Add Habit
				<PlusIcon/>
			</Button>
		</div>
	)
}
export default NoHabitsFound
