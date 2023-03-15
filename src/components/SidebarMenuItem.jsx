const SidebarMenuItem = ({ text, Icon, active }) => {
	return (
		<>
			<div className='hoverEffect flex justify-center xl:justify-start items-center text-gray-700 dark:text-white text-lg gap-x-3'>
				<Icon className='h-7' />
				<span className={`${active && 'font-bold'} hidden xl:inline`}>{text}</span>
			</div>
		</>
	);
};

export default SidebarMenuItem;
