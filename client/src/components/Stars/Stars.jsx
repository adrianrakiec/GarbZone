import styles from './Stars.module.css';

export const Stars = ({ count }) => {
	const maxStars = 5;

	return (
		<span>
			{[...Array(maxStars)].map((_, index) => (
				<span key={index} className={index < count ? styles.gold : ''}>
					★
				</span>
			))}
		</span>
	);
};
