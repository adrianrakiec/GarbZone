const API_URL = import.meta.env.VITE_API_KEY;

export const login = async credentials => {
	const response = await fetch(`${API_URL}account/login`, {
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

export const register = async userData => {
	const response = await fetch(`${API_URL}account/register`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(userData),
	});

	const data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw new Error(data.message);
	}
};

export const logout = () => {
	localStorage.removeItem('user');
};
