import {CELL_SIZE} from "@/feautres/habits/monthly-view/habits-monthly-view";
import {DayCell} from "@/lib/types";
import {cn, isSameDay} from "@/lib/utils";

interface DayRowCellProps {
	cell: DayCell;
}

export const DayRowCell = ({cell}: DayRowCellProps) => {
	const today = new Date();
	return (
		<div
			className={cn(
				"px-3 py-2 flex flex-col items-center transition-all",
				"rounded-xl border border-border text-2xl backdrop-blur-sm",
				"hover:bg-accent/40 hover:shadow-md",
				isSameDay(today, cell.date) && "bg-primary/20 border-primary/60 shadow-primary/30 shadow-md",
				CELL_SIZE
			)}
			key={cell.day}
		>
			{cell.day}
			<span className="text-sm opacity-70 py-2">{cell.weekday}</span>
		</div>
	)
};