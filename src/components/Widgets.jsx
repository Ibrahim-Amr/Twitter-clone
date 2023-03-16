import News from './News';
import PeopleYouMayKnow from './PeopleYouMayKnow';
import Search from './Search';

const Widgets = () => {
	return (
		<>
			<aside className='w-full hidden lg:inline ml-8 space-y-5 h-fit sticky top-0 overflow-hidden'>
				{/* Search */}
				<Search />
				{/* Whats happening */}
				<News />
				{/* People you may */}
				<PeopleYouMayKnow />
			</aside>
		</>
	);
};

export default Widgets;
