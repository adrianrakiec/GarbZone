import { useForm } from 'react-hook-form';

export const Login = () => {
	const { register, handleSubmit, formState } = useForm();

	const onSubmit = data => {
		console.log(data);
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
