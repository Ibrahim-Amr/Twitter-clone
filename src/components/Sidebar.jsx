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
} from '@heroicons/react/outline';
import SidebarMenuItem from './SidebarMenuItem';
import { Link, useNavigate } from 'react-router-dom';
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
			<aside className='hidden sm:flex flex-col p-2 xl:items-start fixed h-full '>
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
					<Link to={'/'}>
						<SidebarMenuItem text={'Home'} Icon={HomeIcon} active />
					</Link>
					<Link to={'/explore'}>
						<SidebarMenuItem text={'Explore'} Icon={HashtagIcon} />
					</Link>
					<SidebarMenuItem text={'Notifications'} Icon={BellIcon} />
					<SidebarMenuItem text={'Messages'} Icon={InboxIcon} />
					<SidebarMenuItem text={'Bookmark'} Icon={BookmarkIcon} />
					<SidebarMenuItem text={'Lists'} Icon={ClipboardIcon} />
					<SidebarMenuItem text={'Profile'} Icon={UserIcon} />
					<SidebarMenuItem text={'More'} Icon={DotsCircleHorizontalIcon} />
				</div>
				{/* Button */}
				<button className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline active:scale-95'>
					Tweet
				</button>
				{/* Mini Profile */}
				<div
					onClick={signOut}
					className='hoverEffect text-gray-700 dark:text-white flex items-center justify-center xl:justify-start mt-auto'>
					<img
						src={userInfo.photoURL}
						alt='avatar'
						className='h-10 w-10 rounded-full xl:mr-2'
					/>
					<div className='leading-5 hidden xl:inline'>
						<h4 className='font-bold dark:text-white'>{userInfo.displayName}</h4>
						<p className='text-gray-500'>@{userInfo.displayName}</p>
					</div>
					<DotsHorizontalIcon className='h-5 xl:ml-8 hidden xl:inline' />
				</div>
			</aside>
		</>
	);
};

export default Sidebar;
