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
			<div className='w-full h-[calc(100vh-64px)] sm:h-screen overflow-hidden'>
				<div className='flex items-center p-3 border-b border-gray-50/20 w-full sticky top-0 bg-white  dark:bg-black z-50 shadow'>
					<span className='text-lg sm:text-xl font-bold cursor-pointer text-gray-600 dark:text-white'>
						Chat
					</span>
				</div>
				<div className='w-full  overflow-y-auto h-[calc(100vh-120px)] pb-16 sm:p-6'>
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
