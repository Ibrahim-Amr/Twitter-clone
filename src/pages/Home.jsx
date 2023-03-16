import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Article from '../components/Article';
import HomeHeader from '../components/HomeHeader';
import Input from '../components/Input';
import { db } from '../Firebase';

const Home = () => {
	const [posts, setPosts] = useState([]);
	useEffect(() => {
		async function getPosts() {
			const q = query(collection(db, 'posts'), orderBy('timestamp', 'desc'));
			const querySnapshot = await getDocs(q);
			let dataArray = [];
			querySnapshot.forEach((doc) => {
				return dataArray.push(doc.data());
			});
			setPosts(dataArray);
		}
		getPosts();
	}, []);

	return (
		<div className='text-black dark:text-white pb-3'>
			{/* Header Component */}
			<HomeHeader />
			{/* Input Component */}
			<Input />
			{/* Article Component */}
			{/* {posts.map((post) => (
				<Article post={post} key={post.id} />
			))} */}
			{posts.map((post) => (
				<Article post={post} key={post.timestamp} />
			))}
		</div>
	);
};

export default Home;
