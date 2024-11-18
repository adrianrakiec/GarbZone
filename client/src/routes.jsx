import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Layout } from './components/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { Profile } from './components/Profile/Profile';
import { OfferDetails } from './components/OfferDetails/OfferDetails';
import { ProtectedRoute } from './components/ProtectedRoute/ProtectedRoute';
import { UserProfilePage } from './pages/UserProfilePage';
import { SearchResultPage } from './pages/SearchResultPage';
import { CreateOffer } from './components/CreateOffer/CreateOffer';

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
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: '/nowa-oferta',
				element: (
					<ProtectedRoute>
						<CreateOffer />
					</ProtectedRoute>
				),
			},
			{
				path: '/profil/:username',
				element: <UserProfilePage />,
			},
			{
				path: '/wyszukiwanie',
				element: <SearchResultPage />,
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
