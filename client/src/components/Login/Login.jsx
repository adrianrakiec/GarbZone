import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { MainBtn } from '../MainBtn/MainBtn';
import { Wrapper } from '../Wrapper/Wrapper';
import { ArrowBtn } from '../ArrowBtn/ArrowBtn';
import styles from './Login.module.css';

export const Login = () => {
	const { register, handleSubmit, formState } = useForm();
	const { login } = useContext(AuthContext);

	const onSubmit = async data => {
		try {
			await login(data);
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<Wrapper>
			<div className={styles.wrapper}>
				<ArrowBtn arrowDirection='left' />
				<h2>Zaloguj się</h2>
				<form
					onSubmit={handleSubmit(onSubmit)}
					autoComplete='off'
					className={styles.loginForm}
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
					<MainBtn>Zaloguj się</MainBtn>
				</form>
			</div>
		</Wrapper>
	);
};
