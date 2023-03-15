import News from './News';
import Search from './Search';

const Widgets = () => {
	return (
		<>
			<aside className='w-full hidden lg:inline ml-8 space-y-5'>
				{/* Search */}
				<Search />
				{/* Whats happening */}
				<News />
				{/* People you may */}
			</aside>
		</>
	);
};

export default Widgets;
