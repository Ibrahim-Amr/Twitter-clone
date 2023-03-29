import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import Article from '../components/Article';
import HomeHeader from '../components/HomeHeader';
import Input from '../components/Input';
import { db } from '../Firebase';

const Home = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			setPosts(snapshot.docs);
		});

		return unsubscribe;
	}, []);

	return (
		<div className='text-black dark:text-white mb-16 sm:pb-3 min-h-screen'>
			{/* Header Component */}
			<HomeHeader />
			{/* Add Post Input Component */}
			<Input />
			{/* Article Component */}
			<AnimatePresence>
				{posts.map((post) => (
					<Article post={post} key={post.id} />
				))}
			</AnimatePresence>
		</div>
	);
};

export default Home;
