import { Offer } from '../Offer/Offer';
import { ArrowBtn } from '../ArrowBtn/ArrowBtn';
import styles from './LastAddedOffers.module.css';

export const LastAddedOffers = ({ lastAdded }) => {
	return (
		<section className={styles.lastAdded}>
			<div className={styles.btns}>
				<ArrowBtn arrowDirection='left' />
				<ArrowBtn />
			</div>
			<div className={styles.offers}>
				{lastAdded && (
					<>
						<Offer offer={lastAdded[0]} />
						<Offer offer={lastAdded[1]} />
						<Offer offer={lastAdded[2]} />
						<Offer offer={lastAdded[3]} />
					</>
				)}
			</div>
		</section>
	);
};
