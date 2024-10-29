const API_URL = import.meta.env.VITE_API_KEY;

export const getMembers = async () => {
	const response = await fetch(`${API_URL}users`);
	const data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw new Error(data.message);
	}
};

export const getMember = async username => {
	const response = await fetch(`${API_URL}users/${username}`);
	const data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw new Error(data.message);
	}
};