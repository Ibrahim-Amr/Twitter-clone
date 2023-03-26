import { ChartBarIcon, HeartIcon, TrashIcon } from '@heroicons/react/outline';
import { HeartIcon as HeartSolid } from '@heroicons/react/solid';
import { arrayRemove, arrayUnion, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, db, storage } from '../Firebase';
import { motion } from 'framer-motion';
import { useRecoilState } from 'recoil';
import { modalState, postIdState } from '../../atom/modalAtom';

const Article = ({ post }) => {
	const [hasLiked, setHasLiked] = useState(false);
	const [openModal, setOpenModal] = useRecoilState(modalState);
	const [postId, setPostId] = useRecoilState(postIdState);
	let navigate = useNavigate();

	// See if the logged user Liked the post
	useEffect(() => {
		const likeIndex = post?.data().Likes.findIndex((like) => like.id === auth?.currentUser?.uid);
		if (likeIndex > -1) {
			setHasLiked(true);
		} else {
			setHasLiked(false);
		}
	}, [post]);

	// Delete post Function
	async function deletePost() {
		if (window.confirm('Are you sure you want to delete this post?')) {
			let docRef = doc(db, 'posts', post.id);
			await deleteDoc(docRef);
			if (post.data().image) {
				await deleteObject(ref(storage, `posts/${post.id}`));
			}
		}
	}

	// Toggle like post function
	async function likePost() {
		const ref = doc(db, 'posts', post.id);
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

	function navigateToPost() {
		navigate(`/post/${post.id}`);
	}

	return (
		<>
			<motion.article
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
				className='border-b border-gray-200 dark:border-gray-50/20'>
				<div className='flex flex-shrink-0 p-4 pb-0'>
					<div className='flex-shrink-0 group block'>
						<div className='flex items-center'>
							<Link
								to={`/profile/${post.data().auther}`}
								className='border-2 border-gray-200 hover:border-gray-400 duration-150 ease-in-out rounded-full p-[1px]'>
								<img
									className='inline-block h-11 w-11 rounded-full '
									src={
										post.data().autherImg == null
											? 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
											: post.data().autherImg
									}
									alt='avatar'
								/>
							</Link>
							<div className='ml-1'>
								<Link
									to={`/profile/${post.data().auther}`}
									className='text-base leading-6 font-semibold text-black dark:text-white hover:underline capitalize'>
									{post.data().autherName}
								</Link>
								<span className='text-sm leading-5 font-medium text-gray-600 dark:text-gray-300/70 ml-1'>
									@{post.data().autherName.replace(/\s/g, '').toLowerCase()} . 16 April
								</span>
							</div>
						</div>
					</div>
				</div>

				<div className='pl-16 pr-5'>
					{/* Post Data */}
					<div onClick={navigateToPost} className='cursor-pointer'>
						<p className='text-base width-auto font-medium text-black dark:text-white flex-shrink ml-1'>
							{post.data().text}
						</p>
						{post.data().image && (
							<div className='md:flex-shrink pt-3'>
								<div className='rounded-lg w-full  overflow-hidden'>
									<img
										className='w-full h-full object-cover max-h-[500px]'
										src={post.data().image}
										alt='post image'
										loading='lazy'
									/>
								</div>
							</div>
						)}
					</div>
					{/* Icons */}
					<div className='flex justify-between items-center text-gray-500 dark:text-white py-3'>
						<div className='flex items-center'>
							<div
								onClick={() => {
									setOpenModal((prevState) => !prevState);
									setPostId(post.id);
								}}>
								<svg
									viewBox='0 0 24 24'
									fill='currentColor'
									className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100'>
									<g>
										<path d='M14.046 2.242l-4.148-.01h-.002c-4.374 0-7.8 3.427-7.8 7.802 0 4.098 3.186 7.206 7.465 7.37v3.828c0 .108.044.286.12.403.142.225.384.347.632.347.138 0 .277-.038.402-.118.264-.168 6.473-4.14 8.088-5.506 1.902-1.61 3.04-3.97 3.043-6.312v-.017c-.006-4.367-3.43-7.787-7.8-7.788zm3.787 12.972c-1.134.96-4.862 3.405-6.772 4.643V16.67c0-.414-.335-.75-.75-.75h-.396c-3.66 0-6.318-2.476-6.318-5.886 0-3.534 2.768-6.302 6.3-6.302l4.147.01h.002c3.532 0 6.3 2.766 6.302 6.296-.003 1.91-.942 3.844-2.514 5.176z'></path>
									</g>
								</svg>
							</div>
							{post?.data()?.comments?.length > 0 && (
								<span>{post?.data()?.comments?.length}</span>
							)}
						</div>
						<div>
							<svg
								viewBox='0 0 24 24'
								fill='currentColor'
								className='h-9 w-9 hoverEffect p-2 hover:text-green-500 hover:bg-green-100'>
								<g>
									<path d='M23.77 15.67c-.292-.293-.767-.293-1.06 0l-2.22 2.22V7.65c0-2.068-1.683-3.75-3.75-3.75h-5.85c-.414 0-.75.336-.75.75s.336.75.75.75h5.85c1.24 0 2.25 1.01 2.25 2.25v10.24l-2.22-2.22c-.293-.293-.768-.293-1.06 0s-.294.768 0 1.06l3.5 3.5c.145.147.337.22.53.22s.383-.072.53-.22l3.5-3.5c.294-.292.294-.767 0-1.06zm-10.66 3.28H7.26c-1.24 0-2.25-1.01-2.25-2.25V6.46l2.22 2.22c.148.147.34.22.532.22s.384-.073.53-.22c.293-.293.293-.768 0-1.06l-3.5-3.5c-.293-.294-.768-.294-1.06 0l-3.5 3.5c-.294.292-.294.767 0 1.06s.767.293 1.06 0l2.22-2.22V16.7c0 2.068 1.683 3.75 3.75 3.75h5.85c.414 0 .75-.336.75-.75s-.337-.75-.75-.75z'></path>
								</g>
							</svg>
						</div>

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
							{post?.data()?.Likes.length > 0 && (
								<span className={`${hasLiked && 'text-red-600'}`}>
									{post?.data()?.Likes.length}
								</span>
							)}
						</div>
						<ChartBarIcon className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100' />
						{post?.data()?.auther === auth?.currentUser?.uid && (
							<TrashIcon
								onClick={deletePost}
								className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
							/>
						)}
					</div>
				</div>
			</motion.article>
		</>
	);
};

export default Article;
