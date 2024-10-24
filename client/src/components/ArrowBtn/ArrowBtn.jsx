import { FaArrowLeft } from 'react-icons/fa6';
import { FaArrowRight } from 'react-icons/fa6';
import styles from './ArrowBtn.module.css';

export const ArrowBtn = ({ arrowDirection }) => {
	return (
		<a href='#' className={styles.arrowBtn}>
			{arrowDirection === 'left' ? <FaArrowLeft /> : <FaArrowRight />}
		</a>
	);
};
