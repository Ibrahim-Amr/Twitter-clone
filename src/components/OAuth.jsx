// import { FcGoogle } from 'react-icons/fc';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { toast } from 'react-toastify';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const OAuth = () => {
	let navigate = useNavigate();

	const LoginWithGoogle = async () => {
		try {
			const provider = new GoogleAuthProvider();
			const userCredential = await signInWithPopup(auth, provider);
			const user = userCredential.user;
			const docRef = doc(db, 'users', user.uid);
			const docSnap = await getDoc(docRef);
			if (!docSnap.exists()) {
				await setDoc(docRef, {
					id: user.uid,
					name: user.displayName,
					bio: 'new Email',
					avatar: user.photoURL,
					cover: 'https://scontent.fcai20-6.fna.fbcdn.net/v/t1.18169-9/13417541_1212919185440026_4001463876724524663_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=gbrr7qAqpLkAX_Gkja1&_nc_ht=scontent.fcai20-6.fna&oh=00_AfCIcjXRI5Koy2m-S4eZDV5CxNmCsa08QKQhpvL02Cla2w&oe=6447B6B8',
					creationTime: user.metadata.creationTime,
				});
			}
			navigate('/');
			toast.success(`Welcome ${user.displayName}`);
		} catch (err) {
			// console.log(err);
			toast.success(`Could not connect to server. Please try again later.`);
		}
	};
	return (
		<>
			<button
				onClick={LoginWithGoogle}
				className='w-full flex items-center justify-center bg-red-600 hover:bg-red-700 active:bg-red-800 transition duration-150 ease-in-out text-white text-sm font-medium shadow-md hover:shadow-lg uppercase px-7 py-3 rounded-md'>
				<svg
					width='19'
					height='20'
					viewBox='0 0 19 20'
					fill='none'
					xmlns='http://www.w3.org/2000/svg'
					className='text-2xl bg-white rounded-full mr-2'>
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
				continue with google
			</button>
		</>
	);
};

export default OAuth;
