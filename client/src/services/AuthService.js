const API_URL = import.meta.env.VITE_API_KEY;

export const login = async credentials => {
	try {
		const response = await fetch(`${API_URL}account/login`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(credentials),
		});

		if (response.ok) {
			return { success: true, username: credentials.username };
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Logowanie nie powiodło się');
		}
	} catch (error) {
		throw new Error(error.message || 'Błąd połączenia z serwerem');
	}
};

export const register = async userData => {
	try {
		const response = await fetch(`${API_URL}account/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			credentials: 'include',
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			return { success: true };
		} else {
			const errorData = await response.json();
			throw new Error(errorData.message || 'Rejestracja nie powiodła się');
		}
	} catch (error) {
		throw new Error(error.message || 'Błąd połączenia z serwerem');
	}
};

export const logout = async () => {
	await fetch(`${API_URL}account/logout`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
	});
};
