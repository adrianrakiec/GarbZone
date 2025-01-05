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
import { LikedOffers } from './components/LikedOffers/LikedOffers';
import { MessagePage } from './pages/MessagePage';
import { Chat } from './components/Chat/Chat';
import { OffersPage } from './pages/OffersPage';
import { PaymentForm } from './components/PaymentForm/PaymentForm';
import { RatingForm } from './components/RatingForm/RatingForm';
import { ProtectedAdminRoute } from './components/ProtectedAdminRoute/ProtectedAdminRoute';
import { AdminPanel } from './components/AdminPanel/AdminPanel';
import { AdminPanelTags } from './components/AdminPanelTags/AdminPanelTags';

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
				path: '/wiadomosci',
				element: (
					<ProtectedRoute>
						<MessagePage />
					</ProtectedRoute>
				),
			},
			{
				path: '/wiadomosci/:username',
				element: (
					<ProtectedRoute>
						<Chat />
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
				path: '/obserwowane',
				element: <LikedOffers />,
			},
			{
				path: '/oferty/:tag',
				element: <OffersPage />,
			},
			{
				path: '/portfel',
				element: (
					<ProtectedRoute>
						<PaymentForm />
					</ProtectedRoute>
				),
			},
			{
				path: '/ocena',
				element: (
					<ProtectedRoute>
						<RatingForm />
					</ProtectedRoute>
				),
			},
			{
				path: '/admin-panel',
				element: (
					<ProtectedAdminRoute>
						<AdminPanel />
					</ProtectedAdminRoute>
				),
				children: [
					{
						path: 'tagi',
						element: <AdminPanelTags />,
					},
					{
						path: 'role',
						element: <NotFoundPage />,
					},
					{
						path: 'zgloszone',
						element: <NotFoundPage />,
					},
				],
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
