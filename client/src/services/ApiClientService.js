import { useQuery, useMutation } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_KEY;

export const apiClient = async (url, headers, body = null, method = 'GET') => {
	try {
		const response = await fetch(`${API_URL}${url}`, {
			method: method,
			headers: headers,
			body: body ? JSON.stringify(body) : null,
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message);
		}

		return await response.json();
	} catch (error) {
		console.error('Błąd:', error.message);
		throw error;
	}
};

export const useFetchData = (
	url,
	queryKey,
	headers = { 'Content-Type': 'application/json' }
) => {
	return useQuery({
		queryKey,
		queryFn: () => apiClient(url, headers),
	});
};

export const useMutateData = (
	url,
	body,
	headers = { 'Content-Type': 'application/json' },
	method = 'POST'
) => {
	return useMutation({
		mutationFn: () => apiClient(url, headers, body, method),
	});
};
