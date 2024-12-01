import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchData } from '../../services/ApiClientService';
import { Wrapper } from '../Wrapper/Wrapper';
import { Offer } from '../Offer/Offer';
import { SearchProfile } from '../SearchProfile/SearchProfile';
import { Pagination } from '../Pagination/Pagination';
import styles from './SearchResult.module.css';

export const SearchResult = () => {
	const location = useLocation();
	const [pagination, setPagination] = useState({
		currentPage: 1,
		itemsPerPage: 9,
		totalItems: 0,
		totalPages: 1,
	});

	const queryParams = new URLSearchParams(location.search);
	const selectedOption = queryParams.get('opcja');
	const searchTerm = queryParams.get('fraza');

	const endpoint = `${
		selectedOption === 'uzytkownicy' ? 'users' : 'offers'
	}/search/${searchTerm}?pageNumber=${pagination.currentPage}&pageSize=${
		pagination.itemsPerPage
	}`;

	const { data, isPending } = useFetchData(
		endpoint,
		['result', pagination.currentPage],
		true,
		true
	);

	useEffect(() => {
		if (data) {
			const { pagination: newPagination } = data;
			setPagination(JSON.parse(newPagination));
		}
	}, [data]);

	if (isPending) return <div>Ładowanie...</div>;

	const handlePageChange = page => {
		setPagination(prev => ({ ...prev, currentPage: page }));
	};

	const result = data.data;

	return (
		<div className={styles.searchResult}>
			<Wrapper>
				<h2>Wyniki wyszukiwania dla: {searchTerm}</h2>
				{!result || result?.length === 0 ? (
					<p>Brak wyników wyszukiwania</p>
				) : (
					<>
						<div className={styles.results}>
							{selectedOption === 'uzytkownicy'
								? result?.map((user, i) => (
										<SearchProfile key={i} user={user} />
								  ))
								: result?.map((offer, i) => <Offer key={i} offer={offer} />)}
						</div>
						<Pagination {...pagination} onPageChange={handlePageChange} />
					</>
				)}
			</Wrapper>
		</div>
	);
};
