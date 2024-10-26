import { FaArrowLeft } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';
import styles from './ArrowBtn.module.css';

export const ArrowBtn = ({ arrowDirection, onClick }) => {
	return (
		<button className={styles.arrowBtn} onClick={onClick}>
			{arrowDirection === 'left' ? <FaArrowLeft /> : <FaArrowRight />}
		</button>
	);
};
