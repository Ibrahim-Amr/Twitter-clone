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
import Profile from './components/Profile';
import Users from './components/Users';
import Chat from './components/Chat';
import 'flowbite';
import BottomNav from './components/BottomNav';
import CommentModal from './components/CommentModal';
import { RecoilRoot } from 'recoil';
import Post from './pages/Post';
import PostModal from './components/PostModal';

const LayOut = () => {
	return (
		<>
			<main className='home-container'>
				{/* Sidebar */}
				<Sidebar />
				{/* Outlet Middle Section */}
				<section className='outlet-container'>
					<Outlet />
				</section>
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
				path: '/explore',
				element: (
					<ProtectedRoute>
						<NewsPage />
					</ProtectedRoute>
				),
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
			<RecoilRoot>
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
			</RecoilRoot>
		</>
	);
}

export default App;
