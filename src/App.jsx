import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import Home from './pages/Home';
import NewsPage from './pages/NewsPage';
import { ScrollRestoration } from 'react-router-dom';
import Login from './pages/Login';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';

const LayOut = () => {
	return (
		<>
			<main className='flex items-start min-h-screen sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto '>
				{/* Sidebar */}
				<Sidebar />
				{/* Outlet Middle Section */}
				<section className='xl:ml-[300px] sm:ml-[73px] w-full  md:min-w-[36rem]  max-w-xl  min-h-screen border-x border-gray-200 dark:border-gray-50/20'>
					<Outlet />
				</section>
				{/* Widgets  */}
				<Widgets />
				<ScrollRestoration />
			</main>
		</>
	);
};

let route = createBrowserRouter([
	{
		path: '/',
		element: <LayOut />,
		children: [
			{
				index: true,
				element: (
					<ProtectedRoute>
						<Home />
					</ProtectedRoute>
				),
			},
			{
				path: 'explore',
				element: (
					<ProtectedRoute>
						<NewsPage />
					</ProtectedRoute>
				),
			},
		],
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={route}></RouterProvider>
			<ToastContainer
				position='top-right'
				autoClose={2005}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme='light'
			/>
		</>
	);
}

export default App;
