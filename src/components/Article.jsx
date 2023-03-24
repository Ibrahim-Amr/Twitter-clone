import {
	ChartBarIcon,
	ChatIcon,
	DotsHorizontalIcon,
	HeartIcon,
	ShareIcon,
	TrashIcon,
} from '@heroicons/react/outline';
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
				className='flex justify-between items-start px-3 py-1 cursor-pointer border-b
				border-b-gray-200 dark:border-blue-50/20 relative'>
				{/* user image */}
				<div className='group relative'>
					<Link to={`profile/${post.data().auther}`}>
						<img
							src={
								post.data().autherImg == null
									? 'https://about.twitter.com/content/dam/about-twitter/en/brand-toolkit/brand-download-img-1.jpg.twimg.1920.jpg'
									: post.data().autherImg
							}
							alt='post'
							width={50}
							className='h-11 w-11 rounded-full mr-4 mt-3'
						/>
					</Link>
					<div>
						<div className='group-hover:inline-block hidden absolute top-0 left-full  z-10  w-64 text-sm font-light text-gray-500 transition-opacity duration-300 bg-gray-100 border-gray-200 rounded-lg shadow-sm  dark:text-gray-400 dark:bg-gray-800 dark:border-gray-600 cursor-default'>
							<div className='p-3'>
								<div className='flex items-center justify-between mb-2'>
									<span>
										<img
											className='w-10 h-10 rounded-full'
											src={post.data().autherImg}
											alt='Jese Leos'
										/>
									</span>
									{post.data().auther !== auth.currentUser.uid && (
										<div>
											<Link
												to={`/chat/${post.data().auther}`}
												type='button'
												className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-3 py-1.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800'>
												Message
											</Link>
										</div>
									)}
								</div>
								<p className='text-base font-semibold leading-none text-gray-900 dark:text-white'>
									{post.data().autherName}
									{' · '}
									<span className='text-sm text-gray-700'>
										@{post.data().autherName.replace(/\s/g, '').toLowerCase()}
									</span>
								</p>
							</div>
						</div>
					</div>
				</div>
				{/* Right Side */}
				<div className='w-full '>
					<div onClick={navigateToPost}>
						{/* Header */}
						<div className='flex justify-between items-center '>
							{/* post user info */}
							<div className='flex justify-start items-center gap-x-1 whitespace-nowrap'>
								<Link to={`profile/${post.data().auther}`}>
									<h4 className='font-bold text-[15px] sm:text-[16px] hover:underline capitalize'>
										{post.data().autherName}
									</h4>
								</Link>

								<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300  '>
									@{post.data().autherName.replace(/\s/g, '').toLowerCase()}
								</span>
								{' · '}
								<span className='text-sm sm:text-[15px] hover:underline text-gray-700 dark:text-gray-300'>
									{/* DATE */}
									{/* {post?.data()?.timestamp.seconds} */}
								</span>
							</div>
							{/* dot icon */}
							<DotsHorizontalIcon className='hoverEffect hover:bg-sky-100 hover:text-sky-500 h-10 w-10 p-2' />
						</div>
						{/* Post text */}
						<p className='text-gray-800 dark:text-white text-[15px] sm:text-[16px] font-semibold mb-2 '>
							{post.data().text}
						</p>
						{/* post Image */}
						{post.data().image && (
							<img
								src={post.data().image}
								alt='post image'
								loading='lazy'
								className='rounded-2xl mr-2 w-full max-h-[500px] object-cover'
							/>
						)}
					</div>
					{/* Icons */}
					<div className='flex justify-between items-center text-gray-500 dark:text-white my-1'>
						<div className='flex items-center'>
							<ChatIcon
								onClick={() => {
									setOpenModal((prevState) => !prevState);
									setPostId(post.id);
								}}
								className='h-9 w-9 hoverEffect p-2 hover:text-blue-500 hover:bg-sky-100'
							/>
							{post?.data()?.comments?.length > 0 && (
								<span className='text-sm'>{post?.data()?.comments?.length}</span>
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
							{post?.data()?.Likes.length > 0 && (
								<span className={`${hasLiked && 'text-red-600'} text-sm`}>
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
