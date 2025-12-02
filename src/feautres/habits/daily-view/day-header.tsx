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
		<div className="relative flex items-center w-full border py-15 md:py-10 rounded-xl">
			<Button
				variant="ghost"
				size="icon"
				onClick={handlePrevDay}
				className="absolute left-0"
			>
				<ArrowLeft/>
			</Button>
			
			<div className='flex-col gap-2 flex absolute left-1/2 -translate-x-1/2'>
				<h1 className="text-2xl mx-auto text-center">
					{formatedDate}
				</h1>
				<h1 className='text-center text-muted-foreground'>
					{completedHabits} / {totalHabits} habits completed
				</h1>
			</div>
			
			<Button
				variant="ghost"
				size="icon"
				disabled={disableNext}
				onClick={handleNextDay}
				className="absolute right-0"
			>
				<ArrowRight/>
			</Button>
		</div>
	)
};