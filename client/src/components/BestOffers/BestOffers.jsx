import { Product } from '../Product/Product';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './BestOffers.module.css';

export const BestOffers = ({bestOffers}) => {

	return (
		<section className={styles.bestOffers}>
			<div className={styles.products}>
				{bestOffers?.map(offer => (
					<Product key={offer.id} product={offer} />
				))}
			</div>
			<div className={styles.moreBtn}>
				<MainBtn>Odkryj więcej</MainBtn>
			</div>
		</section>
	);
};
