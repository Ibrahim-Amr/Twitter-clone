import { TrashIcon } from '@heroicons/react/outline';
import { arrayRemove, doc, updateDoc } from 'firebase/firestore';
import { motion } from 'framer-motion';
import React from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../Firebase';

const PostComment = ({ comment, auther, firebaseID }) => {
	// Delete Comment
	async function deleteComment(comment) {
		const ref = doc(db, 'posts', firebaseID);
		try {
			if (window.confirm('Are you sure you want to delete your comment')) {
				await updateDoc(ref, {
					comments: arrayRemove(comment),
				});
			}
		} catch (err) {
			console.log(err);
		}
	}
	return (
		<>
			<motion.article
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.5 }}
				className='w-full h-screenoverflow-hidden py3'>
				<div
					className='flex justify-between items-start px-3 py-1 cursor-pointer border-b
				border-b-gray-200 dark:border-blue-50/20 relative'>
					{/* user image */}
					<div className='group relative'>
						<Link to={`/`}>
							<img
								src={comment?.userImg}
								alt='userimg'
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
										{comment?.name}
									</h4>
								</Link>
								<span className='text-sm sm:text-[15px] text-gray-700 dark:text-gray-300  '>
									{/* @{post?.autherName.replace(/\s/g, '').toLowerCase()} */}@
									{comment?.name}
								</span>
							</div>
						</div>
						{/* Post text */}
						<p className='text-gray-800 dark:text-white text-[15px] sm:text-[16px] font-semibold mb-2 mt-[-10px] py-3'>
							{comment?.comment}
						</p>
						{/* Icons */}
						<div className='flex justify-between items-center text-gray-500 dark:text-white my-1'>
							{auther === auth?.currentUser?.uid && (
								<TrashIcon
									onClick={() => {
										deleteComment(comment);
									}}
									className='h-9 w-9 hoverEffect p-2 hover:text-red-600 hover:bg-red-100'
								/>
							)}
						</div>
					</div>
				</div>
			</motion.article>
		</>
	);
};

export default PostComment;
