import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { SparklesIcon } from '@heroicons/react/outline';
import { DotsHorizontalIcon } from '@heroicons/react/outline';
// import Moment from 'react-moment';
const NewsPage = () => {
	const [explore, setNews] = useState([]);
	// const [limit, setLimit] = useState('3');
	useEffect(() => {
		async function getNew() {
			try {
				const {
					data: { articles },
				} = await axios.get(
					'https://saurav.tech/NewsAPI/top-headlines/category/technology/us.json'
				);
				setNews(articles);
			} catch (err) {
				console.log(err);
			}
		}
		getNew();
	}, []);

	return (
		<div className='overflow-hidden pb-3'>
			<div className='sticky top-0 z-50 flex justify-between items-center bg-white dark:bg-black border-b border-gray-200 dark:border-gray-50/20  px-3 py-3 text-black dark:text-white'>
				<h2 className='text-lg sm:text-xl font-bold cursor-pointer '>Explore</h2>
				<div className='hoverEffect flex justify-center items-center p-0 w-9 h-9'>
					<SparklesIcon className='h-5' />
				</div>
			</div>
			{explore.slice(0, 20).map((article, id) => (
				<Link key={id + 1} to={article.url} target='_blank'>
					<article className='flex justify-between items-start px-3 py-3 cursor-pointer border-b border-b-gray-200 dark:border-blue-50/20'>
						{/* user image */}
						<img
							src={article.urlToImage}
							alt='userimg'
							width={50}
							className='h-11 w-11 rounded-full mr-4 mt-3'
						/>
						{/* Right Side */}
						<div className='w-full '>
							{/* Header */}
							<div className='flex justify-between items-center '>
								{/* post user info */}
								<div className='flex justify-start items-center gap-x-1 whitespace-nowrap text-black dark:text-white'>
									<h4 className='font-bold text-[15px] sm:text-[16px] hover:underline truncate '>
										{article.author}
									</h4>
									<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 truncate'>
										@{article.author}
									</span>
									{' · '}
									<span className='text-sm sm:text-[15px] hover:underline text-gray-700 dark:text-gray-300'>
										{/* <Moment fromNow>1976-04-19T12:59-0500</Moment> */}
										{article.publishedAt}
									</span>
								</div>
								{/* dot icon */}
								<DotsHorizontalIcon className='hoverEffect hover:bg-sky-100 hover:text-sky-500 h-10 w-10 p-2' />
							</div>
							{/* Post text */}
							<p className='text-gray-800 dark:text-white/90 text-[15px] sm:text-[16px] mb-2 mt-[-10px] py-2'>
								{article.title}
							</p>
							{/* post Image */}
							<img
								src={article.urlToImage}
								alt='post image'
								className='rounded-2xl mr-2 w-full'
							/>
						</div>
					</article>
				</Link>
			))}
		</div>
	);
};

export default NewsPage;
