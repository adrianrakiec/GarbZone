import { FaHeart } from 'react-icons/fa';
import styles from './Product.module.css';

export const Product = ({ product }) => {
	return (
		<div className={styles.product}>
			<img
				src={product.imageUrls[0]}
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
			<h3>{product.title}</h3>
			<p className={styles.price}>{product.price} zł</p>
			<p>
				Ola_123 ( <span>★★★★★</span> )
			</p>
		</div>
	);
};
