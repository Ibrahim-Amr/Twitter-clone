import { HomeIcon } from '@heroicons/react/solid';
import {
	BellIcon,
	BookmarkIcon,
	ClipboardIcon,
	DotsCircleHorizontalIcon,
	DotsHorizontalIcon,
	HashtagIcon,
	InboxIcon,
	UserIcon,
	UsersIcon,
} from '@heroicons/react/outline';
import SidebarMenuItem from './SidebarMenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';

const Sidebar = () => {
	const [userInfo, setUserInfo] = useState({});
	let navigate = useNavigate();

	function signOut() {
		auth.signOut();
		navigate('/login');
	}

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				// console.log(user);
				setUserInfo(user);
			} else {
				// User is signed out
				// ...
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
						<SidebarMenuItem text={'Messages'} Icon={InboxIcon} />
					</NavLink>
					{/* <NavLink to={`/profile/${auth.currentUser.uid}`}>
						<SidebarMenuItem text={'Profile'} Icon={UserIcon} />
					</NavLink> */}
					{/* <NavLink to={'/users'}>
						<SidebarMenuItem text={'Users'} Icon={UsersIcon} />
					</NavLink> */}
					{/* <SidebarMenuItem text={'Notifications'} Icon={BellIcon} /> */}
					{/* <SidebarMenuItem text={'Bookmark'} Icon={BookmarkIcon} /> */}
					{/* <SidebarMenuItem text={'Lists'} Icon={ClipboardIcon} /> */}
					{/* <SidebarMenuItem text={'More'} Icon={DotsCircleHorizontalIcon} /> */}
				</div>
				{/* Button */}
				<button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline active:scale-95'>
					Tweet
				</button>
				{/* Mini Profile */}
				<div className='hoverEffect py-0 text-gray-700 dark:text-white flex items-center justify-center xl:justify-start gap-x-3 mt-auto cursor-default hover:scale-100 relative'>
					<div className='group cursor-pointer py-3 duration-200 ease-in-out'>
						<img
							className='w-10 h-w-10 rounded-full '
							src={userInfo.photoURL}
							alt='User dropdown'
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
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
