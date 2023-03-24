import { HomeIcon } from '@heroicons/react/solid';
import { HashtagIcon, UsersIcon } from '@heroicons/react/outline';
import SidebarMenuItem from './SidebarMenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { postModalState } from '../../atom/modalAtom';
import { useRecoilState } from 'recoil';

const Sidebar = () => {
	const [userInfo, setUserInfo] = useState({});
	const [openModal, setOpenModal] = useRecoilState(postModalState);
	const [theme, setTheme] = useState('light');
	let navigate = useNavigate();

	function signOut() {
		auth.signOut();
		navigate('/login');
	}

	// Theme function
	useEffect(() => {
		let localTheme = localStorage.getItem('theme');
		if (localTheme === 'dark') {
			document.documentElement.classList.add('dark');
			setTheme('dark');
		} else {
			document.documentElement.classList.remove('dark');
			setTheme('');
		}
	}, [theme]);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserInfo(user);
			}
		});
	}, [auth]);

	return (
		<>
			<aside className='hidden sm:flex flex-col p-2 xl:items-start fixed top-0 h-full'>
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
					<NavLink to={'/'}>
						<SidebarMenuItem text={'Home'} Icon={HomeIcon} />
					</NavLink>
					<NavLink to={'/explore'}>
						<SidebarMenuItem text={'Explore'} Icon={HashtagIcon} />
					</NavLink>
					<NavLink to={'/users'}>
						<SidebarMenuItem text={'Messages'} Icon={UsersIcon} />
					</NavLink>
				</div>
				{/* Button */}
				<button
					onClick={() => setOpenModal((prevState) => !prevState)}
					className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline active:scale-95'>
					Tweet
				</button>
				{/* Mini Profile */}
				<div className='hoverEffect py-0 text-gray-700 dark:text-white flex items-center justify-center xl:justify-start gap-x-3 mt-auto cursor-default hover:scale-100 relative'>
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
						<div className='group-hover:inline hidden z-10 absolute top-0 -translate-y-full bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-black dark:divide-gray-50/20 border border-gray-50/20 duration-200 ease-in-out'>
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
					<div className='hoverEffect hover:bg-gray-300 h-10 w-10 p-3 flex justify-center items-center ml-1'>
						<label className='swap swap-rotate'>
							{/* <!-- this hidden checkbox controls the state --> */}
							<input
								type='checkbox'
								className='hidden'
								checked={theme === 'dark' ? true : false}
							/>
							{/* <!-- sun icon --> */}
							<svg
								onClick={() => {
									localStorage.setItem('theme', 'dark');
									setTheme('dark');
								}}
								className='swap-on fill-current w-8 h-8 text-black dark:text-white '
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'>
								<path d='M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z' />
							</svg>
							{/* <!-- moon icon --> */}
							<svg
								onClick={() => {
									localStorage.setItem('theme', 'light');
									setTheme('light');
								}}
								className='swap-off fill-current w-8 h-8 text-black dark:text-white'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 24 24'>
								<path d='M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z' />
							</svg>
						</label>
					</div>
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
