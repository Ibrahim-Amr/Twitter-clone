import { SparklesIcon } from '@heroicons/react/outline';
const HomeHeader = () => {
	return (
		<>
			<div className='sticky top-0 z-50 flex justify-between items-center bg-white dark:bg-black border-b border-gray-200 dark:border-gray-50/20 py-2 px-3'>
				<h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Home</h2>
				<div className='hoverEffect flex justify-center items-center p-0 w-9 h-9'>
					<SparklesIcon className='h-5' />
				</div>
			</div>
		</>
	);
};

export default HomeHeader;
