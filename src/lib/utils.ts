import {DayCell, HabitColor} from "@/lib/types";
import {clsx, type ClassValue} from "clsx"
import {startOfDay} from "date-fns";
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export const HABIT_COLOR_STYLES: Record<
	HabitColor,
	{
		base: string
		hover: string
	}
> = {
	RED: {
		base: "bg-red-200  text-red-900 border-red-300 shadow-red-200",
		hover: "hover:bg-red-200 hover:border-red-400 hover:shadow-red-300",
	},
	BLUE: {
		base: "bg-blue-200 text-blue-900 border-blue-300 shadow-blue-200",
		hover: "hover:bg-blue-200 hover:border-blue-400 hover:shadow-blue-300",
	},
	GREEN: {
		base: "bg-green-200 text-green-900 border-green-300 shadow-green-200",
		hover: "hover:bg-green-200 hover:border-green-400 hover:shadow-green-300",
	},
	YELLOW: {
		base: "bg-yellow-200 text-yellow-900 border-yellow-300 shadow-yellow-200",
		hover: "hover:bg-yellow-200 hover:border-yellow-400 hover:shadow-yellow-300",
	},
	ORANGE: {
		base: "bg-orange-200 text-orange-900 border-orange-300 shadow-orange-200",
		hover: "hover:bg-orange-200 hover:border-orange-400 hover:shadow-orange-300",
	},
	PURPLE: {
		base: "bg-purple-200 text-purple-900 border-purple-300 shadow-purple-200",
		hover: "hover:bg-purple-200 hover:border-purple-400 hover:shadow-purple-300",
	},
	PINK: {
		base: "bg-pink-200 text-pink-900 border-pink-300 shadow-pink-200",
		hover: "hover:bg-pink-200 hover:border-pink-400 hover:shadow-pink-300",
	},
	GRAY: {
		base: "bg-gray-200 text-gray-900 border-gray-300 shadow-gray-200",
		hover: "hover:bg-gray-200 hover:border-gray-400 hover:shadow-gray-300",
	},
};

export const isSameDay = (a: Date, b: Date) =>
	a.getFullYear() === b.getFullYear() &&
	a.getMonth() === b.getMonth() &&
	a.getDate() === b.getDate();


export const generateDayCells = (date: Date) => {
	
	const year = date.getFullYear();
	const month = date.getMonth();
	const daysInMonth = new Date(year, month + 1, 0).getDate();
	
	
	const dayCells: DayCell[] = Array.from({length: daysInMonth}, (_, i) => {
		const day = i + 1;
		const date = new Date(year, month, day);
		
		const weekday = date
			.toLocaleDateString("en-US", {weekday: "short"})
			.replace(".", "");
		
		return {
			day,
			date,
			weekday,
		};
	});
	
	return dayCells
}

export const getUtcMidnightIso = (d: Date) => {
	const localMid = startOfDay(d); // уже импортирован
	const utcMid = new Date(Date.UTC(localMid.getFullYear(), localMid.getMonth(), localMid.getDate()));
	return utcMid.toISOString();
};

export const parseDateToUtcMidnight = (input: string | Date): Date => {
	if (typeof input === "string") {
		const m = input.match(/^(\d{4})-(\d{2})-(\d{2})$/);
		if (m) {
			return new Date(Date.UTC(+m[1], +m[2] - 1, +m[3]));
		}
		// fallback: parse ISO-ish string then take UTC Y/M/D
		const tmp = new Date(input);
		return new Date(Date.UTC(tmp.getUTCFullYear(), tmp.getUTCMonth(), tmp.getUTCDate()));
	}
	const d = input;
	return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
};