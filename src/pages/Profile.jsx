import { CalendarIcon } from '@heroicons/react/outline';
import { LinkIcon } from '@heroicons/react/solid';
import { collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { auth, db } from '../Firebase';
import Article from '../components/Article';
import Spinner from '../components/Spinner';
import { useRecoilState } from 'recoil';
import { editProfileState } from '../../atom/modalAtom';

const Profile = () => {
	const [posts, setPosts] = useState([]);
	const [userData, setUserData] = useState([]);
	let { id } = useParams();
	const [openModal, setOpenModal] = useRecoilState(editProfileState);

	// Getting user data
	useEffect(() => {
		let userRef = collection(db, 'users');
		const q = query(userRef, where('id', '==', id));
		const userUnsub = onSnapshot(q, (snapshot) => setUserData(snapshot?.docs[0]?.data()));
		return userUnsub;
	}, [id]);

	useEffect(() => {
		// Getting user Posts
		let postRef = collection(db, 'posts');
		const q = query(postRef, where('auther', '==', id), orderBy('timestamp', 'desc'));
		const postUnsub = onSnapshot(q, (snapshot) => setPosts(snapshot.docs));
		return postUnsub;
	}, [id]);

	if (userData?.length < 0) {
		return <Spinner />;
	}

	return (
		<>
			<section className='min-h-screen mb-16'>
				{/* <!-- User card --> */}
				<div>
					{/* Cover Image */}
					<div className='w-full h-[200px]'>
						<img
							className='w-full h-full object-cover'
							src='https://scontent.fcai20-6.fna.fbcdn.net/v/t1.18169-9/13417541_1212919185440026_4001463876724524663_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=gbrr7qAqpLkAX_Gkja1&_nc_ht=scontent.fcai20-6.fna&oh=00_AfCIcjXRI5Koy2m-S4eZDV5CxNmCsa08QKQhpvL02Cla2w&oe=6447B6B8'
							alt='Cover'
						/>
					</div>
					<div>
						{/* <!-- Avatar --> */}
						<div className='relative flex justify-between items-center w-full px-5'>
							<div className='md rounded-full relative avatar h-[9rem] w-[9rem] mt-[-5rem]'>
								<img
									className='md rounded-full relative border-4 border-gray-200 dark:border-black'
									src={
										userData?.avatar == null
											? 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
											: userData?.avatar
									}
									alt='avatar'
								/>
							</div>
							{/* <!-- Edit Button --> */}
							{userData && id == auth.currentUser.uid && (
								<div className='flex flex-col text-right'>
									<button
										onClick={() => setOpenModal((prevState) => !prevState)}
										className='flex justify-center max-h-max whitespace-nowrap focus:outline-none focus:ring max-w-max border bg-transparent border-blue-500 text-blue-500 hover:border-blue-800 items-center hover:shadow-lg font-bold py-2 px-4 rounded-full mr-0 ml-auto active:scale-95 duration-150 ease-in-out'>
										Edit Profile
									</button>
								</div>
							)}
						</div>

						{/* <!-- Profile info --> */}
						{userData && (
							<div className='space-y-1 justify-center w-full mt-3  border-b  border-gray-200 dark:border-gray-50/20 px-5'>
								{/* <!-- User basic--> */}
								<div>
									<h2 className='text-xl leading-6 font-bold text-black dark:text-white capitalize'>
										{userData?.name}
									</h2>
									<p className='text-sm leading-5 font-medium text-gray-500'>
										@{userData?.name?.replace(/\s/g, '')?.toLowerCase()}
									</p>
								</div>
								{/* <!-- Description and others --> */}
								<div className='mt-3 pb-3'>
									<p className='text-black dark:text-white leading-tight mb-3 w-2/3'>
										{userData?.bio}
									</p>
									<div className='text-gray-600 flex'>
										{id == 'lgypM4w7D9VvTlQUrARSDc6BN703' && (
											<span className='flex mr-2'>
												<LinkIcon className='h-5 w-5 text-black dark:text-white' />
												<Link
													to={'https://ibrahim-amr.github.io/portfolio_v2/#/'}
													target='_blank'
													className='leading-5 ml-1 text-blue-400'>
													Portfolio
												</Link>
											</span>
										)}

										<span className='flex mr-2' title='Date Joined'>
											<CalendarIcon className='h-5 w-5 text-black dark:text-white' />
											<span className='leading-5 ml-1 text-gray-600 dark:text-white'>
												{userData?.creationTime ??
													auth?.currentUser?.metadata?.creationTime}
											</span>
										</span>
									</div>
								</div>
							</div>
						)}
					</div>
				</div>
				{!userData && (
					<h2 className='text-black dark:text-white text-3xl font-semibold text-center border-t border-gray-200 dark:border-gray-50/20 mt-3 py-3'>
						This account doesn’t exist
					</h2>
				)}
				{/* Posts */}
				{posts.map((post) => (
					<Article key={post.id} post={post} />
				))}
				{/* <article className='border-b border-gray-200 dark:border-gray-50/20'>
					<div className='flex flex-shrink-0 p-4 pb-0'>
						<a className='flex-shrink-0 group block'>
							<div className='flex items-center'>
								<div>
									<img
										className='inline-block h-10 w-10 rounded-full'
										src='https://pbs.twimg.com/profile_images/1121328878142853120/e-rpjoJi_bigger.png'
										alt=''
									/>
								</div>
								<div className='ml-3'>
									<p className='text-base leading-6 font-medium text-black dark:text-white'>
										Sonali Hirave
										<span className='text-sm leading-5 font-medium text-gray-400 group-hover:text-gray-300 transition ease-in-out duration-150'>
											@ShonaDesign . 16 April
										</span>
									</p>
								</div>
							</div>
						</a>
					</div>

					<div className='pl-16 pr-5'>
						<p className='text-base width-auto font-medium text-black dark:text-white flex-shrink'>
							Day 07 of the challenge
							<a href='#' className='text-blue-400'>
								#100DaysOfCode
							</a>{' '}
							I was wondering what I can do with
							<a href='#' className='text-blue-400'>
								#tailwindcss
							</a>
							, so just started building Twitter UI using Tailwind and so far it looks so
							promising. I will post my code after completion. [07/100]
							<a href='#' className='text-blue-400'>
								{' '}
								#WomenWhoCode #CodeNewbie
							</a>
						</p>

						<div className='md:flex-shrink pr-6 pt-3'>
							<div className='rounded-lg w-full h-[200px] overflow-hidden'>
								<img
									className='w-full h-full object-cover'
									src='https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=448&amp;q=80'
									alt=''
								/>
							</div>
						</div>

						<div className='flex items-center py-4'>
							<div className='flex-1 flex items-center text-gray-600 dark:text-white hover:text-blue-400 hover:dark:text-blue-400 transition duration-350 ease-in-out'>
								<svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5 mr-2'>
									<g>
										<path d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z'></path>
									</g>
								</svg>
								12.3 k
							</div>
							<div className='flex-1 flex items-center text-gray-600 dark:text-white hover:text-green-400 hover:dark:text-green-400 transition duration-350 ease-in-out'>
								<svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5 mr-2'>
									<g>
										<path d='M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z'></path>
									</g>
								</svg>
								14 k
							</div>
							<div className='flex-1 flex items-center text-gray-600 dark:text-white hover:text-red-600 hover:dark:text-red-600 transition duration-350 ease-in-out'>
								<svg viewBox='0 0 24 24' fill='currentColor' className='w-5 h-5 mr-2'>
									<g>
										<path d='M12 21.638h-.014C9.403 21.59 1.95 14.856 1.95 8.478c0-3.064 2.525-5.754 5.403-5.754 2.29 0 3.83 1.58 4.646 2.73.814-1.148 2.354-2.73 4.645-2.73 2.88 0 5.404 2.69 5.404 5.755 0 6.376-7.454 13.11-10.037 13.157H12zM7.354 4.225c-2.08 0-3.903 1.988-3.903 4.255 0 5.74 7.034 11.596 8.55 11.658 1.518-.062 8.55-5.917 8.55-11.658 0-2.267-1.823-4.255-3.903-4.255-2.528 0-3.94 2.936-3.952 2.965-.23.562-1.156.562-1.387 0-.014-.03-1.425-2.965-3.954-2.965z'></path>
									</g>
								</svg>
								14 k
							</div>
							<div className='flex-1 flex items-center text-gray-600 dark:text-white hover:text-blue-400 hover:dark:text-blue-400 transition duration-350 ease-in-out'>
								<TrashIcon className='w-5 h-5 mr-2' />
							</div>
						</div>
					</div>
				</article> */}
			</section>
		</>
	);
};

export default Profile;
