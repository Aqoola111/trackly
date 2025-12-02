'use client'
import {Logo} from "@/components/Logo";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {usePathname} from "next/navigation";

interface LayoutProps {
	children?: React.ReactNode;
}

const Layout = ({children}: LayoutProps) => {
	const path = usePathname()
	
	return (
		<div className='min-h-screen flex flex-col gap-2'>
			<div className='h-16 border-b px-6 py-4'>
				<div
					className='max-w-[1440px] mx-auto w-full flex items-center justify-between'>
					<Logo/>
					<div className='flex items-center gap-4'>
						<Button variant={'outline'} className={cn(path.includes('habits') && 'bg-primary/10')}>
							<Link href={'/habits'}>
								Habits
							</Link>
						</Button>
						<Button variant={'outline'} className={cn(path.includes('statistics') && 'bg-primary/10')}>
							<Link href={'/statistics'}>
								Statistics
							</Link>
						</Button>
					</div>
				</div>
			</div>
			<div className='max-w-[1440px] mx-auto w-full flex-1 px-6 py-4 flex flex-col'>
				{children}
			</div>
		</div>
	)
}
export default Layout
