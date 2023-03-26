import { AnimatePresence } from 'framer-motion';
import { createHashRouter, Outlet, ScrollRestoration } from 'react-router-dom';
import BottomNav from '../components/BottomNav';
import Chat from '../components/Chat';
import CommentModal from '../components/CommentModal';
import NotFound404 from '../components/NotFound404';
import PostModal from '../components/PostModal';
import Profile from '../components/Profile';
import ProtectedRoute from '../components/ProtectedRoute';
import Sidebar from '../components/Sidebar';
import Users from '../components/Users';
import Widgets from '../components/Widgets';
import Home from './Home';
import Login from './Login';
import NewsPage from './NewsPage';
import Post from './Post';
import SignUp from './SignUp';

const LayOut = () => {
	return (
		<>
			<main className='home-container'>
				{/* Sidebar */}
				<Sidebar />
				{/* Outlet Middle Section */}
				<AnimatePresence>
					<section className='outlet-container pb-16 sm:pb-0'>
						<Outlet />
					</section>
				</AnimatePresence>
				{/* Widgets  */}
				<Widgets />
				{/* Mobile nav */}
				<BottomNav />
				{/* Modal */}
				<CommentModal />
				{/* Post Modal */}
				<PostModal />
				<ScrollRestoration />
			</main>
		</>
	);
};

export let route = createHashRouter([
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
				path: '/sign-up',
				element: <SignUp />,
			},
			{
				path: '/login',
				element: <Login />,
			},
			{
				path: '/profile/:id',
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: '/explore',
				element: (
					<ProtectedRoute>
						<NewsPage />
					</ProtectedRoute>
				),
			},
			{
				path: '/users',
				element: (
					<ProtectedRoute>
						<Users />
					</ProtectedRoute>
				),
			},
			{
				path: '/post/:id',
				element: (
					<ProtectedRoute>
						<Post />
					</ProtectedRoute>
				),
			},
			{
				path: '/chat/:id',
				element: (
					<ProtectedRoute>
						<Chat />
					</ProtectedRoute>
				),
			},
			{
				path: '*',
				element: <NotFound404 />,
			},
		],
	},
]);
