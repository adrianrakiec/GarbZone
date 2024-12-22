import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useFetchData } from '../../services/ApiClientService';
import { Offer } from '../Offer/Offer';
import { Pagination } from '../Pagination/Pagination';
import styles from './OffersByTag.module.css';

export const OffersByTag = () => {
	const { tag } = useParams();
	const [pagination, setPagination] = useState({
		currentPage: 1,
		itemsPerPage: 9,
		totalItems: 0,
		totalPages: 1,
	});

	const { data, isPending } = useFetchData(
		`offers/offers-by-tag/${tag}`,
		['result', pagination.currentPage, tag],
		true,
		true
	);

	useEffect(() => {
		if (data) {
			const { pagination: newPagination } = data;
			setPagination(JSON.parse(newPagination));
		}
	}, [data, tag]);

	if (isPending) return <div>Ładowanie...</div>;

	const handlePageChange = page => {
		setPagination(prev => ({ ...prev, currentPage: page }));
	};

	const result = data.data;

	return (
		<div className={styles.offers}>
			<h2>Wybrana kategoria: {tag}</h2>
			{!result || result?.length === 0 ? (
				<p>Brak wyników dla podanej kategorii</p>
			) : (
				<>
					<div className={styles.results}>
						{result.map(offer => (
							<Offer key={offer.id} offer={offer} />
						))}
					</div>
					<Pagination {...pagination} onPageChange={handlePageChange} />
				</>
			)}
		</div>
	);
};
