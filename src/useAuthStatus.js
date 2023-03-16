import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from './Firebase';

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const [user, setUser] = useState();

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setLoggedIn(true);
				setUser(user);
			}
			setCheckingStatus(false);
		});
	}, []);
	return { loggedIn, checkingStatus, user };
};
