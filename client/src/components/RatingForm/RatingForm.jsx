import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toastService } from '../../services/ToastService';
import { useMutateData } from '../../services/ApiClientService';
import { Wrapper } from '../Wrapper/Wrapper';
import { MainBtn } from '../MainBtn/MainBtn';
import { NotFoundPage } from '../../pages/NotFoundPage';
import styles from './RatingForm.module.css';

export const RatingForm = () => {
	const { register, handleSubmit, reset } = useForm();
	const [rating, setRating] = useState(0);
	const location = useLocation();
	const navigate = useNavigate();
	const user = location.state?.user;
	const offerId = location.state?.offerId;
	const { mutateAsync } = useMutateData(
		`users/add-rating/${user}/${offerId}`,
		'PUT'
	);

	if (!user || !offerId) return <NotFoundPage />;

	const handleRatingClick = value => {
		setRating(value);
	};

	const onSubmit = async data => {
		try {
			reset();
			setRating(0);
			const payload = { comment: data.comment, rating: rating };
			await mutateAsync(payload);
			navigate('/');
			toastService.success('Ocena dodana prawidłowo');
		} catch (e) {
			toastService.error(e.message || 'Wystąpił błąd');
		}
	};

	return (
		<Wrapper>
			<section className={styles.ratingForm}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<h2>Oceń użytkownika {user}</h2>
						<div className={styles.container}>
							{[1, 2, 3, 4, 5].map(star => (
								<span
									className={styles.star}
									key={star}
									style={{
										color: star <= rating ? 'gold' : 'gray',
									}}
									onClick={() => handleRatingClick(star)}
								>
									★
								</span>
							))}
						</div>
					</div>

					<div style={{ marginBottom: '10px' }}>
						<label htmlFor='comment'>Komentarz (opcjonalny):</label>
						<textarea
							id='comment'
							{...register('comment')}
							placeholder='Dodaj komentarz...'
							className={styles.comment}
						/>
					</div>

					<MainBtn>Wyślij ocenę</MainBtn>
				</form>
			</section>
		</Wrapper>
	);
};
