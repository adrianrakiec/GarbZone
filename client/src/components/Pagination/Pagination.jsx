import styles from './Pagination.module.css';

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
	const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className={styles.pagination}>
			{pages.map(page => (
				<button
					key={page}
					onClick={() => {
						onPageChange(page);
					}}
					className={page === currentPage ? styles.active : ''}
				>
					{page}
				</button>
			))}
		</div>
	);
};
