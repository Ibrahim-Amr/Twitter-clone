import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import Home from './pages/Home';

const LayOut = () => {
	return (
		<>
			<main className='flex min-h-screen sm:max-w-2xl lg:max-w-5xl xl:max-w-7xl mx-auto '>
				{/* Sidebar */}
				<Sidebar />
				{/* Outlet Middle Section */}
				<Outlet />
				{/* Widgets  */}
				<Widgets />
			</main>
		</>
	);
};

let route = createBrowserRouter([
	{ path: '/', element: <LayOut />, children: [{ index: true, element: <Home /> }] },
]);
function App() {
	return <RouterProvider router={route}></RouterProvider>;
}

export default App;
