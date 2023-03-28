import { useRecoilState } from 'recoil';
import Modal from 'react-modal';
import { editProfileState } from '../../atom/modalAtom';
import { XIcon } from '@heroicons/react/outline';
import { useEffect, useState } from 'react';
import { collection, doc, onSnapshot, query, setDoc, updateDoc, where } from 'firebase/firestore';
import { auth, db, storage } from '../Firebase';
import { getDownloadURL, ref, uploadString } from 'firebase/storage';
import Spinner from './Spinner';
import { updateProfile } from 'firebase/auth';

const EditProfileModal = () => {
	const [userData, setUserData] = useState({});
	const [avatarLink, setAvatarLink] = useState('');
	const [docId, setDocId] = useState('');
	const [loading, setLoading] = useState(false);
	const [openModal, setOpenModal] = useRecoilState(editProfileState);
	let id = auth?.currentUser?.uid;

	useEffect(() => {
		if (id) {
			let userRef = collection(db, 'users');
			const q = query(userRef, where('id', '==', id));
			const userUnsub = onSnapshot(q, (snapshot) => {
				setUserData(snapshot?.docs[0]?.data());
				setDocId(snapshot?.docs[0].id);
			});
			return userUnsub;
		}
	}, [id]);

	function onChange(e) {
		try {
			// setUserData({ ...userData, [e.target.id]: e.target.value  });
			setUserData((prevState) => ({ ...prevState, [e.target.id]: e.target.value }));

			//Convert Image to string
			const reader = new FileReader();
			if (e.target.files) {
				reader.readAsDataURL(e.target.files[0]);
				reader.onload = (readerEvent) => {
					setAvatarLink(readerEvent.target.result);
					setUserData({ ...userData, [e.target.id]: readerEvent.target.result });
				};
			}
		} catch (err) {
			console.log(err);
		}
	}

	// Update Function
	async function updata() {
		setLoading(true);
		// Update the doc
		await setDoc(doc(db, 'users', docId), userData);
		updateProfile(auth?.currentUser, {
			displayName: userData.name,
		});
		// Update Avatar
		if (avatarLink) {
			const imageRef = ref(storage, `profile/${'avatar' + docId}`);
			await uploadString(imageRef, avatarLink, 'data_url').then(async () => {
				const downloadURL = await getDownloadURL(imageRef);
				await updateDoc(doc(db, 'users', docId), {
					avatar: downloadURL,
				});
				updateProfile(auth?.currentUser, {
					photoURL: downloadURL,
				});
			});
		}

		setLoading(false);
		setOpenModal((prevState) => !prevState);
	}
	if (loading) {
		return <Spinner />;
	}
	return (
		<div className='text-black dark:text-white'>
			{openModal && (
				<Modal
					isOpen={openModal}
					contentLabel='Comments'
					ariaHideApp={false}
					onRequestClose={() => setOpenModal(false)}
					className='md:min-h-[400px] md:max-h-[90vh] h-full md:h-[650px] w-full md:w-[600px] md:max-w-[80vw]  md:absolute md:top-24 md:left-[50%] md:translate-x-[-50%] bg-white dark:bg-black md:border-2 border-gray-200 outline-none md:rounded-xl shadow-md text-black dark:text-white duration-150 ease-in-out overflow-y-auto'>
					<div>
						<div className='sticky top-0 z-10 flex justify-between items-center p-3'>
							<div className='flex justify-start items-center gap-x-5'>
								<div className='flex justify-center items-center hoverEffect'>
									<XIcon
										onClick={() => setOpenModal((prevState) => !prevState)}
										className='h-5 text-black dark:text-white p-0 m-0 '
									/>
								</div>
								<h2 className='text-lg sm:text-xl font-bold'>Edit Profile</h2>
							</div>
							<button
								onClick={updata}
								className='rounded-full bg-blue-400 hover:bg-blue-500 text-white dark:bg-white dark:hover:bg-gray-100 dark:text-black py-1 px-5 font-semibold active:scale-95'>
								Save
							</button>
						</div>
						{/* Cover Image */}
						<div className='w-full h-[200px]'>
							<img
								className='w-full h-full object-cover'
								src='https://scontent.fcai20-6.fna.fbcdn.net/v/t1.18169-9/13417541_1212919185440026_4001463876724524663_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=e3f864&_nc_ohc=gbrr7qAqpLkAX_Gkja1&_nc_ht=scontent.fcai20-6.fna&oh=00_AfCIcjXRI5Koy2m-S4eZDV5CxNmCsa08QKQhpvL02Cla2w&oe=6447B6B8'
								alt='Cover'
							/>
						</div>
						<div>
							{/* <!-- Avatar --> */}
							<div className='relative flex justify-between items-center w-full px-5'>
								<div className='rounded-full relative avatar h-[9rem] w-[9rem] mt-[-5rem] '>
									<img
										className='rounded-full relative border-4 border-gray-200 dark:border-black'
										src={userData?.avatar}
										alt='avatar'
									/>
									<div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
										<label
											htmlFor='avatar'
											className='p-3 bg-black/20 hover:bg-white/10 rounded-full duration-150 ease-in-out cursor-pointer inline-block'>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												fill='none'
												viewBox='0 0 24 24'
												strokeWidth={1.5}
												stroke='currentColor'
												className='w-6 h-6 '>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													d='M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z'
												/>
											</svg>
										</label>
										<input
											onChange={onChange}
											type='file'
											id='avatar'
											className='hidden'
										/>
									</div>
								</div>
							</div>
						</div>
						{/* <!-- Profile info --> */}

						<form className='p-3'>
							<div className='relative mb-5'>
								<input
									type='text'
									id='name'
									value={userData.name}
									onChange={onChange}
									maxLength={50}
									className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer'
									placeholder='Name'
								/>
								<label
									htmlFor='name'
									className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'>
									Name
								</label>
							</div>
							{/* Bio */}
							<div className='relative'>
								<textarea
									type='text'
									id='bio'
									value={userData?.bio}
									onChange={onChange}
									rows={4}
									maxLength={200}
									className='block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-1 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-none'
									placeholder='Bio'
								/>
								<label
									htmlFor='bio'
									className='absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-black px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1'>
									Bio
								</label>
							</div>
						</form>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default EditProfileModal;
