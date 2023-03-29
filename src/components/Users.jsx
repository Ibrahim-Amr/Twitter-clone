<<<<<<< HEAD
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase';
import { SparklesIcon } from '@heroicons/react/outline';

const Users = () => {
	const [users, setUser] = useState([]);

	// fetching users except logged in user
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const q = query(
					collection(db, 'users'),
					where('id', '!=', user.uid),
					orderBy('id', 'desc')
				);
				const unsubscribe = onSnapshot(q, (snapshot) => setUser(snapshot.docs));

				return unsubscribe;
			}
		});
	}, []);

	return (
		<>
			<div className='text-gray-700 dark:text-white py-3 min-h-screen'>
				<div className='sticky top-0 z-50 flex justify-between items-center bg-white dark:bg-black border-b border-gray-200 dark:border-gray-50/20 pb-3'>
					<h2 className='text-lg sm:text-xl font-bold cursor-pointer ml-3'>Users</h2>
					<div className='hoverEffect flex justify-center items-center p-0 w-9 h-9 mr-3'>
						<SparklesIcon className='h-5' />
					</div>
				</div>
				<ul role='list' className=' divide-y divide-gray-200 dark:divide-gray-700 w-full px-3'>
					{users.map((user) => (
						<li key={user.data().name} className='py-3 sm:py-4'>
							<div className='flex items-center space-x-3'>
								<Link to={`/profile/${user?.data()?.id}`} className='flex-shrink-0'>
									<img
										className='w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-200 overflow-hidden object-cover'
										src={
											user.data().avatar == null
												? 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
												: user.data().avatar
										}
										alt={user.data().name}
									/>
								</Link>
								<div className='flex-1 justify-start min-w-0'>
									<Link to={`/profile/${user?.data()?.id}`}>
										<h2 className='text-base font-semibold text-gray-900 truncate dark:text-white hover:underline duration-150 ease-in-out'>
											{user.data().name}
										</h2>
									</Link>
									<p className='text-sm text-gray-500 truncate dark:text-gray-400'>
										{/* {user.data().email} */}
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
										maxime.
									</p>
								</div>
								<Link to={`/chat/${user.data().id}`}>
									<span className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-blue-400 dark:text-white dark:border-gray-400 hover:dark:bg-blue-500  cursor-pointer shadow-md'>
										Message
									</span>
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Users;
=======
import { onAuthStateChanged } from 'firebase/auth';
import { collection, doc, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db } from '../Firebase';
import { SparklesIcon } from '@heroicons/react/outline';

const Users = () => {
	const [users, setUser] = useState([]);

	// fetching users except logged in user
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				const q = query(
					collection(db, 'users'),
					where('id', '!=', user.uid),
					orderBy('id', 'desc')
				);
				const unsubscribe = onSnapshot(q, (snapshot) => setUser(snapshot.docs));

				return unsubscribe;
			}
		});
	}, []);

	return (
		<>
			<div className='text-gray-700 dark:text-white py-3 min-h-screen'>
				<div className='sticky top-0 z-50 flex justify-between items-center bg-white dark:bg-black border-b border-gray-200 dark:border-gray-50/20 pb-3'>
					<h2 className='text-lg sm:text-xl font-bold cursor-pointer ml-3'>Users</h2>
					<div className='hoverEffect flex justify-center items-center p-0 w-9 h-9 mr-3'>
						<SparklesIcon className='h-5' />
					</div>
				</div>
				<ul role='list' className=' divide-y divide-gray-200 dark:divide-gray-700 w-full px-3'>
					{users.map((user) => (
						<li key={user.data().name} className='py-3 sm:py-4'>
							<div className='flex items-center space-x-3'>
								<Link to={`/profile/${user?.data()?.id}`} className='flex-shrink-0'>
									<img
										className='w-8 h-8 rounded-full bg-gray-600 dark:bg-gray-200 overflow-hidden object-cover'
										src={
											user.data().avatar == null
												? 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
												: user.data().avatar
										}
										alt={user.data().name}
									/>
								</Link>
								<div className='flex-1 justify-start min-w-0'>
									<Link to={`/profile/${user?.data()?.id}`}>
										<h2 className='text-base font-semibold text-gray-900 truncate dark:text-white hover:underline duration-150 ease-in-out'>
											{user.data().name}
										</h2>
									</Link>
									<p className='text-sm text-gray-500 truncate dark:text-gray-400'>
										{/* {user.data().email} */}
										Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae,
										maxime.
									</p>
								</div>
								<Link to={`/chat/${user.data().id}`}>
									<span className='inline-flex items-center px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-blue-400 dark:text-white dark:border-gray-400 hover:dark:bg-blue-500  cursor-pointer shadow-md'>
										Message
									</span>
								</Link>
							</div>
						</li>
					))}
				</ul>
			</div>
		</>
	);
};

export default Users;
>>>>>>> 1367232c610930ea71a72112121b4ac7314f90df
