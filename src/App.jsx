import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Widgets from './components/Widgets';
import Home from './pages/Home';

const LayOut = () => {
	return (
		<>
			<Sidebar />
			<Outlet />
			<Widgets />
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
