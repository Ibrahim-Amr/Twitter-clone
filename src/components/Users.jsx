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
			<div className='text-gray-700 dark:text-white p-3'>
				<div className='sticky top-0 z-50 flex justify-between items-center bg-white dark:bg-black border-b border-gray-200 dark:border-gray-50/20 pb-3'>
					<h2 className='text-lg sm:text-xl font-bold cursor-pointer'>Users</h2>
					<div className='hoverEffect flex justify-center items-center p-0 w-9 h-9'>
						<SparklesIcon className='h-5' />
					</div>
				</div>
				<ul role='list' className=' divide-y divide-gray-200 dark:divide-gray-700 w-full '>
					{users.map((user) => (
						<li key={user.data().name} className='py-3 sm:py-4'>
							<div className='flex items-center space-x-3'>
								<div className='flex-shrink-0'>
									<img
										className='w-8 h-8 rounded-full'
										src={user.data().avatar}
										alt={user.data().name}
									/>
								</div>
								<div className='flex-1 min-w-0'>
									<h2 className='text-base font-semibold text-gray-900 truncate dark:text-white'>
										{user.data().name}
									</h2>
									<p className='text-sm text-gray-500 truncate dark:text-gray-400'>
										{user.data().email}
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
