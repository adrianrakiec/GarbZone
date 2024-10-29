import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';
import { Layout } from './components/Layout/Layout';
import { NotFoundPage } from './pages/NotFoundPage';
import { Profile } from './components/Profile/Profile';

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
				element: <Profile />,
				path: '/profil',
			},
			{
				element: <NotFoundPage />,
				path: '*',
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
