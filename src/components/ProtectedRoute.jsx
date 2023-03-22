import { Navigate } from 'react-router-dom';
import { useAuthStatus } from '../useAuthStatus';
import Spinner from './Spinner';

const ProtectedRoute = ({ children }) => {
	const { loggedIn, checkingStatus } = useAuthStatus();

	if (checkingStatus) {
		return <Spinner />;
	}

	return loggedIn ? children : <Navigate to={'/login'} />;
};

export default ProtectedRoute;
