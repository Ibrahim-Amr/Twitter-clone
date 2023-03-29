<<<<<<< HEAD
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../Firebase';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import Spinner from './Spinner';
const Chat = () => {
	const [messages, setMessages] = useState([]);
	let { id } = useParams();
	const scroll = useRef();

	useEffect(() => {
		const combinedUsers2 = auth.currentUser.uid + id;
		let combinedId = combinedUsers2.split('').sort().join('');
		const docRef = doc(db, 'chat', combinedId);
		// Function for creating conversation if there is no conversation
		function createDoc() {
			setDoc(docRef, { message: [] });
		}
		//Fetching the conversation messages
		try {
			const unsub = onSnapshot(docRef, (doc) => {
				if (doc.data() == undefined) {
					createDoc();
				} else {
					setMessages(doc.data().message);
				}
			});

			return unsub;
		} catch (err) {
			toast.error("Couldn't connect to database, Please try again later");
			console.log(err);
		}
	}, [id]);

	useEffect(() => {
		scroll?.current?.scrollIntoView({ behavior: 'smooth' });
	});

	if (!messages) {
		return <Spinner />;
	}

	return (
		<>
			<div className='w-full h-[calc(100vh-150px)] sm:h-screen overflow-y-hidden'>
				<div className='sticky top-0 z-10 flex justify-between items-center bg-white dark:bg-black border-b border-gray-200 dark:border-gray-50/20  px-3 py-3'>
					<h2 className='text-lg sm:text-xl font-bold cursor-pointer text-black dark:text-white'>
						Chat
					</h2>
					<div className='hoverEffect flex justify-center items-center p-0 w-9 h-9'></div>
				</div>
				<div className='w-full h-[80%] sm:h-full  overflow-y-auto  px-4'>
					<AnimatePresence>
						{messages &&
							messages.map((message, index) => (
								<ChatMessages key={index} message={message} />
							))}
					</AnimatePresence>
					<div ref={scroll}></div>
				</div>
				<ChatInput scroll={scroll} />
			</div>
		</>
	);
};

export default Chat;
=======
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { auth, db } from '../Firebase';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import Spinner from './Spinner';
const Chat = () => {
	const [messages, setMessages] = useState([]);
	let { id } = useParams();
	const scroll = useRef();

	useEffect(() => {
		const combinedUsers2 = auth.currentUser.uid + id;
		let combinedId = combinedUsers2.split('').sort().join('');
		const docRef = doc(db, 'chat', combinedId);
		// Function for creating conversation if there is no conversation
		function createDoc() {
			setDoc(docRef, { message: [] });
		}
		//Fetching the conversation messages
		try {
			const unsub = onSnapshot(docRef, (doc) => {
				if (doc.data() == undefined) {
					createDoc();
				} else {
					setMessages(doc.data().message);
				}
			});

			return unsub;
		} catch (err) {
			toast.error("Couldn't connect to database, Please try again later");
			console.log(err);
		}
	}, [id]);

	useEffect(() => {
		scroll?.current?.scrollIntoView({ behavior: 'smooth' });
	});

	if (!messages) {
		return <Spinner />;
	}

	return (
		<>
			<div className='w-full h-[calc(100vh-150px)] sm:h-screen overflow-y-hidden'>
				<div className='sticky top-0 z-10 flex justify-between items-center bg-white dark:bg-black border-b border-gray-200 dark:border-gray-50/20  px-3 py-3'>
					<h2 className='text-lg sm:text-xl font-bold cursor-pointer text-black dark:text-white'>
						Chat
					</h2>
					<div className='hoverEffect flex justify-center items-center p-0 w-9 h-9'></div>
				</div>
				<div className='w-full h-[80%] sm:h-full  overflow-y-auto  px-4'>
					<AnimatePresence>
						{messages &&
							messages.map((message, index) => (
								<ChatMessages key={index} message={message} />
							))}
					</AnimatePresence>
					<div ref={scroll}></div>
				</div>
				<ChatInput scroll={scroll} />
			</div>
		</>
	);
};

export default Chat;
>>>>>>> 1367232c610930ea71a72112121b4ac7314f90df
