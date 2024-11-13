import { useLocation } from 'react-router-dom';
import { useFetchData } from '../../services/ApiClientService';
import { Wrapper } from '../Wrapper/Wrapper';
import { Offer } from '../Offer/Offer';
import { SearchProfile } from '../SearchProfile/SearchProfile';
import styles from './SearchResult.module.css';

export const SearchResult = () => {
	const location = useLocation();

	const queryParams = new URLSearchParams(location.search);
	const selectedOption = queryParams.get('opcja');
	const searchTerm = queryParams.get('fraza');

	const endpoint = `${
		selectedOption === 'uzytkownicy' ? 'users' : 'offers'
	}/search/${searchTerm}`;
	const { data, isPending } = useFetchData(endpoint, ['result']);

	if (isPending) return <div>Ładowanie...</div>;

	return (
		<div className={styles.searchResult}>
			<Wrapper>
				<h2>Wyniki wyszukiwania dla: {searchTerm}</h2>
				{!data || data?.length === 0 ? (
					<p>Brak wyników wyszukiwania</p>
				) : (
					<div className={styles.results}>
						{selectedOption === 'uzytkownicy'
							? data?.map((user, i) => <SearchProfile key={i} user={user} />)
							: data?.map((offer, i) => <Offer key={i} offer={offer} />)}
					</div>
				)}
			</Wrapper>
		</div>
	);
};
