import styles from './SectionHeading.module.css';

export const SectionHeading = ({ preTitle, title }) => {
	return (
		<div className={styles.heading}>
			<p className={styles.preTitle}>{preTitle}</p>
			<h2 className={styles.title}>{title}</h2>
		</div>
	);
};
