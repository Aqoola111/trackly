import {Button} from "@/components/ui/button";
import {ArrowLeft, ArrowRight} from "lucide-react";

interface MonthHeaderProps {
	currentDate: Date,
	onPrevMonth: () => void;
	onNextMonth: () => void;
	disableNext?: boolean;
}

export const MonthHeader = ({onPrevMonth, onNextMonth, currentDate, disableNext}: MonthHeaderProps) => {
	return (
		<div className="relative flex items-center w-full py-2">
			
			{/* Left arrow */}
			<Button
				variant="ghost"
				size="icon"
				onClick={onPrevMonth}
				className="absolute left-0"
			>
				<ArrowLeft />
			</Button>
			
			{/* Centered title */}
			<h1 className="text-2xl text-center w-full">
				{currentDate.toLocaleString("en-US", { month: "long" })}{" "}
				{currentDate.getFullYear()}
			</h1>
			
			{/* Right arrow */}
			<Button
				variant="ghost"
				size="icon"
				disabled={disableNext}
				onClick={onNextMonth}
				className="absolute right-0"
			>
				<ArrowRight />
			</Button>
		
		</div>
	);
};
