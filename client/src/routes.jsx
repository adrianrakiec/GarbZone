import { createBrowserRouter } from 'react-router-dom';
import { MainPage } from './pages/MainPage';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

export const routes = createBrowserRouter([
	{
		element: <MainPage />,
		path: '/',	
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