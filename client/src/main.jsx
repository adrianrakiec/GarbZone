import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './context/AuthContext';
import { RouterProvider } from 'react-router-dom';
import { routes } from './routes';
import { ToastContainer } from 'react-toastify';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import './index.css';

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
		},
	},
});

const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY, {
	advancedFraudSignals: false,
});

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<QueryClientProvider client={queryClient}>
			<AuthProvider>
				<Elements stripe={stripePromise}>
					<ToastContainer />
					<RouterProvider router={routes} />
				</Elements>
			</AuthProvider>
		</QueryClientProvider>
	</StrictMode>
);
