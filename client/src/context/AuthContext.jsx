import { createContext, useState, useEffect } from 'react';
import {
	login as loginService,
	register as registerService,
	logout as logoutService,
} from '../services/AuthService';

export const AuthContext = createContext();
const API_URL = import.meta.env.VITE_API_KEY;

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [wallet, setWallet] = useState(null);
	const [id, setId] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		getCurrentUser();
		getWallet();
	}, []);

	const getCurrentUser = async () => {
		try {
			const response = await fetch(`${API_URL}account/me`, {
				credentials: 'include',
			});
			if (response.ok) {
				const data = await response.json();
				setUser(data.username);
				setId(data.userId);
			}
		} catch (e) {
			console.log(e);
			setUser(null);
			setId(null);
		} finally {
			setIsLoading(false);
		}
	};

	const getWallet = async () => {
		try {
			const response = await fetch(`${API_URL}users/wallet`, {
				credentials: 'include',
			});
			if (response.ok) {
				const data = await response.json();
				setWallet(data);
			}
		} catch (e) {
			console.log(e);
		} finally {
			setIsLoading(false);
		}
	};

	const login = async credentials => {
		try {
			const data = await loginService(credentials);
			setUser(data.username);
			setId(data.userId);
			getWallet();
			return data;
		} catch (error) {
			console.error('Błąd logowania:', error.message);
			throw error;
		}
	};

	const register = async userData => {
		try {
			await registerService(userData);
			getWallet();
		} catch (error) {
			console.error('Błąd rejestracji:', error.message);
			throw error;
		}
	};

	const logout = () => {
		logoutService();
		setUser(null);
		setId(null);
		setWallet(null);
	};

	return (
		<AuthContext.Provider
			value={{
				user,
				id,
				login,
				register,
				logout,
				isLoading,
				wallet,
				setWallet,
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};
