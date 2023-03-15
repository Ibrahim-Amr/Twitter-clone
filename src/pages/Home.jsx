import { useState } from 'react';
import Article from '../components/Article';
import HomeHeader from '../components/HomeHeader';
import Input from '../components/Input';

const Home = () => {
	const [posts, setPosts] = useState([
		{
			id: 1,
			name: 'Ibrahim Omar',
			userName: '@ibrahimomar',
			userImg: 'https://pbs.twimg.com/profile_images/1481377313262612489/oUxpGO-6_400x400.jpg',
			postImage:
				'https://images.unsplash.com/photo-1678802071553-f14c43e40002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60',
			text: 'nice view!',
			timestamp: '2 hours ago',
		},
		{
			id: 2,
			name: 'Mohamed Omar',
			userName: '@mohamedomar',
			userImg: 'https://pbs.twimg.com/profile_images/1481377313262612489/oUxpGO-6_400x400.jpg',
			postImage:
				'https://images.unsplash.com/photo-1678818118161-751fcb24becf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=400&q=60',
			text: 'Wow!',
			timestamp: '8 hours ago',
		},
	]);
	return (
		<div className='text-black dark:text-white xl:ml-[370px] border-x border-gray-200 dark:border-gray-50/20 xl:min-w-xl sm:ml-[73px] flex-grow max-w-xl'>
			{/* Header Component */}
			<HomeHeader />
			{/* Input Component */}
			<Input />
			{/* Article Component */}
			{posts.map((post) => (
				<Article post={post} key={post.id} />
			))}
		</div>
	);
};

export default Home;
