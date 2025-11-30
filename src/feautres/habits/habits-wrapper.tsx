'use client'
import {Button} from "@/components/ui/button";
import {HabitsDailyView} from "@/feautres/habits/habits-daily-view";
import {HabitsMonthlyView} from "@/feautres/habits/monthly-view/habits-monthly-view";
import {cn} from "@/lib/utils";
import {inferRouterOutputs} from "@trpc/server";
import {AppRouter} from "@/trpc/routers/_app";
import {useState} from "react";

export type GetUserHabitsResult = inferRouterOutputs<AppRouter>["getUserHabits"];

interface HabitsWrapperProps {
	habits: GetUserHabitsResult;
}

export const HabitsWrapper = ({habits}: HabitsWrapperProps) => {
	const [view, setView] = useState<'DAILY' | "MONTHLY">('MONTHLY');
	return (
		<div className='flex-1 flex flex-col gap-4'>
			<div className="inline-flex rounded-2xl bg-muted p-1 w-fit">
				<button
					onClick={() => setView("DAILY")}
					className={cn(
						"px-4 py-2 text-sm rounded-xl transition-all",
						"hover:bg-white/60 hover:shadow-sm",
						view === "DAILY"
							? "bg-white shadow font-semibold"
							: "text-muted-foreground"
					)}
				>
					Daily
				</button>
				<button
					onClick={() => setView("MONTHLY")}
					className={cn(
						"px-4 py-2 text-sm rounded-xl transition-all",
						"hover:bg-white/60 hover:shadow-sm",
						view === "MONTHLY"
							? "bg-white shadow font-semibold"
							: "text-muted-foreground"
					)}
				>
					Monthly
				</button>
			</div>
			{
				view === 'DAILY' ? <HabitsDailyView/> : <HabitsMonthlyView habits={habits}/>
			}
		</div>
	)
};