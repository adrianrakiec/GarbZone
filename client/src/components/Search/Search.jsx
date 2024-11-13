import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { CiSearch } from 'react-icons/ci';
import styles from './Search.module.css';

export const Search = () => {
	const { register, handleSubmit } = useForm();
	const navigate = useNavigate();

	const onSubmit = data => {
		const { selectedOption, searchTerm } = data;

		if (!searchTerm) return;

		navigate(
			`/wyszukiwanie?opcja=${
				selectedOption === 'items' ? 'przedmioty' : 'uzytkownicy'
			}&fraza=${encodeURIComponent(searchTerm)}`
		);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<select
				{...register('selectedOption')}
				defaultValue='items'
				className={styles.select}
			>
				<option value='items'>Przedmioty</option>
				<option value='users'>Użytkownicy</option>
			</select>

			<div className={styles.searchGroup}>
				<input
					type='search'
					{...register('searchTerm')}
					placeholder='Szukaj'
					className={styles.input}
				/>
				<button type='submit' className={styles.btn}>
					<CiSearch />
				</button>
			</div>
		</form>
	);
};
