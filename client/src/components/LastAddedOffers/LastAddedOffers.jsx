import { useState } from 'react';
import { useMediaQuery } from 'react-responsive';
import { Offer } from '../Offer/Offer';
import { ArrowBtn } from '../ArrowBtn/ArrowBtn';
import styles from './LastAddedOffers.module.css';

export const LastAddedOffers = ({ lastAdded }) => {
	const [currentIndex, setCurrentIndex] = useState(0);
	const isSmallScreen = useMediaQuery({ maxWidth: 550 });
	const isMediumScreen = useMediaQuery({ maxWidth: 900 });
	const isLargeScreen = useMediaQuery({ maxWidth: 1200 });

	if (!lastAdded) return <p>Ładowanie...</p>;

	const visibleItems = isSmallScreen
		? 1
		: isMediumScreen
		? 2
		: isLargeScreen
		? 3
		: 4;

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
