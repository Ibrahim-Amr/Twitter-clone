import { HomeIcon } from '@heroicons/react/solid';
import { HashtagIcon, UserIcon, UsersIcon } from '@heroicons/react/outline';
import SidebarMenuItem from './SidebarMenuItem';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../Firebase';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { postModalState } from '../../atom/modalAtom';
import { useRecoilState } from 'recoil';
import ThemeToggle from './ThemeToggle';

const Sidebar = () => {
	const [userInfo, setUserInfo] = useState(null);
	const [openModal, setOpenModal] = useRecoilState(postModalState);

	let navigate = useNavigate();

	function signOut() {
		auth.signOut();
		setUserInfo(null);
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
				<div className='mt-4 mb-2.5 flex flex-col xl:items-start gap-y-4'>
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
						<SidebarMenuItem text={'Users'} Icon={UsersIcon} />
					</NavLink>
					<NavLink to={`/profile/${auth?.currentUser?.uid}`}>
						<SidebarMenuItem text={'Profile'} Icon={UserIcon} />
					</NavLink>
				</div>
				{userInfo && (
					<div className='mt-5'>
						{/* Tweet Icon */}
						<div
							onClick={() => setOpenModal((prevState) => !prevState)}
							title='New Post'
							className='flex xl:hidden items-center justify-center '>
							<button className='inline-flex items-center justify-center w-12 h-12 font-medium bg-blue-500 rounded-full hover:bg-blue-600 group focus:ring-4 focus:ring-blue-300 focus:outline-none dark:focus:ring-blue-800 active:scale-95'>
								<svg
									className='w-7 h-7 text-white'
									fill='currentColor'
									viewBox='0 0 20 20'
									xmlns='http://www.w3.org/2000/svg'>
									<path
										clipRule='evenodd'
										fillRule='evenodd'
										d='M23 3c-6.62-.1-10.38 2.421-13.05 6.03C7.29 12.61 6 17.331 6 22h2c0-1.007.07-2.012.19-3H12c4.1 0 7.48-3.082 7.94-7.054C22.79 10.147 23.17 6.359 23 3zm-7 8h-1.5v2H16c.63-.016 1.2-.08 1.72-.188C16.95 15.24 14.68 17 12 17H8.55c.57-2.512 1.57-4.851 3-6.78 2.16-2.912 5.29-4.911 9.45-5.187C20.95 8.079 19.9 11 16 11zM4 9V6H1V4h3V1h2v3h3v2H6v3H4z'></path>
								</svg>
							</button>
						</div>
						{/* Button */}
						<button
							onClick={() => setOpenModal((prevState) => !prevState)}
							className='bg-blue-400 text-white rounded-full w-56 h-12 font-bold shadow-md hover:brightness-95 text-lg hidden xl:inline active:scale-95'>
							Tweet
						</button>
					</div>
				)}
				{/* Mini Profile */}
				{userInfo && (
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
				)}
			</aside>
		</>
	);
};

export default Sidebar;
