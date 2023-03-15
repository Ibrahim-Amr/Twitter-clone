import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import Home from './pages/Home';

const LayOut = () => {
	return (
		<>
			<main className='flex min-h-screen max-w-7xl mx-auto'>
				<Sidebar />
				<Outlet />
				{/* <Widgets /> */}
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
