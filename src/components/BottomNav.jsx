import { NewspaperIcon, UserIcon, UsersIcon } from '@heroicons/react/outline';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';

const BottomNav = () => {
	return (
		<>
			<div class='fixed bottom-0 z-50 w-full h-16 -translate-x-1/2 bg-white border border-gray-200 left-1/2 dark:bg-gray-700 dark:border-gray-600 sm:hidden'>
				<div class='grid h-full max-w-lg grid-cols-5 mx-auto'>
					{/* Home */}
					<Link
						to={'/'}
						title='Homep'
						class='inline-flex flex-col items-center justify-center px-5 rounded-l-full hover:bg-gray-50 dark:hover:bg-gray-800 group'>
						<svg
							class='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'
							fill='currentColor'
							viewBox='0 0 20 20'
							xmlns='http://www.w3.org/2000/svg'>
							<path d='M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z'></path>
						</svg>
					</Link>
					{/* Users */}
					<Link
						to={'/users'}
						title='Users'
						class='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'>
						<UsersIcon class='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
					</Link>
					{/* Add Post */}
					<div title='New Post' class='flex items-center justify-center'>
						<button class='inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800'>
							<svg
								class='w-6 h-6 text-white'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'>
								<path
									clip-rule='evenodd'
									fill-rule='evenodd'
									d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'></path>
							</svg>
						</button>
					</div>
					{/* Settings */}
					<Link
						to={'/explore'}
						title='Explore'
						class='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'>
						<NewspaperIcon class='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
					</Link>
					{/* Profile */}
					<Link
						// to={`/profile/${auth.currentUser.uid}`}
						title='Profile'
						class='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'>
						<UserIcon class='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
					</Link>
				</div>
			</div>
		</>
	);
};

export default BottomNav;
