import React from 'react';
import { auth } from '../Firebase';

const ChatMessages = ({ message }) => {
	return (
		<>
			{message.auther == auth.currentUser.uid ? (
				<div className='chat chat-end'>
					<div className='chat-image avatar'>
						<div className='w-10 rounded-full'>
							<img src={message.avatar} />
						</div>
					</div>
					<div className='chat-header dark:text-white'>{message.name}</div>
					<div className='chat-bubble chat-bubble-primary'>{message.text}</div>
				</div>
			) : (
				<div className='chat chat-start'>
					<div className='chat-image avatar'>
						<div className='w-10 rounded-full'>
							<img src={message.avatar} />
						</div>
					</div>
					<div className='chat-header dark:text-white'>{message.name}</div>
					<div className='chat-bubble chat-bubble-warning dark:text-white'>{message.text}</div>
				</div>
			)}
		</>
	);
};

export default ChatMessages;
