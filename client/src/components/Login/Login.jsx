export const Login = () => {
	return (
		<div>
			<h3>Login</h3>
			<form autoComplete='off'>
				<div>
					<label htmlFor="username">Login:</label>
					<input id="username" type='text' required />
				</div>
				<div>
					<label htmlFor="password">Hasło:</label>
					<input id="password" type='password' required />
				</div>
				<button type='submit'>Zaloguj się</button>
			</form>
		</div>
	);
};
