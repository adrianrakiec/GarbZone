import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Login } from '../Login/Login';

export const ProtectedRoute = ({ children }) => {
	const { user, isLoading } = useContext(AuthContext);
	if (isLoading) {
		return <div>Pobieranie danych...</div>;
	}

	return user ? <>{children}</> : <Login />;
};
