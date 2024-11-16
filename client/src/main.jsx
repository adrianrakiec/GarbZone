import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import './index.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<ToastContainer />
				<RouterProvider router={routes} />
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);
