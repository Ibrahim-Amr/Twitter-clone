import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
import { auth } from '../Firebase';

const Login = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});

	const { email, password } = formData;
	let navigate = useNavigate();
	function onChange(e) {
		setFormData((prevState) => ({
			...prevState,
			[e.target.id]: e.target.value,
		}));
	}

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const userCredential = await signInWithEmailAndPassword(auth, email, password);
			const user = userCredential.user;
			if (user) {
				navigate('/');
				toast.success(`Welcome ${user.displayName}`);
			}
		} catch (err) {
			toast.error('Please enter a valid email and password');
		}
	}
	return (
		<>
			<section className='min-h-screen flex flex-col justify-center items-center '>
				<h1 className='text-3xl text-center mt-6 font-bold text-black dark:text-white'>
					Sign In
				</h1>
				<div className='flex justify-center items-center flex-wrap px-6 py-12 w-full'>
					{/* FORM */}
					<div className='w-full '>
						<form onSubmit={handleSubmit}>
							<input
								className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded mb-6'
								type='text'
								placeholder='Email address'
								id='email'
								value={email}
								onChange={onChange}
							/>
							<div className='relative mb-6'>
								<input
									className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded'
									type={showPassword ? 'text' : 'password'}
									placeholder='Password'
									id='password'
									value={password}
									onChange={onChange}
								/>
								{showPassword ? (
									<EyeOffIcon
										className='h-7 absolute right-3 top-3 cursor-pointer text-xl text-black'
										onClick={() => {
											setShowPassword((prevState) => !prevState);
										}}
										title='Hide Password'
									/>
								) : (
									<EyeIcon
										className='h-7 absolute right-3 top-3 cursor-pointer text-xl'
										onClick={() => {
											setShowPassword((prevState) => !prevState);
										}}
										title='Show Password'
									/>
								)}
							</div>
							<div className='flex justify-between  whitespace-nowrap text-sm sm:text-lg text-black dark:text-white'>
								<p className='mb-6'>
									Don't have an account?
									<Link
										to={'/sign-up'}
										className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>
										Register
									</Link>
								</p>
								{/* <Link
									to={'/forgot-password'}
									className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
									Forgot password?
								</Link> */}
							</div>
							<button className='w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out text-white text-sm font-medium shadow-md hover:shadow-lg uppercase px-7 py-3 rounded-md'>
								Sign in
							</button>
							<div className='flex items-center before:flex-1 my-4 before:border-t before:border-gray-300  before:dark:border-white after:flex-1 after:border-t after:border-gray-300 after:dark:border-white '>
								<p className='text-center font-semibold mx-4 text-black dark:text-white'>
									OR
								</p>
							</div>
						</form>
						<OAuth />
					</div>
				</div>
			</section>
		</>
	);
};

export default Login;
