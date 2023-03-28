import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import 'flowbite';
import { RecoilRoot } from 'recoil';
import { route } from './pages/Route';
import UserDataContextProvider from './context/UserDataContext';

function App() {
	return (
		<>
			<UserDataContextProvider>
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
			</UserDataContextProvider>
		</>
	);
}

export default App;
