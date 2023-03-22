import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atom/modalAtom';
import Modal from 'react-modal';
import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { auth, db } from '../Firebase';
import { addDoc, collection, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const CommentModal = () => {
	const [openModal, setOpenModal] = useRecoilState(modalState);
	const [postId] = useRecoilState(postIdState);
	const [post, setPost] = useState({});
	const [input, setInput] = useState('');
	let navigate = useNavigate();

	useEffect(() => {
		const docRef = doc(db, 'posts', postId);
		const unsubscribe = onSnapshot(docRef, (snapshot) => {
			setPost(snapshot.data());
		});
		return unsubscribe;
	}, [postId, db]);

	async function sendComment() {
		let docRef = doc(db, 'posts', postId, 'comments', auth?.currentUser?.uid);
		await setDoc(docRef, {
			id: auth.currentUser.uid,
			comment: input,
			name: auth?.currentUser?.displayName,
			userImg: auth?.currentUser?.photoURL,
			timestamp: serverTimestamp(),
		});
		setOpenModal(false);
		setInput('');
		// navigate(`post/${postId}`);
	}
	return (
		<div className='text-black dark:text-white'>
			{openModal && (
				<Modal
					isOpen={openModal}
					onRequestClose={() => setOpenModal(false)}
					className='max-w-xl w-[90%] absolute top-24 left-[50%] translate-x-[-50%] bg-white dark:bg-black border-2 border-gray-200 outline-none rounded-xl shadow-md text-black dark:text-white'>
					<div className='p-1'>
						{/* Close Icon */}
						<div className='border-b border-gray-200 py-2 px-1.5'>
							<div
								onClick={() => setOpenModal((prevState) => !prevState)}
								className='hoverEffect p-0 h-9 w-9 flex items-center justify-center'>
								<XIcon className='h-[22px] text-gray-700' />
							</div>
						</div>
						<div className='p-2 flex justify-start items-center relative'>
							<span className='w-0.5 h-full -z-10 absolute left-7 top-11 bg-gray-300'></span>
							{/* Header */}
							<img
								src={post?.autherImg}
								alt='userimg'
								width={50}
								className='h-11 w-11 rounded-full mr-4'
							/>
							<h4 className='font-bold text-[15px] sm:text-[16px] hover:underline capitalize mr-1'>
								{post?.autherName}
							</h4>
							<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300 mr-1'>
								@{post?.autherName.replace(/\s/g, '').toLowerCase()}
							</span>
							{' · '}
							<span className='text-sm sm:text-[15px] hover:underline text-gray-700 dark:text-gray-300 ml-1'>
								{post?.timestamp?.seconds}
							</span>
						</div>
						<p className='text-gray-500 dark:text-white text-[15px] sm:text-[17px] ml-20 mb-2'>
							{post?.text}
						</p>

						{/* Logged User */}
						<div className='flex  py-3 px-2 gap-x-3'>
							<img
								src={auth?.currentUser?.photoURL}
								alt='user'
								className='h-11 w-11 rounded-full cursor-pointer brightness-95'
							/>
							<div className='w-full divide-y divide-gray-200 dark:divide-gray-50/20'>
								<div className=''>
									<textarea
										value={input}
										onChange={(e) => setInput(e.target.value)}
										className='w-full rounded-md border-none focus:ring-0 text-lg placeholder:text-gray-700 dark:placeholder:text-white tracking-wide min-h-[50px] text-gray-700 dark:text-white resize-none dark:bg-black'
										rows={2}
										placeholder='Tweet your reply'></textarea>
								</div>
								{/* File */}
								<div className='flex justify-between items-center pt-2.5'>
									<div className='flex'>
										<label htmlFor='file'>
											<PhotographIcon className='hoverEffect text-sky-500 hover:bg-sky-100 h-10 w-10 p-2' />
										</label>
										<input type='file' id='file' className='hidden' />
										<EmojiHappyIcon className='hoverEffect text-sky-500 hover:bg-sky-100 h-10 w-10 p-2' />
									</div>
									<button
										// disabled={!post.trim()}
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
