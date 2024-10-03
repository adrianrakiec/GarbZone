import { useQuery } from '@tanstack/react-query';
import { Nav } from './components/Nav/Nav';
import { Login } from './components/Login/Login';

const URL = 'https://localhost:5001/api/users';

export const App = () => {
	const { data: users } = useQuery({
		queryFn: () => fetch(URL).then(res => res.json()),
		queryKey: ['users'],
	});

	return (
		<>
			<Nav />
			<Login />
			<h1>Users:</h1>
			<ul>
				{users?.map(user => (
					<li key={user.id}>{user.userName}</li>
				))}
			</ul>
		</>
	);
};
