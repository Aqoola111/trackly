import {Habits} from "@/feautres/habits/habits";
import {HydrateClient, trpc} from "@/trpc/sever";

const Page = () => {
	void trpc.getUserHabits.prefetch()
	return (
		<div className='flex flex-col gap-2 flex-1'>
			<h1 className='text-xl md:text-2xl lg:text-3xl font-bold'>
				Your habits
			</h1>
			<p className='text-muted-foreground'>
				Track your daily progress and build consistency
			</p>
			<HydrateClient>
				<Habits/>
			</HydrateClient>
		</div>
	)
}
export default Page
