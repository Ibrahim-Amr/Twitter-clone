import HomeHeader from '../components/HomeHeader';
import Input from '../components/Input';

const Home = () => {
	return (
		<div className='text-black dark:text-white xl:ml-[370px] border-x border-gray-200 dark:border-gray-50/20 xl:min-w-xl sm:ml-[73px] flex-grow max-w-xl'>
			{/* Header Component */}
			<HomeHeader />
			{/* Input Component */}
			<Input />
			{/* Article Component */}
		</div>
	);
};

export default Home;
