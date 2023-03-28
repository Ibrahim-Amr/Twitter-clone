import { LogoutIcon, NewspaperIcon, UsersIcon } from '@heroicons/react/outline';
import { UserIcon } from '@heroicons/react/solid';
import { onAuthStateChanged } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { postModalState } from '../../atom/modalAtom';
import { auth } from '../Firebase';

const BottomNav = () => {
	const [user, setUser] = useState(null);
	const [openModal, setOpenModal] = useRecoilState(postModalState);
	let navigate = useNavigate();
	let location = useLocation();

	console.log(location);
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			}
		});
	}, []);

	function signOut() {
		auth.signOut();
		setUser(null);
		navigate('/login');
	}

	return (
		<>
			{user && (
				<div className='fixed bottom-0 left-0 z-50 w-full h-16 max-h-16  bg-white border-t border-gray-200  dark:bg-black dark:border-gray-600 sm:hidden'>
					<div className='grid h-full max-w-lg grid-cols-6 mx-auto'>
						{/* Home */}
						<Link
							to={'/'}
							title='Homep'
							className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'>
							<svg
								className='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500'
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
							className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'>
							<UsersIcon className='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
						</Link>
						{/* Add Post */}
						<div
							onClick={() =>
								auth.currentUser
									? setOpenModal((prevState) => !prevState)
									: window.alert('please login first')
							}
							title='New Post'
							className='flex items-center justify-center active:scale-95 duration-150 ease-in-out'>
							<button className='inline-flex items-center justify-center w-10 h-10 font-medium bg-blue-600 rounded-full hover:bg-blue-700 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800'>
								<svg
									className='w-6 h-6 text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z'></path>
								</svg>
							</button>
						</div>
						{/* News */}
						<Link
							to={'/explore'}
							title='Explore'
							className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'>
							<NewspaperIcon className='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
						</Link>
						{/* Profile */}
						<Link
							to={`/profile/${auth?.currentUser?.uid}`}
							title='profile'
							className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group'>
							<UserIcon className='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
						</Link>
						{/* Profile */}
						<div
							title='Logout'
							onClick={signOut}
							className='inline-flex flex-col items-center justify-center px-5 hover:bg-gray-50 dark:hover:bg-gray-800 group cursor-pointer'>
							<LogoutIcon className='w-6 h-6 mb-1 text-gray-500 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-500' />
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default BottomNav;
