import { useRecoilState } from 'recoil';
import { modalState } from '../../atom/modalAtom';
const Modal = () => {
	const [openModal, setOpenModal] = useRecoilState(modalState);
	return (
		<div className='text-black dark:text-white'>
			<h1>modal</h1>
			{openModal && <h1>The modal is open</h1>}
		</div>
	);
};

export default Modal;
