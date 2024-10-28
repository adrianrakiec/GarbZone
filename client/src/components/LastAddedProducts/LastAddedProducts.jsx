import { Product } from '../Product/Product';
import { ArrowBtn } from '../ArrowBtn/ArrowBtn';
import styles from './LastAddedProducts.module.css';

export const LastAddedProducts = () => {
	return (
		<section className={styles.lastAdded}>
			<div className={styles.btns}>
				<ArrowBtn arrowDirection='left' />
				<ArrowBtn />
			</div>
			<div className={styles.products}>
				<Product />
				<Product />
				<Product />
				<Product />
			</div>
		</section>
	);
};
