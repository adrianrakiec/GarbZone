import styles from './MainBtn.module.css';

export const MainBtn = ({ children, onClick, disabled }) => {
	return (
		<button
			className={disabled ? styles.btnDisabled : styles.btn}
			onClick={onClick}
			disabled={disabled}
		>
			{children}
		</button>
	);
};
