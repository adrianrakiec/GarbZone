import { useState } from 'react';
import { Offer } from '../Offer/Offer';
import { ArrowBtn } from '../ArrowBtn/ArrowBtn';
import styles from './LastAddedOffers.module.css';

export const LastAddedOffers = ({ lastAdded }) => {
	const [currentIndex, setCurrentIndex] = useState(0);

	if (!lastAdded) return <p>Ładowanie...</p>;

	const visibleItems = 4;

	const handlePrev = () => {
		setCurrentIndex(prevIndex => Math.max(prevIndex - 1, 0));
	};

	const handleNext = () => {
		setCurrentIndex(prevIndex =>
			Math.min(prevIndex + 1, lastAdded.length - visibleItems)
		);
	};

	const visibleOffers = lastAdded?.slice(
		currentIndex,
		currentIndex + visibleItems
	);

	return (
		<section className={styles.lastAdded}>
			<div className={styles.btns}>
				<ArrowBtn arrowDirection='left' onClick={handlePrev} />
				<ArrowBtn onClick={handleNext} />
			</div>
			<div className={styles.offers}>
				{visibleOffers &&
					visibleOffers.map(offer => <Offer key={offer.id} offer={offer} />)}
			</div>
		</section>
	);
};
