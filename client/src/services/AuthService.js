const API_URL = 'https://localhost:5001/api/account';

export const login = async data => {
	const response = await fetch(`${API_URL}/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data),
	});

	if (!response.ok) {
		throw new Error('Błędne dane logowania!');
	}

	return response.json();
};
