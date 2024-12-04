import { useState, useEffect } from 'react';
import { Wrapper } from '../Wrapper/Wrapper';
import { Offer } from '../Offer/Offer';
import { HorizontalRule } from '../HorizontalRule/HorizontalRule';
import { Pagination } from '../Pagination/Pagination';
import { useFetchData } from '../../services/ApiClientService';
import styles from './LikedOffers.module.css';

export const LikedOffers = () => {
	const [pagination, setPagination] = useState({
		currentPage: 1,
		itemsPerPage: 9,
		totalItems: 0,
		totalPages: 1,
	});
	const { data, isPending } = useFetchData(
		`offers/liked?pageNumber=${pagination.currentPage}&pageSize=${pagination.itemsPerPage}`,
		['liked', pagination.currentPage],
		true,
		true
	);

	useEffect(() => {
		if (data) {
			const { pagination: newPagination } = data;
			setPagination(JSON.parse(newPagination));
		}
	}, [data]);

	if (isPending) return <h2>Ładowanie...</h2>;

	const handlePageChange = page => {
		setPagination(prev => ({ ...prev, currentPage: page }));
	};

	const result = data.data;

	return (
		<Wrapper>
			<section className={styles.liked}>
				<h2 className={styles.title}>Obserwowane:</h2>
				<div className={styles.likedOffers}>
					{result &&
						result.map(offer => <Offer key={offer.id} offer={offer} />)}
				</div>
				<Pagination {...pagination} onPageChange={handlePageChange} />
				<HorizontalRule />
			</section>
		</Wrapper>
	);
};
