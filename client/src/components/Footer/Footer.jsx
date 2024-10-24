import styles from './Footer.module.css';

export const Footer = () => {
	return (
		<footer className={styles.footer}>
			<p>©GarbZone {new Date().getFullYear()} - Adrian Rakieć</p>
		</footer>
	);
};
