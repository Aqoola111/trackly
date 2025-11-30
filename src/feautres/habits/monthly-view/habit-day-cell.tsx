import {Button} from "@/components/ui/button";
import {HabitCompletion} from "@/generated/prisma/client";
import {AppRouter} from "@/trpc/routers/_app";
import {inferRouterOutputs} from "@trpc/server";
import {isAfter, isBefore} from "date-fns";
import {Check, XIcon} from "lucide-react";
import {CELL_SIZE} from "./habits-monthly-view";
import {cn, HABIT_COLOR_STYLES} from "@/lib/utils";

type HabitCompletions = inferRouterOutputs<AppRouter>["getHabitCompletionsById"][number]

interface HabitDayCellProps {
	completion: HabitCompletions | null
	date: Date
	onToggle: () => void;
	pending?: boolean;
	color: keyof typeof HABIT_COLOR_STYLES;
}

export const HabitDayCell = ({completion, onToggle, pending, color}: HabitDayCellProps) => {
	const disabled = completion === null || pending
	const today = new Date();
	return (
		<Button
			variant='outline'
			disabled={disabled}
			size='icon'
			onClick={onToggle}
			className={cn(
				"border rounded-lg flex items-center justify-center cursor-pointer",
				CELL_SIZE,
				!disabled && "bg-accent",
				completion?.done && "bg-green-400 border-green-500",
				completion?.done === false && isAfter(today, completion.date) && "bg-red-400 border-red-500",
				HABIT_COLOR_STYLES[color].base
			)}
		>
			{completion && (
				isBefore(new Date(completion.date), today)  // прошедший день
					? (completion.done ? <Check/> : <XIcon/>) // показываем done/undone
					: (completion.done ? <Check/> : null)      // сегодня -> показываем только done
			)}
		</Button>
	)
};