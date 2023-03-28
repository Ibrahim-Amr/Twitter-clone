import { motion } from 'framer-motion';
import { auth } from '../Firebase';

const ChatMessages = ({ message }) => {
	return (
		<>
			{message.auther == auth.currentUser.uid ? (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className='chat chat-end'>
					<div className='chat-image avatar'>
						<div className='w-10 rounded-full'>
							<img
								className='object-cover'
								src={
									message.avatar == null
										? 'https://upload.wikimedia.org/wikipedia/commons/2/2f/No-photo-m.png'
										: message.avatar
								}
								alt='V'
							/>
						</div>
					</div>
					<div className='chat-header dark:text-white'>{message.name}</div>
					<div className='chat-bubble chat-bubble-primary'>{message.text}</div>
				</motion.div>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1 }}
					className='chat chat-start'>
					<div className='chat-image avatar'>
						<div className='w-10 rounded-full'>
							<img src={message.avatar} alt='V' className='object-cover' />
						</div>
					</div>
					<div className='chat-header dark:text-white'>{message.name}</div>
					<div className='chat-bubble chat-bubble-warning dark:text-white'>{message.text}</div>
				</motion.div>
			)}
		</>
	);
};

export default ChatMessages;
