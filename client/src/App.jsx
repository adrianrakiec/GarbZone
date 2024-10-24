import { useQuery } from '@tanstack/react-query';
import { Nav } from './components/Nav/Nav';
import { Login } from './components/Login/Login';
import { Register } from './components/Register/Register';

import { AuthContext } from './context/AuthContext';
import { useContext } from 'react';

const URL = 'https://localhost:5001/api/users';

export const App = () => {
	const { data: users } = useQuery({
		queryFn: () => fetch(URL).then(res => res.json()),
		queryKey: ['users'],
	});

	const { user, logout } = useContext(AuthContext);

	return (
		<>
			<Nav />
			{user ? (
				<>
					<p>Witaj, {user.username}</p>
					<button onClick={logout}>Wygloguj się</button>
				</>
			) : (
				<>
					<Login />
					<Register />
				</>
			)}

			<h1>Users:</h1>
			<ul>
				{users?.map(user => (
					<li key={user.id}>{user.userName}</li>
				))}
			</ul>
		</>
	);
};
