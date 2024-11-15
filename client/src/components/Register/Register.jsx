import { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { toastService } from '../../services/ToastService';
import { MainBtn } from '../MainBtn/MainBtn';
import { ArrowBtn } from '../ArrowBtn/ArrowBtn';
import styles from './Register.module.css';

export const Register = () => {
	const { register, handleSubmit, formState } = useForm();
	const { register: registerUser } = useContext(AuthContext);
	const navigate = useNavigate();

	const onSubmit = async data => {
		try {
			await registerUser(data);
			toastService.success('Rejestracja przbiegła pomyślnie');
			navigate('/logowanie');
		} catch (e) {
			toastService.error(e.message);
		}
	};

	return (
		<div className={styles.wrapper}>
			<ArrowBtn arrowDirection='left' onClick={() => navigate('/')} />
			<h2>Rejestracja</h2>
			<p>
				Masz już konto? <Link to='/logowanie'>Zaloguj się!</Link>
			</p>
			<form
				onSubmit={handleSubmit(onSubmit)}
				autoComplete='off'
				className={styles.registerForm}
			>
				<div className={styles.formGroup}>
					<label htmlFor='username'>Login:</label>
					<input
						id='username'
						type='text'
						{...register('username', {
							required: {
								value: true,
								message: 'Nazwa użytkownika jest wymagana!',
							},
						})}
					/>
					{formState.errors.username && (
						<span>{formState.errors.username.message}</span>
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='email'>Email:</label>
					<input
						id='email'
						type='email'
						{...register('email', {
							required: {
								value: true,
								message: 'Email jest wymagany!',
							},
						})}
					/>
					{formState.errors.email && (
						<span>{formState.errors.email.message}</span>
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='password'>Hasło:</label>
					<input
						id='password'
						type='password'
						{...register('password', {
							required: {
								value: true,
								message: 'Hasło jest wymagane!',
							},
						})}
					/>
					{formState.errors.password && (
						<span>{formState.errors.password.message}</span>
					)}
				</div>
				<div className={styles.formGroup}>
					<label htmlFor='confirmPassword'>Powtórz hasło:</label>
					<input
						id='confirmPassword'
						type='password'
						{...register('confirmPassword', {
							required: {
								value: true,
								message: 'Powtórzenie hasła jest wymagane!',
							},
						})}
					/>
					{formState.errors.confirmPassword && (
						<span>{formState.errors.confirmPassword.message}</span>
					)}
				</div>
				<MainBtn>Zarejestruj się</MainBtn>
			</form>
		</div>
	);
};
