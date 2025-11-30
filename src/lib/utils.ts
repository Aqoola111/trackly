import {HabitColor} from "@/lib/types";
import {clsx, type ClassValue} from "clsx"
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