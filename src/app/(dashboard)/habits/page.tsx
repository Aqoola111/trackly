import {Habits} from "@/feautres/habits/habits";
import {getUtcMidnightIso} from "@/lib/utils";
import {HydrateClient, trpc} from "@/trpc/sever";
import {startOfDay} from "date-fns";

const Page = () => {
	void trpc.getUserHabits.prefetch()
	void trpc.getHabitsForDate.prefetch({
		// Will only work if server and client are in the same timezone
		date: getUtcMidnightIso(new Date())
	})
	return (
		<HydrateClient>
			<Habits/>
		</HydrateClient>
	
	)
}
export default Page
