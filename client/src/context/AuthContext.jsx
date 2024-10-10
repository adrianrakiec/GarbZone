import { createContext, useState, useEffect } from 'react';
import {
	login as loginService,
	logout as logoutService,
} from '../services/AuthService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const savedUser = localStorage.getItem('user');
		if (savedUser) {
			setUser(JSON.parse(savedUser));
		}
	}, []);

	const login = async credentials => {
		try {
			const data = await loginService(credentials);
			setUser(data);
		} catch (error) {
			console.error('Błąd logowania:', error.message);
			throw error;
		}
	};

	const logout = () => {
		logoutService();
		setUser(null);
	};

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
