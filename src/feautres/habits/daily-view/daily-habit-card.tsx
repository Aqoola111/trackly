import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Separator} from "@/components/ui/separator";
import {GetHabitsForDateResult} from "@/feautres/habits/habits-wrapper";
import {AppRouter} from "@/trpc/routers/_app";
import {inferRouterOutputs} from "@trpc/server";


interface DailyHabitCardProps {
	habit: GetHabitsForDateResult[number]
	onToggle: () => void
	date: Date
}

export function DailyHabitCard({habit, onToggle,date}: DailyHabitCardProps) {
	const isDone =  habit.completions?.[0]?.done ?? false
	const habitDate = date
	const isOverdue = habitDate && !isDone && new Date(habitDate) < new Date(new Date().setHours(0, 0, 0, 0))
	
	return (
		<div onClick={onToggle} className="w-full">
			<div
				className={`rounded-2xl transition-all duration-300 p-5 ${
					isDone
						? "bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950 dark:to-teal-950 shadow-lg shadow-emerald-100 dark:shadow-emerald-950/50"
						: isOverdue
							? "bg-gradient-to-br from-red-50 to-rose-50 dark:from-red-950 dark:to-rose-950 shadow-lg shadow-red-100 dark:shadow-red-950/50 border-2 border-red-200 dark:border-red-800"
							: "bg-white dark:bg-neutral-900 shadow-md hover:shadow-xl"
				}`}
			>
				<div className="flex items-center justify-between gap-4">
					{/* Left side: Text content */}
					<div className="flex-1 min-w-0">
						<h3
							className={`text-lg font-semibold mb-1.5 truncate ${
								isDone
									? "text-emerald-900 dark:text-emerald-100"
									: isOverdue
										? "text-red-900 dark:text-red-100"
										: "text-neutral-900 dark:text-neutral-100"
							}`}
						>
							{habit.title}
						</h3>
						
						<div className="flex items-center gap-2 flex-wrap">
							{habit.category && (
								<span
									className={`text-xs px-2 py-0.5 rounded-full font-medium ${
										isDone
											? "bg-emerald-200 dark:bg-emerald-800 text-emerald-800 dark:text-emerald-200"
											: isOverdue
												? "bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200"
												: "bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300"
									}`}
								>
                  {habit.category}
                </span>
							)}
							<span
								className={`text-xs ${
									isDone
										? "text-emerald-700 dark:text-emerald-300"
										: isOverdue
											? "text-red-700 dark:text-red-300"
											: "text-neutral-500 dark:text-neutral-400"
								}`}
							>
                {habit.frequency}
              </span>
							{isOverdue &&
                                <span className="text-xs font-semibold text-red-600 dark:text-red-400">Overdue</span>}
						</div>
					</div>
					
					{/* Right side: Toggle button */}
					<button
						onClick={onToggle}
						className={`flex-shrink-0 w-12 h-12 rounded-full transition-all duration-300 flex items-center justify-center ${
							isDone
								? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-lg shadow-emerald-200 dark:shadow-emerald-900/50 scale-100 hover:scale-105"
								: isOverdue
									? "bg-gradient-to-br from-red-500 to-rose-600 shadow-lg shadow-red-200 dark:shadow-red-900/50 hover:scale-105"
									: "bg-neutral-200 dark:bg-neutral-700 hover:bg-neutral-300 dark:hover:bg-neutral-600 shadow-sm hover:shadow-md"
						}`}
						aria-label={isDone ? "Mark as incomplete" : "Mark as complete"}
					>
						{isDone ? (
							<svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"
								 strokeWidth={3}>
								<path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
							</svg>
						) : (
							<div
								className={`w-5 h-5 rounded-full border-2 ${
									isOverdue ? "border-white" : "border-neutral-400 dark:border-neutral-500"
								}`}
							/>
						)}
					</button>
				</div>
			</div>
		</div>
	)
}