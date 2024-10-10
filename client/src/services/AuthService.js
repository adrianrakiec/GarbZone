const API_URL = 'https://localhost:5001/api/account';

export const login = async credentials => {
	const response = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(credentials),
	});

	const data = await response.json();

	if (response.ok) {
		localStorage.setItem('user', JSON.stringify(data));
		return data;
	} else {
		throw new Error(data.message);
	}
};

export const logout = () => {
	localStorage.removeItem('user');
};
