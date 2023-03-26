import { TrashIcon } from '@heroicons/react/outline';
import React from 'react';

const test = () => {
	return (
		<>
			<motion.article
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
				className='border-b border-gray-200 dark:border-gray-50/20'>
				<div className='flex flex-shrink-0 p-4 pb-0'>
					<a className='flex-shrink-0 group block'>
						<div className='flex items-center'>
							<div>
								<img
									className='inline-block h-10 w-10 rounded-full'
									src={
										post.data().autherImg == null
											? 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
											: post.data().autherImg
									}
									alt='avatar'
								/>
							</div>
							<div className='ml-3'>
								<p className='text-base leading-6 font-medium text-black dark:text-white'>
									{post.data().autherName}
									<span className='text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150'>
										@{post.data().autherName.replace(/\s/g, '').toLowerCase()}
									</span>
								</p>
							</div>
						</div>
					</a>
				</div>

				<div className='pl-16 pr-5'>
					<p className='text-base width-auto font-medium text-black dark:text-white flex-shrink'>
						{post.data().text}
					</p>
					{post.data().image && (
						<div className='md:flex-shrink pr-6 pt-3'>
							<div className='rounded-lg w-full h-[200px] max-h-[500px] overflow-hidden'>
								<img
									className='w-full h-full object-cover'
									src={post.data().image}
									alt='post image'
									loading='lazy'
								/>
							</div>
						</div>
					)}
					{/* Icons */}
					<div className='flex justify-between items-center text-gray-500 dark:text-white my-1'>
						<div className='flex items-center'>
							<ChatIcon
								onClick={() => {
									setOpenModal((prevState) => !prevState);
									setPostId(post.id);
								}}
								className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100'
							/>
							{post?.data()?.comments?.length > 0 && (
								<span className='text-sm'>{post?.data()?.comments?.length}</span>
							)}
						</div>
						<ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-100' />
						<div className='flex items-center'>
							{hasLiked ? (
								<HeartSolid
									onClick={likePost}
									className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100'
								/>
							) : (
								<HeartIcon
									onClick={likePost}
									className='h-9 w-9 hoverEffect p-2 hover:text-pink-500 hover:bg-pink-100'
								/>
							)}
							{post?.data()?.Likes.length > 0 && (
								<span className={`${hasLiked && 'text-red-600'} text-sm`}>
									{post?.data()?.Likes.length}
								</span>
							)}
						</div>

						<ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100' />
						{post?.data()?.auther === auth?.currentUser?.uid && (
							<TrashIcon
								onClick={deletePost}
								className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
							/>
						)}
					</div>
				</div>
			</motion.article>
		</>
	);
};

export default test;
