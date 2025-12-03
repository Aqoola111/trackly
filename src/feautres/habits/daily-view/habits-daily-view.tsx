import LoaderSpinner from "@/components/loader-spinner";
import {DailyHabitCard} from "@/feautres/habits/daily-view/daily-habit-card";
import {DayHeader} from "@/feautres/habits/daily-view/day-header";
import {GetHabitsForDateResult} from "@/feautres/habits/habits-wrapper";
import {getUtcMidnightIso} from "@/lib/utils";
import {trpc} from "@/trpc/client";
import {addDays, startOfDay} from "date-fns";
import {useEffect, useState} from "react";


interface HabitsDailyViewProps {
	habits: GetHabitsForDateResult
}


export const HabitsDailyView = ({habits}: HabitsDailyViewProps) => {
	const utils = trpc.useUtils()
	const [date, setDate] = useState<Date>(startOfDay(new Date()));
	const [habitsForDate, setHabits] = useState<GetHabitsForDateResult | undefined>(habits);
	const [completedHabits, setCompletedHabits] = useState<undefined | number>(undefined)
	const [habitsCount, setHabitsCount] = useState<undefined | number>(undefined)
	
	const {data} = trpc.getHabitsForDate.useQuery(
		{
			date: getUtcMidnightIso(date),
		}
	)
	
	useEffect(() => {
		setHabits(undefined)
		setCompletedHabits(undefined)
		setHabitsCount(undefined)
		if (data) {
			setHabits(data)
			setHabitsCount(data.length)
			let counter = 0
			data.map(h => {
				if (h.completions?.[0]?.done) {
					counter += 1
				}
			})
			setCompletedHabits(counter)
		}
	}, [data])
	
	
	const useToggleCompletionMutation = trpc.toggleHabitCompletion.useMutation({
		onSuccess: () => {
			utils.getHabitsForDate.invalidate({
				date: getUtcMidnightIso(date)
			})
		}
	})
	
	const handleToggleCompletion = (habitId: string) => {
		useToggleCompletionMutation.mutate({
			habitId,
			date: getUtcMidnightIso(date)
		})
	}
	
	const handlePrevDay = () => {
		setDate(prev => addDays(startOfDay(prev), -1));
	};
	
	const handleNextDay = () => {
		setDate(prev => addDays(startOfDay(prev), 1));
	};
	return (
		<div className='flex-1 flex-col flex gap-2 p-4'>
			<DayHeader completedHabits={completedHabits}
					   totalHabits={habitsCount}
					   handleNextDay={handleNextDay} handlePrevDay={handlePrevDay} currentDate={date}/>
			{
				!habitsForDate ? (
					<LoaderSpinner/>
				) : (
					<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
						{habitsForDate.map((habit) => (
							<DailyHabitCard date={date} key={habit.id} habit={habit}
											onToggle={() => handleToggleCompletion(habit.id)}/>
						))}
					</div>
				)
			}
		</div>
	)
};