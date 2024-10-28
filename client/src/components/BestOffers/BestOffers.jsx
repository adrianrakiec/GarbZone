import { Product } from '../Product/Product';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './BestOffers.module.css';

export const BestOffers = () => {
	return (
		<section className={styles.bestOffers}>
			<div className={styles.products}>
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
				<Product />
			</div>
			<div className={styles.moreBtn}>
				<MainBtn>Odkryj więcej</MainBtn>
			</div>
		</section>
	);
};
