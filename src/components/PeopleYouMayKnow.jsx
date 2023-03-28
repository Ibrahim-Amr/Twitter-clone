import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PeopleYouMayKnow = () => {
	const [news, setNews] = useState([]);
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
		<>
			<div className=' text-gray-700 dark:text-white space-y-3 bg-gray-100 dark:bg-[#16181C] rounded-xl pt-2 '>
				<h4 className='font-bold text-xl px-4 mb-3'>Who to follow</h4>
				{news.slice(0, 2).map((article, id) => (
					<a key={id * 500} rel='noreferrer' href={article.url} target='_blank'>
						<div className='flex items-center justify-between px-4 py-2 space-x-1 hover:bg-gray-50/5 transition duration-500 ease-out '>
							<div className='space-y-0.5 overflow-hidden'>
								<h6 className='text-sm font-bold '>{article.title}</h6>
								<p className='text-xs font-medium text-gray-500'>{article.source.name}</p>
							</div>
							<img
								className='rounded-xl object-cover'
								width='70'
								src={article.urlToImage}
								alt={article.title}
							/>
						</div>
					</a>
				))}
				<button className='text-blue-300 pl-4 pb-3 hover:text-blue-400'>Show more</button>
			</div>
		</>
	);
};

export default PeopleYouMayKnow;
