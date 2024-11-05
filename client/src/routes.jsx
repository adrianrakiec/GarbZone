import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Layout } from './components/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { Profile } from './components/Profile/Profile';
import { OfferDetails } from './components/OfferDetails/OfferDetails';

export const routes = createBrowserRouter([
	{
		element: <Layout />,
		path: '/',
		children: [
			{
				path: '/',
				element: <MainPage />,
			},
			{
				path: '/oferta/:id',
				element: <OfferDetails />,
			},
			{
				path: '/profil',
				element: <Profile />,
			},
			{
				path: '*',
				element: <NotFoundPage />,
			},
		],
	},
	{
		element: <Login />,
		path: '/logowanie',
	},
	{
		element: <Register />,
		path: '/rejestracja',
	},
]);
