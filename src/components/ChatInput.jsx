import { arrayUnion, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../Firebase';

const ChatInput = ({ scroll }) => {
	const [inputValue, setInputValue] = useState('');
	let { id } = useParams();

	function onChange(e) {
		setInputValue(e.target.value);
	}
	function generateUniqueId() {
		const timestamp = new Date().getTime();
		const random = Math.floor(Math.random() * 1000000);
		const uniqueId = `${timestamp}-${random}`;
		return uniqueId;
	}
	async function addPost(e) {
		e.preventDefault();
		try {
			const ref = doc(db, 'chat', id);
			const docRef = await updateDoc(ref, {
				message: arrayUnion({
					id: generateUniqueId(),
					auther: auth.currentUser.uid,
					name: auth.currentUser.displayName,
					avatar: auth.currentUser.photoURL,
					text: inputValue,
				}),
			});
			setInputValue('');
			toast.success('message sent');
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(() => {
		scroll.current.scrollIntoView({ behavior: 'smooth' });
	}, [inputValue]);
	return (
		<>
			<form
				className='w-full sticky bottom-0 flex gap-x-2 bg-white dark:bg-black h-fit'
				onSubmit={addPost}>
				<div className='flex items-center justify-between w-full p-3 border-t border-gray-300  bg'>
					<input
						type='text'
						placeholder='Message'
						className='block w-full py-2 pl-4 mx-3 bg-gray-100 rounded-full outline-none focus:text-gray-700'
						name='message'
						required
						onChange={onChange}
						value={inputValue}
					/>

					<button type='submit'>
						<svg
							className='w-5 h-5 text-gray-500 dark:text-white origin-center transform rotate-90'
							xmlns='http://www.w3.org/2000/svg'
							viewBox='0 0 20 20'
							fill='currentColor'>
							<path d='M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z' />
						</svg>
					</button>
				</div>
			</form>
		</>
	);
};

export default ChatInput;
