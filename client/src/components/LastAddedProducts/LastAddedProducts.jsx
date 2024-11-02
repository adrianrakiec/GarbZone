import { Product } from '../Product/Product';
import { ArrowBtn } from '../ArrowBtn/ArrowBtn';
import styles from './LastAddedProducts.module.css';

export const LastAddedProducts = ({ lastAdded }) => {
	return (
		<section className={styles.lastAdded}>
			<div className={styles.btns}>
				<ArrowBtn arrowDirection='left' />
				<ArrowBtn />
			</div>
			<div className={styles.products}>
				{lastAdded && (
					<>
						<Product product={lastAdded[0]} />
						<Product product={lastAdded[1]} />
						<Product product={lastAdded[2]} />
						<Product product={lastAdded[3]} />
					</>
				)}
			</div>
		</section>
	);
};
