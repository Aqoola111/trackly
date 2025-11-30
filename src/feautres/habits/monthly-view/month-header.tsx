import {Button} from "@/components/ui/button";
import {AlignLeftIcon, ArrowLeft, ArrowRight} from "lucide-react";

interface MonthHeaderProps {
	currentDate: Date,
	onPrevMonth: () => void;
	onNextMonth: () => void;
	disableNext?: boolean;
}

export const MonthHeader = ({onPrevMonth, onNextMonth, currentDate, disableNext}: MonthHeaderProps) => {
	return (
		<div className='flex items-center gap-2'>
			<Button variant='ghost' size='icon' onClick={onPrevMonth}>
				<ArrowLeft/>
			</Button>
			<h1 className='text-2xl'>
				{currentDate.toLocaleString('en-US', {month: 'long'})} {currentDate.getFullYear()}
			</h1>
			<Button variant='ghost' size='icon' disabled={disableNext} onClick={onNextMonth}>
				<ArrowRight/>
			</Button>
		</div>
	)
};