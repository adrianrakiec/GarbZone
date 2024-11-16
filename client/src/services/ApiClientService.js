import { useQuery, useMutation } from '@tanstack/react-query';

const API_URL = import.meta.env.VITE_API_KEY;

export const apiClient = async (url, body = null, method = 'GET') => {
	try {
		const response = await fetch(`${API_URL}${url}`, {
			method: method,
			headers: { 'Content-Type': 'application/json' },
			credentials: 'include',
			body: body ? JSON.stringify(body) : null,
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw new Error(errorData.message);
		}

		if (response.status === 204) return;

		return await response.json();
	} catch (error) {
		console.error('Błąd:', error.message);
		throw error;
	}
};

export const useFetchData = (url, queryKey, enabled = true) => {
	return useQuery({
		queryKey,
		queryFn: () => apiClient(url),
		enabled: enabled,
	});
};

export const useMutateData = (url, method = 'POST') => {
	return useMutation({
		mutationFn: body => apiClient(url, body, method),
	});
};
