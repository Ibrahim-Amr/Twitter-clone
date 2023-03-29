<<<<<<< HEAD
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atom/modalAtom';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import {
	arrayUnion,
	collection,
	doc,
	onSnapshot,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserDataContext } from '../context/UserDataContext';

const CommentModal = () => {
	const [openModal, setOpenModal] = useRecoilState(modalState);
	const [postId] = useRecoilState(postIdState);
	const [post, setPost] = useState({});
	const [input, setInput] = useState('');
	let { userData, setUserId, generateUniqueId } = useContext(UserDataContext);
	let navigate = useNavigate();

	//Get Post Auther Info
	useEffect(() => {
		setUserId(post?.auther);
	}, [post]);

	// Get Post Data
	useEffect(() => {
		const docRef = doc(db, 'posts', postId);
		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			setPost(snapshot.data());
		});
		return unsubscribe;
	}, [postId, db]);

	// post Comment
	async function sendComment() {
		try {
			const ref = doc(db, 'posts', postId);
			const docRef = await updateDoc(ref, {
				comments: arrayUnion({
					id: generateUniqueId(),
					autherId: auth?.currentUser?.uid,
					comment: input,
					name: auth?.currentUser?.displayName,
					userImg: auth?.currentUser?.photoURL,
				}),
			});
			setOpenModal(false);
			setInput('');
			navigate(`post/${postId}`);
			toast.success('Comment Added');
		} catch (err) {
			// console.log(err);
			toast.error('Could not add the comment, please try again later.');
		}
	}

	return (
		<div className='text-black dark:text-white '>
			{openModal && (
				<Modal
					isOpen={openModal}
					contentLabel='Comments'
					ariaHideApp={false}
					onRequestClose={() => setOpenModal(false)}
					className='w-full sm:max-w-xl sm:w-[90%] absolute  sm:top-24 sm:left-[50%] sm:translate-x-[-50%] bg-white dark:bg-black border-2 border-gray-200 outline-none rounded-xl shadow-md text-black dark:text-white'>
					<div className='p-1 '>
						{/* Close Icon */}
						<div className='border-b border-gray-200 py-2 px-1.5'>
							<div
								onClick={() => setOpenModal((prevState) => !prevState)}
								className='hoverEffect p-0 h-9 w-9 flex items-center justify-center'>
								<XIcon className='h-[22px] text-gray-700' />
							</div>
						</div>
						{/* Post Info */}
						<div className='relative before:absolute before:-bottom-10 before:left-7 before:bg-gray-200 before:w-0.5 before:h-full py-2'>
							<div className='px-2 flex justify-start items-center relative '>
								{/* Header */}
								<img
									src={
										userData?.avatar == null
											? 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
											: userData?.avatar
									}
									alt='userimg'
									width={50}
									className='h-11 w-11 rounded-full mr-4 object-cover'
								/>
								<h4 className='font-bold text-[15px] sm:text-[16px] hover:underline capitalize mr-1'>
									{userData?.name}
								</h4>
								<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 mr-1'>
									@{userData?.name?.replace(/\s/g, '')?.toLowerCase()}
								</span>
								{' · '}
								<span className='text-sm sm:text-[15px] hover:underline text-gray-700 dark:text-gray-300 ml-1'>
									{post?.timestamp?.seconds}
								</span>
							</div>
							<div className='px-2 ml-14'>
								<p className='text-gray-700 dark:text-white text-[15px] sm:text-[17px] font-semibold mb-2'>
									{post?.text}
								</p>
								{post?.image && (
									<img
										src={post?.image}
										alt='post image'
										loading='lazy'
										className='rounded-2xl mr-2  max-h-[400px] object-cover w-full'
									/>
								)}
							</div>
						</div>
						{/* Logged User */}
						<div className='flex py-3 px-2 gap-x-3'>
							<img
								src={
									auth?.currentUser?.photoURL == null
										? 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
										: auth?.currentUser?.photoURL
								}
								alt='user'
								className='h-11 w-11 rounded-full cursor-pointer brightness-95'
							/>
							<div className='w-full divide-y divide-gray-200 dark:divide-gray-50/20'>
								<div className=''>
									<textarea
										value={input}
										onChange={(e) => setInput(e.target.value)}
										className='w-full rounded-md  focus:ring-0 text-lg placeholder:text-gray-700 dark:placeholder:text-white tracking-wide min-h-[50px] text-gray-700 dark:text-white resize-none dark:bg-black'
										rows={2}
										placeholder='Reply'></textarea>
								</div>
								{/* File */}
								<div className='flex justify-end items-center pt-2.5'>
									<button
										disabled={!input.trim()}
										onClick={sendComment}
										className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:shadow-lg hover:brightness-95 active:scale-95 disabled:scale-100 disabled:opacity-50'>
										Reply
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default CommentModal;
=======
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atom/modalAtom';
import Modal from 'react-modal';
import { XIcon } from '@heroicons/react/outline';
import { useContext, useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import {
	arrayUnion,
	collection,
	doc,
	onSnapshot,
	query,
	updateDoc,
	where,
} from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { UserDataContext } from '../context/UserDataContext';

const CommentModal = () => {
	const [openModal, setOpenModal] = useRecoilState(modalState);
	const [postId] = useRecoilState(postIdState);
	const [post, setPost] = useState({});
	const [input, setInput] = useState('');
	let { userData, setUserId, generateUniqueId } = useContext(UserDataContext);
	let navigate = useNavigate();

	//Get Post Auther Info
	useEffect(() => {
		setUserId(post?.auther);
	}, [post]);

	// Get Post Data
	useEffect(() => {
		const docRef = doc(db, 'posts', postId);
		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			setPost(snapshot.data());
		});
		return unsubscribe;
	}, [postId, db]);

	// post Comment
	async function sendComment() {
		try {
			const ref = doc(db, 'posts', postId);
			const docRef = await updateDoc(ref, {
				comments: arrayUnion({
					id: generateUniqueId(),
					autherId: auth?.currentUser?.uid,
					comment: input,
					name: auth?.currentUser?.displayName,
					userImg: auth?.currentUser?.photoURL,
				}),
			});
			setOpenModal(false);
			setInput('');
			navigate(`post/${postId}`);
			toast.success('Comment Added');
		} catch (err) {
			// console.log(err);
			toast.error('Could not add the comment, please try again later.');
		}
	}

	return (
		<div className='text-black dark:text-white '>
			{openModal && (
				<Modal
					isOpen={openModal}
					contentLabel='Comments'
					ariaHideApp={false}
					onRequestClose={() => setOpenModal(false)}
					className='w-full sm:max-w-xl sm:w-[90%] absolute  sm:top-24 sm:left-[50%] sm:translate-x-[-50%] bg-white dark:bg-black border-2 border-gray-200 outline-none rounded-xl shadow-md text-black dark:text-white'>
					<div className='p-1 '>
						{/* Close Icon */}
						<div className='border-b border-gray-200 py-2 px-1.5'>
							<div
								onClick={() => setOpenModal((prevState) => !prevState)}
								className='hoverEffect p-0 h-9 w-9 flex items-center justify-center'>
								<XIcon className='h-[22px] text-gray-700' />
							</div>
						</div>
						{/* Post Info */}
						<div className='relative before:absolute before:-bottom-10 before:left-7 before:bg-gray-200 before:w-0.5 before:h-full py-2'>
							<div className='px-2 flex justify-start items-center relative '>
								{/* Header */}
								<img
									src={
										userData?.avatar == null
											? 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
											: userData?.avatar
									}
									alt='userimg'
									width={50}
									className='h-11 w-11 rounded-full mr-4 object-cover'
								/>
								<h4 className='font-bold text-[15px] sm:text-[16px] hover:underline capitalize mr-1'>
									{userData?.name}
								</h4>
								<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 mr-1'>
									@{userData?.name?.replace(/\s/g, '')?.toLowerCase()}
								</span>
								{' · '}
								<span className='text-sm sm:text-[15px] hover:underline text-gray-700 dark:text-gray-300 ml-1'>
									{post?.timestamp?.seconds}
								</span>
							</div>
							<div className='px-2 ml-14'>
								<p className='text-gray-700 dark:text-white text-[15px] sm:text-[17px] font-semibold mb-2'>
									{post?.text}
								</p>
								{post?.image && (
									<img
										src={post?.image}
										alt='post image'
										loading='lazy'
										className='rounded-2xl mr-2  max-h-[400px] object-cover w-full'
									/>
								)}
							</div>
						</div>
						{/* Logged User */}
						<div className='flex py-3 px-2 gap-x-3'>
							<img
								src={
									auth?.currentUser?.photoURL == null
										? 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
										: auth?.currentUser?.photoURL
								}
								alt='user'
								className='h-11 w-11 rounded-full cursor-pointer brightness-95'
							/>
							<div className='w-full divide-y divide-gray-200 dark:divide-gray-50/20'>
								<div className=''>
									<textarea
										value={input}
										onChange={(e) => setInput(e.target.value)}
										className='w-full rounded-md  focus:ring-0 text-lg placeholder:text-gray-700 dark:placeholder:text-white tracking-wide min-h-[50px] text-gray-700 dark:text-white resize-none dark:bg-black'
										rows={2}
										placeholder='Reply'></textarea>
								</div>
								{/* File */}
								<div className='flex justify-end items-center pt-2.5'>
									<button
										disabled={!input.trim()}
										onClick={sendComment}
										className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:shadow-lg hover:brightness-95 active:scale-95 disabled:scale-100 disabled:opacity-50'>
										Reply
									</button>
								</div>
							</div>
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default CommentModal;
>>>>>>> 1367232c610930ea71a72112121b4ac7314f90df
