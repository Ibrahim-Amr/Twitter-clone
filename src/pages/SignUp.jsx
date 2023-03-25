import React, { useState } from 'react';
// import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import OAuth from '../components/OAuth';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth, db } from '../Firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { EyeIcon, EyeOffIcon } from '@heroicons/react/outline';

const SignUp = () => {
	const [showPassword, setShowPassword] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = formData;

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
			const userCredential = await createUserWithEmailAndPassword(auth, email, password);
			updateProfile(auth.currentUser, {
				displayName: name,
				photoURL:
					'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
			});
			const user = userCredential.user;

			const formDataCopy = { ...formData };
			delete formDataCopy.password;
			formDataCopy.timestamp = serverTimestamp();
			formDataCopy.id = user.uid;
			formDataCopy.avatar = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png';
			await setDoc(doc(db, 'users', user.uid), formDataCopy);
			navigate('/');
			toast.success(`Welcome ${user.displayName}`);
		} catch (err) {
			console.log(err.message);
			toast.error('Please enter a valid email and password');
			// toast.error(err.message);
		}
	}

	return (
		<>
			<section className='min-h-screen flex flex-col justify-center items-center'>
				<h1 className='text-3xl text-center font-bold text-black dark:text-white'>Sign Up</h1>
				<div className='flex justify-center items-center flex-wrap px-6 py-12 max-w-6xl mx-auto'>
					{/* IMG */}
					<div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6 '>
						<img
							src='https://i.cbc.ca/1.6690705.1671451365!/fileImage/httpImage/1245718932.jpg'
							alt='sign-up'
							title='sign up'
							className='w-full rounded-2xl'
						/>
					</div>
					{/* FORM */}
					<div className='w-full md:w-[67%] lg:w-[40%] lg:ml20 lg:ml-20'>
						<form onSubmit={handleSubmit}>
							<input
								className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded mb-6'
								type='text'
								placeholder='Username'
								id='name'
								value={name}
								onChange={onChange}
							/>
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
									Already have an account?
									<Link
										to={'/login'}
										className='text-red-600 hover:text-red-800 transition duration-200 ease-in-out ml-1'>
										Sign in
									</Link>
								</p>
								{/* <Link
									to={'/forgot-password'}
									className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>
									Forgot password?
								</Link> */}
							</div>
							<button className='w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 transition duration-150 ease-in-out text-white text-sm font-medium shadow-md hover:shadow-lg uppercase px-7 py-3 rounded-md'>
								Sign Up
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

export default SignUp;
