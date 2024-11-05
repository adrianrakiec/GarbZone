import { Offer } from '../Offer/Offer';
import { MainBtn } from '../MainBtn/MainBtn';
import styles from './BestOffers.module.css';

export const BestOffers = ({ bestOffers }) => {
	return (
		<section className={styles.bestOffers}>
			<div className={styles.offers}>
				{bestOffers?.map(offer => (
					<Offer key={offer.id} offer={offer} />
				))}
			</div>
			<div className={styles.moreBtn}>
				<MainBtn>Odkryj więcej</MainBtn>
			</div>
		</section>
	);
};
