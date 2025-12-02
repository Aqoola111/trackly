import {GetUserHabitsResult} from "@/feautres/habits/habits-wrapper";
import {DayRowCell} from "@/feautres/habits/monthly-view/day-row-cell";
import {HabitRow} from "@/feautres/habits/monthly-view/habit-row";
import {MonthHeader} from "@/feautres/habits/monthly-view/month-header";
import {DayCell} from "@/lib/types";
import {cn, generateDayCells, HABIT_COLOR_STYLES} from "@/lib/utils";
import {Fragment, useEffect, useState} from "react";

interface HabitsMonthlyViewProps {
	habits: GetUserHabitsResult
}


export const CELL_SIZE = "w-12 h-12";

export const HabitsMonthlyView = ({habits}: HabitsMonthlyViewProps) => {
	const [date, setDate] = useState<Date>(new Date());
	const [dayCells, setDayCells] = useState<DayCell[]>(generateDayCells(date));
	
	useEffect(() => {
		const newDayCells = generateDayCells(date);
		setDayCells(newDayCells);
	}, [date]);
	
	const handleNextMonth = () => {
		const next = new Date(date);
		next.setMonth(date.getMonth() + 1);
		setDate(next);
	};
	
	const handlePrevMonth = () => {
		const prev = new Date(date);
		prev.setMonth(date.getMonth() - 1);
		setDate(prev);
	};
	
	return (
		<div className="flex flex-col items-start lg:items-center gap-5 flex-1 max-w-[1440px] w-full mx-auto">
			<MonthHeader
				currentDate={date}
				onPrevMonth={handlePrevMonth}
				onNextMonth={handleNextMonth}
			/>
			
			
			<div className="flex w-full flex-1">
				{/* LEFT FIXED COLUMN */}
				<div className="flex flex-col gap-2 w-[150px] sm:w-[190px] lg:w-[180px] shrink-0">
					<div className="h-[60px]"/>
					{habits.map(h => (
						<div key={h.id} className={cn("h-12 flex items-center font-medium",)}>
							
							<span className={cn(" whitespace-nowrap")}>
			{h.title}
		</span>
						
						</div>
					))}
				</div>
				
				
				<div className="overflow-x-auto w-full">
					<div
						className="grid gap-2 min-w-max"
						style={{gridTemplateColumns: `repeat(${dayCells.length}, 48px)`}}
					>
						
						{dayCells.map(cell => (
							<DayRowCell key={cell.day} cell={cell}/>
						))}
						
						
						<div className="h-4 col-span-full"></div>
						
						
						{habits.map(habit => (
							<HabitRow key={habit.id} habit={habit} dayCells={dayCells}/>
						))}
					</div>
				</div>
			</div>
		</div>
	)
};