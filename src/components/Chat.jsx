import { SparklesIcon } from '@heroicons/react/outline';
import { collection, doc, getDoc, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../Firebase';
import ChatInput from './ChatInput';
import ChatMessages from './ChatMessages';
import Spinner from './Spinner';
const Chat = () => {
	const [messages, setMessages] = useState([]);
	let { id } = useParams();
	const scroll = useRef();

	useEffect(() => {
		const unsub = onSnapshot(doc(db, 'chat', id), (doc) => {
			setMessages(doc.data().message);
		});

		return unsub;
	}, [id]);

	// useEffect(() => {
	// 	scroll.current.scrollIntoView({ behavior: 'smooth' });
	// });

	// if (!messages) {
	// 	return <Spinner />;
	// }
	return (
		<>
			<div className='w-full h-screenoverflow-hidden'>
				<div className='flex items-center p-3 border-b border-gray-50/20 w-full sticky top-0 bg-white  dark:bg-black z-50 shadow'>
					<span className='text-lg sm:text-xl font-bold cursor-pointer text-gray-600 dark:text-white'>
						Chat
					</span>
				</div>
				<div className='w-full p-6 overflow-y-auto h-[calc(100vh-120px)]'>
					{messages &&
						messages.map((message, index) => <ChatMessages key={index} message={message} />)}
					<div ref={scroll}></div>
				</div>
				<ChatInput scroll={scroll} />
			</div>
		</>
	);
};

export default Chat;
