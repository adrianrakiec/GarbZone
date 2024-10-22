import styles from './MainBtn.module.css';

export const MainBtn = ({ children, onClick }) => {
	return (
		<button className={styles.btn} onClick={onClick}>
			{children}
		</button>
	);
};
