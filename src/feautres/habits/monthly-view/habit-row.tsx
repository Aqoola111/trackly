import {GetUserHabitsResult} from "@/feautres/habits/habits-wrapper";
import {HabitDayCell} from "@/feautres/habits/monthly-view/habit-day-cell";
import {DayCell} from "@/lib/types";
import {trpc} from "@/trpc/client";
import {isSameDay} from "date-fns";
import {useState} from "react";
import {toast} from "sonner";


interface HabitRowProps {
	habit: GetUserHabitsResult[number];
	dayCells: DayCell[];
}

export const HabitRow = ({habit, dayCells}: HabitRowProps) => {
	
	const [lastDate, setLastDate] = useState(dayCells[0].date)
	
	const utils = trpc.useUtils()
	const {data: completions} = trpc.getHabitCompletionsById.useQuery({
		habitId: habit.id
	})
	const useCompletionMutation = trpc.toggleHabitCompletion.useMutation({
		onSuccess: () => {
			utils.getHabitCompletionsById.invalidate()
		},
		onError: (error) => {
			toast.error(error.message || 'An error occurred while toggling habit completion.')
		}
	})
	
	const handleHabitToggle = (habitId: string, date: Date) => {
		setLastDate(date)
		useCompletionMutation.mutate({
			habitId: habitId,
			date: date.toISOString()
		})
	}
	
	
	return (
		<>
			{dayCells.map((cell) => {
				const completion = completions
					? completions.find((c) => isSameDay(new Date(c.date), cell.date))
					: null;
				
				return (
					<HabitDayCell
						color={habit.color}
						onToggle={() => handleHabitToggle(habit.id, cell.date)}
						pending={useCompletionMutation.isPending && lastDate === cell.date}
						key={cell.date.toISOString()}
						date={cell.date}
						completion={completion ?? null}
					/>
				);
			})}
		</>
	);
};
