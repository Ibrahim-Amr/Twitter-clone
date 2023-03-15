import { EmojiHappyIcon, PhotographIcon } from '@heroicons/react/outline';

const Input = () => {
	return (
		<>
			<div className='flex border-b border-gray-200 dark:border-gray-50/20 p-3 gap-x-3'>
				<img
					src='https://pbs.twimg.com/profile_images/1481377313262612489/oUxpGO-6_400x400.jpg'
					alt='user image'
					className='h-11 w-11 rounded-full cursor-pointer brightness-95'
				/>
				<div className='w-full divide-y divide-gray-200 dark:divide-gray-50/20'>
					<div className=''>
						<textarea
							className='w-full rounded-md border-none focus:ring-0 text-lg placeholder:text-gray-700 dark:placeholder:text-white tracking-wide min-h-[50px] text-gray-700 dark:text-white resize-none dark:bg-black'
							rows={2}
							placeholder="What's happening?"></textarea>
					</div>
					<div className='flex justify-between items-center pt-2.5'>
						<div className='flex'>
							<PhotographIcon className='hoverEffect text-sky-500 hover:bg-sky-100 h-10 w-10 p-2' />
							<EmojiHappyIcon className='hoverEffect text-sky-500 hover:bg-sky-100 h-10 w-10 p-2' />
						</div>
						<button className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:shadow-lg hover:brightness-95 active:scale-95 disabled:scale-100 disabled:opacity-50'>
							Tweet
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default Input;
