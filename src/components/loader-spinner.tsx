import {Loader} from "lucide-react";

const LoaderSpinner = () => {
	return (
		<div className='flex-1 flex items-center justify-center h-full'>
			<Loader className='animate-spin'/>
		</div>
	)
}
export default LoaderSpinner
