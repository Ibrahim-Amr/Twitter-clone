import { collection, deleteDoc, doc, onSnapshot, query, where } from 'firebase/firestore';
import { deleteObject, ref } from 'firebase/storage';
import { createContext, useEffect, useState } from 'react';
import { db } from '../Firebase';

export let UserDataContext = createContext(null);

const UserDataContextProvider = ({ children }) => {
	const [userId, setUserId] = useState('');
	const [userData, setUserData] = useState({});

	// Unique id
	function generateUniqueId() {
		const timestamp = new Date().getTime();
		const random = Math.floor(Math.random() * 1000000);
		const uniqueId = `${timestamp}-${random}`;
		return uniqueId;
	}

	// Delete post Function
	async function deletePost(post) {
		if (window.confirm('Are you sure you want to delete this post?')) {
			let docRef = doc(db, 'posts', post.id);
			await deleteDoc(docRef);
			if (post.data().image) {
				await deleteObject(ref(storage, `posts/${post.id}`));
			}
		}
	}

	//Get Post Auther Info
	useEffect(() => {
		if (userId) {
			let userRef = collection(db, 'users');
			const q = query(userRef, where('id', '==', userId));
			const userUnsub = onSnapshot(q, (snapshot) => setUserData(snapshot?.docs[0]?.data()));
			return userUnsub;
		}
	}, [userId]);

	return (
		<UserDataContext.Provider value={{ setUserId, userData, generateUniqueId, deletePost }}>
			{children}
		</UserDataContext.Provider>
	);
};

export default UserDataContextProvider;
