import { GoogleAuthProvider, onAuthStateChanged, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../Firebase';

function Login() {
	let navigate = useNavigate();
	const provider = new GoogleAuthProvider();

	const LoginWithGoogle = async () => {
		try {
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				await setDoc(docRef, {
					id: user.uid,
					name: user.displayName,
					email: user.email,
					avatar: user.photoURL,
					timestamp: serverTimestamp(),
				});
			}
			navigate('/');
			toast.success(`Welcome ${user.displayName}`);
		} catch (err) {
			console.log(err);
		}
	};

	// useEffect(() => {
	// 	onAuthStateChanged(auth, (user) => {
	// 		if (user) {
	// 			navigate('/');
	// 		}
	// 	});
	// }, []);

	return (
		<>
			<section className='w-screen h-screen flex justify-center items-center bg-zinc-900'>
				<div className='sm:mx-24 md:mx-34 lg:mx-56  space-y-4 py-16 font-semibold text-gray-500 flex-col  flex justify-center items-center  w-fit'>
					<svg
						viewBox='0 0 24 24'
						className=' h-12 w-12 text-white hover:text-blue-500 duration-150 ease-in-out'
						fill='currentColor'>
						<g>
							<path d='M23.643 4.937c-.835.37-1.732.62-2.675.733.962-.576 1.7-1.49 2.048-2.578-.9.534-1.897.922-2.958 1.13-.85-.904-2.06-1.47-3.4-1.47-2.572 0-4.658 2.086-4.658 4.66 0 .364.042.718.12 1.06-3.873-.195-7.304-2.05-9.602-4.868-.4.69-.63 1.49-.63 2.342 0 1.616.823 3.043 2.072 3.878-.764-.025-1.482-.234-2.11-.583v.06c0 2.257 1.605 4.14 3.737 4.568-.392.106-.803.162-1.227.162-.3 0-.593-.028-.877-.082.593 1.85 2.313 3.198 4.352 3.234-1.595 1.25-3.604 1.995-5.786 1.995-.376 0-.747-.022-1.112-.065 2.062 1.323 4.51 2.093 7.14 2.093 8.57 0 13.255-7.098 13.255-13.254 0-.2-.005-.402-.014-.602.91-.658 1.7-1.477 2.323-2.41z'></path>
						</g>
					</svg>

					<h1 className='text-white text-2xl'>Login in to your account</h1>
					<button
						onClick={LoginWithGoogle}
						className='focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 dark:border-white flex items-center w-full mt-10 bg-white hover:bg-gray-100 active:scale-95 shadow-md'>
						<svg
							width='19'
							height='20'
							viewBox='0 0 19 20'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'>
							<path
								d='M18.9892 10.1871C18.9892 9.36767 18.9246 8.76973 18.7847 8.14966H9.68848V11.848H15.0277C14.9201 12.767 14.3388 14.1512 13.047 15.0812L13.0289 15.205L15.905 17.4969L16.1042 17.5173C17.9342 15.7789 18.9892 13.221 18.9892 10.1871Z'
								fill='#4285F4'
							/>
							<path
								d='M9.68813 19.9314C12.3039 19.9314 14.4999 19.0455 16.1039 17.5174L13.0467 15.0813C12.2286 15.6682 11.1306 16.0779 9.68813 16.0779C7.12612 16.0779 4.95165 14.3395 4.17651 11.9366L4.06289 11.9465L1.07231 14.3273L1.0332 14.4391C2.62638 17.6946 5.89889 19.9314 9.68813 19.9314Z'
								fill='#34A853'
							/>
							<path
								d='M4.17667 11.9366C3.97215 11.3165 3.85378 10.6521 3.85378 9.96562C3.85378 9.27905 3.97215 8.6147 4.16591 7.99463L4.1605 7.86257L1.13246 5.44363L1.03339 5.49211C0.37677 6.84302 0 8.36005 0 9.96562C0 11.5712 0.37677 13.0881 1.03339 14.4391L4.17667 11.9366Z'
								fill='#FBBC05'
							/>
							<path
								d='M9.68807 3.85336C11.5073 3.85336 12.7344 4.66168 13.4342 5.33718L16.1684 2.59107C14.4892 0.985496 12.3039 0 9.68807 0C5.89885 0 2.62637 2.23672 1.0332 5.49214L4.16573 7.99466C4.95162 5.59183 7.12608 3.85336 9.68807 3.85336Z'
								fill='#EB4335'
							/>
						</svg>
						<p className='text-base  ml-4 text-blue-500  font-semibold'>
							Continue with Google
						</p>
					</button>
				</div>
			</section>
		</>
	);
}

export default Login;
