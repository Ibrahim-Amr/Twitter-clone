import { EmojiHappyIcon, PhotographIcon, XIcon } from '@heroicons/react/outline';
import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth, db, storage } from '../Firebase';
import { addDoc, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';

const Input = () => {
	const [userInfo, setUserInfo] = useState({});
	const [post, setPost] = useState('');
	const [selectedFile, setSelectedFile] = useState(null);
	const [loading, setLoading] = useState(false);

	function onChange(e) {
		setPost(e.target.value);
	}

	function addImageToPost(e) {
		const reader = new FileReader();
		if (e.target.files[0]) {
			reader.readAsDataURL(e.target.files[0]);
		}

		reader.onload = (readerEvent) => {
			setSelectedFile(readerEvent.target.result);
		};
	}

	function generateUniqueId() {
		const timestamp = new Date().getTime();
		const random = Math.floor(Math.random() * 1000000);
		const uniqueId = `${timestamp}-${random}`;
		return uniqueId;
	}
	async function addPost() {
		try {
			if (loading) {
				return;
			}
			setLoading(true);
			const docRef = await addDoc(collection(db, 'posts'), {
				id: generateUniqueId(),
				auther: userInfo.uid,
				autherName: userInfo.displayName,
				autherImg: userInfo.photoURL,
				text: post,
				timestamp: serverTimestamp(),
			});

			const imageRef = ref(storage, `posts/${docRef.id}`);
			if (selectedFile) {
				await uploadString(imageRef, selectedFile, 'data_url').then(async () => {
					const downloadURL = await getDownloadURL(imageRef);
					await updateDoc(doc(db, 'posts', docRef.id), {
						image: downloadURL,
					});
				});
			}
			setPost('');
			setSelectedFile(null);
			setLoading(false);
			toast.success('post Added');
		} catch (err) {
			console.log(err);
		}
	}
	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setUserInfo(user);
			} else {
				setUserInfo('');
			}
		});
	}, [auth]);

	return (
		<>
			<div className='flex border-b border-gray-200 dark:border-gray-50/20 p-3 gap-x-3'>
				<img
					src={userInfo.photoURL}
					alt='user image'
					className='h-11 w-11 rounded-full cursor-pointer brightness-95'
				/>
				<div className='w-full divide-y divide-gray-200 dark:divide-gray-50/20'>
					<div className=''>
						<textarea
							value={post}
							onChange={onChange}
							className='w-full rounded-md border-none focus:ring-0 text-lg placeholder:text-gray-700 dark:placeholder:text-white tracking-wide min-h-[50px] text-gray-700 dark:text-white resize-none dark:bg-black'
							rows={2}
							placeholder="What's happening?"></textarea>
					</div>
					{selectedFile && (
						<div className='relative'>
							<XIcon
								onClick={() => setSelectedFile(null)}
								className='h-7 text-white absolute top-2 left-2 cursor-pointer shadow-md'
							/>
							<img
								src={selectedFile}
								alt='postImage'
								className={`${loading && 'animate-pulse'} `}
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
