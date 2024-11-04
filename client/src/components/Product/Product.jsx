import { FaHeart } from 'react-icons/fa';
import { Stars } from '../Stars/Stars';
import styles from './Product.module.css';

export const Product = ({ product }) => {
	const { url: mainPhoto } = product.images.find(img => img.isMain);
	const sellerRaiting = Math.floor(product.sellerRaiting);

	return (
		<div className={styles.product}>
			<img src={mainPhoto} alt='' width={250} height={250} />
			<button
				className={styles.like}
				onClick={() => console.log('dodano do polubionych')}
			>
				<FaHeart className={styles.heart} />
			</button>
			<h3>{product.title}</h3>
			<p className={styles.price}>{product.price} zł</p>
			<p>
				{product.seller} ( <Stars count={sellerRaiting} /> )
			</p>
		</div>
	);
};
