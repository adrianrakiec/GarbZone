import { useQuery, useMutation } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_KEY;

export const apiClient = async (
	url,
	body = null,
	method = 'GET',
	headers = { 'Content-Type': 'application/json' }
) => {
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

export const useFetchData = (url, queryKey) => {
	return useQuery({
		queryKey,
		queryFn: () => apiClient(url),
	});
};

export const useMutateData = (url, method = 'POST') => {
	return useMutation({
		mutationFn: (headers, body) => apiClient(url, body, method, headers),
	});
};
