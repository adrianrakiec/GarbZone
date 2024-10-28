import { FaHeart } from 'react-icons/fa';
import styles from './Product.module.css';

export const Product = () => {
	return (
		<div className={styles.product}>
			<img
				src='https://cdn.pixabay.com/photo/2024/07/28/15/19/ai-generated-8927774_1280.jpg'
				alt=''
				width={250}
				height={250}
			/>
			<button
				className={styles.like}
				onClick={() => console.log('dodano do polubionych')}
			>
				<FaHeart className={styles.heart} />
			</button>
			<h3>Sukienka</h3>
			<p className={styles.price}>40 zł</p>
			<p>
				Ola_123 ( <span>★★★★★</span> )
			</p>
		</div>
	);
};
