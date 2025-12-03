import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";
import {useState} from "react";

interface DayHeaderProps {
	currentDate: Date;
	handlePrevDay: () => void;
	handleNextDay: () => void;
	disableNext?: boolean;
	completedHabits?: number;
	totalHabits?: number;
}


export const DayHeader = ({
							  handleNextDay,
							  handlePrevDay,
							  disableNext,
							  currentDate,
							  totalHabits,
							  completedHabits
						  }: DayHeaderProps) => {
	
	const local = new Date(
		currentDate.getFullYear(),
		currentDate.getMonth(),
		currentDate.getDate()
	);
	
	const formatedDate = local.toLocaleDateString("en-US", {
		weekday: "long",
		day: "numeric",
		month: "long"
	});
	
	
	return (
		<div className="relative flex items-center w-full border py-15 rounded-xl">
			<Button
				variant="outline"
				size="icon"
				onClick={handlePrevDay}
				className="absolute left-4"
			>
				<ArrowLeft/>
			</Button>
			
			<div className='flex-col gap-2 flex absolute left-1/2 -translate-x-1/2'>
				<h1 className="text-2xl mx-auto text-center">
					{formatedDate}
				</h1>
				{completedHabits !== undefined && totalHabits !== undefined && (
					<h1 className='text-center text-muted-foreground'>
						{completedHabits} / {totalHabits} habits completed
					</h1>)}
			
			</div>
			
			<Button
				variant="outline"
				size="icon"
				disabled={disableNext}
				onClick={handleNextDay}
				className="absolute right-4"
			>
				<ArrowRight/>
			</Button>
		</div>
	)
};