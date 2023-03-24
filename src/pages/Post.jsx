import {
	ChartBarIcon,
	ChatIcon,
	HeartIcon,
	HomeIcon,
	ShareIcon,
	TrashIcon,
} from '@heroicons/react/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/solid';
import { arrayRemove, arrayUnion, deleteDoc, doc, onSnapshot, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { AnimatePresence } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atom/modalAtom';
import PostComment from '../components/PostComment';
import Spinner from '../components/Spinner';
import { auth, db, storage } from '../Firebase';

const Post = () => {
	const [isLoading, setIsloading] = useState(true);
	const [hasLiked, setHasLiked] = useState(false);
	const [firebaseID, setFirebaseId] = useState(null);
	const [openModal, setOpenModal] = useRecoilState(modalState);
	const [postId, setPostId] = useRecoilState(postIdState);
	const [post, setPost] = useState({});
	let { id } = useParams();
	let navigate = useNavigate();

	// Get post from firebase
	useEffect(() => {
		let docRef = doc(db, 'posts', id);
		const unsub = onSnapshot(docRef, (doc) => {
			setFirebaseId(doc.id);
			setPost(doc.data());
			setIsloading(false);
		});
		return unsub;
	}, []);

	// Check if the logged user liked the post
	useEffect(() => {
		if (post?.Likes !== undefined) {
			const likeIndex = post.Likes.findIndex((like) => like.id === auth?.currentUser?.uid);
			if (likeIndex > -1) {
				setHasLiked(true);
			} else {
				setHasLiked(false);
			}
		}
	}, [post]);

	// Delete post Function
	async function deletePost() {
		if (window.confirm('Are you sure you want to delete this post?')) {
			let docRef = doc(db, 'posts', firebaseID);
			await deleteDoc(docRef);
			if (post?.image) {
				await deleteObject(ref(storage, `posts/${firebaseID}`));
			}
			// navigate('/');
		}
	}

	// Toggle like post function
	async function likePost() {
		const ref = doc(db, 'posts', firebaseID);
		try {
			if (hasLiked) {
				await updateDoc(ref, {
					Likes: arrayRemove({ id: auth?.currentUser?.uid }),
				});
			} else {
				const docRef = await updateDoc(ref, {
					Likes: arrayUnion({ id: auth?.currentUser?.uid }),
				});
			}
		} catch (err) {
			console.log(err);
		}
	}

	if (isLoading) {
		return <Spinner />;
	}
	if (!post) {
		return (
			<>
				<div>
					<div className='flex items-center p-3 border-b border-gray-50/20 w-full sticky top-0 bg-white  dark:bg-black z-50 shadow mb-3'>
						<span className='text-lg sm:text-xl font-bold cursor-pointer text-gray-600 dark:text-white'>
							Post
						</span>
					</div>
					<div className='text-black dark:text-white text-center flex flex-col justify-center items-center'>
						<p className='mb-5 text-3xl font-semibold'>No Post Found</p>
						<Link
							to={'/'}
							className='hoverEffect bg-blue-500 hover:bg-blue-600 dark:hover:bg-blue-600 flex justify-center xl:justify-start items-center text-white dark:text-white text-lg gap-x-3 w-fit px-5 '>
							<HomeIcon className='h-7' />
							<span className={`hidden xl:inline`}>Home</span>
						</Link>
					</div>
				</div>
			</>
		);
	}
	return (
		<>
			<div className='mb-3'>
				<article className='w-full h-screenoverflow-hidden py3'>
					<div className='flex items-center p-3 border-b border-gray-50/20 w-full sticky top-0 bg-white  dark:bg-black z-50 shadow mb-3'>
						<span className='text-lg sm:text-xl font-bold cursor-pointer text-gray-600 dark:text-white'>
							Post
						</span>
					</div>
					<div
						className='flex justify-between items-start px-3 py-1 cursor-pointer border-b
				border-b-gray-200 dark:border-blue-50/20 relative'>
						{/* user image */}
						<div className='group relative'>
							<Link to={`/`}>
								<img
									src={
										post?.autherImg == null
											? 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
											: post?.autherImg
									}
									alt='user'
									width={50}
									className='h-11 w-11 rounded-full mr-4 mt-3'
								/>
							</Link>
						</div>
						{/* Right Side */}
						<div className='w-full '>
							{/* Header */}
							<div className='flex justify-between items-center '>
								{/* post user info */}
								<div className='flex justify-start items-center gap-x-1 whitespace-nowrap'>
									<Link to={`/`}>
										<h4 className='font-bold text-[15px] sm:text-[16px] hover:underline capitalize text-black dark:text-white'>
											{post?.autherName}
										</h4>
									</Link>
									<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300  '>
										{/* @{post?.autherName.replace(/\s/g, '').toLowerCase()} */}@
										{post?.autherName}
									</span>
									{' · '}
									<span className='text-sm sm:text-[15px] hover:underline text-gray-700 dark:text-gray-300'>
										{/* DATE */}
										{post?.timestamp?.seconds}
									</span>
								</div>
							</div>
							{/* Post text */}
							<p className='text-gray-800 dark:text-white text-[15px] sm:text-[16px] font-semibold mb-2 mt-[-10px] py-3'>
								{post?.text}
							</p>
							{/* post Image */}
							{post?.image && (
								<img
									src={post?.image}
									alt='post image'
									loading='lazy'
									className='rounded-2xl mr-2 w-full max-h-[500px] object-cover'
								/>
							)}

							{/* Icons */}
							<div className='flex justify-between items-center text-gray-500 dark:text-white my-1'>
								<div className='flex items-center'>
									<ChatIcon
										onClick={() => {
											setOpenModal((prevState) => !prevState);
											setPostId(firebaseID);
										}}
										className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100'
									/>
									{post?.comments?.length > 0 && (
										<span className='text-sm'>{post?.comments?.length}</span>
									)}
								</div>
								<ShareIcon className='h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-100' />
								<div className='flex items-center'>
									{hasLiked ? (
										<HeartSolid
											onClick={likePost}
											className='h-9 w-9 hoverEffect p-2 text-red-600 hover:bg-red-100'
										/>
									) : (
										<HeartIcon
											onClick={likePost}
											className='h-9 w-9 hoverEffect p-2 hover:text-pink-500 hover:bg-pink-100'
										/>
									)}
									{post?.Likes.length > 0 && (
										<span className={`${hasLiked && 'text-red-600'} text-sm`}>
											{post?.Likes.length}
										</span>
									)}
								</div>
								<ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100' />
								{post?.auther === auth?.currentUser?.uid && (
									<TrashIcon
										onClick={deletePost}
										className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
									/>
								)}
							</div>
						</div>
					</div>
				</article>
				<AnimatePresence>
					{post?.comments.map((comment) => (
						<PostComment
							key={comment?.id}
							comment={comment}
							auther={post?.auther}
							firebaseID={firebaseID}
						/>
					))}
				</AnimatePresence>
			</div>
		</>
	);
};

export default Post;
