'use client'
import Image from "next/image";

interface logoProps {
	onlyIcon?: boolean;
}

export const Logo = ({onlyIcon = false}: logoProps) => {
	return (
		<div className='flex items-center gap-2'>
			<Image src={'/target.svg'} alt={'logo'} height={30} width={30}/>
			{!onlyIcon &&
                <span className='font-semibold text-2xl'>
				Trackly
			</span>
			}
		</div>
	)
};