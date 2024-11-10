const API_URL = import.meta.env.VITE_API_KEY;

export const login = async credentials => {
	const response = await fetch(`${API_URL}account/login`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		credentials: 'include',
		body: JSON.stringify(credentials),
	});

	const data = await response.json();

	if (response.ok) {
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
		credentials: 'include',
		body: JSON.stringify(userData),
	});

	const data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw new Error(data.message);
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
