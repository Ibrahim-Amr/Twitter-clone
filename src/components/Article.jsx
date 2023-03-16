import {
	ChartBarIcon,
	ChatIcon,
	DotsHorizontalIcon,
	HeartIcon,
	ShareIcon,
	TrashIcon,
} from '@heroicons/react/outline';

const Article = ({ post }) => {
	console.log(post);
	return (
		<>
			<article className='flex justify-between items-start px-3 py-1 cursor-pointer border-b border-b-gray-200 dark:border-blue-50/20'>
				{/* user image */}
				<img
					src={post.autherImg}
					alt='userimg'
					width={50}
					className='h-11 w-11 rounded-full mr-4 mt-3'
				/>
				{/* Right Side */}
				<div className='w-full '>
					{/* Header */}
					<div className='flex justify-between items-center '>
						{/* post user info */}
						<div className='flex justify-start items-center gap-x-1 whitespace-nowrap'>
							<h4 className='font-bold text-[15px] sm:text-[16px] hover:underline'>
								{post.autherName}
							</h4>
							<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 '>
								@{post.autherName}
							</span>
							{' · '}
							<span className='text-sm sm:text-[15px] hover:underline text-gray-700 dark:text-gray-300'>
								{post.timestamp.seconds}
							</span>
						</div>
						{/* dot icon */}
						<DotsHorizontalIcon className='hoverEffect hover:bg-sky-100 hover:text-sky-500 h-10 w-10 p-2' />
					</div>
					{/* Post text */}
					<p className='text-gray-800 dark:text-white text-[15px] sm:text-[16px] font-semibold mb-2 mt-[-10px]'>
						{post.text}
					</p>
					{/* post Image */}
					<img
						src={post.image}
						alt='post image'
						className='rounded-2xl mr-2 w-full max-h-[500px] object-cover'
					/>
					{/* Icons */}
					<div className='flex justify-between items-center text-gray-500 dark:text-white my-1'>
						<ChatIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100' />
						<ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-100' />
						<HeartIcon className='h-9 w-9 hoverEffect p-2 hover:text-pink-500 hover:bg-pink-100' />
						<ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100' />
						<TrashIcon className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100' />
					</div>
				</div>
			</article>
		</>
	);
};

export default Article;
