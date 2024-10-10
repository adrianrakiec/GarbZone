import { useForm } from 'react-hook-form';
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export const Login = () => {
	const { register, handleSubmit, formState } = useForm();
	const { login } = useContext(AuthContext);

	const onSubmit = async data => {
		try {
			const user = await login(data);
			console.log(user);
		} catch (e) {
			console.log(e.message);
		}
	};

	return (
		<div>
			<h3>Login</h3>
			<form onSubmit={handleSubmit(onSubmit)} autoComplete='off'>
				<div>
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
				<div>
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
				<button type='submit'>Zaloguj się</button>
			</form>
		</div>
	);
};
