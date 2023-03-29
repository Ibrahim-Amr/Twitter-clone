import { Link } from 'react-router-dom';

const NotFound404 = () => {
	return (
		<>
			<main class='h-screen w-full flex flex-col justify-center items-center bg-white dark:bg-black relative'>
				<h1 class='text-[200px] font-extrabold text-black dark:text-white tracking-widest font-mono'>
					404
				</h1>
				<div class='bg-blue-400 px-2 text-2xl rounded rotate-12 absolute left-[50%] -translate-x-[50%] top-[50%] -translate-y-full text-white '>
					Page Not Found
				</div>
				<button class='mt-5'>
					<a class='group relative inline-block text-sm font-medium text-blue-400 active:text-orange-500 focus:outline-none focus:ring active:scale-95 duration-150 ease-in-out'>
						<span class='absolute inset-0 transition-transform -translate-x-1 -translate-y-1 bg-blue-400 group-hover:bg-blue-500 duration-150 ease-in-out'></span>
						<span class='absolute inset-0 transition-transform translate-x-1 translate-y-1 bg-blue-400 group-hover:bg-blue-500 duration-150 ease-in-out'></span>
						<button class='relative block px-8 py-3 dark:bg-white bg-gray-100 hover:dark:bg-gray-200 text-black font-semibold duration-150 ease-in-out'>
							<Link to='/' className='font-mono font-semibold'>
								Go Home
							</Link>
						</button>
					</a>
				</button>
			</main>
		</>
	);
};

export default NotFound404;
