import { useState } from 'react';
import { CiSearch } from 'react-icons/ci';
import styles from './Search.module.css';

export const Search = () => {
	const [selectedOption, setSelectedOption] = useState('items');
	const [searchTerm, setSearchTerm] = useState('');

	const handleOptionChange = event => {
		setSelectedOption(event.target.value);
		setSearchTerm('');
	};

	const handleSearchChange = event => {
		setSearchTerm(event.target.value);
	};

	const handleSubmit = event => {
		event.preventDefault();
		console.log(`Wyszukiwanie w ${selectedOption}: ${searchTerm}`);
	};

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<select
				value={selectedOption}
				onChange={handleOptionChange}
				className={styles.select}
			>
				<option value='items'>Przedmioty</option>
				<option value='users'>Użytkownicy</option>
			</select>
			<div className={styles.searchGroup}>
				<input
					type='search'
					value={searchTerm}
					onChange={handleSearchChange}
					placeholder={`Szukaj ${
						selectedOption === 'items' ? 'w przedmiotach' : 'użytkowników'
					}`}
					className={styles.input}
				/>
				<button type='submit' className={styles.btn}>
					<CiSearch />
				</button>
			</div>
		</form>
	);
};
