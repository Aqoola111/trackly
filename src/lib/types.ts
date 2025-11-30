export type HabitColor =
	| "RED"
	| "BLUE"
	| "GREEN"
	| "YELLOW"
	| "ORANGE"
	| "PURPLE"
	| "PINK"
	| "GRAY";

export type HabitCategory = "HEALTH" | "FITNESS" | "WORK" | "STUDY" | "SLEEP";

export interface DayCell {
	day: number;
	date: Date;
	weekday: string;
}

