import { useRecoilState } from 'recoil';
import Modal from 'react-modal';
import Input from './Input';
import { postModalState } from '../../atom/modalAtom';

const PostModal = () => {
	const [openModal, setOpenModal] = useRecoilState(postModalState);
	console.log(openModal);
	return (
		<div className='text-black dark:text-white'>
			{openModal && (
				<Modal
					isOpen={openModal}
					contentLabel='Comments'
					ariaHideApp={false}
					onRequestClose={() => setOpenModal(false)}
					className='max-w-xl w-[90%] min-h-[500px] absolute top-24 left-[50%] translate-x-[-50%] bg-white dark:bg-black border-2 border-gray-200 outline-none rounded-xl shadow-md text-black dark:text-white '>
					<Input />
				</Modal>
			)}
		</div>
	);
};

export default PostModal;
