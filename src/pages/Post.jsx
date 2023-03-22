import React from 'react';

const Post = () => {
	return (
		<>
			<div className='w-full h-screenoverflow-hidden'>
				<div className='flex items-center p-3 border-b border-gray-50/20 w-full sticky top-0 bg-white  dark:bg-black z-50 shadow'>
					<span className='text-lg sm:text-xl font-bold cursor-pointer text-gray-600 dark:text-white'>
						Post
					</span>
				</div>
			</div>
		</>
	);
};

export default Post;
