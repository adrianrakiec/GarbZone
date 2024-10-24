import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MainBtn } from '../MainBtn/MainBtn';
import { ArrowBtn } from '../ArrowBtn/ArrowBtn';
import styles from './Register.module.css';

export const Register = () => {
	const { register, handleSubmit, formState } = useForm();
	const { register: registerUser } = useContext(AuthContext);

	const onSubmit = async data => {
		try {
			await registerUser(data);
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<div className={styles.wrapper}>
			<ArrowBtn arrowDirection='left' />
			<h2>Rejestracja</h2>
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
				<MainBtn>Zarejestruj się</MainBtn>
			</form>
		</div>
	);
};
