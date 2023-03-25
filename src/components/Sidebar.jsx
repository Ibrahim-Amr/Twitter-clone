import { HomeIcon } from '@heroicons/react/solid';
import { HashtagIcon, UsersIcon } from '@heroicons/react/outline';
import SidebarMenuItem from './SidebarMenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { postModalState } from '../../atom/modalAtom';
import { useRecoilState } from 'recoil';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
	const [userInfo, setUserInfo] = useState({});
	const [openModal, setOpenModal] = useRecoilState(postModalState);

	let navigate = useNavigate();

	function signOut() {
		auth.signOut();
		navigate('/login');
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserInfo(user);
			}
		});
	}, [auth]);

	return (
		<>
			<aside className='hidden sm:flex flex-col p-2 xl:items-start fixed top-0 h-full z-10'>
				{/* Twitter Logo */}
				<div className='hoverEffect p-0 hover:bg-blue-100'>
					<img
						src='https://help.twitter.com/content/dam/help-twitter/brand/logo.png'
						alt='logo'
						width={50}
						height={50}
					/>
				</div>
				{/* Menu */}
				<div className='mt-4 mb-2.5 xl:items-start'>
					<div className='block xl:hidden'>
						<ThemeToggle />
					</div>
					<NavLink to={'/'}>
						<SidebarMenuItem text={'Home'} Icon={HomeIcon} />
					</NavLink>
					<NavLink to={'/explore'}>
						<SidebarMenuItem text={'Explore'} Icon={HashtagIcon} />
					</NavLink>
					<NavLink to={'/users'}>
						<SidebarMenuItem text={'Messages'} Icon={UsersIcon} />
					</NavLink>
					{/* Add Post */}
					<div
						onClick={() => setOpenModal((prevState) => !prevState)}
						title='New Post'
						className='flex xl:hidden items-center justify-center '>
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
				</div>
				{/* Button */}
				<button
					onClick={() => setOpenModal((prevState) => !prevState)}
					className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline active:scale-95'>
					Tweet
				</button>
				{/* Mini Profile */}
				<div className='hoverEffect py-0 text-gray-700 dark:text-white flex items-center justify-center xl:justify-start gap-x-3 mt-auto cursor-default hover:scale-100 relative '>
					<div className='group cursor-pointer py-3 duration-200 ease-in-out'>
						<img
							className='w-10 h-w-10 rounded-full '
							src={
								userInfo.photoURL == null
									? 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
									: userInfo.photoURL
							}
							alt='User'
						/>
						{/* <!-- Dropdown menu --> */}
						<div className='group-hover:inline-block hidden  absolute top-0 -translate-y-full bg-white dark:bg-black divide-y divide-gray-100 rounded-lg shadow w-44  dark:divide-gray-50/20 border border-gray-50/20 duration-200 ease-in-out '>
							<ul className='py-2 text-sm text-gray-700 dark:text-gray-200 '>
								<li>
									<Link
										to={'/'}
										className='block px-4 py-2 text-black dark:text-white hoverEffect rounded-none w-full'>
										Home
									</Link>
								</li>
							</ul>
							<div className='py-1 cursor-pointer w-full'>
								<span
									onClick={signOut}
									className='block px-4 py-2 text-sm  dark:text-gray-20 text-black dark:text-white hoverEffect rounded-none w-full'>
									Sign out
								</span>
							</div>
						</div>
					</div>
					<div className='leading-5 hidden xl:inline'>
						<h4 className='font-bold dark:text-white'>{userInfo.displayName}</h4>
						<p className='text-gray-500'>@{userInfo.displayName}</p>
					</div>
					{/* Theme */}
					<div className='hidden xl:block'>
						<ThemeToggle />
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
