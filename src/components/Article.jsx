import {
	ChartBarIcon,
	ChatIcon,
	DotsHorizontalIcon,
	HeartIcon,
	ShareIcon,
	TrashIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';

const Article = ({ post }) => {
	return (
		<>
			<article className='flex justify-between items-start px-3 py-1 cursor-pointer border-b border-b-gray-200 dark:border-blue-50/20 relative'>
				{/* user image */}
				<div className='group relative'>
					<Link to={`profile/${post.data().auther}`}>
						<img
							src={post.data().autherImg}
							alt='userimg'
							width={50}
							className='h-11 w-11 rounded-full mr-4 mt-3'
						/>
					</Link>
					<div>
						<div className='group-hover:inline-block hidden absolute top-0 left-full  z-10  w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-gray-100 border-gray-200 rounded-lg shadow-sm  dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 cursor-default'>
							<div className='p-3'>
								<div className='flex items-center justify-between mb-2'>
									<span>
										<img
											className='w-10 h-10 rounded-full'
											src={post.data().autherImg}
											alt='Jese Leos'
										/>
									</span>
									<div>
										<button
											type='button'
											className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
											Message
										</button>
									</div>
								</div>
								<p className='text-base font-semibold leading-none text-gray-900 dark:text-white'>
									{post.data().autherName}
									{' · '}
									<span className='text-sm text-gray-700'>
										@{post.data().autherName.replace(/\s/g, '').toLowerCase()}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* Right Side */}
				<div className='w-full '>
					{/* Header */}
					<div className='flex justify-between items-center '>
						{/* post user info */}
						<div className='flex justify-start items-center gap-x-1 whitespace-nowrap'>
							<Link to={`profile/${post.data().auther}`}>
								<h4 className='font-bold text-[15px] sm:text-[16px] hover:underline capitalize'>
									{post.data().autherName}
								</h4>
							</Link>

							<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300  '>
								@{post.data().autherName.replace(/\s/g, '').toLowerCase()}
							</span>
							{' · '}
							<span className='text-sm sm:text-[15px] hover:underline text-gray-700 dark:text-gray-300'>
								{/* DATE */}

								{/* {post.data().timestamp.seconds} */}
							</span>
						</div>
						{/* dot icon */}
						<DotsHorizontalIcon className='hoverEffect hover:bg-sky-100 hover:text-sky-500 h-10 w-10 p-2' />
					</div>
					{/* Post text */}
					<p className='text-gray-800 dark:text-white text-[15px] sm:text-[16px] font-semibold mb-2 mt-[-10px]'>
						{post.data().text}
					</p>
					{/* post Image */}
					<img
						src={post.data().image}
						alt='post image'
						loading='lazy'
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
