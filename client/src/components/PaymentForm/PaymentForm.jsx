import { useNavigate } from 'react-router-dom';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useForm } from 'react-hook-form';
import { useMutateData } from '../../services/ApiClientService';
import { toastService } from '../../services/ToastService';
import { Wrapper } from '../Wrapper/Wrapper';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import styles from './PaymentForm.module.css';

const cardElementOptions = {
	style: {
		base: {
			color: '#32325d',
			fontSize: '1.3rem',
			'::placeholder': {
				color: '#aab7c4',
			},
			padding: '20px',
			textAlign: 'center',
		},
		invalid: {
			color: '#fa755a',
			iconColor: '#fa755a',
		},
	},
	hidePostalCode: true,
};

export const PaymentForm = () => {
	const { setWallet } = useContext(AuthContext);
	const { mutateAsync, isPending } = useMutateData(
		'users/create-payment-intent',
		'POST'
	);
	const { register, handleSubmit } = useForm();
	const stripe = useStripe();
	const elements = useElements();
	const navigate = useNavigate();

	const onSubmit = async data => {
		try {
			const response = await mutateAsync(data.amount);

			const { clientSecret } = response;

			const cardElement = elements.getElement(CardElement);
			await stripe.confirmCardPayment(clientSecret, {
				payment_method: {
					card: cardElement,
				},
			});

			toastService.success('Środki dodane prawidłowo');
			setWallet(prev => parseFloat(prev) + parseFloat(data.amount));
			navigate('/');
		} catch (e) {
			toastService.error(e.message || 'Wystąpił błąd');
		}
	};

	return (
		<Wrapper>
			<section className={styles.paymentForm}>
				<h2>Doładuj środki</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					className={styles.form}
					autoComplete='off'
				>
					<div className={styles.formGroup}>
						<label htmlFor='amount'>Kwota</label>
						<input
							id='amount'
							type='number'
							className={styles.amountInput}
							min='1'
							step={0.1}
							{...register('amount', {
								required: {
									value: true,
									message: 'Podaj kwotę!',
								},
							})}
						/>
					</div>

					<div className={styles.formGroup}>
						<label htmlFor='card-element'>Dane karty</label>
						<CardElement
							id='card-element'
							options={cardElementOptions}
							autoComplete='off'
						/>
					</div>

					<button
						type='submit'
						disabled={isPending || !stripe}
						className={styles.confirmBtn}
					>
						{isPending ? 'Ładowanie...' : 'Doładuj'}
					</button>
				</form>
			</section>
		</Wrapper>
	);
};
