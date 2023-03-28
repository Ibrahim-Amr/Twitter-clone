import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import { onAuthStateChanged } from 'firebase/auth';
import { useContext, useEffect, useState } from 'react';
import { auth, db, storage } from '../Firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import { useRecoilState } from 'recoil';
import { postModalState } from '../../atom/modalAtom';
import { UserDataContext } from '../context/UserDataContext';

const Input = () => {
	// const [userInfo, setUserInfo] = useState({});
	const [post, setPost] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useRecoilState(postModalState);
	let { generateUniqueId } = useContext(UserDataContext);

	// convert image to data string
	function addImageToPost(e) {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result);
		};
	}

	//  add post to firestore
	async function addPost() {
		try {
			setLoading(true);
			// Adding post to firestore
			const docRef = await addDoc(collection(db, 'posts'), {
				id: generateUniqueId(),
				auther: auth?.currentUser?.uid,
				text: post,
				Likes: [],
				comments: [],
				timestamp: serverTimestamp(),
			});

			//Uploading imgate to firebase stoarge then adding the link to the post
			const imageRef = ref(storage, `posts/${docRef.id}`);
			if (selectedFile) {
				await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
					const downloadURL = await getDownloadURL(imageRef);
					await updateDoc(doc(db, 'posts', docRef.id), {
						image: downloadURL,
					});
				});
			}
			setOpenModal(false);
			setPost('');
			setSelectedFile(null);
			setLoading(false);
			toast.success('post Added');
		} catch (err) {
			console.log(err);
		}
	}

	return (
		<>
			<div className='flex border-b border-gray-200 dark:border-gray-50/20 p-3 gap-x-3'>
				<img
					src={
						auth?.currentUser?.photoURL == null
							? 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
							: auth?.currentUser?.photoURL
					}
					alt='user'
					className='h-10 w-10 rounded-full cursor-pointer brightness-95 object-cover'
				/>
				<div className='w-full divide-y divide-gray-200 dark:divide-gray-50/20'>
					<div className=''>
						<textarea
							value={post}
							onChange={(e) => setPost(e.target.value)}
							className='w-full rounded-md border-none focus:ring-0 text-lg placeholder:text-gray-700 dark:placeholder:text-white tracking-wide min-h-[50px] text-gray-700 dark:text-white resize-none dark:bg-black'
							rows={2}
							placeholder="What's happening?"></textarea>
					</div>
					{selectedFile && (
						<div className='relative overflow-hidden'>
							<XIcon
								onClick={() => setSelectedFile(null)}
								className='h-7 text-white absolute top-2 left-2 cursor-pointer shadow-md'
							/>
							<img
								src={selectedFile}
								alt='postImage'
								className={`${loading && 'animate-pulse'} w-full h-[400px] object-cover`}
							/>
						</div>
					)}
					{/* File */}
					{!loading && (
						<div className='flex justify-between items-center pt-2.5'>
							<div className='flex'>
								<label htmlFor='file'>
									<PhotographIcon className='hoverEffect text-sky-500 hover:bg-sky-100 h-10 w-10 p-2' />
								</label>
								<input onChange={addImageToPost} type='file' id='file' className='hidden' />
								<EmojiHappyIcon className='hoverEffect text-sky-500 hover:bg-sky-100 h-10 w-10 p-2' />
							</div>
							<button
								disabled={!post.trim()}
								onClick={addPost}
								className='bg-blue-400 text-white px-4 py-1.5 rounded-full font-bold shadow-md hover:shadow-lg hover:brightness-95 active:scale-95 disabled:scale-100 disabled:opacity-50'>
								Tweet
							</button>
						</div>
					)}
				</div>
			</div>
		</>
	);
};

export default Input;
