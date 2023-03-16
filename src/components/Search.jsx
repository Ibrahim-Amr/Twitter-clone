import { SearchIcon } from '@heroicons/react/outline';

const Search = () => {
	return (
		<>
			<div className='sticky top-3 bg-white dark:bg-black pt-2w z-50 space-y-3 flex flex-col justify-center items-start'>
				<div className='flex items-center p-3 rounded-ful relative w-full'>
					<SearchIcon className='h-5 z-50 text-gray-700 dark:text-gray-500' />
					<input
						type='text'
						placeholder='Search Twitter'
						className='absolute inset-0 rounded-full pl-11 border-gray-500 dark:border-0 focus: dark:text-white placeholder:text-gray-500 focus:shadow-md  bg-gray-100 dark:bg-[#16181C] focus:dark:bg-black focus:bg-white duration-150 ease-in-out w-full'
					/>
				</div>
			</div>
			{/* Search */}
		</>
	);
};

export default Search;
